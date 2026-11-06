-- Ghost System: Performance Index Optimization
-- Date: 2026-11-02
-- Reference: umkmwbkwvulxtdodzmzf (portfolio-danilo)
-- ====================================================================

-- 1. Composite Index for Home Featured Projects
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portfolio_projects_home_display
  ON public.portfolio_projects (is_published, featured_on_home, featured_home_order ASC NULLS LAST)
  WHERE is_published = true AND featured_on_home = true;

-- 2. Composite Index for General Portfolio Catalog
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portfolio_projects_catalog_display
  ON public.portfolio_projects (is_published, featured_on_portfolio DESC NULLS LAST, featured_portfolio_order ASC NULLS LAST, year DESC)
  WHERE is_published = true;

-- 3. Created_at index for landing_pages
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_landing_pages_created_at_desc
  ON public.landing_pages (created_at DESC);

-- 4. Lookup index for content_version
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_version_lookup
  ON public.content_version (id, version);

