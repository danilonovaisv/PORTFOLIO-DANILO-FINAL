/**
 * Origin Section Data
 * Content blocks and the Canvas 2D particle-mask morph system for the AboutOrigin component.
 * Aligned with Ghost System SOBRE-PROTOTIPO-INTERATIVO.md and operational prompt specifications.
 *
 * Narrative Progression:
 * 01 / SENSIBILIDADE — O QUE PERMANECE (Matéria humana)
 * 02 / CRIAÇÃO — DO TRAÇO À INTENÇÃO (Gesto em estrutura)
 * 03 / DESIGN — A DESCOBERTA DO INVISÍVEL (Estrutura em significado)
 * 04 / EXPANSÃO — EXPANSÃO COM PROPÓSITO (Significado em sistema)
 *
 * Visual System:
 * The legacy 4-layer parallax scenes (`ORIGIN_SCENES`) are deprecated in favor of
 * `ORIGIN_PARTICLE_STAGES` — a Canvas 2D particle field that morphs between four
 * silhouette targets, one per narrative chapter. No Three.js / R3F: pure 2D context.
 */

export type FallbackImage =
  | 'about/origin/about.origin_image.1.webp'
  | 'about/origin/about.origin_image.2.webp'
  | 'about/origin/about.origin_image.3.webp'
  | 'about/origin/about.origin_image.4.webp';

export type MorphTarget = 'organic' | 'geometric' | 'structured' | 'expansive';

/**
 * Particle color palette for a single morph stage.
 * Ghost palette: Deep Blue `#0048ff`, Void Black `#040013`,
 * Ghost Accent `#4fe6ff`, Pink Details `#f501d3`, Purple Details `#8705f2`.
 * Purple/Pink allowed as accent details per Ghost Design System (hover/glitch only).
 */
export interface ParticleColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  detail1: string;
  detail2: string;
}

/**
 * Cursor-driven repulsion field applied to the particle field.
 */
export interface CursorRepulsionConfig {
  enabled: boolean;
  radius: number;
  strength: number;
}

/**
 * Animation tuning for a single morph stage.
 */
export interface ParticleAnimationConfig {
  speed: number;
  noiseScale: number;
  morphDuration: number;
}

/**
 * Configuration for one morph stage in the Canvas 2D particle-mask system.
 * Consumed by the future `OriginParticleScene.tsx` component.
 */
export interface ParticleStageConfig {
  id: number;
  name: string;
  description: string;
  particleCount: number;
  morphTarget: MorphTarget;
  colorPalette: ParticleColorPalette;
  bgColor: string;
  cursorRepulsion: CursorRepulsionConfig;
  animation: ParticleAnimationConfig;
  /** Supabase Storage keys kept for fallback imagery (legacy parallax layers). */
  fallbackLayers: string[];
}

/**
 * Legacy parallax scene config. Retained for backward compatibility with
 * `OriginParallaxScene.tsx`; superseded by `ParticleStageConfig`.
 */
export interface OriginParallaxLayerConfig {
  src: string;
  fallbackUrl: string;
  depth: number;
}

export interface OriginSceneConfig {
  id: number;
  name: string;
  description: string;
  layers: OriginParallaxLayerConfig[];
  scale: number;
  cycleMs: number;
  verticalRatio: number;
  motionMode: 'horizontal' | 'diagonal';
  wave: 'sine' | 'cosine';
}

export interface OriginBlock {
  id: number;
  chapter: string;
  phase: string;
  title: string;
  subtitle: string;
  caption: string;
  paragraph: string;
  /** Frase-âncora (já presente em `paragraph`) destacada em bluePrimary para escaneabilidade. */
  highlight?: string;
  fallback: FallbackImage;
  textAlign: 'left' | 'right';
  img?: string;
  assetKey: string;
  scene: ParticleStageConfig;
}

export const ORIGIN_INTRO = {
  eyebrow: 'ORIGEM',
  headline: 'Da intuição ao método.',
  description:
    'Como observação, desenho, design, comunicação e tecnologia transformaram o olhar autoral em método criativo e estratégico.',
} as const;

export const ORIGIN_BRIDGE = {
  text: 'O que começou como olhar virou método.',
  ctaText: 'Conheça as áreas de atuação',
  ctaHref: '#o-que-eu-faco',
} as const;

const SUPABASE_BASE_STORAGE =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets';

/**
 * Canvas 2D Particle-Mask Morph Stages
 * One stage per narrative chapter. Supersedes the legacy `ORIGIN_SCENES`.
 * Each stage defines a particle field that morphs to a silhouette target.
 */
export const ORIGIN_PARTICLE_STAGES: ParticleStageConfig[] = [
  {
    id: 1,
    name: 'SENSIBILIDADE',
    description:
      'Formas orgânicas emergem da observação — a essência que resiste ao tempo.',
    particleCount: 2000,
    morphTarget: 'organic',
    colorPalette: {
      primary: '#00e5ff', // Vibrant Cyan (jiro.build style)
      secondary: '#040013', // Void Black
      accent: '#4fe6ff', // Ghost Accent (brighter cyan)
      detail1: '#0048ff', // Deep Blue
      detail2: '#8705f2', // Purple Details
    },
    bgColor: '#040013',
    cursorRepulsion: { enabled: true, radius: 150, strength: 0.8 },
    animation: { speed: 0.3, noiseScale: 0.015, morphDuration: 1200 },
    fallbackLayers: [
      `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-0.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-1.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-2.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-3.webp`,
    ],
  },
  {
    id: 2,
    name: 'CRIAÇÃO',
    description: 'Do traço livre à estrutura intencional — gesto em geometria.',
    particleCount: 2000,
    morphTarget: 'geometric',
    colorPalette: {
      primary: '#00e5ff', // Vibrant Cyan
      secondary: '#040013', // Void Black
      accent: '#4fe6ff', // Ghost Accent (brighter cyan)
      detail1: '#8705f2', // Purple Details
      detail2: '#0048ff', // Deep Blue
    },
    bgColor: '#0a001a',
    cursorRepulsion: { enabled: true, radius: 150, strength: 0.8 },
    animation: { speed: 0.35, noiseScale: 0.018, morphDuration: 1000 },
    fallbackLayers: [
      `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-0.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-1.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-2.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-3.webp`,
    ],
  },
  {
    id: 3,
    name: 'DESIGN',
    description:
      'Estruturas invisíveis que conduzem — design como ferramenta silenciosa.',
    particleCount: 2000,
    morphTarget: 'structured',
    colorPalette: {
      primary: '#00e5ff', // Vibrant Cyan
      secondary: '#040013', // Void Black
      accent: '#8705f2', // Purple Details
      detail1: '#4fe6ff', // Ghost Accent (blueAccent)
      detail2: '#0048ff', // Deep Blue
    },
    bgColor: '#1a002e',
    cursorRepulsion: { enabled: true, radius: 150, strength: 0.8 },
    animation: { speed: 0.25, noiseScale: 0.012, morphDuration: 1400 },
    fallbackLayers: [
      `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-0.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-1.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-2.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-3.webp`,
    ],
  },
  {
    id: 4,
    name: 'EXPANSÃO',
    description:
      'Integração expansiva — estratégia, tecnologia e IA com propósito humano.',
    particleCount: 2200,
    morphTarget: 'expansive',
    colorPalette: {
      primary: '#8705f2', // Purple Details
      secondary: '#040013', // Void Black
      accent: '#4fe6ff', // Ghost Accent (brighter cyan)
      detail1: '#0048ff', // Deep Blue
      detail2: '#0048ff', // Deep Blue
    },
    bgColor: '#040013',
    cursorRepulsion: { enabled: true, radius: 150, strength: 0.8 },
    animation: { speed: 0.4, noiseScale: 0.02, morphDuration: 1000 },
    fallbackLayers: [
      `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-0.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-1.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-2.webp`,
      `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-3.webp`,
    ],
  },
];

/**
 * Content blocks with fallback images stored in Supabase & local fallbacks.
 * Each block represents an editorial chapter in the origin story.
 */
export const ORIGIN_CONTENT: OriginBlock[] = [
  {
    id: 1,
    chapter: '01',
    phase: 'SENSIBILIDADE',
    title: 'O QUE PERMANECE',
    subtitle: 'A',
    caption: 'Composição 01 — O olhar humano e a essência que resiste ao tempo',
    paragraph: `Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.`,
    highlight:
      'A essência das coisas sempre falou mais alto do que a superfície.',
    fallback: 'about/origin/about.origin_image.1.webp',
    textAlign: 'right',
    assetKey: 'about.origin_image.1',
    img: undefined,
    scene: ORIGIN_PARTICLE_STAGES[0],
  },
  {
    id: 2,
    chapter: '02',
    phase: 'CRIAÇÃO',
    title: 'DO TRAÇO À INTENÇÃO',
    subtitle: 'B',
    caption:
      'Composição 02 — Do improviso no papel à construção da direção visual',
    paragraph: `Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.`,
    highlight: 'aprendi a dar forma ao invisível',
    fallback: 'about/origin/about.origin_image.2.webp',
    textAlign: 'left',
    assetKey: 'about.origin_image.2',
    scene: ORIGIN_PARTICLE_STAGES[1],
  },
  {
    id: 3,
    chapter: '03',
    phase: 'DESIGN',
    title: 'A DESCOBERTA DO INVISÍVEL',
    subtitle: 'C',
    caption: 'Composição 03 — A estrutura que transforma sem fazer alarde',
    paragraph: `Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.`,
    highlight: 'o design verdadeiro não grita — ele conduz.',
    fallback: 'about/origin/about.origin_image.3.webp',
    textAlign: 'right',
    assetKey: 'about.origin_image.3',
    scene: ORIGIN_PARTICLE_STAGES[2],
  },
  {
    id: 4,
    chapter: '04',
    phase: 'EXPANSÃO',
    title: 'EXPANSÃO COM PROPÓSITO',
    subtitle: 'D',
    caption: 'Composição 04 — Integração entre estratégia, tecnologia e IA',
    paragraph: `Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.`,
    highlight:
      'Minha trajetória uniu intuição com método, arte com estratégia.',
    fallback: 'about/origin/about.origin_image.4.webp',
    textAlign: 'left',
    assetKey: 'about.origin_image.4',
    scene: ORIGIN_PARTICLE_STAGES[3],
  },
];
