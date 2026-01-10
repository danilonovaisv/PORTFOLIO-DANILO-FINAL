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
  blue: '#0048ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

// Configuração centralizada do Ghost
// Valores calibrados via Audit Report (Reference: code-ref.tsx)
export const GHOST_CONFIG = {
  // Ghost appearance
  bodyColor: '#000510', // Darker, spectral
  glowColor: '#0048ff', // Ghost Brand Blue
  eyeGlowColor: '#4fe6ff', // Cyan Accent
  ghostOpacity: 0.35, // Spectral glass
  ghostScale: 2.4, // Reference: 2.4

  // Glow effects
  emissiveIntensity: 1.2, // Reduced for dark atmosphere
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,

  // Eyes
  eyeGlowIntensity: 6.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // Enhanced lighting
  rimLightIntensity: 2.0,

  // Behavior
  followSpeed: 0.05, // Adjusted for R3F frame loop
  wobbleAmount: 0.25,
  floatSpeed: 0.8,
  movementThreshold: 0.07,

  // Particles - Reduzido para performance
  particleCount: 1205,
  particleDecayRate: 0.02,
  particleColor: 'purple',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.8,

  // Background reveal
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,

  // Fireflies
  fireflyGlowIntensity: 500,
  fireflySpeed: 0.012,

  // Analog Decay settings - Sutilizado
  analogIntensity: 0.9,
  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogVSync: 1.7,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogJitter: 0.5,
  limboMode: false,
};
