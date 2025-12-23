# **Documento de Especificação Técnica — Home Page (Ghost Blue)**
**Projeto:** Portfólio Institucional de Danilo Novais  
**Páginas Principais:** Home, Sobre, Portfólio, Contato  
**Foco deste Documento:** Home Page (Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

---
## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto
- Site Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4, com experiência imersiva “Ghost Blue”.  
- Ordem das seções da Home: 1) Header 2) Hero 3) Manifesto (vídeo) 4) Portfolio Showcase 5) Featured Projects 6) Clients/Brands 7) Contact 8) Footer.  
- Stack visual: R3F + Drei + Postprocessing (Bloom + Analog Decay), Framer Motion para DOM, Lenis para scroll suave.  
- Deploy: Firebase Hosting/App Hosting; assets principais servidos via Supabase Storage (imagens, vídeo manifesto, logos).  
- Fontes: TT Norms Pro (local em `src/fonts`).

### 2. Assets Globais
- **Logo Light:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg  
- **Logo Dark:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg  
- **Favicon:** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg  
- **Vídeo Manifesto (Hero + Manifesto):** https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4  
- **Paleta Ghost:** fundo `#050505`, acento azul HDR `#0057FF`, texto `#d9dade`.

### 3. Conteúdo Global por Seção (dados base)
- Hero  
  - Tag: `[BRAND AWARENESS]`  
  - Título: “Design, não é / só estética.”  
  - Subtítulo: `[É intenção, é estratégia, é experiência.]`  
  - CTA primário: `get to know me better →` (`/sobre`)  
  - CTA secundário: scroll para `#manifesto`  
  - WebGL: ghost abstrato emissivo com pós-processamento, sem GLB.
- Portfolio Showcase  
  - Título: `portfólio showcase`  
  - Categorias (ID → Label → Thumb):  
    - `brand-campaigns` → `Brand & Campaigns` → https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp  
    - `videos-motions` → `Videos & Motions` → https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif  
    - `websites-webcampaigns-tech` → `Web Campaigns, Websites & Tech` → https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp  
  - CTA final: `VEJA MAIS →` (`/portfolio`)
- Featured Projects (cards)  
  - `magic-radio-branding` — Magic — devolvendo a magia ao rádio — branding & campanha — 2023 — https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp  
  - `branding-project-01` — Uma marca ousada e consistente — branding — 2022 — https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp  
  - `key-visual-campaign` — Key visual para campanha sazonal — campanha — 2021 — https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp  
  - `webdesigner-motion` — Experiência web em movimento — web & motion — 2023 — https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
- Clients / Brands  
  - Título: `marcas com as quais já trabalhei`  
  - Logos (1–12): https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client{1..12}.svg
- Contact  
  - Título: `contato` — Sub: `Tem uma pergunta ou quer trabalhar junto?`  
  - Form action: https://formsubmit.co/danilo@portfoliodanilo.com — CTA: `Enviar Mensagem`  
  - Links: tel:+5511983966838 | mailto:dannovaisv@gmail.com | mailto:danilo@portfoliodanilo.com | IG/FB/LinkedIn/Twitter/Portfolio (urls na lista Social).  
- Footer  
  - Copyright: preferencialmente `© 2025 Danilo Novais Vilela — todos os direitos reservados.` em todas as áreas.  
  - Links: home → #hero | portfólio showcase → #portfolio-showcase | sobre → /sobre | contato → #contact

### 4. Princípios Globais de Animação
- DOM (Framer Motion): reveals `whileInView`, microinterações `whileHover/whileTap`, scroll `useScroll/useTransform`.  
- Animar apenas `transform` e `opacity`; evitar `width/height` animado.  
- WebGL (R3F): `useFrame` para flutuação/ruído; postprocessing obrigatório.  
- `prefers-reduced-motion: reduce`: desligar follow de mouse, parallax, morph thumb→vídeo, quedas de brilho; manter fades simples.

---
## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)

# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation — Mobile & Tablet: Staggered Menu Navigation

## SECTION PURPOSE
- Fornecer navegação global e identidade premium sem competir com a Hero.

## RESPONSABILIDADE CONCEITUAL
- Desktop: objeto óptico fluido (refração real), sombra suave, sem fundo sólido.  
- Mobile/Tablet: menu fullscreen staggered, foco em legibilidade e performance.

## BREAKPOINT STRATEGY
- ≥1024px: Fluid Glass Header  
- ≤1023px: Staggered Menu (sem WebGL)

## DESKTOP — FLUID GLASS HEADER
- Referência: https://reactbits.dev/components/fluid-glass  
- Conteúdo: Logo light + links (Home, Sobre, Portfolio, Contato).  
- Layout: flutuante, centralizado, largura limitada (max 6xl), padding compacto.  
- WebGL: refração sutil, chromatic aberration baixa, segue cursor de forma suave.  
- Config base:  
  ```tsx
  <FluidGlass
    mode="lens"
    lensProps={{ scale: 0.25, ior: 1.15, thickness: 5, chromaticAberration: 0.1, anisotropy: 0.01 }}
  />
  ```
- Interações: hover muda opacidade; sem underline; sem animação de tamanho no scroll.
- Performance: Canvas isolado, DPR limitado, geometria simples; fallback HTML se WebGL falhar.
- Acessibilidade: navegação por teclado, `aria-label` nos links, foco visível.

## MOBILE & TABLET — STAGGERED MENU
- Referência: https://reactbits.dev/components/staggered-menu  
- Comportamento: menu fullscreen com entrada lateral e animação staggered; botão menu ↔ close animado.  
- Config base:  
  ```tsx
  <StaggeredMenu
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials
    displayItemNumbering
    menuButtonColor="#e9e9ef"
    openMenuButtonColor="#000"
    changeMenuColorOnOpen
    colors={['#B19EEF', '#5227FF']}
    accentColor="#5227FF"
    isFixed
  />
  ```

## Z-INDEX STRATEGY
- z-40 Header/Menu | z-20 Hero content | z-0 WebGL.

## NON-NEGOTIABLES
- Header não compete com Hero; sem glassmorphism em CSS; WebGL só no desktop; fallback funcional obrigatório.

---

# **SECTION NAME: Hero**
### SECTION PURPOSE
- Impacto visual inicial com atmosfera etérea; texto editorial estático; direcionar ao Manifesto.

## VISÃO GERAL
- Implementação em `src/components/home/HomeHero.tsx` + `src/components/canvas/home-hero/*`.  
- Referência visual: CodePen https://codepen.io/danilonovaisv/pen/azZbdQo e imagens Ghost (hero com ghost azul, CTA arredondado, thumb de manifesto à direita).

## PRÉ-CARREGAMENTO (PRELOADER)
- Componente: `HeroPreloader` (ghost SVG, barra de progresso). Fade-out após carregamento inicial.  
- Animações: flutuação do ghost, pulsar dos olhos, progress gradient azul.

## CONTEÚDO (FIXO — SEM ANIMAÇÃO DE ENTRADA)
- Texto 100% estático (sem reveal).  
  ```
  [BRAND AWARENESS]
  Design, não
  é só estética.
  [É intenção, é estratégia, é experiência.]
  ```
- CTA primário para `/sobre`. Sem scroll-binding.

## BACKGROUND
- Base `#050505` (gradiente radial opcional do centro). Sem glassmorphism.

## WEBGL ATMOSFÉRICO (GHOST)
- Conceito: camada sensorial, não estrutura o layout.  
- Elementos: ghost emissivo HDR azul, ruído/scanlines, véu atmosférico, partículas, fireflies, olhos responsivos, bloom + analog decay.  
- Follow de mouse apenas desktop; pulso orgânico; respeitar reduce-motion.

## ARQUITETURA DE ARQUIVOS (HERO)
```
components/home/
├─ HomeHero.tsx           (orquestra camadas e scroll context)
├─ HeroPreloader.tsx      (splash)
├─ HeroCopy.tsx           (texto estático + CTA)
├─ ManifestoThumb.tsx     (thumb do vídeo, escala até full)
├─ GhostStage.tsx         (dynamic import SSR-off)
└─ webgl/ (em src/components/canvas/home-hero/)
   ├─ GhostCanvas.tsx     (Canvas + postprocessing)
   ├─ Ghost.tsx           (mesh emissivo deformado)
   ├─ Eyes.tsx            (olhos reativos)
   ├─ Particles.tsx       (instanced particles)
   ├─ Fireflies.tsx       (pontos luminosos)
   ├─ AtmosphereVeil.tsx  (shader de revelação)
   └─ postprocessing/
       └─ AnalogDecayPass.tsx (grain, scanlines)
```

## Z-INDEX (CRÍTICO)
- z-0 WebGL | z-10 overlay radial | z-20 conteúdo (texto + thumb) | z-30 noise overlay | z-50 preloader.

## IMPLEMENTAÇÃO-CHAVE (WEBGL)
- `GhostCanvas`: fundo `#050505`, câmera `[0,0,7]`, DPR `[1,1.5]`, sem antialias, Bloom + Vignette + AnalogDecay.  
- `GhostScene`: desloca ghost com scroll (`scrollYProgress`) e mouse, escala reduzida ao subir; usa `usePrefersReducedMotion`.  
- `Ghost`: esfera deformada, emissive azul HDR, flutuação e wobble suave.  
- `AtmosphereVeil`: shader que mistura opacidade conforme posição do ghost; renderOrder negativo.  
- `AnalogDecayPass`: jitter leve, grain e scanlines parametrizados.

## MANIFESTO THUMB → FULL
- `ManifestoThumb`: anima largura/altura/borderRadius/posicionamento via `useScroll`; mute/unmute condicionado à interseção e progresso de scroll; respeita reduce-motion.  
- `ManifestoSection`: vídeo principal só aparece após saída da Hero; observer habilita áudio quando visível.

## ACESSIBILIDADE & PERFORMANCE
- `prefers-reduced-motion` desliga follow/parallax e reduz pós-processamento.  
- Canvas com `alpha:true`, fallback preto.  
- Texto com contraste sobre fundo escuro; CTA com foco visível.  
- Evitar layout shift: sticky hero, preloader temporário.

## NON-NEGOTIABLES
- Texto da hero nunca depende de shader; WebGL apoia, não substitui conteúdo; sem GLB/vidro; fallback sem canvas mantém legibilidade.

---

# **SECTION NAME: Manifesto (Vídeo)**
- Objetivo: transição do thumb da Hero para reprodução full.  
- Asset: mesmo vídeo da Hero.  
- Layout: seção dedicada (`id="manifesto"`) com vídeo em `aspect-video`, fundo `#050505`.  
- Interações: autoplay muted; áudio habilitado apenas quando ≥60% em viewport; respeitar reduce-motion.  
- Estados: loading (poster opcional), erro (mensagem), sucesso (loop).  
- Tracking sugerido: `manifesto_play`, `manifesto_audio_toggle`.  
- Acessibilidade: `playsInline`, `aria-label` descritiva, controles podem ser exibidos em reduce-motion se necessário.

---

# **SECTION NAME: Portfolio Showcase**
## PURPOSE & HEADLINE
- Exibir categorias principais do portfólio e conduzir para `/portfolio`.

## LAYOUT & BREAKPOINTS
- Stripes verticais empilhados; 1 coluna mobile, largura fluida desktop (`max-w 1680px`, padding clamp).  
- Alternância de alinhamento (R/C/L) para ritmo editorial; bullets azuis.  
- CTA final “VEJA MAIS →” levando ao portfólio.

## CONTENT MODEL
- 3 categorias (IDs acima). Cada stripe: label, thumbnail/poster, subtítulo PT opcional.  
- Thumbnail slide-in no hover (desktop); em mobile não mostrar hover media.

## INTERAÇÕES & ANIMAÇÕES
- Reveal on scroll (fade + translateY); hover com slide/opacity da thumb; expansão opcional com layout animation (Framer Motion).  
- Easing: `cubic-bezier(0.22,1,0.36,1)`; `prefers-reduced-motion` desativa movimentos não essenciais.  
- Microinterações: bullet azul com leve scale; ícone seta pode rotacionar quando expandido.  
- Z-index: conteúdo sobre fundo claro (`#F4F5F7`), sem canvas.

## NON-NEGOTIABLES
- Labels curtos; CTA final presente; sem over-animar largura em mobile; apenas transform/opacity animados.

## QA VISUAL (resumido)
- Desktop/Ultrawide: headline centralizada, stripes com respiro lateral, hover sem layout shift.  
- Tablet: legibilidade e expansão sem overflow.  
- Mobile: sem overflow horizontal; stripes clicáveis; CTA visível.  
- A11y: `role="button"` nos stripes, `aria-expanded` quando aplicável, foco visível.

---

# **SECTION NAME: Featured Projects**
## PURPOSE
- Destacar projetos com grid editorial e CTA para mais trabalhos.

## LAYOUT
- Grid responsivo (1–2 colunas; item hero pode span 2 colunas). Fundo `#F4F5F7`.  
- Card: imagem com overlay no hover, título, cliente, ano, categoria; bloco “Like what you see? view projects”.

## ANIMAÇÕES
- Entrada: fade/translate (stagger 0.08).  
- Hover: imagem scale ~1.03 + overlay gradient; ícone seta surge com fade/translate.  
- CTA: botão arredondado azul, hover eleva e troca cor do ícone.

## CONTENT LIMITS
- Título até ~50 caracteres; cliente/ano curtos; CTA sempre visível.  
- Fallback: placeholder se imagem falhar.

## A11y & TRACKING
- `alt` descritivo; cards focáveis; reduce-motion desativa efeitos de entrada; eventos de clique em cards/CTA para analytics.

---

# **SECTION NAME: Clients/Brands**
## PURPOSE
- Provar confiança com logos em faixa azul.

## LAYOUT
- Fundo `#0057FF`, grid 2–6 colunas conforme breakpoints; logos monocromáticas invertidas.  
- Título centralizado; spacing generoso (`py-24` desktop).

## ANIMAÇÕES & MICRO-INTERAÇÕES
- Entrada fade/translate com stagger; hover scale ~1.04 + brightness leve (desktop).  
- Reduce-motion: sem animação.

## NON-NEGOTIABLES
- Faixa azul contínua; 12 logos; título “marcas com as quais já trabalhei”.

---

# **SECTION NAME: Contact**
## PURPOSE
- Converter leads e oferecer múltiplos canais rápidos.

## LAYOUT
- Duas colunas em desktop: esquerda (links e sociais), direita (form). Mobile: colunar. Fundo branco, bordas suaves.  
- Form: name/email/phone/message + honeypot; POST via FormSubmit (endpoint acima); feedback de sucesso/erro.

## INTERAÇÕES & ESTADOS
- Inputs com focus ring azul; botão “Enviar Mensagem” com hover scale leve; loading desabilita botão.  
- Sucesso: mensagem e ícone check; erro: texto curto.  
- Social buttons: ícones com hover de cor.

## A11y
- Labels conectadas, `aria-invalid`/`aria-describedby`; navegação por teclado; reduce-motion desativa entradas animadas.

---

## **SECTION NAME: Footer**
## PURPOSE
- Concluir navegação, repetir links e copyright.

## LAYOUT
- Barra final (pode ser estática em layout App Router), fundo azul ou preto conforme tema; padding `py-4–6`.  
- Conteúdo: copyright 2025, links (home, portfolio showcase, sobre, contato), sociais opcionais.

## ANIMAÇÕES / MICRO-INTERAÇÕES
- Fade-in simples; links com underline animado semelhante ao header; ícones com hover scale.  
- Reduce-motion: sem animações.

## NON-NEGOTIABLES
- Copyright unificado 2025; links corretos; acessível via teclado.

---

# **ANEXO TÉCNICO — WEBGL ATMOSFÉRICO (GHOST)**
## Objetivo
- Formalizar pipeline Ghost: sem GLB, sem MeshTransmissionMaterial; WebGL como camada sensorial com pós-processamento.

## Paradigma Atual
- Canvas independente; postprocessing obrigatório; nada de ScrollControls; fallback de conteúdo intacto se canvas falhar.

## Canvas (base)
```tsx
<Canvas
  dpr={[1, 1.5]}
  gl={{ antialias: false, alpha: true }}
  camera={{ position: [0, 0, 7], fov: 45 }}
  className="absolute inset-0 z-0"
>
  <color attach="background" args={['#050505']} />
</Canvas>
```

## Loop de Animação
```ts
useFrame((state) => {
  ghost.position.lerp(target, 0.05);
  material.emissiveIntensity = 3.5 + Math.sin(state.clock.elapsedTime * 1.2) * 0.6;
});
```

## Postprocessing
- Bloom (aura azul), Analog Decay (grain/scanlines/jitter), Vignette sutil.  
- Intensidade moderada para manter legibilidade do texto.

## Regras Não-Negociáveis
- WebGL nunca controla layout ou texto.  
- Texto permanece legível sem canvas.  
- Reduce-motion desativa follow/parallax e reduz efeitos.

## Regra de Ouro
> WebGL apoia a narrativa. Nunca a substitui.

---

# Stack Research Summary (autoritativo)
- **Next.js 16 / React 19**: usar App Router, `next/dynamic` para R3F com `ssr:false`, `Metadata` para SEO, fonte local via `next/font`.  
- **Tailwind CSS 4**: tokens em `@theme` (cores Ghost, tipografia TT Norms), utilities em `globals.css`; evitar classes não resolvidas.  
- **Framer Motion 12**: animar apenas transform/opacity; `useReducedMotion` para acessibilidade; `useScroll` para thumb manifesto; `layoutId` opcional para morphs.  
- **React Three Fiber + Drei + @react-three/postprocessing**: limitar DPR, antialias off, post stack (Bloom/Vignette/Noise); shaders custom via `shaderMaterial`; evitar ScrollControls em Hero; prefer instancing para partículas.  
- **Lenis**: integrar com RAF global; destruir instância no unmount.  
- **Supabase Storage + Custom Image Loader**: converter `/object/public/` → `/render/image/public/` com width/quality; exigir `NEXT_PUBLIC_SUPABASE_URL`; permitir SVG (`dangerouslyAllowSVG`).  
- **Firebase Hosting/App Hosting**: headers de cache fortes para estáticos (`_next/static/**`), no-store para SW; emuladores configurados; região us-east1.  
- **FormSubmit**: POST AJAX com honeypot/captcha off; tratar erros e sucesso no cliente.

---

# Documentation Quality & Optimization Report
- **Estrutura**: preservados todos os blocos originais (Informações Globais, Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer, Anexo WebGL).  
- **Ajustes de precisão**: paths e componentes atualizados para App Router (`src/components/home`, `src/components/canvas/home-hero`); assets e CTAs alinhados aos configs atuais; z-index e cores conforme implementação.  
- **A11y & Perf**: reforço de `prefers-reduced-motion`, limites de DPR/antialias, animações apenas em transform/opacity, foco visível.  
- **Automação/Deploy**: chamada clara de Supabase loader, Firebase headers, e necessidade de `NEXT_PUBLIC_SUPABASE_URL`.  
- **UI Fidelity**: notas derivadas das referências visuais (ghost azul, CTA pill, stripes alternados, faixa azul de logos).  
- **Redução de ruído**: removidas duplicidades intra-seção, mantendo todas as sessões intactas.

---

# Google Antigravity Agent Configuration Prompt
- **Role**: Documentation & Experience Guardian.  
- **Specialists**:  
  - *Docs Optimizer*: mantém sessões originais, atualiza paths/fluxos, garante consistência terminológica.  
  - *Design QA*: valida fidelidade “Ghost Blue”, z-index (WebGL < conteúdo), legibilidade e contraste.  
  - *Performance*: impõe DPR/antialias limites, evita animações de layout, sugere instancing/cache.  
  - *Accessibility*: aplica `prefers-reduced-motion`, foco visível, `aria-*` em navegação/cards/form.  
  - *Architecture*: garante separação App Router + R3F SSR-off, Supabase loader correto, Firebase headers e rotas intactas.  
- **Guardrails**: não remover sessões; não adicionar dependências; não quebrar rotas/deploy; manter SEO/metadados e assets configurados.  
- **Outputs**: documentação por sessão, checklists de QA, notas de perf/A11y; referencia paths completos.  
- **Trigger**: a cada atualização de experiência Ghost ou conteúdo de portfólio.
