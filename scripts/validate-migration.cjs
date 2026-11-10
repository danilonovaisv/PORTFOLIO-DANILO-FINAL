#!/usr/bin/env node
/**
 * Script de validação da migração Cloudflare
 * Testa configurações locais antes de deploy
 */

const fs = require('fs');
const path = require('path');

let errors = 0;
let warnings = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`❌ ${message}`);
    errors++;
  } else {
    console.log(`✅ ${message}`);
  }
}

function warn(message) {
  console.warn(`⚠️  ${message}`);
  warnings++;
}

console.log('🔍 Validando configuração de migração Cloudflare...\n');

// 1. Verificar wrangler.toml
const wranglerPath = path.join(__dirname, '../wrangler.toml');
check(fs.existsSync(wranglerPath), 'wrangler.toml existe');
if (fs.existsSync(wranglerPath)) {
  const wrangler = fs.readFileSync(wranglerPath, 'utf-8');
  check(wrangler.includes('[[d1_databases]]'), 'D1 database configurado');
  check(wrangler.includes('PORTFOLIO_ASSETS'), 'R2 bucket PORTFOLIO_ASSETS configurado');
  check(!wrangler.includes('SEU_UUID_AQUI'), 'UUID do D1 preenchido (não placeholder)');
  check(wrangler.includes('[vars]'), 'Variáveis de ambiente configuradas em [vars]');
  check(wrangler.includes('CLOUDFLARE_ONLY'), 'CLOUDFLARE_ONLY configurado');
}

// 2. Verificar open-next.config.ts
const openNextPath = path.join(__dirname, '../open-next.config.ts');
check(fs.existsSync(openNextPath), 'open-next.config.ts existe');
if (fs.existsSync(openNextPath)) {
  const content = fs.readFileSync(openNextPath, 'utf-8');
  check(content.includes('d1:'), 'Configuração D1 presente no open-next');
  check(content.includes("binding: 'DB'"), 'Binding DB configurado');
}

// 3. Verificar schema D1
const migrationDir = path.join(__dirname, '../supabase/migrations');
check(fs.existsSync(migrationDir), 'Diretório supabase/migrations existe');
const d1SchemaFiles = fs.readdirSync(migrationDir).filter(f => f.endsWith('.sql'));
check(d1SchemaFiles.length > 0, `${d1SchemaFiles.length} arquivos de migração encontrados`);

// 4. Verificar scripts de migração
const fixScriptPath = path.join(__dirname, '../scripts/fix-cloudflare-migration.cjs');
const migrateScriptPath = path.join(__dirname, '../scripts/migrate-to-d1.cjs');
check(fs.existsSync(fixScriptPath), 'fix-cloudflare-migration.cjs existe');
check(fs.existsSync(migrateScriptPath), 'migrate-to-d1.cjs existe');

// 5. Verificar arquivos de documentação
check(fs.existsSync(path.join(__dirname, '../MIGRATION_COMPLETENESS.md')), 'MIGRATION_COMPLETENESS.md existe');
check(fs.existsSync(path.join(__dirname, '../MIGRATION_CORRECTION_PLAN.md')), 'MIGRATION_CORRECTION_PLAN.md existe');
check(fs.existsSync(path.join(__dirname, '../docs/walkthrough_migracao_cloudflare_20261110.md')), 'walkthrough existe');

// 6. Verificar package.json
const pkgPath = path.join(__dirname, '../package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  check(pkg.scripts['cf:deploy'], 'Script cf:deploy existe no package.json');
  check(pkg.scripts['build:cloudflare'], 'Script build:cloudflare existe');
  check(!!pkg.dependencies?.['@opennextjs/cloudflare'] || !!pkg.devDependencies?.['@opennextjs/cloudflare'], '@opennextjs/cloudflare instalado');
  check(!!pkg.dependencies?.wrangler || !!pkg.devDependencies?.wrangler, 'wrangler instalado');
}

// 7. Verificar variáveis de ambiente necessárias (não requer arquivo)
const requiredEnvVars = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
for (const envVar of requiredEnvVars) {
  const exists = process.env[envVar];
  check(exists === undefined || exists.length > 5, `${envVar} disponível no ambiente (ou deve ser configurado)`);
}

// Resumo
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Resultados: ${errors} erro(s), ${warnings} aviso(s)`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (errors > 0) {
  console.error('❌ Validação falhou. Corrija os erros antes de prosseguir.');
  process.exit(1);
}

if (warnings > 0) {
  warn('Existem advertências, mas a configuração parece OK para prosseguir.');
}

console.log('✅ Configuração de migração válida! Você pode prosseguir com:');
console.log('   1. Migrar dados: pg_dump | wrangler d1 execute portfolio-db --remote < backup.sql');
console.log('   2. Build: pnpm run build:cloudflare');
console.log('   3. Deploy: pnpm run cf:deploy');