const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  // Listen for console logs
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  await page.goto(
    'https://jiro.build/components/header/human-synthesis-header-the-world',
    {
      waitUntil: 'networkidle',
      timeout: 60000,
    }
  );

  // Wait longer for any dynamic content
  await page.waitForTimeout(5000);

  // Check all elements
  const allElements = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    return elements
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id,
        class: el.className,
        canvas: el.tagName.toLowerCase() === 'canvas',
      }))
      .filter(
        (e) =>
          e.canvas ||
          e.class?.includes('canvas') ||
          e.class?.includes('particle') ||
          e.class?.includes('hero') ||
          e.class?.includes('header')
      );
  });

  console.log('RELEVANT ELEMENTS:', JSON.stringify(allElements, null, 2));

  // Check for iframes or shadow DOM
  const frames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('iframe')).map((f) => ({
      src: f.src,
      id: f.id,
    }));
  });
  console.log('IFRAMES:', JSON.stringify(frames, null, 2));

  // Check body scroll height
  const scrollInfo = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
    innerHeight: window.innerHeight,
  }));
  console.log('SCROLL INFO:', JSON.stringify(scrollInfo, null, 2));

  // Get full page HTML
  const html = await page.content();
  console.log('HTML LENGTH:', html.length);

  // Search for canvas in HTML
  const canvasInHtml = html.includes('<canvas') || html.includes('canvas');
  console.log('CANVAS IN HTML:', canvasInHtml);

  // Look for specific component
  const componentInfo = await page.evaluate(() => {
    const sections = document.querySelectorAll(
      'section, div[class*="component"], div[class*="header"], div[class*="hero"]'
    );
    return Array.from(sections).map((s) => ({
      class: s.className,
      id: s.id,
      children: s.children.length,
    }));
  });
  console.log('COMPONENT SECTIONS:', JSON.stringify(componentInfo, null, 2));

  await page.screenshot({ path: '/tmp/jiro-full.png', fullPage: true });

  await browser.close();
})();
