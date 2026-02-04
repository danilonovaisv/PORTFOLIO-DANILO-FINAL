#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { normalizeStoragePath } from '../src/lib/supabase/urls';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

interface SiteAssetRow {
  id: string;
  key: string;
  bucket: string | null;
  file_path: string | null;
  updated_at: string | null;
  asset_type: string | null;
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

  const supabaseUrl = normalizeEnvValue(
    NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL ?? undefined
  );
  const serviceRoleKey = normalizeEnvValue(
    SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY ?? undefined
  );

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (ou SUPABASE_SERVICE_KEY).'
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from('site_assets')
    .select('id,key,bucket,file_path,updated_at,asset_type');

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as SiteAssetRow[];
  const backupPath = path.resolve(
    process.cwd(),
    `site_assets_backup-${Date.now()}.json`
  );
  await fs.writeFile(backupPath, JSON.stringify(rows, null, 2), 'utf8');

  // Função auxiliar para limpar valores
  const cleanValue = (
    value: string | null | undefined
  ): string | null | undefined => {
    if (!value) return value;

    let cleaned = value;

    // Remover prefixos de metadados
    cleaned = cleaned.replace(/^key:\s*/i, '');
    cleaned = cleaned.replace(/^updated_at:\s*/i, '');

    // Remover aspas e vírgulas extras
    cleaned = cleaned.replace(/^"+|"+$/g, '');
    cleaned = cleaned.replace(/^'+|'+$/g, '');
    cleaned = cleaned.replace(/,+$/g, '');
    cleaned = cleaned.trim();

    // Remover duplicação de prefixos (ex: clients.clients.strip -> clients.strip)
    const segments = cleaned.split(/[.\//]/);
    if (segments.length >= 4) {
      const maxPrefix = Math.min(3, Math.floor(segments.length / 2));
      for (let len = 1; len <= maxPrefix; len++) {
        const first = segments.slice(0, len).join('|').toLowerCase();
        const second = segments
          .slice(len, len * 2)
          .join('|')
          .toLowerCase();
        if (first === second) {
          const deduped = [
            ...segments.slice(0, len),
            ...segments.slice(len * 2),
          ];
          cleaned = deduped.join(segments[0].includes('.') ? '.' : '/');
          break;
        }
      }
    }

    return cleaned || value; // Retorna o valor original se o resultado limpo for vazio
  };

  const updates = rows
    .map((asset) => {
      // Primeiro tenta normalizar o caminho
      const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');

      // Aplica limpeza tanto à chave quanto ao caminho
      const correctedKey = cleanValue(asset.key) ?? asset.key;
      const correctedPath = cleanValue(asset.file_path) ?? asset.file_path;

      const normalizedPath = normalizeStoragePath(correctedPath, bucket);

      // Determina se alguma atualização é necessária
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
    .filter(Boolean) as Array<{
    id: string;
    file_path: string;
    key?: string;
    bucket: string;
    asset_type?: string | null;
    updated_at: string;
  }>;

  if (updates.length === 0) {
    console.log(
      'Nenhum registro com dados inválidos ou duplicados encontrado.'
    );
    console.log(`Backup salvo em ${backupPath}`);
    return;
  }

  const preview = updates.slice(0, 5).map((u) => ({
    id: u.id,
    key: u.key,
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
      console.error(
        `Erro ao atualizar lote ${Math.floor(i / batchSize) + 1}:`,
        updateError
      );
      throw updateError;
    }

    console.log(
      `Lote ${Math.floor(i / batchSize) + 1} de atualizações concluído (${Math.min(batchSize, updates.length - i)} registros)`
    );
  }

  console.log(
    'Concluído. Execute novamente para validar que não há mais duplicações.'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
