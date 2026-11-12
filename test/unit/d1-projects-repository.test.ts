import type { D1DatabaseLike } from '@/lib/d1/client';
import {
  getLandingPageBySlugFromD1,
  getProjectBySlugFromD1,
  listProjectsFromD1,
  listProjectsPagedFromD1,
} from '@/lib/d1/projects';
import { listSiteAssetsFromD1 } from '@/lib/d1/site-assets';

function createMockD1(handlers: {
  all?: (_sql: string, _params: unknown[]) => unknown[];
  first?: (_sql: string, _params: unknown[]) => unknown;
}): D1DatabaseLike {
  return {
    prepare(sql: string) {
      let boundParams: unknown[] = [];
      const stmt = {
        bind(...params: unknown[]) {
          boundParams = params;
          return stmt;
        },
        async all<T = Record<string, unknown>>() {
          const results = handlers.all ? handlers.all(sql, boundParams) : [];
          return {
            results: results as T[],
            success: true,
          };
        },
        async first<T = Record<string, unknown>>() {
          return (handlers.first ? handlers.first(sql, boundParams) : null) as T | null;
        },
        async run() {
          return { success: true };
        },
      };
      return stmt;
    },
  };
}

describe('Cloudflare D1 Portfolio & Assets Repository (TDD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_R2_PUBLIC_URL: 'https://assets.portfoliodanilo.com',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('maps D1 SQLite project rows, JSON columns, tags, and landing_page_slug accurately', async () => {
    const db = createMockD1({
      all(sql) {
        if (sql.includes('FROM portfolio_projects')) {
          return [
            {
              id: 'proj-1',
              slug: 'tcotton',
              client_slug: 'tcotton',
              title: 'TCotton — Identidade Visual',
              client_name: 'TCotton',
              brand_name: 'TCotton',
              year: 2024,
              project_type: 'Brand & Campaigns',
              short_label: 'Branding',
              description: 'Identidade completa',
              thumbnail_path:
                'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/tcotton/thumb.webp',
              hero_image_path: 'portfolio-media/tcotton/hero.webp',
              url_landscape: 'portfolio-media/tcotton/thumb.webp',
              url_square: 'portfolio-media/tcotton/thumb-sq.webp',
              gallery: JSON.stringify([{ path: 'portfolio-media/tcotton/g1.webp' }]),
              featured_on_home: 0,
              featured_on_portfolio: 1,
              featured_home_order: null,
              featured_portfolio_order: 15,
              home_featured: '{}',
              destination: JSON.stringify({
                type: 'internal_landing',
                landingSlug: 'tcotton',
              }),
              case_body: '## Case TCotton',
              is_published: 1,
              landing_page_id: 'lp-1',
              landing_page_slug: 'tcotton',
              created_at: '2026-11-10T00:00:00Z',
              updated_at: '2026-11-10T00:00:00Z',
            },
          ];
        }
        if (sql.includes('FROM portfolio_project_tags')) {
          return [
            {
              project_id: 'proj-1',
              id: 'tag-1',
              slug: 'branding',
              label: 'Branding',
              kind: 'category',
              description: null,
              sort_order: 1,
            },
          ];
        }
        return [];
      },
    });

    const projects = await listProjectsFromD1(db, {
      publishedOnly: true,
      featuredOnPortfolio: true,
    });

    expect(projects).toHaveLength(1);
    expect(projects[0].slug).toBe('tcotton');
    expect(projects[0].is_published).toBe(true);
    expect(projects[0].featured_on_home).toBe(false);
    expect(projects[0].featured_on_portfolio).toBe(true);
    expect(projects[0].landing_page_slug).toBe('tcotton');
    expect(projects[0].destination).toEqual({
      type: 'internal_landing',
      landingSlug: 'tcotton',
    });
    expect(projects[0].case_body).toBe('## Case TCotton');
    expect(projects[0].tags).toHaveLength(1);
    expect(projects[0].tags?.[0]?.tag.slug).toBe('branding');
    expect(projects[0].gallery).toEqual([
      { path: 'portfolio-media/tcotton/g1.webp' },
    ]);
  });

  it('paginates and filters D1 projects by category tag cleanly', async () => {
    const db = createMockD1({
      first(sql) {
        if (sql.includes('COUNT(DISTINCT p.id)')) {
          return { total: 6 };
        }
        return null;
      },
      all(sql) {
        if (sql.includes('FROM portfolio_projects')) {
          return [
            {
              id: 'proj-motion-1',
              slug: 'swift',
              title: 'Swift',
              project_type: 'Videos & Motions',
              featured_on_home: 1,
              featured_on_portfolio: 1,
              is_published: 1,
              gallery: '[]',
              home_featured: '{}',
            },
          ];
        }
        return [];
      },
    });

    const page = await listProjectsPagedFromD1(db, {
      page: 1,
      pageSize: 12,
      category: 'motion',
    });

    expect(page.total).toBe(6);
    expect(page.items).toHaveLength(1);
    expect(page.items[0].slug).toBe('swift');
  });

  it('returns null (never synthetic Ghost Era fallback) for unknown slugs in D1', async () => {
    const db = createMockD1({
      first: () => null,
    });

    const project = await getProjectBySlugFromD1(db, 'non-existent-slug-999');
    const landing = await getLandingPageBySlugFromD1(db, 'non-existent-slug-999');

    expect(project).toBeNull();
    expect(landing).toBeNull();
  });

  it('resolves landing_pages content JSON and resolves R2 asset URL without file_url column', async () => {
    const db = createMockD1({
      first(sql) {
        if (sql.includes('FROM landing_pages')) {
          return {
            id: 'lp-tcotton',
            slug: 'tcotton',
            title: 'TCotton — Identidade Visual',
            cover: 'portfolio-media/tcotton/tcotton/cover.webp',
            content: JSON.stringify({
              template: 'master-project-v3-alpa',
              project_title: 'TCotton',
              gallery_grid: [{ id: 'b1', type: 'image', content: { media: 'site-assets/landing-pages/tcotton/hero.webp' } }],
            }),
            created_at: '2026-11-10T00:00:00Z',
          };
        }
        return null;
      },
      all(sql) {
        if (sql.includes('FROM site_assets')) {
          return [
            {
              id: 'asset-1',
              key: 'about.origin.about.origin_image.1',
              bucket: 'site-assets',
              file_path: 'about/origin/origin2/cena-01.webp',
              asset_type: 'image',
              page: 'about',
              description: 'Origin 1',
              is_active: 1,
              sort_order: 1,
              metadata: '{"scene":1}',
              created_at: '2026-11-10T00:00:00Z',
              updated_at: '2026-11-10T00:00:00Z',
            },
          ];
        }
        return [];
      },
    });

    const lp = await getLandingPageBySlugFromD1(db, 'tcotton');
    expect(lp).not.toBeNull();
    expect(lp?.slug).toBe('tcotton');
    expect((lp?.content as Record<string, unknown>)?.project_title).toBe('TCotton');

    const assets = await listSiteAssetsFromD1(db, { page: 'about', activeOnly: true });
    expect(assets).toHaveLength(1);
    expect(assets[0].is_active).toBe(true);
    expect(assets[0].publicUrl).toBe(
      'https://assets.portfoliodanilo.com/site-assets/about/origin/origin2/cena-01.webp'
    );
  });
});
