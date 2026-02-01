Você é um **especialista sênior em Frontend, UI/UX e WebGL**, com domínio avançado em **Next.js (App Router), React, TypeScript, Tailwind CSS, React Three Fiber, Three.js e Framer Motion**.
Analise a pagina portfolio e garanta que ela siga esse detalhamento.


Site: portfoliodanilo.com
Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lenis Scroll
Objetivo: Página Portfolio com animação Parallax Lerp, grid editorial, modal de projeto, UX responsivo e acessível

⸻

1️⃣ INTRODUÇÃO – ESCOPOS & EXPECTATIVAS

Você é um engenheiro front-end sênior + designer de motion editorial.
Sua missão é construir a página de Portfolio Showcase completa de acordo com as diretrizes a seguir:

🔹 Hero Section
🔹 Projects Gallery com Parallax Lerp
🔹 Modais de projeto (2 variações)
🔹 Seções complementares (Clients, Contact, Footer)
🔹 Design System Ghost
🔹 Experiência premium, minimalista e performática

O scroll não deve ser “hijacked”, mas sim um driver suave, com sensação de 60fps e transições elegantes.

1. Avaliar **estrutura, organização e integração do código**
2. Verificar **fidelidade visual total** ao layout esperado
3. Analisar **usabilidade, UX, UI e microinterações**
4. Validar **responsividade mobile-first**
5. Avaliar **requisitos técnicos, performance e boas práticas**
6. Validar **integrações entre componentes 3D e GLB**
7. Gerar **prompts técnicos claros para correção**, prontos para execução automática


### 📐 Referências obrigatórias
- 📄 Documento técnico:
  - `./docs/PORTFOLIO/PORTFOLIO-INTERATIVO-3.0.md`
- 🖼️ referencias para animação e layout:
  - `./docs/PORTFOLIO/port-ref/`

⸻

2️⃣ ARQUITETURA DA PÁGINA

Portfolio Page
├── Hero Section (Video Loop)
│   ├── Video Background (Desktop / Mobile)
│   ├── Overlay Gradient
│   ├── Headline “portfólio showcase”
│   └── CTA “vamos trabalhar juntos”
├── Projects Gallery (Parallax Lerp)
│   ├── GalleryContainer (fixed track)
│   ├── GalleryTrack (scroll + lerp)
│   └── ProjectCard[] (grid editorial)
│       └── CardImageWrapper (internal parallax)
├── Clients / Brands
├── Contact (form)
├── Footer
└── PortfolioModal
    ├── Backdrop
    ├── ModalContainer
    │   ├── CloseButton
    │   └── ProjectContent (Tipo A / Tipo B)
    └── AnimatePresence


⸻

3️⃣ DESIGN SYSTEM — Ghost

🎨 PALETA DE CORES

Token    Valor    Uso
bluePrimary    #0048ff    CTA principal, interações
blueAccent    #4fe6ff    Destaques secundários
purpleDetails    #8705f2    Detalhes pontuais
pinkDetails    #f501d3    Ênfase pontual
background    #040013    Fundo escuro principal
backgroundLight    #f0f0f0    Fundo claro
text    #fcffff    Texto principal (escuro)
textInverse    #0e0e0e    Texto sobre fundo claro
textEmphasis    #2E85F2    Destaque de palavras
textHighlight    #4fe6ff    Destaque curto
textSecondary    #a1a3a3    Metadata secundária
neutral    #0b0d3a    Gradientes de fundo
neutralLight    #F5F5F5    Fundo claro de seções


⸻

🔤 TIPOGRAFIA

Fonte principal: TT Norms Pro (self-hosted)
Fallback: ui-sans-serif, system-ui

Tokens tipográficos com clamp():
    •    display: clamp(2.5rem, 5vw, 4.5rem)
    •    h1: clamp(2rem, 4vw, 3.5rem)
    •    h2: clamp(1.5rem, 3vw, 2.5rem)
    •    h3: clamp(1.25rem, 2vw, 1.75rem)
    •    body: clamp(1rem, 1.2vw, 1.125rem)
    •    small: 0.875rem
    •    micro: 0.75rem

⸻

📐 GRID & LAYOUT — Ghost Grid System

Breakpoint    Columns    Gutter    Padding (X)    Max Width
Mobile (<768px)    4    16px    24px    100%
Tablet (768px+)    8    24px    48px    100%
Desktop (1024px+)    12    32px    64px    1440px
Wide (1600px+)    12    40px    96px    1680px

Regras:
    •    Mobile primeiro
    •    Grid editorial com spans variados no desktop
    •    auto-flow: dense no Projects Gallery

⸻

4️⃣ FRAMEWORKS & BIBLIOTECAS
    •    Next.js App Router (app/)
    •    React + TypeScript
    •    Tailwind CSS
    •    Framer Motion (motional UX)
    •    Lenis Scroll (scroll lerp suave)
    •    No GSAP
    •    No CSS externo

Arquitetura:
    •    Page: Server Component
    •    Hero, Gallery, Cards, Modals: Client Components
    •    Hooks de animação desacoplados

⸻

5️⃣ HERO SECTION

Vídeos oficiais (Supabase)
    •    Desktop:
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4
    •    Mobile:
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4

Comportamento
    •    autoPlay, loop, muted, playsInline
    •    object-fit: cover
    •    Troca automática por breakpoint
    •    Overlay em gradiente vertical
    •    Hero ocupa 100vh
    •    Texto + CTA alinhados horizontalmente na base
    •    CTA:
    •    cor bluePrimary
    •    hover: escurecer e scale sutil
    •    transição suave

⸻

6️⃣ PROJECTS GALLERY — Parallax Lerp

Visão Geral da Arquitetura da Página

A página de portfólio deve ser pensada como uma sequência de seções independentes, porém orquestradas pelo scroll:
    1.    Hero / Intro (parallax-driven)
    2.    Portfolio Grid (cards com motion + hover)
    3.    Seções complementares (About, Services, Case Studies, Contact)
    4.    Footer leve


7. INTERATIVIDADE & ANIMAÇÕES

7.1 Animações de entrada / scroll

Princípios
    •    Toda animação é:
    •    silenciosa
    •    funcional
    •    orientada ao scroll
    •    Nada deve competir com o conteúdo.

Padrão técnico
    •    Engine: Framer Motion
    •    Ativação:
    •    whileInView
    •    viewport={{ once: true, margin: "-10%" }}

Cards
    •    Entrada padrão:
    •    opacity: 0 → 1
    •    y: 24–40px → 0
    •    Ordem:
    •    cascata natural baseada na posição no DOM
    •    Nunca reanimar ao scroll reverso

⸻

7.2 Hover effects / microinterações (desktop)

Card (desktop)
    •    Hover no container inteiro
    •    Efeitos combinados:
    1.    Card:
    •    scale: 1 → 1.02
    2.    Imagem:
    •    zoom interno (scale: 1.1)
    3.    Overlay:
    •    gradiente escuro opacity: 0 → 0.6
    4.    Texto:
    •    título sobe levemente (y: 8px → 0)
    •    categoria aparece

Regra de UX

Hover não muda layout, não desloca grid e não causa reflow.

⸻

7.3 Mouse, touch e input

Desktop (mouse)
    •    Hover ativo
    •    Cursor padrão (custom cursor é opcional, não obrigatório)
    •    Scroll suave via Lenis

Mobile (touch)
    •    ❌ Hover desativado
    •    ✔ Press feedback:
    •    leve scale: 0.98
    •    highlight rápido
    •    Card inteiro clicável
    •    Touch target mínimo: 48px

⸻

7.4 Animações vinculadas ao scroll (Scroll Sync / Parallax)

Parallax Lerp — conceito central
    •    Inspirado no REF-ANIMA
    •    Não é scroll hijacking
    •    Scroll continua natural

Estrutura
    •    GalleryContainer: pode ser relative ou fixed (dependendo da versão final)
    •    GalleryTrack: move-se suavemente com lerp
    •    Cada ProjectCard:
    •    possui parallax interno apenas na imagem

Valores recomendados
    •    Desktop:
    •    translateY: -30px → +30px
    •    Tablet:
    •    -20px → +20px
    •    Mobile:
    •    -10px → +10px ou desativado

Regra crítica

Nunca usar window.scrollY diretamente.
Sempre useScroll({ target }) + useTransform.

⸻

8. RESPONSIVIDADE (FOCO PRINCIPAL)

5.1 Visão geral — quantidade de cards por linha

Breakpoint    Colunas Grid    Cards por linha    Observações
Mobile (<768px)    1    1    Lista vertical
Tablet (768–1023px)    2    2    Grid simples
Desktop (1024–1439px)    3–4    3–4    Editorial
Wide (≥1440px)    4–5    4–5    Ritmo amplo


⸻

8.2 Mobile (≤ 767px)

Comportamento
    •    Grid vira lista vertical
    •    Cada card:
    •    width: 100%
    •    proporção estável (ex: 4:5)
    •    Sem variação de spans
    •    Leitura linear (scroll natural)

UX
    •    Imagem grande
    •    Título + categoria sempre visíveis
    •    CTA implícito (card inteiro)

Animação
    •    Entrada simples (fade-up)
    •    Parallax:
    •    opcional ou muito sutil
    •    pode ser desativado em low-end devices

⸻

8.3 Tablet (768px – 1023px)

Grid
    •    2 colunas fixas
    •    grid-cols-2
    •    Spans limitados:
    •    evitar 1x2 ou 2x2 excessivos

Ritmo visual
    •    Cards quase homogêneos
    •    Hierarquia ainda clara, porém simplificada

Animação
    •    Parallax ativo, mas reduzido
    •    Hover:
    •    pode existir em tablets grandes
    •    nunca essencial para entender conteúdo

⸻

8.4 Desktop (≥ 1024px)

Grid editorial (núcleo da experiência)
    •    CSS Grid:
    •    grid-cols-12
    •    auto-flow: dense

Spans permitidos
    •    Card padrão: col-span-4 (3 por linha)
    •    Card destaque:
    •    col-span-6 (2 por linha)
    •    ou row-span-2

Composição típica
    •    Mistura de:
    •    cards grandes (âncoras visuais)
    •    cards médios
    •    cards neutros (ritmo)

Hover + Parallax
    •    Ativos
    •    Sensação de profundidade 3D (sem WebGL)

⸻

8.5 Telas grandes / ultrawide (≥ 1440px)

Ajustes
    •    Container centralizado
    •    max-width: 1680px
    •    Mais respiro entre cards
    •    Possibilidade de:
    •    4 ou 5 cards por linha
    •    cards ainda maiores (luxury feel)

Animação
    •    Mais lenta
    •    Easing mais perceptível

⸻

9. ACESSIBILIDADE & SEO

9.1 Semântica
    •    <main> → página
    •    <section> → Projects Gallery
    •    <article> → cada ProjectCard
    •    Hierarquia:
    •    h1: título principal da página
    •    h2: seções
    •    h3: título do projeto

⸻

9.2 Imagens
    •    Todas com alt
    •    Padrão:
    •    “Projeto X — categoria Y”
    •    Imagens decorativas:
    •    aria-hidden="true"

⸻

9.3 Contraste
    •    Overlay obrigatório sobre imagens
    •    Texto nunca diretamente sobre imagem crua
    •    Cores respeitam WCAG AA no mínimo

⸻

9.4 Navegação por teclado
    •    Cards focáveis (tabIndex=0)
    •    :focus-visible estilizado
    •    Enter abre modal
    •    Escape fecha modal
    •    Foco retorna ao card original

⸻

9.5 SEO
    •    Grid renderizado no server
    •    Conteúdo indexável
    •    URLs amigáveis para projetos
    •    Estrutura preparada para JSON-LD (futuro)

⸻

10. INTEGRAÇÕES & RECURSOS ESPECIAIS

10.1 Componentes dinâmicos

✔ Grid dinâmico
✔ Filtro por categoria (já presente no ZIP)
✔ Modal de projeto
✔ Lazy loading de imagens

⸻

10.2 Dados

Origem
    •    Inicial:
    •    JSON local / TS
    •    Evolução:
    •    CMS
    •    API
    •    Supabase

Estrutura recomendada

{
  id,
  title,
  slug,
  category,
  coverImage,
  layoutType,
  content
}


⸻

10.3 Formulários
    •    Apenas na seção Contact
    •    Validação client-side
    •    Envio assíncrono
    •    Não interfere no scroll da gallery

⸻

10.4 Outros recursos
    •    prefers-reduced-motion
    •    Skeleton loaders
    •    Fallback para dispositivos fracos

⸻


11. CONSIDERAÇÕES TÉCNICAS

11.1 Client vs Server

Componente    Tipo
Page / Grid base    Server
Cards animados    Client
Parallax    Client
Modal    Client


⸻


11.2 Reutilização
    •    ProjectCard reutilizável em:
    •    Homepage
    •    Featured Projects
    •    Case Studies
    •    Hooks desacoplados permitem ajuste fino sem reescrever UI

⸻

11.3 Modularização (Next.js App Router)

/components/portfolio
  ├─ PortfolioSection.tsx
  ├─ PortfolioGrid.tsx
  ├─ ProjectCard.tsx
  ├─ PortfolioModal.tsx
/hooks
  ├─ useParallaxLerp.ts
  ├─ useRevealMotion.ts


⸻

11.4 Fallbacks
    •    Sem JS → grid ainda funcional
    •    Sem motion → layout intacto
    •    Mobile low-end → parallax off

⸻

8.5 Animações via hook

✔ Todas as animações encapsuladas
✔ Intensidade configurável
✔ Fácil desativação

⸻

CONCLUSÃO

A Projects Gallery não é apenas um grid responsivo.
Ela é:
    •    Um sistema editorial
    •    Guiado por scroll
    •    Com comportamento adaptativo real
    •    Pensado para performance, acessibilidade e evolução futura

