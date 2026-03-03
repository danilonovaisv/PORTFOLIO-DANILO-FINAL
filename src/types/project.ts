// =============================================================================
// Portfolio Project Types - Ghost Era v2.1
// =============================================================================

/**
 * Tipo do projeto define o layout do card
 * - A: Cards grandes, hero-style
 * - B: Cards menores, grid-style
 */
export type ProjectType = 'A' | 'B';

/**
 * Categoria de projeto para filtros
 */
export type ProjectCategory =
  | 'branding'
  | 'campanha'
  | 'web'
  | 'motion'
  | 'institucional'
  | 'packaging'
  | 'Landing Page'
  | 'all';

/**
 * Destino explícito de navegação de um card.
 * Evita heurísticas baseadas em categoria/tag no clique.
 */
export type ProjectDestinationType =
  | 'modal'
  | 'internal_landing'
  | 'external_url'
  | 'page'; // Novo: Para cases ricos

export type HomeFeaturedCardStyle =
  | 'ANIMATED_BG_INVERTED_LOGO'
  | 'ANIMATED_BG_THUMB_OVERLAY_5';

export interface HomeFeaturedConfig {
  enabled: boolean;
  cardStyle: HomeFeaturedCardStyle;
  logoPath?: string | null;
}

export interface ProjectDestination {
  type: ProjectDestinationType;
  href?: string;
  landingSlug?: string;
  openInNewTab?: boolean;
  url?: string; // Padronização sugerida
}

/**
 * Layout Grid responsivo
 */
export interface ProjectGridLayout {
  cols: string;
  colsMobile?: string;
  height: string;
  aspectRatio?: string;
  size?: 'sm' | 'md' | 'lg' | 'wide' | 'tall';
  order?: number;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * Conteúdo detalhado do modal/página
 */
export interface ProjectDetail {
  description: string;
  highlights?: string[];
  credits?: Array<{ role: string; name: string }>;
  externalUrl?: string;
  gallery?: string[];
}

/**
 * Interface principal do projeto
 */
export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  client: string;
  category: ProjectCategory;
  displayCategory: string;
  tags?: string[];
  year: number;
  image: string;
  imageLandscape?: string;
  imageSquare?: string;
  hoverImage?: string;
  videoPreview?: string;
  thumbnailMedia?: string;
  type: ProjectType;
  layout: ProjectGridLayout;
  detail?: ProjectDetail;
  accentColor?: string;
  isFeatured?: boolean;
  featuredOnHome?: boolean;
  featuredOnPortfolio?: boolean;
  homeFeatured?: HomeFeaturedConfig;
  landingPageSlug?: string | null;
  link?: string;
  destination?: ProjectDestination;
  caseBody?: string | null; // NOVO
}

/**
 * Estado de filtro do showcase
 */
export interface PortfolioFilter {
  category: ProjectCategory;
  sortBy: 'recent' | 'featured' | 'alphabetical';
}

/**
 * Props para componentes de projeto
 */
export interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  className?: string;
  onOpen?: (_project: PortfolioProject) => void;
  isAnimating?: boolean;
}

/**
 * Props do Modal
 */
export interface ProjectModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}
