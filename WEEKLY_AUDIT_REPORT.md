### 1️⃣ Visão Geral

A auditoria semanal automatizada varreu detalhadamente os diretórios `src/app` e `src/components`, avaliando as páginas principais (Home, Sobre, Portfólio) e a área de Admin do projeto Ghost Era (portfoliodanilo.com). A arquitetura base do Next.js App Router (v16) com React 19 e TypeScript strict mode está sólida, com typecheck e testes unitários 100% aprovados. O roteamento no estilo SPA é suportado nativamente pelo `MotionLink`, e a integração com Supabase Storage e Firebase Hosting opera de forma performática. Contudo, foram mapeadas inconsistências na hierarquia de diretórios WebGL, otimizações de animações do header e animações secundárias, bem como pontos de atenção na otimização estática de assets.

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - O preloader e as camadas de z-index (z-50 Preloader > z-30 ManifestoThumb > z-20 Ghost WebGL > z-10 Hero Text > z-0 Background) seguem estritamente as especificações do protocolo Ghost.
  - *Inconsistência Mapeada:* Os componentes WebGL da Home estão localizados em `src/components/canvas/home/hero/` em vez da pasta estrita `src/components/home/webgl/` conforme estabelecido pelas regras SSoT em `AGENTS.md`.

- **Manifesto:**
  - O componente de vídeo `VideoManifesto` atende a todos os requisitos funcionais, operando com suporte a autoplay mutado, faixas de legendas acessíveis e controles de áudio. No mobile, expande como seção dedicada em tela cheia sem quebras.

- **Featured Projects:**
  - A estrutura Bento Grid de 12 colunas (`5+7`, `12`, `8+4`) está devidamente implementada com Tailwind CSS.
  - *Alinhamento e Responsividade:* O requisito absoluto de altura vertical uniforme entre os cards da mesma linha é garantido pelo uso consistente das classes `h-full min-h-0 self-stretch` e `items-stretch` no container grid.

- **About (Origin/Method/What I Do):**
  - A seção Sobre cumpre a hierarquia tipográfica e o escalonamento fluido do Ghost Design System (`GHOST-DESIGN-SYSTEM.md`).
  - As subseções `AboutOrigin`, `AboutMethod` e `AboutWhatIDo` possuem animações de entrada suaves com `useMotionGate` e suporte integral a `prefers-reduced-motion`.

- **Portfolio Grid:**
  - A galeria principal (`ProjectsGallery.tsx`) e a transição para landing pages dinâmicas em `/portfolio/[slug]` operam em harmonia com o transformador ALPA V3.
  - A renderização do `PortfolioHeroNew.tsx` utiliza Tailwind CSS sem misturar CSS Modules legados.

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Ausência do Arquivo de Loader Customizado `src/lib/supabase/image-loader.ts`.**
  - *Impacto:* Ausência do arquivo de loader explicitado para integração do Supabase Render e otimização estática no Firebase Hosting.

- 🟡 **P1 (Estrutural): Inconsistência na Estrutura de Pastas WebGL da Home.**
  - *Impacto:* Os componentes R3F da Home residem em `src/components/canvas/home/hero/` em desacordo com o padrão mandatório `src/components/home/webgl/`.

- 🟡 **P1 (Estrutural): Animação do Sublinhado Ativo no Header sem `scaleX`.**
  - *Impacto:* Em `DesktopFluidHeader.tsx`, o indicador ativo utiliza alteração de `width` (causando repaints/layout shift) em vez da animação otimizada com `animate={{ scaleX: isActive ? 1 : 0 }}`.

- 🟢 **P2 (Polimento Rápido): Animação Simplificada de Ícones em `CategoryStripe.tsx`.**
  - *Impacto:* A seta de transição no hover alterna opacidades entre dois ícones em vez de animar suavemente a posição com `translateX: isHovered ? 4 : 0`.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Criar Supabase Image Loader para Otimização de Assets**
> **Objetivo:** Criar o arquivo `src/lib/supabase/image-loader.ts` para otimização de imagens no Supabase e Firebase Hosting.
> **Arquivos:** `src/lib/supabase/image-loader.ts`, `next.config.mjs`
> **Ações:**
> 1. Criar `src/lib/supabase/image-loader.ts` exportando uma função default que receba `{ src, width, quality }` e converta URLs de objetos do Supabase Storage para a rota `/storage/v1/render/image/public`.
> 2. Configurar o fallback para retornar a URL original caso não seja do Supabase.
> **Regras:** TypeScript estrito, zero dependências externas desnecessárias, manter compatibilidade com Next.js 16.
> **Critérios de Aceite:** O loader resolve URLs do Supabase para a API de renderização e os testes unitários de imagens passam sem erros.

> **### 🛠️ Prompt #02 — Refatorar Hierarquia do Módulo WebGL da Home**
> **Objetivo:** Mover os componentes WebGL da Home para o diretório padrão `src/components/home/webgl/`.
> **Arquivos:** `src/components/canvas/home/hero/*`, `src/components/home/webgl/*`, `src/components/home/hero/HomeHero.tsx`
> **Ações:**
> 1. Criar o diretório `src/components/home/webgl/`.
> 2. Mover todos os arquivos R3F de `src/components/canvas/home/hero/` para `src/components/home/webgl/`.
> 3. Atualizar as importações dinâmicas (`dynamic(() => import(...), { ssr: false })`) em `HomeHero.tsx`.
> **Regras:** Manter `ssr: false` e `Suspense` em todas as canvas R3F.
> **Critérios de Aceite:** `pnpm run typecheck` e `pnpm run build-check` são concluídos com sucesso e sem erros de importação.

> **### 🛠️ Prompt #03 — Adequar Animação de Indicador Ativo no Header para `scaleX`**
> **Objetivo:** Otimizar a animação do indicador de navegação ativa no `DesktopFluidHeader.tsx` usando transformações de GPU (`scaleX`).
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:**
> 1. Localizar o componente `DesktopNavItem`.
> 2. Alterar o indicador `<m.span>` de sublinhado para ter `w-full left-0 origin-center` (ou `origin-left`).
> 3. Atualizar as propriedades de animação para usar `animate={{ scaleX: isActive ? 1 : 0 }}`.
> **Regras:** Não manipular a propriedade `width` durante animações para evitar repaints da engine do navegador.
> **Critérios de Aceite:** O indicador transita suavemente com `scaleX` e o teste `header-nav-state.test.ts` e testes do header continuam passando.

> **### 🛠️ Prompt #04 — Refinar Interação com Seta no Componente `CategoryStripe`**
> **Objetivo:** Padronizar a animação de hover da seta em `CategoryStripe.tsx` com desaceleração Ghost Ease e movimento em `translateX`.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:**
> 1. Substituir a troca de dois ícones por um único ícone `ArrowUpRight`.
> 2. Injetar animação declarativa no Framer Motion para deslizar a seta horizontalmente com `animate={{ x: isHovered ? 4 : 0 }}` e rotação sutil.
> **Regras:** Utilizar a curva de aceleração `GHOST_EASE` e respeitar `prefersReducedMotion`.
> **Critérios de Aceite:** A seta move-se suavemente para a direita/cima no hover sem parpados ou trocas bruscas de SVG.
