import { BRAND } from '@/config/brand';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);
export const SITE_TITLE_SUFFIX = ' | Danilo Novais';

type DescriptionOptions = {
  min?: number;
  max?: number;
  fallbackTail?: string;
};

const collapseWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

export function getCanonicalSiteUrl(): string {
  const fallback = `https://${BRAND.domain}`;
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return fallback;

  try {
    const parsed = new URL(raw);
    const isLocal = LOCAL_HOSTS.has(parsed.hostname.toLowerCase());
    if (isLocal || parsed.protocol !== 'https:') return fallback;
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return fallback;
  }
}

export function toCanonicalUrl(pathname: string = '/'): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getCanonicalSiteUrl().replace(/\/$/, '')}${normalizedPath}`;
}

export function toAbsoluteUrl(
  value: string,
  base: string = getCanonicalSiteUrl()
): string {
  try {
    return new URL(value, base).toString();
  } catch {
    return value;
  }
}

function truncateAtWordBoundary(value: string, max: number): string {
  if (value.length <= max) return value;
  const candidate = value.slice(0, Math.max(0, max - 3));
  const lastSpace = candidate.lastIndexOf(' ');
  const trimmed = (lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate)
    .replace(/[.,;:!?-]+$/g, '')
    .trim();
  return `${trimmed}...`;
}

export function normalizeMetaTitle(title: string, max = 60): string {
  const normalized = collapseWhitespace(title);
  return truncateAtWordBoundary(normalized, max);
}

export function normalizeTemplatedTitle(
  title: string,
  {
    max = 60,
    suffix = SITE_TITLE_SUFFIX,
  }: {
    max?: number;
    suffix?: string;
  } = {}
): string {
  const normalized = collapseWhitespace(title);
  const available = Math.max(0, max - collapseWhitespace(suffix).length);
  return truncateAtWordBoundary(normalized, available);
}

export function normalizeMetaDescription(
  description: string,
  {
    min = 0,
    max = 160,
    fallbackTail = ' Portfólio com foco em branding, motion e experiências digitais de alta performance.',
  }: DescriptionOptions = {}
): string {
  let normalized = collapseWhitespace(description);

  if (normalized.length < min) {
    normalized = collapseWhitespace(`${normalized}${fallbackTail}`);
    while (normalized.length < min) {
      normalized = collapseWhitespace(
        `${normalized} Estratégia, narrativa e execução com precisão.`
      );
    }
  }

  return truncateAtWordBoundary(normalized, max);
}
