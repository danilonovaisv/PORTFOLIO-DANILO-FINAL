### 1️⃣ Visão Geral
A auditoria semanal automatizada varreu os diretórios `src/app` e `src/components`, além da documentação de referência em `.context/DOCS-PORTFOLIO-PAGES/`, avaliando as três páginas principais (Home, Sobre, Portfolio) e a área de Admin do projeto Ghost Era (portfoliodanilo.com). A estrutura base do Next.js App Router está implementada com excelente integridade de roteamento via `MotionLink` e gerenciamento de estado. No entanto, há desalinhamentos arquiteturais importantes com o sistema V3 (Ghost System), incluindo localização de componentes WebGL, otimizações de imagem e propriedades de transição no Header e no Portfolio Showcase. As regras de altura uniforme para cards na mesma linha do Bento Grid / Galeria estão preservadas através de flexbox/grid stretch (`h-full self-stretch`). Nenhuma alteração foi realizada em arquivos de código-fonte (.ts, .tsx, .css).

---

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - **Status:** 🟡 Atenção Arquitetural
  - **Diagnóstico:** O preloader (`Preloader.tsx`) e a ordem dos z-index (z-50 preloader, z-30 manifesto, z-20 ghost atmosphere, z-10 editorial text, z-0 bg) estão rigorosamente em conformidade com o protocolo Ghost. No entanto, a organização de pastas viola a convenção SSoT: o `GhostSceneWrapper` e os hooks de WebGL estão em `src/components/canvas/home/hero/` em vez do diretório oficial `src/components/home/webgl/`.

- **Manifesto:**
  - **Status:** ✅ Conforme
  - **Diagnóstico:** O componente `VideoManifesto.tsx` está isolado com suporte a autoplay mudo, botão de alternância de áudio e fallback para `ResponsiveVideo` em telas mobile. A expansão scroll-driven em desktop mantém as proporções e comportamentos especificados na documentação V3.

- **Featured Projects:**
  - **Status:** ✅ Conforme
  - **Diagnóstico:** A implementação utiliza a estrutura de Bento Grid via Tailwind CSS (`md:col-span-5`, `md:col-span-7`, `md:col-span-12`, `md:col-span-8`, `md:col-span-4`). A exigência de altura idêntica para cards na mesma linha é estritamente garantida por `h-full min-h-0 self-stretch` em `FeaturedProjectsSection.tsx` e `FeaturedProjectCardFrame.tsx`.

- **About (Origin/Method/What I Do):**
  - **Status:** 🟡 Atenção
  - **Diagnóstico:** A página `/sobre` implementa corretamente a divisão em seções (`AboutHero`, `AboutOrigin`, `AboutMethod`, `AboutWhatIDo`, `AboutProof`, `AboutClosing`). No entanto, a cena 3D `OriginParticleScene3D.tsx` apresenta variáveis e atributos não utilizados no loop de animação R3F, causando sobrecarga marginal em dispositivos com menor capacidade.

- **Portfolio Grid:**
  - **Status:** 🟡 Atenção UI/UX
  - **Diagnóstico:** A galeria principal (`ProjectsGallery.tsx`) e a abertura do modal de case (`PortfolioModal.tsx`) e rotas dinâmicas `/portfolio/[slug]` funcionam de forma fluida com dados do Supabase. O componente `PortfolioHeroNew.tsx` utiliza Tailwind limpo, porém no `CategoryStripe.tsx` do Showcase a transição da seta utiliza troca de opacidade de SVGs duplos ao invés da transição declarativa única com `translateX` estipulada pelo Ghost System.

- **Admin Area (`/admin`):**
  - **Status:** ✅ Conforme
  - **Diagnóstico:** A área administrativa possui isolamento de rotas protegidas via middleware (`authz.ts`), gerenciamento completo de Trabalhos, Mídia, Tags e Landing Pages V3 (ALPA). A integridade das landing pages e a renderização dos templates V2/V3 estão operando normalmente.

---

### 3️⃣ Lista de Problemas e Backlog Priorizado

1. 🔴 **P0 (Crítico) — Ausência do Supabase Custom Image Loader (`src/lib/supabase/image-loader.ts`)**
   - **Local:** `next.config.mjs` / `src/lib/supabase/`
   - **Descrição:** O arquivo do loader customizado do Supabase não existe, forçando otimizações padrão que aumentam largura de banda e custo no Firebase Hosting e geram alertas de LCP.

2. 🟡 **P1 (Estrutural) — Arquitetura de Componentes WebGL Fora do Padrão (`GhostScene`)**
   - **Local:** `src/components/canvas/home/hero/`
   - **Descrição:** Componentes R3F e shaders da Home estão localizados em `src/components/canvas/home/hero/` quando a diretriz estrita do SSoT (`AGENTS.md`) exige a localização em `src/components/home/webgl/`.

3. 🟡 **P1 (Estrutural) — Animação de Indicador Ativo do Header via `width` em vez de `scaleX`**
   - **Local:** `src/components/layout/header/DesktopFluidHeader.tsx`
   - **Descrição:** A barra de navegação ativa do Header desktop utiliza alterações de `width` na animação do pseudo-elemento/underline, violando a regra de performance que exige `animate={{ scaleX: isActive ? 1 : 0 }}`.

4. 🟡 **P1 (Estrutural) — Variáveis e Atributos R3F Inertes em `OriginParticleScene.tsx`**
   - **Local:** `src/components/sobre/origin/OriginParticleScene.tsx`
   - **Descrição:** Diversos atributos (`lifeAttr`, `decayAttr`, `velocityAttr`) e referências de física são atribuídos sem uso no frame loop do Three.js, reduzindo o FPS em telas de alta densidade.

5. 🟢 **P2 (Polimento Rápido) — Interação da Seta em `CategoryStripe` fora dos Padrões Ghost**
   - **Local:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
   - **Descrição:** O componente alterna a visibilidade de dois ícones SVG em vez de utilizar um único componente de ícone animado declarativamente via Framer Motion (`animate={{ x: isHovered ? 4 : 0 }}`).

6. 🟢 **P2 (Polimento Rápido) — Tags `<img>` Nativas em `MediaCard.tsx` e `AssetCard.tsx`**
   - **Local:** `src/components/ui/media/MediaCard.tsx`, `src/components/admin/AssetCard.tsx`
   - **Descrição:** Utilização de tags `<img>` em vez de `next/image` ou `DynamicAssetImage`, ocasionando chamadas desotimizadas para o bucket do Supabase.

7. 🟢 **P2 (Polimento Rápido) — Redundância de Mídia com `thumbnailUrl` em vez de `posterUrl` em Tipos do Portfolio**
   - **Local:** `src/components/portfolio/ProjectCard.tsx`
   - **Descrição:** Chamadas para `resolveProjectMedia` em casos limite tentam acessar `.mp4` em tags de poster de vídeo.

8. 🟢 **P2 (Polimento Rápido) — Falta de Feedback Visual Acessível em Menus Mobile no Estado `:active`**
   - **Local:** `src/components/layout/header/mobile/MobileMenuPanel.tsx`
   - **Descrição:** O painel de menu mobile não fornece indicação tátil imediata de estado ativo (`:active` / `:focus-visible`) para usuários de leitores de tela e dispositivos touch sem hover.

9. 🟢 **P2 (Polimento Rápido) — Falta de Fallback de Altura Mínima no `ShaderSection.tsx`**
   - **Local:** `src/components/home/ShaderSection.tsx`
   - **Descrição:** O container do canvas shader de background não possui `min-h-[300px]` em telas ultra-wide, podendo causar colapso de layout durante o carregamento assíncrono.

10. 🟢 **P2 (Polimento Rápido) — Desalinhamento do Padding Horizontal de Margem em Containers Secundários**
    - **Local:** `src/components/sobre/sections/AboutMethod.tsx`
    - **Descrição:** Uso de `px-6` fixo em vez de utilizar o padrão fluido global `px-[clamp(24px,5vw,96px)]` / `.std-grid`.

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar o loader customizado de imagens do Supabase e vinculá-lo ao Next.js para otimizar LCP e reduzir custos no Firebase Hosting.
> **Arquivos:** `src/lib/supabase/image-loader.ts`, `next.config.mjs`
> **Ações:**
> 1. Criar o arquivo `src/lib/supabase/image-loader.ts` exportando a função padrão que converte caminhos do bucket Supabase para `/render/image/public` com parâmetros de `width` e `quality`.
> 2. Atualizar o `next.config.mjs` adicionando `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }`.
> **Regras:** Manter fallback limpo para URLs externas que não venham do Supabase Storage.
> **Critérios de Aceite:** O comando `pnpm run build-check` deve ser executado com sucesso e a renderização de imagens deve utilizar a rota de transformações do Supabase.

> **### 🛠️ Prompt #02 — Migrar Arquitetura WebGL da GhostScene na Home**
> **Objetivo:** Mover os componentes 3D/WebGL da Home Hero para o diretório correto estipulado no SSoT.
> **Arquivos:** `src/components/canvas/home/hero/*`, `src/components/home/webgl/*`, `src/components/home/hero/HomeHero.tsx`
> **Ações:**
> 1. Criar a pasta `src/components/home/webgl/` se necessário.
> 2. Mover todos os arquivos R3F de `src/components/canvas/home/hero/` para `src/components/home/webgl/`.
> 3. Atualizar os imports no `HomeHero.tsx` e em outros arquivos que referenciem `GhostSceneWrapper`.
> **Regras:** Manter a flag `ssr: false` e o wrapper dinâmico do Next.js.
> **Critérios de Aceite:** Nenhuma referência quebrada ao rodar `pnpm run typecheck` e a cena 3D deve ser renderizada normalmente na Home.

> **### 🛠️ Prompt #03 — Corrigir Animação de Indicador Ativo no Desktop Header**
> **Objetivo:** Substituir a alteração de `width` por `scaleX` no indicador de link ativo do cabeçalho desktop.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:**
> 1. Localizar o elemento de linha indicadora ativa no `DesktopFluidHeader`.
> 2. Substituir a propriedade de animação de `width: '0%' | '100%'` para `scaleX: isActive ? 1 : 0`.
> 3. Definir `style={{ transformOrigin: 'left center' }}` ou classe Tailwind `origin-left`.
> **Regras:** Não usar animações puramente baseadas em layout width sem `layoutId` para evitar reflows.
> **Critérios de Aceite:** A transição deve ser suave, performática de 60fps sem repainting de layout.

> **### 🛠️ Prompt #04 — Refinar Animação da Seta em CategoryStripe**
> **Objetivo:** Alinhar o comportamento da seta das tiras do Portfolio Showcase ao padrão Ghost System.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:**
> 1. Remover a estrutura de dois ícones alternados por opacidade.
> 2. Manter um único componente de ícone de seta.
> 3. Animar o desprazamento do ícone utilizando `animate={{ x: isHovered ? 4 : 0 }}` com a transição `GHOST_EASE`.
> **Regras:** Seguir as diretrizes do Ghost System (`GHOST_EASE` / `[0.22, 1, 0.36, 1]`).
> **Critérios de Aceite:** A seta deve deslocar 4px para a direita no hover e retornar à posição inicial sem flashes de opacidade.

> **### 🛠️ Prompt #05 — Limpeza de Atributos e Refs em OriginParticleScene**
> **Objetivo:** Otimizar o loop R3F da cena da seção Sobre removendo variáveis não utilizadas.
> **Arquivos:** `src/components/sobre/origin/OriginParticleScene.tsx`
> **Ações:**
> 1. Inspecionar e remover variáveis `lifeAttr`, `decayAttr`, `velocityAttr` e refs não consumidas no render frame loop.
> 2. Garantir que os buffers de geometria alocados no GPU sejam corretamente liberados no unmount (`dispose`).
> **Regras:** Manter estrito controle de memória e performance em componentes Three.js.
> **Critérios de Aceite:** Inexistência de avisos no `pnpm run lint` referentes a variáveis não utilizadas na cena.
