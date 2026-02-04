#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { siteAssetRoleMap } from '../src/lib/supabase/asset-roles';
import { normalizeStoragePath } from '../src/lib/supabase/urls';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

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
  const resolved = path.resolve(filePath);
  try {
    const raw = await fs.readFile(resolved, 'utf8');

    // If the file is JSON, attempt to parse an array of paths
    if (path.extname(resolved).toLowerCase() === '.json') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map((p) => String(p).trim()).filter(Boolean);
        }
        // If parsed is an object with a `paths` or `assets` array, accept that too
        if (parsed && typeof parsed === 'object') {
          const arr = parsed.paths ?? parsed.assets ?? parsed.list ?? null;
          if (Array.isArray(arr)) {
            return arr.map((p) => String(p).trim()).filter(Boolean);
          }
        }
        // Fall back to newline parsing if JSON shape is unexpected
      } catch (err) {
        // If JSON parse fails, fall back to newline parsing below
      }
    }

    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e && e.code === 'ENOENT') {
      console.warn(
        `Input file not found: ${resolved}. No assets will be synced. Create ${DEFAULT_FILE} or pass a file list as the first argument.`
      );
      return [];
    }
    throw error;
  }
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
  const invalidEntries = payload.filter(
    (entry) =>
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
      console.warn('Atenção: os seguintes registros contêm dados inválidos:');
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
