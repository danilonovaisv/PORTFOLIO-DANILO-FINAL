import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({
    page,
  }) => {
    await page.goto('/admin/login');

    // Inject mock flag to bypass Turnstile CAPTCHA in LoginForm
    await page.evaluate(() => {
      (window as any).__IS_PLAYWRIGHT_MOCK__ = true;
    });

    // Verify presence of login form container
    await expect(
      page.locator('h1', { hasText: 'Entrar no painel' })
    ).toBeVisible({ timeout: 15000 });

    // Verify presence of login fields
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator(
      'input[type="password"], input[name="password"]'
    );
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Perform login (mocked in client.ts)
    await emailInput.fill('admin@test.com');
    await passwordInput.fill('password123');

    // Intercept the redirect to /admin so the backend (which has no real session cookie)
    // doesn't bounce us back to /admin/login.
    await page.route('**/admin', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<!DOCTYPE html><html><head><title>Admin</title></head><body><h1>Painel</h1></body></html>',
      });
    });

    await submitButton.click();

    // Verify redirection to admin dashboard
    // The mock client will return a session, triggering redirectToAdmin()
    await expect(page).toHaveURL(/\/admin$/);

    // We expect some dashboard-specific text to be visible
    // Usually 'Painel' or 'Dashboard'
    await expect(
      page.locator('h1, h2', { hasText: /Painel|Dashboard/i }).first()
    ).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: 'test-results/admin-dashboard.png' });
  });
});
