export * from './types';
export * from './Pen';
export * from './Pencil';
export * from './Eraser';
export * from './Select';
export { default as TextSettings } from './TextSettings';

import { PenTool } from './Pen';
import { PencilTool } from './Pencil';
import { EraserTool } from './Eraser';
import { SelectTool } from './Select';
import { Tool } from './types';

export const tools: Tool[] = [
  PenTool,
  PencilTool,
  EraserTool,
  SelectTool
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

