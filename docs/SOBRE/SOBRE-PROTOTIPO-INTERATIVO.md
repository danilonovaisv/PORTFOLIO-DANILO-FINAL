
# 🧠 PROTÓTIPO INTERATIVO — PÁGINA “SOBRE”

# 🎯 Documentação Técnica — Página Sobre

**Domínio:** portifoliodanilo.com  
**Conceito:** Ghost Design — presença que guia sem aparecer  
**Versão:** 1.0

---

## Visão Geral

### Objetivo da Página

A página **/sobre** estabelece conexão silenciosa, profundidade e confiança através de design que age no subconsciente. Nenhum elemento grita. O design guia sem aparecer.

### Princípios Fundamentais

- **Mobile-first:** expansão progressiva para desktop
- **Narrativa sequencial:** cada seção constrói sobre a anterior
- **Espaço negativo:** elemento ativo do Ghost Design
- **Contraste legível:** texto sempre acessível sobre mídias

### Público-Alvo

Profissionais que buscam:
- Direção criativa estratégica
- Design com propósito e método
- Liderança criativa com visão técnica

---

## Design System

### 2.1 Color Palette

| Token | Value | Uso Principal |
|:------|:------|:--------------|
| **bluePrimary** | `#0048ff` | Marca, CTAs, Links, Foco |
| **blueAccent** | `#4fe6ff` | Atmosfera Ghost, Brilhos, Highlights |
| **background** | `#040013` | Deep Void (Fundo Principal) |
| **text** | `#fcffff` | Texto Primário (Contraste Alto) |
| **textSecondary** | `#a1a3a3` | Metadados, Legendas |
| **surface** | `#0b0d3a` | Cards sutis, Gradientes de fundo |
| **error** | `#ff3366` | Validação de formulários |

---

### 2.2 Typography

**Family:** `TT Norms Pro` (Primary), `Geist Mono` (Code/Tech details).

#### Fluid Typography Tokens (clamp)

| Token | Mobile (<768px) | Desktop (≥1024px) | Weight | Tailwind Class |
|:------|:----------------|:------------------|:-------|:---------------|
| **Display** | 2.5rem (40px) | 5.5rem (88px) | Black | `text-display` |
| **H1** | 2rem (32px) | 3.5rem (56px) | Bold | `text-h1` |
| **H2** | 1.5rem (24px) | 2.5rem (40px) | Bold | `text-h2` |
| **H3** | 1.25rem (20px) | 1.75rem (28px) | Medium | `text-h3` |
| **Body** | 1rem (16px) | 1.125rem (18px) | Regular | `text-body` |

**CSS Implementation:**

```css
@layer base {
  :root {
    --font-display: clamp(2.5rem, 5vw + 1rem, 5.5rem);
    --font-h1: clamp(2rem, 4vw + 1rem, 3.5rem);
    --font-h2: clamp(1.5rem, 3vw + 1rem, 2.5rem);
    --font-h3: clamp(1.25rem, 2vw + 1rem, 1.75rem);
    --font-body: clamp(1rem, 0.5vw + 0.8rem, 1.125rem);
  }
}
```

---

### 2.3 Spacing, Grid & Layout (OPTIMIZED)

O sistema de Grid foi otimizado para **12 colunas** no desktop e **4 colunas** no mobile, garantindo alinhamento matemático perfeito.

#### 📐 The Ghost Grid System

| Breakpoint | Columns | Gutter (Gap) | Margin (X-Padding) | Container Max |
|------------|---------|--------------|-------------------|---------------|
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

#### Ritmo Vertical

- **Seções:** `py-16 md:py-24`
- **Componentes:** `gap-8 md:gap-12`
- **Elementos internos:** `gap-4 md:gap-6`

---

### 2.4 Animation Principles

**Filosofia:** animações orgânicas e intencionais, nunca gratuitas.

**Core Library:** Framer Motion + GSAP

**Diretrizes:**
- Animar apenas `transform` e `opacity` (performance)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo)
- Duração: 300–700ms na maioria das transições
- Stagger: 60–120ms entre elementos sequenciais
- Respeitar `prefers-reduced-motion`

**Padrões comuns:**

```jsx
// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>

// Hover (botões, cards)
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  transition={{ duration: 0.3 }}
/>

// Staggered children
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};
```

---

### 2.5 Global Assets

#### Logos

- **Favicon:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- **Favicon Light:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- **Logo Light:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- **Logo Dark:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

#### Fontes

```css
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PPSupplyMono';
  src: url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

#### Vídeos

- **Manifesto Video:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

#### Client Logos

- 12 monochromatic SVG logos: `client1.svg` through `client12.svg`
- Base URL: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/client-logos/`

---

## Estrutura da Página

### Ordem das Seções

1. Header
2. Hero / Manifesto
3. Origem Criativa
4. O Que Eu Faço
5. Como Eu Trabalho
6. O Que Me Move
7. Clients / Brands
8. Contato
9. Footer

---

## Seções Detalhadas

### 1. Header

**Comportamento:** Idêntico à página Home

#### Desktop

- Logo à esquerda
- Navegação à direita (Home, Sobre, Portfólio do Acaso, Contato)
- Link ativo (/sobre) destacado em `bluePrimary`
- Fundo translúcido sobre vídeo hero
- Borda inferior sutil em `bluePrimary`

#### Mobile

- Logo à esquerda
- Ícone menu (hambúrguer) à direita
- Menu overlay escuro ocupando tela inteira

#### Scroll

- Pode fixar no topo com fundo mais sólido
- Sem efeitos de scale/bounce

---

### 2. Hero / Manifesto

**Função:** Estabelecer presença sem exposição. Primeiro contato silencioso.

#### Desktop

**Layout:**
- Altura: `100vh`
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4`
  - `object-fit: cover`
  - Loop contínuo, sem controles
- Overlay: gradiente `background` (#040013) com opacidade variável
- Grid 12 colunas (max-width: 1440px):
  - Colunas 1–6: espaço negativo + vídeo
  - Colunas 7–12: bloco de texto

**Composição Tailwind:**

```tsx
<section className="relative h-screen w-full overflow-hidden">
  {/* Vídeo Background */}
  <video className="absolute inset-0 w-full h-full object-cover" />
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
  
  {/* Container Grid */}
  <div className="relative h-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-8 h-full items-center">
      {/* Espaço negativo desktop */}
      <div className="hidden lg:block lg:col-span-6" />
      
      {/* Bloco de texto */}
      <div className="col-span-4 md:col-span-8 lg:col-span-6 text-right">
        {/* Conteúdo */}
      </div>
    </div>
  </div>
</section>
```

**Texto:**
- Alinhado à direita dentro do bloco
- Posicionado 10% acima do centro vertical
- Sem CTA

#### Mobile

**Layout:**
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4`
  - Altura: 45–55vh
  - `object-fit: cover`, foco no rosto
  - Logo abaixo do header fixo
- Overlay: gradiente `background`
- Bloco de texto:
  - Abaixo do vídeo, dentro do fundo escuro
  - Largura 100%, padding horizontal px-6
  - Centralizado
  - Min-height: 100vh (permite scroll)

**Composição Mobile:**

```tsx
<section className="relative min-h-screen w-full">
  {/* Vídeo Hero */}
  <div className="relative h-[50vh]">
    <video className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
  </div>
  
  {/* Conteúdo Texto */}
  <div className="bg-background px-6 py-12 text-center">
    {/* Conteúdo */}
  </div>
</section>
```

**Gradiente:** suaviza transição para próxima seção

#### Conteúdo

**H1:**
```
Sou Danilo Novais.
```

**Texto Manifesto (H1):**
```
Você não vê tudo
o que eu faço. Mas
sente quando
funciona.
```

**Subtítulo (H2):**
```
Crio design que observa, entende
e guia experiências com intenção,
estratégia e tecnologia — na medida certa.
```

**Destaques:** "Danilo Novais", "não vê tudo", "funciona" em `bluePrimary`

#### Animação

| Frame | Estado |
|-------|--------|
| 0% | `opacity: 0`, `blur: 10px` |
| 30% | Linha 1 aparece |
| 60% | Linha 2 aparece |
| 100% | Texto completo |

- Entrada linha a linha
- Delay entre linhas: 0.2–0.4s
- Duração total: 1.4s
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

---

### 3. Origem Criativa

**Função:** Revelar trajetória criativa através de efeito mask reveal pinned — imagens emergem de baixo para cima como "memórias sendo descobertas".

**Stack Técnico:** GSAP 3.13 + ScrollTrigger + Lenis

**Referência:** https://codepen.io/danilonovaisv/pen/KwMgWMG
**CÓDIGO REFERENCIA:** https://drive.google.com/drive/folders/1SZg3TTXHT3l6OHZhxeFbCC8vR0k2RHE3?usp=sharing

#### Desktop

**Layout:**
- Grid 2 colunas fixas:
  - Esquerda (300px mín): textos
  - Direita (540px máx): imagens pinned
- Container: 1440px
- Gap: 60px
- Padding: 2rem

**Composição Grid:**

```tsx
<section className="w-full bg-background py-24">
  <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
    {/* Título */}
    <h1 className="text-h1 text-center mb-16">Origem</h1>
    
    {/* Grid Desktop */}
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12">
      {/* Textos - Esquerda */}
      <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-24">
        {/* Blocos de texto */}
      </div>
      
      {/* Imagens Pinned - Direita */}
      <div className="hidden lg:block lg:col-span-6 sticky top-24 h-fit">
        {/* Imagens com mask reveal */}
      </div>
    </div>
  </div>
</section>
```

**Imagens:**
- 4 imagens (500px altura, auto largura)
- Pinned à direita
- Z-index: 4 → 1 (sequencial)
- `object-fit: cover`
- `border-radius: 24px`
- `blur(4px)` inicial → `blur(0)`
- `opacity: 0.85` → `1`

#### Mobile

**Layout:**
- Stack vertical intercalado: Texto → Imagem
- Ordem controlada via CSS `order`
- Imagens: 400–400px

**Composição Mobile:**

```tsx
<section className="w-full bg-background py-16">
  <div className="max-w-[1680px] mx-auto px-6">
    <h1 className="text-h1 text-center mb-12">Origem</h1>
    
    <div className="space-y-12">
      {/* Bloco 1 */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-h2 text-bluePrimary mb-4">O QUE PERMANECE</h2>
          <p className="text-body">...</p>
        </div>
        <img src="..." className="w-full rounded-2xl" />
      </div>
      
      {/* Repetir para blocos 2-4 */}
    </div>
  </div>
</section>
```

#### Conteúdo

**Título (H1):**
```
Origem
```

**Blocos:**

**1. O QUE PERMANECE** (H1, `bluePrimary`)
```
Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.1.webp`
- Texto: alinhado à direita, -10% vertical

**2. DO TRAÇO À INTENÇÃO** (H1, `bluePrimary`)
```
Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.2.webp`
- Texto: alinhado à esquerda, -10% vertical

**3. A DESCOBERTA DO INVISÍVEL** (H1, `bluePrimary`)
```
Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.3.webp`
- Texto: alinhado à direita, -10% vertical

**4. EXPANSÃO COM PROPÓSITO** (H1, `bluePrimary`)
```
Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.
```
- **Imagem:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.4.webp`
- Texto: alinhado à esquerda, -10% vertical

#### Animação GSAP

**Desktop (Pin + Mask Reveal):**

```tsx
gsap.timeline({
  scrollTrigger: { 
    pin: ".arch__right", 
    scrub: true,
    start: "top top",
    end: "bottom bottom"
  }
})
.to(imgAtual, { 
  clipPath: "inset(0 0 100%)",
  duration: 1
})
.to(imgProxima, { 
  objectPosition: "0px 40%",
  duration: 1
}, "<");
```

**Especificações:**
- `clipPath: "inset(0 0 100%)"` → `inset(0)`
- Object position: `0% 0%` → `60%` (atual) + `40%` (próxima)
- Transição BG: `#040013` → `#0a001a` (duration: 1.5s)
- Blur/Focus: `blur(4px)` → `blur(0px)` + `opacity: 0.85→1`

**Mobile (Parallax):**
- `objectPosition: 60% → 30%` por imagem
- Trigger: Intersection Observer

#### Identidade Visual

| Elemento | Especificação |
|----------|---------------|
| Cores | `#040013` → `#0a001a`, `#fcffff` (texto), `bluePrimary` (H1) |
| Tipografia | TT Norms Pro: H1 800 (32-48px), H3 400 (16-20px), line-height: 1.6 |
| Espaçamentos | Container 1440px, gap 60px, padding 2rem |
| Bordas | `border-radius: 24px` |

#### Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| < 560px | Stack vertical, imgs 280px, container padding 10px |
| 560–768px | Stack, imgs 360px, gap 20px |
| 769–1024px | 2-col, right flexível, gap 30px |
| 1024px+ | Pin completo, textos 356px fixos, max-width 1100px |
| > 1440px | Container limitado, centralizado |

#### Acessibilidade

- Semântica: `<section class="origem-criativa">` + H1 por bloco
- ALT texts descritivos (ex: "O que permanece - essência que sobrevive...")
- Contraste: 21:1 (`#fcffff` sobre `#040013`)
- Navegação por teclado nativa
- `prefers-reduced-motion` support
- SEO: H1 único "Origem" + H3s hierárquicos
- Performance: `loading="lazy"`, GPU `transform`/`clip-path`

---

### 4. O Que Eu Faço

**Função:** Transformar serviços em sequência visual progressiva com animação horizontal guiada pelo scroll.

**Referência:** https://codepen.io/luis-lessrain/pen/dPPOGaZ

#### Identidade Visual

| Elemento | Cor |
|---------|------|
| Fundo | `#040013` |
| Cards | `#0048ff` |
| Texto | `#ffffff` |
| Numeração | `#8705f2` |

#### Desktop (≥ 1024px)

**Layout:**
- Altura: ~100vh
- Container: max-width 1440px, padding conforme grid system
- Cards em linha única (`flex-row`)
- 7 blocos sem wrap

**Composição:**

```tsx
<section className="w-full min-h-screen bg-background py-24">
  <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
    <div className="flex flex-row gap-6 overflow-x-auto scrollbar-hide">
      {services.map((service, index) => (
        <article 
          key={index}
          className="min-w-[320px] min-h-[140px] bg-bluePrimary rounded-2xl p-6 flex items-center gap-4"
        >
          <span className="text-4xl font-black text-[#8705f2]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="text-body text-white">
            <strong className="text-blueAccent">{service.keyword}</strong>
            {service.description}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Cards:**
- Min-width: 320px
- Min-height: 140px
- Padding: 24px
- Border-radius: 16px
- Background: `#0048ff`
- Display: flex, align-items: center
- Gap interno: 16px

**Numeração:**
- Cor: `#8705f2`
- Peso: 800
- Display inline ou prefix

**Animação (Scroll Driven):**
- Origem X: `+120vw`
- Destino X: `0`
- Opacidade: `0 → 1`
- Stagger: `0.06s`
- Técnica: GSAP + ScrollTrigger ou Framer Motion + useScroll

```tsx
// GSAP Implementation
gsap.from(".service-card", {
  x: "120vw",
  opacity: 0,
  stagger: 0.06,
  scrollTrigger: {
    trigger: ".services-section",
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});
```

#### Mobile (≤ 768px)

**Layout:**
- Coluna vertical
- Gap: 12px
- Cards 100% largura

**Composição Mobile:**

```tsx
<section className="w-full bg-background py-16">
  <div className="max-w-[1680px] mx-auto px-6">
    <div className="flex flex-col gap-3">
      {services.map((service, index) => (
        <article 
          key={index}
          className="w-full min-h-[80px] bg-bluePrimary rounded-xl p-5 flex items-center gap-3"
        >
          <span className="text-2xl font-black text-[#8705f2]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="text-sm text-white">
            <strong className="text-blueAccent">{service.keyword}</strong>
            {service.description}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Barras:**
- Altura: 70–90px
- Padding: 18px
- Border-radius: 12px

**Animação (Viewport-based):**
- Origem X: `+80px`
- Destino X: `0`
- Duração: `0.4s`
- Delay progressivo por índice
- Trigger: Intersection Observer

```tsx
// Framer Motion Implementation
<motion.article
  initial={{ x: 80, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.4, delay: index * 0.1 }}
  viewport={{ once: true }}
>
  {/* Card content */}
</motion.article>
```

#### Conteúdo

1. **Direção** criativa que organiza o caos
2. **Design** estratégico que guia decisões
3. **Identidades** que permanecem na memória
4. **Campanhas** multicanais com lógica e emoção
5. **Branding** que não grita — mas marca
6. **Inteligência Artificial** aplicada à criação
7. **Liderança Criativa** com visão e método

**Regra:** Palavra-chave inicial em `blueAccent`, complemento em branco.

#### Acessibilidade

- `<h2>` para título da seção
- Cards como `<article>` com `aria-label` descritivo
- Contraste AA/AAA verificado
- Navegação por teclado funcional
- `prefers-reduced-motion` respeitado

#### Notas Técnicas

- Usar `transform: translateX()` para performance
- `will-change: transform` apenas durante animação
- Evitar sombras pesadas (performance mobile)
- Animações suaves (ease: linear / easeOut)
- Código modular (AboutWhatIDo.tsx isolado)

---

### 5. Como Eu Trabalho

**Função:** Gerar confiança racional através do método. Mostrar que criatividade é suportada por processo.

#### Desktop

**Layout:**
- Altura: ~120vh
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/AboutMethod.mp4`
  - `object-fit: cover`, 100% largura/altura
  - Loop contínuo, sem controles
- Overlay: gradiente linear
  - Esquerda (texto): `rgba(10, 10, 20, 0.85)`
  - Direita (visual): `rgba(10, 10, 20, 0.4)`
- Grid 12 colunas (max-width: 1440px)
  - Coluna conteúdo (esquerda): colunas 2–7
  - Área visual (direita): colunas 8–12

**Composição Grid:**

```tsx
<section className="relative w-full min-h-[120vh]">
  {/* Vídeo Background */}
  <video 
    className="absolute inset-0 w-full h-full object-cover"
    src="..."
    autoPlay
    loop
    muted
    playsInline
  />
  
  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,20,0.85)] via-[rgba(10,10,20,0.65)] to-[rgba(10,10,20,0.4)]" />
  
  {/* Container Grid */}
  <div className="relative max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8">
      {/* Conteúdo - Esquerda */}
      <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col justify-center">
        {/* Título, texto, lista */}
      </div>
      
      {/* Área Visual - Direita */}
      <div className="hidden lg:block lg:col-span-5" />
    </div>
  </div>
</section>
```

**Título:**
- Alinhado à esquerda
- Duas linhas:
  - "**Criatividade** com **método**."
  - "**Impacto** sem **ruído**."
- Destaques: "criatividade", "método" em `bluePrimary`
- Font-size: 44–52px (clamp)
- Line-height: 1.15
- Font-weight: 700
- Margin-bottom: 32–40px

**Texto Introdutório:**
- Três frases em parágrafos separados
- Font-size: 18–20px
- Line-height: 1.6
- Opacity: 0.9
- Max-width: 520px
- Margin-bottom: 48–56px

**Lista de Processo:**
- 6 itens em cards verticais

```tsx
<div className="space-y-5">
  {processItems.map((item, index) => (
    <div 
      key={index}
      className="bg-surface/70 backdrop-blur-md border-l-4 border-bluePrimary rounded-lg p-6"
    >
      <span className="text-lg font-bold text-bluePrimary mr-4">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-body text-white">
        {item.text}
      </span>
    </div>
  ))}
</div>
```

**Especificações do Card:**
- Fundo: `rgba(26, 26, 46, 0.7)` com `backdrop-filter: blur(12px)`
- Borda esquerda: 4px sólida em `bluePrimary`
- Padding: 20–24px
- Margin-bottom: 16–20px
- Border-radius: 6–8px
- Índice em `bluePrimary` (01–06)
- Texto em branco

#### Mobile

**Layout:**
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/sobre_page/aboutmetodo-mob.mp4`
  - `object-position: right center`
  - Gradiente vertical no fim
  - Sem overlay pesado
- 1 coluna, padding px-6
- Conteúdo iniciando no meio do vídeo para baixo

**Composição Mobile:**

```tsx
<section className="relative w-full min-h-screen">
  {/* Vídeo Background */}
  <video 
    className="absolute inset-0 w-full h-full object-cover object-right"
    src="..."
    autoPlay
    loop
    muted
    playsInline
  />
  
  {/* Gradient Overlay (bottom only) */}
  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
  
  {/* Conteúdo */}
  <div className="relative px-6 py-20 flex flex-col justify-end min-h-screen">
    <div className="text-center space-y-8">
      {/* Título */}
      <h2 className="text-h2">...</h2>
      
      {/* Texto intro */}
      <p className="text-body">...</p>
      
      {/* Lista */}
      <div className="space-y-4">
        {/* Cards */}
      </div>
    </div>
  </div>
</section>
```

**Título:**
- Centralizado
- Font-size: 32–36px
- Margin-bottom: 24–32px

**Texto introdutório:**
- Centralizado
- Font-size: 16–17px
- Margin-bottom: 40–48px

**Lista:**
- Cards empilhados
- Fundo: `rgba(26, 26, 46, 0.85)` (mais sólido)
- Padding: 16–20px
- Margin-bottom: 14–16px

#### Conteúdo da Lista

1. **01** | Briefings bem construídos para decisões claras
2. **02** | Estratégia como base de qualquer criação
3. **03** | Design com propósito, não só beleza
4. **04** | Revisões inteligentes, sem ruído desnecessário
5. **05** | IA e automações para escalar com qualidade
6. **06** | Métricas criativas: engajamento, retenção e resultado

#### Animação

**Título:**
```tsx
<motion.h2
  initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
  viewport={{ once: true }}
>
  {/* Conteúdo */}
</motion.h2>
```

**Texto introdutório:**
- Mesma animação, delay 0.2s

**Lista:**
```tsx
{processItems.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: 0.5, 
      delay: 0.4 + (index * 0.12),
      ease: "easeOut"
    }}
    viewport={{ once: true }}
  >
    {/* Card */}
  </motion.div>
))}
```

**Hover (Desktop):**
```tsx
<motion.div
  whileHover={{
    opacity: 1,
    x: 4,
    borderLeftWidth: "4px",
    transition: { duration: 0.3 }
  }}
  className="opacity-90"
>
  {/* Card */}
</motion.div>
```

#### Responsividade

| Breakpoint | Ajustes |
|------------|---------|
| 640–767px | Título 30–32px, texto 15–16px, lista 100% |
| 768–1023px | Título 36–40px, texto 17–18px, cards max-w-90% |
| 1024–1279px | Grid 2 blocos (1-7 texto, 8-12 vídeo), título 42–46px |
| 1280px+ | Grid otimizado 2–7 texto, 8–12 vídeo, título 48–52px |

#### Acessibilidade

**prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .method-title,
  .method-card {
    animation: none !important;
    transition: opacity 0.2s !important;
    transform: none !important;
  }
}
```

- Contraste WCAG AA mínimo verificado
- Z-index stack: vídeo (1), overlay (2), conteúdo (3)
- Navegação por teclado
- Semântica: `<section>`, `<h2>`, `<ul>`, `<li>`

---



### 6. O Que Me Move

**Função:** Criar vínculo emocional através de manifesto pessoal. Momento mais íntimo da página.

#### Desktop

**Layout:**
- Altura: ~140vh
- Fundo: `#040013`
- Container 12 colunas (max-width: 1440px)

**Estrutura em 3 Momentos:**

**1. Título Fixo (sempre visível)**
```tsx
<section className="relative w-full min-h-[140vh] bg-background">
  <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
    {/* Título Fixo */}
    <div className="sticky top-24 mb-20">
      <h2 className="text-display text-center max-w-4xl mx-auto">
        Acredito no <span className="text-bluePrimary">design que muda o dia</span> de alguém.
        <br />
        Não pelo choque, <span className="text-bluePrimary">mas pela conexão.</span>
      </h2>
    </div>
    
    {/* Área de Frases Rotativas */}
    <div className="min-h-[40vh] flex items-center justify-center">
      {/* Frases */}
    </div>
    
    {/* Reveal Final */}
    <div className="grid grid-cols-12 gap-12 mt-32">
      {/* Ghost + Manifesto */}
    </div>
  </div>
</section>
```

**Título:**
- Colunas 2–10, centralizado
- Margin-top: 10–12vh
- Margin-bottom: 8–10vh
- Permanece fixo durante sequência

**Texto:**
```
Acredito no design que muda o dia de alguém.
Não pelo choque, mas pela conexão.
```

**Estilo:**
- Font-size: Display Black (clamp(2.5rem, 5vw + 1rem, 5.5rem))
- Line-height: 1.2
- Font-weight: 900
- Destaques: "design que muda o dia", "mas pela conexão" em `bluePrimary`
- Max-width: 900px
- Text-align: center

**2. Área de Frases Rotativas**

```tsx
<div className="relative min-h-[40vh] flex items-center justify-center">
  <AnimatePresence mode="wait">
    <motion.p
      key={currentPhrase}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-medium text-center max-w-3xl"
    >
      {phrases[currentPhrase]}
    </motion.p>
  </AnimatePresence>
</div>
```

**Frases (uma por vez):**
1. "Um vídeo que **respira**."
2. "Uma marca que se **reconhece**."
3. "Um detalhe que **fica**."
4. "**Crio** para gerar presença."
5. "**Mesmo** quando não estou ali."
6. "**Mesmo** quando ninguém percebe o esforço."

**Estilo:**
- Font-size: 32–38px
- Line-height: 1.4
- Font-weight: 500
- Palavras em `bluePrimary` destacadas em negrito
- Text-align: center
- Max-width: 700px

**3. Reveal Final — Ghost + Manifesto**

```tsx
<div className="grid grid-cols-12 gap-12 items-center mt-32">
  {/* Ghost Animado - Esquerda */}
  <div className="col-span-6 flex justify-center">
    <div className="w-[380px] h-[380px]">
      {/* Ghost SVG com animação de olhos seguindo cursor */}
    </div>
  </div>
  
  {/* Manifesto - Direita */}
  <div className="col-span-6">
    <h2 className="text-[64px] font-black leading-[1.1]">
      ISSO É<br />
      <span className="text-bluePrimary">GHOST<br />DESIGN.</span>
    </h2>
  </div>
</div>
```

#### Mobile

**Layout:**
- 1 coluna, padding px-6
- Altura flexível (>120vh)

**Composição Mobile:**

```tsx
<section className="w-full min-h-screen bg-background py-16">
  <div className="max-w-[1680px] mx-auto px-6">
    {/* Título Fixo */}
    <h2 className="text-h1 text-center mb-16">
      Acredito no <span className="text-bluePrimary">design que muda o dia</span> de alguém.
      <br />
      Não pelo choque, <span className="text-bluePrimary">mas pela conexão.</span>
    </h2>
    
    {/* Frases Rotativas */}
    <div className="min-h-[35vh] flex items-center justify-center mb-16">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhrase}
          className="text-2xl font-medium text-center"
        >
          {phrases[currentPhrase]}
        </motion.p>
      </AnimatePresence>
    </div>
    
    {/* Reveal Final - Coluna */}
    <div className="flex flex-col items-center space-y-10">
      {/* Ghost */}
      <div className="w-[240px] h-[240px]">
        {/* Ghost SVG */}
      </div>
      
      {/* Manifesto */}
      <h2 className="text-[42px] font-black text-center leading-tight">
        ISSO É<br />
        <span className="text-bluePrimary">GHOST<br />DESIGN.</span>
      </h2>
    </div>
  </div>
</section>
```

**Título Fixo:**
- Centralizado, margin-top: 8vh
- Font-size: 28–34px
- Max-width: 100%
- Margin-bottom: 6–8vh

**Frases Rotativas:**
- Min-height: 35vh
- Font-size: 22–26px
- Padding: 0 16px

**Reveal Final:**
- Layout coluna
- Ghost: 200–240px, margin-bottom: 32–40px
- Texto: 36–42px, centralizado

#### Animação e Sequência

**Fase 1: Título Fixo (0s)**
```tsx
<motion.h2
  initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {/* Conteúdo */}
</motion.h2>
```

**Fase 2: Frases Rotativas (após 1.5s)**

Cada frase tem um ciclo de:
- **Entrada:** 0.8s
- **Permanência:** 2.5s
- **Saída:** 0.6s
- **Pausa entre frases:** 0.3s

**Total por frase:** ~4.2s  
**Total 6 frases:** ~25s

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
  }, 4200);
  
  return () => clearInterval(timer);
}, []);
```

**Animação de cada frase:**
```tsx
<motion.p
  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
  transition={{ 
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1]
  }}
>
  {phrase}
</motion.p>
```

**Fase 3: Reveal Final**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
  viewport={{ once: true }}
>
  {/* Ghost + Manifesto */}
</motion.div>
```

#### Responsividade

| Breakpoint | Ajustes |
|------------|---------|
| 640–767px | Título 28–30px, frases 20–22px, ghost 180–200px, manifesto 32–36px |
| 768–1023px | Título 34–38px, frases 24–28px, ghost 220–260px, manifesto 40–46px |
| 1024–1279px | Grid 2 colunas reveal, título 40–44px, frases 30–34px, ghost 280–320px |
| 1280px+ | Título 48–52px, frases 36–38px, ghost 320–380px, manifesto 60–64px |

#### Ghost Interativo

**Funcionalidade:**
- Olhos seguem cursor (desktop)
- Animação sutil de respiração

```tsx
const GhostInteractive = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const ghost = document.getElementById('ghost');
      const rect = ghost.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const maxMove = 8;
      const x = Math.max(-maxMove, Math.min(maxMove, deltaX / 20));
      const y = Math.max(-maxMove, Math.min(maxMove, deltaY / 20));
      
      setEyePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <motion.div
      id="ghost"
      animate={{ 
        y: [0, -10, 0],
        scale: [1, 1.02, 1]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Ghost SVG com olhos animados */}
      <svg viewBox="0 0 200 200">
        {/* Corpo do Ghost */}
        <path d="..." fill="url(#ghostGradient)" />
        
        {/* Olhos */}
        <circle 
          cx={70 + eyePosition.x} 
          cy={80 + eyePosition.y} 
          r="8" 
          fill="#0048ff"
        />
        <circle 
          cx={130 + eyePosition.x} 
          cy={80 + eyePosition.y} 
          r="8" 
          fill="#0048ff"
        />
      </svg>
    </motion.div>
  );
};
```

---

## Responsividade

### Variações por Dispositivo

**Filosofia:** Mobile-first com expansão progressiva

#### Desktop (≥ 1024px)

**Características:**
- Grid 12 colunas (max-width: 1440–1680px)
- Espaço negativo como elemento ativo do Ghost Design
- Seções em 2 colunas (texto ↔ mídia)
- Vídeos/imagens com opacidade reduzida e overlays
- Animações complexas (parallax, scroll-driven)

**Composição Grid Desktop:**
```tsx
<section className="w-full">
  <div className="max-w-[1680px] mx-auto px-16 xl:px-24 py-24">
    <div className="grid grid-cols-12 gap-8">
      {/* Conteúdo distribuído em 12 colunas */}
    </div>
  </div>
</section>
```

#### Tablet (768px–1023px)

**Características:**
- Transição suave entre layouts
- Grid 8 colunas
- Conteúdos densos mantêm 1 coluna
- Listas/grids começam divisão 2 colunas
- Foco em legibilidade

**Composição Tablet:**
```tsx
<section className="w-full">
  <div className="max-w-[1680px] mx-auto px-12 py-20">
    <div className="grid grid-cols-8 gap-6">
      {/* Conteúdo em 8 colunas */}
    </div>
  </div>
</section>
```

#### Mobile (< 768px)

**Características:**
- 1 coluna em toda página
- Grid 4 colunas para alinhamento interno
- Texto sempre antes de imagem/vídeo
- Tipografia maior para leitura confortável
- Espaçamentos verticais aumentados
- Vídeos recortados focando elemento principal
- Animações simplificadas

**Composição Mobile:**
```tsx
<section className="w-full">
  <div className="max-w-[1680px] mx-auto px-6 py-16">
    <div className="grid grid-cols-4 gap-4">
      {/* Conteúdo em 4 colunas */}
      <div className="col-span-4">
        {/* Full width */}
      </div>
    </div>
  </div>
</section>
```

### Breakpoints Padrão

| Breakpoint | Range | Colunas | Padding | Gap | Comportamento |
|------------|-------|---------|---------|-----|---------------|
| `mobile` | < 768px | 4 | 24px (px-6) | 16px (gap-4) | 1 coluna, texto centralizado |
| `tablet` | 768px–1023px | 8 | 48px (px-12) | 24px (gap-6) | Transição 1-2 colunas |
| `desktop` | 1024px–1599px | 12 | 64px (px-16) | 32px (gap-8) | Grid completo |
| `wide` | ≥ 1600px | 12 | 96px (px-24) | 40px (gap-10) | Max respiro |

### Regras de Alinhamento

**Mobile (< 768px):**
```css
/* Padrão para todas as seções */
.section-mobile {
  text-align: center;
  align-items: center;
  justify-content: center;
}

/* Exceções controladas por classe */
.section-mobile.text-left {
  text-align: left;
  align-items: flex-start;
}
```

**Desktop (≥ 1024px):**
```css
/* Padrão */
.section-desktop {
  text-align: left;
  align-items: flex-start;
}

/* Destaques e frases */
.section-desktop.text-center {
  text-align: center;
  align-items: center;
}
```

### Exemplo de Seção Responsiva Completa

```tsx
<section className="w-full bg-background py-16 md:py-20 lg:py-24">
  {/* Container responsivo */}
  <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
    {/* Grid responsivo */}
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
      {/* Título - Full width mobile, 8 cols desktop */}
      <div className="col-span-4 md:col-span-8 lg:col-span-8 text-center md:text-left">
        <h2 className="text-h2 mb-6">Título da Seção</h2>
      </div>
      
      {/* Conteúdo - Full mobile, 4 cols desktop cada */}
      <div className="col-span-4 md:col-span-4 lg:col-span-6">
        <p className="text-body">Conteúdo esquerda...</p>
      </div>
      
      <div className="col-span-4 md:col-span-4 lg:col-span-6">
        <img src="..." className="w-full rounded-2xl" alt="..." />
      </div>
    </div>
  </div>
</section>
```

---

## Acessibilidade

### Princípios WCAG 2.1

**Nível de conformidade:** AA (mínimo), AAA (preferencial)

#### Contraste de Cores

| Combinação | Ratio | Status |
|------------|-------|--------|
| `#fcffff` sobre `#040013` | 21:1 | ✅ AAA |
| `#0048ff` sobre `#040013` | 8.2:1 | ✅ AAA |
| `#4fe6ff` sobre `#040013` | 14.5:1 | ✅ AAA |
| `#a1a3a3` sobre `#040013` | 7.1:1 | ✅ AAA |

**Ferramenta de teste:** WebAIM Contrast Checker

#### Hierarquia Semântica

```html
<!-- Estrutura correta -->
<main>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">Sou Danilo Novais.</h1>
    <!-- Conteúdo -->
  </section>
  
  <section aria-labelledby="origin-title">
    <h2 id="origin-title">Origem</h2>
    
    <article>
      <h3>O Que Permanece</h3>
      <!-- Conteúdo -->
    </article>
  </section>
</main>
```

**Regras:**
- Um único `<h1>` por página (Hero)
- Hierarquia sequencial sem pulos (h1 → h2 → h3)
- `aria-labelledby` conectando seções aos títulos
- Landmarks semânticos (`<main>`, `<section>`, `<article>`)

#### Navegação por Teclado

**Elementos interativos:**
```tsx
// Botões
<button
  className="..."
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  CTA
</button>

// Links

  href="..."
  className="focus:outline-none focus:ring-2 focus:ring-bluePrimary focus:ring-offset-2"
>
  Link
</a>

// Cards clicáveis
<article
  tabIndex={0}
  role="button"
  aria-label="Card título"
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleClick();
  }}
>
  {/* Conteúdo */}
</article>
```

**Estados de foco:**
```css
/* Focus visível */
*:focus {
  outline: 2px solid #0048ff;
  outline-offset: 4px;
}

/* Focus dentro de elementos dark */
.dark *:focus {
  outline-color: #4fe6ff;
}

/* Remove outline apenas se mouse */
*:focus:not(:focus-visible) {
  outline: none;
}
```

#### Textos Alternativos

**Imagens decorativas:**
```tsx
<img src="..." alt="" aria-hidden="true" />
```

**Imagens informativas:**
```tsx
<img 
  src="sobre-1.webp" 
  alt="Detalhes que sobrevivem ao tempo — essência preservada em elementos visuais minimalistas" 
/>
```

**Vídeos de fundo:**
```tsx
<video
  aria-hidden="true"
  role="presentation"
  muted
  autoPlay
  loop
  playsInline
>
  <source src="..." type="video/mp4" />
</video>
```

#### Reduced Motion

**Implementação completa:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

/* Mantém apenas fade simples */
  .preserve-fade {
    animation-duration: 0.2s !important;
    transition-duration: 0.2s !important;
  }
}
```

**React/Framer Motion:**
```tsx
import { useReducedMotion } from 'framer-motion';

const MyComponent = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.6 
      }}
    >
      {/* Conteúdo */}
    </motion.div>
  );
};
```

#### Screen Readers

**Anúncios de carregamento:**
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {loading ? "Carregando conteúdo..." : "Conteúdo carregado"}
</div>
```

**Elementos ocultos visualmente:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Uso:**
```tsx
<button>
  <span className="sr-only">Abrir menu</span>
  <HamburgerIcon aria-hidden="true" />
</button>
```

### Checklist de Acessibilidade

**Antes do Deploy:**

- [ ] Contraste de cores validado (WCAG AA/AAA)
- [ ] Navegação completa por teclado (Tab, Enter, Esc, Setas)
- [ ] Hierarquia semântica correta (H1 único, sequência H2-H6)
- [ ] ALT texts descritivos em todas as imagens
- [ ] `aria-label` em elementos interativos sem texto
- [ ] `prefers-reduced-motion` implementado
- [ ] Focus visível em todos os elementos interativos
- [ ] Testado com screen reader (NVDA/JAWS/VoiceOver)
- [ ] Zoom 200% sem quebra de layout
- [ ] Landmarks semânticos (`<main>`, `<nav>`, `<section>`)
- [ ] Vídeos com `aria-hidden` quando decorativos
- [ ] Formulários com labels associados
- [ ] Skip links para navegação rápida

---

## Observações Finais

### Fonte Única da Verdade

Este documento consolida **TODO** o conteúdo da página /sobre. Nenhuma decisão fora deste documento é válida sem atualização prévia deste arquivo.

### Princípios de Implementação

1. **Mobile-first:** começar pela menor tela, expandir progressivamente
2. **Progressive enhancement:** funcionalidade básica primeiro, melhorias depois
3. **Performance:** lazy load, GPU transforms, otimização de assets
4. **Modularidade:** componentes reutilizáveis e isolados
5. **Manutenibilidade:** código limpo, comentado, documentado
6. **Acessibilidade:** WCAG AA mínimo, AAA preferencial

### Stack Técnica Recomendada

**Framework & Ferramentas:**
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Animações:** Framer Motion 11+, GSAP 3.13+ + ScrollTrigger
- **Smooth Scroll:** Lenis
- **Styling:** Tailwind CSS 3.4+
- **Fonts:** Self-hosted (TT Norms Pro)
- **Assets:** Supabase Storage
- **Otimização de Imagens:** Next/Image com sharp

**Estrutura de Pastas:**
```
/app
  /sobre
    page.tsx
    /components
      Header.tsx
      Hero.tsx
      OrigemCriativa.tsx
      AboutWhatIDo.tsx
      AboutMethod.tsx
      AboutBeliefs.tsx
      Footer.tsx
    /lib
      animations.ts
      gsap-config.ts
    layout.tsx
```

### Performance Targets

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| Lighthouse Performance | ≥ 90 | Lighthouse |
| First Contentful Paint (FCP) | < 1.8s | PageSpeed Insights |
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Time to Interactive (TTI) | < 3.8s | PageSpeed Insights |
| Total Blocking Time (TBT) | < 200ms | Lighthouse |

**Otimizações críticas:**
- Lazy load de vídeos fora do viewport
- Preload de fontes críticas
- Code splitting por seção
- Compressão de imagens (WebP com fallback)
- Minificação de CSS/JS
- CDN para assets estáticos

### Versionamento

**Formato:** Semantic Versioning (MAJOR.MINOR.PATCH)

- **MAJOR:** Mudanças estruturais na página
- **MINOR:** Novas seções ou funcionalidades
- **PATCH:** Correções e ajustes

**Changelog:**
```
v1.0.0 (2026-01-13)
- Lançamento inicial da documentação completa
- Design System unificado
- Grid system otimizado (4/8/12 colunas)
- 6 seções principais documentadas
- Especificações de acessibilidade WCAG AA/AAA
```

### Contato e Manutenção

**Responsável:** Danilo Novais  
**Domínio:** portifoliodanilo.com  
**Última atualização:** Janeiro 2026  
**Próxima revisão:** Trimestral

---

**Documento oficial — Página Sobre**  
**Ghost Design — presença que guia sem aparecer**
