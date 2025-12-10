:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

# SECTION NAME: Portfolio Showcase

_(Conteúdo já descrito, agora dentro do template.)_

**SECTION PURPOSE (what this section must achieve):**

- Apresentar claramente as áreas de atuação de Danilo.
- Organizar mentalmente o portfólio em categorias.

**PRIMARY MESSAGE / HEADLINE:**

- `portfólio showcase`.

**SECONDARY MESSAGE / SUPPORT TEXT:**

- Microtexto `[what we love working on]`.

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**

- Título `portfólio showcase`.
- Microtexto lateral.
- 3 stripes de categoria.
- CTAs `VEJA MAIS →` e `let’s build something great →`.

**CALL TO ACTION (if any):**

- `VEJA MAIS →` → `/portfolio`.
- `let’s build something great →` → `/#contact`.

**LINKS GLOBAIS:**

- Integração com `/portfolio` (com e sem filtro).
- Integração com `/#contact`.

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**

- Seção editorial de categorias (stripes + CTAs).

**ALIGNMENT (left/center/right, vertical alignment):**

- Desktop:
  - Título central ao grid.
  - Microtexto lateral esquerda.
  - Stripes em coluna.
- Mobile:
  - Todos os elementos empilhados e alinhados à esquerda.

**SPACING (top/bottom padding, breathing room):**

- Padding vertical generoso (`py-16`).
- Gaps verticais entre stripes.
- Espaço antes dos CTAs.

**BACKGROUND (color, gradient, image, video):**

- `#F4F5F7`.

**SECTION COLORS (overrides or specific tokens):**

- Azul da marca no título e ícones.
- Neutro escuro para textos complementares.

**TYPOGRAPHY (any overrides for headings/body in this section):**

- Headline em bold.
- Stripes em tipografia grande, bold.

**IMAGERY (what to show: photos, illustrations, icons, logos):**

- Sem imagens de casos, apenas texto + ícones circulares (pontos azuis).

**MEDIA (video, animation, Lottie, 3D, etc.):**

- N/A.

**COMPONENTS USED:**

- Stripes (divs clicáveis).
- Botões/links para CTAs.

**STATE VARIANTS:**

- Hover em stripes: fundo e sombra.
- Hover em ícones: scale leve.

**INTERACTIONS:**

- Clique em stripes: vai para `/portfolio?category=...`.
- Clique em ícones: mesmo destino das stripes.

**SCROLL BEHAVIOUR:**

- Reveal on scroll via animação de entrada (sem sticky).

**ANIMATIONS:**

- Entrada dos stripes da direita/esquerda.
- Pulsar dos pontos azuis em loop longo (se permitido).

**MICRO-INTERACTIONS:**

- Hover nos stripes e ícones.

**TEXT LIMITS:**

- Nomes das categorias curtos (1–2 palavras chave + complemento).

**CONTENT PRIORITY:**

- Título da seção.
- Stripes de categorias.

**ALTERNATIVE CONTENT (fallback if image/video not available):**

- N/A (conteúdo somente textual).

**LINKS / DESTINATIONS (where CTAs point):**

- ID: brand-campaigns
  Label (UI): Brand & Campaigns
  Label PT (explicativo): Brand & Campanhas
  Thumbnail URL: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

- ID: videos-motions
  Label (UI): Videos & Motions
  Label PT (explicativo): Vídeos & Motions
  Thumbnail URL: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif

- ID: websites-webcampaigns-tech
  Label (UI): Web Campaigns, Websites & Tech
  Label PT (explicativo): Campanhas Web, Websites & Tech
  Thumbnail URL: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp

**DATA HOOKS / TRACKING (events to track in analytics):**

- `portfolio_showcase_category_click`.
- `portfolio_showcase_cta_click`.

**DEPENDENCIES (APIs, forms, integrations for this section):**

- Página `/portfolio` com suporte a filtros.

**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**

- Stripes e ícones focáveis.
- Respeito a movimento reduzido (sem animações agressivas).

**SPECIAL STATES (empty state, error state, loading state):**

- `TBD` (página é estática; não há estado vazio).

**NOTES / INSPIRATION (links, references, moodboards):**

- `https://loandbehold.studio/` como referência visual.

**REFERENCES:**

- `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`.

**“NON-NEGOTIABLES” (things that cannot change in this section):**

- 3 stripes de categoria.
- CTAs principal e aspiracional.

---
