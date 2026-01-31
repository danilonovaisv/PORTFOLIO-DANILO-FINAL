import type { PortfolioProject, ProjectCategory } from '@/types/project';

// Asset Constants (conforme regras de integridade)
const ASSETS = {
  BRANDING:
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Branding-Project.webp',
  KEY_VISUAL:
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Key-Visual.webp',
  MOTION:
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/webdesigner-2.gif',
  TECH: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/projects/campaign/cover.webp',
};

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
  {
    id: 'packaging',
    label: 'Packaging & Product',
    labelMobile: 'Packaging',
  },
];

export const showcaseProjects: PortfolioProject[] = [
  // TYPE A - PROJETOS DESTAQUE (HERO STYLE)
  {
    id: 'proj-01',
    slug: 'neon-genesis',
    title: 'Neon Genesis',
    subtitle: 'Brand Identity & Strategy',
    client: 'CyberCore Inc.',
    category: 'branding',
    displayCategory: 'Branding',
    year: 2024,
    image: ASSETS.BRANDING,
    type: 'A',
    layout: {
      cols: 'col-span-12', // Full width showcase
      height: 'h-[80vh]',
      order: 1,
    },
    detail: {
      description:
        'Uma identidade visual disruptiva para a maior corporação de segurança cibernética da Ásia. O projeto explora a dualidade entre proteção invisível e presença marcante.',
      highlights: ['Rebranding Completo', 'Design System', '3D Motion Assets'],
    },
    isFeatured: true,
  },
  {
    id: 'proj-02',
    slug: 'void-walkers',
    title: 'Void Walkers',
    subtitle: 'Immersive Web Experience',
    client: 'Ghost Studio',
    category: 'web',
    displayCategory: 'Web Design',
    year: 2023,
    image: ASSETS.KEY_VISUAL,
    type: 'A',
    layout: {
      cols: 'col-span-6',
      height: 'h-[600px]',
      order: 3,
    },
    detail: {
      description:
        'Experiência web imersiva utilizando WebGL para narrar a jornada dos exploradores do vazio. Performance extrema com visuais etéreos.',
      highlights: ['WebGL / R3F', 'Sound Design', 'Interactive Storytelling'],
    },
  },
  {
    id: 'proj-03',
    slug: 'future-retail',
    title: 'Future Retail',
    subtitle: 'Physical & Digital Integration',
    client: 'OmniStore',
    category: 'institucional',
    displayCategory: 'Retail',
    year: 2024,
    image: ASSETS.TECH,
    type: 'A',
    layout: {
      cols: 'col-span-6',
      height: 'h-[600px]',
      order: 4,
    },
    detail: {
      description:
        'Redefinindo o varejo físico através de interfaces digitais integradas ao ambiente. Uma ponte perfeita entre o e-commerce e a loja física.',
      highlights: ['UX Research', 'Interface Design', 'Prototyping'],
    },
  },

  // TYPE B - PROJETOS GRID (EDITORIAL STYLE)
  {
    id: 'proj-04',
    slug: 'kinetic-type',
    title: 'Kinetic Type Series',
    subtitle: 'Experimental Motion',
    client: 'Personal',
    category: 'motion',
    displayCategory: 'Motion',
    year: 2023,
    image: ASSETS.MOTION,
    type: 'B',
    layout: {
      cols: 'col-span-4',
      height: 'h-[400px]',
      order: 2,
    },
    detail: {
      description:
        'Série experimental de tipografia cinética explorando os limites da legibilidade e expressão visual em movimento.',
      highlights: ['After Effects', 'Typography', 'Social Media'],
    },
  },
  {
    id: 'proj-05',
    slug: 'eco-packaging',
    title: 'Eco Essence',
    subtitle: 'Sustainable Packaging',
    client: 'Natura Life',
    category: 'packaging',
    displayCategory: 'Packaging',
    year: 2023,
    image: ASSETS.BRANDING, // Reusing branding asset for packaging demo
    type: 'B',
    layout: {
      cols: 'col-span-4',
      height: 'h-[400px]',
      order: 5,
    },
    detail: {
      description:
        'Design de embalagem focado em sustentabilidade e experiência tátil. Materiais reciclados encontram acabamento premium.',
      highlights: ['Sustainable Design', 'Print Production', '3D Mockups'],
    },
  },
  {
    id: 'proj-06',
    slug: 'tech-launch',
    title: 'Tech Launch Q4',
    subtitle: 'Global Campaign',
    client: 'SaaS Giant',
    category: 'campanha',
    displayCategory: 'Advertising',
    year: 2024,
    image: ASSETS.TECH,
    type: 'B',
    layout: {
      cols: 'col-span-4',
      height: 'h-[400px]',
      order: 6,
    },
    detail: {
      description:
        'Campanha global de lançamento de produto SaaS. Foco em conversão e awareness através de visuais de alto impacto.',
      highlights: ['Art Direction', 'Social Ads', 'Landing Pages'],
    },
  },
];

export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: ProjectCategory
) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}

export const galleryProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'garoto-nestle',
    title: 'Garoto Nestlé',
    client: 'Nestlé',
    category: 'branding',
    displayCategory: 'Branding',
    year: 2024,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/projects/campaign/cover.webp',
    type: 'B',
    layout: {
      cols: 'col-span-1',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description:
        'Rebranding completo para uma das maiores marcas de chocolate do Brasil.',
    },
    tags: ['Branding', 'Packaging'],
  },
  {
    id: '2',
    slug: 'nescafe',
    title: 'Nescafé',
    client: 'Nestlé',
    category: 'web',
    displayCategory: 'Web Design',
    year: 2023,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/projects/creative-direction/hero.webp',
    type: 'B',
    layout: {
      cols: 'col-span-1',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description: 'Campanha digital global com foco em sustentabilidade.',
    },
    tags: ['Web', 'Campaign'],
  },
  {
    id: '3',
    slug: 'mpdv',
    title: 'MPDV',
    client: 'MPDV',
    category: 'institucional',
    displayCategory: 'Institucional',
    year: 2023,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/projects/key-visual/cover.webp',
    type: 'A',
    layout: {
      cols: 'col-span-2',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description: 'Plataforma de inteligência de dados para varejo.',
    },
    tags: ['Product', 'UI/UX'],
  },
  {
    id: '4',
    slug: 'swift',
    title: 'Swift',
    client: 'JBS',
    category: 'motion',
    displayCategory: 'Motion',
    year: 2022,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/projects/brand_video/hero.png',
    type: 'B',
    layout: {
      cols: 'col-span-1',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description: 'Série de vídeos em motion graphics para mídias sociais.',
    },
    tags: ['Motion', 'Social'],
  },
  {
    id: '5',
    slug: 'ambev',
    title: 'Ambev Tech',
    client: 'Ambev',
    category: 'web',
    displayCategory: 'Web',
    year: 2024,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Key-Visual.webp',
    type: 'A',
    layout: {
      cols: 'col-span-1',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description: 'Portal corporativo para talentos tech.',
    },
    tags: ['Web', 'Dev'],
  },
  {
    id: '6',
    slug: 'unilever',
    title: 'Unilever',
    client: 'Unilever',
    category: 'institucional',
    displayCategory: 'Accessibility',
    year: 2023,
    image:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/showcase/Branding-Project.webp',
    type: 'B',
    layout: {
      cols: 'col-span-1',
      height: 'h-[400px]',
      colsMobile: 'col-span-1',
    },
    detail: {
      description: 'Consultoria de acessibilidade e performance.',
    },
    tags: ['Consultoria', 'A11y'],
  },
];
