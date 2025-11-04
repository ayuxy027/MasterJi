import { Tool } from './types';

export const PencilTool: Tool = {
    id: 'pencil',
    name: 'Pencil',
    cursor: 'crosshair',
    getStrokeWidth: (baseWidth: number) => Math.max(1, baseWidth * 0.5),
    getStrokeStyle: (color: string) => color,
    getCompositeOperation: () => 'source-over' as GlobalCompositeOperation,
    getAlpha: () => 0.7
};

