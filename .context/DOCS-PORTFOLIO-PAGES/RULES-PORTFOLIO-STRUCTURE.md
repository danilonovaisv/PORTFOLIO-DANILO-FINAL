# RULES-PORTFOLIO-STRUCTURE

> **ARQUITETURA OFICIAL - ANTIGRAVITY**
> **STATUS:** V1.0.0
> **FONTE:** .context/DOCS-PORTFOLIO-PAGES/estrutura-site-portfolio.txt

Este documento define a estrutura arquitetural _imutável_ do site. Qualquer alteração na ordem, nome ou composição das sessões deve ser refletida aqui _antes_ de ser implementada no código.

---

# 1. Tabela Resumo Geral

| Página           | Ordem | Caminho Real              | Nº Sessões | Dependências Críticas                      |
| :--------------- | :---- | :------------------------ | :--------- | :----------------------------------------- |
| **01-HOME**      | 01    | `/app/page.tsx`           | 08         | `Header`, `Hero`, `Showcase`, `Contact`    |
| **02-SOBRE**     | 02    | `/app/sobre/page.tsx`     | 10         | `Header`, `MotionGate`, `Assets`, `Footer` |
| **03-PORTFOLIO** | 03    | `/app/portfolio/page.tsx` | 09         | `Gallery`, `Modal`, `ProjectSlug`, `CMS`   |
| **04-ADMIN**     | 04    | `/app/admin/*`            | Multi      | `Auth`, `Supabase`, `ProtectedLayout`      |

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
6. `06-CLIENTS-BRANDS`
7. `07-CONTACT`
8. `08-FOOTER`

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

### Sessão 06 – CLIENTS-BRANDS

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/06-CLIENTS-BRANDS`
- **Objetivo estratégico:** Autoridade. Marcas que confiam no trabalho.
- **Papel narrativo:** CREDIBILIDADE.
- **Componentes envolvidos:** `LogoMarquee`, `ClientGrid`.
- **Dependências técnicas:** Infinite loop animation.
- **Estados interativos:** Pause on hover (opcional).
- **Comportamento responsivo:** Ajuste de tamanho de logos e quantidade visível.
- **Critérios de validação:** Logos alinhados visualmente (mesmo peso visual), loop suave.
- **Referência Visual:**
  - Desktop: `.../06-CLIENTS-BRANDS/06-CLIENTS-BRANDS-DESKTOP.jpg`
  - Mobile: `.../06-CLIENTS-BRANDS/06-CLIENTS-BRANDS-MOBILE.jpg`

---

### Sessão 07 – CONTACT

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/07-CONTACT`
- **Objetivo estratégico:** Conversão. Levar o lead para WhatsApp ou Email.
- **Papel narrativo:** CHAMADA PARA AÇÃO.
- **Componentes envolvidos:** `ContactForm` ou `ContactLinks`, `SocialList`.
- **Dependências técnicas:** Form API (se houver), Clipboard copy.
- **Estados interativos:** Hover em links, validação de inputs (se form).
- **Comportamento responsivo:** Layout amigável ao toque, botões grandes.
- **Critérios de validação:** Links funcionam, email correto, feedback visual ao clicar.
- **Referência Visual:**
  - Desktop: `.../07-CONTACT/07-CONTACT-DESKTOP.jpg`
  - Mobile: `.../07-CONTACT/07-CONTACT-MOBILE.jpg`

---

### Sessão 08 – FOOTER

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/01-HOME/08-FOOTER`
- **Objetivo estratégico:** Encerramento e navegação secundária.
- **Papel narrativo:** RODAPÉ. Informações legais, sitemap rápido.
- **Componentes envolvidos:** `SiteFooter`.
- **Dependências técnicas:** N/A.
- **Estados interativos:** Links hover.
- **Comportamento responsivo:** Stack vertical vs colunas.
- **Critérios de validação:** Copyright atualizado, links funcionais.
- **Referência Visual:**
  - Desktop: `.../08-FOOTER/08-FOOTER-DESKTOP.jpg`
  - Mobile: `.../08-FOOTER/08-FOOTER-MOBILE.jpg`

---

## [02-SOBRE]

### Estrutura de Pastas

1. `01-HEADER` (Compartilhado/Instância)
2. `02-HERO-SOBRE`
3. `03-ORIGEM-CRIATIVA`
4. `04-O-QUE-EU-FACO`
5. `05-COMO-EU-TRABALHO`
6. `06-O-QUE-ME-MOVE`
7. `07-FECHAMENTO-CONFIRMACAO`
8. `08-CLIENTS-BRANDS` (Reuso)
9. `09-CONTACT` (Reuso)
10. `10-FOOTER` (Compartilhado/Instância)

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

### Sessão 06 – O-QUE-ME-MOVE

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE`
- **Objetivo estratégico:** Valores e Filosofia.
- **Papel narrativo:** PROPÓSITO.
- **Componentes envolvidos:** `ValuesGrid`, `QuoteBlock`.
- **Referência Visual:**
  - Desktop: `.../06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-DESKTOP.jpg`
  - Mobile: `.../06-O-QUE-ME-MOVE-MOBILE-FINAL.png`

---

### Sessão 07 – FECHAMENTO-CONFIRMACAO

- **Caminho absoluto:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/07-FECHAMENTO-CONFIRMACAO`
- **Objetivo estratégico:** Reforço da mensagem antes da conversão.
- **Papel narrativo:** CONCLUSÃO.
- **Referência Visual:**
  - Desktop: `.../07-FECHAMENTO-CONFIRMACAO/07-FECHAMENTO-CONFIRMACAO-DESKTOP.jpg`
  - Mobile: `.../07-FECHAMENTO-CONFIRMACAO/07-FECHAMENTO-CONFIRMACAO-MOBILE.jpg`

_(Sessões 08, 09, 10 seguem estrutura padrão de Clients, Contact e Footer)_

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
- **Papel narrativo:** CASE STUDY.
- **Observação:** Renderizada dinamicamente em `/portfolio/[slug]`.
- **Referência Visual:**
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
