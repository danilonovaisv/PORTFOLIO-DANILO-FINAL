(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/_danilonov_portfolio/src/hooks/useWebGLSupport.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWebGLSupport",
    ()=>useWebGLSupport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const checkWebGLSupport = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const canvas = document.createElement('canvas');
        return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch  {
        return false;
    }
};
const useWebGLSupport = ()=>{
    _s();
    const [supportsWebGL, setSupportsWebGL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebGLSupport.useEffect": ()=>{
            setSupportsWebGL(checkWebGLSupport());
        }
    }["useWebGLSupport.useEffect"], []);
    return supportsWebGL;
};
_s(useWebGLSupport, "2hZdEQn1XfDyqn6vPwX8iTjf37w=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefersReducedMotion",
    ()=>usePrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function usePrefersReducedMotion() {
    _s();
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrefersReducedMotion.useEffect": ()=>{
            // Verifica se window.matchMedia está disponível (SSR e test safety)
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.matchMedia) {
                return;
            }
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setPrefersReducedMotion(mediaQuery.matches);
            const handler = {
                "usePrefersReducedMotion.useEffect.handler": (event)=>{
                    setPrefersReducedMotion(event.matches);
                }
            }["usePrefersReducedMotion.useEffect.handler"];
            mediaQuery.addEventListener('change', handler);
            return ({
                "usePrefersReducedMotion.useEffect": ()=>mediaQuery.removeEventListener('change', handler)
            })["usePrefersReducedMotion.useEffect"];
        }
    }["usePrefersReducedMotion.useEffect"], []);
    return prefersReducedMotion;
}
_s(usePrefersReducedMotion, "c2o+PeDo1dLruq/wbnW+Z6a6rIY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/hooks/usePerformanceAdaptive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePerformanceAdaptive",
    ()=>usePerformanceAdaptive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function usePerformanceAdaptive() {
    _s();
    const [quality, setQuality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('high');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePerformanceAdaptive.useEffect": ()=>{
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
            const hasLowMemory = 'deviceMemory' in navigator && navigator.deviceMemory < 4;
            if (isMobile || isLowEnd || hasLowMemory) {
                setQuality('low');
                return;
            }
            if (window.devicePixelRatio > 2) {
                setQuality('medium');
                return;
            }
            let frames = 0;
            let lastTime = performance.now();
            let rafId;
            const checkFPS = {
                "usePerformanceAdaptive.useEffect.checkFPS": ()=>{
                    frames++;
                    const now = performance.now();
                    if (now >= lastTime + 1000) {
                        const fps = Math.round(frames * 1000 / (now - lastTime));
                        if (fps < 30 && quality !== 'low') {
                            setQuality({
                                "usePerformanceAdaptive.useEffect.checkFPS": (prev)=>prev === 'high' ? 'medium' : 'low'
                            }["usePerformanceAdaptive.useEffect.checkFPS"]);
                        }
                        frames = 0;
                        lastTime = now;
                    }
                    rafId = requestAnimationFrame(checkFPS);
                }
            }["usePerformanceAdaptive.useEffect.checkFPS"];
            rafId = requestAnimationFrame(checkFPS);
            return ({
                "usePerformanceAdaptive.useEffect": ()=>cancelAnimationFrame(rafId)
            })["usePerformanceAdaptive.useEffect"];
        }
    }["usePerformanceAdaptive.useEffect"], [
        quality
    ]);
    const configs = {
        high: {
            quality: 'high',
            fireflyCount: 20,
            particleCount: 50,
            enablePostProcessing: true,
            pixelRatio: Math.min(window.devicePixelRatio, 2)
        },
        medium: {
            quality: 'medium',
            fireflyCount: 12,
            particleCount: 25,
            enablePostProcessing: false,
            pixelRatio: 1.5
        },
        low: {
            quality: 'low',
            fireflyCount: 6,
            particleCount: 10,
            enablePostProcessing: false,
            pixelRatio: 1
        }
    };
    return configs[quality];
}
_s(usePerformanceAdaptive, "7WgU96HD4BeqThgGgTi1RzT55VA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/config/ghostConfig.ts
// Paleta de cores fluorescentes
__turbopack_context__.s([
    "EXTENDED_FLUORESCENT_COLORS",
    ()=>EXTENDED_FLUORESCENT_COLORS,
    "FLUORESCENT_COLORS",
    ()=>FLUORESCENT_COLORS,
    "GHOST_CONFIG",
    ()=>GHOST_CONFIG,
    "getConfigColorHex",
    ()=>getConfigColorHex,
    "resolveConfigColor",
    ()=>resolveConfigColor,
    "resolveFluorescentColor",
    ()=>resolveFluorescentColor
]);
const FLUORESCENT_COLORS = {
    cyan: '#00ffff',
    lime: '#00ff00',
    magenta: '#ff00ff',
    yellow: '#ffff00',
    orange: '#ff4500',
    pink: '#ff1493',
    purple: '#9400d3',
    blue: '#0080ff',
    green: '#00ff80',
    red: '#ff0040',
    teal: '#00ffaa',
    violet: '#8a2be2'
};
const EXTENDED_FLUORESCENT_COLORS = {
    ...FLUORESCENT_COLORS,
    // Cores personalizadas do Ghost
    deepSpace: '#0f2027',
    neonCyan: '#50e3c2',
    violetGlow: '#8a2be2',
    midnightBlue: '#040013',
    electricBlue: '#0080ff',
    voidSky: '#020112',
    ghostBlue: '#0048ff',
    darkVoid: '#01010f',
    fogBlue: '#051f51'
};
function resolveFluorescentColor(color) {
    return FLUORESCENT_COLORS[color];
}
function resolveConfigColor(colorName) {
    if (!colorName || typeof colorName !== 'string') {
        console.warn('resolveConfigColor received invalid color:', colorName);
        return '#00ffff'; // Safe fallback
    }
    // Tenta a paleta extendida primeiro
    const extendedColor = EXTENDED_FLUORESCENT_COLORS[colorName];
    if (extendedColor !== undefined) {
        return extendedColor;
    }
    // Retorna o próprio valor se já for hex
    if (colorName.startsWith('#') || colorName.startsWith('0x')) {
        return colorName;
    }
    // Fallback para cyan se não encontrar
    console.warn(`[ghostConfig] Cor não encontrada: ${colorName}, usando cyan`);
    return FLUORESCENT_COLORS.cyan;
}
const GHOST_CONFIG = {
    // Fundo e névoa
    backgroundColor: '#01010f',
    fogColor: '#051f51',
    fogNear: 1.6,
    fogFar: 2.8,
    // Câmera e renderização
    cameraDistance: 15,
    cameraFov: 75,
    rendererDPR: [
        1,
        2
    ],
    // Aparência do Ghost (MATCHED to CodePen Reference)
    ghostScale: 0.4,
    bodyColor: 'ghostBlue',
    glowColor: 'blue',
    eyeGlowColor: 'purple',
    ghostOpacity: 0.88,
    emissiveIntensity: 8.5,
    pulseSpeed: 1.6,
    pulseIntensity: 0.6,
    floatSpeed: 1.6,
    // Comportamento do Ghost
    followSpeed: 0.05,
    movementThreshold: 0.07,
    // Iluminação
    rimLightIntensity: 1.8,
    ambientLightColor: 'cyan',
    ambientLightIntensity: 0.08,
    // Véu Atmosférico (Revelação)
    veilColor: 'ghostBlue',
    veilEmissive: 'blue',
    veilEmissiveIntensity: 3.6,
    veilOpacity: 3.9,
    veilPulseAmount: 1.6,
    veilBackgroundColor: 'blue',
    veilBackgroundOpacity: 0.95,
    // Fireflies (Matched to CodePen)
    fireflyCount: 20,
    fireflySpeed: 0.09,
    fireflyBaseRadius: 0.02,
    fireflyRadiusVariance: 0.06,
    fireflyScaleBase: 1,
    fireflyScaleVariance: 0.5,
    fireflyFloatFrequency: 1,
    fireflyFloatAmplitude: 0.05,
    fireflyWobbleFrequency: 0.5,
    fireflyWobbleIntensity: 0.09,
    fireflyPulseBase: 0.9,
    fireflyPulseVariance: 0.4,
    fireflyPulseFrequency: 2,
    fireflyOpacity: 0.9,
    fireflyGlowIntensity: 4.3,
    // Partículas (Matched to CodePen)
    particleCount: 650,
    particleColor: 'violet',
    particleSpeedFactor: 0.012,
    particleRadius: 3.5,
    particleGlowOffset: 0.6,
    particleGlowSpeed: 0.003,
    particleGlowStrength: 0.9,
    particleOpacity: 0.9,
    particleDecayRate: 0.005,
    createParticlesOnlyWhenMoving: true,
    particleCreationRate: 5,
    // Olhos (Matched to CodePen)
    eyeGlowIntensity: 9.5,
    eyeGlowResponse: 0.31,
    eyeGlowDecay: 0.95,
    // Efeitos de Pós-Processamento (Matched to CodePen)
    analogGrain: 2.4,
    analogBleeding: 1.5,
    analogScanlines: 0.7,
    analogVignette: 0.9,
    analogIntensity: 0.9,
    analogJitter: 0.5,
    analogVSync: 0.7,
    limboMode: false,
    // Parâmetros do Véu Atmosférico (MATCHED to CodePen Reference)
    revealRadius: 17,
    fadeStrength: 0.7,
    baseOpacity: 0.08,
    revealOpacity: -0.2
};
function getConfigColorHex(colorName) {
    const hex = resolveConfigColor(colorName);
    return parseInt(hex.replace('#', ''), 16);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/shaders/AnalogShader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalogDecayShader",
    ()=>AnalogDecayShader
]);
// src/components/canvas/shaders/AnalogShader.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const AnalogDecayShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        uTime: {
            value: 0.0
        },
        uResolution: {
            value: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1)
        },
        uAnalogGrain: {
            value: 0.4
        },
        uAnalogBleeding: {
            value: 1.0
        },
        uAnalogVSync: {
            value: 1.0
        },
        uAnalogScanlines: {
            value: 1.0
        },
        uAnalogVignette: {
            value: 1.0
        },
        uAnalogJitter: {
            value: 0.4
        },
        uAnalogIntensity: {
            value: 0.6
        },
        uLimboMode: {
            value: 0.0
        }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAnalogGrain;
    uniform float uAnalogBleeding;
    uniform float uAnalogVSync;
    uniform float uAnalogScanlines;
    uniform float uAnalogVignette;
    uniform float uAnalogJitter;
    uniform float uAnalogIntensity;
    uniform float uLimboMode;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float random(float x) {
      return fract(sin(x) * 43758.5453123);
    }

    float gaussian(float z, float u, float o) {
      return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
    }

    vec3 grain(vec2 uv, float time, float intensity) {
      float seed = dot(uv, vec2(12.9898, 78.233));
      float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
      noise = gaussian(noise, 0.0, 0.5 * 0.5);
      return vec3(noise) * intensity;
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 1.8;

      vec2 jitteredUV = uv;
      if (uAnalogJitter > 0.01) {
        float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
        jitteredUV.x += jitterAmount;
        jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
      }

      if (uAnalogVSync > 0.01) {
        float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
        float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
        jitteredUV.y += vsyncRoll * vsyncChance;
      }

      vec4 color = texture2D(tDiffuse, jitteredUV);

      if (uAnalogBleeding > 0.01) {
        float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
        float offsetPhase = time * 1.5 + uv.y * 20.0;
        vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
        vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
        float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
        float g = texture2D(tDiffuse, jitteredUV).g;
        float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
        color = vec4(r, g, b, color.a);
      }

      if (uAnalogGrain > 0.01) {
        vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
        grainEffect *= (1.0 - color.rgb);
        color.rgb += grainEffect;
      }

      if (uAnalogScanlines > 0.01) {
        float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
        float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
        float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
        float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
        color.rgb *= (1.0 - horizontalLines);
      }

      if (uAnalogVignette > 0.01) {
        vec2 vignetteUV = (uv - 0.5) * 2.0;
        float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
        color.rgb *= vignette;
      }

      if (uLimboMode > 0.5) {
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = vec3(gray);
      }

      gl_FragColor = color;
    }
  `
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhostFireflies",
    ()=>GhostFireflies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function GhostFireflies() {
    _s();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize firefly data
    const fireflies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GhostFireflies.useMemo[fireflies]": ()=>{
            return Array.from({
                length: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflyCount
            }).map({
                "GhostFireflies.useMemo[fireflies]": ()=>({
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20),
                        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflySpeed, (Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflySpeed, (Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflySpeed),
                        phase: Math.random() * Math.PI * 2,
                        pulseSpeed: 2 + Math.random() * 3
                    })
            }["GhostFireflies.useMemo[fireflies]"]);
        }
    }["GhostFireflies.useMemo[fireflies]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GhostFireflies.useFrame": ({ clock })=>{
            if (!groupRef.current) return;
            const t = clock.getElapsedTime();
            groupRef.current.children.forEach({
                "GhostFireflies.useFrame": (child, i)=>{
                    const data = fireflies[i];
                    if (!data) return;
                    const mesh = child;
                    // Update position
                    mesh.position.add(data.velocity);
                    // Bounds check (bounce)
                    if (Math.abs(mesh.position.x) > 30) data.velocity.x *= -1;
                    if (Math.abs(mesh.position.y) > 20) data.velocity.y *= -1;
                    if (Math.abs(mesh.position.z) > 15) data.velocity.z *= -1;
                    // Pulse effect
                    const pulsePhase = t + data.phase;
                    const pulse = Math.sin(pulsePhase * data.pulseSpeed) * 0.4 + 0.6;
                    const material = mesh.material;
                    if (material) {
                        material.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflyOpacity * pulse;
                    }
                    // Update glow/light if we had them attached, but here we just have simple mesh + light
                    // The CodePen has child glow mesh + light.
                    // For simplicity/performance in R3F, we can just pulse opacity and maybe scale?
                    // CodePen pulses opacity of glowMaterial and fireflyMaterial and light intensity.
                    // Let's assume the child structure: Mesh (Firefly) -> [Mesh (Glow), PointLight]
                    const light = mesh.children.find({
                        "GhostFireflies.useFrame.light": (c)=>c instanceof __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"]
                    }["GhostFireflies.useFrame.light"]);
                    const glow = mesh.children.find({
                        "GhostFireflies.useFrame.glow": (c)=>c instanceof __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]
                    }["GhostFireflies.useFrame.glow"]); // The glow sphere
                    if (light) {
                        light.intensity = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflyGlowIntensity * 0.8 * pulse;
                    }
                    if (glow) {
                        glow.material.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fireflyGlowIntensity * 0.5 * pulse;
                    }
                }
            }["GhostFireflies.useFrame"]);
        }
    }["GhostFireflies.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: fireflies.map((data, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: data.position,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.05,
                            2,
                            2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: 0xffff44,
                        transparent: true,
                        opacity: 0.9
                    }, void 0, false, {
                        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.09,
                                    8,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: 0xffff88,
                                transparent: true,
                                opacity: 0.4,
                                side: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
                            }, void 0, false, {
                                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        color: 0xffff44,
                        intensity: 0.5,
                        distance: 4,
                        decay: 3
                    }, void 0, false, {
                        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(GhostFireflies, "9h7KFiTiSO69jpk6Bgbe8/QWR+E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = GhostFireflies;
var _c;
__turbopack_context__.k.register(_c, "GhostFireflies");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostParticles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhostParticles",
    ()=>GhostParticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function GhostParticles({ ghostGroup, movementRef, count }) {
    _s();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSpawnTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(2);
    // Initialize particles strictly with geometry and material
    // We use userData to store simulation state
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GhostParticles.useMemo[particles]": ()=>{
            const geoms = [
                new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.05, 6, 6),
                new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TetrahedronGeometry"](0.04, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.045, 0)
            ];
            return Array.from({
                length: count
            }).map({
                "GhostParticles.useMemo[particles]": (_, i)=>{
                    const geom = geoms[Math.floor(Math.random() * geoms.length)];
                    return {
                        key: i,
                        geometry: geom
                    };
                }
            }["GhostParticles.useMemo[particles]"]);
        }
    }["GhostParticles.useMemo[particles]"], [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GhostParticles.useFrame": ({ clock })=>{
            if (!groupRef.current || !ghostGroup.current) return;
            const now = clock.getElapsedTime() * 1000; // ms
            const moveAmt = movementRef.current;
            // SPAWN LOGIC
            const shouldSpawn = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].createParticlesOnlyWhenMoving ? moveAmt > 0.005 : moveAmt > 0.005;
            if (shouldSpawn && now - lastSpawnTime.current > 200) {
                // Find inactive particles to spawn
                // CodePen rate: Math.min(params.particleCreationRate, Math.max(1, speedRate))
                // Simpler rate here:
                const spawnCount = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].particleCreationRate;
                let spawned = 0;
                for (const child of groupRef.current.children){
                    if (spawned >= spawnCount) break;
                    const mesh = child;
                    if (!mesh.visible) {
                        // Activate particle
                        mesh.visible = true;
                        mesh.position.copy(ghostGroup.current.position);
                        mesh.position.z -= 0.8 + Math.random() * 0.6; // Behind ghost
                        // Scatter
                        const scatter = 3.5;
                        mesh.position.x += (Math.random() - 0.5) * scatter;
                        mesh.position.y += (Math.random() - 0.5) * scatter - 0.8;
                        // Scale
                        const s = 0.6 + Math.random() * 0.7;
                        mesh.scale.set(s, s, s);
                        // Rotation
                        mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
                        // Color variation
                        const color = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfigColorHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].particleColor));
                        color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
                        mesh.material.color = color;
                        mesh.material.opacity = Math.random() * 0.9;
                        // Init Data
                        mesh.userData = {
                            life: 1.0,
                            decay: Math.random() * 0.003 + __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].particleDecayRate,
                            velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.012 - 0.002, (Math.random() - 0.5) * 0.012 - 0.006),
                            rotationSpeed: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015)
                        };
                        spawned++;
                    }
                }
                lastSpawnTime.current = now;
            }
            // UPDATE LOGIC
            groupRef.current.children.forEach({
                "GhostParticles.useFrame": (child)=>{
                    const mesh = child;
                    if (!mesh.visible) return;
                    const data = mesh.userData;
                    data.life -= data.decay;
                    mesh.material.opacity = data.life * 0.85;
                    mesh.position.add(data.velocity);
                    const swirl = Math.cos(clock.getElapsedTime() * 1.8 + mesh.position.y) * 0.0008;
                    mesh.position.x += swirl;
                    mesh.rotation.x += data.rotationSpeed.x;
                    mesh.rotation.y += data.rotationSpeed.y;
                    mesh.rotation.z += data.rotationSpeed.z;
                    if (data.life <= 0) {
                        mesh.visible = false;
                    }
                }
            }["GhostParticles.useFrame"]);
        }
    }["GhostParticles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: particles.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: p.geometry,
                visible: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfigColorHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].particleColor),
                    transparent: true,
                    opacity: 0,
                    alphaTest: 0.1
                }, void 0, false, {
                    fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostParticles.tsx",
                    lineNumber: 150,
                    columnNumber: 11
                }, this)
            }, p.key, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostParticles.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostParticles.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(GhostParticles, "bxpB4I70Q7mzyANQvYrWrZmkJiE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = GhostParticles;
var _c;
__turbopack_context__.k.register(_c, "GhostParticles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ghost",
    ()=>Ghost,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export e as extend>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three-stdlib/postprocessing/EffectComposer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three-stdlib/postprocessing/RenderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three-stdlib/postprocessing/UnrealBloomPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$shaders$2f$AnalogShader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/shaders/AnalogShader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostFireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostFireflies.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostParticles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostParticles.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// Extender para usar no React Three Fiber
(0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__["extend"])({
    EffectComposer: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"],
    RenderPass: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderPass"],
    UnrealBloomPass: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnrealBloomPass"],
    ShaderPass: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"]
});
function Ghost({ particleCount: _particleCount = 100, ghostRef }) {
    _s();
    const internalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const groupRef = ghostRef || internalRef;
    const eyesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]());
    const bodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const composerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bloomPassRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analogPassRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { viewport, mouse, camera, scene, gl, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Refs for motion tracking
    const prevPositionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const currentMovementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Shader customization for "Skirt" deformation
    const onBeforeCompile = (shader)=>{
        shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      
      // Ghost Skirt Deformation
      float y = position.y;
      if (y < -0.2) {
        float x = position.x;
        float z = position.z;
        
        float noise1 = sin(x * 5.0) * 0.35;
        float noise2 = cos(z * 4.0) * 0.25;
        float noise3 = sin((x + z) * 3.0) * 0.15;
        
        transformed.y = -2.0 + noise1 + noise2 + noise3;
      }
      `);
    };
    // Inicializar o compositor de efeitos com Resize Handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Ghost.useEffect": ()=>{
            if (!gl || !scene || !camera) return;
            // Garantir que o renderer suporte transparência
            gl.setClearColor(0x000000, 0);
            // Configurar Bloom e Composer
            const composer = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$EffectComposer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"](gl);
            composer.setSize(size.width, size.height);
            const renderPass = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$RenderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderPass"](scene, camera);
            composer.addPass(renderPass);
            const bloomPass = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnrealBloomPass"](new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](size.width, size.height), 0.3, 1.15, 0.5 // threshold
            );
            composer.addPass(bloomPass);
            bloomPassRef.current = bloomPass;
            const analogPass = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"](__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$shaders$2f$AnalogShader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalogDecayShader"]);
            analogPass.uniforms.uResolution.value.set(size.width, size.height);
            composer.addPass(analogPass);
            analogPassRef.current = analogPass;
            composerRef.current = composer;
            setIsLoaded(true);
            return ({
                "Ghost.useEffect": ()=>{
                    composer.dispose();
                    setIsLoaded(false);
                }
            })["Ghost.useEffect"];
        }
    }["Ghost.useEffect"], [
        gl,
        scene,
        camera,
        size
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Ghost.useFrame": ({ clock })=>{
            if (!groupRef.current || !bodyRef.current) return;
            const t = clock.getElapsedTime();
            // Atualizar passos de analog decay
            if (analogPassRef.current && analogPassRef.current.uniforms) {
                analogPassRef.current.uniforms.uTime.value = t;
            }
            // 1. Follow Mouse (Smooth)
            const targetX = mouse.x * viewport.width * 0.3;
            const targetY = mouse.y * viewport.height * 0.3;
            groupRef.current.position.x += (targetX - groupRef.current.position.x) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].followSpeed;
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].followSpeed;
            // 2. Float Animation (Idle)
            const floatY = Math.sin(t * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].floatSpeed * 0.5) * 0.03 + Math.cos(t * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].floatSpeed * 0.7) * 0.018;
            groupRef.current.position.y += floatY;
            // 3. Pulse (Emissive Heartbeat)
            const pulse = Math.sin(t * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].pulseSpeed) * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].pulseIntensity;
            if (bodyRef.current.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                bodyRef.current.material.emissiveIntensity = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].emissiveIntensity + pulse;
            }
            // 4. Rotation/Tilt (Velocity based)
            const velocityX = targetX - groupRef.current.position.x;
            const velocityY = targetY - groupRef.current.position.y;
            // Smooth Tilt
            groupRef.current.rotation.z = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(groupRef.current.rotation.z, -velocityX * 0.05, 0.05);
            groupRef.current.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(groupRef.current.rotation.x, velocityY * 0.02, 0.02);
            // 5. Eye Glow Logic
            if (eyesRef.current && eyesRef.current.userData?.leftEyeMaterial) {
                const prevPos = prevPositionRef.current;
                const movement = prevPos.distanceTo(groupRef.current.position);
                currentMovementRef.current = currentMovementRef.current * __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].eyeGlowDecay + movement * (5 - __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].eyeGlowDecay);
                prevPos.copy(groupRef.current.position);
                const isMoving = currentMovementRef.current > __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].movementThreshold;
                const targetOpacity = isMoving ? 1.0 : 0.0;
                const lerpFactor = isMoving ? __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].eyeGlowResponse : __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].eyeGlowResponse * 0.5;
                const { leftEyeMaterial, rightEyeMaterial, leftOuterMaterial, rightOuterMaterial } = eyesRef.current.userData;
                leftEyeMaterial.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(leftEyeMaterial.opacity, targetOpacity, lerpFactor);
                rightEyeMaterial.opacity = leftEyeMaterial.opacity;
                leftOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
                rightOuterMaterial.opacity = leftEyeMaterial.opacity * 0.63;
            }
            // Renderizar com efeitos (SEMPRE, se composer existir)
            if (composerRef.current && isLoaded) {
                composerRef.current.render();
            }
        }
    }["Ghost.useFrame"], 0.5);
    // Setup Eyes (Static Geometry)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Ghost.useEffect": ()=>{
            if (!eyesRef.current) return;
            const eyeColorHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfigColorHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].eyeGlowColor);
            // 1. Soquetes (Sockets) pretos para dar profundidade - Conforme Referência
            const socketGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.45, 16, 16);
            const socketMat = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x000000
            });
            const leftSocket = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](socketGeo, socketMat);
            leftSocket.position.set(-0.7, 0.6, 1.9);
            leftSocket.scale.set(1.1, 1.0, 0.6);
            const rightSocket = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](socketGeo, socketMat);
            rightSocket.position.set(0.7, 0.6, 1.9);
            rightSocket.scale.set(1.1, 1.0, 0.6);
            // 2. Olhos (Glow) - Conforme Referência
            const eyeGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.3, 12, 12);
            const outerGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.525, 12, 12);
            const eyeMat = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: eyeColorHex,
                transparent: true,
                opacity: 0.0
            });
            const outerMat = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: eyeColorHex,
                transparent: true,
                opacity: 0.0,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
            });
            const leftEye = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](eyeGeo, eyeMat.clone());
            const rightEye = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](eyeGeo, eyeMat.clone());
            const leftOuter = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](outerGeo, outerMat.clone());
            const rightOuter = new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](outerGeo, outerMat.clone());
            // Posições alinhadas com a referência
            leftEye.position.set(-0.7, 0.6, 2.0);
            rightEye.position.set(0.7, 0.6, 2.0);
            leftOuter.position.set(-0.7, 0.6, 1.95);
            rightOuter.position.set(0.7, 0.6, 1.95);
            // Limpar olhos anteriores para evitar duplicatas
            eyesRef.current.clear();
            eyesRef.current.add(leftSocket, rightSocket, leftEye, rightEye, leftOuter, rightOuter);
            eyesRef.current.userData = {
                leftEyeMaterial: leftEye.material,
                rightEyeMaterial: rightEye.material,
                leftOuterMaterial: leftOuter.material,
                rightOuterMaterial: rightOuter.material
            };
            // Adicionar ao grupo principal
            if (groupRef.current) {
                groupRef.current.add(eyesRef.current);
            }
        }
    }["Ghost.useEffect"], [
        groupRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostFireflies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostFireflies"], {}, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostParticles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GhostParticles"], {
                ghostGroup: groupRef,
                movementRef: currentMovementRef,
                count: _particleCount
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: groupRef,
                name: "ghost",
                scale: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].ghostScale,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    ref: bodyRef,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                            args: [
                                2,
                                64,
                                64
                            ]
                        }, void 0, false, {
                            fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfigColorHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].bodyColor),
                            emissive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfigColorHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].glowColor),
                            emissiveIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].emissiveIntensity,
                            roughness: 0.02,
                            metalness: 0.0,
                            transparent: true,
                            opacity: 0.5,
                            blending: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                            depthWrite: false,
                            side: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                            onBeforeCompile: onBeforeCompile
                        }, void 0, false, {
                            fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Ghost, "FFhmA0B83lYRfBiLwtlamnqBu6M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Ghost;
const __TURBOPACK__default__export__ = Ghost;
var _c;
__turbopack_context__.k.register(_c, "Ghost");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/Atmosphere.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Atmosphere",
    ()=>Atmosphere,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const atmosphereShader = {
    uniforms: {
        ghostPosition: {
            value: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
        },
        time: {
            value: 0
        },
        revealRadius: {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].revealRadius
        },
        fadeStrength: {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].fadeStrength
        },
        baseOpacity: {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].baseOpacity
        },
        revealOpacity: {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].revealOpacity
        }
    },
    vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 ghostPosition;
    uniform float time;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    varying vec3 vWorldPosition;
    
    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      // FIXED: Match CodePen dynamics exactly
      float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
      float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength * 2.5);
      
      float finalOpacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
      
      // FIXED: Blue-tinted atmosphere like CodePen (was near-black)
      gl_FragColor = vec4(0.0, 0.2, 1.0, finalOpacity * 0.8);
    }
  `,
    transparent: true
};
function Atmosphere() {
    _s();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Atmosphere.useFrame": ({ clock, scene })=>{
            if (!meshRef.current) return;
            const ghost = scene.getObjectByName('ghost');
            const mat = meshRef.current.material;
            mat.uniforms.time.value = clock.getElapsedTime();
            if (ghost) {
                mat.uniforms.ghostPosition.value.copy(ghost.position);
            }
        }
    }["Atmosphere.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        position: [
            0,
            0,
            -10
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    100,
                    100
                ]
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Atmosphere.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                attach: "material",
                args: [
                    atmosphereShader
                ]
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Atmosphere.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/Atmosphere.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(Atmosphere, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Atmosphere;
const __TURBOPACK__default__export__ = Atmosphere;
var _c;
__turbopack_context__.k.register(_c, "Atmosphere");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/AtmosphereVeil.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AtmosphereVeil",
    ()=>AtmosphereVeil,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AtmosphereVeil() {
    _s();
    const materialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "AtmosphereVeil.useFrame": ({ clock, scene })=>{
            if (!materialRef.current) return;
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
            const ghost = scene.getObjectByName('ghost');
            if (ghost) {
                materialRef.current.uniforms.ghostPosition.value.copy(ghost.position);
            }
        }
    }["AtmosphereVeil.useFrame"]);
    const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
    const fragmentShader = `
    uniform vec3 ghostPosition;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      // Small pulse effect on the reveal radius
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      
      // Extremely low RGB to avoid bloom while keeping the "veil" effect
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
    }
  `;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: [
            0,
            0,
            -10
        ],
        renderOrder: -100,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    300,
                    300
                ]
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/AtmosphereVeil.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                ref: materialRef,
                attach: "material",
                uniforms: {
                    ghostPosition: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0)
                    },
                    revealRadius: {
                        value: 37
                    },
                    fadeStrength: {
                        value: 1.7
                    },
                    baseOpacity: {
                        value: 0.9
                    },
                    revealOpacity: {
                        value: 0.05
                    },
                    time: {
                        value: 0
                    }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/AtmosphereVeil.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/AtmosphereVeil.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(AtmosphereVeil, "QcOYtlUIqds7PvSzNOz2iSyWO9I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = AtmosphereVeil;
const __TURBOPACK__default__export__ = AtmosphereVeil;
var _c;
__turbopack_context__.k.register(_c, "AtmosphereVeil");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GhostCanvas",
    ()=>GhostCanvas,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * GhostCanvas.tsx
 * ================
 * Wrapper R3F declarativo para a cena Ghost Atmosphere.
 *
 * Este componente encapsula a configuração do Canvas React Three Fiber,
 * permitindo uma arquitetura limpa e separação de responsabilidades.
 *
 * Features:
 * - DPR adaptativo baseado no devicePixelRatio
 * - Fallback para gradiente CSS se WebGL não for suportado
 * - Prefers-reduced-motion respeitado
 * - Performance adaptativa via hook
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Preload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/@react-three/drei/core/Preload.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/hooks/useWebGLSupport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/hooks/usePerformanceAdaptive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/config/ghostConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$Ghost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/Ghost.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/Atmosphere.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/AtmosphereVeil.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
// Configuração do Canvas
const CANVAS_CONFIG = {
    fov: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].cameraFov,
    near: 0.1,
    far: 1000,
    position: [
        0,
        0,
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].cameraDistance
    ]
};
// Fallback estático para quando WebGL não está disponível
function StaticFallback() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]",
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = StaticFallback;
// Loader interno do Canvas (enquanto assets carregam)
function CanvasLoader() {
    return null; // Transparent loading - o Preloader principal cuida disso
}
_c1 = CanvasLoader;
// Componente de Cena (dentro do Canvas)
const GhostSceneContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s(function GhostSceneContent() {
    _s();
    const performanceConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePerformanceAdaptive"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$Atmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Atmosphere"], {}, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$AtmosphereVeil$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtmosphereVeil"], {}, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$Ghost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                particleCount: performanceConfig.particleCount
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                color: 0x0a0a2e,
                intensity: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].ambientLightIntensity
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: 0x4a90e2,
                intensity: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].rimLightIntensity,
                position: [
                    -8,
                    6,
                    -4
                ]
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: 0x50e3c2,
                intensity: __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$config$2f$ghostConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GHOST_CONFIG"].rimLightIntensity * 0.7,
                position: [
                    8,
                    -4,
                    -6
                ]
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Preload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Preload"], {
                all: true
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}, "r6giUrBQ8XKOH4qu6Pxv4VVcYFA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePerformanceAdaptive"]
    ];
}));
_c2 = GhostSceneContent;
/**
 * GhostCanvas - Wrapper R3F para a atmosfera Ghost
 *
 * Uso:
 * ```tsx
 * <GhostCanvas onCreated={() => setIsLoaded(true)} />
 * ```
 */ const GhostCanvas = /*#__PURE__*/ _s1((0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c3 = _s1(function GhostCanvas({ onCreated, className = '' }) {
    _s1();
    const supportsWebGL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebGLSupport"])();
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const performanceConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePerformanceAdaptive"])();
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Callback de criação do Canvas
    const handleCreated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GhostCanvas.GhostCanvas.useCallback[handleCreated]": (state)=>{
            // Configurar renderer
            state.gl.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
            state.gl.toneMappingExposure = 0.9;
            state.gl.setClearColor(0x000000, 0);
            setIsReady(true);
            onCreated?.();
        }
    }["GhostCanvas.GhostCanvas.useCallback[handleCreated]"], [
        onCreated
    ]);
    // Se preferir movimento reduzido ou WebGL não suportado, mostrar fallback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostCanvas.GhostCanvas.useEffect": ()=>{
            if (!supportsWebGL || prefersReducedMotion) {
                // Ainda dispara o callback para não bloquear o fluxo
                onCreated?.();
            }
        }
    }["GhostCanvas.GhostCanvas.useEffect"], [
        supportsWebGL,
        prefersReducedMotion,
        onCreated
    ]);
    // Fallback para dispositivos sem WebGL ou com prefers-reduced-motion
    if (!supportsWebGL || prefersReducedMotion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StaticFallback, {}, void 0, false, {
            fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
            lineNumber: 141,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `absolute inset-0 z-0 transition-opacity duration-500 ease-out ${isReady ? 'opacity-100' : 'opacity-0'} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            dpr: performanceConfig.pixelRatio,
            gl: {
                antialias: performanceConfig.quality === 'high',
                powerPreference: 'high-performance',
                alpha: true,
                premultipliedAlpha: false,
                stencil: false,
                depth: true,
                preserveDrawingBuffer: false
            },
            camera: {
                fov: CANVAS_CONFIG.fov,
                near: CANVAS_CONFIG.near,
                far: CANVAS_CONFIG.far,
                position: CANVAS_CONFIG.position
            },
            className: "absolute! inset-0! w-full! h-full! pointer-events-none!",
            onCreated: handleCreated,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CanvasLoader, {}, void 0, false, {
                    fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                    lineNumber: 168,
                    columnNumber: 29
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostSceneContent, {}, void 0, false, {
                    fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}, "Qef12kRp02NtfLHreej/wpfU4/I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebGLSupport"],
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePerformanceAdaptive"]
    ];
})), "Qef12kRp02NtfLHreej/wpfU4/I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebGLSupport"],
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$_danilonov_portfolio$2f$src$2f$hooks$2f$usePerformanceAdaptive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePerformanceAdaptive"]
    ];
});
_c4 = GhostCanvas;
;
const __TURBOPACK__default__export__ = GhostCanvas;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "StaticFallback");
__turbopack_context__.k.register(_c1, "CanvasLoader");
__turbopack_context__.k.register(_c2, "GhostSceneContent");
__turbopack_context__.k.register(_c3, "GhostCanvas$memo");
__turbopack_context__.k.register(_c4, "GhostCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/_danilonov_portfolio/src/components/canvas/home/hero/GhostCanvas.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_danilonov_portfolio_src_695900c7._.js.map