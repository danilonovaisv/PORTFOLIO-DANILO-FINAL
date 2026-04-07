#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { loadEnvOverrides, normalizeEnvValue } from './lib/env-loader';
import { execSync } from 'node:child_process';

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

async function autoSync() {
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
    console.error('❌ Erro: Configure as chaves do Supabase no .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const localAssetsDir = path.resolve('public/site.assets');
  const bucketName = 'site-assets';

  console.log('🔍 Escaneando assets locais em public/site.assets...');

  if (!(await fs.stat(localAssetsDir).catch(() => null))) {
    console.warn(
      '⚠️  Diretório public/site.assets não encontrado. Abortando upload.'
    );
    return;
  }

  const allLocalFiles = await getFiles(localAssetsDir);
  const assetPaths: string[] = [];

  console.log(`📦 Encontrados ${allLocalFiles.length} arquivos locais.`);

  for (const filePath of allLocalFiles) {
    const relativePath = path.relative(localAssetsDir, filePath);
    // Adicionamos o bucket name ao path para o site-assets.json identificar corretamente
    assetPaths.push(`${bucketName}/${relativePath}`);

    // Logica de upload (simplificada: tenta fazer upload, o Supabase ignora se já existir ou sobrescreve se configurado)
    // Para performance, poderíamos checar o hash, mas por agora vamos focar no registro.
    const fileBuffer = await fs.readFile(filePath);

    // Upload para o storage (ignora erro de duplicação se for o caso)
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(relativePath, fileBuffer, {
        upsert: true,
        contentType: getContentType(filePath),
      });

    if (uploadError) {
      if ((uploadError as any).status === 409) {
        // Já existe, tudo bem
      } else {
        console.warn(
          `⚠️  Erro no upload de ${relativePath}:`,
          uploadError.message
        );
      }
    } else {
      console.log(`✅ Uploaded: ${relativePath}`);
    }
  }

  // 1. Salvar lista temporária para o sync-site-assets
  const tempAssetsFile = path.resolve('temp-assets-list.json');
  await fs.writeFile(tempAssetsFile, JSON.stringify(assetPaths, null, 2));

  console.log('🔄 Sincronizando metadados no banco de dados...');
  try {
    execSync(`pnpm dlx tsx scripts/sync-site-assets.ts temp-assets-list.json`, {
      stdio: 'inherit',
    });
  } catch (e) {
    console.error('❌ Erro ao rodar sync-site-assets');
  }

  console.log('📡 Atualizando JSON local (PULL)...');
  try {
    execSync(`pnpm dlx tsx scripts/pull-site-assets.ts`, { stdio: 'inherit' });
  } catch (e) {
    console.error('❌ Erro ao rodar pull-site-assets');
  }

  // Limpeza
  await fs.unlink(tempAssetsFile).catch(() => null);

  console.log('✨ Automação de assets concluída com sucesso!');
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.svg': 'image/svg+xml',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };
  return map[ext] || 'application/octet-stream';
}

autoSync().catch(console.error);
