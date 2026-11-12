import type { D1DatabaseLike } from '@/lib/d1/client';

type RawAdminProjectRow = Record<string, unknown>;

function parseJsonValue<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

function serializeJson(value: unknown, defaultSerialized: string): string {
  if (value === null || value === undefined) return defaultSerialized;
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

function normalizeAdminProjectRow(row: RawAdminProjectRow) {
  return {
    ...row,
    id: String(row.id),
    slug: String(row.slug ?? ''),
    title: String(row.title ?? ''),
    client_name: typeof row.client_name === 'string' ? row.client_name : '',
    brand_name: typeof row.brand_name === 'string' ? row.brand_name : null,
    year: typeof row.year === 'number' ? row.year : Number(row.year ?? 0) || null,
    project_type: String(row.project_type ?? 'Brand & Campaigns'),
    featured_on_home: Boolean(row.featured_on_home),
    featured_on_portfolio: Boolean(row.featured_on_portfolio),
    is_published: Boolean(row.is_published),
    gallery: parseJsonValue(row.gallery, [] as unknown[]),
    home_featured: parseJsonValue(row.home_featured, null as Record<string, unknown> | null),
    destination: parseJsonValue(row.destination, null as Record<string, unknown> | null),
  };
}

export async function listTagsFromD1(db: D1DatabaseLike) {
  const { results } = await db
    .prepare(
      'SELECT id, slug, label, kind, description, sort_order, created_at FROM portfolio_tags ORDER BY label ASC'
    )
    .all<Record<string, unknown>>();
  return results ?? [];
}

export async function listLandingPageSummariesFromD1(db: D1DatabaseLike) {
  const { results } = await db
    .prepare('SELECT id, title, slug, content FROM landing_pages ORDER BY title ASC')
    .all<{ id: string; title: string; slug: string; content: string }>();

  return (results ?? []).map((row) => ({
    ...row,
    content: parseJsonValue(row.content, [] as unknown),
  }));
}

export async function listAdminProjectsFromD1(
  db: D1DatabaseLike,
  filters?: {
    year?: number;
    type?: string;
    status?: 'published' | 'draft';
    search?: string;
  }
) {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (typeof filters?.year === 'number' && Number.isFinite(filters.year)) {
    clauses.push('p.year = ?');
    params.push(filters.year);
  }
  if (filters?.type) {
    clauses.push('p.project_type = ?');
    params.push(filters.type);
  }
  if (filters?.status === 'published') {
    clauses.push('p.is_published = 1');
  } else if (filters?.status === 'draft') {
    clauses.push('p.is_published = 0');
  }
  if (filters?.search?.trim()) {
    const pattern = `%${filters.search.trim().toLowerCase()}%`;
    clauses.push('(LOWER(p.title) LIKE ? OR LOWER(p.client_name) LIKE ?)');
    params.push(pattern, pattern);
  }

  const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  const { results: baseRows } = await db
    .prepare(
      `SELECT p.*, lp.content AS landing_page_content
       FROM portfolio_projects p
       LEFT JOIN landing_pages lp ON lp.id = p.landing_page_id
       ${whereSql}
       ORDER BY p.updated_at DESC`
    )
    .bind(...params)
    .all<RawAdminProjectRow>();

  const rows = baseRows ?? [];
  if (rows.length === 0) return [];

  const [tags, { results: relRows }] = await Promise.all([
    listTagsFromD1(db),
    db
      .prepare('SELECT project_id, tag_id FROM portfolio_project_tags')
      .all<{ project_id: string; tag_id: string }>(),
  ]);

  const tagsById = new Map(tags.map((t) => [String(t.id), t]));
  const tagsByProject = new Map<
    string,
    Array<{ tag: { label: string; slug: string } }>
  >();

  for (const rel of relRows ?? []) {
    const tag = tagsById.get(rel.tag_id);
    if (!tag) continue;
    const list = tagsByProject.get(rel.project_id) ?? [];
    list.push({
      tag: { label: String(tag.label), slug: String(tag.slug) },
    });
    tagsByProject.set(rel.project_id, list);
  }

  return rows.map((row) => {
    const normalized = normalizeAdminProjectRow(row);
    const lpContent = parseJsonValue(row.landing_page_content, null);
    return {
      ...normalized,
      landing_pages: lpContent ? { content: lpContent } : null,
      tags: tagsByProject.get(normalized.id) ?? [],
    };
  });
}

export async function getAdminProjectByIdFromD1(db: D1DatabaseLike, id: string) {
  const row = await db
    .prepare('SELECT * FROM portfolio_projects WHERE id = ? LIMIT 1')
    .bind(id)
    .first<RawAdminProjectRow>();

  if (!row) return null;

  const { results: relRows } = await db
    .prepare('SELECT tag_id FROM portfolio_project_tags WHERE project_id = ?')
    .bind(id)
    .all<{ tag_id: string }>();

  return {
    ...normalizeAdminProjectRow(row),
    project_tags: (relRows ?? []).map((r) => ({ tag_id: r.tag_id })),
  };
}

export async function getProjectIdBySlugFromD1(
  db: D1DatabaseLike,
  slug: string
): Promise<{ id: string } | null> {
  return db
    .prepare('SELECT id FROM portfolio_projects WHERE slug = ? LIMIT 1')
    .bind(slug)
    .first<{ id: string }>();
}

async function getProjectTableColumns(db: D1DatabaseLike): Promise<Set<string>> {
  try {
    const { results } = await db
      .prepare('PRAGMA table_info(portfolio_projects)')
      .all<{ name: string }>();
    return new Set((results ?? []).map((col) => col.name));
  } catch {
    return new Set();
  }
}

export async function upsertProjectInD1(
  db: D1DatabaseLike,
  payload: Record<string, unknown> & { id?: string; tagIds?: string[] }
) {
  const { tagIds, ...projectData } = payload;
  const projectId =
    typeof projectData.id === 'string' && projectData.id.trim()
      ? projectData.id.trim()
      : globalThis.crypto.randomUUID();
  const nowIso = new Date().toISOString();
  const columns = await getProjectTableColumns(db);
  const hasExtendedColumns =
    columns.size === 0 ||
    (columns.has('destination') &&
      columns.has('case_body') &&
      columns.has('client_slug'));

  const baseValues = [
    projectId,
    String(projectData.slug ?? ''),
    String(projectData.title ?? ''),
    projectData.client_name ?? null,
    projectData.brand_name ?? projectData.client_name ?? null,
    typeof projectData.year === 'number' ? projectData.year : null,
    String(projectData.project_type ?? 'Brand & Campaigns'),
    projectData.short_label ?? null,
    projectData.description ?? null,
    projectData.thumbnail_path ?? projectData.url_landscape ?? null,
    projectData.hero_image_path ?? projectData.url_landscape ?? null,
    projectData.url_landscape ?? null,
    projectData.url_square ?? null,
    serializeJson(projectData.gallery, '[]'),
    projectData.featured_on_home ? 1 : 0,
    projectData.featured_on_portfolio ? 1 : 0,
    typeof projectData.featured_home_order === 'number'
      ? projectData.featured_home_order
      : null,
    typeof projectData.featured_portfolio_order === 'number'
      ? projectData.featured_portfolio_order
      : null,
    serializeJson(projectData.home_featured, '{}'),
    projectData.is_published ? 1 : 0,
    projectData.landing_page_id ?? null,
    nowIso,
  ];

  if (hasExtendedColumns) {
    await db
      .prepare(
        `INSERT INTO portfolio_projects (
          id, slug, title, client_name, brand_name, year, project_type, short_label,
          description, thumbnail_path, hero_image_path, url_landscape, url_square,
          gallery, featured_on_home, featured_on_portfolio, featured_home_order,
          featured_portfolio_order, home_featured, is_published, landing_page_id,
          updated_at, client_slug, case_body, destination
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          slug = excluded.slug,
          title = excluded.title,
          client_name = excluded.client_name,
          brand_name = excluded.brand_name,
          year = excluded.year,
          project_type = excluded.project_type,
          short_label = excluded.short_label,
          description = excluded.description,
          thumbnail_path = excluded.thumbnail_path,
          hero_image_path = excluded.hero_image_path,
          url_landscape = excluded.url_landscape,
          url_square = excluded.url_square,
          gallery = excluded.gallery,
          featured_on_home = excluded.featured_on_home,
          featured_on_portfolio = excluded.featured_on_portfolio,
          featured_home_order = excluded.featured_home_order,
          featured_portfolio_order = excluded.featured_portfolio_order,
          home_featured = excluded.home_featured,
          is_published = excluded.is_published,
          landing_page_id = excluded.landing_page_id,
          updated_at = excluded.updated_at,
          client_slug = excluded.client_slug,
          case_body = excluded.case_body,
          destination = excluded.destination`
      )
      .bind(
        ...baseValues,
        projectData.client_slug ?? null,
        projectData.case_body ?? null,
        serializeJson(projectData.destination, '{"type":"modal"}')
      )
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO portfolio_projects (
          id, slug, title, client_name, brand_name, year, project_type, short_label,
          description, thumbnail_path, hero_image_path, url_landscape, url_square,
          gallery, featured_on_home, featured_on_portfolio, featured_home_order,
          featured_portfolio_order, home_featured, is_published, landing_page_id,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          slug = excluded.slug,
          title = excluded.title,
          client_name = excluded.client_name,
          brand_name = excluded.brand_name,
          year = excluded.year,
          project_type = excluded.project_type,
          short_label = excluded.short_label,
          description = excluded.description,
          thumbnail_path = excluded.thumbnail_path,
          hero_image_path = excluded.hero_image_path,
          url_landscape = excluded.url_landscape,
          url_square = excluded.url_square,
          gallery = excluded.gallery,
          featured_on_home = excluded.featured_on_home,
          featured_on_portfolio = excluded.featured_on_portfolio,
          featured_home_order = excluded.featured_home_order,
          featured_portfolio_order = excluded.featured_portfolio_order,
          home_featured = excluded.home_featured,
          is_published = excluded.is_published,
          landing_page_id = excluded.landing_page_id,
          updated_at = excluded.updated_at`
      )
      .bind(...baseValues)
      .run();
  }

  if (Array.isArray(tagIds)) {
    await db
      .prepare('DELETE FROM portfolio_project_tags WHERE project_id = ?')
      .bind(projectId)
      .run();
    for (const tagId of tagIds) {
      if (!tagId) continue;
      await db
        .prepare(
          'INSERT OR IGNORE INTO portfolio_project_tags (project_id, tag_id) VALUES (?, ?)'
        )
        .bind(projectId, tagId)
        .run();
    }
  }

  return getAdminProjectByIdFromD1(db, projectId);
}

export async function deleteProjectInD1(db: D1DatabaseLike, id: string) {
  const existing = await db
    .prepare('SELECT slug, client_slug FROM portfolio_projects WHERE id = ? LIMIT 1')
    .bind(id)
    .first<{ slug: string; client_slug?: string | null }>();

  await db
    .prepare('DELETE FROM portfolio_project_tags WHERE project_id = ?')
    .bind(id)
    .run();
  await db
    .prepare('DELETE FROM portfolio_projects WHERE id = ?')
    .bind(id)
    .run();

  return existing ?? null;
}

export async function toggleProjectColumnInD1(
  db: D1DatabaseLike,
  id: string,
  column: 'is_published' | 'featured_on_portfolio' | 'featured_on_home',
  enabled: boolean
) {
  const value = enabled ? 1 : 0;
  const nowIso = new Date().toISOString();

  if (column === 'is_published') {
    await db
      .prepare(
        'UPDATE portfolio_projects SET is_published = ?, updated_at = ? WHERE id = ?'
      )
      .bind(value, nowIso, id)
      .run();
    return;
  }

  if (column === 'featured_on_portfolio') {
    await db
      .prepare(
        'UPDATE portfolio_projects SET featured_on_portfolio = ?, updated_at = ? WHERE id = ?'
      )
      .bind(value, nowIso, id)
      .run();
    return;
  }

  await db
    .prepare(
      'UPDATE portfolio_projects SET featured_on_home = ?, updated_at = ? WHERE id = ?'
    )
    .bind(value, nowIso, id)
    .run();
}

export async function getLandingPagesByIdsFromD1(
  db: D1DatabaseLike,
  ids: string[]
) {
  const cleanIds = ids.filter(Boolean);
  if (cleanIds.length === 0) return [];
  const placeholders = cleanIds.map(() => '?').join(', ');
  const { results } = await db
    .prepare(`SELECT slug FROM landing_pages WHERE id IN (${placeholders})`)
    .bind(...cleanIds)
    .all<{ slug: string }>();
  return results ?? [];
}

export async function saveLandingPageInD1(
  db: D1DatabaseLike,
  payload: {
    id?: string;
    title: string;
    slug: string;
    cover?: string | null;
    content: unknown;
  }
) {
  const id = payload.id?.trim() || globalThis.crypto.randomUUID();
  const serializedContent = serializeJson(payload.content, '[]');

  await db
    .prepare(
      `INSERT INTO landing_pages (id, title, slug, cover, content, created_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         title = excluded.title,
         slug = excluded.slug,
         cover = excluded.cover,
         content = excluded.content`
    )
    .bind(
      id,
      payload.title,
      payload.slug,
      payload.cover ?? null,
      serializedContent,
      new Date().toISOString()
    )
    .run();

  return { id };
}

export async function deleteLandingPageInD1(db: D1DatabaseLike, id: string) {
  const existing = await db
    .prepare('SELECT slug FROM landing_pages WHERE id = ? LIMIT 1')
    .bind(id)
    .first<{ slug: string }>();

  await db.prepare('DELETE FROM landing_pages WHERE id = ?').bind(id).run();
  return existing ?? null;
}

export async function getSiteAssetByKeyFromD1(
  db: D1DatabaseLike,
  key: string
) {
  return db
    .prepare('SELECT id, key, bucket, file_path FROM site_assets WHERE key = ? LIMIT 1')
    .bind(key)
    .first<{ id: string; key: string; bucket: string; file_path: string }>();
}

export async function getSiteAssetByIdFromD1(db: D1DatabaseLike, id: string) {
  return db
    .prepare('SELECT id, key, bucket, file_path FROM site_assets WHERE id = ? LIMIT 1')
    .bind(id)
    .first<{ id: string; key: string; bucket: string; file_path: string }>();
}

export async function upsertSiteAssetInD1(
  db: D1DatabaseLike,
  payload: {
    key: string;
    page: string;
    asset_type: string;
    description?: string | null;
    sort_order?: number | null;
    file_path: string;
    bucket?: string;
    metadata?: Record<string, unknown> | null;
  }
) {
  const nowIso = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO site_assets (
        id, key, bucket, file_path, asset_type, page, description,
        is_active, sort_order, metadata, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        bucket = excluded.bucket,
        file_path = excluded.file_path,
        asset_type = excluded.asset_type,
        page = excluded.page,
        description = excluded.description,
        is_active = 1,
        sort_order = excluded.sort_order,
        metadata = excluded.metadata,
        updated_at = excluded.updated_at`
    )
    .bind(
      globalThis.crypto.randomUUID(),
      payload.key,
      payload.bucket ?? 'site-assets',
      payload.file_path,
      payload.asset_type,
      payload.page,
      payload.description ?? null,
      payload.sort_order ?? null,
      serializeJson(payload.metadata ?? {}, '{}'),
      nowIso,
      nowIso
    )
    .run();
}

export async function updateSiteAssetRoleInD1(
  db: D1DatabaseLike,
  id: string,
  role: {
    key: string;
    page: string;
    asset_type: string;
    description?: string | null;
    sort_order?: number | null;
    file_path: string;
  }
) {
  await db
    .prepare(
      `UPDATE site_assets
       SET key = ?, page = ?, asset_type = ?, description = ?,
           sort_order = ?, file_path = ?, updated_at = ?
       WHERE id = ?`
    )
    .bind(
      role.key,
      role.page,
      role.asset_type,
      role.description ?? null,
      role.sort_order ?? null,
      role.file_path,
      new Date().toISOString(),
      id
    )
    .run();
}

export async function updateSiteAssetFilePathInD1(
  db: D1DatabaseLike,
  id: string,
  filePath: string
) {
  await db
    .prepare('UPDATE site_assets SET file_path = ?, updated_at = ? WHERE id = ?')
    .bind(filePath, new Date().toISOString(), id)
    .run();
}

export async function toggleSiteAssetActiveInD1(
  db: D1DatabaseLike,
  id: string,
  isActive: boolean
) {
  await db
    .prepare('UPDATE site_assets SET is_active = ?, updated_at = ? WHERE id = ?')
    .bind(isActive ? 1 : 0, new Date().toISOString(), id)
    .run();
}

export async function deleteSiteAssetInD1(db: D1DatabaseLike, id: string) {
  await db.prepare('DELETE FROM site_assets WHERE id = ?').bind(id).run();
}

export async function healLandingPagesBucketInD1(db: D1DatabaseLike) {
  const { results } = await db
    .prepare("SELECT id, file_path FROM site_assets WHERE bucket = 'landing-pages'")
    .all<{ id: string; file_path: string | null }>();

  let fixedCount = 0;
  for (const row of results ?? []) {
    const rawPath = row.file_path || '';
    const newPath =
      rawPath && !rawPath.startsWith('landing-pages/')
        ? `landing-pages/${rawPath}`
        : rawPath;
    await db
      .prepare(
        "UPDATE site_assets SET bucket = 'site-assets', file_path = ?, updated_at = ? WHERE id = ?"
      )
      .bind(newPath, new Date().toISOString(), row.id)
      .run();
    fixedCount += 1;
  }
  return fixedCount;
}

