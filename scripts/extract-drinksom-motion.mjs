#!/usr/bin/env node
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const URL = 'https://www.drinksom.eu';
const OUT_DIR = 'design-extract-output/drinksom';

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  });
  const page = await ctx.newPage();

  const consoleMsgs = [];
  page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`));

  console.log('[nav]', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3500);

  // B1. Libraries
  const libraries = await page.evaluate(() => {
    const g = /** @type {any} */ (window);
    return {
      gsap: g.gsap ? g.gsap.version || true : false,
      ScrollTrigger: !!g.ScrollTrigger || !!g.gsap?.ScrollTrigger,
      Lenis:
        !!g.Lenis ||
        !!g.__lenis ||
        !!document.querySelector('html.lenis, html[data-lenis]'),
      three: g.THREE ? g.THREE.REVISION || true : false,
      threeR3F: !!document.querySelector('canvas[data-engine*="three"]'),
      framerMotion:
        !!document.querySelector('[data-framer-name],[style*="transform"]') &&
        !!g.FramerMotion,
      fullpage: !!g.fullpage_api,
      splitType: !!g.SplitType,
      barba: !!g.barba,
      hasCanvas: document.querySelectorAll('canvas').length,
      htmlClasses: document.documentElement.className,
      htmlDataset: { ...document.documentElement.dataset },
    };
  });
  console.log('[libraries]', libraries);

  // B3. GSAP / ScrollTrigger introspection
  const gsapData = await page.evaluate(() => {
    const g = /** @type {any} */ (window);
    if (!g.gsap) return null;
    let timelines = [];
    try {
      timelines = g.gsap.globalTimeline
        .getChildren(true, true, true)
        .slice(0, 200)
        .map((t) => ({
          type: t.constructor?.name,
          duration: t.duration?.(),
          delay: t._delay,
          ease:
            (typeof t.vars?.ease === 'string'
              ? t.vars.ease
              : t.vars?.ease?.toString?.()) || null,
          targetTag: (() => {
            try {
              const tg = t.targets?.()?.[0];
              if (!tg) return null;
              if (tg.nodeType) {
                return `${tg.tagName?.toLowerCase()}${
                  tg.id ? '#' + tg.id : ''
                }${tg.className ? '.' + String(tg.className).split(' ').join('.') : ''}`.slice(
                  0,
                  120
                );
              }
              return typeof tg;
            } catch {
              return null;
            }
          })(),
          vars: Object.keys(t.vars || {}).slice(0, 12),
        }));
    } catch (e) {
      timelines = [{ error: String(e) }];
    }
    let scrollTriggers = [];
    try {
      const ST = g.ScrollTrigger || g.gsap.ScrollTrigger;
      if (ST?.getAll) {
        scrollTriggers = ST.getAll().map((st) => ({
          trigger:
            st.trigger?.tagName?.toLowerCase() +
            (st.trigger?.id ? '#' + st.trigger.id : '') +
            (st.trigger?.className
              ? '.' + String(st.trigger.className).split(' ').join('.')
              : ''),
          scrub: st.scrub,
          start: st.vars?.start,
          end: st.vars?.end,
          pin: st.vars?.pin,
          markers: st.vars?.markers,
          toggleActions: st.vars?.toggleActions,
          animationVars: st.animation?.vars
            ? Object.keys(st.animation.vars).slice(0, 12)
            : null,
          ease:
            typeof st.animation?.vars?.ease === 'string'
              ? st.animation.vars.ease
              : st.animation?.vars?.ease?.toString?.() || null,
          duration: st.animation?.duration?.(),
        }));
      }
    } catch (e) {
      scrollTriggers = [{ error: String(e) }];
    }
    return { timelineCount: timelines.length, timelines, scrollTriggers };
  });
  console.log(
    '[gsap]',
    gsapData
      ? `tl:${gsapData.timelineCount} st:${gsapData.scrollTriggers.length}`
      : 'not detected'
  );

  // B4. Lenis config
  const lenis = await page.evaluate(() => {
    const g = /** @type {any} */ (window);
    const inst = g.__lenis || g.lenis || g.Lenis?.instance;
    if (!inst) return null;
    const opts = inst.options || inst.__options || {};
    return {
      duration: opts.duration,
      lerp: opts.lerp,
      smoothWheel: opts.smoothWheel,
      smoothTouch: opts.smoothTouch,
      wheelMultiplier: opts.wheelMultiplier,
      touchMultiplier: opts.touchMultiplier,
      orientation: opts.orientation,
      easingStr: opts.easing?.toString?.().slice(0, 300),
    };
  });
  console.log('[lenis]', lenis);

  // B2. CSS transition/animation harvest on likely hero subjects
  const cssMotion = await page.evaluate(() => {
    const selectors = [
      'main',
      'section:first-of-type',
      'h1',
      'h2',
      '[class*="hero" i]',
      '[class*="Hero" i]',
      '[class*="title" i]',
      '[class*="headline" i]',
      '[class*="button" i]',
      'a[class*="cta" i]',
      'canvas',
    ];
    const seen = new Set();
    const out = [];
    for (const sel of selectors) {
      const nodes = document.querySelectorAll(sel);
      for (const el of Array.from(nodes).slice(0, 5)) {
        if (seen.has(el)) continue;
        seen.add(el);
        const cs = getComputedStyle(el);
        const rec = {
          selector: sel,
          tag: el.tagName.toLowerCase(),
          classSample: (el.className || '').toString().slice(0, 160),
          transition: cs.transition,
          transitionDuration: cs.transitionDuration,
          transitionTimingFunction: cs.transitionTimingFunction,
          transitionDelay: cs.transitionDelay,
          animation: cs.animation,
          animationDuration: cs.animationDuration,
          animationTimingFunction: cs.animationTimingFunction,
          animationDelay: cs.animationDelay,
          mixBlendMode: cs.mixBlendMode,
          willChange: cs.willChange,
          transform: cs.transform,
          filter: cs.filter,
        };
        out.push(rec);
      }
    }
    // Keyframes
    let keyframes = [];
    try {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              keyframes.push({
                name: rule.name,
                body: rule.cssText.slice(0, 400),
              });
            }
          }
        } catch {}
      }
    } catch {}
    return { elements: out, keyframes };
  });
  console.log(
    '[css]',
    cssMotion.elements.length,
    'elements,',
    cssMotion.keyframes.length,
    'keyframes'
  );

  // B6. Cursor — probe DOM + computed styles + pointermove deltas
  const cursorInfo = await page.evaluate(async () => {
    const candidates = Array.from(
      document.querySelectorAll(
        '[class*="cursor" i],[id*="cursor" i],[class*="Cursor"],[class*="follow" i]'
      )
    );
    const blendEls = Array.from(document.querySelectorAll('*')).filter((el) => {
      const mb = getComputedStyle(el).mixBlendMode;
      return mb && mb !== 'normal';
    });
    const pack = (el) => ({
      tag: el.tagName.toLowerCase(),
      id: el.id,
      classes: (el.className || '').toString().slice(0, 160),
      mixBlendMode: getComputedStyle(el).mixBlendMode,
      position: getComputedStyle(el).position,
      zIndex: getComputedStyle(el).zIndex,
      transform: getComputedStyle(el).transform,
      transition: getComputedStyle(el).transition,
      pointerEvents: getComputedStyle(el).pointerEvents,
      size: {
        w: el.getBoundingClientRect().width,
        h: el.getBoundingClientRect().height,
      },
    });
    return {
      candidateCount: candidates.length,
      candidates: candidates.slice(0, 8).map(pack),
      blendCount: blendEls.length,
      blendSample: blendEls.slice(0, 6).map(pack),
    };
  });
  console.log(
    '[cursor]',
    'candidates:',
    cursorInfo.candidateCount,
    'blend:',
    cursorInfo.blendCount
  );

  // Cursor motion probe — simulate mouse moves
  let cursorMotion = null;
  if (cursorInfo.candidateCount) {
    cursorMotion = await page.evaluate(async () => {
      const node = document.querySelector(
        '[class*="cursor" i],[id*="cursor" i]'
      );
      if (!node) return null;
      const samples = [];
      for (const [x, y] of [
        [200, 200],
        [600, 400],
        [1000, 200],
        [1200, 700],
        [400, 700],
      ]) {
        document.dispatchEvent(
          new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true })
        );
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true })
        );
        await new Promise((r) => setTimeout(r, 80));
        const r = node.getBoundingClientRect();
        samples.push({
          target: [x, y],
          actual: [r.x + r.width / 2, r.y + r.height / 2],
          transform: getComputedStyle(node).transform,
        });
      }
      return samples;
    });
  }
  // Playwright native mouse move as more reliable trigger
  try {
    const samples2 = [];
    for (const [x, y] of [
      [220, 220],
      [620, 420],
      [1020, 220],
      [1220, 720],
      [420, 720],
    ]) {
      await page.mouse.move(x, y, { steps: 8 });
      await page.waitForTimeout(120);
      const snap = await page.evaluate(() => {
        const n = document.querySelector(
          '[class*="cursor" i],[id*="cursor" i]'
        );
        if (!n) return null;
        const r = n.getBoundingClientRect();
        return {
          center: [r.x + r.width / 2, r.y + r.height / 2],
          transform: getComputedStyle(n).transform,
        };
      });
      if (snap) samples2.push({ target: [x, y], ...snap });
    }
    if (samples2.length) cursorMotion = (cursorMotion || []).concat(samples2);
  } catch {}

  // B5 + B7. Scroll-linked — sample at 5 points
  const scrollSamples = [];
  const heroSelector = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.innerText.slice(0, 120) : null;
  });
  const targetSelectors = [
    'canvas',
    'h1',
    '[class*="hero" i]',
    'section:first-of-type',
    '[class*="title" i]',
  ];
  for (const pct of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
    await page.evaluate((p) => {
      window.scrollTo({
        top: document.body.scrollHeight * p,
        behavior: 'instant',
      });
    }, pct);
    await page.waitForTimeout(450);
    const snap = await page.evaluate((sels) => {
      const out = {};
      for (const s of sels) {
        const el = document.querySelector(s);
        if (!el) continue;
        const cs = getComputedStyle(el);
        out[s] = {
          transform: cs.transform,
          opacity: cs.opacity,
          filter: cs.filter,
          translateRect: (() => {
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
          })(),
        };
      }
      return { scrollY: window.scrollY, docH: document.body.scrollHeight, out };
    }, targetSelectors);
    scrollSamples.push({ pct, ...snap });
    await page.screenshot({
      path: join(
        OUT_DIR,
        `scroll-${String(Math.round(pct * 100)).padStart(3, '0')}.png`
      ),
      fullPage: false,
    });
  }
  console.log('[scroll]', scrollSamples.length, 'samples');

  // Back to top for hero canvas screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: join(OUT_DIR, 'hero-top.png'),
    fullPage: false,
  });

  const runtime = {
    url: URL,
    timestamp: new Date().toISOString(),
    viewport: { width: 1440, height: 900 },
    heroH1: heroSelector,
    libraries,
    lenis,
    gsap: gsapData,
    cssMotion,
    cursorInfo,
    cursorMotion,
    scrollSamples,
    consoleMsgs: consoleMsgs.slice(0, 40),
  };
  await writeFile(
    join(OUT_DIR, 'runtime.json'),
    JSON.stringify(runtime, null, 2)
  );
  console.log('[done] wrote', join(OUT_DIR, 'runtime.json'));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
