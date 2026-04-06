import { test, expect } from '@playwright/test';

test('O-QUE-ME-MOVE anima frases em sequência no scroll', async ({ page }) => {
  await page.goto('/sobre');

  const scrollToElementTop = async (selector: string, delta = 0) => {
    const top = await page
      .locator(selector)
      .evaluate((el) => window.scrollY + el.getBoundingClientRect().top);
    await page.evaluate(
      ({ y, delta }) => {
        window.scrollTo(0, Math.max(0, y + delta));
      },
      { y: top, delta }
    );
    await page.waitForTimeout(600);
  };

  await scrollToElementTop('[data-testid="about-beliefs-section"]');

  await expect(
    page.locator('[data-testid="belief-text-layer-desktop"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-testid="belief-text-layer-mobile"]')
  ).toHaveCount(0);

  const introHeader = page.locator('header.sticky h2');
  await expect
    .poll(async () => {
      const opacity = await introHeader.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.9);

  await expect(page.locator('[data-testid="belief-line-0"]')).toHaveCount(0);

  const ghostFigure = page.locator('[data-testid="ghost-figure"]');
  await expect(ghostFigure).toBeVisible();
  await expect
    .poll(async () => {
      const box = await ghostFigure.boundingBox();
      return box?.width ?? 0;
    })
    .toBeGreaterThan(200);

  await scrollToElementTop('[data-testid="about-beliefs-section"]', 800);

  const line0 = page.locator('[data-testid="belief-line-0"]');
  await expect
    .poll(async () => {
      const opacity = await line0.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.9);

  await expect(line0).toContainText('Um');
  await expect(page.locator('[data-testid="belief-line-1"]')).toHaveCount(0);

  await scrollToElementTop('[data-testid="about-beliefs-section"]', 1600);

  const line1 = page.locator('[data-testid="belief-line-1"]');
  await expect
    .poll(async () => {
      const opacity = await line1.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.9);

  await expect(line1).toContainText('marca');
  await expect(page.locator('[data-testid="belief-line-0"]')).toHaveCount(0);
});
