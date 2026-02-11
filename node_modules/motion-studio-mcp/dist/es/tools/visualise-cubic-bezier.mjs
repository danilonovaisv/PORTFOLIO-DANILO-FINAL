import { cubicBezier } from 'motion-utils';
import sharp from 'sharp';
import { z } from 'zod';

const description = `Generates a visualisation of a cubic-bezier easing curve using SVG path data.
The curve is defined by two control points (x1, y1, x2, y2) where the start point is (0,0) and end point is (1,1).
`;
const args = {
    x1: z
        .number()
        .min(0)
        .max(1)
        .default(0.25)
        .describe("X coordinate of the first control point"),
    y1: z
        .number()
        .default(0.1)
        .describe("Y coordinate of the first control point"),
    x2: z
        .number()
        .min(0)
        .max(1)
        .default(0.25)
        .describe("X coordinate of the second control point"),
    y2: z
        .number()
        .default(1)
        .describe("Y coordinate of the second control point"),
    width: z.number().default(500).describe("Width of the visualization"),
    height: z.number().default(500).describe("Height of the visualization"),
};
function buildPath({ width, height, margin = 20 }, { x1, y1, x2, y2 }) {
    const bezier = cubicBezier(x1, y1, x2, y2);
    // Calculate the square drawing area size (minimum of available width/height)
    const availableWidth = width - margin * 2;
    const availableHeight = height - margin * 2;
    const squareSize = Math.min(availableWidth, availableHeight);
    // Center the square within the canvas
    const startX = margin + (availableWidth - squareSize) / 2;
    const startY = margin + (availableHeight - squareSize) / 2;
    let curve = `M${startX} ${startY + squareSize}`;
    // Generate the curve points using the square area
    for (let i = 0; i <= squareSize; i++) {
        const t = i / squareSize;
        const progress = bezier(t);
        const x = startX + i;
        const y = startY + squareSize - progress * squareSize;
        curve += `L${x} ${y}`;
    }
    // Add control point visualization using the square area
    const controlPoints = `
        M${startX + x1 * squareSize} ${startY + squareSize - y1 * squareSize}
        L${startX} ${startY + squareSize}
        M${startX + x1 * squareSize} ${startY + squareSize - y1 * squareSize}
        L${startX + x2 * squareSize} ${startY + squareSize - y2 * squareSize}
        L${startX + squareSize} ${startY}
    `;
    return { curve, controlPoints, squareSize, startX, startY };
}
function initVisualiseCubicBezierTool(server) {
    server.registerTool("visualise-cubic-bezier", {
        description,
        inputSchema: args,
    }, async ({ x1, y1, x2, y2, width, height }) => {
        const bezierOptions = {
            x1,
            y1,
            x2,
            y2,
        };
        const margin = 20;
        // Make the entire canvas square using the minimum dimension
        const canvasSize = Math.min(width, height);
        const { curve } = buildPath({ width: canvasSize, height: canvasSize, margin }, bezierOptions);
        // Generate complete SVG with better styling
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
  <defs>
    <style>
      .bg { fill: #12141a; }
      .grid { stroke: #2e3542; stroke-width: 1; opacity: 0.3; }
      .control-lines { stroke: #6366f1; stroke-width: 2; opacity: 0.6; stroke-dasharray: 5,5; fill: none; }
      .control-points { fill: #6366f1; }
      .bezier-curve { stroke: #4FF0B7; stroke-width: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; }
      .axis-labels { fill: #9ca3af; font-family: monospace; font-size: 12px; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" class="bg"/>
  
  <!-- Grid lines -->
  <g class="grid">
    <!-- Horizontal grid lines -->
    <line x1="${margin}" y1="${margin + (canvasSize - margin * 2) * 0.25}" x2="${canvasSize - margin}" y2="${margin + (canvasSize - margin * 2) * 0.25}"/>
    <line x1="${margin}" y1="${margin + (canvasSize - margin * 2) * 0.5}" x2="${canvasSize - margin}" y2="${margin + (canvasSize - margin * 2) * 0.5}"/>
    <line x1="${margin}" y1="${margin + (canvasSize - margin * 2) * 0.75}" x2="${canvasSize - margin}" y2="${margin + (canvasSize - margin * 2) * 0.75}"/>
    <!-- Vertical grid lines -->
    <line x1="${margin + (canvasSize - margin * 2) * 0.25}" y1="${margin}" x2="${margin + (canvasSize - margin * 2) * 0.25}" y2="${canvasSize - margin}"/>
    <line x1="${margin + (canvasSize - margin * 2) * 0.5}" y1="${margin}" x2="${margin + (canvasSize - margin * 2) * 0.5}" y2="${canvasSize - margin}"/>
    <line x1="${margin + (canvasSize - margin * 2) * 0.75}" y1="${margin}" x2="${margin + (canvasSize - margin * 2) * 0.75}" y2="${canvasSize - margin}"/>
  </g>
  
  <!-- Axes -->
  <line x1="${margin}" y1="${margin}" x2="${margin}" y2="${canvasSize - margin}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2"/>
  <line x1="${margin}" y1="${canvasSize - margin}" x2="${canvasSize - margin}" y2="${canvasSize - margin}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2"/>
  
  
  <!-- Bezier curve -->
  <path d="${curve}" class="bezier-curve"/>
</svg>`;
        // Convert SVG to PNG using Sharp
        try {
            const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
            const base64Data = pngBuffer.toString("base64");
            return {
                content: [
                    {
                        type: "image",
                        data: base64Data,
                        mimeType: "image/png",
                    },
                ],
            };
        }
        catch (error) {
            // Fallback to text if image generation fails
            return {
                content: [
                    {
                        type: "text",
                        text: `Error generating image: ${error}
                        
Cubic-bezier visualization parameters:
- Control Point 1: (${x1}, ${y1})
- Control Point 2: (${x2}, ${y2})
- CSS: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})

SVG markup:
${svg}`,
                    },
                ],
            };
        }
    });
}

export { initVisualiseCubicBezierTool };
