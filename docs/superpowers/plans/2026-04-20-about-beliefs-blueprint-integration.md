# About Beliefs — Blueprint Integration (Seção 06 "O Que Me Move")

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir integralmente a implementação atual da Seção 06 "O Que Me Move" pelo blueprint reconciliado (9 arquivos, seções 3.1–3.9 do documento canônico), preservando as correções dos audits 2026-04-16 e 2026-02-22 e mantendo a suíte Playwright verde.

**Architecture:** Hook único `useBeliefsScroll` expõe `scrollYProgress`/`isMobile`/`prefersReducedMotion`. Orquestrador `AboutBeliefs` empilha 7 camadas (`z-0`→`z-50`): `BeliefBackground` (cor HSL via `useTransform`), `BeliefOverlay` (cross-fade anti-banding), `BeliefFixedHeader` (sticky), `BeliefScrollText` (frases rotatórias — desktop empilhado / mobile `AnimatePresence`), `GhostScene` (R3F `frameloop="demand"`, `z-30`), `BeliefManifesto` (clímax em `z-50`, acima do Ghost). Todo scroll-driven via `useTransform` — **sem `animate()` imperativo**.

**Tech Stack:** Next.js 16 (App Router, `dynamic` + `ssr:false`), React 19, Framer Motion (`motion/react`), React Three Fiber 9 + drei, TypeScript 6, Tailwind 4, Playwright, pnpm.

**Fonte canônica do código:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` (seções 3.1 a 3.9). Copiar verbatim — **exceção na Task 7** (fix obrigatório para Rules of Hooks).

---

## Pré-voo — Decisões travadas antes da execução

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Branch | `feat/section-06-blueprint-integration` | Diretiva 2.2 do blueprint |
| Rules-of-Hooks violation em `BeliefScrollText` (seção 3.6) | Refatorar em subcomponente `BeliefScrollPhrase` | `useTransform` dentro de `.map()` = anti-pattern React; quebra em hot reload e viola ESLint |
| Divergência de `data-testid` com Playwright spec | Ajustar blueprint ao teste existente (`about-beliefs-section`, `belief-text-layer-desktop`, `belief-text-layer-mobile`, `belief-line-{i}`, `ghost-figure`) | E2E já validado é SSOT mais atual que o blueprint; mudar teste regrediria cobertura |
| `scrollYProgress` — assinatura do hook | Hook aceita `RefObject<HTMLElement>` (como no blueprint) | Compatível com `useScroll({ target })` do Motion |
| 11 arquivos legados | Deletar na Task 13 **depois** do build verde | KI-003: Git é o backup |
| Cleanup de `src/components/3d/` duplicado | Fora de escopo — permanece | Não referenciado pela Seção 06; remover em PR separado |

## File Structure

**Criar:**
- `src/hooks/useBeliefsScroll.ts` — hook central (substitui `useBeliefsAnimation` + `useBeliefScroll`)
- `src/lib/motion/split-text.ts` — utilitário tipográfico reutilizável
- `src/components/sobre/beliefs/BeliefScrollText.tsx` — camada de frases rotatórias (novo nome; substitui `BeliefDesktopTextLayer` + `BeliefMobileTextLayer`)

**Substituir integralmente:**
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/index.ts` (re-exports)

**Deletar (apenas na Task 13, após build verde):**
- `src/hooks/useBeliefsAnimation.ts`
- `src/hooks/useBeliefScroll.ts`
- `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx`
- `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx`
- `src/components/sobre/beliefs/BeliefPhrases.tsx`
- `src/components/sobre/beliefs/BeliefSection.tsx`
- `src/components/sobre/beliefs/BeliefFinalSection.tsx`
- `src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx`
- `src/components/sobre/3d/GhostCanvas.tsx`
- `src/components/sobre/3d/GhostModel.tsx`
- `src/components/sobre/3d/ProceduralGhost.tsx`

---

### Task 1: Branch & snapshot inicial

**Files:** n/a (git)

- [ ] **Step 1: Criar branch isolado**

```bash
git checkout -b feat/section-06-blueprint-integration
git status
```

Expected: `On branch feat/section-06-blueprint-integration` + working tree clean.

- [ ] **Step 2: Baseline — rodar typecheck atual**

```bash
pnpm tsc --noEmit 2>&1 | tail -30
```

Expected: 0 erros (ou lista conhecida). Anotar baseline antes de começar.

- [ ] **Step 3: Baseline — rodar Playwright atual**

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --reporter=line 2>&1 | tail -20
```

Expected: `1 passed`. Se falhar, parar e reportar — o plano pressupõe baseline verde.

---

### Task 2: Criar `useBeliefsScroll`

**Files:**
- Create: `src/hooks/useBeliefsScroll.ts`

- [ ] **Step 1: Criar arquivo com código da seção 3.1 do blueprint**

Copiar verbatim do blueprint `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` linhas 70–103:

```tsx
'use client';

import { useScroll, useReducedMotion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll provider central da Seção 06.
 * offset: ['start end', 'end end'] — começa quando topo da seção toca
 * o rodapé da viewport (entrada cedo); termina quando o rodapé da seção
 * toca o rodapé da viewport (fim suave). Corrigido em 2026-04-16.
 */
export const useBeliefsScroll = (containerRef: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const prefersReducedMotion = useReducedMotion() ?? false;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return { scrollYProgress, prefersReducedMotion, isMobile };
};
```

- [ ] **Step 2: Typecheck focado**

```bash
pnpm tsc --noEmit 2>&1 | grep -E "useBeliefsScroll|error" | head -10
```

Expected: 0 erros relacionados ao novo arquivo (ainda pode haver avisos sobre arquivos antigos ainda não deletados — ignorar).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useBeliefsScroll.ts
git commit -m "feat(sobre/beliefs): add useBeliefsScroll central hook

Substitui useBeliefsAnimation + useBeliefScroll por hook único.
Offset corrigido ['start end', 'end end'] conforme audit 2026-04-16.

Ref: blueprint seção 3.1"
```

---

### Task 3: Criar `SplitText` utility

**Files:**
- Create: `src/lib/motion/split-text.ts`

- [ ] **Step 1: Verificar que a pasta existe**

```bash
ls src/lib/motion/ 2>/dev/null || mkdir -p src/lib/motion
```

- [ ] **Step 2: Criar arquivo com código da seção 3.4 (linhas 189–240)**

Copiar verbatim do blueprint:

```tsx
'use client';

import { type HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

export type SplitTextMode = 'chars' | 'words' | 'lines';

interface SplitTextProps extends HTMLMotionProps<'span'> {
  text: string;
  mode?: SplitTextMode;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  mode = 'words',
  className,
  ...props
}) => {
  const getSplitArray = () => {
    switch (mode) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(/\s+/).filter(Boolean);
      case 'lines':
        return text.split('\n');
      default:
        return text.split(/\s+/);
    }
  };

  const items = getSplitArray();

  return (
    <span className={className} aria-hidden="true">
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          className={
            mode === 'words' || mode === 'lines' ? 'inline-block mr-[0.25em]' : ''
          }
          style={{ display: 'inline-block' }}
          {...props}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion/split-text.ts
git commit -m "feat(lib/motion): add SplitText helper

Utilitário reutilizável para animar texto por words/chars/lines.

Ref: blueprint seção 3.4"
```

---

### Task 4: Substituir `BeliefBackground`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`

- [ ] **Step 1: Ler arquivo atual para confirmar conteúdo**

```bash
cat src/components/sobre/beliefs/BeliefBackground.tsx
```

Expected: Implementação antiga (usa `containerRef`, não `scrollProgress`). Confirma necessidade da substituição.

- [ ] **Step 2: Substituir pelo código da seção 3.2 (linhas 109–148)**

Conteúdo final do arquivo:

```tsx
'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Background layer da Seção 06.
 * Ciclo obrigatório: bluePrimary → purpleDetails → pinkDetails → loop.
 * Interpolação contínua vinculada ao scroll via useTransform.
 * NUNCA usar animate() ou CSS transition aqui — causa flicker e dessincronia.
 */
export const BeliefBackground = ({ scrollProgress }: BeliefBackgroundProps) => {
  const backgroundColor = useTransform(
    scrollProgress,
    [0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.88, 1.0],
    [
      '#040013', // intro — Deep Void
      '#0048ff', // bluePrimary
      '#8705f2', // purpleDetails
      '#f501d3', // pinkDetails
      '#0048ff', // bluePrimary (loop 2)
      '#8705f2', // purpleDetails
      '#f501d3', // pinkDetails
      '#040013', // fade-out para o manifesto
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor }}
      aria-hidden="true"
    />
  );
};
```

- [ ] **Step 3: Commit (a compilação ainda falhará em AboutBeliefs — esperado até Task 10)**

```bash
git add src/components/sobre/beliefs/BeliefBackground.tsx
git commit -m "refactor(sobre/beliefs): BeliefBackground via useTransform

Substitui API antiga (containerRef) por scrollProgress.
Interpolação HSL contínua substitui animate() imperativo.

Ref: blueprint seção 3.2"
```

---

### Task 5: Substituir `BeliefOverlay`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefOverlay.tsx`

- [ ] **Step 1: Substituir pelo código da seção 3.3 (linhas 154–183)**

Conteúdo final:

```tsx
'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefOverlayProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Overlay cross-fade sobre o BeliefBackground.
 * Opacidade oscila 0 → 0.12 → 0 nas transições de cor do background,
 * suavizando banding em telas OLED/gradiente HSL.
 */
export const BeliefOverlay = ({ scrollProgress }: BeliefOverlayProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.22, 0.30, 0.37, 0.45, 0.52, 0.60, 0.67, 0.75, 0.82, 0.88, 1.0],
    [0, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0.12, 0, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none bg-black"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefOverlay.tsx
git commit -m "refactor(sobre/beliefs): BeliefOverlay usa scrollProgress prop

Renomeia scrollYProgress → scrollProgress para API consistente.

Ref: blueprint seção 3.3"
```

---

### Task 6: Substituir `BeliefFixedHeader`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefFixedHeader.tsx`

- [ ] **Step 1: Substituir pelo código da seção 3.5 (linhas 247–307)**

Conteúdo final:

```tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SplitText } from '@/lib/motion/split-text';

export const BeliefFixedHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px 0px 0px', once: false });

  const containerVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // ghost-ease
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: 60,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.header
      ref={ref}
      className="sticky top-0 z-30 flex flex-col items-end justify-center gap-2 w-full px-6 md:px-12 py-8 pointer-events-none"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="text-right max-w-xs md:max-w-sm">
        <motion.p className="font-display text-sm md:text-base text-white/70 uppercase tracking-widest">
          <SplitText
            text="Acredito no design que muda o dia de alguém."
            mode="words"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.p>
        <motion.h2 className="font-h1 font-bold text-white text-lg md:text-xl mt-2 leading-tight">
          <SplitText
            text="Não pelo choque, mas pela conexão."
            mode="words"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.h2>
      </div>
    </motion.header>
  );
};
```

Nota: API do componente mudou — não recebe mais `containerRef`/`scrollYProgress`/`prefersReducedMotion` como props. `AboutBeliefs` será ajustado na Task 10.

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefFixedHeader.tsx
git commit -m "refactor(sobre/beliefs): BeliefFixedHeader com useInView + SplitText

Elimina props de scroll — componente auto-suficiente via useInView.
Substitui dependência do hook antigo.

Ref: blueprint seção 3.5"
```

---

### Task 7: Criar `BeliefScrollText` **com fix de Rules of Hooks**

**Files:**
- Create: `src/components/sobre/beliefs/BeliefScrollText.tsx`

**⚠️ Atenção crítica:** O blueprint (seção 3.6) chama `useTransform` dentro de um `.map()` sobre `phrases`. Isso viola a Rule of Hooks (hooks em loops). Como `phrases.length` é estável (6), tecnicamente funciona, mas quebra em HMR e dispara warnings do ESLint. **Obrigatório** refatorar em subcomponente `BeliefScrollPhrase`. Os `data-testid` (`belief-text-layer-desktop`, `belief-text-layer-mobile`, `belief-line-{i}`) são requisitos da suíte Playwright (`test/e2e/about-beliefs.spec.ts`).

- [ ] **Step 1: Criar arquivo com versão corrigida**

```tsx
'use client';

import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useState } from 'react';

interface BeliefScrollTextProps {
  phrases: string[];
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

const ENTER_START = 0.16;
const EXIT_END = 0.94;

/**
 * Subcomponente por frase — isola useTransform para cumprir Rules of Hooks.
 * Cada frase tem sua própria janela de entrada/saída no progresso de scroll.
 */
interface BeliefScrollPhraseProps {
  phrase: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

const BeliefScrollPhrase = ({
  phrase,
  index,
  total,
  scrollProgress,
  prefersReducedMotion,
}: BeliefScrollPhraseProps) => {
  const segStart = ENTER_START + (index / total) * (EXIT_END - ENTER_START);
  const segEnd = ENTER_START + ((index + 1) / total) * (EXIT_END - ENTER_START);
  const midIn = segStart + (segEnd - segStart) * 0.15;
  const midOut = segStart + (segEnd - segStart) * 0.85;

  const opacity = useTransform(
    scrollProgress,
    [segStart, midIn, midOut, segEnd],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [segStart, midIn, midOut, segEnd],
    prefersReducedMotion ? [0, 0, 0, 0] : [18, 0, 0, -18]
  );

  return (
    <motion.p
      data-testid={`belief-line-${index}`}
      style={{ opacity, y, fontSize: 'clamp(2.8rem, 5.8vw, 6.3rem)' }}
      className="absolute font-h1 font-bold text-[#4fe6ff] leading-[1.05]"
    >
      {phrase}
    </motion.p>
  );
};

export const BeliefScrollText = ({
  phrases,
  scrollProgress,
  isMobile = false,
  prefersReducedMotion = false,
}: BeliefScrollTextProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const unsub = scrollProgress.on('change', (v) => {
      if (v < ENTER_START) {
        setActiveIndex(-1);
        return;
      }
      if (v > EXIT_END) {
        setActiveIndex(phrases.length);
        return;
      }
      const seg = (v - ENTER_START) / (EXIT_END - ENTER_START);
      setActiveIndex(
        Math.min(phrases.length - 1, Math.floor(seg * phrases.length))
      );
    });
    return () => unsub();
  }, [scrollProgress, phrases.length]);

  // Desktop: frases empilhadas via subcomponente por frase
  if (!isMobile) {
    return (
      <div
        data-testid="belief-text-layer-desktop"
        className="relative w-full px-6 md:px-16 flex items-center pointer-events-none"
      >
        <div className="w-full max-w-[38vw] lg:max-w-[34vw]">
          {phrases.map((phrase, i) => (
            <BeliefScrollPhrase
              key={`desktop-${i}`}
              phrase={phrase}
              index={i}
              total={phrases.length}
              scrollProgress={scrollProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    );
  }

  // Mobile: uma frase por vez via AnimatePresence mode="wait"
  return (
    <div
      data-testid="belief-text-layer-mobile"
      className="relative w-full h-[80vh] flex items-end justify-center pb-[20vh] px-6 pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {activeIndex >= 0 && activeIndex < phrases.length && (
          <motion.p
            key={`mobile-${activeIndex}`}
            data-testid={`belief-line-${activeIndex}`}
            initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-h1 font-bold text-[#4fe6ff] text-center leading-tight"
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
          >
            {phrases[activeIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
```

**Mudanças vs. blueprint:**
1. Extraído `BeliefScrollPhrase` para respeitar Rules of Hooks.
2. `data-testid="belief-text-layer-desktop|mobile"` no wrapper.
3. `data-testid="belief-line-{index}"` em cada `motion.p` (exigido por Playwright).
4. Removida a função `phrase()` auxiliar — substituída por indexação direta `phrases[activeIndex]`.

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefScrollText.tsx
git commit -m "feat(sobre/beliefs): add BeliefScrollText (substitui Desktop+Mobile layers)

- Fix Rules of Hooks: useTransform isolado em subcomponente BeliefScrollPhrase
- testIds compatíveis com Playwright spec (belief-text-layer-*, belief-line-{i})
- Mobile: AnimatePresence mode='wait' (audit 2026-02-22)
- Desktop: frases empilhadas com janelas de scroll segmentadas

Ref: blueprint seção 3.6 (adaptado)"
```

---

### Task 8: Substituir `BeliefManifesto`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefManifesto.tsx`

- [ ] **Step 1: Substituir pelo código da seção 3.7 (linhas 420–466)**

Conteúdo final:

```tsx
'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}

/**
 * Manifesto final "ISSO É GHOST DESIGN."
 * Renderizado em z-50 para ficar ACIMA do GhostCanvas (z-30).
 * Reveal entre scroll 0.85 e 1.0.
 */
export const BeliefManifesto = ({
  scrollProgress,
  prefersReducedMotion = false,
}: BeliefManifestoProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0.82, 0.90, 1.0],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
  );
  const y = useTransform(
    scrollProgress,
    [0.82, 0.92],
    prefersReducedMotion ? [0, 0] : [18, 0]
  );

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 w-full flex items-center justify-center pb-[8vh] md:pb-[12vh] pointer-events-none"
      style={{ opacity, y }}
      aria-live="polite"
    >
      <div className="text-center">
        <p
          className="font-display font-black text-white tracking-[0.15em] leading-[0.95]"
          style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)' }}
        >
          ISSO É <span className="text-[#4fe6ff]">GHOST DESIGN.</span>
        </p>
      </div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefManifesto.tsx
git commit -m "refactor(sobre/beliefs): BeliefManifesto via scrollProgress

z-50 garantido acima do Ghost (z-30). Reveal 0.82→1.0.

Ref: blueprint seção 3.7"
```

---

### Task 9: Substituir `GhostScene`

**Files:**
- Modify: `src/components/sobre/3d/GhostScene.tsx`

- [ ] **Step 1: Substituir pelo código da seção 3.8 (linhas 473–573)**

Conteúdo final (copiar verbatim — já inclui `data-testid="ghost-figure"` não? **Verificar**):

> ⚠️ O blueprint seção 3.8 **não** emite `data-testid="ghost-figure"`, mas a spec Playwright testa `page.locator('[data-testid="ghost-figure"]').toBeVisible()`. Adicionar o atributo no wrapper `<motion.div>`.

```tsx
'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { Group } from 'three';
import { getAssetUrl } from '@/lib/utils';

const GHOST_GLB_URL = getAssetUrl('3d/ghost-v1.glb');

// Preload fora do componente para evitar re-disparos
useGLTF.preload(GHOST_GLB_URL);

interface GhostModelProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
}

const GhostModel = ({ scrollProgress, isMobile = false }: GhostModelProps) => {
  const { scene } = useGLTF(GHOST_GLB_URL);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const unsub = scrollProgress.on('change', () => invalidate());
    return () => unsub();
  }, [scrollProgress, invalidate]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress.get();
    const targetScale = isMobile
      ? 0.9 + Math.min(p, 0.1) * 1.0
      : 0.95 + Math.min(p, 0.1) * 0.5;

    groupRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale } as never,
      Math.min(delta * 8, 0.15)
    );

    if (isMobile) {
      const targetX = p > 0.85 ? 0 : -1.2;
      const targetY = p > 0.85 ? 0 : 1.5;
      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * 0.08;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * 0.08;
    }

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    groupRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * 0.6) * 0.0008;
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
}

/**
 * GhostScene — Canvas R3F isolado.
 * z-30 (NÃO z-50). O manifesto em z-50 precisa ficar acima.
 */
export const GhostScene = ({
  scrollProgress,
  isMobile = false,
}: GhostSceneProps) => {
  return (
    <motion.div
      data-testid="ghost-figure"
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        performance={{ min: 0.5, max: 1, debounce: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        role="presentation"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <GhostModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};
```

**Mudanças vs. blueprint:**
1. Adicionado `data-testid="ghost-figure"` (exigido por Playwright).
2. Removido import não usado `ThreeEvent`.

- [ ] **Step 2: Smoke test do GLB**

```bash
curl -I "https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb" 2>&1 | head -10
```

Expected: `HTTP/2 200` + `content-type: model/gltf-binary`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/3d/GhostScene.tsx
git commit -m "refactor(sobre/3d): GhostScene via MotionValue + frameloop demand

- z-30 garantido (manifesto z-50 fica acima — audit 2026-04-16)
- data-testid='ghost-figure' para Playwright
- GLB path via getAssetUrl('3d/ghost-v1.glb') — validado 2026-04-20
- scrollProgress.on('change', invalidate) para R3F demand mode

Ref: blueprint seção 3.8"
```

---

### Task 10: Substituir `AboutBeliefs` (orquestrador)

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx`

- [ ] **Step 1: Substituir pelo código da seção 3.9 — com `data-testid="about-beliefs-section"`**

> ⚠️ O blueprint usa `data-testid="beliefs-section"`, mas a spec Playwright testa `[data-testid="about-beliefs-section"]`. **Manter o testId legado** para não quebrar o E2E.

Conteúdo final:

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

const GhostScene = dynamic(
  () =>
    import('@/components/sobre/3d/GhostScene').then((mod) => mod.GhostScene),
  {
    ssr: false,
    loading: () => (
      <div
        data-testid="ghost-figure"
        className="fixed inset-0 z-30 pointer-events-none bg-transparent"
        aria-hidden="true"
      />
    ),
  }
);

const PHRASES: ReadonlyArray<string> = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

/**
 * Seção 06 — "O Que Me Move" (AboutBeliefs)
 *
 * Stack de camadas (Ghost Design System):
 *   z-0  → BeliefBackground (HSL via useTransform)
 *   z-10 → BeliefOverlay (cross-fade)
 *   z-20 → conteúdo scrollável
 *   z-30 → BeliefFixedHeader (sticky) + GhostScene (fixed)
 *   z-40 → BeliefScrollText (frases rotatórias)
 *   z-50 → BeliefManifesto (clímax — ACIMA do Ghost)
 *
 * Correções aplicadas (audits 2026-04-16 + 2026-02-22):
 *   • offset ['start end', 'end end']
 *   • Ghost em z-30, manifesto em z-50
 *   • useTransform para cor do BG (não animate())
 *   • AnimatePresence mode="wait" no mobile
 *   • GLB path via getAssetUrl('3d/ghost-v1.glb')
 *   • SSR guard via dynamic + ssr:false
 */
export const AboutBeliefs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, prefersReducedMotion, isMobile } =
    useBeliefsScroll(containerRef);

  return (
    <section
      ref={containerRef}
      id="06-o-que-me-move"
      className="relative w-full min-h-[400vh] overflow-hidden"
      data-testid="about-beliefs-section"
      aria-label="O que me move — manifesto"
    >
      <div className="sr-only">
        <h2>Manifesto: O Que Me Move</h2>
        <ul>
          {PHRASES.map((phrase) => (
            <li key={phrase}>{phrase}</li>
          ))}
          <li>ISSO É GHOST DESIGN.</li>
        </ul>
      </div>

      <BeliefBackground scrollProgress={scrollYProgress} />
      <BeliefOverlay scrollProgress={scrollYProgress} />

      <BeliefFixedHeader />

      <div className="relative z-40 w-full min-h-full flex flex-col justify-center pointer-events-none">
        <BeliefScrollText
          phrases={[...PHRASES]}
          scrollProgress={scrollYProgress}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <GhostScene scrollProgress={scrollYProgress} isMobile={isMobile} />

      <BeliefManifesto
        scrollProgress={scrollYProgress}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
};
```

**Mudanças vs. blueprint:**
1. `data-testid="about-beliefs-section"` (em vez de `beliefs-section` do blueprint) — compatível com spec.
2. `id="06-o-que-me-move"` preservado.
3. Bloco `sr-only` preservado (acessibilidade).
4. `loading` do `dynamic` inclui `data-testid="ghost-figure"` para compatibilidade com Playwright durante lazy load.
5. Export nomeado `export const AboutBeliefs` (em vez de `export function`) — alinhado ao blueprint.

- [ ] **Step 2: Rodar typecheck**

```bash
pnpm tsc --noEmit 2>&1 | grep -E "error TS" | head -30
```

Expected: Apenas erros sobre arquivos legados (`useBeliefsAnimation`, `BeliefDesktopTextLayer`, etc.) que serão deletados na Task 13. **Nenhum erro em arquivos novos.**

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "refactor(sobre/sections): AboutBeliefs integra blueprint reconciliado

- useBeliefsScroll central (offset start-end/end-end)
- Stack z-0→z-50 conforme GDS
- GhostScene dynamic ssr:false com fallback testId
- Preserva id=06-o-que-me-move, testid=about-beliefs-section, sr-only

Ref: blueprint seção 3.9 + audits 2026-04-16/2026-02-22"
```

---

### Task 11: Atualizar `beliefs/index.ts`

**Files:**
- Modify: `src/components/sobre/beliefs/index.ts`

- [ ] **Step 1: Ver quem importa do index**

```bash
grep -rn "from '@/components/sobre/beliefs'" src/ | head -20
```

Expected: lista de importadores. Se vazio, o index é apenas conveniência.

- [ ] **Step 2: Substituir pelas novas re-exportações**

```ts
'use client';

export * from '@/components/sobre/beliefs/BeliefBackground';
export * from '@/components/sobre/beliefs/BeliefOverlay';
export * from '@/components/sobre/beliefs/BeliefFixedHeader';
export * from '@/components/sobre/beliefs/BeliefScrollText';
export * from '@/components/sobre/beliefs/BeliefManifesto';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/beliefs/index.ts
git commit -m "refactor(sobre/beliefs): atualiza barrel exports para novos componentes"
```

---

### Task 12: Verificação intermediária (build + typecheck)

**Files:** n/a

- [ ] **Step 1: Rodar typecheck completo**

```bash
pnpm tsc --noEmit 2>&1 | tail -40
```

Expected: Apenas erros em arquivos legados (`useBeliefsAnimation.ts`, `useBeliefScroll.ts`, `BeliefDesktopTextLayer.tsx`, `BeliefMobileTextLayer.tsx`, `BeliefPhrases.tsx`, `BeliefSection.tsx`, `BeliefFinalSection.tsx`, `BeliefFinalSectionOverlay.tsx`, `GhostCanvas.tsx`, `GhostModel.tsx`, `ProceduralGhost.tsx`). Se houver erro em arquivo novo, parar e corrigir.

- [ ] **Step 2: Verificar que nenhum import externo usa os legados**

```bash
grep -rn "BeliefDesktopTextLayer\|BeliefMobileTextLayer\|BeliefFinalSectionOverlay\|BeliefFinalSection\|BeliefSection\|BeliefPhrases\|GhostCanvas\|useBeliefsAnimation\|useBeliefScroll" src/ --include="*.ts" --include="*.tsx" | grep -v "src/hooks/useBeliefsAnimation\|src/hooks/useBeliefScroll\|src/components/sobre/beliefs/Belief\|src/components/sobre/3d/Ghost"
```

Expected: Vazio. Se houver resultados fora dos próprios arquivos legados, significa que há dependência externa que precisa migrar antes da deleção.

---

### Task 13: Remover código legado

**Files:**
- Delete: 11 arquivos listados em "File Structure"

- [ ] **Step 1: Deletar hooks antigos**

```bash
rm src/hooks/useBeliefsAnimation.ts src/hooks/useBeliefScroll.ts
```

- [ ] **Step 2: Deletar layers antigos de beliefs**

```bash
rm src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx \
   src/components/sobre/beliefs/BeliefMobileTextLayer.tsx \
   src/components/sobre/beliefs/BeliefPhrases.tsx \
   src/components/sobre/beliefs/BeliefSection.tsx \
   src/components/sobre/beliefs/BeliefFinalSection.tsx \
   src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx
```

- [ ] **Step 3: Deletar 3D legados**

```bash
rm src/components/sobre/3d/GhostCanvas.tsx \
   src/components/sobre/3d/GhostModel.tsx \
   src/components/sobre/3d/ProceduralGhost.tsx
```

- [ ] **Step 4: Confirmar build limpo**

```bash
pnpm tsc --noEmit 2>&1 | grep "error TS" | head -20
```

Expected: 0 erros.

- [ ] **Step 5: Lint**

```bash
pnpm lint 2>&1 | tail -20
```

Expected: 0 erros em arquivos tocados.

- [ ] **Step 6: Commit da limpeza**

```bash
git add -A
git commit -m "chore(sobre): remove código legado da Seção 06

Remove 11 arquivos substituídos pelo blueprint reconciliado:
- hooks: useBeliefsAnimation, useBeliefScroll
- beliefs: Desktop/Mobile TextLayer, Phrases, Section, FinalSection+Overlay
- 3d: GhostCanvas, GhostModel, ProceduralGhost

Git é o backup (KI-003)."
```

---

### Task 14: Verificar build de produção

**Files:** n/a

- [ ] **Step 1: Build completo**

```bash
pnpm run build 2>&1 | tail -40
```

Expected: Build concluído, rota `/sobre` presente na lista de rotas estáticas ou dinâmicas.

- [ ] **Step 2: Se falhar, diagnosticar e voltar à task relevante. Não prosseguir.**

---

### Task 15: Validação visual no dev server

**Files:** n/a

- [ ] **Step 1: Iniciar dev server**

```bash
pnpm dev
```

Expected: servidor em `http://localhost:3000` (ou porta equivalente).

- [ ] **Step 2: Checklist manual em /sobre (desktop 1440px)**

Abrir `http://localhost:3000/sobre` e navegar até a Seção 06. Validar:
- [ ] Background transiciona continuamente (Deep Void → blue → purple → pink → loop → Deep Void)
- [ ] Header sticky aparece com fade-in (opacity 0→1, x 60→0) na entrada da seção
- [ ] Frases rotatórias aparecem empilhadas — uma visível por vez, com fade in/out sincronizado ao scroll
- [ ] Ghost 3D visível, centralizado, com escala animada durante o scroll
- [ ] No clímax (scroll final), manifesto "ISSO É GHOST DESIGN." aparece **acima** do Ghost
- [ ] Scroll reverso restaura estados continuamente (sem flash/jump)
- [ ] Console sem warnings de hydration, Rules of Hooks ou SSR

- [ ] **Step 3: Checklist mobile (DevTools iPhone 13 — 390×844)**

- [ ] Ghost inicia em topo-esquerda, tamanho reduzido
- [ ] Apenas **uma** frase visível por vez (modo `AnimatePresence`)
- [ ] Transição entre frases com slide horizontal + blur
- [ ] No clímax, Ghost transiciona para o centro e manifesto aparece acima dele

- [ ] **Step 4: Checklist `prefers-reduced-motion`**

DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce`. Validar:
- [ ] Frases ficam estáticas (opacity fixa em 1, sem translate)
- [ ] Manifesto aparece sem fade
- [ ] Ghost Canvas não é renderizado (ou renderizado estaticamente)

- [ ] **Step 5: Parar dev server** (`Ctrl+C`)

---

### Task 16: Rodar suíte Playwright

**Files:** n/a

- [ ] **Step 1: Rodar spec específica**

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --reporter=line 2>&1 | tail -30
```

Expected: `1 passed`.

- [ ] **Step 2: Se falhar, capturar trace e reportar**

```bash
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --trace=on 2>&1 | tail -40
```

Possíveis causas:
- `belief-line-0` não aparece → revisar janelas de scroll (ENTER_START/EXIT_END)
- `ghost-figure` invisível → conferir SSR guard e CSS do wrapper `motion.div`
- Opacity nunca chega a > 0.9 → revisar interpolação `useTransform` em `BeliefScrollPhrase`

- [ ] **Step 3: Rodar suíte E2E completa para caçar regressões**

```bash
pnpm test:e2e 2>&1 | tail -20
```

Expected: Nenhuma nova falha. Se alguma spec de outra seção quebrar por efeito colateral, investigar.

---

### Task 17: Push e abertura de PR

**Files:** n/a

- [ ] **Step 1: Push do branch**

```bash
git push -u origin feat/section-06-blueprint-integration
```

- [ ] **Step 2: Abrir PR**

```bash
gh pr create --title "feat(sobre): integra blueprint reconciliado na Seção 06 (O Que Me Move)" --body "$(cat <<'EOF'
## Summary
- Reconcilia Blueprint Seção 06 com correções dos audits 2026-04-16 e 2026-02-22
- Hook único `useBeliefsScroll` substitui `useBeliefsAnimation` + `useBeliefScroll`
- `BeliefScrollText` unifica Desktop + Mobile layers com fix de Rules of Hooks
- Remove 11 arquivos legados (hooks + layers + 3D antigos)

## Correções preservadas
- Ghost em `z-30`, manifesto em `z-50` (não regride fix de oclusão)
- `useScroll` offset `['start end', 'end end']`
- `useTransform` contínuo para cor do BG (substitui `animate()`)
- `AnimatePresence mode="wait"` no mobile
- GLB via `getAssetUrl('3d/ghost-v1.glb')` — path canônico validado
- SSR guard via `dynamic(..., { ssr: false })`

## Test plan
- [x] `pnpm tsc --noEmit` limpo
- [x] `pnpm run build` passa
- [x] Dev server: desktop + mobile + reduced-motion validados manualmente
- [x] `pnpm exec playwright test about-beliefs.spec.ts` verde
- [x] Suíte E2E completa sem regressões

Ref: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` seções 3.1–3.9 + 9.1
EOF
)"
```

Expected: URL do PR retornada.

---

## Self-Review — checklist pós-plano

**Spec coverage** (Prompt Atômico 9.1):
- ✅ 1. `useBeliefsScroll.ts` criado — Task 2
- ✅ 2. `split-text.ts` criado — Task 3
- ✅ 3. `BeliefBackground.tsx` — Task 4
- ✅ 4. `BeliefOverlay.tsx` — Task 5
- ✅ 5. `BeliefFixedHeader.tsx` — Task 6
- ✅ 6. `BeliefScrollText.tsx` (com fix Rules of Hooks) — Task 7
- ✅ 7. `BeliefManifesto.tsx` — Task 8
- ✅ 8. `GhostScene.tsx` — Task 9
- ✅ 9. `AboutBeliefs.tsx` — Task 10
- ✅ `pnpm tsc --noEmit` — Task 12 + 14
- ✅ `pnpm dev` + validação /sobre — Task 15
- ✅ `playwright test about-beliefs.spec.ts` — Task 16
- ✅ Critérios de sucesso (Ghost nunca acima do manifesto, BG contínuo, frases continuam/single, sem hydration warnings) — Task 15
- ✅ `git mv` antes de substituição — N/A (nomes dos arquivos mantidos; nenhum rename necessário)
- ✅ Sem pastas backup — Task 13 delete direto

**Type consistency:**
- ✅ `scrollProgress: MotionValue<number>` usado em todos os componentes consumidores
- ✅ `scrollYProgress` (nome Motion) vs `scrollProgress` (nome interno) → hook retorna `scrollYProgress`, orquestrador repassa como `scrollProgress`. Consistente.
- ✅ `prefersReducedMotion`, `isMobile` — mesmo tipo em todos os lugares
- ✅ `BeliefScrollPhrase` — interface nova, definida na Task 7, não usada fora

**Placeholder scan:** Nenhum "TBD", "TODO", "add error handling", ou código omitido. Todos os steps que alteram código mostram o código completo.

**Gaps do spec:** Nenhum. Adicionei tasks extras (11, 12, 13) que o prompt atômico implica mas não detalha (barrel index, verificação intermediária, cleanup de legados).

---

## Execução

**Plan complete and saved to `docs/superpowers/plans/2026-04-20-about-beliefs-blueprint-integration.md`.**

Duas opções de execução:

1. **Subagent-Driven (recomendado)** — Eu despacho um subagent fresh por task, reviso entre tasks, iteração rápida
2. **Inline Execution** — Executo as tasks nesta sessão com checkpoints para review

Qual a escolha?
