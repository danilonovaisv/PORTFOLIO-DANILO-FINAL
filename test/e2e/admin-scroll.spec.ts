import { expect, test } from '@playwright/test';

test('admin keeps scroll enabled when content exceeds viewport', async ({
  page,
}) => {
  await page.goto('/admin/login');
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const target = document.querySelector('main') || document.body;
    const filler = document.createElement('div');
    filler.id = 'scroll-check';
    filler.style.height = '4000px';
    filler.style.width = '1px';
    target.appendChild(filler);
  });

  const scrollMetrics = await page.evaluate(() => {
    const target =
      (document.scrollingElement as HTMLElement) ||
      document.querySelector<HTMLElement>('main') ||
      document.body;
    const before = target.scrollTop ?? 0;
    target.scrollBy(0, 300);
    const after = target.scrollTop ?? 0;
    return {
      before,
      after,
      scrollHeight: target.scrollHeight,
      clientHeight: target.clientHeight,
      overflow: getComputedStyle(target).overflowY,
    };
  });

  expect(scrollMetrics.scrollHeight).toBeGreaterThan(
    scrollMetrics.clientHeight
  );

  const windowScroll = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const before =
          window.scrollY || document.scrollingElement?.scrollTop || 0;
        window.scrollBy({ top: 500, behavior: 'auto' });
        setTimeout(() => {
          const after =
            window.scrollY || document.scrollingElement?.scrollTop || 0;
          resolve({
            before,
            after,
            scrollHeight: document.documentElement.scrollHeight,
            clientHeight: document.documentElement.clientHeight,
            docClass: document.documentElement.className,
            bodyClass: document.body.className,
            docOverflow: getComputedStyle(document.documentElement).overflowY,
            bodyOverflow: getComputedStyle(document.body).overflowY,
          });
        }, 100);
      })
  );

  const windowMetrics = windowScroll as {
    before: number;
    after: number;
    scrollHeight: number;
    clientHeight: number;
  };

  expect(windowMetrics.after).toBeGreaterThan(windowMetrics.before);
  expect(windowMetrics.scrollHeight).toBeGreaterThan(
    windowMetrics.clientHeight
  );

  const hasScrollableArea = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight
  );
  expect(hasScrollableArea).toBeTruthy();
});
