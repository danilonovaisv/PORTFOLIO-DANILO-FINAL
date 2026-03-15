import { getCanonicalSiteUrl } from '@/lib/seo';

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function getAuthSiteUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin.replace(/\/$/, '');
  }

  return getCanonicalSiteUrl().replace(/\/$/, '');
}

export function buildAbsoluteAuthUrl(path: string): string {
  return `${getAuthSiteUrl()}${normalizePath(path)}`;
}

export function sanitizeNextPath(
  next: string | null | undefined,
  fallback = '/admin'
): string {
  if (!next) return fallback;
  if (!next.startsWith('/') || next.startsWith('//')) return fallback;

  try {
    const parsed = new URL(next, 'https://ghost.local');
    if (parsed.origin !== 'https://ghost.local') {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
