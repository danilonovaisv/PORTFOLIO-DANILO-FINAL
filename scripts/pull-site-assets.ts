#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

async function pullAssets() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY,
  } = loadEnvOverrides();

  const supabaseUrl = normalizeEnvValue(
    NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL
  );
  const serviceRoleKey = normalizeEnvValue(
    SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_SERVICE_KEY
  );

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      '❌ Erro: Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const targetPath = path.resolve('src/config/site-assets.json');

  console.log('📡 Buscando assets do Supabase...');

  const { data, error } = await supabase
    .from('site_assets')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('❌ Erro ao buscar assets:', error.message);
    process.exit(1);
  }

  if (!data) {
    console.log('⚠️ Nenhum asset encontrado no banco.');
    return;
  }

  // Adicionar o file_url dinamicamente se não existir (baseado no bucket e path)
  const enrichedData = data.map((asset) => {
    if (!asset.file_url && asset.file_path && asset.bucket) {
      asset.file_url = `${supabaseUrl}/storage/v1/object/public/${asset.bucket}/${asset.file_path}`;
    }
    return asset;
  });

  // O formato atual em site-assets.json é um array contendo um objeto com a chave "export_json"
  const payload = [
    {
      export_json: enrichedData,
    },
  ];

  await fs.writeFile(targetPath, JSON.stringify(payload, null, 2), 'utf8');

  console.log(
    `✅ Sincronização concluída! ${enrichedData.length} assets salvos em:`
  );
  console.log(`📍 ${targetPath}`);
}

pullAssets().catch(console.error);
