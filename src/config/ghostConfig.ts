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
  bodyColor: 'cyan',
  glowColor: 'blue', // Azul ciano para maior brilho
  eyeGlowColor: 'violet',
  ghostOpacity: 0.78,
  ghostScale: 0.2,

  // Glow effects
  emissiveIntensity: 3.8, // Intensidade alta para criar o brilho de lanterna
  pulseSpeed: 1.6,
  pulseIntensity: 1.6,

  // Eyes
  eyeGlowIntensity: 9.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // Enhanced lighting
  rimLightIntensity: 6.8,

  // Behavior
  followSpeed: 0.05,
  wobbleAmount: 0.35,
  floatSpeed: 1.6,
  movementThreshold: 0.07,

  // Particles
  particleCount: 550,
  particleDecayRate: 0.015,
  particleColor: 'pink',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 45,

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
  analogGrain: 0.2,
  analogBleeding: 0.0,
  analogVSync: 0.7,
  analogScanlines: 0.0,
  analogVignette: 9.4,
  analogJitter: 0.5,
  limboMode: false,
};
