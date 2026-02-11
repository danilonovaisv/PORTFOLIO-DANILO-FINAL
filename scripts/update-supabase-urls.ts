#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { normalizeStoragePath } from '../src/lib/supabase/urls';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

async function updateSupabaseUrls() {
  const shouldApply = process.argv.includes('--apply');

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
    console.error(
      'Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ou SUPABASE_SERVICE_KEY)'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: assets, error } = await supabase
    .from('site_assets')
    .select('id, file_path, bucket');

  if (error) {
    console.error('Erro ao buscar assets:', error);
    process.exit(1);
  }

  if (!assets || assets.length === 0) {
    console.log('Nenhum asset encontrado para atualizar');
    return;
  }

  const assetsToUpdate = assets
    .map((asset) => {
      const bucket = (asset.bucket ?? 'site-assets').replace(/^\/+|\/+$/g, '');
      const normalizedPath = normalizeStoragePath(asset.file_path, bucket);

      if (
        !asset.file_path ||
        !normalizedPath ||
        normalizedPath === asset.file_path
      ) {
        return null;
      }

      return {
        id: asset.id,
        bucket,
        from: asset.file_path,
        to: normalizedPath,
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    bucket: string;
    from: string;
    to: string;
  }>;

  if (assetsToUpdate.length === 0) {
    console.log('Nenhum asset com URL/caminho legado encontrado.');
    return;
  }

  console.log(`Assets com correção proposta: ${assetsToUpdate.length}`);
  console.table(
    assetsToUpdate.slice(0, 10).map((asset) => ({
      id: asset.id,
      from: asset.from,
      to: asset.to,
    }))
  );

  if (!shouldApply) {
    console.log(
      'Modo DRY-RUN: nenhuma atualização aplicada. Reexecute com --apply para persistir.'
    );
    return;
  }

  for (const asset of assetsToUpdate) {
    const { error: updateError } = await supabase
      .from('site_assets')
      .update({ file_path: asset.to })
      .eq('id', asset.id);
    if (updateError) throw updateError;
  }

  console.log('Correções de URL/caminho aplicadas com sucesso.');
}

updateSupabaseUrls().catch((error) => {
  console.error(error);
  process.exit(1);
});
