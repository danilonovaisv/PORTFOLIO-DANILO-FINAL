# 📄 ABOUT BELIEFS — MASTER BLUEPRINT + PROMPTS (FINAL)

# Implementation Plan — 06-O-QUE-ME-MOVE Redesign

> **Data:** 2026-05-17
> **Substitui:** plano de 2026-05-13 (GSAP + Ghost 3D)
> **Status:** AGUARDANDO APROVAÇÃO HUMANA — não alterar código

---

## 1. Resumo Executivo

Redesign da seção `06-O-QUE-ME-MOVE` da página `/sobre`. Remove Ghost 3D e GSAP da seção. Substitui por background CSS shade fixo com cores do projeto e frases centralizadas com entrada controlada por Framer Motion (`useScroll` + `useTransform`).

**Resultado esperado:** seção editorial minimalista, scroll-driven, sem canvas WebGL, com 6 frases Ghost centralizadas que aparecem/somem conforme o usuário rola a página.

---

## 2. Diagnóstico da Versão Atual

| Componente              | Status                                                      |
| ----------------------- | ----------------------------------------------------------- |
| `GhostScene.tsx` (R3F)  | Ativo em `AboutBeliefs` via `dynamic({ssr:false})`          |
| `BeliefScrollText.tsx`  | Frases LEFT-aligned, GSAP, BELIEF_PHRASE_ITEMS              |
| `BeliefBackground.tsx`  | Troca cor por `activeIndex`, direto via `ref.current.style` |
| `BeliefFixedHeader.tsx` | GSAP + SplitTextMotion, posição direita                     |
| `BeliefManifesto.tsx`   | GSAP scrub, `BELIEF_MANIFESTO_LINES` separado               |
| Stack de animação       | GSAP + ScrollTrigger + R3F (Three.js)                       |

**Problemas a resolver:**

- Ghost 3D é custo WebGL para elemento decorativo que a spec pede remover
- Frases left-aligned vs. pedido de centralização
- Copy atual ≠ `WHAT_MOVES_ME_PHRASES` especificado
- `BeliefManifesto` separado vs. frase 6 integrada com `emphasis: true`

---

## 3. Dependências Atuais da Seção

```
gsap + gsap/ScrollTrigger     → BeliefScrollText, BeliefManifesto, GhostScene
@react-three/fiber            → GhostScene, GhostModel
three                         → GhostScene, GhostModel
@react-three/drei             → GhostModel (useGLTF)
motion/react                  → BeliefManifesto (parcial), SplitTextMotion
next/dynamic                  → AboutBeliefs (GhostScene)
```

Após redesign: somente `motion/react` (já instalado).

---

## 4. O Que Será Removido do Ghost 3D

Nenhum arquivo deletado. Apenas removido do render de `AboutBeliefs.tsx`:

- `import dynamic from 'next/dynamic'`
- `import { GhostErrorBoundary }` + render
- `import { GhostSceneFallback }` + render
- `const GhostScene = dynamic(...)` + render com Suspense
- `import { BeliefBackground }` + render
- `import { BeliefOverlay }` + render
- `import { BeliefFixedHeader }` + render
- `import { BeliefManifesto }` + render
- `import { BeliefsScrollProvider }` + wrapper
- `import { useBeliefsScroll }` + hook call

Arquivos `3d/` preservados íntegros para outras seções.

---

## 5. Arquivos Afetados

| Arquivo                                                   | Ação                      |
| --------------------------------------------------------- | ------------------------- |
| `src/components/sobre/beliefs/what-moves-me.constants.ts` | CRIAR                     |
| `src/components/sobre/beliefs/WhatMovesMeBackground.tsx`  | CRIAR                     |
| `src/components/sobre/beliefs/WhatMovesMePhrase.tsx`      | CRIAR                     |
| `src/components/sobre/sections/AboutBeliefs.tsx`          | REESCREVER                |
| `src/components/sobre/beliefs/BeliefScrollText.tsx`       | REESCREVER                |
| `src/config/beliefTokens.ts`                              | ADICIONAR re-exports      |
| `.context/.../06-O-QUE-ME-MOVE/walkthrough.md`            | CRIAR (pós-implementação) |

Não tocar: `3d/*`, `BeliefBackground.tsx`, `BeliefFixedHeader.tsx`, `BeliefManifesto.tsx`, `BeliefOverlay.tsx`, `SplitTextMotion.tsx`, `BeliefsScrollContext.tsx`, `useBeliefsScroll.ts`.

---

## 6. Arquitetura Proposta

```
AboutBeliefs.tsx
  ├── WhatMovesMeBackground   (CSS shade fixo, position:fixed, aria-hidden)
  └── BeliefScrollText        (sticky top-0 h-dvh, 6 frases absolutas)
        └── WhatMovesMePhrase (por frase: opacity/y/filter via MotionValue)
```

`AboutBeliefs` cria `sectionRef` e passa para `BeliefScrollText`. Sem context, sem GSAP, sem Ghost. Seção tem `min-height: 620vh`.

---

## 7. Decisão Técnica — Background Fixo

**CSS puro. Sem canvas, sem WebGL, sem requestAnimationFrame.**

```css
/* Layer 1: glow azul central */
radial-gradient(ellipse 80% 60% at 50% 50%, #0048ff22 0%, transparent 70%)
/* Layer 2: glow roxo inferior-esquerdo */
radial-gradient(ellipse 50% 40% at 20% 80%, #8705f218 0%, transparent 60%)
/* Layer 3: glow ciano superior-direito */
radial-gradient(ellipse 40% 30% at 80% 20%, #4fe6ff10 0%, transparent 50%)
/* Base */
#040013

/* Grade CSS (div filho) */
repeating-linear-gradient(90deg, transparent 79px, #0048ff0a 80px)
repeating-linear-gradient(0deg, transparent 79px, #0048ff06 80px)

/* Vinheta (div filho) */
radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #040013cc 100%)
```

`position: fixed`, `aria-hidden="true"`, `z-index: 0`.

---

## 8. Estratégia — Cores do Projeto

```ts
export const GHOST_SHADE_COLORS = {
  voidBlack: '#040013', // base + glow final
  bluePrimary: '#0048ff', // glow dominante + cor de "GHOST" na frase 6
  blueAccent: '#4fe6ff', // glow highlight
  purpleDetails: '#8705f2', // glow secundário
  pinkDetails: '#f501d3', // reserva (não usado no background)
  text: '#fcffff', // texto principal
} as const;
```

Vermelho ausente. `pinkDetails` não usado no background (evitar competição visual com texto branco).

---

## 9. Estratégia — Texto Centralizado

```tsx
<div className="sticky top-0 flex h-dvh items-center justify-center">
  <div className="relative h-full w-full max-w-[min(90vw,56rem)]">
    {/* 6 WhatMovesMePhrase: position absolute, inset-0, flex, center */}
  </div>
</div>
```

Cada frase é `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`. Multi-linha via `text.split('\n')` com `<span>` por linha.

---

## 10. Estratégia — Scroll-Driven Entry

`useScroll({ target: sectionRef, offset: ['start start', 'end end'] })` no `BeliefScrollText`.

Band por frase: `BAND = 1 / 6 ≈ 0.1667`. Para frase `i`:

```
fadeInStart  = i * BAND
fadeInEnd    = i * BAND + BAND * 0.22
peakEnd      = (i+1) * BAND - BAND * 0.22
fadeOutEnd   = (i+1) * BAND           ← 1.1 para última (sem fade out)
```

```ts
opacity: useTransform(scrollY, [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd], [0, 1, 1, 0])
y:       useTransform(scrollY, [...mesmos pontos...], [18, 0, 0, -12])
filter:  useTransform(scrollY, [...], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'])
```

`GHOST_EASE = [0.22, 1, 0.36, 1]` — aplicado via `ease` no useTransform quando suportado.

---

## 11. Estratégia — Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion(); // motion/react

<motion.p
  style={{
    opacity, // preservado
    y: prefersReducedMotion ? 0 : y, // sem translateY
    filter: prefersReducedMotion ? 'none' : filter, // sem blur
  }}
/>;
```

Background CSS sem `@keyframes` — já estático, nada a desativar.

---

## 12. Estratégia — Acessibilidade

- `<section aria-labelledby="o-que-me-move-title">` + `<h2 className="sr-only">O que me move</h2>`
- `WhatMovesMeBackground`: `aria-hidden="true"`
- `WhatMovesMePhrase` raiz: `aria-label={phrase.text.replace(/\n/g, ' ')}` — screen reader lê texto completo
- Spans filhos (`<span aria-hidden="true">`): evita duplicação
- Stage container: `aria-live="polite"` — anuncia mudança de frase
- Foco de teclado não preso em sticky/fixed
- Contraste texto `#fcffff` / bg `#040013`: ratio ≥ 12:1 (supera AAA)

---

## 13. Estratégia — Performance

- Background: CSS puro, zero JS, zero `requestAnimationFrame`
- `useTransform`: lazy, calcula somente sob demanda
- Frases: `position: absolute` evita layout thrashing
- `will-change: transform` apenas nos `<motion.p>` ativos
- Sem R3F canvas, sem WebGL context nesta seção
- Bundle: zero imports novos de bibliotecas

---

## 14. Riscos

| Risco                                         | Prob. | Mitigação                                   |
| --------------------------------------------- | ----- | ------------------------------------------- |
| `useScroll` em múltiplos filhos (1 por frase) | Média | Passar `scrollYProgress` do pai via prop    |
| `filter: blur()` custoso em scroll mobile     | Baixa | Desativado em reduced motion                |
| `position: fixed` bg quebrando z-index        | Baixa | Sem `transform`/`opacity<1` no bg fixo      |
| `MotionValue<string>` para filter no TS       | Baixa | Aceito pelo Framer Motion v11               |
| Regressão em outras seções da Sobre           | Baixa | Arquivos 3d/_ e beliefs/_ antigos intocados |

---

## 15. Rollback

```bash
# Ver commits
git log --oneline -10

# Restaurar arquivos-chave individualmente
git checkout <sha-antes-do-task1> -- \
  src/components/sobre/sections/AboutBeliefs.tsx \
  src/components/sobre/beliefs/BeliefScrollText.tsx \
  src/config/beliefTokens.ts

# Remover arquivos criados
git rm src/components/sobre/beliefs/what-moves-me.constants.ts
git rm src/components/sobre/beliefs/WhatMovesMeBackground.tsx
git rm src/components/sobre/beliefs/WhatMovesMePhrase.tsx
```

---

## 16. Critérios de Aceite

```
[ ] 06-O-QUE-ME-MOVE: sem Ghost 3D renderizando
[ ] Background: CSS shade fixo, cores do projeto
[ ] Background: sem CDN externo, sem window.THREE, sem rAF contínuo
[ ] 6 frases na ordem correta (belief → ghost-design)
[ ] Frases centralizadas em desktop e mobile
[ ] Frase 6: tipografia maior + GHOST em #0048ff
[ ] Scroll forward: frases aparecem e somem
[ ] Scroll reverso: frases reaparecem
[ ] Reduced motion: sem translateY, sem blur
[ ] Sem scale/rotate/bounce/shake/translateX
[ ] Sem layout shift (CLS estável)
[ ] BeliefManifesto e BeliefFixedHeader NÃO montados
[ ] Arquivos 3d/* existem e intactos
[ ] pnpm lint: PASS
[ ] pnpm typecheck: PASS
[ ] pnpm build: PASS
[ ] walkthrough.md criado
```

---

## 17. Validações

| Contexto                        | Validação                             |
| ------------------------------- | ------------------------------------- |
| Mobile 375px                    | Frases centralizadas, scroll funciona |
| Mobile 430px                    | Idem                                  |
| Tablet 768px                    | Idem                                  |
| Desktop 1024px                  | Font clamp correto                    |
| Desktop 1440px                  | Todas frases visíveis em scroll       |
| Desktop Wide 1680px             | Sem overflow                          |
| Scroll lento                    | Transição suave                       |
| Scroll rápido                   | Sem glitch                            |
| Scroll reverso                  | Estado correto                        |
| Reduced motion ativo            | Sem y/blur                            |
| Navegação direta `/sobre`       | Estado inicial correto                |
| Reload no meio da seção         | Estado correto                        |
| Contraste texto/bg              | ≥ 7:1                                 |
| Ausência de Ghost nesta seção   | Confirmado                            |
| Ausência de carregamento do GLB | Confirmado                            |

---

## 18. Necessidade de Atualizar Docs

Após aprovação e implementação:

- [ ] `06-O-QUE-ME-MOVE-v4.md` → stack agora é Framer Motion + CSS shade
- [ ] `06-O-QUE-ME-MOVE-blueprint-atualizado.md` → nova arquitetura
- [ ] `SOBRE-PROTOTIPO-INTERATIVO.md` → seção 06 sem Ghost 3D
- [ ] `.context/.../06-O-QUE-ME-MOVE/walkthrough.md` → criar após execução

---

> **APPROVAL GATE:** Não alterar código antes de aprovação explícita com "Aprovado" ou "Proceed".
