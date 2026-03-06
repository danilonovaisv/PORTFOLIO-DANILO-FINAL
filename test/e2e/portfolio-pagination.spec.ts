import { test, expect } from '@playwright/test';
import { PORTFOLIO_PAGE_SIZE } from '../../src/config/portfolio';

const cardLocator = '[id^=\"portfolio-card-\"]';

test('paginação mantém limite e estados first/last', async ({ page }) => {
  await page.goto('/portfolio');

  const cards = page.locator(cardLocator);
  const countPage1 = await cards.count();
  expect(countPage1).toBeLessThanOrEqual(PORTFOLIO_PAGE_SIZE);

  const nextBtn = page.getByRole('button', { name: 'Próxima página' });
  const prevBtn = page.getByRole('button', { name: 'Página anterior' });

  if (await nextBtn.isVisible()) {
    await expect(prevBtn).toBeDisabled();
    await nextBtn.click();
    await expect(page).toHaveURL(/page=2/);
    const countPage2 = await cards.count();
    expect(countPage2).toBeLessThanOrEqual(PORTFOLIO_PAGE_SIZE);
    await expect(prevBtn).not.toBeDisabled();
    await prevBtn.click();
    await expect(page).not.toHaveURL(/page=2/);
  }
});

test('filtro reseta página para 1', async ({ page }) => {
  await page.goto('/portfolio?page=2');
  const tabVideos = page.getByRole('tab', { name: /Videos & Motions/i });
  await tabVideos.click();
  await expect(page).not.toHaveURL(/page=2/);

  const cards = page.locator(cardLocator);
  const count = await cards.count();
  expect(count).toBeLessThanOrEqual(PORTFOLIO_PAGE_SIZE);
});
