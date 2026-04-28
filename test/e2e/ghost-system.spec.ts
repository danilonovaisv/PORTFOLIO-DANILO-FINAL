import { expect, test } from '@playwright/test';

test.describe('Ghost System Verification', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('home page should render the ghost hero and navigation', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Wait for Ghost/3D/Hydration stability
    await page.waitForTimeout(1000);

    // Check Hero title (visible one)
    await expect(
      page.locator('h1').filter({ visible: true }).first()
    ).toBeVisible();

    // Check navigation (wait longer for mount)
    const nav = page.getByTestId('site-navigation').filter({ visible: true });
    await expect(nav).toBeVisible({ timeout: 10000 });
    await expect(nav).toContainText(/sobre/i);
  });

  test('about page should render refactored Origin section', async ({
    page,
  }) => {
    await page.goto('/sobre', { waitUntil: 'domcontentloaded' });

    // Check "ORIGEM" heading with explicit timeout
    await expect(page.locator('h2', { hasText: /ORIGEM/i })).toBeVisible({
      timeout: 15000,
    });

    // Check for content from Origin data
    await expect(
      page
        .locator('h2', { hasText: /O que permanece/i })
        .filter({ visible: true })
    ).toBeVisible();
    await expect(
      page
        .locator('p', { hasText: /Desde cedo, sempre prestei atenção/i })
        .filter({ visible: true })
    ).toBeVisible();

    // Sticky gallery should be present for desktop
    await expect(page.getByTestId('origin-sticky-gallery')).toBeVisible();
  });

  test('navigation should work from home to about', async ({ page }) => {
    // Retry logic for navigation to handle occasional dev server hiccups
    try {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    } catch (error) {
      console.warn('Retrying navigation to home due to error:', error);
      await page.waitForTimeout(2000);
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    // Check if we are on home before proceeding
    await expect(page.getByTestId('home-hero')).toBeVisible({ timeout: 10000 });

    // Wait for Ghost/3D/Hydration stability, similar to the test above
    await page.waitForTimeout(1000);

    // Verify and wait for navigation to be ready
    const nav = page.getByTestId('site-navigation').filter({ visible: true });
    await expect(nav).toBeVisible({ timeout: 10000 });

    // Click on "Sobre" link in header
    // Use a more targeted locator within the nav that already proved visible
    const aboutButton = nav.getByRole('button', { name: /sobre/i });
    await expect(aboutButton).toBeVisible();
    await aboutButton.click();

    // Assert the client-side route changed without depending on the full
    // load lifecycle, which can be delayed by dev-only image retries.
    await expect(page).toHaveURL(/\/sobre/, { timeout: 30000 });
    await expect(page.locator('h2', { hasText: /ORIGEM/i })).toBeVisible({
      timeout: 10000,
    });
  });
});
