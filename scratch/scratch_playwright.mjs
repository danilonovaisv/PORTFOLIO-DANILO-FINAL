import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/sobre', { waitUntil: 'networkidle' });

  // Scroll down to 2000px, 4000px, 6000px, 8000px and take screenshots
  for (let y of [0, 2000, 4000, 6000, 8000]) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500); // wait for scroll/animations
    await page.screenshot({ path: `scratch_screenshot_${y}.png` });
  }

  await browser.close();
})();
