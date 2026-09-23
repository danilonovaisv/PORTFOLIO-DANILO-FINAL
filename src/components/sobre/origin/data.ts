/**
 * Origin Section Data
 * Content blocks and multi-layer parallax scenes for the AboutOrigin component.
 * Aligned with Ghost System SOBRE-PROTOTIPO-INTERATIVO.md and operational prompt specifications.
 *
 * Narrative Progression:
 * 01 / SENSIBILIDADE — O QUE PERMANECE (Matéria humana)
 * 02 / CRIAÇÃO — DO TRAÇO À INTENÇÃO (Gesto em estrutura)
 * 03 / DESIGN — A DESCOBERTA DO INVISÍVEL (Estrutura em significado)
 * 04 / EXPANSÃO — EXPANSÃO COM PROPÓSITO (Significado em sistema)
 */

export type FallbackImage =
  | 'about/origin/about.origin_image.1.webp'
  | 'about/origin/about.origin_image.2.webp'
  | 'about/origin/about.origin_image.3.webp'
  | 'about/origin/about.origin_image.4.webp';

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
  scene: OriginSceneConfig;
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

export const ORIGIN_SCENES: Record<number, OriginSceneConfig> = {
  1: {
    id: 1,
    name: 'SENSIBILIDADE',
    description:
      'Retrato em ambiente criativo representando sensibilidade e observação.',
    scale: 1.12,
    cycleMs: 8000,
    verticalRatio: 0,
    motionMode: 'horizontal',
    wave: 'cosine',
    layers: [
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-0.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-1/CAMADA-0.webp',
        depth: 0.006,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-1.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-1/CAMADA-1.webp',
        depth: 0.013,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-2.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-1/CAMADA-2.webp',
        depth: 0.024,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/ANIMA-FOTO/CAMADA-3.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-1/CAMADA-3.webp',
        depth: 0.04,
      },
    ],
  },
  2: {
    id: 2,
    name: 'CRIAÇÃO',
    description:
      'Composição de sketches e formas que evoluem do gesto para a estrutura.',
    scale: 1.16,
    cycleMs: 6000,
    verticalRatio: 0.28,
    motionMode: 'diagonal',
    wave: 'sine',
    layers: [
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-0.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-2/camada-0.webp',
        depth: 0.005,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-1.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-2/camada-1.webp',
        depth: 0.012,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-2.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-2/camada-2.webp',
        depth: 0.024,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/02-criacao/camada-3.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-2/camada-3.webp',
        depth: 0.042,
      },
    ],
  },
  3: {
    id: 3,
    name: 'DESIGN',
    description:
      'Composição abstrata sobre design, profundidade e estruturas invisíveis.',
    scale: 1.16,
    cycleMs: 6500,
    verticalRatio: 0.24,
    motionMode: 'diagonal',
    wave: 'sine',
    layers: [
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-0.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-3/camada-0.webp',
        depth: 0.0045,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-1.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-3/camada-1.webp',
        depth: 0.01,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-2.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-3/camada-2.webp',
        depth: 0.02,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/03-design/camada-3.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-3/camada-3.webp',
        depth: 0.035,
      },
    ],
  },
  4: {
    id: 4,
    name: 'EXPANSÃO',
    description:
      'Composição expansiva representando integração entre estratégia, tecnologia e criação.',
    scale: 1.16,
    cycleMs: 6000,
    verticalRatio: 0.28,
    motionMode: 'diagonal',
    wave: 'sine',
    layers: [
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-0.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-4/camada-0.webp',
        depth: 0.005,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-1.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-4/camada-1.webp',
        depth: 0.011,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-2.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-4/camada-2.webp',
        depth: 0.023,
      },
      {
        src: `${SUPABASE_BASE_STORAGE}/about/origin/04-expansao/camada-3.webp`,
        fallbackUrl: '/site.assets/about/origin/cena-4/camada-3.webp',
        depth: 0.039,
      },
    ],
  },
};

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
    scene: ORIGIN_SCENES[1],
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
    scene: ORIGIN_SCENES[2],
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
    scene: ORIGIN_SCENES[3],
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
    scene: ORIGIN_SCENES[4],
  },
];
