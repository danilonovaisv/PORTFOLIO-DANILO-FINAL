# RULES-PORTFOLIO-STRUCTURE

> **ARQUITETURA OFICIAL - ANTIGRAVITY**
> **STATUS:** V1.0.0
> **FONTE:** .context/DOCS-PORTFOLIO-PAGES/estrutura-site-portfolio.txt

Este documento define a estrutura arquitetural _imutável_ do site. Qualquer alteração na ordem, nome ou composição das sessões deve ser refletida aqui _antes_ de ser implementada no código.

---

# 1. Tabela Resumo Geral

| Página           | Ordem | Caminho Real              | Nº Sessões | Dependências Críticas                                      |
| :--------------- | :---- | :------------------------ | :--------- | :--------------------------------------------------------- |
| **01-HOME**      | 01    | `/app/page.tsx`           | 09         | `Header`, `Hero`, `Showcase`, `ShaderSection`, `SiteClosure`|
| **02-SOBRE**     | 02    | `/app/sobre/page.tsx`     | 12         | `Header`, `MotionGate`, `Proof`, `SiteClosure`, `StickyCTA` |
| **03-PORTFOLIO** | 03    | `/app/portfolio/page.tsx` | 09         | `Gallery` (pagination 15pp), `Modal`, `ProjectSlug`, `CMS` |
| **04-ADMIN**     | 04    | `/app/admin/*`            | Multi      | `Auth`, `Supabase`, `ProtectedLayout`                      |
| **05-CONTATO**   | 05    | `/app/contato/page.tsx`   | 03         | `ClientsBrandsSection`, `ContactSection`, `SiteFooter`     |
| **06-PRIVACIDADE**| 06    | `/app/privacidade/page.tsx`| 02         | `PrivacyText`, `SiteFooter`                                |

---

# 2. Documentação Completa por Página

---

## [01-HOME]

### Estrutura de Pastas

1. `01-HEADER`
2. `02-HERO-HOME`
3. `03-VIDEO-MANIFESTO`
4. `04-PORTFOLIO-SHOWCASE`
5. `05-FEATURED-PROJECTS`
6. `06-SHADER-SECTION`
7. `07-CLIENTS-BRANDS`
8. `08-CONTACT`
9. `09-FOOTER`

---

### Sessão 01 – HEADER

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/01-HEADER`
- **Objetivo estratégico:** Navegação global e identidade visual imediata.
- **Papel narrativo:** ÂNCORA. Fornece o contexto de "onde estou" e "para onde posso ir".
- **Componentes envolvidos:** `SiteHeader`, `DesktopFluidHeader`, `MobileStaggeredMenu`.
- **Dependências técnicas:** `framer-motion`, `config/navigation.ts`, WebGL (Desktop).
- **Estados interativos:** Scroll-aware (muda transparência), Menu Mobile (Open/Close).
- **Comportamento responsivo:**
  - Desktop: Fluido, glassmorphism, links horizontais.
  - Mobile: Hambúrguer, painel full-screen stagger.
- **Critérios de validação:** Navegação funciona, menu mobile abre/fecha sem layout shift, acessibilidade (ARIA) correta.
- **Referência Visual:**
  - Desktop: `.../01-HEADER/01-HEADER-DESKTOP.jpg`
  - Mobile: `.../01-HEADER/01-HEADER-MOBILE.jpg`

---

### Sessão 02 – HERO-HOME

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME`
- **Objetivo estratégico:** Impacto visual imediato ("Wow Effect"). Apresentar a proposta de valor "Ghost".
- **Papel narrativo:** PORTAL. A entrada no universo do portfólio.
- **Componentes envolvidos:** `HomeHero`, `HeroCopy`, `GhostSceneWrapper` (R3F).
- **Dependências técnicas:** `three`, `@react-three/fiber`, `framer-motion`, `useHeroAnimation`.
- **Estados interativos:** Mouse movement (parallax 3D), scroll opacity.
- **Comportamento responsivo:**
  - Desktop: Experiência 3D completa.
  - Mobile: Fallback otimizado ou versão 3D leve (conforme performance rules).
- **Critérios de validação:** 60FPS estável, texto legível sobre o 3D, carregamento sem FOUC.
- **Referência Visual:**
  - Desktop: `.../02-HERO-HOME/02-HERO-HOME-DESKTOP.jpg`
  - Mobile: `.../02-HERO-HOME/02-HERO-HOME-MOBILE.jpg`

---

### Sessão 03 – VIDEO-MANIFESTO

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/03-VIDEO-MANIFESTO`
- **Objetivo estratégico:** Retenção e conexão emocional. Explicar o "porquê" por trás do trabalho.
- **Papel narrativo:** MANIFESTO. A voz do criador.
- **Componentes envolvidos:** `VideoPlayer`, `ManifestoText`.
- **Dependências técnicas:** Video hosting (Supabase/CDN), Lazy Loading.
- **Estados interativos:** Play/Pause, Mute/Unmute, Scroll trigger autoplay (opcional).
- **Comportamento responsivo:** Aspect ratio adaptável (16:9 desktop, 9:16 ou ajustado mobile).
- **Critérios de validação:** Vídeo carrega rápido, fallback de imagem funciona, legenda (se houver) visível.
- **Referência Visual:**
  - Desktop: `.../03-VIDEO-MANIFESTO/03-VIDEO-MANIFESTO-DESKTOP.jpg`
  - Mobile: `.../03-VIDEO-MANIFESTO/03-VIDEO-MANIFESTO-MOBILE.jpg`

---

### Sessão 04 – PORTFOLIO-SHOWCASE

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/04-PORTFOLIO-SHOWCASE`
- **Objetivo estratégico:** Prova social e técnica. Mostrar os melhores trabalhos rapidamente.
- **Papel narrativo:** VITRINE. O "o que eu faço" na prática.
- **Componentes envolvidos:** `ShowcaseGrid`, `ProjectThumbnail`.
- **Dependências técnicas:** Supabase (fetch projects), Image optimization.
- **Estados interativos:** Hover states em cards, filtros (se houver).
- **Comportamento responsivo:** Grid 3 colunas (desktop) -> 1 coluna (mobile).
- **Critérios de validação:** Imagens otimizadas, links corretos para `projects/[slug]`.
- **Referência Visual:**
  - Desktop: `.../04-PORTFOLIO-SHOWCASE/04-PORTFOLIO-SHOWCASE-DESKTOP.jpg`
  - Mobile: `.../04-PORTFOLIO-SHOWCASE/04-PORTFOLIO-SHOWCASEMOBILE.jpg`

---

### Sessão 05 – FEATURED-PROJECTS

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS`
- **Objetivo estratégico:** Destaque profundo. Foco em 1-3 projetos "Hero".
- **Papel narrativo:** DEEP DIVE. Mergulho nos detalhes de casos de sucesso.
- **Componentes envolvidos:** `FeaturedProjectCard`, `ParallaxImage`.
- **Dependências técnicas:** Scroll animations (Lenis/Framer).
- **Estados interativos:** Scroll-based reveal, Magnetic buttons.
- **Comportamento responsivo:** Stack vertical full-width no mobile.
- **Critérios de validação:** Animações fluidas, texto legível sobre imagens.
- **Referência Visual:**
  - Desktop: `.../05-FEATURED-PROJECTS/05-FEATURED-PROJECTS-DESKTOP.jpg`
  - Mobile: `.../05-FEATURED-PROJECTS/05-FEATURED-PROJECTS-MOBILE.jpg`

---

### Seção 06 – SHADER-SECTION

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/06-SHADER-SECTION`
- **Objetivo estratégico:** Reforçar a identidade cibernética "Ghost Era" com elementos interativos e texturas procedimentais.
- **Papel narrativo:** TRANSIÇÃO.
- **Componentes envolvidos:** `ShaderSection`.
- **Dependências técnicas:** Canvas 3D, WebGL shaders (`shader-lines.tsx`), `usePerformanceAdaptive` para degradar DPI sob estresse gráfico.
- **Estados interativos:** Pulsação de cor (Azul ➔ Roxo ➔ Azul).
- **Comportamento responsivo:** Ajuste de densidade de linhas e bounding boxes responsivas.
- **Critérios de validação:** 60FPS estáveis sem engasgos de processamento.

---

### Seção 07 – CLIENTS-BRANDS

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/07-CLIENTS-BRANDS`
- **Objetivo estratégico:** Autoridade. Marcas que confiam no trabalho.
- **Papel narrativo:** CREDIBILIDADE.
- **Componentes envolvidos:** `ClientsBrandsSection` (unificada em `SiteClosure`).
- **Dependências técnicas:** Infinite loop animation.
- **Estados interativos:** Pause on hover (opcional).
- **Comportamento responsivo:** Ajuste de tamanho de logos e quantidade visível.
- **Critérios de validação:** Logos alinhados visualmente (mesmo peso visual), loop suave.
- **Referência Visual:**
  - Desktop: `.../07-CLIENTS-BRANDS/06-CLIENTS-BRANDS-DESKTOP.jpg`
  - Mobile: `.../07-CLIENTS-BRANDS/06-CLIENTS-BRANDS-MOBILE.jpg`

---

### Seção 08 – CONTACT

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/08-CONTACT`
- **Objetivo estratégico:** Conversão. Levar o lead para WhatsApp ou Email.
- **Papel narrativo:** CHAMADA PARA AÇÃO.
- **Componentes envolvidos:** `ContactSection` (unificada em `SiteClosure`), `SocialList`.
- **Dependências técnicas:** Resend API (servidor local).
- **Estados interativos:** Hover em links, validação de inputs (se form).
- **Comportamento responsivo:** Layout amigável ao toque, botões grandes.
- **Critérios de validação:** Links funcionam, email correto, feedback visual ao clicar.
- **Referência Visual:**
  - Desktop: `.../08-CONTACT/07-CONTACT-DESKTOP.jpg`
  - Mobile: `.../08-CONTACT/07-CONTACT-MOBILE.jpg`

---

### Seção 09 – FOOTER

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/09-FOOTER`
- **Objetivo estratégico:** Encerramento e navegação secundária.
- **Papel narrativo:** RODAPÉ. Informações legais, sitemap rápido.
- **Componentes envolvidos:** `SiteFooter` (unificada em `SiteClosure`).
- **Dependências técnicas:** N/A.
- **Estados interativos:** Links hover.
- **Comportamento responsivo:** Stack vertical vs colunas.
- **Critérios de validação:** Copyright atualizado, links funcionais.
- **Referência Visual:**
  - Desktop: `.../09-FOOTER/08-FOOTER-DESKTOP.jpg`
  - Mobile: `.../09-FOOTER/08-FOOTER-MOBILE.jpg`

---

## [02-SOBRE]

### Estrutura de Pastas

1. `01-HEADER` (Compartilhado/Instância)
2. `02-HERO-SOBRE`
3. `03-ORIGEM-CRIATIVA`
4. `04-O-QUE-EU-FACO`
5. `05-COMO-EU-TRABALHO`
6. `06-O-QUE-ME-MOVE`
7. `07-PROVA-AUTORIDADE`
8. `08-FECHAMENTO-CONFIRMACAO`
9. `09-CLIENTS-BRANDS` (Reuso)
10. `10-CONTACT` (Reuso)
11. `11-FOOTER` (Compartilhado/Instância)
12. `12-STICKY-CONTACT-CTA`

---

### Sessão 02 – HERO-SOBRE

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/02-HERO-SOBRE`
- **Objetivo estratégico:** Introdução pessoal profunda. "Quem é o Danilo".
- **Papel narrativo:** IDENTIDADE.
- **Componentes envolvidos:** `AboutHero`, `ProfileImage` (ou representação 3D).
- **Referência Visual:**
  - Desktop: `.../02-HERO-SOBRE/02-HERO-SOBRE-DESKTOP.jpg`
  - Mobile: `.../02-HERO-SOBRE/02-HERO-SOBRE-MOBILE.jpg`

---

### Sessão 03 – ORIGEM-CRIATIVA

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/03-ORIGEM-CRIATIVA`
- **Objetivo estratégico:** Storytelling da jornada profissional.
- **Papel narrativo:** BACKGROUND.
- **Componentes envolvidos:** `Timeline` ou `StoryBlock`.
- **Referência Visual:**
  - Desktop: `.../03-ORIGEM-CRIATIVA/03-ORIGEM-CRIATIVA-DESKTOP.jpg`
  - Mobile: `.../03-ORIGEM-CRIATIVA/03-ORIGEM-CRIATIVA-MOBILE.jpg`

---

### Sessão 04 – O-QUE-EU-FACO

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/04-O-QUE-EU-FACO`
- **Objetivo estratégico:** Clareza de serviços/skills.
- **Papel narrativo:** CAPACIDADE TÉCNICA.
- **Componentes envolvidos:** `ServicesGrid`, `SkillTag`.
- **Referência Visual:**
  - Desktop: `.../04-O-QUE-EU-FACO/04-O-QUE-EU-FACO-DESKTOP.jpg`
  - Mobile: `.../04-O-QUE-EU-FACO/04-O-QUE-EU-FACO-MOBILE.jpg`

---

### Sessão 05 – COMO-EU-TRABALHO

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/05-COMO-EU-TRABALHO`
- **Objetivo estratégico:** Metodologia e Processo.
- **Papel narrativo:** PROCESSO.
- **Componentes envolvidos:** `ProcessSteps`, `MethodologyCard`.
- **Referência Visual:**
  - Desktop: `.../05-COMO-EU-TRABALHO/05-COMO-EU-TRABALHO-DESKTOP.jpg`
  - Mobile: `.../05-COMO-EU-TRABALHO/05-COMO-EU-TRABALHO-MOBILE.jpg`

---

### Seção 06 – O-QUE-ME-MOVE

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE`
- **Objetivo estratégico:** Valores e Filosofia criativa por stagger animado de letras em CSS.
- **Papel narrativo:** PROPÓSITO.
- **Componentes envolvidos:** `ManifestoScrollSection`, `WhatMovesMeBackground`, `ShaderAnimation` (background).
- **Referência Visual:**
  - Desktop: `.../06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-DESKTOP.jpg`
  - Mobile: `.../06-O-QUE-ME-MOVE-MOBILE-FINAL.png`

---

### Seção 07 – PROVA-AUTORIDADE

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/07-PROVA-AUTORIDADE`
- **Objetivo estratégico:** Apresentar depoimentos, métricas reais e marcas parceiras de confiança.
- **Papel narrativo:** PROVA SOCIAL.
- **Componentes envolvidos:** `AboutProof`, `DynamicAssetImage`.

---

### Seção 08 – FECHAMENTO-CONFIRMACAO

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/08-FECHAMENTO-CONFIRMACAO`
- **Objetivo estratégico:** Reforço da mensagem antes da conversão.
- **Papel narrativo:** CONCLUSÃO.
- **Referência Visual:**
  - Desktop: `.../08-FECHAMENTO-CONFIRMACAO/07-FECHAMENTO-CONFIRMACAO-DESKTOP.jpg`
  - Mobile: `.../08-FECHAMENTO-CONFIRMACAO/07-FECHAMENTO-CONFIRMACAO-MOBILE.jpg`

---

### Seção 12 – STICKY-CONTACT-CTA

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/12-STICKY-CONTACT-CTA`
- **Objetivo estratégico:** Facilitar a conversão fluida do usuário em telas grandes ou mobile durante a leitura.
- **Papel narrativo:** ENGAGEMENT.
- **Componentes envolvidos:** `StickyContactCTA`, `AntigravityCTA`.

_(Seções 09, 10, 11 seguem a estrutura padrão do SiteClosure: Clients, Contact e Footer)_

---

## [03-PORTFOLIO]

### Estrutura de Pastas

1. `01-HEADER`
2. `02-HERO` (Específico de Portfolio)
3. `03-GALLERY`
4. `04-PROJECT-CARDS`
5. `05-MODAL` (Estado/Componente)
6. `06-PROJETO-SLUG` (Página de Detalhe)
7. `07-CLIENTS-BRANDS`
8. `08-CONTACT`
9. `09-FOOTER`



- **Full Bleed Hero:** Em heros que necessitam ocupar 100% da tela (\`Full Bleed\`), **proíba** o uso de hacks de container como \`w-screen left-1/2 -translate-x-1/2\`.
  - **Motivo:** O hack de viewport ignora barras de scroll e gera overflow horizontal / paddings fantasmas e cortes laterais em vídeos responsivos, especialmente no Mobile.
  - **Padrão:** O Hero deve adotar \`w-full\` naturalmente, ou o container pai (e.g., \`PortfolioClient\`) deve acomodar extensões edge-to-edge sem restringir o conteúdo principal.

---

### Sessão 03 – GALLERY

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/03-GALLERY`
- **Objetivo estratégico:** Visualização rápida e imersiva.
- **Papel narrativo:** EXPLORAÇÃO VISUAL.
- **Referência Visual:**
  - Desktop: `.../03-GALLERY/03-GALLERY-DESKTOP.jpg`
  - Mobile: `.../03-GALLERY/03-GALLERY-MOBILE.jpg`

---

### Sessão 04 – PROJECT-CARDS

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/04-PROJECT-CARDS`
- **Objetivo estratégico:** Listagem detalhada dos projetos.
- **Papel narrativo:** CATALOGO.
- **Referência Visual:**
  - Desktop: `.../04-PROJECT-CARDS/04-PROJECT-CARDS-DESKTOP.jpg`
  - Mobile: `.../04-PROJECT-CARDS/04-PROJECT-CARDS-MOBILE.jpg`

---

### Sessão 06 – PROJETO-SLUG

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/06-PROJETO-SLUG`
- **Objetivo estratégico:** Página dinâmica de detalhe do projeto.
- **Papel narrativo:** CASE STUDY. Mergulho imersivo em resultados e assets.
- **Arquitetura de Renderização (ALPA V3)**:
  - O sistema utiliza agora o **Template ALPA (V3)** como padrão-ouro para novos case studies.
  - **Dispatcher**: `ProjectRenderer.tsx` intercepta o tipo `MASTER_PROJECT_TEMPLATE_V3`.
  - **Componente**: `ProjectTemplateALPARenderer.tsx` gerencia 10 tipos de blocos editoriais.
- **Observação**: Renderizada dinamicamente em `/portfolio/[slug]`.
- **Referência Visual**:
  - Desktop: `.../06-PROJETO-SLUG/LANDING-PAGE-DESKTOP.jpg`
  - Mobile: `.../06-PROJETO-SLUG/LANDING-PAGE-MOBILE.jpg`

_(Demais sessões seguem padrões já documentados)_

---

## [04-ADMIN]

### Estrutura Resumida

- `01-AUTH-LOGIN`: Acesso seguro.
- `02-PROTECTED-LAYOUT-SHELL`: Sidebar e estrutura administrativa.
- `03-DASHBOARD`: Visão geral métricas.
- `04-TRABALHOS`: CRUD de Portfolio.
- `08-SETTINGS-CONFIG`: Configurações globais.
- `10-SCENE-GENERATOR`: Ferramentas criativas.

---

**FIM DA REGRA ESTRUTURAL**
