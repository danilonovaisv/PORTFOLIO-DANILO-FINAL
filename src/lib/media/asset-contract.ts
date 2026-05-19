import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
} from '@/lib/supabase/urls';

export type Asset = {
  type: 'image' | 'video';
  url: string;
  provider?: 'supabase' | 'youtube';
};

export type ResolvedAsset =
  | { ok: true; asset: Asset; source: 'new' | 'legacy' }
  | {
      ok: false;
      reason:
        | 'empty'
        | 'invalid-url'
        | 'invalid-youtube'
        | 'unsupported-provider';
    };

export type AssetTypeHint = 'image' | 'video' | 'youtube';

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(?:[?#].*)?$/i;
const IMAGE_FILE_PATTERN =
  /\.(avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i;
const STORAGE_BUCKET_PATTERN = /^(site-assets|portfolio-media)\//i;

function isAbsoluteHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function isLocalPublicAsset(value: string) {
  return value.startsWith('/site.assets/') || value.startsWith('/assets/');
}

function inferAssetType(value: string, hint?: AssetTypeHint): 'image' | 'video' {
  if (hint === 'video' || hint === 'youtube') return 'video';
  if (hint === 'image') return 'image';
  return VIDEO_FILE_PATTERN.test(value) ? 'video' : 'image';
}

function inferBucket(value: string, fallbackBucket: string) {
  const normalized = value.replace(/^\/+/, '');
  const explicit = normalized.match(STORAGE_BUCKET_PATTERN);
  if (explicit) return explicit[1].toLowerCase();
  if (normalized.startsWith('landing-pages/')) return 'site-assets';
  return fallbackBucket;
}

export function extractYoutubeId(value?: string | null): string | null {
  if (!value) return null;

  const candidate = value.trim();
  if (!candidate) return null;
  if (YOUTUBE_ID_PATTERN.test(candidate)) return candidate;

  const withProtocol = candidate.startsWith('http')
    ? candidate
    : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    const hostname = parsed.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const vParam = parsed.searchParams.get('v');
      if (vParam && YOUTUBE_ID_PATTERN.test(vParam)) return vParam;

      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = parts.findIndex((part) =>
        ['embed', 'shorts', 'v'].includes(part)
      );
      const id = embedIndex >= 0 ? parts[embedIndex + 1] : null;
      return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeYoutubeUrl(value?: string | null): string | null {
  const id = extractYoutubeId(value);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function buildYoutubeEmbedUrl(
  value: string,
  options: { autoplay?: boolean; controls?: boolean } = {}
): string | null {
  const id = extractYoutubeId(value);
  if (!id) return null;

  const autoplay = options.autoplay ?? true;
  const controls = options.controls ?? true;
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: '1',
    loop: autoplay ? '1' : '0',
    playlist: id,
    controls: controls ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function resolveSupabaseUrl(
  value?: string | null,
  bucket = 'site-assets'
): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return null;
  if (isLocalPublicAsset(trimmed)) return trimmed;

  if (isAbsoluteHttpUrl(trimmed) && !trimmed.includes('/storage/v1/')) {
    try {
      const parsed = new URL(trimmed);
      return parsed.protocol === 'https:' ? parsed.toString() : null;
    } catch {
      return null;
    }
  }

  const resolvedBucket = inferBucket(trimmed, bucket);
  if (isAbsoluteHttpUrl(trimmed) && trimmed.includes('/storage/v1/')) {
    return buildSupabaseStorageUrl(resolvedBucket, trimmed);
  }

  const normalized = normalizeStoragePath(trimmed, resolvedBucket);
  if (!normalized) return null;

  return buildSupabaseStorageUrl(resolvedBucket, normalized);
}

export function resolveLandingAsset(
  value?: string | null,
  typeHint?: AssetTypeHint,
  bucket = 'site-assets'
): ResolvedAsset {
  if (!value?.trim()) return { ok: false, reason: 'empty' };

  const trimmed = value.trim();
  const youtubeUrl = normalizeYoutubeUrl(trimmed);
  if (typeHint === 'youtube') {
    if (!youtubeUrl) return { ok: false, reason: 'invalid-youtube' };
    return {
      ok: true,
      source: trimmed === youtubeUrl ? 'new' : 'legacy',
      asset: { type: 'video', url: youtubeUrl, provider: 'youtube' },
    };
  }

  if (youtubeUrl) {
    return {
      ok: true,
      source: trimmed === youtubeUrl ? 'new' : 'legacy',
      asset: { type: 'video', url: youtubeUrl, provider: 'youtube' },
    };
  }

  if (isAbsoluteHttpUrl(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'https:') {
        return { ok: false, reason: 'invalid-url' };
      }
    } catch {
      return { ok: false, reason: 'invalid-url' };
    }
  }

  const url = resolveSupabaseUrl(trimmed, bucket);
  if (!url) return { ok: false, reason: 'invalid-url' };

  const inferredType = inferAssetType(trimmed, typeHint);
  const source =
    trimmed === url || (isAbsoluteHttpUrl(trimmed) && !trimmed.includes('/storage/v1/'))
      ? 'new'
      : 'legacy';

  if (inferredType === 'image' && VIDEO_FILE_PATTERN.test(url)) {
    return { ok: false, reason: 'unsupported-provider' };
  }

  if (inferredType === 'video' && IMAGE_FILE_PATTERN.test(url)) {
    return { ok: false, reason: 'unsupported-provider' };
  }

  return {
    ok: true,
    source,
    asset: {
      type: inferredType,
      url,
      provider: url.includes('/storage/v1/') ? 'supabase' : undefined,
    },
  };
}

export function requireResolvedAsset(
  value: string | null | undefined,
  typeHint?: AssetTypeHint,
  bucket = 'site-assets'
): string {
  const resolved = resolveLandingAsset(value, typeHint, bucket);
  if (!resolved.ok) {
    throw new Error(`SYSTEM_ERR: INVALID_ASSET_SOURCE (${resolved.reason})`);
  }
  return resolved.asset.url;
}
