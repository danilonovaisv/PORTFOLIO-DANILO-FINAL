import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/o-que-me-move', '/sobre'] as const;

const SECTION_COLORS = [
  'rgb(4, 0, 19)',
  'rgb(0, 72, 255)',
  'rgb(135, 5, 242)',
  'rgb(245, 1, 211)',
  'rgb(0, 72, 255)',
  'rgb(135, 5, 242)',
  'rgb(245, 1, 211)',
  'rgb(4, 0, 19)',
] as const;

const PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

const gotoRoute = async (page: Page, route: string) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-testid="beliefs-section"]')).toBeAttached();
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="beliefs-section"]')
      ?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(250);
};

const scrollToManifestoSection = async (page: Page, index: number) => {
  await page.evaluate((sectionIndex) => {
    document
      .querySelector(`[data-scroll-manifesto-section="${sectionIndex}"]`)
      ?.scrollIntoView({ behavior: 'instant', block: 'center' });
    window.dispatchEvent(new Event('scroll'));
  }, index);
  await page.waitForTimeout(250);
};

const backgroundColor = async (page: Page) =>
  page
    .locator('[data-testid="beliefs-background"]')
    .evaluate((el) => window.getComputedStyle(el).backgroundColor);

for (const route of ROUTES) {
  test.describe(`ScrollManifesto — ${route}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await gotoRoute(page, route);
    });

    test('renderiza 8 seções full-screen com frases oficiais', async ({
      page,
    }) => {
      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible();

      await expect
        .poll(async () =>
          section.evaluate((el) => el.scrollHeight / window.innerHeight)
        )
        .toBeGreaterThanOrEqual(7.8);

      await expect(page.locator('[data-scroll-manifesto-section]')).toHaveCount(
        8
      );

      for (const phrase of PHRASES) {
        await expect(page.getByRole('heading', { name: phrase })).toBeVisible();
      }
    });

    test('background começa e termina em Deep Void', async ({ page }) => {
      await scrollToManifestoSection(page, 0);
      await expect.poll(() => backgroundColor(page)).toBe(SECTION_COLORS[0]);

      await scrollToManifestoSection(page, 7);
      await expect.poll(() => backgroundColor(page)).toBe(SECTION_COLORS[7]);
    });

    test('background sincroniza com a seção ativa', async ({ page }) => {
      for (const [index, color] of SECTION_COLORS.entries()) {
        await scrollToManifestoSection(page, index);
        await expect.poll(() => backgroundColor(page)).toBe(color);
      }
    });

    test('frases respeitam o estado de motion ativo do browser', async ({
      page,
    }) => {
      const phrases = page.locator('[data-testid="belief-phrase"]');
      await expect(phrases).toHaveCount(PHRASES.length);

      for (let index = 0; index < PHRASES.length; index += 1) {
        await expect(phrases.nth(index)).toHaveAttribute(
          'data-animation-contract',
          'x-opacity'
        );
        await expect(phrases.nth(index)).toHaveClass(/will-change:transform/);
      }
    });

    test('reduced motion remove offset e mantém texto visível', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoRoute(page, route);
      await scrollToManifestoSection(page, 3);

      await expect
        .poll(async () => {
          const visibleStyles = await page
            .locator('[data-testid="belief-phrase"]')
            .evaluateAll((elements) =>
              elements
                .map((el) => {
                  const rect = el.getBoundingClientRect();
                  const computed = window.getComputedStyle(el);
                  return {
                    inViewport:
                      rect.top < window.innerHeight && rect.bottom > 0,
                    opacity: Number(computed.opacity),
                    transform: computed.transform,
                  };
                })
                .filter((style) => style.inViewport)
            );

          return visibleStyles.every(
            (style) =>
              style.opacity === 1 &&
              (style.transform === 'none' ||
                style.transform === 'matrix(1, 0, 0, 1, 0, 0)')
          );
        })
        .toBe(true);
    });
  });
}
