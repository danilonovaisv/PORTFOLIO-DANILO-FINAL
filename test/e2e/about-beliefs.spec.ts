import { test, expect } from '@playwright/test';

test('O-QUE-ME-MOVE anima frases em sequência no scroll', async ({ page }) => {
  await page.goto('/sobre');

  const scrollToElementTop = async (selector: string) => {
    const top = await page
      .locator(selector)
      .evaluate((el) => window.scrollY + el.getBoundingClientRect().top);
    await page.evaluate((y) => {
      window.scrollTo(0, Math.max(0, y + 2));
    }, top);
    await page.waitForTimeout(250);
  };

  await scrollToElementTop('[data-testid="about-beliefs-section"]');

  const line0 = page.locator('[data-testid="belief-line-0"]');
  await expect
    .poll(async () => {
      const opacity = await line0.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.2);

  await scrollToElementTop('[data-testid="belief-sentinel-1"]');

  const line1 = page.locator('[data-testid="belief-line-1"]');
  await expect
    .poll(async () => {
      const opacity = await line1.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeGreaterThan(0.2);

  await expect
    .poll(async () => {
      const opacity = await line0.evaluate((el) =>
        parseFloat(getComputedStyle(el).opacity)
      );
      return opacity;
    })
    .toBeLessThan(0.2);

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
