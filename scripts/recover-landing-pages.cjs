#!/usr/bin/env node
/**
 * Script de recuperação total de Landing Pages
 * Gera SQL completo para restaurar conteúdo em D1
 */

const fs = require('fs');
const path = require('path');

const FALLBACK_DATA = require('../src/lib/projects/landing-page-fallback').FALLBACK_LANDING_PAGES;

console.log('🔄 Gerando script de recuperação de Landing Pages...\n');

// Gerar INSERTs compatíveis com SQLite/D1
let sql = `-- Recovery SQL for Landing Pages (D1 Compatible)
-- Generated: ${new Date().toISOString()}
-- Este script insere ou atualiza landing pages com fallback seguro\n\n`;

for (const page of FALLBACK_DATA) {
  const safeContent = JSON.stringify(page.content).replace(/'/g, "''");
  const safeCover = page.cover ? `'${page.cover.replace(/'/g, "''")}'` : 'NULL';
  
  sql += `-- Project: ${page.slug}\n`;
  sql += `INSERT OR REPLACE INTO landing_pages (id, title, slug, cover, content, created_at)\n`;
  sql += `VALUES (\n`;
  sql += `  '${page.id}',\n`;
  sql += `  '${page.title.replace(/'/g, "''")}',\n`;
  sql += `  '${page.slug}',\n`;
  sql += `  ${safeCover},\n`;
  sql += `  '${safeContent}',\n`;
  sql += `  datetime('now')\n`;
  sql += `);\n\n`;
}

sql += `-- Índice para busca por slug
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);\n`;

// Salvar arquivo
const outputPath = path.join(__dirname, '../migration-landing-pages-recovery.sql');
fs.writeFileSync(outputPath, sql);

console.log(`✅ Arquivo gerado: ${outputPath}`);
console.log('\n📌 Para aplicar:');
console.log(`   npx wrangler d1 execute portfolio-db --remote < migration-landing-pages-recovery.sql`);
console.log('\n🔍 Páginas recuperadas:');
FALLBACK_DATA.forEach(p => console.log(`   • /projects/${p.slug} → ${p.title}`));
