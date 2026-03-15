1️⃣ Visão Geral
Estado atual (por página)
Home (src/app/page.tsx)

Estrutura geral bem componentizada por domínio (src/components/home/* + camada WebGL em src/components/canvas/home/*), com separação clara entre UI e cena 3D.

A seção Video Manifesto existe no código como src/components/home/hero/VideoManifesto.tsx, porém está acoplada ao domínio “hero” (junto de HomeHero.tsx, HeroCopy.tsx, etc.), enquanto a documentação a trata como uma seção própria (.context/DOCS-PORTFOLIO-PAGES/01-HOME/03-VIDEO-MANIFESTO). Isso é um sinal real de risco de divergência estrutural (ordem/ancoragem/spacing/scroll triggers).

Forte uso de CSS Modules no Hero (*.module.css), o que tende a aumentar chance de “drift” de tokens quando o DS esperado é Tailwind/tokenizado (depende do que o Ghost DS define).

Sobre (src/app/sobre/page.tsx)

Implementação por seções está bem alinhada ao modelo documentado: existem componentes equivalentes em src/components/sobre/sections/* (ex.: AboutOrigin.tsx, AboutMethod.tsx, AboutWhatIDo.tsx, AboutClosing.tsx) que mapeiam diretamente as seções esperadas em .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/*.

Presença de versão NoSSR para beliefs (AboutBeliefsNoSSR.tsx) indica cuidado com SSR/hidratação quando há comportamento client-only.

Portfolio (src/app/portfolio/page.tsx + src/app/portfolio/PortfolioClient.tsx)

Estrutura completa para grid + cards + modal: src/components/portfolio/ProjectsGallery.tsx, ProjectCard.tsx, PortfolioModal.tsx e variantes em src/components/portfolio/modal/variants.ts, consistente com a documentação de modal e cards (.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/04-PROJECT-CARDS e 05-MODAL).

Existe também rota dinâmica duplicada/alternativa em src/app/projects/[slug]/page.tsx além de src/app/portfolio/[slug]/page.tsx. Isso é um risco objetivo de inconsistência de navegação, canonical URL e abertura de cards/rotas.

Admin (src/app/admin/(auth) + src/app/admin/(protected))

A área Admin está extensiva e aparentemente completa: shell/layout (src/app/admin/(protected)/layout.tsx, src/components/admin/AdminShell.tsx) e páginas equivalentes às doc specs: Trabalhos, Tags, Mídia, Landing Pages, Settings, Copy Agent e Scene Generator.

Forte presença de componentes de CRUD e formulários (ProjectForm.tsx, ProjectsTable.tsx, Asset*, LandingPageForm.tsx) indica implementação madura, mas também aumenta risco de inconsistência visual e responsiva se tokens não forem centralizados.

Resumo executivo (top 10 problemas)
Risco de divergência estrutural Home ↔ Docs: seções documentadas como independentes (ex.: .context/01-HOME/03-VIDEO-MANIFESTO) aparecem implementadas dentro do “hero” (src/components/home/hero/VideoManifesto.tsx).

Rota duplicada de projeto: coexistência de src/app/projects/[slug]/page.tsx e src/app/portfolio/[slug]/page.tsx pode quebrar navegação, SEO/canonical e o fluxo modal ↔ página.

Simetria vertical de cards (regra absoluta): não há garantia estrutural apenas pela árvore de arquivos; é crítico validar e travar comportamento em ProjectCard.tsx + grids (ProjectsGallery.tsx, featured cards).

WebGL/LCP e custo de render no Hero: cena 3D complexa (src/components/canvas/home/hero/GhostScene.tsx ~30KB + shaders) pode impactar mobile (travamento/queda de FPS), afetando LCP/INP.

Cursores avançados (GhostCursor/CustomCursor): alto risco de penalizar mobile e acessibilidade; precisa “feature flag” por input tipo pointer fine e prefers-reduced-motion.

Mix Tailwind + CSS Modules em áreas críticas (hero/header): aumenta superfície de inconsistência com tokens do Ghost DS e dificulta auditoria de UI.

Modal Root/Portal: documentação de modal root existe (.context/01-HOME/09-MODAL-ROOT.md) e há múltiplos modais (home showcase + portfolio). Sem centralização rígida, é comum ocorrer “scroll lock” inconsistente e z-index conflitante.

Scroll management: presença de src/components/layout/SmoothScroll.tsx + src/app/template.tsx sugere possíveis conflitos de scroll restoration do App Router e modais/âncoras.

Landing Pages (Admin) vs Render público: Admin tem editores (src/components/admin/landing-pages/*), e o público tem renderizadores (src/components/portfolio/CaseBodyRenderer.tsx). Necessário garantir paridade de schema/blocks sem “quebrar” posts antigos.

Supabase types e consistência: existe src/lib/supabase.types.ts robusto, mas src/lib/database.types.ts está vazio — risco de drift de tipos/queries se a base evolui.

Matriz por página com status (alto nível)
Legenda: ✅ ok / ⚠️ precisa validação / ❌ problema evidente por estrutura

Critério  Home  Sobre  Portfolio  Admin
1) Estrutura/semântica  ⚠️  ✅  ✅  ✅
2) UI/UX (Ghost DS)  ⚠️  ⚠️  ⚠️  ⚠️
3) Mobile-first  ⚠️  ⚠️  ⚠️  ⚠️
4) Animações (Motion/WebGL)  ✅  ✅  ✅  ⚠️
5) Performance (LCP/WebGL)  ❌  ⚠️  ⚠️  ⚠️
6) Navegação App Router  ⚠️  ✅  ⚠️  ✅
7) Abertura de cards/modais  ⚠️  —  ⚠️  —
8) Landing pages (render)  ⚠️  —  ⚠️  ✅
9) Supabase integração  ⚠️  ⚠️  ✅  ✅
Plano de correção em ciclos (rápido, estrutural, polimento)
Ciclo 1 — Rápido (1–2 dias)

Blindar performance do Hero WebGL (DPR cap, pause offscreen, fallback em mobile).

Desabilitar cursores avançados em touch e respeitar prefers-reduced-motion.

Travar simetria de cards (grid stretch + alturas consistentes).

Ciclo 2 — Estrutural (3–7 dias)

Consolidar rota canônica de projetos (eliminar duplicidade /projects/[slug] vs /portfolio/[slug] ou garantir redirecionamentos + links consistentes).

Centralizar Modal Root/Portal e scroll lock (um único ponto de verdade).

Garantir paridade de schema/blocks entre Admin editor e render público.

Ciclo 3 — Polimento (2–4 dias)

Reduzir mistura de estilos (CSS Modules vs Tailwind) nas áreas que precisam aderência forte ao Ghost DS (sem mudar layout/copy).

Ajustes finos de motion tokens (src/lib/motionTokens.ts, src/components/layout/MotionWrapper.tsx) para fluidez consistente.

2️⃣ Diagnóstico por Seção
Home Hero:

Acertos: separação clara de cena 3D (R3F) em src/components/canvas/home/hero/* e UI em src/components/home/hero/*. Há wrappers indicando preocupação com SSR (GhostSceneWrapper.tsx).

Inconsistências vs docs: o manifesto em vídeo aparece implementado como src/components/home/hero/VideoManifesto.tsx (dentro do “hero”), enquanto a documentação tem pasta/seção própria .context/DOCS-PORTFOLIO-PAGES/01-HOME/03-VIDEO-MANIFESTO. Isso exige validação rigorosa de ordem/offset/scroll e espaçamentos para não descolar do protótipo.

Manifesto:

Acertos: existe implementação explícita (arquivo dedicado) src/components/home/hero/VideoManifesto.tsx e suporte de player em src/components/ui/YouTubePlayer.tsx.

Inconsistências: o acoplamento ao Hero pode criar dependências de layout (CSS Modules do hero) que dificultam manter o manifesto “como seção independente” conforme doc.

Featured Projects:

Acertos: domínio bem separado em src/components/home/featured-projects/* (cards, frames, backgrounds animados, seção).

Ponto crítico: garantir simetria vertical entre FeaturedProjectCard.tsx e CTAProjectCard.tsx na mesma linha/grid (regra absoluta). Isso precisa ser travado no container e no card.

About (Origin / Method / What I Do):

Acertos fortes: mapeamento quase 1:1 com docs via src/components/sobre/sections/AboutOrigin.tsx, AboutMethod.tsx, AboutWhatIDo.tsx e AboutClosing.tsx, coerente com .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/03-ORIGEM-CRIATIVA, 05-COMO-EU-TRABALHO, 04-O-QUE-EU-FACO, 07-FECHAMENTO-CONFIRMACAO.

Risco: beliefs tem NoSSR; validar se isso não quebra o “above the fold” no mobile (hidratação tardia).

Portfolio Grid:

Acertos: pipeline completo de grid → card → modal → slug page (src/components/portfolio/ProjectsGallery.tsx, ProjectCard.tsx, PortfolioModal.tsx, src/app/portfolio/[slug]/page.tsx).

Inconsistências críticas: rota alternativa src/app/projects/[slug]/page.tsx pode estar competindo com o desenho documentado do Portfolio (e com a experiência modal).

Admin (Dashboard / Trabalhos / Mídia):

Acertos: organização sólida e cobertura ampla: src/app/admin/(protected)/* com shell e páginas; componentes dedicados (AdminShell.tsx, ProjectsTable.tsx, ProjectForm.tsx, AssetGallery.tsx, AssetForm.tsx).

Ponto crítico: garantir responsividade e consistência visual (Ghost DS) no sidebar.tsx e no shell, sem drift entre páginas (Dashboard/Trabalhos/Mídia/Landing Pages).

3️⃣ Lista de Problemas (Backlog Priorizado)
🔴 P0 (Crítico)
Risco de travamento/perda de FPS no WebGL do Hero

Arquivos-alvo: src/components/canvas/home/hero/GhostScene.tsx, src/components/canvas/home/hero/GhostSceneWrapper.tsx, shaders em src/components/canvas/shaders/hero/*.

Conflito de rota canônica de projeto (/projects/[slug] vs /portfolio/[slug]) com impacto direto em abrir páginas/cards e SEO

Arquivos-alvo: src/app/projects/[slug]/page.tsx, src/app/portfolio/[slug]/page.tsx, cards que geram links.

Modal Root/scroll lock inconsistente (risco alto por múltiplos modais e docs dedicadas de modal root)

Arquivos-alvo: src/components/portfolio/PortfolioModal.tsx, src/app/layout.tsx, src/app/template.tsx.

🟡 P1 (Importante)
Simetria vertical de cards não garantida estruturalmente (Portfolio + Featured)

Arquivos-alvo: src/components/portfolio/ProjectCard.tsx, src/components/portfolio/ProjectsGallery.tsx, src/components/home/featured-projects/*.

Manifesto acoplado ao Hero vs documentação por seção (risco de offsets e composição divergirem do protótipo)

Arquivos-alvo: src/components/home/hero/VideoManifesto.tsx, src/components/home/hero/HomeHero.tsx, src/app/page.tsx.

Cursor avançado em mobile / acessibilidade

Arquivos-alvo: src/components/GhostCursor.tsx, src/components/ui/CustomCursor.tsx.

SmoothScroll vs scroll restoration do App Router

Arquivos-alvo: src/components/layout/SmoothScroll.tsx, src/app/template.tsx.

🟢 P2 (Polimento)
Drift de UI tokens por mistura Tailwind + CSS Modules em áreas core (hero/header)

Arquivos-alvo: src/components/home/hero/*.module.css, src/components/layout/header/*.module.css.

Types drift (database.types.ts vazio)

Arquivos-alvo: src/lib/database.types.ts, src/lib/supabase.types.ts.

Paridade editor (Admin) ↔ render público de Landing Pages/Blocks (ajustes finos)

Arquivos-alvo: src/components/admin/landing-pages/*, src/components/portfolio/CaseBodyRenderer.tsx.

4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)
### 🛠️ Prompt #01 — Consolidar rota canônica de projetos (Portfolio vs Projects) Objetivo: Garantir que todas as aberturas de projeto (cards, modais e páginas) usem uma única rota canônica (conforme documentação do Portfolio), eliminando comportamento divergente entre /projects/[slug] e /portfolio/[slug].
Arquivos: src/app/projects/[slug]/page.tsx, src/app/portfolio/[slug]/page.tsx, src/components/portfolio/ProjectCard.tsx, src/components/home/featured-projects/FeaturedProjectCard.tsx
Ações:

Identificar qual rota está documentada como canônica em .context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/06-PROJETO-SLUG.

Ajustar os links gerados pelos cards para apontarem somente para a rota canônica.

Se a rota “não canônica” precisar existir, implementar redirecionamento/forward consistente (sem alterar copy).
Regras: App Router, não alterar textos, respeitar protótipo, sem criar novas seções/layout.
Critérios de Aceite:

Abrir um card sempre leva ao mesmo padrão de URL e comportamento (modal/página) em desktop e mobile.

Back/forward do navegador funciona sem quebrar estado do modal/página.

### 🛠️ Prompt #02 — Garantir Modal Root único e consistente (Home + Portfolio) Objetivo: Centralizar a infraestrutura de modal/portal/scroll-lock para evitar conflitos de z-index e “scroll preso”, seguindo .context/DOCS-PORTFOLIO-PAGES/01-HOME/09-MODAL-ROOT.md.
Arquivos: src/app/layout.tsx, src/app/template.tsx, src/components/portfolio/PortfolioModal.tsx, src/components/home/portfolio-showcase/PortfolioShowcase.tsx
Ações:

Auditar onde o portal/modal root é montado hoje (layout/template/client layout).

Garantir um único ponto de montagem do modal root e padronizar scroll lock/unlock.

Validar empilhamento (z-index) e foco/escape/fechar ao navegar.
Regras: Tailwind/CSS atual, não mudar textos, manter layout do protótipo, mesma altura de cards não pode ser afetada por abertura de modal.
Critérios de Aceite:

Modal abre/fecha sem “layout shift”.

Scroll do body é bloqueado/desbloqueado corretamente.

ESC fecha modal; clique fora fecha se documentado; foco não “vaza”.

### 🛠️ Prompt #03 — Travar simetria vertical dos cards no Portfolio Grid Objetivo: Garantir que todos os cards em uma mesma linha do grid tenham sempre a mesma altura, independentemente do conteúdo interno.
Arquivos: src/components/portfolio/ProjectsGallery.tsx, src/components/portfolio/ProjectCard.tsx, src/app/portfolio/PortfolioClient.tsx
Ações:

Ajustar o container de grid para items-stretch / grid-auto-rows coerente.

Ajustar o card para h-full + layout interno flex flex-col com áreas que “crescem” controladas.

Validar em breakpoints mobile/tablet/desktop conforme imagens de referência em .context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/PORTFOLIO-MOBILE.jpg.
Regras: Mobile-first, não alterar textos, manter layout do protótipo, mesma altura vertical é obrigatória.
Critérios de Aceite:

Cards na mesma linha mantêm altura idêntica em todas as resoluções.

Não há overflow inesperado nem quebra do CTA.

### 🛠️ Prompt #04 — Travar simetria vertical dos cards em Featured Projects (Home) Objetivo: Garantir que FeaturedProjectCard e variações (ex.: card de CTA) respeitem altura uniforme na mesma linha/stack.
Arquivos: src/components/home/featured-projects/FeaturedProjectsSection.tsx, src/components/home/featured-projects/FeaturedProjectCard.tsx, src/components/home/featured-projects/CTAProjectCard.tsx
Ações:

Garantir que o layout do container use stretch e que os cards usem h-full.

Padronizar estrutura interna (header/body/footer) para que títulos longos não alterem altura global.

Validar no layout Home Desktop/Mobile documentado (.context/DOCS-PORTFOLIO-PAGES/01-HOME/HOME-DESKTOP.jpg e HOME-MOBILE.jpg).
Regras: Não mudar copy, não mudar layout, mesma altura vertical obrigatória.
Critérios de Aceite:

Em qualquer breakpoint, cards paralelos têm altura idêntica.

### 🛠️ Prompt #05 — Otimizar WebGL do Hero (DPR cap + pause offscreen + fallback mobile) Objetivo: Evitar travamento e reduzir custo de render no Hero 3D, preservando o visual documentado (sem alterar design).
Arquivos: src/components/canvas/home/hero/GhostScene.tsx, src/components/canvas/home/hero/GhostSceneWrapper.tsx, src/components/canvas/shaders/hero/*
Ações:

Implementar cap de DPR e/ou estratégia de qualidade adaptativa (device memory / width / prefers-reduced-motion).

Pausar render/animações quando a cena estiver fora do viewport (IntersectionObserver) e retomar ao entrar.

Garantir fallback (sem WebGL pesado) em mobile low-end/touch, mantendo composição visual equivalente ao protótipo.
Regras: Não mudar layout/copy, manter estética do protótipo, foco em performance.
Critérios de Aceite:

Hero não derruba FPS no mobile.

Sem “jank” ao rolar a Home.

Sem erros de contexto WebGL na navegação entre páginas.

### 🛠️ Prompt #06 — Desabilitar GhostCursor/CustomCursor em touch e respeitar Reduced Motion Objetivo: Evitar custo desnecessário e problemas de acessibilidade em dispositivos touch, mantendo o cursor ghost apenas onde faz sentido.
Arquivos: src/components/GhostCursor.tsx, src/components/ui/CustomCursor.tsx
Ações:

Detectar pointer: fine e hover: hover antes de montar o cursor.

Respeitar prefers-reduced-motion: reduce para reduzir/zerar animações do cursor.

Garantir que o cursor não intercepte cliques (pointer-events) e não cause reflows.
Regras: Não mudar textos, não mudar layout.
Critérios de Aceite:

Mobile não renderiza cursor avançado.

Desktop mantém efeito conforme protótipo.

### 🛠️ Prompt #07 — Alinhar seção Video Manifesto com a doc de seção independente Objetivo: Garantir que a composição/ordem/espaçamentos da seção Manifesto (vídeo) correspondam exatamente ao que está em .context/DOCS-PORTFOLIO-PAGES/01-HOME/03-VIDEO-MANIFESTO, mesmo que o código esteja no domínio do hero hoje.
Arquivos: src/app/page.tsx, src/components/home/hero/VideoManifesto.tsx, src/components/home/hero/HomeHero.tsx
Ações:

Comparar a doc e o protótipo com a composição atual do page.tsx (ordem e “section wrappers”).

Se necessário, desacoplar a renderização do manifesto do “hero wrapper” (sem alterar layout final).

Validar anchors/scroll e comportamento mobile/desktop conforme imagens de referência Home.
Regras: Não alterar copy, não reinventar layout, seguir protótipo como verdade absoluta.
Critérios de Aceite:

A seção manifesto ocupa o mesmo espaço/posição do protótipo.

Não “puxa” estilos colaterais do hero que alterem o manifesto.

### 🛠️ Prompt #08 — Corrigir scroll restoration e compatibilidade do SmoothScroll com App Router Objetivo: Garantir que navegação entre páginas e abertura/fechamento de modais não gere scroll inconsistente.
Arquivos: src/components/layout/SmoothScroll.tsx, src/app/template.tsx, src/components/layout/MotionWrapper.tsx
Ações:

Auditar como SmoothScroll intercepta scroll e como o App Router restaura posição.

Garantir que ao navegar para /portfolio/[slug] e voltar, o scroll retorne corretamente.

Garantir que ao abrir/fechar modal, o scroll do background não “salte”.
Regras: Mobile-first, não mudar layout/copy.
Critérios de Aceite:

Back/forward restaura scroll corretamente.

Modal não cria “jump” de scroll.

### 🛠️ Prompt #09 — Garantir uso consistente do loader de imagem Supabase (LCP) Objetivo: Reduzir LCP e padronizar carregamento de imagens vindas do Supabase Storage, garantindo que next/image use o loader/proxy correto (sem alterar mídia).
Arquivos: src/lib/supabase/image-loader.ts, src/lib/supabase/supabase-image-loader.js, src/components/portfolio/ProjectCard.tsx, src/components/portfolio/ImageLightbox.tsx, src/components/home/featured-projects/FeaturedProjectCardFrame.tsx
Ações:

Auditar todos os pontos onde imagens de projetos são renderizadas (cards, modais, slug).

Garantir que o loader configurado seja usado e que existam tamanhos responsivos corretos.

Ajustar priority apenas onde for documentado como acima da dobra (sem mudar layout).
Regras: Não alterar conteúdo visual, não mudar textos.
Critérios de Aceite:

LCP melhora (principalmente Home/Portfolio).

Sem imagens estourando layout em mobile.

### 🛠️ Prompt #10 — Validar paridade Editor (Admin) ↔ Render público de Landing Pages/Blocks Objetivo: Garantir que landing pages criadas no Admin renderizem corretamente no público, com schema/blocks compatíveis entre versões (V1/V2/V3), sem quebrar posts existentes.
Arquivos: src/components/admin/landing-pages/*, src/components/admin/templates/*, src/components/portfolio/CaseBodyRenderer.tsx, src/app/portfolio/[slug]/page.tsx
Ações:

Ler .context/DOCS-PORTFOLIO-PAGES/04-ADMIN/07-LANDING-PAGES.md e confirmar schema/blocks esperados.

Garantir que o renderer público suporte os mesmos blocos e propriedades que o editor grava.

Validar fallback “projeto sem landing page” conforme doc POP-UP DE PROJETO (SEM LANDING PAGE).md.
Regras: Não alterar copy, seguir protótipo e docs como verdade absoluta.
Critérios de Aceite:

Landing page publicada no Admin aparece idêntica no público.

Projeto sem landing page cai no fluxo correto (modal/página) sem quebra.

### 🛠️ Prompt #11 — Auditoria de proteção do Admin Shell e fluxo de autenticação Objetivo: Garantir que rotas em (protected) sejam inacessíveis sem auth e que login/reset funcionem sem loops ou flashes de conteúdo.
Arquivos: src/app/admin/(protected)/layout.tsx, src/app/admin/(auth)/login/page.tsx, src/app/admin/(auth)/reset-password/page.tsx, src/components/admin/AdminShell.tsx, src/lib/supabase/auth-actions.ts
Ações:

Confirmar o gate de auth no layout protegido e o comportamento de redirect.

Validar estados de loading/erro sem layout shift (Ghost DS).

Garantir que o usuário autenticado não acesse telas de auth indevidamente (redirect).
Regras: Não alterar textos, não alterar layout do protótipo.
Critérios de Aceite:

Acesso direto a /admin/(protected) redireciona corretamente.

Login e reset-password funcionam e mostram feedback consistente.

### 🛠️ Prompt #12 — Reconciliar tokens de Header/Mobile Staggered Menu com a documentação Objetivo: Garantir que o menu mobile escalonado (staggered) esteja fiel às tasks e docs da Admin e ao Ghost DS, sem mexer no conteúdo textual.
Arquivos: src/components/layout/header/MobileStaggeredMenu.tsx, src/components/layout/header/SiteHeader.tsx, src/components/layout/header/headerTokens.ts, .context/DOCS-PORTFOLIO-PAGES/04-ADMIN/15-TASK-02-MOBILE-STAGGERED-MENU.md
Ações:

Comparar animações (timing/stagger/curvas) com o que está documentado.

Validar responsividade e comportamento de abertura/fechamento sem travar scroll.

Garantir acessibilidade: foco, ESC, aria onde aplicável.
Regras: Mobile-first, não alterar textos, seguir protótipo.
Critérios de Aceite:

Menu abre/fecha fluido em devices reais.

Sem deslocamentos inesperados e sem cortes de layout.
