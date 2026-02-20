🕵️ Auditoria Técnica e Plano de Execução V2 — Portfolio Danilo (Next.js + R3F + Ghost DS)
Regras-mãe (sempre):

❌ NÃO alterar nenhum conteúdo textual.

❌ NÃO mudar a ordem das seções.

✅ MOBILE-FIRST (24px mobile / 64px desktop).

✅ Respeitar prefers-reduced-motion (Framer Motion: useReducedMotion / MotionConfig reducedMotion="user").

✅ Manter performance Lighthouse > 90 (principalmente Home + 3D).

✅ A referência visual dos docs em .context/DOCS-PORTFOLIO-PAGES/** é lei.

✅ Workflow recomendado (para agente Copilot/autônomo)
Abrir o par de imagens de referência Desktop/Mobile dentro do doc da sessão (ex.: .context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME/02-HERO-HOME-DESKTOP.jpg).

Abrir o componente/rota responsável (paths sugeridos nos prompts abaixo).

Ajustar layout primeiro (grid/spacing/z-index), depois motion, depois dados (Supabase), depois perf.

Validar em:

Mobile (base) + Desktop (md:).

prefers-reduced-motion: reduce.

60fps (principalmente Hero 3D e Beliefs 3D).

🏠 HOME
🛠️ Prompt #01 — Header (Glass + Pixel-perfect)
Objetivo:
Garantir fidelidade total ao documento 01-HEADER.md.

Ações:

Auditar o Header no desktop (comportamento “glass”) e garantir backdrop-blur + camada translúcida + borda sutil conforme 01-HEADER-DESKTOP.jpg.
Arquivos-alvo prováveis:

src/components/layout/header/SiteHeader.tsx

src/components/layout/header/DesktopFluidHeader.tsx

src/components/layout/header/DesktopFluidHeader.module.css

Validar o Header no mobile conforme 01-HEADER-MOBILE.jpg (menu, alinhamento, espaçamentos e alturas).

Garantir que o Header fique acima do Hero/Canvas (z-index consistente), sem “pular” em scroll e sem bloquear interação no conteúdo abaixo.

Regras:

❌ NÃO alterar conteúdo textual.

✅ Usar Tailwind e/ou CSS module existente (sem reinventar).

✅ Mobile-first: px-6 no mobile e md:px-16 no desktop.

🛠️ Prompt #02 — Home Hero (camadas + z-index do copy)
Objetivo:
Garantir fidelidade total ao documento 02-HERO-HOME.md (02-HERO.md) e às imagens HOME-DESKTOP.jpg / HOME-MOBILE.jpg.

Ações:

Ajustar HeroCopy.tsx para garantir que o bloco de copy/CTAs tenha z-index: 50 acima do Canvas 3D, mantendo o texto sempre legível sobre o 3D.
Arquivo-alvo: src/components/home/hero/HeroCopy.tsx.

Revisar o stacking context do Hero completo (HomeHero.tsx), garantindo a ordem:
background → Canvas (Ghost3D/GhostAura) → overlays (gradientes, auras) → copy/CTA.
Ajustar position/z-index com Tailwind/CSS module para evitar overdraw do 3D sobre o texto em resoluções intermediárias.

Auditar performance da cena R3F no Hero (src/components/home/hero/HomeHero.tsx + src/components/canvas/**):

Controlar dpr em mobile (<Canvas dpr={[1, 1.5]}> ou hook adaptativo)

Evitar pós-processamento pesado em devices fracos

Garantir que usePerformanceAdaptive (se usado) esteja integrado à cena para manter 60fps quando possível.

Regras:

❌ Não alterar textos do Hero.

✅ Tailwind para z-50/relative/absolute conforme necessário.

✅ Sem escalas agressivas no motion (Ghost Motion: opacity/transform suaves).

🛠️ Prompt #03 — Video Manifesto (overlay + contraste AAA)
Objetivo:
Garantir fidelidade total ao documento 03-VIDEO-MANIFESTO.md.

Ações:

No componente VideoManifesto.tsx, ajustar a camada de overlay que fica sobre o vídeo para utilizar bg-background/80 (ou equivalente no tema) garantindo contraste AAA com o texto branco #fcffff.
Arquivo-alvo: src/components/home/hero/VideoManifesto.tsx.

Validar atributos de acessibilidade do <video>:

playsInline para evitar fullscreen automático em mobile

muted se houver autoplay

controls conforme especificado no .md

track de legendas, apontando para arquivos em public/captions/** se existirem.

Revisar a ordem de camadas e eventos:

Garantir que o overlay não bloqueie interações indevidas (usar pointer-events-none para camadas puramente visuais)

Garantir que CTAs e controles do vídeo sejam facilmente clicáveis em mobile, com área mínima de toque adequada.

Regras:

❌ Não alterar textos.

✅ Usar Tailwind.

✅ Validar mobile primeiro.

🛠️ Prompt #04 — Portfolio Showcase (scroll + microinterações)
Objetivo:
Garantir fidelidade total ao documento 04-PORTFOLIO-SHOWCASE.md.

Ações:

Mapear a seção de showcase de portfólio na Home e garantir:

Container com px-6 md:px-16

Gaps/hierarquia de cards (imagem, título, tags) seguindo o layout do doc.

Ajustar microinterações (hover/focus) para o padrão Ghost:

Evitar whileHover={{ scale: 1.05 }} ou similares

Preferir whileHover={{ opacity: 0.9, y: -2 }} com transition curta e suave.

Ativar lazy-loading de imagens e componentes pesados:

Utilizar next/image com loading="lazy" onde possível

Garantir que o carregamento não cause CLS perceptível (definir width/height/aspect-ratio).

Regras:

❌ Não alterar textos.

✅ Tailwind + Framer Motion.

✅ Garantir foco visível (acessibilidade).

🛠️ Prompt #05 — Featured Projects (dados Supabase + render estável)
Objetivo:
Garantir fidelidade total ao documento 05-FEATURED-PROJECTS.md.

Ações:

Auditar a leitura de projetos em destaque:

Verificar client Supabase em src/lib/** e componentes em src/components/home/featured-projects/**

Confirmar filtros/flags para “featured” conforme o esquema do DB.

Implementar estados de carregamento:

Exibir skeletons placeholders nos cards enquanto dados do Supabase são carregados

Garantir que o layout final não “salte” ao receber os dados (mesmas dimensões dos placeholders).

Implementar fallback:

Quando a query falhar ou não houver projetos, mostrar estado vazio alinhado ao .md (sem mudar textos), evitando erros de render.

Regras:

❌ Não alterar textos.

✅ Manter fetch no server quando possível (evitar expor chaves).

✅ Lighthouse > 90.

🛠️ Prompt #06 — Clients/Brands (marcas + layout contínuo)
Objetivo:
Garantir fidelidade total ao documento 06-CLIENTS-BRANDS.md.

Ações:

Ajustar layout das marcas em src/components/home/clients/**:

Garantir espaçamentos horizontais/verticais conforme mock Desktop/Mobile

Evitar logos muito pequenos ou desproporcionais.

Otimizar logos:

Usar next/image com dimensões explícitas

Ativar loading="lazy" e formatos otimizados (WebP/AVIF) quando disponível.

Microinterações Ghost:

Aplicar animação de entrada com opacity + y leve

Evitar scale agressivo no hover e garantir focus visível em itens clicáveis.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

🛠️ Prompt #07 — Contact (contraste + foco + autoComplete)
Objetivo:
Garantir fidelidade total ao documento 07-CONTACT.md.

Ações:

Revisar formulário de contato (provavelmente em src/components/home/contact/**):

Checar contraste entre labels, inputs, bordas e background escuro

Ajustar cores/espessura de borda e background dos campos conforme doc.

Configurar autoComplete:

Ex.: name, email, tel, organization, conforme o campo

Garantir que o browser ofereça preenchimento automático adequado.

Estados do formulário:

Loading: indicar claramente feedback visual ao enviar

Success/Error: aplicar estilos diferenciados sem alterar o texto de feedback definido nos docs.

Regras:

❌ Não alterar textos.

✅ Acessibilidade obrigatória.

🛠️ Prompt #08 — Footer (estrutura + links + spacing)
Objetivo:
Garantir fidelidade total aos documentos 08-FOOTER / 10-FOOTER.md.

Ações:

Validar estrutura do SiteFooter.tsx:

Colunas e grupos de links batendo com o layout de referência

Espaçamentos verticais/horizontais alinhados aos tokens Ghost.

Links:

Adicionar rel="noopener noreferrer" para links externos

Garantir :focus-visible claro (outline/ring).

Responsividade:

Evitar overflow horizontal em mobile

Garantir que a ordem visual em mobile siga o doc (sem inversões indevidas).

Regras:

❌ Não alterar textos.

✅ Mobile-first.

👤 SOBRE
🛠️ Prompt #09 — Hero Manifesto (Sobre)
Objetivo:
Garantir fidelidade total ao documento 02-HERO-MANIFESTO.md.

Ações:

Em src/components/sobre/sections/AboutHero.tsx, validar:

Hierarquia tipográfica (título, subtítulo, parágrafos)

Line-height e espaçamentos verticais (mobile vs desktop) conforme Ghost DS.

Ajustar animação de entrada:

Uso de Framer Motion para fade-in + leve y (ex.: initial={{ opacity: 0, y: 8 }} → animate={{ opacity: 1, y: 0 }})

Respeitar useReducedMotion (src/hooks/useReducedMotion.ts).

Se houver integração com 3D/overlays:

Garantir que o texto permaneça legível (z-index, contraste)

Garantir que o 3D não cause jank em scroll.

Regras:

❌ Não alterar textos.

✅ Tailwind + Framer Motion.

🛠️ Prompt #10 — Origem Criativa
Objetivo:
Garantir fidelidade total ao documento 03-ORIGEM-CRIATIVA.md.

Ações:

Em AboutOrigin.tsx, verificar:

Layout em colunas no desktop (texto + imagem/ilustração)

Ordem e empilhamento em mobile (stack vertical).

Imagens:

Definir width/height ou aspect-ratio para evitar CLS

Checar que as ilustrações/frames não ultrapassem a largura do container em mobile.

Animar entrada no scroll:

Ghost Motion: opacity + y suave

Eliminar animações de scale/rotate agressivas, se houver.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

🛠️ Prompt #11 — O Que Eu Faço
Objetivo:
Garantir fidelidade total ao documento 04-O-QUE-EU-FACO.md.

Ações:

Em AboutWhatIDo.tsx, validar:

Gaps entre cartões, padding interno e bordas conforme o mock

Hierarquia clara entre título, descrição e detalhes.

Acessibilidade:

Se os cards forem clicáveis, garantir role="button" ou <button>/<a> semânticos

Garantir navegação por teclado (tab) cobrindo toda área interativa do card.

Motion:

Implementar stagger leve nos cards com Framer Motion

Usar variações Ghost (opacity, y) para entrada e hover.

Regras:

❌ Não alterar textos.

✅ Tailwind + Framer Motion.

🛠️ Prompt #12 — Método/Processo (refatoração dos cards)
Objetivo:
Ajustar AboutMethod.tsx para o padrão Ghost conforme 05-COMO-EU-TRABALHO.md.

Ações:

Em src/components/sobre/sections/AboutMethod.tsx, alterar o estilo de cada passo do método:

Substituir linhas/bordas inferiores simples por cards com:

bg-surface/50

backdrop-blur

border-l-4 border-bluePrimary

Implementar animação de entrada com staggerChildren:

Container com variants e staggerChildren: 0.05~0.08

Filhos com initial={{ opacity: 0, y: 8 }} e animate={{ opacity: 1, y: 0 }}.

Garantir que espaçamentos horizontais/verticais respeitem os tokens de 24px/64px (Mobile/Desktop) sem alterar o conteúdo textual.

Regras:

❌ Não alterar textos.

✅ Usar Tailwind + Framer Motion.

✅ Sem scale agressivo.

🛠️ Prompt #13 — Crenças / “O Que Me Move” (Scroll Sync em 5 camadas)
Objetivo:
Corrigir a seção 06 conforme 06-O-QUE-ME-MOVE.md / ABOUT-BELIEFS-SOBRE.md.

Ações:

Garantir arquitetura em 5 camadas na pasta beliefs:

Camada 0: Background (gradiente/base) — BackgroundLayer.tsx

Camada 1: Overlay sutil (ruído, vinheta) — OverlayLayer.tsx

Camada 2: Ghost 3D — Ghost3D.tsx (Canvas, luzes, etc.)

Camada 3: Texto dinâmico (rotator / morph) — TextRotator.tsx / MorphingText.tsx

Camada 4: Header fixo / labels — FixedHeader.tsx
Arquivo-orquestrador: BeliefsSection.tsx deve compor essas camadas respeitando position: fixed/sticky indicado no doc.

Ajustar hook de sincronia:

Usar useScroll + scrollYProgress (Framer Motion) em src/hooks/useBeliefsAnimation.ts (ou equivalente)

Mapear scrollYProgress para interpolar cor de fundo de #040013 → #0a001a (pelo menos) conforme ranges do doc.

Mobile:

Implementar animação onde o texto sai deslizando para a direita (x positivo) ao trocar de crença

Fazer com que o Ghost 3D acompanhe, ajustando levemente posição/rotação para manter a sensação de sincronia, sem saltos bruscos.

Regras:

❌ Não alterar textos.

✅ Framer Motion via scrollYProgress.

✅ Respeitar prefers-reduced-motion.

🛠️ Prompt #14 — Fechamento/Confirmação
Objetivo:
Garantir fidelidade total ao documento 07-FECHAMENTO-CONFIRMACAO.md.

Ações:

Em AboutClosing.tsx, validar:

Intensidade visual da seção de fechamento (background, bordas, destaque do CTA final).

Espaçamento acima/abaixo da seção, alinhado ao doc.

Motion:

Entrada suave com Ghost Motion, sem overshoot forte

Saída/transição para o Footer fluida, evitando cortes secos.

Responsividade:

Garantir boa leitura em mobile (quebra de linhas/tamanho de fonte)

Manter o CTA visível sem exigir scroll excessivo.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

📂 PORTFOLIO
🛠️ Prompt #15 — Gallery/Filtros
Objetivo:
Garantir fidelidade total ao documento 03-GALLERY.md.

Ações:

Na página src/app/portfolio/page.tsx + PortfolioClient.tsx + src/components/portfolio/**:

Validar UI dos filtros/tags (layout horizontal/vertical, comportamento em mobile).

Garantir que tags longas não estourem o container em telas pequenas.

Acessibilidade:

Tratar filtros como role="tab"/aria-pressed ou aria-selected (conforme padrão do doc)

Permitir navegação via teclado (setas/tab) entre filtros.

Motion:

No filtro ativo/inativo, utilizar transições suaves de opacity, y ou background, evitando reflows caros.

Regras:

❌ Não alterar textos.

✅ Tailwind + Framer Motion.

🛠️ Prompt #16 — Project Cards (padrão Ghost)
Objetivo:
Garantir fidelidade total ao documento 04-PROJECT-CARDS.md.

Ações:

Em src/components/projects/** (e/ou src/components/portfolio/**), auditar cards:

Proporção da imagem (aspect ratio) idêntica ao mock

Hierarquia tipográfica (título, subtítulo, tags).

Estados de foco/hover:

Adicionar :focus-visible com outline adequado

No hover, limitar-se a leves variações de opacity, y ou box-shadow, evitando scale > 1.02.

Touch/mobile:

Garantir área de toque mínima de 44x44px

Evitar dependência exclusiva em hover para transmitir interatividade.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

🛠️ Prompt #17 — Modal de Detalhes (UI/UX + acessibilidade)
Objetivo:
Garantir fidelidade total aos documentos 05-MODAL.md e 09-MODAL-ROOT.md.

Ações:

Identificar o componente de Modal de Detalhes em src/components/portfolio/** ou src/components/shared/**:

Garantir que o modal seja renderizado via portal/root dedicado (ModalRoot)

Configurar overlay com z-index alto suficiente para cobrir toda a tela.

Scroll Lock:

Integrar src/hooks/useBodyLock.ts ao ciclo de vida do modal

Bloquear scroll de fundo quando o modal estiver aberto (e liberar ao fechar).

Acessibilidade:

Implementar focus trap dentro do modal

Permitir fechamento por tecla ESC e clique fora (se especificado)

Retornar foco para o elemento disparador ao fechar.

Regras:

❌ Não alterar textos.

✅ Acessibilidade é obrigatória.

✅ Motion leve (opacity + y) respeitando reduced motion.

🛠️ Prompt #18 — Projeto (Slug): SEO + metadata dinâmica
Objetivo:
Otimizar a página de projeto individual conforme 06-PROJETO-SLUG.md.

Ações:

Em src/app/portfolio/[slug]/page.tsx, implementar generateMetadata:

Ler params.slug (via App Router assíncrono)

Buscar dados do projeto no Supabase (título, descrição, imagem OG)

Retornar Metadata com title, description e openGraph mínimos.

Fallback:

Se o fetch falhar, retornar metadata estática segura (nome do portfolio + fallback genérico)

Evitar que uma falha de metadata quebre a página.

CTA de retorno:

Garantir que o botão “Voltar ao Portfólio” use a variante compact do Design System (estilo de botão já existente em src/components/ui/**).

Regras:

❌ Não alterar textos.

✅ Manter generateMetadata no Server Component.

✅ SEO não pode quebrar a renderização.

🛠️ Prompt #19 — Landing Pages Dinâmicas (render + cache)
Objetivo:
Garantir fidelidade total ao documento 07-LANDING-PAGES.md.

Ações:

Encontrar rotas de landing dinâmicas em src/app/** (ex.: src/app/landing/[slug]/page.tsx ou similar) e validar:

Que os dados são carregados do Supabase conforme schema do doc

Que não há acoplamento excessivo com a página de portfólio geral.

Fallback quando não existir landing:

Renderizar estado vazio ou redirect seguro, sem 500

Garantir consistência de layout com as demais páginas.

Cache/Revalidate:

Usar fetch com revalidate adequado (ou route segment config) para equilibrar frescor de conteúdo e performance

Documentar o comportamento no código (// revalidate: X) conforme especificado.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

🔐 ADMIN (CMS)
🛠️ Prompt #20 — Proteção de Rotas (admin/(protected))
Objetivo:
Consolidar segurança e UX do Admin conforme docs 03-DASHBOARD.md e estrutura admin/(protected).

Ações:

Auditar src/app/admin/(protected)/layout.tsx e src/middleware.ts:

Garantir que apenas usuários autenticados e com role correta possam acessar /admin/(protected)

Aplicar pattern de verificação de sessão próxima às chamadas de Supabase / DAL.

Redirects:

Em caso de ausência de sessão, redirecionar para /admin/(auth) ou rota de login definida

Evitar “flash” de conteúdo protegido: checks server-side antes de renderizar.

Server Actions / Mutations:

Garantir que mutações críticas (CRUD de trabalhos/tags/mídias) sejam protegidas por checks de role

Evitar expor endpoints inseguros acessíveis sem autenticação.

Regras:

❌ Não alterar textos.

✅ Segurança server-side obrigatória.

🛠️ Prompt #21 — Dashboard (Skeletons + Suspense)
Objetivo:
Melhorar UX/performance do dashboard conforme 03-DASHBOARD.md.

Ações:

Em src/app/admin/(protected)/page.tsx e componentes de métricas (src/components/admin/**):

Introduzir Suspense em torno de blocos de métricas

Criar componentes de skeleton que imitem o layout final (altura/largura iguais).

Evitar CLS:

Garantir que o espaço ocupado pelo skeleton seja idêntico ao conteúdo real

Não alterar o fluxo ao trocar skeleton → dados.

Responsividade:

Validar que a grid do Dashboard em mobile respeita 24px de padding e colunas em stacking adequado

Em desktop, manter alinhamento e espaçamentos de 64px entre blocos principais.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

✅ Performance > 90.

🛠️ Prompt #22 — Trabalhos (CRUD)
Objetivo:
Garantir fidelidade total ao documento 04-TRABALHOS.md.

Ações:

Em src/app/admin/(protected)/trabalhos/** + ProjectsTable.tsx:

Validar ordenação padrão (ex.: por data de criação ou destaque)

Implementar paginação ou carregamento incremental se o doc especificar.

Segurança de dados:

Garantir que IDs sensíveis ou chaves nunca sejam renderizados no client

Centralizar lógica de Supabase em libs/server actions.

Uploads/mídia associada:

Validar fluxo de criação/edição de trabalho com associação de mídia (thumbnails, vídeos)

Tratar erros de upload/storage com mensagens coerentes (sem mudar texto).

Regras:

❌ Não alterar textos.

✅ Segurança + UX.

🛠️ Prompt #23 — ProjectForm: validação de slug com Zod
Objetivo:
Adicionar validação robusta (sem caracteres especiais) conforme docs.

Ações:

Em src/components/admin/ProjectForm.tsx, ajustar o schema Zod do formulário:

Campo slug deve usar algo como:
z.string().min(1).regex(/^[a-z0-9-]+$/, "slug inválido")
(somente letras minúsculas, números e hífen).

Feedback visual:

Exibir estado de erro no input (borda/cor de label) sem alterar o texto existente de erro

Garantir que o erro seja anunciado (aria-describedby) quando possível.

Persistência:

Confirmar que o slug persistido no Supabase é exatamente o validado (sem transformações silenciosas divergentes)

Normalizar slug (ex.: .trim().toLowerCase()) antes de salvar se o doc pedir.

Regras:

❌ Não alterar textos.

✅ Zod obrigatório.

✅ Validar antes de salvar (client e/ou server).

🛠️ Prompt #24 — Tags
Objetivo:
Garantir fidelidade total ao documento 05-TAGS.md.

Ações:

Em src/app/admin/(protected)/tags/** + TagForm.tsx:

Validar criação/edição/exclusão de tags

Garantir atualização imediata dos filtros no Portfolio (via revalidate ou listeners).

Normalização:

Impedir duplicatas por case/whitespace (ex.: "Brand" vs "brand")

Podar espaços extras (trim) antes de persistir.

Estados:

Implementar loading e erros claros na criação/remoção de tags

Garantir que falhas não deixem a UI em estado inconsistente.

Regras:

❌ Não alterar textos.

✅ Integridade de dados.

🛠️ Prompt #25 — Mídia (upload + preview + segurança)
Objetivo:
Garantir fidelidade total ao documento 06-MIDIA.md.

Ações:

Em src/app/admin/(protected)/midia/** + AssetForm.tsx/AssetGallery.tsx:

Validar restrições de tipo de arquivo (imagens, vídeos, etc.)

Limitar tamanho máximo e exibir mensagem de erro adequada.

Políticas de storage:

Verificar policies do Supabase (bucket, RLS) para garantir acesso somente a quem deve

Evitar expor URLs privadas diretamente em público.

Performance mobile:

Ativar lazy-loading de thumbnails

Considerar geração de versões menores em background, se doc sugerir.

Regras:

❌ Não alterar textos.

✅ Performance + segurança.

🛠️ Prompt #26 — Copy Agent (IA)
Objetivo:
Garantir fidelidade total ao documento 09-COPY-AGENT.md.

Ações:

Em src/app/admin/(protected)/copy-agent/**:

Verificar fluxo de input (briefing, parâmetros) → chamada IA → resultado

Garantir estados de loading claros e erro tratável.

Proteção do site público:

Assegurar que nenhum texto do site público seja sobrescrito automaticamente sem confirmação explícita do usuário (ex.: botão “Aplicar” ou “Substituir”).

Rate limiting / UX:

Evitar sobrecarga de chamadas (ex.: desabilitar botão enquanto requisição em aberto)

Indicar quando limites de uso forem atingidos, se especificado.

Regras:

❌ Não alterar textos do site público.

✅ Ações do agente devem ser reversíveis.

🛠️ Prompt #27 — Settings/Config
Objetivo:
Garantir fidelidade total ao documento 08-SETTINGS-CONFIG.md.

Ações:

Em src/app/admin/(protected)/settings/**:

Verificar estrutura em abas/seções

Garantir que os campos reflitam todas as configs descritas no doc.

Validação:

Adicionar validações (Zod ou similar) para limites de campos (URLs válidas, cores, toggles, etc.)

Exibir erros de forma consistente com o resto do CMS.

Loading:

Se as configs forem carregadas do Supabase, exibir skeleton ou placeholder até os dados chegarem, evitando pulo de layout.

Regras:

❌ Não alterar textos.

✅ Mobile-first.

🌐 CROSS-CUTTING (Global)
🛠️ Prompt #28 — Reduced Motion (global hardening)
Objetivo:
Garantir que TODAS as transições respeitem prefers-reduced-motion.

Ações:

Auditar uso de Framer Motion:

Onde houver animações fortes (grandes deslocamentos, duração > 0.6s), adicionar branch de useReducedMotion() para reduzir ou desabilitar motion.

Scroll-based motion:

Para seções que dependem de scroll (Hero, Beliefs, Gallery), garantir fallback estático quando prefers-reduced-motion for reduce (ex.: estados “final” direto, sem animações contínuas).

GSAP ScrollTrigger (se usado):

Desativar ou simplificar animações sob reduced motion, seguindo o padrão definido no GHOST DESIGN SYSTEM.

Regras:

❌ Não alterar textos.

✅ Acessibilidade obrigatória.

🛠️ Prompt #29 — Performance (R3F + imagens + vídeo)
Objetivo:
Manter Lighthouse > 90 sem perder fidelidade visual.

Ações:

R3F:

Limitar dpr em mobile ([1, 1.5])

Evitar materiais/shaders caros onde não houver ganho visual claro

Usar usePerformanceAdaptive.ts para ajustar qualidade conforme device.

Imagens:

Definir sizes corretos em next/image para evitar overfetch

Garantir placeholders (blur/background) quando necessário.

Vídeos:

Ajustar preload (metadata ou none quando possível)

Evitar que o manifesto/hero bloqueiem TTI em conexões lentas.

Regras:

❌ Não alterar textos.

✅ Performance é requisito.

🛠️ Prompt #30 — Consistência de Containers (Ghost spacing)
Objetivo:
Garantir consistência de espaçamento global.

Ações:

Padronizar containers top-level:

Usar px-6 no mobile e md:px-16 no desktop em todas as seções principais (Home, Sobre, Portfólio, Admin público quando aplicável).

max-w e alinhamentos:

Definir max-w-* coerentes (ex.: max-w-6xl/7xl) e manter headings alinhados entre páginas para evitar “drift”.

Overflow:

Auditar seções que estouram horizontalmente (efeitos 3D, carrosseis, etc.)

Usar overflow-x-hidden apenas onde estritamente necessário e documentar no código.

Regras:

❌ Não alterar textos.

✅ Mobile-first.


