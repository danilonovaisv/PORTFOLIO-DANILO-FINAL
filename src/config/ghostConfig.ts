// src/config/ghostConfig.ts
// Paleta de cores fluorescentes
export const FLUORESCENT_COLORS = {
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
  violet: '#8a2be2',
};

// Configuração centralizada do Ghost
export const GHOST_CONFIG = {
  // Ghost appearance
  bodyColor: 'Cyan',
  glowColor: 'blue', // Azul ciano para maior brilho
  eyeGlowColor: FLUORESCENT_COLORS.violet,
  ghostOpacity: 0.78,
  ghostScale: 0.3,

  // Glow effects
  emissiveIntensity: 3.8, // Intensidade alta para criar o brilho de lanterna
  pulseSpeed:1.7,
  pulseIntensity: 0.7,

  // Eyes
  eyeGlowIntensity: 1.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // Enhanced lighting
  rimLightIntensity: 3.8,

  // Behavior
  followSpeed: 0.05,
  wobbleAmount: 0.35,
  floatSpeed: 1.6,
  movementThreshold: 0.07,

  // Particles
  particleCount: 550,
  particleDecayRate: 0.015,
  particleColor: FLUORESCENT_COLORS.pink,
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 45,

  // Background reveal
  revealRadius: 37,
  fadeStrength: 12.7,
  baseOpacity: 1.9,
  revealOpacity: 0.05,

  // Fireflies
  fireflyGlowIntensity: 4.3,
  fireflySpeed: 0.09,
  fireflyCount: 200,
  fireflyColor: 'cyan',
  fireflyScaleMin: 0.03,
  fireflyScaleMax: 0.07,

  // Atmosphere veil
  atmosphereGlowColor: '#5d00ff',
  atmosphereGlowOpacity: 5.72,
  atmosphereGlowScale: [1, 1, 1] as [number, number, number],
  atmosphereBackgroundColor: '#03041c',
  atmosphereBackgroundOpacity: 5.4,
  atmosphereBackgroundScale: [15, 10] as [number, number],

  // Canvas and camera
  canvasBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  cameraPosition: [0, 0, 20] as [number, number, number],
  cameraFov: 75,

  // Mouse influence
  mouseInfluence: { x: 11, y: 7 },

  // Analog Decay settings
  analogIntensity: 0.9,
  analogGrain: 0.2,
  analogBleeding: 0.0,
  analogVSync: 0.7,
  analogScanlines: 0.0,
  analogVignette: 3.4,
  analogJitter: 0.5,
  limboMode: false,
};
