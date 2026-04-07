#!/usr/bin/env node
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

// Helper to detect corrupt data
function isCorruptData(value: string | null | undefined): boolean {
  if (!value) return false;

  // Timestamp patterns (both with and without milliseconds)
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(value)) return true;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) return true;

  // Metadata prefixes leaked into values
  if (/^(key|updated_at|file_path|bucket):\s*/.test(value)) return true;

  // Excessive path repetition (malformed duplicates)
  const segments = value.split('/');
  if (segments.length > 10) return true;

  // Check for obvious repeating patterns (e.g., "about/method/about/method")
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

  // Fetch all records
  const { data, error } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at,asset_type');

  if (error) throw error;

  const rows = (data ?? []) as SiteAssetRow[];

  // Save backup
  const backupPath = path.resolve(
    process.cwd(),
    `site_assets_backup-${Date.now()}.json`
  );
  await fs.writeFile(backupPath, JSON.stringify(rows, null, 2), 'utf8');
  console.log(`✅ Backup salvo em ${backupPath}`);

  // Identify corrupt records
  const corruptIds = rows
    .filter((r) => isCorruptData(r.key) || isCorruptData(r.file_path))
    .map((r) => r.id);

  if (corruptIds.length > 0) {
    console.log(
      `\n🗑️  Encontrados ${corruptIds.length} registros corruptos (timestamps/malformed data).`
    );
    console.log('IDs:', corruptIds.slice(0, 5));

    // Delete corrupt records
    const { error: deleteError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', corruptIds);

    if (deleteError) {
      console.error('❌ Erro ao deletar registros corruptos:', deleteError);
      throw deleteError;
    }

    console.log(`✅ ${corruptIds.length} registros corruptos deletados.`);
  }

  // Now handle duplicates by key
  const keyMap = new Map<string, SiteAssetRow[]>();
  const validRows = rows.filter((r) => !corruptIds.includes(r.id));

  validRows.forEach((asset) => {
    if (!keyMap.has(asset.key)) {
      keyMap.set(asset.key, []);
    }
    keyMap.get(asset.key)!.push(asset);
  });

  // Find duplicate IDs (keep most recent by updated_at, delete rest)
  const duplicateIds: string[] = [];
  keyMap.forEach((assets, key) => {
    if (assets.length > 1) {
      console.log(
        `\n⚠️  Chave duplicada: "${key}" (${assets.length} registros)`
      );

      // Sort by updated_at descending (most recent first)
      assets.sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      });

      // Keep the most recent (first after sort), delete the rest
      const [keep, ...remove] = assets;
      console.log(
        `   ✅ Mantendo: ${keep.id} (atualizado: ${keep.updated_at})`
      );
      remove.forEach((r) => {
        console.log(`   🗑️  Removendo: ${r.id} (atualizado: ${r.updated_at})`);
        duplicateIds.push(r.id);
      });
    }
  });

  if (duplicateIds.length > 0) {
    console.log(
      `\n🗑️  Deletando ${duplicateIds.length} registros duplicados...`
    );

    const { error: deleteDupError } = await supabase
      .from('site_assets')
      .delete()
      .in('id', duplicateIds);

    if (deleteDupError) {
      console.error('❌ Erro ao deletar duplicatas:', deleteDupError);
      throw deleteDupError;
    }

    console.log(`✅ Duplicatas removidas.`);
  }

  console.log(
    '\n✅ Limpeza concluída. Execute o script de reparo novamente se necessário.'
  );
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
