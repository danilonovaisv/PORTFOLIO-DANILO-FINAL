import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/sobre'] as const;
const PHRASE_COUNT = 6;

const legacySelectors = [
  '[data-testid="beliefs-ghost-scene"]',
  '[data-testid="beliefs-manifesto"]',
  '[data-testid="beliefs-fixed-header"]',
  '[data-testid="beliefs-background"]',
  '[data-belief-section]',
  '[data-belief-manifesto]',
] as const;

const gotoBeliefsSection = async (page: Page, route: string) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-testid="beliefs-section"]', {
    state: 'attached',
  });
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="beliefs-section"]')
      ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(300);
};

const scrollToProgress = async (page: Page, progress: number) => {
  await page.evaluate((p) => {
    const section = document.querySelector('[data-testid="beliefs-section"]');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const start = sectionTop;
    const end = sectionTop + rect.height - window.innerHeight;

    window.scrollTo({
      top: start + (end - start) * p,
      behavior: 'instant',
    });
    window.dispatchEvent(new Event('scroll'));
  }, progress);

  await page.waitForTimeout(350);
};

const prepareRoute = async (
  page: Page,
  route: string,
  viewport = { width: 1440, height: 900 },
  reducedMotion: 'reduce' | 'no-preference' = 'no-preference'
) => {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion });
  await gotoBeliefsSection(page, route);
};

const getVisiblePhraseRect = async (page: Page) =>
  page.locator('[data-testid="belief-phrase"]').evaluateAll((elements) => {
    const visible = elements.find(
      (el) => Number(window.getComputedStyle(el).opacity) > 0.2
    );
    if (!visible) return null;

    const rect = visible.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
  });

for (const route of ROUTES) {
  test.describe(`O Que Me Move final redesign — ${route}`, () => {
    test('monta arquitetura final sem camadas Ghost 3D/GSAP legadas', async ({
      page,
    }) => {
      await prepareRoute(page, route);

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible();
      await expect(
        page.locator('[data-testid="what-moves-me-background"]')
      ).toBeAttached();
      await expect(
        page.locator('[data-testid="beliefs-scroll-text"]')
      ).toBeAttached();
      await expect(page.locator('[data-testid="belief-phrase"]')).toHaveCount(
        PHRASE_COUNT
      );

      for (const selector of legacySelectors) {
        await expect(page.locator(selector)).toHaveCount(0);
      }

      await expect(section.locator('canvas')).toHaveCount(0);
    });

    test('mantém altura cinematográfica e frases centralizadas no desktop', async ({
      page,
    }) => {
      await prepareRoute(page, route);

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect
        .poll(async () =>
          section.evaluate((el) => el.scrollHeight / window.innerHeight)
        )
        .toBeGreaterThanOrEqual(5.8);

      await scrollToProgress(page, 0.35);
      await expect.poll(() => getVisiblePhraseRect(page)).not.toBeNull();

      const rect = await getVisiblePhraseRect(page);
      expect(rect).not.toBeNull();
      if (!rect) return;

      expect(rect.centerX).toBeGreaterThan(1440 * 0.35);
      expect(rect.centerX).toBeLessThan(1440 * 0.65);
      expect(rect.centerY).toBeGreaterThan(900 * 0.32);
      expect(rect.centerY).toBeLessThan(900 * 0.68);
    });

    test('mantém frases centralizadas no mobile', async ({ page }) => {
      await prepareRoute(
        page,
        route,
        { width: 390, height: 844 },
        'no-preference'
      );
      await scrollToProgress(page, 0.35);
      await expect.poll(() => getVisiblePhraseRect(page)).not.toBeNull();

      const rect = await getVisiblePhraseRect(page);
      expect(rect).not.toBeNull();
      if (!rect) return;

      expect(rect.centerX).toBeGreaterThan(390 * 0.2);
      expect(rect.centerX).toBeLessThan(390 * 0.8);
      expect(rect.centerY).toBeGreaterThan(844 * 0.25);
      expect(rect.centerY).toBeLessThan(844 * 0.75);
    });

    test('scroll forward e reverso mantém alguma frase visível', async ({
      page,
    }) => {
      await prepareRoute(page, route);

      for (const progress of [0.25, 0.42, 0.58, 0.75, 0.92, 0.42]) {
        await scrollToProgress(page, progress);
        await expect
          .poll(async () =>
            page.locator('[data-testid="belief-phrase"]').evaluateAll(
              (elements) =>
                elements.some(
                  (el) => Number(window.getComputedStyle(el).opacity) > 0.2
                )
            )
          )
          .toBe(true);
      }
    });

    test('frase final integra manifesto e destaca GHOST em Ghost Blue', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.99);

      const finalPhrase = page.locator('[data-testid="belief-phrase"]').last();
      await expect(finalPhrase).toHaveAttribute(
        'aria-label',
        'ISSO É GHOST DESIGN.'
      );

      const ghostWordColor = await finalPhrase
        .locator('span', { hasText: 'GHOST' })
        .evaluate((el) => window.getComputedStyle(el).color);

      expect(ghostWordColor).toBe('rgb(0, 72, 255)');
    });

    test('reduced motion remove translate e blur preservando fade', async ({
      page,
    }) => {
      await prepareRoute(page, route, { width: 1440, height: 900 }, 'reduce');
      await scrollToProgress(page, 0.35);

      const styles = await page
        .locator('[data-testid="belief-phrase"]')
        .evaluateAll((elements) =>
          elements.map((el) => {
            const computed = window.getComputedStyle(el);
            return {
              opacity: Number(computed.opacity),
              transform: computed.transform,
              filter: computed.filter,
            };
          })
        );
      const visibleStyles = styles.filter((style) => style.opacity > 0.2);

      expect(styles.length).toBe(PHRASE_COUNT);
      expect(visibleStyles.length).toBeGreaterThan(0);
      expect(
        visibleStyles.every(
          (style) =>
            style.transform === 'none' ||
            style.transform === 'matrix(1, 0, 0, 1, 0, 0)'
        )
      ).toBe(true);
      expect(
        visibleStyles.every(
          (style) => style.filter === 'none' || style.filter === 'blur(0px)'
        )
      ).toBe(true);
    });

    test('não tenta montar WebGL quando WebGL está indisponível', async ({
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

      await gotoBeliefsSection(page, route);

      await expect(
        page.locator('[data-testid="beliefs-section"] canvas')
      ).toHaveCount(0);
      expect(
        errors.filter((message) =>
          message.includes('Error creating WebGL context')
        )
      ).toHaveLength(0);
    });
  });
}
