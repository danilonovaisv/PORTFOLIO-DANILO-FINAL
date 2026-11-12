-- Cloudflare D1 SQLite Initial Baseline Schema (idempotent for local tests)

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client_name TEXT,
  brand_name TEXT,
  year INTEGER,
  project_type TEXT NOT NULL,
  short_label TEXT,
  description TEXT,
  thumbnail_path TEXT,
  hero_image_path TEXT,
  url_landscape TEXT,
  url_square TEXT,
  gallery TEXT DEFAULT '[]',
  featured_on_home INTEGER DEFAULT 0,
  featured_on_portfolio INTEGER DEFAULT 0,
  featured_home_order INTEGER,
  featured_portfolio_order INTEGER,
  home_featured TEXT DEFAULT '{}',
  is_published INTEGER DEFAULT 0,
  landing_page_id TEXT REFERENCES landing_pages(id) ON DELETE SET NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS landing_pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover TEXT,
  content TEXT NOT NULL DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_tags (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  kind TEXT DEFAULT 'category',
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_project_tags (
  project_id TEXT REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  tag_id TEXT REFERENCES portfolio_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

CREATE TABLE IF NOT EXISTS site_assets (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  bucket TEXT NOT NULL,
  file_path TEXT NOT NULL,
  asset_type TEXT,
  page TEXT DEFAULT 'global',
  description TEXT,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  metadata TEXT DEFAULT '{}',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

