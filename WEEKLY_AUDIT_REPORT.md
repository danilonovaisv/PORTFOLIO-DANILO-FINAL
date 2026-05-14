# WEEKLY AUDIT REPORT — Portfolio Danilo Novais

> Full audit: `docs/AUDIT-REPORT-2026-05-14.md`

---

## Ciclo 2026-05-14 (Rodada 2) — Auditoria Completa vs. Specs

**Data:** 2026-05-14 | **Branch:** `main` | **Auditor:** Claude Sonnet 4.6

### Resumo Executivo

33 issues encontrados (3 P0, 15 P1, 15 P2). Arquitetura sólida. Principais riscos: `GhostSceneFallback` com `zIndex: 70` cobre o manifesto "ISSO É GHOST DESIGN" em falha de WebGL (P0); `AboutWhatIDo` horizontal scroll declarado mas não conectado a nenhum driver (P0); home page sem ISR `revalidate` (P1 performance).

| Severidade | Qty | Bloqueador? |
|---|---|---|
| P0 Crítico | 3 | Sim |
| P1 Importante | 15 | Recomendado |
| P2 Refinamento | 15 | Backlog |

### P0 — Ação Imediata

- **`GhostSceneFallback.tsx:10`** — `style={{ zIndex: 70 }}` sobrepõe o manifesto. Fix: `className="z-[var(--z-layer-3d)]"`
- **`PortfolioShowcase.tsx`** — cores do título invertidas (`portfólio` em blue, `showcase` em white — deveria ser inverso)
- **`AboutWhatIDo.tsx`** — scroll-driven horizontal não implementado (container `180vh` existente, `m.ul` com `x: 0` estático)

### P1 — Próximo PR

- `CategoryStripe.tsx`: label flutuante não renderizada + rotação do badge ausente
- `GhostScene.tsx` (sobre): `SceneInvalidator` dispara em todo scroll sem IntersectionObserver
- `GhostModel.tsx` (sobre): `useGLTF.preload` no top do módulo (não condicional)
- 5 componentes Beliefs: `beliefZIndex` TS map em vez de CSS vars `--z-layer-id`
- `AboutMethod.tsx`: `key={isMobile}` força remount do video em resize
- `ProjectsGallery.tsx`: `once: false` viola Silent Design
- `src/app/page.tsx`: sem `revalidate` — home page re-fetcha a cada request
- `supabase-test/page.tsx`: rota de debug pública
- `shuffle-projects.ts`: mismatch de hydration quando seed undefined

---

## Ciclo 2026-05-14 (Rodada 1) — Auditoria Anterior

**Data:** 2026-05-14 | **Branch:** `claude/friendly-edison-hpOZ7` | **Auditor:** Claude Sonnet 4.6

---

### 1️⃣ Visão Geral

O portfólio está em estado avançado de implementação com arquitetura sólida, separação de responsabilidades clara e boa cobertura de acessibilidade. Os três pilares principais (Home, Sobre e Portfolio) seguem o Ghost Design System, com uso consistente de tokens de cores, z-index layers e easing `[0.22, 1, 0.36, 1]`. As páginas utilizam Server Components por padrão com `dynamic()` estratégico para bundles pesados (R3F, modais).

**Home:** Hero WebGL funcional com detecção de WebGL/reduced-motion, Bento Grid de Featured Projects com layout correto (5+7 / 12 / 8+4), VideoManifesto e PortfolioShowcase implementados. Ponto crítico: inversão de cores no título do PortfolioShowcase e ausência da label flutuante `[what we love working on]` — prop declarada mas nunca renderizada.

**Sobre:** Seções com Suspense boundaries, fallbacks de skeleton e ErrorBoundary para a seção Beliefs. A seção `AboutWhatIDo` tem layout desktop de `180vh` sticky concebido para scroll-driven horizontal, mas a animação não está conectada a nenhum scroll driver (`x: 0` estático). A seção Beliefs (GhostScene 3D) tem isolamento correto com `ssr: false` e ErrorBoundary.

**Portfolio:** ISR de 1 hora, filtros por categoria com URL sync, paginação, LERP scroll condicional (>6 projetos) e modal com full focus-trap. Problema estrutural: duplo container (`std-grid` em `PortfolioClient` + `Container` interno em `ProjectsGallery`). `once: false` nos cards da galeria viola o princípio Silent Design ao causar re-animação em scroll reverso.

---

### 2️⃣ Diagnóstico por Seção

**Home Hero**

- WebGL renderiza somente quando `supportsWebGL && !shouldReduceMotion` — correto.
- Preloader de 500ms fixo não está vinculado ao carregamento real dos assets; pode atrasar artificialmente o LCP mesmo quando o WebGL já está pronto.
- Animação de entrada do texto usa `useAnimate` com `stagger` correto. O `scale: 0.92` descrito no protótipo interativo não está implementado no `HeroCopy` (diferença minor de spec).
- Camada de máscara radial (`WebkitMaskImage`) para o efeito de glow no texto implementada corretamente para desktop; ausente em mobile por design intencional.

**Vídeo Manifesto**

- Integração no `page.tsx` correta: passes de `src`, `srcMobile`, `poster` e `assetKey`.
- Componente `VideoManifesto` utiliza `dynamic()` — correto para bundle size.

**Portfolio Showcase**

- **P0 CRÍTICO:** Título renderiza `portfólio` em `text-bluePrimary italic font-light` e `showcase` em `text-white font-bold`. O SSOT (seção 4.4) especifica o inverso: `portfólio` branco, `showcase` azul primário.
- **P1:** Prop `showLabel: true` passada à primeira stripe mas nunca renderizada em `CategoryStripe.tsx`. Label `[what we love working on]` ausente da UI.
- **P1:** Rotação do badge arrow no hover (`-45deg → 0deg`) especificada no SSOT, não implementada. Apenas `y: -1` presente.
- Hover thumbnail com expand funcional e correto.
- Mobile simplificado sem thumbnails conforme spec.

**Featured Projects**

- Bento Grid (5+7 / 12 / 8+4) implementado corretamente com `items-stretch` + `self-stretch` garantindo altura igual por linha.
- **P2:** `gap-4 md:gap-6` sem `lg:gap-8` — desvio do Ghost Grid System que especifica 32px em desktop.
- Background animado com rotação via `setTimeout` customizado + `IntersectionObserver` para pausar fora da viewport — boa implementação.

**About — Origin**

- Sticky gallery + scrolling info blocks: correto.
- Quatro chamadas sequenciais de `useSiteAssetUrl` com fallback chain — conforme regras de hooks.
- Animações GSAP via `useOriginAnimations` — correto.

**About — Method**

- **P1:** `key={isMobile ? 'mobile' : 'desktop'}` força remount do `<video>` em resize, causando flash e novo request de rede. Padrão inconsistente com `hidden/block` CSS usado no restante do codebase.
- Overlay de gradiente e layout split correto.

**About — What I Do**

- **P0 CRÍTICO:** Desktop tem `lg:h-[180vh]` sticky container projetado para scroll-driven horizontal. O `m.ul` recebe `x: 0, opacity: 1` estáticos — nenhum `useScroll`/`useTransform` nem GSAP ScrollTrigger conectado. A animação horizontal descrita no protótipo não existe funcionalmente.
- Mobile layout com `whileInView` fade-left funcional — correto.
- Marquee de keywords com `animate-marquee` + `pause-animation` definidos em globals.css — correto.

**About — Beliefs**

- Scroll-linked com `GhostScene` 3D: `ssr: false`, `GhostErrorBoundary`, `SectionErrorBoundary` — excelente isolamento.
- `overflow-clip` em vez de `overflow-hidden` — intencional para performance.

**Portfolio Grid**

- Filtros com `role="tablist"`, `aria-selected`, keyboard nav (ArrowLeft/Right/Home/End) — acessibilidade excelente.
- **P1:** `once: false` nos cards causa re-animação com blur em scroll reverso, violando Silent Design.
- **P1:** `top-[88px]` hardcoded em `getTrackClasses()` para o estado `fixed` do LERP — frágil se altura do header mudar.
- `liveProjects` como estado derivado via `useEffect` do `paginatedProjects` adiciona um render cycle desnecessário.

**Portfolio Modal**

- Focus trap, escape key, `aria-modal`, portal ao root — acessibilidade excelente.
- `setTimeout(50)` para foco inicial: aceitável.

**Admin / CMS**

- `ProjectsTable`, `ProjectForm`, templates v1/v2/v3 coexistem — débito técnico de múltiplas versões.
- Supabase realtime em `PortfolioClient` está wrapped em `if (process.env.NODE_ENV === 'production') return` — realtime só dispara em desenvolvimento, não em produção. Intencional (ISR substitui realtime em prod) mas pode confundir durante QA de staging.

---

### 3️⃣ Lista de Problemas e Backlog Priorizado

| #   | Severidade | Seção              | Problema                                                                                                                                                                                |
| --- | ---------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | 🔴 P0      | Portfolio Showcase | Cores do título invertidas: `portfólio` está em `bluePrimary` (deveria ser `white`) e `showcase` em `white` (deveria ser `bluePrimary`). Inverte a hierarquia visual do SSOT seção 4.4. |
| 02  | 🔴 P0      | About / What I Do  | Scroll-driven horizontal não implementado. `m.ul` recebe `x: 0` estático. Container `lg:h-[180vh]` existe mas nenhum `useScroll`/`useTransform` está conectado.                         |
| 03  | 🟡 P1      | Portfolio Showcase | `showLabel: true` passado para `brand-campaigns` mas nunca renderizado em `CategoryStripe`. Label flutuante `[what we love working on]` ausente.                                        |
| 04  | 🟡 P1      | Portfolio Showcase | Rotação do badge arrow no hover (`-45deg → 0deg`) especificada no SSOT, não implementada. Apenas `y: -1` presente.                                                                      |
| 05  | 🟡 P1      | Portfolio Gallery  | `once: false` nos cards faz re-animar com blur em scroll reverso. Viola princípio Silent Design.                                                                                        |
| 06  | 🟡 P1      | Portfolio Client   | Duplo container: `std-grid` em `PortfolioClient` envolve `ProjectsGallery` que já tem `Container` interno — potencial padding duplo em desktop.                                         |
| 07  | 🟡 P1      | About / Method     | `key={isMobile ? 'mobile' : 'desktop'}` força remount do `<video>` em resize, causando flash e novo request de rede.                                                                    |
| 08  | 🟡 P1      | Portfolio Gallery  | `top-[88px]` hardcoded em `getTrackClasses()` para estado `fixed` do LERP. Se altura do header mudar, track fica descalibrado.                                                          |
| 09  | 🟢 P2      | Featured Projects  | `gap-4 md:gap-6` sem `lg:gap-8` — desvio do Ghost Grid System (desktop 32px).                                                                                                           |
| 10  | 🟢 P2      | Home Hero          | Preloader de 500ms fixo não vinculado ao carregamento real do WebGL — pode atrasar LCP artificialmente.                                                                                 |

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

---

> ### 🛠️ Prompt #01 — Corrigir Inversão de Cores no Título do Portfolio Showcase
>
> **Objetivo:** Inverter as classes de cor do heading `portfólio showcase` para seguir o SSOT: `portfólio` = `text-white`, `showcase` = `text-bluePrimary`.
> **Arquivos:** `src/components/home/portfolio-showcase/PortfolioShowcase.tsx` (linhas 80–87)
> **Ações:**
>
> 1. Localizar o `<h2>` com id `portfolio-showcase-heading`.
> 2. No primeiro `<span>`, trocar `text-bluePrimary` por `text-white`. Manter `italic font-light block sm:inline`.
> 3. No segundo `<span>`, trocar `text-white` por `text-bluePrimary`. Manter `font-bold block sm:inline`.
>
> **Regras:** Não alterar font-weight, italic, tracking ou qualquer outra propriedade. Não criar classes novas.
> **Critérios de Aceite:**
>
> - [ ] `portfólio` renderiza em `#fcffff` (white)
> - [ ] `showcase` renderiza em `#0048ff` (bluePrimary)
> - [ ] Nenhuma outra mudança visual introduzida
> - [ ] Build sem erros TypeScript

---

> ### 🛠️ Prompt #02 — Implementar Label Flutuante no Portfolio Showcase
>
> **Objetivo:** Renderizar o label `[what we love working on]` acima da primeira stripe, conforme SSOT seção 4.4.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:**
>
> 1. Adicionar renderização condicional do `showLabel` prop dentro do bloco desktop (`hidden lg:flex`).
> 2. Quando `showLabel === true`, renderizar antes do conteúdo principal um `<p>` com texto `[what we love working on]`, classes: `text-bluePrimary font-mono text-xs tracking-[0.2em] uppercase mb-3 w-full text-left`.
> 3. Garantir que o label não apareça em mobile.
>
> **Regras:** Apenas Tailwind, sem CSS externo. Não alterar layout das stripes existentes. Mobile-first.
> **Critérios de Aceite:**
>
> - [ ] Label visível apenas na primeira stripe em desktop (≥1024px)
> - [ ] Cor `#0048ff`, fonte mono, uppercase, alinhado à esquerda
> - [ ] Layout das outras stripes não afetado
> - [ ] Build sem erros TypeScript

---

> ### 🛠️ Prompt #03 — Adicionar Rotação ao Badge Arrow no Hover do CategoryStripe (Desktop)
>
> **Objetivo:** Implementar animação de rotação `-45deg → 0deg` no badge circular de seta no hover, conforme SSOT seção 4.4.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx` (linhas ~153–168, bloco `m.div` do badge desktop)
> **Ações:**
>
> 1. Localizar o `m.div` do badge circular no bloco desktop.
> 2. Adicionar ao `animate`: `rotate: isHovered ? 0 : -45`.
> 3. Garantir que `transition` inclua `rotate` com `duration: MOTION_TOKENS.duration.modal, ease: GHOST_EASE`.
>
> **Regras:** Não alterar dimensões, cores ou outros estados. Usar apenas Framer Motion `animate` prop. Mobile não deve ter este comportamento.
> **Critérios de Aceite:**
>
> - [ ] Badge inicia com -45° de rotação (estado default/não-hovered)
> - [ ] No hover, retorna a 0° com easing Ghost
> - [ ] Transição sem jank
> - [ ] Mobile não afetado

---

> ### 🛠️ Prompt #04 — Corrigir `once: false` no ProjectCard para Silent Design
>
> **Objetivo:** Evitar re-animação com blur em scroll reverso.
> **Arquivos:** `src/components/portfolio/ProjectCard.tsx` (linhas 53–68, objeto `motionProps`)
> **Ações:**
>
> 1. No branch `reduceMotion` (linha ~57): substituir `once: false` por `once: true`.
> 2. No branch normal (linha ~63): substituir `once: false` por `once: true`. Remover `margin: '-10% 0px -10% 0px'`.
>
> **Regras:** Não alterar `initial`, `whileInView`, `transition` nem delay por index.
> **Critérios de Aceite:**
>
> - [ ] Cards animam apenas uma vez ao entrar na viewport
> - [ ] Scroll reverso não causa nova animação
> - [ ] Troca de filtro na galeria re-anima novos cards normalmente

---

> ### 🛠️ Prompt #05 — Refatorar Video Swap no AboutMethod para CSS Display
>
> **Objetivo:** Eliminar remount do `<video>` via `key` prop em resize.
> **Arquivos:** `src/components/sobre/sections/AboutMethod.tsx` (linhas ~22, ~30–51)
> **Ações:**
>
> 1. Remover `useMediaQuery` e a lógica de `key` do video.
> 2. Renderizar dois `<video>` side-by-side:
>    - Desktop: `className="hidden lg:block ..."` com `src={ABOUT_CONTENT.method.videos.desktop}`
>    - Mobile: `className="block lg:hidden ..."` com `src={ABOUT_CONTENT.method.videos.mobile}`
> 3. Ambos com `autoPlay={!prefersReducedMotion}`, `muted`, `loop={!prefersReducedMotion}`, `playsInline`, `poster={DEFAULT_VIDEO_POSTER}`, `aria-hidden="true"`.
>
> **Regras:** Não alterar textos, overlays ou padding. Manter `opacity-55`. Mobile-first.
> **Critérios de Aceite:**
>
> - [ ] Sem remount ao redimensionar viewport
> - [ ] Correto em `< 1024px` (mobile) e `≥ 1024px` (desktop)
> - [ ] Sem flash ou request extra em resize
> - [ ] Build sem erros TypeScript

---

> ### 🛠️ Prompt #06 — Implementar Scroll-Driven Horizontal no AboutWhatIDo (Desktop)
>
> **Objetivo:** Conectar a animação horizontal dos cards ao scroll da seção usando `useScroll` + `useTransform`.
> **Arquivos:** `src/components/sobre/sections/AboutWhatIDo.tsx`
> **Ações:**
>
> 1. Adicionar `const desktopSectionRef = useRef<HTMLDivElement>(null)` e associar ao `div.hidden.lg:block.lg:h-[180vh]`.
> 2. Usar `useScroll({ target: desktopSectionRef, offset: ['start start', 'end end'] })` para obter `scrollYProgress`.
> 3. Usar `useTransform(scrollYProgress, [0, 1], ['0%', '-38%'])` para gerar `xTransform`.
> 4. No `m.ul`, substituir `style={{ x: 0, opacity: 1 }}` por `style={{ x: prefersReducedMotion ? '0%' : xTransform }}`.
> 5. Remover `whileInView` dos `m.li` filhos (animação fica no container).
>
> **Regras:** `prefers-reduced-motion` desativa e mantém `x: 0`. Não alterar mobile layout. Usar `will-change-transform` no `m.ul`. Percentual `-38%` pode precisar ajuste fino após teste visual.
> **Critérios de Aceite:**
>
> - [ ] Cards se movem horizontalmente durante scroll da seção em desktop
> - [ ] `prefers-reduced-motion: reduce` mantém cards estáticos e visíveis
> - [ ] Mobile inalterado
> - [ ] FPS > 50 durante animação (verificar no DevTools Performance)

---

> ### 🛠️ Prompt #07 — Corrigir Duplo Container em PortfolioClient
>
> **Objetivo:** Eliminar padding duplo causado por `std-grid` em `PortfolioClient` envolvendo componentes que já têm seus próprios containers.
> **Arquivos:** `src/app/portfolio/PortfolioClient.tsx` (linhas ~126–165)
> **Ações:**
>
> 1. Identificar o `<div className="std-grid">` que envolve `PortfolioHeroNew`, `ProjectsGallery`, CTA section e ClientsBrands.
> 2. Remover o wrapper `std-grid` de `PortfolioClient`.
> 3. Verificar `PortfolioHeroNew` e a CTA section — se não tiverem container próprio, adicionar `<Container>` individual neles.
> 4. Manter `ClientsBrands` e `ContactSection` com seus próprios containers.
>
> **Regras:** Não alterar layout visual. Comparar screenshots antes/depois. Verificar ausência de overflow horizontal em mobile.
> **Critérios de Aceite:**
>
> - [ ] Nenhum padding duplo visível em desktop (≥1024px)
> - [ ] Gallery, Hero e CTA alinhados ao Ghost Grid System
> - [ ] Sem overflow horizontal em mobile
> - [ ] Build sem erros TypeScript

---

> ### 🛠️ Prompt #08 — Corrigir Gap do Bento Grid de Featured Projects para `lg:gap-8`
>
> **Objetivo:** Alinhar o gap do grid ao Ghost Grid System (32px em desktop).
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx` (linhas ~62, ~138)
> **Ações:**
>
> 1. Na `m.div` principal do grid, adicionar `lg:gap-8` à string de classes existente `gap-4 md:gap-6 lg:grid-cols-12`.
> 2. Na `FeaturedProjectsSkeleton` (linha ~63), adicionar igualmente `lg:gap-8`.
>
> **Regras:** Não alterar `gap-4` (mobile) nem `md:gap-6` (tablet). Não alterar grid columns nem layout de cards.
> **Critérios de Aceite:**
>
> - [ ] Em ≥1024px, gap entre cards é 32px
> - [ ] Mobile 16px e tablet 24px inalterados
> - [ ] Skeleton espelha o mesmo gap
> - [ ] Sem overflow ou quebra de layout

---

> ### 🛠️ Prompt #09 — Tornar LERP Track Offset Dinâmico via CSS Variable
>
> **Objetivo:** Substituir `top-[88px]` fixo em `getTrackClasses()` por um valor dinâmico baseado em CSS variable.
> **Arquivos:** `src/components/portfolio/ProjectsGallery.tsx` (linhas ~218–223), `src/components/layout/header/SiteHeader.tsx` ou `ClientLayout.tsx`
> **Ações:**
>
> 1. No `SiteHeader` ou `ClientLayout`, adicionar `useEffect` + `ResizeObserver` que lê a altura do header element e define `document.documentElement.style.setProperty('--header-height', height + 'px')`.
> 2. Em `getTrackClasses()`, substituir `top-[88px]` por `top-[var(--header-height,88px)]`.
>
> **Regras:** Fallback `88px` obrigatório para SSR. Não alterar lógica de scroll state. Não alterar padding/z-index.
> **Critérios de Aceite:**
>
> - [ ] LERP track se posiciona corretamente abaixo do header independente da sua altura
> - [ ] SSR não quebra (fallback `88px`)
> - [ ] Nenhuma regressão no comportamento de scroll da galeria

---

> ### 🛠️ Prompt #10 — Vincular Preloader do HomeHero ao Primeiro Frame do WebGL
>
> **Objetivo:** Substituir o timer fixo de 500ms por um sinal real de prontidão do R3F, reduzindo delay artificial no LCP.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx` (linhas ~17–39), `src/components/canvas/home/hero/GhostSceneWrapper.tsx`
> **Ações:**
>
> 1. Em `GhostSceneWrapper.tsx`, adicionar prop `onReady?: () => void`. Dentro do `<Canvas>`, usar `useFrame` com um `useRef` de flag: no primeiro frame, chamar `onReady()` e marcar flag como `true` para não re-disparar.
> 2. Em `HomeHero.tsx`, passar `handlePreloaderDone` como `onReady` ao `<GhostSceneWrapper>`.
> 3. Manter o `setTimeout` de 500ms apenas como fallback timeout caso o WebGL não inicialize. Para mobile (`!shouldRenderWebGL`), usar timeout reduzido de 200ms.
>
> **Regras:** Não alterar visual do Preloader. Não quebrar fallback de `shouldRenderWebGL === false`. Manter `AnimatePresence` para saída suave.
> **Critérios de Aceite:**
>
> - [ ] Em desktop com WebGL, preloader some ao primeiro frame renderizado
> - [ ] Em mobile sem WebGL, preloader some em ≤200ms
> - [ ] Sem flash ou flicker na transição
> - [ ] LCP potencialmente melhorado (sem delay artificial)
