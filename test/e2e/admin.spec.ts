import { expect, test } from '@playwright/test';

test.describe('Admin Login Page', () => {
  test('should display the login form', async ({ page }) => {
    await page.goto('/admin/login');

    // Verify presence of login form container
    await expect(
      page.locator('h1', { hasText: 'Entrar no painel' })
    ).toBeVisible({ timeout: 15000 });

    // Verify presence of login fields
    await expect(
      page.locator('input[type="email"], input[name="email"]')
    ).toBeVisible();
    await expect(
      page.locator('input[type="password"], input[name="password"]')
    ).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    await page.screenshot({ path: 'test-results/admin-login.png' });
  });
});
