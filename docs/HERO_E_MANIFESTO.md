
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---



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


# **SECTION NAME: Hero**

**SECTION PURPOSE (what this section must achieve):**

* Apresentar a proposta de valor do designer.
* Criar impacto visual inicial com elemento 3D.
* Direcionar o usuário para a próxima etapa (seção Sobre/Manifesto).

**PRIMARY MESSAGE / HEADLINE:**

* `Design, não é só estética.`

**SECONDARY MESSAGE / SUPPORT TEXT:**

* `[É intenção, é estratégia, é experiência.]`

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**

* Tag `[BRAND AWARENESS]` alinhada ao H1.
* Headline em 3 linhas (`Design`, `não é só`, `estética.`).
* Subheadline em bloco branco translúcido.
* CTA principal `get to know me better →`.
* Elemento 3D (modelo GLB com material de vidro).
* Thumb de vídeo manifesto (mesmo vídeo da seção Manifesto):

  * **Autoplay, loop, mute.**
  * **Sem nenhum texto, badge ou ícone sobreposto ao vídeo.**

**CALL TO ACTION (if any):**

* CTA principal:

  * Texto: `get to know me better →`
  * Destino: `/sobre`.

**LINKS GLOBAIS:**

* CTA envia para `/sobre`.
* Thumb rola até `#manifesto` (seção Manifesto – Vídeo).

**Manifesto (Vídeo)**

* Vídeo URL (compartilhado entre thumb e full):
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**

* Hero section com 2 colunas (desktop) e 1 coluna (mobile).

**ALIGNMENT (left/center/right, vertical alignment):**

* Horizontal:

  * Texto à esquerda; 3D + thumb à direita.
* Vertical:

  * Conteúdo centralizado verticalmente.

**SPACING (top/bottom padding, breathing room):**

* Padding interno `p-8`.
* Espaço horizontal `space-x-8`.

**BACKGROUND (color, gradient, image, video):**

* Cor sólida cinza claro `#F4F5F7`.

**SECTION COLORS (overrides or specific tokens):**

* Texto principal: `#111111`.
* Texto secundário e tag: `#0057FF`.
* CTA: fundo `#0057FF`, texto `#FFFFFF`.

**TYPOGRAPHY (any overrides for headings/body in this section):**

* Fonte: sans-serif neo-grotesca (Inter ou similar).
* Título: peso heavy, `text-4xl` em mobile, `text-6xl` em desktop.
* Subtítulo: peso médio, `text-lg`.

**IMAGERY (what to show: photos, illustrations, icons, logos):**

* Modelo 3D `/public/models/torus_dan.glb`.
* Thumb do vídeo manifesto (frame do próprio vídeo, sem overlay).

**MEDIA (video, animation, Lottie, 3D, etc.):**

* Elemento 3D animado (rotação + parallax).
* Thumb com vídeo manifesto em autoplay (loop, mudo, sem texto/ícones).

**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**

* Estrutura: `<section>`, `<div>`, `<h1>`, `<p>`, `<button>`.
* 3D: `<Canvas>`, `<ModelCanvas>`.
* Vídeo (thumb): `<video>` / `motion.video`.

**STATE VARIANTS (hover, active, focus, disabled, selected):**

* CTA:

  * Hover: leve elevação.
  * Tap: compressão sutil.
* Thumb:

  * Hover (desktop): leve escala (parallax/zoom sutil), **sem ícone de play**.

**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**

* Clique no CTA: navega para `/sobre`.
* Clique/tap na thumb (área inteira do vídeo): rola para `#manifesto` com scroll suave.
* Movimento do mouse: parallax no elemento 3D (ligado ao cursor).
* Scroll dentro da Hero:

  * Parallax leve da thumb.
  * Texto perde um pouco de opacidade para o vídeo ganhar protagonismo.
  * **Sem transformação da thumb em full-screen dentro da Hero**; a versão full acontece apenas na seção Manifesto.

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**

* Seção com altura ≈ `100vh`.
* Sem sticky global (`no sticky 200vh`).
* Parallax leve aplicado à thumb e ajusta opacidade/posição do bloco de texto via `scrollYProgress`.

**ANIMATIONS (what moves, when, duration, easing):**

* Título:

  * Animação de entrada (pode ser “3D flip” suave ou `translateY + opacity`).
  * `staggerChildren` entre linhas/palavras.
  * `prefers-reduced-motion`: fallback para simples fade + translateY.
* Thumb do vídeo:

  * Entrada: fade-in + scale (`1.05 → 1.0`).
  * Scroll: animação de escala (`1.0 → ~1.08`) e `translateY` inverso (parallax suave).
* Texto e tag:

  * Opacidade reduzida conforme o scroll avança (ex.: `1 → ~0.2` até 60–70% de `scrollYProgress`).
  * Pequeno `translateY` para cima.
* CTA:

  * Microanimações em hover/tap (scale, y).

**MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):**

* Hover no CTA com feedback imediato (scale + sombra).
* Hover na thumb com leve escala/parallax (sem aparecer ícone ou texto sobre o vídeo).

**TEXT LIMITS (max characters for headline, body, CTA):**

* Título: até 50 caracteres.
* Subtítulo: até 100 caracteres.
* CTA: até 30 caracteres.

**CONTENT PRIORITY (what must be seen first):**

* Alta: Título e elemento 3D.
* Média: Subtítulo e CTA.
* Baixa: Tag e thumb.

**ALTERNATIVE CONTENT (fallback if image/video not available):**

* Elemento 3D: texto “Elemento 3D”.
* Thumb/vídeo: texto “Vídeo Manifesto”.

**LINKS / DESTINATIONS (where CTAs point):**

* CTA: `/sobre`.
* Thumb: `#manifesto`.

**DATA HOOKS / TRACKING (events to track in analytics):**

* Clique no CTA (`hero_cta_click`).
* Clique na thumb (`hero_thumb_click`).

**DEPENDENCIES (APIs, forms, integrations for this section):**

* `HOMEPAGE_CONTENT.hero`.
* `ModelCanvas` (3D).

**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**

* Título com `aria-label` se necessário.
* CTA e thumb navegáveis via teclado.
* Respeitar `prefers-reduced-motion` (desativar rotação e parallax no 3D e animações ligadas ao scroll).
* Mesmo com autoplay, vídeo da thumb permanece **sempre mudo**.

**SPECIAL STATES (empty state, error state, loading state):**

* Carregamento:

  * Spinner/placeholder para vídeo/3D.
* Erro:

  * Mensagem de erro simples.

**NOTES / INSPIRATION (links, references, moodboards):**

* Animação do título: [https://codepen.io/cbolson/pen/NPNjvOQ](https://codepen.io/cbolson/pen/NPNjvOQ)
* Elemento 3D: [https://youtu.be/9FDt6tuFP-k?si=kpet4Xc8Od3B_t5X](https://youtu.be/9FDt6tuFP-k?si=kpet4Xc8Od3B_t5X)
* Layout: `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
* Thumb: [https://loandbehold.studio/](https://loandbehold.studio/)

**REFERENCES:**

* Arquivos de layout internos.
* Sites de referência mencionados.

**ELEMENTE BOLA DE VIDRO:**

* Contexto: Introdução imersiva com esfera de vidro refrativa.
* Visual 3D: Esfera de vidro (MeshTransmissionMaterial) distorcendo o background ou uma imagem interna.
* Iluminação (Crítico): Vidro precisa de reflexos para parecer real.

  * Adição: Implementar `<Environment preset="city" />` (ou textura customizada .hdr) com `blur={1}` e baixa intensidade para gerar reflexos realistas na superfície da esfera sem mostrar um fundo explícito.
* Interatividade:

  * Movimento do mouse afeta levemente a rotação da esfera (efeito parallax).
  * Scroll altera a distorção (chromaticAberration ou distortion) conforme o usuário desce.

**“NON-NEGOTIABLES” (things that cannot change in this section):**

* Elemento 3D animado (com fallback em motion-reduced).
* Título com animação de entrada.
* CTA para `/sobre`.
* Thumb com vídeo autoplay (loop, mudo, sem overlay).
* Animação da thumb no scroll (scale/parallax + texto perdendo foco).

---

### **Detalhes da Animação da Thumb do Vídeo Manifesto**

*(Versão inspirada na hero em vídeo de `https://loandbehold.studio/` – foco em entrada suave e parallax leve.)*

> Mantido como bloco técnico extra, guia de comportamento para implementação (Framer Motion + React).

* **Posicionamento inicial (estado 0):**

  * Thumb do vídeo manifesto posicionada na **parte inferior direita da Hero**, alinhada à coluna de conteúdo visual (lado direito em desktop, full-width acima/abaixo do texto em mobile).
  * Ocupa ~40–50% da largura útil da hero em desktop, com **cantos levemente arredondados** e borda/outline sutil para destacá-la do fundo.

* **Comportamento na ENTRADA da página (on load):**

  1. A página carrega com o header + fundo neutro da hero.
  2. O **vídeo da thumb** entra com **fade-in** (`opacity: 0 → 1`) + **scale leve** (`1.05 → 1.0`), como se “ganhasse foco” após o carregamento.
  3. Tag `[BRAND AWARENESS]`, H1, subtítulo e CTA entram em sequência com `translateY + opacity` (`y: 12–24px → 0`, `opacity: 0 → 1`), com `stagger` curto (tag → H1 → subtítulo → CTA → thumb).

* **Comportamento no SCROLL (parallax suave, sem virar full-screen):**

  1. A seção Hero ocupa aproximadamente a altura do viewport (≈ `100vh`).
  2. À medida que o usuário rola de `scrollYProgress = 0 → 1` **dentro da Hero**:

     * **Thumb do vídeo**:

       * `scale`: `1.0 → ~1.08`.
       * `translateY`: `0 → -24px` (parallax leve, deslocamento contrário ao scroll).
     * **Texto da hero** (tag, H1, subtítulo, CTA):

       * `opacity`: `1 → ~0.2` até ~60–70% de `scrollYProgress`.
       * `translateY`: `0 → -16/24px`.
  3. A thumb **não** se transforma em vídeo tela cheia dentro da Hero.

     * Ela simplesmente sai do viewport com o scroll, e a próxima seção (Manifesto – Vídeo) assume o papel de vídeo em destaque (formato full).

* **Interações diretas com a thumb:**

  * **Hover (desktop):**

    * Leve aumento de escala da thumb (`scale: 1.0 → 1.02`).
    * Nenhum ícone, badge ou texto sobreposto ao vídeo — foco total no conteúdo do vídeo.
  * **Tap/Click (desktop e mobile):**

    * Não abre modal.
    * Ao clicar/tocar, **rola suavemente até `#manifesto`** (`scrollIntoView({ behavior: 'smooth' })` ou equivalente).
    * Tracking: evento `hero_thumb_click`.

* **Comportamento do vídeo em si (na thumb):**

  * `autoplay={true}`, `loop={true}`, `muted={true}`, `playsInline`.
  * **Sempre mudo** na Hero; o áudio é responsabilidade da seção Manifesto (full).
  * **Sem qualquer overlay** (sem texto, sem ícone, sem badge de play).
  * Opcional: leve “drift” de enquadramento via `transform: scale(1.02 → 1.05)` em loop bem lento, desde que não conflite com `prefers-reduced-motion`.
  * Em dispositivos com restrição de autoplay:

    * Fallback: frame estático do vídeo ou poster, ainda **sem overlay**.
    * Comportamento de clique (scroll para `#manifesto`) permanece.

* **Implementação sugerida (stack principal – Framer Motion):**

  ```ts
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const thumbScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const thumbTranslateY = useTransform(scrollYProgress, [0, 1], [0, -24])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])
  const textTranslateY = useTransform(scrollYProgress, [0, 0.7], [0, -24])
  ```

  * Entrada da thumb:

    ```tsx
    <motion.video
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      muted
      autoPlay
      loop
      playsInline
      ...
    />
    ```

* **Alternativa em JS puro (fallback conceitual):**

  * Listener de scroll + `requestAnimationFrame`:

    * `progress = clamp01((scrollY - heroTop) / heroHeight)`.
    * `scale = lerp(1.0, 1.08, progress)`.
    * `translateY = lerp(0, -24, progress)`.
    * `opacityTexto = lerp(1, 0.2, min(progress, 0.7))`.
  * Aplicar via `style.transform` e `style.opacity`.

* **Easing / sensação de movimento:**

  * Curvas suaves (`easeOut`, `easeInOut`), sem overshoot.
  * Transformações em ranges curtos (pouca escala, poucos pixels).

* **Performance:**

  * Animar apenas `transform` e `opacity`.
  * `will-change: transform, opacity` na thumb somente enquanto a Hero estiver visível.

* **Acessibilidade / motion-reduction:**

  * Respeitar `prefers-reduced-motion: reduce`:

    * Desativar animações ligadas a `scrollYProgress`.
    * Manter apenas um fade-in simples na entrada da Hero.
  * Vídeo da thumb permanece sempre mudo; áudio só existe na seção Manifesto.
  * Thumb clicável com `role="button"` (se não for link direto) e `aria-label="Ir para manifesto em vídeo"`.

---

# **SECTION NAME: Manifesto (Vídeo)**

**SECTION PURPOSE (what this section must achieve):**

* Apresentar o vídeo manifesto em destaque, consolidando o que foi introduzido na Hero.
* Reforçar valores, processo e posicionamento de Danilo em formato audiovisual.

**PRIMARY MESSAGE / HEADLINE:**

* `TBD` (se houver título textual acima do vídeo).

**SECONDARY MESSAGE / SUPPORT TEXT:**

* `TBD` (pode haver breve texto contextual — opcional). **[SUGESTÃO]**

**KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):**

* Player de vídeo manifesto em destaque (formato full/hero secundário).
* **Vídeo limpo, sem overlay de texto, badges ou ícones sobre a área de vídeo.**
* Conteúdo textual (headline/descrição) pode existir **acima ou abaixo** do vídeo, nunca sobre ele.

**CALL TO ACTION (if any):**

* `TBD` — foco principal é assistir o vídeo; não há CTA textual obrigatório.

**LINKS GLOBAIS:**

* Âncora `#manifesto` para navegação a partir da Hero.

**Manifesto (Vídeo)**

* Vídeo URL (mesmo da Hero/thumb):
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**LAYOUT TYPE (hero, grid, list, carousel, form, etc.):**

* Seção de mídia em destaque (vídeo em posição de hero secundário).

**ALIGNMENT (left/center/right, vertical alignment):**

* Vídeo centralizado.
* Textos auxiliares (se existirem) alinhados acima/abaixo.

**SPACING (top/bottom padding, breathing room):**

* Padding vertical generoso (`py-16`).
* Margens laterais adequadas em desktop; full-bleed opcional em mobile.

**BACKGROUND (color, gradient, image, video):**

* Fundo: neutro escuro ou mesmo fundo do site, deixando o vídeo como foco.

**SECTION COLORS (overrides or specific tokens):**

* Textos auxiliares: branco ou cinza-claro sobre fundo escuro/neutro.

**TYPOGRAPHY (any overrides for headings/body in this section):**

* Se houver headline/descrição: fonte limpa, alta legibilidade.
* Microtexto manifesto (se usado): fonte pequena, alta legibilidade.

**IMAGERY (what to show: photos, illustrations, icons, logos):**

* O próprio vídeo é o foco visual.
* Evitar overlays gráficos fixos sobre o vídeo.

**MEDIA (video, animation, Lottie, 3D, etc.):**

* `<video>` ou `motion.video` (mesma fonte da Hero).
* **Autoplay, com som enquanto a seção estiver em foco/viewport.**
* Ao sair da seção (scroll para próxima), vídeo permanece tocando opcionalmente, mas **volta a ficar `muted`** para não vazar áudio.

**COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):**

* Player de vídeo (custom ou nativo).
* Controles podem ser:

  * Nativos do browser (barra de controle inferior), ou
  * Controles minimalistas fora da área do vídeo (abaixo), para manter o vídeo limpo.

**STATE VARIANTS (hover, active, focus, disabled, selected):**

* Estado tocando x pausado.
* Estado com som x mudo (tracking interno).

**INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):**

* Ao entrar na seção (`#manifesto` em viewport):

  * Vídeo **já está em autoplay** (loop) e
  * Se permitido pelo navegador, **áudio é desmutado automaticamente** enquanto a seção está em destaque.
* Ao sair da seção (scroll para próxima seção):

  * Vídeo continua em autoplay, porém **`muted = true`** para evitar áudio fora de contexto.
* Interações diretas:

  * Clique/tap no vídeo ou em controles externos: play/pause e mute/unmute manual — respeitando o estado automático de “som ativo apenas enquanto em viewport”.

**SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):**

* Entrada via fade-in ao chegar na área `#manifesto`.
* Não sticky (Hero já cumpre esse papel).
* Comportamento de áudio ligado a scroll:

  * Uso de `IntersectionObserver` ou `useScroll` para saber quando a seção está majoritariamente visível.

**ANIMATIONS (what moves, when, duration, easing):**

* Entrada do container de vídeo:

  * Fade-in + pequeno ajuste de escala (`scale: 0.98 → 1`).
* O próprio vídeo fornece a “animação” principal (conteúdo em movimento).
* Sem animações de overlay sobre o vídeo (sem badges, sem ícones animados sobre a imagem).

**MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):**

* Feedback visual discreto ao interagir com os controles (se existirem fora da área de vídeo).
* Possível indicador textual pequeno abaixo do vídeo (ex.: “som ligado / som desligado”), não sobre o vídeo.

**TEXT LIMITS (max characters for headline, body, CTA):**

* Se houver headline/descrição textual:

  * Manter bem curto (< 100 caracteres).

**CONTENT PRIORITY (what must be seen first):**

* Vídeo manifesto (full).

**ALTERNATIVE CONTENT (fallback if image/video not available):**

* Imagem estática + texto “Não foi possível carregar o manifesto em vídeo”.
* Link alternativo para YouTube/Vimeo. **[SUGESTÃO]**

**LINKS / DESTINATIONS (where CTAs point):**

* `TBD` — se houver CTA complementar (ex.: “ver portfólio”).

**DATA HOOKS / TRACKING (events to track in analytics):**

* `manifesto_video_play`.
* `manifesto_video_pause`.
* `manifesto_video_complete`.
* `manifesto_audio_unmuted_auto` (ao entrar na seção).
* `manifesto_audio_muted_on_leave` (ao sair da seção).

**DEPENDENCIES (APIs, forms, integrations for this section):**

* Vídeo armazenado em Supabase (mesma URL usada na Hero).
* Player de vídeo.
* Integração com hook de visibilidade (IntersectionObserver / `useInView`).

**ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):**

* Legendas ou transcrição textual do conteúdo do vídeo. **[SUGESTÃO]**
* `aria-label` para qualquer botão de play/pause ou mute/unmute.
* Respeitar configurações do usuário:

  * Muitos browsers bloqueiam autoplay com som; fallback:

    * Iniciar como **autoplay mudo**,
    * Ativar som somente após interação explícita, **tentando ainda assim manter a lógica de “som ligado enquanto em viewport, mudo ao sair”**.

**SPECIAL STATES (empty state, error state, loading state):**

* Loading: placeholder/skeleton.
* Erro: fallback textual + link externo, se disponível.

**NOTES / INSPIRATION (links, references, moodboards):**

* Continuar a linha de animação e clima imersivo iniciados na Hero.
* Manter sensação de “manifesto pessoal” em estúdio.

**REFERENCES:**

* Mesmo vídeo especificado globalmente.

**“NON-NEGOTIABLES” (things that cannot change in this section):**

* Existência de uma área clara na Home para o manifesto em vídeo.
* Uso do vídeo especificado (mesma URL da Hero).
* Formato full em autoplay.
* **Vídeo sem texto ou ícones sobrepostos.**
* **Som ativo apenas na versão full (Manifesto) e apenas enquanto a seção estiver em foco, voltando a mute ao sair.**
