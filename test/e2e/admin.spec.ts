import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({
    page,
  }) => {
    // 1. Enable Playwright mock mode so Supabase and captcha use mocks.
    await page.addInitScript(() => {
      (window as any).__IS_PLAYWRIGHT_MOCK__ = true;
    });

    // Unified route handler: router.push() uses Next.js fetch-based navigation
    // which is interceptable by page.route() in all browsers (Chromium, Firefox, WebKit).
    // Unlike window.location.assign(), it does NOT trigger a full document request
    // that bypasses Playwright's interception in WebKit.
    let mockLoginDone = false;
    await page.route(/\/admin\/?(\?.*)?$/, async (route) => {
      if (!mockLoginDone || route.request().resourceType() !== 'document') {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body><h1>Painel</h1></body></html>',
      });
    });

    // 2. Navigate to the login page
    await page.goto('/admin/login');

    // 3. Verify login form is visible
    await expect(
      page.locator('h1', { hasText: /Entrar no painel/i })
    ).toBeVisible({ timeout: 15000 });

    // 4. Fill credentials
    await page.fill(
      'input[type="email"], input[name="email"]',
      'admin@test.com'
    );
    await page.fill(
      'input[type="password"], input[name="password"]',
      'password123'
    );

    // 5. Arm the handler BEFORE clicking submit.
    mockLoginDone = true;

    // 6. Click Submit with force to bypass any transparent overlays (Turnstile container)
    await page.click('button[type="submit"]', { force: true });

    // 7. Verify redirection to /admin — works uniformly across all browsers.
    await expect(page).toHaveURL(/\/admin\/?$/i, { timeout: 20000 });

    // 8. Verify dashboard content
    await expect(page.locator('h1', { hasText: /Painel/i })).toBeVisible({
      timeout: 15000,
    });

    // 9. Final screenshot
    await page.screenshot({ path: 'test-results/admin-login-success.png' });
  });
});

