# 🫥 Ghost Design System — Tokens + Regras Globais

Versão: **extraído/reorganizado** • Data: **2026-02-03**

> Este arquivo centraliza **tokens**, **princípios de motion**, **grid/spacing**, **componentes base** e **regras absolutas**.
> A especificação da página /portfolio fica em `PORTFOLIO-PROTOTIPO-INTERATIVO.md`.

---

## 1) Design System (conceitual)

# **2. DESIGN SYSTEM**

### 2.1 Color Palette

| Token           | Value     | Uso                                                       |
| --------------- | --------- | --------------------------------------------------------- |
| bluePrimary     | `#0048ff` | Cor primária da marca, CTAs, links, elementos interativos |
| blueAccent      | `#4fe6ff` | Destaques secundários, brilhos “ghost”/atmosfera          |
| purpleDetails   | `#8705f2` | Pequenos detalhes e highlights                            |
| pinkDetails     | `#f501d3` | Pequenos detalhes, ênfases pontuais                       |
| background      | `#040013` | Fundo escuro principal                                    |
| backgroundLight | `#f0f0f0` | Seções claras (forms, blocos alternados)                  |
| text            | `#fcffff` | Texto principal em fundo escuro                           |
| textInverse     | `#0e0e0e` | Texto em fundos claros                                    |
| textEmphasis    | `#2E85F2` | Palavras destacadas no meio do texto                      |
| textHighlight   | `#4fe6ff` | Destaques curtos, intros breves                           |
| textSecondary   | `#a1a3a3` | Infos secundárias, metadata                               |
| neutral         | `#0b0d3a` | Gradientes, fundos sutis                                  |
| neutralLight    | `#F5F5F5` | Fundos de seções secundárias                              |

> Obs: `textEmphasis` estava com `##2E85F2` e `textHilght` com typo — normalizei para `textHighlight`.

---

### 2.2 Typography

**Fonte primária:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

Tokens de texto **responsivos** (usando `clamp`) para manter coerência em todos os breakpoints:

| Token   | Mobile (~<640px) | Desktop (~≥1024px) | Peso    | Uso                                                           |
| ------- | ---------------- | ------------------ | ------- | ------------------------------------------------------------- |
| display | 2.5rem (40px)    | 4.5rem (72px)      | Black   | Frases grandes no meio da página, não-semânticas (Big Phrase) |
| h1      | 2rem (32px)      | 3.5rem (56px)      | Bold    | Hero headlines, títulos principais                            |
| h2      | 1.5rem (24px)    | 2.5rem (40px)      | Bold    | Títulos de seção                                              |
| h3      | 1.25rem (20px)   | 1.75rem (28px)     | Medium  | Títulos de cards, subtítulos                                  |
| body    | 1rem (16px)      | 1.125rem (18px)    | Regular | Texto corrido                                                 |
| small   | 0.875rem (14px)  | 0.875rem (14px)    | Reg/Med | Labels, legendas                                              |
| micro   | 0.75rem (12px)   | 0.75rem (12px)     | Mono    | Tags, infos de sistema                                        |

#### Tokens em CSS com `clamp()`

['css
:root {
--font-display: clamp(2.5rem, 5vw, 4.5rem);
--font-h1: clamp(2rem, 4vw, 3.5rem);
--font-h2: clamp(1.5rem, 3vw, 2.5rem);
--font-h3: clamp(1.25rem, 2vw, 1.75rem);
--font-body: clamp(1rem, 1.2vw, 1.125rem);
--font-small: 0.875rem;
--font-micro: 0.75rem;
}

body {
font-family: "TT Norms Pro", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", sans-serif;
}

.display-text {
font-size: var(--font-display);
font-weight: 900;
line-height: 1.1;
}

.h1 {
font-size: var(--font-h1);
font-weight: 700;
line-height: 1.1;
}

.h2 {
font-size: var(--font-h2);
font-weight: 600;
line-height: 1.15;
}

.h3 {
font-size: var(--font-h3);
font-weight: 500;
line-height: 1.2;
}

.body {
font-size: var(--font-body);
font-weight: 400;
line-height: 1.5;
}

.small {
font-size: var(--font-small);
}

.micro {
font-size: var(--font-micro);
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
monospace;
}

Versão conceitual em Tailwind

// tailwind.config.js
module.exports = {
theme: {
extend: {
fontFamily: {
sans: ['"TT Norms Pro"', "ui-sans-serif", "system-ui"],
},
fontSize: {
display: [
"clamp(2.5rem, 5vw, 4.5rem)",
{ lineHeight: "1.1", fontWeight: "700" },
],
h1: [
"clamp(2rem, 4vw, 3.5rem)",
{ lineHeight: "1.1", fontWeight: "700" },
],
h2: [
"clamp(1.5rem, 3vw, 2.5rem)",
{ lineHeight: "1.15", fontWeight: "700" },
],
h3: [
"clamp(1.25rem, 2vw, 1.75rem)",
{ lineHeight: "1.2", fontWeight: "500" },
],
body: [
"clamp(1rem, 1.2vw, 1.125rem)",
{ lineHeight: "1.5", fontWeight: "400" },
],
small: ["0.875rem", { lineHeight: "1.4" }],
micro: ["0.75rem", { lineHeight: "1.4" }],
},
},
},
};']

### 2.3 Spacing, Grid & Layout (OPTIMIZED)

O sistema de Grid foi otimizado para **12 colunas** no desktop e **4 colunas** no mobile, garantindo alinhamento matemático perfeito.

#### 📐 The Ghost Grid System

| Breakpoint            | Columns | Gutter (Gap)    | Margin (X-Padding) | Container Max |
| --------------------- | ------- | --------------- | ------------------ | ------------- |
| **Mobile** (<768px)   | **4**   | `16px` (gap-4)  | `24px` (px-6)      | 100%          |
| **Tablet** (768px+)   | **8**   | `24px` (gap-6)  | `48px` (px-12)     | 100%          |
| **Desktop** (1024px+) | **12**  | `32px` (gap-8)  | `64px` (px-16)     | 1440px        |
| **Wide** (1600px+)    | **12**  | `40px` (gap-10) | `96px` (px-24)     | 1680px        |

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
  <div className="col-span-4 md:col-span-4 lg:col-span-4">Card Content</div>
</section>
```

**3. Z-Index Layering (Ghost Philosophy):**
Para garantir que o 3D não bloqueie a interatividade.

- `z-0`: **Canvas WebGL** (Background interativo).
- `z-10`: **Glass Layers** (Paineis com backdrop-blur).
- `z-20`: **Content** (Textos, Imagens).
- `z-50`: **Navigation/Header** (Sticky).
- `z-100`: **Modals/Overlays**.

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

- `ease: [0.22, 1, 0.36, 1]`

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

---

## 2) Design System técnico (implementação)

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
<GhostHeading level="h1">Sou Danilo Novais.</GhostHeading>
```

- Alinhamento fluido.
- Peso médio.
- Tracking negativo leve.

#### 3.3 `<GhostSection />`

_Wrapper padrão de seção._

```tsx
<GhostSection height="100vh">{children}</GhostSection>
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
<GhostMedia type="video" src="/portfolio/AI.mp4" />
```

**Regras**

- Opacity máx 0.85.
- Blur permanente sutil.
- Nunca texto diretamente sobre a mídia; se houver, usar overlay sólido.

#### 3.6 `<GhostCTA />`

```tsx
<GhostCTA href="/contato">Fale comigo</GhostCTA>
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

_Objetivo: o usuário não percebe o grid, apenas o ritmo._

#### 4.2 Section Heights

| Tipo       | Altura alvo |
| ---------- | ----------- |
| Hero       | 100vh       |
| Conteúdo   | 120–140vh   |
| Fechamento | 80–100vh    |

_Valores são referências, não travas rígidas. A prioridade é fluxo narrativo._

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

---

## Observações Finais

### Fonte Única da Verdade

Este documento consolida **TODO** o conteúdo da página /portfolio. Nenhuma decisão fora deste documento é válida sem atualização prévia deste arquivo.

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

### Performance Targets

| Métrica                        | Target  | Ferramenta         |
| ------------------------------ | ------- | ------------------ |
| Lighthouse Performance         | ≥ 90    | Lighthouse         |
| First Contentful Paint (FCP)   | < 1.8s  | PageSpeed Insights |
| Largest Contentful Paint (LCP) | < 2.5s  | PageSpeed Insights |
| Cumulative Layout Shift (CLS)  | < 0.1   | PageSpeed Insights |
| Time to Interactive (TTI)      | < 3.8s  | PageSpeed Insights |
| Total Blocking Time (TBT)      | < 200ms | Lighthouse         |

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
    <div className="grid grid-cols-8 gap-6">{/* Conteúdo em 8 colunas */}</div>
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
      <div className="col-span-4">{/* Full width */}</div>
    </div>
  </div>
</section>
```

### Breakpoints Padrão

| Breakpoint | Range         | Colunas | Padding      | Gap           | Comportamento                |
| ---------- | ------------- | ------- | ------------ | ------------- | ---------------------------- |
| `mobile`   | < 768px       | 4       | 24px (px-6)  | 16px (gap-4)  | 1 coluna, texto centralizado |
| `tablet`   | 768px–1023px  | 8       | 48px (px-12) | 24px (gap-6)  | Transição 1-2 colunas        |
| `desktop`  | 1024px–1599px | 12      | 64px (px-16) | 32px (gap-8)  | Grid completo                |
| `wide`     | ≥ 1600px      | 12      | 96px (px-24) | 40px (gap-10) | Max respiro                  |

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

| Combinação                | Ratio  | Status |
| ------------------------- | ------ | ------ |
| `#fcffff` sobre `#040013` | 21:1   | ✅ AAA |
| `#0048ff` sobre `#040013` | 8.2:1  | ✅ AAA |
| `#4fe6ff` sobre `#040013` | 14.5:1 | ✅ AAA |
| `#a1a3a3` sobre `#040013` | 7.1:1  | ✅ AAA |

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
<video aria-hidden="true" role="presentation" muted autoPlay loop playsInline>
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
        duration: shouldReduceMotion ? 0.2 : 0.6,
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
  {loading ? 'Carregando conteúdo...' : 'Conteúdo carregado'}
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

## 🚫 PROIBIÇÕES ABSOLUTAS

### Na Página Grid

- ❌ Animações agressivas
- ❌ Autoplay de áudio
- ❌ Carrosséis automáticos não controláveis
- ❌ Parallax exagerado (>150% de movimento)
- ❌ Scroll hijacking

### No Hero

- ❌ Vídeo com som (mesmo muted=false)
- ❌ Autoplay sem controles
- ❌ Vídeo muito pesado (>10MB)
- ❌ Ausência de fallback para imagem

### No Modal/Página Interna

- ❌ Animação por scroll interno
- ❌ Parallax dentro do modal
- ❌ Blur decorativo excessivo
- ❌ Spring / bounce
- ❌ Entrada simultânea de tudo
- ❌ Linguagem de landing page
- ❌ CTAs promocionais
- ❌ Popups dentro de popups

---
