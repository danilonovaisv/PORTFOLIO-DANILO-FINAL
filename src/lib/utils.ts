import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type React from 'react';
import { SUPABASE_STORAGE_URL } from '@/config/brand';

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

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

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

export function getAssetUrl(
  path?: string | null,
  options?: { isVideo?: boolean }
): string {
  if (!path) return ASSET_PLACEHOLDER;
  const trimmed = path.trim();
  if (!trimmed) return ASSET_PLACEHOLDER;
  if (/^https?:\/\//.test(trimmed)) return trimmed;

  const normalized = normalizePath(trimmed);
  if (!normalized) return ASSET_PLACEHOLDER;

  // Ghost Design System v3.1: Use render API for images, object/public for video
  const restOfPath = normalized; // normalizePath already removes redundant parts

  if (options?.isVideo) {
    return `${SUPABASE_STORAGE_URL}/${restOfPath}`;
  }

  // Supabase image rendering already negotiates modern formats automatically.
  // Avoid explicit format here because unsupported values break thumbnail URLs.
  const renderBase = SUPABASE_STORAGE_URL.replace(
    '/object/public',
    '/render/image/public'
  );
  return `${renderBase}/${restOfPath}?width=800&quality=85`;
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

// Função para aplicar lazy loading em imagens
export const applyLazyLoading = (img: HTMLImageElement) => {
  img.loading = 'lazy';
  img.decoding = 'async';
};

// Função para verificar se um caminho de arquivo ou URL é um vídeo
export const isVideo = (path?: string | null): boolean => {
  if (!path) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
  const raw = path.trim().toLowerCase();
  if (!raw) return false;

  // Remove query params and hashes for extension check
  const cleanPath = raw.split('?')[0].split('#')[0];

  // If it contains a protocol, use URL parser
  if (cleanPath.includes('://')) {
    try {
      const parsed = new URL(cleanPath);
      return videoExtensions.some((ext) => parsed.pathname.endsWith(ext));
    } catch {
      // Fallback if URL parsing fails
      return videoExtensions.some((ext) => cleanPath.endsWith(ext));
    }
  }

  // Local paths or filenames
  return videoExtensions.some((ext) => cleanPath.endsWith(ext));
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
