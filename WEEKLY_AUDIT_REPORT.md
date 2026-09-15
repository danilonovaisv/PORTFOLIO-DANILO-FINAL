### 1️⃣ Visão Geral
A auditoria semanal automatizada varreu os diretórios `src/app` e `src/components`, avaliando as páginas Home, Sobre, Portfolio e a área de Admin do projeto Ghost Era. A estrutura base do Next.js App Router está implementada com páginas e rotas corretas. O roteamento (SPA) está sendo utilizado com `MotionLink`, mas ainda há melhorias necessárias para o design system. A performance está criticamente ameaçada pela ausência do Loader Customizado de Imagens do Supabase. Animações e a integração R3F precisam de ajustes estruturais para se adequarem às diretrizes da arquitetura V3.

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  O Hero implementa o preloader corretamente e renderiza as camadas de z-index conforme o protocolo Ghost. No entanto, a organização de pastas de componentes 3D viola o padrão. O `GhostSceneWrapper` está em `src/components/canvas/home/hero/`, mas a arquitetura estrita exige que esteja em `src/components/home/webgl/`.

- **Manifesto:**
  O componente `VideoManifesto.tsx` está isolado e bem implementado, com as lógicas de mute e autoplay configuradas. O comportamento de fullscreen no desktop segue a responsividade mobile-first através do fallback para o componente `ResponsiveVideo`.

- **Featured Projects:**
  A renderização usa a estrutura do Bento Grid com CSS Grid classes do Tailwind. O requisito de que todos os cards na mesma linha tenham a mesma altura vertical está devidamente respeitado pelo uso contínuo de `h-full min-h-0 self-stretch` ao longo das diretivas do `FeaturedProjectsSection.tsx` e `FeaturedProjectCard.tsx`.

- **About (Origin/Method/What I Do):**
  A seção Sobre obedece à semântica geral do Tailwind e à paleta de cores. As hierarquias de fonte seguem a tabela fluid scale estipulada em `GHOST-DESIGN-SYSTEM.md`.

- **Portfolio Grid:**
  O grid (`.std-grid`) está bem formatado. A visualização de landing pages via ALPA V3 (em `/portfolio/[slug]`) apresenta integridade com o redirecionamento. O componente `PortfolioHeroNew.tsx` foi migrado para Tailwind e não faz mais uso de CSS Modules legados.

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Ausência do Supabase Image Loader (`src/lib/supabase/image-loader.ts`).**
  O arquivo não existe, mas está sendo referenciado nas memórias do projeto e configurações essenciais. O Firebase Hosting falhará ao otimizar imagens, necessitando da declaração no `next.config.mjs`.

- 🟡 **P1 (Estrutural): Arquitetura WebGL Fora do Padrão.**
  Componentes da `GhostScene` estão alocados em `canvas/home/hero` e precisam ser migrados estritamente para `src/components/home/webgl/` conforme a regra SSoT (`AGENTS.md`).

- 🟡 **P1 (Estrutural): Estado Ativo do Header sem `scaleX`.**
  O componente `DesktopFluidHeader.tsx` continua utilizando a animação baseada em alteração de `width` no pseudo-sublinhado, ao passo que a regra do projeto estipula explicitamente a utilização de `animate={{ scaleX: isActive ? 1 : 0 }}`.

- 🟢 **P2 (Polimento Rápido): Refinamento do `CategoryStripe.tsx`.**
  As interações da seta não estão empregando a propriedade `translateX` como recomendado para o padrão de movimento "Ghost Ease", estando baseadas unicamente em transições de opacidade estática entre SVGs.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar e configurar o loader customizado de imagens para evitar quebras de build e sobrecarga no Firebase Hosting.
> **Arquivos:** `next.config.mjs`, `src/lib/supabase/image-loader.ts`
> **Ações:** 1. Criar o arquivo `src/lib/supabase/image-loader.ts` com a lógica para transformar as URLs do bucket do Supabase em `/render/image/public`. 2. Atualizar o `next.config.mjs` para incluir a configuração `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }`.
> **Regras:** Seguir as guidelines de performance e prover fallback seguro caso a URL não pertença ao Supabase.
> **Critérios de Aceite:** O projeto deve buildar corretamente sem erros e a propriedade do Next Image deve redirecionar corretamente a request.

> **### 🛠️ Prompt #02 — Refatorar Arquitetura WebGL da Home**
> **Objetivo:** Isolar e migrar componentes 3D/WebGL da Home para o diretório correto conforme documentado.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx`, `src/components/canvas/home/hero/*`, `src/components/home/webgl/ghost-canvas/*`
> **Ações:** 1. Mover todos os arquivos R3F de `src/components/canvas/home/hero/` para o diretório `src/components/home/webgl/ghost-canvas/`. 2. Atualizar todos os imports em `HomeHero.tsx`.
> **Regras:** Manter o uso do Dynamic Import e `ssr: false` para o Wrapper R3F.
> **Critérios de Aceite:** O projeto compila com `next build` sem erros de importação e o canvas 3D é renderizado corretamente.

> **### 🛠️ Prompt #03 — Consertar Animação do Estado "Active" no Header**
> **Objetivo:** Substituir a animação de `width` pelo uso de `scaleX` no indicador de aba ativa para o padrão Framer.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:** 1. Localizar o componente `DesktopNavItem`. 2. Substituir os variants (initial, hover, active) da barra de sublinhado. Definir o width fixo ou 100% e animar através de `scaleX`, configurando `origin-center` ou `origin-left`.
> **Regras:** Respeitar a documentação explícita que proíbe o método puramente *width-based* sem layoutId, em detrimento do uso explícito do transform scale.
> **Critérios de Aceite:** A animação sublinha suavemente e não causa repaint/layout shift.

> **### 🛠️ Prompt #04 — Refinar Animação da Seta em CategoryStripe**
> **Objetivo:** Adequar a seta do *Showcase* aos princípios Ghost System usando `translateX`.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:** 1. Reduzir para um único ícone de `ArrowRight` (ou ArrowUpRight rotacionado nativamente) e injetar `animate={{ x: isHovered ? 4 : 0 }}`. 2. Remover opacidades duplas de ícones.
> **Regras:** Animações devem ser declarativas pelo Framer Motion, respeitando a curva `GHOST_EASE`.
> **Critérios de Aceite:** A interação flui apenas movendo a seta para a direita ao se aproximar.
