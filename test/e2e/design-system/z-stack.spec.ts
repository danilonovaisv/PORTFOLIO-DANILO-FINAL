import { test, expect } from '@playwright/test';

/**
 * Ghost DS §1.3 v3.2 — Z-Index Layer Governance
 *
 * Regression guard: asserts that the z-layer tokens CSS custom properties
 * defined in `src/app/globals.css` resolve to the expected numeric values.
 *
 * If a token is renamed, dropped, or reassigned, this test breaks intentionally.
 */

const EXPECTED_LAYERS: Record<string, string> = {
  '--z-layer-base': '0',
  '--z-layer-glass': '10',
  '--z-layer-content': '20',
  '--z-layer-3d': '30',
  '--z-layer-cta': '40',
  '--z-layer-overlay': '50',
  '--z-layer-header': '55',
  '--z-layer-mobile-text': '60',
  '--z-layer-debug-low': '65',
  '--z-layer-lightbox': '70',
  '--z-layer-mobile-header': '80',
  '--z-layer-mobile-pre': '85',
  '--z-layer-mobile-menu': '90',
  '--z-layer-modal-scrim': '95',
  '--z-layer-modal': '100',
  '--z-layer-modal-close': '105',
  '--z-layer-cursor': '110',
  '--z-layer-debug-top': '9999',
};

test.describe('Ghost DS — z-layer tokens', () => {
  test('every z-layer token resolves to the spec value', async ({ page }) => {
    await page.goto('/');

    const resolved = await page.evaluate((tokens) => {
      const root = document.documentElement;
      const style = window.getComputedStyle(root);
      return Object.fromEntries(
        Object.keys(tokens).map((name) => [
          name,
          style.getPropertyValue(name).trim(),
        ])
      );
    }, EXPECTED_LAYERS);

    for (const [token, expected] of Object.entries(EXPECTED_LAYERS)) {
      expect(resolved[token], `token ${token} drifted`).toBe(expected);
    }
  });

  test('z-layer scale is strictly monotonic', async ({ page }) => {
    await page.goto('/');

    const values = await page.evaluate((names) => {
      const style = window.getComputedStyle(document.documentElement);
      return names.map((n) => Number(style.getPropertyValue(n).trim()));
    }, Object.keys(EXPECTED_LAYERS));

    for (let i = 1; i < values.length; i++) {
      expect(
        values[i],
        `layer ${Object.keys(EXPECTED_LAYERS)[i]} must be > previous`
      ).toBeGreaterThan(values[i - 1]);
    }
  });
});
