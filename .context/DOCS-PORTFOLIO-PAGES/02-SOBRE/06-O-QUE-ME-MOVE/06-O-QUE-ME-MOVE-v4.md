# leitura_visual_estrutural

## Composição da seção

A seção deve ser full-bleed, independente de `.std-grid`, com altura narrativa maior que a viewport e camadas absolutas/sticky/fixed sincronizadas pelo mesmo `scrollYProgress`.

A hierarquia visual correta é:

1. Fundo cromático vivo, ocupando 100% da seção.
2. Overlay preto quase imperceptível para suavizar transições entre cores vibrantes.
3. Header fixo/sticky à direita, com texto editorial curto.
4. Frases rotativas grandes em ciano, posicionadas à esquerda no desktop.
5. Manifesto final centralizado em três linhas: `ISSO É / GHOST / DESIGN`.
6. Ghost 3D acima de tudo, inclusive sobre a palavra `GHOST`.

## Desktop

Layout em três zonas:

```txt
[frase rotativa ciano]        [Ghost 3D central]        [BeliefFixedHeader]
esquerda / center-y           centro viewport           direita / sticky
```

A frase não deve aparecer no rodapé no desktop. Ela deve ficar verticalmente centralizada à esquerda, com largura controlada para não colidir com o Ghost. O header deve parecer uma âncora editorial estável, com entrada discreta pela direita.

## Mobile

A composição muda para reduzir competição visual:

```txt
[BeliefFixedHeader sticky top 20vh]
[Ghost 3D top-left, depois centro no clímax]
[frase rotativa centralizada próxima ao rodapé]
[manifesto final centralizado]
```

No mobile, o Ghost não deve reagir ao cursor e deve reduzir DPR/escala para preservar performance.

---

# mapa_de_animacoes

## 1. Background scroll-triggered

**Componente:** `BeliefBackground`
**Stack:** Motion DOM com `animate()` + `inView()`
**Gatilho:** entrada de cada `.scroll-section[data-index]` no viewport
**Propriedades animadas:** `backgroundColor` via Motion
**Duração:** `0.9s`
**Easing:** `[0.17, 0.55, 0.55, 1]`
**Regra crítica:** não usar `transition: background-color` nem fade entre divs.

Fluxo obrigatório, alinhado ao tutorial oficial da Motion (`js-scroll-triggered`):

1. Cada bloco de frase precisa ter `.belief-scroll-section` e `data-index`.
2. O observer é criado com `inView('.belief-scroll-section', callback, { amount })`.
3. No `callback`, calcular `stopIndex = dataIndex + 1`.
4. Rodar `animate(backgroundElement, { backgroundColor: stopColor }, { duration: 0.9, easing: [0.17, 0.55, 0.55, 1] })`.
5. O callback deve retornar função de cleanup para saída do viewport quando houver animação reversa desejada.
6. Em `prefers-reduced-motion`, aplicar `backgroundColor` direto sem transição longa.

Contrato de implementação (referência):

```ts
inView(
  '.belief-scroll-section',
  (element) => {
    const dataIndex = Number.parseInt(
      element.getAttribute('data-index') ?? '0',
      10
    );
    const stopColor =
      BELIEF_BACKGROUND_STOPS[
        Math.min(dataIndex + 1, BELIEF_BACKGROUND_STOPS.length - 1)
      ];

    animate(
      backgroundLayer,
      { backgroundColor: stopColor },
      {
        duration: 0.9,
        easing: [0.17, 0.55, 0.55, 1],
      }
    );

    return () => {
      // opcional: saída/reversão quando o elemento deixar o viewport
    };
  },
  { amount: 0.55 }
);
```

Paleta:

```ts
const BELIEF_BACKGROUND_STOPS = [
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013',
] as const;
```

## 2. Overlay anti-banding

**Componente:** `BeliefOverlay`
**Stack:** Motion `useTransform`
**Gatilho:** `scrollYProgress`
**Propriedade:** `opacity`
**Amplitude:** `0 → 0.1 → 0`
**Objetivo:** absorver banding e micro-glitches visuais em telas OLED.

## 3. BeliefFixedHeader com Split Text

**Componente:** `BeliefFixedHeader`
**Stack:** Motion + implementação local inspirada em Split Text
**Gatilho:** entrada da seção / viewport
**Entrada container:** `opacity 0→1`, `x 60→0`, `duration: 0.8s`
**Entrada palavras:** `opacity 0→1`, `y 12→0`, `stagger: 0.08s`
**Saída:** `opacity 1→0`, `x 0→60`, `duration: 0.5s`

A animação estilo Split Text deve operar por palavras ou linhas, não por letras individuais no header, para preservar legibilidade e evitar excesso de spans.

## 4. BeliefScrollText

**Componente:** `BeliefScrollText`
**Stack:** Motion `animate()` + `inView()`
**Gatilho:** cada frase entra no viewport
**Entrada desktop:** `opacity 0→1`, `y 18→0`, `filter blur(6px)→blur(0px)`
**Saída desktop:** `opacity 1→0`, `y 0→-18`, `filter blur(0px)→blur(6px)`
**Entrada mobile:** `opacity 0→1`, `x 24→0`, `filter blur(6px)→blur(0px)`
**Saída mobile:** `opacity 1→0`, `x 0→-24`, `filter blur(0px)→blur(6px)`
**Duração entrada:** `0.9s`
**Duração saída:** `0.5s`
**Easing:** `[0.17, 0.55, 0.55, 1]`

Observação de performance: `filter: blur()` pode custar mais que `transform/opacity`. Usar apenas nas frases principais, com fallback sem blur em mobile fraco ou `prefers-reduced-motion`.

Fluxo obrigatório para textos, seguindo o mesmo padrão da Motion (`inView` com cleanup de saída):

```ts
inView('.belief-scroll-section [data-phrase]', (element) => {
  animate(
    element,
    {
      opacity: 1,
      y: [18, 0], // desktop; em mobile trocar para x: [24, 0]
      filter: ['blur(6px)', 'blur(0px)'],
    },
    {
      duration: 0.9,
      easing: [0.17, 0.55, 0.55, 1],
    }
  );

  return () =>
    animate(
      element,
      {
        opacity: 0,
        y: -18, // desktop; em mobile trocar para x: -24
        filter: 'blur(6px)',
      },
      {
        duration: 0.5,
        easing: [0.17, 0.55, 0.55, 1],
      }
    );
});
```

Fallback `prefers-reduced-motion`:

- Remover blur.
- Reduzir deslocamento para `x/y: 8px → 0`.
- Usar fade curto (`opacity 0→1`, `duration: 0.2–0.3s`).
- Evitar stagger agressivo.

## 4.1 Nomenclatura Motion (regra de consistência)

Para este documento, usar os termos abaixo sem mistura:

- `scroll-triggered`: animação iniciada/parada por visibilidade, com `inView()` + `animate()`.
- `scroll-linked`: valor contínuo ligado ao progresso de scroll, com `useScroll()` ou `scroll()`.
- `whileInView`: permitido em casos declarativos de componente `motion`, mas não é a abordagem principal desta seção.

Fonte de decisão para esse padrão:

- Motion tutorial: `https://motion.dev/tutorials/js-scroll-triggered`
- Motion docs MCP: `motion://docs/js/inview`, `motion://docs/js/scroll`, `motion://docs/react/scroll-animations`

## 5. Manifesto final com Split Text

**Componente:** `BeliefManifesto`
**Stack:** Motion + Split Text por linha/palavra
**Gatilho:** `scrollYProgress >= 0.82`
**Entrada global:** `opacity 0→1`, `y 18→0` entre `0.82` e `0.92`
**Split:** cada linha entra com stagger curto, `0.04s–0.07s`, preservando bloco central
**Z-index:** `z-50`, abaixo do Ghost
**A11y:** `aria-live="polite"` somente quando ativo.

## 6. Ghost 3D

**Componente:** `GhostScene`
**Stack:** React Three Fiber + drei + three.js
**Gatilhos:** entrada da seção, scroll progress, cursor desktop
**Canvas:** `frameloop="demand"`
**Asset:** `site-assets/3d/ghost-v1.glb` via Supabase Storage
**Entrada:** `opacity 0→1`, `scale 0.95→1`, `duration: 1.2s`, easing `[0.22, 1, 0.36, 1]`
**Desktop:** cursor parallax suave ±0.4 world units
**Mobile:** posição top-left até clímax
**Clímax:** quando `p > 0.85`, centralizar `x/y` e aumentar escala +10%.

---

# arquitetura_recomendada

## Server Components

Usar Server Component para a página `/sobre`, composição estática da rota e metadados.

```txt
app/
  sobre/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx
```

`page.tsx` deve importar a seção `AboutBeliefs` de forma normal se ela já estiver otimizada internamente, ou via `dynamic()` apenas para o bloco WebGL se o bundle inicial estiver pesado.

## Client Components

Todos os componentes que usam Motion hooks, `inView`, `animate`, `useScroll`, `useReducedMotion`, `Canvas`, `useFrame`, `useGLTF`, cursor ou `matchMedia` devem começar com `"use client"`.

Componentes client obrigatórios:

```txt
src/components/sobre/sections/AboutBeliefs.tsx
src/components/sobre/beliefs/BeliefsScrollContext.tsx
src/components/sobre/beliefs/BeliefBackground.tsx
src/components/sobre/beliefs/BeliefOverlay.tsx
src/components/sobre/beliefs/BeliefFixedHeader.tsx
src/components/sobre/beliefs/BeliefScrollText.tsx
src/components/sobre/beliefs/BeliefManifesto.tsx
src/components/sobre/3d/GhostScene.tsx
src/components/sobre/3d/GhostErrorBoundary.tsx
```

## Suspense

Usar `Suspense` em volta do `GhostScene`, porque o GLB é asset carregado sob demanda. O fallback deve ser visualmente compatível, não um spinner genérico.

```tsx
<Suspense fallback={<GhostSceneFallback />}>
  <GhostScene />
</Suspense>
```

---

# estrutura_de_pastas

```txt
app/
  sobre/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx

src/
  components/
    sobre/
      sections/
        AboutBeliefs.tsx
      beliefs/
        BeliefsScrollContext.tsx
        BeliefBackground.tsx
        BeliefOverlay.tsx
        BeliefFixedHeader.tsx
        BeliefScrollText.tsx
        BeliefManifesto.tsx
        SplitTextMotion.tsx
      3d/
        GhostScene.tsx
        GhostModel.tsx
        GhostSceneFallback.tsx
        GhostErrorBoundary.tsx

  config/
    beliefTokens.ts
    motion.ts

  hooks/
    useBeliefsScroll.ts
    useMediaQuery.ts
    usePointerParallax.ts

  lib/
    supabase/
      storage.ts

  store/
    beliefStore.ts

  types/
    beliefs.ts
```

---

# estrategia_de_componentes

## `AboutBeliefs.tsx`

Responsável apenas por orquestrar a seção. Não deve conter lógica pesada de animação.

Responsabilidades:

- Criar `containerRef`.
- Fornecer `scrollYProgress` via context.
- Renderizar camadas em ordem.
- Definir altura narrativa.
- Incluir `Suspense` e `GhostErrorBoundary`.

## `BeliefsScrollContext.tsx`

Contrato único de scroll:

```ts
type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};
```

## `BeliefBackground.tsx`

Lê as `.scroll-section[data-index]` e muda a cor do background via `animate()`. Deve limpar observers automaticamente pelo retorno de `inView`.

## `BeliefScrollText.tsx`

Renderiza as seis frases com `data-index`, cada uma com altura `h-[80vh]`, e anima entrada/saída.

## `SplitTextMotion.tsx`

Componente utilitário para `BeliefFixedHeader` e `BeliefManifesto`.

Contrato:

```ts
type SplitTextMotionProps = {
  text: string;
  as?: 'p' | 'span' | 'h2' | 'div';
  mode?: 'words' | 'chars' | 'lines';
  active?: boolean;
  className?: string;
  stagger?: number;
  delay?: number;
};
```

## `GhostScene.tsx`

Deve isolar Canvas/WebGL. Nunca misturar lógica de DOM textual dentro da cena 3D.

Responsabilidades:

- Carregar GLB via Supabase Storage public URL.
- Usar `frameloop="demand"`.
- Invalidar render apenas quando scroll/cursor muda.
- Fazer dispose de geometries/materials no unmount.
- Ter fallback se WebGL falhar.

---

# estados_de_ui

## Loading

### Rota `/sobre/loading.tsx`

Usar skeleton escuro editorial:

```tsx
export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#040013] text-white">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center px-6">
        <div className="space-y-4">
          <div className="h-3 w-48 animate-pulse rounded-full bg-white/20" />
          <div className="h-12 w-[70vw] max-w-2xl animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>
    </main>
  );
}
```

### Ghost loading

Fallback estático:

```tsx
function GhostSceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
```

## Empty

Aplicável se frases ou manifesto vierem de CMS/Supabase no futuro.

Estado recomendado:

```tsx
if (!phrases.length) {
  return (
    <section className="min-h-[60vh] bg-[#040013] text-white">
      <p className="mx-auto max-w-xl px-6 py-24 text-white/60">
        Manifesto temporariamente indisponível.
      </p>
    </section>
  );
}
```

## Error

### `app/sobre/error.tsx`

Client Component com reset:

```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#040013] px-6 text-white">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">
          Não foi possível carregar a página.
        </h1>
        <p className="text-white/60">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
```

## Not Found

`not-found.tsx` deve manter a identidade dark e oferecer retorno para home/sobre.

---

# design_tokens

```ts
// src/config/beliefTokens.ts
export const beliefColors = {
  deepVoid: '#040013',
  bluePrimary: '#0048ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  blueAccent: '#4fe6ff',
  white: '#ffffff',
} as const;

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

Tailwind v4 pode mapear esses valores em CSS variables globais ou utilities locais. Evitar hardcode disperso em vários componentes.

---

# plano_de_implementacao

## Fase 1 — Consolidar contrato da seção

Atualizar o documento `06-O-QUE-ME-MOVE-AJUSTE.md` para v4 com estas decisões:

- Motion DOM é obrigatório para background, textos, overlay e manifesto.
- R3F é permitido apenas para `GhostScene`.
- Split Text será componente local `SplitTextMotion`, inspirado no comportamento ReactBits, para evitar dependência visual opaca.
- Ghost continua em `z-[70]`.
- Background muda por `animate()` + `inView()`, não por CSS transition.

## Fase 2 — Criar tokens e tipos

Criar:

```txt
src/config/beliefTokens.ts
src/types/beliefs.ts
```

Tipos mínimos:

```ts
export type BeliefPhrase = {
  id: string;
  text: string;
  backgroundStopIndex: number;
};
```

## Fase 3 — Implementar provider de scroll

Criar `useBeliefsScroll.ts` com:

- `useScroll({ target, offset: ['start end', 'end end'] })`
- `useReducedMotion()`
- `useMediaQuery('(max-width: 767px)')`

## Fase 4 — Implementar camadas DOM

Ordem:

1. `BeliefBackground`
2. `BeliefOverlay`
3. `BeliefFixedHeader`
4. `BeliefScrollText`
5. `BeliefManifesto`

Validar que nenhum componente usa `top/left` animados. Posição pode ser fixa via CSS, mas a animação deve ocorrer por `x`, `y`, `scale`, `opacity`.

## Fase 5 — Implementar Ghost 3D

- `GhostErrorBoundary`
- `GhostSceneFallback`
- `GhostScene`
- `GhostModel`

Usar `dynamic()` ou `Suspense` para não bloquear a rota.

## Fase 6 — QA visual e performance

Checklist:

- FPS acima de 50 em desktop.
- DPR reduzido em mobile.
- Sem layout shift ao entrar na seção.
- `prefers-reduced-motion` remove floating, parallax, stagger agressivo e blur.
- Ghost sobrepõe o manifesto no clímax.
- Background retorna para `#040013` no final.
- Foco do teclado não fica preso em seção sticky.
- Canvas tem fallback acessível.

---

# snippets_iniciais

## `src/hooks/useBeliefsScroll.ts`

```tsx
'use client';

import { RefObject, useEffect, useState } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
```

## `src/components/sobre/sections/AboutBeliefs.tsx`

```tsx
'use client';

import { Suspense, useRef } from 'react';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';
import { GhostScene } from '../3d/GhostScene';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement | null>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider value={{ containerRef, ...scroll }}>
      <section
        ref={containerRef}
        id="o-que-me-move"
        aria-labelledby="o-que-me-move-title"
        className="relative min-h-[620vh] overflow-clip bg-[#040013] text-white"
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

## `src/components/sobre/beliefs/BeliefBackground.tsx`

```tsx
'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import { beliefColors, beliefMotion } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

const stops = [
  beliefColors.deepVoid,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.deepVoid,
] as const;

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    const stop = inView(
      '.belief-scroll-section',
      (element) => {
        const index = Number.parseInt(
          element.getAttribute('data-index') ?? '0',
          10
        );

        const color = stops[Math.min(index + 1, stops.length - 1)];

        if (shouldReduceMotion) {
          ref.current!.style.backgroundColor = color;
          return;
        }

        animate(
          ref.current!,
          { backgroundColor: color },
          {
            duration: beliefMotion.revealDuration,
            ease: beliefMotion.ambientEase,
          }
        );
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-0 bg-[#040013]"
    />
  );
}
```

## `src/components/sobre/beliefs/SplitTextMotion.tsx`

```tsx
'use client';

import { motion, Variants } from 'motion/react';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import { beliefMotion } from '@/config/beliefTokens';

type SplitTextMotionProps<T extends ElementType> = {
  as?: T;
  text: string;
  active?: boolean;
  mode?: 'words' | 'chars';
  stagger?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  as,
  text,
  active = true,
  mode = 'words',
  stagger = beliefMotion.wordStagger,
  className,
  ...props
}: SplitTextMotionProps<T>) {
  const Component = motion(as ?? 'span');
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component
      className={className}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      {...props}
    >
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          variants={itemVariants}
          transition={{
            duration: 0.42,
            ease: beliefMotion.softEase,
          }}
          className="inline-block will-change-transform"
        >
          {unit === ' ' ? '\u00A0' : unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </Component>
  );
}
```

## `src/components/sobre/beliefs/BeliefManifesto.tsx`

```tsx
'use client';

import { motion, useTransform } from 'motion/react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);

  return (
    <motion.div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 text-center"
      style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
    >
      <div className="font-display text-[clamp(3.5rem,16vw,12rem)] font-black uppercase leading-[0.82] tracking-[0.03em] text-white">
        {['ISSO É', 'GHOST', 'DESIGN'].map((line) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            stagger={0.06}
            className="block"
          />
        ))}
      </div>
    </motion.div>
  );
}
```

---

# riscos_e_validacoes

## Riscos técnicos

1. **Acesso às referências externas:** não foi possível validar visualmente `drinksom.eu` nem a página live `portfoliodanilo.com/sobre` nesta resposta. A implementação deve ser conferida manualmente contra a referência aberta no navegador.

2. **Vídeo local indisponível:** o arquivo `anima.mov` citado está em um caminho local do usuário, não anexado aqui. O timing fino do background precisa ser validado diretamente no vídeo.

3. **`filter: blur()` pode custar performance:** manter blur pequeno, usar somente nos textos principais e remover em `prefers-reduced-motion`.

4. **WebGL em mobile:** reduzir DPR, evitar post-processing, limitar draw calls, usar `frameloop="demand"` e fallback estático.

5. **Z-index e stacking context:** qualquer `transform`, `opacity` ou `isolation` em parents pode criar stacking contexts inesperados. Validar no DevTools/3D View.

6. **Supabase Storage:** usar apenas URL pública ou signed URL gerada em camada segura. Não hardcodar service role key, tokens ou secrets no client.

---

# prompt_final_para_agent

````md
# TASK: Ajustar e implementar a seção `06-O-QUE-ME-MOVE` da página `/sobre`

Você é um engenheiro frontend sênior especializado em Next.js App Router, React + TypeScript, Tailwind CSS, Motion for React, React Three Fiber, drei, three.js, Firebase Hosting e Supabase Storage.

Implemente a seção manifesto `O Que Me Move` do portfolio `portfoliodanilo.com/sobre` como uma experiência scroll-driven cinematográfica, com background cromático animado, textos com Split Text, manifesto final e Ghost 3D em WebGL.

## Stack obrigatória

- Next.js App Router usando `app/`
- React + TypeScript
- Tailwind CSS
- Motion for React / Motion JS
- React Three Fiber + @react-three/drei + three.js somente para o Ghost 3D
- Firebase Hosting para deploy
- Supabase Storage para assets públicos de mídia/GLB
- Não usar GSAP nesta seção
- Não expor secrets, service role keys ou credenciais no client

## Arquitetura de arquivos obrigatória

Criar ou ajustar:

app/
sobre/
page.tsx
loading.tsx
error.tsx
not-found.tsx

src/
components/
sobre/
sections/
AboutBeliefs.tsx
beliefs/
BeliefsScrollContext.tsx
BeliefBackground.tsx
BeliefOverlay.tsx
BeliefFixedHeader.tsx
BeliefScrollText.tsx
BeliefManifesto.tsx
SplitTextMotion.tsx
3d/
GhostScene.tsx
GhostModel.tsx
GhostSceneFallback.tsx
GhostErrorBoundary.tsx
hooks/
useBeliefsScroll.ts
useMediaQuery.ts
usePointerParallax.ts
config/
beliefTokens.ts
motion.ts
lib/
supabase/
storage.ts
store/
beliefStore.ts
types/
beliefs.ts

## Camadas visuais e z-index

A ordem é imutável:

1. `BeliefBackground` — `z-0`
2. `BeliefOverlay` — `z-10`
3. `BeliefFixedHeader` — `z-30`
4. `BeliefScrollText` — `z-40`
5. `BeliefManifesto` — `z-50`
6. `GhostScene` — `z-[70]`

O Ghost 3D deve permanecer acima do manifesto no clímax, sobrepondo parcialmente a palavra `GHOST`.

## Contrato de scroll

Criar hook central `useBeliefsScroll.ts`:

- Usar `useScroll({ target: containerRef, offset: ['start end', 'end end'] })`
- Usar `useReducedMotion()` do Motion
- Detectar mobile com `matchMedia('(max-width: 767px)')`
- Compartilhar `scrollYProgress`, `isMobile` e `shouldReduceMotion` via `BeliefsScrollContext`

## Background animado

Implementar `BeliefBackground` com Motion `animate()` + `inView()`.

Paleta obrigatória:

```ts
[
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013',
];
```
````

Regras:

- Cada frase de `BeliefScrollText` deve ter `.belief-scroll-section` e `data-index`.
- Ao entrar no viewport, calcular `stopIndex = dataIndex + 1`.
- Animar o `backgroundColor` do container com:
  - `duration: 0.9`
  - `ease: [0.17, 0.55, 0.55, 1]`

- Não usar `transition: background-color`.
- Não usar fade simples entre divs.
- Em `prefers-reduced-motion`, aplicar a cor diretamente sem animação longa.

## Overlay anti-banding

Implementar `BeliefOverlay`:

- `absolute inset-0 z-10 pointer-events-none bg-black`
- Opacidade derivada de `scrollYProgress`
- Pulsar suavemente entre `0`, `0.1`, `0`
- Objetivo: reduzir banding visual em transições de cores vibrantes

## BeliefFixedHeader

Texto fixo:

Linha 1:
`Acredito no design que muda o dia de alguém.`

Linha 2:
`Não pelo choque, mas pela conexão.`

Desktop:

- Sticky no topo, alinhado à direita
- `max-w-sm`
- `text-right`
- `z-30`
- Entrada: `opacity: 0 → 1`, `x: 60 → 0`, `duration: 0.8`, ease `[0.22, 1, 0.36, 1]`
- Split Text por palavras:
  - `opacity: 0 → 1`
  - `y: 12 → 0`
  - `stagger: 0.08`

Mobile:

- `sticky top-[20vh]`
- Mesma animação, sem competir com a frase principal

## BeliefScrollText

Frases obrigatórias:

1. `Um vídeo que respira`
2. `Uma marca que se reconhece`
3. `Um detalhe que fica`
4. `Crio para gerar presença`
5. `Mesmo quando não estou ali`
6. `Mesmo quando ninguém percebe o esforço`

Desktop:

- Cada frase em uma section `h-[80vh]`
- Alinhar à esquerda e verticalmente ao centro
- `font-h1`, `font-bold`, italic
- Cor `#4fe6ff`
- Tamanho `clamp(2.8rem, 5.8vw, 6.3rem)`
- Max width `max-w-[38vw] lg:max-w-[34vw]`
- Entrada com Motion:
  - `opacity: 0 → 1`
  - `y: 18 → 0`
  - `filter: blur(6px) → blur(0px)`
  - `duration: 0.9`
  - `ease: [0.17, 0.55, 0.55, 1]`

- Saída:
  - `opacity: 1 → 0`
  - `y: 0 → -18`
  - `filter: blur(0px) → blur(6px)`
  - `duration: 0.5`

Mobile:

- Centralizar horizontalmente
- Ancorar próximo a `20vh` do rodapé
- `text-center px-6`
- Tamanho `clamp(2rem, 8vw, 3rem)`

## BeliefManifesto

Texto:

ISSO É
GHOST
DESIGN

Regras:

- `fixed inset-0 z-50`
- Centralizado
- `font-display font-black text-white uppercase`
- `tracking-[0.03em] leading-[0.82]`
- Tamanho `clamp(3.5rem, 16vw, 12rem)`
- Reveal controlado por `scrollYProgress`
  - opacity `0 → 1` entre `0.82` e `0.9`
  - y `18 → 0` entre `0.82` e `0.92`

- Usar `SplitTextMotion` para animar palavras/linhas com stagger curto
- `aria-live="polite"` apenas quando ativo

## SplitTextMotion

Criar componente reutilizável inspirado no padrão Split Text:

Props:

```ts
type SplitTextMotionProps = {
  text: string;
  as?: 'p' | 'span' | 'h2' | 'div';
  mode?: 'words' | 'chars';
  active?: boolean;
  className?: string;
  stagger?: number;
  delay?: number;
};
```

Regras:

- Usar Motion declarativo
- Cada palavra/letra deve ser `inline-block`
- Animar somente `opacity` e `transform`
- Não quebrar acessibilidade do texto
- Evitar split por char em textos longos

## GhostScene 3D

Implementar com React Three Fiber.

Regras:

- Container `fixed` ou `sticky` com `z-[70]`
- `pointer-events-none`
- Canvas com `frameloop="demand"`
- `dpr={[1, isMobile ? 1 : 2]}`
- Camera:
  - desktop `position: [0, 0, 6]`
  - mobile `position: [0, 0, 7]`
  - `fov: 35`

- GLB via Supabase Storage:
  - `site-assets/3d/ghost-v1.glb`
  - resolver URL via helper `getAssetUrl(path)`

- Não hardcodar secrets

Animação:

- Entrada do container:
  - `opacity: 0 → 1`
  - `scale: 0.95 → 1`
  - `duration: 1.2`
  - ease `[0.22, 1, 0.36, 1]`

- Floating determinístico:
  - `floatSpeed = 0.6 + p * 0.6`
  - `floatAmplitude = 0.036 + p * 0.03`
  - `floatY = Math.sin(t * floatSpeed) * floatAmplitude`
  - `rotationY = Math.sin(t * (0.4 + p * 0.4)) * (0.06 + p * 0.04)`

- Desktop:
  - cursor parallax normalizado `-1 → 1`
  - mapear para `±0.4` world units

- Mobile:
  - baseline top-left: `x: -1.2`, `y: 1.5`
  - sem cursor parallax

- Clímax:
  - quando `p > 0.85`, mover `x → 0`, `y → 0`
  - aumentar scale em +10%
  - Ghost deve sobrepor visualmente a palavra `GHOST`

Performance:

- Chamar `invalidate()` quando `scrollYProgress` ou cursor mudar
- Limitar lerp por frame com cap `0.15`
- Fazer dispose de geometry/material no unmount
- Envolver Canvas em `GhostErrorBoundary`
- Criar `GhostSceneFallback`

## Estados de UI

Implementar:

- `app/sobre/loading.tsx` com skeleton dark editorial
- `app/sobre/error.tsx` como Client Component com botão `reset()`
- `app/sobre/not-found.tsx`
- `GhostSceneFallback` para WebGL indisponível
- Empty state se a lista de frases for carregada de fonte externa e vier vazia

## Acessibilidade e performance

Obrigatório:

- Respeitar `prefers-reduced-motion`
- Em reduced motion:
  - remover floating contínuo
  - remover cursor parallax
  - reduzir stagger
  - trocar animações longas por fade simples

- Não animar `width`, `height`, `top`, `left`, `margin`, `padding`
- Usar principalmente `transform` e `opacity`
- Evitar flashes acima de 3 vezes por segundo
- Não prender foco em área sticky
- Canvas deve ser decorativo com fallback 2D
- Garantir contraste do texto ciano sobre fundos vibrantes com sombra sutil se necessário

## Critérios de aceitação

- A seção começa em `#040013`
- As seis frases entram em scroll e sincronizam com a troca de cor
- O background usa Motion `animate()` + `inView()`, não CSS transition
- `BeliefFixedHeader` usa Split Text por palavras
- `BeliefManifesto` usa Split Text no clímax
- Ghost 3D aparece acima de todas as camadas em `z-[70]`
- Ghost centraliza e escala +10% após `scrollYProgress > 0.85`
- No desktop, Ghost reage suavemente ao cursor
- No mobile, Ghost começa top-left e centraliza apenas no clímax
- A rota `/sobre` possui loading, error e not-found
- WebGL tem fallback e error boundary
- A implementação não expõe secrets de Supabase
- A seção mantém performance estável em mobile e desktop

```

```
