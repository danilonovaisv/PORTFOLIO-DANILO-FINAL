# Auditoria — Portfólio Danilo (Ghost Design System)

> **Escopo desta versão:** Consolidação em formato .md seguindo o template solicitado, com foco nas seções: **Home Hero, Manifesto, Featured Projects, About (Origin/Method/What I Do) e Portfolio Grid**.  
> **Regra:** não propõe novas seções e não altera conteúdo textual; apenas correções de layout/comportamento para alinhar com as **referências canônicas (imagens/CodePen/specs do projeto)**.

---

## 🧾 FORMATO DA RESPOSTA (OBRIGATÓRIO)

### 1️⃣ Visão Geral

#### Página 1 — Home `/`

- **Estado técnico geral:** Estrutura baseada em App Router com composição por componentes (`src/components/home/*`) e presença de elementos “hero” com potencial custo (vídeo/efeitos/possível 3D).
- **Risco principal:** LCP/CLS e acessibilidade de motion (necessidade de degradação em `prefers-reduced-motion`), além de consistência de gutters/edge-to-edge entre seções.
- **Ponto crítico do Ghost:** hero e manifesto precisam manter **hierarquia tipográfica** e **estabilidade visual** (sem “saltos” ao carregar mídia).

#### Página 2 — Sobre `/sobre`

- **Estado técnico geral:** Estrutura modular (Origin/What I Do/Sections) em `src/components/sobre/*`.
- **Risco principal:** **cards/itens de conteúdo em colunas** sem altura padronizada por linha e possíveis inconsistências de espaçamento lateral vs. outras páginas.
- **Ponto crítico do Ghost:** leitura fluida, sem animações agressivas, foco em semântica e ritmo editorial.

#### Página 3 — Portfólio `/portfolio`

- **Estado técnico geral:** Página com client-side interactions (`src/app/portfolio/PortfolioClient.tsx`) + grid e cards em `src/components/portfolio/*` com modal.
- **Risco principal:** **Portfolio Grid** é o ponto mais sensível: precisa preencher 100% horizontal (sem “buracos”) e **todos os cards na mesma linha precisam ter sempre a mesma altura vertical**. Além disso, o **modal precisa ser acessível** (ESC + trap de foco + retorno de foco).
- **Ponto crítico do Ghost:** consistência de grid/gutters e comportamento de abertura (modal vs. navegação) previsível e sem fricção.

---

### 2️⃣ Diagnóstico por Seção

> Template usado por item:
>
> - **Inconsistência:** (o que foge da referência Ghost)
> - **Evidência objetiva:** (onde/como aparece; risco técnico)
> - **Impacto:** (UX/A11y/Perf/SEO)
> - **Correção prática (sem mudar texto/layout):** (o que ajustar)
> - **Arquivos prováveis:** `src/...`

#### A) Home Hero

1. **Inconsistência:** Animação/efeito do hero pode permanecer ativo em todos os dispositivos, sem degradação clara para `prefers-reduced-motion`.

- **Evidência objetiva:** presença de hook/anim (`useHeroAnimation.ts`) e estrutura hero em `HomeHero.tsx`.
- **Impacto:** Acessibilidade (WCAG), fadiga visual, potencial impacto em performance.
- **Correção prática (sem mudar texto/layout):** implementar fallback “motion off” (apenas layout estático) quando `prefers-reduced-motion: reduce`.
- **Arquivos prováveis:**
  - `src/components/home/hero/HomeHero.tsx`
  - `src/components/home/hero/useHeroAnimation.ts`
  - `src/components/layout/SmoothScroll.tsx`

2. **Inconsistência:** Mídia do topo (vídeo/3D/efeito) pode afetar LCP/CLS se não houver reserva de espaço e estratégia de carregamento.

- **Evidência objetiva:** hero com assets/efeitos (`GhostAura.tsx`, `GhostStage.module.css`, `VideoManifesto.tsx`).
- **Impacto:** Performance (LCP, CLS) e percepção de fluidez.
- **Correção prática:** reservar altura do hero, evitar reflow tardio, priorizar apenas o essencial (sem bloquear texto).
- **Arquivos prováveis:**
  - `src/components/home/hero/*`
  - `src/app/page.tsx`

#### B) Manifesto

1. **Inconsistência:** Vídeo manifesto pode iniciar/carregar de forma pesada e competir com conteúdo (texto) por prioridade.

- **Evidência objetiva:** componente dedicado `VideoManifesto.tsx`.
- **Impacto:** LCP/TTI e consumo de dados no mobile.
- **Correção prática:** `preload="metadata"` (quando aplicável), poster estável, lazy/defer do vídeo fora da dobra, e desativação em reduced motion se houver motion/parallax acoplado.
- **Arquivos prováveis:**
  - `src/components/home/hero/VideoManifesto.tsx`
  - `src/app/page.tsx`

2. **Inconsistência:** Motion do manifesto pode usar efeitos acima do permitido (evitar scale/bounce/rotate em conteúdo).

- **Evidência objetiva:** manifesto costuma vir com motion no stack (Framer Motion + Lenis).
- **Impacto:** Qualidade editorial e conforto de leitura.
- **Correção prática:** limitar animações a `opacity`, `blur`, `translateY (<=18px)` e respeitar `prefers-reduced-motion`.
- **Arquivos prováveis:**
  - `src/components/home/hero/VideoManifesto.tsx`
  - `src/components/layout/SmoothScroll.tsx`

#### C) Featured Projects

1. **Inconsistência:** Cards de projetos em destaque podem não ter **altura consistente por linha** (principalmente com textos/tags diferentes).

- **Evidência objetiva:** cards em `FeaturedProjectCard.tsx` e seção em `FeaturedProjectsSection.tsx`.
- **Impacto:** quebra do “Ghost grid rhythm” + percepção de desalinhamento e “layout instável”.
- **Correção prática:** forçar `align-stretch` + altura padronizada do container do card; garantir que mídia e corpo do card usem `flex` com áreas previsíveis.
- **Arquivos prováveis:**
  - `src/components/home/featured-projects/FeaturedProjectCard.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`

2. **Inconsistência:** Preenchimento horizontal pode sobrar com gaps quando cards possuem larguras variáveis sem regra de “fill”.

- **Impacto:** grid não ocupa 100% e cria “buracos”.
- **Correção prática:** padronizar estratégia (CSS Grid responsivo) com colunas e `minmax`, ou flex com `flex-grow` controlado e `basis` coerente — sem alterar a ordem dos itens.
- **Arquivos prováveis:**
  - `src/components/home/featured-projects/*`

#### D) About (Origin / Method / What I Do)

1. **Inconsistência:** Seções de cards/conteúdo podem alternar gutters/margens laterais (saltos entre blocos) em comparação com Home/Portfólio.

- **Evidência objetiva:** múltiplas pastas/componentes (`origin`, `sections`, `what-i-do`), maior chance de containers diferentes.
- **Impacto:** inconsistência visual do sistema Ghost.
- **Correção prática:** unificar wrapper/Container e tokens de spacing (sem mudar texto e sem criar seção nova).
- **Arquivos prováveis:**
  - `src/app/sobre/page.tsx`
  - `src/components/sobre/origin/*`
  - `src/components/sobre/sections/*`
  - `src/components/sobre/what-i-do/*`
  - `src/components/layout/Container.tsx`

2. **Inconsistência:** Itens em grid podem ter alturas diferentes por linha (violando o padrão de cards alinhados).

- **Impacto:** ruído visual e perda de “ritmo editorial”.
- **Correção prática:** mesma estratégia do portfólio: `items-stretch` + card com `h-full` e distribuição interna por `flex`.
- **Arquivos prováveis:**
  - `src/components/sobre/*` (cards/tiles)

#### E) Portfolio Grid

1. **Inconsistência (Regra Absoluta):** Cards não garantem **mesma altura vertical por linha**, e/ou o layout não preenche 100% horizontal sem vazios.

- **Evidência objetiva:** grid centralizado em `ProjectsGallery.tsx` + CSS module `ProjectsGallery.module.css` + card `ProjectCard.tsx`.
- **Impacto:** quebra direta da especificação do portfólio Ghost.
- **Correção prática (sem reinventar layout):**
  - Definir layout base (grid/flex) com regra explícita de altura uniforme por linha.
  - Garantir que o card use `h-full` + `flex flex-col` + área de mídia com ratio fixo e corpo com `flex-1`.
  - Ajustar “fill width” (sem buracos) com `grid-template-columns: repeat(auto-fit, minmax(...))` ou flex + `flex-grow`.
- **Arquivos prováveis:**
  - `src/components/portfolio/ProjectsGallery.tsx`
  - `src/components/portfolio/ProjectsGallery.module.css`
  - `src/components/portfolio/ProjectCard.tsx`
  - `src/app/portfolio/PortfolioClient.tsx`

2. **Inconsistência:** Modal de portfólio pode não cumprir requisitos de acessibilidade (Esc, trap de foco, retorno de foco).

- **Evidência objetiva:** existe modal `PortfolioModal.tsx` (há indícios de handling de Escape, mas não há sinais de `role="dialog"`, `aria-modal` e foco gerenciado).
- **Impacto:** falha de acessibilidade (teclado/leitor de tela) e fricção no fluxo crítico.
- **Correção prática:** implementar foco inicial, trap, `aria-*`, `Esc`, click outside coerente, lock scroll e restore focus.
- **Arquivos prováveis:**
  - `src/components/portfolio/PortfolioModal.tsx`
  - `src/components/portfolio/ImageLightbox.tsx`
  - `src/components/portfolio/ProjectCard.tsx`

3. **Inconsistência:** Fluxo crítico “card abre modal quando não há landing” vs “card navega quando há landing” precisa ser determinístico e testável.

- **Impacto:** confiança funcional e previsibilidade.
- **Correção prática:** centralizar regra de decisão (um único ponto) e adicionar cobertura E2E.
- **Arquivos prováveis:**
  - `src/app/portfolio/PortfolioClient.tsx`
  - `src/components/portfolio/ProjectCard.tsx`

---

### 3️⃣ Lista de Problemas (Severidade 🔴🟡🟢)

#### 🔴 Crítico

1. **Portfolio Grid não garante mesma altura por linha + fill 100% horizontal (sem vazios).**  
   Arquivos: `src/components/portfolio/ProjectsGallery.tsx`, `src/components/portfolio/ProjectsGallery.module.css`, `src/components/portfolio/ProjectCard.tsx`

2. **Modal/Lightbox sem acessibilidade completa (trap de foco + retorno de foco + ARIA).**  
   Arquivos: `src/components/portfolio/PortfolioModal.tsx`, `src/components/portfolio/ImageLightbox.tsx`

3. **Reduced motion não garantido globalmente (Lenis/hero/efeitos).**  
   Arquivos: `src/components/layout/SmoothScroll.tsx`, `src/components/home/hero/useHeroAnimation.ts`, `src/components/home/hero/HomeHero.tsx`

#### 🟡 Médio

4. **Featured Projects com risco de cards desalinhados e alturas inconsistentes por linha.**  
   Arquivos: `src/components/home/featured-projects/*`

5. **About (Origin/Method/What I Do) com risco de inconsistência de container/gutters e cards sem `h-full`.**  
   Arquivos: `src/components/sobre/*`, `src/components/layout/Container.tsx`

6. **Hero/Manifesto com risco de impacto em LCP/CLS (mídia/efeitos sem estratégia de reserva/prioridade).**  
   Arquivos: `src/components/home/hero/*`, `src/app/page.tsx`

#### 🟢 Baixo

7. **Padronização fina de semântica/landmarks e hierarquia de headings (garantir 1x h1 por página).**  
   Arquivos: `src/app/page.tsx`, `src/app/sobre/page.tsx`, `src/app/portfolio/page.tsx` e componentes de cada rota.

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **Regras globais para todos os prompts abaixo**
>
> - **NÃO** alterar conteúdo textual (copy).
> - **NÃO** reinventar layout nem criar novas seções.
> - **Comparar fielmente** com as referências canônicas do projeto (imagens/CodePen/specs já existentes no repositório).
> - **Cards por linha sempre com a mesma altura vertical.**
> - Tailwind (mobile-first), Framer Motion sutil, e `prefers-reduced-motion` respeitado.

---

> **### 🛠️ Prompt #01 — Portfolio Grid: altura uniforme por linha + fill 100% horizontal**
> **Objetivo:** Corrigir o grid para preencher 100% da largura do container e garantir que todos os cards na mesma linha tenham a mesma altura vertical.
> **Arquivos:** `src/components/portfolio/ProjectsGallery.tsx`, `src/components/portfolio/ProjectsGallery.module.css`, `src/components/portfolio/ProjectCard.tsx`
> **Ações:**
>
> 1. Revisar o container do grid (grid/flex) para usar uma estratégia que não gere “buracos” (ex.: CSS Grid com `auto-fit/auto-fill` + `minmax`).
> 2. Forçar `align-stretch` no grid e `h-full` no card.
> 3. Dentro do card, aplicar `flex flex-col h-full` e padronizar a área de mídia com ratio/altura fixa; corpo com `flex-1` para equalizar.  
>    **Regras:** Tailwind, Mobile-first, comparar com a referência canônica da página Portfólio (spec/protótipo).
>    **Critérios de Aceite:**
>
> - [ ] Em desktop: cada linha do grid tem cards com a mesma altura.
> - [ ] Em mobile: 320px+ sem overflow horizontal.
> - [ ] Grid ocupa 100% da largura útil sem vazios visuais.
> - [ ] Sem mudança de texto/copy e sem nova seção.

---

> **### 🛠️ Prompt #02 — Portfolio Modal: acessibilidade completa (Esc + trap + retorno de foco)**
> **Objetivo:** Garantir que o modal de portfólio seja navegável por teclado, acessível para leitores de tela e feche com Esc, mantendo o retorno de foco ao card.
> **Arquivos:** `src/components/portfolio/PortfolioModal.tsx`, `src/components/portfolio/ProjectCard.tsx`
> **Ações:**
>
> 1. Aplicar semântica: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby` (sem alterar o texto).
> 2. Implementar foco inicial (primeiro elemento interativo do modal) ao abrir.
> 3. Implementar **trap de foco** (Tab/Shift+Tab) dentro do modal.
> 4. No fechamento (Esc/overlay/close), restaurar foco no card acionador (armazenar `document.activeElement` antes de abrir).
> 5. Bloquear scroll do body enquanto o modal estiver aberto, sem causar CLS.  
>    **Regras:** Tailwind, Mobile-first, sem animações de scale/rotate/bounce; comparar com referência canônica do comportamento.
>    **Critérios de Aceite:**
>
> - [ ] `Esc` fecha sempre.
> - [ ] Tab não “escapa” do modal.
> - [ ] Foco retorna ao card original ao fechar.
> - [ ] Leitor de tela anuncia o diálogo corretamente.
> - [ ] Nenhuma mudança de texto.

---

> **### 🛠️ Prompt #03 — ImageLightbox: padronizar fechamento e acessibilidade**
> **Objetivo:** Padronizar a lightbox para não quebrar navegação via teclado e ter o mesmo padrão de fechamento/foco do modal.
> **Arquivos:** `src/components/portfolio/ImageLightbox.tsx`
> **Ações:**
>
> 1. Garantir `Esc` e click no overlay para fechar de forma consistente.
> 2. Adicionar atributos ARIA adequados para a UI.
> 3. Implementar restore focus no elemento acionador.  
>    **Regras:** Tailwind, Mobile-first, comparar com referência canônica do portfólio.
>    **Critérios de Aceite:**
>
> - [ ] Sem “focus loss” ao abrir/fechar.
> - [ ] Sem scroll/overflow acidental no mobile.
> - [ ] Sem alteração de copy.

---

> **### 🛠️ Prompt #04 — Reduced Motion: desligar Lenis + hero animations quando necessário**
> **Objetivo:** Respeitar `prefers-reduced-motion` e desativar scroll suave/parallax/animações contínuas.
> **Arquivos:** `src/components/layout/SmoothScroll.tsx`, `src/components/home/hero/useHeroAnimation.ts`, `src/components/home/hero/HomeHero.tsx`
> **Ações:**
>
> 1. Criar/usar uma checagem central (hook) para `prefers-reduced-motion`.
> 2. Se `reduce`: desativar Lenis e qualquer loop/lerp contínuo; manter apenas render estático.
> 3. Garantir que motion permitido (opacity/blur/translateY <= 18px) não quebre a experiência.  
>    **Regras:** Tailwind, Mobile-first, sem alterar layout, comparar com referência canônica.
>    **Critérios de Aceite:**
>
> - [ ] Com reduced motion ativo: sem scroll suave e sem animações contínuas.
> - [ ] Sem regressão visual (layout idêntico, apenas menos motion).
> - [ ] Sem erros no console.

---

> **### 🛠️ Prompt #05 — Home Hero: estabilizar LCP/CLS sem alterar o layout**
> **Objetivo:** Reduzir risco de LCP/CLS no topo (hero) mantendo o visual da referência.
> **Arquivos:** `src/app/page.tsx`, `src/components/home/hero/HomeHero.tsx`, `src/components/home/hero/*`
> **Ações:**
>
> 1. Garantir reserva de espaço para mídia do hero (altura/ratio fixo).
> 2. Evitar carregar elementos pesados antes do texto crítico.
> 3. Se houver imagens principais: aplicar prioridade (`priority`) e `sizes` corretos (sem trocar assets).  
>    **Regras:** Mobile-first, comparar com referência canônica do hero.
>    **Critérios de Aceite:**
>
> - [ ] Sem shift perceptível no carregamento inicial (CLS baixo).
> - [ ] Texto do hero aparece imediatamente e não “pula”.
> - [ ] Sem mudança de copy.

---

> **### 🛠️ Prompt #06 — Featured Projects: cards com mesma altura por linha**
> **Objetivo:** Garantir consistência vertical dos cards na seção de projetos em destaque, sem alterar conteúdo.
> **Arquivos:** `src/components/home/featured-projects/FeaturedProjectCard.tsx`, `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
> **Ações:**
>
> 1. Forçar card container com `h-full` e layout interno com `flex flex-col`.
> 2. Normalizar área de mídia (altura/ratio) e empurrar ações para o fundo (`mt-auto`).
> 3. Ajustar grid wrapper para `items-stretch`.  
>    **Regras:** Tailwind, Mobile-first, comparar com referência canônica “Featured Projects”.
>    **Critérios de Aceite:**
>
> - [ ] Em desktop, cards na mesma linha têm a mesma altura.
> - [ ] Em mobile, sem overflow horizontal e touch targets adequados.
> - [ ] Sem alterações na copy.

---

> **### 🛠️ Prompt #07 — About: unificar container/gutters e equalizar cards (Origin/Method/What I Do)**
> **Objetivo:** Remover “saltos” de margens laterais entre seções e garantir altura uniforme em cards por linha nas seções do About.
> **Arquivos:** `src/app/sobre/page.tsx`, `src/components/sobre/origin/*`, `src/components/sobre/sections/*`, `src/components/sobre/what-i-do/*`, `src/components/layout/Container.tsx`
> **Ações:**
>
> 1. Padronizar wrapper para usar o mesmo container/tokens de spacing que Home/Portfólio.
> 2. Ajustar grids internos para `items-stretch` e cards com `h-full`.
> 3. Garantir que áreas internas do card usem `flex` para manter alturas equivalentes.  
>    **Regras:** Tailwind, Mobile-first, comparar com referência canônica do About.
>    **Critérios de Aceite:**
>
> - [ ] Mesma margem lateral/edge-to-edge entre blocos do About.
> - [ ] Cards por linha com altura uniforme.
> - [ ] Sem mudança de texto.

---

> **### 🛠️ Prompt #08 — Headings/Semântica: garantir 1x h1 e landmarks consistentes nas páginas principais**
> **Objetivo:** Ajustar semântica para WCAG e consistência estrutural sem alterar visual.
> **Arquivos:** `src/app/page.tsx`, `src/app/sobre/page.tsx`, `src/app/portfolio/page.tsx` + componentes envolvidos no heading principal
> **Ações:**
>
> 1. Garantir apenas um `<h1>` por página.
> 2. Garantir presença coerente de `<main>`, `<header>`, `<nav>`, `<footer>` (sem mover seções).
> 3. Ajustar apenas tags sem alterar texto/ordem.  
>    **Regras:** Mobile-first, sem refatorar layout, comparar com referência canônica.
>    **Critérios de Aceite:**
>
> - [ ] 1 `<h1>` por rota.
> - [ ] Leitores de tela navegam por landmarks.
> - [ ] Zero mudança na copy.

---

## 🚫 REGRAS ABSOLUTAS

- ❌ **NÃO** alterar conteúdo textual.
- ❌ **NÃO** reinventar o layout ou sugerir novas seções.
- ✅ Tratar as imagens e o CodePen como **Verdade Absoluta**.
- ✅ Garantir que todos os cards em uma linha tenham **sempre a mesma altura vertical**.
