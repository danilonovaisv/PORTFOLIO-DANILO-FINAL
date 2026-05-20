import { expect, test } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('should load the portfolio page and display projects', async ({
    page,
  }) => {
    await page.goto('/portfolio', { waitUntil: 'domcontentloaded' });

    // Check for a stable hero heading in portfolio
    await expect(page.locator('#portfolio-hero-heading')).toBeVisible({
      timeout: 30000,
    });

    // Validate Hero video source by checking the internal source tags
    const heroVideo = page.locator('#portfolio-hero video');
    const sources = heroVideo.locator('source');
    const sourceCount = await sources.count();
    expect(sourceCount).toBeGreaterThan(0);

    const firstSourceSrc = await sources.first().getAttribute('src');
    expect(firstSourceSrc).toBeTruthy();
    expect(firstSourceSrc ?? '').toMatch(
      /portfolio\.hero_(desktop|mobile)_video\.mp4/
    );

    // Verify that at least one project is rendered
    // The gallery component renders project cards as buttons
    const projects = page.locator('button[data-size]').first();
    await expect(projects).toBeVisible({ timeout: 30000 });

    await page.screenshot({ path: 'test-results/portfolio-page.png' });
  });
});
