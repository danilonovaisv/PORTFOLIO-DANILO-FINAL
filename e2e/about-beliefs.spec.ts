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
  }, progress);

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
      const colorMid = await background.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      expect(colorStart).not.toBe(colorMid);
      expect(colorMid).not.toBe('rgb(4, 0, 19)');
    });

    test('frases entram com blur e deslocamento em motion normal', async ({
      page,
    }) => {
      await scrollToProgress(page, 0.28);

      await expect
        .poll(async () => {
          const styles = await page
            .locator('[data-testid="beliefs-scroll-text"] .belief-phrase span')
            .evaluateAll((elements) => {
              return elements.map((el) => {
                const computed = window.getComputedStyle(el);
                return {
                  opacity: Number(computed.opacity),
                  filter: computed.filter,
                };
              });
            });
          const visiblePhrase = styles.find((style) => style.opacity > 0.5);

          return visiblePhrase && !visiblePhrase.filter.includes('blur(6px)');
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
        const section = document.querySelector(
          '[data-testid="beliefs-section"]'
        );
        if (!section) return true;

        const elements = section.querySelectorAll(
          '[data-testid="beliefs-scroll-text"] .belief-phrase span'
        );

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

      const headerTop = await page
        .locator('[data-testid="beliefs-header"]')
        .evaluate((el) => window.getComputedStyle(el).top);
      const phraseTextAlign = await page
        .locator('[data-testid="beliefs-scroll-text"]')
        .evaluate((el) => window.getComputedStyle(el).textAlign);

      expect(Number.parseFloat(headerTop)).toBeGreaterThanOrEqual(160);
      expect(Number.parseFloat(headerTop)).toBeLessThanOrEqual(170);
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
  });
}
