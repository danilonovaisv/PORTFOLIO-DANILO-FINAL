import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funções de normalização copiadas do arquivo original para evitar problemas de importação
function normalizeStoragePath(filePath?: string | null, bucket?: string) {
  if (!filePath) return '';

  const bucketPrefix = bucket?.replace(/^\/+|\/+$/g, '');

  // Remove full Supabase URL prefix if present (object or render endpoints)
  let normalized = filePath.trim();

  // Clean common malformed prefixes/suffixes from backups (e.g. "file_path: ...," or quoted values)
  normalized = normalized.replace(/^file_path:\s*/i, '');
  normalized = normalized.replace(/^key:\s*/i, '');
  normalized = normalized.replace(/^"+|"+$/g, '');
  normalized = normalized.replace(/^'+|'+$/g, '');
  normalized = normalized.replace(/,+$/g, '');
  normalized = normalized.replace(/\s+$/g, '');

  normalized = normalized.replace(
    /^https?:\/\/[^/]+\/storage\/v1\/(?:render\/image|object)\/public\//,
    ''
  );

  // Remove local /storage/v1/object/public prefix if the path was stored like that
  normalized = normalized.replace(
    /^\/?storage\/v1\/(?:render\/image|object)\/public\//,
    ''
  );

  normalized = normalized.replace(/^\/+/, '');

  if (bucketPrefix && normalized.startsWith(`${bucketPrefix}/`)) {
    normalized = normalized.slice(bucketPrefix.length + 1);
  }

  return normalized;
}

function getSupabaseBaseUrl() {
  // Fallback alinhado ao projeto principal (aymuvxysygrwoicsjgxj) para evitar
  // geração de links quebrados quando variáveis de ambiente estiverem ausentes.
  const DEFAULT_SUPABASE_URL = 'https://aymuvxysygrwoicsjgxj.supabase.co';
  return DEFAULT_SUPABASE_URL;
}

function buildSupabaseStorageUrl(bucket: string, filePath?: string | null) {
  if (!filePath) return '';

  const isHttp =
    filePath.startsWith('http://') || filePath.startsWith('https://');
  const isSupabaseUrl = filePath.includes('/storage/v1/');

  // Verifica se é uma URL externa não-Supabase
  if (isHttp && !isSupabaseUrl) {
    // Neste script, estamos apenas interessados na construção de URLs do Supabase
    // então retornaremos o caminho normalizado
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const normalizedPath = normalizeStoragePath(filePath, cleanBucket);
  if (!normalizedPath) {
    return filePath.startsWith('http') ? filePath : '';
  }

  // Preserva a origem caso o caminho já seja uma URL completa de outro projeto Supabase
  if (isHttp && isSupabaseUrl) {
    try {
      const url = new URL(filePath);
      const baseOrigin = `${url.protocol}//${url.host}`;
      return `${baseOrigin}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
    } catch {
      // se falhar, segue fluxo padrão
    }
  }

  const baseUrl = getSupabaseBaseUrl();
  if (!baseUrl) {
    return filePath.startsWith('http') ? filePath : '';
  }

  return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
}

// Ler o arquivo JSON de assets
const assetsDataPath = path.join(__dirname, '../docs/assets storage.json');
const assetsDataRaw = fs.readFileSync(assetsDataPath, 'utf-8');
const assetsData = JSON.parse(assetsDataRaw);

console.log('Verificando links de armazenamento do Supabase...\n');

function checkStorageLinks() {
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const bucketData of assetsData) {
    const bucketId = bucketData.bucket_id;
    console.log(`Verificando bucket: ${bucketId}\n`);

    for (const link of bucketData.links) {
      // Verificar se o link tem o formato esperado
      const expectedPattern = new RegExp(
        `^/storage/v1/object/public/${bucketId}/.*`
      );

      if (!expectedPattern.test(link)) {
        console.log(`❌ Erro: Link inválido ou mal formatado: ${link}`);
        totalErrors++;
        continue;
      }

      // Testar a função normalizeStoragePath
      const normalizedPath = normalizeStoragePath(link, bucketId);
      if (!normalizedPath) {
        console.log(`❌ Erro: Caminho normalizado vazio para: ${link}`);
        totalErrors++;
        continue;
      }

      // Testar a função buildSupabaseStorageUrl
      const builtUrl = buildSupabaseStorageUrl(bucketId, link);
      if (!builtUrl) {
        console.log(`❌ Erro: URL construída vazia para: ${link}`);
        totalErrors++;
        continue;
      }

      // Verificar se o caminho normalizado não contém o nome do bucket duplicado
      if (normalizedPath.startsWith(`${bucketId}/`)) {
        console.log(
          `⚠️  Aviso: Caminho pode conter nome do bucket duplicado: ${normalizedPath}`
        );
        totalWarnings++;
      }

      // Mostrar o caminho normalizado e URL construída para verificação
      console.log(`✅ OK: ${link}`);
      console.log(`   Caminho normalizado: ${normalizedPath}`);
      console.log(`   URL construída: ${builtUrl}`);
      console.log('');
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }

  console.log(
    `Resumo: ${totalErrors} erros, ${totalWarnings} avisos encontrados.`
  );

  if (totalErrors === 0) {
    console.log('✅ Todos os links passaram na verificação!');
  } else {
    console.log(`❌ ${totalErrors} problemas encontrados nos links.`);
    process.exit(1);
  }
}

// Executar a verificação
checkStorageLinks();
