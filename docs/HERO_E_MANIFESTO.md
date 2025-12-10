:PORT DAN REVISADO - NEXT.md

# Documento de Especificação Técnica — Home Page

**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

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
  - Adição: Implementar <Environment preset="city" /> (ou textura customizada .hdr) com blur={1} e baixa intensidade para gerar reflexos realistas na superfície da esfera sem mostrar um fundo explícito.
* Interatividade:
  - Movimento do mouse afeta levemente a rotação da esfera (efeito parallax).
  - Scroll altera a distorção (chromaticAberration ou distortion) conforme o usuário desce.

**“NON-NEGOTIABLES” (things that cannot change in this section):**

- Elemento 3D animado (com fallback em motion-reduced).
- Título com animação de entrada.
- CTA para `/sobre`.
- Thumb com vídeo autoplay.
- Animação da thumb no scroll.

---

### Detalhes da Animação da Thumb do Vídeo Manifesto (JS Puro — Alternativa)

_(Mantido como bloco técnico extra, mas não exigido como implementação principal.)_

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

/Users/PROJETOS DEV/_danilonov_portfolio/docs/HERO_E_VIDEO_MANIFESTO.png
