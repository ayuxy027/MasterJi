import { Tool } from './types';

export const PenTool: Tool = {
    id: 'pen',
    name: 'Pen',
    cursor: 'crosshair',
    getStrokeWidth: (baseWidth: number) => Math.max(1, baseWidth * 0.5),
    getStrokeStyle: (color: string) => color,
    getCompositeOperation: () => 'source-over' as GlobalCompositeOperation,
    getAlpha: () => 0.7
};

