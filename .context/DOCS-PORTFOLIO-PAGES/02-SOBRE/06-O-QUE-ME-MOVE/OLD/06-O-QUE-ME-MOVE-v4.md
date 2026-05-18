# leitura_visual_estrutural

## Composição da seção

A seção é full-bleed, independente de `.std-grid`, com altura narrativa muito maior que a viewport (`MOTION_TOKENS.layout.sectionMinHeight`) e camadas absolutas, sticky e fixed sincronizadas pelo mesmo getter de progresso (`scrollYProgress.get()`).

A hierarquia visual correta é:

1. Fundo cromático vivo, ocupando 100% da seção (`BeliefBackground`).
2. Overlay preto quase imperceptível para suavizar transições entre cores vibrantes (`BeliefOverlay`).
3. Header fixo (posicionado em `absolute inset-y-0 right-0`) com texto editorial curto (`BeliefFixedHeader`).
4. Frases rotativas grandes em ciano, posicionadas à esquerda no desktop (`BeliefScrollText`).
5. Manifesto final centralizado em três linhas: `ISSO É / GHOST / DESIGN` (`BeliefManifesto`).
6. Ghost 3D acima de tudo, inclusive sobre a palavra `GHOST` (`GhostScene`).

## Desktop

Layout em três zonas:

```txt
[frase rotativa ciano]        [Ghost 3D central]        [BeliefFixedHeader]
esquerda / center-y           centro viewport           direita / sticky
```

A frase fica verticalmente centralizada à esquerda, com largura controlada para não colidir com o Ghost. O header parece âncora editorial estável, com entrada discreta pela direita (`x: 60 → 0`).

## Mobile

A composição muda para reduzir competição visual:

```txt
[BeliefFixedHeader em pt-[13vh], topo direito]
[Ghost 3D top-left, depois centro no clímax]
[frase rotativa centralizada próxima ao rodapé]
[manifesto final centralizado]
```

No mobile, o Ghost não reage ao cursor (sem `pointerParallax`), o DPR é limitado a `1` (`dpr={[1, 1]}`) e a escala é reduzida via `camera.position.z = 7.4`.

---

# mapa_de_animacoes

## Stack oficial

**GSAP + ScrollTrigger** é a stack canônica desta seção desde a migração de 2026-05-13. Todas as camadas (Background, Overlay, Header, Scroll Text, Manifesto, Ghost wrapper) usam:

- `gsap` core para tweens declarativos (`gsap.to`, `gsap.set`).
- `ScrollTrigger` para gatilhos baseados em viewport (`onEnter`, `onEnterBack`, `onLeave`, `onLeaveBack`, `onUpdate`).
- `gsap.context(() => { ... }, container)` para escopo de cleanup determinístico.
- `CustomEase` registrado uma vez em `src/lib/motion/gsapGhostEase.ts`, exportando `GSAP_GHOST_EASE` (curve `[0.22, 1, 0.36, 1]`).

> Nota histórica: a versão anterior deste documento prescrevia Motion DOM (`animate() + inView()`). Após auditoria de performance e necessidade de scrubbing contínuo no manifesto, toda a seção foi migrada para GSAP. Qualquer referência a `motion://docs/*` ou `inView()` é apenas histórica.

## 1. Background scroll-triggered

**Componente:** `BeliefBackground`
**Stack:** GSAP + ScrollTrigger
**Gatilho:** entrada de cada `.belief-scroll-section[data-index]` no viewport
**Propriedade animada:** `backgroundColor` via `gsap.to`
**Duração:** `1.5s` (atmospheric layer, alinhado com decisão registrada em `active_state.md`)
**Easing:** `GSAP_GHOST_EASE` (CustomEase `[0.22, 1, 0.36, 1]`)
**Regra crítica:** zero `transition: background-color` CSS; zero fade entre divs sobrepostos.

Fluxo real implementado:

1. Cada bloco de frase carrega `.belief-scroll-section` e `data-index` (renderizado em `BeliefScrollText`).
2. No `useEffect`, cria-se um `gsap.context` escopo do container; para cada seção, um `ScrollTrigger.create` dispara `onEnter` e `onEnterBack` com o `stopIndex = dataIndex + 1`.
3. Cada transição chama `gsap.to(background, { backgroundColor, duration: 1.5, ease: GSAP_GHOST_EASE, overwrite: 'auto' })`.
4. Um `ScrollTrigger` extra em `top bottom` reseta para `BELIEF_BACKGROUND_STOPS[0]` quando o scroll volta acima da seção (`onLeaveBack`).
5. Um `ScrollTrigger` adicional em `bottom 88%` aplica o último stop (`#040013`) no clímax inferior; ao subir, retorna ao penúltimo stop.
6. Em `prefers-reduced-motion`, `gsap.set` aplica a cor instantaneamente sem tween.
7. Cleanup determinístico via `ctx.revert()` no `useEffect` return.

Contrato de implementação (espelha o código real em `src/components/sobre/beliefs/BeliefBackground.tsx`):

```ts
const ctx = gsap.context(() => {
  const sections = Array.from(
    container.querySelectorAll<HTMLElement>('.belief-scroll-section')
  );

  sections.forEach((section) => {
    const index = Number.parseInt(section.dataset.index ?? '0', 10);
    const color =
      BELIEF_BACKGROUND_STOPS[
        Math.min(index + 1, BELIEF_BACKGROUND_STOPS.length - 1)
      ];

    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? 'top 78%' : 'top 64%',
      onEnter: () => transitionTo(color),
      onEnterBack: () => transitionTo(color),
    });
  });

  ScrollTrigger.create({
    trigger: container,
    start: 'top bottom',
    onLeaveBack: () => transitionTo(BELIEF_BACKGROUND_STOPS[0]),
  });

  ScrollTrigger.create({
    trigger: container,
    start: 'bottom 88%',
    onEnter: () =>
      transitionTo(BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 1]),
    onLeaveBack: () =>
      transitionTo(BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 2]),
  });
}, container);

return () => ctx.revert();
```

Paleta (mantida em `src/config/beliefTokens.ts` como `BELIEF_BACKGROUND_STOPS`):

```ts
const BELIEF_BACKGROUND_STOPS = [
  '#040013', // deepVoid
  '#0048ff', // bluePrimary
  '#8705f2', // purpleDetails
  '#f501d3', // pinkDetails
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013',
] as const;
```

## 2. Overlay anti-banding

**Componente:** `BeliefOverlay`
**Stack:** GSAP + ScrollTrigger com `scrub`
**Gatilho:** progresso contínuo da seção (`top bottom → bottom top`)
**Propriedade:** `opacity`
**Amplitude:** keyframes `[0.1, 0]` (entra suave, dissolve no final)
**Objetivo:** absorver banding e micro-glitches em telas OLED nas transições de cor vibrantes.

Contrato real:

```ts
gsap.to(overlay, {
  keyframes: [{ opacity: 0.1 }, { opacity: 0 }],
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.85,
  },
});
```

Em `prefers-reduced-motion`, o overlay recebe `opacity: 0.05` fixo via `gsap.set`, sem ScrollTrigger.

## 3. BeliefFixedHeader

**Componente:** `BeliefFixedHeader`
**Stack:** GSAP + ScrollTrigger + `SplitTextMotion` (utilitário declarativo)
**Tipografia (alinhada ao mockup `06-O-QUE-ME-MOVE-DESKTOP-INICIAL.jpg`):**

- Linha 1 (`BELIEF_HEADER_LINES[0]`): `font-display font-black uppercase leading-[0.88] tracking-[-0.04em]`, ALL CAPS via texto-fonte, tamanho `clamp(1.5rem, 6vw, 2.35rem)` mobile / `clamp(2rem, 2.8vw, 3.5rem)` desktop.
- Linha 2 (`BELIEF_HEADER_LINES[1]`): `font-medium leading-[1.22] tracking-[0.04em] text-white/82`, menor, regular, `clamp(0.82rem, 2.7vw, 0.98rem)` mobile / `clamp(0.95rem, 1.15vw, 1.16rem)` desktop, `mt-3 md:mt-5`.

**Posicionamento:**

- Container: `absolute inset-y-0 right-0 flex w-full items-start justify-end px-6 pt-[13vh] md:items-center md:px-10 md:pt-0 lg:px-16`.
- Conteúdo: `max-w-[13rem] text-right md:max-w-[20rem] lg:max-w-[24rem]`.
- Mobile usa `pt-[13vh]` (não `top-[14vh]` da v3) para alinhar ao mockup `MOBILE-INICIAL.png`.

**Entrada (gatilho `top 80%` desktop / `top 88%` mobile):**

- Container: `gsap.to(root, { autoAlpha: 1, x: 0, duration: 0.8, ease: GSAP_GHOST_EASE })` partindo de `{ autoAlpha: 0, x: 60 }`.
- Palavras (`[data-split-item]` dentro do `SplitTextMotion`): `gsap.to(words, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.05, delay: 0.15 })` partindo de `{ autoAlpha: 0, y: 12 }`.

**Saída reversa (`onLeaveBack`):** container retorna para `x: 60`, palavras voltam para `y: 0` mas `autoAlpha: 0`, duração `0.4s` / `0.28s`.

**Reduced motion:** durações comprimidas (`0.25s` root, `0.2s` words); `stagger: 0` e `ease: 'none'`.

A animação opera por palavras (não por chars), preservando legibilidade e evitando excesso de spans.

## 4. BeliefScrollText

**Componente:** `BeliefScrollText` (wrapper) + `BeliefPhraseSection` interno (por frase)
**Stack:** GSAP + ScrollTrigger
**Tipografia (alinhada ao mockup):**

- `font-medium italic leading-[0.9] tracking-[-0.045em]`.
- Cor `beliefColors.blueAccent` (`#4fe6ff`).
- Tamanho: `clamp(2.8rem, 5.8vw, 6.3rem)` desktop / `clamp(2.0rem, 8vw, 3.0rem)` mobile.
- `textShadow: '0 2px 24px rgba(0, 0, 0, 0.28)'` (preservado para contraste sobre fundos magenta).
- `maxWidth`: `38vw` desktop / `100%` mobile.

> A v3 prescrevia `font-bold`; o mockup mostra italic com peso medium. O código já reflete `font-medium italic`.

**Layout de seção:**

- Cada `BeliefPhraseSection` é um `section.belief-scroll-section[data-index]` com `height: phraseSectionHeight` (do token).
- Conteúdo interno em `sticky top-0 flex h-dvh` com alinhamento `items-center justify-start text-left` no desktop e `items-end justify-center text-center px-6` no mobile.
- Desktop usa `paddingLeft: beliefLayout.desktopPhraseLeft`; mobile usa `paddingBottom: beliefLayout.mobilePhraseBottom`.

**Animação (por seção):**

- Estado inicial via `gsap.set(heading, { autoAlpha: 0, y/x: offset, filter: 'blur(6px)' })`.
- Desktop: anima `y: 24 → 0`. Mobile: anima `x: 24 → 0` (sem `y`).
- Entrada (`onEnter`, gatilho `top 66%` desktop / `top 82%` mobile): `duration: 1.2s`, `filter: blur(6px) → blur(0px)`, `ease: GSAP_GHOST_EASE`.
- Retorno (`onEnterBack`): `duration: 0.9s`.
- Saída (`onLeave`): `autoAlpha: 0`, `y/x: -offset`, `filter: blur(0px) → blur(6px)`, `duration: 0.6s`.
- Saída reversa (`onLeaveBack`): `autoAlpha: 0`, `y/x: +offset`, blur restaurado, `duration: 0.6s`.
- Cleanup via `ctx.revert()` em cada `useEffect`.

**Reduced motion:** `duration: 0.2s`, `ease: 'none'`, sem blur, sem offset; apenas fade.

**Performance:** `filter: blur()` é caro; mantido apenas nas frases principais e desativado em reduced motion.

## 4.1 Animation Library Policy

Esta seção usa exclusivamente a stack GSAP. Termos consolidados:

- `scroll-triggered`: animação iniciada/parada por visibilidade. Implementada via `ScrollTrigger.create({ trigger, start, onEnter, onEnterBack, onLeave, onLeaveBack })`.
- `scroll-linked / scrubbed`: valor contínuo ligado ao progresso de scroll. Implementada via `scrollTrigger: { scrub: 0.85 }` no objeto da tween, ou via `ScrollTrigger.create({ onUpdate(self) { ... self.progress ... } })`.
- `entrance variants`: composição de `gsap.set` (estado inicial) + `gsap.to` (estado final) dentro de `gsap.context`.

Proibido nesta seção:

- `motion`, `motion/react`, `animate()`, `inView()`, `useScroll()` do Motion.
- CSS `transition: background-color` ou fade DOM cross-fade entre divs.
- `top/left` animados (apenas `transform` e `opacity` via `autoAlpha`).

Fonte de decisão: ADR Beliefs GSAP Migration (`active_state.md` entrada de 2026-05-13).

## 5. Manifesto final com Split Text

**Componente:** `BeliefManifesto`
**Stack:** GSAP + ScrollTrigger com `onUpdate` + `SplitTextMotion` (utilitário declarativo)
**Reveal global:** controlado por progresso real do container via `ScrollTrigger.create({ trigger: container, start: 'top top', end: 'bottom bottom', onUpdate })`.

Lógica de reveal:

```ts
onUpdate: (self) => {
  const progress = self.progress;
  const revealProgress = gsap.utils.clamp(0, 1, (progress - 0.82) / 0.1);

  gsap.set(root, {
    autoAlpha: revealProgress,
    y: shouldReduceMotion ? 0 : 18 - 18 * revealProgress,
  });
  gsap.set(words, {
    autoAlpha: revealProgress,
    y: shouldReduceMotion ? 0 : 12 - 12 * revealProgress,
  });
  setActive(progress >= 0.82);
};
```

Um segundo `ScrollTrigger` (`start: 'bottom 36%'`) faz um polishing tween com stagger curto (`0.06s`) quando o manifesto entra no clímax, e reseta as palavras em `onLeaveBack`.

**Tipografia:**

- `font-display font-black uppercase text-white`.
- `leading-[0.82] tracking-[0.03em] text-center`.
- `fontSize: 'clamp(3.5rem, 16vw, 12rem)'`.

**Posicionamento:** `fixed inset-0 flex items-center justify-center px-6`, `zIndex: beliefZIndex.manifesto` (`50`), abaixo do Ghost (`70`).

**Words via `[data-split-item]`:** as palavras são produzidas pelo `SplitTextMotion` (que apenas renderiza spans declarativos com `data-split-item`). A animação é orquestrada externamente pelo GSAP via seletor `root.querySelectorAll<HTMLElement>('[data-split-item]')`.

**A11y:** `aria-live="polite"` somente quando `active || isClimax`.

## 6. Ghost 3D

**Componente:** `GhostScene` (wrapper) + `GhostModel` (Canvas children) + `GhostSceneFallback` + `GhostErrorBoundary` (no wrapper de `AboutBeliefs`, NÃO duplicado dentro de `GhostScene`)
**Stack:** React Three Fiber + drei + three.js + GSAP (apenas para a entrada do wrapper DOM)
**Carregamento:** `useGLTF(MODEL_PATH)` com `MODEL_PATH = getAssetUrl('site-assets/3d/ghost-v1.glb')`. A URL final resolvida é `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb`.

**Wrapper DOM:**

- `pointer-events-none fixed inset-0 invisible`, `zIndex: beliefZIndex.ghost` (`70`).
- `data-testid="beliefs-ghost-scene"`, `data-ghost-scene`.
- Mount via `dynamic(() => import('../3d/GhostScene'), { ssr: false })` no `AboutBeliefs`.

**Guarda WebGL:** `useWebGLSupport()` em `GhostScene` retorna `<GhostSceneFallback />` se WebGL indisponível, evitando montar `<Canvas>`.

**Canvas:**

- `frameloop="demand"` (renderiza apenas quando solicitado).
- `dpr={[1, isMobile ? 1 : 2]}`.
- `camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}`.
- Filhos: `<ambientLight>`, `<directionalLight>`, dois `<pointLight>`, `<SceneInvalidator>` e `<GhostModel>`.

**SceneInvalidator:** componente local que escuta `window.scroll` e `mousemove` e dispara `invalidate()` em cada evento, garantindo render sob demanda sem `useFrame` contínuo bombeando frames.

**Entrada do wrapper (GSAP, dispara uma vez via `once: true`):**

```ts
gsap.set(wrapper, { autoAlpha: 0, scale: 0.95 });

ScrollTrigger.create({
  trigger: section,
  start: 'top 85%',
  once: true,
  onEnter: () => {
    gsap.to(wrapper, {
      autoAlpha: 1,
      scale: 1,
      duration: shouldReduceMotion ? 0.3 : beliefMotion.ghostIntroDuration, // 1.2s
      ease: 'power2.out',
      delay: shouldReduceMotion ? 0 : 0.15,
      overwrite: 'auto',
    });
  },
});
```

**Floating, parallax e clímax** (resolvidos dentro de `GhostModel` via `useFrame`, lendo `scrollYProgress.get()` e `pointerX/Y.get()`):

- Desktop: cursor parallax mapeado para `±0.4` world units.
- Mobile: sem parallax; baseline top-left até clímax.
- Clímax: `progress > 0.85` move o Ghost para o centro e aumenta scale em até `+15%` via `MathUtils.mapLinear(progress, 0.8, 1, 1, 1.15)`.

**Dispose:** `disposeScene(ghostScene)` no unmount, percorrendo `Mesh` e chamando `geometry.dispose()` e `material.dispose()` (incluindo arrays de material).

**Error boundary:** `GhostErrorBoundary` no `AboutBeliefs` envolve o `<Suspense fallback={<GhostSceneFallback />}><GhostScene /></Suspense>`. Não há boundary duplicado dentro de `GhostScene`.

---

# arquitetura_recomendada

## Server Components

A rota `/sobre` permanece como Server Component, com `loading.tsx`, `error.tsx` e `not-found.tsx` co-localizados.

```txt
app/
  sobre/
    page.tsx        // server
    loading.tsx     // server
    error.tsx       // client (reset)
    not-found.tsx   // server
```

`page.tsx` importa a seção via composição direta. `GhostScene` é montado com `dynamic(..., { ssr: false })` para evitar bundle WebGL no first paint.

## Client Components

Componentes client obrigatórios (todos com `'use client'`):

```txt
src/components/sobre/sections/AboutBeliefs.tsx
src/components/sobre/beliefs/BeliefsScrollContext.tsx
src/components/sobre/beliefs/BeliefBackground.tsx
src/components/sobre/beliefs/BeliefOverlay.tsx
src/components/sobre/beliefs/BeliefFixedHeader.tsx
src/components/sobre/beliefs/BeliefScrollText.tsx
src/components/sobre/beliefs/BeliefManifesto.tsx
src/components/sobre/beliefs/SplitTextMotion.tsx
src/components/sobre/3d/GhostScene.tsx
src/components/sobre/3d/GhostModel.tsx
src/components/sobre/3d/GhostSceneFallback.tsx
src/components/sobre/3d/GhostErrorBoundary.tsx
```

## Contrato do contexto (`BeliefsScrollContextValue`)

```ts
type BeliefsScrollContextValue = {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: { get: () => number };
  isMobile: boolean;
  shouldReduceMotion: boolean;
  activeIndex: number;
  isClimax: boolean;
};
```

**Motivo do ref-getter:** `scrollYProgress` é exposto como `{ get: () => number }` em vez de um `MotionValue<number>`. O progresso é lido sob demanda dentro de `useFrame` (Ghost 3D) e nos handlers de scroll do hook, sem disparar re-renders no React. Mudar para um valor reativo ressuscitaria re-renders cinquenta vezes por segundo durante o scroll, impedindo `frameloop="demand"` e prejudicando o FPS.

`activeIndex` e `isClimax` são `useState` atualizados condicionalmente (`prev !== next`) apenas em transições reais, mantendo o React quieto durante o scroll contínuo.

## Suspense

`Suspense` envolve apenas o `GhostScene`, com `GhostSceneFallback` como `fallback`. O Suspense fica dentro de `GhostErrorBoundary`, dentro do bloco `sticky top-0 h-dvh`.

```tsx
<GhostErrorBoundary fallback={<GhostSceneFallback />}>
  <Suspense fallback={<GhostSceneFallback />}>
    <GhostScene />
  </Suspense>
</GhostErrorBoundary>
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
        belief.constants.ts
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
    useWebGLSupport.ts

  lib/
    motion/
      gsapGhostEase.ts
    supabase/
      urls.ts

  types/
    beliefs.ts
```

---

# estrategia_de_componentes

## `AboutBeliefs.tsx`

Orquestrador puro. Cria `containerRef`, invoca `useBeliefsScroll`, abre o `BeliefsScrollProvider`, compõe as seis camadas, define `min-height` via `beliefLayout.sectionMinHeight`, e expõe `data-belief-active-index` e `data-belief-climax` no `<section>` para testes E2E.

Importações via `dynamic` apenas para `GhostScene` (`{ ssr: false }`).

## `BeliefsScrollContext.tsx`

Apenas createContext + Provider + hook `useBeliefsScrollContext`. Sem lógica de animação.

## `useBeliefsScroll.ts`

Hook único de estado:

- `useMediaQuery('(max-width: 767px)')` para `isMobile`.
- `matchMedia('(prefers-reduced-motion: reduce)')` com listener para `shouldReduceMotion`.
- `progressRef` (`useRef(0)`) atualizado em cada `scroll` / `resize` via `getBoundingClientRect`.
- `scrollYProgress` retornado como `useMemo({ get: () => progressRef.current })`, estável entre renders.
- `activeIndex` e `isClimax` em `useState`, atualizados apenas em transições reais (`prev !== next`).
- Cleanup: `removeEventListener` para `scroll`, `resize` e media query change.

## `BeliefBackground.tsx`

Lê `.belief-scroll-section[data-index]` via `container.querySelectorAll`, cria `ScrollTrigger` por seção dentro de `gsap.context`. Cleanup via `ctx.revert()`.

## `BeliefOverlay.tsx`

`gsap.to(overlay, { keyframes, scrollTrigger: { scrub: 0.85 } })`. Em `prefers-reduced-motion`, `gsap.set(overlay, { opacity: 0.05 })` direto sem ScrollTrigger.

## `BeliefFixedHeader.tsx`

`SplitTextMotion` para as duas linhas (modo `words`). Animação via `gsap.to(root, ...)` e `gsap.to(words, ...)` dentro de `ScrollTrigger.create({ onEnter, onLeaveBack })`.

## `BeliefScrollText.tsx`

Wrapper renderiza `BELIEF_PHRASE_ITEMS.map(...)`. Cada `BeliefPhraseSection` cria seu próprio `gsap.context` com `ScrollTrigger` por seção.

## `BeliefManifesto.tsx`

`ScrollTrigger.create({ onUpdate })` para scrubbed reveal entre `progress 0.82 → 0.92`. `ScrollTrigger.create({ start: 'bottom 36%' })` adicional para tween polish nas palavras.

## `SplitTextMotion.tsx`

Componente utilitário **declarativo, sem animação interna**. Apenas renderiza:

```tsx
<Component data-split-text aria-label={text}>
  {units.map((unit, i) => (
    <span data-split-item aria-hidden="true">
      {unit}
    </span>
  ))}
</Component>
```

A animação dos `[data-split-item]` é orquestrada externamente por GSAP no componente consumidor (`BeliefFixedHeader`, `BeliefManifesto`), via `root.querySelectorAll('[data-split-item]')`. Esta separação evita acoplamento de animação com markup e permite que o utilitário seja reutilizado sem trazer GSAP runtime para outros consumidores.

## `GhostScene.tsx`

Isola Canvas/WebGL. Verifica `useWebGLSupport()` antes de montar Canvas. Anima entrada do wrapper DOM (não da cena) via GSAP. `SceneInvalidator` interno aciona `invalidate()` em scroll/mouse para `frameloop="demand"`.

## `GhostModel.tsx`

Carrega GLB via `useGLTF`. Clona scene, aplica materiais customizados via `GHOST_MATERIAL_CONFIG`. `useFrame` lê `scrollYProgress.get()` e `pointerX/Y.get()` para floating, parallax e clímax. Dispose completo no unmount via `disposeScene`.

---

# estados_de_ui

## Loading

### Rota `/sobre/loading.tsx`

Skeleton escuro editorial:

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

Fallback estático em `GhostSceneFallback.tsx`:

```tsx
export function GhostSceneFallback() {
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

## Error

`app/sobre/error.tsx` como Client Component com `reset()`. Conteúdo dark, botão acessível, sem stacks expostos ao usuário.

## Not Found

`not-found.tsx` mantém identidade dark e oferece retorno para `/` e `/sobre`.

---

# design_tokens

Os tokens vivem em `src/config/beliefTokens.ts` e são consolidados via `MOTION_TOKENS` (em `src/config/motion.ts`) para SSOT. Não duplicar valores aqui; o arquivo é a fonte canônica.

Exports relevantes:

- `beliefColors`: `deepVoid`, `bluePrimary`, `blueDeep`, `blueBright`, `blueAccent`, `purpleDetails`, `pinkDetails`, `white`.
- `BELIEF_BACKGROUND_STOPS`: array readonly de 8 cores (paleta de transição).
- `BELIEF_HEADER_LINES`: duas linhas do header fixo.
- `BELIEF_PHRASES`: seis frases rotativas.
- `BELIEF_MANIFESTO_LINES`: `['ISSO É', 'GHOST', 'DESIGN']`.
- `BELIEF_PHRASE_ITEMS`: array tipado de `BeliefPhrase` com `id`, `text`, `backgroundStopIndex`.
- `beliefZIndex`: derivado de `MOTION_TOKENS.z` (`bg`, `overlay`, `header`, `text`, `manifesto`, `ghost`).
- `beliefMotion`: derivado de `MOTION_TOKENS.ease` e `MOTION_TOKENS.duration` (`ghostEase`, `softEase`, `microDuration`, `revealDuration`, `exitDuration`, `ghostIntroDuration`, `wordStagger`).
- `beliefLayout`: derivado de `MOTION_TOKENS.layout` (`sectionMinHeight`, `phraseSectionHeight`, `desktopPhraseMaxWidth`, `desktopPhraseLeft`, `mobilePhraseBottom`).

Easing GSAP usa `GSAP_GHOST_EASE` em `src/lib/motion/gsapGhostEase.ts`, que registra `CustomEase` com `GHOST_EASE = [0.22, 1, 0.36, 1]` em `src/config/motion.ts`. Em SSR retorna `'power4.out'` como fallback.

---

# plano_de_implementacao

## Fase 1 — Consolidar contrato da seção ✅

Concluída em 2026-05-13. `06-O-QUE-ME-MOVE-v4.md` agora reflete o código real:

- GSAP+ScrollTrigger é a stack oficial; Motion DOM foi removido.
- R3F permanece exclusivo para `GhostScene`.
- `SplitTextMotion` é utilitário declarativo, sem animação interna.
- Ghost permanece em `z-[70]` (via `MOTION_TOKENS.z.ghost`).
- Background muda por `gsap.to({ backgroundColor })`, nunca por CSS transition.

## Fase 2 — Tokens e tipos ✅

Concluída. `src/config/beliefTokens.ts` consolidado; `src/types/beliefs.ts` define `BeliefPhrase` e `BeliefsScrollContextValue` com `scrollYProgress: { get: () => number }`.

## Fase 3 — Provider de scroll ✅

Concluída. `useBeliefsScroll.ts` usa ref-based progress getter, `useMediaQuery` e `matchMedia(prefers-reduced-motion)`. `BeliefsScrollContext` distribui o valor.

## Fase 4 — Camadas DOM ✅

Concluída em ordem: `BeliefBackground`, `BeliefOverlay`, `BeliefFixedHeader`, `BeliefScrollText`, `BeliefManifesto`. Nenhuma camada anima `top/left/width/height`; apenas `transform` (via `x/y/scale`) e `opacity` (via `autoAlpha`).

## Fase 5 — Ghost 3D ✅

Concluída. `GhostErrorBoundary`, `GhostSceneFallback`, `GhostScene` (com `SceneInvalidator`), `GhostModel` (com `disposeScene`). Carregamento via `dynamic({ ssr: false })`.

## Fase 6 — QA visual e performance (ciclo contínuo)

Checklist permanente:

- FPS acima de 50 em desktop (medido com Chrome Performance + scroll de ponta a ponta).
- DPR `1` em mobile.
- Sem layout shift na entrada (CLS estável).
- `prefers-reduced-motion` remove floating, parallax, stagger e blur; durações comprimidas para `≤ 0.3s`.
- Ghost sobrepõe o manifesto no clímax (`progress > 0.85`).
- Background retorna para `#040013` no final.
- Foco do teclado não fica preso em camada sticky/fixed.
- Canvas marcado como decorativo (`aria-hidden` via wrapper indireto, fallback acessível disponível).
- Suíte `test/e2e/about-beliefs.spec.ts` passa 12/12.

---

# snippets_iniciais

## `src/hooks/useBeliefsScroll.ts`

Ref-getter pattern: progresso lido sob demanda sem re-renders.

```tsx
'use client';

import type { RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BELIEF_PHRASES } from '@/config/beliefTokens';
import { useMediaQuery } from './useMediaQuery';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClimax, setIsClimax] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) =>
      setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const scrollYProgress = useMemo(
    () => ({ get: () => progressRef.current }),
    []
  );

  useEffect(() => {
    const update = () => {
      const section = containerRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const start = sectionTop - window.innerHeight;
      const end = sectionTop + rect.height - window.innerHeight;
      const range = Math.max(1, end - start);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / range));

      progressRef.current = next;
      const idx = Math.min(
        BELIEF_PHRASES.length - 1,
        Math.max(0, Math.round(next * (BELIEF_PHRASES.length - 1)))
      );
      setActiveIndex((prev) => (prev !== idx ? idx : prev));
      setIsClimax((prev) => (prev !== next >= 0.82 ? next >= 0.82 : prev));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [containerRef]);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    activeIndex,
    isClimax,
  };
}
```

## `src/components/sobre/sections/AboutBeliefs.tsx`

```tsx
'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { beliefLayout } from '@/config/beliefTokens';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((m) => m.GhostScene),
  { ssr: false }
);

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider value={{ containerRef, ...scroll }}>
      <section
        ref={containerRef}
        id="o-que-me-move"
        data-testid="beliefs-section"
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

## `src/components/sobre/beliefs/BeliefBackground.tsx`

`gsap.context(() => { ScrollTrigger.create(...) })` com cleanup via `ctx.revert()`.

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BELIEF_BACKGROUND_STOPS, beliefZIndex } from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { containerRef, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();

  useEffect(() => {
    const bg = ref.current;
    const container = containerRef.current;
    if (!bg || !container) return;

    gsap.set(bg, { backgroundColor: BELIEF_BACKGROUND_STOPS[0] });

    const transitionTo = (color: string) => {
      if (shouldReduceMotion) {
        gsap.set(bg, { backgroundColor: color });
        return;
      }
      gsap.to(bg, {
        backgroundColor: color,
        duration: 1.5,
        ease: GSAP_GHOST_EASE,
        overwrite: 'auto',
      });
    };

    const ctx = gsap.context(() => {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>('.belief-scroll-section')
      );
      sections.forEach((section) => {
        const index = Number.parseInt(section.dataset.index ?? '0', 10);
        const color =
          BELIEF_BACKGROUND_STOPS[
            Math.min(index + 1, BELIEF_BACKGROUND_STOPS.length - 1)
          ];
        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? 'top 78%' : 'top 64%',
          onEnter: () => transitionTo(color),
          onEnterBack: () => transitionTo(color),
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, isMobile, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 bg-[#040013]"
      style={{ zIndex: beliefZIndex.background }}
    />
  );
}
```

## `src/components/sobre/beliefs/SplitTextMotion.tsx`

Utilitário declarativo, **sem animação interna**. A orquestração ocorre fora via GSAP, lendo `[data-split-item]`.

```tsx
'use client';

import type { ElementType } from 'react';

type SplitTextMotionProps<T extends ElementType = 'span'> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  className?: string;
  itemClassName?: string;
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  text,
  as,
  mode = 'words',
  className,
  itemClassName,
}: SplitTextMotionProps<T>) {
  const Component = (as ?? 'span') as ElementType;
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component className={className} aria-label={text} data-split-text>
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          aria-hidden="true"
          data-split-item
          className={itemClassName ?? 'inline-block will-change-transform'}
        >
          {unit === ' ' ? ' ' : unit}
          {mode === 'words' && index < units.length - 1 ? ' ' : null}
        </span>
      ))}
    </Component>
  );
}
```

**Importante:** o componente apenas renderiza markup com `data-split-item`. Quem anima são os consumidores (`BeliefFixedHeader`, `BeliefManifesto`), via `root.querySelectorAll('[data-split-item]')` dentro de um `gsap.context`.

## `src/components/sobre/beliefs/BeliefManifesto.tsx`

`ScrollTrigger` com `onUpdate` para reveal scrubbed entre `0.82 → 0.92`.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BELIEF_MANIFESTO_LINES, beliefZIndex } from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function BeliefManifesto() {
  const { containerRef, isClimax, shouldReduceMotion } =
    useBeliefsScrollContext();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = ref.current;
    const container = containerRef.current;
    if (!root || !container) return;

    const words = root.querySelectorAll<HTMLElement>('[data-split-item]');

    const ctx = gsap.context(() => {
      gsap.set(root, { autoAlpha: 0, y: shouldReduceMotion ? 0 : 18 });
      gsap.set(words, { autoAlpha: 0, y: shouldReduceMotion ? 0 : 12 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const reveal = gsap.utils.clamp(0, 1, (self.progress - 0.82) / 0.1);
          gsap.set(root, {
            autoAlpha: reveal,
            y: shouldReduceMotion ? 0 : 18 - 18 * reveal,
          });
          gsap.set(words, {
            autoAlpha: reveal,
            y: shouldReduceMotion ? 0 : 12 - 12 * reveal,
          });
          setActive(self.progress >= 0.82);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: beliefZIndex.manifesto }}
      aria-live={active || isClimax ? 'polite' : 'off'}
    >
      <div
        className="text-center font-display font-black uppercase leading-[0.82] tracking-[0.03em] text-white"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitTextMotion key={line} as="div" text={line} className="block" />
        ))}
      </div>
    </div>
  );
}
```

---

# riscos_e_validacoes

## Riscos técnicos

1. **`filter: blur()` em scroll contínuo:** custa GPU. Mitigação: blur só nas frases principais, removido em `prefers-reduced-motion`, com `will-change: transform` nos targets.

2. **WebGL em mobile:** mitigação aplicada: `useWebGLSupport()` curto-circuita o Canvas, `dpr={[1, 1]}`, sem cursor parallax, `frameloop="demand"`, `SceneInvalidator`, dispose completo no unmount.

3. **Z-index e stacking context:** qualquer `transform`, `opacity` ou `isolation` em parents pode criar stacking contexts inesperados. Validar com DevTools 3D View. Todos os tokens de z vivem em `MOTION_TOKENS.z`.

4. **Supabase Storage:** URL pública resolvida via `getAssetUrl()` (lê `NEXT_PUBLIC_SUPABASE_URL`). Nenhum service role key no client; `.glb` bypassa Image Transformation (lib `urls.ts`).

5. **Re-renders durante scroll:** mitigados pelo ref-getter `scrollYProgress: { get: () => number }` e atualizações condicionais (`prev !== next`) em `activeIndex` e `isClimax`. Trocar para `MotionValue` ressuscitaria re-renders por frame.

6. **Cleanup determinístico:** todo `useEffect` que cria `ScrollTrigger` envolve a criação em `gsap.context(() => { ... }, container)` e retorna `() => ctx.revert()`. Isso garante que tweens, triggers e estados intermediários sejam revertidos no unmount ou em mudanças de dependência (`isMobile`, `shouldReduceMotion`).

7. **Referências externas e timing:** `drinksom.eu` e `portfoliodanilo.com/sobre` devem ser conferidos manualmente em DevTools contra os screenshots `06-O-QUE-ME-MOVE-DESKTOP-INICIAL.jpg`, `DESKTOP-FINAL.jpg`, `MOBILE-INICIAL.png`, `MOBILE-FINAL.png`.

---

# prompt_final_para_agent

````md
# TASK: Manter e evoluir a seção `06-O-QUE-ME-MOVE` da página `/sobre`

Você é um engenheiro frontend sênior especializado em Next.js App Router, React + TypeScript, Tailwind CSS, GSAP + ScrollTrigger, React Three Fiber, drei, three.js, Firebase Hosting e Supabase Storage.

A seção manifesto `O Que Me Move` do portfolio `portfoliodanilo.com/sobre` é uma experiência scroll-driven cinematográfica, com background cromático animado, textos com Split Text, manifesto final scrubbed e Ghost 3D em WebGL.

## Stack obrigatória

- Next.js App Router usando `app/`
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- GSAP + ScrollTrigger (CustomEase registrado em `src/lib/motion/gsapGhostEase.ts`)
- React Three Fiber + @react-three/drei + three.js (apenas para o Ghost 3D)
- Firebase Hosting para deploy
- Supabase Storage para assets públicos (GLB resolvido via `getAssetUrl`)
- Não expor secrets, service role keys ou credenciais no client

## Arquitetura de arquivos

```
app/
  sobre/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx
src/
  components/sobre/sections/AboutBeliefs.tsx
  components/sobre/beliefs/{BeliefsScrollContext,BeliefBackground,BeliefOverlay,BeliefFixedHeader,BeliefScrollText,BeliefManifesto,SplitTextMotion}.tsx
  components/sobre/3d/{GhostScene,GhostModel,GhostSceneFallback,GhostErrorBoundary}.tsx
  hooks/{useBeliefsScroll,useMediaQuery,usePointerParallax,useWebGLSupport}.ts
  config/{beliefTokens,motion}.ts
  lib/motion/gsapGhostEase.ts
  types/beliefs.ts
```

## Camadas e z-index

Ordem imutável (valores via `MOTION_TOKENS.z`):

1. `BeliefBackground` — `bg`
2. `BeliefOverlay` — `overlay`
3. `BeliefFixedHeader` — `header`
4. `BeliefScrollText` — `text`
5. `BeliefManifesto` — `manifesto` (50)
6. `GhostScene` — `ghost` (70)

Ghost sempre acima do manifesto no clímax.

## Contrato de scroll

`useBeliefsScroll(containerRef)` retorna:

```ts
{
  scrollYProgress: { get: () => number },
  isMobile: boolean,
  shouldReduceMotion: boolean,
  activeIndex: number,
  isClimax: boolean,
}
```

Distribuído via `BeliefsScrollProvider` para todos os consumidores. Não é `MotionValue`; é um getter síncrono para evitar re-renders durante scroll.

## Background animado

`BeliefBackground` lê `.belief-scroll-section[data-index]` e dispara `gsap.to(bg, { backgroundColor, duration: 1.5, ease: GSAP_GHOST_EASE })` em cada `onEnter`/`onEnterBack`. ScrollTriggers extras tratam reset (`top bottom → onLeaveBack`) e clímax final (`bottom 88% → onEnter`).

Paleta obrigatória (em `BELIEF_BACKGROUND_STOPS`):

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

- `duration: 1.5` (não `0.9`).
- `ease: GSAP_GHOST_EASE` (CustomEase `[0.22, 1, 0.36, 1]`).
- `prefers-reduced-motion`: `gsap.set(bg, { backgroundColor })` direto.
- Cleanup: `gsap.context().revert()` no return do `useEffect`.

## Overlay anti-banding

`BeliefOverlay`: `gsap.to(overlay, { keyframes: [{ opacity: 0.1 }, { opacity: 0 }], scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: 0.85 } })`. Em reduced motion, `opacity: 0.05` fixo via `gsap.set`.

## BeliefFixedHeader

Texto fixo de `BELIEF_HEADER_LINES`:

- Linha 1: `Acredito no design que muda o dia de alguém.`
- Linha 2: `Não pelo choque, mas pela conexão.`

Tipografia (alinhada ao mockup):

- Linha 1: `font-display font-black uppercase leading-[0.88] tracking-[-0.04em]`, ALL CAPS via fonte, tamanho mobile `clamp(1.5rem, 6vw, 2.35rem)`, desktop `clamp(2rem, 2.8vw, 3.5rem)`.
- Linha 2: `font-medium leading-[1.22] tracking-[0.04em] text-white/82`, menor, `clamp(0.82rem, 2.7vw, 0.98rem)` mobile, `clamp(0.95rem, 1.15vw, 1.16rem)` desktop, `mt-3 md:mt-5`.

Posicionamento: `absolute inset-y-0 right-0 ... pt-[13vh] md:items-center md:pt-0`. Mobile usa `pt-[13vh]`, NÃO `top-[14vh]`.

Animação:

- Container: `gsap.to(root, { autoAlpha: 1, x: 0, duration: 0.8 })` partindo de `{ autoAlpha: 0, x: 60 }`.
- Words (`[data-split-item]`): `gsap.to(words, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.05, delay: 0.15 })` partindo de `{ autoAlpha: 0, y: 12 }`.
- Reverso em `onLeaveBack` com durações comprimidas.

## BeliefScrollText

Frases obrigatórias (em `BELIEF_PHRASES`):

1. `Um vídeo que respira`
2. `Uma marca que se reconhece`
3. `Um detalhe que fica`
4. `Crio para gerar presença`
5. `Mesmo quando não estou ali`
6. `Mesmo quando ninguém percebe o esforço`

Cada `BeliefPhraseSection` é uma `.belief-scroll-section[data-index]` com `h-[80vh]`.

Tipografia:

- `font-medium italic leading-[0.9] tracking-[-0.045em]`, cor `#4fe6ff` (`beliefColors.blueAccent`).
- Tamanho: `clamp(2.8rem, 5.8vw, 6.3rem)` desktop, `clamp(2.0rem, 8vw, 3.0rem)` mobile.
- `textShadow: '0 2px 24px rgba(0,0,0,0.28)'`.

Animação (GSAP + ScrollTrigger):

- Inicial: `gsap.set(heading, { autoAlpha: 0, y/x: offset, filter: 'blur(6px)' })`.
- Desktop usa `y: 24 → 0`; mobile usa `x: 24 → 0`.
- Entrada (`onEnter`, gatilho `top 66%` / `top 82%`): `duration: 1.2s`, `filter: blur(6px) → blur(0px)`, `ease: GSAP_GHOST_EASE`.
- `onEnterBack`: `duration: 0.9s`.
- `onLeave` e `onLeaveBack`: `duration: 0.6s`, blur restaurado, offset invertido conforme direção.
- `prefers-reduced-motion`: `duration: 0.2s`, `ease: 'none'`, sem blur, sem offset.

## BeliefManifesto

`fixed inset-0 flex items-center justify-center px-6`, `font-display font-black uppercase`, `leading-[0.82] tracking-[0.03em]`, `fontSize: 'clamp(3.5rem, 16vw, 12rem)'`.

Reveal via `ScrollTrigger.create({ trigger: container, start: 'top top', end: 'bottom bottom', onUpdate(self) })`:

```ts
const reveal = gsap.utils.clamp(0, 1, (self.progress - 0.82) / 0.1);
gsap.set(root, { autoAlpha: reveal, y: 18 - 18 * reveal });
gsap.set(words, { autoAlpha: reveal, y: 12 - 12 * reveal });
```

Segundo `ScrollTrigger` em `bottom 36%` aplica polish tween com stagger `0.06s`.

Words renderizadas via `SplitTextMotion` (que apenas emite `[data-split-item]`); animadas externamente pelo GSAP.

`aria-live="polite"` apenas quando `active || isClimax`.

## SplitTextMotion

Componente utilitário **declarativo**:

```ts
type SplitTextMotionProps<T> = {
  text: string;
  as?: T;
  mode?: 'words' | 'chars';
  className?: string;
  itemClassName?: string;
};
```

Renderiza `<Component data-split-text aria-label={text}>` com filhos `<span data-split-item aria-hidden="true">`. Não anima sozinho; a animação é orquestrada externamente.

## GhostScene 3D

Wrapper DOM: `pointer-events-none fixed inset-0 invisible`, `zIndex: beliefZIndex.ghost`.

`useWebGLSupport()` curto-circuita para `<GhostSceneFallback />` se WebGL indisponível.

Canvas: `frameloop="demand"`, `dpr={[1, isMobile ? 1 : 2]}`, `camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}`.

GLB via `getAssetUrl('site-assets/3d/ghost-v1.glb')` (`useGLTF`). Materiais customizados via `GHOST_MATERIAL_CONFIG` em `belief.constants.ts`. Dispose completo via `disposeScene` no unmount.

`SceneInvalidator` interno escuta `scroll` e `mousemove` e dispara `invalidate()` para `frameloop="demand"`.

Entrada do wrapper via GSAP:

```ts
gsap.set(wrapper, { autoAlpha: 0, scale: 0.95 });
ScrollTrigger.create({
  trigger: section,
  start: 'top 85%',
  once: true,
  onEnter: () =>
    gsap.to(wrapper, {
      autoAlpha: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.15,
      overwrite: 'auto',
    }),
});
```

Floating, cursor parallax (desktop) e clímax (`progress > 0.85`) ficam dentro de `GhostModel.useFrame`, lendo `scrollYProgress.get()` e `pointerX/Y.get()`.

`GhostErrorBoundary` envolve `<Suspense><GhostScene /></Suspense>` no `AboutBeliefs`. Não há boundary duplicado dentro de `GhostScene`.

## Estados de UI

- `app/sobre/loading.tsx` com skeleton dark editorial.
- `app/sobre/error.tsx` Client Component com `reset()`.
- `app/sobre/not-found.tsx` dark com retorno para home.
- `GhostSceneFallback` 2D acessível.

## Acessibilidade e performance

- `prefers-reduced-motion`: remove blur, parallax, stagger, comprime durações para `≤ 0.3s`.
- Apenas `transform` (`x`, `y`, `scale`) e `opacity` (`autoAlpha`) são animados; nunca `width`, `height`, `top`, `left`, `margin`, `padding`.
- Sem flashes acima de 3Hz.
- Foco do teclado não fica preso em camada sticky/fixed.
- Canvas decorativo com fallback 2D.
- Contraste do texto ciano sobre fundos vibrantes garantido com `textShadow`.

## Critérios de aceitação

- Seção começa em `#040013`.
- Seis frases entram em scroll sincronizadas com a troca de cor.
- Background usa `gsap.to({ backgroundColor })` com `duration: 1.5` e `GSAP_GHOST_EASE`, nunca CSS transition ou `motion/animate`.
- Overlay usa `gsap.to` com `scrollTrigger: { scrub: 0.85 }`.
- `BeliefFixedHeader` linha 1 em font-display black uppercase (mockup INICIAL), linha 2 menor regular.
- `BeliefScrollText` em `font-medium italic` (não bold).
- `BeliefManifesto` faz reveal scrubbed entre `progress 0.82 → 0.92` via `ScrollTrigger.onUpdate`.
- Words do header e do manifesto são renderizadas por `SplitTextMotion` e animadas externamente por GSAP via `[data-split-item]`.
- Ghost 3D aparece acima de todas as camadas em `z-[70]`.
- Ghost centraliza e escala até `+15%` após `scrollYProgress > 0.85`.
- Desktop: cursor parallax suave. Mobile: sem parallax, baseline top-left.
- Rota `/sobre` possui `loading`, `error`, `not-found`.
- WebGL tem `useWebGLSupport()` guard, fallback e error boundary no nível do wrapper.
- Nenhum `Motion DOM` (`animate`, `inView`, `useScroll`) em qualquer arquivo da seção.
- Cleanup determinístico: todo `useEffect` de animação retorna `() => ctx.revert()`.
- `pnpm run typecheck`, `pnpm run lint`, `pnpm run build` passam sem novos erros.
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` passa 12/12.
- FPS médio no scroll mantém-se acima de 50 desktop, 40 mobile.
````
