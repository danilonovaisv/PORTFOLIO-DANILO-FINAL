import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form and redirect on success', async ({
    page,
  }) => {
    await page.goto('/admin/login');

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
