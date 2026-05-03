---
name: design-system
description: >
  Ativada para criação de UI, componentes, layouts, tokens de design e
  padrões de animação baseados no Ghost Design System v3.1.
  Use quando o usuário pedir: componente, layout, página, animação, token,
  estilo, cor, tipografia ou qualquer artefato visual do portfolio.
triggers:
  - componente
  - layout
  - animação
  - token
  - design
  - cor
  - tipografia
  - página
  - ui
  - ghost system
version: '3.1'
author: Danilo Novais
---

# Ghost Design System v3.1

> **Filosofia:** "Presença sem ruído." A interface é invisível até ser ativada
> pela intenção do usuário. Cada elemento deve justificar sua existência.

---

## 1. Design Tokens

### 1.1 Paleta de Cores

| Token                    | Hex       | OKLCH                  | Uso                            |
| ------------------------ | --------- | ---------------------- | ------------------------------ |
| `--color-void`           | `#040013` | `oklch(3% 0.04 275)`   | Background principal           |
| `--color-ghost-blue`     | `#0048ff` | `oklch(45% 0.28 265)`  | Ações primárias, CTAs          |
| `--color-ghost-accent`   | `#4fe6ff` | `oklch(85% 0.12 210)`  | Highlights, brilhos espectrais |
| `--color-purple-detail`  | `#8705f2` | `oklch(42% 0.29 305)`  | Hover states, efeitos glitch   |
| `--color-text-primary`   | `#fcffff` | `oklch(99% 0.005 200)` | Corpo de texto, alto contraste |
| `--color-text-secondary` | `#a1a3a3` | `oklch(66% 0.005 200)` | Metadados, legendas            |
| `--color-surface`        | `#0d0d1a` | `oklch(8% 0.025 275)`  | Cards, painéis elevados        |
| `--color-border`         | `#1a1a2e` | `oklch(12% 0.03 275)`  | Bordas sutis                   |

**Regra:** Nunca use gradientes agressivos. Gradientes devem ser sutis
(`opacity` baixo) ou baseados em `radial-gradient` com Ghost Blue/Accent
como source de luz pontual.

### 1.2 Tipografia

```css
/* Display — Títulos editoriais */
--font-display: 'Space Grotesk', 'Cabinet Grotesk', sans-serif;
--font-display-weight: 700;
--font-display-transform: uppercase;
--font-display-tracking: 0.02em;

/* Body — Legibilidade */
--font-body: 'Inter', 'DM Sans', sans-serif;
--font-body-weight: 400;

/* Mono — Código e labels técnicos */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Escala tipográfica (rem):**

| Step | Token         | rem   | Uso                   |
| ---- | ------------- | ----- | --------------------- |
| 2xs  | `--text-2xs`  | 0.625 | Legal, timestamps     |
| xs   | `--text-xs`   | 0.75  | Captions, badges      |
| sm   | `--text-sm`   | 0.875 | Body small, metadados |
| base | `--text-base` | 1.0   | Body principal        |
| lg   | `--text-lg`   | 1.125 | Subtítulos            |
| xl   | `--text-xl`   | 1.25  | H4                    |
| 2xl  | `--text-2xl`  | 1.5   | H3                    |
| 3xl  | `--text-3xl`  | 1.875 | H2                    |
| 4xl  | `--text-4xl`  | 2.25  | H1                    |
| 5xl  | `--text-5xl`  | 3.0   | Display               |
| 6xl  | `--text-6xl`  | 3.75  | Hero                  |
| 7xl  | `--text-7xl`  | 4.5   | Editorial fullscreen  |

**Regras tipográficas:**

- Títulos: uppercase + `letter-spacing: 0.02em`
- Subtítulos: itálico para contraste editorial
- Nunca misturar mais de 2 famílias na mesma view

### 1.3 Espaçamento

Escala baseada em **4px**. Use classes Tailwind (`gap-4 = 16px`).

| Token      | px  | Uso                              |
| ---------- | --- | -------------------------------- |
| `space-1`  | 4   | Micro-espaço interno             |
| `space-2`  | 8   | Padding de badges, separadores   |
| `space-3`  | 12  | Gap de ícone + label             |
| `space-4`  | 16  | Padding padrão de componente     |
| `space-6`  | 24  | Padding de card                  |
| `space-8`  | 32  | Espaço entre seções pequenas     |
| `space-12` | 48  | Espaço entre blocos              |
| `space-16` | 64  | Seção vertical padding           |
| `space-24` | 96  | Seção hero                       |
| `space-32` | 128 | Separação de capítulos de página |

### 1.4 Border Radius

```css
--radius-sm: 4px; /* inputs, badges */
--radius-md: 8px; /* cards pequenos */
--radius-lg: 12px; /* cards principais */
--radius-xl: 16px; /* modais, drawers */
--radius-full: 9999px; /* pills, avatares, CTAs circulares */
```

---

## 2. Grid & Layout

### 2.1 `.std-grid` (obrigatório em todos os layouts)

```tsx
// Tailwind — uso padrão
<div className="std-grid">{/* 12 colunas desktop / 4 mobile */}</div>
```

```css
/* Definição base */
.std-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4); /* 16px */
  padding-inline: var(--space-6); /* 24px */
}

@media (max-width: 768px) {
  .std-grid {
    grid-template-columns: repeat(4, 1fr);
    padding-inline: var(--space-4);
  }
}
```

**Breakpoints:**

| Nome    | Min-width | Grid cols                |
| ------- | --------- | ------------------------ |
| mobile  | 0         | 4                        |
| tablet  | 768px     | 8                        |
| desktop | 1024px    | 12                       |
| wide    | 1440px    | 12 + `max-width: 1440px` |

### 2.2 Princípios de Layout

- Mobile-first sempre
- Sem WebGL pesado em mobile (`useMediaQuery` + fallback estático)
- Respeitar `prefers-reduced-motion` — ver seção Motion

---

## 3. Motion & Animação

### 3.1 Easing Padrão

```ts
// Ghost easing — identidade do sistema
export const GHOST_EASE = [0.22, 1, 0.36, 1] as const;

// Variantes por uso
export const easings = {
  enter: [0.22, 1, 0.36, 1], // elementos entrando — suave e overshooting leve
  exit: [0.55, 0, 1, 0.45], // elementos saindo — sharp
  inOut: [0.76, 0, 0.24, 1], // transições de estado
  spring: { type: 'spring', stiffness: 300, damping: 30 }, // físico
} as const;
```

### 3.2 Durações

| Token                | ms       | Uso                                 |
| -------------------- | -------- | ----------------------------------- |
| `duration-instant`   | 80       | Feedback imediato (ripple, pressed) |
| `duration-fast`      | 150      | Hover states, tooltips              |
| `duration-normal`    | 300      | Transições de componente            |
| `duration-slow`      | 500      | Entradas de página, modais          |
| `duration-cinematic` | 800–1200 | Hero animations, splash             |

### 3.3 Primitivos Framer Motion

```tsx
// Variante de entrada padrão para elementos de lista
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: GHOST_EASE },
  },
};

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Hover state para cards interativos
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0px #0048ff00' },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 32px #0048ff40',
    transition: { duration: 0.3, ease: GHOST_EASE },
  },
};
```

### 3.4 Regras de Motion

- **Silent Design:** proibido animações decorativas contínuas sem interação do usuário.
- Movimento = **respiração**, não performance.
- Loops contínuos apenas para elementos de fundo (shaders, partículas) com `opacity < 0.3`.
- Sempre implementar `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduce = useReducedMotion();
const transition = shouldReduce
  ? { duration: 0 }
  : { duration: 0.5, ease: GHOST_EASE };
```

---

## 4. Hierarquia Z-Index

| Camada         | z-index | Elementos                          |
| -------------- | ------- | ---------------------------------- |
| 0 — Background | `z-0`   | WebGL canvas, BG gradients         |
| 1 — Content    | `z-10`  | Conteúdo de página padrão          |
| 2 — Overlay    | `z-20`  | Hover overlays, tooltips           |
| 3 — Navigation | `z-30`  | Header, navbar                     |
| 4 — Manifesto  | `z-40`  | Modais, drawers, manifesto layer   |
| 5 — Critical   | `z-50`  | Toasts, alerts, cursor customizado |

---

## 5. Componentes Base

### 5.1 Primary CTA — Ghost Button

```tsx
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface GhostButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function GhostButton({ label, href, onClick }: GhostButtonProps) {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      variants={cardHover}
      onClick={onClick}
      className="group bg-[#0048ff] text-[#fcffff] h-12 px-8 rounded-full
                 flex items-center gap-2 font-body text-sm uppercase tracking-widest
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2
                 focus-visible:ring-offset-[#040013]"
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:rotate-45"
        aria-hidden="true"
      />
    </motion.button>
  );
}
```

### 5.2 Ghost Card

```tsx
export function GhostCard({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={cn(
        'bg-[#0d0d1a] border border-[#1a1a2e] rounded-lg p-6',
        'transition-colors duration-300 hover:border-[#0048ff40]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
```

### 5.3 Section Label (metadata tag)

```tsx
export function SectionLabel({ children }: React.PropsWithChildren) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a3a3]">
      {children}
    </span>
  );
}
```

---

## 6. Acessibilidade (A11y)

### Metas

- **WCAG:** AA obrigatório, AAA onde possível.
- Contraste mínimo texto/fundo: **4.5:1** (AA) — verificar com `oklch` antes de aplicar.
- Elementos interativos: mínimo **44×44px** de área de toque.

### Regras Obrigatórias

```tsx
// 1. aria-label em todos os elementos Canvas e ícones isolados
<Canvas aria-label="Cena 3D de fundo — efeito espectral animado" />
<ArrowUpRight aria-hidden="true" />  // ícones decorativos sempre hidden

// 2. focus-visible em todos os interativos (nunca remover outline sem substituto)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"

// 3. prefers-reduced-motion — obrigatório em todas as animações
const shouldReduce = useReducedMotion();

// 4. skip-link para navegação por teclado
<a href="#main-content" className="sr-only focus:not-sr-only">
  Ir para conteúdo principal
</a>

// 5. roles semânticos em layouts de canvas customizados
<div role="img" aria-label="Descrição da composição visual">
```

### Checklist por Componente

- [ ] Contraste de texto verificado
- [ ] `aria-label` ou `aria-labelledby` presente
- [ ] `focus-visible` ring visível e com contraste
- [ ] Funciona com teclado (Tab, Enter, Escape)
- [ ] `prefers-reduced-motion` implementado
- [ ] Área de toque ≥ 44px em mobile

---

## 7. Performance

### WebGL / R3F

```tsx
// ssr: false obrigatório para Canvas
const HeroScene = dynamic(() => import('@/components/canvas/HeroScene'), {
  ssr: false,
  loading: () => <HeroSceneSkeleton />, // sempre fornecer skeleton
});

// Limitar DPR em mobile
const dpr = useMediaQuery('(max-width: 768px)')
  ? 1
  : Math.min(2, window.devicePixelRatio);
<Canvas dpr={dpr} />;

// FPS target: > 50
// Usar useFrame delta para animações frame-independentes
useFrame((_, delta) => {
  mesh.current.rotation.y += delta * 0.5;
});
```

### Imagens e Mídia

```tsx
// Sempre Next/Image com sizes corretos
<Image src={src} alt={alt} sizes="(max-width: 768px) 100vw, 50vw" />

// Fallback de vídeo para imagem
<video
  onError={(e) => {
    (e.target as HTMLVideoElement).style.display = "none";
    fallbackRef.current?.style.setProperty("display", "block");
  }}
/>
```

---

## 8. Guia de Implementação Rápida

Ao receber uma tarefa de UI/componente:

1. **Identifique** qual token de cor, tipografia e espaçamento se aplica.
2. **Use `.std-grid`** para qualquer layout de página.
3. **Aplique `GHOST_EASE`** como easing padrão em todas as transições.
4. **Verifique contraste** antes de finalizar qualquer combinação cor/fundo.
5. **Adicione `aria-label`** em Canvas e ícones isolados.
6. **Implemente `useReducedMotion`** em toda animação Framer Motion.
7. **Sincronize `.context/GHOST-DESIGN-SYSTEM.md`** se alterar tokens.
