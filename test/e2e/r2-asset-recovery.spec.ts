import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type RecoveredEntry = {
  slug: string;
  landing_page_slug?: string | null;
};

const recoveredPortfolio = JSON.parse(
  readFileSync(
    join(process.cwd(), 'src/config/recovered-portfolio.json'),
    'utf8'
  )
) as RecoveredEntry[];

test.describe('R2 & D1 Portfolio Routing Recovery', () => {
  test('home displays featured R2 projects without calling dead supabase.co', async ({
    page,
  }) => {
    const supabaseRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('supabase.co')) {
        supabaseRequests.push(req.url());
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    const preconnectHref = await page
      .locator('head link[rel="preconnect"]')
      .first()
      .getAttribute('href');
    expect(preconnectHref).toContain('assets.portfoliodanilo.com');

    await expect(page.locator('body')).not.toContainText(
      'Projeto do Portfólio Ghost Era'
    );
    expect(supabaseRequests).toEqual([]);
  });

  test('about origins (/sobre) serves cena-01..04 from R2 without supabase.co traffic', async ({
    page,
  }) => {
    const supabaseRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('supabase.co')) {
        supabaseRequests.push(req.url());
      }
    });

    await page.goto('/sobre', { waitUntil: 'domcontentloaded' });
    const stickyGallery = page
      .locator('[data-testid="origin-sticky-gallery"]')
      .first();
    await expect(stickyGallery).toBeAttached();

    const frames = stickyGallery.locator('[data-origin-frame]');
    await expect(frames).toHaveCount(4);

    const imgs = stickyGallery.locator('img');
    const imgCount = await imgs.count();
    expect(imgCount).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < imgCount; i++) {
      const src = await imgs.nth(i).getAttribute('src');
      expect(src ?? '').not.toContain('supabase.co');
    }

    expect(supabaseRequests).toEqual([]);
  });

  test('unknown project and portfolio slugs return HTTP 404', async ({
    request,
  }) => {
    const project404 = await request.get('/projects/slug-inexistente-ghost-404');
    expect(project404.status()).toBe(404);

    const portfolio404 = await request.get(
      '/portfolio/slug-inexistente-ghost-404'
    );
    expect(portfolio404.status()).toBe(404);
  });

  test('all 19 recovered case studies render real metadata and R2 media on /projects/[slug]', async ({
    page,
  }) => {
    const supabaseRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('supabase.co')) {
        supabaseRequests.push(req.url());
      }
    });

    for (const entry of recoveredPortfolio) {
      const slug = entry.landing_page_slug || entry.slug;
      const response = await page.goto(`/projects/${slug}`, {
        waitUntil: 'domcontentloaded',
      });
      expect(response?.status(), `Route /projects/${slug}`).toBe(200);
      await expect(page.locator('main#main-content')).toBeVisible();

      const bodyText = await page.locator('main#main-content').innerText();
      expect(bodyText).not.toContain('Projeto do Portfólio Ghost Era');
      expect(bodyText).not.toContain('Cliente Confidencial');

      const mediaLocator = page.locator(
        'main#main-content img[src], main#main-content video[src], main#main-content video source[src], main#main-content iframe[src]'
      );
      await expect(
        mediaLocator.first(),
        `/projects/${slug} must render R2 media elements`
      ).toBeAttached({ timeout: 15_000 });

      let mediaSources: string[] = [];
      await expect
        .poll(
          async () => {
            mediaSources = await mediaLocator.evaluateAll((els) =>
              els
                .map(
                  (el) =>
                    el.getAttribute('src') || el.getAttribute('data-src') || ''
                )
                .filter(Boolean)
            );
            return mediaSources.length;
          },
          {
            message: `/projects/${slug} should expose at least 1 media src`,
            timeout: 10_000,
          }
        )
        .toBeGreaterThan(0);
      for (const src of mediaSources) {
        expect(src).not.toContain('supabase.co');
        expect(src).not.toContain('Branding-Project.webp');
      }
    }

    expect(supabaseRequests).toEqual([]);
  });
});

