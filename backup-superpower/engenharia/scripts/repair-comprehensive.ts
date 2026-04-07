#!/usr/bin/env node
/**
 * Comprehensive Asset Database Repair
 *
 * This script:
 * 1. Deletes corrupt records (timestamps, malformed paths)
 * 2. Detects which records will collide after normalization
 * 3. Keeps the most recently a record per collision group
 * 4. Normalizes remaining paths
 */

import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { normalizeStoragePath } from '../src/lib/supabase/urls';
import { fileURLToPath } from 'url';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SiteAssetRow {
  id: string;
  key: string;
  bucket: string | null;
  file_path: string | null;
  updated_at: string | null;
  asset_type: string | null;
}

function isCorruptData(value: string | null | undefined): boolean {
  if (!value) return false;
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(value)) return true;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) return true;
  if (/^(key|updated_at|file_path|bucket):\s*/.test(value)) return true;
  const segments = value.split('/');
  if (segments.length > 10) return true;
  if (segments.length > 3) {
    const firstHalf = segments
      .slice(0, Math.floor(segments.length / 2))
      .join('/');
    const secondHalf = segments
      .slice(Math.floor(segments.length / 2))
      .join('/');
    if (firstHalf === secondHalf) return true;
  }
  return false;
}

function cleanValue(
  value: string | null | undefined
): string | null | undefined {
  if (!value) return value;
  let cleaned = value;
  cleaned = cleaned.replace(/^key:\s*/i, '');
  cleaned = cleaned.replace(/^updated_at:\s*/i, '');
  cleaned = cleaned.replace(/^"+|"+$/g, '');
  cleaned = cleaned.replace(/^'+|'+$/g, '');
  cleaned = cleaned.replace(/,+$/g, '');
  cleaned = cleaned.trim();
  const segments = cleaned.split(/[.\/]/);
  if (segments.length >= 4) {
    const maxPrefix = Math.min(3, Math.floor(segments.length / 2));
    for (let len = 1; len <= maxPrefix; len++) {
      const first = segments.slice(0, len).join('|').toLowerCase();
      const second = segments
        .slice(len, len * 2)
        .join('|')
        .toLowerCase();
      if (first === second) {
        const deduped = [...segments.slice(0, len), ...segments.slice(len * 2)];
        cleaned = deduped.join(segments[0].includes('.') ? '.' : '/');
        break;
      }
    }
  }
  return cleaned || value;
}

async function main() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY,
  } = loadEnvOverrides();

  const supabaseUrl = normalizeEnvValue(
    NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL ?? undefined
  );
  const serviceRoleKey = normalizeEnvValue(
    SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY ?? undefined
  );

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at,asset_type');

  if (error) throw error;

  const rows = (data ?? []) as SiteAssetRow[];
  const backupPath = path.resolve(
    process.cwd(),
    `site_assets_backup-${Date.now()}.json`
  );
  await fs.writeFile(backupPath, JSON.stringify(rows, null, 2), 'utf8');
  console.log(`✅ Backup salvo em ${backupPath}\n`);

  // Step 1: Delete corrupt records
  const corruptIds = rows
    .filter((r) => isCorruptData(r.key) || isCorruptData(r.file_path))
    .map((r) => r.id);

  if (corruptIds.length > 0) {
    console.log(`🗑️  Deletando ${corruptIds.length} registros corruptos...`);
    const { error: deleteError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', corruptIds);
    if (deleteError) throw deleteError;
    console.log(`✅ Corruptos removidos.\n`);
  }

  // Step 2: Simulate normalization and detect collisions
  const validRows = rows.filter((r) => !corruptIds.includes(r.id));
  const normalizedKeyMap = new Map<string, SiteAssetRow[]>();

  validRows.forEach((asset) => {
    const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');
    const correctedKey = cleanValue(asset.key) ?? asset.key;
    const normalizedKey = correctedKey; // The key after cleanup

    if (!normalizedKeyMap.has(normalizedKey)) {
      normalizedKeyMap.set(normalizedKey, []);
    }
    normalizedKeyMap.get(normalizedKey)!.push(asset);
  });

  // Step 3: For each collision group, keep most recent, delete rest
  const idsToDelete: string[] = [];
  normalizedKeyMap.forEach((assets, normalizedKey) => {
    if (assets.length > 1) {
      console.log(
        `⚠️  Colisão detectada para chave "${normalizedKey}" (${assets.length} registros)`
      );
      assets.sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      });
      const [keep, ...remove] = assets;
      console.log(`   ✅ Mantendo: ${keep.id}`);
      remove.forEach((r) => {
        console.log(`   🗑️  Removendo: ${r.id}`);
        idsToDelete.push(r.id);
      });
    }
  });

  if (idsToDelete.length > 0) {
    console.log(
      `\n🗑️  Deletando ${idsToDelete.length} registros duplicados/colidentes...`
    );
    const { error: deleteDupError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', idsToDelete);
    if (deleteDupError) throw deleteDupError;
    console.log(`✅ Duplicatas removidas.\n`);
  }

  // Step 4: Now normalize paths for remaining records
  const remainingIds = validRows
    .filter((r) => !idsToDelete.includes(r.id))
    .map((r) => r.id);

  const { data: freshData, error: freshError } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at,asset_type')
    .in('id', remainingIds);

  if (freshError) throw freshError;

  const updates = (freshData ?? ([] as SiteAssetRow[]))
    .map((asset) => {
      const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');
      const correctedKey = cleanValue(asset.key) ?? asset.key;
      const correctedPath = cleanValue(asset.file_path) ?? asset.file_path;
      const normalizedPath = normalizeStoragePath(correctedPath, bucket);

      const needsUpdate =
        normalizedPath !== asset.file_path || correctedKey !== asset.key;

      if (!needsUpdate) return null;

      return {
        id: asset.id,
        file_path: normalizedPath,
        key: correctedKey,
        bucket,
        asset_type: asset.asset_type,
        updated_at: new Date().toISOString(),
      };
    })
    .filter(Boolean);

  if (updates.length === 0) {
    console.log('✅ Sem registros para normalizar.');
    return;
  }

  console.log(`🔧 Normalizando ${updates.length} registros...`);
  const batchSize = 50;
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    const { error: updateError } = await supabase
      .from('site_assets')
      .upsert(batch, { onConflict: 'id' });

    if (updateError) {
      console.error(
        `Erro ao atualizar lote ${Math.floor(i / batchSize) + 1}:`,
        updateError
      );
      throw updateError;
    }
  }

  console.log(`✅ Reparo concluído com sucesso!`);
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
