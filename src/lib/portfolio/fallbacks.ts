import recoveredPortfolio from '@/config/recovered-portfolio.json';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import type { DbTag } from '@/types/admin';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

type RecoveredPortfolioTag = {
  id: string;
  slug: string;
  label: string;
  kind: string;
  sort_order?: number | null;
  description?: string | null;
  created_at?: string | null;
};

type RecoveredPortfolioEntry = {
  id: string;
  slug: string;
  client_slug?: string | null;
  title: string;
  client_name: string;
  brand_name?: string | null;
  year?: number | null;
  project_type: string;
  featured_on_home: number | boolean;
  featured_home_order?: number | null;
  featured_on_portfolio: number | boolean;
  featured_portfolio_order?: number | null;
  is_published: number | boolean;
  landing_page_id?: string | null;
  landing_page_slug?: string | null;
  thumbnail_path: string;
  hero_image_path?: string | null;
  url_landscape?: string | null;
  url_square?: string | null;
  home_featured?: unknown;
  tags?: RecoveredPortfolioTag[];
  description?: string | null;
  case_body?: string | null;
  destination?: unknown;
  gallery?: Array<{ url: string; caption?: string; type?: 'image' | 'video' }>;
  landing_page_content?: unknown;
};

const FALLBACK_CATEGORY_MAP: Record<string, ProjectCategory> = {
  'branding & campanha': 'branding',
  branding: 'branding',
  campanha: 'branding',
  'brand & campaigns': 'branding',
  'web & motion': 'web',
  'web & digital': 'web',
  'websites & tech': 'web',
  'web campaigns, websites & tech': 'web',
  'motion & video': 'motion',
  'video & motion': 'motion',
  motion: 'motion',
  'videos & motions': 'motion',
};

const SLUG_ALIAS_MAP: Record<string, string> = {
  zevi: 'zevi-identidade-visual-branding-cafe-premium',
  conib: 'conid',
};

function parseJsonIfNeeded<T>(value: unknown): T | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return null;
    }
  }
  return value as T;
}

export function mapFallbackCategory(label?: string): ProjectCategory {
  if (!label) return 'branding';
  const normalized = label.trim().toLowerCase();
  return FALLBACK_CATEGORY_MAP[normalized] ?? 'branding';
}

export function getRecoveredDbProjects(): DbProjectWithTags[] {
  const entries = recoveredPortfolio as RecoveredPortfolioEntry[];
  return entries.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    client_slug: entry.client_slug ?? entry.slug,
    title: entry.title,
    client_name: entry.client_name,
    brand_name: entry.brand_name ?? entry.client_name,
    year: entry.year ?? null,
    project_type: entry.project_type,
    short_label: entry.title ?? null,
    featured_on_home: Boolean(entry.featured_on_home),
    featured_home_order: entry.featured_home_order ?? null,
    featured_on_portfolio: Boolean(entry.featured_on_portfolio),
    featured_portfolio_order: entry.featured_portfolio_order ?? null,
    is_published: Boolean(entry.is_published),
    landing_page_id: entry.landing_page_id ?? null,
    landing_page_slug: entry.landing_page_slug ?? entry.slug,
    thumbnail_path: entry.thumbnail_path,
    hero_image_path: entry.hero_image_path ?? entry.thumbnail_path,
    url_landscape: entry.url_landscape ?? entry.thumbnail_path,
    url_square: entry.url_square ?? entry.thumbnail_path,
    home_featured: parseJsonIfNeeded(entry.home_featured),
    short_description: entry.description ?? undefined,
    description: entry.description ?? undefined,
    case_body: entry.case_body ?? entry.description ?? undefined,
    destination: parseJsonIfNeeded(entry.destination) ?? undefined,
    gallery: Array.isArray(entry.gallery) ? entry.gallery : [],
    tags: (entry.tags ?? []).map((tag) => ({
      tag: {
        id: tag.id,
        slug: tag.slug,
        label: tag.label,
        kind: tag.kind,
        sort_order: tag.sort_order ?? null,
        description: tag.description ?? null,
        created_at: tag.created_at ?? null,
      } satisfies DbTag,
    })),
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  })) as DbProjectWithTags[];
}

export function buildFallbackProjects(options?: {
  featuredOnHomeOnly?: boolean;
}): PortfolioProject[] {
  const allProjects = getRecoveredDbProjects();

  const filtered = options?.featuredOnHomeOnly
    ? allProjects
        .filter((project) => project.featured_on_home)
        .sort(
          (a, b) =>
            (a.featured_home_order ?? Number.MAX_SAFE_INTEGER) -
            (b.featured_home_order ?? Number.MAX_SAFE_INTEGER)
        )
    : [...allProjects].sort(
        (a, b) =>
          (a.featured_portfolio_order ?? Number.MAX_SAFE_INTEGER) -
          (b.featured_portfolio_order ?? Number.MAX_SAFE_INTEGER)
      );

  return filtered.map((project, index) =>
    mapDbProjectToPortfolioProject(project, index)
  );
}

export function getFallbackProjectBySlug(
  slug: string
): PortfolioProject | undefined {
  const trimmed = slug.trim().toLowerCase();
  if (!trimmed) return undefined;
  const canonical = SLUG_ALIAS_MAP[trimmed] ?? trimmed;
  const normalizedHyphen = canonical.replace(/_/g, '-');

  return buildFallbackProjects().find((project) => {
    const projectSlug = project.slug.toLowerCase();
    const projectHyphen = projectSlug.replace(/_/g, '-');
    const landingSlug = (project.landingPageSlug ?? '').toLowerCase();
    return (
      projectSlug === canonical ||
      projectHyphen === normalizedHyphen ||
      landingSlug === canonical ||
      landingSlug.replace(/_/g, '-') === normalizedHyphen
    );
  });
}
