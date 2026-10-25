const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  // Go directly to the iframe URL
  await page.goto(
    'https://jiro.build/preview/component/marketing-blocks/header/human-synthesis-header-the-world',
    {
      waitUntil: 'networkidle',
      timeout: 60000,
    }
  );

  await page.waitForTimeout(5000);

  // Check all elements
  const allElements = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    return elements
      .map((el) => {
        const cls =
          el.className && typeof el.className === 'string'
            ? el.className
            : el.className?.baseVal || '';
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id,
          class: cls,
          isCanvas: el.tagName.toLowerCase() === 'canvas',
          hasCanvasClass: cls.includes('canvas'),
          hasParticleClass: cls.includes('particle'),
          hasHeroClass: cls.includes('hero'),
          hasHeaderClass: cls.includes('header'),
        };
      })
      .filter(
        (e) =>
          e.isCanvas ||
          e.hasCanvasClass ||
          e.hasParticleClass ||
          e.hasHeroClass ||
          e.hasHeaderClass
      );
  });

  console.log('RELEVANT ELEMENTS:', JSON.stringify(allElements, null, 2));

  // Scroll info
  const scrollInfo = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
    innerHeight: window.innerHeight,
  }));
  console.log('SCROLL INFO:', JSON.stringify(scrollInfo, null, 2));

  // Get full page HTML and search for canvas
  const html = await page.content();
  const canvasMatches = html.match(/<canvas[^>]*>/gi);
  console.log('CANVAS TAGS IN HTML:', canvasMatches ? canvasMatches.length : 0);
  if (canvasMatches) console.log('FIRST CANVAS:', canvasMatches[0]);

  // Check for WebGL
  const webglInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { found: false };
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!gl) return { found: true, webgl: false };
    return {
      found: true,
      webgl: true,
      version: gl.getParameter(gl.VERSION),
      shading: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      renderer: gl.getParameter(gl.RENDERER),
    };
  });
  console.log('WEBGL INFO:', JSON.stringify(webglInfo, null, 2));

  // Canvas details
  const canvasDetails = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { found: false };
    return {
      found: true,
      width: canvas.width,
      height: canvas.height,
      clientWidth: canvas.clientWidth,
      clientHeight: canvas.clientHeight,
      style: canvas.getAttribute('style'),
      className:
        canvas.className && typeof canvas.className === 'string'
          ? canvas.className
          : canvas.className?.baseVal || '',
    };
  });
  console.log('CANVAS DETAILS:', JSON.stringify(canvasDetails, null, 2));

  // Scroll through and capture
  const scrollPositions = [0, 0.25, 0.5, 0.75, 1.0];
  for (const pos of scrollPositions) {
    await page.evaluate((p) => {
      window.scrollTo(0, document.body.scrollHeight * p);
    }, pos);
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `/tmp/jiro-scroll-${pos}.png`,
      fullPage: false,
    });
  }

  await page.screenshot({ path: '/tmp/jiro-full.png', fullPage: true });

  await browser.close();
})();
