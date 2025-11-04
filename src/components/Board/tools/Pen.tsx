import { Tool } from './types';

export const PenTool: Tool = {
    id: 'pen',
    name: 'Pen',
    cursor: 'crosshair',
    getStrokeWidth: (baseWidth: number) => baseWidth,
    getStrokeStyle: (color: string) => color,
    getCompositeOperation: () => 'source-over' as GlobalCompositeOperation,
    getAlpha: () => 1
};

