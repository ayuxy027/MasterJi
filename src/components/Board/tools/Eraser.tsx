import { Tool } from './types';

export const EraserTool: Tool = {
    id: 'eraser',
    name: 'Eraser',
    getStrokeWidth: (baseWidth: number) => {
        const cursorSize = Math.max(20, baseWidth * 2);
        return cursorSize; // Use the full cursor size as stroke width for complete coverage
    },
    getStrokeStyle: () => 'rgba(0,0,0,1)',
    getCompositeOperation: () => 'destination-out' as GlobalCompositeOperation,
    getAlpha: () => 1
};

// Dynamic eraser cursor that matches stroke width
export const getEraserCursor = (strokeWidth: number) => {
    const size = Math.max(20, strokeWidth * 2); // Minimum 20px, scales with stroke width
    const radius = Math.floor(size / 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius - 1}" fill="none" stroke="black" stroke-width="2"/></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") ${radius} ${radius}, crosshair`;
};

