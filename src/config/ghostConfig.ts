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
  fogNear: 1.6,
  fogFar: 2.8,

  // Câmera e renderização
  cameraDistance: 15,
  cameraFov: 75,
  rendererDPR: [1, 2],

  // Aparência do Ghost (MATCHED to CodePen Reference)
  ghostScale: 0.4, // FIXED: was 1.2
  bodyColor: 'ghostBlue', // 0x0f2027
  glowColor: 'blue', // "blue"
  eyeGlowColor: 'purple', // FIXED: CodePen uses 'blue' (0x0080ff)

  ghostOpacity: 0.88,
  emissiveIntensity: 8.5, // FIXED: was 5.8
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  floatSpeed: 1.6, // FIXED: was 1.6

  // Comportamento do Ghost
  followSpeed: 0.05, // FIXED: was 0.05
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
  fireflyCount: 20, // CodePen cria 20 fireflies em createFireflies loop
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
  analogGrain: 1.4,
  analogBleeding: 1.5,
  analogScanlines: 0.7,
  analogVignette: 1.9,
  analogIntensity: 0.9,
  analogJitter: 0.5,
  analogVSync: 1.7,
  limboMode: false,

  // Parâmetros do Véu Atmosférico (MATCHED to CodePen Reference)
  revealRadius: 37, // Increased for better text readability
  fadeStrength: 0.7,
  baseOpacity: 0.08, // Darker background to create reveal contrast
  revealOpacity: -0.2, // Fully transparent reveal
};

// Helper para converter cor do config para formato numérico (Three.js)
export function getConfigColorHex(colorName: string): number {
  const hex = resolveConfigColor(colorName);
  return parseInt(hex.replace('#', ''), 16);
}
