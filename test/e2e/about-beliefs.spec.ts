import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/sobre'] as const;

const gotoRoute = async (page: Page, route: string) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-testid="beliefs-section"]')).toBeAttached();
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="beliefs-section"]')
      ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
};

const scrollToProgress = async (page: Page, progress: number) => {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.evaluate((p) => {
      const section = document.querySelector('[data-testid="beliefs-section"]');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const start = sectionTop - window.innerHeight;
      const end = sectionTop + rect.height - window.innerHeight;

      window.scrollTo({
        top: start + (end - start) * p,
        behavior: 'instant',
      });
      window.dispatchEvent(new Event('scroll'));
    }, progress);

    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(500);
};

const prepareRoute = async (
  page: Page,
  route: string,
  reducedMotion: 'reduce' | 'no-preference' = 'no-preference'
) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion });
  await gotoRoute(page, route);
};

for (const route of ROUTES) {
  test.describe(`O Que Me Move Motion Update — ${route}`, () => {
    test('reativa BeliefsSection original com altura cinematográfica', async ({
      page,
    }) => {
      await prepareRoute(page, route);

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible();
      await expect(
        page.locator('[data-testid="beliefs-scroll-text"]')
      ).toBeAttached();
      await expect(
        page.locator('[data-testid="beliefs-ghost-scene"]')
      ).toBeAttached();
      await expect(
        page.locator('[data-testid="beliefs-manifesto"]')
      ).toBeAttached();

      await expect
        .poll(async () =>
          section.evaluate((el) => el.scrollHeight / window.innerHeight)
        )
        .toBeGreaterThanOrEqual(5.8);
    });

    test('preserva hierarquia de camadas entre Ghost e manifesto', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.9);

      const ghost = page.locator('[data-testid="beliefs-ghost-scene"]').first();
      const manifesto = page.locator('[data-testid="beliefs-manifesto"]');

      const ghostZ = await ghost.evaluate((el) =>
        Number(window.getComputedStyle(el).zIndex)
      );
      const manifestoZ = await manifesto.evaluate((el) =>
        Number(window.getComputedStyle(el).zIndex)
      );

      expect(ghostZ).toBe(70);
      expect(manifestoZ).toBe(50);
      expect(ghostZ).toBeGreaterThan(manifestoZ);
    });

    test('clímax final fecha em deep void com manifesto branco', async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await prepareRoute(page, route);
      await scrollToProgress(page, 0.99);

      const background = page.locator('[data-belief-background]');
      await expect
        .poll(async () =>
          background.evaluate(
            (el) => window.getComputedStyle(el).backgroundColor
          )
        )
        .toBe('rgb(4, 0, 19)');

      const manifestoText = page
        .locator('[data-belief-manifesto] span')
        .first();
      const color = await manifestoText.evaluate(
        (el) => window.getComputedStyle(el).color
      );
      expect(color).toBe('rgb(255, 255, 255)');

      const ghost = page.locator('[data-ghost-scene]').first();
      const manifesto = page.locator('[data-belief-manifesto]');

      const ghostZ = await ghost.evaluate((el) =>
        Number(window.getComputedStyle(el).zIndex)
      );
      const manifestoZ = await manifesto.evaluate((el) =>
        Number(window.getComputedStyle(el).zIndex)
      );
      expect(ghostZ).toBeGreaterThan(manifestoZ);

      const criticalErrors = errors.filter(
        (msg) =>
          !msg.includes('Warning:') &&
          !msg.includes('[React]') &&
          !msg.includes('Cookie “__cf_bm” has been rejected')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('background usa seções narrativas para trocar cor renderizada', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      const background = page.locator('[data-testid="beliefs-background"]');

      await scrollToProgress(page, 0.05);
      const colorStart = await background.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      await scrollToProgress(page, 0.58);

      await expect
        .poll(async () => {
          const colorMid = await background.evaluate(
            (el) => window.getComputedStyle(el).backgroundColor
          );

          return colorMid !== colorStart && colorMid !== 'rgb(4, 0, 19)';
        })
        .toBe(true);
    });

    test('frases usam contrato viewport sem scrub contínuo', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.28);

      const phrases = page.locator('[data-testid="belief-phrase"]');
      await expect(phrases).toHaveCount(6);

      for (let index = 0; index < 6; index += 1) {
        await expect(phrases.nth(index)).toHaveAttribute(
          'data-animation-contract',
          'viewport-x-opacity'
        );
      }

      await expect
        .poll(async () =>
          phrases.evaluateAll((elements) =>
            elements.some(
              (el) => Number(window.getComputedStyle(el).opacity) > 0.5
            )
          )
        )
        .toBe(true);
    });

    test('reduced motion remove offsets e preserva fade simples', async ({
      page,
    }) => {
      await prepareRoute(page, route, 'reduce');
      await scrollToProgress(page, 0.35);

      await expect
        .poll(async () => {
          const styles = await page
            .locator('[data-testid="belief-phrase"]')
            .evaluateAll((elements) =>
              elements.map((el) => {
                const computed = window.getComputedStyle(el);
                return {
                  opacity: Number(computed.opacity),
                  transform: computed.transform,
                };
              })
            );

          return styles.every(
            (style) =>
              style.opacity >= 0 &&
              (style.transform === 'none' ||
                style.transform === 'matrix(1, 0, 0, 1, 0, 0)')
          );
        })
        .toBe(true);
    });

    test('WebGL indisponível cai em fallback sem unhandled rejection', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.addInitScript(() => {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;

        HTMLCanvasElement.prototype.getContext = function getContext(
          this: HTMLCanvasElement,
          type,
          ...args
        ) {
          if (
            type === 'webgl' ||
            type === 'webgl2' ||
            type === 'experimental-webgl' ||
            type === 'webgl2-compute'
          ) {
            return null;
          }

          return originalGetContext.call(this, type, ...args) as ReturnType<
            typeof originalGetContext
          >;
        } as typeof HTMLCanvasElement.prototype.getContext;
      });

      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await gotoRoute(page, route);

      await expect(page.locator('[data-testid="ghost-fallback"]')).toBeAttached(
        { timeout: 10000 }
      );

      expect(
        errors.filter((message) =>
          message.includes('Error creating WebGL context')
        )
      ).toHaveLength(0);
    });

    test('captura desktop no final deep void', async ({ page }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.99);
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `test/screenshots/beliefs-climax-desktop-${route.replace('/', '')}.png`,
        fullPage: false,
      });
    });

    test('captura mobile no final deep void', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await gotoRoute(page, route);
      await scrollToProgress(page, 0.99);
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `test/screenshots/beliefs-climax-mobile-${route.replace('/', '')}.png`,
        fullPage: false,
      });
    });
  });
}
