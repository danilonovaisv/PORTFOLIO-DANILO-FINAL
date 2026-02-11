import { spring } from 'motion-dom';
import { clamp } from 'motion-utils';
import sharp from 'sharp';
import { z } from 'zod';

const description = `Generates a visualisation of a Motion spring animation.

The springs can be configured either:
- Time-based with duration and bounce parameters
- Physics-based with stiffness, damping, and mass parameters

These options are mutually exclusive so never set both 'duration' and 'stiffness' or
'damping' and 'mass' for example.

Further, the time-based animations can either be configured to use the visual duration,
where the spring appears to hit its target at the duration, or exact duration, where
the spring fully settles at the duration. 
`;
const args = {
    type: z
        .enum(["time", "physics"])
        .default("time")
        .describe("Type of spring - 'time' for duration/bounce or 'physics' for stiffness/damping/mass"),
    duration: z
        .number()
        .default(0.5)
        .describe("Duration of the animation, in seconds (for time-based springs)"),
    bounce: z
        .number()
        .min(0)
        .max(1)
        .default(0.3)
        .describe("Bounce amount from 0 (no bounce) to 1 (max bounce) - for time-based springs"),
    stiffness: z
        .number()
        .default(1000)
        .describe("Spring stiffness (for physics-based springs)"),
    damping: z
        .number()
        .default(100)
        .describe("Spring damping (for physics-based springs)"),
    mass: z
        .number()
        .default(1)
        .describe("Spring mass (for physics-based springs)"),
    isVisualDuration: z
        .boolean()
        .default(true)
        .describe("Whether to use visual duration calculation for time-based springs. Set to false if you want the 'exact' time a spring will take, rather than its perceptual time."),
    width: z.number().default(500).describe("Width of the visualization"),
    height: z.number().default(300).describe("Height of the visualization"),
};
const baseOptions = {
    keyframes: [0, 1],
    restSpeed: 0.000005,
    restDelta: 0.000001,
};
function buildPath({ width, height, margin = 20 }, { type, stiffness, damping, mass, duration, bounce, isVisualDuration, }) {
    let generator;
    if (type === "time") {
        if (isVisualDuration) {
            const root = (2 * Math.PI) / (duration * 1.2);
            stiffness = root * root;
            damping = 2 * clamp(0.05, 1, 1 - bounce) * Math.sqrt(stiffness);
            generator = spring({ stiffness, damping, mass, ...baseOptions });
        }
        else {
            generator = spring({
                duration: duration * 1000,
                bounce,
                ...baseOptions,
            });
        }
    }
    else {
        generator = spring({ stiffness, damping, mass, ...baseOptions });
    }
    // Calculate drawing area with margins
    const drawingWidth = width - margin * 2;
    const drawingHeight = height - margin * 2;
    // Start from bottom-left corner of the drawing area
    let curve = `M${margin} ${margin + drawingHeight}`;
    let durationMarker = "";
    duration = duration * 1000;
    const step = type === "time" ? 3 : 2;
    for (let i = 0; i <= drawingWidth; i++) {
        const t = i * step;
        if (type === "time" && t > duration && durationMarker === "") {
            durationMarker = `M${margin + i} ${margin} L${margin + i} ${margin + drawingHeight}`;
        }
        // Map the spring value so that:
        // - Spring value 0 is at the bottom
        // - Spring value 1 (target) is at the middle
        // - Oscillations above 1 go toward the top
        const springValue = generator.next(t).value;
        const y = margin + drawingHeight - (springValue * drawingHeight) / 2;
        curve += `L${margin + i} ${y}`;
    }
    return { curve, durationMarker, drawingWidth, drawingHeight };
}
function initVisualiseSpringTool(server) {
    server.registerTool("visualise-spring", {
        description,
        inputSchema: args,
    }, async ({ type, duration, bounce, stiffness, damping, mass, isVisualDuration, width, height, }) => {
        const springOptions = {
            type,
            stiffness,
            damping,
            mass,
            duration,
            bounce,
            isVisualDuration,
        };
        const size = { width, height };
        const margin = 20;
        const { curve, durationMarker, drawingWidth, drawingHeight } = buildPath({ ...size, margin }, springOptions);
        // Generate complete SVG with better styling
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .bg { fill: #12141a; }
      .grid { stroke: #2e3542; stroke-width: 1; opacity: 0.3; }
      .duration-marker { stroke: #2B323D; stroke-width: 2; }
      .spring-curve { stroke: #4FF0B7; stroke-width: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" class="bg"/>
  
  <!-- Grid lines -->
  <g class="grid">
    <!-- Horizontal grid lines -->
    <line x1="${margin}" y1="${margin + drawingHeight * 0.25}" x2="${margin + drawingWidth}" y2="${margin + drawingHeight * 0.25}"/>
    <line x1="${margin}" y1="${margin + drawingHeight * 0.5}" x2="${margin + drawingWidth}" y2="${margin + drawingHeight * 0.5}"/>
    <line x1="${margin}" y1="${margin + drawingHeight * 0.75}" x2="${margin + drawingWidth}" y2="${margin + drawingHeight * 0.75}"/>
    <!-- Vertical grid lines -->
    <line x1="${margin + drawingWidth * 0.25}" y1="${margin}" x2="${margin + drawingWidth * 0.25}" y2="${margin + drawingHeight}"/>
    <line x1="${margin + drawingWidth * 0.5}" y1="${margin}" x2="${margin + drawingWidth * 0.5}" y2="${margin + drawingHeight}"/>
    <line x1="${margin + drawingWidth * 0.75}" y1="${margin}" x2="${margin + drawingWidth * 0.75}" y2="${margin + drawingHeight}"/>
  </g>
  
  <!-- Axes -->
  <line x1="${margin}" y1="${margin}" x2="${margin}" y2="${margin + drawingHeight}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2"/>
  <line x1="${margin}" y1="${margin + drawingHeight}" x2="${margin + drawingWidth}" y2="${margin + drawingHeight}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2"/>
  
  <!-- Duration marker for time-based springs -->
  ${type === "time" && durationMarker
            ? `<path d="${durationMarker}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none"/>`
            : ""}
  
  <!-- Spring curve -->
  <path d="${curve}" class="spring-curve"/>
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
                        
Spring visualization parameters:
- Type: ${type}
- Duration: ${duration}s
- Bounce: ${bounce}
- Stiffness: ${stiffness}
- Damping: ${damping}
- Mass: ${mass}
- Visual Duration: ${isVisualDuration}

SVG markup:
${svg}`,
                    },
                ],
            };
        }
    });
}

export { initVisualiseSpringTool };
