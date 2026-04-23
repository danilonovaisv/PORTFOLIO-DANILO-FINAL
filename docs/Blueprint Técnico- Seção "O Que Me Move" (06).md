# 🎯 Blueprint Técnico: Seção "O Que Me Move" (06)

## resumo_executivo
A seção **"O Que Me Move"** opera como um manifesto cinematográfico scroll-driven. Sua arquitetura funde `motion` (DOM, `inView`, `useScroll`, `animate`) para camadas 2D e React Three Fiber para o Ghost 3D, sincronizados via progresso de scroll normalizado. As referências indicam um salto técnico: a interpolação contínua de HSL (Motion Tutorial) dita o ritmo cíclico do background; o parallax lerp de Olivier Larose governa a flutuação responsiva do modelo GLB; e o `SplitText` (inspirado no React Bits) fragmenta a tipografia para staggers de entrada/saída precisos. O desafio central não é *o que* animar, mas *como* manter 60fps, evitar conflito de z-index e garantir que a experiência degrade com elegância quando `prefers-reduced-motion` ou conexões lentas entram em cena.

---

## leitura_visual_estrutural
| Categoria | Observação |
|---|---|
| **Fatos Observáveis** | 5 camadas visuais (Background, Overlay, Header Fixo, Texto Rotativo/Manifesto, Ghost 3D). Ciclo cromático obrigatório (`#0048ff → #8705f2 → #f501d3`). Entrada/saída lateral sincronizada com scroll. Ghost responde a cursor (desktop) e scroll (mobile). |
| **Inferências Técnicas** | `inView` com `margin` negativo dispara animações sem depender de `useScroll` contínuo para texto. O parallax do Ghost exige `lerp` no `useFrame` para evitar stutter. O `SplitText` deve ser implementado via `motion.span` para evitar reflow do DOM durante scroll rápido. |
| **Hipóteses a Validar** | Comportamento do `inView` em iOS Safari com address bar dinâmica. Custo de `dpr` alto em mid-range Android. Se o cross-fade do overlay cria banding em telas OLED com gradiente HSL. |

---

## mapa_de_animacoes
| Camada | Gatilho | Easing / Duração | Comportamento Desktop | Comportamento Mobile |
|---|---|---|---|---|
| **Background HSL** | `useScroll` progress | `[0.4, 0, 0.2, 1]` (0.8s) | Interpolação contínua via `animate()` | Igual, mas ciclo comprimido em `0.6s` |
| **Overlay Cross-fade** | Entrada de frase | Linear → Fade `0.4s` | `opacity: 0 → 1 → 0` sincronizado | Igual, com `backdrop-filter` leve |
| **BeliefFixedHeader** | Entrada na viewport | `[0.16, 1, 0.3, 1]` (0.6s) | `sticky`, slide `x: 100 → 0`, fade `0.3 → 1` | `sticky top-[20vh]`, mesma curva |
| **Texto Rotativo** | `inView` + `scrollProgress` | `[0.22, 1, 0.36, 1]` (0.8s) | Quebra por palavra, `x: -100 → 0`, fade | Centralizado, `x: -60 → 0`, quebra automática |
| **Manifesto Final** | `scrollProgress > 0.85` | `[0.25, 0.46, 0.45, 0.94]` (1s) | Stagger char/word, `letter-spacing` morph | Igual, com `clamp()` tipográfico |
| **Ghost 3D** | `useScroll` + `useFrame` | Lerp `0.05` (suave) | Cursor parallax (`±15px`), `scale 0.95 → 1` | Scroll parallax (`±20px`), centraliza no final |

---

## arquitetura_recomendada
Como isolamos física, DOM e Canvas sem criar gargalos de re-render?
1. **Server/Client Boundary**: `page.tsx` é Server Component. `AboutBeliefs.tsx` é `'use client'` e encapsula toda a lógica interativa.
2. **Scroll Engine**: Um único `useScroll` no root da seção expõe `{ scrollYProgress }`. `inView` gerena apenas a visibilidade discreta das frases.
3. **3D Isolation**: `GhostScene` roda em `Canvas` com `dpr={[1, 2]}` e `frameloop="demand"`. Comunica com o DOM apenas via `progress` prop, evitando `context` global.
4. **Asset Pipeline**: GLB no Supabase Storage (URL pública). Pré-carregado via `useGLTF.preload()` no `layout.tsx` ou em `dynamic(import, { loading: Skeleton })`.
5. **State Flow**: `ScrollProgress` → Hook `useBeliefsAnimation` → Props para camadas DOM/R3F → `AnimatePresence` gerencia mounts/unmounts.

---

## estrutura_de_pastas
```text
src/
├── app/(portfolio)/sobre/
│   ├── page.tsx                  # Server Component, metadata, layout wrapper
│   └── loading.tsx               # Suspense fallback para assets 3D
├── components/sobre/
│   ├── sections/AboutBeliefs.tsx # Client orchestrator, scroll provider, z-index stack
│   ├── beliefs/
│   │   ├── BeliefBackground.tsx  # HSL interpolation layer
│   │   ├── BeliefOverlay.tsx     # Cross-fade layer
│   │   ├── BeliefFixedHeader.tsx # Split-text header, sticky
│   │   ├── BeliefScrollText.tsx  # Rotating phrases, inView logic
│   │   └── BeliefManifesto.tsx   # Final morph text, split animation
│   └── 3d/GhostScene.tsx         # R3F canvas, lerp logic, error boundary
├── hooks/useBeliefsScroll.ts     # Normaliza scrollProgress + prefers-reduced-motion
├── lib/motion/split-text.ts      # Utilitário para fragmentar texto em motion.spans
└── styles/globals.css            # Tailwind + @layer tokens + prefers-reduced-motion
```

---

## estrategia_de_componentes
- **Composition over Inheritance**: `AboutBeliefs` injeta `motion.div` wrappers com `position: relative` e `overflow: hidden`. Cada camada usa `absolute inset-0` ou `sticky` conforme z-index.
- **SplitText Strategy**: Evita manipulação direta do DOM via `dangerouslySetInnerHTML`. Usa regex `/\s+/` para separar palavras/chars e mapeia para `<motion.span>`, garantindo que o layout engine do React mantenha o tree estável.
- **R3F ↔ DOM Sync**: O `useFrame` do Ghost não escuta scroll diretamente. Recebe `targetPosition` e `targetScale` via props derivadas do `scrollProgress` do componente pai. Isso mantém o `requestAnimationFrame` limpo e previsível.
- **Mobile First Logic**: `useMediaQuery` ou Tailwind `md:` classes controlam breakpoints. O hook `useBeliefsScroll` expõe `isMobile` para alternar eixos de animação sem duplicar componentes.

---

## estados_de_ui
| Estado | Implementação | Rationale |
|---|---|---|
| **Loading** | `Suspense` + placeholder blur GLB ou `Skeleton` cinético. | Evita layout shift e bloqueio da main thread. |
| **Error** | `GhostErrorBoundary` renderiza SVG estático + texto fallback. | Falhas de rede ou WebGL unsupported não quebram a sessão. |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` desativa `inView` e `lerp`. Fallback estático com opacidade `1`. | Acessibilidade e compliance WCAG 2.2. |
| **Empty/No Content** | N/A (conteúdo estático). Mas `BeliefScrollText` valida `phrases.length > 0`. | Prevende crash em runtime se MDX/markdown falhar. |

---

## design_tokens
```js
// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      bluePrimary: '#0048ff',
      purpleDetails: '#8705f2',
      pinkDetails: '#f501d3',
      blueAccent: '#4fe6ff',
    },
    fontFamily: {
      display: ['var(--font-clash-display)', 'sans-serif'],
      h1: ['var(--font-inter)', 'sans-serif'],
    },
    zIndex: {
      'bg': '0',
      'overlay': '10',
      'scroll-content': '20',
      'header': '30',
      'text-manifesto': '40',
      'ghost-canvas': '50',
    },
    transitionTimingFunction: {
      'cine': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'soft-spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      'exit': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
}
```

---

## plano_de_implementacao
1. **Fase 1: Fundação** → Configurar `tailwind.config.ts`, criar `useBeliefsScroll` com `prefersReducedMotion`, montar estrutura de pastas.
2. **Fase 2: Camadas 2D** → Implementar `BeliefBackground`, `BeliefOverlay`, `BeliefFixedHeader` com `SplitText`. Validar `inView` e cross-fade.
3. **Fase 3: Texto Cinético** → `BeliefScrollText` + `BeliefManifesto`. Sincronizar com ciclo HSL. Ajustar `margin` e `stagger`.
4. **Fase 4: Ghost 3D** → Montar `GhostScene` com `useGLTF`, `lerp` no `useFrame`, cursor parallax e responsividade mobile.
5. **Fase 5: Orquestração** → Unir tudo em `AboutBeliefs.tsx`. Mapear `z-index`, `position`, e `overflow`. Adicionar `Suspense` e `ErrorBoundary`.
6. **Fase 6: QA & Deploy** → Playwright E2E, Lighthouse a11y/perf, Firebase Hosting pipeline, Supabase cache headers.

---

## snippets_iniciais
Abaixo estão os arquivos completos, prontos para cópia e substituição. Estrutura tipada, imports explícitos e zero dependências fantasma.

### `src/lib/motion/split-text.ts`
```ts
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
          className={mode === 'words' || mode === 'lines' ? 'inline-block mr-[0.25em]' : ''}
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

### `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
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
        ease: [0.22, 1, 0.36, 1],
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
      className="sticky top-0 z-[30] flex flex-col items-end justify-center gap-2 w-full px-6 md:px-12 py-8 pointer-events-none"
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

### `src/components/sobre/sections/AboutBeliefs.tsx`
```tsx
'use client';

import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { BeliefBackground } from '@/components/sobre/beliefs/BeliefBackground';
import { BeliefOverlay } from '@/components/sobre/beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '@/components/sobre/beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';
import { BeliefManifesto } from '@/components/sobre/beliefs/BeliefManifesto';

// Lazy load R3F to avoid SSR hydration mismatch & heavy initial bundle
const GhostScene = dynamic(
  () => import('@/components/sobre/3d/GhostScene').then((mod) => mod.GhostScene),
  { ssr: false, loading: () => <div className="w-full h-64 bg-white/5 animate-pulse rounded-xl" /> }
);

const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

export const AboutBeliefs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[400vh] overflow-hidden"
      data-testid="beliefs-section"
    >
      {/* Layer 0: Background HSL */}
      <BeliefBackground scrollProgress={scrollYProgress} />

      {/* Layer 1: Cross-fade Overlay */}
      <BeliefOverlay scrollProgress={scrollYProgress} />

      {/* Layer 2: Sticky Header */}
      <BeliefFixedHeader />

      {/* Layer 3 & 4: Text & Manifesto */}
      <div className="relative z-[40] w-full min-h-full flex flex-col justify-center pointer-events-none">
        <BeliefScrollText phrases={PHRASES} scrollProgress={scrollYProgress} />
        <BeliefManifesto scrollProgress={scrollYProgress} />
      </div>

      {/* Layer 5: Ghost 3D */}
      <div className="absolute inset-0 z-[50] pointer-events-none" aria-hidden="true">
        <GhostScene scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
};
```

---

## riscos_e_validacoes
| Risco Técnico | Mitigação Estratégica |
|---|---|
| **Scroll Jank em iOS** | Usar `touch-action: pan-y`, `will-change: transform` apenas nas camadas ativas. Evitar `useScroll` inline; manter no root. |
| **Z-Index Bleed** | Respeitar a stack `0 → 50` rigidamente. Nenhum filho de `GhostScene` pode usar `z-[999]`. Isolar em `div` separada. |
| **GLB Memory Leak** | Chamar `scene.traverse((obj) => obj.geometry?.dispose())` no unmount. Usar `useFrame` com `lerp` limitado a `60fps`. |
| **InView Margin Mismatch** | Testar `margin: '-30% 0px 0px 0px'` em viewports móveis com dynamic viewport height (`vh` vs `dvh`). Usar `IntersectionObserver` fallback se necessário. |
| **Reduced Motion Ignorado** | Garantir que `prefersReducedMotion` trave `animate()` em estado final. CSS `@media` deve sobrepor qualquer `motion.div`. |

### 🔍 Próximos Passos para Validação
1. Rode `pnpm exec playwright test` com `viewport: { width: 375, height: 812 }` e `{ width: 1920, height: 1080 }`.
2. Abra Chrome DevTools → Performance → Grave scroll. Verifique se `Layout` e `Paint` não ultrapassam 8ms/frame.
3. Compare quadro a quadro no Safari real (iOS) para validar `dvh` e `sticky` behavior.
4. Valide contraste do `#4fe6ff` sobre `#8705f2` com `axe-core`. Se falhar, aplique `text-shadow: 0 2px 8px rgba(0,0,0,0.4)`.

A arquitetura está pronta para receber a orquestração final. Quer que eu detalhe a implementação do `useBeliefsScroll` hook ou prefere focar na otimização do `GhostScene` com `drei/Environment` desligado em mobile primeiro?
