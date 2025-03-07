export const trigFuncs = [
    {
        amp: 3,
        freq: 1,
        function: Math.sin,
        color: 'cyan',
        name: 'Y=3sin(θ)'
    },
    {
        amp: 3,
        freq: 4,
        function: Math.cos,
        color: 'magenta',
        name: '3cos4θ'
    },
    {
        amp: -1,
        freq: 2,
        function: Math.sin,
        color: 'yellow',
        name: 'Y=-1sin(2θ)'
    },
    {
        amp: -2,
        freq: 1,
        function: Math.cos,
        color: 'red',
        name: 'Y=-2cosθ'
    },
    {
        amp: 2,
        freq: 4,
        function: Math.sin,
        color: 'green',
        name: '2sin4θ'
    },
    {
        amp: 2,
        freq: 2,
        function: Math.cos,
        color: 'blue',
        name: '2cos2θ'
    },
    {
        amp: -2,
        freq: 2,
        function: Math.sin,
        color: 'brown',
        name: 'Y=-2sin(2θ)'
    },
    {
        amp: -1,
        freq: 2,
        function: Math.cos,
        color: 'orange',
        name: 'Y=-1cos2θ'
    }
];
const padding = 50;
const originX = padding;
// const ampUnit = 100;
export function drawAllWaves(canvas, includeWaves) {
    resetCanvas(canvas);
    for (let i = 0; i < trigFuncs.length; i++) {
        if (!includeWaves.includes(i))
            continue;
        const wave = trigFuncs[i];
        drawWave(canvas, wave.amp, wave.freq, wave.function, wave.color);
    }
    drawWaveAxes(canvas);
}
function resetCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Draw axes on the wave canvas with origin at the center.
function drawWaveAxes(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.beginPath();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    // Horizontal axis
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    // Vertical axis
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvas.height);
    ctx.stroke();
    const xMarkSpacing = (canvas.width - 2 * padding) / 4;
    for (let x = originX; x <= canvas.width - padding; x += xMarkSpacing / 4) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(x, canvas.height / 2, 5, 0, 360);
        ctx.fill();
    }
    const ampUnit = canvas.height / 10;
    // Loop through and place all the axis markers on the y
    for (let y = 0; y < canvas.height / 2; y += ampUnit) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(String(Math.round(y / ampUnit)), originX - 20, canvas.height / 2 - y);
        if (y != 0)
            ctx.fillText(String(Math.round(-y / ampUnit)), originX - 30, canvas.height / 2 + y);
    }
    // Loop through and place all the axis markers on the x
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("1/2 π", originX - 30 + (xMarkSpacing), canvas.height / 2 + 30);
    ctx.fillText("  π", originX - 30 + (2 * xMarkSpacing), canvas.height / 2 + 30);
    ctx.fillText("3/2 π", originX - 30 + (3 * xMarkSpacing), canvas.height / 2 + 30);
    ctx.fillText(" 2π", originX - 30 + (4 * xMarkSpacing), canvas.height / 2 + 30);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("1/8 π", originX - 30 + (xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1/4 π", originX - 30 + (2 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("3/8 π", originX - 30 + (3 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("5/8 π", originX - 30 + (5 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("3/4 π", originX - 30 + (6 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("7/8 π", originX - 30 + (7 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 1/8 π", originX - 30 + (9 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 1/4 π", originX - 30 + (10 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 3/8 π", originX - 30 + (11 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 5/8 π", originX - 30 + (13 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 3/4 π", originX - 30 + (14 * xMarkSpacing / 4), canvas.height / 2 + 20);
    ctx.fillText("1 7/8 π", originX - 30 + (15 * xMarkSpacing / 4), canvas.height / 2 + 20);
}
// Draw the wave curve and the connection line from the origin.
function drawWave(canvas, amplitude, freq, func, color = "cyan") {
    // const phase = parseFloat(phaseSlider.value) + phaseOffset;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    // Draw the wave curve.
    ctx.beginPath();
    ctx.lineWidth = 2;
    const ampUnit = canvas.height / 10;
    // Use a neutral color for the curve.
    ctx.strokeStyle = color;
    for (let x = padding; x < canvas.width - padding; x++) {
        let angle = ((x - padding) / (canvas.width - padding * 2) * freq) * 2 * Math.PI;
        const y = canvas.height / 2 - amplitude * ampUnit * func(angle);
        if (x === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}
