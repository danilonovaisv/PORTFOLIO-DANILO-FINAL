# About CODEX Audit Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir a implementação atual da seção "O Que Me Move" da página Sobre para fechar os gaps remanescentes do `docs/CODEX_AUDIT_FIX.md`.

**Architecture:** Manter a narrativa scroll-driven em `src/components/sobre/sections/beliefs`, separar o Canvas 3D em entrada client-only carregada dinamicamente, e preservar a camada textual com semântica acessível. A correção deve começar pelos contratos de teste e pelos fallbacks WebGL, depois ajustar hierarquia visual, reduced motion e responsividade.

**Tech Stack:** Next.js 16 App Router, React 19, Motion 12 (`motion/react`), React Three Fiber 9, Drei, Three.js, Tailwind CSS, Zustand, Jest, Playwright.

---

## Audit Summary

O documento `docs/CODEX_AUDIT_FIX.md` foi parcialmente implementado. A implementação atual já usa `useScroll`, `useTransform`, `useReducedMotion`, `frameloop="demand"`, DPR limitado e um `GhostErrorBoundary`, mas ainda existem divergências entre o plano, o DOM real e os testes.

Evidências executadas:

- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`
- Resultado: 8 passed, 6 failed.
- Falhas repetidas em `/o-que-me-move` e `/sobre`:
  - Ghost z-index esperado `70`, recebido `50`.
  - seletor `.belief-phrase span` não encontra frases.
  - mobile espera offset top ~160px no header, mas o header computa `top: 0px`.
- Console durante o teste:
  - `THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`
  - `unhandledRejection: Error: Error creating WebGL context with your selected attributes.`
  - aviso Motion: container de scroll precisa ter posição não estática para offset correto.

Context7 usado:

- Motion `/websites/motion_dev`: `useScroll` com `target` e `offset`, `useTransform`, `useInView`, e `useReducedMotion`. A documentação recomenda substituir MotionValues por valores estáticos em reduced motion para parallax/scroll effects.
- React Three Fiber `/pmndrs/react-three-fiber`: `frameloop="demand"`, `invalidate()`, DPR/performance regression, `useFrame`, `Suspense` e loading de GLTF.
- Next.js `/vercel/next.js/v16.2.2`: `next/dynamic` com `{ ssr: false }` para bibliotecas browser-only e split de Client Components.

## File Structure

- Modify: `test/e2e/about-beliefs.spec.ts`
  - Deve refletir o contrato real da seção e falhar pelos motivos corretos.
- Modify: `src/components/sobre/sections/beliefs/BeliefScrollText.tsx`
  - Responsável por frases scroll-driven, seletores estáveis e reduced motion de texto.
- Modify: `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
  - Responsável pela composição e z-index das camadas.
- Modify: `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
  - Responsável pelo z-index e semântica do manifesto final.
- Modify: `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
  - Responsável pelo offset mobile e semântica do título fixo.
- Create: `src/components/sobre/sections/beliefs/3d/GhostFallback.tsx`
  - Responsável por fallback estático reaproveitável para WebGL/GLB/loading.
- Create: `src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts`
  - Responsável por detectar se o browser consegue criar contexto WebGL antes do Canvas.
- Create: `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
  - Responsável por carregar `GhostCanvas` com `next/dynamic` e `ssr: false`.
- Modify: `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
  - Responsável apenas pela cena R3F depois da checagem de WebGL.
- Test: `test/e2e/about-beliefs.spec.ts`
  - Contratos de z-index, frases, reduced motion, mobile, fallback e ausência de erro WebGL não tratado.

## Findings

### P0-01: Falta fallback WebGL antes do Canvas

`GhostErrorBoundary` existe, mas o teste mostrou `unhandledRejection` quando o renderer falha ao criar contexto WebGL. Error Boundaries não são suficientes para esse tipo de falha de renderer/Promise.

Relevant files:

- `src/components/sobre/sections/beliefs/3d/GhostErrorBoundary.tsx:14`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx:195`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx:207`

### P0-02: Contrato de teste e DOM das frases estão desalinhados

O teste usa `[data-testid="beliefs-scroll-text"] .belief-phrase span`, mas `BeliefScrollText` renderiza `motion.div` sem `belief-phrase`. Isso deixa os testes de motion/reduced motion pouco confiáveis.

Relevant files:

- `test/e2e/about-beliefs.spec.ts:115`
- `test/e2e/about-beliefs.spec.ts:146`
- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx:116`

### P0-03: Reduced motion remove blur, mas ainda deixa transforms ativos nas frases

`BeliefScrollText` troca o filtro por `none`, mas continua usando `movement` em `x`/`y`. Depois que o seletor for corrigido, o teste de reduced motion deve falhar se o transform continuar ativo.

Relevant files:

- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx:96`
- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx:120`
- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx:121`

### P1-01: Z-index do Ghost não fecha com o contrato E2E

O teste espera Ghost acima do manifesto com z-index `70`, mas `BeliefsSection` e `GhostCanvas` usam `z-50`. O manifesto usa `z-40`, enquanto o teste espera `50`.

Relevant files:

- `test/e2e/about-beliefs.spec.ts:79`
- `src/components/sobre/sections/beliefs/BeliefsSection.tsx:87`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx:191`
- `src/components/sobre/sections/beliefs/BeliefManifesto.tsx:46`

### P1-02: Offset mobile está implementado no conteúdo, mas o teste mede o header

O código usa `pt-[14vh]` no conteúdo interno e mantém `motion.header` com `top-0`. O teste mede `getComputedStyle(header).top` e espera ~160px. O contrato precisa ser corrigido para medir o conteúdo visual ou o código precisa mover o offset para o header. A opção menos invasiva é manter o header sticky em `top-0` e testar o primeiro bloco visual.

Relevant files:

- `test/e2e/about-beliefs.spec.ts:176`
- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx:35`
- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx:41`

### P1-03: Canvas ainda não está em dynamic import client-only

`AboutBeliefs` é Client Component, mas `GhostCanvas` é importado diretamente em `BeliefsSection`. A documentação atual do Next.js recomenda `dynamic(..., { ssr: false })` para componentes browser-only.

Relevant files:

- `src/components/sobre/sections/beliefs/BeliefsSection.tsx:13`
- `src/components/sobre/sections/beliefs/BeliefsSection.tsx:89`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx:3`

## Task 1: Make E2E Contracts Match The Intended Behavior

**Files:**

- Modify: `test/e2e/about-beliefs.spec.ts`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Keep the current failing run as the red baseline**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium
```

Expected:

```text
6 failed
8 passed
```

The failures should include:

```text
Expected: 70
Received: 50
```

```text
locator('[data-testid="beliefs-scroll-text"] .belief-phrase span')
Received: undefined
```

```text
Expected: >= 160
Received: 0
```

- [ ] **Step 2: Update the phrase selector assertions**

Replace the phrase locator in both tests with a stable data-testid contract:

```ts
const phraseSpans = page.locator('[data-testid="belief-phrase"] span');
```

For the motion-normal test, use:

```ts
test('frases entram com blur e deslocamento em motion normal', async ({
  page,
}) => {
  await scrollToProgress(page, 0.28);

  await expect
    .poll(async () => {
      const styles = await page
        .locator('[data-testid="belief-phrase"]')
        .evaluateAll((elements) => {
          return elements.map((el) => {
            const computed = window.getComputedStyle(el);
            return {
              opacity: Number(computed.opacity),
              filter: computed.filter,
              transform: computed.transform,
            };
          });
        });

      return styles.some(
        (style) =>
          style.opacity > 0.5 &&
          style.filter !== 'none' &&
          style.transform !== 'none'
      );
    })
    .toBeTruthy();
});
```

For the reduced-motion test, use:

```ts
test('reduced motion preserva cor/opacidade e remove blur/offset', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoRoute(page, route);
  await scrollToProgress(page, 0.35);

  const hasReducedMotionViolation = await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-testid="belief-phrase"]');

    if (elements.length === 0) return true;

    for (const el of elements) {
      const style = window.getComputedStyle(el);
      if (style.filter !== 'none' && style.filter !== 'blur(0px)') {
        return true;
      }
      if (
        style.transform &&
        style.transform !== 'none' &&
        style.transform !== 'matrix(1, 0, 0, 1, 0, 0)'
      ) {
        return true;
      }
    }

    return false;
  });

  expect(hasReducedMotionViolation).toBe(false);
});
```

- [ ] **Step 3: Update the mobile header assertion**

Replace the computed `top` assertion on `[data-testid="beliefs-header"]` with a visual-offset assertion on a new child test id:

```ts
test('mobile posiciona header e texto conforme contrato', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoRoute(page, route);
  await scrollToProgress(page, 0.2);

  const headerContentTop = await page
    .locator('[data-testid="beliefs-header-content"]')
    .evaluate((el) => el.getBoundingClientRect().top);
  const phraseTextAlign = await page
    .locator('[data-testid="beliefs-scroll-text"]')
    .evaluate((el) => window.getComputedStyle(el).textAlign);

  expect(headerContentTop).toBeGreaterThanOrEqual(100);
  expect(headerContentTop).toBeLessThanOrEqual(160);
  expect(phraseTextAlign).toBe('center');
});
```

- [ ] **Step 4: Add a no-unhandled-WebGL-error assertion**

Add this test after the Canvas hydration test:

```ts
test('WebGL indisponível cai em fallback sem unhandled rejection', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await gotoRoute(page, route);

  await expect(
    page.locator('[data-testid="beliefs-ghost-scene"], [data-testid="ghost-fallback"]')
  ).toBeAttached({ timeout: 10000 });

  expect(
    errors.filter((message) =>
      message.includes('Error creating WebGL context')
    )
  ).toHaveLength(0);
});
```

- [ ] **Step 5: Run the updated test and verify it still fails for implementation reasons**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium
```

Expected:

```text
FAIL because production code does not yet expose data-testid="belief-phrase", data-testid="beliefs-header-content", z-[70], z-[50], or WebGL preflight fallback.
```

- [ ] **Step 6: Commit the test contract update**

```bash
git add test/e2e/about-beliefs.spec.ts
git commit -m "test: align about beliefs e2e contract"
```

## Task 2: Fix Phrase Selectors And Reduced Motion

**Files:**

- Modify: `src/components/sobre/sections/beliefs/BeliefScrollText.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Confirm the phrase tests fail**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "frases entram|reduced motion"
```

Expected:

```text
FAIL because data-testid="belief-phrase" is missing or transforms remain active in reduced motion.
```

- [ ] **Step 2: Add a stable phrase test id and disable movement under reduced motion**

In `BeliefScrollText.tsx`, change the `motion.div` return in `PhraseItem` to:

```tsx
return (
  <motion.div
    data-testid="belief-phrase"
    className="belief-phrase absolute flex flex-col pointer-events-none"
    style={{
      opacity,
      x: prefersReducedMotion ? 0 : isMobile ? movement : 0,
      y: prefersReducedMotion ? 0 : isMobile ? 0 : movement,
      filter,
      willChange: prefersReducedMotion ? 'opacity' : 'transform, opacity, filter',
    }}
  >
    <span className="text-[#0048ff] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-4 opacity-70">
      {phrase.title}
    </span>
    <span
      className="text-white font-display font-black leading-[0.95] tracking-tighter"
      style={{
        fontSize: isMobile
          ? 'clamp(2.2rem, 9vw, 3.5rem)'
          : 'clamp(3.5rem, 6vw, 8rem)',
      }}
    >
      {phrase.text}
    </span>
  </motion.div>
);
```

- [ ] **Step 3: Run the targeted phrase tests**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "frases entram|reduced motion"
```

Expected:

```text
PASS for phrase motion and reduced motion tests.
```

- [ ] **Step 4: Commit the phrase and reduced-motion fix**

```bash
git add src/components/sobre/sections/beliefs/BeliefScrollText.tsx
git commit -m "fix: stabilize beliefs phrase motion contract"
```

## Task 3: Fix Visual Layering Contract

**Files:**

- Modify: `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- Modify: `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- Modify: `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Confirm the z-index test fails**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "z-index"
```

Expected:

```text
FAIL with Expected: 70 Received: 50.
```

- [ ] **Step 2: Raise the Ghost layer wrapper**

In `BeliefsSection.tsx`, change:

```tsx
<div className="fixed inset-0 z-50 pointer-events-none">
```

to:

```tsx
<div className="fixed inset-0 z-[70] pointer-events-none">
```

- [ ] **Step 3: Raise the Ghost scene layer**

In `GhostCanvas.tsx`, change:

```tsx
className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-50 pointer-events-none"
```

to:

```tsx
className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
```

- [ ] **Step 4: Set manifesto to the expected layer**

In `BeliefManifesto.tsx`, change:

```tsx
className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
```

to:

```tsx
className="fixed inset-0 z-[50] flex items-center justify-center pointer-events-none"
```

- [ ] **Step 5: Run the z-index test**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "z-index"
```

Expected:

```text
PASS for both /o-que-me-move and /sobre.
```

- [ ] **Step 6: Commit the layering fix**

```bash
git add src/components/sobre/sections/beliefs/BeliefsSection.tsx src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx src/components/sobre/sections/beliefs/BeliefManifesto.tsx
git commit -m "fix: align beliefs ghost layer ordering"
```

## Task 4: Add WebGL Preflight And Static Fallback

**Files:**

- Create: `src/components/sobre/sections/beliefs/3d/GhostFallback.tsx`
- Create: `src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts`
- Modify: `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Confirm the WebGL fallback test fails**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "WebGL indisponível"
```

Expected:

```text
FAIL with Error creating WebGL context in console or pageerror.
```

- [ ] **Step 2: Create the fallback component**

Create `src/components/sobre/sections/beliefs/3d/GhostFallback.tsx`:

```tsx
'use client';

import Image from 'next/image';

interface GhostFallbackProps {
  mode?: 'loading' | 'static';
}

export function GhostFallback({ mode = 'static' }: GhostFallbackProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden pointer-events-none"
      data-testid="ghost-fallback"
      aria-hidden="true"
    >
      <div className="hidden md:block absolute right-0 top-0 w-full h-full opacity-60">
        <Image
          src="/site.assets/3d/fallback-ghost.jpg"
          alt=""
          fill
          className="object-contain object-right"
          sizes="100vw"
          priority={mode === 'static'}
        />
      </div>

      <div className="block md:hidden absolute left-0 top-[10vh] w-full h-[80vh] opacity-50">
        <Image
          src="/site.assets/3d/fallback-ghost-mobile.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="100vw"
          priority={mode === 'static'}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the WebGL availability hook**

Create `src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts`:

```ts
'use client';

import { useEffect, useState } from 'react';

export function useWebGLAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');

    try {
      const attributes: WebGLContextAttributes = {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      };

      const context =
        canvas.getContext('webgl2', attributes) ||
        canvas.getContext('webgl', attributes);

      setAvailable(Boolean(context));
    } catch {
      setAvailable(false);
    } finally {
      canvas.width = 1;
      canvas.height = 1;
    }
  }, []);

  return available;
}
```

- [ ] **Step 4: Gate the Canvas before renderer creation**

In `GhostCanvas.tsx`, import the fallback and hook:

```tsx
import { GhostFallback } from '@/components/sobre/sections/beliefs/3d/GhostFallback';
import { useWebGLAvailable } from '@/components/sobre/sections/beliefs/3d/useWebGLAvailable';
```

Then update the beginning of `GhostCanvas`:

```tsx
export function GhostCanvas({ scrollProgress }: GhostSceneProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const webGLAvailable = useWebGLAvailable();

  if (isMobile && prefersReducedMotion) return <GhostFallback />;
  if (webGLAvailable === null) return <GhostFallback mode="loading" />;
  if (!webGLAvailable) return <GhostFallback />;

  return (
    <div
      className="sticky md:top-0 top-[20vh] h-[100dvh] w-full z-[70] pointer-events-none"
      data-testid="beliefs-ghost-scene"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 35 }}
        frameloop="demand"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={<GhostFallback mode="loading" />}>
          <GhostModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 5: Run the fallback test**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "WebGL indisponível"
```

Expected:

```text
PASS without Error creating WebGL context in console/pageerror.
```

- [ ] **Step 6: Commit the WebGL fallback**

```bash
git add src/components/sobre/sections/beliefs/3d/GhostFallback.tsx src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx
git commit -m "fix: add beliefs ghost webgl fallback"
```

## Task 5: Load Ghost Canvas As Client-Only Dynamic Component

**Files:**

- Create: `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
- Modify: `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Confirm Canvas still passes hydration test before the split**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "Canvas R3F"
```

Expected:

```text
PASS, but the direct import still keeps GhostCanvas coupled to BeliefsSection.
```

- [ ] **Step 2: Create the dynamic client entrypoint**

Create `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`:

```tsx
'use client';

import dynamic from 'next/dynamic';
import type { MotionValue } from 'motion/react';
import { GhostFallback } from '@/components/sobre/sections/beliefs/3d/GhostFallback';

interface GhostCanvasClientProps {
  scrollProgress: MotionValue<number>;
}

const DynamicGhostCanvas = dynamic(
  () =>
    import('@/components/sobre/sections/beliefs/3d/GhostCanvas').then(
      (mod) => mod.GhostCanvas
    ),
  {
    ssr: false,
    loading: () => <GhostFallback mode="loading" />,
  }
);

export function GhostCanvasClient({ scrollProgress }: GhostCanvasClientProps) {
  return <DynamicGhostCanvas scrollProgress={scrollProgress} />;
}
```

- [ ] **Step 3: Replace the direct import in BeliefsSection**

In `BeliefsSection.tsx`, replace:

```tsx
import { GhostCanvas } from '@/components/sobre/sections/beliefs/3d/GhostCanvas';
```

with:

```tsx
import { GhostCanvasClient } from '@/components/sobre/sections/beliefs/3d/GhostCanvasClient';
```

Then replace:

```tsx
<GhostCanvas scrollProgress={scrollYProgress} />
```

with:

```tsx
<GhostCanvasClient scrollProgress={scrollYProgress} />
```

- [ ] **Step 4: Run the Canvas and fallback tests**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "Canvas R3F|WebGL indisponível"
```

Expected:

```text
PASS for hydration and fallback assertions.
```

- [ ] **Step 5: Commit the dynamic client split**

```bash
git add src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx src/components/sobre/sections/beliefs/BeliefsSection.tsx
git commit -m "perf: lazy load beliefs ghost canvas"
```

## Task 6: Align Mobile Header Contract

**Files:**

- Modify: `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`

- [ ] **Step 1: Confirm the mobile contract fails before markup update**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "mobile posiciona"
```

Expected:

```text
FAIL because data-testid="beliefs-header-content" is missing.
```

- [ ] **Step 2: Add a stable test id to the visual header content**

In `BeliefFixedHeader.tsx`, change:

```tsx
<div className="flex h-full items-start md:items-center justify-end pt-[14vh] md:pt-0">
```

to:

```tsx
<div
  className="flex h-full items-start md:items-center justify-end pt-[14vh] md:pt-0"
  data-testid="beliefs-header-content"
>
```

- [ ] **Step 3: Preserve reduced-motion static transform in MorphText**

Keep this existing style in `MorphText`:

```tsx
style={{
  filter,
  opacity,
  y: prefersReducedMotion ? 0 : y,
}}
```

Do not move the mobile offset from the child container to the sticky header. The header should stay `top-0`; the visual text offset belongs to the content block so sticky behavior remains stable.

- [ ] **Step 4: Run the mobile test**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "mobile posiciona"
```

Expected:

```text
PASS for both /o-que-me-move and /sobre.
```

- [ ] **Step 5: Commit the mobile header contract**

```bash
git add src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx
git commit -m "test: expose beliefs header visual offset"
```

## Task 7: Full Verification

**Files:**

- Verify: `test/e2e/about-beliefs.spec.ts`
- Verify: `src/components/sobre/sections/beliefs/*`
- Verify: `src/components/sobre/sections/beliefs/3d/*`

- [ ] **Step 1: Run the full targeted E2E suite**

Run:

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium
```

Expected:

```text
14 passed
```

- [ ] **Step 2: Run typecheck**

Run:

```bash
pnpm run typecheck
```

Expected:

```text
No TypeScript errors.
```

- [ ] **Step 3: Run lint on touched files**

Run:

```bash
pnpm exec eslint test/e2e/about-beliefs.spec.ts src/components/sobre/sections/beliefs/BeliefScrollText.tsx src/components/sobre/sections/beliefs/BeliefsSection.tsx src/components/sobre/sections/beliefs/BeliefManifesto.tsx src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx src/components/sobre/sections/beliefs/3d/GhostFallback.tsx src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 4: Run production build check if typecheck and E2E pass**

Run:

```bash
pnpm run build
```

Expected:

```text
Next.js build completes successfully.
```

- [ ] **Step 5: Commit final verification metadata if generated files are relevant**

If Playwright produces screenshots, traces, or videos under `test-results`, keep them out of the commit unless the project already tracks a specific report artifact.

Run:

```bash
git status --short
```

Expected:

```text
Only intentional source/test files are modified.
```

## Self-Review

Spec coverage:

- FP-01 reduced motion: covered by Task 2 and Task 6.
- FP-02 scroll-triggered Motion.dev: current implementation already uses `useScroll` with `target` and `offset`; verification remains in Task 7.
- FP-03 Accessible SplitText: not implemented because current code uses `MorphText`, not ReactBits `SplitText`. This plan preserves semantics and stable screen-reader text instead of adding GSAP.
- FP-04 layering phases: covered by Task 3 and existing opacity fade in `GhostCanvas`.
- FP-05 Ghost 3D optimization: covered by Task 4 and Task 5.
- FP-06 SSR/client split: covered by Task 5.
- FP-07 loading/error/fallback: covered by Task 4.
- FP-08 responsive contract: covered by Task 6 and E2E.
- FP-09 metadata/headings: current `src/app/sobre/page.tsx` already exports metadata and the section title remains an `h2`; no code change needed in this correction pass.

Placeholder scan:

- No placeholder tokens are present.
- Each code-changing task includes exact paths, code snippets, commands, and expected results.

Type consistency:

- `GhostCanvasClientProps` matches `GhostSceneProps` shape: `scrollProgress: MotionValue<number>`.
- `GhostFallback` props are limited to `mode?: 'loading' | 'static'`.
- Test ids are consistent: `belief-phrase`, `beliefs-header-content`, `ghost-fallback`.
