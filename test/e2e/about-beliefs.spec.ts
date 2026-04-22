import { test, expect, type Page } from '@playwright/test';

const BELIEFS_URL = '/sobre';

// ── Helpers ────────────────────────────────────────────────────────────────────
const scrollToProgress = async (page: Page, progress: number) => {
  await page.evaluate((p) => {
    const section = document.querySelector('[data-testid="beliefs-section"]');
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const totalScrollable = section.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + totalScrollable * p,
      behavior: 'instant',
    });
  }, progress);
  await page.waitForTimeout(300);
};

// ── Testes ─────────────────────────────────────────────────────────────────────
test.describe('Seção 06 — O Que Me Move (AboutBeliefs)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });
    // Rola até a seção antes de cada teste
    await page.evaluate(() => {
      document
        .querySelector('[data-testid="beliefs-section"]')
        ?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
  });

  // ── Teste 01: Seção existe e tem min-h correto ──────────────────────────────
  test('01 — seção existe com data-testid e altura mínima', async ({
    page,
  }) => {
    const section = page.locator('[data-testid="beliefs-section"]');
    await expect(section).toBeVisible();
    const height = await section.evaluate(
      (el) => el.scrollHeight / window.innerHeight
    );
    expect(height).toBeGreaterThanOrEqual(3.5); // min 400vh aproximado
  });

  // ── Teste 02: Z-index — Ghost NÃO obstrui manifesto ────────────────────────
  test('02 — manifesto visível e acima do Ghost no clímax (z-index)', async ({
    page,
  }) => {
    await scrollToProgress(page, 0.9);

    // Manifesto deve estar presente no DOM
    const manifesto = page.locator('[aria-live="polite"]').first();
    await expect(manifesto).toBeAttached();

    // Ghost canvas não deve ter z-index maior que o manifesto
    const ghostZ = await page.evaluate(() => {
      const ghost = document.querySelector('.fixed.z-30');
      return ghost ? window.getComputedStyle(ghost).zIndex : '0';
    });
    const manifestoZ = await page.evaluate(() => {
      const el = document
        .querySelector('[aria-live="polite"]')
        ?.closest('.fixed');
      return el ? window.getComputedStyle(el).zIndex : '999';
    });

    expect(Number(ghostZ)).toBeLessThan(Number(manifestoZ));
  });

  // ── Teste 03: Background muda de cor com o scroll ──────────────────────────
  test('03 — background interpolação de cor entre frases', async ({ page }) => {
    // Cor no início (Deep Void)
    const colorStart = await page.evaluate(() => {
      const bg = document
        .querySelector('[data-testid="beliefs-section"]')
        ?.querySelector('.absolute.inset-0.z-0');
      return bg ? window.getComputedStyle(bg).backgroundColor : '';
    });

    await scrollToProgress(page, 0.3);

    // Cor no meio (alguma variação de azul/roxo/rosa)
    const colorMid = await page.evaluate(() => {
      const bg = document
        .querySelector('[data-testid="beliefs-section"]')
        ?.querySelector('.absolute.inset-0.z-0');
      return bg ? window.getComputedStyle(bg).backgroundColor : '';
    });

    // As duas cores devem ser diferentes
    expect(colorStart).not.toBe(colorMid);
    // A cor do meio não pode ser preto puro (#040013 = rgb(4, 0, 19))
    expect(colorMid).not.toBe('rgb(4, 0, 19)');
  });

  // ── Teste 04: Frases rotatórias aparecem ───────────────────────────────────
  test('04 — frases rotatórias visíveis durante scroll', async ({ page }) => {
    const PHRASES = [
      'Um vídeo que respira',
      'Uma marca que se reconhece',
      'Um detalhe que fica',
    ];

    for (const phrase of PHRASES) {
      await scrollToProgress(page, 0.2 + PHRASES.indexOf(phrase) * 0.15);
      // Pelo menos um texto matching deve estar no DOM (não necessariamente visível
      // se for desktop com opacity, mas deve estar attached)
      const count = await page
        .locator('[data-testid="beliefs-section"]')
        .locator(`text="${phrase}"`)
        .count();
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  test('texto volta ao estado inicial ao sair da viewport', async ({
    page,
  }) => {
    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });
    const section = page.locator('[data-testid="beliefs-section"]');
    await section.scrollIntoViewIfNeeded();

    const phrase = page
      .locator('[data-testid="beliefs-section"] .scroll-section p')
      .first();
    await expect(phrase).toBeAttached();

    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
    await page.waitForTimeout(300);

    const opacity = await phrase.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeLessThan(1);
  });

  test('background troca de cor quando nova scroll-section entra em view', async ({
    page,
  }) => {
    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document
        .querySelector('[data-testid="beliefs-section"]')
        ?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const getColor = async () =>
      page.evaluate(() => {
        const bg = document.querySelector(
          '[data-testid="beliefs-section"] .absolute.inset-0.z-0'
        );
        return bg ? getComputedStyle(bg).backgroundColor : '';
      });

    const start = await getColor();
    await scrollToProgress(page, 0.35);
    const next = await getColor();

    expect(next).not.toBe(start);
  });

  // ── Teste 05: prefers-reduced-motion desativa animações ────────────────────
  test('05 — reduced-motion: fallback estático sem transform', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload({ waitUntil: 'networkidle' });

    await page.evaluate(() => {
      document
        .querySelector('[data-testid="beliefs-section"]')
        ?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    // Nenhum elemento de conteúdo da seção deve ter transform com translateY > 0
    const hasTranslateY = await page.evaluate(() => {
      const section = document.querySelector('[data-testid="beliefs-section"]');
      if (!section) return false;
      const els = section.querySelectorAll('p, h1, h2, header');
      for (const el of els) {
        const t = window.getComputedStyle(el).transform;
        if (t && t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)') {
          return true;
        }
      }
      return false;
    });

    expect(hasTranslateY).toBe(false);
  });

  // ── Teste 06: GhostScene SSR-safe (sem hydration error) ────────────────────
  test('06 — sem erros de hydration no console', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });

    const hydrateErrors = consoleErrors.filter(
      (e) => e.includes('Hydration') || e.includes('hydrat')
    );
    expect(hydrateErrors).toHaveLength(0);
  });

  // ── Teste 07: Desktop viewport ─────────────────────────────────────────────
  test('07 — desktop: Ghost Canvas presente e fixo', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload({ waitUntil: 'networkidle' });

    await page.evaluate(() =>
      document
        .querySelector('[data-testid="beliefs-section"]')
        ?.scrollIntoView({ behavior: 'instant' })
    );

    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeAttached({ timeout: 8000 });

    const position = await page
      .locator('.fixed.z-30')
      .first()
      .evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  // ── Teste 08: Mobile viewport ──────────────────────────────────────────────
  test('08 — mobile mantém frases sequenciais em scroll-section', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    const sections = page.locator(
      '[data-testid="beliefs-section"] .scroll-section'
    );
    await expect(sections).toHaveCount(6);
  });

  test('climax desktop: manifesto dominante e branco', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });
    await scrollToProgress(page, 0.92);

    const manifesto = page.locator('[aria-live="polite"] p').first();
    await expect(manifesto).toBeVisible();

    const styles = await manifesto.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        color: computed.color,
        fontSize: parseFloat(computed.fontSize),
      };
    });

    expect(styles.color).toBe('rgb(255, 255, 255)');
    expect(styles.fontSize).toBeGreaterThan(120);
  });

  test('climax mobile: fundo azul dominante', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BELIEFS_URL, { waitUntil: 'networkidle' });
    await scrollToProgress(page, 0.92);

    const colorEnd = await page.evaluate(() => {
      const bg = document
        .querySelector('[data-testid="beliefs-section"]')
        ?.querySelector('.absolute.inset-0.z-0');
      return bg ? window.getComputedStyle(bg).backgroundColor : '';
    });

    const rgb = colorEnd.match(/\d+/g)?.map(Number) ?? [];
    expect(rgb.length).toBeGreaterThanOrEqual(3);
    expect(rgb[2]).toBeGreaterThan(220); // blue channel dominante
    expect(rgb[0]).toBeLessThan(80);
    expect(rgb[1]).toBeLessThan(100);
  });
});
