const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

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

  // Check our canvas pixel data
  const pixelData = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    const results = [];
    for (const canvas of canvases) {
      if (canvas.clientWidth < 100) continue; // Skip tiny canvases
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let nonTransparent = 0;
      let cyanPixels = 0;
      let bluePixels = 0;
      let purplePixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2],
          a = data[i + 3];
        if (a > 10) {
          nonTransparent++;
          // Check for cyan/teal (high G+B, low R)
          if (b > 100 && g > 100 && r < 100) cyanPixels++;
          // Check for blue
          if (b > 100 && g < 100 && r < 100) bluePixels++;
          // Check for purple
          if (r > 100 && b > 100 && g < 100) purplePixels++;
        }
      }

      results.push({
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        nonTransparentPixels: nonTransparent,
        cyanPixels,
        bluePixels,
        purplePixels,
        totalPixels: data.length / 4,
      });
    }
    return results;
  });

  console.log('PIXEL ANALYSIS:', JSON.stringify(pixelData, null, 2));

  await browser.close();
})();
