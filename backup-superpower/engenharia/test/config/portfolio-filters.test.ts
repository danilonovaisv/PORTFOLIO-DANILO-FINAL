import {
  DEFAULT_PORTFOLIO_FILTER_ID,
  PORTFOLIO_FILTERS,
  getPortfolioCategoryQueryValue,
  mapCategoryToPortfolioFilter,
  normalizePortfolioCategoryQuery,
} from '@/config/portfolio';

describe('portfolio filters config', () => {
  it('expõe All Cases como filtro padrão e primeiro item do menu', () => {
    expect(DEFAULT_PORTFOLIO_FILTER_ID).toBe('all-cases');
    expect(PORTFOLIO_FILTERS[0]?.id).toBe('all-cases');
    expect(PORTFOLIO_FILTERS[0]?.label).toBe('All Cases');
  });

  it('mapeia ausência de categoria para All Cases', () => {
    expect(mapCategoryToPortfolioFilter()).toBe('all-cases');
    expect(mapCategoryToPortfolioFilter(null)).toBe('all-cases');
    expect(mapCategoryToPortfolioFilter('all')).toBe('all-cases');
    expect(mapCategoryToPortfolioFilter('All Cases')).toBe('all-cases');
  });

  it('normaliza categorias segmentadas e remove query para All Cases', () => {
    expect(mapCategoryToPortfolioFilter('branding')).toBe('brand-campaigns');
    expect(mapCategoryToPortfolioFilter('motion')).toBe('videos-motions');
    expect(mapCategoryToPortfolioFilter('web')).toBe('web-tech');
    expect(getPortfolioCategoryQueryValue('all-cases')).toBeUndefined();
    expect(normalizePortfolioCategoryQuery('all')).toBeUndefined();
    expect(normalizePortfolioCategoryQuery('branding')).toBe('branding');
  });
});
