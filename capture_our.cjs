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

  // Find our particle canvas (the one with clientWidth 640)
  const ourCanvas = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    for (const c of canvases) {
      if (c.clientWidth === 640 && c.clientHeight === 720) {
        const rect = c.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          internalWidth: c.width,
          internalHeight: c.height,
        };
      }
    }
    return null;
  });

  console.log('OUR CANVAS:', JSON.stringify(ourCanvas, null, 2));

  if (ourCanvas) {
    // Capture just our canvas
    await page.screenshot({
      path: '/tmp/our-canvas.png',
      clip: ourCanvas,
    });

    // Capture full viewport
    await page.screenshot({
      path: '/tmp/our-viewport.png',
      fullPage: false,
    });
  }

  // Also check the gallery container
  const gallery = await page.evaluate(() => {
    const gallery = document.querySelector(
      '[data-testid="origin-sticky-gallery"]'
    );
    if (!gallery) return null;
    const rect = gallery.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });

  console.log('GALLERY:', JSON.stringify(gallery, null, 2));

  await browser.close();
  console.log('\n=== CAPTURE COMPLETE ===');
})();
