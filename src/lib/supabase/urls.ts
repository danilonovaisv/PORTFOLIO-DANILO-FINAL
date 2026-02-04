const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

export function getSupabaseBaseUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? null;

  if (!url) {
    throw new Error(
      'Supabase URL não definida. Configure NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_URL.'
    );
  }
  try {
    return normalizeUrl(url);
  } catch {
    return url;
  }
}

export function normalizeStoragePath(
  filePath?: string | null,
  bucket?: string
): string | null {
  if (!filePath) return null;

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
): string | null {
  if (!filePath) return null;

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
        return null;
      }
      // Aqui poderíamos adicionar validação de domínio se necessário
      return filePath;
    } catch {
      console.error(`URL inválida: ${filePath}`);
      return null;
    }
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const normalizedPath = normalizeStoragePath(filePath, cleanBucket);
  if (!normalizedPath) {
    return filePath.startsWith('http') ? filePath : null;
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
    return filePath.startsWith('http') ? filePath : null;
  }

  return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
}

// Função adicional para validar e construir URLs de links externos
export function validateExternalUrl(url: string): string | null {
  if (!url) return null;
  const normalized = url.trim();
  if (!normalized) return null;

  const allowedProtocols = ['https:', 'http:'];

  try {
    const parsedUrl = new URL(normalized);
    if (allowedProtocols.includes(parsedUrl.protocol)) {
      return parsedUrl.toString();
    }

    console.warn(`Link externo inseguro bloqueado: ${url}`);
    return null;
  } catch {
    if (normalized.startsWith('/') || normalized.startsWith('#')) {
      return normalized;
    }

    if (normalized.startsWith('//')) {
      try {
        const parsedFallback = new URL(`https:${normalized}`);
        return parsedFallback.toString();
      } catch {
        console.error(`URL externa inválida: ${url}`);
        return null;
      }
    }

    console.error(`URL externa inválida: ${url}`);
    return null;
  }
}
