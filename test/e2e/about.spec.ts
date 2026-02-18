import { expect, test } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/sobre');

    // Verify page content
    await expect(page.locator('main')).toBeVisible();

    // Look for current about-page copy
    await expect(page.locator('body')).toContainText(/Sou Danilo Novais/i);
    await expect(page.locator('body')).toContainText(/Do insight ao impacto/i);

    await page.screenshot({ path: 'test-results/about-page.png' });
  });
});
