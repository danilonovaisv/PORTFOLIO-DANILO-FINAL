-- D1 Schema for Cloudflare Migration
-- Generated: 2026-11-10

-- site_assets table
CREATE TABLE IF NOT EXISTS site_assets (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    key TEXT NOT NULL,
    bucket TEXT NOT NULL DEFAULT 'site-assets',
    file_path TEXT NOT NULL,
    asset_type TEXT NOT NULL,
    page TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER,
    href TEXT,
    metadata TEXT DEFAULT '{}',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    slug TEXT NOT NULL UNIQUE,
    client_slug TEXT NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    brand_name TEXT,
    year INTEGER,
    project_type TEXT NOT NULL,
    description TEXT,
    thumbnail_path TEXT,
    hero_image_path TEXT,
    url_landscape TEXT,
    url_square TEXT,
    gallery TEXT,
    featured_on_home BOOLEAN DEFAULT FALSE,
    featured_on_portfolio BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_site_assets_page ON site_assets(page, is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON portfolio_projects(slug);
