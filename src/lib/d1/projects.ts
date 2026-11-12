import type { D1DatabaseLike } from '@/lib/d1/client';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import type { DbTag } from '@/types/admin';

export interface D1ProjectListFilters {
  publishedOnly?: boolean;
  featuredOnHome?: boolean;
  featuredOnPortfolio?: boolean;
  projectType?: string;
  projectTypes?: string[];
  category?: string;
  tagSlug?: string;
}

export interface D1ProjectPagination {
  page?: number;
  pageSize?: number;
}

export interface D1LandingPageRecord {
  id: string;
  slug: string;
  title: string;
  cover: string | null;
  content: unknown;
  created_at?: string | null;
  project_slug?: string | null;
  project_title?: string | null;
  project_client?: string | null;
  project_year?: number | null;
  project_tags?: string[];
}

const SLUG_ALIAS_MAP: Record<string, string> = {
  zevi: 'zevi-identidade-visual-branding-cafe-premium',
  conib: 'conid',
};

const CATEGORY_TO_PROJECT_TYPE: Record<string, string> = {
  branding: 'Brand & Campaigns',
  campanha: 'Brand & Campaigns',
  motion: 'Videos & Motions',
  web: 'Websites & Tech',
  institucional: 'Websites & Tech',
};

function parseJsonSafe<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value !== 'string') return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function toBoolean(value: unknown, defaultValue = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === '1' || normalized === 'true') return true;
    if (normalized === '0' || normalized === 'false') return false;
  }
  return defaultValue;
}

export function normalizeLookupSlug(slug: string): string {
  const cleaned = slug.trim().toLowerCase();
  return SLUG_ALIAS_MAP[cleaned] ?? cleaned;
}

function mapRawRowToDbProject(
  row: Record<string, unknown>,
  tagsByProjectId: Map<string, Array<{ tag: DbTag }>>
): DbProjectWithTags {
  const id = String(row.id ?? '');
  const parsedGallery = parseJsonSafe<unknown[]>(row.gallery, []);
  const parsedHomeFeatured = parseJsonSafe<Record<string, unknown> | null>(
    row.home_featured,
    null
  );
  const parsedDestination = parseJsonSafe<Record<string, unknown> | null>(
    row.destination,
    null
  );
  const year =
    typeof row.year === 'number'
      ? row.year
      : typeof row.year === 'string' && row.year.trim()
        ? Number(row.year)
        : null;

  return {
    id,
    slug: String(row.slug ?? ''),
    client_slug: typeof row.client_slug === 'string' ? row.client_slug : null,
    title: String(row.title ?? ''),
    client_name: String(row.client_name ?? ''),
    brand_name: typeof row.brand_name === 'string' ? row.brand_name : null,
    year: Number.isFinite(year) ? year : null,
    project_type: String(row.project_type ?? ''),
    short_label: typeof row.short_label === 'string' ? row.short_label : null,
    description: typeof row.description === 'string' ? row.description : null,
    thumbnail_path:
      typeof row.thumbnail_path === 'string' ? row.thumbnail_path : null,
    hero_image_path:
      typeof row.hero_image_path === 'string' ? row.hero_image_path : null,
    url_landscape:
      typeof row.url_landscape === 'string' ? row.url_landscape : null,
    url_square: typeof row.url_square === 'string' ? row.url_square : null,
    gallery: (Array.isArray(parsedGallery) ? parsedGallery : []) as DbProjectWithTags['gallery'],
    featured_on_home: toBoolean(row.featured_on_home, false),
    featured_on_portfolio: toBoolean(row.featured_on_portfolio, false),
    featured_home_order:
      typeof row.featured_home_order === 'number' ? row.featured_home_order : null,
    featured_portfolio_order:
      typeof row.featured_portfolio_order === 'number'
        ? row.featured_portfolio_order
        : null,
    home_featured:
      parsedHomeFeatured as DbProjectWithTags['home_featured'],
    is_published: toBoolean(row.is_published, false),
    landing_page_id:
      typeof row.landing_page_id === 'string' ? row.landing_page_id : null,
    landing_page_slug:
      typeof row.landing_page_slug === 'string' ? row.landing_page_slug : null,
    destination: (parsedDestination ?? {
      type: 'internal_landing',
      landingSlug:
        typeof row.landing_page_slug === 'string'
          ? row.landing_page_slug
          : String(row.slug ?? ''),
    }) as DbProjectWithTags['destination'],
    case_body: typeof row.case_body === 'string' ? row.case_body : null,
    created_at:
      typeof row.created_at === 'string' ? row.created_at : null,
    updated_at:
      typeof row.updated_at === 'string' ? row.updated_at : null,
    tags: tagsByProjectId.get(id) ?? [],
  } as DbProjectWithTags;
}

async function loadTagsMapForProjects(
  db: D1DatabaseLike,
  projectIds: string[]
): Promise<Map<string, Array<{ tag: DbTag }>>> {
  const tagsMap = new Map<string, Array<{ tag: DbTag }>>();
  if (projectIds.length === 0) return tagsMap;

  const placeholders = projectIds.map(() => '?').join(', ');
  const sql = `
    SELECT ppt.project_id, t.id, t.slug, t.label, t.kind, t.description, t.sort_order, t.created_at
    FROM portfolio_project_tags ppt
    INNER JOIN portfolio_tags t ON t.id = ppt.tag_id
    WHERE ppt.project_id IN (${placeholders})
    ORDER BY COALESCE(t.sort_order, 999) ASC, t.label ASC
  `;
  const res = await db.prepare(sql).bind(...projectIds).all<Record<string, unknown>>();
  for (const row of res.results ?? []) {
    const projectId = String(row.project_id ?? '');
    if (!projectId) continue;
    const list = tagsMap.get(projectId) ?? [];
    list.push({
      tag: {
        id: String(row.id ?? ''),
        slug: String(row.slug ?? ''),
        label: String(row.label ?? ''),
        kind: typeof row.kind === 'string' ? row.kind : 'category',
        description:
          typeof row.description === 'string' ? row.description : null,
        sort_order: typeof row.sort_order === 'number' ? row.sort_order : null,
        created_at: typeof row.created_at === 'string' ? row.created_at : null,
      },
    });
    tagsMap.set(projectId, list);
  }
  return tagsMap;
}

function buildFilterClause(filters: D1ProjectListFilters): {
  whereClause: string;
  params: unknown[];
} {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters.publishedOnly ?? true) {
    conditions.push('p.is_published = 1');
  }
  if (filters.featuredOnHome) {
    conditions.push('p.featured_on_home = 1');
  }
  if (filters.featuredOnPortfolio) {
    conditions.push('p.featured_on_portfolio = 1');
  }

  const effectiveTypes = new Set<string>(filters.projectTypes ?? []);
  if (filters.projectType) effectiveTypes.add(filters.projectType);
  if (filters.category && filters.category !== 'all') {
    const mapped = CATEGORY_TO_PROJECT_TYPE[filters.category];
    if (mapped) effectiveTypes.add(mapped);
  }

  if (effectiveTypes.size > 0) {
    const types = Array.from(effectiveTypes);
    conditions.push(`p.project_type IN (${types.map(() => '?').join(', ')})`);
    params.push(...types);
  }

  const filterTagSlug = filters.tagSlug ?? (
    filters.category &&
    filters.category !== 'all' &&
    !CATEGORY_TO_PROJECT_TYPE[filters.category]
      ? filters.category
      : undefined
  );

  if (filterTagSlug) {
    conditions.push(
      'EXISTS (SELECT 1 FROM portfolio_project_tags ppt INNER JOIN portfolio_tags t ON t.id = ppt.tag_id WHERE ppt.project_id = p.id AND t.slug = ?)'
    );
    params.push(filterTagSlug);
  }

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
  };
}

export async function listProjectsFromD1(
  db: D1DatabaseLike,
  filters: D1ProjectListFilters = {}
): Promise<DbProjectWithTags[]> {
  const { whereClause, params } = buildFilterClause(filters);
  const orderBy = filters.featuredOnHome
    ? 'COALESCE(p.featured_home_order, 999) ASC, COALESCE(p.featured_portfolio_order, 999) ASC, p.created_at DESC'
    : 'COALESCE(p.featured_portfolio_order, 999) ASC, COALESCE(p.featured_home_order, 999) ASC, p.created_at DESC';

  const sql = `
    SELECT p.*, l.slug AS landing_page_slug
    FROM portfolio_projects p
    LEFT JOIN landing_pages l ON l.id = p.landing_page_id
    ${whereClause}
    ORDER BY ${orderBy}
  `;

  const res = await db.prepare(sql).bind(...params).all<Record<string, unknown>>();
  const rows = res.results ?? [];
  const tagsMap = await loadTagsMapForProjects(
    db,
    rows.map((r) => String(r.id ?? '')).filter(Boolean)
  );
  return rows.map((row) => mapRawRowToDbProject(row, tagsMap));
}

export async function listProjectsPagedFromD1(
  db: D1DatabaseLike,
  options: D1ProjectListFilters & D1ProjectPagination = {}
): Promise<{ items: DbProjectWithTags[]; total: number }> {
  const { page = 1, pageSize, ...filters } = options;
  const { whereClause, params } = buildFilterClause(filters);

  const countSql = `
    SELECT COUNT(DISTINCT p.id) AS total
    FROM portfolio_projects p
    ${whereClause}
  `;
  const countRow = await db
    .prepare(countSql)
    .bind(...params)
    .first<{ total?: number | string }>();
  const total = Number(countRow?.total ?? 0);

  const orderBy = filters.featuredOnHome
    ? 'COALESCE(p.featured_home_order, 999) ASC, COALESCE(p.featured_portfolio_order, 999) ASC, p.created_at DESC'
    : 'COALESCE(p.featured_portfolio_order, 999) ASC, COALESCE(p.featured_home_order, 999) ASC, p.created_at DESC';

  let limitClause = '';
  const queryParams = [...params];
  if (pageSize && pageSize > 0) {
    const offset = Math.max(0, (page - 1) * pageSize);
    limitClause = 'LIMIT ? OFFSET ?';
    queryParams.push(pageSize, offset);
  }

  const sql = `
    SELECT p.*, l.slug AS landing_page_slug
    FROM portfolio_projects p
    LEFT JOIN landing_pages l ON l.id = p.landing_page_id
    ${whereClause}
    ORDER BY ${orderBy}
    ${limitClause}
  `;
  const res = await db.prepare(sql).bind(...queryParams).all<Record<string, unknown>>();
  const rows = res.results ?? [];
  const tagsMap = await loadTagsMapForProjects(
    db,
    rows.map((r) => String(r.id ?? '')).filter(Boolean)
  );
  return {
    items: rows.map((row) => mapRawRowToDbProject(row, tagsMap)),
    total,
  };
}

export async function getProjectBySlugFromD1(
  db: D1DatabaseLike,
  slug: string
): Promise<DbProjectWithTags | null> {
  const lookupSlug = normalizeLookupSlug(slug);
  const sql = `
    SELECT p.*, l.slug AS landing_page_slug
    FROM portfolio_projects p
    LEFT JOIN landing_pages l ON l.id = p.landing_page_id
    WHERE p.is_published = 1
      AND (lower(p.slug) = lower(?) OR lower(l.slug) = lower(?))
    LIMIT 1
  `;
  const row = await db
    .prepare(sql)
    .bind(lookupSlug, lookupSlug)
    .first<Record<string, unknown>>();
  if (!row) return null;

  const projectId = String(row.id ?? '');
  const tagsMap = await loadTagsMapForProjects(
    db,
    projectId ? [projectId] : []
  );
  return mapRawRowToDbProject(row, tagsMap);
}

export async function getLandingPageBySlugFromD1(
  db: D1DatabaseLike,
  slug: string
): Promise<D1LandingPageRecord | null> {
  const lookupSlug = normalizeLookupSlug(slug);
  const sql = `
    SELECT
      l.id,
      l.slug,
      l.title,
      l.cover,
      l.content,
      l.created_at,
      p.id AS project_id,
      p.slug AS project_slug,
      p.title AS project_title,
      p.client_name AS project_client,
      p.year AS project_year,
      p.hero_image_path,
      p.thumbnail_path
    FROM landing_pages l
    LEFT JOIN portfolio_projects p ON p.landing_page_id = l.id OR lower(p.slug) = lower(l.slug)
    WHERE lower(l.slug) = lower(?) OR lower(p.slug) = lower(?)
    LIMIT 1
  `;

  const row = await db
    .prepare(sql)
    .bind(lookupSlug, lookupSlug)
    .first<Record<string, unknown>>();
  if (!row) return null;

  const projectId = typeof row.project_id === 'string' ? row.project_id : null;
  let projectTags: string[] = [];
  if (projectId) {
    const tagsMap = await loadTagsMapForProjects(db, [projectId]);
    projectTags = (tagsMap.get(projectId) ?? []).map((entry) => entry.tag.label);
  }

  const parsedContent = parseJsonSafe<unknown>(row.content, []);
  const fallbackCover =
    (typeof row.cover === 'string' && row.cover) ||
    (typeof row.hero_image_path === 'string' && row.hero_image_path) ||
    (typeof row.thumbnail_path === 'string' && row.thumbnail_path) ||
    null;

  return {
    id: String(row.id ?? ''),
    slug: String(row.slug ?? lookupSlug),
    title: String(row.title ?? row.project_title ?? lookupSlug),
    cover: fallbackCover,
    content: parsedContent,
    created_at: typeof row.created_at === 'string' ? row.created_at : null,
    project_slug: typeof row.project_slug === 'string' ? row.project_slug : null,
    project_title:
      typeof row.project_title === 'string' ? row.project_title : null,
    project_client:
      typeof row.project_client === 'string' ? row.project_client : null,
    project_year:
      typeof row.project_year === 'number' ? row.project_year : null,
    project_tags: projectTags,
  };
}
