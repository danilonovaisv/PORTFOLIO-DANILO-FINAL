#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import { promises as fs, readFileSync } from 'node:fs';
import { normalizeStoragePath } from '../src/lib/supabase/urls';

type SiteAssetRow = {
  id: string;
  key: string;
  bucket: string | null;
  file_path: string | null;
  updated_at: string | null;
};

function parseEnvFile(filePath: string) {
  try {
    const content = readFileSync(filePath, 'utf8');
    return content
      .split(/\r?\n/)
      .reduce<Record<string, string>>((acc, line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return acc;
        const [key, ...rest] = trimmed.split('=');
        if (!key) return acc;
        acc[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
        return acc;
      }, {});
  } catch {
    return {};
  }
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
  };
}

async function main() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY,
  } = loadEnvOverrides();

  const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL;
  const serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (ou SUPABASE_SERVICE_KEY).'
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at');

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as SiteAssetRow[];
  const backupPath = path.resolve(
    process.cwd(),
    `site_assets_backup-${Date.now()}.json`
  );
  await fs.writeFile(backupPath, JSON.stringify(rows, null, 2), 'utf8');

  const updates = rows
    .map((asset) => {
      const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');
      const normalizedPath = normalizeStoragePath(asset.file_path, bucket);
      if (!normalizedPath || normalizedPath === asset.file_path) return null;
      return {
        id: asset.id,
        file_path: normalizedPath,
        bucket,
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    file_path: string;
    bucket: string;
  }>;

  if (updates.length === 0) {
    console.log('Nenhum registro com prefixo duplicado encontrado.');
    console.log(`Backup salvo em ${backupPath}`);
    return;
  }

  const preview = updates.slice(0, 5).map((u) => ({
    id: u.id,
    file_path: u.file_path,
  }));

  console.log(`Backup salvo em ${backupPath}`);
  console.log(`Corrigindo ${updates.length} registros em site_assets...`);
  console.table(preview);

  const { error: updateError } = await supabase
    .from('site_assets')
    .upsert(updates, { onConflict: 'id' });

  if (updateError) {
    throw updateError;
  }

  console.log(
    'Concluído. Execute novamente para validar que não há mais duplicações.'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
