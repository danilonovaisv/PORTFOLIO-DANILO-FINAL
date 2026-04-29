import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/o-que-me-move', '/sobre'] as const;

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

for (const route of ROUTES) {
  test.describe(`O Que Me Move v3 — ${route}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await gotoRoute(page, route);
    });

    test('seção existe com altura cinematográfica de 600vh', async ({
      page,
    }) => {
      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible();

      await expect
        .poll(async () =>
          section.evaluate((el) => el.scrollHeight / window.innerHeight)
        )
        .toBeGreaterThanOrEqual(5.8);
    });

    test('z-index mantém Ghost acima do manifesto no clímax', async ({
      page,
    }) => {
      await scrollToProgress(page, 0.9);

      const ghost = page.locator('[data-testid="beliefs-ghost-scene"]').first();
      const manifesto = page.locator('[data-testid="beliefs-manifesto"]');

      await expect(ghost).toBeAttached();
      await expect(manifesto).toBeAttached();

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

    test('background troca de cor quando as scroll-sections entram', async ({
      page,
    }) => {
      const background = page.locator('[data-testid="beliefs-background"]');

      await scrollToProgress(page, 0.02);
      const colorStart = await background.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      await scrollToProgress(page, 0.34);

      await expect
        .poll(async () => {
          const colorMid = await background.evaluate(
            (el) => window.getComputedStyle(el).backgroundColor
          );

          return colorMid !== colorStart && colorMid !== 'rgb(4, 0, 19)';
        })
        .toBeTruthy();
    });

    test('frases entram com blur e deslocamento em motion normal', async ({
      page,
    }) => {
      await scrollToProgress(page, 0.28);

      await expect
        .poll(async () => {
          const styles = await page
            .locator('[data-testid="belief-phrase"]')
            .evaluateAll((elements) => {
              return elements.map((el) => {
                const computed = window.getComputedStyle(el);
                return {
                  opacity: Number(computed.opacity),
                  filter: computed.filter,
                  transform: computed.transform,
                };
              });
            });

          return styles.some(
            (style) =>
              style.opacity > 0.5 &&
              style.filter !== 'none' &&
              style.transform !== 'none'
          );
        })
        .toBeTruthy();
    });

    test('reduced motion preserva cor/opacidade e remove blur/offset', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoRoute(page, route);
      await scrollToProgress(page, 0.35);

      const hasReducedMotionViolation = await page.evaluate(() => {
        const elements = document.querySelectorAll(
          '[data-testid="belief-phrase"]'
        );

        if (elements.length === 0) return true;

        for (const el of elements) {
          const style = window.getComputedStyle(el);
          if (style.filter !== 'none' && style.filter !== 'blur(0px)') {
            return true;
          }
          if (
            style.transform &&
            style.transform !== 'none' &&
            style.transform !== 'matrix(1, 0, 0, 1, 0, 0)'
          ) {
            return true;
          }
        }

        return false;
      });

      expect(hasReducedMotionViolation).toBe(false);
    });

    test('mobile posiciona header e texto conforme contrato', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await gotoRoute(page, route);
      await scrollToProgress(page, 0.2);

      const headerContentTop = await page
        .locator('[data-testid="beliefs-header-content"]')
        .evaluate((el) => el.getBoundingClientRect().top);
      const phraseTextAlign = await page
        .locator('[data-testid="beliefs-scroll-text"]')
        .evaluate((el) => window.getComputedStyle(el).textAlign);

      expect(headerContentTop).toBeGreaterThanOrEqual(100);
      expect(headerContentTop).toBeLessThanOrEqual(160);
      expect(phraseTextAlign).toBe('center');
    });

    test('Canvas R3F existe sem hydration error no console', async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await gotoRoute(page, route);

      await expect(page.locator('canvas').first()).toBeAttached({
        timeout: 10000,
      });

      const hydrationErrors = consoleErrors.filter((error) =>
        error.toLowerCase().includes('hydrat')
      );

      expect(hydrationErrors).toHaveLength(0);
    });

    test('WebGL indisponível cai em fallback sem unhandled rejection', async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.addInitScript(() => {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;

        HTMLCanvasElement.prototype.getContext = function getContext(
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

          return originalGetContext.call(this, type, ...args);
        } as typeof HTMLCanvasElement.prototype.getContext;
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
  });
}
