#!/usr/bin/env node
/**
 * Script de conversão SQL: PostgreSQL → D1 (Cloudflare)
 * Converte dumps do pg_dump para compatível com D1
 */

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'migration-d1-compatible.sql';

if (!inputFile) {
  console.error('Uso: node convert-sql-for-d1.js <input.sql> [output.sql]');
  process.exit(1);
}

console.log(`🔄 Convertendo ${inputFile} → ${outputFile}`);

let sql = fs.readFileSync(inputFile, 'utf-8');

// 1. Remover comentários PostgreSQL específicos
sql = sql.replace(/-- [^\n]*/g, '');
sql = sql.replace(/\/\*[\s\S]*?\*\//g, '');

// 2. Converter tipos de dados
const typeMappings = [
  // Boolean
  { pattern: /\bBOOLEAN\b/g, replace: 'INTEGER' },
  // Integer with defaults
  { pattern: /DEFAULT\s+TRUE/gi, replace: 'DEFAULT 1' },
  { pattern: /DEFAULT\s+FALSE/gi, replace: 'DEFAULT 0' },
  // Timestamp to TEXT
  { pattern: /TIMESTAMP\s+(WITH|WITHOUT)\s*TIME\s*ZONE/gi, replace: 'TEXT' },
  { pattern: /\bTIMESTAMPTZ\b/gi, replace: 'TEXT' },
  { pattern: /\bTIMESTAMP\b/gi, replace: 'TEXT' },
  // UUID to TEXT
  { pattern: /\bUUID\b/gi, replace: 'TEXT' },
  // Numeric types
  { pattern: /\bSERIAL\b/gi, replace: 'INTEGER' },
  { pattern: /\bBIGSERIAL\b/gi, replace: 'INTEGER' },
  { pattern: /\bSMALLSERIAL\b/gi, replace: 'INTEGER' },
  { pattern: /\bREAL\b/gi, replace: 'FLOAT' },
  { pattern: /\bDOUBLE\s*PRECISION\b/gi, replace: 'FLOAT' },
  // Text
  { pattern: /\bTEXT\b/gi, replace: 'TEXT' }, // mantém
  { pattern: /\bVARCHAR\s*\(\s*\d+\s*\)/gi, replace: 'TEXT' },
  { pattern: /\bCHAR\s*\(\s*\d+\s*\)/gi, replace: 'TEXT' },
];

for (const mapping of typeMappings) {
  sql = sql.replace(mapping.pattern, mapping.replace);
}

// 3. Corrigir DEFAULT values PostgreSQL → SQLite
sql = sql.replace(/\bgen_random_uuid\(\)/gi, "lower(hex(randomblob(16)))");
sql = sql.replace(/\bnow\(\)/gi, "datetime('now')");
sql = sql.replace(/\btimezone\s*\(\s*'utc'\s*,\s*now\(\)\)/gi, "datetime('now')");
sql = sql.replace(/\bCURRENT_TIMESTAMP\b/gi, "datetime('now')");
sql = sql.replace(/\bCURRENT_DATE\b/gi, "date('now')");

// 4. Remover OWNER TO
sql = sql.replace(/OWNER\s+TO\s+\w+/gi, '');

// 5. Remover SECURITY INVOKER
sql = sql.replace(/\("security_invoker"\s*=\s*'true'\)/g, '');
sql = sql.replace(/SECURITY\s+INVOKER/gi, '');

// 6. Remover funções/trigger functions desnecessárias
// Nota: D1 não suporta stored procedures complexas

// 7. Adicionar comentário de cabeçalho
const header = `-- D1-Compatible SQL Migration
-- Converted from PostgreSQL dump
-- Generated: ${new Date().toISOString()}
-- Warning: Some features may not be fully compatible (e.g., views, triggers)
\n`;

fs.writeFileSync(outputFile, header + sql);

console.log(`✅ SQL convertido e salvo em: ${outputFile}`);
console.log('\n📌 Para aplicar no D1:');
console.log(`   npx wrangler d1 execute portfolio-db --remote < ${outputFile}`);