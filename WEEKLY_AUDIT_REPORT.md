### 1️⃣ Visão Geral
A auditoria semanal automatizada do repositório varreu as pastas `src/app` e `src/components` (incluindo as páginas Home, Sobre, Portfólio e a área Admin), confrontando a implementação técnica com a documentação de referência em `.context/DOCS-PORTFOLIO-PAGES/`.

A arquitetura geral do Next.js App Router com React, TypeScript e Tailwind CSS apresenta boa organização estrutural. O roteamento cliente utiliza `MotionLink` para evitar reloads completos. No entanto, foram identificados gargalos de performance, desacordos com as regras estritas de organização de componentes WebGL, desalinhamentos em animações de estado ativo do Header e pequenas divergências em efeitos de transição de cards e setas. Todos os cards de projetos em destaque no Bento Grid utilizam alinhamento de altura idêntica na mesma linha via `h-full min-h-0 self-stretch` com CSS Grid (`grid-cols-12`).

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - **Status:** O Hero renderiza corretamente a hierarquia de z-index (Preloader z-50 > Manifesto Thumb z-30 > WebGL z-20 > Hero Text z-10 > BG z-0).
  - **Inconsistência:** O componente 3D `GhostSceneWrapper` e arquivos relacionados estão alocados em `src/components/canvas/home/hero/`, violando o padrão estrito do projeto que exige a localização em `src/components/home/webgl/ghost-canvas/`.

- **Manifesto:**
  - **Status:** O `VideoManifesto.tsx` está isolado e com controle de áudio, reproduçãomuda e suporte a fallback responsivo (`ResponsiveVideo`).
  - **Inconsistência:** No scroll-expansion do desktop, o controle de liberação do audio/unmute no fullscreen necessita de sincronização declarativa para evitar inconsistências durante chamadas concorrentes de scroll.

- **Featured Projects:**
  - **Status:** Implementação do Bento Grid com CSS Grid classes do Tailwind (5col+7col, 12col, 8col+4col).
  - **Conformidade de Altura:** Todos os cards da mesma linha compartilham rigorosamente a mesma altura vertical via `col-span-4 flex h-full min-h-0 w-full self-stretch`.
  - **Inconsistência:** O componente `CTAProjectCard.tsx` não aplica de forma estrita o efeito de mudança de cor no texto do título (`#0057FF`) em estado de hover estipulado pela documentação.

- **About (Origin/Method/What I Do):**
  - **Status:** A página Sobre (`src/app/sobre/page.tsx`) e subseções (`origin`, `beliefs`, `sections`) respeitam a paleta do Ghost System e tipografia fluida.
  - **Inconsistência:** O componente `OriginSection` possui classes CSS inline declaradas com opacidade fixa que ignoram a escala utilitária e tokens de movimento `GHOST_EASE`.

- **Portfolio Grid:**
  - **Status:** O grid de projetos em `/portfolio` (`ProjectsGallery.tsx` e `PortfolioHeroNew.tsx`) utiliza Tailwind e padronização `.std-grid`.
  - **Inconsistência:** O componente `CategoryStripe.tsx` em Portfolio Showcase gerencia a animação da seta com dois SVGs sobrepostos (`ArrowUpRight` e `ArrowUp`) alterando a opacidade em vez de mover declarativamente o vetor com `translateX(4px)` conforme estipulado pelo Ghost Ease.

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Ausência do Supabase Custom Image Loader (`src/lib/supabase/image-loader.ts`).**
  O loader customizado de imagens do Supabase é necessário no `next.config.mjs` para evitar sobrecarga no Firebase Hosting e falhas de renderização de imagem dinâmica.

- 🟡 **P1 (Estrutural): Arquitetura WebGL Fora do Padrão.**
  Componentes da `GhostScene` estão em `src/components/canvas/home/hero/` em vez de `src/components/home/webgl/ghost-canvas/`.

- 🟡 **P1 (Estrutural): Estado Ativo do Header utilizando Animação Baseada em Largura (Width-based).**
  No `DesktopFluidHeader.tsx`, o indicador de aba ativa altera a largura (`width: 0 -> 100%`) em vez de utilizar o padrão `scaleX: isActive ? 1 : 0` com `origin-center`.

- 🟡 **P1 (Estrutural): Transição de Ícone da Seta em `CategoryStripe.tsx`.**
  O componente varia a opacidade de dois elementos em vez de animar a transição com `x: isHovered ? 4 : 0` usando o token `GHOST_EASE`.

- 🟢 **P2 (Polimento Rápido): CTA Project Card Hover Highlight.**
  Garantir transição de cor do título para `#0057FF` no hover do `CTAProjectCard.tsx`.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar e configurar o loader customizado de imagens do Supabase para otimização de imagens no Firebase Hosting sem o endpoint `/_next/image`.
> **Arquivos:** `src/lib/supabase/image-loader.ts`, `next.config.mjs`
> **Ações:** 1. Criar `src/lib/supabase/image-loader.ts` para converter URLs de objetos Supabase Storage em URLs do serviço de renderização `/render/image/public`. 2. Atualizar o `next.config.mjs` para setar `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }`.
> **Regras:** Manter suporte a fallback para URLs externas não pertencentes ao Supabase.
> **Critérios de Aceite:** O comando `pnpm run build-check` e `next build` concluem com sucesso e o Next Image renderiza com URLs otimizadas.

> **### 🛠️ Prompt #02 — Refatorar Arquitetura WebGL da Home**
> **Objetivo:** Migrar os componentes 3D do Hero da Home para a estrutura de diretórios estipulada em `AGENTS.md`.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx`, `src/components/canvas/home/hero/*`, `src/components/home/webgl/ghost-canvas/*`
> **Ações:** 1. Mover os arquivos da pasta `src/components/canvas/home/hero/` para `src/components/home/webgl/ghost-canvas/`. 2. Atualizar todas as declarações de importação em `HomeHero.tsx` e componentes dependentes.
> **Regras:** Preservar o carregamento dinâmico cliente (`ssr: false`) e o wrapper de `Suspense`.
> **Critérios de Aceite:** A compilação TypeScript e Next build completam sem erros de importação e o Canvas 3D renderiza na Home.

> **### 🛠️ Prompt #03 — Consertar Animação do Estado Active no Header**
> **Objetivo:** Substituir a animação de `width` pelo uso de `scaleX` no indicador de navegação ativa do Header.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:** 1. Localizar `DesktopNavItem`. 2. Alterar o elemento `<m.span>` de sublinhado para utilizar `style={{ scaleX: isActive ? 1 : 0 }}` e animar com Framer Motion declarativo utilizando `scaleX`. 3. Garantir `origin-center` ou `origin-left`.
> **Regras:** Não utilizar alteração direta de largura CSS sem layoutId; priorizar transform de escala para performance.
> **Critérios de Aceite:** As abas ativas do Header animam suavemente sem provocar reflow ou layout shift.

> **### 🛠️ Prompt #04 — Padronizar Animação da Seta em CategoryStripe**
> **Objetivo:** Adequar a seta do *Showcase* aos princípios Ghost System usando `translateX`.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:** 1. Remover a dupla declaração de ícones de seta com opacidade. 2. Utilizar um único componente de ícone de seta. 3. Aplicar a animação declarativa `animate={{ x: isHovered ? 4 : 0 }}` com o easing `GHOST_EASE`.
> **Regras:** Respeitar a curva `GHOST_EASE` de `src/config/motion.ts`.
> **Critérios de Aceite:** Ao passar o mouse sobre cada linha de categoria, a seta desliza suavemente 4px para a direita.
