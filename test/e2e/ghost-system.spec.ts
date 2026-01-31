import { expect, test } from '@playwright/test';

test.describe('Ghost System Verification', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('home page should render the ghost hero and navigation', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Check Hero title (visible one)
    await expect(
      page.locator('h1').filter({ visible: true }).first()
    ).toBeVisible();

    // Check navigation (wait longer for mount)
    const nav = page
      .getByRole('navigation', { name: /navegação principal/i })
      .filter({ visible: true });
    await expect(nav).toBeVisible({ timeout: 10000 });
    await expect(nav).toContainText(/sobre/i);
  });

  test('about page should render refactored Origin section', async ({
    page,
  }) => {
    await page.goto('/sobre', { waitUntil: 'networkidle' });

    // Check "ORIGEM" heading
    await expect(page.locator('h1', { hasText: /ORIGEM/i })).toBeVisible();

    // Check for content from Origin data
    await expect(
      page.locator('h2', { hasText: /O que permanece/i })
    ).toBeVisible();
    await expect(
      page.locator('p', { hasText: /Desde cedo, sempre prestei atenção/i })
    ).toBeVisible();

    // Sticky gallery should be present for desktop
    await expect(page.locator('.arch__right')).toBeVisible();
  });

  test('navigation should work from home to about', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Click on "Sobre" link in header
    const aboutLink = page
      .getByRole('button', { name: /sobre/i })
      .filter({ visible: true });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Wait for navigation to complete (Next.js client-side routing)
    await page.waitForURL(/\/sobre/, { timeout: 15000 });
    await expect(page.locator('h1', { hasText: /ORIGEM/i })).toBeVisible({
      timeout: 10000,
    });
  });
});
