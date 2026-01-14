// =============================================================================
// Portfolio Projects Data - Ghost Era v2.0
// Fonte da verdade para todos os projetos do showcase
// =============================================================================

import type { PortfolioProject, ProjectCategory } from '@/types/project';

/**
 * Base URL para assets do Supabase
 */
const SUPABASE_CDN =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public';

/**
 * Helper para construir URLs de imagem
 */
const img = (path: string) => `${SUPABASE_CDN}/project-images/${path}`;

/**
 * Dados dos projetos do Portfolio
 * Ordem define a posição no grid (alternando tipos A e B)
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // =========================================================================
  // ROW 1 - Hero Banner (Type A)
  // =========================================================================
  {
    id: 'magic-radio',
    slug: 'magic-radio-branding',
    title: 'Magic Radio',
    subtitle: 'Devolvendo a magia ao rádio',
    client: 'Magic FM',
    category: 'branding',
    displayCategory: 'Branding & Identity',
    tags: ['Branding', 'Strategy', 'Visual Identity', 'Campaign'],
    year: 2023,
    image: img('converted.webp'),
    type: 'A',
    layout: {
      cols: 'md:col-span-6',
      height: 'h-[320px] md:h-[480px]',
    },
    accentColor: '#0057FF',
    isFeatured: true,
    detail: {
      description:
        'Reposicionamento completo da marca Magic Radio, trazendo modernidade e conexão emocional com a nova geração de ouvintes.',
      highlights: [
        'Nova identidade visual',
        'Sistema de design completo',
        'Campanha 360°',
      ],
      externalUrl: 'https://behance.net/danilonovais',
    },
  },
  {
    id: 'uniforme-esportivo',
    slug: 'uniforme-esportivo-design',
    title: 'Uniformes',
    subtitle: 'Design esportivo premium',
    client: 'Cliente Confidencial',
    category: 'branding',
    displayCategory: 'Design Esportivo',
    tags: ['Sportswear', 'Product Design', 'Mockup'],
    year: 2023,
    image: img('converted-(1).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-3',
      height: 'h-[280px] md:h-[400px]',
    },
    accentColor: '#FFD700',
  },
  {
    id: 'mesa-moderna',
    slug: 'furniture-minimal',
    title: 'Furniture',
    subtitle: 'Design minimalista',
    client: 'Studio Interno',
    category: 'institucional',
    displayCategory: 'Product Photography',
    tags: ['Photography', 'Product', 'Minimal'],
    year: 2024,
    image: img('converted-(2).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-3',
      height: 'h-[280px] md:h-[400px]',
    },
    accentColor: '#EEEEEE',
  },

  // =========================================================================
  // ROW 2 - Mosaico variado
  // =========================================================================
  {
    id: 'nestle-garoto',
    slug: 'nestle-garoto-campaign',
    title: 'Garoto - Nestlé',
    subtitle: 'Materiais de PDV para páscoa',
    client: 'Nestlé',
    category: 'campanha',
    displayCategory: 'Key Visual & Campaign',
    tags: ['Advertising', 'PDV', 'Easter Campaign'],
    year: 2022,
    image: img('converted-(9).webp'),
    type: 'A',
    layout: {
      cols: 'md:col-span-4',
      height: 'h-[320px] md:h-[520px]',
    },
    accentColor: '#FF3366',
    isFeatured: true,
    detail: {
      description:
        'Campanha de Páscoa para a linha Garoto da Nestlé, com presença nacional em pontos de venda.',
      highlights: [
        'PDV nacional',
        'Key Visual de campanha',
        'Materiais impressos e digitais',
      ],
    },
  },
  {
    id: 'cadeira-design',
    slug: 'chair-minimal-design',
    title: 'Design Chair',
    subtitle: 'Fotografia de produto',
    client: 'Studio',
    category: 'institucional',
    displayCategory: 'Minimal Photography',
    tags: ['Photo', 'Product', 'Minimalism'],
    year: 2024,
    image: img('converted-(3).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-2',
      height: 'h-[240px] md:h-[280px]',
    },
  },
  {
    id: 'nescafe-mug',
    slug: 'nescafe-product-photo',
    title: 'Nescafé',
    subtitle: 'Product photography',
    client: 'Nestlé',
    category: 'campanha',
    displayCategory: 'Product Photo',
    tags: ['Photography', 'Product', 'Advertising'],
    year: 2022,
    image: img('converted-(10).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-2',
      height: 'h-[240px] md:h-[280px]',
    },
    accentColor: '#E31C25',
  },

  // =========================================================================
  // ROW 3 - Full width + grid
  // =========================================================================
  {
    id: 'web-motion',
    slug: 'web-experience-motion',
    title: 'Web Experience',
    subtitle: 'Experiência web em movimento',
    client: 'Cliente Confidencial',
    category: 'web',
    displayCategory: 'Web & Motion',
    tags: ['Web Design', 'UI/UX', 'Animation', 'Development'],
    year: 2023,
    image: img('converted-(4).webp'),
    videoPreview: img('webdesigner-2%202.gif'),
    type: 'A',
    layout: {
      cols: 'md:col-span-6',
      height: 'h-[280px] md:h-[400px]',
    },
    accentColor: '#4fe6ff',
    isFeatured: true,
  },
  {
    id: 'stone-pagamentos',
    slug: 'stone-payment-ui',
    title: 'Stone',
    subtitle: 'Interface de pagamento',
    client: 'Stone Pagamentos',
    category: 'web',
    displayCategory: 'UI/UX Design',
    tags: ['UI/UX', 'Fintech', 'Product Design'],
    year: 2024,
    image: img('converted-(11).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-3',
      height: 'h-[280px] md:h-[360px]',
    },
    accentColor: '#00A868',
  },
  {
    id: 'manequim-fashion',
    slug: 'fashion-retail-visual',
    title: 'Fashion Retail',
    subtitle: 'Visual merchandising',
    client: 'Retail Client',
    category: 'institucional',
    displayCategory: 'Retail Design',
    tags: ['Retail', 'Visual Merchandising'],
    year: 2023,
    image: img('converted-(12).webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-3',
      height: 'h-[280px] md:h-[360px]',
    },
  },

  // =========================================================================
  // ROW 4 - Grid 2x2
  // =========================================================================
  {
    id: 'key-visual-seasonal',
    slug: 'seasonal-campaign-kv',
    title: 'Campanha Sazonal',
    subtitle: 'Key visual de verão',
    client: 'Cliente Confidencial',
    category: 'campanha',
    displayCategory: 'Key Visual',
    tags: ['Art Direction', 'Advertising', 'Retouching'],
    year: 2021,
    image: img('Key-Visual.webp'),
    type: 'A',
    layout: {
      cols: 'md:col-span-4',
      height: 'h-[300px] md:h-[440px]',
    },
    accentColor: '#FF6B00',
  },
  {
    id: 'branding-corporate',
    slug: 'corporate-brand-identity',
    title: 'Corporate Brand',
    subtitle: 'Identidade corporativa',
    client: 'Cliente Confidencial',
    category: 'branding',
    displayCategory: 'Branding',
    tags: ['Logo Design', 'Brand Guidelines', 'Stationery'],
    year: 2022,
    image: img('Branding-Project.webp'),
    type: 'B',
    layout: {
      cols: 'md:col-span-4',
      height: 'h-[300px] md:h-[440px]',
    },
    accentColor: '#8B5CF6',
  },
  {
    id: 'motion-graphics',
    slug: 'motion-graphics-reel',
    title: 'Motion Reel',
    subtitle: 'Animação e motion graphics',
    client: 'Portfólio Pessoal',
    category: 'motion',
    displayCategory: 'Motion Design',
    tags: ['After Effects', 'Animation', 'Motion Graphics'],
    year: 2024,
    image: img('videos-motions-thumb.webp'),
    videoPreview: img('webdesigner-2%202.gif'),
    type: 'B',
    layout: {
      cols: 'md:col-span-4',
      height: 'h-[300px] md:h-[440px]',
    },
    accentColor: '#4fe6ff',
  },
];

/**
 * Categorias disponíveis para filtro
 */
export const PROJECT_CATEGORIES: Array<{
  id: ProjectCategory;
  label: string;
  labelMobile: string;
}> = [
  { id: 'all', label: 'Todos os Projetos', labelMobile: 'Todos' },
  { id: 'branding', label: 'Branding & Identity', labelMobile: 'Branding' },
  { id: 'campanha', label: 'Campanhas & Advertising', labelMobile: 'Campanha' },
  { id: 'web', label: 'Web & Digital', labelMobile: 'Web' },
  { id: 'motion', label: 'Motion & Video', labelMobile: 'Motion' },
  {
    id: 'institucional',
    label: 'Institucional & Retail',
    labelMobile: 'Institucional',
  },
];

/**
 * Helper: Filtra projetos por categoria
 */
export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: ProjectCategory
): PortfolioProject[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

/**
 * Helper: Busca projeto por slug
 */
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

/**
 * Helper: Projetos em destaque
 */
export function getFeaturedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.isFeatured);
}
