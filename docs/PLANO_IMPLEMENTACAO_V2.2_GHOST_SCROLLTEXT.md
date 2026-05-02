# PLANO DE IMPLEMENTAÇÃO V2.2 — Ghost ScrollText (TextAnimation)

> **Fonte de design:** `claude.ai/design/p/019de7c3-956e-711f-910c-dad07a9e1141` — Ghost Design System / Danilo Novais
> **Componente alvo:** `ui-layouts/scroll-text` (`TextAnimation`) → `src/components/ui/scroll-text.tsx`
> **Status do repo:** componente já presente (cópia fiel ao `ui-layouts.com/r/scroll-text.json`), **ainda não conformado ao Ghost System** e **não exportado** em `src/components/ui/index.ts`.

---

## 1. Resumo das mudanças detectadas

O design system publicado adicionou a entrada **"Ghost Interactive Components → Ghost ScrollText Demo"** com 5 seções demo:

| # | Seção | Propósito |
|---|---|---|
| 01 | Por palavra | `staggerChildren` por palavra (modo padrão) |
| 02 | `letterAnime` | Stagger por letra |
| 03 | `lineAnime` | Linha inteira como unidade (multi-linha com cores Ghost) |
| 04 | Direções | Grid 2×2 (`up` / `down` / `left` / `right`) |
| 05 | Props reference | Tabela de props |

**Origem técnica:** componente canônico `ui-layouts` (Animation & Motion). Importa `motion/react` + `cn`.

**Conflitos com regras Ghost** (precisam ser resolvidos no plano):

| Regra Ghost | Estado no componente bruto | Ação |
|---|---|---|
| Easing `cubic-bezier(0.22, 1, 0.36, 1)` | `ease: 'easeOut'` | **Substituir** por `[0.22, 1, 0.36, 1]` |
| `translateY ≤ 18px` em reveals | `translateY/X: ±100px` | **Reduzir** para `±18px` (eixo Y) e `±24px` (eixo X) |
| `Forbidden: translateX, scale, rotate` | `direction: left/right` usa `translateX` | **Restringir uso**: documentar que `left/right` é exceção pontual; default = `up` |
| Duração reveal `0.8s` | `duration: 0.4` | **Aumentar** para `0.8s` |
| Sem `uppercase` forçado | `className` tem `uppercase` hardcoded | **Remover** uppercase do default; expor via prop |
| Tokens Ghost (`text-text`, `bg-background`) | `dark:text-white text-black` | **Trocar** por `text-text` |
| `prefers-reduced-motion` | Não tratado | **Adicionar** `useReducedMotion` |

---

## 2. Mapeamento de novos tokens

Nenhum token de **cor** novo. Todos derivam de `globals.css` (`@theme`).

Novos **motion tokens** a registrar em `src/lib/motion/tokens.ts` (criar se ausente):

```ts
// src/lib/motion/tokens.ts
export const ghostEase = [0.22, 1, 0.36, 1] as const;

export const ghostDurations = {
  ui: 0.2,
  reveal: 0.8,
  atmosphere: 1.5,
} as const;

export const ghostStagger = {
  word: 0.1,
  letter: 0.04,
  line: 0.15,
} as const;

export const ghostBlur = {
  enter: 'blur(10px)',
  rest: 'blur(0px)',
} as const;

export const ghostTranslate = {
  yMax: 18,   // px — reveal vertical
  xMax: 24,   // px — exceção horizontal (uso pontual)
} as const;
```

Atualizar `tailwind.config.ts` (caso ainda não exista) com timing-function:

```ts
extend: {
  transitionTimingFunction: {
    ghost: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
}
```

---

## 3. Componentes a ajustar / criar

| Caminho | Ação | Notas |
|---|---|---|
| `src/components/ui/scroll-text.tsx` | **Refatorar** | Conformar regras Ghost, expor variants tipados, remover `@ts-nocheck`, suportar `useReducedMotion` |
| `src/components/ui/index.ts` | **Adicionar export** | `export { default as GhostScrollText } from './scroll-text'` |
| `src/lib/motion/tokens.ts` | **Criar** | Tokens centralizados (ease/duration/stagger) |
| `src/components/sobre/sections/beliefs/BeliefScrollText.tsx` | **Auditar** | Verificar se substitui implementação custom pelo novo `GhostScrollText` |
| `docs/.context/GHOST-DESIGN-SYSTEM.md` | **Atualizar** | Adicionar seção "Ghost ScrollText" com props + exemplos |
| `docs/.context/active_state.md` | **Sync** | Registrar entrega |
| `.claude/skills/design-system/` | **Adicionar config** | Incluir `scroll-text` no índice de componentes do plugin Ghost Design System |

---

## 4. Guia técnico passo-a-passo

### 4.1. Criar `src/lib/motion/tokens.ts`
Conteúdo da seção 2.

### 4.2. Refatorar `src/components/ui/scroll-text.tsx`

```tsx
'use client';

import { cn } from '@/lib/utils';
import {
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import type { JSX, ReactNode } from 'react';
import {
  ghostEase,
  ghostDurations,
  ghostStagger,
  ghostBlur,
  ghostTranslate,
} from '@/lib/motion/tokens';

type Direction = 'up' | 'down' | 'left' | 'right';
type Mode = 'word' | 'letter' | 'line';

interface GhostScrollTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  direction?: Direction;
  mode?: Mode;
  duration?: number;
  stagger?: number;
  viewport?: { amount?: number; margin?: string; once?: boolean };
  uppercase?: boolean;
  ariaLabel?: string;
}

const buildVariants = (
  direction: Direction,
  duration: number,
  reduced: boolean
): Variants => {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const max = axis === 'y' ? ghostTranslate.yMax : ghostTranslate.xMax;
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const offset = sign * max;

  return {
    hidden: {
      opacity: 0,
      filter: ghostBlur.enter,
      [axis]: offset,
    },
    visible: {
      opacity: 1,
      filter: ghostBlur.rest,
      [axis]: 0,
      transition: { duration, ease: ghostEase },
    },
  };
};

const GhostScrollText = ({
  text,
  as = 'span',
  className,
  direction = 'up',
  mode = 'word',
  duration = ghostDurations.reveal,
  stagger,
  viewport = { amount: 0.3, once: true },
  uppercase = false,
  ariaLabel,
}: GhostScrollTextProps) => {
  const reduced = useReducedMotion() ?? false;
  const itemVariants = buildVariants(direction, duration, reduced);
  const effectiveStagger =
    stagger ??
    (mode === 'letter'
      ? ghostStagger.letter
      : mode === 'line'
        ? ghostStagger.line
        : ghostStagger.word);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : effectiveStagger },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as React.ComponentType<
    HTMLMotionProps<'span'>
  >;

  const renderLine = (): ReactNode => (
    <motion.span className="inline-block" variants={itemVariants}>
      {text}
    </motion.span>
  );

  const renderWords = (): ReactNode =>
    text.split(' ').map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        className="inline-block"
        variants={mode === 'letter' ? undefined : itemVariants}
      >
        {mode === 'letter' ? (
          <>
            {word.split('').map((letter, li) => (
              <motion.span
                key={li}
                className="inline-block"
                variants={itemVariants}
              >
                {letter}
              </motion.span>
            ))}
            &nbsp;
          </>
        ) : (
          <>{word}&nbsp;</>
        )}
      </motion.span>
    ));

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={viewport}
      aria-label={ariaLabel ?? text}
      className={cn(
        'inline-block text-text',
        uppercase && 'uppercase tracking-tight',
        className
      )}
    >
      <span aria-hidden="true">
        {mode === 'line' ? renderLine() : renderWords()}
      </span>
    </MotionTag>
  );
};

export default GhostScrollText;
export type { GhostScrollTextProps, Direction, Mode };
```

**Mudanças vs. original:**
- Remove `@ts-nocheck`; tipa via `Variants`.
- Substitui `easeOut` por `ghostEase`.
- Limita translate a `ghostTranslate.{yMax|xMax}` (18 / 24 px).
- Default `direction='up'` (Ghost-friendly), `duration=0.8`, sem `uppercase` forçado.
- `useReducedMotion` colapsa para fade simples.
- Acessibilidade: container com `aria-label` (texto inteiro); spans visuais com `aria-hidden`.

### 4.3. Atualizar `src/components/ui/index.ts`

```ts
export { default as GhostScrollText } from './scroll-text';
export type {
  GhostScrollTextProps,
  Direction as GhostScrollTextDirection,
  Mode as GhostScrollTextMode,
} from './scroll-text';
```

### 4.4. Auditar `BeliefScrollText.tsx`
- Verificar se a animação manual pode ser substituída por `<GhostScrollText mode="line" direction="up" />`.
- Caso a lógica scroll-driven (GSAP ScrollTrigger + Lenis) seja específica, manter custom mas reutilizar tokens de `@/lib/motion/tokens`.

### 4.5. Documentação
- `docs/.context/GHOST-DESIGN-SYSTEM.md` → adicionar bloco "Ghost ScrollText" com tabela de props, exemplos `word|letter|line`, e nota de exceção sobre `direction=left|right`.
- `docs/.context/active_state.md` → registrar `[2026-05-02] Ghost ScrollText conformado ao DS v2.2`.

### 4.6. Plugin "Ghost Design System" — adicionar config
Editar `.claude/skills/design-system/SKILL.md` (ou `index.json` do plugin) para listar:

```yaml
components:
  - key: ghost-scroll-text
    path: src/components/ui/scroll-text.tsx
    source: ui-layouts/scroll-text (conformado v2.2)
    tokens:
      ease: ghostEase
      duration: reveal
      blur: 10→0
      translate: yMax 18 / xMax 24
    a11y: useReducedMotion + aria-label
    demo: docs/.context/GHOST-DESIGN-SYSTEM.md#ghost-scroll-text
```

### 4.7. Verificação
```bash
pnpm run typecheck && pnpm run lint && pnpm run build
```

---

## 5. Checklist de QA — Design + Acessibilidade

### 5.1. Design fidelity
- [ ] Easing visual coerente com demais reveals do site (Ghost ease).
- [ ] Translate ≤ 18px (Y) / 24px (X) — sem "voo" do texto.
- [ ] Blur 10px → 0 visível em monitor 1080p.
- [ ] Stagger word=100ms, letter=40ms, line=150ms.
- [ ] Cor do texto = `--color-text` (sem branco puro).
- [ ] Sem `uppercase` por default; quando aplicado, usar `tracking-tight` (`-0.04em`).
- [ ] Compatível com fundo `--background` (#040013).

### 5.2. Acessibilidade (WCAG AA)
- [ ] `useReducedMotion` colapsa animação para fade `0.01s` quando user pediu redução.
- [ ] Container expõe `aria-label` com texto completo; spans `aria-hidden="true"`.
- [ ] Foco visível em qualquer wrapper interativo que envolva o componente (CTA, link).
- [ ] Contraste do texto sobre `--background` ≥ 7:1 (`#fcffff` em `#040013` = 19.4:1 ✓).
- [ ] Sem dependência de cor para significado (apenas tipografia).
- [ ] Testado com leitor de tela (texto único, não fragmentado).

### 5.3. Performance
- [ ] FPS ≥ 50 em mobile (Pixel 6 / iPhone 12) com `mode='letter'` em frase ≤ 8 palavras.
- [ ] `viewport.once = true` evita re-trigger em scroll bidirecional.
- [ ] Bundle: sem nova dependência (reusa `motion` já no lock).
- [ ] Lighthouse: `Performance ≥ 90`, `Accessibility = 100`, `Best Practices ≥ 95`.

### 5.4. Integração
- [ ] Export disponível em `@/components/ui`.
- [ ] Tipos exportados (`GhostScrollTextProps`).
- [ ] `BeliefScrollText` revisado / migrado se aplicável.
- [ ] Plugin `Ghost Design System` lista o componente.
- [ ] `.context/GHOST-DESIGN-SYSTEM.md` atualizado.
- [ ] `pnpm run build-check` passou.
- [ ] Commit atômico: `feat(ui): conform GhostScrollText to Ghost System v2.2`.

---

## 6. Riscos & decisões

| Risco | Mitigação |
|---|---|
| `motion/react` vs `framer-motion` divergir API | Pin em `^12.38.0` já no lock; ambos do mesmo monorepo. |
| Letter mode quebrar palavras compostas em screen readers | `aria-hidden` nos spans + `aria-label` no container. |
| Conflito com Lenis (smooth scroll) | `viewport.amount: 0.3` é pixel-perf; OK com Lenis. Se travar, usar `useScroll({ container })`. |
| Direção `left/right` violar regra Ghost | Documentar como **exceção editorial** — uso pontual em quote/ticker, nunca em hero/manifesto. |

---

**Pronto para execução.** Aprovação necessária antes de aplicar refactor ao `scroll-text.tsx` (>100 linhas, alteração em componente UI público).
