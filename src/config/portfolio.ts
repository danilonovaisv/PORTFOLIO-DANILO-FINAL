import type { ProjectCategory } from '@/types/project';

// Centraliza limites e flags da página de Portfólio
export const PORTFOLIO_PAGE_SIZE = 15;

// Produção: habilitar paginação server-side para reduzir payload e alinhar com count.
export const ENABLE_SERVER_PAGINATION = true;

export type PortfolioFilterId =
  | 'all-cases'
  | 'brand-campaigns'
  | 'videos-motions'
  | 'web-tech';

type PortfolioFilterDefinition = {
  id: PortfolioFilterId;
  label: string;
  queryValue?: 'branding' | 'motion' | 'web';
  categories?: readonly ProjectCategory[];
  projectTypes?: readonly string[];
  aliases: readonly string[];
};

export const DEFAULT_PORTFOLIO_FILTER_ID: PortfolioFilterId = 'all-cases';

export const PORTFOLIO_FILTERS: readonly PortfolioFilterDefinition[] = [
  {
    id: 'all-cases',
    label: 'All Cases',
    aliases: ['all', 'all-cases', 'all cases'],
  },
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    queryValue: 'branding',
    categories: ['branding', 'campanha', 'packaging', 'institucional'],
    projectTypes: [
      'Brand & Campaigns',
      'Branding & Identity',
      'Campanhas & Advertising',
      'Institucional & Retail',
      'Campanha',
      'Branding',
      'Packaging',
    ],
    aliases: ['branding', 'brand-campaigns', 'brand & campaigns'],
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    queryValue: 'motion',
    categories: ['motion'],
    projectTypes: ['Videos & Motions', 'Motion & Video'],
    aliases: ['motion', 'videos-motions', 'videos & motions'],
  },
  {
    id: 'web-tech',
    label: 'Websites & Tech',
    queryValue: 'web',
    categories: ['web', 'Landing Page'],
    projectTypes: [
      'Websites & Tech',
      'Web Campaigns, Websites & Tech',
      'Web & Digital',
    ],
    aliases: ['web', 'web-tech', 'websites & tech', 'websites-tech'],
  },
] as const;

export function getPortfolioFilterById(
  filterId: PortfolioFilterId
): PortfolioFilterDefinition {
  return (
    PORTFOLIO_FILTERS.find((filter) => filter.id === filterId) ??
    PORTFOLIO_FILTERS[0]
  );
}

export function mapCategoryToPortfolioFilter(
  category?: string | null
): PortfolioFilterId {
  const normalized = category?.trim().toLowerCase();
  if (!normalized) return DEFAULT_PORTFOLIO_FILTER_ID;

  return (
    PORTFOLIO_FILTERS.find(
      (filter) =>
        filter.queryValue === normalized || filter.aliases.includes(normalized)
    )?.id ?? DEFAULT_PORTFOLIO_FILTER_ID
  );
}

export function getPortfolioCategoryQueryValue(
  filterId: PortfolioFilterId
): 'branding' | 'motion' | 'web' | undefined {
  return getPortfolioFilterById(filterId).queryValue;
}

export function normalizePortfolioCategoryQuery(
  category?: string | null
): 'branding' | 'motion' | 'web' | undefined {
  return getPortfolioCategoryQueryValue(mapCategoryToPortfolioFilter(category));
}
