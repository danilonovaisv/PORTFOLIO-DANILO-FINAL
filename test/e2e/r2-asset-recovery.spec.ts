import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/portfolio', '/sobre', '/portfolio/glad'];
const KNOWN_MISSING_R2_ASSETS = [
  'cartoon-network/packing/assets-do-projeto/cover-16x9/thumb-16-9.4e7b48e091c2bfec.webp',
  'cartoon-network/packing/assets-do-projeto/cover-1x1/thumb-1-1.3715a95d534711b4.webp',
  'bidaya/ai-case/assets-do-projeto/cover-16x9/thumb-16-9.cae9e3d095a461ad.webp',
  'bidaya/ai-case/assets-do-projeto/cover-1x1/thumb-1-1.f0b1ec55504e7f86.webp',
  'nestl/brand-campaigns/assets-do-projeto/cover-16x9/thumb-nestle-16-9.63a36567aa9ee520.webp',
  'nestl/brand-campaigns/assets-do-projeto/cover-1x1/thumb-nestle-1-1.0e1ef137fb2ceb32.webp',
];

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
      await expect(page.locator('main').first()).toBeVisible({
        timeout: 20000,
      });
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

  test('portfolio and /portfolio/glad load verified R2 assets including Glad without supabase.co', async ({
    page,
  }) => {
    await page.goto('/portfolio', { waitUntil: 'networkidle', timeout: 45000 });
    await expect(page.locator('#portfolio-hero-heading')).toBeVisible({
      timeout: 30000,
    });

    const cards = page.locator('button[data-size]');
    await expect(cards.first()).toBeVisible({ timeout: 30000 });

    const portfolioSummary = await page.evaluate((knownMissing) => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const srcs = imgs.map((img) => {
        const raw = img.currentSrc || img.getAttribute('src') || '';
        let decoded = raw;
        try {
          decoded = decodeURIComponent(raw);
        } catch {
          decoded = raw;
        }
        return {
          src: decoded,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
        };
      });
      const r2Images = srcs.filter((s) =>
        s.src.includes('assets.portfoliodanilo.com')
      );
      const loadedR2Images = r2Images.filter((s) => s.naturalWidth > 0);
      const unexpectedBrokenImgs = srcs
        .filter((s) => s.complete && s.naturalWidth === 0)
        .filter((s) => !knownMissing.some((gap) => s.src.includes(gap)))
        .map((s) => s.src);

      return {
        totalImgs: imgs.length,
        r2Count: r2Images.length,
        loadedR2Count: loadedR2Images.length,
        unexpectedBrokenImgs,
      };
    }, KNOWN_MISSING_R2_ASSETS);

    expect(portfolioSummary.totalImgs).toBeGreaterThan(0);
    expect(portfolioSummary.r2Count).toBeGreaterThan(0);
    expect(portfolioSummary.loadedR2Count).toBeGreaterThan(0);
    expect(portfolioSummary.unexpectedBrokenImgs).toEqual([]);

    await page.goto('/portfolio/glad', {
      waitUntil: 'networkidle',
      timeout: 45000,
    });
    const gladSummary = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .map((img) => {
          const raw = img.currentSrc || img.getAttribute('src') || '';
          let decoded = raw;
          try {
            decoded = decodeURIComponent(raw);
          } catch {
            decoded = raw;
          }
          return {
            src: decoded,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
          };
        })
        .filter((s) => s.src.includes('thumb-glad.ead956218f26b9c0.webp'));
    });

    expect(gladSummary.length).toBeGreaterThan(0);
    for (const img of gladSummary) {
      expect(img.src).toContain(
        'https://assets.portfoliodanilo.com/portfolio-media/'
      );
      expect(img.naturalWidth).toBeGreaterThan(0);
    }
  });
});
