const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000/sobre', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  // Wait for hydration
  await page.waitForTimeout(3000);
  
  // Check canvas visibility
  const canvasInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    return canvases.map(c => ({
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
      opacity: getComputedStyle(c).opacity,
      display: getComputedStyle(c).display
    }));
  });
  
  console.log('CANVAS INFO:', JSON.stringify(canvasInfo, null, 2));
  
  // Check particle rendering by inspecting canvas pixel data
  const pixelInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { found: false };
    const ctx = canvas.getContext('2d');
    if (!ctx) return { found: true, context: false };
    
    // Check if canvas has any non-transparent pixels
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let nonTransparent = 0;
    let colors = new Set();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 10) {
        nonTransparent++;
        colors.add(`rgb(${data[i]},${data[i+1]},${data[i+2]})`);
      }
    }
    return {
      found: true,
      context: true,
      nonTransparentPixels: nonTransparent,
      totalPixels: data.length / 4,
      uniqueColors: Array.from(colors).slice(0, 20)
    };
  });
  
  console.log('PIXEL INFO:', JSON.stringify(pixelInfo, null, 2));
  
  // Check Origin section
  const originInfo = await page.evaluate(() => {
    const section = document.querySelector('[aria-label="Origem Criativa"]');
    if (!section) return { found: false };
    
    const blocks = Array.from(section.querySelectorAll('[data-origin-block]'));
    return {
      found: true,
      blockCount: blocks.length,
      blocks: blocks.map(b => ({
        id: b.getAttribute('data-origin-block'),
        title: b.querySelector('[data-origin-title]')?.textContent,
        hasCopy: !!b.querySelector('[data-origin-copy]')
      }))
    };
  });
  
  console.log('ORIGIN INFO:', JSON.stringify(originInfo, null, 2));
  
  // Check sticky gallery
  const galleryInfo = await page.evaluate(() => {
    const gallery = document.querySelector('[data-testid="origin-sticky-gallery"]');
    if (!gallery) return { found: false };
    const rect = gallery.getBoundingClientRect();
    return {
      found: true,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left
    };
  });
  
  console.log('GALLERY INFO:', JSON.stringify(galleryInfo, null, 2));
  
  // Check text content
  const textInfo = await page.evaluate(() => {
    const section = document.querySelector('[aria-label="Origem Criativa"]');
    if (!section) return {};
    return {
      eyebrow: section.querySelector('#origin-eyebrow')?.textContent,
      heading: section.querySelector('#origin-heading')?.textContent,
      description: section.querySelector('#origin-heading')?.nextElementSibling?.textContent
    };
  });
  
  console.log('TEXT INFO:', JSON.stringify(textInfo, null, 2));
  
  // Capture screenshots at different scroll positions
  const scrollPositions = [0, 0.25, 0.5, 0.75, 1.0];
  for (const pos of scrollPositions) {
    await page.evaluate((p) => {
      window.scrollTo(0, document.body.scrollHeight * p);
    }, pos);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `/tmp/visual-scroll-${pos}.png`, fullPage: false });
  }
  
  // Full page screenshot
  await page.screenshot({ path: '/tmp/visual-full.png', fullPage: true });
  
  // Check for console errors
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  
  await browser.close();
  
  console.log('\n=== TEST COMPLETE ===');
  console.log('Screenshots saved to /tmp/visual-scroll-*.png and /tmp/visual-full.png');
  console.log('Console errors:', errors.length);
})();
