import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type React from 'react';
import { SUPABASE_STORAGE_URL } from '@/config/brand';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
} from '@/lib/supabase/urls';
import {
  buildYoutubeEmbedUrl,
  extractYoutubeId as extractYoutubeIdFromContract,
} from '@/lib/media/asset-contract';

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

  // Ghost System: Return local paths as-is
  if (
    trimmed.startsWith('/') &&
    (trimmed.startsWith('/site.assets/') || trimmed.startsWith('/assets/'))
  ) {
    return trimmed;
  }

  const normalized = normalizeStoragePath(normalizePath(trimmed)) ?? '';
  if (!normalized) return ASSET_PLACEHOLDER;

  // Ghost System: Mandatory fallback to local site.assets folder for build stability
  // when Supabase project is paused or inaccessible.
  if (normalized.startsWith('site-assets/')) {
    return `/site.assets/${normalized.slice('site-assets/'.length)}`;
  }

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

  // If we detected it's a site-asset after bucket resolution but it didn't have the explicit prefix
  if (bucket === 'site-assets') {
    return `/site.assets/${filePath}`;
  }

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
      const isObject = url.pathname.includes('/storage/v1/object/public/');
      const isRender = url.pathname.includes(
        '/storage/v1/render/image/public/'
      );

      if (isObject || isRender) {
        // Image Transformations endpoint returns 403 on current Supabase plan.
        // Serve direct object URL until transforms are re-enabled.
        if (isRender) {
          url.pathname = url.pathname.replace(
            '/storage/v1/render/image/public/',
            '/storage/v1/object/public/'
          );
        }
        url.searchParams.delete('width');
        url.searchParams.delete('quality');
        url.searchParams.delete('format');
        url.searchParams.delete('resize');
        return url.toString();
      }
      return src;
    }
    return src;
  }

  // Ghost System: Skip Supabase loader for local assets (root-relative)
  if (src.startsWith('/') && !src.startsWith('/site.assets/')) {
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
  return extractYoutubeIdFromContract(value);
}

export const isYouTubeUrl = (value?: string | null): boolean =>
  Boolean(extractYouTubeId(value));

export function getYouTubeEmbedUrl(value: string): string | null {
  return buildYoutubeEmbedUrl(value, { autoplay: true, controls: false });
}

export function getYouTubeThumbnailUrl(value: string): string | null {
  const id = extractYouTubeId(value);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
