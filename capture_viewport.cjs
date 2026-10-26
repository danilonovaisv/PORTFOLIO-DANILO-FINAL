const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3000/sobre', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  // Scroll to Origin section
  await page.evaluate(() => {
    const section = document.querySelector(
      '[aria-labelledby="origin-heading"]'
    );
    if (section)
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  await page.waitForTimeout(2000);

  // Capture full viewport
  await page.screenshot({
    path: '/tmp/viewport-origin.png',
    fullPage: false,
  });

  // Also capture at different scroll positions within Origin section
  for (let pos = 0; pos <= 1; pos += 0.25) {
    await page.evaluate((p) => {
      const section = document.querySelector(
        '[aria-labelledby="origin-heading"]'
      );
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        window.scrollTo(0, sectionTop + sectionHeight * p);
      }
    }, pos);
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `/tmp/origin-scroll-${pos}.png`,
      fullPage: false,
    });
  }

  await browser.close();
  console.log('\n=== CAPTURE COMPLETE ===');
})();
