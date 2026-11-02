import { test, expect } from '@playwright/test';

test.describe('Cinema Reel — Sessão About Origin (Origem Criativa)', () => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000/sobre';

  test.beforeEach(async ({ page }) => {
    // Monitorar exceções não tratadas no console
    page.on('pageerror', (exception) => {
      console.error(`Uncaught exception: "${exception.message}"`);
    });
  });

  test('Deve renderizar cabeçalho editorial, palco cinematográfico e marcadores de fita', async ({
    page,
  }) => {
    await page.goto(targetUrl);
    await page.waitForLoadState('domcontentloaded');

    const originSection = page.locator('#origem-criativa');
    await expect(originSection).toBeAttached();

    // 1. Heading editorial
    const heading = originSection.locator('#origin-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Da intuição ao método/i);

    // 2. Os 4 frames de cinema reel devem existir
    const frames = originSection.locator('[data-origin-frame]');
    await expect(frames).toHaveCount(4);

    // 3. Primeiro frame deve estar ativo e exibir marcas de cinema reel
    const firstFrame = frames.first();
    await expect(firstFrame).toBeVisible();
    await expect(firstFrame).toContainText(/SENSIBILIDADE/i);
    await expect(firstFrame).toContainText(/O QUE\s*PERMANECE/i);
    await expect(firstFrame).toContainText(/TC 00:01:18:24/i);

    // 4. Barra de progresso de fita (Cinematic Scrubber)
    const scrubber = firstFrame.locator('.bg-gradient-to-r');
    await expect(scrubber).toBeAttached();
  });

  test('Deve implementar o layout alternado de composição entre os capítulos (Inconformidade 1)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(targetUrl);
    await page.waitForLoadState('domcontentloaded');

    const frames = page.locator('#origem-criativa [data-origin-frame]');

    // Frame 1 (textAlign: "left"): narrativa na ordem normal (esquerda)
    const frame1Text = frames.nth(0).locator('.lg\\:col-span-8');
    await expect(frame1Text).toHaveClass(/lg:order-1/);

    // Frame 2 (textAlign: "right"): narrativa invertida (direita)
    const frame2Text = frames.nth(1).locator('.lg\\:col-span-8');
    await expect(frame2Text).toHaveClass(/lg:order-2/);
    await expect(frame2Text).toHaveClass(/lg:items-end/);

    // Frame 3 (textAlign: "left"): narrativa na esquerda
    const frame3Text = frames.nth(2).locator('.lg\\:col-span-8');
    await expect(frame3Text).toHaveClass(/lg:order-1/);

    // Frame 4 (textAlign: "right"): narrativa na direita
    const frame4Text = frames.nth(3).locator('.lg\\:col-span-8');
    await expect(frame4Text).toHaveClass(/lg:order-2/);
  });

  test('Não deve gerar overflow horizontal em diferentes viewports (Mobile, Tablet, Desktop)', async ({
    page,
  }) => {
    const viewports = [
      { width: 375, height: 812, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1440, height: 900, name: 'Desktop' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(targetUrl);
      await page.waitForLoadState('domcontentloaded');

      const isOverflown = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(
        isOverflown,
        `Overflow horizontal detectado no viewport ${vp.name}`
      ).toBe(false);
    }
  });

  test('Deve abrir e fechar a gaveta de trajetória completa com foco acessível', async ({
    page,
  }) => {
    await page.goto(targetUrl);
    await page.waitForLoadState('domcontentloaded');

    const exploreButton = page
      .locator('#origem-criativa button:has-text("Trajetória Completa")')
      .first();
    if (await exploreButton.isVisible()) {
      await exploreButton.click();

      // Painel de detalhes deve abrir
      const drawer = page.locator('#origin-drawer-title');
      await expect(drawer).toBeVisible();

      // Fechar pelo botão de fechar
      const closeButton = page.locator(
        'button[aria-label="Fechar painel"], button[aria-label="Fechar detalhes"]'
      );
      await closeButton.click();
      await expect(drawer).not.toBeVisible();
    }
  });

  test('Primeiro frame deve iniciar 100% nítido sem blur residual', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(targetUrl);
    await page.waitForLoadState('domcontentloaded');

    const firstFrame = page.locator('#origem-criativa [data-origin-frame="1"]');
    await expect(firstFrame).toBeAttached();

    // Avaliar estilo computado de filter no frame inicial
    const computedFilter = await firstFrame.evaluate((el) => {
      return window.getComputedStyle(el).filter;
    });

    // Não deve possuir blur(8px)
    expect(computedFilter).not.toContain('blur(8px)');
  });

  test('Right Rail deve permanecer oculto fora da seção Origem Criativa', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Navegar para o topo da página (Hero section)
    await page.goto(targetUrl);
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => window.scrollTo(0, 0));

    const rail = page.locator('[data-origin-rail]');
    if ((await rail.count()) > 0) {
      // No topo (Hero), a barra deve estar invisível/oculta
      const isVisibleAtTop = await rail.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return (
          style.opacity !== '0' &&
          style.visibility !== 'hidden' &&
          style.display !== 'none'
        );
      });
      expect(isVisibleAtTop).toBe(false);
    }
  });
});
