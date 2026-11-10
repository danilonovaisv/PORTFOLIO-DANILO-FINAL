-- D1 Schema for Cloudflare Migration
-- Generated: 2026-11-10
-- Single Source of Truth for SQLite / D1 table definitions

-- site_assets table
CREATE TABLE IF NOT EXISTS "site_assets" (
    "id" TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL DEFAULT 'site-assets',
    "file_path" TEXT NOT NULL,
    "asset_type" TEXT NOT NULL,
    "page" TEXT,
    "description" TEXT,
    "is_active" INTEGER DEFAULT 1,
    "sort_order" INTEGER,
    "metadata" TEXT DEFAULT '{}',
    "created_at" TEXT DEFAULT (datetime('now')),
    "updated_at" TEXT DEFAULT (datetime('now'))
);

-- portfolio_projects table
CREATE TABLE IF NOT EXISTS "portfolio_projects" (
    "id" TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "brand_name" TEXT,
    "year" INTEGER,
    "project_type" TEXT NOT NULL,
    "short_label" TEXT,
    "description" TEXT,
    "thumbnail_path" TEXT,
    "hero_image_path" TEXT,
    "url_landscape" TEXT,
    "url_square" TEXT,
    "gallery" TEXT DEFAULT '[]',
    "featured_on_home" INTEGER DEFAULT 0,
    "featured_on_portfolio" INTEGER DEFAULT 0,
    "featured_home_order" INTEGER,
    "featured_portfolio_order" INTEGER,
    "home_featured" INTEGER DEFAULT 0,
    "is_published" INTEGER DEFAULT 1,
    "landing_page_id" TEXT,
    "created_at" TEXT DEFAULT (datetime('now')),
    "updated_at" TEXT DEFAULT (datetime('now'))
);

-- portfolio_tags table
CREATE TABLE IF NOT EXISTS "portfolio_tags" (
    "id" TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "slug" TEXT NOT NULL UNIQUE,
    "label" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'category',
    "description" TEXT,
    "sort_order" INTEGER,
    "created_at" TEXT DEFAULT (datetime('now'))
);

-- portfolio_project_tags table
CREATE TABLE IF NOT EXISTS "portfolio_project_tags" (
    "project_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    PRIMARY KEY ("project_id", "tag_id")
);

-- landing_pages table
CREATE TABLE IF NOT EXISTS "landing_pages" (
    "id" TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "cover" TEXT,
    "content" TEXT NOT NULL DEFAULT '[]',
    "created_at" TEXT DEFAULT (datetime('now'))
);

-- Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_site_assets_key ON "site_assets"("key");
CREATE INDEX IF NOT EXISTS idx_site_assets_page ON "site_assets"("page", "is_active");
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON "portfolio_projects"("slug");
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON "portfolio_projects"("featured_on_home", "is_published");
CREATE INDEX IF NOT EXISTS idx_portfolio_tags_slug ON "portfolio_tags"("slug");
