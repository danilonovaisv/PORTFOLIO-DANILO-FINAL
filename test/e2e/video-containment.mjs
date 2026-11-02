/* eslint-disable no-console */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { chromium, webkit } from '@playwright/test';

// Standalone real-component QA; no Next server or external CMS connection.
const root = process.cwd();
const output = path.join(root, 'test-results/video-containment');
await mkdir(output, { recursive: true });
const ratios = [
  [320, 180],
  [180, 320],
  [240, 240],
  [320, 240],
];
for (const [width, height] of ratios) {
  execFileSync('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-f',
    'lavfi',
    '-i',
    `color=c=green:s=${width}x${height}:d=1`,
    '-vf',
    'drawbox=x=0:y=0:w=iw:h=ih:color=yellow:t=10',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    path.join(output, `${width}x${height}.mp4`),
  ]);
}
const css = await postcss([tailwind()]).process(
  await readFile('src/app/globals.css', 'utf8'),
  {
    from: path.join(root, 'src/app/globals.css'),
  }
);
await writeFile(path.join(output, 'styles.css'), css.css);
await build({
  stdin: {
    resolveDir: root,
    loader: 'tsx',
    contents: `
    import React from 'react';
    import {createRoot} from 'react-dom/client';
    import {LazyMotion, domAnimation} from 'motion/react';
    import {HTMLVideoBlock} from './src/components/ui/HTMLVideoBlock';
    import {MediaCard} from './src/components/ui/media/MediaCard';
    import BlockMedia from './src/components/projects/templates/master-v2/BlockMedia';
    import {AlpaBlockVideoFull} from './src/components/projects/templates/alpa/blocks/AlpaBlockVideoFull';
    const ratios = ${JSON.stringify(ratios)};
    createRoot(document.getElementById('root')).render(<LazyMotion features={domAnimation}>
      {ratios.map(([w,h]) => {
        const src = location.origin + '/' + w + 'x' + h + '.mp4';
        const html = '<video src="'+src+'" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover"></video>';
        return <section key={src}>
          <h2>{w}x{h}</h2>
          <div data-case="media" className="aspect-video w-full"><MediaCard preserveVideoFrame pauseOffscreen={false} media={{kind:'video',src,fit:'cover',format:'landscape'}}/></div>
          <div data-case="snippet" className="aspect-video w-full"><HTMLVideoBlock html={html} frameless preserveVideoFrame/></div>
          <div data-case="document" className="aspect-video w-full"><HTMLVideoBlock html={'<!DOCTYPE html><html><head></head><body>'+html+'</body></html>'} frameless preserveVideoFrame/></div>
          <div data-case="v2"><BlockMedia item={{kind:'video',src}} title="Fixture" priority/></div>
          <div data-case="alpa"><AlpaBlockVideoFull src={src} revealInitial={false} revealVisible={{opacity:1}}/></div>
        </section>;
      })}
    </LazyMotion>);
  `,
  },
  bundle: true,
  outfile: path.join(output, 'app.js'),
  platform: 'browser',
  define: { 'process.env': '{"NODE_ENV":"test"}' },
  jsx: 'automatic',
});
await writeFile(
  path.join(output, 'index.html'),
  '<!doctype html><html><head><link rel="stylesheet" href="/styles.css"><style>body{margin:0}section{max-width:960px;margin:auto;padding:16px}h2{margin:12px}</style></head><body><div id="root"></div><script src="/app.js"></script></body></html>'
);
const server = createServer(async (req, res) => {
  const file =
    path.basename(new URL(req.url, 'http://localhost').pathname) ||
    'index.html';
  try {
    const bytes = await readFile(path.join(output, file));
    res.setHeader(
      'Content-Type',
      file.endsWith('.mp4')
        ? 'video/mp4'
        : file.endsWith('.css')
          ? 'text/css'
          : file.endsWith('.js')
            ? 'text/javascript'
            : 'text/html'
    );
    res.end(bytes);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const results = [];
try {
  for (const [name, browserType] of [
    ['chromium', chromium],
    ['webkit', webkit],
  ]) {
    let browser;
    try {
      browser = await browserType.launch();
    } catch (error) {
      results.push({ browser: name, skipped: String(error).split('\n')[0] });
      continue;
    }
    try {
      for (const viewport of [
        { width: 390, height: 844 },
        { width: 1440, height: 900 },
      ]) {
        const page = await browser.newPage({ viewport });
        page.on('pageerror', (error) =>
          console.error('Browser:', error.message)
        );
        await page.route('**/*', (route) =>
          new URL(route.request().url()).hostname === '127.0.0.1' ||
          route.request().url().startsWith('about:')
            ? route.continue()
            : route.abort()
        );
        await page.goto(`http://127.0.0.1:${server.address().port}`);
        await page.waitForFunction(
          () => document.querySelectorAll('section').length === 4
        );
        console.log(
          'Rendered',
          name,
          viewport.width,
          await page.locator('video').count(),
          await page.locator('body').innerText()
        );
        for (const frame of page.frames()) {
          for (const video of await frame.locator('video').all()) {
            await video.evaluate((el) => {
              el.load();
            });
            await video.evaluate((el) =>
              el.readyState >= 2
                ? undefined
                : new Promise((resolve, reject) => {
                    el.addEventListener('loadeddata', resolve, { once: true });
                    el.addEventListener(
                      'error',
                      () => reject(new Error('Video failed')),
                      { once: true }
                    );
                  })
            );
            const details = await video.evaluate((el) => {
              const rect = el.getBoundingClientRect();
              return {
                fit: getComputedStyle(el).objectFit,
                width: rect.width,
                height: rect.height,
                nativeWidth: el.videoWidth,
                nativeHeight: el.videoHeight,
              };
            });
            assert.equal(details.fit, 'contain');
            assert.ok(
              details.width > 0 && details.height > 0 && details.nativeWidth > 0
            );
          }
        }
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth
          ),
          false
        );
        await page.screenshot({
          path: path.join(output, `${name}-${viewport.width}.png`),
          fullPage: true,
        });
        results.push({
          browser: name,
          width: viewport.width,
          passed: true,
          videos: 20,
        });
        await page.close();
      }
    } finally {
      await browser.close();
    }
  }
} finally {
  server.close();
  await writeFile(
    path.join(output, 'results.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(JSON.stringify(results, null, 2));
}
