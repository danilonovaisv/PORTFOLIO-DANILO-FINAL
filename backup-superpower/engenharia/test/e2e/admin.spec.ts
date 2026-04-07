import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({
    page,
  }) => {
    // 1. Set mock flag so client-side code (Supabase, captcha) uses mocks.
    await page.addInitScript(() => {
      (window as any).__IS_PLAYWRIGHT_MOCK__ = true;
    });

    // Two-phase route interception strategy:
    //
    // Chromium: page.route intercepts the document navigation from window.location.assign('/admin')
    //   → serve mock dashboard HTML directly.
    //
    // WebKit/Firefox: page.route does NOT intercept navigation requests from window.location.assign.
    //   The real server receives the request, its auth middleware sees no session, and returns
    //   302 → /admin/login. The *redirect follow* to /admin/login IS intercepted.
    //   → serve mock dashboard HTML with an inline script that pushes history to /admin.
    //
    // mockLoginDone gates both handlers so only post-submit requests are intercepted.
    let mockLoginDone = false;

    // Phase A — Chromium: intercept /admin document navigation after login.
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

    // Phase B — WebKit/Firefox: intercept the server's redirect back to /admin/login.
    // Serve mock dashboard HTML and update the URL to /admin via history.pushState.
    await page.route('**/admin/login', async (route) => {
      if (!mockLoginDone || route.request().resourceType() !== 'document') {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `<html><body>
          <script>window.history.pushState(null, '', '/admin');</script>
          <h1>Painel</h1>
        </body></html>`,
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

    // 5. Arm the post-login route handlers before clicking submit.
    mockLoginDone = true;

    // 6. Click Submit with force to bypass any transparent overlays (like Turnstile container)
    await page.click('button[type="submit"]', { force: true });

    // 7. Verify redirection to /admin.
    //    Chromium: fulfilled by Phase A. WebKit/Firefox: URL set by the inline pushState in Phase B.
    await expect(page).toHaveURL(/\/admin\/?$/i, { timeout: 20000 });

    // 8. Verify dashboard content
    await expect(page.locator('h1', { hasText: /Painel/i })).toBeVisible({
      timeout: 15000,
    });

    // 9. Take a final success screenshot
    await page.screenshot({ path: 'test-results/admin-login-success.png' });
  });
});
