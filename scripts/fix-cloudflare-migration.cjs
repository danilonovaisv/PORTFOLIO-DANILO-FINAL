#!/usr/bin/env node

/**
 * Script de correção parcial para migração Cloudflare
 *
 * Este script:
 * 1. Atualiza wrangler.toml com D1 binding
 * 2. Atualiza open-next.config.ts com D1 config
 * 3. Atualiza src/lib/env.ts para suportar Cloudflare-only mode
 * 4. Gera schema D1 básico
 *
 * USO: node scripts/fix-cloudflare-migration.js [d1-uuid]
 *
 * ATENÇÃO: Este script NÃO:
 * - Migrar dados do banco
 * - Alterar código de auth
 * - Modificar componentes React
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const D1_UUID = args[0] || 'SEU_UUID_AQUI';

console.log('🔧 Iniciando correção parcial da migração Cloudflare...');
console.log(`D1 UUID: ${D1_UUID}`);

// 1. Atualizar wrangler.toml
const wranglerPath = path.join(__dirname, '../wrangler.toml');
let wrangler = fs.readFileSync(wranglerPath, 'utf-8');

if (!wrangler.includes('[[d1_databases]]')) {
  const d1Config = `

# === D1 DATABASE (CORRIGIDO) ===
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_uuid = "${D1_UUID}"
`;
  wrangler += d1Config;
  fs.writeFileSync(wranglerPath, wrangler);
  console.log('✅ Atualizado wrangler.toml com D1 binding');
} else {
  console.log('ℹ️  wrangler.toml já tem D1 binding');
}

// 2. Atualizar open-next.config.ts
const openNextPath = path.join(__dirname, '../open-next.config.ts');
let openNext = fs.readFileSync(openNextPath, 'utf-8');

if (!openNext.includes('d1:')) {
  openNext = openNext.replace(
    "export default defineCloudflareConfig();",
    `export default defineCloudflareConfig({
  d1: {
    binding: 'DB',
  },
});`
  );
  fs.writeFileSync(openNextPath, openNext);
  console.log('✅ Atualizado open-next.config.ts com D1 config');
} else {
  console.log('ℹ️  open-next.config.ts já tem D1 config');
}

// 3. Atualizar src/lib/env.ts
const envPath = path.join(__dirname, '../src/lib/env.ts');
let env = fs.readFileSync(envPath, 'utf-8');

// Adicionar suporte para Cloudflare-only mode
if (!env.includes('CLOUDFLARE_ONLY')) {
  const newEnv = env.replace(
    'NODE_ENV: z',
    `CLOUDFLARE_ONLY: z.boolean().optional().default(false),
  NODE_ENV: z`
  );
  fs.writeFileSync(envPath, newEnv);
  console.log('✅ Atualizado src/lib/env.ts com CLOUDFLARE_ONLY');
}

// Adicionar process.env no final
if (!env.includes("'CLOUDFLARE_ONLY'")) {
  const newEnvEnd = env.replace(
    /(NODE_ENV: process\.env\.NODE_ENV \|\| 'development'),/,
    `$1,
  CLOUDFLARE_ONLY:
    process.env.CLOUDFLARE_ONLY === 'true' || undefined,`
  );
  fs.writeFileSync(envPath, newEnvEnd);
  console.log('✅ Adicionado CLOUDFLARE_ONLY ao process.env');
}

// 4. Gerar schema D1 básico
const migrationDir = path.join(__dirname, '../supabase/migrations');
const migrationFile = path.join(migrationDir, '20261110000000_create_d1_schema.sql');

if (!fs.existsSync(migrationFile)) {
  const schema = `-- D1 Schema for Cloudflare Migration
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
`;
  fs.writeFileSync(migrationFile, schema);
  console.log('✅ Criado schema D1 básico em supabase/migrations/');
} else {
  console.log('ℹ️  Schema D1 já existe');
}

console.log('\n✅ Correções parciais aplicadas com sucesso!');
console.log('\n📌 PRÓXIMOS PASSOS:');
console.log('1. Criar D1 Database no Cloudflare Dashboard');
console.log('2. Atualizar NEXT_PUBLIC_SUPABASE_URL nas variáveis de ambiente');
console.log('3. Migrar dados: wrangler d1 execute portfolio-db < backup.sql');
console.log('4. pnpm run build:cloudflare && wrangler deploy');