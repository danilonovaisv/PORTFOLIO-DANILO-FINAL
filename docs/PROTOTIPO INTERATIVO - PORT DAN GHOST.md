
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---
## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto
- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato

**Ordem das seções da Home:**
1. Header
2. Hero
3. Portfolio Showcase
4. Featured Projects
5. Clients / Brands
6. Contact
7. Footer

---

### 2. Assets Globais logos

miniatura para janela:
- **Logo Light:**  ["./src/assets/logos/LogoLight.svg"]
 https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg
- **Logo Dark:**  ["./src/assets/logos/LogoDark.svg"]
 https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg
 
 Logos para paginas.
- **Favicon:**  ["./src/assets/logos/Favicon.svg"]
 https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg
 - **Favicon Light:**  ["./src/assets/logos/FaviconLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg

---

### 3. Conteúdo Global por Seção (dados base)

#### Hero
- Tag: `[BRAND AWARENESS]`
- Título:
  ```
  Design, não é
  só estética.
  ```
- Subtítulo: `[É intenção, é estratégia, é experiência.]`
- CTA label: `get to know me better →`
- CTA secundário (scroll): `#manifesto`
- **WebGL Atmosférico:** Ghost abstrato + pós-processamento (substitui qualquer modelo GLB)

**TYPOGRAPHY:**
- Fonte: TT Norms Pro

#### Manifesto (Vídeo)
- Vídeo URL (usado na Hero e na seção Manifesto):  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4

---

### 4. Princípios Globais de Animação
- **DOM:** Framer Motion
  - Reveals (`whileInView`)
  - Microinterações (`whileHover`, `whileTap`)
  - Scroll (`useScroll`, `useTransform`)
- Animar apenas `transform` e `opacity`
- **WebGL:** React Three Fiber (`useFrame`)
- `prefers-reduced-motion: reduce`
  - Desativa follow, bloom intenso e parallax
  - Mantém layout e fades simples


- **Portfolio Showcase**
- Título: `portfólio showcase`
- Categorias:
| ID | Label (UI) |
Label PT (explicativo) | Thumbnail URL
|
| ---------------------------- | -------------------------------- |
-------------------------------- |
-----------------------------------------------------------------------
------------------------------------ |
| `brand-campaigns` | `Brand & Campaigns` |
`Brand & Campanhas` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `videos-motions` | `Videos & Motions` |
`Vídeos & Motions` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
| `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech` |
`Campanhas Web, Websites & Tech` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp` |
- CTA final:
- Label: `VEJA MAIS →`
- Href: `/portfolio`
- **Featured Projects — cards**
| Slug | Título |
Categoria | Cliente | Ano | Imagem URL
|
| ---------------------- | ------------------------------------- |
--------------------- | ---------------------- | ---- |
-------------------------------------------------------------------------
------------------------------------ |
| `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` |
`branding & campanha` | `Magic` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
| `branding-project-01` | `Uma marca ousada e consistente` |
`branding` | `Cliente confidencial` | 2022 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `key-visual-campaign` | `Key visual para campanha sazonal` |
`campanha` | `Cliente confidencial` | 2021 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp` |
| `webdesigner-motion` | `Experiência web em movimento` | `web &
motion` | `Cliente confidencial` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
- **Clients / Brands**
- Título: `marcas com as quais já trabalhei`
- Logos (monocromáticos claros):
| # | URL
|
| --- |
-----------------------------------------------------------------------
---------------------- |
| 1 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg` |
| 2 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg` |
| 3 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg` |
| 4 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg` |
| 5 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg` |
| 6 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg` |
| 7 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg` |
| 8 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg` |
| 9 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg` |
| 10 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg` |
| 11 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg` |
| 12 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg` |


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
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
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
para animações de scroll, com JS puro (`requestAnimationFrame`) apenas
como alternativa se necessário.
---

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)
---

# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation  
### Mobile & Tablet: Staggered Menu Navigation


## 🎯 SECTION PURPOSE
- Fornecer navegação global e identidade visual do site.  
- Permanecer visível em todas as páginas.  
- Reforçar a identidade **premium + experimental** do projeto.  
- Atuar como camada atmosférica complementar à **Hero Ghost**.  

---

## 🎨 DESIGN TOKENS

### Colors
| Token | Value | Description |
|--------|--------|-------------|
| `primary` | `#0057FF` | Cor de destaque e interação |
| `bg` | `#f0f0f0` | Fundo padrão neutro |
| `text` | `#000000` | Texto padrão |
| `textInverse` | `#FFFFFF` | Texto sobre fundo escuro |
| `neutralLight` | `#F5F5F5` | Fundo secundário e elementos suaves |

---

### Typography
- **Fonte principal:** TT Norms Pro *(self-host, se licenciado)*  
- **Fallbacks:** `ui-sans-serif`, `system-ui`  
- **Tamanhos e pesos:**
  - Logo: `18–22px`, `font-semibold`
  - Navegação: `15–16px`, `font-medium`, `tracking-tight`

---

## 💠 LAYOUT

| Device | Tipo | Comportamento |
|---------|------|---------------|
| Desktop ≥1024px | **Fluid Glass Header (modo "bar")** | Objeto óptico fluido horizontal com refração leve e movimento sutil |
| Tablet ≤1023px | **Staggered Menu** | Menu fullscreen com animação em cascata |
| Mobile ≤640px | **Staggered Menu** | Menu lateral animado minimalista |

---

### Desktop — Fluid Glass Header (modo `"bar"`)

**Visual Behavior**
- Barra translúcida horizontal com refração e distorção óptica suave.  
- Movimento fluido horizontal acompanhando o cursor.  
- Permite visualizar o conteúdo por trás (sem fundo sólido).  
- Interações sutis: hover com opacidade, sem underline.  

**Conteúdo**
- Logo Light  
- Navegação:
  - Home → `/` ou `#hero`
  - Sobre → `/sobre`
  - Portfólio → `/portfolio`
  - Contato → `#contact`

**Layout**
- Header flutuante, centralizado horizontalmente.  
- Altura compacta (~64px).  
- Padding horizontal: 24px.  
- Não ocupa 100% da largura — aparência de “objeto independente”.  

---

### Mobile & Tablet — Staggered Menu Navigation

**Visual Behavior**
- Menu fullscreen com entrada lateral.  
- Animação “staggered editorial” (itens surgem em cascata).  
- Ícone Menu ↔ Close com morph suave.  
- Cores de gradiente e camadas animadas.  

**Menu Links**
- Home → `/`
- Sobre → `/sobre`
- Portfólio → `/portfolio`
- Contato → `/#contato`

**Layout**
- Logo à esquerda, botão Menu à direita.  
- Fundo gradiente: `#B19EEF → #5227FF`.  
- Texto branco puro (`#FFFFFF`).  

---

## ⚙️ INTERACTIONS

| Ação | Efeito |
|------|---------|
| Hover nos links | Aumento leve de opacidade |
| Pointer move | Vidro acompanha suavemente o cursor (movimento horizontal) |
| Scroll | Header fixo, sem morph de tamanho |
| Tap (mobile) | Abrir/fechar menu fullscreen |
| Tap item (mobile) | Navegar e fechar menu |

---

## 🧱 COMPONENTS USED

components/header/
├─ SiteHeader.tsx
├─ DesktopFluidHeader.tsx
├─ MobileStaggeredMenu.tsx
└─ webgl/
└─ FluidGlass.tsx

---

## ⚡ CONFIGURAÇÕES PADRÃO

### Fluid Glass (modo `"bar"`)

```
tsx
<FluidGlass
  mode="bar"
  barProps={{
    scale: [1.2, 0.25, 0.2],
    ior: 1.15,
    thickness: 4,
    chromaticAberration: 0.08,
    anisotropy: 0.02,
    smoothness: 0.9
  }}
/>

Staggered Menu

<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#e9e9ef"
  openMenuButtonColor="#000"
  changeMenuColorOnOpen={true}
  colors={['#B19EEF', '#5227FF']}
  accentColor="#5227FF"
  isFixed
/>
```

⸻

### Z-INDEX STRATEGY

z-40 → Header / Menu  
z-20 → Hero Content  
z-0  → WebGL Hero Canvas


⸻

### ♿ ACCESSIBILITY
    •    Navegação por teclado funcional.
    •    Links com aria-label.
    •    Fallback HTML (logo + links estáticos) se WebGL não estiver disponível.
    •    Contraste mínimo 4.5:1.
    •    Botões e ícones com área mínima de toque 48×48px.

⸻

### 🚫 NON-NEGOTIABLES
    •    ❌ Header não compete com a Hero.
    •    ❌ Sem glassmorphism fake em CSS.
    •    ❌ Sem animações decorativas gratuitas.
    •    ✅ WebGL apenas no Desktop.
    •    ✅ Mobile sem efeitos pesados.
    •    ✅ Fallback funcional obrigatório.

⸻

### 🧩 ASSETS GLOBAIS — Logos

Miniatura para janela
    •    Logo Light:
["./src/assets/logos/LogoLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg
    •    Logo Dark:
["./src/assets/logos/LogoDark.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg

⸻

Logos para páginas
    •    Favicon:
["./src/assets/logos/Favicon.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg
    •    Favicon Light:
["./src/assets/logos/FaviconLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg

---




#  **HERO + MANIFESTO — Portfólio Institucional de Danilo Novais**

## SECTION NAME
**Hero (Ghost Atmosphere + Texto Editorial + Manifesto Subsection)**

---

## 🎯 SECTION PURPOSE
- Criar impacto visual inicial com atmosfera **Ghost Blue** etérea e viva.  
- Comunicar posicionamento estratégico através de **texto editorial estático**.  
- Integrar o **vídeo manifesto** como subcamada sensorial da Hero (desktop)  
  e seção independente em fullscreen no mobile.  
- Introduzir a identidade “premium + experimental” sem poluição visual.  

---

## 💠 DESIGN TOKENS

### Colors
| Token | Value | Description |
|--------|--------|-------------|
| `primary` | `#0057FF` | Cor principal da atmosfera “Ghost Blue” |
| `accent` | `#5227FF` | Glow e emissive secundário |
| `bg` | `#06071f` | Fundo escuro de base |
| `neutral` | `#0b0d3a` | Gradiente de transição para o fundo |
| `text` | `#d9dade` | Texto editorial principal |
| `highlight` | `#FFFFFF` | Picos de luminosidade e brilho de partículas |

---

### Typography
- **TT Norms Pro**, self-host *(ou fallback: `ui-sans-serif`, `system-ui`)*  
- Hierarquia:
  - `[BRAND AWARENESS]` → 12px, uppercase, `font-mono`
  - `h1` → 4rem–6rem, `font-bold`, `tracking-tight`
  - Subcopy → 1rem–1.25rem, regular
  - CTA → 0.9rem, uppercase, `tracking-wide`, `duration-300`, hover branco  

---

## 🧱 LAYER STRUCTURE (Z-INDEX HIERARCHY)

| Ordem | Layer | Descrição |
|-------|--------|------------|
| **z-50** | 🩵 **Preloader (Ghost Loader)** | SVG animado “Summoning spirits” com barra de progresso |
| **z-30** | 🎞️ **Thumb Vídeo Manifesto** | Vídeo interativo flutuante (subcategoria da Hero) |
| **z-20** | 👻 **Animação Ghost (WebGL)** | Atmosfera viva: Ghost, partículas e fireflies |
| **z-10** | ✍️ **Texto Editorial (HeroCopy)** | Conteúdo fixo e centralizado |
| **z-0** | 🌌 **Gradiente Base** | Fundo `#06071f` + radial `#0b0d3a` |

---

## 🧩 COMPONENTS

components/home/
├─ HomeHero.tsx            ← Orquestrador (todas as layers)
├─ HeroPreloader.tsx       ← Animação inicial “ghost-loader”
├─ HeroCopy.tsx            ← Texto editorial fixo
├─ ManifestoThumb.tsx      ← Vídeo manifesto flutuante (desktop)
├─ GhostStage.tsx          ← Wrapper dinâmico (Canvas 3D)
└─ webgl/
├─ GhostCanvas.tsx
├─ Ghost.tsx
├─ Eyes.tsx
├─ Particles.tsx
├─ Fireflies.tsx
├─ AtmosphereVeil.tsx
└─ postprocessing/
├─ AnalogDecayPass.ts
└─ BloomPass.ts

---

## ⚙️ INTERACTIVE PROTOTYPE FLOW

### 🩵 1. PRELOADER — “Ghost Loader”
- SVG flutuante animado (`ghostFloat`, `eyePulse`, `textPulse`).  
- Mensagem: `"Summoning spirits"`.  
- Barra de progresso (`from-[#0057FF] to-[#5227FF]`).  
- Fade-out suave (`opacity 1 → 0` após 1.5s).  

---

### 🌫️ 2. GHOST ATMOSPHERE (WEBGL CANVAS)
**Camada sensorial viva**, inspirada em *Spooky Spectral Ghost* [oai_citation:0‡webgl-threejs-spooky-spectral-ghost.markdown](sediment://file_00000000eb8871f5a1454647d72cb53c)  
- Mesh esférico emissivo (`#0057FF`), pulso harmônico e flutuação vertical.  
- Olhos reativos (`Eyes.tsx`) → brilho aumenta conforme movimento do mouse.  
- Partículas orgânicas e fireflies orbitam o ghost.  
- Pós-processamento:  
  - `BloomPass` → brilho HDR (intensidade 2.8).  
  - `AnalogDecayPass` → *grain*, *scanlines*, *jitter*, *vignette*.  

**Interações:**
- Cursor move → Ghost segue lentamente o ponteiro (`lerp 0.05`).  
- Movimento senoidal orgânico (`sin(t * 0.8)` / `sin(t * 0.3)`).  
- Performance: `DPR 2`, `antialias false`, desativado em `prefers-reduced-motion`.  

---

### ✍️ 3. HERO TEXT BLOCK
**Conteúdo editorial centralizado (HeroCopy.tsx)**  

[BRAND AWARENESS]
Design, não
é só estética.
[É intenção, é estratégia, é experiência.]

**Características:**
- 100% estático, sem fade ou scroll binding.  
- `text-[#d9dade]` sobre fundo `#06071f`.  
- Centralizado (`flex-col`, `items-center`, `text-center`).  
- CTA: `"get to know me better →"` com hover branco.  

---

### 🎞️ 4. MANIFESTO THUMB (SUBSECTION DESKTOP)
**Comportamento (Desktop)**  
- Vídeo miniatura flutuante (`bottom-right`, `z-30`).  
- Vídeo:  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`  
- Autoplay, muted, loop, playsInline.  
- Fade-in suave após preloader.  

**Estados:**
| Estado | Ação | Efeito |
|--------|------|---------|
| Idle | Página carregada | Opacity 0 → 1, scale 0.9 → 1 |
| Hover | Mouse sobre vídeo | Scale 1 → 1.05, ícone gira (-45° → 0°) |
| Scroll | Usuário desce | Vídeo cresce e centraliza, cobrindo o texto |
| Click | Desktop | Salta para estado fullscreen instantâneo |
| Click | Mobile | Alterna som (mute/unmute) |

**Transições:**
- `ease-in-out`, `duration-500ms`.  
- `border-radius: 12px → 0px`.  
- `scale: 0.3 → 1`.  

---

### 📱 5. MANIFESTO (MOBILE VERSION)
**Na versão mobile, o vídeo manifesto é uma seção independente logo abaixo da Hero.**  
- Ocupa 100% da viewport (`aspect-video`).  
- Autoplay, loop, muted.  
- `whileInView` + `useInView` (Framer Motion) → fade-in + scale 0.95 → 1.  
- Fundo idêntico à Hero (`#06071f`), garantindo continuidade visual.  

```tsx
<motion.section
  id="manifesto"
  variants={{
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }}
  initial="hidden"
  whileInView="visible"
  className="w-full bg-[#06071f] flex items-center justify-center aspect-video"
>
  <video
    src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
    muted
    autoPlay
    loop
    playsInline
    className="w-full h-full object-cover"
  />
</motion.section>```


⸻

### 🧱 FINAL Z-INDEX STACK (HERO + MANIFESTO)

z-index    Elemento    Descrição
z-50    Preloader    Ghost Loader
z-30    ManifestoThumb (desktop)    Vídeo flutuante interativo
z-20    GhostCanvas    Ghost + partículas + atmosfera
z-10    HeroCopy    Texto editorial central
z-0    Fundo radial    radial-gradient(circle, #0b0d3a, #06071f)
mobile-only    ManifestoSection    Fullscreen abaixo da Hero


⸻

### ♿ ACCESSIBILIDADE
    •    Contraste AA garantido (#d9dade / #06071f = 7.2:1).
    •    prefers-reduced-motion:
    •    Desativa movimentos e pós-processamento.
    •    Mantém layout estático.
    •    aria-label em links e botões.
    •    Vídeo sempre inicia mudo.

⸻

###⚡ PERFORMANCE
    •    WebGL carregado via dynamic import (ssr: false).
    •    DPR máximo: 2.
    •    Partículas limitadas a 250.
    •    Fallback: background radial se WebGL falhar.
    •    useInView aciona animações do vídeo manifesto apenas quando visível.

⸻

###🚫 NON-NEGOTIABLES
    •    ❌ Sem glassmorphism.
    •    ❌ Sem texto animado.
    •    ❌ Sem 3D sólido (GLB).
    •    ❌ Sem overlays sobre o vídeo.
    •    ✅ Ghost é camada atmosférica, não protagonista.
    •    ✅ Texto é âncora editorial.
    •    ✅ Vídeo manifesto integrado apenas no desktop; isolado no mobile.

⸻

###🧠 VISUAL HIERARCHY (DESKTOP)
    1.    Preloader (Ghost Loader)
    2.    Hero Background + WebGL Atmosphere
    3.    Ghost Mesh (emissivo, flutuante)
    4.    Fireflies + Partículas
    5.    Hero Text Block (Editorial)
    6.    Manifesto Video Thumb (Floating Layer)
    7.    Transition → Manifesto Section (scroll ou click)

⸻

###📐 FILE ARCHITECTURE SUMMARY

components/home/
├─ HomeHero.tsx
├─ HeroPreloader.tsx
├─ HeroCopy.tsx
├─ ManifestoThumb.tsx
├─ GhostStage.tsx
├─ ManifestoSection.tsx  ← apenas para mobile
└─ webgl/
   ├─ GhostCanvas.tsx
   ├─ Ghost.tsx
   ├─ Eyes.tsx
   ├─ Particles.tsx
   ├─ Fireflies.tsx
   ├─ AtmosphereVeil.tsx
   └─ postprocessing/
       ├─ AnalogDecayPass.ts
       └─ BloomPass.ts


⸻

###🪞 EXPECTED RESULT
    •    Hero silenciosa e cinematográfica.
    •    Texto editorial fixo e legível desde o primeiro frame.
    •    Ghost flutuante reagindo organicamente ao cursor.
    •    Vídeo manifesto aparece como miniatura e cresce ao scroll (desktop).
    •    No mobile, manifesto abre já em fullscreen logo abaixo da Hero.
    •    Atmosfera “Ghost Blue” contínua, com profundidade e leveza.

---



# **SECTION NAME: Portfolio Showcase**

### SECTION PURPOSE (what this section must achieve)
Apresentar claramente as áreas de atuação de Danilo.
Organizar mentalmente o portfólio em categorias.
Criar navegação editorial premium com foco em clareza, ritmo e interatividade suave.

### PRIMARY MESSAGE / HEADLINE
`portfólio showcase`

### SECONDARY MESSAGE / SUPPORT TEXT
`[what we love working on]`

### KEY CONTENT ELEMENTS
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

### CALL TO ACTION (if any)
- `Ver todos os projetos →` → `/portfolio?category={id}`
- `let’s build something great →` → `/#contact`

### LINKS GLOBAIS
- Integração com `/portfolio` (com filtro por categoria).
- Integração com `/#contact`.

---

## LAYOUT & DESIGN (Adaptado da Referência Lo&Behold)

### ALIGNMENT
**Desktop (≥1024px)**
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
    - Direita
    - Centro
    - Esquerda
- **Referência Lo&Behold:** As linhas são delimitadas por finas bordas horizontais. O conteúdo dentro de cada stripe é alinhado de forma que o título e o ícone de seta fiquem visualmente centrados no espaço disponível, criando um ritmo fluido.

**Mobile (≤768px)**
- Todos os elementos empilhados.
- Alinhamento à esquerda.
- Stripes ocupam 100% da largura.

### SPACING
**Desktop:**
- `py-24`
- `gap-14` entre stripes
- Espaço claro antes do CTA final.

**Mobile:**
- `py-16`
- `gap-10`

### BACKGROUND
- Fundo sólido `#F4F5F7`.

### SECTION COLORS
- Azul da marca `#0057FF`.
- Texto principal `#111111`.
- Texto secundário em tons neutros.

### TYPOGRAPHY
- **Headline:**
    - Mobile: `text-4xl`
    - Desktop: `text-6xl`
- **Stripes:**
    - Mobile: `text-2xl`
    - Desktop: `text-5xl / text-6xl`
- **Microtexto:**
    - Uppercase
    - Tracking amplo apenas em desktop

---

## INTERAÇÕES & ANIMAÇÕES (Equivalência Comportamental à Referência Lo&Behold)

### IMAGERY & MEDIA
- Miniaturas animadas apenas em hover (desktop).
- Imagem grande apenas no estado expandido.
- Mobile não exibe thumbnails em hover.
- **Referência Lo&Behold:** As miniaturas aparecem com uma animação de slide-in suave do lado esquerdo ao passar o mouse sobre a linha. A imagem é um preview do projeto associado à categoria.

### COMPONENTS USED
- `PortfolioShowcaseSection`
- `CategoryStripe`
- `ExpandedCategoryPanel`
- CTA Button

### STATE VARIANTS
- **Hover (desktop):**
    - Slide-in da thumbnail da esquerda para a direita.
    - Mudança sutil de cor ou peso do título (ex: escurecimento ou leve aumento de peso).
    - Ícone de seta rotaciona levemente (aproximadamente 45 graus) para indicar interatividade.
- **Active:**
    - Stripe expandido, revelando mais detalhes ou uma galeria de projetos.
- **Focus:**
    - Outline visível (keyboard).

### INTERACTIONS
- **Clique / Enter / Space no stripe:**
    - Expande a categoria para mostrar mais detalhes ou redireciona para a página de portfólio filtrada.
- **Clique em CTA:**
    - Navegação direta.
- **Hover:**
    - Micro-interações sutis (desktop apenas). A animação deve ser fluida, sem jank, e respeitar o tempo de transição da referência (aproximadamente 0.3s).

### SCROLL BEHAVIOUR
- Reveal on scroll com fade + translateY.
- Sem sticky.

### ANIMATIONS
- **Entrada da seção:**
    - `opacity: 0 → 1`
    - `y: 24 → 0`
- **Expansão:**
    - Animação de layout (`layout` animation).
    - Easing: `cubic-bezier(0.22,1,0.36,1)`
- **Hover:**
    - Apenas `transform` e `opacity`.
    - `prefers-reduced-motion`: Desativa animações não essenciais.

### MICRO-INTERACTIONS
- Hover no ponto azul (scale ligeiro).
- Ícone de seta rotaciona ao expandir.

---

## TEXT LIMITS & CONTENT PRIORITY
- Labels curtos e escaneáveis.
- **Content Priority:**
    1. Headline
    2. Stripes
    3. CTA final

### ALTERNATIVE CONTENT
- Imagem fallback neutra.
- Conteúdo textual sempre visível.

### LINKS / DESTINATIONS
- `brand-campaigns` → Brand & Campaigns
- `videos-motions` → Videos & Motions
- `websites-webcampaigns-tech` → Web Campaigns, Websites & Tech

### DATA HOOKS / TRACKING
- `portfolio_showcase_category_click`
- `portfolio_showcase_cta_click`

### DEPENDENCIES
- Página `/portfolio` com suporte a filtros.

---

## ACCESSIBILITY NOTES
- `role="button"` nos stripes.
- `aria-expanded` no estado ativo.
- Navegação completa por teclado.
- Foco visível.
- Respeito a `prefers-reduced-motion`.

---

## SPECIAL STATES
- Não aplicável (conteúdo estático).

---

## ULTRAWIDE STRATEGY (1920px+)
- **Objetivo:** Evitar aparência “apertada” ou excessivamente centralizada em telas grandes, mantendo elegância editorial.
- **Container Strategy:**
    - Substituir container rígido por container fluido controlado:
        - `max-width: 1680px`
        - `padding-inline: clamp(24px, 5vw, 96px)`
    - Centralizar conteúdo com `mx-auto`.
- **Layout:**
    - Headline mantém centralização visual.
    - Stripes ganham mais “respiro” lateral.
    - Microtexto permanece alinhado ao primeiro stripe, não ao viewport.
- **Animações:**
    - Mesmos timings do desktop.
    - Nenhuma animação baseada em largura do viewport.

---

## CHECKLIST DE QA VISUAL — Portfolio Showcase

✅ **Desktop (1280 / 1440 / 1680)**
- [ ] Headline centralizada visualmente.
- [ ] Microtexto visível apenas no primeiro stripe.
- [ ] Alinhamento alternado correto (direita / centro / esquerda).
- [ ] Hover revela thumbnail suavemente (slide-in da esquerda).
- [ ] Nenhum layout shift ao hover.
- [ ] Expansão fluida, sem jank.
- [ ] CTA final visível e equilibrado.

✅ **Ultrawide (1920+)**
- [ ] Conteúdo não parece “estreito”.
- [ ] Padding lateral confortável.
- [ ] Stripes não colam nas bordas.
- [ ] Ritmo visual consistente com desktop.
- [ ] Nada parece “perdido” no centro.

✅ **Tablet (768 / 820 / 1024)**
- [ ] Stripes ocupam largura correta.
- [ ] Textos legíveis sem quebra estranha.
- [ ] Expansão não causa overflow.
- [ ] CTA acessível sem scroll excessivo.

✅ **Mobile (320 / 375 / 414)**
- [ ] Sem overflow horizontal.
- [ ] Todos os textos legíveis.
- [ ] Stripes clicáveis com boa área de toque.
- [ ] Thumbnails não aparecem em hover.
- [ ] Expansão vertical suave.
- [ ] CTA final claramente visível.

✅ **Acessibilidade**
- [ ] Navegação completa por teclado.
- [ ] Foco visível em stripes e CTAs.
- [ ] `aria-expanded` correto.
- [ ] Movimento reduzido respeitado.

✅ **Performance**
- [ ] Nenhuma animação de `width` em mobile.
- [ ] Apenas `transform` e `opacity` animados.
- [ ] Sem layout shift perceptível.
- [ ] Imagens carregam corretamente.

✅ **Fidelidade Premium**
- [ ] Ritmo editorial consistente com a referência Lo&Behold.
- [ ] Espaçamento equilibrado.
- [ ] Tipografia hierárquica.
- [ ] Comportamento de hover e expansão alinhado à referência.

---

## STATUS FINAL
Este documento representa a versão final validada da seção Portfolio Showcase para a Home Page, adaptada com equivalência de comportamento, layout e ritmo da referência https://loandbehold.studio.

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
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase
(`/portfolio`)
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
- Fonte: TT Norms Pro
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`
**IMAGERY:**
- Imagens dos projetos
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`,
`<a>`
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
- Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1,
y: 0 }}
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
- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem
do projeto"
**LINKS / DESTINATIONS:**
- Cards: Link para a página do projeto
- CTA: `/portfolio`
### Projetos
- **Slug:** `magic-radio-branding`
**Título:** Magic — devolvendo a magia ao rádio
**Categoria:** branding & campanha
**Cliente:** Magic
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp
- **Slug:** `branding-project-01`
**Título:** Uma marca ousada e consistente
**Categoria:** branding
**Cliente:** Cliente confidencial
**Ano:** 2022
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp
- **Slug:** `key-visual-campaign`
**Título:** Key visual para campanha sazonal
**Categoria:** campanha
**Cliente:** Cliente confidencial
**Ano:** 2021
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp
- **Slug:** `webdesigner-motion`
**Título:** Experiência web em movimento
**Categoria:** web & motion
**Cliente:** Cliente confidencial
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
**DATA HOOKS / TRACKING:**
- Eventos de clique nos cards e no CTA para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.projectCards`
**ACCESSIBILITY NOTES:**
- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
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
- Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y:
0 }}
- Logos: staggerChildren: 0.03
- Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{
opacity: 1, y: 0, scale: 1 }}
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
1.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg`
2.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg`
3.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg`
4.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg`
5.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg`
6.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg`
7.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg`
8.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg`
9.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg`
10.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg`
11.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg`
12.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg`
**DATA HOOKS / TRACKING:**
- Eventos de hover nos logos para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.clients`
**ACCESSIBILITY NOTES:**
- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
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
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`,
`<button>`, `<a>`
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
- Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{
opacity: 0, y: 24 }}
- Campos do formulário com staggerChildren
- Interações:
- Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2
ring-offset-[#f5f5f7]
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
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
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
- Links com sublinhado animado igual ao header; ícones sociais com hover
scale(1.05) + leve mudança de opacidade
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
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
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


# **ANEXO TÉCNICO — WEBGL ATMOSFÉRICO (GHOST)**

## Objetivo
Documentar o pipeline técnico da Hero Ghost WebGL, substituindo completamente a abordagem anterior baseada em vidro líquido, GLB e MeshTransmissionMaterial.

---

## Paradigma Atual
- Sem modelos GLB
- Sem MeshTransmissionMaterial
- Sem ScrollControls
- WebGL como camada sensorial
- Pós-processamento como linguagem visual

---

## Canvas
```tsx
<Canvas
  dpr={[1, 2]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 45 }}
>
```

---

## Loop de Animação
```ts
useFrame((state, delta) => {
  ghost.position.lerp(target, 0.08)
  material.emissiveIntensity =
    1 + Math.sin(state.clock.elapsedTime) * 0.2
})
```

---

## Postprocessing
- Bloom para aura
- Analog Decay para textura temporal
- Intensidade moderada (premium)

---

## Regras Não-Negociáveis
- WebGL nunca controla layout
- Texto nunca depende de shader
- Se o Canvas falhar, a Hero continua funcional

---

## Regra de Ouro
> WebGL apoia a narrativa. Nunca a substitui.
