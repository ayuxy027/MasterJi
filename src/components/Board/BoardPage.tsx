import React, { useRef, useState, useEffect, useCallback } from 'react';
import { DottedBackground, CanvasDock, StickyNote, TextBox } from './index';
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

const BoardPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Ref to track last drawing point for smooth live drawing
  const lastDrawingPointRef = useRef<Point | null>(null);

  // Query input state
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Canvas view state (for unlimited scrolling)
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [zoom] = useState(1); // Fixed zoom for now
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Navbar state
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  // Selection/dragging state for strokes
  const [isDraggingStroke, setIsDraggingStroke] = useState(false);
  const [dragStrokeIndex, setDragStrokeIndex] = useState<number | null>(null);
  const [dragStartPoint, setDragStartPoint] = useState<Point | null>(null);
  const [originalStrokePoints, setOriginalStrokePoints] = useState<Point[] | null>(null);


  // Calculate word count
  const getWordCount = useCallback((text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, []);

  // Calculate adaptive TextBox size
  const calculateTextBoxSize = useCallback((text: string) => {
    const wordCount = getWordCount(text);
    const charCount = text.length;

    // Base dimensions
    let width = 300;
    let height = 180;

    // Adjust based on content length
    if (wordCount > 50 || charCount > 300) {
      width = 420;
      height = 260;
    } else if (wordCount > 30 || charCount > 200) {
      width = 380;
      height = 220;
    } else if (wordCount > 20 || charCount > 150) {
      width = 340;
      height = 200;
    } else if (wordCount > 10 || charCount > 100) {
      width = 320;
      height = 180;
    }

    // Ensure minimum size
    width = Math.max(width, 280);
    height = Math.max(height, 160);

    return { width, height };
  }, [getWordCount]);

  // Handle query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    // Clear previous streaming cards
    setTextBoxes(prev => prev.filter(tb => !tb.id.startsWith('ai-streaming-') && !tb.id.startsWith('ai-final-')));

    try {
      let accumulatedContent = '';

      await sendMessage(query, (chunk: string) => {
        accumulatedContent += chunk;

        // Update cards in real-time
        try {
          const sections = parseStreamingContent(accumulatedContent, query);
          updateStreamingTextBoxes(sections);
        } catch (error) {
          console.error('Error parsing streaming content:', error);
        }
      });

      // Final update with complete content
      const finalSections = parseStreamingContent(accumulatedContent, query);
      createFinalTextBoxes(finalSections);

      setQuery('');
    } catch (error) {
      console.error('Error generating cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Parse streaming content into JSON sections
  const parseStreamingContent = useCallback((content: string, userQuery: string): string[] => {
    try {
      const aiResponse = parseAIResponse(content, userQuery);
      return extractSections(aiResponse);
    } catch (error) {
      console.error('Error parsing streaming content:', error);
      // Fallback to basic text parsing if JSON fails
      const sections = content.split('\n\n').filter(section => section.trim().length > 0);
      return sections.slice(0, 3);
    }
  }, []);

  // Update streaming TextBoxes - place in center of viewport (canvas coordinates)
  const updateStreamingTextBoxes = useCallback((sections: string[]) => {
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const canvasCenterX = (screenCenterX - viewOffset.x) / zoom;
    const canvasCenterY = (screenCenterY - viewOffset.y) / zoom;

    const startX = canvasCenterX - 300;
    const startY = canvasCenterY - 150;
    let currentX = startX;
    const cardSpacing = 40;

    const newTextBoxes = sections.map((section, index) => {
      const fullText = truncateToWords(cleanWhitespace(section));
      const { width, height } = calculateTextBoxSize(fullText);

      return {
        id: `ai-streaming-${index}`,
        x: currentX,
        y: startY + (index * (height + cardSpacing)),
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
    }).map((textBox, index, arr) => {
      if (index > 0) {
        textBox.x = arr[index - 1].x + arr[index - 1].width + cardSpacing;
      }
      return textBox;
    });

    setTextBoxes(prev => {
      const filtered = prev.filter(tb => !tb.id.startsWith('ai-streaming-'));
      return [...filtered, ...newTextBoxes];
    });
  }, [viewOffset, zoom, calculateTextBoxSize]);

  // Create final TextBoxes from completed content - place in center of viewport
  const createFinalTextBoxes = useCallback((sections: string[]): void => {
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const canvasCenterX = (screenCenterX - viewOffset.x) / zoom;
    const canvasCenterY = (screenCenterY - viewOffset.y) / zoom;

    const startX = canvasCenterX - 300;
    const startY = canvasCenterY - 150;
    const cardSpacing = 40;

    const finalTextBoxes = sections.map((section, index) => {
      const fullText = truncateToWords(cleanWhitespace(section));
      const { width, height } = calculateTextBoxSize(fullText);

      return {
        id: `ai-final-${Date.now()}-${index}`,
        x: startX,
        y: startY + (index * (height + cardSpacing)),
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
    }).map((textBox, index, arr) => {
      if (index > 0) {
        textBox.x = arr[index - 1].x + arr[index - 1].width + cardSpacing;
      }
      return textBox;
    });

    setTextBoxes(prev => {
      const filtered = prev.filter(tb => !tb.id.startsWith('ai-streaming-') && !tb.id.startsWith('ai-final-'));
      return [...filtered, ...finalTextBoxes];
    });
  }, [viewOffset, zoom, calculateTextBoxSize]);

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
    drawingPaths.forEach(path => {
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
  }, [drawingPaths, viewOffset, zoom]);

  // Initialize canvas and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redrawCanvas]);

  // Redraw when paths change
  useEffect(() => {
    redrawCanvas();
  }, [drawingPaths, redrawCanvas]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    // Get canvas bounding rect (already accounts for container transform visually)
    const rect = canvas.getBoundingClientRect();
    // Convert screen coordinates to canvas coordinates
    // The container has CSS transform, so rect already accounts for viewOffset
    // We just need to convert from screen space (with zoom) to canvas space
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Handle panning with middle mouse button or shift + click
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
      return;
    }

    const point = getMousePos(e);

    // Select mode: try to pick a stroke to move, or pan if empty space
    if (currentTool === 'select') {
      for (let i = drawingPaths.length - 1; i >= 0; i--) {
        if (hitTestPath(point, drawingPaths[i])) {
          setIsDraggingStroke(true);
          setDragStrokeIndex(i);
          setDragStartPoint(point);
          setOriginalStrokePoints(drawingPaths[i].points.map(p => ({ x: p.x, y: p.y })));
          return;
        }
      }
      // In select mode but nothing hit - enable panning
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
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
        width: 220,
        height: 160
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
        width: 240,
        height: 100,
        fontSize: 14,
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

    if (['pen', 'eraser'].includes(currentTool)) {
      setIsDrawing(true);
      setCurrentPath([point]);
      lastDrawingPointRef.current = point;
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
      setDrawingPaths(prev =>
        prev.map((path, idx) =>
          idx === dragStrokeIndex ? { ...path, points: updatedPoints } : path
        )
      );
      redrawCanvas(); // Redraw after moving the stroke
      return;
    }

    if (!isDrawing || !['pen', 'eraser'].includes(currentTool)) return;

    const point = getMousePos(e);
    const lastPoint = lastDrawingPointRef.current;

    // Update state for path tracking
    setCurrentPath(prev => [...prev, point]);
    lastDrawingPointRef.current = point;

    // Draw current stroke smoothly
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toolConfig = getToolById(currentTool);
    if (!toolConfig) return;

    // Apply transform to convert canvas-space coordinates to screen-space for drawing
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

    // Draw from last point to current point for smooth continuous line
    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    } else {
      // First point - draw a small dot
      ctx.arc(point.x, point.y, toolConfig.getStrokeWidth(strokeWidth) / 2, 0, Math.PI * 2);
      ctx.fill();
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
      redrawCanvas(); // Redraw after finishing stroke movement
      return;
    }

    if (!isDrawing) return;

    setIsDrawing(false);
    lastDrawingPointRef.current = null;

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
      setCurrentPath([]);
      // Redraw canvas to ensure final path is rendered correctly
      redrawCanvas();
    } else if (currentPath.length === 1) {
      // Single point - clear it
      setCurrentPath([]);
      redrawCanvas();
    } else {
      setCurrentPath([]);
    }
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
      redrawCanvas();
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setDrawingPaths([]);
      setStickyNotes([]);
      setTextBoxes([]);
      redrawCanvas();
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
          style={{ background: 'linear-gradient(0deg, rgba(59,130,246,0.06), rgba(59,130,246,0.06))' }} />
      )}


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
          className={`absolute inset-0 ${currentTool === 'select' ? 'cursor-pointer' : 'cursor-crosshair'} ${isPanning ? 'cursor-grabbing' : ''}`}
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
          transformOrigin: '0 0'
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
          transformOrigin: '0 0'
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
        query={query}
        setQuery={setQuery}
        onQuerySubmit={handleQuerySubmit}
        isLoading={isLoading}
        activeToolbarOption={activeToolbarOption}
        onToolbarOptionChange={handleToolbarOptionChange}
      />
    </div>
  );
};

export default BoardPage;

// Helper for hit testing paths
function hitTestPath(point: Point, path: DrawingPath): boolean {
  const tolerance = Math.max(8, path.strokeWidth + 6);
  for (let i = 0; i < path.points.length - 1; i++) {
    const distance = distancePointToSegment(point, path.points[i], path.points[i + 1]);
    if (distance <= tolerance) {
      return true;
    }
  }
  return false;
}

// Helper to calculate distance from point to line segment
function distancePointToSegment(p: Point, v: Point, w: Point): number {
  const l2 = (w.x - v.x) * (w.x - v.x) + (w.y - v.y) * (w.y - v.y);
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
  return Math.hypot(p.x - proj.x, p.y - proj.y);
}