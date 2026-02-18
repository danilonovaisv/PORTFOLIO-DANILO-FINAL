import { test, expect } from '@playwright/test';

test('O-QUE-ME-MOVE anima frases em sequência no scroll', async ({ page }) => {
  await page.goto('/sobre');

  const section = page.locator('[data-testid="about-beliefs-section"]');
  await section.scrollIntoViewIfNeeded();

  const line0 = page.locator('[data-testid="belief-line-0"]');
  await expect
    .poll(async () => {
      const opacity = await line0.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.2);

  const sentinel1 = page.locator('[data-testid="belief-sentinel-1"]');
  await sentinel1.scrollIntoViewIfNeeded();

  const line1 = page.locator('[data-testid="belief-line-1"]');
  await expect
    .poll(async () => {
      const opacity = await line1.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.2);

  const line5 = page.locator('[data-testid="belief-line-5"]');
  await expect
    .poll(async () => {
      const opacity = await line5.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeLessThan(0.2);
});
