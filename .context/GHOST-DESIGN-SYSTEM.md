# 🫥 Ghost Design System — Tokens + Regras Globais

Versão: **extraído/reorganizado** • Data: **2026-02-03**

> Este arquivo centraliza **tokens**, **princípios de motion**, **grid/spacing**, **componentes base** e **regras absolutas**.
> A especificação da página /portfolio fica em `PORTFOLIO-PROTOTIPO-INTERATIVO.md`.

---

## 1. Design System (conceitual)

## 2. Design System

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

#### 2.2.1 Tokens em CSS com `clamp()`

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

#### 2.2.2 Versão conceitual em Tailwind

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

#### 2.3.1 📐 The Ghost Grid System

| Breakpoint            | Columns | Gutter (Gap)    | Margin (X-Padding) | Container Max |
| --------------------- | ------- | --------------- | ------------------ | ------------- |
| **Mobile** (<768px)   | **4**   | `16px` (gap-4)  | `24px` (px-6)      | 100%          |
| **Tablet** (768px+)   | **8**   | `24px` (gap-6)  | `48px` (px-12)     | 100%          |
| **Desktop** (1024px+) | **12**  | `32px` (gap-8)  | `64px` (px-16)     | 1440px        |
| **Wide** (1600px+)    | **12**  | `40px` (gap-10) | `96px` (px-24)     | 1680px        |

#### 2.3.2 🧱 Tailwind Composition

##### 2.3.2.1 Container Base

```tsx
// Wrapper global para centralizar o conteúdo
<div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
  {children}
</div>

