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
    const section = document.querySelector('[aria-label="Origem Criativa"]');
    if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  
  await page.waitForTimeout(2000);
  
  // Capture Origin section specifically
  const originSection = await page.evaluate(() => {
    const section = document.querySelector('[aria-label="Origem Criativa"]');
    if (!section) return { found: false };
    const rect = section.getBoundingClientRect();
    return {
      found: true,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  });
  
  console.log('ORIGIN SECTION:', JSON.stringify(originSection, null, 2));
  
  // Check all canvases in Origin section
  const originCanvases = await page.evaluate(() => {
    const section = document.querySelector('[aria-label="Origem Criativa"]');
    if (!section) return [];
    const canvases = Array.from(section.querySelectorAll('canvas'));
    return canvases.map(c => ({
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
      opacity: getComputedStyle(c).opacity,
      display: getComputedStyle(c).display,
      position: c.getBoundingClientRect().top
    }));
  });
  
  console.log('ORIGIN CANVASES:', JSON.stringify(originCanvases, null, 2));
  
  // Check if canvas has content (drawn pixels)
  const canvasContent = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    const results = [];
    for (const canvas of canvases) {
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let nonTransparent = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 10) nonTransparent++;
      }
      results.push({
        width: canvas.width,
        height: canvas.height,
        nonTransparentPixels: nonTransparent,
        totalPixels: data.length / 4
      });
    }
    return results;
  });
  
  console.log('CANVAS CONTENT:', JSON.stringify(canvasContent, null, 2));
  
  // Capture Origin section screenshot
  await page.screenshot({ 
    path: '/tmp/origin-section.png', 
    fullPage: false,
    clip: originSection.found ? {
      x: originSection.left,
      y: originSection.top,
      width: originSection.width,
      height: originSection.height
    } : undefined
  });
  
  await browser.close();
  console.log('\n=== TEST COMPLETE ===');
})();
