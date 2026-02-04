*Versão:** 4.0  
**Última Atualização:** Janeiro 2026  
**Status:** ✅ Pronto para Implementação

---

## 1. Visão Geral do Projeto

### 1.1 Propósito

Este portfólio digital foi concebido como uma **experiência editorial premium**, onde o design não apenas mostra trabalhos, mas demonstra excelência através de sua própria execução. A filosofia central — *"Você não vê o design. Mas ele vê você."* — permeia cada decisão de interface, animação e conteúdo.


## 1. PROJECT OVERVIEW

### 1.1 Vision & Goals
Create a premium institutional portfolio that demonstrates design excellence not just through showcased work, but through the site's own execution. The homepage must:
- **Atmosphere:** Establish immediate credibility through visual design and editorial sophistication.
- **Flow:** Guide visitors intuitively: Brand Intro → Work Showcase → Contact.
- **Performance:** Feel distinctive without sacrificing usability (Lighthouse 90+).
- **Philosophy:** Reflect "You don't see design. But it sees you."

### 1.2 Target Audience
- **Primary:** Brand Managers, Marketing Directors, Creative Agencies.
- **Secondary:** Recruiters, Design Community.
- **User Needs:** Quick understanding of expertise, evidence of high-quality work, ease of contact.

### 1.3 Key Success Metrics
- **Engagement:** >2 min session duration.
- **Conversion:** 50%+ click-through on featured projects.
- **Technical:** Load time <3s, Zero Accessibility violations (WCAG AA).

### 1.4 Technical Constraints & Stack
- **Core:** Next.js 15 (App Router), React 18.3+, TypeScript 5.x.
- **Style:** Tailwind CSS 3.4+ (Fluid Typography plugin).
- **Motion/3D:** Framer Motion (UI), React Three Fiber (Ghost Backgrounds).
- **Storage:** Supabase (Assets/Images).
- **Constraints:** Mobile-first, <2MB initial page weight, No external analytics scripts blocking thread.


---

## 1.5. Arquitetura da Informação

### 1.5.1 Estrutura do Site

```
Homepage
├── Hero (Entrada Imersiva)
├── Vídeo Manifesto
├── Portfolio Showcase (Categorias)
├── Featured Projects (Bento Grid)
├── Clientes/Marcas
└── Contato + Footer
```

### 1,5.2 Fluxo de Navegação

```
Hero → Portfolio Showcase → Projetos → Contato
  ↓
Sobre (secundário)
```

**Princípio:** Guiar intuitivamente do contexto (quem sou) → trabalho (o que faço) → ação (como trabalhar junto).

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

| Token          | Value     | Uso Principal                                      |
| :------------- | :-------- | :------------------------------------------------- |
| **bluePrimary**| `#0048ff` | Marca, CTAs, Links, Foco                           |
| **blueAccent** | `#4fe6ff` | Atmosfera Ghost, Brilhos, Highlights               |
| **background** | `#040013` | Deep Void (Fundo Principal)                        |
| **text** | `#fcffff` | Texto Primário (Contraste Alto)                    |
| **textSecondary**| `#a1a3a3`| Metadados, Legendas                                |
| **surface** | `#0b0d3a` | Cards sutis, Gradientes de fundo                   |
| **error** | `#ff3366` | Validação de formulários                           |

---

### 2.2 Typography

**Family:** `TT Norms Pro` (Primary), `Geist Mono` (Code/Tech details).

#### Fluid Typography Tokens (`clamp`)

| Token      | Mobile (<768px)  | Desktop (≥1024px) | Weight | Tailwind Class |
| :--------- | :--------------- | :---------------- | :----- | :------------- |
| **Display**| 2.5rem (40px)    | 5.5rem (88px)     | Black  | `text-display` |
| **H1** | 2rem (32px)      | 3.5rem (56px)     | Bold   | `text-h1`      |
| **H2** | 1.5rem (24px)    | 2.5rem (40px)     | Bold   | `text-h2`      |
| **H3** | 1.25rem (20px)   | 1.75rem (28px)    | Medium | `text-h3`      |
| **Body** | 1rem (16px)      | 1.125rem (18px)   | Regular| `text-body`    |

**CSS Implementation:**
```css
@layer base {
  :root {
    --font-display: clamp(2.5rem, 5vw + 1rem, 5.5rem);
    --font-h1: clamp(2rem, 4vw + 1rem, 3.5rem);
    --font-body: clamp(1rem, 0.5vw + 0.8rem, 1.125rem);
  }
}

```
---

### 2.3 Spacing, Grid & Layout (OPTIMIZED)

O sistema de Grid foi otimizado para **12 colunas** no desktop e **4 colunas** no mobile, garantindo alinhamento matemático perfeito.

#### 📐 The Ghost Grid System

| Breakpoint | Columns | Gutter (Gap) | Margin (X-Padding) | Container Max |
| --- | --- | --- | --- | --- |
| **Mobile** (<768px) | **4** | `16px` (gap-4) | `24px` (px-6) | 100% |
| **Tablet** (768px+) | **8** | `24px` (gap-6) | `48px` (px-12) | 100% |
| **Desktop** (1024px+) | **12** | `32px` (gap-8) | `64px` (px-16) | 1440px |
| **Wide** (1600px+) | **12** | `40px` (gap-10) | `96px` (px-24) | 1680px |

#### 🧱 Tailwind Composition

**1. Container Base:**

```tsx
// Wrapper global para centralizar o conteúdo
<div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
  {children}
</div>

```

**2. Section Grid (Padrão):**

```tsx
// Grid responsivo automático
<section className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-8 w-full py-16 md:py-24">
  {/* Ex: Card ocupando full no mobile e 4 colunas no desktop */}
  <div className="col-span-4 md:col-span-4 lg:col-span-4">
    Card Content
  </div>
</section>

```

**3. Z-Index Layering (Ghost Philosophy):**
Para garantir que o 3D não bloqueie a interatividade.

* `z-0`: **Canvas WebGL** (Background interativo).
* `z-10`: **Glass Layers** (Paineis com backdrop-blur).
* `z-20`: **Content** (Textos, Imagens).
* `z-50`: **Navigation/Header** (Sticky).
* `z-100`: **Modals/Overlays**.

#### 📱 Mobile Alignment Rules

No breakpoint `< md` (Mobile First):

1. **Text Align:** `text-center` (Títulos e CTAs).
2. **Flex:** `flex-col items-center`.
3. **Order:** Visualmente o "Hero Image/Video" pode vir antes ou depois do texto dependendo da narrativa, usar `order-first` ou `order-last`.

---

### 2.4 Animation Principles

**Engine:** Framer Motion + Lenis Scroll.

**The "Ghost" Easing:**
Sensação de peso e elegância. Movimento rápido no início, frenagem suave no final.

* `ease: [0.22, 1, 0.36, 1]`

**Padrões de Código:**

```tsx
// 1. Reveal Padrão (Fade Up)
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>

// 2. Container Stagger (Cascata)
const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

```

---

### 2.5 Global Assets (Supabase CDN)

**Fonts:**

* TT Norms Pro (Hosted on Supabase Storage).
* Fallback: `sans-serif`.

**Logos:**

* Dark/Light versions SVG.
* Favicon SVG.

**Media:**

* Manifesto Video: `VIDEO-APRESENTACAO-PORTFOLIO.mp4` (Otimizado para streaming/loop).
* Client Logos: SVGs monocromáticos (fill-current text-white).

---

## 3. SITE ARCHITECTURE

### 3.1 Sitemap & Flow

1. **Home:**
* *Hero:* WebGL Atmosphere + Headline.
* *Manifesto:* Vídeo full-width scroll-linked.
* *Showcase:* Accordion vertical interativo.


2. **Sobre:** Narrativa pessoal, timeline "Origem Criativa".
3. **Portfólio:** Grid completo com filtros (Bento Grid).

### 3.2 Navigation

* **Header:** Sticky, Glassmorphism. Links: Home, Sobre, Portfólio, Contato.
* **Mobile Menu:** Fullscreen overlay com animação staggered.

```

```
---

## 4. Componentes e Seções




### 4.1 Header (Navegação)

#### Desktop (≥1024px)
- **Layout:** Sticky horizontal, glassmorphism (`backdrop-blur`)
- **Altura:** 64px
- **Comportamento:** Fixo no topo, adapta contraste em fundos claros
- **Links:** Home, Sobre, Portfólio, Contato

**Adaptação de Contraste:**
```js
// Quando sobrepõe seção clara (ex: Contato)
text-color: #0048ff (azul primário)
background-opacity: aumentada
transition: 300ms ease
```

#### Mobile (<1024px)
- **Layout:** Barra fixa com logo (esquerda) + hamburguer (direita)
- **Menu Overlay:** Fullscreen com gradiente, navegação vertical
- **Animação:** Itens aparecem com stagger (100ms delay)
- **Interação:** Tap X ou link fecha menu

---

### 4.2 Hero

#### Objetivo
Criar impacto visual imediato através de:
- Animação 3D interativa (fantasma espectral)
- Atmosfera imersiva com shader customizado
- Tipografia impactante com animação de entrada
- CTA claro para próxima seção

#### Conteúdo

**Tag:** `[BRAND AWARENESS]` (mono, 19px, opacity 60%)

**Headline:**
- Desktop/Tablet: 2 linhas
  ```
  Você não vê
  o design.
  ```
- Mobile: 3 linhas
  ```
  Você não
  vê o
  design.
  ```

**Subheading:** "Mas ele vê você." (cor: `#d9dade`)

**CTA:** "step inside →"
- Destino: `#sobre` ou próxima seção
- Formato: Pílula + círculo com seta
- Cor: `#0048ff`

#### Animação de Entrada (Textos)

```js
initial: {
  opacity: 0,
  scale: 0.92,
  y: 60,
  filter: "blur(10px)"
}
animate: {
  opacity: 1,
  scale: [1.02, 1],
  y: 0,
  filter: "blur(0px)"
}
transition: {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94]
}
```

#### Atmosfera Ghost (WebGL)

**Tecnologia:** React Three Fiber + Three.js

**Elementos:**
- **Fantasma 3D:** `SphereGeometry(2,40,40)` com vértices deformados (saia ondulada)
- **Material:** `MeshStandardMaterial` com alta emissividade (`#0080ff`)
- **Olhos:** Esferas menores com glow transparente
- **Fireflies:** 20 vagalumes (esferas amarelas + `PointLight`)
- **Partículas:** Pool de formas pequenas (esfera/tetraedro) que seguem movimento

**Performance Adaptativa:**

| Dispositivo | Fireflies | Partículas | Post-Processing | Pixel Ratio |
|-------------|-----------|------------|-----------------|-------------|
| Desktop | 20 | 50 | ✅ | 2x |
| Tablet | 10 | 25 | ❌ | 1x |
| Mobile | 5 | 10 | ❌ | 1x |

**Interação:**
- Fantasma segue cursor suavemente (desktop)
- Flutuação constante via sin/cos
- Em touch devices: apenas flutuação (sem mouse tracking)

**Fallback:**
- Se `prefers-reduced-motion`: gradiente estático CSS
- Se WebGL falha: imagem SVG estática do fantasma

**Carregamento:**
```tsx
const GhostScene = dynamic(() => import('./GhostScene'), { 
  ssr: false,
  loading: () => <div className="bg-[#040013]" />
});
```

#### Acessibilidade

- Canvas com `role="presentation"` e `aria-hidden="true"`
- Descrição alternativa via `.sr-only`:
  ```
  Animação decorativa de um fantasma flutuante 
  com partículas luminosas que seguem o movimento do cursor
  ```
- Contraste texto/fundo: 19.5:1 (WCAG AAA)

---

### 4.3 Vídeo Manifesto

#### Objetivo
Apresentar resumo poético do trabalho através de vídeo fullscreen, posicionado logo após Hero.

#### Layout

**Desktop e Mobile:**
- Seção fullscreen (colada às paredes)
- `width: 100vw`
- `aspect-ratio: 16/9`
- Sem padding lateral

#### Comportamento do Vídeo

**Propriedades:**
```html
<video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  src="VIDEO-APRESENTACAO-PORTFOLIO.mp4"
  poster="poster.jpg"
/>
```

**Controles:**
- Botão de som sempre visível (desktop e mobile)
- Tap/click = toggle mute
- Ao sair da seção (IntersectionObserver) → muta automaticamente

#### Overlay e Metadados

**Gradiente:**
```css
background: radial-gradient(
  120% 120% at 70% 30%,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.55) 70%,
  rgba(0,0,0,0.75) 100%
);
```

**Texto:**
```
Showreel 2025
Strategy • Branding • Motion
```
(aparece sobre overlay, bottom-left)

#### Animação de Entrada

```js
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
```

#### Otimização

**Lazy Loading:**
- IntersectionObserver com `rootMargin: "200px"`
- Carrega apenas quando próximo da viewport

**Qualidade Adaptativa:**
```js
// Detecta conexão
if (effectiveType === '4g' || '5g') → HD (1080p)
else → SD (720p)
```

**Assets:**
```
VIDEO-HD: VIDEO-APRESENTACAO-PORTFOLIO.mp4
VIDEO-SD: VIDEO-APRESENTACAO-PORTFOLIO-720p.mp4
POSTER: VIDEO-APRESENTACAO-PORTFOLIO-poster.jpg
```

#### Responsividade

**Mobile:**
- Aspect ratio mantido
- Touch target do botão: mínimo 48×48px
- Padding interno ajustado: `p-4` (16px)
- Texto menor: `text-sm` (0.875rem)

---

### 4.4 Portfolio Showcase

#### Objetivo
Apresentar categorias de trabalho com sofisticação editorial, usando movimento e hierarquia para guiar naturalmente até áreas específicas do portfólio.

#### Layout Desktop (≥1024px)

**Estrutura:**
- Headline centralizada: 
  ```
  portfólio showcase
  ("portfólio" branco, "showcase" #0048ff)
  ```
- Label flutuante: `[what we love working on]` (azul, alinhado à esquerda, próximo à primeira faixa)
- 3 faixas horizontais interativas (accordion-style)
- CTA centralizado abaixo

**Faixas (Stripes):**

| Categoria | Alinhamento | Slug |
|-----------|-------------|------|
| Brand & Campaigns | Direita | `brand-campaigns` |
| Videos & Motions | Centro | `videos-motions` |
| Web Campaigns, Websites & Tech | Esquerda | `websites-webcampaigns-tech` |

**Estrutura de Cada Stripe:**
- Thumbnail (288px, 16:9, oculta por padrão)
- Título (2xl–5xl, TT Norms Pro Normal 24-40px)
- Ícone de ação (badge circular azul com seta)

#### Interações (Desktop)

**Scroll Reveal:**
```js
opacity: 0 → 1
translateY: 24px → 0
duration: 0.8s
stagger: 120ms entre faixas
```

**Hover:**
1. Thumbnail:
   ```js
   width: 0 → 288px
   opacity: 0 → 1
   duration: 700ms
   easing: cubic-bezier(0.22, 1, 0.36, 1)
   ```
2. Espaçamento:
   ```js
   gap: gap-7 → gap-10
   duration: 300ms
   ```
3. Ícone:
   ```js
   rotation: -45deg → 0deg
   duration: 500ms
   ```

**Click:** Navega para `/portfolio?filter=[slug]`

#### Assets (Supabase Storage)

```
1. Branding-Project.webp
2. webdesigner-2%202.gif
3. WelcomeAd_800x500px.webp
```

#### Layout Mobile (<1024px)

- Cards verticais full-width
- Conteúdo alinhado à esquerda
- Ícone de seta à direita
- Sem hover (thumbnails ocultas)
- CTA centralizado

---

### 4.5 Featured Projects (Grid)

#### Objetivo
Showcase curado de trabalhos de alta qualidade em layout editorial estilo revista.

#### Layout Desktop

**Grid Irregular (Magazine-style):**

```
┌─────────────┐ ┌──────────────────────────────┐
│   Card 1    │ │         Card 2               │
│ (336×500)   │ │       (840×500)              │
└─────────────┘ └──────────────────────────────┘

┌──────────────────────────────────────────────┐
│              Card 3 (1176×600)               │
└──────────────────────────────────────────────┘

┌────────────────────────────┐ ┌─────────────┐
│        Card 4 (784×400)    │ │ CTA Card    │
└────────────────────────────┘ └─────────────┘
```

**Implementação (Tailwind Grid):**
```jsx
// Row 1
<div className="md:col-span-5"><ProjectCard /></div>
<div className="md:col-span-7"><ProjectCard /></div>

// Row 2
<div className="md:col-span-12"><ProjectCard /></div>

// Row 3
<div className="md:col-span-8"><ProjectCard /></div>
<div className="md:col-span-4"><CTACard /></div>
```

#### Estrutura de Project Card

- **Imagem/Vídeo:** Cobre card, `object-fit: cover`
- **Pills (tags):** Absoluto, top-right, bg `#E6EFEF` 70% opacity
- **Info Block:**
  - Título (H3, medium weight)
  - Meta: `Cliente • Ano` (`#6B7280`, small)
  - Ícone de seta em círculo azul (translada direita no hover)

#### Interações (Desktop)

**Hover:**
```js
image: { scale: 1.03, translateY: -1 }
arrow: { translateX: 20px }
shadow: { shadow-xl shadow-blue-500/10 }
duration: 500-700ms
```

**Scroll Reveal:**
```js
container: { opacity: 0 → 1, y: 40 → 0 }
cards: { scale: 0.96 → 1, staggerChildren: 0.12 }
duration: 0.7s
```

#### Projetos Destacados

1. **Magic — devolvendo a magia ao rádio**
   - Categoria: `branding & campanha`
   - Cliente: Magic | 2023
   - Imagem: `Brand-Identity copy.webp`

2. **Uma marca ousada e consistente**
   - Categoria: `branding`
   - Cliente: Confidencial | 2022
   - Imagem: `Branding-Project.webp`

3. **Key visual para campanha sazonal**
   - Categoria: `campanha`
   - Cliente: Confidencial | 2021
   - Imagem: `Key-Visual.webp`

4. **Experiência web em movimento**
   - Categoria: `web & motion`
   - Cliente: Confidencial | 2023
   - Imagem: `webdesigner-2%202.gif`

#### CTA Card

**Conteúdo:**
- Headline: "Like what you see?"
- Button: "view projects →"
- Background: `#040013`

**Hover:**
```js
text: white → #0057FF
arrow: translateX(4px)
duration: 300ms
```

**Destino:** `/portfolio`

#### Layout Mobile

- Cards empilhados verticalmente
- Full-width, heights adaptados
- CTA card como último item
- Espaçamento consistente (32px)

---




### 4.6 Clientes/Marcas

#### Objetivo
Construir credibilidade exibindo marcas reconhecíveis com as quais já trabalhou.

#### Layout

**Desktop e Mobile:**
- Barra full-width azul: `bg-[#0048ff]`
- Headline centralizada: "marcas com as quais já trabalhei" (branco, bold, 2xl)
- Grid responsivo de logos:
  - Mobile: 2-3 colunas
  - Desktop: 6+ colunas
- Logos: brancos (usar `filter: brightness(0) invert(1)`)

#### Interações

**Hover (Desktop):**
```js
logo: { scale: 1.04, brightness: 1.1 }
duration: 300ms
```

**Scroll Reveal:**
```js
title: { opacity: 0 → 1, y: 16 → 0 }
logos: { 
  staggerChildren: 0.03,
  each: { opacity: 0 → 1, y: 12 → 0, scale: 0.9 → 1 }
}
```

#### Assets

**Base URL:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/client-logos/`

**Logos:** `client1.svg` até `client12.svg` (12 total)

#### Acessibilidade

- Alt text descritivo: "Logo da empresa [nome]"
- Keyboard navigable (se logos forem links)
- Respeita `prefers-reduced-motion` (desabilita stagger)

#### Responsividade Mobile

- Grid: 2 colunas em mobile pequeno, 3 em mobile/tablet
- Logos: 70% do tamanho desktop
- Espaçamento vertical: 24px entre linhas
- Headline: 1.5rem (vs 2rem desktop)
- Padding: 16px em todos os lados

---

### 4.7 Contato

#### Objetivo
Fornecer informações claras de contato e habilitar envio de mensagem.

#### Layout Desktop (≥1024px)

**Estrutura:**
- Duas colunas:
  - Esquerda: Info de contato + redes sociais
  - Direita: Formulário

#### Layout Mobile (<1024px)

**Estrutura vertical:**
1. Headline + subheadline
2. Informações de contato
3. Formulário
4. Links de redes sociais

#### Conteúdo

**Headline:** "contato"  
**Subheadline:** "Tem uma pergunta ou quer trabalhar junto?"

**Canais Diretos:**

| Canal | Valor | Link |
|-------|-------|------|
| Telefone | `+55 (11) 98396-6838` | `tel:+5511983966838` |
| Email principal | `danilo@portfoliodanilo.com` | `mailto:danilo@...` |
| Email secundário | `dannovaisv@gmail.com` | `mailto:dannovaisv@...` |

**Interação:**
- Cor texto: `#111111`
- Hover: Underline + `#0057FF`
- Ícones: mesma cor do texto

**Redes Sociais:**
- Ícones apenas (sem labels)
- Plataformas: Instagram, Facebook, LinkedIn, Portfolio, Twitter
- Cor: `#111111`, hover: `#0057FF` + `scale(1.1)`
- Abrem em nova aba (`target="_blank" rel="noopener noreferrer"`)

**Links:**
```
Instagram:  https://instagram.com/danilo_novais
Facebook:   https://facebook.com/danilonovaisvilela
LinkedIn:   https://linkedin.com/in/danilonovais
Portfolio:  https://portfoliodanilo.com
Twitter:    https://twitter.com/danilo_novais
```

#### Formulário

**Campos:**
- Nome (text, required)
- Email (email, required)
- Mensagem (textarea, required)

**Botão Submit:**
- Label: "Enviar Mensagem"
- Background: `#0048ff`
- Hover: `translateY(-1px)` + `scale(1.02)`
- Tap: `scale(0.98)`

**Action:**
```html
<form method="POST" action="https://formsubmit.co/danilo@portfoliodanilo.com">
```

**Estados:**
- **Focus:** Border `#0057FF` + `ring-2 ring-blue-500`
- **Error:** Mensagem de validação abaixo do campo
- **Success:** Mensagem de sucesso + limpar formulário
- **Loading:** Desabilitar botão + spinner

#### Animações

**Scroll Reveal:**
```js
section: { opacity: 0 → 1, y: 24 → 0 }
form fields: { staggerChildren: 60ms }
duration: 0.6s
```

**Form Interactions:**
```js
input_focus: ring-2 ring-blue-500 ring-offset-2
button_hover: { scale: 1.02, y: -1 }
button_tap: { scale: 0.98 }
```

#### Acessibilidade

- Todos inputs com `<label>` associado
- Keyboard navigable
- Focus indicators (`focus-visible`)
- Mensagens de erro programaticamente associadas
- Touch target mínimo: 48×48px (mobile)

#### Responsividade Mobile

- Layout single-column
- Campos full-width com touch targets maiores
- Info de contato: lista vertical
- Redes sociais: linha única no bottom
- Botão submit: full-width, altura aumentada
- Headlines: center-aligned
- Espaçamento vertical: 32px entre blocos

---

### 4.8 Footer

#### Objetivo
Fornecer informações legais, navegação suplementar e links sociais, respeitando a estética editorial.

#### Desktop (≥1024px)

**Layout:**
- Barra fixa no bottom: `position: fixed`, `bottom: 0`, `z-index: 10`
- Horizontal: Copyright (esquerda) | Navegação + Social (direita)
- Altura: 48-64px
- Persistente (sempre visível)

#### Mobile & Tablet (≤1023px)

**Layout:**
- Seção estática no fluxo do documento (última na página)
- Stack vertical: Copyright → Navegação → Social
- **Nunca fixo**
- **Nunca sobrepõe conteúdo**
- Padding vertical generoso: `py-10`
- Espaçamento entre blocos: `space-y-6`

#### Conteúdo

**Copyright:**
```
© 2025 Danilo Novais Vilela — todos os direitos reservados
```
(branco, small text)

**Navegação:**
- Home → `#hero`
- Portfólio Showcase → `#portfolio-showcase`
- Sobre → `/sobre`
- Contato → `#contact`

**Redes Sociais:**
- Mesmos ícones e links da seção Contato
- Ícones brancos
- Hover (desktop): `opacity: 0.8` + underline
- Mobile: feedback em `:active` / `:focus-visible`

#### Background

- Cor sólida: `bg-[#0057FF]`
- Texto: branco

#### Interações

**Desktop:**
```js
// Hover links
opacity: 1 → 0.8
underline animation
duration: 200ms

// Hover social
scale: 1.05
duration: 200ms
```

**Mobile:**
- Sem hover
- Feedback apenas em `:active` / `:focus-visible`

#### Acessibilidade

- Todos links com `aria-label` se necessário
- Keyboard navigable
- Ordem lógica de tab
- Contraste branco em `#0057FF`: WCAG AA ✓
- Touch targets: mínimo 48×48px

#### Responsividade Mobile Detalhada

- Footer é **último elemento da página** (não fixo)
- Conteúdo: center-aligned
- Navegação: single row (se cabe) ou wrap
- Social: single row abaixo de navegação
- Copyright: `0.875rem` (14px)
- Background: full-width sem constraints
- Espaçamento entre elementos: 32px

#### Não-Negociáveis

- Footer **fixo apenas em desktop**
- Footer **não fixo em mobile**
- Sem competição com Hero, Manifesto ou CTAs
- Design clean e discreto

---

## 5. Stack Técnica

### 5.1 Core

- **Framework:** React 18+ (Hooks)
- **Meta-framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript 5.x
- **Estilização:** Tailwind CSS 3.4+
- **Animações UI:** Framer Motion 11+
- **3D/WebGL:** React Three Fiber 8+ + Three.js 0.163+

### 5.2 Infraestrutura

- **Formulários:** FormSubmit.co
- **Assets:** Supabase Storage
- **Fontes:** Self-hosted (TT Norms Pro .woff2)
- **Deploy:** Vercel / Netlify / Cloudflare Pages
- **Versionamento:** Git (GitHub)

### 5.3 Performance Budget

| Métrica | Target | Tolerância |
|---------|--------|------------|
| FCP (First Contentful Paint) | < 1.8s | < 2.5s |
| LCP (Largest Contentful Paint) | < 2.5s | < 3.5s |
| TBT (Total Blocking Time) | < 200ms | < 350ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| Peso inicial da página | < 1.5MB | < 2MB |
| Lighthouse Score | > 90 | > 85 |

### 5.4 Otimizações

- **Imagens:** WebP, lazy loading, `srcset` responsivo
- **Vídeos:** Comprimidos, autoplay mudo, lazy load
- **Fontes:** Self-hosted, preloaded, subsetting opcional
- **JavaScript:** Code splitting, dynamic imports (WebGL)
- **CSS:** Purge de classes Tailwind não utilizadas
- **WebGL:** Max DPR 2, antialias condicional

---

## 6. Acessibilidade (WCAG 2.1 AA)

### 6.1 Princípios

- **Contraste:** Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Navegação:** 100% operável via teclado
- **Semântica:** HTML semântico correto + ARIA quando necessário
- **Movimento:** Respeitar `prefers-reduced-motion`
- **Touch Targets:** Mínimo 48×48px (mobile)

### 6.2 Checklist

- [ ] Todos os links e botões focáveis
- [ ] Focus indicators visíveis (`focus-visible`)
- [ ] Imagens decorativas com `alt=""` ou `aria-hidden`
- [ ] Formulários com `<label>` associados
- [ ] Headings em ordem hierárquica (`h1` → `h2` → `h3`)
- [ ] Canvas WebGL marcado como `role="presentation"`
- [ ] Mensagens de erro anunciáveis por screen readers
- [ ] Navegação por teclado testada (Tab, Shift+Tab, Enter, Esc)

---

## 7. Fluxo de Desenvolvimento

### 7.1 Estrutura de Pastas (Sugerida)

```
app/
├── layout.tsx                 # Root layout + fonts
├── page.tsx                   # Homepage
├── sobre/
│   └── page.tsx               # Página Sobre
├── portfolio/
│   └── page.tsx               # Grid completo com filtros
│
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── VideoManifesto.tsx
│   ├── PortfolioShowcase.tsx
│   ├── FeaturedProjects.tsx
│   ├── ClientsSection.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── CTAButton.tsx
│   └── canvas/
│       ├── GhostScene.tsx
│       ├── Ghost.tsx
│       ├── Atmosphere.tsx
│       └── Fireflies.tsx
│
├── lib/
│   ├── hooks/
│   │   ├── usePerformanceAdaptive.ts
│   │   ├── useReducedMotion.ts
│   │   └── useMediaQuery.ts
│   └── utils/
│       └── cn.ts              # classnames helper
│
└── styles/
    └── globals.css            # Tailwind + custom CSS
```

### 7.2 Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://umkmwbkwvulxtdodzmzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X (opcional)
```

### 7.3 Comandos

```bash
# Desenvolvimento
npm dev

# Build
npm build

# Preview local
npm start

# Lint
npm lint
```

---

## 8. Checklist de Deploy

### 8.1 Pré-Deploy

- [ ] Auditoria Lighthouse (Score > 90)
- [ ] Teste em dispositivos reais (iOS/Android)
- [ ] Validação de formulário funcionando
- [ ] Links externos com `target="_blank" rel="noopener"`
- [ ] Vídeos com autoplay mudo testados
- [ ] Fallback `prefers-reduced-motion` testado
- [ ] Fontes carregando corretamente
- [ ] Assets de Supabase acessíveis
- [ ] Sem erros no console
- [ ] Sem scroll horizontal (mobile)

### 8.2 Pós-Deploy

- [ ] Verificar tempo de carregamento em 3G
- [ ] Testar navegação por teclado (Tab)
- [ ] Testar com screen reader (NVDA/VoiceOver)
- [ ] Validar meta tags (Open Graph, Twitter Cards)
- [ ] Submeter sitemap ao Google Search Console
- [ ] Configurar analytics (se aplicável)
- [ ] Monitorar Core Web Vitals

---

## 9. Critérios de Sucesso

### 9.1 Quantitativos

- **Engajamento:** >2 min de sessão média
- **Conversão:** 50%+ de cliques em projetos destacados
- **Performance:** Load time <3s (3G)
- **Acessibilidade:** Zero violações WCAG AA
- **Lighthouse:** Scores >90 em todas as categorias

### 9.2 Qualitativos

- Primeira impressão: profissional, sofisticado, único
- Navegação: intuitiva, sem fricção
- Conteúdo: claro, escaneável, convincente
- Experiência: fluida, sem quebras ou bugs
- Design: consistente, editorial, premium

---

## 10. Observações Finais

### 10.1 Filosofia do Projeto

Este portfólio não é apenas uma vitrine de trabalhos — é uma **declaração de capacidade**. Cada decisão de design, animação e conteúdo foi tomada para demonstrar:

1. **Domínio técnico** (WebGL, animações performáticas, responsividade impecável)
2. **Refinamento estético** (tipografia fluida, hierarquia visual clara, paleta coesa)
3. **Atenção ao usuário** (acessibilidade, performance, clareza de informação)

### 10.2 Princípios de Manutenção

- **Modularidade:** Componentes reutilizáveis e bem documentados
- **Performance:** Monitorar Web Vitals regularmente
- **Acessibilidade:** Testar com usuários reais e ferramentas automatizadas
- **Conteúdo:** Manter projetos atualizados (máximo 6 meses)
- **Design System:** Respeitar tokens sempre (cores, tipografia, espaçamentos)

### 10.3 Roadmap Futuro (Opcional)

- [ ] Página individual por projeto (case studies)
- [ ] Filtros avançados no grid de portfólio
- [ ] Modo dark/light (se aplicável)
- [ ] Internacionalização (EN/PT)
- [ ] Blog/artigos sobre design
- [ ] Integração com CMS (Sanity/Contentful)

---
