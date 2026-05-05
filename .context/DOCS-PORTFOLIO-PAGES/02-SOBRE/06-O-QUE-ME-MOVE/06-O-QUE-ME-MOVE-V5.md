# 06-O-QUE-ME-MOVE — Blueprint de Implementação Atualizado

**Página:** `/sobre`  
**Seção:** `06-O-QUE-ME-MOVE`  
**Projeto:** Portfólio Danilo — Ghost Design  
**Stack alvo:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4 Oxide, Motion, React Three Fiber + Drei  
**Status:** blueprint de ajuste para implementação orientada por referências visuais, documentos anexados e instruções de motion.

---

## 1. resumo_executivo

O objetivo técnico desta atualização é transformar a seção `06-O-QUE-ME-MOVE` em uma sequência de scrollytelling editorial onde background, textos e Ghost 3D respiram como um único sistema: o usuário rola, a cor muda, as frases entram e saem em ritmo controlado, o manifesto final assume a hierarquia visual e o Ghost permanece em camada superior como presença viva.

A implementação recomendada mantém **Next.js App Router** com páginas/layouts como **Server Components por padrão** e isola interatividade em **Client Components** apenas quando houver `Motion`, hooks de scroll, `inView`, browser APIs ou `Canvas` WebGL. Use **Motion** para animações DOM, scroll progressivo, reveals, máscaras, fades e microinterações. Use **React Three Fiber** somente para a camada `GhostScene`, pois ela exige Canvas WebGL, modelo 3D, câmera, luzes e controle de renderização.

**Grau de confiança da análise:** alto para os requisitos internos, capturas anexadas, tokens do Ghost System e blueprint congelado; médio para as referências externas de comportamento, porque `Motion` e `React Bits` foram analisáveis em documentação textual, enquanto `drinksom.eu` deve ser tratado como referência visual/conceitual de 3D imersivo, não como especificação exata de timing/código.

---

## 2. leitura_visual_estrutural

### Fatos observáveis

- As capturas anexadas mostram duas famílias de composição:
  - fundo azul intenso com tipografia branca massiva `ISSO É / GHOST / DESIGN`;
  - fundo magenta intenso com bloco textual manifesto à direita e chamada em ciano.
- O Ghost 3D aparece como personagem branco, com olhos pretos, cartola preta e faixa vermelha.
- No clímax azul, o Ghost fica sobre o manifesto e mantém prioridade visual.
- No layout desktop, a composição é ampla, centralizada e editorial, com manifesto dominando o viewport.
- No layout mobile, a composição empilha elementos verticalmente, mantendo Ghost no topo/centro e chamada secundária na área inferior.
- O documento aprovado exige:
  - clímax final em azul `#0048ff`;
  - manifesto final branco integral;
  - max-width interno `1680px`;
  - grid responsivo `4/8/12`;
  - Motion DOM limitado a `opacity`, `blur` e `translateY`;
  - proibição de `scale`, `rotate` e `bounce` na coreografia DOM principal;
  - Ghost acima do manifesto por z-index/camada;
  - `frameloop="demand"` na cena 3D;
  - suporte a `prefers-reduced-motion`.

### Inferências plausíveis

- A narrativa deve funcionar como uma seção longa, com conteúdo fixo/sticky enquanto o scroll altera estados visuais.
- A troca de cor do background deve acompanhar as frases e/ou marcos do scroll, criando sensação de respiração cromática.
- O Ghost deve parecer flutuar de forma contida, não “dançar”; a presença deve ser premium, silenciosa e controlada.
- Os textos fixos e o manifesto final podem usar uma abordagem de `SplitText` em palavras/linhas, desde que os movimentos respeitem o contrato do projeto: `opacity`, `blur`, `translateY`, sem deslocamentos laterais, rotação ou escala na camada DOM principal.
- A referência Motion de scroll-triggered confirma o padrão de `inView + animate + cleanup`, útil para entrada e reset bidirecional das seções/frases.
- A referência React Bits Split Text confirma uma API mental útil para texto fragmentado: `splitType`, `delay`, `duration`, `ease`, `from`, `to`, `threshold` e `rootMargin`.

### Hipóteses técnicas

- O arquivo local `anima.mov` mencionado pelo briefing não foi acessado diretamente neste ambiente; portanto, qualquer detalhe de timing do vídeo deve ser validado visualmente no projeto local.
- A referência `drinksom.eu` deve ser usada como direção de arte para sensação 3D/imersiva, não como cópia literal de câmera, iluminação ou shader.
- O Ghost 3D provavelmente já existe como asset ou componente no projeto; este blueprint assume manutenção da cena existente com ajustes de pose, z-index, render loop e scroll intensity, não recriação do modelo.

---

## 3. mapa_de_animacoes

| Animação | Gatilho | Alvo | Técnica recomendada | Easing | Duração | Responsividade | Fallback reduced motion |
|---|---|---|---|---|---:|---|---|
| Background cromático progressivo | `scrollProgress` da seção e/ou `inView('.scroll-section')` | `BeliefBackground` | `animate()` do Motion para `backgroundColor`, com cleanup bidirecional | `GHOST_EASE_AMBIENT = [0.17, 0.55, 0.55, 1]` | `0.9s` entrada, `0.6s` reset | Desktop e mobile usam mesma sequência; mobile deve evitar flashes por scroll rápido | Remover transição cromática animada e aplicar cor por estado com cross-fade mínimo |
| Overlay anti-banding | mudança de `scrollProgress` | `BeliefOverlay` | Opacidade sutil interpolada por MotionValue | `GHOST_EASE_AMBIENT` | contínuo por scroll | Intensidade menor em mobile para não sujar contraste | Overlay estático `opacity` baixa |
| Header fixo `BeliefFixedHeader` | entrada da seção / primeira ativação | texto fixo editorial | reveal por palavras/linhas com SplitText adaptado, usando `opacity`, `blur`, `translateY` | `GHOST_EASE = [0.22, 1, 0.36, 1]` | `0.8s` por grupo; stagger `40–70ms` | `top-[14vh] md:top-0`; alinhamento à direita no desktop | Mostrar texto sem stagger, apenas `opacity: 1`, `filter: none`, `y: 0` |
| Frases rotativas | `scrollProgress` em 6 janelas narrativas | `BeliefScrollText` | troca de frase com entrada `opacity 0→1`, `y 18→0`, `blur 6→0`; saída `opacity 1→0`, `y 0→-18`, `blur 0→6` | `GHOST_EASE` | `0.55–0.8s` | Desktop: bloco à esquerda centralizado verticalmente; Mobile: bloco centralizado e ancorado em `pb-[20vh]` | Cross-fade sem deslocamento e sem blur |
| Manifesto final | `scrollProgress` entre `0.56→0.72` | `BeliefManifesto` | reveal por linhas/palavras, manifesto fixo, branco integral | `GHOST_EASE` para texto; `GHOST_EASE_AMBIENT` para fade global | `0.8–1.2s` | `font-size: clamp(4rem, 17vw, 13rem)`; preservar legibilidade em mobile | Manifesto visível estático no clímax |
| Ghost 3D scroll-linked | `scrollProgress` da seção | `GhostScene` wrapper + modelo | DOM wrapper apenas `opacity` e `translateY`; dentro do Canvas usar `useFrame` com lerp leve e `invalidate()` | lerp interno cap `0.10–0.15`; DOM com `GHOST_EASE` | contínuo por scroll | `dpr={[1, 2]}` desktop; reduzir detalhe/efeitos em mobile | Trocar Canvas por fallback SVG/PNG estático |
| Clímax azul | `scrollProgress >= 0.82` | background + manifesto + Ghost | lock final do fundo em `#0048ff`; manifesto domina leitura; Ghost acima em `--z-layer-lightbox` | sem novo easing; estado travado | imediato após cruzar threshold, com transição curta se necessário | Deve bater em desktop e mobile | Estado final estático azul + manifesto + Ghost fallback |

### Sequência cromática recomendada

```ts
export const BELIEF_COLOR_STOPS = [
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
] as const
```

### Frases oficiais preservadas

```ts
export const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const
```

### Manifesto final

```txt
ISSO É
GHOST
DESIGN
```

---

## 4. arquitetura_recomendada

### Divisão Server/Client

A seção deve ser importada por uma página Server Component, mas o orquestrador da seção deve ser Client Component porque depende de scroll, MotionValues, refs e browser APIs.

- Server Component:
  - `app/sobre/page.tsx`
  - layouts e composição estática da rota.
- Client Components:
  - `AboutBeliefs.tsx`
  - `BeliefsScrollProvider.tsx`
  - `BeliefBackground.tsx`
  - `BeliefOverlay.tsx`
  - `BeliefFixedHeader.tsx`
  - `BeliefScrollText.tsx`
  - `BeliefManifesto.tsx`
  - `GhostScene.tsx`

### Motion DOM

Use Motion para:

- `scroll()` / `useScroll`;
- `useTransform`;
- `motion.div`;
- `animate`;
- `inView`;
- reveals por `opacity`, `blur` e `translateY`;
- cleanup bidirecional ao sair do viewport;
- `useReducedMotion`.

Não use Motion DOM para `scale`, `rotate`, `bounce`, `x`, `left`, `top`, `width`, `height`, `margin` ou `padding` na coreografia principal desta seção.

### React Three Fiber

Use React Three Fiber apenas em `GhostScene`, dentro de `Canvas`.

Regras:

- `useFrame` e `useThree` ficam somente dentro do contexto do `Canvas`.
- Não usar `setState` pesado dentro de `useFrame`.
- Usar refs e lerp para pose/câmera.
- Manter `frameloop="demand"` e chamar `invalidate()` apenas quando `scrollProgress` ou pose exigirem render.
- Definir `dpr={[1, 2]}`.
- Fornecer fallback SVG/PNG quando WebGL falhar.

### Boundary de erro

Manter apenas um `GhostErrorBoundary` na integração da seção, preferencialmente ao redor de `GhostScene` em `AboutBeliefs.tsx`. Evitar boundary duplicado dentro de `GhostScene`.

---

## 5. estrutura_de_pastas

```txt
src/
  app/
    sobre/
      page.tsx
      loading.tsx
      error.tsx
      not-found.tsx

  components/
    sobre/
      sections/
        AboutBeliefs.tsx

      beliefs/
        BeliefsScrollProvider.tsx
        BeliefBackground.tsx
        BeliefOverlay.tsx
        BeliefFixedHeader.tsx
        BeliefScrollText.tsx
        BeliefManifesto.tsx
        SplitGhostText.tsx
        belief.constants.ts
        belief.types.ts

      3d/
        GhostScene.tsx
        GhostModel.tsx
        GhostFallback.tsx
        GhostErrorBoundary.tsx

  hooks/
    useBeliefsScroll.ts
    usePrefersReducedMotion.ts

  config/
    motion.ts

  store/
    beliefStore.ts

  styles/
    beliefs.css

public/
  models/
    ghost/
      ghost.glb

  images/
    sobre/
      ghost-fallback.png

test/
  e2e/
    about-beliefs.spec.ts
```

---

## 6. estrategia_de_componentes

### `AboutBeliefs`

Responsabilidade: orquestrar a seção, declarar altura narrativa, fornecer contexto de scroll, compor camadas e preservar z-index.

- Tipo: Client Component.
- Recebe: nenhum dado externo obrigatório.
- Contém:
  - `BeliefsScrollProvider`
  - `BeliefBackground`
  - `BeliefOverlay`
  - `BeliefFixedHeader`
  - `BeliefScrollText`
  - `BeliefManifesto`
  - `GhostErrorBoundary`
  - `GhostScene`

### `BeliefsScrollProvider`

Responsabilidade: centralizar `sectionRef`, `scrollYProgress`, frase ativa, estado de clímax e flags de reduced motion.

Tipos sugeridos:

```ts
export type BeliefScrollContextValue = {
  sectionRef: React.RefObject<HTMLElement | null>
  scrollYProgress: MotionValue<number>
  activePhraseIndex: number
  isClimax: boolean
  prefersReducedMotion: boolean
}
```

### `BeliefBackground`

Responsabilidade: trocar cor do fundo com base nos stops cromáticos e garantir reset bidirecional.

Regras:

- Usar `animate()` do Motion.
- Usar `inView('.scroll-section')` quando houver sections sentinela.
- Retornar cleanup function para reverter cor ao sair.
- Usar `GHOST_EASE_AMBIENT`.
- Trava final em `scrollProgress >= 0.82` com `#0048ff`.

### `BeliefOverlay`

Responsabilidade: overlay anti-banding discreto.

Regras:

- `pointer-events-none`;
- opacidade baixa;
- nunca reduzir contraste abaixo do aceitável;
- desligar pulsos em reduced motion.

### `BeliefFixedHeader`

Responsabilidade: texto fixo editorial com reveal fragmentado.

Regras:

- `fixed inset-x-0 top-[14vh] md:top-0`;
- alinhamento à direita;
- reveal com `SplitGhostText`;
- não usar `x`;
- manter `aria-hidden` nos spans fragmentados e uma versão acessível para leitores de tela quando necessário.

### `BeliefScrollText`

Responsabilidade: frases rotativas da narrativa.

Regras:

- 6 frases oficiais em ordem imutável.
- Espelhar frase ativa em `aria-live="polite"`.
- Desktop: leitura à esquerda, centralizada verticalmente.
- Mobile: bloco centralizado e ancorado na parte inferior com `pb-[20vh]`.
- Entrada e saída com `opacity`, `translateY` e `blur`.

### `BeliefManifesto`

Responsabilidade: clímax tipográfico final.

Regras:

- texto fixo:
  - `ISSO É`
  - `GHOST`
  - `DESIGN`
- branco integral;
- `font-size: clamp(4rem, 17vw, 13rem)`;
- revelar entre `scrollProgress 0.56→0.72`;
- `z-index: var(--z-layer-overlay)`;
- Ghost deve ficar acima em `var(--z-layer-lightbox)`.

### `SplitGhostText`

Responsabilidade: adaptar a lógica React Bits Split Text ao contrato Ghost.

Regras:

- API inspirada em SplitText:
  - `text`
  - `as`
  - `splitType`
  - `delay`
  - `duration`
  - `ease`
  - `from`
  - `to`
- Implementar com Motion ou GSAP, mas preferir Motion para reduzir dependência se GSAP não estiver no projeto.
- Se GSAP for usado, usar `@gsap/react` com cleanup correto.
- O padrão visual deve ser:
  - `from: { opacity: 0, y: 18, filter: 'blur(6px)' }`
  - `to: { opacity: 1, y: 0, filter: 'blur(0px)' }`
- Nunca usar `x`, `rotate`, `scale` na coreografia desta seção.

### `GhostScene`

Responsabilidade: renderizar Ghost 3D como presença superior no clímax.

Regras:

- Wrapper DOM pode animar apenas `opacity` e `translateY`.
- Dentro do Canvas, pose pode ser ajustada via refs, lerp e scroll intensity.
- Sem parallax por cursor na narrativa principal desta rodada.
- `frameloop="demand"`;
- fallback se WebGL falhar;
- não duplicar `GhostErrorBoundary`.

---

## 7. estados_de_ui

### Loading

- `app/sobre/loading.tsx` deve renderizar skeleton estático da seção, sem animações complexas.
- Para `GhostScene`, usar fallback leve enquanto GLB carrega:
  - silhueta/PNG do Ghost;
  - `aria-label="Carregando presença 3D do Ghost"`;
  - sem spinner agressivo.

### Empty

- Se o asset 3D estiver indisponível, a seção continua funcional com `GhostFallback`.
- Se as frases estiverem vazias por falha de import/config, renderizar fallback com a primeira frase oficial e registrar erro em desenvolvimento.

### Error

- `GhostErrorBoundary` renderiza fallback visual não interativo do Ghost.
- `app/sobre/error.tsx` cobre falhas da rota.
- Erros de WebGL não devem derrubar a página inteira.

### Not found / fallback

- `app/sobre/not-found.tsx` deve existir para a rota.
- Para browsers sem WebGL ou em devices muito fracos, usar fallback estático de Ghost e manter a narrativa DOM.

### Reduced motion

- Se `prefers-reduced-motion` estiver ativo:
  - remover lerp/parallax;
  - remover stagger longo;
  - trocar blur + deslocamento por fade curto;
  - travar o Ghost em pose estática;
  - manter conteúdo e hierarquia completos.

---

## 8. design_tokens

### Cores

```ts
export const beliefColors = {
  void: '#040013',
  bluePrimary: '#0048ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  ghostCyan: '#4fe6ff',
  textPrimary: '#fcffff',
  white: '#ffffff',
} as const
```

### Tipografia

```ts
export const beliefTypography = {
  manifesto: 'clamp(4rem, 17vw, 13rem)',
  phraseDesktop: 'clamp(3rem, 7vw, 8rem)',
  phraseMobile: 'clamp(2.5rem, 14vw, 5.5rem)',
  header: 'clamp(1rem, 1.4vw, 1.5rem)',
} as const
```

### Espaçamento e grid

```ts
export const beliefLayout = {
  maxWidth: '1680px',
  mobileColumns: 4,
  tabletColumns: 8,
  desktopColumns: 12,
  mobileGutter: '16px',
  tabletGutter: '24px',
  desktopGutter: '32px',
  sectionHeight: '720vh',
} as const
```

### Z-index

```ts
export const beliefLayers = {
  background: 'var(--z-layer-base)',
  overlay: 'var(--z-layer-glass)',
  header: 'var(--z-layer-header)',
  phrases: 'var(--z-layer-cta)',
  manifesto: 'var(--z-layer-overlay)',
  ghost: 'var(--z-layer-lightbox)',
} as const
```

### Motion tokens

```ts
export const beliefMotion = {
  easeUI: [0.22, 1, 0.36, 1],
  easeAmbient: [0.17, 0.55, 0.55, 1],
  revealDuration: 0.8,
  backgroundDuration: 0.9,
  resetDuration: 0.6,
  staggerWord: 0.055,
  maxTranslateY: 18,
  maxBlur: 6,
  climaxStart: 0.56,
  climaxEnd: 0.72,
  finalLock: 0.82,
} as const
```

### Radius e shadow

A seção é majoritariamente full-bleed e tipográfica; não introduzir cards sem necessidade. Caso algum fallback precise de superfície:

```ts
export const beliefSurface = {
  radius: '1.5rem',
  border: '1px solid rgba(255,255,255,0.10)',
  shadow: '0 24px 80px rgba(0,0,0,0.35)',
} as const
```

---

## 9. plano_de_implementacao

### Etapa 1 — Consolidar fonte de verdade

1. Criar/atualizar `belief.constants.ts` com:
   - `BELIEF_PHRASES`;
   - `BELIEF_COLOR_STOPS`;
   - thresholds de scroll;
   - z-index tokens;
   - textos do manifesto.
2. Garantir que `motion.ts` exporta `GHOST_EASE`, `GHOST_EASE_AMBIENT` e demais tokens sem valores inline duplicados.

### Etapa 2 — Ajustar scroll tracker

1. Revisar `useBeliefsScroll.ts`.
2. Manter o contrato validado:
   - se seguir blueprint congelado: `offset: ['start end', 'end end']`;
   - se seguir ajuste mais recente por `scroll()`: `offset: ['start start', 'end end']`.
3. Escolher um único contrato e refletir nos testes.
4. Expor `scrollYProgress`, `activePhraseIndex`, `isClimax` e `prefersReducedMotion`.

### Etapa 3 — Background com reset bidirecional

1. Atualizar `BeliefBackground.tsx`.
2. Usar `GHOST_EASE_AMBIENT`.
3. Implementar cleanup de `inView`.
4. Garantir final lock em `#0048ff` quando `scrollProgress >= 0.82`.
5. Evitar `transition: background-color`.

### Etapa 4 — Header Split Text

1. Criar `SplitGhostText.tsx`.
2. Integrar em `BeliefFixedHeader`.
3. Usar `top-[14vh] md:top-0`.
4. Garantir texto acessível sem duplicar leitura por leitores de tela.

### Etapa 5 — Frases rotativas

1. Garantir seis frases oficiais em ordem imutável.
2. Implementar janelas de scroll sem acumular estado.
3. Adicionar `aria-live="polite"` para frase ativa.
4. Validar desktop/mobile com capturas.

### Etapa 6 — Manifesto final Split Text

1. Integrar `SplitGhostText` em `BeliefManifesto`.
2. Usar split por linhas ou palavras, não por caracteres se prejudicar performance.
3. Preservar font-size `clamp(4rem, 17vw, 13rem)`.
4. Ativar entre `0.56→0.72`.

### Etapa 7 — GhostScene

1. Remover boundary duplicado dentro de `GhostScene`, mantendo boundary externo.
2. Confirmar `frameloop="demand"`.
3. Confirmar `dpr={[1, 2]}`.
4. Garantir wrapper DOM apenas com `opacity` e `translateY`.
5. Validar fallback WebGL.

### Etapa 8 — Estados e acessibilidade

1. Revisar `loading.tsx`, `error.tsx`, `not-found.tsx`.
2. Testar `prefers-reduced-motion`.
3. Garantir contraste do manifesto branco sobre azul/magenta.
4. Validar foco e navegação sem armadilhas no trecho pinned/sticky.

### Etapa 9 — QA visual e Playwright

1. Atualizar `test/e2e/about-beliefs.spec.ts`.
2. Capturar desktop e mobile nos marcos:
   - 15%;
   - 45%;
   - 68%;
   - 82%;
   - 95%.
3. Confirmar:
   - fundo final azul;
   - manifesto branco;
   - Ghost acima do manifesto;
   - sem erros de console;
   - sem regressão de mobile.

---

## 10. snippets_iniciais

### `belief.constants.ts`

```ts
export const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const

export const BELIEF_COLOR_STOPS = [
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
] as const

export const BELIEF_MANIFESTO_LINES = ['ISSO É', 'GHOST', 'DESIGN'] as const

export const BELIEF_SCROLL_THRESHOLDS = {
  climaxStart: 0.56,
  climaxEnd: 0.72,
  finalLock: 0.82,
} as const
```

### `useBeliefsScroll.ts`

```ts
'use client'

import { useMemo, useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BELIEF_PHRASES, BELIEF_SCROLL_THRESHOLDS } from '@/components/sobre/beliefs/belief.constants'

export function useBeliefsScroll() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = Boolean(useReducedMotion())

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const phraseProgress = useTransform(scrollYProgress, [0.08, 0.76], [0, BELIEF_PHRASES.length - 1])

  const value = useMemo(
    () => ({
      sectionRef,
      scrollYProgress,
      phraseProgress,
      prefersReducedMotion,
      thresholds: BELIEF_SCROLL_THRESHOLDS,
    }),
    [phraseProgress, prefersReducedMotion, scrollYProgress],
  )

  return value
}
```

### `BeliefBackground.tsx`

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { animate, inView, type AnimationPlaybackControls } from 'motion'
import { useMotionValueEvent } from 'motion/react'
import { GHOST_EASE_AMBIENT } from '@/config/motion'
import { BELIEF_COLOR_STOPS, BELIEF_SCROLL_THRESHOLDS } from './belief.constants'
import { useBeliefsScrollContext } from './BeliefsScrollProvider'

export function BeliefBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null)
  const activeAnimationRef = useRef<AnimationPlaybackControls | null>(null)
  const climaxLockedRef = useRef(false)
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext()

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!bgRef.current) return

    if (progress >= BELIEF_SCROLL_THRESHOLDS.finalLock) {
      climaxLockedRef.current = true
      activeAnimationRef.current?.stop()
      activeAnimationRef.current = animate(
        bgRef.current,
        { backgroundColor: '#0048ff' },
        { duration: prefersReducedMotion ? 0 : 0.45, ease: GHOST_EASE_AMBIENT },
      )
      return
    }

    climaxLockedRef.current = false
  })

  useEffect(() => {
    if (!bgRef.current) return

    const stop = inView('.scroll-section', (section) => {
      const index = Number((section as HTMLElement).dataset.index ?? 0)
      const targetColor = BELIEF_COLOR_STOPS[index] ?? BELIEF_COLOR_STOPS[0]

      if (!climaxLockedRef.current) {
        activeAnimationRef.current?.stop()
        activeAnimationRef.current = animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: prefersReducedMotion ? 0 : 0.9, ease: GHOST_EASE_AMBIENT },
        )
      }

      return () => {
        if (!bgRef.current || climaxLockedRef.current) return

        const previousColor = BELIEF_COLOR_STOPS[Math.max(index - 1, 0)] ?? BELIEF_COLOR_STOPS[0]
        activeAnimationRef.current?.stop()
        activeAnimationRef.current = animate(
          bgRef.current,
          { backgroundColor: previousColor },
          { duration: prefersReducedMotion ? 0 : 0.6, ease: GHOST_EASE_AMBIENT },
        )
      }
    })

    return () => {
      activeAnimationRef.current?.stop()
      stop()
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="fixed inset-0 z-[var(--z-layer-base)] bg-[#040013]"
    />
  )
}
```

### `SplitGhostText.tsx`

```tsx
'use client'

import { motion, type Transition } from 'motion/react'
import { GHOST_EASE } from '@/config/motion'

type SplitGhostTextProps = {
  text: string
  as?: 'h2' | 'h3' | 'p' | 'span'
  splitType?: 'words' | 'lines'
  className?: string
  delay?: number
  duration?: number
  textAlign?: 'left' | 'center' | 'right'
}

export function SplitGhostText({
  text,
  as = 'p',
  splitType = 'words',
  className,
  delay = 0.055,
  duration = 0.8,
  textAlign = 'left',
}: SplitGhostTextProps) {
  const Tag = motion[as]
  const segments = splitType === 'lines' ? text.split('\n') : text.split(' ')

  const transition: Transition = {
    duration,
    ease: GHOST_EASE,
  }

  return (
    <Tag className={className} style={{ textAlign }} aria-label={text}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35, margin: '-100px' }}
          transition={{ ...transition, delay: index * delay }}
        >
          {segment}
          {splitType === 'words' ? '\u00A0' : null}
        </motion.span>
      ))}
    </Tag>
  )
}
```

### `BeliefFixedHeader.tsx`

```tsx
'use client'

import { motion } from 'motion/react'
import { SplitGhostText } from './SplitGhostText'

export function BeliefFixedHeader() {
  return (
    <motion.header className="pointer-events-none fixed inset-x-0 top-[14vh] z-[var(--z-layer-header)] w-full py-8 md:top-0">
      <div className="mx-auto flex max-w-[1680px] justify-end px-6 md:px-12 lg:px-16">
        <SplitGhostText
          as="p"
          text="O que me move"
          splitType="words"
          className="max-w-xs text-right font-medium uppercase tracking-[0.18em] text-white/80"
          textAlign="right"
        />
      </div>
    </motion.header>
  )
}
```

### `BeliefManifesto.tsx`

```tsx
'use client'

import { motion, useTransform } from 'motion/react'
import { BELIEF_MANIFESTO_LINES } from './belief.constants'
import { SplitGhostText } from './SplitGhostText'
import { useBeliefsScrollContext } from './BeliefsScrollProvider'

export function BeliefManifesto() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext()

  const opacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1])
  const y = useTransform(scrollYProgress, [0.56, 0.72], [18, 0])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-overlay)] flex items-center justify-center px-6"
      style={{ opacity, y: prefersReducedMotion ? 0 : y }}
      aria-label="ISSO É GHOST DESIGN"
    >
      <div className="mx-auto w-full max-w-[1680px] text-center">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitGhostText
            key={line}
            as="h2"
            text={line}
            splitType="words"
            textAlign="center"
            className="block font-extrabold uppercase leading-[0.88] text-white"
          />
        ))}
      </div>
    </motion.div>
  )
}
```

### `GhostScene.tsx`

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { motion, useTransform } from 'motion/react'
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollProvider'
import { GhostModel } from './GhostModel'
import { GhostFallback } from './GhostFallback'

export function GhostScene() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext()

  const opacity = useTransform(scrollYProgress, [0.12, 0.24, 0.9], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0.12, 0.72], [18, 0])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-lightbox)]"
      style={{ opacity, y: prefersReducedMotion ? 0 : y }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        fallback={<GhostFallback />}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 4]} intensity={1.4} />
        <GhostModel scrollProgress={scrollYProgress} reducedMotion={prefersReducedMotion} />
      </Canvas>
    </motion.div>
  )
}
```

### Prompt executável para agente de código

```md
Act as a Senior Frontend Architect specialized in Motion Design, Next.js App Router, React, TypeScript, Tailwind CSS 4, Motion and React Three Fiber.

Update the `06-O-QUE-ME-MOVE` section of the `/sobre` page according to the approved Ghost Design blueprint.

Core objective:
Build a scroll-driven editorial sequence where the background color, rotating text, fixed header, final manifesto and 3D Ghost behave as one cohesive system. The final climax must show a dominant blue background `#0048ff`, a white manifesto reading `ISSO É / GHOST / DESIGN`, and the Ghost 3D layer above the manifesto.

Stack:
- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4 Oxide
- Motion
- React Three Fiber + Drei
- Playwright

Architecture rules:
- Keep pages and layouts as Server Components by default.
- Use Client Components only for scroll, refs, browser APIs, Motion, state, events and Canvas WebGL.
- Use Motion for DOM reveals, scroll-driven opacity/translateY/blur and `inView + animate` background transitions.
- Use React Three Fiber only for the Ghost 3D Canvas.
- Do not use GSAP unless an existing SplitText implementation already requires it; prefer a Motion-based `SplitGhostText` to reduce dependency risk.

Non-negotiable visual contracts:
- Internal max-width: `1680px`.
- Responsive grid: 4 columns mobile, 8 tablet, 12 desktop.
- Final climax color: `#0048ff`.
- Manifesto text: white only.
- Ghost layer must be above manifesto.
- DOM Motion allowed properties: `opacity`, `blur`, `translateY`.
- DOM Motion forbidden properties: `scale`, `rotate`, `bounce`, `x`, `left`, `top`, `width`, `height`, `margin`, `padding`.
- Use `GHOST_EASE = [0.22, 1, 0.36, 1]` for UI/content reveals.
- Use `GHOST_EASE_AMBIENT = [0.17, 0.55, 0.55, 1]` for background/atmospheric transitions.
- Respect `prefers-reduced-motion`.

Implementation tasks:
1. Add or update `belief.constants.ts` with the 6 official phrases, 8 color stops, manifesto lines and scroll thresholds.
2. Update `useBeliefsScroll.ts` to expose `sectionRef`, `scrollYProgress`, `activePhraseIndex`, `isClimax` and `prefersReducedMotion`.
3. Update `BeliefBackground.tsx`:
   - Use `animate()` and `inView('.scroll-section')`.
   - Use `GHOST_EASE_AMBIENT`.
   - Add cleanup return to reset color when scrolling back.
   - Lock the final background to `#0048ff` at `scrollProgress >= 0.82`.
   - Do not use CSS `transition: background-color`.
4. Create or update `SplitGhostText.tsx`:
   - Support `splitType: 'words' | 'lines'`.
   - Default animation: `opacity: 0 → 1`, `y: 18 → 0`, `filter: blur(6px) → blur(0px)`.
   - Use stagger between `40ms` and `70ms`.
   - Provide accessible text via `aria-label` and mark visual spans as `aria-hidden`.
5. Update `BeliefFixedHeader.tsx`:
   - Use `fixed inset-x-0 top-[14vh] md:top-0`.
   - Align right on desktop.
   - Use `SplitGhostText`.
6. Update `BeliefScrollText.tsx`:
   - Preserve the 6 official phrases in immutable order.
   - Desktop: left reading block, vertically centered.
   - Mobile: horizontally centered, anchored with `pb-[20vh]`.
   - Mirror active phrase in `aria-live="polite"`.
7. Update `BeliefManifesto.tsx`:
   - Render `ISSO É`, `GHOST`, `DESIGN`.
   - Use `font-size: clamp(4rem, 17vw, 13rem)`.
   - Reveal between `scrollProgress 0.56 → 0.72`.
   - Keep white text only.
8. Update `GhostScene.tsx`:
   - Keep wrapper DOM animation restricted to `opacity` and `translateY`.
   - Keep `frameloop="demand"` and `dpr={[1, 2]}`.
   - Do not use cursor parallax in the main narrative.
   - Remove duplicated `GhostErrorBoundary` inside `GhostScene`; keep the parent boundary in `AboutBeliefs`.
9. Add robust fallback states:
   - route loading/error/not-found where applicable;
   - Ghost fallback if WebGL/GLB fails;
   - reduced-motion fallback with static Ghost and simple fades.
10. Update Playwright tests:
   - assert final background is `rgb(0, 72, 255)`;
   - assert manifesto text is white;
   - assert Ghost z-index is above manifesto;
   - assert no console errors;
   - capture desktop and mobile checkpoints.

Acceptance criteria:
- Final section matches the provided desktop/mobile captures in hierarchy and color.
- Background changes forward and resets backward.
- Final climax is blue, not Deep Void.
- Manifesto is white and dominant.
- Ghost remains visually above the manifesto.
- No DOM animation uses scale, rotate, bounce or horizontal x movement.
- Reduced motion is respected.
- No WebGL failure can break the entire `/sobre` page.
- TypeScript passes with no new errors.
```

---

## 11. riscos_e_validacoes

### Performance

- Risco: animar `filter: blur()` em muitos caracteres pode gerar custo de paint.
  - Mitigação: preferir split por palavras/linhas, não por caracteres, em títulos grandes.
  - Usar `blur` apenas em poucos elementos e com distância máxima `6px`.
- Risco: `will-change` permanente pode consumir memória.
  - Mitigação: aplicar com parcimônia e apenas em spans/textos animados relevantes.
- Risco: WebGL em mobile afetar FPS.
  - Mitigação: `dpr={[1,2]}`, `frameloop="demand"`, geometria otimizada, sem pós-processamento pesado.

### Acessibilidade

- `prefers-reduced-motion` deve ser testado manualmente e em Playwright.
- Evitar flashes ou trocas cromáticas rápidas acima de 3 vezes por segundo.
- `aria-live="polite"` deve anunciar a frase ativa sem repetir spans fragmentados.
- Spans visuais de SplitText devem ser `aria-hidden`.
- Manter contraste AA+ nos estados azul, magenta e void.

### Hidratação

- Qualquer leitura de `window`, `matchMedia`, WebGL ou `document` deve ficar em Client Components.
- Evitar valores aleatórios no SSR que mudem no cliente.
- `Canvas` deve ser carregado de forma resiliente, com fallback.

### Mobile

- Validar iOS Safari e Chrome Android.
- Confirmar `top-[14vh] md:top-0` no header.
- Garantir que o manifesto não corte de forma ilegível em `375px`.
- Reduzir intensidade do Ghost se houver perda de FPS.

### Bundle budget

- Não adicionar GSAP se o projeto puder resolver SplitText com Motion.
- Se GSAP for necessário por compatibilidade com React Bits:
  - importar apenas onde usado;
  - usar dynamic import se possível;
  - garantir cleanup com `useGSAP`.
- R3F deve continuar isolado na seção 3D.

### Validações Playwright sugeridas

```ts
test('about beliefs climax is blue with white manifesto and ghost above', async ({ page }) => {
  await page.goto('/sobre')
  await page.locator('[data-section="about-beliefs"]').scrollIntoViewIfNeeded()

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9))

  const background = page.locator('[data-belief-background]')
  await expect(background).toHaveCSS('background-color', 'rgb(0, 72, 255)')

  const manifesto = page.locator('[data-belief-manifesto]')
  await expect(manifesto).toHaveCSS('color', 'rgb(255, 255, 255)')

  const ghostZ = await page.locator('[data-ghost-scene]').evaluate((el) => Number(getComputedStyle(el).zIndex))
  const manifestoZ = await manifesto.evaluate((el) => Number(getComputedStyle(el).zIndex))

  expect(ghostZ).toBeGreaterThan(manifestoZ)
})
```

### Checklist final

- [ ] `BeliefBackground` usa `GHOST_EASE_AMBIENT`.
- [ ] `BeliefBackground` tem cleanup bidirecional.
- [ ] Final lock em `#0048ff` ativo em `scrollProgress >= 0.82`.
- [ ] `BeliefFixedHeader` usa `top-[14vh] md:top-0`.
- [ ] `BeliefScrollText` preserva 6 frases oficiais.
- [ ] `BeliefManifesto` usa branco integral.
- [ ] `GhostScene` usa `frameloop="demand"`.
- [ ] `GhostScene` não contém boundary duplicado.
- [ ] DOM Motion não usa `scale`, `rotate`, `bounce` ou `x`.
- [ ] Reduced motion testado.
- [ ] Desktop e mobile sem regressões visuais.
- [ ] Console sem erros.
