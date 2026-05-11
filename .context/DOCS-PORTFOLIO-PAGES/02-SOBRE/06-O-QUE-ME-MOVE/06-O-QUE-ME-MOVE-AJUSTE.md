# 06-O-QUE-ME-MOVE Ajuste Atual

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realinhar a seção `06-O-QUE-ME-MOVE` da página `/sobre` às referências Desk/Mobile aprovadas, com `GSAP + ScrollTrigger` como motor oficial do DOM e `R3F` restrito ao `GhostScene`.

**Architecture:** `AboutBeliefs` continua como client boundary que só orquestra scroll, camadas e Suspense. `BeliefBackground`, `BeliefOverlay`, `BeliefFixedHeader`, `BeliefScrollText` e `BeliefManifesto` passam a ser dirigidos por `GSAP + ScrollTrigger`; `GhostScene` fica isolado em `R3F` com `frameloop="demand"`, fallback imediato e coreografia distinta para desktop/mobile.

**Tech Stack:** Next.js 16 App Router em `src/app`, React 19, TypeScript, Tailwind 4, GSAP ScrollTrigger, Framer Motion apenas como utilitário residual, React Three Fiber, Drei, Playwright.

---

## Execution status

- Base implementation executed on `2026-05-11`.
- Verified locally with:
  - `eslint`
  - `tsc --noEmit`
  - `pnpm run build`
  - direct browser probes on `/sobre` for initial render, manifesto reveal, final deep-void state, and reduced-motion behavior
- Playwright repo spec was updated, but stock `playwright.config.ts` validation stayed environment-blocked earlier in this turn by competing local dev-server state and by standalone `_next/static/*` 404s when forcing `pnpm start`.

## Verificação atual

### Arquitetura real do repo

- Rota usa `src/app/sobre/*`, não `app/sobre/*`.
- Seção já existe em `src/components/sobre/sections/AboutBeliefs.tsx`.
- Camadas atuais existem, mas contrato novo não está implementado.
- `loading.tsx`, `error.tsx` e `not-found.tsx` já existem e estão próximos do estado desejado.

### Gaps confirmados contra requisito novo

1. `BeliefBackground.tsx` hoje usa `useTransform(scrollYProgress, ...)` contínuo.
   Requisito novo pede `animate() + inView()` por `.belief-scroll-section[data-index]`, sem `transition: background-color`.
2. `BeliefFixedHeader.tsx` hoje anima por caractere e com texto errado (`O que me move`).
   Requisito novo pede duas linhas editoriais, split por palavras/linhas, entrada pela direita.
3. `BeliefScrollText.tsx` hoje renderiza todas frases empilhadas no mesmo viewport fixo.
   Requisito novo pede seis seções narrativas com `h-[80vh]`, `.belief-scroll-section`, `data-index`, e layout diferente desktop/mobile.
4. `BeliefManifesto.tsx` hoje usa stagger por palavra com timings antigos.
   Requisito novo pede entrada global entre `0.82 → 0.92`, bloco central, `aria-live="polite"` só quando ativo, e Ghost acima de `GHOST`.
5. `GhostScene.tsx` e `GhostModel.tsx` hoje seguem coreografia antiga:
   - usam stencil mask
   - sem cursor parallax desktop
   - sem clímax com `scale +10%`
   - sem preflight claro de WebGL antes de `<Canvas>`
6. `src/config/beliefTokens.ts` e `src/components/sobre/beliefs/belief.constants.ts` divergem entre si.
   Hoje existem duas fontes de verdade para frases, paleta, z-index e thresholds.
7. `BeliefsScrollContext.tsx` expõe contrato antigo; `useBeliefsScroll.ts` e `SplitTextMotion.tsx` ainda não existem.
8. SSOT atual desta pasta congelava versão anterior:
   - fundo final azul
   - sem cursor parallax
   - sem scale no Ghost
   - split por chars
   Isso contradiz requisito recebido hoje.

### Decisões travadas neste plano

- Não usar GSAP runtime nesta seção.
  GSAP skills servem aqui só como referência de boas práticas de scroll/split; implementação continua em Motion + R3F, como exigido.
- `src/app` é caminho canônico para rota e estados.
- `src/config/beliefTokens.ts` vira fonte única de texto, paleta, z-index, motion e layout.
- `src/components/sobre/beliefs/belief.constants.ts` deve ser removido ou reduzido a bridge temporária durante migração, nunca seguir como SSOT paralela.
- Contratos de teste já existentes devem ser preservados onde ainda fizer sentido:
  - `data-testid="beliefs-scroll-text"`
  - `data-testid="belief-phrase"`
  - `data-testid="ghost-fallback"`
  - `.belief-scroll-section[data-index]`

## File map

### Modify

- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefsScrollContext.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/components/sobre/3d/GhostModel.tsx`
- `src/components/sobre/3d/GhostSceneFallback.tsx`
- `src/config/beliefTokens.ts`
- `src/types/beliefs.ts`
- `src/app/sobre/page.tsx`
- `src/app/sobre/loading.tsx`
- `src/app/sobre/error.tsx`
- `src/app/sobre/not-found.tsx`

### Create

- `src/components/sobre/beliefs/SplitTextMotion.tsx`
- `src/hooks/useBeliefsScroll.ts`

### Optional cleanup after implementation proof

- `src/components/sobre/beliefs/belief.constants.ts`
- `src/store/beliefStore.ts`

## Task 1: Consolidar SSOT de tokens e contrato

**Files:**
- Modify: `src/config/beliefTokens.ts`
- Modify: `src/types/beliefs.ts`
- Optional cleanup: `src/components/sobre/beliefs/belief.constants.ts`

- [ ] **Step 1: Unificar tokens textuais, visuais e de layout**

Definir em `src/config/beliefTokens.ts` apenas exports canônicos:

```ts
export const beliefColors = {
  deepVoid: '#040013',
  bluePrimary: '#0048ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  blueAccent: '#4fe6ff',
  white: '#ffffff',
} as const;

export const BELIEF_BACKGROUND_STOPS = [
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013',
] as const;

export const BELIEF_HEADER_LINES = [
  'Acredito no design que muda o dia de alguém.',
  'Não pelo choque, mas pela conexão.',
] as const;

export const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

export const BELIEF_MANIFESTO_LINES = ['ISSO É', 'GHOST', 'DESIGN'] as const;

export const beliefZIndex = {
  background: 0,
  overlay: 10,
  fixedHeader: 30,
  scrollText: 40,
  manifesto: 50,
  ghost: 70,
} as const;

export const beliefMotion = {
  ambientEase: [0.17, 0.55, 0.55, 1],
  ghostEase: [0.22, 1, 0.36, 1],
  softEase: [0.16, 1, 0.3, 1],
  microDuration: 0.16,
  revealDuration: 0.9,
  exitDuration: 0.5,
  ghostIntroDuration: 1.2,
  wordStagger: 0.08,
} as const;

export const beliefLayout = {
  sectionMinHeight: '620vh',
  phraseSectionHeight: '80vh',
  desktopPhraseMaxWidth: '38vw',
  desktopPhraseLeft: 'clamp(1.5rem, 6vw, 6rem)',
  mobilePhraseBottom: '20vh',
} as const;
```

- [ ] **Step 2: Tipar frases e contexto novo**

Atualizar `src/types/beliefs.ts` para algo pequeno e direto:

```ts
export type BeliefPhrase = {
  id: string;
  text: string;
  backgroundStopIndex: number;
};

export type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};
```

- [ ] **Step 3: Remover duplicidade de constantes**

Trocar imports que hoje leem `belief.constants.ts` para `@/config/beliefTokens`. Se `belief.constants.ts` ainda for necessário no meio da migração, deixá-lo só como re-export temporário:

```ts
export {
  BELIEF_BACKGROUND_STOPS,
  BELIEF_HEADER_LINES,
  BELIEF_PHRASES,
  BELIEF_MANIFESTO_LINES,
  beliefMotion,
  beliefLayout,
  beliefZIndex,
} from '@/config/beliefTokens';
```

- [ ] **Step 4: Verificação**

Run: `pnpm exec tsc --noEmit`
Expected: PASS sem conflitos de tipo entre tokens, frases e contexto.

- [ ] **Step 5: Commit**

```bash
git add src/config/beliefTokens.ts src/types/beliefs.ts src/components/sobre/beliefs/belief.constants.ts
git commit -m "refactor: unify beliefs tokens and types"
```

## Task 2: Recriar contrato central de scroll e orquestração

**Files:**
- Create: `src/hooks/useBeliefsScroll.ts`
- Modify: `src/components/sobre/beliefs/BeliefsScrollContext.tsx`
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx`

- [ ] **Step 1: Criar hook único de scroll**

Criar `src/hooks/useBeliefsScroll.ts`:

```ts
'use client';

import { RefObject } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
```

- [ ] **Step 2: Simplificar provider**

Atualizar `BeliefsScrollContext.tsx` para só expor contrato novo:

```ts
type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};
```

Remover do context:

- `sectionRef`
- `activePhraseIndex`
- `isClimax`
- `thresholds`
- `prefersReducedMotion`

- [ ] **Step 3: Reestruturar AboutBeliefs**

Atualizar `AboutBeliefs.tsx` para:

```tsx
'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { beliefLayout } from '@/config/beliefTokens';

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((mod) => mod.GhostScene),
  { ssr: false }
);

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider
      value={{
        containerRef,
        scrollYProgress: scroll.scrollYProgress,
        isMobile: scroll.isMobile,
        shouldReduceMotion: scroll.shouldReduceMotion,
      }}
    >
      <section
        ref={containerRef}
        id="o-que-me-move"
        aria-labelledby="o-que-me-move-title"
        className="relative overflow-clip bg-[#040013] text-white"
        style={{ minHeight: beliefLayout.sectionMinHeight }}
      >
        <h2 id="o-que-me-move-title" className="sr-only">
          O que me move
        </h2>

        <BeliefBackground />
        <BeliefOverlay />

        <div className="sticky top-0 h-dvh">
          <BeliefFixedHeader />

          <GhostErrorBoundary fallback={<GhostSceneFallback />}>
            <Suspense fallback={<GhostSceneFallback />}>
              <GhostScene />
            </Suspense>
          </GhostErrorBoundary>

          <BeliefManifesto />
        </div>

        <BeliefScrollText />
      </section>
    </BeliefsScrollProvider>
  );
}
```

- [ ] **Step 4: Verificação**

Run: `pnpm exec eslint src/components/sobre/sections/AboutBeliefs.tsx src/components/sobre/beliefs/BeliefsScrollContext.tsx src/hooks/useBeliefsScroll.ts`
Expected: PASS sem hooks anti-pattern e sem referências mortas.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useBeliefsScroll.ts src/components/sobre/beliefs/BeliefsScrollContext.tsx src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "refactor: centralize beliefs scroll contract"
```

## Task 3: Reimplementar camadas DOM com contrato novo

**Files:**
- Create: `src/components/sobre/beliefs/SplitTextMotion.tsx`
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`
- Modify: `src/components/sobre/beliefs/BeliefOverlay.tsx`
- Modify: `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- Modify: `src/components/sobre/beliefs/BeliefScrollText.tsx`
- Modify: `src/components/sobre/beliefs/BeliefManifesto.tsx`

- [ ] **Step 1: Criar utilitário local de split**

Criar `SplitTextMotion.tsx` com split por `words` e `chars`, mantendo acessibilidade:

```tsx
'use client';

import { motion } from 'motion/react';
import type { ElementType } from 'react';
import { beliefMotion } from '@/config/beliefTokens';

type SplitTextMotionProps<T extends ElementType = 'span'> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  active?: boolean;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  text,
  as,
  mode = 'words',
  active = true,
  className,
  stagger = beliefMotion.wordStagger,
  delay = 0,
}: SplitTextMotionProps<T>) {
  const Component = motion(as ?? 'span');
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component
      className={className}
      aria-label={text}
      initial={false}
      animate={active ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.42, ease: beliefMotion.softEase }}
        >
          {unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </Component>
  );
}
```

- [ ] **Step 2: Reescrever background por `animate() + inView()`**

`BeliefBackground.tsx` deve observar `.belief-scroll-section` e animar cor do próprio layer:

```tsx
'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import { BELIEF_BACKGROUND_STOPS, beliefMotion } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    const stop = inView(
      '.belief-scroll-section',
      (element) => {
        const index = Number.parseInt(element.getAttribute('data-index') ?? '0', 10);
        const color = BELIEF_BACKGROUND_STOPS[Math.min(index + 1, BELIEF_BACKGROUND_STOPS.length - 1)];

        if (shouldReduceMotion) {
          ref.current!.style.backgroundColor = color;
          return;
        }

        animate(
          ref.current!,
          { backgroundColor: color },
          { duration: beliefMotion.revealDuration, ease: beliefMotion.ambientEase }
        );
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return <div ref={ref} aria-hidden="true" className="absolute inset-0 z-0 bg-[#040013]" />;
}
```

- [ ] **Step 3: Reescrever overlay anti-banding**

`BeliefOverlay.tsx` deve usar apenas `scrollYProgress -> opacity`:

```tsx
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);
```

Container:

```tsx
<motion.div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-10 bg-black"
  style={{ opacity: shouldReduceMotion ? 0.06 : opacity }}
/>
```

- [ ] **Step 4: Reescrever header**

`BeliefFixedHeader.tsx` deve:

- usar `BELIEF_HEADER_LINES`
- ficar à direita no desktop
- `top-[20vh]` no mobile
- entrar por `opacity + x`
- usar `SplitTextMotion` por palavras, não por chars

Estrutura alvo:

```tsx
<aside className="pointer-events-none absolute inset-y-0 right-0 z-30 flex w-full items-start justify-end px-6 pt-[20vh] md:items-center md:px-12 lg:px-16">
  <motion.div
    className="max-w-sm text-right"
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.8, ease: beliefMotion.ghostEase }}
  >
    {BELIEF_HEADER_LINES.map((line, index) => (
      <SplitTextMotion
        key={line}
        as="p"
        text={line}
        mode="words"
        stagger={0.08}
        delay={index * 0.08}
        className="text-sm uppercase tracking-[0.08em] text-white/78"
      />
    ))}
  </motion.div>
</aside>
```

- [ ] **Step 5: Reescrever frases como seções narrativas reais**

`BeliefScrollText.tsx` deve renderizar 6 blocos com `h-[80vh]`, `.belief-scroll-section`, `data-index`, e frase fixa por viewport.

Contrato mínimo:

```tsx
{BELIEF_PHRASES.map((phrase, index) => (
  <section
    key={phrase}
    className="belief-scroll-section relative h-[80vh]"
    data-index={index}
  >
    <motion.h3
      data-testid="belief-phrase"
      data-animation-contract="viewport-x-opacity"
      className="pointer-events-none sticky top-0 flex h-dvh items-center px-6 md:px-12 lg:px-16"
    >
      <span className="max-w-[38vw] text-[#4fe6ff] italic md:text-left">
        {phrase}
      </span>
    </motion.h3>
  </section>
))}
```

Desktop:

- frase à esquerda
- centro vertical
- nunca no rodapé

Mobile:

- centralizada horizontalmente
- próxima de `20vh` do rodapé

- [ ] **Step 6: Reescrever manifesto**

`BeliefManifesto.tsx` deve revelar bloco fixo só no clímax:

```tsx
const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);
const isActive = useMotionValueEvent ? false : false;
```

Estrutura alvo:

```tsx
<motion.div
  className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-6"
  style={{ opacity, y }}
  aria-live={active ? 'polite' : 'off'}
>
  <div className="text-center font-display text-[clamp(3.5rem,16vw,12rem)] font-black uppercase leading-[0.82] tracking-[0.03em] text-white">
    {BELIEF_MANIFESTO_LINES.map((line, index) => (
      <SplitTextMotion
        key={line}
        as="div"
        text={line}
        mode="words"
        active={active}
        stagger={0.06}
        delay={index * 0.05}
        className="block"
      />
    ))}
  </div>
</motion.div>
```

- [ ] **Step 7: Verificação**

Run:

```bash
pnpm exec eslint src/components/sobre/beliefs/*.tsx
pnpm exec tsc --noEmit
```

Expected:

- PASS
- sem `framer-motion` imports legados nessas camadas
- sem dependência de `belief.constants.ts`

- [ ] **Step 8: Commit**

```bash
git add src/components/sobre/beliefs/*.tsx
git commit -m "feat: rebuild beliefs dom layers"
```

## Task 4: Reescrever Ghost 3D para contrato desktop/mobile

**Files:**
- Modify: `src/components/sobre/3d/GhostScene.tsx`
- Modify: `src/components/sobre/3d/GhostModel.tsx`
- Modify: `src/components/sobre/3d/GhostSceneFallback.tsx`
- Keep: `src/components/sobre/3d/GhostErrorBoundary.tsx`
- Use existing helper: `src/lib/supabase/storage.ts` or helper atual de asset público
- Use existing hook: `src/hooks/usePointerParallax.ts`

- [ ] **Step 1: Eliminar stencil-mask e alinhar wrapper DOM**

`GhostScene.tsx` deve ser wrapper visual puro:

- `fixed` ou `absolute inset-0`
- `z-[70]`
- `pointer-events-none`
- intro `opacity 0→1`, `scale 0.95→1`
- `Canvas` com `frameloop="demand"`
- `dpr={[1, isMobile ? 1 : 2]}`

Estrutura alvo:

```tsx
<motion.div
  className="pointer-events-none fixed inset-0 z-[70]"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: beliefMotion.ghostEase }}
>
  <Canvas
    frameloop="demand"
    dpr={[1, isMobile ? 1 : 2]}
    camera={{ position: isMobile ? [0, 0, 7] : [0, 0, 6], fov: 35 }}
  >
    <GhostModel />
  </Canvas>
</motion.div>
```

- [ ] **Step 2: Adicionar preflight de WebGL**

Antes de montar `<Canvas>`, validar suporte e cair em fallback cedo:

```tsx
const [canRenderWebGL, setCanRenderWebGL] = useState(false);

useEffect(() => {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  setCanRenderWebGL(Boolean(gl));
}, []);

if (!canRenderWebGL) {
  return <GhostSceneFallback />;
}
```

- [ ] **Step 3: Aplicar parallax desktop + clímax mobile**

`GhostModel.tsx` deve:

- resolver asset por `getAssetUrl('site-assets/3d/ghost-v1.glb')`
- desktop: cursor normalizado `-1..1 -> ±0.4` world units
- mobile: base `x=-1.2`, `y=1.5`
- clímax `p > 0.85`: mover para `0,0` e `scale *= 1.1`
- reduced motion: sem floating contínuo, sem cursor parallax

Pseudo-contrato:

```ts
const pointerX = isMobile || shouldReduceMotion ? 0 : springX.get() * 0.4;
const pointerY = isMobile || shouldReduceMotion ? 0 : springY.get() * 0.4;

const climax = p > 0.85;
const targetX = isMobile
  ? climax ? 0 : -1.2
  : pointerX;
const targetY = isMobile
  ? climax ? 0 : 1.5
  : pointerY + floatY;
const targetScale = climax ? 1.1 : 1;
```

- [ ] **Step 4: Invalidate só quando scroll ou cursor mudarem**

Hoje existe invalidator por RAF. Reescrever para invalidar quando `scrollYProgress` ou `springX/springY` mudarem, sem polling contínuo.

Direção:

```ts
useMotionValueEvent(scrollYProgress, 'change', () => invalidate());
useMotionValueEvent(pointerX, 'change', () => invalidate());
useMotionValueEvent(pointerY, 'change', () => invalidate());
```

- [ ] **Step 5: Ajustar fallback**

`GhostSceneFallback.tsx` deve ficar compatível com clímax editorial, sem SVG pesado animado por demais:

```tsx
export function GhostSceneFallback() {
  return (
    <div
      aria-hidden="true"
      data-testid="ghost-fallback"
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
```

- [ ] **Step 6: Verificação**

Run:

```bash
pnpm exec eslint src/components/sobre/3d/*.tsx src/hooks/usePointerParallax.ts
pnpm exec tsc --noEmit
pnpm run build
```

Expected:

- PASS
- sem erro de `window is not defined`
- sem erro de preload SSR

- [ ] **Step 7: Commit**

```bash
git add src/components/sobre/3d/*.tsx src/hooks/usePointerParallax.ts
git commit -m "feat: rebuild ghost scene narrative behavior"
```

## Task 5: Ajustar estados de rota e limpeza final

**Files:**
- Verify/modify: `src/app/sobre/page.tsx`
- Verify/modify: `src/app/sobre/loading.tsx`
- Verify/modify: `src/app/sobre/error.tsx`
- Verify/modify: `src/app/sobre/not-found.tsx`
- Optional cleanup: `src/store/beliefStore.ts`

- [ ] **Step 1: Garantir composição da rota**

`src/app/sobre/page.tsx` já está quase certo. Só confirmar:

- `AboutBeliefs` continua importado normalmente
- `SectionErrorBoundary` mantém fallback visual compatível
- nenhum wrapper `std-grid` engole seção full-bleed

- [ ] **Step 2: Validar loading/error/not-found**

Estados já existem. Ajustar só se necessário para manter identidade dark do novo contrato:

```tsx
<main className="min-h-dvh bg-[#040013] text-white">...</main>
```

- [ ] **Step 3: Limpar bridge legada**

Se, após migração, `src/store/beliefStore.ts` não for mais usado por nenhum import:

Run: `rg -n "useBeliefStore|beliefStore" src`
Expected: zero hits antes de remover.

- [ ] **Step 4: Verificação**

Run:

```bash
pnpm exec eslint src/app/sobre/*.tsx
pnpm exec tsc --noEmit
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/sobre/page.tsx src/app/sobre/loading.tsx src/app/sobre/error.tsx src/app/sobre/not-found.tsx src/store/beliefStore.ts
git commit -m "chore: align about route states with beliefs rebuild"
```

## Task 6: QA visual, acessibilidade e performance

**Files:**
- Test: `test/e2e/about-beliefs.spec.ts` or nearest current Playwright spec
- Verify: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
- Verify: `.context/active_state.md`

- [ ] **Step 1: Static verification**

Run:

```bash
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
```

Expected: PASS em todos.

- [ ] **Step 2: Browser verification**

Verificar manualmente ou via Playwright:

1. Desktop `/sobre`
2. Mobile `/sobre`
3. Direct route/anchor se existir para seção

Checklist:

- seção full-bleed, sem `.std-grid` no wrapper principal
- header sticky estável à direita no desktop
- frase ciano centralizada à esquerda no desktop
- frase nunca cai no rodapé desktop
- mobile com header em `top 20vh`
- Ghost sem cursor reaction no mobile
- Ghost reage suave ao cursor no desktop
- Ghost centraliza e escala no clímax
- manifesto central entra após `scrollYProgress >= 0.82`
- Ghost fica visualmente acima de `GHOST`
- fundo retorna a `#040013` no final
- reduced motion corta blur/floating/stagger agressivo

- [ ] **Step 3: Testes E2E mínimos**

Adicionar/ajustar asserts para:

```ts
await expect(page.getByTestId('beliefs-scroll-text')).toBeVisible();
await expect(page.getByTestId('belief-phrase').first()).toBeVisible();
await expect(page.getByTestId('ghost-fallback')).toHaveCount(0);
```

Se WebGL indisponível em ambiente CI:

```ts
await expect(page.getByTestId('ghost-fallback')).toBeVisible();
```

- [ ] **Step 4: Sync de docs espelho**

Depois da implementação aprovada, sincronizar:

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
- `.context/active_state.md`

Sem isso, código e SSOT voltam a divergir.

- [ ] **Step 5: Commit**

```bash
git add test/e2e/about-beliefs.spec.ts .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md .context/active_state.md
git commit -m "test: verify beliefs cinematic narrative"
```

## Riscos reais

1. `filter: blur()` nas frases pode custar caro em mobile fraco.
   Mitigação: desligar blur em `shouldReduceMotion` e considerar fallback sem blur abaixo de breakpoint/perf flag.
2. `frameloop="demand"` com invalidation ruim pode matar suavidade ou gerar RAF escondido.
   Mitigação: invalidar por `MotionValue` change, não por loop permanente.
3. Dual source of truth entre `beliefTokens.ts` e `belief.constants.ts` pode reintroduzir regressão.
   Mitigação: matar duplicidade cedo, Task 1.
4. Sticky + fixed + transform podem criar stacking context falso.
   Mitigação: validar z-index real em DevTools com manifesto e Ghost no clímax.
5. Seção é full-bleed fora de `.std-grid`.
   Isso é decisão correta aqui, mas precisa ficar restrita ao wrapper desta seção para não contaminar layout da página.

## Fora de escopo neste ciclo

- Migrar CMS/Supabase para alimentar frases dinamicamente.
- Adicionar post-processing no WebGL.
- Reescrever outras seções de `/sobre`.
- Introduzir GSAP runtime nesta seção.

## Resultado esperado após implementação

- Seção full-bleed, independente de `.std-grid`
- Background troca por `animate() + inView()`
- Header editorial sticky à direita com split por palavras
- Frases rotativas em ciano, esquerda no desktop, rodapé controlado no mobile
- Manifesto central `ISSO É / GHOST / DESIGN`
- Ghost acima de tudo em `z-[70]`, com parallax desktop e clímax mobile
- Fallback WebGL limpo
- Motion reduzido respeitado

## Aprovação de execução

Plano pronto. Próximo passo correto: implementação em lotes pequenos, nesta ordem:

1. tokens + contexto
2. camadas DOM
3. Ghost 3D
4. QA + sync `.context`

Se quiser, próximo comando pode ser só: `APROVADO`.
