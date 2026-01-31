#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader.ts';

/**
 * Script para corrigir assets duplicados e inconsistentes no banco de dados
 * Resolve problemas como:
 * - Duplicação de prefixos (ex: "clients.clients.strip.1")
 * - Metadados incorretos misturados com valores (ex: "updated_at: ...")
 * - Prefixos "key:" incluídos nos valores
 */

async function fixDuplicateAssets() {
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

  console.log('Buscando registros de assets...');

  // Buscar todos os assets
  const { data: assets, error } = await supabase
    .from('site_assets')
    .select('id, key, file_path, bucket, page, asset_type')
    .order('created_at', { ascending: true }); // Assumindo que existe um campo created_at

  if (error) {
    console.error('Erro ao buscar assets:', error);
    process.exit(1);
  }

  if (!assets || assets.length === 0) {
    console.log('Nenhum asset encontrado');
    return;
  }

  console.log(`Encontrados ${assets.length} assets para análise`);

  // Função para limpar valores
  const cleanValue = (
    value: string | null | undefined
  ): string | null | undefined => {
    if (!value) return value;

    let cleaned = value;

    // Remover prefixos de metadados
    cleaned = cleaned.replace(/^key:\s*/i, '');
    cleaned = cleaned.replace(/^updated_at:\s*/i, '');
    cleaned = cleaned.replace(/^page:\s*/i, '');

    // Remover aspas e vírgulas extras
    cleaned = cleaned.replace(/^"+|"+$/g, '');
    cleaned = cleaned.replace(/^'+|'+$/g, '');
    cleaned = cleaned.replace(/,+$/g, '');
    cleaned = cleaned.trim();

    // Remover duplicação de prefixos (ex: clients.clients.strip -> clients.strip)
    const segments = cleaned.split(/[\.\//]/);
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

  // Mapear os assets para determinar quais são válidos e quais devem ser excluídos
  const assetsByKey = new Map<string, typeof assets>();
  const assetsByPath = new Map<string, typeof assets>();

  for (const asset of assets) {
    const cleanKey = cleanValue(asset.key) || asset.key;
    const cleanPath = cleanValue(asset.file_path) || asset.file_path;

    // Agrupar por chave limpa
    if (!assetsByKey.has(cleanKey)) {
      assetsByKey.set(cleanKey, []);
    }
    assetsByKey.get(cleanKey)?.push(asset);

    // Agrupar por caminho limpo
    if (cleanPath) {
      if (!assetsByPath.has(cleanPath)) {
        assetsByPath.set(cleanPath, []);
      }
      assetsByPath.get(cleanPath)?.push(asset);
    }
  }

  // Identificar duplicatas para resolver
  const idsToDelete = new Set<string>();
  const updatesToPerform = new Map<
    string,
    {
      id: string;
      key: string;
      file_path: string | null;
      page?: string | null;
      bucket: string | null;
      asset_type: string;
    }
  >();

  // Processar grupos por chave
  for (const [cleanKey, group] of assetsByKey) {
    if (group.length > 1) {
      // Temos duplicatas com a mesma chave limpa
      // Vamos manter o mais recente e marcar os outros para exclusão
      const sortedGroup = group.sort((a, b) => {
        // Esta lógica assume que você tenha um campo de timestamp para ordenação
        // Se não tiver, vamos usar critérios heurísticos
        const isMetadataA =
          a.key.startsWith('updated_at:') || a.key.startsWith('key:');
        const isMetadataB =
          b.key.startsWith('updated_at:') || b.key.startsWith('key:');

        // Prefere não excluir registros que parecem ser metadados
        if (isMetadataA && !isMetadataB) return 1;
        if (!isMetadataA && isMetadataB) return -1;

        // Prefere registros com caminhos mais completos
        return (b.file_path?.length ?? 0) - (a.file_path?.length ?? 0);
      });

      // Manter o primeiro (melhor candidato), excluir os outros
      const keeper = sortedGroup[0];
      for (let i = 1; i < sortedGroup.length; i++) {
        idsToDelete.add(sortedGroup[i].id);
      }

      // Verificar se precisamos atualizar o keeper
      const originalKey = keeper.key;
      const originalPath = keeper.file_path;
      const originalPage = keeper.page;
      const newKey = cleanValue(originalKey);
      const newPath = cleanValue(originalPath);
      const newPage = cleanValue(originalPage);

      if (
        newKey !== originalKey ||
        newPath !== originalPath ||
        newPage !== originalPage
      ) {
        updatesToPerform.set(keeper.id, {
          id: keeper.id,
          key: newKey || originalKey,
          file_path: newPath || originalPath,
          page: newPage || originalPage,
          bucket: keeper.bucket, // Preservar o bucket
          asset_type: keeper.asset_type, // Preservar o tipo
        });
      }
    } else {
      // Registro único, mas talvez ainda precise de limpeza
      const asset = group[0];
      const originalKey = asset.key;
      const originalPath = asset.file_path;
      const originalPage = asset.page;
      const newKey = cleanValue(originalKey);
      const newPath = cleanValue(originalPath);
      const newPage = cleanValue(originalPage);

      if (
        newKey !== originalKey ||
        newPath !== originalPath ||
        newPage !== originalPage
      ) {
        updatesToPerform.set(asset.id, {
          id: asset.id,
          key: newKey || originalKey,
          file_path: newPath || originalPath,
          page: newPage || originalPage,
          bucket: asset.bucket, // Preservar o bucket
          asset_type: asset.asset_type, // Preservar o tipo
        });
      }
    }
  }

  // Processar grupos por caminho (similar ao acima)
  for (const [cleanPath, group] of assetsByPath) {
    if (group.length > 1) {
      // Agrupar por chave limpa para não interferir com o agrupamento anterior
      const groupedByKey = new Map<string, typeof group>();
      for (const asset of group) {
        const cleanKey = cleanValue(asset.key) || asset.key;
        if (!groupedByKey.has(cleanKey)) {
          groupedByKey.set(cleanKey, []);
        }
        groupedByKey.get(cleanKey)?.push(asset);
      }

      for (const [key, subGroup] of groupedByKey) {
        if (subGroup.length > 1) {
          // Mais duplicatas para resolver
          const sortedGroup = subGroup.sort((a, b) => {
            const isMetadataA =
              a.key.startsWith('updated_at:') || a.key.startsWith('key:');
            const isMetadataB =
              b.key.startsWith('updated_at:') || b.key.startsWith('key:');

            if (isMetadataA && !isMetadataB) return 1;
            if (!isMetadataA && isMetadataB) return -1;

            return (b.file_path?.length ?? 0) - (a.file_path?.length ?? 0);
          });

          const keeper = sortedGroup[0];
          for (let i = 1; i < sortedGroup.length; i++) {
            idsToDelete.add(sortedGroup[i].id);
          }

          const originalKey = keeper.key;
          const originalPath = keeper.file_path;
          const originalPage = keeper.page;
          const newKey = cleanValue(originalKey);
          const newPath = cleanValue(originalPath);
          const newPage = cleanValue(originalPage);

          if (
            newKey !== originalKey ||
            newPath !== originalPath ||
            newPage !== originalPage
          ) {
            updatesToPerform.set(keeper.id, {
              id: keeper.id,
              key: newKey || originalKey,
              file_path: newPath || originalPath,
              page: newPage || originalPage,
              bucket: keeper.bucket, // Preservar o bucket
              asset_type: keeper.asset_type, // Preservar o tipo
            });
          }
        }
      }
    }
  }

  console.log(`\nIdentificados ${idsToDelete.size} registros para exclusão`);
  console.log(
    `Identificados ${updatesToPerform.size} registros para atualização`
  );

  // Executar exclusões
  if (idsToDelete.size > 0) {
    const idsArray = Array.from(idsToDelete);
    console.log('Executando exclusões...');

    // Dividir em lotes menores para evitar problemas com limites
    const batchSize = 100;
    for (let i = 0; i < idsArray.length; i += batchSize) {
      const batch = idsArray.slice(i, i + batchSize);
      const { error: deleteError } = await supabase
        .from('site_assets')
        .delete()
        .in('id', batch);

      if (deleteError) {
        console.error('Erro ao excluir assets:', deleteError);
      } else {
        console.log(
          `Excluídos ${batch.length} assets (lote ${Math.floor(i / batchSize) + 1})`
        );
      }
    }
  }

  // Executar atualizações
  if (updatesToPerform.size > 0) {
    console.log('Executando atualizações...');

    const updatesArray = Array.from(updatesToPerform.values());

    // Dividir em lotes menores para evitar problemas com limites
    const batchSize = 50;
    for (let i = 0; i < updatesArray.length; i += batchSize) {
      const batch = updatesArray.slice(i, i + batchSize);
      const { error: updateError } = await supabase
        .from('site_assets')
        .upsert(batch, { onConflict: 'id' });

      if (updateError) {
        console.error('Erro ao atualizar assets:', updateError);
      } else {
        console.log(
          `Atualizados ${batch.length} assets (lote ${Math.floor(i / batchSize) + 1})`
        );
      }
    }
  }

  console.log('\nCorreção de assets duplicados concluída!');
  console.log(`- ${idsToDelete.size} registros removidos`);
  console.log(`- ${updatesToPerform.size} registros atualizados`);
}

// Executar o script
fixDuplicateAssets().catch(console.error);
