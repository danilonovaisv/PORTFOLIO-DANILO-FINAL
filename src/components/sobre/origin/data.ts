/**
 * Origin Section Data — Ghost System v3.0 (Cinema Reel Architecture Adaptation)
 * Layer 1 (Data): Narrative chapters, typographic structure, and dynamic asset keys
 * for the "Origem Criativa" section on /sobre.
 *
 * Narrative Progression:
 * 01 / SENSIBILIDADE — O QUE PERMANECE (Matéria humana)
 * 02 / CRIAÇÃO — DO TRAÇO À INTENÇÃO (Gesto em estrutura)
 * 03 / DESIGN — A DESCOBERTA DO INVISÍVEL (Estrutura em significado)
 * 04 / EXPANSÃO — EXPANSÃO COM PROPÓSITO (Significado em sistema)
 */

import { SITE_ASSET_KEYS } from "@/config/site-assets";

export type OriginAssetKey =
  (typeof SITE_ASSET_KEYS.about.originImages)[number];

export type OriginLocalWebpPath =
  | "/webp/about.origin_image.1.webp"
  | "/webp/about.origin_image.2.webp"
  | "/webp/about.origin_image.3.webp"
  | "/webp/about.origin_image.4.webp";

export interface OriginParallaxLayerConfig {
  src: string;
  fallbackUrl: string;
  depth: number;
  alt?: string;
}

export interface OriginSceneConfig {
  id: number;
  name: string;
  layers: OriginParallaxLayerConfig[];
  scale: number;
  cycleMs: number;
  verticalRatio: number;
  motionMode: "horizontal" | "diagonal";
  wave: "sine" | "cosine";
}

export interface OriginChapter {
  /** Unique slug identifier for the chapter */
  id: string;
  /** Numeric chapter sequence (1..4) */
  order: number;
  /** Two-digit chapter code ("01".."04") rendered in Geist Mono */
  chapter: string;
  /** Symbolic phase/arc label rendered in Playfair Display italic */
  year: string;
  /** All-caps metadata eyebrow (supports midpoint line break) */
  eyebrow: string;
  /** Uppercase display lines rendered in Playfair Display */
  titleLines: string[];
  /** Consolidated plain title for a11y and alt descriptions */
  title: string;
  /** Chapter discipline/phase category */
  category: string;
  /** Dynamic asset key resolved via useSiteAssetUrl */
  imageId: OriginAssetKey;
  /** Local WebP asset path in public/webp/ */
  fallback: OriginLocalWebpPath;
  /** Multi-paragraph narrative text rendered in Inter Tight */
  description: string;
  /** Key anchor sentence highlighted in bluePrimary (#0048ff) */
  highlight: string;
  /** Editorial frame caption */
  caption: string;
  /** Desktop editorial alignment alternation */
  textAlign: "left" | "right";
  /** Creative director label for Cinema Reel */
  director: string;
  /** Method philosophy label */
  method: string;
  /** Technical and editorial metadata stats for Cinema Reel */
  stats: {
    critics: number | string;
    audience: number | string;
    runtime: string;
    format: string;
    aspect: string;
    language: string;
    country: string;
  };
  /** Editorial quotes / reviews reflecting the chapter essence */
  awards: Array<{
    stars: number;
    label: string;
    quote: string;
  }>;
}

/** Alias kept for compatibility across origin modules */
export type OriginBlock = OriginChapter;

export const ORIGIN_INTRO = {
  eyebrow: "ORIGEM",
  headline: "Da intuição ao método.",
  description:
    "Como observação, desenho, design, comunicação e tecnologia transformaram o olhar autoral em método criativo e estratégico.",
} as const;

export const ORIGIN_BRIDGE = {
  eyebrow: "CONTINUIDADE",
  text: "O que começou como olhar virou método.",
  ctaText: "Conheça as áreas de atuação",
  ctaHref: "#04-o-que-eu-faco",
} as const;

export const ORIGIN_CHAPTERS: OriginChapter[] = [
  {
    id: "o-que-permanece",
    order: 1,
    chapter: "01",
    year: "I · Essência",
    eyebrow: "CAPÍTULO 01 · MATÉRIA HUMANA",
    titleLines: ["O QUE", "PERMANECE"],
    title: "O QUE PERMANECE",
    category: "SENSIBILIDADE",
    imageId: SITE_ASSET_KEYS.about.originImages[0],
    fallback: "/webp/about.origin_image.1.webp",
    caption: "Composição 01 — O olhar humano e a essência que resiste ao tempo",
    description: `Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.`,
    highlight:
      "A essência das coisas sempre falou mais alto do que a superfície.",
    textAlign: "left",
    director: "Danilo Novais",
    method: "Da Observação à Essência",
    stats: {
      critics: 99,
      audience: 100,
      runtime: "Atemporal",
      format: "Olhar Autoral",
      aspect: "16:9 Cinema",
      language: "Humano",
      country: "Brasil",
    },
    awards: [
      {
        stars: 5,
        label: "MATÉRIA HUMANA",
        quote: "A essência que resiste ao tempo e ao ruído.",
      },
      {
        stars: 5,
        label: "ATENÇÃO AO INVISÍVEL",
        quote: "O olhar focado no que fica, não no que passa.",
      },
      {
        stars: 5,
        label: "ESSÊNCIA",
        quote: "A sensibilidade antes de qualquer artifício.",
      },
    ],
  },
  {
    id: "do-traco-a-intencao",
    order: 2,
    chapter: "02",
    year: "II · Gesto",
    eyebrow: "CAPÍTULO 02 · GESTO EM ESTRUTURA",
    titleLines: ["DO TRAÇO À", "INTENÇÃO"],
    title: "DO TRAÇO À INTENÇÃO",
    category: "CRIAÇÃO",
    imageId: SITE_ASSET_KEYS.about.originImages[1],
    fallback: "/webp/about.origin_image.2.webp",
    caption:
      "Composição 02 — Do improviso no papel à construção da direção visual",
    description: `Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.`,
    highlight: "aprendi a dar forma ao invisível",
    textAlign: "right",
    director: "Danilo Novais",
    method: "Do Gesto à Estrutura",
    stats: {
      critics: 98,
      audience: 99,
      runtime: "Processo",
      format: "Direção Visual",
      aspect: "16:9 Cinema",
      language: "Visual",
      country: "Brasil",
    },
    awards: [
      {
        stars: 5,
        label: "DO TRAÇO AO CONCEITO",
        quote: "Do improviso no papel à direção visual sólida.",
      },
      {
        stars: 5,
        label: "GESTO AUTORAL",
        quote: "O instinto transformado em método de criação.",
      },
      {
        stars: 5,
        label: "FORMA AO INVISÍVEL",
        quote: "Ideias que ganham corpo e falam por si.",
      },
    ],
  },
  {
    id: "a-descoberta-do-invisivel",
    order: 3,
    chapter: "03",
    year: "III · Forma",
    eyebrow: "CAPÍTULO 03 · ESTRUTURA EM SIGNIFICADO",
    titleLines: ["A DESCOBERTA", "DO INVISÍVEL"],
    title: "A DESCOBERTA DO INVISÍVEL",
    category: "DESIGN",
    imageId: SITE_ASSET_KEYS.about.originImages[2],
    fallback: "/webp/about.origin_image.3.webp",
    caption: "Composição 03 — A estrutura que transforma sem fazer alarde",
    description: `Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.`,
    highlight: "o design verdadeiro não grita — ele conduz.",
    textAlign: "left",
    director: "Danilo Novais",
    method: "Da Forma ao Significado",
    stats: {
      critics: 100,
      audience: 98,
      runtime: "Precisão",
      format: "Design de Sistemas",
      aspect: "16:9 Cinema",
      language: "Estratégia",
      country: "Brasil",
    },
    awards: [
      {
        stars: 5,
        label: "O DESIGN QUE CONDUZ",
        quote: "O design verdadeiro não grita — ele conduz.",
      },
      {
        stars: 5,
        label: "TRANSFORMAÇÃO SILENCIOSA",
        quote: "Transformar sem que se perceba a transformação.",
      },
      {
        stars: 5,
        label: "INTENÇÃO ESTRUTURAL",
        quote: "Ferramenta invisível de potência e significado.",
      },
    ],
  },
  {
    id: "expansao-com-proposito",
    order: 4,
    chapter: "04",
    year: "IV · Sistema",
    eyebrow: "CAPÍTULO 04 · SIGNIFICADO EM SISTEMA",
    titleLines: ["EXPANSÃO COM", "PROPÓSITO"],
    title: "EXPANSÃO COM PROPÓSITO",
    category: "EXPANSÃO",
    imageId: SITE_ASSET_KEYS.about.originImages[3],
    fallback: "/webp/about.origin_image.4.webp",
    caption: "Composição 04 — Integração entre estratégia, tecnologia e IA",
    description: `Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.`,
    highlight:
      "Minha trajetória uniu intuição com método, arte com estratégia.",
    textAlign: "right",
    director: "Danilo Novais",
    method: "Do Significado ao Sistema",
    stats: {
      critics: 99,
      audience: 100,
      runtime: "Futuro",
      format: "IA & Estratégia",
      aspect: "16:9 Cinema",
      language: "Tecnologia",
      country: "Brasil",
    },
    awards: [
      {
        stars: 5,
        label: "SÍNTESE ESTRATÉGICA",
        quote: "Intuição com método, arte com estratégia.",
      },
      {
        stars: 5,
        label: "TECNOLOGIA & ALMA",
        quote: "IA para expandir sem perder a essência humana.",
      },
      {
        stars: 5,
        label: "SIGNIFICADO EM SISTEMA",
        quote: "O que começou como olhar virou método.",
      },
    ],
  },
];

export const ORIGIN_CONTENT = ORIGIN_CHAPTERS;
