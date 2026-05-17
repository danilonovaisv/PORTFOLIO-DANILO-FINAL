# 06-O-QUE-ME-MOVE — Redesign: Ghost 3D Out, CSS Shade + Centered Scroll Phrases

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover Ghost 3D da seção `06-O-QUE-ME-MOVE`, substituir por background CSS shade fixo com cores do projeto e centralizar as frases com entrada controlada por scroll via Framer Motion.

**Architecture:** Seção sticky de ~620vh com container interno `sticky top-0 h-dvh`. Background CSS fixo usando `radial-gradient` + `repeating-linear-gradient` simulando linhas de shader sem WebGL. Seis frases absolutas sobrepostas, controladas por `useScroll` + `useTransform` do Framer Motion — opacity, y e filter por faixa de progresso de scroll.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, `motion/react` (Framer Motion v11+), pnpm. R3F/GSAP preservados nos arquivos existentes mas removidos do render desta seção.

---

## 1. Resumo Executivo

A seção `06-O-QUE-ME-MOVE` passa por redesign editorial:

- **Out:** Ghost 3D (R3F + GSAP), `BeliefFixedHeader`, `BeliefManifesto`, `BeliefBackground` (dinâmico), `BeliefOverlay`
- **In:** `WhatMovesMeBackground` (CSS shade fixo), `BeliefScrollText` reescrito (centralizado, Framer Motion), novas frases `WHAT_MOVES_ME_PHRASES`
- **Preservado:** todos os arquivos `3d/`, `useBeliefsScroll`, `BeliefsScrollContext`, `SplitTextMotion`, `BeliefManifesto.tsx` (arquivo), `BeliefFixedHeader.tsx` (arquivo)

---

## 2. Diagnóstico da Versão Atual (2026-05-17)

| Componente | Arquivo | Situação atual |
|---|---|---|
| Orquestrador | `AboutBeliefs.tsx` | Ativo; monta Ghost 3D via `dynamic({ssr:false})` |
| Background | `BeliefBackground.tsx` | Ativo; troca cor por `activeIndex` via `ref.current.style` |
| Overlay | `BeliefOverlay.tsx` | Ativo; overlay preto leve |
| Header | `BeliefFixedHeader.tsx` | Ativo; GSAP + SplitTextMotion, posição direita |
| Frases | `BeliefScrollText.tsx` | Ativo; GSAP, LEFT-aligned, BELIEF_PHRASE_ITEMS |
| Manifesto | `BeliefManifesto.tsx` | Ativo; GSAP scrub, `BELIEF_MANIFESTO_LINES` |
| Ghost 3D | `GhostScene.tsx` | Ativo; R3F Canvas, SceneInvalidator, GSAP entrance |
| Ghost Model | `GhostModel.tsx` | Ativo; GLB do Supabase, cursor parallax, scroll |
| Context | `BeliefsScrollContext.tsx` | Ativo; Provider + useBeliefsScrollContext |
| Hook | `useBeliefsScroll.ts` | Ativo; ref-based getter, activeIndex, isClimax |
| Tokens | `beliefTokens.ts` | Ativo; BELIEF_PHRASE_ITEMS (6 frases), paleta |

**Copy atual das frases** (BELIEF_PHRASES):
1. Um vídeo que respira
2. Uma marca que se reconhece
3. Um detalhe que fica
4. Crio para gerar presença
5. Mesmo quando não estou ali
6. Mesmo quando ninguém percebe o esforço

---

## 3. Dependências da Seção Atual

- `gsap` + `gsap/ScrollTrigger` — em BeliefScrollText, BeliefManifesto, GhostScene, BeliefBackground
- `@react-three/fiber` — em GhostScene
- `three` — em GhostScene + GhostModel
- `@react-three/drei` — em GhostModel (useGLTF)
- `motion/react` — em BeliefManifesto, BeliefOverlay (parcial), SplitTextMotion
- `next/dynamic` — em AboutBeliefs para GhostScene

---

## 4. O Que Será Removido do Ghost 3D

Nenhum arquivo será **deletado**. Apenas removido do render de `AboutBeliefs.tsx`:

```diff
// src/components/sobre/sections/AboutBeliefs.tsx
- import dynamic from 'next/dynamic';
- import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
- import { GhostSceneFallback } from '../3d/GhostSceneFallback';
- const GhostScene = dynamic(() => import('../3d/GhostScene').then(m => m.GhostScene), { ssr: false });
- // e o bloco de render com GhostErrorBoundary/Suspense/GhostScene
```

Também removidos do render:
```diff
- import { BeliefBackground } from '../beliefs/BeliefBackground';
- import { BeliefOverlay } from '../beliefs/BeliefOverlay';
- import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
- import { BeliefManifesto } from '../beliefs/BeliefManifesto';
- import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
- import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
- // e todos os seus usos no JSX
```

---

## 5. Arquivos Afetados

| Arquivo | Ação |
|---|---|
| `src/components/sobre/beliefs/what-moves-me.constants.ts` | **CRIAR** |
| `src/components/sobre/beliefs/WhatMovesMeBackground.tsx` | **CRIAR** |
| `src/components/sobre/beliefs/WhatMovesMePhrase.tsx` | **CRIAR** |
| `src/components/sobre/sections/AboutBeliefs.tsx` | **MODIFICAR** (reescrever) |
| `src/components/sobre/beliefs/BeliefScrollText.tsx` | **MODIFICAR** (reescrever) |
| `src/config/beliefTokens.ts` | **MODIFICAR** (adicionar re-exports) |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md` | **CRIAR** após implementação |

Arquivos **intocados**:
- `src/components/sobre/3d/*` (todos)
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/SplitTextMotion.tsx`
- `src/components/sobre/beliefs/BeliefsScrollContext.tsx`
- `src/hooks/useBeliefsScroll.ts`

---

## 6. Arquitetura Proposta

```
AboutBeliefs.tsx
  ├── WhatMovesMeBackground.tsx   ← CSS shade fixo (position: fixed, aria-hidden)
  └── BeliefScrollText.tsx        ← sticky container com 6 frases absolutas
        └── WhatMovesMePhrase.tsx ← frase individual com MotionValue props
```

`AboutBeliefs.tsx` passa apenas um `sectionRef` para `BeliefScrollText`. Sem context, sem GSAP, sem Ghost.

`BeliefScrollText.tsx` usa `useScroll({ target: sectionRef, offset: ['start start', 'end end'] })` e produz um `PhraseRow` por frase, cada um com `useTransform` por faixa de progresso.

---

## 7. Decisão Técnica — Background Fixo

**Escolha: CSS puro (sem canvas, sem WebGL)**

Razões:
1. A spec diz "shade fixo" — sem animação contínua
2. CSS `radial-gradient` + `repeating-linear-gradient` reproduz o feel de "shader-lines" sem custo de GPU
3. Zero dependências novas
4. Zero `requestAnimationFrame` para elemento decorativo
5. `position: fixed` + `background-attachment: fixed` garantem o efeito "parallax" sem JS

Background layers:
```
Layer 1: glow azul central — radial-gradient ellipse at 50% 50%, #0048ff22
Layer 2: glow roxo inferior-esquerdo — radial-gradient ellipse at 20% 80%, #8705f218
Layer 3: glow ciano superior-direito — radial-gradient ellipse at 80% 20%, #4fe6ff10
Layer 4: base — #040013
Layer 5 (div filho): grade CSS — repeating-linear-gradient 80px
Layer 6 (div filho): vinheta — radial-gradient escurecimento periférico
```

CSS animation opcional: se aprovado, um `@keyframes ghost-breathe` de 8s pode fazer o glow central pulsar entre opacity 0.13 e 0.25, desativado via `prefers-reduced-motion: reduce`.

---

## 8. Estratégia — Cores do Projeto

```ts
export const GHOST_SHADE_COLORS = {
  voidBlack:     '#040013',  // base
  bluePrimary:   '#0048ff',  // glow dominante + cor de "GHOST"
  blueAccent:    '#4fe6ff',  // glow highlight
  purpleDetails: '#8705f2',  // glow secundário
  pinkDetails:   '#f501d3',  // reserva (sem uso no background para não competir com texto)
  text:          '#fcffff',  // texto principal
} as const;
```

Vermelho não é usado. `pinkDetails` não aparece no background (evitar competição com texto branco).

---

## 9. Estratégia — Texto Centralizado

```tsx
// BeliefScrollText.tsx
<div className="sticky top-0 flex h-dvh items-center justify-center">
  <div className="relative h-full w-full max-w-[min(90vw,56rem)]">
    {/* 6 phrases, position: absolute, inset-0, flex, items-center, justify-center */}
  </div>
</div>
```

Cada `WhatMovesMePhrase` é `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`. Isso garante que frases de múltiplas linhas fiquem sempre centradas vertical e horizontalmente.

---

## 10. Estratégia — Scroll-Driven Entry

Scroll progress `0 → 1` dividido em 6 bandas iguais (`BAND = 1/6 ≈ 0.1667`).

Para frase `i` (0-indexed):
```
fadeInStart  = i * BAND
fadeInEnd    = i * BAND + BAND * 0.22
peakStart    = i * BAND + BAND * 0.22
peakEnd      = (i+1) * BAND - BAND * 0.22
fadeOutStart = (i+1) * BAND - BAND * 0.22
fadeOutEnd   = (i+1) * BAND        ← ou 1.1 para a última frase (sem fade out)
```

Valores animados:
```ts
opacity: [0, 1, 1, 0]
y:       [18, 0, 0, -12]   (px)
filter:  ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
```

A última frase (`emphasis: true`) usa `fadeOutEnd = 1.1` — não desaparece ao final do scroll.

---

## 11. Estratégia — Reduced Motion

`useReducedMotion()` do `motion/react` detecta `prefers-reduced-motion: reduce`.

Quando ativo:
- `y` fixo em `0` (sem translateY) — `style={{ y: prefersReducedMotion ? 0 : y }}`
- `filter` removido — `style={{ filter: prefersReducedMotion ? 'none' : filter }}`
- `opacity` preservado (fade é aceitável em reduced motion)
- Background CSS não anima (sem `@keyframes`)

---

## 12. Estratégia — Acessibilidade

- `<section aria-labelledby="o-que-me-move-title">` com `<h2 className="sr-only">`
- `WhatMovesMeBackground` tem `aria-hidden="true"`
- `WhatMovesMePhrase` tem `aria-label={phrase.text.replace(/\n/g, ' ')}` no elemento raiz
- Spans filhos têm `aria-hidden="true"` (evitar duplicação para screen readers)
- Container das frases tem `aria-live="polite"` para anunciar mudanças
- Nenhum foco de teclado preso em sticky/fixed
- Contraste do texto `#fcffff` sobre `#040013` é ≥ 12:1 (AAA)

---

## 13. Estratégia — Performance

- Background: CSS puro, sem JS, sem `requestAnimationFrame`
- `useTransform` do Framer Motion é lazy — calcula apenas quando necessário
- Frases usam `will-change: transform` via Tailwind
- `position: absolute` nas frases evita layout thrashing
- Nenhum `filter` animado em reduced motion
- Sem R3F canvas, sem WebGL context na seção
- Build bundle: sem novos imports de bibliotecas

---

## 14. Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| `useScroll` com múltiplos `PhraseRow` criando muitos listeners | Média | Passar `scrollYProgress` do pai via prop em vez de chamar `useScroll` em cada filho |
| `filter: blur()` em scroll contínuo custoso em mobile | Baixa | Desativado em reduced motion; apenas 1 elemento visível de cada vez |
| Stacking context de `position: fixed` no background quebrar z-index | Baixa | Background não cria stacking context (`opacity: 1`, sem `transform`) |
| TypeScript falhar por tipo de `MotionValue<string>` para `filter` | Baixa | `filter` aceita `MotionValue<string>` no Framer Motion v11 |
| BeliefScrollText receber sectionRef como prop quebrando interface | Baixa | Prop explícita `sectionRef: React.RefObject<HTMLElement \| null>` |

---

## 15. Rollback

```bash
# Desfazer todas as alterações:
git log --oneline -10
# Identificar o commit anterior ao Task 1
git revert HEAD~N --no-commit  # ou
git reset --hard <sha-before-task1>
```

Arquivos que foram reescritos: `AboutBeliefs.tsx`, `BeliefScrollText.tsx`, `beliefTokens.ts`.
Arquivos criados: `what-moves-me.constants.ts`, `WhatMovesMeBackground.tsx`, `WhatMovesMePhrase.tsx`.

Para rollback parcial: restaurar apenas `AboutBeliefs.tsx` e `BeliefScrollText.tsx` retorna ao Ghost 3D + GSAP.

---

## 16. Critérios de Aceite

```
[ ] 06-O-QUE-ME-MOVE não renderiza Ghost 3D
[ ] Background é CSS shade fixo com cores do projeto
[ ] Background não usa CDN externo, window.THREE, requestAnimationFrame contínuo
[ ] Sem canvas/WebGL nesta seção
[ ] 6 frases na ordem: belief → connection → presence-details → presence → invisible-effort → ghost-design
[ ] Frases centralizadas (horizontal + vertical) em desktop e mobile
[ ] Frase 6 tem tipografia maior (clamp 3.5rem–10rem) + GHOST em #0048ff
[ ] Scroll forward: frases aparecem e somem
[ ] Scroll reverso: frases reaparecem corretamente
[ ] Reduced motion: sem translateY, sem blur
[ ] Sem scale, rotate, bounce, shake ou translateX no texto
[ ] Sem layout shift perceptível (CLS estável)
[ ] BeliefManifesto não montado em AboutBeliefs
[ ] BeliefFixedHeader não montado em AboutBeliefs
[ ] Arquivos 3d/ existem intactos
[ ] pnpm lint: PASS
[ ] pnpm typecheck: PASS
[ ] pnpm build: PASS
[ ] walkthrough.md criado
```

---

## 17. Validações

| Breakpoint | Resolução | Check |
|---|---|---|
| Mobile S | 375px | Frases centralizadas, scroll funciona |
| Mobile M | 430px | Idem |
| Tablet | 768px | Idem |
| Desktop S | 1024px | Font size clamp correto |
| Desktop M | 1440px | Todas as frases visíveis em scroll |
| Desktop Wide | 1680px | Sem overflow de texto |
| Funcional | scroll lento | Transição suave |
| Funcional | scroll rápido | Sem glitch |
| Funcional | scroll reverso | Estado correto |
| Funcional | reduced motion | Sem y/blur |
| Funcional | navegação direta para /sobre | Estado inicial correto |
| Funcional | reload no meio da seção | Estado correto |
| A11y | contraste texto/bg | ≥ 7:1 (AAA) |
| A11y | sem Ghost 3D nesta seção | Confirmado |
| A11y | sem carregamento do GLB | Confirmado |

---

## 18. Necessidade de Atualizar Docs

Após aprovação do usuário:
- [ ] `06-O-QUE-ME-MOVE-v4.md` → atualizar stack para "Framer Motion + CSS shade"
- [ ] `06-O-QUE-ME-MOVE-blueprint-atualizado.md` → registrar nova arquitetura
- [ ] `SOBRE-PROTOTIPO-INTERATIVO.md` → atualizar seção 06 (sem Ghost 3D)
- [ ] `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md` → criar
