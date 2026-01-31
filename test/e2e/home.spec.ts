import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page and show core sections', async ({ page }) => {
    // Increase timeout for navigation and wait for domcontentloaded
    await page.goto('/', { timeout: 30000, waitUntil: 'domcontentloaded' });

    // Wait for main element to ensure basic structure is present
    await page.locator('main').waitFor({ state: 'visible', timeout: 15000 });

    // Check if the page title is correct with extended timeout to allow for metadata injection
    await expect(page).toHaveTitle(/Danilo Novais | Creative Developer/, {
      timeout: 10000,
    });

    // Verify HomeHero is visible
    await expect(page.locator('main')).toBeVisible();

    // Verify Featured Projects section
    // I'll look for text that typically appears in this section
    // Verify Featured Projects section or Portfolio Showcase
    // Check for "portfólio showcase" heading which is prominent
    await expect(
      page.locator('h2', { hasText: /portfólio/i }).first()
    ).toBeVisible();

    // Take a screenshot for verification
    await page.screenshot({ path: 'test-results/home-page.png' });
  });
});
