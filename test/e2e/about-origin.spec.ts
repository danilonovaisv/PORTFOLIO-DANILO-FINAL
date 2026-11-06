import { expect, test } from '@playwright/test';

test.describe('About Origin Section', () => {
  test('should render editorial intro, 4 chapters, sticky media stage and bridge', async ({
    page,
  }) => {
    await page.goto('/sobre', { waitUntil: 'domcontentloaded' });

    // 1. Verificar introdução editorial da seção
    const originHeading = page.locator('#origin-heading');
    await expect(originHeading).toBeVisible();
    await expect(originHeading).toContainText(/Da intuição ao método/i);

    const originEyebrow = page.locator('#origin-eyebrow');
    await expect(originEyebrow).toContainText(/ORIGEM/i);

    // 2. Verificar os quatro capítulos e suas respectivas fases
    const expectedChapters = [
      { chapter: '01', phase: /SENSIBILIDADE/i, title: /O QUE\s*PERMANECE/i },
      { chapter: '02', phase: /CRIAÇÃO/i, title: /DO TRAÇO À\s*INTENÇÃO/i },
      {
        chapter: '03',
        phase: /DESIGN/i,
        title: /A DESCOBERTA\s*DO\s*INVISÍVEL/i,
      },
      { chapter: '04', phase: /EXPANSÃO/i, title: /EXPANSÃO COM\s*PROPÓSITO/i },
    ];

    for (const item of expectedChapters) {
      const block = page.locator(
        `[data-origin-block="${item.chapter.replace(/^0/, '')}"]`
      );
      await expect(block).toBeAttached();
      await expect(block).toContainText(item.phase);
      await expect(block).toContainText(item.title);
    }

    // Primeiro frame ativo deve estar visível
    const firstBlock = page.locator('[data-origin-block="1"]');
    await expect(firstBlock).toBeVisible();

    // 3. Verificar a ponte conceitual final
    await expect(page.locator('body')).toContainText(/Do método à realização/i);
    await expect(page.locator('body')).toContainText(
      /Explorar áreas de atuação/i
    );

    // 4. Verificar media stage (galeria do cinema reel com 4 frames)
    const stickyGallery = page.locator('[data-testid="origin-sticky-gallery"]');
    await expect(stickyGallery).toBeVisible();
    const frames = stickyGallery.locator('[data-origin-frame]');
    await expect(frames).toHaveCount(4);
  });

  test('should support prefers-reduced-motion correctly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/sobre', { waitUntil: 'domcontentloaded' });

    const originHeading = page.locator('#origin-heading');
    await expect(originHeading).toBeVisible();

    // All blocks must remain legible and attached
    const blocks = page.locator('[data-origin-block]');
    await expect(blocks).toHaveCount(4);
  });
});
