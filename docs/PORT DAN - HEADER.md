
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

----

# **SECTION NAME: Header (SiteHeader)**
**SECTION PURPOSE (what this section must achieve):**
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.
**PRIMARY MESSAGE / HEADLINE:**
- N/A (Contém apenas a logo e links).
**SECONDARY MESSAGE / SUPPORT TEXT:**
- Links para as páginas principais: "home", "sobre", "portfolio showcase",
"contato".
**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**
- Logo da marca (light).
- Menu de navegação com 4 itens.
**CALL TO ACTION (if any):**
- Os links do menu são os CTAs:
- "home" → `#hero` / `/`
- "sobre" → `/sobre`
- "portfolio showcase" → `/portfolio`
- "contato" → `#contact` / `/`
**LINKS:**
- Navegação principal do site, replicada no Footer.
**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**
- Barra fixa no topo da página.
**ALIGNMENT (left/center/right, vertical alignment):**
- Horizontal: Logo à esquerda, menu à direita.
- Vertical: Centralizado verticalmente.
**SPACING (top/bottom padding, breathing room):**
- Padding interno:
- Estado inicial: `py-4 px-4`.
- Estado condensado (após scroll): `py-2 px-4`.
- Margem entre links do menu: `space-x-6`.
**BACKGROUND (color, gradient, image, video):**
- Cor sólida branca (`bg-white`).
**SECTION COLORS (overrides or specific tokens):**
- Texto: `text-gray-700`, `hover:text-[#0057FF]`.
- Fundo: `bg-white`.
**TYPOGRAPHY (any overrides for headings/body in this section):**
- Fonte: Inter (ou similar).
- Peso: Regular.
- Tamanho: `text-base`.
**IMAGERY (what to show: photos, illustrations, icons, logos):**
- Logo da marca (SVG) em versão light.
**MEDIA (video, animation, Lottie, 3D, etc.):**
- N/A.
**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**
- `<header>`, `<nav>`, `<ul>`, `<li>`, `<Link>` (Next.js), `<img>`.
**STATE VARIANTS (hover, active, focus, disabled, selected):**
- Hover: Texto muda para azul (`text-[#0057FF]`).
- Active: Texto muda para azul (`text-[#0057FF]`).
- Focus: Foco visível em navegação por teclado.
**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**
- Clique nos links: Redireciona para a página ou faz scroll até a seção
correspondente.
- Hover: Muda a cor do texto e exibe sublinhado animado.
**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**
- Fixo no topo da página (`fixed top-0 left-0 right-0`).
- Em scroll (> 40px):
- Reduz o padding vertical.
- Adiciona fundo branco translúcido (`bg-white/95`) e `backdrop-blur`
(nav condensado).
**ANIMATIONS (what moves, when, duration, easing):**
- Animação de entrada:
- `initial={{ y: -24, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`
em ~0.6s, easing suave.
- Hover nos links:
- Sublinhado animado via `motion.span` (scaleX de 0 → 1).
**MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):**
- Transição suave de cor ao hover (`transition-colors`).
**TEXT LIMITS (max characters for headline, body, CTA):**
- Links curtos e diretos; ideal até ~20 caracteres cada. **[SUGESTÃO]**
**CONTENT PRIORITY (what must be seen first):**
- Alta: Logo e links de navegação.
**ALTERNATIVE CONTENT (fallback if image/video not available):**
- Caso logo não carregue, exibir texto “Danilo Novais”.
**LINKS / DESTINATIONS (where CTAs point):**
- "home": `/` ou `#hero`.
- "sobre": `/sobre`.
- "portfolio showcase": `/portfolio`.
- "contato": `/` ou `#contact`.
**LINKS GLOBAIS**
- **Logo Light:**
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/logo_site/faivcon-02.svg`
- **Logo Dark:**
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/logo_site/faivcon.svg`
- **Favicon:**
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/logo_site/logo.svg`
**DATA HOOKS / TRACKING (events to track in analytics):**
- Eventos de clique em navegação (`header_nav_click` com `label` e
`destination`).
**DEPENDENCIES (APIs, forms, integrations for this section):**
- `BRAND_ASSETS.logo.light`
- `MAIN_ROUTES`
**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**
- Links com `aria-label` descritivo (ex.: “Ir para página Sobre”).
- Header navegável via teclado (tab order lógica).
**SPECIAL STATES (empty state, error state, loading state):**
- N/A.
**NOTES / INSPIRATION (links, references, moodboards):**
- Layout inspirado em sites modernos como `https://loandbehold.studio/`.
- Estilização inspirada no mockup `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`.
**REFERENCES:**
- `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`.
**“NON-NEGOTIABLES” (things that cannot change in this section):**
- Header fixo.
- Logo da marca.
- Links de navegação para as 4 páginas principais.
- Comportamento de scroll para o link "contato".
---
