import { Buffer } from 'node:buffer';
import { expect, test, type Page } from '@playwright/test';

const SYNTHETIC_SUPABASE_ORIGIN = 'https://supabase.test.invalid';
const ONE_PIXEL_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  'base64'
);

async function stubSyntheticSupabase(page: Page) {
  await page.route(`${SYNTHETIC_SUPABASE_ORIGIN}/**`, async (route) => {
    const pathname = new URL(route.request().url()).pathname;

    if (pathname.startsWith('/storage/')) {
      await route.fulfill({
        status: 200,
        contentType: 'image/gif',
        body: ONE_PIXEL_GIF,
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: pathname.startsWith('/auth/') ? '{"user":null}' : '[]',
    });
  });

  await page.route('**/_next/image**', async (route) => {
    const source = new URL(route.request().url()).searchParams.get('url');
    if (!source?.startsWith(SYNTHETIC_SUPABASE_ORIGIN)) {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'image/gif',
      body: ONE_PIXEL_GIF,
    });
  });
}

test.describe('mobile menu overlay regressions', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test.beforeEach(async ({ page }) => {
    await stubSyntheticSupabase(page);
  });

  test('closed reduced-motion panel neither intercepts nor wins hit-testing', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const panel = page.locator('#mobile-menu-panel');
    await expect(panel).toBeAttached();
    const openTrigger = page.getByRole('button', { name: 'Abrir menu' });
    await expect(openTrigger).toBeVisible();

    const closedState = await panel.evaluate((element) => {
      const centerTarget = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      return {
        pointerEvents: window.getComputedStyle(element).pointerEvents,
        centerIsInsidePanel: centerTarget
          ? element.contains(centerTarget)
          : false,
      };
    });

    expect.soft(closedState.pointerEvents).toBe('none');
    expect.soft(closedState.centerIsInsidePanel).toBe(false);

    await openTrigger.focus();
    await page.keyboard.press('Tab');
    const focusIsInsidePanel = await panel.evaluate((element) =>
      element.contains(document.activeElement)
    );
    expect.soft(focusIsInsidePanel).toBe(false);
  });

  test('open trigger remains the hit target and a physical click closes the menu', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const openTrigger = page.getByRole('button', { name: 'Abrir menu' });
    await expect(openTrigger).toBeVisible();
    await openTrigger.click();

    const closeTrigger = page.getByRole('button', { name: 'Fechar menu' });
    await expect(closeTrigger).toHaveAttribute('aria-expanded', 'true');

    const panel = page.locator('#mobile-menu-panel');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
    await expect(panel).toHaveCSS('pointer-events', 'auto');
    await expect
      .poll(() =>
        panel.evaluate((element) =>
          Number.parseFloat(window.getComputedStyle(element).opacity)
        )
      )
      .toBeGreaterThan(0.99);

    const hitTest = await closeTrigger.evaluate((button) => {
      const rect = button.getBoundingClientRect();
      const target = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        resolvesToTrigger:
          target === button || Boolean(target && button.contains(target)),
      };
    });

    expect(hitTest.resolvesToTrigger).toBe(true);
    await page.mouse.click(hitTest.x, hitTest.y);
    await expect(openTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('moves focus through the open menu and restores it after Escape', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const openTrigger = page.getByRole('button', { name: 'Abrir menu' });
    await expect(openTrigger).toBeVisible();
    await openTrigger.click();

    const closeTrigger = page.getByRole('button', { name: 'Fechar menu' });
    const panel = page.locator('#mobile-menu-panel');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
    await expect(panel).not.toHaveAttribute('inert');
    await expect.soft(closeTrigger).toBeFocused({ timeout: 1_000 });

    await page.keyboard.press('Tab');
    await expect
      .soft(panel.getByRole('link').first())
      .toBeFocused({ timeout: 1_000 });

    await page.keyboard.press('Escape');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
    await expect(openTrigger).toBeFocused({ timeout: 1_000 });
  });
});
