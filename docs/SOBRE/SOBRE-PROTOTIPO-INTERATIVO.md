
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

- **Favicon:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- **Favicon Light:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- **Logo Light:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- **Logo Dark:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

#### Fontes

```css
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2') format('woff2');
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

- **Manifesto Video:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

#### Client Logos

- 12 monochromatic SVG logos: `client1.svg` through `client12.svg`
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`

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
- Vídeo: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4`
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
- Vídeo: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4`
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
- Imagens: 280–360px

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
- **Imagem:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp`
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
- **Imagem:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp`
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
- **Imagem:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp`
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
- **Imagem:** `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp`
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

**Regra:** Palavra-chave inicial em `blue
