#!/usr/bin/env node
import { promises as fs, readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { siteAssetRoleMap } from '../src/lib/supabase/asset-roles';
import { normalizeStoragePath } from '../src/lib/supabase/urls';

const {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_SERVICE_KEY,
  SUPABASE_ANON_KEY,
} = loadEnvOverrides();
const supabaseUrl = normalizeEnvValue(
  NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL ?? undefined
);
const serviceRoleKey = normalizeEnvValue(
  SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY ?? SUPABASE_ANON_KEY
);

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY).'
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const DEFAULT_FILE = 'assets.json';

/**
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function parseEnvFile(filePath: string): Record<string, string> {
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
    // ignore missing file
  }
  return env;
}

function loadEnvOverrides() {
  const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
  const overrides = parseEnvFile(envFile);
  return {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ??
      overrides.NEXT_PUBLIC_SUPABASE_URL,
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
 * @param {string|undefined} value
 * @returns {string|undefined}
 */
function normalizeEnvValue(value: string | undefined): string | undefined {
  if (!value) return value;
  return value
    .replace(/[\u2018\u2019\u201C\u201D]/g, '')
    .replace(/[^\x00-\x7F]/g, '')
    .trim();
}

/**
 * @param {string} extension
 * @returns {string}
 */
function detectAssetType(extension: string): string {
  const ext = extension.toLowerCase();
  if (['svg', 'webp', 'png', 'jpg', 'jpeg', 'gif', 'avif'].includes(ext)) {
    return 'image';
  }
  if (['mp4', 'mov', 'webm', 'm4v'].includes(ext)) {
    return 'video';
  }
  if (['ttf', 'otf', 'woff', 'woff2'].includes(ext)) {
    return 'font';
  }
  if (['pdf', 'doc', 'docx'].includes(ext)) {
    return 'file';
  }
  return 'image';
}

/**
 * @param {string} key
 * @returns {number|null}
 */
function parseSortOrder(key: string): number | null {
  const segments = key.split('.');
  const last = segments[segments.length - 1];
  const candidate = Number(last);
  return Number.isNaN(candidate) ? null : candidate;
}

/**
 * @param {string} filePath
 * @returns {Promise<string[]>}
 */
async function readAssetList(filePath: string): Promise<string[]> {
  const raw = await fs.readFile(path.resolve(filePath), 'utf8');
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * @param {string} rawPath
 * @returns {Object}
 */
function buildRecordEntry(rawPath: string) {
  const normalizedInput = rawPath.replace(/^\/+/, '').replace(/"+/g, '');
  const bucketMatch = normalizedInput.match(
    /(?:object\/public|render\/image\/public)\/([^/]+)/
  );
  const bucket = bucketMatch?.[1] ?? 'site-assets';

  const cleanPath = normalizeStoragePath(normalizedInput, bucket);
  if (!cleanPath) {
    throw new Error(`Invalid path ${rawPath}`);
  }

  const pathSegments = cleanPath.split('/').filter(Boolean);
  if (pathSegments.length === 0) {
    throw new Error(`Invalid path ${rawPath}`);
  }

  const fileName = pathSegments.at(-1)!;
  if (!fileName.includes('.')) {
    throw new Error(`Expected file path but got ${rawPath}`);
  }
  const extension = path.extname(fileName).replace(/^\./, '').toLowerCase();
  const key = fileName.replace(path.extname(fileName), '') || fileName;
  const page = pathSegments[0];
  const role = siteAssetRoleMap.get(key);
  const asset_type = role?.asset_type ?? detectAssetType(extension);
  const sort_order = role?.sort_order ?? parseSortOrder(key);
  return {
    key: role?.key ?? key,
    bucket,
    file_path: cleanPath,
    asset_type,
    page: role?.page ?? page,
    description: role?.description ?? null,
    is_active: true,
    sort_order,
  } as const;
}

/**
 * Main execution function
 * @returns {Promise<void>}
 */
async function run() {
  const input = process.argv[2] ?? DEFAULT_FILE;
  const entries = await readAssetList(input);
  const unique = new Map<string, ReturnType<typeof buildRecordEntry>>();
  entries.forEach((rawPath) => {
    try {
      const record = buildRecordEntry(rawPath);
      unique.set(record.key, record);
    } catch (error) {
      console.warn(
        `Ignorando entrada inválida "${rawPath}":`,
        (error as Error).message
      );
    }
  });
  const payload = Array.from(unique.values());
  const duplicates = payload.filter((entry) =>
    entry.file_path.includes('site-assets/site-assets')
  );
  
  // Verificar duplicatas de outras formas
  const invalidEntries = payload.filter((entry) =>
    entry.key.startsWith('updated_at:') || 
    entry.key.startsWith('key:') ||
    entry.file_path.includes('updated_at:') ||
    entry.file_path.includes('key:')
  );
  
  if (duplicates.length > 0 || invalidEntries.length > 0) {
    if (duplicates.length > 0) {
      console.warn(
        'Atenção: os seguintes registros ainda contêm o prefixo duplicado "site-assets/site-assets":'
      );
      duplicates.forEach((entry) => {
        console.warn(`  key=${entry.key} → ${entry.file_path}`);
      });
    }
    
    if (invalidEntries.length > 0) {
      console.warn(
        'Atenção: os seguintes registros contêm dados inválidos:'
      );
      invalidEntries.forEach((entry) => {
        console.warn(`  key=${entry.key} → ${entry.file_path}`);
      });
    }
  }

  const { error } = await supabase
    .from('site_assets')
    .upsert(payload, { onConflict: 'key' });

  if (error) {
    console.error('Erro ao sincronizar assets:', error);
    process.exit(1);
  }

  console.log(`Sincronizados ${payload.length} assets em site_assets.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
