### 1️⃣ Visão Geral
A auditoria semanal automatizada do repositório varreu minuciosamente as árvores de arquivos em `src/app` e `src/components`, cobrindo as três páginas públicas principais (Home, Sobre, Portfólio) e a área restrita Admin. A avaliação técnica foi confrontada diretamente com as especificações canônicas contidas em `.context/DOCS-PORTFOLIO-PAGES/` e no Master Governance Protocol (`AGENTS.md`).

A arquitetura geral do Next.js App Router (React 19, TypeScript strict mode, Tailwind CSS v4) demonstra sólida maturidade estrutural e tipagem consistente. O roteamento no cliente é protegido por instâncias de `MotionLink` para evitar recarregamentos desnecessários de página (SPA). No entanto, foram detectadas não-conformidades críticas e estruturais:
1. **Performance e Carregamento de Mídia:** Ausência da implementação do Custom Image Loader do Supabase (`src/lib/supabase/image-loader.ts`), expondo a infraestrutura do Firebase Hosting a potenciais sobrecargas e quebras de otimização de imagens estáticas e dinâmicas.
2. **Modularidade WebGL/3D:** Componentes de renderização R3F da Home Scene continuam alocados sob `src/components/canvas/home/hero/`, violando a regra arquitetural estrita que determina sua permanência em `src/components/home/webgl/ghost-canvas/`.
3. **Fidelidade de Animação e Microinterações:** No componente `DesktopFluidHeader`, o sublinhado indicador de navegação ativa ainda é controlado por mutação direta de largura (`width`) via CSS, ao invés da transformação de hardware recomendada `scaleX: isActive ? 1 : 0`. No `CategoryStripe` (Portfolio Showcase), a transição da seta utiliza troca de opacidade de ícones duplicados em vez do deslizamento com `translateX(4px)` governado por `GHOST_EASE`.
4. **Alinhamento Vertical de Cards (Bento Grid):** A conformidade de altura vertical dos cards do Bento Grid em `FeaturedProjectsSection.tsx` está assegurada via classes de extensão total (`col-span-4 flex h-full min-h-0 w-full self-stretch`), garantindo uniformidade geométrica em cada linha da grade no desktop.

---

### 2️⃣ Diagnóstico por Seção

- **Home Hero:**
  - **Hierarquia Visual e Z-Index:** A pilha de sobreposição respeita a especificação (Preloader `z-50`, Thumbnail/Vídeo `z-30`, Canvas WebGL `z-20`, Bloco Editorial `z-10`, Fundo `z-0`), com `pointer-events-none` aplicado na camada 3D para preservar a interatividade dos textos e CTAs.
  - **Inconsistência Arquitetural:** Os módulos R3F (`GhostScene.tsx`, `GhostSceneWrapper.tsx`, shaders e hooks) residem em `src/components/canvas/home/hero/`. A SSoT exige sua organização modular sob `src/components/home/webgl/ghost-canvas/`.

- **Manifesto:**
  - **Controle e Estado de Mídia:** O componente `VideoManifesto.tsx` e o wrapper `ResponsiveVideo` mantêm lógica adequada de autoplay silenciado e poster seguro.
  - **Transição e Sincronia de Áudio:** No desktop, a transição entre o estado de thumbnail flutuante e a expansão para fullscreen com desbloqueio temporário de áudio (2s hold) carece de um state machine explícito e imutável para prevenir race conditions durante eventos concorrentes de scroll via roda do mouse ou trackpad.

- **Featured Projects:**
  - **Estrutura de Grade e Altura:** Utiliza grid de 12 colunas do Tailwind (Row 1: 5 col + 7 col; Row 2: 12 col; Row 3: 8 col + 4 col). Todos os cards irmãos mantêm rigorosamente a mesma altura vertical via aplicação de `h-full min-h-0 self-stretch` nos contêineres e nos componentes `FeaturedProjectCard` e `CTAProjectCard`.
  - **Inconsistência de Interação:** O card de conversão (`CTAProjectCard.tsx`) não altera dinamicamente a cor da manchete para o tom Ghost Blue (`#0057FF`) ao sofrer hover do mouse, em desacordo com as diretrizes do Bento Grid.

- **About (Origin/Method/What I Do):**
  - **Semântica e Responsividade:** A página Sobre (`src/app/sobre/page.tsx`) e suas subseções (`OriginSection`, `BeliefsClimaxSection`, `AboutWhatIDo`) seguem a paleta cromática Ghost e tipografia fluida via escala modular.
  - **Inconsistência:** O subcomponente `OriginComponents.tsx` contém variáveis não utilizadas e valores estáticos de opacidade em propriedades inline que deveriam ser unificadas via tokens de Tailwind e curvas declarativas do `GHOST_EASE`.

- **Portfolio Grid:**
  - **Visualização e Integridade:** O grid geral de projetos (`ProjectsGallery.tsx` e `PortfolioHeroNew.tsx`) adere à classe utilitária `.std-grid`. A renderização de projetos dinâmicos e landing pages com ALPA V3 em `/portfolio/[slug]` preserva os metadados de cliente, tags de categoria e visualização de mídia.
  - **Inconsistência no Showcase:** Em `CategoryStripe.tsx`, a transição de rotação/movimento da seta interativa recorre à sobreposição de `ArrowUpRight` e `ArrowUp` com `opacity: 0 / 1`, violando o padrão de transição suave baseado em translação horizontal (`translateX: 4px`).

---

### 3️⃣ Lista de Problemas e Backlog Priorizado

- 🔴 **P0 (Crítico): Ausência do Supabase Custom Image Loader (`src/lib/supabase/image-loader.ts`).**
  O projeto referencia a otimização de URLs do Supabase Storage via `/render/image/public`, mas a função loader dedicada não está presente no caminho canônico nem declarada em `next.config.mjs`, o que compromete o build e a eficiência de entrega no Firebase Hosting.

- 🔴 **P0 (Crítico): Race Condition de Áudio na Expansão do Manifesto Hero.**
  A máquina de estados para transição de áudio (silenciado -> ativado por 2s em fullscreen -> silenciado na rolagem) no desktop pode falhar caso haja rolagem rápida, disparando reprodução de som indevida fora do viewport.

- 🟡 **P1 (Estrutural): Violação da Estrutura de Diretórios WebGL da Home.**
  Os arquivos de Three.js / R3F da Home continuam localizados em `src/components/canvas/home/hero/` em vez de `src/components/home/webgl/ghost-canvas/`, violando o contrato de arquitetura estabelecido no `AGENTS.md`.

- 🟡 **P1 (Estrutural): Animação do Indicador Ativo no Header Baseada em Mudança de Largura (Width-based).**
  Em `src/components/layout/header/DesktopFluidHeader.tsx`, o pseudo-sublinhado é animado com variação de `width: 0 -> 100%`, gerando recálculos de layout. A especificação obriga o uso de `animate={{ scaleX: isActive ? 1 : 0 }}` com ponto de origem fixo.

- 🟡 **P1 (Estrutural): Microinteração Incompatível da Seta em `CategoryStripe.tsx`.**
  O elemento visual de seta no Portfolio Showcase utiliza dois ícones com crossfade de opacidade, em vez de animar uma única seta com translação horizontal de 4px (`translateX`) regulada pelo token `GHOST_EASE`.

- 🟡 **P1 (Estrutural): Ausência de Transição Cromática no Hover de `CTAProjectCard.tsx`.**
  O texto da chamada no card CTA do Bento Grid não transiciona para `#0057FF` ao receber hover, descumprindo a especificação de microinteração visual.

- 🟢 **P2 (Polimento Rápido): Avisos de Variáveis e Tokens Não Utilizados em QR Scanner e Origin.**
  Componentes em `src/app/qr-scanner/components/QRScanner.tsx` e `src/components/sobre/origin/` apresentam 9 avisos de linter ESLint relacionados a constantes e argumentos não utilizados.

- 🟢 **P2 (Polimento Rápido): Padronização de Classes Inline em `OriginComponents.tsx`.**
  Eliminar classes e estilos inline arbitrários na seção Sobre, substituindo-os pelas variáveis canônicas do Tailwind CSS v4 e tokens de opacidade.

- 🟢 **P2 (Polimento Rápido): Otimização de Imagens Locais do Header.**
  Em `DesktopFluidHeader.tsx`, o logo SVG está configurado com a propriedade `unoptimized`, podendo usufruir da resolução padronizada de largura e altura sem bypass do pipeline de imagem.

- 🟢 **P2 (Polimento Rápido): Unificação de Metadados de Mídia em `constants.tsx`.**
  Assegurar consistência estrita entre `thumbnailUrl` (vídeo/animação) e `posterUrl` (imagem estática para fallback), prevenindo chamadas cruzadas em componentes de visualização rápida.

---

### 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Setup Custom Image Loader (Supabase/Firebase)**
> **Objetivo:** Criar e configurar o loader customizado de imagens do Supabase para viabilizar otimização de imagens no Firebase Hosting sem o endpoint padrão `/_next/image`.
> **Arquivos:** `src/lib/supabase/image-loader.ts`, `next.config.mjs`, `test/unit/image-loader.test.ts`
> **Ações:**
> 1. Criar o arquivo `src/lib/supabase/image-loader.ts` implementando a transformação de URLs padrão do Supabase Storage (`/object/public/`) para URLs otimizadas do renderizador (`/render/image/public/`) com suporte a parâmetros de `width`, `quality` e formato `webp`.
> 2. Atualizar `next.config.mjs` adicionando a configuração `images: { loader: 'custom', loaderFile: './src/lib/supabase/image-loader.ts' }`.
> 3. Atualizar os testes unitários em `test/unit/image-loader.test.ts` para importar e validar a implementação canônica.
> **Regras:** Manter retorno íntegro de URLs externas não pertencentes ao Supabase e caminhos locais estáticos; respeitar Mobile-first e orçamentos de performance do Ghost System.
> **Critérios de Aceite:** `pnpm run build-check` e `pnpm test` passam com 100% de sucesso e o Next Image gera URLs otimizadas para o bucket Supabase.

> **### 🛠️ Prompt #02 — Refatorar Arquitetura WebGL da Home**
> **Objetivo:** Reorganizar a estrutura de arquivos dos componentes 3D/R3F da Home para atender às diretrizes do `AGENTS.md`.
> **Arquivos:** `src/components/home/hero/HomeHero.tsx`, `src/components/canvas/home/hero/*`, `src/components/home/webgl/ghost-canvas/*`
> **Ações:**
> 1. Mover os arquivos de `src/components/canvas/home/hero/` (`GhostScene.tsx`, `GhostSceneWrapper.tsx`, shaders, hooks, types e utils) para `src/components/home/webgl/ghost-canvas/`.
> 2. Atualizar todos os caminhos de importação no componente `HomeHero.tsx` e em seus testes associados (`test/components/canvas/home/GhostSceneWrapper.test.tsx`).
> 3. Manter o wrapper com importação dinâmica (`ssr: false`) e fallback via `Suspense`.
> **Regras:** Não alterar shaders nem lógica de renderização WebGL; manter integridade de imports com alias `@/`.
> **Critérios de Aceite:** Compilação do TypeScript (`pnpm run typecheck`) e testes executados sem erros de resolução de módulos.

> **### 🛠️ Prompt #03 — Consertar Animação do Estado Active no Header**
> **Objetivo:** Substituir a animação de `width` pelo uso de `scaleX` no indicador de aba ativa para prevenir repaints desnecessários.
> **Arquivos:** `src/components/layout/header/DesktopFluidHeader.tsx`
> **Ações:**
> 1. Localizar o componente `DesktopNavItem` e o elemento `<m.span>` de sublinhado indicador.
> 2. Modificar as propriedades de animação do Framer Motion para utilizar `style={{ originX: 0.5 }}` e `variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 }, active: { scaleX: 1 } }}` com `w-full` fixo em vez de manipular a propriedade `width`.
> 3. Aplicar a curva de transição `GHOST_EASE` e respeitar o sinalizador `reducedMotion`.
> **Regras:** Utilizar transformações de aceleração gráfica por hardware; nenhuma alteração de layout shift (CLS < 0.01).
> **Critérios de Aceite:** A transição do indicador ocorre via escala horizontal suave e nenhum teste de regressão do Header falha.

> **### 🛠️ Prompt #04 — Padronizar Animação da Seta em CategoryStripe**
> **Objetivo:** Adequar a seta do Portfolio Showcase aos princípios Ghost System usando translação horizontal pura.
> **Arquivos:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
> **Ações:**
> 1. Remover a estrutura com dois ícones sobrepostos (`ArrowUpRight` e `ArrowUp`) e manter um único ícone `ArrowUpRight` no botão circular.
> 2. Aplicar a animação declarativa do Framer Motion `animate={{ x: isHovered ? 4 : 0 }}` associada ao token de easing `GHOST_EASE`.
> 3. Preservar o diâmetro mínimo de toque (48x48px) no layout mobile.
> **Regras:** Respeitar Mobile-first; manter total aderência ao token `MOTION_TOKENS.duration.modal`.
> **Critérios de Aceite:** Em telas desktop, a seta desloca suavemente 4px para a direita no hover; em dispositivos móveis, o botão responde ao toque sem anomalias visuais.

> **### 🛠️ Prompt #05 — Efeito de Cor no Hover de CTAProjectCard**
> **Objetivo:** Adicionar o realce cromático Ghost Blue no texto da chamada no card final do Bento Grid.
> **Arquivos:** `src/components/home/featured-projects/CTAProjectCard.tsx`
> **Ações:**
> 1. Localizar a manchete "Like what you see?" no componente `CTAProjectCard.tsx`.
> 2. Injetar a classe utilitária de transição `group-hover:text-bluePrimary` com duração `duration-fast` e easing `ease-ghost`.
> 3. Verificar se o fundo e os botões mantêm o contraste acessível WCAG AA.
> **Regras:** Não alterar a estrutura flex/grid nem as dimensões do card para manter o alinhamento de altura com os cards adjacentes.
> **Critérios de Aceite:** Ao pairar o mouse sobre o container do CTA, o texto do título assume a cor `#0048ff` / `text-bluePrimary`.
