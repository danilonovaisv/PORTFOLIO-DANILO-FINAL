const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

/**
 * Get the base Supabase URL from environment variables.
 * Reads process.env directly (not the cached Zod `env` object) so that
 * test suites can override values via `process.env` assignment in beforeEach.
 */
export function getSupabaseBaseUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;

  if (url) {
    return normalizeUrl(url);
  }

  if (
    (typeof window === 'undefined' || process.env.NODE_ENV === 'test') &&
    process.env.SUPABASE_URL
  ) {
    return normalizeUrl(process.env.SUPABASE_URL);
  }

  return null;
}

/**
 * Get the base Cloudflare R2 public CDN URL from environment variables.
 * Returns null if not configured, falling back to Supabase Storage.
 */
export function getR2PublicUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL;

  if (url) {
    return normalizeUrl(url);
  }

  return null;
}

/**
 * Get public asset URL directly from Cloudflare R2 CDN (Zero Egress).
 * Client-safe helper without server-only SDK dependencies.
 */
export function getR2PublicAssetUrl(bucket: string, filePath: string): string {
  const r2Base = getR2PublicUrl() || 'https://assets.portfoliodanilo.com';
  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const normalized =
    normalizeStoragePath(filePath, cleanBucket) || filePath.replace(/^\/+/, '');
  const encodedPath = normalized
    .split('/')
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join('/');
  return `${r2Base.replace(/\/+$/, '')}/${cleanBucket}/${encodedPath}`;
}

const KNOWN_R2_HOSTS = new Set(['assets.portfoliodanilo.com']);
const KNOWN_VIRTUAL_BUCKETS = new Set([
  'site-assets',
  'portfolio-media',
  'portfolio-assets',
]);

export interface ParsedSupabaseStorageUrl {
  origin: string;
  bucket: string;
  filePath: string;
}

/**
 * Detects signed, authenticated, or temporary pre-signed URLs that MUST NOT
 * be rewritten to public CDN URLs.
 */
export function isSignedOrPrivateStorageUrl(rawUrl?: string | null): boolean {
  if (!rawUrl) return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;

  const lower = trimmed.toLowerCase();
  if (
    lower.includes('/storage/v1/object/sign/') ||
    lower.includes('/storage/v1/object/authenticated/')
  ) {
    return true;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      for (const key of parsed.searchParams.keys()) {
        const k = key.toLowerCase();
        if (k === 'token' || k === 'signature' || k.startsWith('x-amz-')) {
          return true;
        }
      }
    } catch {
      return false;
    }
  }

  return false;
}

function isRecognizedSupabaseHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower.endsWith('.supabase.co')) return true;

  const envCandidates = [
    getSupabaseBaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL,
    process.env.SUPABASE_URL,
  ].filter(Boolean) as string[];

  for (const candidate of envCandidates) {
    try {
      if (new URL(candidate).hostname.toLowerCase() === lower) {
        return true;
      }
    } catch {
      // ignore invalid env URL
    }
  }

  return false;
}

function isR2CdnHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (KNOWN_R2_HOSTS.has(lower) || lower.endsWith('.r2.dev')) return true;
  const configuredR2 = getR2PublicUrl();
  if (configuredR2) {
    try {
      if (new URL(configuredR2).hostname.toLowerCase() === lower) {
        return true;
      }
    } catch {
      // ignore malformed URL
    }
  }
  return false;
}

function collapseSlashesAndDecodeSegments(rawPath: string): string {
  return rawPath
    .replace(/\/{2,}/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join('/');
}

/**
 * Parses recognized public Supabase Storage object/render URLs into
 * `{ origin, bucket, filePath }`. Returns `null` for external, signed,
 * private, or non-storage URLs.
 */
export function parsePublicSupabaseStorageUrl(
  rawUrl?: string | null
): ParsedSupabaseStorageUrl | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  if (isSignedOrPrivateStorageUrl(trimmed)) return null;

  try {
    const parsed = new URL(trimmed);
    if (!isRecognizedSupabaseHost(parsed.hostname)) return null;

    const match = parsed.pathname.match(
      /^\/storage\/v1\/(?:render\/image|object)\/public\/([^/]+)\/(.+)$/
    );
    if (!match) return null;

    let bucket = match[1].replace(/^\/+|\/+$/g, '');
    let filePath = collapseSlashesAndDecodeSegments(match[2]);

    if (bucket === 'landing-pages') {
      bucket = 'site-assets';
      if (!filePath.startsWith('landing-pages/')) {
        filePath = `landing-pages/${filePath}`;
      }
    }

    while (filePath.startsWith(`${bucket}/`)) {
      filePath = filePath.slice(bucket.length + 1);
    }

    if (!filePath) return null;

    return {
      origin: `${parsed.protocol}//${parsed.host}`,
      bucket,
      filePath,
    };
  } catch {
    return null;
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

  while (bucketPrefix && normalized.startsWith(`${bucketPrefix}/`)) {
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
  format?: 'origin' | 'webp' | 'avif';
  resize?: 'cover' | 'contain' | 'fill';
}

function encodeStorageSegments(normalizedPath: string): string {
  return normalizedPath
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');
}

export function buildSupabaseStorageUrl(
  bucket: string,
  filePath?: string | null,
  options?: StorageUrlOptions
): string | null {
  if (!filePath) return null;
  const trimmed = filePath.trim();
  if (!trimmed) return null;

  if (isSignedOrPrivateStorageUrl(trimmed)) {
    return trimmed;
  }

  const parsedSupabase = parsePublicSupabaseStorageUrl(trimmed);
  const isHttp =
    trimmed.startsWith('http://') || trimmed.startsWith('https://');
  const isSupabaseUrl =
    Boolean(parsedSupabase) || trimmed.includes('/storage/v1/');

  // Handle already-migrated R2 CDN URLs (normalize duplicate slashes / duplicate virtual prefixes)
  if (isHttp && !isSupabaseUrl) {
    try {
      const url = new URL(trimmed);
      if (url.protocol !== 'https:') {
        console.warn(`Protocolo inseguro detectado: ${trimmed}`);
        return null;
      }

      if (isR2CdnHost(url.hostname)) {
        const cleanSegments = collapseSlashesAndDecodeSegments(url.pathname);
        const firstSeg = cleanSegments.split('/')[0];
        const r2Bucket = KNOWN_VIRTUAL_BUCKETS.has(firstSeg) ? firstSeg : '';
        let r2Rel = r2Bucket
          ? cleanSegments.slice(r2Bucket.length + 1)
          : cleanSegments;
        while (r2Bucket && r2Rel.startsWith(`${r2Bucket}/`)) {
          r2Rel = r2Rel.slice(r2Bucket.length + 1);
        }
        const r2Base = getR2PublicUrl() || `${url.protocol}//${url.host}`;
        const finalKey = r2Bucket
          ? `${r2Bucket}/${encodeStorageSegments(r2Rel)}`
          : encodeStorageSegments(r2Rel);
        return `${r2Base}/${finalKey}`;
      }

      return trimmed;
    } catch {
      console.error(`URL inválida: ${trimmed}`);
      return null;
    }
  }

  let cleanBucket = (parsedSupabase ? parsedSupabase.bucket : bucket).replace(
    /^\/+|\/+$/g,
    ''
  );
  let finalFilePath = parsedSupabase ? parsedSupabase.filePath : trimmed;

  // AUTO-HEAL: Se o banco de dados enviou "landing-pages" incorretamente como sendo o bucket
  if (cleanBucket === 'landing-pages') {
    cleanBucket = 'site-assets';
    if (finalFilePath && !finalFilePath.startsWith('landing-pages/')) {
      finalFilePath = `landing-pages/${finalFilePath}`;
    }
  }

  const normalizedPath = normalizeStoragePath(finalFilePath, cleanBucket);
  if (!normalizedPath) {
    return trimmed.startsWith('http') ? trimmed : null;
  }

  // Cloudflare R2 Migration: Prioritize R2 CDN endpoint when configured (Zero Egress)
  const r2Base = getR2PublicUrl();
  if (r2Base) {
    const encodedPath = encodeStorageSegments(normalizedPath);
    const finalUrl = `${r2Base}/${cleanBucket}/${encodedPath}`;
    debugUrl(finalUrl);
    return finalUrl;
  }

  const baseUrl = getSupabaseBaseUrl();
  let baseOrigin = baseUrl;

  // Preserva a origem caso o caminho já seja uma URL completa de outro projeto Supabase
  if (isHttp && isSupabaseUrl) {
    try {
      const url = new URL(trimmed);
      baseOrigin = `${url.protocol}//${url.host}`;
    } catch {
      // se falhar, segue origin padrão
      if (!baseOrigin) {
        return trimmed.startsWith('http') ? trimmed : null;
      }
    }
  } else if (!baseOrigin) {
    return trimmed.startsWith('http') ? trimmed : null;
  }

  // Verifica se é um arquivo de vídeo ou 3D (não suportam proxy de renderização de imagem)
  const isNonTransformable = /\.(mp4|webm|mov|m4v|ogg|glb|gltf)$/i.test(
    normalizedPath
  );

  // Decide entre endpoint de renderização configurado ou objeto direto
  const endpoint =
    !isNonTransformable && options
      ? '/storage/v1/render/image/public/'
      : '/storage/v1/object/public/';
  const encodedPath = encodeStorageSegments(normalizedPath);
  let finalUrl = `${baseOrigin}${endpoint}${cleanBucket}/${encodedPath}`;

  if (!isNonTransformable && options) {
    const params = new URLSearchParams();
    if (options.width) params.set('width', options.width.toString());
    if (options.quality) params.set('quality', options.quality.toString());
    if (options.format) params.set('format', options.format);
    if (options.resize) params.set('resize', options.resize);

    const queryString = params.toString();
    if (queryString) {
      finalUrl += `?${queryString}`;
    }
  }

  debugUrl(finalUrl);
  return finalUrl;
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
export const debugUrl = (_url: string) => {
  // if (process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line no-console
  //   console.log('[SupabaseURL] checking:', _url);
  // }
};
