import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({ page }) => {
    // Capture browser console logs for easier debugging
    page.on('console', (msg) => {
      console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
    });

    // 1. Inject mock flag persistently before navigation (via init script)
    // This ensures client-side code (Supabase client) knows to use mocks.
    await page.addInitScript(() => {
      (window as any).__IS_PLAYWRIGHT_MOCK__ = true;
    });

    // 2. Intercept the final dashboard route (/admin)
    // We respond with a dummy HTML so we don't need real backend auth state for this check.
    await page.route('**/admin', (route) => {
      console.log('[Test] Intercepting request to **/admin');
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body><h1>Painel</h1></body></html>',
      });
    });

    // 3. Navigate to the login page
    await page.goto('/admin/login');

    // 4. Verify login form is visible
    await expect(page.locator('h1', { hasText: /Entrar no painel/i })).toBeVisible({ timeout: 15000 });

    // 5. Fill credentials
    await page.fill('input[type="email"], input[name="email"]', 'admin@test.com');
    await page.fill('input[type="password"], input[name="password"]', 'password123');

    // 6. Click Submit with force to bypass any transparent overlays (like Turnstile container)
    console.log('[Test] Clicking submit button...');
    await page.click('button[type="submit"]', { force: true });

    // 7. Verify redirection to dashboard
    // We use a regex that handles case-insensitivity and trailing slashes.
    await expect(page).toHaveURL(/\/admin\/?$/i, { timeout: 20000 });

    // 8. Verify dashboard content (from our intercept body)
    await expect(page.locator('h1', { hasText: /Painel/i })).toBeVisible({ timeout: 15000 });

    // 9. Take a final success screenshot
    await page.screenshot({ path: 'test-results/admin-login-success.png' });
    console.log('[Test] Admin Login Test: PASSED');
  });
});
