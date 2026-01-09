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
  glowColor: 'blue', // Blue glow (reference: 'blue')
  eyeGlowColor: 'violet', // Violet (reference: 'violet')
  ghostOpacity: 0.78,
  ghostScale: 1.5, // Reference value

  // Glow effects - Reference values for lantern effect
  emissiveIntensity: 3.3,
  pulseSpeed: 1.55,
  pulseIntensity: 1.55,

  // Eyes - Reference values
  eyeGlowIntensity: 3.5,
  eyeGlowDecay: 1.95,
  eyeGlowResponse: 0.61,

  // Enhanced lighting
  rimLightIntensity: 1.8,

  // Behavior
  followSpeed: 0.025,
  wobbleAmount: 0.35,
  floatSpeed: 0.09,
  movementThreshold: 0.07,

  // Particles
  particleCount: 3550,
  particleDecayRate: 0.015,
  particleColor: 'pink',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.005,

  // Background reveal
  revealRadius: 42,
  fadeStrength: 1.2,
  baseOpacity: 1.2,
  revealOpacity: 0.19,

  // Fireflies
  fireflyGlowIntensity: 2223.3,
  fireflySpeed: 0.009,

  // Analog Decay settings
  analogIntensity: 0.6,
  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogVSync: 0.2,
  analogScanlines: 1.2,
  analogVignette: 1.9,
  analogJitter: 0.5,
  limboMode: false,
};
