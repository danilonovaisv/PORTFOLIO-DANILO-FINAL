import { expect, test } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('should load the portfolio page and display projects', async ({
    page,
  }) => {
    await page.goto('/portfolio', { waitUntil: 'networkidle' });

    // Check for a common element in portfolio
    await expect(page.locator('h1')).toBeVisible();

    // Verify that at least one project is rendered
    // The gallery component renders project cards with 'group relative overflow-hidden'
    const projects = page.locator('.gallery .group').first();
    await expect(projects).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'test-results/portfolio-page.png' });
  });
});
