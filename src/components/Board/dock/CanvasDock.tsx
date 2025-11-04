import React, { useMemo, useRef, useState, useEffect } from 'react';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { TiPen } from 'react-icons/ti';
import { LuPencil, LuPalette, LuRotateCcw, LuTrash2, LuStamp, LuGrid3X3, LuEraser, LuChevronDown } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { IoText } from 'react-icons/io5';

interface CanvasDockProps {
  currentTool: string;
  currentColor: string;
  strokeWidth: number;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onUndo: () => void;
  onClear: () => void;
  sidebarOpen?: boolean;
}

const CanvasDock: React.FC<CanvasDockProps> = ({
  currentTool,
  currentColor,
  strokeWidth,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onUndo,
  onClear,
  sidebarOpen = true
}) => {
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overflowRef.current && !overflowRef.current.contains(event.target as Node)) {
        setIsOverflowOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryTools = useMemo(
    () => [
      { id: 'select', icon: HiOutlineCursorClick, label: 'Select' },
      { id: 'pen', icon: TiPen, label: 'Pen' },
      { id: 'pencil', icon: LuPencil, label: 'Pencil' },
      { id: 'eraser', icon: LuEraser, label: 'Eraser' },
      { id: 'sticky-note', icon: MdOutlineEventNote, label: 'Note' },
      { id: 'text', icon: IoText, label: 'Text' }
    ],
    []
  );

  const overflowTools = useMemo(
    () => [
      { id: 'stamp', icon: LuStamp, label: 'Stamp' },
      { id: 'grid', icon: LuGrid3X3, label: 'Grid' }
    ],
    []
  );

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-[margin] duration-500 ease-out ${sidebarOpen ? 'ml-[80px]' : 'ml-[10px]'}`}>
      <div className="relative">
        {/* Outer gradient border for premium matte ring */}
        <div className="rounded-2xl bg-transparent">
          {/* Inner frosted glass panel */}
          <div
            className="rounded-2xl px-6 py-4 backdrop-blur-3xl bg-transparent"
          >
            <div className="flex items-center justify-between gap-8">
              {/* Left Section - Primary Tools */}
              <div className="flex items-center gap-2">
                {primaryTools.map((tool) => {
                  const IconComponent = tool.icon as React.ComponentType<{ size?: number; className?: string }>;
                  const isActive = currentTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => onToolChange(tool.id)}
                      className={`group flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ease-out focus:outline-none ${isActive ? 'bg-black/10 text-black shadow-[0_8px_24px_rgba(0,0,0,0.10)]' : 'text-black hover:bg-black/5'
                        }`}
                      title={tool.label}
                      style={{ transform: isActive ? 'translateY(-1px)' : 'translateY(0px)' }}
                    >
                      <IconComponent size={18} />
                      <span className="text-[11px] leading-none font-medium opacity-80">{tool.label}</span>
                    </button>
                  );
                })}

                {/* Overflow tools */}
                <div className="relative" ref={overflowRef}>
                  <button
                    onClick={() => setIsOverflowOpen((v) => !v)}
                    className="ml-1 flex items-center gap-1 px-3 py-2 rounded-xl text-black hover:bg-black/5 transition-all duration-300"
                    title="More tools"
                  >
                    <LuChevronDown size={16} />
                    <span className="text-[11px] font-medium opacity-80">More</span>
                  </button>

                  {isOverflowOpen && (
                    <div
                      className="absolute bottom-12 left-0 min-w-[160px] rounded-xl p-2 backdrop-blur-3xl bg-transparent"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {overflowTools.map((tool) => {
                          const Icon = tool.icon as React.ComponentType<{ size?: number; className?: string }>;
                          const isActive = currentTool === tool.id;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => {
                                onToolChange(tool.id);
                                setIsOverflowOpen(false);
                              }}
                              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${isActive ? 'bg-black/10 text-black' : 'text-black hover:bg-black/5'
                                }`}
                              title={tool.label}
                            >
                              <Icon size={18} />
                              <span className="text-[10px] leading-none">{tool.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Section - Color and Size */}
              <div className="flex items-center gap-6">
                {/* Color Picker */}
                <div className="flex items-center gap-2">
                  <LuPalette size={18} className="text-black" />
                  <button
                    type="button"
                    aria-label="Pick color"
                    onClick={() => colorInputRef.current?.click()}
                    className="w-[18px] h-[18px] rounded-full border border-black/20 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: currentColor }}
                  />
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={currentColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="sr-only"
                  />
                </div>

                {/* Stroke Width */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-black font-medium">Size</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={strokeWidth}
                    onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                    className="w-24 accent-black"
                  />
                  <span className="text-sm text-black w-6 font-semibold tabular-nums">{strokeWidth}</span>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onUndo}
                  className="flex items-center gap-2 px-3 py-2 text-black hover:bg-black/5 rounded-xl transition-all duration-300"
                  title="Undo"
                >
                  <LuRotateCcw size={16} />
                  <span className="text-sm font-medium">Undo</span>
                </button>
                <button
                  onClick={onClear}
                  className="flex items-center gap-2 px-3 py-2 text-black hover:bg-black/5 rounded-xl transition-all duration-300"
                  title="Clear Canvas"
                >
                  <LuTrash2 size={16} />
                  <span className="text-sm font-medium">Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasDock;

