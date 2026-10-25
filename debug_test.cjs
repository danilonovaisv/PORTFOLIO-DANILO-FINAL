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
  
  // Check all sections
  const sections = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.map(s => ({
      ariaLabel: s.getAttribute('aria-label'),
      id: s.id,
      className: s.className,
      children: s.children.length,
      hasCanvas: s.querySelector('canvas') !== null
    }));
  });
  
  console.log('ALL SECTIONS:', JSON.stringify(sections, null, 2));
  
  // Check for Origin text
  const originText = await page.evaluate(() => {
    const body = document.body.textContent || '';
    return {
      hasORIGEM: body.includes('ORIGEM'),
      hasOrigin: body.includes('Origin'),
      hasSensibilidade: body.includes('SENSIBILIDADE'),
      hasCriacao: body.includes('CRIAÇÃO'),
      hasDesign: body.includes('DESIGN'),
      hasExpansao: body.includes('EXPANSÃO'),
      bodyLength: body.length
    };
  });
  
  console.log('ORIGIN TEXT:', JSON.stringify(originText, null, 2));
  
  // Check for data-origin-block
  const originBlocks = await page.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll('[data-origin-block]'));
    return blocks.map(b => ({
      id: b.getAttribute('data-origin-block'),
      tag: b.tagName,
      className: b.className
    }));
  });
  
  console.log('ORIGIN BLOCKS:', JSON.stringify(originBlocks, null, 2));
  
  // Check canvas contexts
  const canvasContexts = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    return canvases.map(c => ({
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
      webgl: !!c.getContext('webgl'),
      '2d': !!c.getContext('2d'),
      style: c.getAttribute('style')
    }));
  });
  
  console.log('CANVAS CONTEXTS:', JSON.stringify(canvasContexts, null, 2));
  
  await browser.close();
})();
