### 1️⃣ Visão Geral
A auditoria semanal automatizada varreu os diretórios `src/app` e `src/components`, avaliando as três páginas principais (Home, Sobre, Portfolio) e a área `ADMIN` do projeto Danilo Novais Portfolio (Ghost Era). A estrutura do Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion e R3F / Three.js está funcional. As rotas internas utilizam `MotionLink` para evitar navegação destrutiva, e as páginas do admin estão protegidas por middleware. Os cards do Bento Grid e listas de projetos cumprem a regra de alinhamento e flexibilidade vertical (`h-full min-h-0 self-stretch`). No entanto, identificaram-se pontos de atenção arquitetural no gerenciamento de mídias, organização de arquivos 3D e estados de animação do Header.

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  O Hero implementa o preloader corretamente e renderiza as camadas de z-index conforme o protocolo Ghost (`Preloader` z-50 > `VideoManifesto` z-30 > `Ghost Canvas` z-20 > `Text Block` z-10 > `Background` z-0). A camada 3D possui `pointer-events-none`. Contudo, os arquivos R3F/Three.js da cena do Hero estão localizados em `src/components/canvas/home/hero/` em vez da pasta padronizada `src/components/home/webgl/`.

- **Manifesto:**
  O componente `VideoManifesto.tsx` está estruturado de forma isolada, com suporte a fallback responsivo (`ResponsiveVideo.tsx`). O comportamento de mute padrão, e as alternâncias de som funcionam conforme esperado sem travar a rolagem da página.

- **Featured Projects:**
  A estrutura do Bento Grid utiliza a distribuição em colunas do Tailwind CSS (`md:col-span-5`, `md:col-span-7`, `md:col-span-12`, `md:col-span-8`, `md:col-span-4`). Todos os cards dentro da mesma linha sustentam altura uniforme através das propriedades `h-full min-h-0 self-stretch`. A navegação para landing pages (`/projects/[slug]`) e modais de portfolio está devidamente encadeada.

- **About (Origin/Method/What I Do):**
  A página `/sobre` atende aos princípios semânticos e visuais. Os componentes em `src/components/sobre/` (Origin, Method, What I Do, Beliefs, Closing) seguem o sistema fluido de tipografia e a paleta Ghost Blue (`#0048ff`). As animações do `useOriginAnimations` e do `ManifestoScrollSection` mantêm sincronia com o Lenis Scroll.

- **Portfolio Grid:**
  A galeria de projetos em `/portfolio` exibe os itens com ordenação e filtros por categoria. Os renderizadores das landing pages (templates ALPA e Master Renderer) interpretam as mídias dinâmicas do Supabase Storage. A hero da galeria (`PortfolioHeroNew.tsx`) utiliza utilitários Tailwind CSS sem dependência de CSS Modules legados.

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Ausência do Supabase Image Loader Customizado (`src/lib/supabase/image-loader.ts`).**
  O arquivo de loader customizado não está presente, apesar de ser referenciado nas rotas de renderização de imagem do Firebase Hosting sem o servidor de otimização nativo do Next.js. O `next.config.mjs` requer o ponteiro estrito para o loader do Supabase.

- 🟡 **P1 (Estrutural): Inconsistência de Diretórios nos Componentes WebGL/3D da Home.**
  Componentes da `GhostScene` e shaders estão alocados em `src/components/canvas/home/hero/`. A norma SSoT de arquitetura do projeto exige que componentes WebGL específicos da Home fiquem isolados em `src/components/home/webgl/`.

- 🟡 **P1 (Estrutural): Animação do Indicador Ativo no Header sem `scaleX`.**
  O componente `DesktopFluidHeader.tsx` executa animação de estado ativo do item de menu alternando estilos sem utilizar o transform declarativo `scaleX` recomendado (`animate={{ scaleX: isActive ? 1 : 0 }}`), o que pode ocasionar layout shifts durante a navegação.

- 🟢 **P2 (Polimento Rápido): Refinamento Micro-interativo do `CategoryStripe.tsx`.**
  A transição da seta em `CategoryStripe.tsx` faz chaveamento entre dois SVGs estáticos por opacidade. Deve ser refatorada para um único ícone `ArrowUpRight` animado declarativamente no eixo X com a curva `GHOST_EASE`.

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar e configurar o loader customizado de imagens para evitar quebras de build e sobrecarga no Firebase Hosting.
> **Arquivos:** `next.config.mjs`, `src/lib/supabase/image-loader.ts`
> **Ações:** 1. Criar o arquivo `src/lib/supabase/image-loader.ts` com a lógica para transformar as URLs do bucket do Supabase em `/render/image/public`. 2. Atualizar o `next.config.mjs` para incluir a configuração `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }`.
> **Regras:** Seguir as guidelines de performance e prover fallback seguro caso a URL não pertença ao Supabase.
> **Critérios de Aceite:** O projeto deve buildar corretamente sem erros e a propriedade do Next Image deve redirecionar corretamente a request.

> **### 🛠️ Prompt #02 — Refatorar Arquitetura WebGL da Home**
> **Objetivo:** Isolar e migrar componentes 3D/WebGL da Home para o diretório correto conforme documentado.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx`, `src/components/canvas/home/hero/*`, `src/components/home/webgl/*`
> **Ações:** 1. Mover todos os arquivos R3F de `src/components/canvas/home/hero/` para o diretório `src/components/home/webgl/`. 2. Atualizar todos os imports no componente `HomeHero.tsx`.
> **Regras:** Manter o uso do Dynamic Import e `ssr: false` para o Wrapper R3F.
> **Critérios de Aceite:** O projeto compila com `next build` sem erros de importação e o canvas 3D é renderizado corretamente.

> **### 🛠️ Prompt #03 — Consertar Animação do Estado "Active" no Header**
> **Objetivo:** Substituir a animação no indicador de aba ativa para utilizar `scaleX` com Framer Motion.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:** 1. Localizar o sublinhado do item ativo no menu. 2. Modificar o elemento `motion.div` para aplicar `animate={{ scaleX: isActive ? 1 : 0 }}` com a origem de transformação centralizada ou à esquerda (`origin-left`).
> **Regras:** Evitar repaints desnecessários garantindo o uso exclusivo de propriedades de transform e opacity.
> **Critérios de Aceite:** A animação do indicador desliza/escala suavemente sem alterar a largura calculada do container.

> **### 🛠️ Prompt #04 — Refinar Animação da Seta em CategoryStripe**
> **Objetivo:** Adequar a seta do *Showcase* aos princípios Ghost System usando `translateX`.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:** 1. Substituir a renderização dupla de ícones por um único componente `ArrowUpRight`. 2. Injetar animação `animate={{ x: isHovered ? 4 : 0 }}` controlada pelo Framer Motion com a constante de easing `GHOST_EASE`.
> **Regras:** Animações devem ser declarativas pelo Framer Motion, respeitando as diretrizes do Ghost Design System.
> **Critérios de Aceite:** Ao passar o mouse sobre a linha da categoria, a seta desloca-se suavemente para a direita.
