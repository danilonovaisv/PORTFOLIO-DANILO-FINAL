
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

# **1. Header

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




# **2. Hero / Manifesto

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
- Alinhado à direita encontado no grid da pagina
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

**Subtítulo (H3):**
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

# **3. Origem Criativa**

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

# **4. O Que Eu Faço

**Função:** Transformar serviços em sequência visual progressiva com animação horizontal guiada pelo scroll.

**Referência:** https://codepen.io/luis-lessrain/pen/dPPOGaZ

#### Identidade Visual

| Elemento | Cor |
|---------|------|
| Fundo | `#040013` |
| Cards | `#0048ff` |
| Texto | `#ffffff` |
| Numeração | `#8705f2` |

### 1. Título

- Posicionado no topo da seção, centralizado.
- Duas linhas:

  - text:
  Do insight ao impacto.
  Mesmo quando você não percebe.

    •    Tipografia
    •    font-display para titulo e font-h2 para subtitulo
    •    font-size: 44–48px
    •    line-height: 1.2
    •    Cores
    •    Linha 1:
    •    “Do” / “ao impacto.” → branco (#FFFFFF)
    •    “insight” / “impacto” → azul primário (primary)
    •    Linha 2 → branco (#FFFFFF)
    •    Espaçamentos
    •    Margem superior: 64–80px em relação ao início da seção.
    •    Margem inferior: 48–64px até o início dos cards.
    •    max-width do bloco de título: 800px, centralizado.

⸻


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



# **5. Como Eu Trabalho - About Method

**Função:** Gerar confiança racional através do método. Mostrar que criatividade é suportada por processo.

#### Desktop

**Layout:**
- Altura: ~120vh
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.desktop_video.mp4`
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

**Título font-h1:**
- Alinhado à esquerda
- Duas linhas:
  - "**Criatividade** com **método**."
  - "**Impacto** sem **ruído**."
- Destaques: "criatividade", "método" em `bluePrimary`
- Font-size: 44–52px (clamp)
- Line-height: 1.15
- Font-weight: 700
- Margin-bottom: 32–40px

**Texto Introdutório font-h3 branca:**
- Três frases em parágrafos separados
"Antes da estética, existe intenção."
"Antes do layout, existe lógica."
"Antes do impacto, existe silêncio."
- Font-size: 18–20px
- Line-height: 1.6
- Opacity: 0.9
- Max-width: 520px
- Margin-bottom: 48–56px

**Lista de Processo:**
- 6 itens em cards verticais


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
- Vídeo: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.desktop_video.mp4`
  - `object-position: right center`
  - Gradiente vertical no fim
  - Sem overlay pesado
- 1 coluna, padding px-6
- Conteúdo iniciando no meio do vídeo para baixo
`

**Título font-h1:**
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



# **6. O Que Me Move — “About Beliefed”**

## **1. Objetivo da Página/Sessão**

    •    Qual a principal função desta página/sessão?
Gerar vínculo emocional através de um manifesto pessoal, mostrando a visão de design do Danilo de forma íntima, sensível e memorável, conectando o visitante com o “porquê” por trás do trabalho.
    •    Qual ação o usuário deve realizar aqui?
Sentir identificação com o manifesto, reforçar confiança no estilo/abordagem do estúdio e seguir naturalmente o fluxo da página até as seções de prova social (clientes) e contato, mais propenso a entrar em contato ou continuar explorando.
    •    Como essa seção contribui para os objetivos do site?
Consolida a identidade do “Ghost Design” como conceito autoral, diferencia o estúdio pelo posicionamento emocional e prepara o usuário para enxergar o resto do site (cases, serviços, contato) sob essa lente de conexão, não apenas estética.

⸻

## **2. Estrutura de Conteúdo
    
    •    Título principal (headline) — BeliefFixedHeader (sticky)
- Texto:
> “Acredito no design que muda o dia de alguém.
> Não pelo choque, mas pela conexão.”
- Sempre visível (sticky), funciona como “âncora” conceitual da sessão.

**Comportamento responsivo do `BeliefFixedHeader`:**
- **Desktop:** permanece sticky e **alinhado no centro (visual) com ancoragem à direita** do grid — aparência “centro + direita”, com `text-right` e respiro no lado esquerdo.
- **Mobile:** permanece sticky e **muda de posição para o topo e a direita da sessão** (top-right), respeitando padding do container. Mantém `text-right` e não disputa espaço com o bloco principal.


    •    Subtítulo ou descrição
- Não há subtítulo textual explícito; o “subtexto” é construído pela sequência de frases rotativas e pelo manifesto final “ISSO É GHOST DESIGN.”
    •    Elementos visuais (imagens, ícones, vídeos)
- Fantasma 3D (Ghost), renderizado com React Three Fiber + Drei.
- Asset 3D (GLB) oficial da sessão (obrigatório):
- O modelo .glb utilizado deve ser carregado do Supabase Storage público:
- https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb

- O Ghost nunca para completamente:  
  - Flutuação leve e constante, com leves movimentos para os lados e para cima/baixo.  
  - Ganha velocidade e inclinação suave conforme o cursor se move (desktop) e conforme o usuário rola a página (desktop/mobile).  
  - Responde de forma fluida e etérea, como se “sentisse” o toque/scroll.  
  - Entra junto com a **primeira frase** da área de manifesto e permanece presente durante a sessão.  
  - Quando a **última frase** entra, ele cresce ~10% de escala, ajusta sua posição alinhando-se no centro, horizontal e vertical, da seção. e fica visivelmente mais animado (mais wobble/tilt e resposta mais intensa ao scroll).
  - animação de saida seguindo scroll da sessão junto com o texto o manifesto “ISSO É / GHOST / DESIGN.” ;  

**Regra de alinhamento (obrigatória) — Desktop e Mobile:**
- O Ghost 3D deve ficar **sempre alinhado verticalmente ao centro do bloco de texto à sua esquerda**.
- Existe um “container de conteúdo” onde **texto (à esquerda)** e **Ghost (à direita)** coexistem; o Ghost acompanha o **centro do texto** (não o centro da viewport).
- Se o texto quebrar linhas ou mudar de altura, o Ghost mantém-se **centralizado no eixo Y** em relação ao bloco textual.

- No final, o manifesto “ISSO É / GHOST / DESIGN.” sela o conceito com entrada suave usando **Morphing Text**:
  - Texto em **três linhas fixas**:
    > ISSO É  
    > GHOST  
    > DESIGN.
  - Cada linha com comportamento responsivo automático, ocupando a área horizontal disponível do grid, com **espaçamento pequeno** entre as linhas.


    •    Chamada para ação (CTA)
- CTA implícito (emocional): reforçar a percepção de valor do estúdio.
- Não há botão direto aqui; o CTA funcional acontece em seções posteriores (Clientes/Contato), mas essa sessão prepara o usuário emocionalmente para clicar lá.
    •    Texto de apoio — font-h1 — blueAccent
- Frases rotativas (manifesto em camadas):
1. “Um vídeo que respira.”
2. “Uma marca que se reconhece.”
3. “Um detalhe que fica.”
4. “Crio para gerar presença.”
5. “Mesmo quando não estou ali.”
6. “Mesmo quando ninguém percebe o esforço.”

- Manifesto final:  
  > ISSO É  
  > GHOST  
  > DESIGN.


    •    Layout desejado (colunas, cards, seções com fundo alternado, etc.)
- Desktop:
- Altura total da sessão: ~140vh.
- Fundo base: #040013 (mapeado como bg-background).
- Container em 12 colunas (max-width ~1440–1680px, centrado, com px-6 md:px-12 lg:px-16 xl:px-24).
- Estrutura em 3 momentos:
1. Título Fixo (BeliefFixedHeader) sticky com aparência “centro + direita”: bloco visualmente centralizado no topo da sessão, mas alinhado à direita do grid (ex.: justify-self-end / text-right), com position: sticky e top-24.
2. Área de Frases Rotativas + Ghost em composição controlada: texto e Ghost convivem com respiro, mantendo o Ghost alinhado verticalmente ao centro do texto (texto à esquerda, ghost à direita).
3. Reveal Final — Ghost + Manifesto
- Grid grid-cols-12 com gap generoso (ex: gap-12).
- Ghost em destaque, mantendo relação com o texto (ghost pode “invadir” levemente uma palavra para efeito visual).
- Manifesto “ISSO É / GHOST / DESIGN.” grande, ocupando colunas equivalentes a 90% do grid.

- **Mobile (ATUALIZADO):**
  - Fluxo geral em 1 coluna, padding `px-6`, altura flexível (>120vh).  
  - **`BeliefFixedHeader` sticky no topo-direita** da sessão, com `text-right`.  
  - **Bloco principal em composição “texto + ghost” lado a lado (row)** dentro de um container próprio:
    - **Texto à direita**
    - **Ghost 3D à esquerda** alinhado no canto superior esquerdo, 20% abaixo do topo da sessão. 
    - Ghost **sempre alinhado verticalmente ao centro do bloco de texto à esquerda**.
  - **Texto animado rotativo** fica **sempre no rodapé da sessão**, centralizado na página, com quebra de linha somente quando necessário.
  - Ordem (percepção do usuário): header sticky (top-right) → bloco principal (texto + ghost) → manifesto final.



⸻

## **3. Identidade Visual
    
    •    Cores usadas
- Fundo base: #040013 (bg-background).
- Acentos principais:
- bluePrimary (azul real) — usado para realçar palavras-chave e o trecho “GHOST”.
- Transições de fundo durante o manifesto podem seguir uma paleta inspirada no sistema de crenças, por exemplo:
ts COLORS = [ 'bg-bluePrimary', 'bg-purpleDetails', 'bg-pinkDetails', 'bg-bluePrimary', 'bg-purpleDetails', ]; 
- Usar fades suaves sincronizados com a troca de frases.
    •    Tipografia (fontes e pesos)
- Headline e manifesto: display, font-weight: 900.
- Tamanhos com clamp.
- Frases rotativas: font-weight: 500, 32–38px desktop; 22–26px mobile.
    •    Ícones ou gráficos customizados
- Ghost 3D (GLB “Ghost w/ Tophat” transformado para o universo Ghost Design).
- Rotação/olhar transmite “atenção” ao usuário.

⸻

## **4. Interatividade & Animações
    
    •    Animações de entrada/scroll (Framer Motion ou GSAP)
- BeliefFixedHeader: fade-in + blur suave (ex.: opacity 0→1, blur 10→0 em ~1.2s).

- **Frases rotativas — Desktop (mantém):**
  - Entra de baixo (`y: 20 → 0`) + `opacity` + blur.  
  - Sai para cima (`y: 0 → -20`) + blur.  
  - Ciclo ~4.2s por frase.

- **Frases rotativas — Mobile:**
  - O texto animado fica **sempre 20% acima do rodapé da sessão**, **centralizado na página**.
  - **Entrada:** entra pela esquerda  
    - `x: +24 → 0`, `opacity: 0 → 1`, `blur: 10px → 0`
  - **Permanência:** estável, centralizado no rodapé.  
  - **Saída:** sai pela direita  
    - `x: 0 → -24`, `opacity: 1 → 0`, `blur: 0 → 10px`
  - No mobile, **não usar `y`** (sem subir/descer), apenas deslocamento horizontal.
  - **Quebra de linha só quando necessário** (evitar linhas forçadas; centralizado).

- Reveal final (Ghost + manifesto):
  - Container `opacity 0→1`, `y 40→0` (via `whileInView` ou scroll).


    •    Hover effects / microinterações
- Ghost wobble/tilt suave no hover (desktop).
- Textos-chave em bluePrimary: micro glow/sublinhado discreto.
    •    Comportamentos especiais com mouse/touch
- Desktop: follow cursor com LERP (posição + rotação).
- Mobile: resposta orientada a scroll/touch (sem hover).
    •    Animações vinculadas ao scroll (scroll sync)
- Rotação lenta em Y com scrollYProgress.
- Após ~0.8 de progresso: escala 1.0→1.1, wobble extra, aproxima no Z.
- BG pode interpolar cores da paleta.

⸻

## **5. Responsividade
    
    •    Mobile
- BeliefFixedHeader: sticky top-right, text-right.
- Bloco principal: texto à direita + ghost à a esquerda, ghost sempre centrado verticalmente ao texto.
- Ghost 200–240px.
- Texto rotativo: rodapé, centralizado; entra da esquerda para direita, fica parado no rodapé da pagina até a mudança do BG e sai da esquerda para direita para o a outra frase entrar junto com a mudança do BG; quebra só quando necessário.
- Interações mais por scroll do que por hover.
    •    Tablet
- Transição gradual; ghost 220–260px; tipografia intermediária.
    •    Desktop
- Header sticky “centro + direita”.
- Relação texto+ghost preservada (ghost centrado verticalmente ao texto).
- Reveal final em 2 colunas; ghost 320–380px.
    •    Ajustes extremos
- 1440px+: mais respiro vertical e limite superior do manifesto.
- <360px: reduzir margens e fontes para evitar quebras excessivas.

⸻

## **6. Acessibilidade & SEO
    
    •    <section aria-labelledby="...">
    •    h2 para o título, frases como p, manifesto como h3 (ou h2 interno se fizer sentido).
    •    Cena 3D com aria-label: “Ilustração 3D de um fantasma estilizado representando o conceito Ghost Design.”
    •    Garantir contraste AA/AAA.
    •    Canvas 3D não deve prender foco.

⸻

## **7. Integrações ou Recursos Especiais
    
    •    Componentes dinâmicos
- Rotação de frases via estado/timer.
- Cena 3D isolada em <GhostModel />.
    •    Dados de API
- Não obrigatório.
    •    Formulários
- Nenhum.
    •    Outros (ATUALIZADO)
- Supabase Storage para servir o GLB.
- URL pública do GLB usado nesta sessão:
- https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb
- Drei (<Float />, <Environment />) para suavizar a cena.

⸻

## **8. Considerações Técnicas
    
    •    Client component ('use client') por R3F + Framer Motion.
    •    Reutilização: shared/3d/GhostModel.tsx + hooks de rotação/scroll sync.
    •    Estrutura sugerida:
    •    app/(site)/about/_sections/AboutBeliefs.tsx
    •    app/(site)/about/_sections/components/BeliefTitle.tsx
    •    app/(site)/about/_sections/components/BeliefPhrases.tsx
    •    app/(site)/about/_sections/components/BeliefFinalManifest.tsx
    •    shared/3d/GhostModel.tsx
    •    Fallback (ATUALIZADO)
- Loading placeholder enquanto o GLB carrega da URL pública.
- Sem WebGL: versão estática (SVG/PNG).
    •    Animações via hook
- useRotatingPhrases, useBeliefsScrollSync, captura de mousemove com LERP.

⸻

## **SUGESTÃO DE ANIMÇÃO 3D — Plugar a URL direto no GhostModel.tsx (R3F/Drei)

A ideia é deixar o GhostModel 100% declarativo: você só passa className/scale/position, e o componente já carrega o GLB do Supabase.

✅ Exemplo de implementação (com preload + tipagem + path único)

'use client';

import * as React from 'react';
import { useGLTF } from '@react-three/drei';
import type { GroupProps } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';

const GHOST_GLB_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

type GhostGLTF = GLTF & {
  nodes: Record<string, unknown>;
  materials: Record<string, unknown>;
};

export type GhostModelProps = GroupProps & {
  /** Optional: override the default Supabase URL (useful for local/dev A/B). */
  src?: string;
};

export function GhostModel({ src = GHOST_GLB_URL, ...props }: GhostModelProps) {
  const gltf = useGLTF(src) as GhostGLTF;

  // Observação: "scene" já vem pronto; ideal quando o GLB já está organizado.
  return <primitive object={gltf.scene} {...props} />;
}

// Preload para evitar “pop-in” quando a seção entrar
useGLTF.preload(GHOST_GLB_URL);

Como usar (exemplo)

<GhostModel
  position={[0, 0, 0]}
  scale={1}
  rotation={[0, 0, 0]}
/>

✅ Sugestão de fallback (quando o GLB ainda não carregou)

No componente que renderiza o Canvas, você coloca um Suspense:

import { Suspense } from 'react';
import { GhostModel } from '@/shared/3d/GhostModel';

<Suspense fallback={<mesh /* placeholder simples */ />}>
  <GhostModel />
</Suspense>

Observação importante (para consistência com seu layout)

Como você quer o Ghost sempre alinhado ao centro do bloco de texto, recomendo que o container “texto + ghost” seja o responsável por controlar altura/centro, e o Canvas/Group do ghost apenas “obedeça” (sem posicionar no centro da viewport).


---





# **SEÇÃO 07 — FECHAMENTO / CONFIRMAÇÃO**

**Função:** Convite claro e humano.  
Conectar narrativa com ação, sem agressividade.

---

## Layout — Desktop

### Estrutura Geral
- **Altura alvo:** 80–100vh
- **Fundo:** `backgroundDark` (#040013)
- **Container:** 12 colunas, max-width ≈ 1120px
- **Padding vertical:** 80–100px
- **Padding lateral:** 32–40px

### Composição

#### Área de Conteúdo (Centralizada)
- Colunas 3–11
- Display: flex, flex-direction: column, align-items: center
- Text-align: center

#### Título Principal
- Primeira linha com destaque em `primary`
- Margin-bottom: 32–40px

**Texto titulo font-display:**
> Hoje sou **Diretor de Criação**,  
> com mais de **10 anos de estrada**.

**Estilo:**
- Font-size: 40–48px
- Line-height: 1.25
- Font-weight: 700
- "Diretor de Criação" e "12 anos de estrada" em `blueprimary`
- Max-width: 800px

#### Parágrafos de Contexto
- Dois blocos de texto
- Spacing entre blocos: 24–32px
- Margin-bottom total: 48–56px

**Bloco 1 - font-h2:**
> Já liderei marcas, agências, eventos  
> e **criei experiências** para todos os canais.

**Bloco 2 - font-h2:**
> Agora, quero criar algo que permaneça —  
> **com você**.

**Estilo:**
- Font-size: 20–24px
- Line-height: 1.5
- Font-weight: 400
- Opacity: 0.92
- "criei experiências" e "com você" em `primary`
- Max-width: 700px

OBSERVAÇÃO: TODAS AS PALAVRAS QUE ESTÃO ENTRE `** **`, SÃO TEXTOS EM DESTAQUE E PRECISAM ESTAR NA COR ÀZULPRIMARY`

#### CTAs (Call-to-Actions)
- Layout: flex row, gap 20–24px
- Alinhamento: center
- Margin-top: 56–64px

**Botão 1: "fale comigo"**
- Primary button style
- Background: `primary` (#5B5FFF)
- Color: white
- Padding: 16–20px 36–44px
- Border-radius: 50px (pill shape)
- Font-size: 16–18px
- Font-weight: 600
- Ícone: seta diagonal (arrow-up-right) à direita do texto

**Botão 2: "baixar curriculum"**
- Secondary/Ghost button style
- Background: transparent
- Border: 2px solid `primary`
- Color: `primary`
- Padding: 16–20px 36–44px
- Border-radius: 50px
- Font-size: 16–18px
- Font-weight: 600
- Ícone: seta diagonal (arrow-up-right) à direita do texto

---

## Layout — Mobile

### Estrutura
- **1 coluna**, largura 100%
- **Padding lateral:** 20–24px
- **Padding vertical:** 60–80px
- **Altura:** Flexível

### Conteúdo

#### Título Principal
- Centralizado
- Font-size: 28–34px
- Line-height: 1.3
- Margin-bottom: 24–28px
- Quebras de linha ajustadas:
  - "Hoje sou **Diretor de Criação**,"
  - "com mais de **10 anos de estrada**."

#### Parágrafos
- Font-size: 17–19px
- Line-height: 1.6
- Spacing entre blocos: 20–24px
- Margin-bottom: 40–48px
- Max-width: 100%

#### CTAs
- **Layout:** flex column (empilhados verticalmente)
- **Gap:** 16px
- **Largura:** 100% cada botão (max-width: 320px opcional)
- **Order:**
  1. "fale comigo" (primary)
  2. "baixar curriculum" (secondary)

**Estilo dos botões (mobile):**
- Padding: 14–16px 28–32px
- Font-size: 15–16px
- Mantém pill shape

---

## Responsividade Detalhada

### Small (`sm`: 640px–767px)
- Título: 28–30px
- Texto: 16–17px
- CTAs empilhados, largura 100%
- Gap entre CTAs: 14px

### Medium (`md`: 768px–1023px)
- Título: 32–36px
- Texto: 18–20px
- CTAs ainda empilhados ou começam a ficar lado a lado
- Max-width dos botões: 280px cada

### Large (`lg`: 1024px–1279px)
- **CTAs lado a lado** (flex row)
- Título: 38–42px
- Texto: 20–22px
- Gap entre CTAs: 20px

### Extra Large (`xl`: 1280px+)
- Título: 44–48px
- Texto: 22–24px
- Gap entre CTAs: 24px
- Máximo respiro e espaçamento

---

## Comportamento dos Botões

### Estados

**Default:**
- Primary: background `primary`, color white
- Secondary: border `primary`, color `primary`, background transparent

**Hover (Desktop):**
- **Primary:**
  - Background: lighten `primary` em 8–10%
  - Transform: `translateY(-2px)`
  - Box-shadow: `0 8px 20px rgba(91, 95, 255, 0.3)`
- **Secondary:**
  - Background: `rgba(91, 95, 255, 0.1)`
  - Border-color: lighten `primary` em 10%
  - Transform: `translateY(-2px)`
- **Transition:** 0.3s ease
- **Cursor:** pointer

**Active:**
- Transform: `translateY(0)`
- Transition mais rápida: 0.15s

**Focus (Acessibilidade):**
- Outline: 3px solid `primary` com offset 3px
- Sem remoção do outline padrão

**Disabled (se aplicável):**
- Opacity: 0.5
- Cursor: not-allowed
- Sem hover effects

### Ícones
- **Biblioteca:** Lucide React ou similar
- **Nome:** `ArrowUpRight`
- **Size:** 18–20px
- **Position:** à direita do texto com margin-left: 8–10px
- **Animação no hover:** 
  - Ícone: `translate(2px, -2px)` (movimento diagonal)
  - Duration: 0.3s

---

## Interação & Motion

### Animação de Entrada (Scroll)

**Título:**
- Trigger: 20% da seção no viewport
- `opacity: 0 → 1`
- `translateY: 30px → 0`
- `filter: blur(8px) → blur(0)`
- Duration: 0.8s
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Parágrafos:**
- Delay: 0.2s após título
- Mesma animação do título
- Duration: 0.7s

**CTAs:**
- Delay: 0.3s após parágrafos
- `opacity: 0 → 1`
- `translateY: 20px → 0`
- Stagger: 0.1s entre botões
- Duration: 0.6s
- Easing: ease-out

### Sensação de "Respirar"
- **Sem loops ou animações contínuas**
- Uma vez que entra, permanece estático
- Apenas hover effects nos botões
- Movimento só retorna ao scroll

### prefers-reduced-motion
- Todas as animações reduzidas para fade-in simples
- Duration: 0.3s
- Sem translateY ou blur
- Sem stagger

---

## Hierarquia Visual & Fluxo

### Sequência de Leitura
1. **Título** → estabelece credibilidade ("Diretor de Criação, 10 anos")
2. **Experiência** → valida através de histórico
3. **Proposta** → convite pessoal ("com você")
4. **Ação** → CTAs claros e acessíveis

### Linha Horizontal (Opcional)
- Entre título e parágrafos
- Ou acima/abaixo da seção
- Width: 100% do container ou 60%
- Height: 1px
- Color: `rgba(255, 255, 255, 0.1)`
- Margin: 40–48px vertical

---

## Conteúdo dos CTAs

### Botão 1: "fale comigo"
- **Ação:** Scroll suave até seção de contato (formulário)
- **Comportamento:** 
  - `document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' })`
  - Ou abre modal de contato
  - Ou link mailto (menos recomendado)

### Botão 2: "baixar curriculum"
- **Ação:** Download direto do CV em PDF
- **Comportamento:**
  - `<a href="/path/curriculum.pdf" download="GhostDesign_Curriculum.pdf">`
  - Ou abre em nova aba: `target="_blank" rel="noopener noreferrer"`
- **Analytics:** Track download event

---

## Seções Subsequentes

Após esta seção, na ordem:

1. **Marcas / Clientes** (fundo escuro mantido ou transição gradual)
2. **Contato** (formulário em fundo claro — contraste forte)
3. **Footer** (retorna ao fundo escuro)

### Transição para Seção de Marcas
- Padding-top generoso: 80–120px
- Pode ter linha divisória sutil
- Mantém fundo escuro ou inicia transição gradual

---

## Notas de Implementação

### Acessibilidade
- Heading hierarchy: `<h2>` para título principal
- Botões com `aria-label` descritivos se necessário
- Focus visible em todos os elementos interativos
- Contraste mínimo AA/AAA

### Performance
- Lazy load de assets se fora do viewport inicial
- Intersection Observer para animações
- `will-change` apenas durante animações

### Analytics
- Track impressions da seção
- Track clicks em cada CTA
- Track downloads do curriculum
- Eventos: `section_view`, `cta_click`, `cv_download`

### SEO
- Conteúdo semântico bem estruturado
- Texto alternativo em ícones (se relevante)
- Schema.org markup para pessoa/profissional (opcional)

---

## Variações Opcionais

### Versão com Linha do Tempo
- Adicionar mini timeline visual de carreira
- Apenas se não interferir na simplicidade

### Versão com Depoimento
- Quote curto de cliente/parceiro
- Posicionado entre parágrafos e CTAs
- Estilo ghost/sutil

### Versão com Social Proof
- Logos pequenos de 3-5 marcas principais
- Acima ou abaixo dos CTAs
- Escala de cinza, opacity 0.6

**Recomendação:** manter versão minimal e direta conforme especificado inicialmente.



------


🎬 **MOTION TOKENS (RESUMO)**  
- Duração padrão: `0.9s`  
- Duração longa: `1.4–1.6s`  
- Delay padrão: `0.2–0.4s`  
- Easing principal: `cubic-bezier(0.22, 1, 0.36, 1)` (`ghostIn`)  
- Escala: **proibida**  
- Bounce: **proibido**  
- Rotate: **proibido**  
- Opacity nunca é brusca.  
- Imagens nunca chegam a 100% — usar máx `0.85–0.9`.

---

📱 **BREAKPOINTS (COMPORTAMENTO NA /SOBRE)**  

| Breakpoint | Min width | Regra principal                                             |
|------------|-----------|-------------------------------------------------------------|
| sm         | 640px     | Fonte maior, 1 coluna em todas as seções                   |
| md         | 768px     | Ainda 1 coluna; ajustes de respiro e hierarquia            |
| lg         | 1024px    | Layout completo com colunas duplas onde previsto           |
| xl         | 1280px    | Mais respiro lateral e grids de 3 colunas (listas)         |

*Mapeamento técnico: ver tokens breakpoints na Parte 2.*

---

🚫 **REGRAS ABSOLUTAS — PÁGINA /SOBRE**  
❌ Texto diretamente sobre imagem/vídeo sem overlay escuro 80%+  
❌ Blur excessivo que prejudique leitura  
❌ Scale / bounce / rotate em conteúdo  

✅ **Exceções controladas:**  
- Hero (texto sobre vídeo com overlay sólido).  
- Seção 04 (texto em card escuro sobre vídeo).  
- Alternância fluida desktop texto ↔ mídia  
- Mobile-first (texto sempre antes da imagem)  
- Ritmo frase ↔ imagem, sem colagens visuais.

---

🧩 **EXPERIÊNCIA FINAL (NARRATIVA)**  
O usuário não percebe a técnica.  
Não vê o esforço.  
Não sente ruído.  

Mas sente presença.  
Sente fluidez.  
Sente confiança.  

Isso é o protótipo interativo da página SOBRE.

---

---

## **PARTE 2 — DESIGN SYSTEM TÉCNICO (IMPLEMENTAÇÃO)**

🧠 **GHOST DESIGN SYSTEM — TÉCNICO**  
_Tokens + Componentes_  
portifoliodanilo.com  

### 1. VISÃO GERAL  
Ghost Design é um sistema silencioso de interface.  
Ele prioriza:  
- Presença sem ruído  
- Movimento como respiração  
- Design como guia invisível  

Este documento é a fonte técnica oficial para design, frontend e motion.

### 2. DESIGN TOKENS  
#### 2.1 Color Tokens  
```ts
export const colors = {
  primary: '#0048ff',
  accent: '#4fe6ff',
  ghostPurple: '#8705f2',
  background: '#000022',
  backgroundDark: '#040013',
  backgroundLight: '#f0f0f0',
  textPrimary: '#fcffff',
  textSecondary: '#a1a3a3',
  textInverse: '#0e0e0e',
  neutral: '#0b0d3a',
  neutralLight: '#F5F5F5',
};
```

#### 2.2 Typography Tokens  
```ts
export const typography = {
  fontFamily: {
    primary: '"Inter", system-ui, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '28px',
    xxl: '40px',
    display: '56px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};
```

#### 2.3 Spacing Tokens  
```ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  xxl: '64px',
  section: '120px',
};
```

#### 2.4 Motion Tokens (CRÍTICO)  
```ts
export const motion = {
  duration: {
    fast: '0.6s',
    base: '0.9s',
    slow: '1.4s',
  },
  delay: {
    none: '0s',
    short: '0.2s',
    base: '0.4s',
    long: '1s',
  },
  easing: {
    ghost: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
};
```

**🚫 Proibido:**  
- scale  
- bounce  
- rotate  

**Permitido:**  
- opacity  
- blur  
- translateY (máx 18px)  

### 3. COMPONENTES BASE  
#### 3.1 `<GhostText />`  
_Uso: Manifestos, frases-chave_  
```tsx
<GhostText as="p" delay={0.4}>
  Você não vê tudo o que eu faço.
</GhostText>
```  
**Comportamento**  
- Fade + blur.  
- Entrada por tempo ou viewport.  
- Nunca reanima depois de visível.  

#### 3.2 `<GhostHeading />`  
```tsx
<GhostHeading level="h1">
  Sou Danilo Novais.
</GhostHeading>
```  
- Alinhamento fluido.  
- Peso médio.  
- Tracking negativo leve.  

#### 3.3 `<GhostSection />`  
_Wrapper padrão de seção._  
```tsx
<GhostSection height="100vh">
  {children}
</GhostSection>
```  
**Regras**  
- Uma seção = uma intenção.  
- Nunca empilhar múltiplas animações diferentes na mesma área.  

#### 3.4 `<GhostList />`  
```tsx
<GhostList
  items={[
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
  ]}
/>
```  
- Entrada item a item.  
- Stagger fixo: 0.18s.  
- Hover só altera opacity/cor do texto.  

#### 3.5 `<GhostMedia />`  
```tsx
<GhostMedia type="video" src="/sobre/AI.mp4" />
```  
**Regras**  
- Opacity máx 0.85.  
- Blur permanente sutil.  
- Nunca texto diretamente sobre a mídia; se houver, usar overlay sólido.  

#### 3.6 `<GhostCTA />`  
```tsx
<GhostCTA href="/contato">
  Fale comigo
</GhostCTA>
```  
- Sem glow exagerado.  
- Hover silencioso (opacity/cor).  
- Sempre com tom humano, nunca agressivo.  

### 4. LAYOUT SYSTEM  
#### 4.1 Grid Invisível  
**Desktop (lg+)**  
- 12 colunas virtuais.  
- Texto tipicamente em colunas 2–7.  
- Mídia em colunas 8–12.  

**Mobile (sm / md)**  
- 1 coluna.  
- Texto sempre antes da imagem/vídeo.  

*Objetivo: o usuário não percebe o grid, apenas o ritmo.*

#### 4.2 Section Heights  

| Tipo        | Altura alvo |
|-------------|-------------|
| Hero        | 100vh       |
| Conteúdo    | 120–140vh   |
| Fechamento  | 80–100vh    |

*Valores são referências, não travas rígidas. A prioridade é fluxo narrativo.*

#### 4.3 Layout Responsivo por Seção  
- **Seção 01**  
  - Mobile: 1 coluna, texto centralizado.  
  - Desktop: texto à direita sobre vídeo com overlay.  
- **Seção 02 (Origem)**  
  - Mobile: blocos texto → mídia empilhados.  
  - Desktop: alternância texto ↔ mídia em 2 colunas.  
- **Seção 03 (O que eu faço)**  
  - Mobile: lista em 1 coluna.  
  - Desktop: grid de 2–3 colunas de cards.  
- **Seção 04 (Como eu trabalho)**  
  - Mobile: texto em faixa escura sobre vídeo recortado (lado direito).  
  - Desktop: texto à esquerda, vídeo/ghost em evidência à direita.  
- **Seção 05 (O que me move)**  
  - Mobile: texto centralizado + ghost abaixo.  
  - Desktop: texto à esquerda, ghost à direita.  
- **Seção 06 (Fechamento)**  
  - Mobile: CTAs empilhados.  
  - Desktop: CTAs lado a lado, com texto central.  

### 5. BREAKPOINTS (TÉCNICO)  
```ts
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

### 6. ACESSIBILIDADE & PERFORMANCE  
- Respeitar `prefers-reduced-motion` em todas as animações.  
- Nenhuma animação rodando fora do viewport.  
- **Vídeos:**  
  - `loading="lazy"` (quando possível).  
  - `muted`, `autoplay`, `loop`.  
- Sem re-render em scroll contínuo:  
  - Usar observers (`IntersectionObserver`) em vez de listeners de scroll diretos.  
- Contraste sempre AA+:  
  - Especialmente em hero e seção 04 (texto sobre vídeo com overlay).  

### 7. REGRAS ABSOLUTAS DO SISTEMA  
❌ Texto direto sobre imagem/vídeo sem overlay  
❌ Animações chamativas (glow, bounce, scale)  
❌ Motion decorativo desconectado da narrativa  

✅ Ritmo  
✅ Silêncio  
✅ Presença  

### 8. MANIFESTO TÉCNICO  
O melhor design:  
- não explica  
- não chama atenção  
- não se impõe  

Ele permanece.  

Isso é Ghost Design System.

🧩 **REGRA FINAL**  
Se algo:  
- não está aqui  
- não respeita este documento  
- ou altera o ritmo Ghost  

➡ É BUG.  

Ghost Design não é estilo.  
É comportamento.



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

----

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


## **Ghost Interativo**
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

# Textos Alternativos

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
