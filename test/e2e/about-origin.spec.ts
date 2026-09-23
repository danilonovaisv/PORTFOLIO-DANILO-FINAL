import { expect, test } from '@playwright/test';

test.describe('About Origin Section', () => {
  test('should render editorial intro, 4 chapters, sticky media stage and bridge', async ({
    page,
  }) => {
    await page.goto('/sobre');

    // 1. Verificar introdução editorial da seção
    const originHeading = page.locator('#origin-heading');
    await expect(originHeading).toBeVisible();
    await expect(originHeading).toContainText(/Da intuição ao método/i);

    const originEyebrow = page.locator('#origin-eyebrow');
    await expect(originEyebrow).toContainText(/ORIGEM/i);

    // 2. Verificar os quatro capítulos e suas respectivas fases
    const expectedChapters = [
      { chapter: '01', phase: /SENSIBILIDADE/i, title: /O QUE PERMANECE/i },
      { chapter: '02', phase: /CRIAÇÃO/i, title: /DO TRAÇO À INTENÇÃO/i },
      { chapter: '03', phase: /DESIGN/i, title: /A DESCOBERTA DO INVISÍVEL/i },
      { chapter: '04', phase: /EXPANSÃO/i, title: /EXPANSÃO COM PROPÓSITO/i },
    ];

    for (const item of expectedChapters) {
      const block = page.locator(
        `[data-origin-block="${item.chapter.replace(/^0/, '')}"]`
      );
      await expect(block).toBeVisible();
      await expect(block).toContainText(item.phase);
      await expect(block).toContainText(item.title);
    }

    // 3. Verificar a ponte conceitual final
    await expect(page.locator('body')).toContainText(
      /O que começou como olhar virou método/i
    );
    await expect(page.locator('body')).toContainText(
      /Conheça as áreas de atuação/i
    );

    // 4. Verificar media stage desktop
    const stickyGallery = page.locator('[data-testid="origin-sticky-gallery"]');
    await expect(stickyGallery).toBeAttached();

    // 5. Verificar presença das 4 composições com acessibilidade correta (role="img")
    const scenes = stickyGallery.locator('[role="img"]');
    await expect(scenes).toHaveCount(4);
  });

  test('should support prefers-reduced-motion correctly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/sobre');

    const originHeading = page.locator('#origin-heading');
    await expect(originHeading).toBeVisible();

    // All blocks must remain legible and visible
    const blocks = page.locator('[data-origin-block]');
    await expect(blocks).toHaveCount(4);
  });
});
