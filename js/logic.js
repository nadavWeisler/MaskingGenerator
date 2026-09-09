const PALETTE = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
const BACKGROUND = 'darkgray';
const MAX_SEED = 0xFFFFFFFF;

function createRng(seed) {
    let a = seed >>> 0;
    return function rng() {
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function sampleSeed() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        return crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return Math.floor(Math.random() * (MAX_SEED + 1));
}

function randomInt(rng, min, maxInclusive) {
    const t = rng();
    if (maxInclusive < min) {
        return min;
    }
    const span = maxInclusive - min + 1;
    return min + Math.min(span - 1, Math.floor(t * span));
}

function getRandomColor(colors, rng) {
    return colors[Math.floor(rng() * colors.length)];
}

function createShapeCanvas(id, className, width, height) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.className = className;
    canvas.width = width;
    canvas.height = height;
    canvas.style.opacity = 1;
    return canvas;
}

function drawShapes(shapeType, shapeCount, ctx, colors, frameWidth, frameHeight, shapeWidth, shapeHeight, rng) {
    for (let i = 0; i < shapeCount; i++) {
        ctx.fillStyle = getRandomColor(colors, rng);
        switch (shapeType) {
            case 'rectangle': {
                const rectX = randomInt(rng, 0, Math.floor(frameWidth - shapeWidth));
                const rectY = randomInt(rng, 0, Math.floor(frameHeight - shapeHeight));
                ctx.fillRect(rectX, rectY, shapeWidth, shapeHeight);
                break;
            }
            case 'circle': {
                const radius = Math.min(shapeWidth, shapeHeight) / 2;
                const centerX = randomInt(rng, Math.ceil(radius), Math.floor(frameWidth - radius));
                const centerY = randomInt(rng, Math.ceil(radius), Math.floor(frameHeight - radius));
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fill();
                break;
            }
            case 'triangle': {
                const angle = rng() * (2 * Math.PI);
                const x3 = (shapeWidth / 2) * Math.cos(angle);
                const y3 = shapeHeight * Math.sin(angle);
                const minX = Math.min(0, shapeWidth, x3);
                const maxX = Math.max(0, shapeWidth, x3);
                const minY = Math.min(0, y3);
                const maxY = Math.max(0, y3);
                const boxW = maxX - minX;
                const boxH = maxY - minY;
                const startX = randomInt(rng, 0, Math.floor(frameWidth - boxW)) - minX;
                const startY = randomInt(rng, 0, Math.floor(frameHeight - boxH)) - minY;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + shapeWidth, startY);
                ctx.lineTo(startX + x3, startY + y3);
                ctx.closePath();
                ctx.fill();
                break;
            }
            default:
                break;
        }
    }
}

function parsePositiveNumber(raw, label, errors) {
    if (raw === '' || raw == null) {
        errors.push(label + ' is required.');
        return NaN;
    }
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) {
        errors.push(label + ' must be a number greater than 0.');
        return NaN;
    }
    return n;
}

function parsePositiveInt(raw, label, errors) {
    const n = parsePositiveNumber(raw, label, errors);
    if (!Number.isFinite(n)) {
        return NaN;
    }
    if (!Number.isInteger(n)) {
        errors.push(label + ' must be a whole number.');
        return NaN;
    }
    return n;
}

function resolveSeed(raw) {
    if (raw === '' || raw == null) {
        const seed = sampleSeed();
        return { seed: seed, sampled: true };
    }
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 0 || n > MAX_SEED) {
        return { error: 'Seed must be an integer from 0 to ' + MAX_SEED + '.' };
    }
    return { seed: n, sampled: false };
}

function shapeFitsFrame(shapeWidthPx, shapeHeightPx, frameWidthPx, frameHeightPx) {
    return shapeWidthPx <= frameWidthPx && shapeHeightPx <= frameHeightPx;
}

function readShapeSizes(shapeType, errors) {
    const widthEl = document.getElementById('shapeWidth');
    const heightEl = document.getElementById('shapeHeight');
    if (shapeType === 'rectangle' || shapeType === 'triangle') {
        const shapeWidthPx = parsePositiveNumber(widthEl ? widthEl.value : '', 'Shape width', errors);
        const shapeHeightPx = parsePositiveNumber(heightEl ? heightEl.value : '', 'Shape height', errors);
        return { shapeWidthPx: shapeWidthPx, shapeHeightPx: shapeHeightPx };
    }
    if (shapeType === 'circle') {
        const diameter = parsePositiveNumber(widthEl ? widthEl.value : '', 'Circle diameter', errors);
        return { shapeWidthPx: diameter, shapeHeightPx: diameter };
    }
    errors.push('Choose a shape type.');
    return { shapeWidthPx: NaN, shapeHeightPx: NaN };
}

function buildParams(seed, shapeType, frameCount, shapeCount, frameWidthPx, frameHeightPx, shapeWidthPx, shapeHeightPx) {
    return {
        seed: seed,
        shapeType: shapeType,
        frameCount: frameCount,
        shapeCount: shapeCount,
        frameWidthPx: frameWidthPx,
        frameHeightPx: frameHeightPx,
        shapeWidthPx: shapeWidthPx,
        shapeHeightPx: shapeHeightPx,
        palette: PALETTE.slice(),
        bg: BACKGROUND
    };
}

function showParams(params) {
    const readout = document.getElementById('paramsReadout');
    if (readout) {
        readout.textContent = JSON.stringify(params, null, 2);
    }
}

function validateAndGenerate() {
    const form = document.getElementById('shapeForm');
    const errorBox = document.getElementById('errorMessages');
    errorBox.textContent = '';

    const errors = [];
    const shapeType = form.shapeType.value;
    if (!shapeType) {
        errors.push('Choose a shape type.');
    }
    const frameCount = parsePositiveInt(form.frameCount.value, 'Number of frames', errors);
    const shapeCount = parsePositiveInt(form.shapeCount.value, 'Number of shapes', errors);
    const frameWidthPx = parsePositiveNumber(form.frameWidth.value, 'Frame width', errors);
    const frameHeightPx = parsePositiveNumber(form.frameHeight.value, 'Frame height', errors);
    const sizes = shapeType
        ? readShapeSizes(shapeType, errors)
        : { shapeWidthPx: NaN, shapeHeightPx: NaN };
    if (
        Number.isFinite(sizes.shapeWidthPx) &&
        Number.isFinite(sizes.shapeHeightPx) &&
        Number.isFinite(frameWidthPx) &&
        Number.isFinite(frameHeightPx) &&
        !shapeFitsFrame(sizes.shapeWidthPx, sizes.shapeHeightPx, frameWidthPx, frameHeightPx)
    ) {
        errors.push('Shape must fit the frame.');
    }
    const seedResult = resolveSeed(form.seed.value);

    if (seedResult.error) {
        errors.push(seedResult.error);
    }

    if (errors.length) {
        errorBox.textContent = errors.join(' ');
        return;
    }

    const seed = seedResult.seed;
    form.seed.value = String(seed);

    const params = buildParams(
        seed,
        shapeType,
        frameCount,
        shapeCount,
        frameWidthPx,
        frameHeightPx,
        sizes.shapeWidthPx,
        sizes.shapeHeightPx
    );
    showParams(params);

    const rng = createRng(seed);
    const zip = new JSZip();
    const folder = zip.folder('shapes');

    for (let j = 0; j < frameCount; j++) {
        const canvas = createShapeCanvas('shapeCanvas' + j, 'shapes', frameWidthPx, frameHeightPx);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(0, 0, frameWidthPx, frameHeightPx);
        drawShapes(
            shapeType,
            shapeCount,
            ctx,
            PALETTE,
            frameWidthPx,
            frameHeightPx,
            sizes.shapeWidthPx,
            sizes.shapeHeightPx,
            rng
        );
        const canvasDataUrl = canvas.toDataURL('image/png');
        folder.file('mask' + j + '.png', canvasDataUrl.split('base64,')[1], { base64: true });
    }

    folder.file('params.json', JSON.stringify(params, null, 2));

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(content);
        downloadLink.download = 'shapes.zip';
        downloadLink.click();
    });
}
