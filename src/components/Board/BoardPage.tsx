import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DottedBackground, CanvasToolbar, CanvasDock, StickyNote, TextBox } from './index';
import { getToolById, getEraserCursor, Point, DrawingPath } from './tools';
import { parseAIResponse, extractSections } from '../../utils/jsonParser';
import { sendMessage } from '../../services/groqClient';
import MinimizedNavbar from './MinimizedNavbar';

// Simple word limit function
const truncateToWords = (text: string, maxWords: number = 40): string => {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Clean up excessive whitespace
const cleanWhitespace = (text: string): string => {
  return text
    .replace(/\n\s*\n/g, '\n') // Remove multiple consecutive line breaks
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
};

interface StickyNote {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  width: number;
  height: number;
}

interface TextBox {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  enableMarkdown?: boolean;
}

interface CanvasSession {
  drawingPaths: DrawingPath[];
  stickyNotes: StickyNote[];
  textBoxes: TextBox[];
  viewOffset: { x: number; y: number };
  zoom: number;
  timestamp: number;
}

const STORAGE_KEY = 'masterji-board-sessions';
const CURRENT_SESSION_KEY = 'masterji-board-current';

const BoardPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // State management
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [drawingPaths, setDrawingPaths] = useState<DrawingPath[]>([]);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [currentTool, setCurrentTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#F97316'); // Orange theme
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [activeToolbarOption, setActiveToolbarOption] = useState('summarise');

  // Query input state
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  // Canvas view state (for unlimited scrolling)
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Navbar state
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  // Selection/dragging state for strokes
  const [isDraggingStroke, setIsDraggingStroke] = useState(false);
  const [dragStrokeIndex, setDragStrokeIndex] = useState<number | null>(null);
  const [dragStartPoint, setDragStartPoint] = useState<Point | null>(null);
  const [originalStrokePoints, setOriginalStrokePoints] = useState<Point[] | null>(null);

  // Load session from local storage
  useEffect(() => {
    const savedSession = localStorage.getItem(CURRENT_SESSION_KEY);
    if (savedSession) {
      try {
        const session: CanvasSession = JSON.parse(savedSession);
        setDrawingPaths(session.drawingPaths || []);
        setStickyNotes(session.stickyNotes || []);
        setTextBoxes(session.textBoxes || []);
        setViewOffset(session.viewOffset || { x: 0, y: 0 });
        setZoom(session.zoom || 1);
      } catch (error) {
        console.error('Error loading session:', error);
      }
    }
  }, []);

  // Save session to local storage
  const saveSession = useCallback(() => {
    const session: CanvasSession = {
      drawingPaths,
      stickyNotes,
      textBoxes,
      viewOffset,
      zoom,
      timestamp: Date.now()
    };
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));

    // Also save to sessions list
    const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const existingIndex = sessions.findIndex((s: CanvasSession) => s.timestamp === session.timestamp);
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    // Keep only last 10 sessions
    const recentSessions = sessions.slice(-10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSessions));
  }, [drawingPaths, stickyNotes, textBoxes, viewOffset, zoom]);

  // Auto-save every 2 seconds
  useEffect(() => {
    const interval = setInterval(saveSession, 2000);
    return () => clearInterval(interval);
  }, [saveSession]);

  // Calculate adaptive TextBox size
  const calculateTextBoxSize = (text: string) => {
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;

    // Base dimensions
    let width = 350;
    let height = 200;

    // Adjust based on content length
    if (wordCount > 50 || charCount > 300) {
      width = 500;
      height = 300;
    } else if (wordCount > 30 || charCount > 200) {
      width = 450;
      height = 250;
    } else if (wordCount > 20 || charCount > 150) {
      width = 400;
      height = 220;
    } else if (wordCount > 10 || charCount > 100) {
      width = 380;
      height = 200;
    }

    // Ensure minimum size
    width = Math.max(width, 300);
    height = Math.max(height, 150);

    return { width, height };
  };

  // Handle query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setStreamingContent('');
    
    // Clear previous streaming cards
    setTextBoxes(prev => prev.filter(tb => !tb.id.startsWith('ai-streaming-') && !tb.id.startsWith('ai-final-')));

    try {
      let accumulatedContent = '';
      
      await sendMessage(query, (chunk: string) => {
        accumulatedContent += chunk;
        setStreamingContent(accumulatedContent);
        
        // Update cards in real-time
        try {
          const sections = parseStreamingContent(accumulatedContent);
          updateStreamingTextBoxes(sections);
        } catch (error) {
          console.error('Error parsing streaming content:', error);
        }
      });

      // Final update with complete content
      const finalSections = parseStreamingContent(accumulatedContent);
      createFinalTextBoxes(finalSections);
      
      setStreamingContent('');
      setQuery('');
    } catch (error) {
      console.error('Error generating cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Parse streaming content into JSON sections
  const parseStreamingContent = (content: string): string[] => {
    try {
      const aiResponse = parseAIResponse(content, query);
      return extractSections(aiResponse);
    } catch (error) {
      console.error('Error parsing streaming content:', error);
      // Fallback to basic text parsing if JSON fails
      const sections = content.split('\n\n').filter(section => section.trim().length > 0);
      return sections.slice(0, 3);
    }
  };

  // Update streaming TextBoxes
  const updateStreamingTextBoxes = (sections: string[]) => {
    let currentX = 100 + viewOffset.x;
    const cardSpacing = 40;

    const newTextBoxes = sections.map((section, index) => {
      const fullText = truncateToWords(cleanWhitespace(section));
      const { width, height } = calculateTextBoxSize(fullText);

      const textBox = {
        id: `ai-streaming-${index}`,
        x: currentX,
        y: 150 + viewOffset.y + (index * 120),
        text: fullText,
        color: '#ffffff',
        width,
        height,
        fontSize: 16,
        fontFamily: 'Inter',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        enableMarkdown: true,
      };

      // Update position for next card
      currentX += width + cardSpacing;

      return textBox;
    });

    setTextBoxes(prev => {
      // Remove existing streaming TextBoxes
      const filtered = prev.filter(tb => !tb.id.startsWith('ai-streaming-'));
      return [...filtered, ...newTextBoxes];
    });
  };

  // Create final TextBoxes from completed content
  const createFinalTextBoxes = (sections: string[]): void => {
    let currentX = 100 + viewOffset.x;
    const cardSpacing = 40;

    const finalTextBoxes = sections.map((section, index) => {
      const fullText = truncateToWords(cleanWhitespace(section));
      const { width, height } = calculateTextBoxSize(fullText);

      const textBox = {
        id: `ai-final-${Date.now()}-${index}`,
        x: currentX,
        y: 150 + viewOffset.y + (index * 120),
        text: fullText,
        color: '#ffffff',
        width,
        height,
        fontSize: 16,
        fontFamily: 'Inter',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        enableMarkdown: true,
      };

      // Update position for next card
      currentX += width + cardSpacing;

      return textBox;
    });

    setTextBoxes(prev => {
      const filtered = prev.filter(tb => !tb.id.startsWith('ai-streaming-') && !tb.id.startsWith('ai-final-'));
      return [...filtered, ...finalTextBoxes];
    });
  };

  // Define redrawCanvas before any usage to avoid TDZ
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transform for zoom and pan
    ctx.save();
    ctx.translate(viewOffset.x, viewOffset.y);
    ctx.scale(zoom, zoom);

    // Redraw all paths
    const paths = drawingPathsRef.current;
    paths.forEach(path => {
      if (path.points.length < 2) return;

      const toolConfig = getToolById(path.tool);
      if (!toolConfig) return;

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Apply tool-specific styles
      ctx.globalCompositeOperation = toolConfig.getCompositeOperation();
      ctx.strokeStyle = toolConfig.getStrokeStyle(path.color);
      ctx.lineWidth = toolConfig.getStrokeWidth(path.strokeWidth);
      ctx.globalAlpha = toolConfig.getAlpha();

      ctx.moveTo(path.points[0].x, path.points[0].y);
      path.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.stroke();
      // Reset drawing state
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    });

    ctx.restore();
  }, [viewOffset, zoom]);

  // Keep latest paths in a ref for stable redraw function
  const drawingPathsRef = useRef<DrawingPath[]>(drawingPaths);
  useEffect(() => {
    drawingPathsRef.current = drawingPaths;
    redrawCanvas();
  }, [drawingPaths, redrawCanvas]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Handle wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prev => Math.max(0.1, Math.min(3, prev * delta)));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - viewOffset.x) / zoom;
    const y = (e.clientY - rect.top - viewOffset.y) / zoom;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Handle panning with middle mouse button or space + click
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
      return;
    }

    const point = getMousePos(e);

    // Select mode: try to pick a stroke to move
    if (currentTool === 'select') {
      const hitIndex = (function hitTestStrokesLocal() {
        for (let i = drawingPaths.length - 1; i >= 0; i--) {
          if (hitTestPath(point, drawingPaths[i])) return i;
        }
        return null;
      })();
      if (hitIndex !== null) {
        setIsDraggingStroke(true);
        setDragStrokeIndex(hitIndex);
        setDragStartPoint(point);
        setOriginalStrokePoints(drawingPaths[hitIndex].points.map(p => ({ x: p.x, y: p.y })));
        return;
      }
      // In select mode but nothing hit: do nothing special
      return;
    }

    if (currentTool === 'sticky-note') {
      // Add sticky note
      const newNote: StickyNote = {
        id: Date.now().toString(),
        x: point.x,
        y: point.y,
        text: '',
        color: '#FFEDD5', // Orange-100 theme
        width: 250,
        height: 180
      };
      setStickyNotes(prev => [...prev, newNote]);
      // Switch back to pen tool after placing a sticky note
      setCurrentTool('pen');
      return;
    }

    if (currentTool === 'text') {
      // Add text box
      const newTextBox: TextBox = {
        id: Date.now().toString(),
        x: point.x,
        y: point.y,
        text: '',
        color: 'transparent', // Default transparent color
        width: 280,
        height: 120,
        fontSize: 16,
        fontFamily: 'Inter',
        isBold: false,
        isItalic: false,
        isUnderline: false
      };
      setTextBoxes(prev => [...prev, newTextBox]);
      // Switch back to pen tool after placing a text box
      setCurrentTool('pen');
      return;
    }

    if (['pen', 'pencil', 'eraser'].includes(currentTool)) {
      setIsDrawing(true);
      setCurrentPath([point]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Handle panning
    if (isPanning) {
      setViewOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    // Dragging a stroke in select mode
    if (currentTool === 'select' && isDraggingStroke && dragStrokeIndex !== null && dragStartPoint && originalStrokePoints) {
      const point = getMousePos(e);
      const deltaX = point.x - dragStartPoint.x;
      const deltaY = point.y - dragStartPoint.y;
      const updatedPoints = originalStrokePoints.map(p => ({ x: p.x + deltaX, y: p.y + deltaY }));
      setDrawingPaths(prev => prev.map((path, idx) => idx === dragStrokeIndex ? { ...path, points: updatedPoints } : path));
      return;
    }

    if (!isDrawing || !['pen', 'pencil', 'eraser'].includes(currentTool)) return;

    const point = getMousePos(e);
    setCurrentPath(prev => [...prev, point]);

    // Draw current stroke
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toolConfig = getToolById(currentTool);
    if (!toolConfig) return;

    ctx.save();
    ctx.translate(viewOffset.x, viewOffset.y);
    ctx.scale(zoom, zoom);

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Apply tool-specific styles for live drawing
    ctx.globalCompositeOperation = toolConfig.getCompositeOperation();
    ctx.strokeStyle = toolConfig.getStrokeStyle(currentColor);
    ctx.lineWidth = toolConfig.getStrokeWidth(strokeWidth);
    ctx.globalAlpha = toolConfig.getAlpha();

    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1];
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    // Reset after incremental draw
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  };

  const handleMouseUp = () => {
    // End panning
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    // End stroke dragging if any
    if (isDraggingStroke) {
      setIsDraggingStroke(false);
      setDragStrokeIndex(null);
      setDragStartPoint(null);
      setOriginalStrokePoints(null);
      return;
    }

    if (!isDrawing) return;

    setIsDrawing(false);

    if (currentPath.length > 1) {
      const toolConfig = getToolById(currentTool);
      if (!toolConfig) return;

      const newPath: DrawingPath = {
        points: [...currentPath],
        color: currentColor,
        strokeWidth: strokeWidth,
        tool: currentTool
      };

      setDrawingPaths(prev => [...prev, newPath]);
    }

    setCurrentPath([]);
  };

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool);
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleStrokeWidthChange = (width: number) => {
    setStrokeWidth(width);
  };

  const handleUndo = () => {
    if (drawingPaths.length > 0) {
      setDrawingPaths(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setDrawingPaths([]);
      setStickyNotes([]);
      setTextBoxes([]);
    }
  };

  const handleStickyNoteUpdate = (id: string, updates: Partial<StickyNote>) => {
    setStickyNotes(prev => prev.map(note =>
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const handleStickyNoteDelete = (id: string) => {
    setStickyNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleTextBoxUpdate = (id: string, updates: Partial<TextBox>) => {
    setTextBoxes(prev => prev.map(textBox =>
      textBox.id === id ? { ...textBox, ...updates } : textBox
    ));
  };

  const handleTextBoxDelete = (id: string) => {
    setTextBoxes(prev => prev.filter(textBox => textBox.id !== id));
  };

  const handleToolbarOptionChange = (option: string) => {
    setActiveToolbarOption(option);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Fixed Dotted Background - never zooms */}
      <DottedBackground />

      {/* Minimized Navbar */}
      <MinimizedNavbar 
        isExpanded={isNavbarExpanded} 
        onToggle={() => setIsNavbarExpanded(!isNavbarExpanded)} 
      />
      
      {/* Subtle selection overlay */}
      {currentTool === 'select' && (
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: 'linear-gradient(0deg, rgba(249,115,22,0.06), rgba(249,115,22,0.06))' }} />
      )}

      {/* Query Input Section */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
        <form onSubmit={handleQuerySubmit} className="flex items-center gap-2">
          <div className="relative">
            <div className="rounded-2xl bg-transparent">
              <div className="rounded-2xl px-4 py-3 backdrop-blur-3xl bg-white/90 shadow-lg border border-orange-200">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type your query to generate cards..."
                  className="w-96 px-4 py-2 bg-transparent border-none outline-none text-orange-900 placeholder-orange-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Canvas Toolbar */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
        <CanvasToolbar
          activeOption={activeToolbarOption}
          onOptionChange={handleToolbarOptionChange}
        />
      </div>

      {/* Canvas Container with transform */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10"
        style={{
          transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 ${currentTool === 'select' ? 'cursor-pointer' : 'cursor-crosshair'} ${isPanning ? 'cursor-grab' : ''}`}
          style={{
            cursor: currentTool === 'eraser' ? getEraserCursor(strokeWidth) : undefined
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
          }}
        />
      </div>

      {/* Sticky Notes - transformed with canvas */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          pointerEvents: currentTool === 'select' ? 'auto' : 'none'
        }}
      >
        {stickyNotes.map(note => (
          <div key={note.id} style={{ pointerEvents: 'auto' }}>
            <StickyNote
              id={note.id}
              x={note.x}
              y={note.y}
              text={note.text}
              color={note.color}
              width={note.width}
              height={note.height}
              selectionMode={currentTool === 'select'}
              onUpdate={handleStickyNoteUpdate}
              onDelete={handleStickyNoteDelete}
            />
          </div>
        ))}
      </div>

      {/* Text Boxes - transformed with canvas */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          pointerEvents: currentTool === 'select' ? 'auto' : 'none'
        }}
      >
        {textBoxes.map(textBox => (
          <div key={textBox.id} style={{ pointerEvents: 'auto' }}>
            <TextBox
              id={textBox.id}
              x={textBox.x}
              y={textBox.y}
              text={textBox.text}
              color={textBox.color}
              width={textBox.width}
              height={textBox.height}
              fontSize={textBox.fontSize}
              fontFamily={textBox.fontFamily}
              isBold={textBox.isBold}
              isItalic={textBox.isItalic}
              isUnderline={textBox.isUnderline}
              enableMarkdown={textBox.enableMarkdown}
              selectionMode={currentTool === 'select'}
              onUpdate={handleTextBoxUpdate}
              onDelete={handleTextBoxDelete}
            />
          </div>
        ))}
      </div>

      {/* Canvas Dock */}
      <CanvasDock
        currentTool={currentTool}
        currentColor={currentColor}
        strokeWidth={strokeWidth}
        onToolChange={handleToolChange}
        onColorChange={handleColorChange}
        onStrokeWidthChange={handleStrokeWidthChange}
        onUndo={handleUndo}
        onClear={handleClear}
        sidebarOpen={!isNavbarExpanded}
      />
    </div>
  );
};

export default BoardPage;

// Helpers
function distancePointToSegment(p: Point, v: Point, w: Point): number {
  const l2 = (w.x - v.x) * (w.x - v.x) + (w.y - v.y) * (w.y - v.y);
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
  return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function hitTestPath(point: Point, path: DrawingPath): boolean {
  const tolerance = Math.max(8, path.strokeWidth + 6);
  for (let i = 0; i < path.points.length - 1; i++) {
    if (distancePointToSegment(point, path.points[i], path.points[i + 1]) <= tolerance) {
      return true;
    }
  }
  return false;
}
