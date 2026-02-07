#!/usr/bin/env node

const { readFileSync } = require('fs');
const path = require('path');

const ENV_FILE = '.env.local';
const REQUIRED_KEYS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

function parseEnv(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const entries = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'));
  const env = {};
  for (const entry of entries) {
    const [key, ...rest] = entry.split('=');
    if (!key) continue;
    env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
  }
  return env;
}

function validateEnv() {
  const filePath = path.resolve(ENV_FILE);
  let fileEnv = {};
  try {
    fileEnv = parseEnv(filePath);
  } catch (error) {
    if (process.env.CI !== 'true') {
      console.error(`Não foi possível ler ${ENV_FILE}:`, error.message);
      process.exit(1);
    }
  }

  const missing = REQUIRED_KEYS.filter((key) => {
    const value = process.env[key] ?? fileEnv[key];
    return !value || value.length === 0;
  });

  if (missing.length) {
    const source = process.env.CI === 'true' ? 'CI/.env.local' : ENV_FILE;
    console.error(`As seguintes variáveis obrigatórias estão faltando em ${source}: ${missing.join(', ')}`);
    process.exit(1);
  }

  const source = process.env.CI === 'true' ? 'CI/.env.local' : ENV_FILE;
  console.log(`${source} validado com sucesso (${REQUIRED_KEYS.length} chaves).`);
}

validateEnv();
