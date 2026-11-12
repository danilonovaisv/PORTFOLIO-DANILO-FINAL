#!/usr/bin/env node
/**
 * Exportador Real de Dados: Supabase PostgreSQL → Cloudflare D1 (SQLite)
 * Executa queries paginadas no Supabase e gera inserts SQL compatíveis com D1.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Carregar variáveis de ambiente
const envPath = path.join(__dirname, '../.env.local');
const env = fs.existsSync(envPath)
  ? dotenv.parse(fs.readFileSync(envPath))
  : {};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Credenciais do Supabase não encontradas.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const TABLES = [
  'site_assets',
  'portfolio_projects',
  'portfolio_tags',
  'portfolio_project_tags',
  'landing_pages',
];

function escapeSqlValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    return "'" + value.replace(/'/g, "''") + "'";
  }
  if (typeof value === 'object') {
    return "'" + JSON.stringify(value).replace(/'/g, "''") + "'";
  }
  return "'" + String(value).replace(/'/g, "''") + "'";
}

function generateInsert(table, row) {
  const columns = Object.keys(row);
  const escapedColumns = columns.map((c) => `"${c}"`);
  const values = columns.map((c) => escapeSqlValue(row[c]));
  return `INSERT OR REPLACE INTO "${table}" (${escapedColumns.join(', ')}) VALUES (${values.join(', ')});`;
}

async function exportTableData(table) {
  console.log(`📦 Exportando tabela ${table}...`);
  let allRows = [];
  let page = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error(`❌ Erro ao buscar ${table}:`, error.message);
      break;
    }

    if (!data || data.length === 0) break;
    allRows = allRows.concat(data);
    if (data.length < pageSize) break;
    page++;
  }

  console.log(`✅ ${table}: ${allRows.length} registros exportados.`);
  return allRows.map((row) => generateInsert(table, row)).join('\n');
}

async function main() {
  console.log('🚀 Iniciando exportação real Supabase → D1 SQL...\n');

  let sqlOutput = `-- ================================================================\n`;
  sqlOutput += `-- D1 SQL MIGRATION DUMP (Exportado do Supabase)\n`;
  sqlOutput += `-- Data: ${new Date().toISOString()}\n`;
  sqlOutput += `-- ================================================================\n\n`;

  // Ler schema D1 unificado
  const d1SchemaPath = path.join(
    __dirname,
    '../supabase/migrations/20261110000000_create_d1_schema.sql'
  );
  if (fs.existsSync(d1SchemaPath)) {
    sqlOutput += `-- === TABELAS E ESTRUTURA D1 ===\n`;
    sqlOutput += fs.readFileSync(d1SchemaPath, 'utf8') + '\n\n';
  }

  sqlOutput += `-- === DADOS DAS TABELAS ===\n\n`;

  for (const table of TABLES) {
    const tableSql = await exportTableData(table);
    sqlOutput += `-- Dados: ${table}\n`;
    sqlOutput += tableSql + '\n\n';
  }

  const outputPath = path.join(__dirname, '../migration-d1-full.sql');
  fs.writeFileSync(outputPath, sqlOutput, 'utf8');

  console.log(`\n🎉 Dump D1 completo gerado com sucesso em: ${outputPath}`);
  console.log(
    `📊 Tamanho do arquivo: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`
  );
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
