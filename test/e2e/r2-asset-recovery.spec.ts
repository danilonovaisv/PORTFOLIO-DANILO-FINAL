import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/portfolio', '/sobre', '/portfolio/glad', '/projects/glad'];

test.describe('Cloudflare R2 Asset Recovery E2E', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const route of ROUTES) {
    test(`should render ${route} with zero legacy supabase.co URLs and healthy DOM media`, async ({
      page,
    }) => {
      const legacyRequests: string[] = [];
      const pageErrors: string[] = [];

      page.on('request', (req) => {
        const url = req.url();
        if (url.includes('supabase.co/storage/v1/')) {
          legacyRequests.push(url);
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await expect(page.locator('main')).toBeVisible({ timeout: 20000 });
      await page.waitForTimeout(1500);

      // Assert zero network requests to legacy Supabase Storage
      expect(legacyRequests).toEqual([]);

      // Assert zero rendered DOM media attributes pointing to legacy Supabase Storage
      const domLegacyUrls = await page.evaluate(() => {
        const hits: string[] = [];
        const elements = document.querySelectorAll('img, video, source');
        for (const el of elements) {
          const attrs = ['src', 'srcset', 'poster'];
          for (const attr of attrs) {
            const val = el.getAttribute(attr);
            if (val && val.includes('supabase.co/storage/v1/')) {
              hits.push(`${el.tagName.toLowerCase()}[${attr}]=${val}`);
            }
          }
        }
        return hits;
      });
      expect(domLegacyUrls).toEqual([]);
      expect(pageErrors).toEqual([]);
    });
  }

  test('portfolio page renders cards and routes Glad cover/media through R2 CDN without supabase.co', async ({
    page,
  }) => {
    await page.goto('/portfolio', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await expect(page.locator('#portfolio-hero-heading')).toBeVisible({
      timeout: 30000,
    });

    const cards = page.locator('button[data-size]');
    await expect(cards.first()).toBeVisible({ timeout: 30000 });

    const mediaSummary = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const r2Images = imgs
        .map((img) => img.currentSrc || img.getAttribute('src') || '')
        .filter((src) => src.includes('assets.portfoliodanilo.com'));
      const brokenImgs = imgs
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.getAttribute('src') || '');
      return { totalImgs: imgs.length, r2Count: r2Images.length, brokenImgs };
    });

    expect(mediaSummary.totalImgs).toBeGreaterThan(0);
    expect(mediaSummary.brokenImgs).toEqual([]);
  });
});

