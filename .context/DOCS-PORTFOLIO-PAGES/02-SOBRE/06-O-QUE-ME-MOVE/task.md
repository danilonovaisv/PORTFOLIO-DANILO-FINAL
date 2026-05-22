# Task List — 06-O-QUE-ME-MOVE Redesign

> **Data:** 2026-05-17
> **Status:** AGUARDANDO APROVAÇÃO HUMANA — não executar até "Aprovado" ou "Proceed"
> **Estimativa total:** ~12-16 horas (20 tarefas × máx 1h)
> **Referência:** `implementation_plan.md` (mesma pasta)

---

## Progresso

```
[ ] = pendente   [x] = concluído   [~] = em andamento   [!] = bloqueado
```

---

## Fase 0 — Leitura e Auditoria (Tarefas 1–5)

### T01 — Ler rules e docs

**Estimativa:** 30min  
**Status:** [ ]

- Ler `CLAUDE.md` + `GHOST-DESIGN-SYSTEM.md`
- Ler `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md` (plano aprovado)
- Ler `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md`
- Ler `.context/SOBRE-PROTOTIPO-INTERATIVO.md` seção 06

**Critério de conclusão:** Entendimento confirmado das regras Ghost System, tokens de cor, ease padrão `[0.22, 1, 0.36, 1]`, e restrições de animação.

---

### T02 — Auditar blueprint atual

**Estimativa:** 30min  
**Status:** [ ]

- Ler `06-O-QUE-ME-MOVE-blueprint-atualizado.md` (33KB)
- Identificar divergências entre blueprint e código atual
- Registrar em `.context/logs/adjustment_log.md`

**Critério de conclusão:** Lista de divergências documentada.

---

### T03 — Auditar componente atual

**Estimativa:** 45min  
**Status:** [ ]

- Ler `src/components/sobre/sections/AboutBeliefs.tsx`
- Ler `src/components/sobre/beliefs/BeliefScrollText.tsx`
- Ler `src/components/sobre/beliefs/BeliefManifesto.tsx`
- Ler `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- Mapear todos imports, props e dependências de estado

**Critério de conclusão:** Mapa completo de dependências da seção atual.

---

### T04 — Mapear Ghost 3D atual

**Estimativa:** 30min  
**Status:** [ ]

- Ler `src/components/sobre/3d/GhostScene.tsx`
- Ler `src/components/sobre/3d/GhostModel.tsx`
- Confirmar que `GhostScene` é montado **somente** via `AboutBeliefs.tsx`
- Verificar se há outros pontos de montagem do canvas R3F nesta seção

**Critério de conclusão:** Confirmação de que remover imports de `AboutBeliefs.tsx` é suficiente para desmontar o canvas.

---

### T05 — Mapear motion atual

**Estimativa:** 30min  
**Status:** [ ]

- Identificar todos `gsap`, `ScrollTrigger`, `useGSAP` usados na seção
- Identificar imports de `motion/react` já existentes
- Verificar versão instalada do Framer Motion (`motion/react`)
- Confirmar que `useScroll`, `useTransform`, `useReducedMotion` estão disponíveis

**Critério de conclusão:** Lista de remoções GSAP e confirmação da API Framer Motion disponível.

---

## Fase 1 — Design e Decisões (Tarefas 6–8)

### T06 — Definir constants de texto

**Estimativa:** 30min  
**Status:** [ ]

Criar `src/components/sobre/beliefs/what-moves-me.constants.ts` com:

```ts
export const WHAT_MOVES_ME_PHRASES = [
  { id: 1, text: 'Acredito que design\né uma linguagem.', emphasis: false },
  { id: 2, text: 'Que sistemas\ncriam cultura.', emphasis: false },
  {
    id: 3,
    text: 'Que cada escolha visual\ncarrega intenção.',
    emphasis: false,
  },
  { id: 4, text: 'Que beleza\né estratégia.', emphasis: false },
  { id: 5, text: 'Que forma\nsegue propósito.', emphasis: false },
  {
    id: 6,
    text: 'ISSO É\nGHOST\nDESIGN.',
    emphasis: true,
  },
] as const;

export const GHOST_SHADE_COLORS = {
  voidBlack: '#040013',
  bluePrimary: '#0048ff',
  blueAccent: '#4fe6ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  text: '#fcffff',
} as const;

export const GHOST_EASE = [0.22, 1, 0.36, 1] as const;
export const PHRASE_COUNT = 6;
export const SECTION_HEIGHT_VH = 620;
export const BAND = 1 / PHRASE_COUNT;
```

**Critério de conclusão:** Arquivo criado sem erros TypeScript.

---

### T07 — Definir background fixo

**Estimativa:** 45min  
**Status:** [ ]

Criar `src/components/sobre/beliefs/WhatMovesMeBackground.tsx`:

- `position: fixed; inset: 0; z-index: 0`
- `aria-hidden="true"`
- Background principal: 3 camadas radial-gradient + base `#040013`
- Div filho grade CSS: `repeating-linear-gradient` horizontal + vertical
- Div filho vinheta: `radial-gradient ellipse transparent→#040013cc`
- Zero JavaScript, zero requestAnimationFrame, zero imports de lib

**Critério de conclusão:** Componente renderiza sem erros, background visível, nenhum WebGL.

---

### T08 — Decidir CSS versus R3F shader

**Estimativa:** 15min  
**Status:** [x]

**Decisão tomada:** CSS puro.

**Justificativa:**

- Ghost 3D removido desta seção por spec
- CSS radial-gradient reproduz o efeito visual sem WebGL
- Zero bundle size adicional
- Sem requestAnimationFrame contínuo
- Compatible com `reduced-motion: reduce`

**Referência:** `implementation_plan.md` seção 7.

---

## Fase 2 — Implementação (Tarefas 9–12)

### T09 — Implementar frase centralizada

**Estimativa:** 60min  
**Status:** [ ]

**Criar `src/components/sobre/beliefs/WhatMovesMePhrase.tsx`:**

```tsx
// Props: phrase, opacity: MotionValue<number>, y: MotionValue<number>, filter: MotionValue<string>
// Usa useReducedMotion()
// position: absolute; inset: 0; display: flex; align-items: center; justify-content: center
// text.split('\n') → array de <span> por linha
// emphasis=true → font-size maior, tracking, GHOST em #0048ff
// aria-label={phrase.text.replace(/\n/g, ' ')}
// spans internos aria-hidden="true"
```

**Reescrever `src/components/sobre/beliefs/BeliefScrollText.tsx`:**

```tsx
// Props: sectionRef: React.RefObject<HTMLElement | null>
// sticky top-0 h-dvh flex items-center justify-center
// container max-w-[min(90vw,56rem)] relative h-full w-full
// 6 WhatMovesMePhrase absolutos
// useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
// cálculo de bands aqui, passa MotionValues como props
```

**Critério de conclusão:** Frases renderizam centralizadas, tipografia correta, nenhum GSAP.

---

### T10 — Implementar scroll progress

**Estimativa:** 60min  
**Status:** [ ]

No `BeliefScrollText.tsx`:

```ts
const BAND = 1 / 6;

// Para cada frase i (0-indexed):
const fadeInStart = i * BAND;
const fadeInEnd = i * BAND + BAND * 0.22;
const peakEnd = (i + 1) * BAND - BAND * 0.22;
const fadeOutEnd = i < 5 ? (i + 1) * BAND : 1.1;

const opacity = useTransform(
  scrollYProgress,
  [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
  [0, 1, 1, 0]
);
const y = useTransform(
  scrollYProgress,
  [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
  [18, 0, 0, -12]
);
const filter = useTransform(
  scrollYProgress,
  [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
  ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
);
```

**Validar:** Scroll forward mostra frases em sequência. Scroll reverso restaura estado anterior.

**Critério de conclusão:** Animação de entrada/saída funcionando em todas as 6 frases.

---

### T11 — Implementar reduced motion

**Estimativa:** 30min  
**Status:** [ ]

No `WhatMovesMePhrase.tsx`:

```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  style={{
    opacity,
    y: prefersReducedMotion ? 0 : y,
    filter: prefersReducedMotion ? 'none' : filter,
  }}
/>;
```

**Validar:** Com `prefers-reduced-motion: reduce` ativo no OS:

- Opacity ainda funciona (frase aparece/some)
- Sem translateY
- Sem blur

**Critério de conclusão:** Comportamento correto sob reduced motion.

---

### T12 — Remover imports mortos

**Estimativa:** 30min  
**Status:** [ ]

Reescrever `src/components/sobre/sections/AboutBeliefs.tsx` removendo:

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

Adicionar:

```tsx
import { WhatMovesMeBackground } from '@/components/sobre/beliefs/WhatMovesMeBackground';
import { BeliefScrollText } from '@/components/sobre/beliefs/BeliefScrollText';

const sectionRef = useRef<HTMLElement>(null);

return (
  <section
    ref={sectionRef}
    aria-labelledby="o-que-me-move-title"
    style={{ minHeight: `${SECTION_HEIGHT_VH}vh` }}
  >
    <h2 id="o-que-me-move-title" className="sr-only">
      O que me move
    </h2>
    <WhatMovesMeBackground />
    <BeliefScrollText sectionRef={sectionRef} />
  </section>
);
```

**Critério de conclusão:** Sem imports não utilizados. `pnpm typecheck` não levanta erros novos neste arquivo.

---

## Fase 3 — Validação Visual (Tarefas 13–15)

### T13 — Validar mobile

**Estimativa:** 45min  
**Status:** [ ]

Testar em browser com DevTools:

| Viewport | Checklist                                                        |
| -------- | ---------------------------------------------------------------- |
| 375px    | [ ] Frases centralizadas [ ] Texto não corta [ ] Scroll funciona |
| 430px    | [ ] Frases centralizadas [ ] Texto não corta [ ] Scroll funciona |
| 768px    | [ ] Frases centralizadas [ ] Frase 6 tipografia maior            |

**Critério de conclusão:** Todas checkboxes marcadas.

---

### T14 — Validar desktop

**Estimativa:** 30min  
**Status:** [ ]

Testar em browser:

| Viewport | Checklist                                                          |
| -------- | ------------------------------------------------------------------ |
| 1024px   | [ ] Font clamp correto [ ] Ghost 3D ausente [ ] Background visível |
| 1440px   | [ ] Todas frases visíveis em scroll [ ] CLS estável                |
| 1680px   | [ ] Sem overflow horizontal                                        |

**Critério de conclusão:** Todas checkboxes marcadas.

---

### T15 — Validar acessibilidade

**Estimativa:** 30min  
**Status:** [ ]

- [ ] `<section aria-labelledby="o-que-me-move-title">` presente
- [ ] `<h2 className="sr-only">` presente
- [ ] `WhatMovesMeBackground` tem `aria-hidden="true"`
- [ ] Cada `WhatMovesMePhrase` tem `aria-label` completo
- [ ] Spans internos têm `aria-hidden="true"`
- [ ] Contraste texto `#fcffff` / bg `#040013`: ratio ≥ 12:1
- [ ] Foco de teclado não preso em sticky/fixed
- [ ] Reduced motion testado

**Critério de conclusão:** Checklist 100%.

---

## Fase 4 — Build e Qualidade (Tarefas 16–18)

### T16 — Rodar lint

**Estimativa:** 15min  
**Status:** [ ]

```bash
pnpm lint
```

Corrigir todos os erros antes de continuar. Warnings são aceitáveis se pré-existentes.

**Critério de conclusão:** `pnpm lint` retorna PASS (exit 0).

---

### T17 — Rodar typecheck

**Estimativa:** 15min  
**Status:** [ ]

```bash
pnpm typecheck
```

Zero erros novos introduzidos por este redesign. Erros pré-existentes documentados mas não bloqueiam.

**Critério de conclusão:** Nenhum erro TypeScript novo nos arquivos modificados.

---

### T18 — Rodar build

**Estimativa:** 20min  
**Status:** [ ]

```bash
pnpm build
```

Build completo sem erros. Bundle size não deve aumentar significativamente (zero novos imports de lib).

**Critério de conclusão:** `pnpm build` retorna PASS (exit 0).

---

## Fase 5 — Documentação (Tarefas 19–20)

### T19 — Criar walkthrough

**Estimativa:** 45min  
**Status:** [ ]

Criar `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md` com:

- Arquitetura final implementada
- Decisões técnicas tomadas durante execução
- Problemas encontrados e soluções
- Como testar localmente
- Como fazer rollback se necessário
- Diferenças entre versão anterior (GSAP + Ghost 3D) e nova (Framer Motion + CSS)

**Critério de conclusão:** Arquivo criado, legível por dev futuro sem contexto adicional.

---

### T20 — Atualizar ou propor atualização dos docs

**Estimativa:** 30min  
**Status:** [ ]

Atualizar (ou propor atualização de):

- [ ] `06-O-QUE-ME-MOVE-v4.md` → stack agora é Framer Motion + CSS shade (sem Ghost 3D)
- [ ] `06-O-QUE-ME-MOVE-blueprint-atualizado.md` → nova arquitetura dos componentes
- [ ] `.context/SOBRE-PROTOTIPO-INTERATIVO.md` → seção 06 sem Ghost 3D

**Critério de conclusão:** Docs refletem estado real do código após implementação.

---

## Resumo de Arquivos

| Arquivo                      | Ação                 | Tarefa        |
| ---------------------------- | -------------------- | ------------- |
| `what-moves-me.constants.ts` | CRIAR                | T06           |
| `WhatMovesMeBackground.tsx`  | CRIAR                | T07           |
| `WhatMovesMePhrase.tsx`      | CRIAR                | T09           |
| `BeliefScrollText.tsx`       | REESCREVER           | T09, T10, T11 |
| `AboutBeliefs.tsx`           | REESCREVER           | T12           |
| `beliefTokens.ts`            | ADICIONAR re-exports | T06           |
| `walkthrough.md`             | CRIAR                | T19           |
| Docs v4, blueprint, SOBRE    | ATUALIZAR            | T20           |

**NÃO tocar:** `3d/*`, `BeliefBackground.tsx`, `BeliefFixedHeader.tsx`, `BeliefManifesto.tsx`, `BeliefOverlay.tsx`, `SplitTextMotion.tsx`, `BeliefsScrollContext.tsx`, `useBeliefsScroll.ts`

---

## Critérios de Aceite Finais

```
[ ] 06-O-QUE-ME-MOVE: sem Ghost 3D renderizando
[ ] Background: CSS shade fixo, cores do projeto
[ ] 6 frases na ordem correta
[ ] Frases centralizadas em desktop e mobile
[ ] Frase 6: tipografia maior + GHOST em #0048ff
[ ] Scroll forward: frases aparecem e somem
[ ] Scroll reverso: frases reaparecem
[ ] Reduced motion: sem translateY, sem blur
[ ] Sem scale/rotate/bounce/shake/translateX
[ ] BeliefManifesto e BeliefFixedHeader NÃO montados
[ ] Arquivos 3d/* existem e intactos
[ ] pnpm lint: PASS
[ ] pnpm typecheck: PASS
[ ] pnpm build: PASS
[ ] walkthrough.md criado
```

---

> **APPROVAL GATE:** Aguardando "Aprovado" ou "Proceed" para iniciar T06 em diante.
> T01–T05 (leitura/auditoria) podem iniciar após aprovação.
> T08 já concluída (decisão CSS vs R3F shader = CSS).
