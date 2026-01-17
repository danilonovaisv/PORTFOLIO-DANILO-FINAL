const normalizeUrl = (value: string) => value.replace(/\/+$/, '');
const DEFAULT_SUPABASE_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co';

export function getSupabaseBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    DEFAULT_SUPABASE_URL;

  if (!url) return '';
  try {
    return normalizeUrl(url);
  } catch {
    return url;
  }
}

export function normalizeStoragePath(
  filePath?: string | null,
  bucket?: string
) {
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

export function buildSupabaseStorageUrl(
  bucket: string,
  filePath?: string | null
) {
  if (!filePath) return '';

  const isHttp =
    filePath.startsWith('http://') || filePath.startsWith('https://');
  const isSupabaseUrl = filePath.includes('/storage/v1/');
  
  // Verifica se é uma URL externa não-Supabase
  if (isHttp && !isSupabaseUrl) {
    // Validação de segurança para URLs externas
    try {
      const url = new URL(filePath);
      // Permitir apenas protocolos seguros
      if (url.protocol !== 'https:') {
        console.warn(`Protocolo inseguro detectado: ${filePath}`);
        return '';
      }
      // Aqui poderíamos adicionar validação de domínio se necessário
      return filePath;
    } catch (e) {
      console.error(`URL inválida: ${filePath}`);
      return '';
    }
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const normalizedPath = normalizeStoragePath(filePath, cleanBucket);
  if (!normalizedPath) {
    return filePath.startsWith('http') ? filePath : '';
  }

  const baseUrl = getSupabaseBaseUrl();
  if (!baseUrl) {
    return filePath.startsWith('http') ? filePath : '';
  }

  return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
}

// Função adicional para validar e construir URLs de links externos
export function validateExternalUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Permitir apenas HTTPS
    if (parsedUrl.protocol !== 'https:') {
      console.warn(`Link externo inseguro bloqueado: ${url}`);
      return '';
    }
    
    // Bloquear certos domínios se necessário (opcional)
    // Exemplo: bloquear domínios conhecidos por phishing
    
    return parsedUrl.toString();
  } catch (e) {
    console.error(`URL externa inválida: ${url}`);
    return '';
  }
}