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
  bodyColor: 'blue',
  glowColor: 'cyan', // Azul ciano para maior brilho
  eyeGlowColor: 'violet',
  ghostOpacity: 0.78,
  ghostScale: 0.2,

  // Glow effects
  emissiveIntensity: 2.05, // Intensidade alta para criar o brilho de lanterna
  pulseSpeed: 1.2,
  pulseIntensity: 1.2,

  // Eyes
  eyeGlowIntensity: 3.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // Enhanced lighting
  rimLightIntensity: 0.8,

  // Behavior
  followSpeed: 0.05,
  wobbleAmount: 0.35,
  floatSpeed: 1.6,
  movementThreshold: 0.07,

  // Particles
  particleCount: 3550,
  particleDecayRate: 0.015,
  particleColor: 'pink',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.5,

  // Background reveal
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,

  // Fireflies
  fireflyGlowIntensity: 4.3,
  fireflySpeed: 0.09,

  // Analog Decay settings
  analogIntensity: 0.9,
  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogVSync: 1.7,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogJitter: 0.5,
  limboMode: false,
};
