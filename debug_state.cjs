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

  await page.waitForTimeout(3000);

  // Check React component state via DOM
  const stateCheck = await page.evaluate(() => {
    // Find the particle scene container
    const containers = Array.from(document.querySelectorAll('[role="img"]'));
    const results = [];
    for (const container of containers) {
      const canvas = container.querySelector('canvas');
      if (!canvas) continue;

      const rect = container.getBoundingClientRect();
      const style = getComputedStyle(container);

      results.push({
        clientWidth: container.clientWidth,
        clientHeight: container.clientHeight,
        bgColor: style.backgroundColor,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        canvasClientWidth: canvas.clientWidth,
        canvasClientHeight: canvas.clientHeight,
        canvasOpacity: getComputedStyle(canvas).opacity,
        hasChildren: container.children.length > 1,
      });
    }
    return results;
  });

  console.log('CONTAINER STATE:', JSON.stringify(stateCheck, null, 2));

  // Check if particles are initialized by looking at React fiber
  const reactState = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('[role="img"]'));
    for (const container of containers) {
      const key = Object.keys(container).find((k) =>
        k.startsWith('__reactProps$')
      );
      if (key) {
        const props = container[key];
        return {
          found: true,
          className: props.className,
          style: props.style,
        };
      }
    }
    return { found: false };
  });

  console.log('REACT STATE:', JSON.stringify(reactState, null, 2));

  await browser.close();
})();
