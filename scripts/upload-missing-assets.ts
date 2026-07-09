import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';

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
    console.error(
      '❌ Erro: Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Mapeamento dos assets que temos localmente e que precisam estar no Supabase
  const assetsToUpload = [
    {
      localPath: 'public/site.assets/3d/ghost-v1.glb',
      bucket: 'site-assets',
      supabasePath: '3d/ghost-v1.glb',
      contentType: 'application/octet-stream',
    },
    {
      localPath: 'public/models/ghost.glb',
      bucket: 'site-assets',
      supabasePath: '3d/ghost.glb',
      contentType: 'application/octet-stream',
    },
  ];

  console.log(
    '⚡ Iniciando upload dos assets locais de modelo 3D para o Supabase Storage...\n'
  );

  for (const asset of assetsToUpload) {
    const fullLocalPath = path.resolve(process.cwd(), asset.localPath);
    if (!fs.existsSync(fullLocalPath)) {
      console.warn(
        `⚠️ Arquivo local não encontrado: ${asset.localPath} - Pulando...`
      );
      continue;
    }

    console.log(
      `📤 Enviando ${asset.localPath} para bucket "${asset.bucket}" no caminho "${asset.supabasePath}"...`
    );
    const fileBuffer = fs.readFileSync(fullLocalPath);

    const { data, error } = await supabase.storage
      .from(asset.bucket)
      .upload(asset.supabasePath, fileBuffer, {
        contentType: asset.contentType,
        upsert: true,
      });

    if (error) {
      console.error(
        `❌ Erro no upload de ${asset.supabasePath}:`,
        error.message
      );
    } else {
      console.log(`✅ Upload bem-sucedido: ${data.path}`);
    }
  }

  console.log(
    '\n🔧 Ajustando referências no banco de dados Supabase (tabela site_assets)...'
  );

  // Atualizar o registro da Honda para o path válido se ele existir
  const { data: hondaAsset, error: findError } = await supabase
    .from('site_assets')
    .select('id, key, file_path')
    .eq('key', 'logo-honda.a85702e811bf9bb0')
    .single();

  if (!findError && hondaAsset) {
    const correctPath =
      'civic/key-visual/assets-do-projeto/home-featured-logo/logo-honda-a85702e811bf9bb0.b265753cbbc12865.webp';
    if (hondaAsset.file_path !== correctPath) {
      console.log(
        `✏️ Corrigindo path do logo Honda no banco: ${hondaAsset.file_path} -> ${correctPath}`
      );
      const { error: updateError } = await supabase
        .from('site_assets')
        .update({ file_path: correctPath })
        .eq('id', hondaAsset.id);

      if (updateError) {
        console.error(
          '❌ Erro ao atualizar o path do logo Honda:',
          updateError.message
        );
      } else {
        console.log(
          '✅ Path do logo Honda atualizado com sucesso no banco de dados!'
        );
      }
    } else {
      console.log('✅ Path do logo Honda já está correto no banco de dados.');
    }
  } else {
    console.log(
      'ℹ️ Registro de chave logo-honda.a85702e811bf9bb0 não encontrado ou já normalizado.'
    );
  }

  // Deletar registro do Ghost.jsx se ele for considerado quebrado ou inativo no banco
  const { error: deleteError } = await supabase
    .from('site_assets')
    .delete()
    .eq('key', 'Ghost.jsx');

  if (deleteError) {
    console.error(
      '❌ Erro ao remover Ghost.jsx do banco:',
      deleteError.message
    );
  } else {
    console.log('✅ Limpeza de referências a Ghost.jsx concluída.');
  }

  // Deletar qualquer registro de VIDEOMANIFESTOGLAD no banco (não é mais usado e excede o tamanho limite)
  const { error: deleteVideoError } = await supabase
    .from('site_assets')
    .delete()
    .like('file_path', '%VIDEOMANIFESTOGLAD%');

  if (deleteVideoError) {
    console.error(
      '❌ Erro ao remover VIDEOMANIFESTOGLAD do banco:',
      deleteVideoError.message
    );
  } else {
    console.log(
      '✅ Limpeza de referências a VIDEOMANIFESTOGLAD no banco concluída.'
    );
  }

  console.log('\n🎉 Script de upload e normalização concluído!');
}

main().catch((err) => {
  console.error('❌ Erro crítico na execução do script:', err);
  process.exit(1);
});
