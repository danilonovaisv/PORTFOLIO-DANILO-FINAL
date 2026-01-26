import { expect, test } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/sobre');

    // Verify page content
    await expect(page.locator('main')).toBeVisible();
    
    // Look for keywords common in an about page
    await expect(page.locator('body')).toContainText(/Origem/i);

    await page.screenshot({ path: 'test-results/about-page.png' });
  });
});
