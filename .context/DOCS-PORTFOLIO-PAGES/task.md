# Task List — About Beliefs: Migração GSAP e Correções Localizadas

> **Versão:** 1.0.0
> **Data:** 2026-05-16
> **Escopo:** Seção "O que me move" — migração stack Motion → GSAP + correções localizadas
> **Blueprint:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-blueprint-atualizado.md`
> **Status:** AGUARDANDO APROVAÇÃO — nenhuma implementação até `Aprovado` ou `Proceed`

---

## Legenda de Status

- `pending` — não iniciado
- `in-progress` — em execução
- `done` — concluído e validado
- `blocked` — bloqueado por dependência

---

## Phase 1 — Type and Hook Alignment

> Estabelecer contrato de tipo correto antes de qualquer componente ser migrado.
> Ordem obrigatória: T-001 → T-002 → T-003

---

### T-001 — Migrar tipo `scrollYProgress` de `MotionValue` para ref-getter

**Status:** pending
**Owner:** next-ts-engineer
**Estimated size:** ≤ 30 min
**Files likely affected:**

- `src/types/beliefs.ts`

**Preconditions:**

- Nenhuma. Este é o primeiro arquivo da cadeia de dependências.

**Steps:**

1. Remover `import type { MotionValue } from 'motion/react'`
2. Alterar `scrollYProgress: MotionValue<number>` para `scrollYProgress: { get: () => number }`
3. Manter todos os outros campos do tipo inalterados (`containerRef`, `isMobile`, `shouldReduceMotion`, `activeIndex`, `isClimax`)

**Validation:**

```bash
pnpm run typecheck
```

Esperado: sem erros em `types/beliefs.ts`; erros em cascata nos consumidores são esperados e serão resolvidos em T-002/T-003.

**Definition of Done:**

- `MotionValue` removido do arquivo
- Tipo compila isoladamente
- Nenhum import de `motion/react` permanece em `types/beliefs.ts`

---

### T-002 — Migrar `useBeliefsScroll` para scroll nativo sem `motion/react`

**Status:** pending
**Owner:** next-ts-engineer
**Estimated size:** ≤ 50 min
**Files likely affected:**

- `src/hooks/useBeliefsScroll.ts`

**Preconditions:**

- T-001 concluído (tipo `scrollYProgress` já é `{ get: () => number }`)

**Steps:**

1. Remover imports: `useScroll`, `useMotionValueEvent` de `'motion/react'`
2. Criar ref interno: `const progressRef = useRef(0)`
3. Implementar scroll listener nativo dentro de `useEffect`:
   - Ler posição relativa da `containerRef` via `getBoundingClientRect()`
   - Calcular `progress` como `(scrollY - containerTop) / containerHeight`, clampado em `[0, 1]`
   - Atualizar `progressRef.current = progress`
   - Calcular `activeIndex` via `Math.round(progress * (BELIEF_PHRASES.length - 1))`
   - Calcular `isClimax` via `progress >= 0.82`
   - Chamar `setActiveIndex` e `setIsClimax` com guards de mudança (evitar re-renders desnecessários)
4. Retornar `scrollYProgress: progressRef` — o `progressRef` tem `.current` mas o contrato é `{ get: () => number }`, portanto retornar `{ get: () => progressRef.current }`
5. Manter `shouldReduceMotion` via `useMotionGate()` (não usa motion/react internamente)
6. Manter `isMobile` via `useMediaQuery()`
7. Adicionar cleanup do listener no `return` do `useEffect`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Esperado: sem erros em `hooks/useBeliefsScroll.ts`; erros nos componentes consumidores são esperados até T-003.

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- `scrollYProgress` retornado como `{ get: () => number }`
- `activeIndex` e `isClimax` calculados via scroll nativo
- Listener limpo no unmount

---

### T-003 — Atualizar `BeliefsScrollContext` para tipo pós-migração

**Status:** pending
**Owner:** next-ts-engineer
**Estimated size:** ≤ 20 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefsScrollContext.tsx`

**Preconditions:**

- T-001 concluído
- T-002 concluído

**Steps:**

1. Verificar se o contexto faz import direto de `MotionValue` ou apenas re-exporta o tipo de `beliefs.ts`
2. Se houver import direto de `MotionValue`, remover
3. Garantir que o tipo do contexto está alinhado com `BeliefsScrollContextValue` (de `types/beliefs.ts`)
4. Verificar que o provider passa `scrollYProgress` com a forma `{ get: () => number }`

**Validation:**

```bash
pnpm run typecheck
```

Esperado: sem erros em BeliefsScrollContext e nos componentes que consomem o contexto.

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- Contexto compila sem erros de tipo
- Todos os consumidores do contexto passam no typecheck

---

## Phase 2 — Background e Overlay (camadas passivas)

> Migrar camadas sem texto. Menor complexidade. Sem dependência entre T-004 e T-005.

---

### T-004 — Migrar `BeliefBackground` de Motion DOM para GSAP ScrollTrigger

**Status:** pending
**Owner:** motion-choreographer
**Estimated size:** ≤ 45 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefBackground.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos (contrato de tipo estável)

**Steps:**

1. Remover imports `animate`, `inView` de `'motion'`
2. Adicionar imports: `gsap` de `'gsap'`, `ScrollTrigger` de `'gsap/ScrollTrigger'`
3. Registrar plugin: `gsap.registerPlugin(ScrollTrigger)` (verificar se já está em ponto central; se sim, não registrar duplicado)
4. No `useEffect`, criar `gsap.context(() => { ... }, ref)` para escopo seguro
5. Para cada `[data-belief-section]`, criar `ScrollTrigger.create`:
   - `trigger: element`
   - `start: 'top 55%'`
   - `onEnter` e `onEnterBack`: `gsap.to(ref.current, { backgroundColor: color, duration: beliefMotion.backgroundDuration, ease: beliefMotion.referenceEase })`
   - Guard `shouldReduceMotion`: usar `duration: 0` e `ease: 'none'` se ativo
6. Retornar `() => ctx.revert()` no cleanup do `useEffect`
7. Manter `aria-hidden="true"` e `data-testid="beliefs-background"`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação visual: scroll na seção — background deve mudar de cor por capítulo.

**Definition of Done:**

- Zero imports de `'motion'` no arquivo
- GSAP ScrollTrigger controla transições de cor
- `ctx.revert()` no cleanup
- `shouldReduceMotion` guard ativo

---

### T-005 — Migrar `BeliefOverlay` de `motion/react` para GSAP scrub

**Status:** pending
**Owner:** motion-choreographer
**Estimated size:** ≤ 30 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefOverlay.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos

**Steps:**

1. Remover imports `m`, `useTransform` de `'motion/react'`
2. Converter `<m.div>` para `<div>` com `ref`
3. Adicionar imports: `gsap`, `ScrollTrigger`
4. No `useEffect`, criar `gsap.context(() => { ... })`:
   - `gsap.to(ref.current, { opacity: keyframes, scrollTrigger: { trigger: containerRef, start: 'top end', end: 'bottom end', scrub: 0.85 } })`
   - Os keyframes de opacidade: `[0.04, 0.08, 0.1, 0.08, 0.04]` mapeados para os mesmos pontos de progresso
   - Guard `shouldReduceMotion`: `gsap.set(ref.current, { opacity: 0.06 })` e não criar ScrollTrigger
5. `aria-hidden="true"` já presente — manter
6. Retornar `() => ctx.revert()`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- GSAP scrub controla opacidade
- `aria-hidden="true"` presente

---

## Phase 3 — Header, ScrollText e Manifesto (componentes com texto)

> Maior complexidade. T-006 pode rodar paralelo a T-007 e T-008, mas todos devem terminar antes da validação da fase.

---

### T-006 — Migrar `BeliefFixedHeader` de `motion/react` para GSAP

**Status:** pending
**Owner:** motion-choreographer
**Estimated size:** ≤ 50 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos

**Steps:**

1. Remover imports `m`, `useTransform` de `'motion/react'`
2. Converter `<m.aside>` para `<aside>` com `ref`
3. Remover `itemVariants`, `custom`, `variants` — GSAP anima via seletor `[data-split-item]`
4. Atualizar `SplitTextMotion`: garantir que o `as` prop não precise de `m.p` (pode usar `'p'` simples)
5. No `useEffect`, criar `gsap.context(() => { ... })`:
   - Entrada: `gsap.fromTo(ref.current, { autoAlpha: 0, x: shouldReduceMotion ? 0 : 60 }, { autoAlpha: 1, x: 0, scrollTrigger: { trigger: containerRef, start: 'top 8%', once: true }, duration: beliefMotion.headerDuration, ease: [0.22, 1, 0.36, 1] })`
   - Saída: `gsap.to(ref.current, { autoAlpha: 0, scrollTrigger: { trigger: containerRef, start: '92% top', end: '98% top', scrub: true } })`
   - Word stagger: `gsap.from('[data-split-item]', { autoAlpha: 0, stagger: 0.04, delay: 0.15 })` no mesmo contexto
   - Guard `shouldReduceMotion`: sem stagger, durations mínimas
6. Retornar `() => ctx.revert()`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação visual: header aparece rapidamente no início do scroll, some antes do fim.

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- GSAP anima `autoAlpha` e `x` do header
- Word stagger via seletor funcional
- Reduced motion guard ativo

---

### T-007 — Migrar `BeliefScrollText` de Motion DOM para GSAP + corrigir `font-medium`

**Status:** pending
**Owner:** motion-choreographer
**Estimated size:** ≤ 60 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefScrollText.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos

**Steps:**

1. Remover imports `animate`, `inView` de `'motion'`
2. Adicionar imports: `gsap`, `ScrollTrigger`
3. No `useEffect`, para cada `[data-belief-phrase]`, criar `ScrollTrigger.create`:
   - `trigger: element`
   - `start: 'top 55%'`
   - `end: 'bottom 45%'`
   - `onEnter`: `gsap.to(element, { opacity: 1, x: 0, duration: beliefMotion.textRevealDuration, ease: beliefMotion.referenceEase })`
   - `onLeave` e `onLeaveBack`: `gsap.to(element, { opacity: 0, x: enterX, duration: beliefMotion.textExitDuration, ease: beliefMotion.referenceEase })`
   - `enterX = isMobile ? -48 : -100` (exceção de blueprint preservada)
   - Guard `shouldReduceMotion`: `duration: 0.16, ease: 'none'` e zero x
4. Estado inicial dos elementos: `gsap.set('[data-belief-phrase]', { opacity: 0 })` antes de criar ScrollTriggers
5. Retornar `() => ctx.revert()`
6. No JSX, alterar `font-bold` para `font-medium` na classe do `<p>`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação visual: frases entram da esquerda uma por vez, saem ao sair da viewport.

**Definition of Done:**

- Zero imports de `'motion'` no arquivo
- `font-medium` no `<p>` (não `font-bold`)
- GSAP `onEnter`/`onLeave`/`onLeaveBack` por frase
- `enterX` correto por breakpoint
- Estado inicial `opacity: 0` via `gsap.set`

---

### T-008 — Migrar `BeliefManifesto` de `motion/react` para GSAP onUpdate

**Status:** pending
**Owner:** motion-choreographer
**Estimated size:** ≤ 60 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefManifesto.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos
- `SplitTextMotion` mantido como render-only (sem variants Motion)

**Steps:**

1. Remover imports `m`, `useTransform` de `'motion/react'`
2. Converter `<m.div>` e `<m.div>` internos para `<div>` com refs
3. Remover `itemVariants`, `animate={isClimax ? 'visible' : 'hidden'}` — GSAP anima palavras via seletor
4. No `useEffect`, criar `gsap.context(() => { ... })`:
   - Reveal do container: `ScrollTrigger.create({ trigger: containerRef, start: '82% top', end: '92% top', scrub: true, onUpdate: (self) => { const p = self.progress; gsap.set(wrapperRef.current, { opacity: p, y: 18 * (1 - p) }) } })`
   - Fade-out: `ScrollTrigger.create({ trigger: containerRef, start: '96% top', end: '100% top', scrub: true, onUpdate: (self) => { gsap.set(wrapperRef.current, { opacity: 1 - self.progress }) } })`
   - Word stagger no climax: quando `isClimax` muda para `true` (via prop/context watch), `gsap.from('[data-split-item]', { autoAlpha: 0, y: shouldReduceMotion ? 0 : 12, stagger: beliefMotion.manifestoStagger, duration: 0.42, ease: [0.22, 1, 0.36, 1] })`
   - Guard `shouldReduceMotion`: sem y, durations mínimas
5. Manter `aria-hidden={!isClimax}` no JSX
6. Retornar `() => ctx.revert()`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação visual: manifesto aparece gradualmente na faixa 82%-92% de scroll, palavras staggeream ao entrar no climax.

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- GSAP `onUpdate` scrub para reveal
- Word stagger funcional via seletor `[data-split-item]`
- `aria-hidden={!isClimax}` preservado
- `y` máximo 18px

---

## Phase 4 — Ghost 3D

---

### T-009 — Migrar `GhostScene` wrapper de `motion/react` para GSAP

**Status:** pending
**Owner:** r3f-webgl-engineer
**Estimated size:** ≤ 40 min
**Files likely affected:**

- `src/components/sobre/3d/GhostScene.tsx`

**Preconditions:**

- T-001, T-002, T-003 concluídos
- `GhostModel` recebe `scrollYProgress: { get: () => number }` — verificar que a prop continua compatível

**Steps:**

1. Remover imports `m`, `useTransform` de `'motion/react'`
2. Converter `<m.div>` wrapper para `<div>` com `ref`
3. No `useEffect`, criar `gsap.context(() => { ... })`:
   - Estado inicial: `gsap.set(wrapperRef.current, { autoAlpha: 0, y: 18 })` (reduzido de 20 para 18 — GDS limite)
   - Entrada: `ScrollTrigger.create({ trigger: containerRef, start: 'top 5%', once: true, onEnter: () => gsap.to(wrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }) })`
   - Saída: `ScrollTrigger.create({ trigger: containerRef, start: '90% top', end: '98% top', scrub: true, onUpdate: (self) => gsap.set(wrapperRef.current, { autoAlpha: 1 - self.progress, y: -18 * self.progress }) })`
   - Guard `shouldReduceMotion`: entrada imediata sem y, saída sem y
4. Manter `aria-hidden="true"` no Canvas
5. Verificar que `GhostModel` ainda recebe `scrollYProgress` como `{ get: () => number }` (compatível com T-002)
6. Retornar `() => ctx.revert()`

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação visual: Ghost aparece suavemente no início, some suavemente no fim. `y` nunca excede 18px.

**Definition of Done:**

- Zero imports de `motion/react` no arquivo
- `y` máximo 18px em entrada e saída
- GSAP controla `autoAlpha` e `y` do wrapper
- Canvas `aria-hidden="true"` preservado

---

### T-010 — Adicionar `useGLTF.preload` e cleanup de dispose em `GhostModel`

**Status:** pending
**Owner:** r3f-webgl-engineer
**Estimated size:** ≤ 25 min
**Files likely affected:**

- `src/components/sobre/3d/GhostModel.tsx`

**Preconditions:**

- Nenhuma dependência de outras tasks (mudança isolada no GhostModel)

**Steps:**

1. Adicionar `useGLTF.preload(MODEL_PATH)` no nível do módulo, fora de qualquer componente (após a declaração de `MODEL_PATH`)
2. No `GhostModel`, adicionar `useEffect` de cleanup:
   ```tsx
   useEffect(() => {
     return () => {
       const { nodes, materials } = useGLTF.getState(MODEL_PATH) ?? {};
       if (nodes) {
         Object.values(nodes).forEach((node) => {
           if (node instanceof THREE.Mesh) {
             node.geometry?.dispose();
           }
         });
       }
       if (materials) {
         Object.values(materials).forEach((mat) => mat?.dispose());
       }
       useGLTF.clear(MODEL_PATH);
     };
   }, []);
   ```
   Nota: verificar a API exata de `useGLTF.clear` e `useGLTF.getState` com a versão atual de `@react-three/drei` instalada. Se não disponível, usar o pattern `gl.renderLists.dispose()`.

**Validation:**

```bash
pnpm run typecheck
pnpm run lint
```

Validação de rede: no DevTools, o GLB deve ser carregado antes do scroll atingir a seção (preload ativo).

**Definition of Done:**

- `useGLTF.preload(MODEL_PATH)` presente no nível do módulo
- Cleanup de geometrias e materiais no unmount
- Sem memory leak detectável em navigate (verificar com Performance Monitor do DevTools)

---

## Phase 5 — Accessibility e Reduced Motion

---

### T-011 — Auditoria e correção de `prefers-reduced-motion` em todos os tweens GSAP

**Status:** pending
**Owner:** a11y-verifier
**Estimated size:** ≤ 40 min
**Files likely affected:**

- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/3d/GhostScene.tsx`

**Preconditions:**

- T-004 a T-009 concluídos

**Steps:**

1. Em cada componente migrado, verificar que o guard `shouldReduceMotion` está presente em todos os tweens
2. Padrão para reduced motion com GSAP: `duration: shouldReduceMotion ? 0.2 : fullDuration` e `ease: shouldReduceMotion ? 'none' : normalEase`; sem `x`, sem `y`, sem `stagger`
3. Verificar que `BeliefOverlay` tem `aria-hidden="true"` (já tinha, confirmar após migração)
4. Verificar contraste: `blueAccent (#4fe6ff)` sobre `pink (#f501d3)` — documentar ratio medido (não bloqueia approval, documenta)
5. Testar manualmente com `prefers-reduced-motion: reduce` via DevTools

**Validation:**
Inspeção manual com DevTools: "Emulate CSS media feature: prefers-reduced-motion: reduce"
Esperado: sem translações, fades rápidos (0.2s), sem stagger.

**Definition of Done:**

- Todos os tweens GSAP têm guard de reduced motion
- Comportamento visual com `prefers-reduced-motion: reduce` verificado e documentado
- Contraste documentado em comentário no `BeliefScrollText.tsx`

---

### T-012 — Re-executar suíte E2E após migração completa

**Status:** pending
**Owner:** a11y-verifier
**Estimated size:** ≤ 30 min
**Files likely affected:** nenhum (apenas execução de testes)

**Preconditions:**

- T-004 a T-011 concluídos
- `pnpm run build` passando

**Steps:**

1. Executar:
   ```bash
   pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium
   ```
2. Se falhar por screenshot diff (causa esperada: `font-medium` vs `font-bold`):
   - Atualizar screenshots de referência: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --update-snapshots`
3. Se falhar por seletor ou comportamento: investigar e corrigir
4. Re-executar com `--grep "reduced motion"` para validar os testes específicos de acessibilidade

**Validation:**
Saída: `12 passed (12)` ou equivalente.

**Definition of Done:**

- 12/12 testes passando no Chromium
- Testes de reduced motion passando
- Nenhum `console.error` nos testes

---

## Phase 6 — Documentação e Active State

---

### T-013 — Atualizar `active_state.md` para refletir estado real pós-migração

**Status:** pending
**Owner:** repository-architect
**Estimated size:** ≤ 20 min
**Files likely affected:**

- `.context/active_state.md`

**Preconditions:**

- T-001 a T-012 concluídos e validados

**Steps:**

1. Localizar a seção que declara "migração GSAP completa em 2026-05-13"
2. Atualizar para refletir:
   - Data real da migração: 2026-05-16
   - Stack confirmada: GSAP ScrollTrigger em todos os componentes beliefs e GhostScene
   - Zero imports `motion/react` e `motion` (dom) nos arquivos de escopo
   - `useGLTF.preload` ativo para `ghost-v1.glb`
   - E2E 12/12 passando
3. Atualizar quaisquer outros campos desatualizados identificados durante a auditoria

**Validation:**
Leitura do arquivo atualizado — verificar consistência com o estado real do código.

**Definition of Done:**

- `active_state.md` reflete o estado real pós-implementação
- Data e stack corretas documentadas
- Sem declarações falsas de "completo" para itens pendentes

---

### T-014 — Criar `walkthrough.md` com evidências de execução

**Status:** pending
**Owner:** repository-architect
**Estimated size:** ≤ 25 min
**Files likely affected:**

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md` (novo)

**Preconditions:**

- T-001 a T-013 concluídos

**Steps:**

1. Criar arquivo em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
2. Estrutura mínima:
   ```md
   # Walkthrough — About Beliefs: Migração GSAP

   > Data: 2026-05-16

   ## Resumo

   ## Commits (por fase)

   ## Evidências de Validação

   - typecheck: PASS
   - lint: PASS
   - build: PASS
   - E2E: 12/12
   - Reduced motion: verificado
   - Contraste blueAccent/pink: [ratio medido]

   ## Decisões tomadas

   ## Issues abertas / v2
   ```

**Validation:**
Leitura do arquivo criado — verificar que as evidências são reais (não declaradas antecipadamente).

**Definition of Done:**

- Arquivo existe em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/`
- Evidências de validação preenchidas com saídas reais dos comandos
- Decisões documentadas

---

## Resumo de Dependências

```
T-001 (types)
  └── T-002 (hook)
        └── T-003 (context)
              ├── T-004 (BeliefBackground)      Phase 2
              ├── T-005 (BeliefOverlay)         Phase 2
              ├── T-006 (BeliefFixedHeader)     Phase 3
              ├── T-007 (BeliefScrollText)      Phase 3
              ├── T-008 (BeliefManifesto)       Phase 3
              └── T-009 (GhostScene)            Phase 4

T-010 (GhostModel preload) — independente, pode rodar a qualquer momento

T-011 (a11y audit) — após T-004 a T-009
T-012 (E2E) — após T-011 + build
T-013 (active_state) — após T-012
T-014 (walkthrough) — após T-013
```

---

## Critérios de Aceitação Global

1. Zero imports de `motion`, `motion/react`, `animate()`, `inView()`, `useScroll()` nos arquivos beliefs e GhostScene
2. `pnpm run typecheck` sem erros relacionados a beliefs
3. `pnpm run lint` sem warnings novos em beliefs
4. `pnpm run build` passa sem erros
5. `pnpm exec playwright test test/e2e/about-beliefs.spec.ts` 12/12 passing
6. `font-medium italic` confirmado no `BeliefScrollText`
7. `y` máximo 18px em todos os elementos DOM animados
8. `aria-hidden="true"` presente em BeliefOverlay
9. `useGLTF.preload()` chamado para o GLB do Ghost
10. `.context/active_state.md` reflete estado real pós-implementação
