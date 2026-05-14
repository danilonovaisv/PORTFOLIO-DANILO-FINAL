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
  /**
   * Canonical destination URL persisted by the admin (`destination.url`).
   * Always prefer this field when reading the destination target.
   */
  url?: string;
  /**
   * @deprecated Use `url`. Retained for backwards compatibility with rows
   * persisted before the field was renamed; mappers normalise both aliases.
   */
  href?: string;
  landingSlug?: string;
  openInNewTab?: boolean;
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
 * Informações básicas compartilhadas entre Portfólio e Templates
 */
export interface BaseProjectData {
  slug: string;
  title: string;
  subtitle?: string;
  client?: string;
  year?: number;
  tags?: string[];
  summary?: string;
}

/**
 * Interface principal do projeto
 */
export interface PortfolioProject extends Omit<BaseProjectData, 'summary'> {
  id: string;
  shortDescription?: string; // Mantido por compatibilidade com DB legada
  category: ProjectCategory;
  displayCategory: string;
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
  caseBody?: string | null;
}
