import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runVisualQA() {
  const outputDir = path.resolve('test-artifacts/visual-qa');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const consoleErrors = [];
  const pageErrors = [];

  // 1. DESKTOP RUN (1440x900)
  console.log('=== DESKTOP QA (1440x900) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });
  desktopPage.on('pageerror', (err) => {
    pageErrors.push(`[Page Error] ${err.message}`);
  });

  await desktopPage.goto('http://127.0.0.1:3000/sobre', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  // Scroll to #origem-criativa
  const originSection = desktopPage.locator('#origem-criativa');
  await originSection.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1500);

  // Screenshot 1: Desktop Initial Frame (Capítulo 01)
  const desktopInitialPath = path.join(outputDir, 'desktop-frame-01-initial.png');
  await desktopPage.screenshot({ path: desktopInitialPath, fullPage: false });
  console.log(`Saved: ${desktopInitialPath}`);

  // Test Drawer Open on the active frame button
  const exploreButton = originSection.locator('button:has-text("Trajetória Completa")').first();
  if (await exploreButton.isVisible()) {
    await exploreButton.click({ force: true });
    await desktopPage.waitForTimeout(1000);
    const drawerPath = path.join(outputDir, 'desktop-drawer-opened.png');
    await desktopPage.screenshot({ path: drawerPath, fullPage: false });
    console.log(`Saved: ${drawerPath}`);

    const closeButton = desktopPage.locator('button[aria-label="Fechar detalhes"]');
    if (await closeButton.isVisible()) {
      await closeButton.click({ force: true });
      await desktopPage.waitForTimeout(600);
    }
  }

  // 2. MOBILE RUN (390x844 - iPhone 13/14/15 size)
  console.log('=== MOBILE QA (390x844) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });
  mobilePage.on('pageerror', (err) => {
    pageErrors.push(`[Mobile Page Error] ${err.message}`);
  });

  await mobilePage.goto('http://127.0.0.1:3000/sobre', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileOrigin = mobilePage.locator('#origem-criativa');
  await mobileOrigin.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1500);

  // Check horizontal overflow
  const isOverflown = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile Horizontal Overflow: ${isOverflown ? 'FAILED' : 'PASS (No overflow)'}`);

  const mobileInitialPath = path.join(outputDir, 'mobile-frame-01-initial.png');
  await mobilePage.screenshot({ path: mobileInitialPath, fullPage: false });
  console.log(`Saved: ${mobileInitialPath}`);

  await browser.close();

  console.log('=== CONSOLE & RUNTIME AUDIT ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log(`Page Errors: ${pageErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log(consoleErrors.join('\n'));
  }
  if (pageErrors.length > 0) {
    console.log(pageErrors.join('\n'));
  }

  return {
    consoleErrors,
    pageErrors,
    isOverflown,
  };
}

runVisualQA().catch((e) => {
  console.error('Visual QA Error:', e);
  process.exit(1);
});
