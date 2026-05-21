import { test, expect } from '@playwright/test';

const ROUTES = ['/sobre'] as const;

// Seletores legados do antigo scroll cinematico que não devem existir na nova versão
const legacySelectors = [
  '[data-testid="beliefs-ghost-scene"]',
  '[data-testid="beliefs-manifesto"]',
  '[data-testid="beliefs-fixed-header"]',
  '[data-testid="beliefs-background"]',
  '[data-belief-section]',
  '[data-belief-manifesto]',
] as const;

const PHRASES = [
  { line1: 'Crio o que a marca diz', line2: 'antes mesmo de falar.' },
  { line1: 'Transformo intenção', line2: 'em presença.' },
  { line1: 'Entre estética e estratégia,', line2: 'eu construo percepção.' },
  { line1: 'O que fica não é só a imagem.', line2: 'É a sensação de marca.' },
] as const;

for (const route of ROUTES) {
  test.describe(`O Que Me Move final redesign — ${route}`, () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('monta a nova arquitetura do Manifesto sem elementos legados', async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible({ timeout: 15000 });

      // O novo Manifesto possui um container para os dots tácteis de navegação
      const dots = section.locator('button[aria-label^="Ver manifesto"]');
      await expect(dots).toHaveCount(PHRASES.length);

      // Garante que o WebGL Shader local está presente e montado
      const shaderContainer = section.locator(
        '[data-testid="shader-lines-canvas"]'
      );
      await expect(shaderContainer).toBeAttached();
      await expect(shaderContainer.locator('canvas')).toHaveCount(1);

      // Verifica que as classes dos caracteres animados estão presentes no DOM
      const chars = section.locator('.char');
      await expect(chars.first()).toBeAttached();

      // Garante que seletores da estrutura legada de scroll/GSAP foram 100% removidos
      for (const selector of legacySelectors) {
        await expect(page.locator(selector)).toHaveCount(0);
      }
    });

    test('permite navegar entre as frases interativamente via dots', async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible({ timeout: 15000 });

      const liveRegion = section.locator('#manifesto-phrase-live');
      await expect(liveRegion).toBeAttached();

      // Verifica se a primeira frase é exibida de forma acessível inicialmente
      await expect(liveRegion).toHaveText(
        `${PHRASES[0].line1} ${PHRASES[0].line2}`
      );

      // Clica no segundo dot para navegar manualmente (com retry simples para aguardar a hidratação do React)
      const secondDot = section.locator('button[aria-label="Ver manifesto 2"]');
      for (let i = 0; i < 3; i++) {
        await secondDot.click();
        try {
          await expect(liveRegion).toHaveText(
            `${PHRASES[1].line1} ${PHRASES[1].line2}`,
            { timeout: 1500 }
          );
          break;
        } catch (e) {
          if (i === 2) throw e;
          await page.waitForTimeout(500);
        }
      }

      // Clica no quarto dot
      const fourthDot = section.locator('button[aria-label="Ver manifesto 4"]');
      for (let i = 0; i < 3; i++) {
        await fourthDot.click();
        try {
          await expect(liveRegion).toHaveText(
            `${PHRASES[3].line1} ${PHRASES[3].line2}`,
            { timeout: 1500 }
          );
          break;
        } catch (e) {
          if (i === 2) throw e;
          await page.waitForTimeout(500);
        }
      }
    });

    test('preserva acessibilidade WCAG/WAI-ARIA para leitores de tela', async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible({ timeout: 15000 });

      // Região live com aria-live="polite" para atualizar o leitor de tela sem interrompê-lo
      const liveRegion = section.locator('#manifesto-phrase-live');
      await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      await expect(liveRegion).toHaveAttribute('aria-atomic', 'true');

      // Cabeçalho da seção é acessível apenas para screen readers (sr-only)
      const h2 = section.locator('h2#manifesto-section-title');
      await expect(h2).toHaveText('O que me move');
      await expect(h2).toHaveClass(/sr-only/);
    });

    test('não quebra o carregamento de interface se o WebGL falhar ou for desabilitado', async ({
      page,
    }) => {
      // Mock do WebGL para simular ausência de suporte no hardware/navegador
      await page.addInitScript(() => {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;

        HTMLCanvasElement.prototype.getContext = function getContext(
          this: HTMLCanvasElement,
          type,
          ...args
        ) {
          if (
            type === 'webgl' ||
            type === 'webgl2' ||
            type === 'experimental-webgl'
          ) {
            return null;
          }
          return originalGetContext.call(this, type, ...args) as ReturnType<
            typeof originalGetContext
          >;
        } as typeof HTMLCanvasElement.prototype.getContext;
      });

      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const section = page.locator('[data-testid="beliefs-section"]');
      await expect(section).toBeVisible({ timeout: 15000 });

      // Se o WebGL falhar, o container do shader e o restante da UI devem continuar estáveis
      const liveRegion = section.locator('#manifesto-phrase-live');
      await expect(liveRegion).toHaveText(
        `${PHRASES[0].line1} ${PHRASES[0].line2}`
      );

      // Garante que nenhum erro fatal de WebGL travou a página do cliente
      expect(
        errors.filter(
          (message) =>
            message.toLowerCase().includes('webgl') ||
            message.toLowerCase().includes('shader')
        )
      ).toHaveLength(0);
    });
  });
}
