/**
 * Origin Section Data — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 1 (Data): Narrative chapters, typographic structure, and dynamic asset keys
 * for the "Origem Criativa" section on /sobre.
 *
 * Supabase Storage Integration:
 * - Project Reference: umkmwbkwvulxtdodzmzf
 * - Bucket: site-assets
 * - Folder: about/origin/origin2/
 * - Assets: cena-01.webp, cena-02.webp, cena-03.webp, cena-04.webp
 * - Resolution: 2500x1406 (Aspect Ratio: 16:9 widescreen)
 */

import { SITE_ASSET_KEYS } from '@/config/site-assets';

export type OriginAssetKey =
  (typeof SITE_ASSET_KEYS.about.originImages)[number];

export const SUPABASE_ORIGIN_STORAGE_BASE =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/origin2';

export type OriginLocalWebpPath =
  | '/about/origin/origin2/cena-01.webp'
  | '/about/origin/origin2/cena-02.webp'
  | '/about/origin/origin2/cena-03.webp'
  | '/about/origin/origin2/cena-04.webp';

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
  motionMode: 'horizontal' | 'diagonal';
  wave: 'sine' | 'cosine';
}

export interface OriginFocusPoint {
  label: string;
  value: string;
}

export interface OriginChapter {
  /** Identificador único do capítulo */
  id: string;
  /** Sequência numérica (1..4) */
  order: number;
  /** Código de dois dígitos ("01".."04") */
  chapter: string;
  /** Fase romana / arco narrativo */
  year: string;
  /** Eyebrow editorial em caixa alta */
  eyebrow: string;
  /** Linhas de exibição do título monumental */
  titleLines: string[];
  /** Título consolidado para a11y */
  title: string;
  /** Categoria do eixo criativo */
  category: 'SENSIBILIDADE' | 'CRIAÇÃO' | 'DESIGN' | 'EXPANSÃO';
  /** Disciplina profissional */
  discipline: string;
  /** Princípio central da narrativa */
  principle: string;
  /** Chave de asset dinâmico */
  imageId: OriginAssetKey;
  /** URL canônica pública do Supabase Storage */
  supabaseUrl: string;
  /** Caminho do asset local WebP */
  fallback: OriginLocalWebpPath;
  /** Dimensões intrínsecas da mídia para CLS zero */
  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  /** Descrição concisa para o palco principal */
  description: string;
  /** Trecho âncora destacado em Ghost Cyan */
  highlight: string;
  /** Legenda do enquadramento */
  caption: string;
  /** Narrativa detalhada para o painel de contexto */
  story: string;
  /** Alinhamento editorial no desktop */
  textAlign: 'left' | 'right';
  /** Diretor / autor */
  director: string;
  /** Metodologia aplicada */
  method: string;
  /** Pilares estratégicos reais da disciplina */
  focusPoints: OriginFocusPoint[];
}

export type OriginBlock = OriginChapter;

export const ORIGIN_INTRO = {
  eyebrow: 'ORIGEM',
  headline: 'Da intuição ao método.',
  description:
    'Como a sensibilidade do olhar, a experimentação visual e o rigor técnico consolidaram uma trajetória orientada à essência, forma e impacto.',
} as const;

export const ORIGIN_BRIDGE = {
  eyebrow: 'CONTINUIDADE',
  headline: 'Do método à realização.',
  text: 'O que nasceu da intuição estrutura hoje marcas, experiências digitais e plataformas completas.',
  ctaText: 'Explorar áreas de atuação',
  ctaHref: '#04-o-que-eu-faco',
} as const;

export const ORIGIN_CHAPTERS: OriginChapter[] = [
  {
    id: 'o-que-permanece',
    order: 1,
    chapter: '01',
    year: 'I · Essência',
    eyebrow: 'CAPÍTULO 01 — MATÉRIA HUMANA',
    titleLines: ['O QUE', 'PERMANECE'],
    title: 'O QUE PERMANECE',
    category: 'SENSIBILIDADE',
    discipline: 'Direção de Arte & Observação',
    principle: 'A essência resiste ao ruído passageiro.',
    imageId: SITE_ASSET_KEYS.about.originImages[0],
    supabaseUrl: `${SUPABASE_ORIGIN_STORAGE_BASE}/cena-01.webp`,
    fallback: '/about/origin/origin2/cena-01.webp',
    dimensions: {
      width: 2500,
      height: 1406,
      aspectRatio: '16 / 9',
    },
    caption: 'Composição 01 — O olhar humano e a essência que resiste ao tempo',
    description:
      'Antes de qualquer técnica, há a atenção ao detalhe que sobrevive ao tempo. O processo criativo começa na capacidade de filtrar excessos e reconhecer o que realmente tem substância.',
    highlight: 'filtrar excessos e reconhecer o que realmente tem substância',
    story:
      'Desde cedo, aprendi a observar o que permanecia quando a novidade imediata passava. Na direção de arte e na vida, a sensibilidade precede o método: é preciso compreender a substância humana antes de propor qualquer intervenção visual.',
    textAlign: 'left',
    director: 'Danilo Novais',
    method: 'Da Observação à Essência',
    focusPoints: [
      { label: 'EIXO', value: 'Sensibilidade & Olhar' },
      { label: 'MÉTODO', value: 'Observação Crítica' },
      { label: 'ENTREGA', value: 'Identidade Atemporal' },
    ],
  },
  {
    id: 'do-traco-a-intencao',
    order: 2,
    chapter: '02',
    year: 'II · Gesto',
    eyebrow: 'CAPÍTULO 02 — DO INSTINTO À ESTRUTURA',
    titleLines: ['DO TRAÇO À', 'INTENÇÃO'],
    title: 'DO TRAÇO À INTENÇÃO',
    category: 'CRIAÇÃO',
    discipline: 'Identidade Visual & Composição',
    principle: 'O improviso no papel ganha direção e propósito.',
    imageId: SITE_ASSET_KEYS.about.originImages[1],
    supabaseUrl: `${SUPABASE_ORIGIN_STORAGE_BASE}/cena-02.webp`,
    fallback: '/about/origin/origin2/cena-02.webp',
    dimensions: {
      width: 2500,
      height: 1406,
      aspectRatio: '16 / 9',
    },
    caption:
      'Composição 02 — Da experimentação no papel à construção da direção visual',
    description:
      'Rabiscos espontâneos transformam-se em conceitos sólidos. O gesto inicial ganha rigor por meio de testes de ritmo, proporção e contraste, até que a ideia ganhe clareza e direção.',
    highlight:
      'o gesto inicial ganha rigor até que a ideia ganhe clareza e direção',
    story:
      'O processo nasceu no papel, nas margens de cadernos onde a intuição encontrava o primeiro registro. Com a prática contínua, o instinto foi lapidado: criar não é apenas expressar, mas testar e estruturar soluções que comunicam com precisão.',
    textAlign: 'right',
    director: 'Danilo Novais',
    method: 'Do Gesto à Estrutura',
    focusPoints: [
      { label: 'EIXO', value: 'Criação Autoral' },
      { label: 'MÉTODO', value: 'Rigor Composicional' },
      { label: 'ENTREGA', value: 'Direção Visual' },
    ],
  },
  {
    id: 'a-descoberta-do-invisivel',
    order: 3,
    chapter: '03',
    year: 'III · Forma',
    eyebrow: 'CAPÍTULO 03 — LINGUAGEM E ESTRUTURA',
    titleLines: ['A DESCOBERTA', 'DO INVISÍVEL'],
    title: 'A DESCOBERTA DO INVISÍVEL',
    category: 'DESIGN',
    discipline: 'Design de Sistemas & Experiência',
    principle: 'O design verdadeiro conduz sem precisar gritar.',
    imageId: SITE_ASSET_KEYS.about.originImages[2],
    supabaseUrl: `${SUPABASE_ORIGIN_STORAGE_BASE}/cena-03.webp`,
    fallback: '/about/origin/origin2/cena-03.webp',
    dimensions: {
      width: 2500,
      height: 1406,
      aspectRatio: '16 / 9',
    },
    caption: 'Composição 03 — A estrutura que transforma sem fazer alarde',
    description:
      'Design não é ornamento: é ferramenta silenciosa de transformação. Estruturas invisíveis de tipografia, ritmo e espaçamento orientam a percepção de forma natural e profunda.',
    highlight: 'estruturas invisíveis de tipografia, ritmo e espaçamento',
    story:
      'O design mais potente opera nos bastidores da percepção. Quando proporções, contraste e espaço negativo dialogam em harmonia, a experiência flui sem atrito. Transformar sem que se perceba o esforço da transformação: essa é a verdadeira sofisticação.',
    textAlign: 'left',
    director: 'Danilo Novais',
    method: 'Da Forma ao Significado',
    focusPoints: [
      { label: 'EIXO', value: 'Design de Sistemas' },
      { label: 'MÉTODO', value: 'Arquitetura Visual' },
      { label: 'ENTREGA', value: 'Clareza Operacional' },
    ],
  },
  {
    id: 'expansao-com-proposito',
    order: 4,
    chapter: '04',
    year: 'IV · Sistema',
    eyebrow: 'CAPÍTULO 04 — ESTRATÉGIA E TECNOLOGIA',
    titleLines: ['EXPANSÃO COM', 'PROPÓSITO'],
    title: 'EXPANSÃO COM PROPÓSITO',
    category: 'EXPANSÃO',
    discipline: 'Estratégia, IA & Direção Criativa',
    principle:
      'Tecnologia e inteligência artificial a serviço da sensibilidade humana.',
    imageId: SITE_ASSET_KEYS.about.originImages[3],
    supabaseUrl: `${SUPABASE_ORIGIN_STORAGE_BASE}/cena-04.webp`,
    fallback: '/about/origin/origin2/cena-04.webp',
    dimensions: {
      width: 2500,
      height: 1406,
      aspectRatio: '16 / 9',
    },
    caption:
      'Composição 04 — A integração entre estratégia, tecnologia e visão autoral',
    description:
      'A convergência entre comunicação, design e inteligência artificial expande o alcance criativo sem diluir a sensibilidade. A tecnologia opera como amplificador do método, nunca como substituto da visão.',
    highlight:
      'tecnologia como amplificador do método, nunca substituto da visão',
    story:
      'Com formação em Comunicação e atuação contínua em design e branding, adotei novas ferramentas e inteligência artificial para elevar o nível de entrega. Ferramentas evoluem rapidamente, mas seu impacto continuará dependendo do olhar humano que define sua direção.',
    textAlign: 'right',
    director: 'Danilo Novais',
    method: 'Do Significado ao Sistema',
    focusPoints: [
      { label: 'EIXO', value: 'Estratégia & Escala' },
      { label: 'MÉTODO', value: 'Processo Aumentado por IA' },
      { label: 'ENTREGA', value: 'Impacto & Relevância' },
    ],
  },
];

export const ORIGIN_CONTENT = ORIGIN_CHAPTERS;
