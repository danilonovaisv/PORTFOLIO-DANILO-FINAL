import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type React from 'react';
import { SUPABASE_STORAGE_URL } from '@/config/brand';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
} from '@/lib/supabase/urls';

// --- STYLING UTILS ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes a string for safe use in Tailwind classes or dynamic styles.
 */
export function sanitizeTailwindValue(value: string): string {
  if (!value) return '';
  return value.replace(/[^a-zA-Z0-9\-_#]/g, '');
}

// --- MATH UTILS ---

export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

// --- ASSET UTILS ---

export const ASSET_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const YOUTUBE_ID_DIRECT_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function normalizePath(path: string) {
  return path
    .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
    .replace(/^\/?storage\/v1\/object\/public\//, '')
    .replace(/^\/+/, '');
}

export interface AssetOptions {
  width?: number;
  quality?: number;
  isVideo?: boolean;
  format?: 'webp' | 'avif' | 'origin';
}

export function getAssetUrl(
  path?: string | null,
  options?: AssetOptions
): string {
  if (!path) return ASSET_PLACEHOLDER;
  const trimmed = path.trim();
  if (!trimmed) return ASSET_PLACEHOLDER;
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:'))
    return trimmed;
  if (/^https?:\/\//.test(trimmed)) return trimmed;

  const normalized = normalizeStoragePath(normalizePath(trimmed)) ?? '';
  if (!normalized) return ASSET_PLACEHOLDER;

  const explicitBucketMatch = normalized.match(
    /^(site-assets|portfolio-media)\/(.+)$/i
  );
  const siteAssetPrefixes = [
    'about/',
    'clients/',
    'global/',
    'home/',
    'landing-pages/',
  ];
  const bucket = explicitBucketMatch
    ? explicitBucketMatch[1].toLowerCase()
    : siteAssetPrefixes.some((prefix) => normalized.startsWith(prefix))
      ? 'site-assets'
      : 'portfolio-media';
  const filePath = explicitBucketMatch ? explicitBucketMatch[2] : normalized;

  // Supabase Image Transformation parameters
  const width = options?.width ?? 800;
  const quality = options?.quality ?? 85;
  const format = options?.format ?? 'webp';
  const isModel = is3DModel(normalized);

  const resolved = buildSupabaseStorageUrl(
    bucket,
    filePath,
    options?.isVideo || isModel
      ? undefined
      : {
          width,
          quality,
          format,
        }
  );

  if (resolved) {
    return resolved;
  }

  if (options?.isVideo || isModel) {
    return `${SUPABASE_STORAGE_URL}/${normalized}`;
  }

  const renderBase = SUPABASE_STORAGE_URL.replace(
    '/object/public',
    '/render/image/public'
  );
  return `${renderBase}/${normalized}?width=${width}&quality=${quality}&format=${format}`;
}

/**
 * Next.js Image Loader for Supabase
 * Bypasses Next.js proxy and uses Supabase Edge Resizing directly.
 */
export function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If it's already a full URL or a data URL, return as is
  if (src.startsWith('http') || src.startsWith('data:')) {
    // If it's a Supabase URL, we can still try to append transform params if they aren't there
    if (src.includes('supabase.co')) {
      const url = new URL(src);
      // Only transform if it's in the public storage
      if (url.pathname.includes('/storage/v1/object/public/')) {
        const newPathname = url.pathname.replace(
          '/storage/v1/object/public/',
          '/storage/v1/render/image/public/'
        );
        return `${url.origin}${newPathname}?width=${width}&quality=${quality || 75}&format=webp`;
      }
      return src;
    }
    return src;
  }

  // Ghost System: Skip Supabase loader for local site.assets
  if (src.startsWith('/site.assets/') || src.startsWith('site.assets/')) {
    return src.startsWith('/') ? src : `/${src}`;
  }

  return getAssetUrl(src, { width, quality: quality || 75 });
}

export function applyImageFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event>
) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied) return;
  target.dataset.fallbackApplied = 'true';
  target.src = ASSET_PLACEHOLDER;
  target.srcset = '';
}

export const getGhostAssetUrl = (path?: string | null): string => {
  if (!path) return '/assets/placeholder.webp';

  try {
    // Verifica se é uma URL válida
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // Usa a função getAssetUrl existente
    return getAssetUrl(path);
  } catch (error) {
    console.error('Erro ao obter URL do asset:', error);
    return ASSET_PLACEHOLDER;
  }
};

// Função para verificar se um caminho de arquivo ou URL é um vídeo
export const isVideo = (path?: string | null): boolean => {
  if (!path) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
  const raw = path.trim().toLowerCase();
  if (!raw) return false;

  const cleanPath = raw.split('?')[0].split('#')[0];

  if (cleanPath.includes('://')) {
    try {
      const parsed = new URL(cleanPath);
      return videoExtensions.some((ext) => parsed.pathname.endsWith(ext));
    } catch {
      return videoExtensions.some((ext) => cleanPath.endsWith(ext));
    }
  }

  return videoExtensions.some((ext) => cleanPath.endsWith(ext));
};

// Função para verificar se um caminho de arquivo ou URL é um modelo 3D
export const is3DModel = (path?: string | null): boolean => {
  if (!path) return false;
  const modelExtensions = ['.glb', '.gltf'];
  const raw = path.trim().toLowerCase();
  if (!raw) return false;

  const cleanPath = raw.split('?')[0].split('#')[0];

  if (cleanPath.includes('://')) {
    try {
      const parsed = new URL(cleanPath);
      return modelExtensions.some((ext) => parsed.pathname.endsWith(ext));
    } catch {
      return modelExtensions.some((ext) => cleanPath.endsWith(ext));
    }
  }

  return modelExtensions.some((ext) => cleanPath.endsWith(ext));
};

export function extractYouTubeId(value?: string | null): string | null {
  if (!value) return null;

  const candidate = value.trim();
  if (!candidate) return null;
  if (YOUTUBE_ID_DIRECT_PATTERN.test(candidate)) return candidate;

  const withProtocol = candidate.startsWith('http')
    ? candidate
    : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    const hostname = parsed.hostname;

    if (hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return YOUTUBE_ID_DIRECT_PATTERN.test(id) ? id : null;
    }

    if (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) {
      const vParam = parsed.searchParams.get('v');
      if (vParam && YOUTUBE_ID_DIRECT_PATTERN.test(vParam)) return vParam;

      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = parts.findIndex(
        (part) => part === 'embed' || part === 'shorts' || part === 'v'
      );

      if (embedIndex >= 0) {
        const id = parts[embedIndex + 1];
        return id && YOUTUBE_ID_DIRECT_PATTERN.test(id) ? id : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export const isYouTubeUrl = (value?: string | null): boolean =>
  Boolean(extractYouTubeId(value));

export function getYouTubeEmbedUrl(value: string): string | null {
  const id = extractYouTubeId(value);
  if (!id) return null;
  // Ghost Design System v3.1: Mandatory parameters for immersive player
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id, // Mandatory for loop
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    fs: '0',
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(value: string): string | null {
  const id = extractYouTubeId(value);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
