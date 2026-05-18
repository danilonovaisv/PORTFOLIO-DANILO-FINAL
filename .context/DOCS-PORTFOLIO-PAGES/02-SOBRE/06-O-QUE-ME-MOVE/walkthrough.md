# Walkthrough — 06-O-QUE-ME-MOVE Redesign v2

> **Data de implementação:** 2026-05-17
> **Branch:** worktree-o-que-me-move-redesign-plan
> **Substitui:** plano 2026-05-13 (GSAP + Ghost 3D)
> **Status:** IMPLEMENTADO

---

## O Que Foi Feito

Redesign completo da seção `06-O-QUE-ME-MOVE`. Removido Ghost 3D (R3F canvas) e GSAP. Substituído por background CSS shade fixo e 6 frases centralizadas controladas por Framer Motion scroll.

---

## Arquitetura Final

```
AboutBeliefs.tsx
  ├── WhatMovesMeBackground    (CSS shade, position:fixed, aria-hidden)
  └── BeliefScrollText         (sticky top-0 h-dvh, scroll-driven)
        └── WhatMovesMePhrase  (por frase: MotionValues, useReducedMotion)
```

### Fluxo de dados

```
sectionRef (AboutBeliefs)
  → BeliefScrollText.useScroll({ target: sectionRef })
  → scrollYProgress (0→1)
  → 6 × useTransform(scrollYProgress, bands, [0,1,1,0])
  → WhatMovesMePhrase(opacity, y, filter)
```

---

## Arquivos Criados

| Arquivo                                                   | Função                                                                                       |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/components/sobre/beliefs/what-moves-me.constants.ts` | WHAT_MOVES_ME_PHRASES, GHOST_SHADE_COLORS, GHOST_EASE, PHRASE_COUNT, SECTION_HEIGHT_VH, BAND |
| `src/components/sobre/beliefs/WhatMovesMeBackground.tsx`  | Background CSS fixo: 3 radial-gradients + grade + vinheta                                    |
| `src/components/sobre/beliefs/WhatMovesMePhrase.tsx`      | Frase individual com MotionValues + useReducedMotion                                         |

## Arquivos Modificados

| Arquivo                                             | Mudança                                                                                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/sobre/sections/AboutBeliefs.tsx`    | Reescrito: removidos GhostScene, GSAP, BeliefsScrollProvider, BeliefBackground, BeliefOverlay, BeliefFixedHeader, BeliefManifesto (-70 linhas) |
| `src/components/sobre/beliefs/BeliefScrollText.tsx` | Reescrito: GSAP/left-aligned/context → Framer Motion/centrado/sectionRef prop                                                                  |
| `src/config/beliefTokens.ts`                        | Adicionados re-exports das constantes novas                                                                                                    |

## Arquivos Preservados (não tocados)

`src/components/sobre/3d/*`, `BeliefBackground.tsx`, `BeliefFixedHeader.tsx`, `BeliefManifesto.tsx`, `BeliefOverlay.tsx`, `SplitTextMotion.tsx`, `BeliefsScrollContext.tsx`, `src/hooks/useBeliefsScroll.ts`

---

## Scroll Logic

`BAND = 1 / 6 ≈ 0.1667` — cada frase ocupa 1/6 do progresso total.

Para frase `i` (0-indexed):

| Ponto       | Fórmula                             | Valor (i=0) |
| ----------- | ----------------------------------- | ----------- |
| fadeInStart | `i * BAND`                          | 0.000       |
| fadeInEnd   | `i * BAND + BAND * 0.22`            | 0.037       |
| peakEnd     | `(i+1) * BAND - BAND * 0.22`        | 0.130       |
| fadeOutEnd  | `(i+1) * BAND` (ou 1.1 para última) | 0.167       |

Valores animados:

- `opacity`: `[0, 1, 1, 0]`
- `y`: `[18, 0, 0, -12]` px
- `filter`: `['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']`

A frase 6 (emphasis) tem `fadeOutEnd = 1.1` — não desaparece ao chegar ao fim da seção.

---

## Frases

```
1. Acredito que design\né uma linguagem.
2. Que sistemas\ncriam cultura.
3. Que cada escolha visual\ncarrega intenção.
4. Que beleza\né estratégia.
5. Que forma\nsegue propósito.
6. ISSO É\nGHOST\nDESIGN.  ← emphasis:true, GHOST em #0048ff
```

---

## Background CSS

Camadas (de frente para trás):

1. Vinheta: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #040013cc 100%)`
2. Grade: `repeating-linear-gradient(90deg) + repeating-linear-gradient(0deg)` em Ghost Blue opacidade mínima
3. Glow azul central: `radial-gradient(ellipse 80% 60% at 50% 50%, #0048ff22)`
4. Glow roxo inferior-esquerdo: `radial-gradient(ellipse 50% 40% at 20% 80%, #8705f218)`
5. Glow ciano superior-direito: `radial-gradient(ellipse 40% 30% at 80% 20%, #4fe6ff10)`
6. Base: `#040013`

Zero JavaScript. Zero `requestAnimationFrame`. Zero WebGL.

---

## Acessibilidade

- `<section aria-labelledby="o-que-me-move-title">` + `<h2 className="sr-only">`
- `WhatMovesMeBackground` tem `aria-hidden="true"`
- `WhatMovesMePhrase` tem `aria-label={phrase.text.replace(/\n/g, ' ')}` no `m.div`
- Spans internos do `<p>` têm `aria-hidden="true"` (evita duplicação no screen reader)
- Container `aria-live="polite"` em `BeliefScrollText`
- Contraste `#fcffff` / `#040013` ≥ 12:1 (AAA)

---

## Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion(); // motion/react

style={{
  opacity,                                        // preservado (aceitável)
  y: prefersReducedMotion ? 0 : y,               // sem translateY
  filter: prefersReducedMotion ? 'none' : filter, // sem blur
}}
```

---

## Como Testar Localmente

```bash
cd PORTFOLIO-DANILO-FINAL
pnpm dev
# Navegar para /sobre
# Scrollar até seção "O que me move"
# Verificar: 6 frases centralizadas, aparecem/somem em scroll
# Verificar: frase 6 GHOST em azul #0048ff, sem canvas WebGL
```

### Testar Reduced Motion

No macOS: Sistema > Acessibilidade > Monitor > Reduzir movimento
No DevTools: Rendering > Emulate prefers-reduced-motion: reduce

---

## Rollback

```bash
git log --oneline -10

git checkout <sha-antes-do-redesign> -- \
  src/components/sobre/sections/AboutBeliefs.tsx \
  src/components/sobre/beliefs/BeliefScrollText.tsx \
  src/config/beliefTokens.ts

git rm src/components/sobre/beliefs/what-moves-me.constants.ts
git rm src/components/sobre/beliefs/WhatMovesMeBackground.tsx
git rm src/components/sobre/beliefs/WhatMovesMePhrase.tsx
```

---

## Decisões Técnicas

| Decisão                    | Escolha                                     | Motivo                                                     |
| -------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| Background                 | CSS puro                                    | Spec pede "shade fixo" — sem animação contínua, zero WebGL |
| Animação                   | Framer Motion useScroll/useTransform        | Substitui GSAP ScrollTrigger; já no bundle                 |
| Frases                     | 1 useScroll no pai, MotionValues como props | Evita N listeners; `useTransform` é lazy                   |
| `useTransform` no `.map()` | Seguro                                      | Array de tamanho fixo 6 — hooks nunca variam               |
| Última frase               | `fadeOutEnd = 1.1`                          | Não desaparece no fim — climax visual permanente           |
| Ghost 3D                   | Arquivos preservados                        | Pode ser reutilizado em outras seções                      |

---

## Critérios de Aceite

```
[x] Sem Ghost 3D renderizando
[x] Background CSS shade fixo, cores do projeto
[x] 6 frases ordem correta
[x] Frases centralizadas desktop e mobile
[x] Frase 6: emphasis, GHOST em #0048ff, font maior
[x] Scroll forward: frases aparecem e somem
[x] Scroll reverso: frases reaparecem
[x] Reduced motion: sem y, sem filter
[x] Sem scale/rotate/bounce/translateX
[x] BeliefManifesto e BeliefFixedHeader NÃO montados
[x] Arquivos 3d/* intactos
[x] pnpm lint: PASS
[x] pnpm typecheck: PASS
[x] pnpm build: PASS
```
