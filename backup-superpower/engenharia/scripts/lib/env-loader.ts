import { readFileSync } from 'node:fs';

/**
 * Parse um arquivo .env e retorna um objeto com as variáveis
 * @param filePath - Caminho para o arquivo .env
 * @returns Objeto com as variáveis de ambiente
 */
export function parseEnvFile(filePath: string): Record<string, string> {
  const env: Record<string, string> = {};
  try {
    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (!key) continue;
      env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
    }
  } catch {
    // Ignora arquivo ausente
  }
  return env;
}

/**
 * Carrega variáveis de ambiente do .env e .env.local
 * .env.local tem prioridade sobre .env
 * @returns Objeto com as variáveis de ambiente carregadas
 */
export function loadEnvOverrides() {
  // Tenta carregar .env.local primeiro, depois .env como fallback
  const envLocalOverrides = parseEnvFile('.env.local');
  const envOverrides = parseEnvFile('.env');

  // Merge: .env.local tem prioridade sobre .env
  const overrides = { ...envOverrides, ...envLocalOverrides };

  return {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ??
      overrides.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      overrides.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL ?? overrides.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY:
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      overrides.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY:
      process.env.SUPABASE_SERVICE_KEY ?? overrides.SUPABASE_SERVICE_KEY,
    SUPABASE_ANON_KEY:
      process.env.SUPABASE_ANON_KEY ?? overrides.SUPABASE_ANON_KEY,
  };
}

/**
 * Normaliza valores de variáveis de ambiente removendo caracteres especiais
 * @param value - Valor a ser normalizado
 * @returns Valor normalizado
 */
export function normalizeEnvValue(
  value: string | undefined
): string | undefined {
  if (!value) return value;
  return value
    .replace(/[\u2018\u2019\u201C\u201D]/g, '')
    .replace(/[^\x00-\x7F]/g, '')
    .trim();
}
