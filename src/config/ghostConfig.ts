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
  blue: '#0080ff', // Corrigido para coincidir com a referência do CodePen
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
} as const;

// Tipo para as chaves da paleta
export type FluorescentColorName = keyof typeof FLUORESCENT_COLORS;

// Paleta Extendida (cores personalizadas para o Ghost)
export const EXTENDED_FLUORESCENT_COLORS = {
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
  fogBlue: '#051f51',
} as const;

// Tipo para cores extendidas
export type ExtendedColorName = keyof typeof EXTENDED_FLUORESCENT_COLORS;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: FluorescentColorName): string {
  return FLUORESCENT_COLORS[color];
}

// Função para resolver cores do config (suporta nomes personalizados)
export function resolveConfigColor(colorName: string): string {
  if (!colorName || typeof colorName !== 'string') {
    console.warn('resolveConfigColor received invalid color:', colorName);
    return '#00ffff'; // Safe fallback
  }

  // Tenta a paleta extendida primeiro
  const extendedColor =
    EXTENDED_FLUORESCENT_COLORS[colorName as ExtendedColorName];
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

// Interface para a configuração do Ghost
export interface GhostConfig {
  // Fundo e névoa
  backgroundColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;

  // Câmera e renderização
  cameraDistance: number;
  cameraFov: number;
  rendererDPR: [number, number];

  // Aparência do Ghost
  ghostScale: number;
  bodyColor: string;
  glowColor: string;
  eyeGlowColor: string;
  ghostOpacity: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  floatSpeed: number;

  // Comportamento do Ghost
  followSpeed: number;
  movementThreshold: number;

  // Iluminação
  rimLightIntensity: number;
  ambientLightColor: string;
  ambientLightIntensity: number;

  // Véu Atmosférico (Revelação)
  veilColor: string;
  veilEmissive: string;
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: string;
  veilBackgroundOpacity: number;

  // Fireflies
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
  fireflyGlowIntensity: number;

  // Partículas
  particleCount: number;
  particleColor: string;
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;
  particleDecayRate: number;
  createParticlesOnlyWhenMoving: boolean;
  particleCreationRate: number;

  // Olhos
  eyeGlowIntensity: number;
  eyeGlowResponse: number;
  eyeGlowDecay: number;

  // Efeitos de Pós-Processamento (Analog Decay)
  analogGrain: number;
  analogBleeding: number;
  analogScanlines: number;
  analogVignette: number;
  analogIntensity: number;
  analogJitter: number;
  analogVSync: number;
  limboMode: boolean;

  // Parâmetros do Véu Atmosférico
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
}

// Configuração centralizada do Ghost (valores alinhados com o CodePen)
export const GHOST_CONFIG: GhostConfig = {
  // Fundo e névoa
  backgroundColor: '#01010f',
  fogColor: '#051f51',
  fogNear: 6,
  fogFar: 8,

  // Câmera e renderização
  cameraDistance: 30,
  cameraFov: 75,
  rendererDPR: [1, 2],

  // Aparência do Ghost (Matched to CodePen)
  ghostScale: 0.6,
  bodyColor: 'deepSpace', // 0x0f2027
  glowColor: 'blue', // "blue"
  eyeGlowColor: 'blue',

  ghostOpacity: 0.94,
  emissiveIntensity: 6.0,
  pulseSpeed: 0.5,
  pulseIntensity: 0.8,
  floatSpeed: 1.6,

  // Comportamento do Ghost
  followSpeed: 0.05,
  movementThreshold: 0.7,

  // Iluminação
  rimLightIntensity: 1.0,
  ambientLightColor: 'blue',
  ambientLightIntensity: 0.6,

  // Véu Atmosférico (Revelação)
  veilColor: 'fogBlue',
  veilEmissive: 'midnightBlue',
  veilEmissiveIntensity: 1.6,
  veilOpacity: 0.6,
  veilPulseAmount: 0.6,
  veilBackgroundColor: 'midnightBlue',
  veilBackgroundOpacity: 0.95,

  // Fireflies (Matched to CodePen)
  fireflyCount: 20, // CodePen creates 20 fireflies in createFireflies loop
  fireflySpeed: 0.09,
  fireflyBaseRadius: 0.005,
  fireflyRadiusVariance: 0.05,
  fireflyScaleBase: 0.01,
  fireflyScaleVariance: 0.02,
  fireflyFloatFrequency: 0.5,
  fireflyFloatAmplitude: 0.005,
  fireflyWobbleFrequency: 0.05,
  fireflyWobbleIntensity: 0.09,
  fireflyPulseBase: 0.06,
  fireflyPulseVariance: 0.0305,
  fireflyPulseFrequency: 0.02,
  fireflyOpacity: 0.08,
  fireflyGlowIntensity: 4.3,

  // Partículas (Matched to CodePen)
  particleCount: 2500,
  particleColor: 'blue',

  particleSpeedFactor: 0.015,
  particleRadius: 0.05,
  particleGlowOffset: 0.04,
  particleGlowSpeed: 0.02,
  particleGlowStrength: 0.028,
  particleOpacity: 0.7,
  particleDecayRate: 0.005,
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.05,

  // Olhos (Matched to CodePen)
  eyeGlowIntensity: 0.5,
  eyeGlowResponse: 0.31,
  eyeGlowDecay: 0.95,

  // Efeitos de Pós-Processamento (Matched to CodePen)
  analogGrain: 0.8,
  analogBleeding: 1.5,
  analogScanlines: 1.5,
  analogVignette: 2.8,
  analogIntensity: 1.2,
  analogJitter: 0.6,
  analogVSync: 1.7,
  limboMode: false,

  // Parâmetros do Véu Atmosférico (Matched to CodePen)
  revealRadius: 37,
  fadeStrength: 1.3,
  baseOpacity: 0.38,
  revealOpacity: 0.0,
};

// Helper para converter cor do config para formato numérico (Three.js)
export function getConfigColorHex(colorName: string): number {
  const hex = resolveConfigColor(colorName);
  return parseInt(hex.replace('#', ''), 16);
}
