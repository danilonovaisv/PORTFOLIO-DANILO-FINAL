### 1️⃣ Visão Geral
A auditoria semanal automatizada varreu o repositório (`src/app`, `src/components`, `src/lib` e área de `ADMIN`), avaliando rigorosamente as três páginas principais (Home, Sobre, Portfólio) e o ambiente restrito do Ghost System (portfoliodanilo.com).

O projeto encontra-se em estado técnico saudável, com compilação limpa sem erros de TypeScript (`tsc --noEmit`), linting zero warnings/errors (`eslint`), e 100% das suítes de testes passando (49/49 test suites, 371/371 tests). A arquitetura base do Next.js 16 (App Router) e React 19 está operando adequadamente com Server e Client Components bem delimitados. O roteamento (SPA) através do `MotionLink` garante transições fluidas. A integração com Supabase Storage e Firebase Hosting está estável, mantendo renderização responsiva e suporte a fallbacks estáticos quando variáveis de ambiente não estão configuradas.

Contudo, a auditoria identificou pontos estruturais e de otimização que necessitam de atenção: a falta de declaração explícita do loader customizado do Supabase no `next.config.mjs`, inconsistências de organização dos componentes WebGL da Home, animações de sublinhado do header utilizando alteração de largura em vez de `scaleX`, e pequenos ajustes de polimento em animações e acessibilidade.

---

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - **Estrutura & Z-Index:** O stack de camadas (`Preloader z-50` > `ManifestoThumb z-30` > `Ghost WebGL z-20` > `Hero Text z-10` > `Background z-0`) está rigorosamente mantido. O container `pointer-events-none` no canvas 3D garante a interatividade completa dos botões e textos.
  - **Inconsistência de Diretório:** Os componentes WebGL da Home permanecem alocados em `src/components/canvas/home/hero/` em vez de `src/components/home/webgl/` conforme estipulado nas diretrizes do projeto (`AGENTS.md`).
  - **Navegação Fluid Header:** O `DesktopFluidHeader.tsx` faz uso de transições baseadas em `width` (`width: 0` -> `width: '100%'`) no sublinhado dos links do menu, descumprindo a diretriz de animação via `animate={{ scaleX: isActive ? 1 : 0 }}`.

- **Manifesto:**
  - **Mídia e Interatividade:** O componente `VideoManifesto.tsx` está isolado e funcional, com controle de áudio, scroll e comportamento de fullscreen no desktop. No mobile, o fallback com `ResponsiveVideo` e controle por toque/interação funciona de forma responsiva.
  - **Legendas:** Uso de `ResponsiveCaptionTrack` prevenindo exceções de carregamento de legendas VTT em ambientes estáticos.

- **Featured Projects:**
  - **Bento Grid & Altura Uniforme (Regra Absoluta):** O Bento Grid em `FeaturedProjectsSection.tsx` implementa o layout de 12 colunas com CSS Grid (`grid-cols-4 md:grid-cols-8 lg:grid-cols-12`). Todos os cards em uma mesma linha mantêm exatamente a mesma altura vertical via utilitários `h-full min-h-0 flex flex-col self-stretch`.
  - **Hover & Cards:** A interação do círculo de ícone no `FeaturedProjectCard.tsx` transita suavemente entre o azul primário (`#0048ff`) e o roxo (`#8705f2`).

- **About (Origin/Method/What I Do):**
  - **Hierarquia & Grid:** A página `/sobre` obedece à grelha `.std-grid`, mantendo escala tipográfica fluida e espaçamento consistente (`py-16 md:py-24`).
  - **Seções:** `AboutOrigin`, `AboutWhatIDo`, `AboutMethod` e `ManifestoScrollSection` estão integradas com `Suspense` e `SectionSkeleton` para hidratação progressiva. Os cards de princípios na versão mobile possuem scroll suave e área de toque adequada.

- **Portfolio Grid:**
  - **Grid & ALPA V3:** A galeria principal em `/portfolio` responde adequadamente aos filtros de categoria e paginação do servidor/cliente.
  - **Abertura de Cards & Landing Pages:** Os cards sem landing page dedicada utilizam a âncora `/portfolio#portfolio-card-...` com modal pop-up automático ("POP-UP DE PROJETO (SEM LANDING PAGE)"). Projetos com landing page redirecionam para `/projects/[slug]`.
  - **Performance:** `PortfolioHeroNew.tsx` utiliza Tailwind CSS nativo, sem dependências de CSS Modules antigos.

---

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Integração do Custom Supabase Image Loader (`src/lib/supabase/image-loader.ts`) em `next.config.mjs`**
  - **Inconsistência:** O projeto possui a função `supabaseLoader` utilitária em `src/lib/utils.ts`, porém o `next.config.mjs` não declara `images: { loader: 'custom', loaderFile: ... }`.
  - **Impacto:** O Firebase Hosting e a CDN do Next.js podem falhar no processamento dinâmico de imagens do bucket Supabase Storage, gerando gargalo de renderização e desperdício de banda.

- 🟡 **P1 (Estrutural): Incoerência na Arquitetura de Diretórios dos Componentes WebGL**
  - **Inconsistência:** Os arquivos da `GhostScene` estão em `src/components/canvas/home/hero/` em vez de `src/components/home/webgl/` conforme estabelecido como Fonte da Verdade na documentação de arquitetura.
  - **Impacto:** Viola a modularidade e o isolamento de features exigidos pela governança Ghost Era.

- 🟡 **P1 (Estrutural): Animação do Indicador Ativo no Header fora da Regra `scaleX`**
  - **Inconsistência:** Em `src/components/layout/header/DesktopFluidHeader.tsx`, o `DesktopNavItem` anima o sublinhado via `width` (`width: 0` vs `width: '100%'`).
  - **Impacto:** Provoca alteração de largura durante a animação e viola a regra de estados ativos com `animate={{ scaleX: isActive ? 1 : 0 }}`.

- 🟡 **P1 (Estrutural): Warning de Depreciação de `three` CommonJS nos Testes**
  - **Inconsistência:** Durante os testes automatizados, o Three.js emite alertas `THREE_CJS_DEPRECATED` devido a `require("three")` em bibliotecas utilitárias.
  - **Impacto:** Alerta sobre riscos de compatibilidade em futuras atualizações da stack React 19 / Next.js 16.

- 🟢 **P2 (Polimento Rápido): Otimização de Animação de Seta em `CategoryStripe.tsx`**
  - **Inconsistência:** Transição do ícone da seta no hover troca a opacidade de dois ícones em vez de animar uma única seta com `translateX` / `translateY`.
  - **Impacto:** Repaint desnecessário e falta de conformidade estrita com o padrão de movimento "Ghost Ease".

- 🟢 **P2 (Polimento Rápido): Proporção Visual do Skeleton em `src/app/sobre/page.tsx`**
  - **Inconsistência:** O `SectionSkeleton` exibe uma caixa estática simples que não espelha fielmente a altura das seções da página Sobre durante a hidratação SSR.
  - **Impacto:** Leve layout shift percepível em conexões muito lentas.

- 🟢 **P2 (Polimento Rápido): Preload de Mídia no Portfolio Hero**
  - **Inconsistência:** Chamadas de `preload` em `src/app/portfolio/page.tsx` realizam preload direto sem checagem de preferencia de dados salvos (`saveData`).
  - **Impacto:** Carga desnecessária de assets de vídeo para usuários mobile em redes restritas.

- 🟢 **P2 (Polimento Rápido): Padding Horizontal do Admin no Mobile (<360px)**
  - **Inconsistência:** A shell da área `/admin` apresenta leve aperto nos cartões de estatística em telas extra pequenas (iPhone SE).
  - **Impacto:** Pequeno ajuste visual sem comprometimento funcional.

- 🟢 **P2 (Polimento Rápido): Tipagem Estrita do Evento `onProjectOpen`**
  - **Inconsistência:** Assinatura do callback em `FeaturedProjectsSection.tsx` utiliza declarações de tipo genéricas.
  - **Impacto:** Otimização para rigor absoluto no sistema de tipos.

- 🟢 **P2 (Polimento Rápido): Captions VTT Nulos em Vídeos Sem Legenda**
  - **Inconsistência:** O componente `ResponsiveVideo` inclui elemento `<track>` com caminho padrão mesmo quando não existem legendas específicas para o projeto.
  - **Impacto:** Log discreto no console do navegador de recurso não encontrado para a faixa VTT padrão.

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar o arquivo dedicado `src/lib/supabase/image-loader.ts` e registrar o custom loader no `next.config.mjs` para otimização de imagem via Supabase Render URLs.
> **Arquivos:** `next.config.mjs`, `src/lib/supabase/image-loader.ts`
> **Ações:**
> 1. Criar o arquivo `src/lib/supabase/image-loader.ts` reexportando o otimizador de URLs do Supabase.
> 2. Configurar o bloco `images` no `next.config.mjs` com `loader: 'custom'` e `loaderFile: './src/lib/supabase/image-loader.ts'`.
> 3. Garantir fallback para URLs locais e domínios externos não-Supabase.
> **Regras:** Preservar `output: 'standalone'` e suporte a Next.js 16. Não quebrar os testes unitários em `test/unit/image-loader.test.ts`.
> **Critérios de Aceite:** O comando `pnpm run build` deve compilar com sucesso e o loader deve ser utilizado na geração de imagens otimizadas.

> **### 🛠️ Prompt #02 — Refatorar Arquitetura WebGL da Home**
> **Objetivo:** Migrar e isolar os componentes 3D/WebGL da Home para a estrutura oficial `src/components/home/webgl/`.
> **Arquivos:** `src/components/canvas/home/hero/*`, `src/components/home/webgl/*`, `src/components/home/hero/HomeHero.tsx`
> **Ações:**
> 1. Mover todos os arquivos R3F de `src/components/canvas/home/hero/` para o novo diretório `src/components/home/webgl/ghost-canvas/`.
> 2. Atualizar todas as importações relativas em `HomeHero.tsx` e componentes relacionados.
> 3. Garantir a utilização de `dynamic()` com `ssr: false` para o wrapper WebGL.
> **Regras:** Manter a propriedade `pointer-events-none` no container e preservar o canvas R3F intacto.
> **Critérios de Aceite:** O projeto deve compilar sem erros de importação e o canvas Ghost WebGL deve renderizar normalmente na Home Hero.

> **### 🛠️ Prompt #03 — Consertar Animação do Estado "Active" no Header**
> **Objetivo:** Substituir a transição de `width` no sublinhado dos links do menu por `scaleX` no `DesktopFluidHeader.tsx`.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:**
> 1. Localizar o sublinhado do componente `DesktopNavItem`.
> 2. Definir a largura base como `w-full` ou `width: '100%'` com `origin-center`.
> 3. Substituir os variants do Framer Motion para utilizar `scaleX: isActive ? 1 : 0` na renderização e transição.
> **Regras:** Seguir estritamente a documentação de animações do Ghost System.
> **Critérios de Aceite:** O indicador ativo deve expandir a partir do centro/origem via transform `scaleX` sem acionar layout shift.

> **### 🛠️ Prompt #04 — Refinar Animação da Seta no CategoryStripe**
> **Objetivo:** Adequar a interatividade da seta no `CategoryStripe.tsx` aos padrões do Ghost System utilizando `translateX`.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:**
> 1. Simplificar o container da seta para usar um único ícone `ArrowUpRight`.
> 2. Aplicar a animação declarativa do Framer Motion `animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}`.
> 3. Remover a alternância dupla de opacidade entre dois ícones sobrepostos.
> **Regras:** Utilizar a curva de transição `GHOST_EASE` para o movimento.
> **Critérios de Aceite:** No hover, o ícone deve deslizar suavemente na diagonal para cima/direita sem piscamento de opacidade.
