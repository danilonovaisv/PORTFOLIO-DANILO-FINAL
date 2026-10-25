const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000/sobre', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  await page.waitForTimeout(3000);
  
  // Scroll to Origin section
  await page.evaluate(() => {
    const section = document.querySelector('[aria-labelledby="origin-heading"]');
    if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  
  await page.waitForTimeout(2000);
  
  // Find the desktop canvas (largest one)
  const desktopCanvas = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    let largest = null;
    for (const c of canvases) {
      if (!largest || c.width > largest.width) largest = c;
    }
    if (!largest) return null;
    const rect = largest.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    };
  });
  
  console.log('DESKTOP CANVAS:', JSON.stringify(desktopCanvas, null, 2));
  
  if (desktopCanvas) {
    // Capture just the canvas area
    await page.screenshot({
      path: '/tmp/desktop-canvas.png',
      clip: desktopCanvas
    });
    
    // Also capture full page
    await page.screenshot({
      path: '/tmp/desktop-full.png',
      fullPage: true
    });
  }
  
  await browser.close();
  console.log('\n=== CAPTURE COMPLETE ===');
})();
