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

    test('seção existe com altura cinematográfica (≥400vh)', async ({
      page,
    }) => {
      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible();

      await expect
        .poll(async () =>
          section.evaluate((el) => el.scrollHeight / window.innerHeight)
        )
        .toBeGreaterThanOrEqual(3.8);
    });

    test('frases entram com blur e deslocamento em motion normal', async ({
      page,
    }) => {
      await scrollToProgress(page, 0.28);

      await expect
        .poll(async () => {
          const styles = await page
            .locator('[data-testid="beliefs-scroll-text"] .belief-phrase')
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

          return visiblePhrase && !visiblePhrase.filter.includes('blur(8px)');
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
          '[data-testid="beliefs-scroll-text"] .belief-phrase'
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

    test('canvas WebGL existe sem hydration error no console', async ({
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

    test('shader canvas existe no documento com position fixed e -z-50', async ({
      page,
    }) => {
      // ShaderAnimation is fixed inset-0 -z-50 — lives outside the section flow
      const shaderWrapper = page.locator('[data-testid="shader-lines-canvas"]');
      await expect(shaderWrapper).toBeAttached({ timeout: 10000 });

      const styles = await shaderWrapper.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          position: computed.position,
          zIndex:   computed.zIndex,
        };
      });

      expect(styles.position).toBe('fixed');
      expect(Number(styles.zIndex)).toBeLessThan(0);

      // Canvas itself must be present inside the wrapper
      await expect(
        page.locator('[data-testid="shader-lines-canvas"] canvas')
      ).toBeAttached({ timeout: 5000 });
    });

    test('background usa position:absolute (não fixed) — guard de regressão', async ({
      page,
    }) => {
      const position = await page
        .locator('[data-testid="what-moves-me-background"]')
        .evaluate((el) => window.getComputedStyle(el).position);

      expect(position).toBe('absolute');
    });
  });
}
