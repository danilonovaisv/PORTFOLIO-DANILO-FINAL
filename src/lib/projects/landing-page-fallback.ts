import recoveredPortfolio from '@/config/recovered-portfolio.json';

export interface LandingPageBackupRecord {
  id: string;
  slug: string;
  title: string;
  cover: string | null;
  content: unknown;
  created_at?: string;
}

type RecoveredLandingSource = {
  id: string;
  slug: string;
  landing_page_id?: string | null;
  landing_page_slug?: string | null;
  title: string;
  thumbnail_path?: string | null;
  url_landscape?: string | null;
  landing_page_content?: unknown;
};

const LANDING_SLUG_ALIASES: Record<string, string> = {
  zevi: 'zevi-identidade-visual-branding-cafe-premium',
  conib: 'conid',
};

/**
 * Fallback estático canônico derivado de `src/config/recovered-portfolio.json` (ativos R2 verificados).
 * Garante continuidade caso o binding D1 esteja indisponível, sem sintetizar conteúdo falso.
 */
export const FALLBACK_LANDING_PAGES: LandingPageBackupRecord[] = (
  recoveredPortfolio as RecoveredLandingSource[]
)
  .filter((entry) => Boolean(entry.landing_page_content))
  .map((entry) => ({
    id: entry.landing_page_id || entry.id,
    slug: entry.landing_page_slug || entry.slug,
    title: entry.title,
    cover: entry.url_landscape || entry.thumbnail_path || null,
    content: entry.landing_page_content,
    created_at: '2026-01-01T00:00:00.000Z',
  }));

export function getFallbackLandingPage(
  slug: string
): LandingPageBackupRecord | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return null;

  const targetSlug = LANDING_SLUG_ALIASES[normalized] ?? normalized;
  const normalizedHyphen = targetSlug.replace(/_/g, '-');

  const found = FALLBACK_LANDING_PAGES.find((page) => {
    const candidate = page.slug.toLowerCase();
    return (
      candidate === targetSlug ||
      candidate.replace(/_/g, '-') === normalizedHyphen
    );
  });

  return found ?? null;
}
