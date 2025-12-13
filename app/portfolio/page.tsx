import PortfolioHero from '../../components/portfolio/PortfolioHero';
import PortfolioMosaicGrid from '../../components/portfolio/PortfolioMosaicGrid';
import type { MosaicItem, MosaicRow } from '../../components/portfolio/types';
import Clients from '../../components/home/Clients';
import Contact from '../../components/home/Contact';

const MOSAIC_SEED = 'portfolio-mosaic-v1';

const BASE_MOSAIC_ITEMS: MosaicItem[] = [
  {
    id: 'mosaic-magic',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    gradient:
      'linear-gradient(135deg, rgba(0,87,255,0.25), rgba(0,0,0,0.35))',
    accent: '#0057ff',
    title: 'Magic Studio Identity',
    subtitle: 'Identidade sensorial em motion',
  },
  {
    id: 'mosaic-branding',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    gradient:
      'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(0,87,255,0.22))',
    accent: '#0f172a',
    title: 'Flux Branding System',
    subtitle: 'Diretrizes visuais para o Flux Lab',
  },
  {
    id: 'mosaic-keyvisual',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    gradient:
      'linear-gradient(145deg, rgba(14,165,233,0.18), rgba(12,15,20,0.4))',
    accent: '#0ea5e9',
    title: 'Key Visual Campaign',
    subtitle: 'Narrativa visual para lançamento global',
  },
  {
    id: 'mosaic-motion',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    gradient:
      'linear-gradient(135deg, rgba(12,20,38,0.85), rgba(124,58,237,0.35))',
    accent: '#7c3aed',
    title: 'Motion Direction',
    subtitle: 'Explorações cinematográficas para apps',
  },
  {
    id: 'mosaic-thumb',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
    gradient:
      'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.22), transparent 35%), linear-gradient(160deg, rgba(0,87,255,0.24), rgba(12,12,16,0.65))',
    accent: '#2563eb',
    title: 'Focus Video Series',
    subtitle: 'Campanha de vídeo com storytelling',
  },
  {
    id: 'mosaic-welcome',
    imageSrc:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    gradient:
      'linear-gradient(125deg, rgba(255,255,255,0.04), rgba(17,24,39,0.75))',
    accent: '#0ea5e9',
    title: 'Welcome Ad Series',
    subtitle: 'Anúncios digitais para produto premium',
  },
  {
    id: 'mosaic-unilever',
    imageSrc: 'https://loandbehold.studio/app/uploads/2025/04/Unilever.png',
    gradient:
      'linear-gradient(140deg, rgba(255,255,255,0.1), rgba(0,0,0,0.55))',
    accent: '#2563eb',
    title: 'Unilever Retrospective',
    subtitle: 'Série editorial para marca global',
  },
  {
    id: 'mosaic-magic-2',
    imageSrc: 'https://loandbehold.studio/app/uploads/2025/04/Magic-1.png',
    gradient:
      'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,87,255,0.3))',
    accent: '#0057ff',
    title: 'Magic Concepts',
    subtitle: 'Explorações visuais para eventos',
  },
  {
    id: 'mosaic-epic',
    imageSrc: 'https://loandbehold.studio/app/uploads/2025/04/Epic.png',
    gradient:
      'linear-gradient(150deg, rgba(15,23,42,0.85), rgba(99,102,241,0.35))',
    accent: '#4f46e5',
    title: 'Epic Launch Package',
    subtitle: 'Identidade heroica para lançamento',
  },
  {
    id: 'mosaic-loop',
    gradient:
      'conic-gradient(from 120deg, rgba(0,87,255,0.36), rgba(255,255,255,0.08), rgba(12,17,35,0.9))',
    accent: '#0ea5e9',
    title: 'Loop Gradient Study',
    subtitle: 'Experimentos em motion design',
  },
  {
    id: 'mosaic-blur',
    gradient:
      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 32%), linear-gradient(160deg, rgba(0,0,0,0.7), rgba(0,87,255,0.2))',
    accent: '#111111',
    title: 'Blur Edge Visuals',
    subtitle: 'Texturas e luz para interface',
  },
  {
    id: 'mosaic-gold',
    gradient:
      'linear-gradient(135deg, rgba(255,214,165,0.55), rgba(255,255,255,0.1), rgba(26,42,76,0.75))',
    accent: '#fbbf24',
    title: 'Gold Experience',
    subtitle: 'Microsite interativo em WebGL',
  },
];

function hashSeed(seed: string): number {
  let hash = 1779033703 ^ seed.length;

  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  return hash >>> 0;
}

function createPRNG(seed: string): () => number {
  let state = hashSeed(seed) || 1;

  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;

    return ((state >>> 0) % 4294967296) / 4294967296;
  };
}

function shuffleArray<T>(input: T[], random: () => number): T[] {
  const array = [...input];

  for (let index = array.length - 1; index > 0; index -= 1) {
    const j = Math.floor(random() * (index + 1));
    [array[index], array[j]] = [array[j], array[index]];
  }

  return array;
}

function generateGridPattern(
  totalItems: number,
  random: () => number
): MosaicRow['columns'][] {
  const pattern: MosaicRow['columns'][] = [];
  let remaining = totalItems;

  while (remaining > 0) {
    const options = [1, 2, 3].filter((count) => count <= remaining) as MosaicRow['columns'][];
    const columns = options[Math.floor(random() * options.length)];
    pattern.push(columns);
    remaining -= columns;
  }

  return pattern;
}

function buildMosaicRows(): MosaicRow[] {
  const random = createPRNG(MOSAIC_SEED);
  const palette = shuffleArray(BASE_MOSAIC_ITEMS, random);
  const pattern = generateGridPattern(palette.length, random);

  let cursor = 0;

  return pattern.map((columns, rowIndex) => {
    const items = Array.from({ length: columns }, (_, itemIndex) => {
      const source = palette[(cursor + itemIndex) % palette.length];

      return {
        ...source,
        id: `${source.id}-r${rowIndex}-c${itemIndex}`,
      };
    });

    cursor += columns;

    return {
      id: `row-${rowIndex}`,
      columns,
      items,
    };
  });
}

export default function PortfolioPage() {
  const rows = buildMosaicRows();

  return (
    <>
      <PortfolioHero />
      <PortfolioMosaicGrid rows={rows} />
      <Clients />
      <Contact />
    </>
  );
}
