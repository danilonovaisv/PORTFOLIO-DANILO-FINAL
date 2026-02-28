#!/usr/bin/env node

/**
 * Script para verificar as correções de assets duplicados
 * Este script verifica se os assets inválidos foram devidamente filtrados
 */

import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

async function verifyAssetCorrections() {
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

  console.log('Verificando correções de assets...');

  // Buscar todos os assets
  const { data: assets, error } = await supabase
    .from('site_assets')
    .select('id, key, file_path, bucket, page')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar assets:', error);
    process.exit(1);
  }

  if (!assets || assets.length === 0) {
    console.log('Nenhum asset encontrado');
    return;
  }

  console.log(`\nTotal de assets no banco de dados: ${assets.length}`);

  // Verificar diferentes tipos de problemas
  const invalidKeyAssets = assets.filter(
    (asset) =>
      asset.key.startsWith('updated_at:') ||
      asset.key.startsWith('key:') ||
      asset.key.startsWith('"key:') ||
      asset.key.startsWith('.keep') ||
      asset.key.trim() === ''
  );

  const invalidPathAssets = assets.filter(
    (asset) =>
      asset.file_path.includes('updated_at:') ||
      asset.file_path.includes('key:') ||
      asset.file_path.includes('".keep') ||
      asset.file_path.includes('storage/v1/object/public') // URLs completas armazenadas incorretamente
  );

  const duplicatedPathAssets = assets.filter(
    (asset) =>
      asset.file_path.includes('site-assets/site-assets') ||
      asset.file_path.includes('clients.clients.strip') ||
      asset.file_path.includes('about.hero.about.hero') ||
      asset.file_path.includes('about.method.about.method')
  );

  const duplicatedKeyAssets = assets.filter(
    (asset) =>
      asset.key.includes('clients.clients.strip') ||
      asset.key.includes('about.method.about.method') ||
      asset.key.includes('about.hero.about.hero') ||
      asset.key.includes('home.home.manifesto') ||
      asset.key.includes('about.origin.about.origin')
  );

  console.log('\n=== RESULTADOS DA VERIFICAÇÃO ===');
  console.log(
    `Assets com chaves inválidas (começam com "updated_at:", "key:", etc.): ${invalidKeyAssets.length}`
  );
  console.log(
    `Assets com caminhos inválidos (contêm "updated_at:", "key:", URLs completas): ${invalidPathAssets.length}`
  );
  console.log(
    `Assets com caminhos duplicados (padrões conhecidos): ${duplicatedPathAssets.length}`
  );
  console.log(
    `Assets com chaves duplicadas (padrões conhecidos): ${duplicatedKeyAssets.length}`
  );

  if (invalidKeyAssets.length > 0) {
    console.log('\nExemplos de assets com chaves inválidas:');
    invalidKeyAssets.slice(0, 5).forEach((asset) => {
      console.log(`  - ID: ${asset.id}, Key: ${asset.key}`);
    });
  }

  if (invalidPathAssets.length > 0) {
    console.log('\nExemplos de assets com caminhos inválidos:');
    invalidPathAssets.slice(0, 5).forEach((asset) => {
      console.log(`  - ID: ${asset.id}, FilePath: ${asset.file_path}`);
    });
  }

  if (duplicatedPathAssets.length > 0) {
    console.log('\nExemplos de assets com caminhos duplicados:');
    duplicatedPathAssets.slice(0, 5).forEach((asset) => {
      console.log(`  - ID: ${asset.id}, FilePath: ${asset.file_path}`);
    });
  }

  if (duplicatedKeyAssets.length > 0) {
    console.log('\nExemplos de assets com chaves duplicadas:');
    duplicatedKeyAssets.slice(0, 5).forEach((asset) => {
      console.log(`  - ID: ${asset.id}, Key: ${asset.key}`);
    });
  }

  // Calcular pontuação geral
  const totalIssues =
    invalidKeyAssets.length +
    invalidPathAssets.length +
    duplicatedPathAssets.length +
    duplicatedKeyAssets.length;

  console.log(`\nTotal de problemas identificados: ${totalIssues}`);

  if (totalIssues === 0) {
    console.log(
      '\n✅ Todas as correções de assets duplicados e inválidos foram bem-sucedidas!'
    );
    console.log(
      'A página admin deve agora exibir corretamente os assets válidos.'
    );
  } else {
    console.log(
      '\n⚠️  Ainda existem problemas com os assets que precisam ser corrigidos.'
    );
    console.log(
      'Considere executar novamente o script de correção: node scripts/fix-duplicate-assets.ts'
    );
  }
}

// Executar o script
verifyAssetCorrections().catch(console.error);
