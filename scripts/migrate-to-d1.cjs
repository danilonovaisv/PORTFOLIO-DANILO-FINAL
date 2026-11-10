#!/usr/bin/env node

/**
 * Script de migração de dados: Supabase → D1 (Cloudflare)
 *
 * Uso: node scripts/migrate-to-d1.js [--dry-run] [--table=site_assets|portfolio_projects|...]
 *
 * ATENCA̧ÕES:
 * - Precisa de credenciais Supabase (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
 * - Precisa do UUID do D1 configurado em wrangler.toml
 * - Execute: wrangler d1 execute portfolio-db < output.sql
 */

const fs = require('fs');
const path = require('path');

// Configuração
const TABLES = [
  'site_assets',
  'portfolio_projects',
  'portfolio_tags',
  'portfolio_project_tags',
  'landing_pages',
  'admin_tokens',
  'admin_users',
  'audit_log',
  'site_settings',
];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function escapeSqlValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'string') {
    return "'" + value.replace(/'/g, "''") + "'";
  }
  if (typeof value === 'object') {
    return "'" + JSON.stringify(value).replace(/'/g, "''") + "'";
  }
  return String(value);
}

function generateInsert(table, data) {
  const columns = Object.keys(data);
  const values = columns.map(c => escapeSqlValue(data[c]));
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')});`;
}

async function exportTable(table) {
  console.log(`📦 Exportando tabela: ${table}...`);

  // Simulacao para demonstracao
  // Na pratica, usaria supabase-js para fetch real
  const mockData = [
    { id: '1', key: 'global.logo', bucket: 'site-assets', file_path: 'global/logo.svg' }
  ];

  const statements = mockData.map(row => generateInsert(table, row));
  return statements.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const tableFilter = args.find(a => a.startsWith('--table='));

  console.log('🔧 Script de migração Supabase → D1');
  console.log(`Modo: ${dryRun ? 'DRY RUN (nao salva)' : 'EXECUCAO'}`));

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Erro: Variaveis de ambiente SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY necessarias');
    console.error('   Adicione ao seu .env.local:');
    console.error('   SUPABASE_URL=https://seu-projeto.supabase.co');
    console.error('   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role');
    process.exit(1);
  }

  let output = `-- Backup SQL gerado em: ${new Date().toISOString()}
-- Destino: Cloudflare D1 (portfolio-db)

`;

  const tablesToExport = tableFilter
    ? TABLES.filter(t => t === tableFilter.replace('--table=', ''))
    : TABLES;

  for (const table of tablesToExport) {
    try {
      const statements = await exportTable(table);
      output += `-- Dados para tabela: ${table}\n${statements}\n\n`;
    } catch (e) {
      console.error(`❌ Erro exportando ${table}: ${e.message}`);
    }
  }

  // Escrever arquivo de backup
  const outputPath = path.join(__dirname, '../migration-backup-' + new Date().toISOString().split('T')[0] + '.sql');

  if (dryRun) {
    console.log('\n📝 Conteudo gerado (nao salvo):\n');
    console.log(output.substring(0, 2000) + '...\n[truncado]');
  } else {
    fs.writeFileSync(outputPath, output);
    console.log(`✅ Backup salvo em: ${outputPath}`);
    console.log('\n📌 Para importar no D1:');
    console.log(`   wrangler d1 execute portfolio-db < ${outputPath}`);
  }
}

main().catch(e => {
  console.error('❌ Falha:', e.message);
  process.exit(1);
});