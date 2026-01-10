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
  fogFar: 28,

  // Câmera e renderização
  cameraDistance: 20,
  cameraFov: 75,
  rendererDPR: [1, 2],

  // Aparência do Ghost (alinhado com CodePen)
  ghostScale: 1.65,
  bodyColor: 'cyan',
  glowColor: 'cyan', // Electric Cyan center
  eyeGlowColor: 'magenta', // Deep contrast
  ghostOpacity: 0.95,
  emissiveIntensity: 3.5, // Balanced for Bloom
  pulseSpeed: 3.5, // Much faster heartbeat
  pulseIntensity: 0.5,
  floatSpeed: 2.8, // Faster floating

  // Comportamento do Ghost
  followSpeed: 0.15, // Much snappier (was 0.05)
  movementThreshold: 0.5,

  // Iluminação
  rimLightIntensity: 2.5, // Brighter Rims
  ambientLightColor: 'midnightBlue',
  ambientLightIntensity: 1.2,

  // Véu Atmosférico (Revelação)
  veilColor: 'electricBlue', // #0080ff
  veilEmissive: 'voidSky', // #020112
  veilEmissiveIntensity: 3.6,
  veilOpacity: 0.7,
  veilPulseAmount: 0.6,
  veilBackgroundColor: 'midnightBlue', // Matches background #040013
  veilBackgroundOpacity: 0.95,

  // Fireflies (alinhado com CodePen)
  fireflyCount: 290,
  fireflySpeed: 0.9,
  fireflyBaseRadius: 0.02,
  fireflyRadiusVariance: 0.08,
  fireflyScaleBase: 0.02,
  fireflyScaleVariance: 0.04,
  fireflyFloatFrequency: 0.05,
  fireflyFloatAmplitude: 0.005,
  fireflyWobbleFrequency: 1.3,
  fireflyWobbleIntensity: 0.2,
  fireflyPulseBase: 0.6,
  fireflyPulseVariance: 0.35,
  fireflyPulseFrequency: 0.02,
  fireflyOpacity: 0.8,
  fireflyGlowIntensity: 3.3,

  // Partículas
  particleCount: 2550,
  particleColor: 'violet', // #8a2be2
  particleSpeedFactor: 0.015,
  particleRadius: 2,
  particleGlowOffset: 1.4,
  particleGlowSpeed: 0.2,
  particleGlowStrength: 0.028,
  particleOpacity: 0.5,
  particleDecayRate: 0.005,
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.5,

  // Olhos (alinhado com CodePen)
  eyeGlowIntensity: 3.5,
  eyeGlowResponse: 0.31,
  eyeGlowDecay: 0.95,

  // Efeitos de Pós-Processamento (Analog Decay - alinhado com CodePen)
  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogIntensity: 0.9,
  analogJitter: 0.5,
  analogVSync: 1.7,
  limboMode: false,

  // Parâmetros do Véu Atmosférico (alinhado com CodePen)
  // Parâmetros do Véu Atmosférico
  revealRadius: 18, // Wider flashlight
  fadeStrength: 2.0,
  baseOpacity: 0.96,
  revealOpacity: 0.0,
};

// Helper para converter cor do config para formato numérico (Three.js)
export function getConfigColorHex(colorName: string): number {
  const hex = resolveConfigColor(colorName);
  return parseInt(hex.replace('#', ''), 16);
}
