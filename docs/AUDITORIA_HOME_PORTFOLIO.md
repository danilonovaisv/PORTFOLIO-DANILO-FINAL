
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




## 🎯 Seção: Hero (HomeHero)

- 📌 Fidelidade visual (referência): ✗ — `docs/HERO-PORTFOLIO-GHOST.jpg`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos:  
  `src/components/home/HomeHero.tsx` → `HeroPreloader.tsx` + `HeroCopy.tsx` + `ManifestoThumb.tsx` + `GhostStage.tsx` → `src/components/home/webgl/GhostCanvas.tsx` (+ `Ghost.tsx`, `Eyes.tsx`, `Particles.tsx`, `Fireflies.tsx`, `AtmosphereVeil.tsx`, `postprocessing/*`)
- 🔗 Integrações: `Home page → HomeHero → GhostStage → GhostCanvas`

### ❌ Problema (objetivo, mensurável)
1) CTA do hero: no screenshot é **button pill azul** (não link simples).  
2) Thumb manifesto: precisa ter **entrada premium** e hover refinado (não competir com ghost).  
3) Stack de camadas precisa respeitar:
   - z-50 preloader
   - z-30 manifesto thumb
   - z-20 ghost canvas
   - z-10 texto editorial
4) Ghost follow mouse deve ser **desktop-only**.
5) `prefers-reduced-motion` deve reduzir/zerar follow e efeitos.

### 🔧 Correção Técnica (ação exata)
- HeroCopy:
  - garantir CTA como pill button com círculo/ícone à direita (como no screenshot)
- ManifestoThumb:
  - entrada (opacity + y + scale leve)
  - hover (scale 1.03~1.05 + arrow rotate -45→0)
  - reduced motion: apenas fade simples
- GhostCanvas:
  - DPR clamp, antialias false, postprocessing condicional

### ✅ Resultado esperado (comparável)
- Visual e ritmo idênticos ao `docs/HERO-PORTFOLIO-GHOST.jpg`.

---

## 🎯 Seção: Portfolio Showcase (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: `src/components/home/PortfolioShowcase.tsx` + `CategoryStripe.tsx`
- 🔗 Integrações: `Home page → PortfolioShowcase → CategoryStripe`

### ❌ Problema (objetivo, mensurável)
1) Alternância de alinhamento precisa ser exatamente:
   - linha 1: direita
   - linha 2: centro
   - linha 3: esquerda
2) Títulos precisam respeitar que “Web Campaigns, Websites & Tech” quebra em múltiplas linhas (sem overflow).
3) Dot azul no final da linha deve existir e ficar na posição correta.
4) Hover reveal no desktop não pode gerar CLS.

### 🔧 Correção Técnica (ação exata)
- Garantir classes de layout por stripe com alignment alternado no `md+`.
- Garantir que a terceira categoria suporte quebra e mantenha o dot alinhado.
- Hover: reservar espaço do thumbnail (ou usar overlay interno sem alterar width do layout).

### ✅ Resultado esperado (comparável)
- Showcase idêntico ao `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`.

---

## 🎯 Seção: Featured Projects (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/PROTFOLIO_CARDS.png`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: `src/components/home/FeaturedProjects.tsx` + `ProjectCard.tsx`
- 🔗 Integrações: `Home page → FeaturedProjects → ProjectCard`

### ❌ Problema (objetivo, mensurável)
- Proporções do bento grid devem bater com a referência (5/7, 12, 8/4) e sem CLS em mídia.

### 🔧 Correção Técnica (ação exata)
- Ajustar grid do desktop para col-spans exatos e fixar alturas de cards conforme spec.
- Garantir que o card CTA (“Like what you see?”) tenha o mesmo estilo da referência.

### ✅ Resultado esperado (comparável)
- Bento idêntico ao `docs/PROTFOLIO_CARDS.png`.

---

## 🎯 Seção: Clients / Brands (Home)

- 📌 Fidelidade visual (referência): ✓ — `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
- 📐 Grid e margens laterais: ✓
- ↔️ Alinhamento duas laterais: ✓
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: ✗
- 🧩 Componentes envolvidos: `src/components/home/Clients.tsx`
- 🔗 Integrações: `Home page → Clients`

### ❌ Problema (objetivo, mensurável)
- Logos precisam de contraste consistente (monocromático claro) e stagger de entrada (sutil).

### 🔧 Correção Técnica (ação exata)
- Aplicar `filter brightness-0 invert` quando necessário.
- whileInView com stagger leve e reduced motion fallback.

### ✅ Resultado esperado (comparável)
- Faixa azul idêntica ao layout esperado.

---

## 🎯 Seção: Contact (Home)

- 📌 Fidelidade visual (referência): ✓ — `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: 🟡
- 🧩 Componentes envolvidos: `src/components/home/Contact.tsx`
- 🔗 Integrações: `Home page → Contact`

### ❌ Problema (objetivo, mensurável)
- Edge rhythm pode quebrar no contact (margens e colunas).
- A11y: inputs sem label associado.

### 🔧 Correção Técnica (ação exata)
- Padronizar container/gutters iguais à home.
- Garantir `label + htmlFor` em todos inputs.

### ✅ Resultado esperado (comparável)
- Contact alinhado ao grid global como na referência.

---

## 🎯 Seção: Footer (Home)

- 📌 Fidelidade visual (referência): ✗ — `docs/FOOTER.png`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: 🟡
- 🧩 Componentes envolvidos: `src/components/layout/Footer.tsx`
- 🔗 Integrações: `Layout → Footer`

### ❌ Problema (objetivo, mensurável)
- Footer deve ser fixo **somente no desktop**; no mobile deve ficar no fluxo.
- Link “sobre” deve ir para `/sobre` (não para âncora errada).

### 🔧 Correção Técnica (ação exata)
- Condicionar `fixed` apenas em `lg+`.
- Ajustar rotas/âncoras conforme spec.

### ✅ Resultado esperado (comparável)
- Desktop: barra fixa.
- Mobile: footer no fluxo.

---

## 🎯 Seção: Portfolio Page (rota /portfolio)

- 📌 Fidelidade visual (referência): ✗ — `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✗
- 🎞️ Motion/Animações: 🟡
- 🧩 Componentes envolvidos:  
  `src/app/portfolio/page.tsx` → `src/components/portfolio/PortfolioHero.tsx` + `PortfolioMosaicGrid.tsx` + `MosaicCard.tsx`
- 🔗 Integrações: `Portfolio route → PortfolioHero + MosaicGrid`

### ❌ Problema (objetivo, mensurável)
- Mosaic grid costuma quebrar gutters e proporções vs referência.

### 🔧 Correção Técnica (ação exata)
- Padronizar container igual à Home.
- Ajustar mosaic para bater com `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`.
- Reservar tamanho de mídia para CLS zero.

### ✅ Resultado esperado (comparável)
- /portfolio idêntica à referência.

---

# 4️⃣ Lista de Problemas (com severidade)

## 🔴 Alta
1) Container/gutters inconsistentes entre seções (edge rhythm).
2) Header mobile iniciando WebGL (deve ser DOM overlay).
3) Nav labels/case e active state divergindo do screenshot (home destacado).
4) CTA do hero divergindo (deve ser pill button).
5) Ghost follow mouse e postprocessing sem gating (desktop-only + reduced motion).
6) Z-index stack da hero (preloader/thumb/canvas/text) inconsistente.
7) Portfolio showcase alternância + dot + quebra de linha da 3ª categoria.

## 🟡 Média
8) Menu mobile A11y (ESC/click outside/focus trap).
9) Hover reveal causando CLS em stripes/cards.
10) Contact sem labels e foco inconsistente.

## 🟢 Baixa
11) Micro ajustes de easing/duration (hover underline, arrow rotation timing).

---

# 5️⃣ Recomendações Prioritárias (ordem de execução)

1) **Sistema de container/gutters** (impacta tudo).
2) **Header mobile (overlay + a11y + scroll lock + sem WebGL)**.
3) **Hero layering + manifesto thumb motion + reduced motion**.
4) **Ghost Canvas gating/perf**.
5) **Portfolio showcase (alternância, dot, sem CLS)**.
6) **Footer fixed desktop-only**.
7) **Portfolio page mosaic grid**.

---

# FASE 2 — 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR (atômicos e executáveis)

> Regras globais:
> - ❌ Não alterar textos (conteúdo), apenas estilo/comportamento
> - ❌ Não inventar layout/efeitos
> - ✅ Tailwind + App Router
> - ✅ Mobile-first
> - ✅ Comparar com imagens em `docs/*`

---

### 🛠️ Prompt #01 — Padronizar container/gutters (edge rhythm global)

**Objetivo**
- Garantir mesma coluna útil e mesmos gutters em Header/Hero/Seções (pixel-match com `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`).

**Arquivos/Rotas envolvidas**
- `src/app/page.tsx`
- `src/components/layout/Header.tsx`
- `src/components/home/*` (wrappers das seções)
- `src/components/layout/Footer.tsx`

**Ações**
1. Identificar wrappers e classes atuais por seção (ex.: `px-4`, `container`, `max-w-*`).
2. Criar um padrão único (ex.: `max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]`).
3. Aplicar exatamente o mesmo padrão em todas as seções + header/footer.

**Regras**
- ❌ Não mudar ordem das seções
- ✅ Comparar com: `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`

**Critérios de aceite**
- [ ] Margens laterais idênticas entre todas as seções
- [ ] Sem “saltos” de coluna útil
- [ ] Sem overflow-x no mobile

---

### 🛠️ Prompt #02 — Header: labels minúsculos + active state no “home”

**Objetivo**
- Fazer o header bater com o screenshot: labels minúsculos e item `home` ativo (azul/underline) na rota `/`.

**Arquivos/Rotas envolvidas**
- `src/components/header/SiteHeader.tsx`
- `src/components/header/DesktopFluidHeader.tsx`

**Ações**
1. Ajustar labels exatamente: `home`, `sobre`, `portfolio showcase`, `contato`.
2. Implementar active state baseado em `usePathname()` (Next) e/ou hash atual.
3. Garantir underline/estilo ativo idêntico à referência.

**Regras**
- ❌ Não criar novos itens
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite**
- [ ] Labels e casing idênticos ao screenshot
- [ ] `home` aparece ativo na Home
- [ ] A11y: foco visível nos links

---

### 🛠️ Prompt #03 — Header mobile: overlay fullscreen stagger (sem WebGL)

**Objetivo**
- Em `<=1023px`, renderizar apenas overlay DOM com stagger e scroll lock; não iniciar WebGL do header.

**Arquivos/Rotas envolvidas**
- `src/components/header/SiteHeader.tsx`
- `src/components/header/MobileStaggeredMenu.tsx`
- `src/components/header/webgl/FluidGlass.tsx`

**Ações**
1. Desativar render do `FluidGlass` no mobile/tablet.
2. Implementar overlay fullscreen:
   - overlay fade 200–250ms
   - painel slide 260–320ms (spring leve)
   - itens: stagger (opacity 0→1, y 16→0)
3. Implementar scroll lock do body.
4. Implementar fechar: botão, click outside, ESC.

**Regras**
- ✅ Comparar com: `docs/HEADER/HEADER-MOBILE.mov`

**Critérios de aceite**
- [ ] Mobile sem Canvas do header
- [ ] Scroll lock OK
- [ ] ESC/click outside OK
- [ ] Sem lag perceptível

---

### 🛠️ Prompt #04 — Hero: CTA como pill button (igual screenshot)

**Objetivo**
- Trocar/ajustar o CTA do hero para o formato pill button azul com ícone/círculo à direita, igual referência.

**Arquivos/Rotas envolvidas**
- `src/components/home/HeroCopy.tsx`

**Ações**
1. Ajustar markup do CTA para button/link com:
   - container pill (rounded-full)
   - background azul
   - ícone em círculo à direita
2. Garantir alinhamento e tamanho conforme screenshot (center).
3. Garantir hover sutil e `prefers-reduced-motion` sem transform exagerado.

**Regras**
- ❌ Não alterar texto do CTA
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite**
- [ ] CTA visual idêntico ao screenshot
- [ ] Sem CLS
- [ ] A11y: foco visível

---

### 🛠️ Prompt #05 — Hero: stack z-index + pointer-events

**Objetivo**
- Garantir o stack final: z-50 preloader, z-30 manifesto, z-20 ghost, z-10 texto, z-0 background.

**Arquivos/Rotas envolvidas**
- `src/components/home/HomeHero.tsx`
- `src/components/home/HeroPreloader.tsx`
- `src/components/home/GhostStage.tsx`
- `src/components/home/ManifestoThumb.tsx`

**Ações**
1. Auditar e corrigir z-index real.
2. Garantir Canvas com `pointer-events-none` (não bloquear cliques do CTA/Thumb).
3. Garantir preloader removível e sem bloquear após terminar.

**Regras**
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite**
- [ ] Camadas corretas
- [ ] CTA e Thumb clicáveis
- [ ] Sem conflitos de clique

---

### 🛠️ Prompt #06 — ManifestoThumb: entrada premium + hover sutil (Lo&Behold)

**Objetivo**
- Implementar reveal editorial no manifesto thumb (fade/y/scale leve) e hover premium (scale + arrow rotate), sem competir com ghost.

**Arquivos/Rotas envolvidas**
- `src/components/home/ManifestoThumb.tsx`

**Ações**
1. Entrada:
   - opacity 0→1
   - y 12→0
   - scale 0.98→1
   - easing `[0.22,1,0.36,1]`
2. Hover desktop:
   - scale 1→1.03/1.05
   - arrow rotate -45→0 (500ms)
3. Reduced motion:
   - remover scale/y; manter fade simples.

**Regras**
- ✅ Comparar com: `docs/HERO_E_VIDEO_MANIFESTO.png` + `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite**
- [ ] Motion premium e sutil
- [ ] Reduced motion respeitado
- [ ] Thumb no canto correto

---

### 🛠️ Prompt #07 — GhostCanvas: follow desktop-only + reduced motion + DPR clamp

**Objetivo**
- Follow mouse só no desktop; no mobile e reduced motion, reduzir efeitos e garantir performance.

**Arquivos/Rotas envolvidas**
- `src/components/home/webgl/GhostCanvas.tsx`
- `src/components/home/webgl/postprocessing/*`

**Ações**
1. Implementar gating por viewport e reduced motion.
2. DPR clamp (`[1,2]`) e `antialias:false`.
3. Postprocessing pesado apenas desktop e motion normal.

**Regras**
- ✅ Comparar com: `docs/HERO-PORTFOLIO-GHOST.jpg`

**Critérios de aceite**
- [ ] Desktop segue cursor suavemente
- [ ] Mobile não segue cursor
- [ ] Reduced motion sem jitter/bloom forte

---

### 🛠️ Prompt #08 — Portfolio Showcase: alternância + dot + quebra de linha

**Objetivo**
- Reproduzir alternância (end/center/start), dot azul e quebra correta da 3ª categoria, sem overflow.

**Arquivos/Rotas envolvidas**
- `src/components/home/PortfolioShowcase.tsx`
- `src/components/home/CategoryStripe.tsx`

**Ações**
1. Alternar alignment por item no desktop.
2. Garantir dot azul posicionado como na referência.
3. Garantir multiline “Web Campaigns, Websites & Tech” sem quebrar layout.
4. Hover reveal sem CLS.

**Regras**
- ✅ Comparar com: `docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`

**Critérios de aceite**
- [ ] Alternância correta
- [ ] Dot correto
- [ ] Sem overflow mobile

---

### 🛠️ Prompt #09 — Featured Projects: bento grid (5/7, 12, 8/4)

**Objetivo**
- Ajustar o grid para bater com `PROTFOLIO_CARDS.png`.

**Arquivos/Rotas envolvidas**
- `src/components/home/FeaturedProjects.tsx`
- `src/components/home/ProjectCard.tsx`

**Ações**
1. Desktop: col-spans e alturas conforme spec.
2. Mobile: empilhar e CTA por último.
3. Garantir mídia com reserva de dimensão (CLS zero).

**Regras**
- ✅ Comparar com: `docs/PROTFOLIO_CARDS.png`

**Critérios de aceite**
- [ ] Grid idêntico ao spec
- [ ] Sem CLS

---

### 🛠️ Prompt #10 — Footer: fixo somente no desktop; “sobre” aponta para /sobre

**Objetivo**
- Garantir footer fixo no desktop e no fluxo no mobile, e links corretos.

**Arquivos/Rotas envolvidas**
- `src/components/layout/Footer.tsx`

**Ações**
1. Aplicar `fixed bottom-0` apenas em `lg+`.
2. Ajustar link “sobre” para `/sobre`.
3. Garantir touch target e foco visível.

**Regras**
- ✅ Comparar com: `docs/FOOTER.png`

**Critérios de aceite**
- [ ] Desktop fixo, mobile no fluxo
- [ ] Links corretos

---

### 🛠️ Prompt #11 — /portfolio: mosaic grid fiel à referência

**Objetivo**
- Reproduzir layout e gutters da página `/portfolio` conforme `PORTFOLIO-PAGE-LAYOUYT.jpg`.

**Arquivos/Rotas envolvidas**
- `src/app/portfolio/page.tsx`
- `src/components/portfolio/PortfolioHero.tsx`
- `src/components/portfolio/PortfolioMosaicGrid.tsx`
- `src/components/portfolio/MosaicCard.tsx`

**Ações**
1. Unificar container/gutters com Home.
2. Ajustar mosaic grid (colunas/gaps/proporções).
3. Reservar dimensões de mídia.

**Regras**
- ✅ Comparar com: `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`

**Critérios de aceite**
- [ ] Mosaic idêntico à referência
- [ ] Sem CLS/overflow

---

## QA mínimo (antes de dar “done”)
- Lighthouse mobile: LCP/CLS e memória.
- Testar `prefers-reduced-motion`.
- Testar menu mobile: scroll lock + ESC + click outside + tab order.
- Testar iOS Safari (playsInline + autoplay muted).

---
