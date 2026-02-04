import { readFileSync } from 'node:fs';
import path from 'node:path';

const ENV_FILE = '.env.local';
const REQUIRED_KEYS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

/**
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function parseEnv(filePath: string): Record<string, string> {
  const content = readFileSync(filePath, 'utf8');
  const entries = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'));
  const env: Record<string, string> = {};
  for (const entry of entries) {
    const [key, ...rest] = entry.split('=');
    if (!key) continue;
    env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
  }
  return env;
}

function validateEnv() {
  const filePath = path.resolve(ENV_FILE);
  let env: Record<string, string> = {};
  try {
    env = parseEnv(filePath);
  } catch (error) {
    console.error(
      `Não foi possível ler ${ENV_FILE}:`,
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }

  const missing = REQUIRED_KEYS.filter(
    (key) => !env[key] || env[key].length === 0
  );
  if (missing.length) {
    console.error(
      `As seguintes variáveis obrigatórias estão faltando em ${ENV_FILE}: ${missing.join(
        ', '
      )}`
    );
    process.exit(1);
  }

  console.log(
    `${ENV_FILE} validado com sucesso (${REQUIRED_KEYS.length} chaves).`
  );
}

validateEnv();
