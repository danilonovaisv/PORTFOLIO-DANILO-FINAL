
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

----

# **SECTION NAME: Hero**

**SECTION PURPOSE (what this section must achieve):**

* Apresentar a proposta de valor do designer.
* Criar impacto visual inicial com elemento 3D.
* Estabelecer ritmo editorial e narrativa visual.
* Direcionar o usuário para a próxima etapa (seção Sobre/Manifesto).

---

**PRIMARY MESSAGE / HEADLINE:**

* `Design, não é só estética.`

---

**SECONDARY MESSAGE / SUPPORT TEXT:**

* `[É intenção, é estratégia, é experiência.]`

---

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**

* Tag `[BRAND AWARENESS]` alinhada ao H1.
* Headline em 3 linhas (`Design`, `não é só`, `estética.`).
* Subheadline em bloco branco translúcido.
* CTA principal `get to know me better →`.
* Elemento 3D (modelo GLB com material de vidro).
* Thumb de vídeo manifesto (mesmo vídeo da seção Manifesto):
  * Autoplay.
  * Loop.
  * Muted.
  * **Sem texto, badge ou ícone sobreposto.**

---

**CALL TO ACTION (if any):**

* Texto: `get to know me better →`
* Destino: `/sobre`.

---

**LINKS GLOBAIS:**

* CTA → `/sobre`.
* Thumb → `#manifesto`.

---

**Manifesto (Vídeo)**

* Vídeo URL (compartilhado entre thumb e full):
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

---

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**

* Desktop / Tablet: Hero em 2 colunas.
* Mobile: Hero em 1 coluna.

---

**ALIGNMENT (left/center/right, vertical alignment):**

* Desktop:
  * Texto à esquerda.
  * 3D + thumb à direita.
* Mobile:
  * Conteúdo empilhado verticalmente.
  * Thumb full-width abaixo do CTA.
* Conteúdo centralizado verticalmente.

---

**SPACING (top/bottom padding, breathing room):**

* Desktop:
  * Padding: `p-8`.
  * Espaço horizontal: `space-x-8`.
* Mobile:
  * Padding: `p-6`.
  * Espaço vertical ampliado entre CTA e thumb.

---

**BACKGROUND (color, gradient, image, video):**

* Cor sólida cinza claro `#F4F5F7`.

---

**SECTION COLORS (overrides or specific tokens):**

* Texto principal: `#111111`.
* Texto secundário e tag: `#0057FF`.
* CTA: fundo `#0057FF`, texto `#FFFFFF`.

---

**TYPOGRAPHY (any overrides for headings/body in this section):**

* Fonte: sans-serif neo-grotesca (Inter ou similar).
* Headline:
  * Mobile: `text-4xl`.
  * Tablet: `text-5xl`.
  * Desktop: `text-6xl`.
* Subtítulo:
  * Mobile: `text-base`.
  * Desktop: `text-lg`.

---

**IMAGERY (what to show: photos, illustrations, icons, logos):**

* Modelo 3D `/public/models/torus_dan.glb`.
* Thumb do vídeo manifesto (frame do próprio vídeo, sem overlay).

---

**MEDIA (video, animation, Lottie, 3D, etc.):**

* Elemento 3D animado (rotação suave + parallax).
* Thumb com vídeo manifesto em autoplay (loop, mudo, sem texto/ícones).

---

**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**

* Estrutura: `<section>`, `<div>`, `<h1>`, `<p>`, `<button>`.
* 3D: `<Canvas>`, `<ModelCanvas>`.
* Vídeo (thumb): `<video>` / `motion.video`.

---

**STATE VARIANTS (hover, active, focus, disabled, selected):**

* CTA:
  * Hover: `scale 1.03` + `translateY -1px`.
  * Tap: `scale 0.98`.
* Thumb:
  * Hover (desktop): `scale 1.02`.
  * **Sem ícone de play.**

---

**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**

* Clique no CTA: navega para `/sobre`.
* Clique/tap na thumb: scroll suave até `#manifesto`.
* Movimento do mouse (desktop): parallax sutil no elemento 3D.
* Scroll dentro da Hero:
  * Thumb ganha leve escala e parallax.
  * Texto perde protagonismo progressivamente.
  * **Thumb não vira fullscreen.**

---

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**

* Altura:
  * Desktop: ≈ `100vh`.
  * Mobile: ≥ `85vh`.
* Sem sticky global.
* Scroll progressivo baseado em `scrollYProgress`.

---

**ANIMATIONS (what moves, when, duration, easing):**

* Entrada do texto:
  * Mobile: `y 16 → 0`, `opacity 0 → 1`, `0.6s`.
  * Tablet: `y 20 → 0`, `0.7s`.
  * Desktop: `y 24 → 0`, `0.8s`.
  * Easing: `easeOut` / `cubic-bezier(0.22,1,0.36,1)`.
  * `staggerChildren`: `0.06–0.1s`.

* Thumb (entrada):
  * Mobile: `scale 1.03 → 1`.
  * Tablet: `scale 1.04 → 1`.
  * Desktop: `scale 1.05 → 1`.
  * `opacity 0 → 1`.

* Thumb (scroll):
  * Mobile:
    * `scale 1 → 1.04`
    * `translateY 0 → -12px`
  * Tablet:
    * `scale 1 → 1.06`
    * `translateY 0 → -18px`
  * Desktop:
    * `scale 1 → 1.08`
    * `translateY 0 → -24px`

* Texto (scroll):
  * Mobile: `opacity 1 → 0.4`, `y 0 → -12px`.
  * Tablet: `opacity 1 → 0.3`, `y 0 → -18px`.
  * Desktop: `opacity 1 → 0.2`, `y 0 → -24px`.

---

**MICRO-INTERACTIONS:**

* CTA com feedback imediato.
* Thumb com hover extremamente sutil (desktop apenas).

---

**TEXT LIMITS:**

* Headline: até 50 caracteres.
* Subtítulo: até 100 caracteres.
* CTA: até 30 caracteres.

---

**CONTENT PRIORITY:**

* Alta: Headline + elemento 3D.
* Média: Subheadline + CTA.
* Baixa: Tag + thumb.

---

**ALTERNATIVE CONTENT:**

* 3D: texto “Elemento 3D”.
* Vídeo: poster estático “Vídeo Manifesto”.

---

**DATA HOOKS / TRACKING:**

* `hero_cta_click`
* `hero_thumb_click`

---

**DEPENDENCIES:**

* `HOMEPAGE_CONTENT.hero`
* `ModelCanvas`

---

**ACCESSIBILITY NOTES:**

* Navegação por teclado completa.
* `aria-label` em CTA e thumb.
* `prefers-reduced-motion`:
  * Desativar parallax e scale.
  * Manter apenas fade-in simples.
* Vídeo da thumb sempre mudo.

---

**NON-NEGOTIABLES:**

* Sem fullscreen na Hero.
* Sem overlays sobre vídeo.
* Thumb sempre em autoplay mudo.
* Transferência de foco do texto para a mídia via scroll.




# **SECTION NAME: Manifesto (Vídeo)**

**SECTION PURPOSE (what this section must achieve):**

* Apresentar o vídeo manifesto em destaque.
* Consolidar a narrativa iniciada na Hero.
* Reforçar valores, processo e posicionamento.

---

**PRIMARY MESSAGE / HEADLINE:**

* `TBD`

---

**SECONDARY MESSAGE / SUPPORT TEXT:**

* `TBD`

---

**KEY CONTENT ELEMENTS:**

* Vídeo manifesto em destaque (full).
* **Sem overlays visuais sobre o vídeo.**
* Texto opcional acima ou abaixo do player.

---

**LINKS GLOBAIS:**

* Âncora: `#manifesto`.

---

**Manifesto (Vídeo)**

* URL:
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

---

**LAYOUT TYPE:**

* Seção de mídia em destaque (hero secundário).

---

**ALIGNMENT:**

* Vídeo centralizado.
* Texto auxiliar acima ou abaixo.

---

**SPACING:**

* Padding vertical: `py-16`.
* Mobile pode usar full-bleed.

---

**BACKGROUND:**

* Fundo neutro escuro ou padrão do site.

---

**MEDIA:**

* `<video>` ou `motion.video`.
* Autoplay.
* Loop.
* Som ativo **apenas enquanto a seção estiver em foco**.

---

**INTERACTIONS:**

* Entrada na viewport:
  * Vídeo toca automaticamente.
  * Tentativa de ativar áudio.
* Saída da viewport:
  * Vídeo continua tocando.
  * Áudio retorna para `muted`.

---

**SCROLL BEHAVIOUR:**

* Fade-in na entrada.
* Sem sticky.
* Controle de áudio via `IntersectionObserver`.

---

**ANIMATIONS:**

* Container:
  * `opacity 0 → 1`
  * `scale 0.98 → 1`
* Sem animações sobre o vídeo.

---

**DATA HOOKS / TRACKING:**

* `manifesto_video_auto_play`
* `manifesto_video_complete`
* `manifesto_audio_unmuted_auto`
* `manifesto_audio_muted_on_leave`

---

**ACCESSIBILITY NOTES:**

* `aria-label` nos controles.
* Legendas ou transcrição recomendadas.
* Fallback para autoplay bloqueado:
  * Inicia mudo.
  * Som apenas após interação.

---

**NON-NEGOTIABLES:**

* Vídeo em destaque (full).
* Mesmo arquivo da Hero.
* Sem texto ou ícones sobrepostos.
* Som ativo somente enquanto a seção estiver em foco.

