// src/config/ghostConfig.ts

// Paleta de cores fluorescentes
export const FLUORESCENT_COLORS = {
  electricBlue: '#0080ff',
  neonCyan: '#50e3c2',
  violetGlow: '#8a2be2',
  midnightBlue: '#040013',
  deepSpace: '#0f2027',
  voidSky: '#020112',
  aurora: '#4fe6ff',
  cosmicPink: '#f501d3',
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
} as const;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: string) {
  return FLUORESCENT_COLORS[color as keyof typeof FLUORESCENT_COLORS] ?? color;
}

// Interface para a configuração do Ghost
export interface GhostConfig {
  backgroundColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  cameraDistance: number;
  cameraFov: number;
  rendererDPR: [number, number];
  ghostScale: number;
  followSpeed: number;
  pulseSpeed: number;
  pulseIntensity: number;
  emissiveIntensity: number;
  floatSpeed: number;
  ghostOpacity: number;
  bodyColor: string;
  glowColor: string;
  eyeGlowColor: string;
  rimLightIntensity: number;
  ambientLightColor: string;
  ambientLightIntensity: number;
  veilColor: string;
  veilEmissive: string;
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: string;
  veilBackgroundOpacity: number;
  fireflyCount: number;
  fireflySpeed: number;
  fireflyBaseRadius: number;
  fireflyRadiusVariance: number;
  fireflyScaleBase: number;
  fireflyScaleVariance: number;
  fireflyFloatFrequency: number;
  fireflyFloatAmplitude: number;
  fireflyWobbleFrequency: number;
  fireflyWobbleIntensity: number;
  fireflyPulseBase: number;
  fireflyPulseVariance: number;
  fireflyPulseFrequency: number;
  fireflyOpacity: number;
  fireflyGlowIntensity: number; // Added to resolve TS2551
  particleCount: number;
  particleColor: string;
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;
  eyeGlowIntensity: number;
  eyeGlowResponse: number;
  eyeGlowDecay: number;
  wobbleAmount: number;
  movementThreshold: number;
  analogGrain: number;
  analogBleeding: number;
  analogScanlines: number;
  analogVignette: number;
  analogIntensity: number;
  analogJitter: number;
  analogVSync: number;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomSmoothing: number;
  bloomKernel: number;
}

// Configuração centralizada do Ghost
export const GHOST_CONFIG: GhostConfig = {
  backgroundColor: '#01010f',
  fogColor: '#0080ff',
  fogNear: 6,
  fogFar: 28,
  cameraDistance: 20,
  cameraFov: 75,
  rendererDPR: [1, 1.5],
  ghostScale: 1.9,
  followSpeed: 0.05,
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  emissiveIntensity: 1.8,
  floatSpeed: 1.6,
  ghostOpacity: 0.88,
  bodyColor: 'electricBlue',
  glowColor: 'cyan',
  eyeGlowColor: 'pink',
  rimLightIntensity: 5.8,
  ambientLightColor: 'blue',
  ambientLightIntensity: 4.8,
  veilColor: '#50e3c2',
  veilEmissive: '#c600ff',
  veilEmissiveIntensity: 5.6,
  veilOpacity: 0.06,
  veilPulseAmount: 0.4,
  veilBackgroundColor: '#0d031c',
  veilBackgroundOpacity: 0.98,
  fireflyCount: 220,
  fireflySpeed: 0.08,
  fireflyBaseRadius: 3.2,
  fireflyRadiusVariance: 0.8,
  fireflyScaleBase: 0.002,
  fireflyScaleVariance: 0.04,
  fireflyFloatFrequency: 0.5,
  fireflyFloatAmplitude: 0.005,
  fireflyWobbleFrequency: 1.3,
  fireflyWobbleIntensity: 0.2,
  fireflyPulseBase: 0.6,
  fireflyPulseVariance: 0.35,
  fireflyPulseFrequency: 2.2,
  fireflyOpacity: 0.3,
  fireflyGlowIntensity: 1.0, // Added to resolve TS2551
  particleCount: 1360,
  particleColor: 'purple',
  particleSpeedFactor: 0.015,
  particleRadius: 4,
  particleGlowOffset: 1.4,
  particleGlowSpeed: 1.2,
  particleGlowStrength: 0.028,
  particleOpacity: 0.6,
  eyeGlowIntensity: 1.8,
  eyeGlowResponse: 1.38,
  eyeGlowDecay: 0.35,
  wobbleAmount: 0.4,
  movementThreshold: 0.05,
  analogGrain: 0.4,
  analogBleeding: 0.4,
  analogScanlines: 0.3,
  analogVignette: 1.4,
  analogIntensity: 0.65,
  analogJitter: 0.3,
  analogVSync: 0.3,
  bloomIntensity: 0.35,
  bloomThreshold: 0.15,
  bloomSmoothing: 0.9,
  bloomKernel: 2,
};
