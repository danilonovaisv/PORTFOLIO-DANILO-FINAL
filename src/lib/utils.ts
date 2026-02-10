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

function normalizePath(path: string) {
  return path
    .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
    .replace(/^\/?storage\/v1\/object\/public\//, '')
    .replace(/^\/+/, '');
}

export function getAssetUrl(path?: string | null): string {
  if (!path) return ASSET_PLACEHOLDER;
  const trimmed = path.trim();
  if (!trimmed) return ASSET_PLACEHOLDER;
  if (/^https?:\/\//.test(trimmed)) return trimmed;

  const normalized = normalizePath(trimmed);
  if (!normalized) return ASSET_PLACEHOLDER;

  return `${SUPABASE_STORAGE_URL}/${normalized}`;
}

export function applyImageFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event>
) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied) return;
  target.dataset.fallbackApplied = 'true';
  target.src = ASSET_PLACEHOLDER;
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

  try {
    const withProtocol = raw.startsWith('http') ? raw : `https://${raw}`;
    const parsed = new URL(withProtocol);
    return videoExtensions.some((ext) => parsed.pathname.endsWith(ext));
  } catch {
    return videoExtensions.some((ext) =>
      raw.split('?')[0].split('#')[0].endsWith(ext)
    );
  }
};
