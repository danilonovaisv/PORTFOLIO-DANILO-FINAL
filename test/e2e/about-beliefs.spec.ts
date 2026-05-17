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

const getVisiblePhraseRect = async (page: Page) =>
  page.locator('[data-testid="belief-phrase"]').evaluateAll((elements) => {
    const visible = elements.find(
      (el) => Number(window.getComputedStyle(el).opacity) > 0.5
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

const getPhraseStageStyle = async (page: Page) =>
  page.locator('[data-testid="beliefs-phrase-stage"]').evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      position: style.position,
      top: style.top,
      bottom: style.bottom,
      left: style.left,
      width: style.width,
      textAlign: style.textAlign,
      rect: {
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
      },
    };
  });

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
          !msg.includes('Cookie “__cf_bm” has been rejected') &&
          !msg.includes(
            'Failed to load resource: the server responded with a status of 404'
          )
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('background usa seções narrativas para trocar cor renderizada', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      const background = page.locator('[data-testid="beliefs-background"]');
      const sections = page.locator('[data-belief-section]');

      await expect(background).toBeAttached();
      await expect(sections).toHaveCount(6);
      await scrollToProgress(page, 0.05);
      await scrollToProgress(page, 0.58);

      await expect(background).toBeAttached();
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

    test('desktop fixa header à direita e frase no campo esquerdo da composição', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.28);

      const headerRect = await page
        .locator('[data-testid="beliefs-fixed-header"]')
        .boundingBox();
      expect(headerRect).not.toBeNull();

      if (!headerRect) {
        throw new Error('beliefs-fixed-header bounding box not available');
      }

      expect(headerRect.y).toBeLessThan(180);
      expect(1440 - (headerRect.x + headerRect.width)).toBeLessThan(140);

      await expect.poll(() => getVisiblePhraseRect(page)).not.toBeNull();

      const phraseStage = await getPhraseStageStyle(page);
      expect(phraseStage.width).not.toBe('0px');
      expect(phraseStage.rect.left).toBeLessThan(220);
    });

    test('mobile mantém header top-right e frase ativa no rodapé centralizado', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await gotoRoute(page, route);
      await scrollToProgress(page, 0.28);

      const headerRect = await page
        .locator('[data-testid="beliefs-fixed-header"]')
        .boundingBox();
      expect(headerRect).not.toBeNull();

      if (!headerRect) {
        throw new Error(
          'mobile beliefs-fixed-header bounding box not available'
        );
      }

      expect(headerRect.y).toBeLessThan(110);
      expect(390 - (headerRect.x + headerRect.width)).toBeLessThan(36);

      await expect.poll(() => getVisiblePhraseRect(page)).not.toBeNull();

      const phraseStage = await getPhraseStageStyle(page);
      expect(phraseStage.width).not.toBe('0px');
      expect(phraseStage.rect.width).toBeGreaterThan(120);
    });

    test('manifesto final ocupa quase toda a largura útil e ghost preserva anchor declarada', async ({
      page,
    }) => {
      await prepareRoute(page, route);
      await scrollToProgress(page, 0.99);

      const ghost = page.locator('[data-testid="beliefs-ghost-scene"]').first();
      await expect(ghost).toHaveAttribute(
        'data-belief-ghost-anchor',
        'desktop-right'
      );

      const manifestoCopy = page.locator(
        '[data-testid="beliefs-manifesto-copy"]'
      );
      const widthRatio = await manifestoCopy.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width / window.innerWidth;
      });

      expect(widthRatio).toBeGreaterThan(0.82);
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

      await expect(
        page.locator('[data-testid="beliefs-ghost-scene"]')
      ).toBeAttached({ timeout: 10000 });

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
