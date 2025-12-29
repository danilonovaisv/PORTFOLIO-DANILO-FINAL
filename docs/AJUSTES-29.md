# Auditoria Técnica & Visual — HOME + PORTFOLIO (Danilo Novais)

> **Lei absoluta:** qualquer divergência perceptível vs. `docs/HERO-PORTFOLIO-GHOST.jpg` e `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg` = **BUG**.  
> **Regras absolutas:** ❌ não alterar textos, ❌ não alterar ordem das seções, ❌ não “melhorar” layout, ✅ apenas correções para fidelidade.

---

# 1️⃣ Visão Geral (estado do projeto)

## Arquitetura (alto nível)
A base do projeto está corretamente organizada em **Next.js App Router** (`src/app`) com componentes segmentados por domínio:

- **Header**: `src/components/header/*` (inclui `DesktopFluidHeader.tsx`, `MobileStaggeredMenu.tsx`, `SiteHeader.tsx` e WebGL `FluidGlass.tsx`)
- **Home**: `src/components/home/*` (inclui `HomeHero.tsx`, `GhostStage.tsx`, `ManifestoThumb.tsx`, `ManifestoSection.tsx`, `PortfolioShowcase.tsx`, `FeaturedProjects.tsx`, `Clients.tsx`, `Contact.tsx`)
- **WebGL Hero**: `src/components/home/webgl/*` + `postprocessing/*` (Ghost, Eyes, Particles, Fireflies, Veil, passes)
- **Portfolio**: `src/app/portfolio/page.tsx` + `src/components/portfolio/*` (hero e grid)
- **Layout**: `src/components/layout/Header.tsx` e `src/components/layout/Footer.tsx`

✅ Estrutura compatível com a spec (orquestradores + camadas + subcomponentes).

## Limitação de auditoria (objetiva)
Nesta sessão eu consigo mapear **arquitetura / rotas / arquivos envolvidos**, mas não consigo inspecionar o JSX completo de cada arquivo (a ferramenta retorna “downloaded”, sem expor o conteúdo).  
Logo, este documento é um **QA técnico+visual orientado por spec + referências**: cada bug vem com ação cirúrgica e critério de aceite comparável — e o agente executor deve confirmar “pixel-match” ao aplicar.

---

# 2️⃣ Diagnóstico por Dimensão

## Estrutura
- ✅ Separação por domínio (header/home/portfolio/webgl) adequada.
- 🔴 Risco crítico: **tokens de layout (container/padding/gutters)** espalhados por múltiplas seções → edge rhythm inconsistente.

## UI
- 🔴 Fidelidade visual exige: **mesmo grid, mesmas margens, mesmos gutters** em todas as seções.
- 🟡 Risco: variação de `px-*` por seção em vez de um padrão único `px-[clamp(24px,5vw,96px)]`.

## UX
- 🔴 Mobile-first: risco de menu sem scroll lock, sem ESC/click-away, targets pequenos e possível overflow horizontal em stripes/cards.

## Fidelidade Visual
- 🔴 “Truth source” = imagens. Qualquer divergência (mesmo pequena) é bug.
- 🔴 Hero depende de: stack de camadas + escala/posição do Ghost + thumb manifesto.

## Responsividade
- 🔴 Desktop vs Mobile tem regras não-negociáveis (header, manifesto, WebGL).
- 🔴 Potencial de CLS no hero por vídeo/canvas/font.

## Alinhamento “duas laterais”
- 🔴 Principal risco do projeto: cada seção implementar “container” diferente → “saltos” de alinhamento.

## Motion
- 🔴 ManifestoThumb: entrada editorial premium (fade/translate/scale sutil) + hover discreto.
- 🔴 `prefers-reduced-motion`: remover follow/scrub e manter layout idêntico.

## WebGL/3D
- 🔴 Ghost: atmosférico (sem GLB), pós-processamento controlado, follow mouse apenas desktop, fallback sem WebGL.

## Performance
- 🔴 Canvas: DPR controlado, antialias false, evitar re-render, clamp em mobile.
- 🟡 Vídeo manifesto: garantir `playsInline`, `muted`, `preload` adequado e sem shift de layout.

## Acessibilidade
- 🔴 Menu mobile: ARIA completo, foco visível, ESC fecha, click-away fecha, body scroll lock.
- 🟡 Links/cards: `focus-visible:ring` consistente e área mínima de toque.

---

# 3️⃣ Diagnóstico por Seção (Home + Portfolio)

> **Checklist obrigatório por seção** (responder Sim/Não):
> - Grid corresponde à imagem?
> - Margens laterais equivalentes?
> - Alinhamento duas laterais consistente?
> - Hierarquia tipográfica equivalente?
> - Espaçamento vertical equivalente?
> - Elementos 3D/WebGL na mesma posição/escala?
> - Mobile equivalente ao esperado?
> - Sem overflow horizontal?

---

## 🎯 Seção: Header (SiteHeader)

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg` (header pill + nav + active underline)
- 🧩 Componentes envolvidos: `src/components/layout/Header.tsx`, `src/components/header/SiteHeader.tsx`, `DesktopFluidHeader.tsx`, `MobileStaggeredMenu.tsx`, `src/components/header/webgl/FluidGlass.tsx`
- 🔗 Integrações: `layout/Header.tsx → SiteHeader.tsx → (DesktopFluidHeader | MobileStaggeredMenu) → FluidGlass.tsx`

### ✅ Checklist de Fidelidade (Header)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **Não**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Sim** (provável, mas deve ser validado)

### ❌ Problema (objetivo, mensurável)
1) Header deve ser **moldura**; qualquer competição visual com Hero = bug.  
2) Desktop: fluid glass (WebGL) moderado; Mobile: **sem WebGL pesado** + menu fullscreen staggered.  
3) A11y do menu mobile pode estar incompleto (ESC/click-away/scroll lock/ARIA/focus trap).

### 🔧 Correção Técnica (ação exata)
- Fixar `z-40` (ou equivalente) e garantir stacking acima do hero, sem blur/glow invasivo.
- Garantir switch real desktop vs mobile em `SiteHeader.tsx`.
- Implementar: `aria-expanded`, `aria-controls`, `aria-label`, ESC fecha, click-away fecha, scroll lock.

### ✅ Resultado esperado (comparável)
- Desktop: header pill alinhado e com highlight “home” como em `docs/HERO-PORTFOLIO-GHOST.jpg`.
- Mobile: botão menu abre overlay fullscreen com stagger, sem jank.

---

## 🎯 Seção: Hero (HomeHero + GhostStage + HeroCopy)

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg`
- 🧩 Componentes envolvidos: `src/components/home/HomeHero.tsx`, `HeroPreloader.tsx`, `HeroCopy.tsx`, `GhostStage.tsx`, `ManifestoThumb.tsx`, `ManifestoSection.tsx`
- 🔗 Integrações: `HomeHero.tsx → HeroPreloader + GhostStage(GhostCanvas) + HeroCopy + ManifestoThumb + ManifestoSection`

### ✅ Checklist de Fidelidade (Hero)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **Não**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Não** (alto risco por thumb + canvas)

### ❌ Problema (objetivo, mensurável)
1) Stack obrigatório: Preloader z-50, Thumb z-30, Ghost z-20, Copy z-10, Background z-0.  
2) Desktop hero precisa de timeline (`h-[200vh]`) para morph do vídeo manifesto por scroll/click (sem cortes abruptos).  
3) Texto editorial deve ser **estático** (sem animação gratuita), idêntico à referência.

### 🔧 Correção Técnica (ação exata)
- Garantir container `relative overflow-hidden bg-[#06071f]`.
- Garantir z-index por layer e `pointer-events-none` no canvas.
- Garantir altura estável e placeholders para evitar CLS.

### ✅ Resultado esperado (comparável)
- Primeira dobra idêntica ao `docs/HERO-PORTFOLIO-GHOST.jpg`: ghost à esquerda, texto central, thumb no canto inferior direito.

---

## 🎯 Seção: HeroPreloader

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg`
- 🧩 Componentes envolvidos: `src/components/home/HeroPreloader.tsx`
- 🔗 Integrações: `HomeHero.tsx → HeroPreloader.tsx`

### ✅ Checklist de Fidelidade (HeroPreloader)
- Grid corresponde à imagem? **Sim**
- Margens laterais equivalentes? **Sim**
- Alinhamento duas laterais consistente? **Sim**
- Hierarquia tipográfica equivalente? **Não** (risco de fonte/tamanho)
- Espaçamento vertical equivalente? **Não** (risco de timing/spacing)
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Sim**
- Sem overflow horizontal? **Sim**

### ❌ Problema (objetivo, mensurável)
- Preloader deve sumir sem “flash”, sem prender foco e deve ser removido da árvore acessível após completar.

### 🔧 Correção Técnica (ação exata)
- Ao completar: `aria-hidden`, `pointer-events-none` e remover do DOM (ou `display:none`).
- Evitar reexecução em navegação interna se não desejado.

### ✅ Resultado esperado (comparável)
- “Summoning spirits” + barra + fade-out suave, sem interferir na hero.

---

## 🎯 Seção: ManifestoThumb (desktop)

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg` + `docs/HERO_E_VIDEO_MANIFESTO.png`
- 🧩 Componentes envolvidos: `src/components/home/ManifestoThumb.tsx`
- 🔗 Integrações: `HomeHero.tsx → ManifestoThumb.tsx`

### ✅ Checklist de Fidelidade (ManifestoThumb)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **N/A**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Sim** (deve estar oculto)
- Sem overflow horizontal? **Não** (risco alto por `right/bottom`)

### ❌ Problema (objetivo, mensurável)
1) Entrada premium editorial (opacity/y/scale leve), sem competir com ghost.  
2) Hover: scale sutil + seta rotaciona -45 → 0.  
3) Reduced motion: sem hover forte e sem scrub agressivo.

### 🔧 Correção Técnica (ação exata)
- Aplicar `motion.div` wrapper com `initial/whileInView` + easing `[0.22,1,0.36,1]`.
- `viewport={{ once:true, amount:0.35 }}`.
- `prefers-reduced-motion`: reduzir para fade simples.

### ✅ Resultado esperado (comparável)
- Thumb aparece no canto inferior direito como na referência, com entrada premium sutil e hover discreto.

---

## 🎯 Seção: ManifestoSection (mobile)

- 📌 Fidelidade visual (referência): ✗ — `docs/HOME-HERO-MOBILE.jpg`
- 🧩 Componentes envolvidos: `src/components/home/ManifestoSection.tsx`
- 🔗 Integrações: `HomeHero.tsx → ManifestoSection.tsx`

### ✅ Checklist de Fidelidade (ManifestoSection Mobile)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Sim** (full-width)
- Alinhamento duas laterais consistente? **Sim**
- Hierarquia tipográfica equivalente? **N/A**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Sim**

### ❌ Problema (objetivo, mensurável)
- Em mobile, manifesto deve ser seção independente logo após a hero, fullscreen (aspect-video), com reveal sutil e sem overlay extra.

### 🔧 Correção Técnica (ação exata)
- Render mobile-only (`md:hidden`).
- `useInView` com `opacity/transform` apenas.
- Tap alterna mute/unmute (se previsto no spec do protótipo).

### ✅ Resultado esperado (comparável)
- Manifesto ocupa 100% da largura e mantém continuidade visual com fundo `#06071f`.

---

## 🎯 Seção: GhostStage / GhostCanvas (WebGL)

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg`
- 🧩 Componentes envolvidos: `src/components/home/GhostStage.tsx`, `src/components/home/webgl/GhostCanvas.tsx`, `Ghost.tsx`, `Eyes.tsx`, `Particles.tsx`, `Fireflies.tsx`, `AtmosphereVeil.tsx`, `postprocessing/*`
- 🔗 Integrações: `HomeHero.tsx → GhostStage.tsx → GhostCanvas.tsx → (Ghost + FX)`

### ✅ Checklist de Fidelidade (Ghost)
- Grid corresponde à imagem? **N/A**
- Margens laterais equivalentes? **N/A**
- Alinhamento duas laterais consistente? **N/A**
- Hierarquia tipográfica equivalente? **N/A**
- Espaçamento vertical equivalente? **N/A**
- Elementos 3D/WebGL na mesma posição/escala? **Não**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Sim** (canvas não deveria causar, mas validar)

### ❌ Problema (objetivo, mensurável)
1) Follow mouse deve existir apenas no desktop.  
2) Reduced motion deve desativar follow e reduzir bloom/decay mantendo a cena funcional.  
3) Fallback sem WebGL deve manter layout idêntico (gradiente + texto + manifesto).

### 🔧 Correção Técnica (ação exata)
- `dynamic import` client-only em `GhostStage.tsx` + fallback radial.
- Canvas: `dpr={[1,2]}`, `gl={{ antialias:false }}`, clamp em mobile.
- `pointer-events-none` no canvas e evitar re-renders caros.

### ✅ Resultado esperado (comparável)
- Ghost atmosférico, glow controlado, sem “chiclete” no cursor, idêntico à referência.

---

## 🎯 Seção: Portfolio Showcase (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
- 🧩 Componentes envolvidos: `src/components/home/PortfolioShowcase.tsx`, `src/components/home/CategoryStripe.tsx`, `src/components/home/portfolio-showcase/category-stripe/*`
- 🔗 Integrações: `Home → PortfolioShowcase.tsx → CategoryStripe(s) → CategoryThumbnail/CategoryText/CategoryArrow`

### ✅ Checklist de Fidelidade (Portfolio Showcase)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Não** (alto risco em stripes)

### ❌ Problema (objetivo, mensurável)
1) Desktop: alternância de alinhamento (end/center/start) por stripe.  
2) Desktop: hover revela thumbnail; Mobile: sem hover/reveal/width-anim.  
3) Floating label `[what we love working on]` deve existir no desktop e estar posicionado conforme spec.

### 🔧 Correção Técnica (ação exata)
- Container padrão (`max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]`).
- Alternância via classes por stripe.
- Thumbnail `hidden md:block` e animação premium sem layout shift.
- Reduced motion: reveal instantâneo.

### ✅ Resultado esperado (comparável)
- Seção editorial idêntica à referência, sem overflow e com ritmo consistente.

---

## 🎯 Seção: Featured Projects (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/PROTFOLIO_CARDS.png` + `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
- 🧩 Componentes envolvidos: `src/components/home/FeaturedProjects.tsx`, `src/components/home/ProjectCard.tsx`
- 🔗 Integrações: `Home → FeaturedProjects.tsx → ProjectCard.tsx`

### ✅ Checklist de Fidelidade (Featured Projects)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Não**

### ❌ Problema (objetivo, mensurável)
1) Bento grid deve seguir exatamente: (5/12 + 7/12), (full), (8/12 + 4/12 CTA).  
2) Cards devem ter altura estável por breakpoint (evitar CLS).  
3) Hover premium: seta desloca ~20px, mídia scale ~1.03 e -translate-y-1.

### 🔧 Correção Técnica (ação exata)
- Garantir `md:grid-cols-12` e spans fixos.
- Fixar alturas no desktop conforme spec.
- Lazy loading e placeholders de mídia.

### ✅ Resultado esperado (comparável)
- Layout “revista” fiel à referência e microinterações discretas.

---

## 🎯 Seção: Clients / Brands (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/BRANDS.png`
- 🧩 Componentes envolvidos: `src/components/home/Clients.tsx`
- 🔗 Integrações: `Home → Clients.tsx`

### ✅ Checklist de Fidelidade (Clients)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Sim** (validar)

### ❌ Problema (objetivo, mensurável)
- Fundo azul institucional e logos monocromáticos claros; grid consistente; a11y com `alt`.

### 🔧 Correção Técnica (ação exata)
- `bg-[#0057FF]` (ou token), `filter brightness-0 invert` nos logos.
- Reveal stagger no scroll (desativado em reduced motion).

### ✅ Resultado esperado (comparável)
- Faixa azul idêntica à referência com grid de logos equilibrado.

---

## 🎯 Seção: Contact (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/CONTACT.png`
- 🧩 Componentes envolvidos: `src/components/home/Contact.tsx`, `src/components/home/contact/*`
- 🔗 Integrações: `Home → Contact.tsx`

### ✅ Checklist de Fidelidade (Contact)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Não** (risco em grid/form)

### ❌ Problema (objetivo, mensurável)
- Desktop: 2 colunas (info esquerda, form direita). Inputs com label + focus ring correto; botão com hover/tap discretos.

### 🔧 Correção Técnica (ação exata)
- `grid-cols-1 md:grid-cols-2` + gaps corretos.
- Labels com `htmlFor` e inputs com `id/name`.
- Confirmar `action="https://formsubmit.co/danilo@portfoliodanilo.com"`.

### ✅ Resultado esperado (comparável)
- Bloco de contato idêntico à referência, sem sobreposição/overflow.

---

## 🎯 Seção: Footer (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/FOOTER.png`
- 🧩 Componentes envolvidos: `src/components/layout/Footer.tsx`
- 🔗 Integrações: `app/layout.tsx → Footer.tsx`

### ✅ Checklist de Fidelidade (Footer)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Sim** (validar)

### ❌ Problema (objetivo, mensurável)
1) Footer fixo apenas no desktop; mobile nunca fixo.  
2) Link “sobre” deve ir para `/sobre` (não `#clients`).  
3) Unificar copyright para `© 2025...`.

### 🔧 Correção Técnica (ação exata)
- Aplicar `fixed bottom-0 left-0 right-0` apenas em `lg:` (ou equivalente).
- Mobile: footer no fluxo com `py-10`.
- Ajustar destinos sem alterar labels.

### ✅ Resultado esperado (comparável)
- Desktop: barra fixa institucional. Mobile: encerramento limpo sem sobrepor conteúdo.

---

## 🎯 Seção: Portfolio Page — Hero + Grid (Portfolio)

- 📌 Fidelidade visual (referência): ✗ — `docs/PROTFOLIO_COMPLETO.png`
- 🧩 Componentes envolvidos: `src/app/portfolio/page.tsx`, `src/components/portfolio/PortfolioHero.tsx`, `PortfolioMosaicGrid.tsx`, `MosaicCard.tsx`
- 🔗 Integrações: `app/portfolio/page.tsx → PortfolioHero.tsx + PortfolioMosaicGrid.tsx → MosaicCard.tsx`

### ✅ Checklist de Fidelidade (Portfolio Page)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento duas laterais consistente? **Não**
- Hierarquia tipográfica equivalente? **Não**
- Espaçamento vertical equivalente? **Não**
- Elementos 3D/WebGL na mesma posição/escala? **N/A**
- Mobile equivalente ao esperado? **Não**
- Sem overflow horizontal? **Não**

### ❌ Problema (objetivo, mensurável)
- `/portfolio` deve “encaixar” no mesmo edge rhythm da home e manter grid consistente, sem CLS e sem overflow.

### 🔧 Correção Técnica (ação exata)
- Padronizar container e padding com a Home.
- Garantir dimensões estáveis para imagens/vídeos e `object-cover`.
- Reduced motion: desativar microinterações não essenciais.

### ✅ Resultado esperado (comparável)
- Página Portfolio com margens idênticas à Home e mosaic fiel à referência.

---

# 4️⃣ Lista de Problemas (com severidade)

## 🔴 Alta (bloqueia fidelidade/UX/performance)
1) Edge rhythm inconsistente entre seções (containers/paddings variados).  
2) Header: desktop vs mobile + acessibilidade do menu (ESC/clickaway/scroll lock/ARIA/focus).  
3) Hero: stack z-index + timeline do manifesto (desktop) + manifesto fullscreen (mobile).  
4) ManifestoThumb: entrada premium editorial + hover premium + reduced motion correto.  
5) WebGL Ghost: desktop-only follow mouse + reduced motion + fallback sem WebGL.  
6) Overflow horizontal em mobile (stripes/cards/thumb/canvas).  
7) CLS no Hero e nos cards (mídia sem dimensões estáveis).

## 🟡 Média (perceptível)
8) Hover/microinterações com timing/easing fora do “premium editorial”.  
9) FeaturedProjects: bento grid não obedecer spans/alturas.  
10) Clients: grid/filtros de logos inconsistentes e sem stagger reveal.

## 🟢 Baixa (polimento)
11) Footer: ano (2023 vs 2025) e rotas (`#clients` vs `/sobre`).  
12) Pequenas inconsistências de focus ring e estados hover/active.

---

# 5️⃣ Recomendações Prioritárias (ordem de execução)

1) **Container padrão global** (resolve edge rhythm em cascata).  
2) **Header** (z-index + menu mobile A11y + perf).  
3) **Hero** (camadas + manifesto desktop/mobile + evitar CLS).  
4) **WebGL Ghost** (desktop-only + reduced motion + fallback).  
5) **PortfolioShowcase** (hover desktop / mobile-safe sem overflow).  
6) **FeaturedProjects** (bento + alturas + hover premium).  
7) **Clients + Contact + Footer** (finalização).

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR (OBRIGATÓRIO)

> Cada prompt = 1 problema.  
> Regras: ❌ não alterar textos, ❌ não inventar layout, ✅ Tailwind + App Router, ✅ mobile-first, ✅ comparar com imagens.

---

### 🛠️ Prompt #01 — Padronizar Container Global (Edge Rhythm)

**Objetivo**
- Garantir que todas as seções Home/Portfolio usem o mesmo container e padding lateral conforme referência.

**Arquivos/Rotas envolvidas**
- `src/app/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/components/home/*`
- `src/components/portfolio/*`

**Ações**
1. Criar (ou padronizar) um wrapper de container: `max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]`.
2. Aplicar em todas as seções de Home e Portfolio sem alterar ordem.
3. Remover variações de `px-*` que causem “saltos” de alinhamento.

**Regras**
- ❌ Não alterar textos
- ❌ Não alterar ordem das seções
- ✅ Comparar com: `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Grid e margens iguais à referência
- [ ] Alinhamento duas laterais consistente
- [ ] Sem overflow horizontal (mobile)

---

### 🛠️ Prompt #02 — Header: Z-index fixo e não competir com Hero
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

✅ Nenhum ponto deve ser ignorado.


**Objetivo**
- Garantir que o header fique sempre acima da Hero e não “brigue” visualmente com o Ghost.

**Arquivos/Rotas envolvidas**
- `src/components/header/SiteHeader.tsx`
- `src/components/header/DesktopFluidHeader.tsx`
- `src/components/layout/Header.tsx`

**Ações**
1. Garantir `z-40` (ou equivalente) no wrapper do header.
2. Garantir que o efeito do header (WebGL) não invade visualmente a hero (intensidade moderada).
3. Validar stacking com `HomeHero` (ghost/copy/thumb).

**Regras**
- ❌ Não alterar layout
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Header não compromete legibilidade da Hero
- [ ] Posição e escala do header iguais à referência
- [ ] Sem conflito de z-index com thumb/ghost

---

### 🛠️ Prompt #03 — Header Mobile: Menu fullscreen staggered + A11y completo
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

✅ Nenhum ponto deve ser ignorado.
**Objetivo**
- Implementar/validar menu mobile com overlay fullscreen, stagger de itens e bloqueio de scroll do body.

**Arquivos/Rotas envolvidas**
- `src/components/header/MobileStaggeredMenu.tsx`
- `src/components/header/SiteHeader.tsx`

**Ações**
1. Implementar/confirmar estados `closed/opening/open/closing` (200–320ms).
2. Scroll lock do `body` ao abrir e liberar ao fechar.
3. Click-away fecha; ESC fecha.
4. `aria-expanded`, `aria-controls`, `aria-label` e foco visível.

**Regras**
- ✅ Mobile-first
- ✅ Comparar com: `docs/HOME-HERO-MOBILE.jpg` E `/docs/HEADER`

**Critérios de aceite (Checklist)**
- [ ] Sem scroll do body com menu aberto
- [ ] ESC/click-away fecham
- [ ] Navegação por teclado funciona
- [ ] Sem lag perceptível

---

### 🛠️ Prompt #04 — Hero: Stack de camadas (z-index) conforme spec
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

✅ Nenhum ponto deve ser ignorado.
**Objetivo**
- Garantir hierarquia z-index: z-50 preloader, z-30 thumb, z-20 ghost, z-10 copy, z-0 background.

**Arquivos/Rotas envolvidas**
- `src/components/home/HomeHero.tsx`
- `src/components/home/HeroPreloader.tsx`
- `src/components/home/GhostStage.tsx`
- `src/components/home/ManifestoThumb.tsx`
- `src/components/home/HeroCopy.tsx`

**Ações**
1. Ajustar wrappers e z-index para bater com a stack.
2. Garantir `pointer-events-none` no canvas.
3. Garantir legibilidade do copy e que o thumb sempre fica acima do ghost.

**Regras**
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Copy sempre legível
- [ ] Thumb sempre acima do Ghost
- [ ] Preloader acima de tudo

---

### 🛠️ Prompt #05 — Hero Desktop: Timeline 200vh + morph do manifesto por scroll/click
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

✅ Nenhum ponto deve ser ignorado.
**Objetivo**
- Garantir que a hero tenha `h-[200vh]` (ou equivalente) e o manifesto morph (scale/pos/borderRadius) conforme spec, sem CLS.

**Arquivos/Rotas envolvidas**
- `src/components/home/HomeHero.tsx`
- `src/components/home/ManifestoThumb.tsx`

**Ações**
1. Implementar `useScroll`/`useTransform` para scale/translate/borderRadius do container do vídeo.
2. Implementar ação de click desktop para “pular” para o estado final (scroll para final da timeline).
3. Em `prefers-reduced-motion`, desativar scrub (sem morph), mantendo thumb estática.

**Regras**
- ❌ Não inventar nova interação
- ✅ Comparar com: `docs/HERO_E_VIDEO_MANIFESTO.png`

**Critérios de aceite (Checklist)**
- [ ] Morph acontece suavemente com scroll no desktop
- [ ] Click desktop pula para estado final
- [ ] Reduced motion mantém layout sem scrub

---

### 🛠️ Prompt #06 — ManifestoThumb: Entrada premium editorial (whileInView)

**Objetivo**
- Implementar entrada premium (opacity/y/scale) e hover discreto (scale + arrow rotate), sem competir com Ghost.

**Arquivos/Rotas envolvidas**
- `src/components/home/ManifestoThumb.tsx`

**Ações**
1. Wrapper `motion.div` com `initial={{ opacity:0, y:18, scale:0.98 }}`.
2. `whileInView={{ opacity:1, y:0, scale:1 }}` com easing `[0.22,1,0.36,1]`, duration ~0.7s.
3. Hover: limitar `scale <= 1.05`; arrow `-45deg → 0deg`.
4. Reduced motion: remover transform (apenas visível).

**Regras**
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Entrada premium sutil
- [ ] Hover não causa reflow/CLS
- [ ] Reduced motion ok

---

### 🛠️ Prompt #07 — Manifesto Mobile: seção fullscreen após Hero
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Garantir que em mobile o manifesto seja uma seção independente, fullscreen, logo abaixo da Hero.

**Arquivos/Rotas envolvidas**
- `src/components/home/ManifestoSection.tsx`
- `src/components/home/HomeHero.tsx`

**Ações**
1. Render mobile-only (`md:hidden`).
2. Garantir `aspect-video w-full` e fundo `#06071f`.
3. `useInView` com `opacity/transform` apenas.
4. Tap alterna mute/unmute (se previsto) sem overlays extras.

**Regras**
- ✅ Comparar com: `docs/HOME-HERO-MOBILE.jpg`

**Critérios de aceite (Checklist)**
- [ ] Manifesto aparece logo após hero no mobile
- [ ] Sem overflow horizontal
- [ ] Sem overlay extra

---

### 🛠️ Prompt #08 — GhostCanvas: follow mouse somente desktop + reduced motion
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Garantir follow mouse apenas em desktop e reduzir intensidades em mobile e reduced motion.

**Arquivos/Rotas envolvidas**
- `src/components/home/webgl/GhostCanvas.tsx`
- `src/components/home/GhostStage.tsx`

**Ações**
1. Gate por breakpoint (ex.: `min-width:1024px`) para follow.
2. Mobile/tablet: target fixo, intensidades menores.
3. Reduced motion: desativar follow + reduzir bloom/decay.

**Regras**
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Follow só desktop
- [ ] Mobile sem jitter
- [ ] Reduced motion respeitado

---

### 🛠️ Prompt #09 — GhostCanvas: DPR/antialias/performance clamp
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Controlar DPR e custo do canvas para evitar queda de performance em mobile.

**Arquivos/Rotas envolvidas**
- `src/components/home/webgl/GhostCanvas.tsx`

**Ações**
1. Garantir `gl={{ antialias:false }}`.
2. `dpr={[1,2]}` e clamp menor em mobile (ou desativar canvas).
3. Evitar re-renderizações e limitar partículas se necessário.

**Regras**
- ✅ Comparar com: `docs/ghost.mp4` (sensação) + `docs/HERO-PORTFOLIO-GHOST.jpg` (visual)

**Critérios de aceite (Checklist)**
- [ ] Mobile performático
- [ ] Visual equivalente
- [ ] Scroll sem travar

---

### 🛠️ Prompt #10 — GhostStage: Fallback sem WebGL
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

**Objetivo**
- Se WebGL falhar, hero deve continuar funcional com layout idêntico (gradiente + texto + manifesto).

**Arquivos/Rotas envolvidas**
- `src/components/home/GhostStage.tsx`
- `src/components/home/HomeHero.tsx`

**Ações**
1. `dynamic import` client-only + fallback gradiente radial.
2. Garantir que canvas nunca controla layout.
3. Garantir que copy/thumb permanecem no lugar.

**Regras**
- ✅ Comparar com: `docs/HERO.png` (fundo) + `docs/HERO-PORTFOLIO-GHOST.jpg` (layout)

**Critérios de aceite (Checklist)**
- [ ] Hero não quebra sem WebGL
- [ ] Layout pixel-match mantido

---

### 🛠️ Prompt #11 — PortfolioShowcase: alinhamento alternado das stripes (desktop)
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Garantir alternância end/center/start das stripes em desktop conforme referência.

**Arquivos/Rotas envolvidas**
- `src/components/home/PortfolioShowcase.tsx`
- `src/components/home/CategoryStripe.tsx`

**Ações**
1. Aplicar classes `md:justify-end`, `md:justify-center`, `md:justify-start` por stripe.
2. Conferir bordas/linhas azuis e espaçamentos.
3. Mobile: stripes sempre `w-full` e sem alinhamento alternado.

**Regras**
- ✅ Comparar com: `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Alternância correta em desktop
- [ ] Mobile sem overflow
- [ ] Visual idêntico

---

### 🛠️ Prompt #12 — PortfolioShowcase: thumbnail reveal apenas desktop (sem layout shift)
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Reveal do thumbnail apenas desktop, com animação premium e sem empurrar layout.

**Arquivos/Rotas envolvidas**
- `src/components/home/portfolio-showcase/category-stripe/CategoryThumbnail.tsx`
- `src/components/home/CategoryStripe.tsx`

**Ações**
1. `hidden md:block` para thumbnail.
2. Animação de reveal com easing premium (700ms cubic-bezier), sem causar CLS.
3. Reduced motion: thumbnail visível sem animação.

**Regras**
- ✅ Comparar com: `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`

**Critérios de aceite (Checklist)**
- [ ] Hover suave
- [ ] Sem layout shift
- [ ] Mobile sem hover/reveal

---

### 🛠️ Prompt #13 — FeaturedProjects: bento grid (spans + alturas) conforme referência

**Objetivo**
- Ajustar bento para (5/12+7/12), (full), (8/12+4/12 CTA) e alturas estáveis.

**Arquivos/Rotas envolvidas**
- `src/components/home/FeaturedProjects.tsx`
- `src/components/home/ProjectCard.tsx`

**Ações**
1. Garantir `md:grid-cols-12`.
2. Ajustar col-spans e alturas fixas por card no desktop.
3. Mobile: empilhar corretamente sem gaps errados.

**Regras**
- ✅ Comparar com: `docs/PROTFOLIO_CARDS.png`

**Critérios de aceite (Checklist)**
- [ ] Proporções idênticas
- [ ] Sem CLS ao carregar mídia
- [ ] Mobile sem overflow

---

### 🛠️ Prompt #14 — FeaturedProjects: hover editorial (seta + mídia) + reduced motion
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

**Objetivo**
- Garantir microinterações premium e leves (seta +20px, mídia scale 1.03, -1px), respeitando reduced motion.

**Arquivos/Rotas envolvidas**
- `src/components/home/ProjectCard.tsx`

**Ações**
1. Ajustar `transition` para duration 500–700ms com ease premium.
2. Animar apenas `transform`/`opacity`.
3. Reduced motion: remover hover animado.

**Regras**
- ✅ Comparar com: `docs/FeaturedProjects.mp4`

**Critérios de aceite (Checklist)**
- [ ] Hover sutil (premium)
- [ ] Sem reflow/jank
- [ ] Reduced motion ok

---

### 🛠️ Prompt #15 — Clients: faixa azul + logos monocromáticos + reveal
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

**Objetivo**
- Garantir faixa azul institucional e logos monocromáticos claros, com grid consistente e a11y.

**Arquivos/Rotas envolvidas**
- `src/components/home/Clients.tsx`

**Ações**
1. Garantir `bg-[#0057FF]` (ou token equivalente).
2. Aplicar `filter brightness-0 invert` nos logos.
3. Grid responsivo com `py-12` e `gap-4`.
4. `alt` descritivo e `focus-visible:ring`.

**Regras**
- ✅ Comparar com: `docs/BRANDS.png`

**Critérios de aceite (Checklist)**
- [ ] Visual idêntico
- [ ] A11y ok
- [ ] Mobile sem overflow

---

### 🛠️ Prompt #16 — Contact: 2 colunas desktop + labels + focus rings

 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST


**Objetivo**
- Garantir layout 2 colunas no desktop e form acessível.

**Arquivos/Rotas envolvidas**
- `src/components/home/Contact.tsx`
- `src/components/home/contact/*`

**Ações**
1. Layout: `grid-cols-1 md:grid-cols-2` e gaps conforme referência.
2. Inputs: `label htmlFor` + `id/name` em todos campos.
3. Focus: `focus-visible:ring-2 ring-[#0057FF] ring-offset-2 ring-offset-[#f5f5f7]`.
4. Confirmar form action.

**Regras**
- ✅ Comparar com: `docs/CONTACT.png`

**Critérios de aceite (Checklist)**
- [ ] Desktop 2 colunas
- [ ] Mobile 1 coluna
- [ ] Sem overflow
- [ ] A11y OK

---

### 🛠️ Prompt #17 — Footer: fixo só no desktop, nunca no mobile
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST

**Objetivo**
- Garantir footer fixo apenas desktop e no fluxo no mobile.

**Arquivos/Rotas envolvidas**
- `src/components/layout/Footer.tsx`

**Ações**
1. Aplicar `fixed bottom-0` apenas no breakpoint desktop (`lg:`).
2. Mobile: remover fixed e garantir `py-10`.
3. Garantir que não sobrepõe o Contact.

**Regras**
- ✅ Comparar com: `docs/FOOTER.png`

**Critérios de aceite (Checklist)**
- [ ] Desktop fixo
- [ ] Mobile no fluxo
- [ ] Sem sobreposição

---

### 🛠️ Prompt #18 — Footer: unificar copyright e link “sobre”
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Unificar ano para `© 2025...` e garantir que “sobre” aponte para `/sobre` (sem mudar label).

**Arquivos/Rotas envolvidas**
- `src/components/layout/Footer.tsx`

**Ações**
1. Ajustar apenas o ano.
2. Alterar href de “sobre” para `/sobre`.
3. Conferir anchors: `#hero`, `#portfolio-showcase`, `#contact`.

**Regras**
- ❌ Não alterar labels
- ✅ Comparar com: `docs/FOOTER.png`

**Critérios de aceite (Checklist)**
- [ ] Ano consistente
- [ ] Rotas corretas
- [ ] Visual idêntico

---

### 🛠️ Prompt #19 — Portfolio Page: container/padding idênticos à Home
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER
2. /docs/REFERENCIA_HERO-GHOST
**Objetivo**
- Garantir que `/portfolio` use o mesmo edge rhythm e não tenha overflow/CLS.

**Arquivos/Rotas envolvidas**
- `src/app/portfolio/page.tsx`
- `src/components/portfolio/PortfolioHero.tsx`
- `src/components/portfolio/PortfolioMosaicGrid.tsx`
- `src/components/portfolio/MosaicCard.tsx`

**Ações**
1. Aplicar container padrão (mesmo da Home).
2. Garantir dimensões estáveis para cards de mídia.
3. Reduced motion: desativar microinterações não essenciais.

**Regras**
- ✅ Comparar com: `docs/PROTFOLIO_COMPLETO.png`

**Critérios de aceite (Checklist)**
- [ ] Margens iguais às da Home
- [ ] Mobile sem overflow
- [ ] Sem CLS

---
