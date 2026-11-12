import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { D1DatabaseLike, D1PreparedStatementLike } from '@/lib/d1/client';
import {
  deleteProjectInD1,
  getAdminProjectByIdFromD1,
  listAdminProjectsFromD1,
  saveLandingPageInD1,
  toggleProjectColumnInD1,
  upsertProjectInD1,
  upsertSiteAssetInD1,
  toggleSiteAssetActiveInD1,
  deleteSiteAssetInD1,
} from '@/lib/d1/admin';
import { getProjectBySlugFromD1, getLandingPageBySlugFromD1 } from '@/lib/d1/projects';

function createMemoryD1(): D1DatabaseLike {
  const sqlite = new DatabaseSync(':memory:');
  const m1 = readFileSync(
    join(process.cwd(), 'cloudflare/migrations/0001_initial_schema.sql'),
    'utf8'
  );
  const m2 = readFileSync(
    join(
      process.cwd(),
      'cloudflare/migrations/0002_add_project_routing_and_case_columns.sql'
    ),
    'utf8'
  );
  sqlite.exec(m1);
  sqlite.exec(m2);

  return {
    prepare(query: string): D1PreparedStatementLike {
      let bound: unknown[] = [];
      const stmt: D1PreparedStatementLike = {
        bind(...values: unknown[]) {
          bound = values;
          return stmt;
        },
        async first<T = Record<string, unknown>>() {
          const row = sqlite.prepare(query).get(...(bound as never[]));
          return (row as T | undefined) ?? null;
        },
        async all<T = Record<string, unknown>>() {
          const rows = sqlite.prepare(query).all(...(bound as never[]));
          return { results: rows as T[] };
        },
        async run() {
          const res = sqlite.prepare(query).run(...(bound as never[]));
          return { success: true, meta: { changes: Number(res.changes) } };
        },
      };
      return stmt;
    },
  };
}

describe('D1 Admin read/write parity', () => {
  it('creates, lists, toggles, and deletes projects & landing pages cleanly in D1 SQLite', async () => {
    const db = createMemoryD1();

    const lp = await saveLandingPageInD1(db, {
      title: 'Test Case Study',
      slug: 'test-case-study',
      cover: 'https://assets.portfoliodanilo.com/portfolio-media/test/cover.webp',
      content: {
        template: 'master-project-v3-alpa-hero',
        project_title: 'Test Case Study',
        hero_cover_image: {
          src: 'https://assets.portfoliodanilo.com/portfolio-media/test/cover.webp',
          alt: 'Cover',
          kind: 'image',
        },
      },
    });

    const lpBySlug = await getLandingPageBySlugFromD1(db, 'test-case-study');
    expect(lpBySlug?.id).toBe(lp.id);
    expect(lpBySlug?.title).toBe('Test Case Study');

    const created = await upsertProjectInD1(db, {
      slug: 'test-case-study',
      client_slug: 'test-client',
      title: 'Test Case Study',
      client_name: 'Test Client',
      brand_name: 'Test Brand',
      year: 2026,
      project_type: 'Brand & Campaigns',
      url_landscape:
        'https://assets.portfoliodanilo.com/portfolio-media/test/cover.webp',
      url_square:
        'https://assets.portfoliodanilo.com/portfolio-media/test/cover.webp',
      featured_on_home: false,
      featured_on_portfolio: true,
      is_published: false,
      landing_page_id: lp.id,
      destination: { type: 'internal_landing', landingSlug: 'test-case-study' },
    });

    expect(created).not.toBeNull();
    expect(created?.is_published).toBe(false);

    await toggleProjectColumnInD1(db, created!.id, 'is_published', true);
    await toggleProjectColumnInD1(db, created!.id, 'featured_on_home', true);

    const fetchedAdmin = await getAdminProjectByIdFromD1(db, created!.id);
    expect(fetchedAdmin?.is_published).toBe(true);
    expect(fetchedAdmin?.featured_on_home).toBe(true);

    const fetchedPublic = await getProjectBySlugFromD1(db, 'test-case-study');
    expect(fetchedPublic?.landing_page_slug).toBe('test-case-study');

    const listedAdmin = await listAdminProjectsFromD1(db, {
      status: 'published',
    });
    expect(listedAdmin).toHaveLength(1);

    await deleteProjectInD1(db, created!.id);
    expect(await getAdminProjectByIdFromD1(db, created!.id)).toBeNull();
  });

  it('upserts, toggles, and deletes site_assets cleanly in D1 SQLite', async () => {
    const db = createMemoryD1();
    await upsertSiteAssetInD1(db, {
      key: 'about.origin_image.1',
      page: 'sobre',
      asset_type: 'image',
      file_path: 'about/origin/origin2/cena-01.webp',
      bucket: 'site-assets',
    });

    const inserted = await db
      .prepare('SELECT id, is_active FROM site_assets WHERE key = ?')
      .bind('about.origin_image.1')
      .first<{ id: string; is_active: number }>();
    expect(inserted?.is_active).toBe(1);

    await toggleSiteAssetActiveInD1(db, inserted!.id, false);
    const toggled = await db
      .prepare('SELECT is_active FROM site_assets WHERE id = ?')
      .bind(inserted!.id)
      .first<{ is_active: number }>();
    expect(toggled?.is_active).toBe(0);

    await deleteSiteAssetInD1(db, inserted!.id);
    const deleted = await db
      .prepare('SELECT id FROM site_assets WHERE id = ?')
      .bind(inserted!.id)
      .first<{ id: string }>();
    expect(deleted).toBeNull();
  });
});

