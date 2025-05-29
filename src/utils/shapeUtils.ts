import JSZip from "jszip";

export const mmToPx = 3.7795275590551;

export function getRandomColor(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
}

export function createShapeCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export function drawShapes(
    ctx: CanvasRenderingContext2D,
    shapeType: string,
    count: number,
    colors: string[],
    frameWidth: number,
    frameHeight: number,
    shapeWidth: number,
    shapeHeight: number
) {
    for (let i = 0; i < count; i++) {
        ctx.fillStyle = getRandomColor(colors);
        switch (shapeType) {
            case 'rectangle':
                ctx.fillRect(Math.random() * frameWidth, Math.random() * frameHeight, shapeWidth, shapeHeight);
                break;
            case 'circle':
                { const radius = shapeWidth / 2;
                ctx.beginPath();
                ctx.arc(Math.random() * frameWidth, Math.random() * frameHeight, radius, 0, 2 * Math.PI);
                ctx.fill();
                break; }
            case 'triangle':
                { const startX = Math.random() * frameWidth;
                const startY = Math.random() * frameHeight;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + shapeWidth, startY);
                ctx.lineTo(startX + shapeWidth / 2, startY - shapeHeight);
                ctx.closePath();
                ctx.fill();
                break; }
        }
    }
}

export async function generateZip(
    shapeType: string,
    frameCount: number,
    shapeCount: number,
    frameWidth: number,
    frameHeight: number,
    shapeWidth: number,
    shapeHeight: number,
    colors: string[]
): Promise<Blob> {
    const zip = new JSZip();
    const folder = zip.folder('shapes')!;

    for (let i = 0; i < frameCount; i++) {
        const canvas = createShapeCanvas(frameWidth, frameHeight);
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'darkgray';
        ctx.fillRect(0, 0, frameWidth, frameHeight);
        drawShapes(ctx, shapeType, shapeCount, colors, frameWidth, frameHeight, shapeWidth, shapeHeight);
        const base64 = canvas.toDataURL('image/png').split(',')[1];
        folder.file(`mask${i}.png`, base64, { base64: true });
    }

    return zip.generateAsync({ type: 'blob' });
}
