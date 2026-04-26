const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

/**
 * Get the base Supabase URL from environment variables.
 */
export function getSupabaseBaseUrl(): string | null {
  // Para assets públicos que precisam de hidratação, DEVEMOS usar variáveis públicas.
  // Variáveis sem prefixo NEXT_PUBLIC_ não estão disponíveis no cliente.
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;

  if (url) {
    return normalizeUrl(url);
  }

  // Fallback para servidor apenas se não houver URL pública (CUIDADO: pode causar mismatch se usado em componentes)
  if (
    (typeof window === 'undefined' || process.env.NODE_ENV === 'test') &&
    process.env.SUPABASE_URL
  ) {
    return normalizeUrl(process.env.SUPABASE_URL);
  }

  return null;
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

  // Corrige caminhos legados mal serializados como ".../video/mp4" para ".../video.mp4".
  normalized = normalized.replace(
    /\/(mp4|mov|webm|m4v|png|jpe?g|webp|avif|svg|gif|woff2?|ttf|otf)$/i,
    '.$1'
  );

  return normalized;
}

export interface StorageUrlOptions {
  width?: number;
  quality?: number;
  format?: 'origin';
  resize?: 'cover' | 'contain' | 'fill';
}

export function buildSupabaseStorageUrl(
  bucket: string,
  filePath?: string | null,
  options?: StorageUrlOptions
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
      return filePath;
    } catch {
      console.error(`URL inválida: ${filePath}`);
      return null;
    }
  }

  let cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  let finalFilePath = filePath;

  // AUTO-HEAL: Se o banco de dados enviou "landing-pages" incorretamente como sendo o bucket
  if (cleanBucket === 'landing-pages') {
    cleanBucket = 'site-assets';
    if (finalFilePath && !finalFilePath.startsWith('landing-pages/')) {
      finalFilePath = `landing-pages/${finalFilePath}`;
    }
  }

  const normalizedPath = normalizeStoragePath(finalFilePath, cleanBucket);
  if (!normalizedPath) {
    return finalFilePath.startsWith('http') ? finalFilePath : null;
  }

  const baseUrl = getSupabaseBaseUrl();
  let baseOrigin = baseUrl;

  // Preserva a origem caso o caminho já seja uma URL completa de outro projeto Supabase
  if (isHttp && isSupabaseUrl) {
    try {
      const url = new URL(finalFilePath);
      baseOrigin = `${url.protocol}//${url.host}`;
    } catch {
      // se falhar, segue origin padrão
      if (!baseOrigin) {
        return finalFilePath.startsWith('http') ? finalFilePath : null;
      }
    }
  } else if (!baseOrigin) {
    return finalFilePath.startsWith('http') ? finalFilePath : null;
  }

  // Verifica se é um arquivo de vídeo (vídeos não suportam proxy de renderização de imagem)
  const isVideo = /\.(mp4|webm|mov|m4v|ogg)$/i.test(normalizedPath);

  // Decide entre endpoint de renderização configurado ou objeto direto
  const endpoint =
    !isVideo && options
      ? '/storage/v1/render/image/public/'
      : '/storage/v1/object/public/';
  let finalUrl = `${baseOrigin}${endpoint}${cleanBucket}/${normalizedPath}`;

  if (!isVideo && options) {
    const params = new URLSearchParams();
    if (options.width) params.set('width', options.width.toString());
    if (options.quality) params.set('quality', options.quality.toString());
    if (options.format === 'origin') params.set('format', 'origin');
    if (options.resize) params.set('resize', options.resize);

    const queryString = params.toString();
    if (queryString) {
      finalUrl += `?${queryString}`;
    }
  }

  debugUrl(finalUrl);
  return finalUrl;
}

/**
 * Helper to inject image proxy optimization params into an existing Supabase public URL.
 */
export function injectSupabaseProxy(
  url: string,
  options: StorageUrlOptions
): string {
  if (!url || !url.includes('/storage/v1/')) return url;

  const isVideo = /\.(mp4|webm|mov|m4v|ogg)(#.*|\?.*)?$/i.test(url);
  if (isVideo) return url;

  try {
    const parsed = new URL(url);
    if (parsed.pathname.includes('/object/public/')) {
      parsed.pathname = parsed.pathname.replace(
        '/object/public/',
        '/render/image/public/'
      );
    }

    if (options.width)
      parsed.searchParams.set('width', options.width.toString());
    if (options.quality)
      parsed.searchParams.set('quality', options.quality.toString());
    if (options.format === 'origin') {
      parsed.searchParams.set('format', 'origin');
    } else {
      parsed.searchParams.delete('format');
    }
    if (options.resize) parsed.searchParams.set('resize', options.resize);

    return parsed.toString();
  } catch {
    return url;
  }
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
    if (normalized.startsWith('//')) {
      try {
        const parsedFallback = new URL(`https:${normalized}`);
        return parsedFallback.toString();
      } catch {
        console.error(`URL externa inválida: ${url}`);
        return null;
      }
    }

    if (normalized.startsWith('/') || normalized.startsWith('#')) {
      return normalized;
    }

    console.error(`URL externa inválida: ${url}`);
    return null;
  }
}
// Add debugging for missing assets
export const debugUrl = (url: string) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[SupabaseURL] checking:', url);
  }
};
