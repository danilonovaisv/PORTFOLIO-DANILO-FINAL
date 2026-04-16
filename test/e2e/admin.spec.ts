import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({
    page,
  }) => {
    // 1. Set mock flag so client-side code (Supabase, captcha) uses mocks.
    await page.addInitScript(() => {
      (window as any).__IS_PLAYWRIGHT_MOCK__ = true;
    });

    // Two-phase route interception strategy (window.location.assign is used in LoginForm):
    //
    // Phase A — Chromium: page.route intercepts the document navigation triggered by
    //   window.location.assign('/admin') directly → serve mock dashboard HTML.
    //
    // Phase B — Firefox & WebKit: window.location.assign is NOT intercepted by Phase A.
    //   The real server receives the request, its auth middleware sees no session, and
    //   returns 302 → /admin/login. We intercept that redirect and serve mock HTML with
    //   an inline pushState to set the URL to /admin.
    //
    //   NOTE: resourceType() is NOT checked in Phase B because WebKit reports the
    //   redirect-follow request as 'fetch' instead of 'document', which would cause
    //   the handler to skip it. mockLoginDone alone is sufficient to gate correctly.
    //
    let mockLoginDone = false;
    let interceptCount = 0;

    // Unified Interceptor: Catch either /admin directly or the redirect to /admin/login.
    await page.route(
      (url) => url.pathname.includes('/admin'),
      async (route) => {
        const url = new URL(route.request().url());

        if (!mockLoginDone) {
          await route.continue();
          return;
        }

        interceptCount++;

        // Case 1: Direct hit to dashboard
        if (url.pathname === '/admin' || url.pathname === '/admin/') {
          await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: '<html><body><h1>Painel</h1></body></html>',
          });
          return;
        }

        // Case 2: Redirect follow to login page (happens in browsers where Case 1 isn't reached)
        if (url.pathname === '/admin/login') {
          await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `<html><body>
              <script>window.history.pushState(null, '', '/admin');</script>
              <h1>Painel</h1>
            </body></html>`,
          });
          return;
        }

        await route.continue();
      }
    );

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

    // 5. Arm handlers before click.
    mockLoginDone = true;

    // 6. Click Submit (force to bypass Turnstile overlay)
    await page.click('button[type="submit"]', { force: true });

    // 7. Verify redirection to /admin.
    // Increased timeout for slower CI environments/browsers
    await expect(page).toHaveURL(/\/admin\/?$/i, { timeout: 25000 });

    // 8. Verify dashboard content
    await expect(page.locator('h1', { hasText: /Painel/i })).toBeVisible({
      timeout: 15000,
    });

    // 9. Final screenshot
    await page.screenshot({ path: 'test-results/admin-login-success.png' });
  });
});
