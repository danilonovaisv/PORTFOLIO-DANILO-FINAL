#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

// Script para atualizar URLs antigas do Supabase no banco de dados
async function updateSupabaseUrls() {
  // Carregar variáveis de ambiente
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

  // URL antiga e nova
  const oldProjectUrl = 'umkmwbkwvulxtdodzmzf.supabase.co';
  const newProjectUrl = supabaseUrl.replace('https://', '').replace(/\/$/, '');

  console.log(
    `Atualizando URLs do projeto: ${oldProjectUrl} → ${newProjectUrl}`
  );

  // Obter todos os assets do banco de dados
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

  // Filtrar assets que contêm a URL antiga
  const assetsToUpdate = assets.filter(
    (asset) => asset.file_path && asset.file_path.includes(oldProjectUrl)
  );

  if (assetsToUpdate.length === 0) {
    console.log('Nenhum asset encontrado com a URL antiga');
    return;
  }

  console.log(`Encontrados ${assetsToUpdate.length} assets com URLs antigas`);

  // Atualizar cada asset com a nova URL
  for (const asset of assetsToUpdate) {
    const newFilePath = asset.file_path!.replace(
      `https://${oldProjectUrl}/storage/v1/object/public/${asset.bucket}/`,
      ''
    );

    console.log(
      `Atualizando asset ${asset.id}: ${asset.file_path} → ${newFilePath}`
    );

    const { error: updateError } = await supabase
      .from('site_assets')
      .update({ file_path: newFilePath })
      .eq('id', asset.id);

    if (updateError) {
      console.error(`Erro ao atualizar asset ${asset.id}:`, updateError);
    }
  }

  console.log('Atualização de URLs concluída!');
}

// Executar o script
updateSupabaseUrls().catch(console.error);
