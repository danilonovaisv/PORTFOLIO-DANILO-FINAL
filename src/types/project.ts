// =============================================================================
// Portfolio Project Types - Ghost Era v2.0
// =============================================================================

/**
 * Tipo do projeto define o layout do card
 * - A: Cards grandes, hero-style (6 colunas)
 * - B: Cards menores, grid-style (3 colunas)
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
  | 'all';

/**
 * Layout Grid responsivo
 */
export interface ProjectGridLayout {
  /** Colunas no desktop (ex: 'col-span-6') */
  cols: string;
  /** Colunas no mobile */
  colsMobile?: string;
  /** Altura do card (ex: 'h-[400px]') */
  height: string;
  /** Aspect ratio alternativo */
  aspectRatio?: string;
  /** Span predefinido para o grid editorial */
  size?: 'sm' | 'md' | 'lg' | 'wide' | 'tall';
  /** Ordem no grid */
  order?: number;
  /** Sizes used by Next/Image */
  sizes?: string;
}

/**
 * Conteúdo detalhado do modal
 */
export interface ProjectDetail {
  /** Parágrafo de descrição principal */
  description: string;
  /** Bullets ou destaques */
  highlights?: string[];
  /** Créditos/equipe */
  credits?: Array<{ role: string; name: string }>;
  /** Link externo (behance, site, etc) */
  externalUrl?: string;
  /** Galeria de imagens do projeto */
  gallery?: string[];
}

/**
 * Interface principal do Projeto
 */
export interface PortfolioProject {
  /** Identificador único */
  id: string;
  /** Slug para URL */
  slug: string;
  /** Título do projeto */
  title: string;
  /** Subtítulo ou tagline */
  subtitle?: string;
  /** Descrição curta para cards */
  shortDescription?: string;
  /** Cliente */
  client: string;
  /** Categoria principal */
  category: ProjectCategory;
  /** Display de categoria para UI */
  displayCategory: string;
  /** Tags adicionais */
  tags?: string[];
  /** Ano do projeto */
  year: number;
  /** Imagem principal (cover) */
  image: string;
  /** Imagem de hover (opcional) */
  hoverImage?: string;
  /** Vídeo de preview (opcional, para motion) */
  videoPreview?: string;
  /** Tipo de layout: A (grande) ou B (pequeno) */
  type: ProjectType;
  /** Configuração de layout no grid */
  layout: ProjectGridLayout;
  /** Conteúdo detalhado para o modal */
  detail?: ProjectDetail;
  /** Cor de destaque/gradiente do projeto */
  accentColor?: string;
  /** Projeto em destaque? */
  isFeatured?: boolean;
  featuredOnHome?: boolean;
  featuredOnPortfolio?: boolean;
  landingPageSlug?: string | null;
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
