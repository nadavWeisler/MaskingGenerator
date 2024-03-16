// Generate random color from array
function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create shape canvas
function createShapeCanvas(id, className, width, height) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.className = className;
    canvas.width = width;
    canvas.height = height;
    canvas.style.opacity = 1;
    return canvas;
}

// Draw shapes on canvas
function drawShapes(shapeType, shapeCount, ctx, colors, frameWidth, frameHeight, shapeWidth, shapeHeight) {
    for (let i = 0; i < shapeCount; i++) {
        ctx.fillStyle = getRandomColor(colors);
        switch (shapeType) {
            case 'rectangle':
                const rectX = Math.random() * frameWidth;
                const rectY = Math.random() * frameHeight;
                ctx.fillRect(rectX, rectY, shapeWidth, shapeHeight);
                break;
            case 'circle':
                const centerX = Math.random() * frameWidth;
                const centerY = Math.random() * frameHeight;
                const radius = Math.min(shapeWidth, shapeHeight) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 'triangle':
                const startX = Math.random() * frameWidth;
                const startY = Math.random() * frameHeight;
                const angle = Math.random() * (2 * Math.PI); // Random angle in radians
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + shapeWidth, startY);
                ctx.lineTo(startX + (shapeWidth / 2) * Math.cos(angle), startY + shapeHeight * Math.sin(angle));
                ctx.closePath();
                ctx.fill();
                break;
            default:
                break;
        }
    }
}
