:PORT DAN REVISADO - NEXT.md
# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

---

## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto

- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato
- Seções da Home (ordem):
  1. Header
  2. Hero
  3. Vídeo Manifesto (Manifesto)
  4. Portfolio Showcase
  5. Featured Projects
  6. Clients / Brands
  7. Contact
  8. Footer

### 2. Assets Globais

- **Logo Light:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg`
- **Logo Dark:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg`
- **Favicon:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg`

### 3. Conteúdo Global por Seção (dados base)

- **Hero**
  - Tag: `[BRAND AWARENESS]`
  - Título: `Design, não é só estética.`
  - Subtítulo: `[É intenção, é estratégia, é experiência.]`
  - CTA label: `get to know me better →`
  - CTA target ID secundário (scroll): `#manifesto`
  - Model 3D path: `/media/abstract_element.glb` (ou `/public/models/torus_dan.glb`)

- **Manifesto (Vídeo)**
  - Vídeo URL:  
    `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

- **Portfolio Showcase**
  - Título: `portfólio showcase`
  - Categorias:

    | ID                             | Label (UI)                        | Label PT (explicativo)             | Thumbnail URL                                                                                               |
    | ----------------------------- | --------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
    | `brand-campaigns`            | `Brand & Campaigns`               | `Brand & Campanhas`                | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`   |
    | `videos-motions`             | `Videos & Motions`                | `Vídeos & Motions`                 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`   |
    | `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech`  | `Campanhas Web, Websites & Tech`   | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp`|

  - CTA final:
    - Label: `VEJA MAIS →`
    - Href: `/portfolio`

- **Featured Projects — cards**

  | Slug                   | Título                              | Categoria           | Cliente              | Ano  | Imagem URL                                                                                                  |
  | ---------------------- | ----------------------------------- | ------------------- | -------------------- | ---- | ----------------------------------------------------------------------------------------------------------- |
  | `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` | `branding & campanha` | `Magic`            | 2023 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
  | `branding-project-01`  | `Uma marca ousada e consistente`   | `branding`          | `Cliente confidencial` | 2022 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`    |
  | `key-visual-campaign`  | `Key visual para campanha sazonal` | `campanha`          | `Cliente confidencial` | 2021 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp`          |
  | `webdesigner-motion`   | `Experiência web em movimento`     | `web & motion`      | `Cliente confidencial` | 2023 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`    |

- **Clients / Brands**
  - Título: `marcas com as quais já trabalhei`
  - Logos (monocromáticos claros):

    | #  | URL                                                                                          |
    | -- | -------------------------------------------------------------------------------------------- |
    | 1  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg` |
    | 2  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg` |
    | 3  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg` |
    | 4  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg` |
    | 5  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg` |
    | 6  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg` |
    | 7  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg` |
    | 8  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg` |
    | 9  | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg` |
    | 10 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg`|
    | 11 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg`|
    | 12 | `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg`|

- **Contact**
  - Título: `contato`
  - Subtítulo: `Tem uma pergunta ou quer trabalhar junto?`
  - Form:
    - Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
    - Button label: `Enviar Mensagem`
  - Links:
    - Telefone: `tel:+5511983966838`
    - Email primário: `mailto:dannovaisv@gmail.com`
    - Email secundário: `mailto:danilo@portfoliodanilo.com`
    - Instagram: `https://instagram.com/danilo_novais`
    - Facebook: `https://facebook.com/danilonovaisvilela`
    - LinkedIn: `https://linkedin.com/in/danilonovais`
    - Portfolio: `https://portfoliodanilo.com`
    - Twitter: `https://twitter.com/danilo_novais`

- **Footer**
  - Copyright:
    - Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
    - Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos reservados.`  
      **[SUGESTÃO]** Unificar para `© 2025 ...` em todo o site.
  - Links:
    - `home` → `#hero`
    - `portfólio showcase` → `#portfolio-showcase`
    - `Sobre` → `#clients` (atual) **[SUGESTÃO]** preferir `/sobre`
    - `contato` → `#contact`

### 4. Princípios Globais de Animação

- Usar Framer Motion para:
  - Reveals no scroll (`whileInView`, `useInView`).
  - Microinterações (`whileHover`, `whileTap`).
  - Animações de scroll (`useScroll`, `useTransform`).
  - Animar apenas `transform` e `opacity`.
- Respeitar `prefers-reduced-motion: reduce`:
  - Desativar rotação 3D contínua, parallax e morph thumb→vídeo.
  - Manter estados estáticos + fades simples.
**implementação padrão** 
para animações de scroll, com JS puro (`requestAnimationFrame`) apenas como alternativa se necessário.

---

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)

---

# SECTION NAME: Header (SiteHeader)

**SECTION PURPOSE (what this section must achieve):**
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.

**PRIMARY MESSAGE / HEADLINE:**
- N/A (Contém apenas a logo e links).

**SECONDARY MESSAGE / SUPPORT TEXT:**
- Links para as páginas principais: "home", "sobre", "portfolio showcase", "contato".

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
- Clique nos links: Redireciona para a página ou faz scroll até a seção correspondente.
- Hover: Muda a cor do texto e exibe sublinhado animado.

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**
- Fixo no topo da página (`fixed top-0 left-0 right-0`).
- Em scroll (> 40px):
  - Reduz o padding vertical.
  - Adiciona fundo branco translúcido (`bg-white/95`) e `backdrop-blur` (nav condensado).

**ANIMATIONS (what moves, when, duration, easing):**
- Animação de entrada:
  - `initial={{ y: -24, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}` em ~0.6s, easing suave.
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
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg`
- **Logo Dark:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg`
- **Favicon:**  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg`

**DATA HOOKS / TRACKING (events to track in analytics):**
- Eventos de clique em navegação (`header_nav_click` com `label` e `destination`).

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

# SECTION NAME: Hero

**SECTION PURPOSE (what this section must achieve):**
- Apresentar a proposta de valor do designer.
- Criar impacto visual inicial com elemento 3D.
- Direcionar o usuário para a próxima etapa (seção Sobre/Manifesto).

**PRIMARY MESSAGE / HEADLINE:**
- `Design, não é só estética.`

**SECONDARY MESSAGE / SUPPORT TEXT:**
- `[É intenção, é estratégia, é experiência.]`

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**
- Tag `[BRAND AWARENESS]` alinhada ao H1.
- Headline em 3 linhas (Design, não é só, estética.).
- Subheadline em bloco branco translúcido.
- CTA principal `get to know me better →`.
- Elemento 3D (modelo GLB com material de vidro).
- Thumb de vídeo manifesto (vídeo autoplay) na parte inferior direita.

**CALL TO ACTION (if any):**
- CTA principal:
  - Texto: `get to know me better →`
  - Destino: `/sobre`.

**LINKS GLOBAIS:**
- CTA envia para `/sobre`.
- Thumb rola até `#manifesto`.
 **Manifesto (Vídeo)**
  - Vídeo URL:  
    `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**
- Hero section com 2 colunas (desktop) e 1 coluna (mobile).

**ALIGNMENT (left/center/right, vertical alignment):**
- Horizontal:
  - Texto à esquerda; 3D + tag + thumb à direita.
- Vertical:
  - Conteúdo centralizado verticalmente.

**SPACING (top/bottom padding, breathing room):**
- Padding interno `p-8`.
- Espaço horizontal `space-x-8`.

**BACKGROUND (color, gradient, image, video):**
- Cor sólida cinza claro `#F4F5F7`.

**SECTION COLORS (overrides or specific tokens):**
- Texto principal: `#111111`.
- Texto secundário e tag: `#0057FF`.
- CTA: fundo `#0057FF`, texto `#FFFFFF`.

**TYPOGRAPHY (any overrides for headings/body in this section):**
- Fonte: sans-serif neo-grotesca (Inter ou similar).
- Título: peso heavy, `text-4xl` em mobile, `text-6xl` em desktop.
- Subtítulo: peso médio, `text-lg`.

**IMAGERY (what to show: photos, illustrations, icons, logos):**
- Modelo 3D `/public/models/torus_dan.glb`.
- Thumb do vídeo manifesto (frame ou preview do vídeo).

**MEDIA (video, animation, Lottie, 3D, etc.):**
- Elemento 3D animado (rotação + parallax).
- Thumb com vídeo manifesto em autoplay.

**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**
- Estrutura: `<section>`, `<div>`, `<h1>`, `<p>`, `<button>`.
- 3D: `<Canvas>`, `<ModelCanvas>`.
- Vídeo: `<video>` / `motion.video`.

**STATE VARIANTS (hover, active, focus, disabled, selected):**
- CTA:
  - Hover: leve elevação.
  - Tap: compressão sutil.
- Thumb:
  - Hover: leve escala.

**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**
- Clique no CTA: navega para `/sobre`.
- Clique na thumb: rola para `#manifesto`.
- Movimento do mouse: parallax no elemento 3D.
- Scroll: dispara animação da thumb → vídeo maior.

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**
- Seção com altura ≈ 200vh.
- Bloco interno sticky (`sticky top-0 min-h-screen`).

**ANIMATIONS (what moves, when, duration, easing):**
- Título:
  - Animação “3D flip” na entrada (rotateX + y + opacity).
  - `staggerChildren` entre linhas/palavras.
- `prefers-reduced-motion`:
  - Fallback para simples fade + translateY.
- Thumb do vídeo:
  - Animação de escala, posição X/Y e borda em função de `scrollYProgress`.
- Texto e tag:
  - Opacidade reduzida conforme a thumb cresce, até sumir.
- Vídeo manifesto (na thumb):
  - Escala inicial leve (>1) reduzindo para 1.
- CTA:
  - Microanimações em hover/tap (scale, y).

**MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):**
- Hover no CTA e thumb com feedback imediato.
- Badge de play com micromovimento.

**TEXT LIMITS (max characters for headline, body, CTA):**
- Título: até 50 caracteres.
- Subtítulo: até 100 caracteres.
- CTA: até 30 caracteres.

**CONTENT PRIORITY (what must be seen first):**
- Alta: Título e elemento 3D.
- Média: Subtítulo e CTA.
- Baixa: Tag e thumb.

**ALTERNATIVE CONTENT (fallback if image/video not available):**
- Elemento 3D: texto “Elemento 3D”.
- Thumb/vídeo: texto “Vídeo Manifesto”.

**LINKS / DESTINATIONS (where CTAs point):**
- CTA: `/sobre`.
- Thumb: `#manifesto`.

**DATA HOOKS / TRACKING (events to track in analytics):**
- Clique no CTA (`hero_cta_click`).
- Clique na thumb (`hero_thumb_click`).

**DEPENDENCIES (APIs, forms, integrations for this section):**
- `HOMEPAGE_CONTENT.hero`.
- `ModelCanvas` (3D).

**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**
- Título com `aria-label` se necessário.
- CTA e thumb navegáveis via teclado.
- Respeitar `prefers-reduced-motion` (desativar rotação e parallax).

**SPECIAL STATES (empty state, error state, loading state):**
- Carregamento:
  - Spinner/placeholder para vídeo/3D.
- Erro:
  - Mensagem de erro simples.

**NOTES / INSPIRATION (links, references, moodboards):**
- Animação do título: https://codepen.io/cbolson/pen/NPNjvOQ
- Elemento 3D: https://youtu.be/9FDt6tuFP-k?si=kpet4Xc8Od3B_t5X
- Layout: `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
- Thumb: https://loandbehold.studio/

**REFERENCES:**
- Arquivos de layout internos.
- Sites de referência mencionados.

**ELEMENTE BOLA DE VIDRO:**
- Contexto: Introdução imersiva com esfera de vidro refrativa.
* Visual 3D: Esfera de vidro (MeshTransmissionMaterial) distorcendo o background ou uma imagem interna.
* Iluminação (Crítico): Vidro precisa de reflexos para parecer real.
    * Adição: Implementar <Environment preset="city" /> (ou textura customizada .hdr) com blur={1} e baixa intensidade para gerar reflexos realistas na superfície da esfera sem mostrar um fundo explícito.
* Interatividade:
    * Movimento do mouse afeta levemente a rotação da esfera (efeito parallax).
    * Scroll altera a distorção (chromaticAberration ou distortion) conforme o usuário desce.

**“NON-NEGOTIABLES” (things that cannot change in this section):**
- Elemento 3D animado (com fallback em motion-reduced).
- Título com animação de entrada.
- CTA para `/sobre`.
- Thumb com vídeo autoplay.
- Animação da thumb no scroll.

---

### Detalhes da Animação da Thumb do Vídeo Manifesto (JS Puro — Alternativa)

*(Mantido como bloco técnico extra, mas não exigido como implementação principal.)*

- Posicionamento Inicial: thumb na parte inferior direita da Hero.
- Comportamento no Scroll:
  1. Fixa na parte direita/base da tela.
  2. Cresce (`scale`) e sobe (`translateY`) em direção ao header e lateral esquerda.
  3. Vira vídeo manifesto em tela cheia.
- Implementação: JavaScript puro com `requestAnimationFrame` e `scrollY` normalizado.
- Easing: transição suave, linear ou ease-in-out.
- Performance: animar apenas `transform` e `opacity`.
- Acessibilidade: respeitar `prefers-reduced-motion: reduce` desativando a animação de scroll.


---

# SECTION NAME: Manifesto (Vídeo)

**SECTION PURPOSE (what this section must achieve):**
- Apresentar o vídeo manifesto em destaque, consolidando o que foi introduzido na Hero.
- Reforçar valores, processo e posicionamento de Danilo em formato audiovisual.

**PRIMARY MESSAGE / HEADLINE:**
- `TBD` (se houver título textual acima do vídeo).

**SECONDARY MESSAGE / SUPPORT TEXT:**
- `TBD` (pode haver breve texto contextual — opcional). **[SUGESTÃO]**

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**
- Player de vídeo manifesto.
- Overlay: gradiente inferior, microtexto, badge de play.

**CALL TO ACTION (if any):**
- `TBD` — foco principal é assistir o vídeo; não há CTA textual obrigatório.

**LINKS GLOBAIS:**
- Ancora `#manifesto` para navegação a partir da Hero.
 **Manifesto (Vídeo)**
  - Vídeo URL:  
    `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**
- Seção de mídia em destaque (vídeo em posição de hero secundário).

**ALIGNMENT (left/center/right, vertical alignment):**
- Vídeo centralizado.
- Overlays posicionados em cantos (inferior esquerdo, superior direito).

**SPACING (top/bottom padding, breathing room):**
- Padding vertical generoso (`py-16`).
- Margens laterais adequadas em desktop; full-bleed opcional em mobile.

**BACKGROUND (color, gradient, image, video):**
- Fundo: o próprio vídeo.
- Áreas em volta: neutro escuro, se necessário.

**SECTION COLORS (overrides or specific tokens):**
- Texto e ícones sobre o vídeo: branco.

**TYPOGRAPHY (any overrides for headings/body in this section):**
- Microtexto manifesto: fonte pequena, alta legibilidade sobre fundo escuro.

**IMAGERY (what to show: photos, illustrations, icons, logos):**
- Frames do vídeo, possivelmente com cenas de processo, bastidor, resultado.

**MEDIA (video, animation, Lottie, 3D, etc.):**
- `<video>` ou `motion.video` (mesma fonte da Hero).

**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**
- Player de vídeo.
- Ícone de play/pause.

**STATE VARIANTS (hover, active, focus, disabled, selected):**
- Estado tocando x pausado.
- Hover no badge de play.

**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**
- Clique no badge: play/pause.
- Hover: leve realce visual.

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**
- Entry via fade-in.
- Não sticky (Hero já cumpre esse papel).

**ANIMATIONS (what moves, when, duration, easing):**
- Entrada do container de vídeo:
  - Fade-in + pequeno ajuste de escala.
- Badge de play:
  - Animação de entrada leve (opacity + y).

**MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):**
- Badge de play com hover interativo.

**TEXT LIMITS (max characters for headline, body, CTA):**
- Se houver headline/descrição textual:
  - Manter bem curto (< 100 caracteres).

**CONTENT PRIORITY (what must be seen first):**
- Vídeo manifesto.

**ALTERNATIVE CONTENT (fallback if image/video not available):**
- Imagem estática + texto “Não foi possível carregar o manifesto em vídeo”.
- Link alternativo para YouTube/Vimeo. **[SUGESTÃO]**

**LINKS / DESTINATIONS (where CTAs point):**
- `TBD` — se houver CTA complementar (ex.: “ver portfólio”).

**DATA HOOKS / TRACKING (events to track in analytics):**
- `manifesto_video_play`.
- `manifesto_video_pause`.
- `manifesto_video_complete`.

**DEPENDENCIES (APIs, forms, integrations for this section):**
- Vídeo armazenado em Supabase.
- Player de vídeo.

**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**
- Legendas ou transcrição textual do conteúdo do vídeo. **[SUGESTÃO]**
- `aria-label` para botão de play/pause.
- Respeitar configurações do usuário (autoplay com som sempre desligado, etc.).

**SPECIAL STATES (empty state, error state, loading state):**
- Loading: placeholder/skeleton.
- Erro: fallback textual + link externo, se disponível.

**NOTES / INSPIRATION (links, references, moodboards):**
- Continuar a linha de animação iniciada na Hero.
- Manter clima de estúdio/manifesto pessoal.

**REFERENCES:**
- Mesmo vídeo especificado globalmente.

**“NON-NEGOTIABLES” (things that cannot change in this section):**
- Existência de uma área clara na Home para o manifesto em vídeo (mesmo que a transição da Hero já faça o papel visual).
- Uso do vídeo especificado.

---

# SECTION NAME: Portfolio Showcase

*(Conteúdo já descrito, agora dentro do template.)*

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
* ID: brand-campaigns
Label (UI): Brand & Campaigns
Label PT (explicativo): Brand & Campanhas
Thumbnail URL: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

* ID: videos-motions
Label (UI): Videos & Motions
Label PT (explicativo): Vídeos & Motions
Thumbnail URL: https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif

* ID: websites-webcampaigns-tech
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

# **SECTION NAME: Featured Projects**

**SECTION PURPOSE:**
- Exibir projetos em destaque
- Direcionar o usuário para mais detalhes

**PRIMARY MESSAGE / HEADLINE:**
- "Projetos em Destaque"

**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A

**KEY CONTENT ELEMENTS:**
- Grid de cards com imagens dos projetos
- Título, cliente, ano e categoria para cada projeto
- CTA "view projects"

**CALL TO ACTION:**
- Texto: "view projects"
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase (`/portfolio`)

**LAYOUT TYPE:**
- Grid responsivo com 1, 2 ou 3 colunas

**ALIGNMENT:**
- Horizontal: Cards centralizados
- Vertical: Centralizado verticalmente

**SPACING:**
- Padding interno: `py-12`
- Margem entre os cards: `gap-6`

**BACKGROUND:**
- Cor sólida cinza claro (`bg-[#F4F5F7]`)

**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto dos cards: `text-[#111111]`
- CTA: `bg-[#0057FF]`, `text-white`

**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`

**IMAGERY:**
- Imagens dos projetos

**MEDIA:**
- N/A

**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`, `<a>`

**STATE VARIANTS:**
- Hover no card: Leve elevação (`translateY(-5px)`) e sombra
- Hover no CTA: Leve elevação (`translateY(-1px)`)

**INTERACTIONS:**
- Clique no card: Redireciona para a página do projeto
- Clique no CTA: Redireciona para `/portfolio`

**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport

**ANIMATIONS:**
- Entrada da seção:
  - Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1, y: 0 }}
  - Cards: staggerChildren: 0.08
  - Cada card:
    - initial={{ opacity: 0, y: 24, scale: 0.96 }}
    - whileInView={{ opacity: 1, y: 0, scale: 1 }}
- Hover nos cards:
  - Imagem: whileHover={{ scale: 1.03, y: -4 }}
  - Overlay gradiente suave escuro + título em branco com fadeUp
  - Shadow: shadow-xl + shadow-blue-500/15
- Card "Like what you see? view projects":
  - Botão com o mesmo hover do CTA da hero
  - Ícone de seta com animação sutil de x (0 → 4px → 0) em loop lento

**MICRO-INTERACTIONS:**
- Feedback visual ao hover no card e no CTA

**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Título dos projetos: Máximo 50 caracteres
- Cliente: Máximo 30 caracteres
- Categoria: Máximo 30 caracteres
- CTA: Máximo 30 caracteres

**CONTENT PRIORITY:**
- Alta: Título e cards
- Média: CTA

**ALTERNATIVE CONTENT:**
- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem do projeto"

**LINKS / DESTINATIONS:**
- Cards: Link para a página do projeto
- CTA: `/portfolio`

### Projetos

- **Slug:** `magic-radio-branding`  
  **Título:** Magic — devolvendo a magia ao rádio  
  **Categoria:** branding & campanha  
  **Cliente:** Magic  
  **Ano:** 2023  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp

- **Slug:** `branding-project-01`  
  **Título:** Uma marca ousada e consistente  
  **Categoria:** branding  
  **Cliente:** Cliente confidencial  
  **Ano:** 2022  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

- **Slug:** `key-visual-campaign`  
  **Título:** Key visual para campanha sazonal  
  **Categoria:** campanha  
  **Cliente:** Cliente confidencial  
  **Ano:** 2021  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp

- **Slug:** `webdesigner-motion`  
  **Título:** Experiência web em movimento  
  **Categoria:** web & motion  
  **Cliente:** Cliente confidencial  
  **Ano:** 2023  
  **Imagem URL:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
  
  
**DATA HOOKS / TRACKING:**
- Eventos de clique nos cards e no CTA para analytics

**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.projectCards`

**ACCESSIBILITY NOTES:**
- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de entrada

**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro

**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**
- Grid de cards com imagens dos projetos
- Informações de cada projeto (título, cliente, ano, categoria)
- CTA que redireciona para a página Portfólio Showcase

---

# **SECTION NAME: Clients/Brands**

**SECTION PURPOSE:**
- Mostrar marcas com as quais o designer já trabalhou
- Construir confiança e credibilidade

**PRIMARY MESSAGE / HEADLINE:**
- "marcas com as quais já trabalhei"

**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A

**KEY CONTENT ELEMENTS:**
- Logos das marcas
- Faixa azul de fundo

**CALL TO ACTION:**
- N/A

**LAYOUT TYPE:**
- Grid de logos

**ALIGNMENT:**
- Horizontal: Logos centralizadas
- Vertical: Centralizado verticalmente

**SPACING:**
- Padding interno: `py-12`
- Margem entre os logos: `gap-4`

**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)

**SECTION COLORS:**
- Título: `text-white`
- Logos: Branco (`filter brightness-0 invert`)

**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold
- Tamanho: `text-xl md:text-2xl`

**IMAGERY:**
- Logos das marcas

**MEDIA:**
- N/A

**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`

**STATE VARIANTS:**
- Hover no logo: Leve escala (`scale(1.02)`)

**INTERACTIONS:**
- Hover no logo: Leve escala (`scale(1.02)`)

**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport

**ANIMATIONS:**
- Entrada:
  - Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y: 0 }}
  - Logos: staggerChildren: 0.03
  - Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{ opacity: 1, y: 0, scale: 1 }}
- Hover:
  - whileHover={{ scale: 1.04 }} + leve brightness(1.1)

**MICRO-INTERACTIONS:**
- Feedback visual ao hover no logo

**TEXT LIMITS:**
- Título: Máximo 50 caracteres

**CONTENT PRIORITY:**
- Alta: Título e logos

**ALTERNATIVE CONTENT:**
- Se nenhum logo for exibido, mostrar uma mensagem de erro

**LINKS / Globais:**
1. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg`
2. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg`
3. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg`
4. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg`
5. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg`
6. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg`
7. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg`
8. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg`
9. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg`
10. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg`
11. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg`
12. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg`

**DATA HOOKS / TRACKING:**
- Eventos de hover nos logos para analytics

**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.clients`

**ACCESSIBILITY NOTES:**
- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de entrada

**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro

**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**
- Faixa azul de fundo
- Logos das marcas
- Título "marcas com as quais já trabalhei"

---

# **SECTION NAME: Contact**

**SECTION PURPOSE:**
- Fornecer informações de contato
- Permitir que os usuários enviem mensagens

**PRIMARY MESSAGE / HEADLINE:**
- "contato"

**SECONDARY MESSAGE / SUPPORT TEXT:**
- "Tem uma pergunta ou quer trabalhar junto?"

**KEY CONTENT ELEMENTS:**
- Informações de contato (telefone, email, site)
- Formulário de contato
- Redes sociais

**CALL TO ACTION:**
- Texto: "Enviar Mensagem"
- Comportamento: Ao enviar, envia o formulário para o endpoint definido

**LAYOUT TYPE:**
- Duas colunas em desktop, uma em mobile

**ALIGNMENT:**
- Horizontal: Informações à esquerda, formulário à direita
- Vertical: Centralizado verticalmente

**SPACING:**
- Padding interno: `py-12`
- Margem entre as colunas: `space-x-8`

**BACKGROUND:**
- Cor sólida branca (`bg-white`)

**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto: `text-[#111111]`
- Botão: `bg-[#0057FF]`, `text-white`

**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`

**IMAGERY:**
- Ícones de redes sociais

**MEDIA:**
- N/A

**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`, `<button>`, `<a>`

**STATE VARIANTS:**
- Focus nos inputs: Borda e sombra
- Hover no botão: Leve elevação (`translateY(-1px)`)

**INTERACTIONS:**
- Envio do formulário: Envia os dados para o endpoint definido
- Clique nas redes sociais: Abre o link em nova aba

**SCROLL BEHAVIOUR:**
- N/A

**ANIMATIONS:**
- Entrada:
  - Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{ opacity: 0, y: 24 }}
  - Campos do formulário com staggerChildren
- Interações:
  - Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2 ring-offset-[#f5f5f7]
  - Botão "enviar mensagem":
    - whileHover={{ scale: 1.02, y: -1 }}
    - whileTap={{ scale: 0.98 }}

**MICRO-INTERACTIONS:**
- Feedback visual ao focus nos inputs e ao hover no botão

**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Subtítulo: Máximo 100 caracteres
- Inputs: Máximo 100 caracteres
- Botão: Máximo 30 caracteres

**CONTENT PRIORITY:**
- Alta: Título e formulário
- Média: Informações de contato e redes sociais

**ALTERNATIVE CONTENT:**
- Se o formulário não carregar, mostrar uma mensagem de erro

**LINKS / DESTINATIONS:**

- Formulário: Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`

- **Redes sociais: Links externos:**
    - Telefone: `tel:+5511983966838`
    - Email primário: `mailto:dannovaisv@gmail.com`
    - Email secundário: `mailto:danilo@portfoliodanilo.com`
    - Instagram: `https://instagram.com/danilo_novais`
    - Facebook: `https://facebook.com/danilonovaisvilela`
    - LinkedIn: `https://linkedin.com/in/danilonovais`
    - Portfolio: `https://portfoliodanilo.com`
    - Twitter: `https://twitter.com/danilo_novais`
    
**DATA HOOKS / TRACKING:**
- Eventos de envio do formulário para analytics

**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.contact`

**ACCESSIBILITY NOTES:**
- Todos os inputs devem ter `label` associado
- O formulário deve ser acessível via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações

**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
- Sucesso: Mostrar mensagem de sucesso

**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**
- Formulário de contato
- Informações de contato
- Redes sociais

---

## **SECTION NAME: Footer**

**SECTION PURPOSE:**
- Fornecer informações legais e de contato
- Permitir que os usuários voltem ao topo da página

**PRIMARY MESSAGE / HEADLINE:**
- N/A

**SECONDARY MESSAGE / SUPPORT TEXT:**
- "© 2025 Danilo Novais Vilela — todos os direitos reservados"

**KEY CONTENT ELEMENTS:**
- Copyright
- Links de navegação (Home, Portfolio Showcase, Brands, Contact)
- Redes sociais

**CALL TO ACTION:**
- N/A

**LAYOUT TYPE:**
- Barra fixa no rodapé da página

**ALIGNMENT:**
- Horizontal: Copyright à esquerda, links e redes sociais à direita
- Vertical: Centralizado verticalmente

**SPACING:**
- Padding interno: `py-4`
- Margem entre os elementos: `space-x-4`

**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)

**SECTION COLORS:**
- Texto: `text-white`
- Links: `text-white`, `hover:text-[#0057FF]`

**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Regular
- Tamanho: `text-sm`

**IMAGERY:**
- Ícones de redes sociais

**MEDIA:**
- N/A

**COMPONENTS USED:**
- `<footer>`, `<div>`, `<p>`, `<ul>`, `<li>`, `<a>`

**STATE VARIANTS:**
- Hover nos links: Muda a cor do texto para azul (`text-[#0057FF]`)

**INTERACTIONS:**
- Clique nos links: Redireciona para a página ou faz scroll até a seção
- Clique nas redes sociais: Abre o link em nova aba

**SCROLL BEHAVIOUR:**
- Fixo no rodapé da página (`fixed bottom-0 left-0 right-0`)

**ANIMATIONS:**
- Apenas um fadeIn simples:
  - initial={{ opacity: 0 }}
  - whileInView={{ opacity: 1 }}
- Links com sublinhado animado igual ao header; ícones sociais com hover scale(1.05) + leve mudança de opacidade

**MICRO-INTERACTIONS:**
- Feedback visual ao hover nos links

**TEXT LIMITS:**
- Copyright: Máximo 100 caracteres
- Links: Máximo 30 caracteres

**CONTENT PRIORITY:**
- Alta: Copyright e links de navegação
- Média: Redes sociais

**ALTERNATIVE CONTENT:**
- Se nenhuma rede social for exibida, mostrar uma mensagem de erro

**LINKS / DESTINATIONS:**
 - Copyright:
    - Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
    - Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos reservados.`  
     
  - Links:
    - `home` → `#hero`
    - `portfólio showcase` → `#portfolio-showcase`
    - `sobre` → `#clients` 
    - `contato` → `#contact`
    
**DATA HOOKS / TRACKING:**
- Eventos de clique nos links e redes sociais para analytics

**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.footer`

**ACCESSIBILITY NOTES:**
- Todos os links devem ter `aria-label` descritivo
- O footer deve ser navegável via teclado (tab)

**SPECIAL STATES:**
- N/A

**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`

**NON-NEGOTIABLES:**
- Footer fixo
- Copyright
- Links de navegação
- Redes sociais

---

⸻

## ** ANEXO TÉCNICO

Implementação de Estética de Vidro Líquido Interativo de Alta Fidelidade em Ambientes Web

Uma Análise Técnica Abrangente dos Fluxos de Trabalho React Three Fiber

Objetivo: Documentar de forma aprofundada o raciocínio técnico por trás da bola de vidro líquido da Hero, servindo como referência para ajustes futuros e novos experimentos 3D no portfólio.

⸻
1. Estratégia Global de Arquitetura e Performance
1.1. Configuração do Canvas e Scroll (R3F + Lenis)
Para garantir que os elementos 3D fixos ou flutuantes estejam perfeitamente sincronizados com o scroll suave do Lenis, o Canvas deve ser configurado para usar o DOM principal como fonte de eventos.
* Implementação:
    * Wrapper Global: O <Canvas> deve residir no layout.tsx ou num wrapper global, posicionado com position: fixed; pointer-events: none;.
    * Event Source: Propriedade obrigatória para corrigir o raycasting do mouse durante o scroll: <Canvas eventSource={document.body} ... />.
    * DPR (Device Pixel Ratio): Limitar para economizar GPU em telas Retina/4K.
        * Config: dpr={[1, 1.5]} (Permite no máximo 1.5x de densidade, visualmente indistinguível de 2x/3x mas muito mais leve).
1.2. Estratégia de Performance WebGL (Mobile Tiering)
O uso de materiais de vidro (MeshTransmissionMaterial) é custoso. Devemos implementar uma estratégia de degradação graciosa para dispositivos móveis.
* Hook de Detecção: Criar/usar hook useMobile para definir a qualidade.
* Configuração de Material:
    * Desktop: samples={16}, resolution={1024}, transmission={1}.
    * Mobile: samples={4}, resolution={512}, anisotropy={0}.
    * Fallback Extremo: Se FPS < 30, trocar o material de transmissão por um MeshPhysicalMaterial simples (vidro fosco estático) sem refração em tempo real.
1.3. UX e Estado de Carregamento (Preloader)
Como o site carrega modelos e texturas pesadas, o estado "branco" inicial deve ser evitado.
* Overlay de Preloader:
    * Componente fixed z-50 cobrindo a tela.
    * Uso do hook useProgress do @react-three/drei.
    * Mostrar progresso numérico ou visual minimalista.
    * Transição: Quando progress === 100, disparar animação de saída (fade-out/slide-up) do overlay e disparar a entrada dos elementos da Home via Store global (Zustand).
    
2. Fundamentos Arquiteturais do WebGL Moderno

2.1. O Paradigma React Three Fiber (R3F)
    •    R3F é um reconciliador, assim como o react-dom, mas para objetos Three.js.
    •    A cena 3D passa a ser descrita de forma declarativa, guiada por estado React.
    •    Benefícios:
    •    Reutiliza hooks e sistema de estado (Zustand, Context API, etc.)
    •    Facilita controlar propriedades de objetos 3D a partir do DOM (scroll, mouse, inputs).

2.1.1. Loop de Renderização e useFrame
    •    No Three.js puro, o dev cria o requestAnimationFrame manualmente.
    •    Em R3F, useFrame injeta lógica a cada frame, com acesso a:
    •    state.clock e delta (tempo entre frames).
    •    Isso permite animações independentes do frame rate, essenciais para:
    •    distorções temporais de material (temporalDistortion)
    •    rotação suave baseada em scroll.

2.2. Papel do @react-three/drei
    •    Drei é uma coleção de helpers e componentes de alto nível.
    •    Para este projeto, o mais importante é o MeshTransmissionMaterial, que:
    •    encapsula shaders complexos de transmissão/refração
    •    gerencia buffers internos para capturar o que está “atrás” do vidro
    •    expõe props de alto nível (distortion, chromaticAberration, etc.)
    •    Sem ele, seria necessário:
    •    configurar WebGLRenderTarget
    •    gerenciar render pass separado para o fundo
    •    escrever shader GLSL customizado para refração em screen-space.

⸻

3. Pipeline de Ativos: do GLB para JSX

3.1. Sobre o formato GLB
    •    GLB é o padrão moderno para 3D na web:
    •    carrega geometria, texturas, animações e hierarquias em um único arquivo binário.
    •    Porém, carregar apenas com:

const { scene } = useGLTF('/media/torus_dan.glb');
<primitive object={scene} />

dificulta customizar materiais em nível de mesh.

3.2. Ferramenta gltfjsx
    •    gltfjsx percorre o GLB e gera um componente React:

npx gltfjsx public/media/torus_dan.glb --transform

    •    Saída (simplificada):

import { useGLTF } from '@react-three/drei';

export function TorusDan(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/media/torus_dan.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Torus.geometry}>
        {/* material será substituído */}
      </mesh>
    </group>
  );
}

    •    Isso permite injetar o MeshTransmissionMaterial diretamente na mesh correta.

3.3. Otimização e Draco
    •    A flag --transform aplica:
    •    normalização de escala
    •    centralização
    •    compressão Draco da geometria.
    •    Benefícios:
    •    reduz tamanho do GLB
    •    acelera carregamento em redes móveis
    •    mantém qualidade alta para o efeito de vidro (que se beneficia de mais polígonos).

⸻

4. Física do Vidro Líquido: MeshTransmissionMaterial

4.1. Transmissão em PBR
    •    Diferente de simples opacity, transmissão simula:
    •    Refração: desvio da luz ao atravessar o material.
    •    Absorção: atenuação da luz com a espessura (Lei de Beer-Lambert).
    •    Espalhamento: difusão interna (efeito “leitosa” / subsurface).

4.2. Parâmetros principais (visão prática)
    •    transmission: controla a transparência (para o toro, 1.0).
    •    thickness: simula volume; valores médios (0.4–0.8) funcionam bem.
    •    roughness: rugosidade superficial; vidros líquidos pedem valores bem baixos (0–0.2).
    •    ior: índice de refração; 1.1–1.3 dá aspecto “aquoso” sem exagerar reflexos internos.
    •    chromaticAberration: separa levemente canais de cor nas bordas; ótimo para realismo.
    •    distortion / distortionScale: definem amplitude e frequência das ondas líquidas.
    •    temporalDistortion: anima o padrão de distorção ao longo do tempo.
    •    backside: importante para ver a espessura interna de toros e objetos fechados.

4.2.1. Distorção
    •    O shader aplica ruído nas coordenadas de lookup da textura de fundo.
    •    Amplitude média (≈0.5) cria:
    •    aparência de gel / água suspensa
    •    sem destruir a legibilidade da forma.

4.2.2. IOR e realismo
    •    Vidro real ≈ 1.5, diamante ≈ 2.4.
    •    Para web criativa:
    •    1.1–1.3 equilibra realismo e legibilidade
    •    evita áreas pretas causadas por reflexões internas totais exageradas.

⸻

5. Ambiente e Iluminação

5.1. Ambiente HDRI
    •    Environment preset="city" fornece:
    •    áreas de alto contraste (janelas, céu)
    •    bons highlights especulares no vidro.
    •    Opção:
    •    background={false} → usa HDRI apenas como iluminação, fundo controlado via CSS.

5.2. Luzes analíticas
    •    Combinar:
    •    ambientLight baixa para preenchimento.
    •    directionalLight ou spotLight com angle pequeno para rim light.
    •    Efeito:
    •    silhueta do toro bem recortada
    •    destaques fortes que reforçam a sensação de superfície molhada.

⸻

6. Interatividade e Animação

6.1. Mouse Parallax

6.1.1. Otimização com state do R3F
    •    Ao invés de listeners globais de mousemove, usar state.mouse dentro de useFrame:

useFrame((state, delta) => {
  const { mouse } = state; // -1 → 1
  // aplicar em rotação/posição com damp
});

    •    Benefícios:
    •    Menos overhead de event listeners
    •    Sincronizado com o loop de render do R3F.

6.2. Scroll Controlado
    •    ScrollControls + useScroll:

<ScrollControls pages={4} damping={0.3}>
  <TorusDan />
</ScrollControls>

    •    No modelo:

const scroll = useScroll();

useFrame((state, delta) => {
  const offset = scroll.offset; // 0 → 1
  const target = offset * Math.PI * 4;
  mesh.current.rotation.y = THREE.MathUtils.damp(
    mesh.current.rotation.y,
    target,
    4,
    delta
  );
});

    •    Sensação final:
    •    o usuário “gira” o toro conforme percorre a seção
    •    animação física / suave (sem travadas).

⸻

7. Guia de Implementação (Resumo Passo a Passo)
    1.    Projeto
    •    Next.js App Router + TypeScript
    •    Instalar:
    •    three
    •    @react-three/fiber
    •    @react-three/drei
    •    framer-motion
    2.    Ativo 3D
    •    Salvar torus_dan.glb em public/media.
    •    Rodar gltfjsx com --transform.
    3.    Cena Principal
    •    Criar componente HeroGlassScene.tsx com <Canvas> + <Environment> + luzes.
    4.    Modelo Interativo
    •    Usar componente gerado (TorusDan)
    •    Substituir material pelo MeshTransmissionMaterial.
    •    Conectar useScroll & useFrame.
    5.    Integração com Layout
    •    Embed do Canvas em container responsivo.
    •    Sincronizar altura da seção hero com animação do vídeo manifesto.
    6.    Performance
    •    Ajustar samples e resolution de acordo com device.
    •    Usar Suspense + fallback leve para carregamento do GLB.

⸻

8. Performance e Otimização

8.1. Resolução e samples
    •    Reduções possíveis sem degradar demais o visual:
    •    resolution: 1024 → 512
    •    samples: 16 → 6 em laptops / mobile.

8.2. Múltiplos Objetos de Vidro
    •    Caso a cena ganhe mais elementos de vidro:
    •    avaliar uso de transmissionSampler compartilhado.
    •    ou limitar objetos de vidro ao hero para manter FPS.

8.3. Mobile
    •    Estratégia sugerida:
    •    Dispositivos high-end:
    •    manter MeshTransmissionMaterial completo.
    •    Dispositivos low-end:
    •    reduzir qualidade OU
    •    fallback para MeshPhysicalMaterial translúcido sem refração pesada.

⸻

9. Conclusão

A bola de vidro líquido do hero não é apenas um elemento decorativo, mas uma peça central de branding que:
    •    Comprime o discurso “Design, não é só estética.” em uma forma viva, tátil e interativa.
    •    Demonstra domínio técnico de WebGL/R3F alinhado à estratégia de posicionamento.
    •    Traz para o portfólio de Danilo a mesma sensibilidade de movimento e refinamento visual de experiências como loandbehold.studio.

A combinação de:
    •    MeshTransmissionMaterial
    •    ScrollControls + useScroll
    •    useFrame + state.mouse

cria uma pipeline reutilizável para futuros experimentos de vidro líquido, blobs, shapes abstratos e outras formas 3D de alta fidelidade dentro do portfólio.

⸻

9. Referência Rápida de Parâmetros

Valores típicos para o material da bola de vidro na hero (podem ser refinados em desenvolvimento).

    •    transmission: 1.0
    •    thickness: 0.4 – 0.8
    •    roughness: 0.0 – 0.15
    •    ior: 1.2 – 1.3
    •    chromaticAberration: 0.04 – 0.07
    •    distortion: 0.45 – 0.6
    •    distortionScale: 0.3 – 0.45
    •    temporalDistortion: 0.18 – 0.3
    •    samples: 12 – 16 (desktop), 4 – 8 (mobile high-end)
    •    resolution: 512 – 1024

⸻

9.1. Snippet de Rotação com Amortecimento

useFrame((state, delta) => {
  const scrollOffset = scroll.offset; // 0 → 1
  const targetRotation = scrollOffset * Math.PI * 2;

  mesh.current.rotation.y = THREE.MathUtils.damp(
    mesh.current.rotation.y,
    targetRotation,
    4,
    delta
  );
});


⸻

9.2. Caminho do Arquivo GLB
    •    Arquivo físico: public/media/torus_dan.glb
    •    Caminho de carregamento em R3F:

useGLTF('/media/torus_dan.glb');


