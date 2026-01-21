#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import { promises as fs, readFileSync } from 'node:fs';
import { normalizeStoragePath } from '../src/lib/supabase/urls';

interface SiteAssetRow {
  id: string;
  key: string;
  bucket: string | null;
  file_path: string | null;
  updated_at: string | null;
}

function parseEnvFile(filePath: string): Record<string, string> {
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

/**
 * Main execution function
 * @returns {Promise<void>}
 */
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
      // Primeiro tenta normalizar o caminho
      const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');
      let normalizedPath = normalizeStoragePath(asset.file_path, bucket);
      
      // Verifica se a chave é inválida e precisa de correção
      let correctedKey = asset.key;
      if (asset.key && (asset.key.startsWith('updated_at:') || asset.key.startsWith('key:'))) {
        // Extrai a chave real do valor se possível
        const cleanedKey = asset.key.replace(/^key:\s*/i, '').replace(/^updated_at:\s*/i, '').trim();
        if (cleanedKey && !cleanedKey.startsWith('updated_at:') && !cleanedKey.startsWith('key:')) {
          correctedKey = cleanedKey;
        }
      }
      
      // Verifica se o caminho também contém informações de chave ou atualização
      if (asset.file_path && (asset.file_path.startsWith('updated_at:') || asset.file_path.startsWith('key:'))) {
        // Tenta extrair o caminho real
        const extractedPath = asset.file_path.replace(/^key:\s*/i, '')
                                         .replace(/^updated_at:\s*/i, '')
                                         .replace(/,$/, '')
                                         .trim();
        if (extractedPath && !extractedPath.startsWith('updated_at:') && !extractedPath.startsWith('key:')) {
          normalizedPath = normalizeStoragePath(extractedPath, bucket);
        }
      }
      
      // Determina se alguma atualização é necessária
      const needsUpdate = normalizedPath !== asset.file_path || correctedKey !== asset.key;
      
      if (!needsUpdate) return null;
      
      return {
        id: asset.id,
        file_path: normalizedPath,
        key: correctedKey,
        bucket,
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    file_path: string;
    key?: string;
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

  // Processar atualizações em lotes menores para evitar problemas com limites
  const batchSize = 50;
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    const { error: updateError } = await supabase
      .from('site_assets')
      .upsert(batch, { onConflict: 'id' });

    if (updateError) {
      console.error(`Erro ao atualizar lote ${Math.floor(i/batchSize) + 1}:`, updateError);
      throw updateError;
    }
    
    console.log(`Lote ${Math.floor(i/batchSize) + 1} de atualizações concluído (${Math.min(batchSize, updates.length - i)} registros)`);
  }

  console.log(
    'Concluído. Execute novamente para validar que não há mais duplicações.'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
