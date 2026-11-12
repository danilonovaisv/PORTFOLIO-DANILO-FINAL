-- Cloudflare D1 SQLite Migration 0002
-- Adds routing destination, long-form case_body, and client_slug columns
-- plus query indexes compatible strictly with SQLite/D1.

ALTER TABLE portfolio_projects ADD COLUMN destination TEXT DEFAULT '{"type":"internal_landing"}';
ALTER TABLE portfolio_projects ADD COLUMN case_body TEXT;
ALTER TABLE portfolio_projects ADD COLUMN client_slug TEXT;

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug
  ON portfolio_projects(slug);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published_home
  ON portfolio_projects(is_published, featured_on_home, featured_home_order);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published_portfolio
  ON portfolio_projects(is_published, featured_on_portfolio, featured_portfolio_order);

CREATE INDEX IF NOT EXISTS idx_landing_pages_slug
  ON landing_pages(slug);

CREATE INDEX IF NOT EXISTS idx_site_assets_active_page
  ON site_assets(is_active, page, sort_order);

