# Implementation Plan — About Beliefs Audit and Correction

> **Versão:** 1.0.0  
> **Data:** 2026-05-16  
> **Escopo:** Auditoria + plano de correção para seção "O que me move" (`/sobre → #o-que-me-move`)  
> **Blueprint de referência:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-blueprint-atualizado.md`  
> **Documento de conflitos resolvidos:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md` (gerado 2026-05-13)  
> **Status:** PLANEJAMENTO — nenhuma implementação até `Aprovado` ou `Proceed`

---

## 1. Executive Summary

A seção "O que me move" está implementada e estruturalmente sólida. O Ghost System está operacional: arquitetura de camadas correta, R3F com `frameloop="demand"`, GSAP ScrollTrigger como stack oficial desde 2026-05-13, tokens centralizados, E2E 12/12.

O problema central é uma **divergência de stack entre o `active_state.md` (que declara migração GSAP completa) e o código atual (que ainda usa `motion/react` em quatro componentes-chave)**. O `active_state.md` foi escrito como se a migração tivesse ocorrido, mas os arquivos `BeliefBackground.tsx`, `BeliefScrollText.tsx`, `BeliefManifesto.tsx` e `BeliefFixedHeader.tsx` importam e executam `motion/react` — contradizendo o blueprint v4 que proíbe explicitamente `motion`, `animate()`, `inView()` e `useScroll()` nesta seção.

Além disso, existem divergências tipográficas (font-weight no BeliefScrollText), um z-index hardcoded em BeliefOverlay, e uma lacuna de preload do GLB que aumenta o risco de pop-in no Ghost 3D.

**As correções são localizadas e de baixo risco.** Nenhum componente precisa ser reescrito do zero; são ajustes cirúrgicos.

---

## 2. Scope

**Arquivos em escopo:**

```
src/components/sobre/sections/AboutBeliefs.tsx
src/components/sobre/beliefs/BeliefBackground.tsx
src/components/sobre/beliefs/BeliefScrollText.tsx
src/components/sobre/beliefs/BeliefManifesto.tsx
src/components/sobre/beliefs/BeliefFixedHeader.tsx
src/components/sobre/beliefs/BeliefOverlay.tsx
src/components/sobre/beliefs/BeliefsScrollContext.tsx
src/components/sobre/beliefs/SplitTextMotion.tsx
src/components/sobre/beliefs/belief.constants.ts
src/components/sobre/3d/GhostScene.tsx
src/components/sobre/3d/GhostModel.tsx
src/components/sobre/3d/GhostSceneFallback.tsx
src/components/sobre/3d/GhostErrorBoundary.tsx
src/config/beliefTokens.ts
src/hooks/useBeliefsScroll.ts
src/types/beliefs.ts
.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md
.context/active_state.md
```

**Fora de escopo:** Outros componentes da página `/sobre`, rotas, schemas, deploy config, `firebase.json`, `next.config.mjs`.

---

## 3. Sources Consulted

| Arquivo                                                              | Status                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `CLAUDE.md`                                                          | Lido — governa stack, easing, grid, governança                      |
| `AGENTS.md`                                                          | Lido — define os 4 agentes orquestrados                             |
| `.context/GHOST-DESIGN-SYSTEM.md`                                    | Lido — tokens, motion rules, z-index                                |
| `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md`         | Lido — estrutura imutável das páginas                               |
| `.context/active_state.md`                                           | Lido — declara migração GSAP completa (2026-05-13)                  |
| `02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-blueprint-atualizado.md` | Lido — blueprint v4 com Motion DOM como referência original         |
| `02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md`                   | Lido — v4 atualizado prescrevendo GSAP como stack oficial           |
| `02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md`                   | Lido — plano de 2026-05-13 com frentes A/B/C e conflitos resolvidos |
| `docs/Blueprint Técnico- Seção "O Que Me Move" (06).md`              | Lido — blueprint técnico original                                   |
| `docs/plans/implementation_plan_06-o-que-me-move-ajuste-v2.md`       | Lido — diagnóstico de 2026-05-07                                    |
| `02-SOBRE/walkthrough.md`                                            | Lido — evidências de execução de 2026-05-02                         |
| Todos os componentes `beliefs/` e `3d/`                              | Lidos — código real auditado                                        |
| `src/config/beliefTokens.ts`, `src/config/motion.ts`                 | Lidos — tokens SSOT                                                 |
| `src/hooks/useBeliefsScroll.ts`, `src/types/beliefs.ts`              | Lidos — contratos de tipo                                           |
| `firebase.json`, `next.config.mjs`                                   | Lidos — infraestrutura de deploy                                    |
| `test/e2e/about-beliefs.spec.ts`                                     | Lido — suíte E2E (12 testes)                                        |

---

## 4. Ghost Plugin Inventory

Plugin: `/Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agent/plugins/ghost-design-system/`

Arquivos inventariados:

```
.claude/           — Claude-specific plugin config
.claude-plugin/    — Plugin metadata
.codex-plugin/     — Codex config
.mcpb-cache/       — MCP cache
agents/            — Plugin agents
assets/            — Plugin assets
fonts/             — Plugin fonts
hooks/             — Plugin hooks
preview/           — Preview files
scripts/           — Plugin scripts
skills/            — Plugin skills
src/               — Plugin source
ui_kits/           — UI kit components
uploads/           — Upload assets
CLAUDE.md          — Plugin claude config (3.5K)
colors_and_type.css — Token CSS (10.4K)
Ghost Components-bundle.html — Component bundle (34.5K)
Ghost Components.html — Component reference (34.5K)
Ghost ScrollText Demo.html — ScrollText demo (28.6K)
README.md          — Plugin README (13.5K)
SKILL.md           — Plugin skill definition (2.2K)
tweaks-panel.jsx   — Tweaks panel (18.6K)
```

O plugin é a fonte de verdade visual do Ghost System. O `Ghost ScrollText Demo.html` é diretamente relevante para a seção "O que me move".

---

## 5. Current Architecture Findings

### 5.1 Divergência Crítica: Stack de Animação

**O `active_state.md` declara migração GSAP completa em 2026-05-13. O código real usa `motion/react`.**

| Componente              | Import atual                            | Import esperado (v4)                   |
| ----------------------- | --------------------------------------- | -------------------------------------- |
| `BeliefBackground.tsx`  | `animate, inView` from `'motion'`       | `gsap`, `ScrollTrigger`                |
| `BeliefScrollText.tsx`  | `animate, inView` from `'motion'`       | `gsap`, `ScrollTrigger`                |
| `BeliefManifesto.tsx`   | `m, useTransform` from `'motion/react'` | `gsap`, `ScrollTrigger` com `onUpdate` |
| `BeliefFixedHeader.tsx` | `m, useTransform` from `'motion/react'` | `gsap`, `ScrollTrigger`                |
| `BeliefOverlay.tsx`     | `m, useTransform` from `'motion/react'` | `gsap`, `ScrollTrigger` com `scrub`    |

Isso contradiz diretamente o blueprint v4 §4.1 que proíbe: `motion`, `motion/react`, `animate()`, `inView()`, `useScroll()`.

**Hipótese:** a migração descrita no `active_state.md` foi documentada antecipadamente ou revertida durante o processo. O código auditado é o código real publicado.

### 5.2 `BeliefsScrollContextValue` — Tipo vs. Implementação

O tipo `beliefs.ts` declara `scrollYProgress: MotionValue<number>` (correto para o código atual com `motion/react`). O blueprint v4 (e `implementation_plan.md` de 2026-05-13) prescrevem migração para `{ get: () => number }` (ref-based getter). O `useBeliefsScroll.ts` atual ainda usa `useScroll()` do `motion/react`. Isto é consistente com o código atual mas inconsistente com o `active_state.md`.

### 5.3 Violações de Motion Rules (Ghost Design System)

O GDS proíbe `translateX` (`x`) em UI content e limita `translateY` a 18px. O código atual em `BeliefScrollText.tsx`:

- Usa `x: [enterX, 0]` onde `enterX = -100` (desktop) ou `-48` (mobile) — anima com `x`, que é **explicitamente proibido** pelo GDS §2.3.
- O blueprint específico da seção permite essa exceção: "Textos entram com `x: -100 → 0` desktop / `x: -48 → 0` mobile". Isso é uma **exceção local documentada no blueprint**, não uma violação.

**Conclusão:** a animação `x` no BeliefScrollText é permitida por exceção de blueprint, mas usa Motion DOM em vez de GSAP, contradizendo a v4.

### 5.4 `BeliefManifesto` — y-offset

Usa `y: [18, 18, 0]` via `useTransform`. O limite do GDS é 18px — está no limite exato, não acima. Sem violação de valor, mas a stack (Motion) está errada vs. v4.

### 5.5 `BeliefOverlay` — z-index Hardcoded

`BeliefOverlay.tsx` usa `beliefZIndex.overlay` corretamente no `style`. O plano de 2026-05-13 apontava que havia um literal `zIndex: 10` hardcoded. Na versão atual do código, o overlay usa `beliefZIndex.overlay` do token — este item **já foi corrigido**.

### 5.6 `BeliefScrollText` — font-weight

Usa `font-bold` no className do `<p>`. O blueprint v4 e o plano de 2026-05-13 (Frente B2) pedem `font-medium`. Esta divergência persiste.

### 5.7 GhostScene — `y` no entrance

`GhostScene.tsx` usa `y: useTransform(scrollYProgress, ..., [20, 0, 0, -20])`. O valor 20 excede o limite GDS de 18px. Adicionalmente, a entrada usa `motion/react`, inconsistente com a v4.

### 5.8 `useGLTF.preload`

O `GhostModel.tsx` não chama `useGLTF.preload()`. O blueprint v4 e o plano de 2026-05-13 (Frente C2) indicam que o preload deve estar ativo para evitar pop-in. **Não confirmado no código atual.**

### 5.9 `BELIEF_PHRASE_ITEMS` vs Contrato do Backend

O código atual usa `BELIEF_PHRASES` hardcoded em `beliefTokens.ts`. O walkthrough de 2026-05-02 menciona que "Section 06 phrase content now comes from `ABOUT_CONTENT.beliefs`". Isso não está refletido no `BeliefScrollText.tsx` atual. **Há um contrato pendente de verificação.**

### 5.10 Estrutura de Componentes — Status Real

| Componente               | Existe | Alinhado ao Blueprint                                 |
| ------------------------ | ------ | ----------------------------------------------------- |
| `AboutBeliefs.tsx`       | Sim    | Sim (orquestrador OK)                                 |
| `BeliefBackground.tsx`   | Sim    | Não (stack Motion, não GSAP)                          |
| `BeliefOverlay.tsx`      | Sim    | Parcialmente (Motion; z-index ok)                     |
| `BeliefFixedHeader.tsx`  | Sim    | Não (Motion, não GSAP; tipografia diverge)            |
| `BeliefScrollText.tsx`   | Sim    | Não (Motion, não GSAP; font-bold não font-medium)     |
| `BeliefManifesto.tsx`    | Sim    | Não (Motion, não GSAP; y=18 no limite)                |
| `SplitTextMotion.tsx`    | Sim    | Sim (utilitário agnóstico de stack)                   |
| `GhostScene.tsx`         | Sim    | Não (Motion; y=20 excede 18px)                        |
| `GhostModel.tsx`         | Sim    | Sim (GSAP-free; useFrame correto)                     |
| `GhostSceneFallback.tsx` | Sim    | Sim                                                   |
| `GhostErrorBoundary.tsx` | Sim    | Sim                                                   |
| `belief.constants.ts`    | Sim    | Parcialmente (re-exports de beliefTokens)             |
| `beliefTokens.ts`        | Sim    | Sim (paleta correta, stops corretos)                  |
| `useBeliefsScroll.ts`    | Sim    | Não (usa useScroll de motion/react; tipo MotionValue) |
| `types/beliefs.ts`       | Sim    | Não (MotionValue vs ref-getter do blueprint v4)       |

---

## 6. Target Architecture

```
AboutBeliefs (use client, orchestrator)
├── BeliefsScrollProvider (context)
│   ├── scrollYProgress: { get: () => number }  ← ref-based getter (blueprint v4)
│   ├── isMobile: boolean
│   ├── shouldReduceMotion: boolean
│   ├── activeIndex: number
│   └── isClimax: boolean
├── BeliefBackground        ← GSAP ScrollTrigger (backgroundColor, 1.5s, GSAP_GHOST_EASE)
├── BeliefOverlay           ← GSAP ScrollTrigger scrub (opacity, scrub: 0.85)
├── div.sticky.top-0.h-dvh
│   ├── BeliefFixedHeader   ← GSAP ScrollTrigger (autoAlpha, x: 60→0, word stagger)
│   ├── GhostScene (dynamic, ssr:false)
│   │   └── Canvas (frameloop=demand, dpr=[1,1|2])
│   │       ├── SceneInvalidator
│   │       └── GhostModel (useFrame, lerp, pointer/scroll parallax)
│   └── BeliefManifesto     ← GSAP ScrollTrigger onUpdate (range 0.82→0.92, y: 18→0)
└── BeliefScrollText        ← GSAP ScrollTrigger (x: offset→0, blur, font-medium)
```

**Stack de animação na seção:** exclusivamente GSAP + ScrollTrigger. Zero `motion/react`, `motion`, `animate()`, `inView()`, `useScroll()`.

---

## 7. Subagent Findings

### 7.1 Repository Architect

**Ordem de correção crítica (dependências):**

1. `src/types/beliefs.ts` — alterar tipo de `scrollYProgress` antes de qualquer outro arquivo
2. `src/hooks/useBeliefsScroll.ts` — migrar para ref-based getter (remove dependência `motion/react`)
3. `src/components/sobre/beliefs/BeliefsScrollContext.tsx` — atualizar tipo importado
4. `src/components/sobre/beliefs/BeliefBackground.tsx` — migrar para GSAP
5. `src/components/sobre/beliefs/BeliefOverlay.tsx` — migrar para GSAP
6. `src/components/sobre/beliefs/BeliefFixedHeader.tsx` — migrar para GSAP
7. `src/components/sobre/beliefs/BeliefScrollText.tsx` — migrar para GSAP + font-medium
8. `src/components/sobre/beliefs/BeliefManifesto.tsx` — migrar para GSAP
9. `src/components/sobre/sections/AboutBeliefs.tsx` — remover imports motion/react
10. `src/components/sobre/3d/GhostScene.tsx` — migrar entrada para GSAP; corrigir y max

**Acoplamento alto:** `useBeliefsScroll` → `BeliefsScrollContext` → todos os componentes beliefs. Qualquer mudança de tipo propaga para todos.

**Risco de ordem:** migrar um componente antes de atualizar o tipo quebra TypeScript em toda a cadeia.

**Ficheiros fora de escopo confirmados:** `src/config/beliefTokens.ts` (OK), `src/components/sobre/3d/GhostModel.tsx` (OK exceto preload).

### 7.2 Ghost Design System Guardian

**Tokens — Conformidade Atual:**

| Token               | Valor Esperado                                                                      | Valor Atual                                         | Status                   |
| ------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| Ghost Blue          | `#0048ff`                                                                           | `beliefColors.bluePrimary = '#0048ff'`              | OK                       |
| Background stops    | `['#040013','#0048ff','#8705f2','#f501d3','#0048ff','#8705f2','#f501d3','#040013']` | Idem em `BELIEF_BACKGROUND_STOPS`                   | OK                       |
| Easing global       | `[0.22, 1, 0.36, 1]`                                                                | `GHOST_EASE` em `motion.ts`                         | OK                       |
| Easing referência   | `[0.17, 0.55, 0.55, 1]`                                                             | `GHOST_EASE_AMBIENT` / `beliefMotion.referenceEase` | OK                       |
| z-index ghost       | `70`                                                                                | `MOTION_TOKENS.z.ghost` via `beliefZIndex.ghost`    | OK                       |
| z-index manifesto   | `50`                                                                                | `MOTION_TOKENS.z.manifesto`                         | OK                       |
| z-index fixedHeader | `30`                                                                                | `MOTION_TOKENS.z.header`                            | OK                       |
| Grid `.std-grid`    | N/A (seção é full-bleed por design)                                                 | Full-bleed confirmado                               | OK (exceção documentada) |

**Violação identificada:** `GhostScene.tsx` aplica `y: 20` na entrada do wrapper (Motion). Limite GDS é 18px. Correção: reduzir para 18 na migração GSAP.

**Silent Design:** animações atuais respeitam "respiração" — sem bounce, sem scale agressivo. Ghost floating (`Math.sin * 0.22`) está dentro do princípio.

**Cor de texto `BeliefScrollText`:** `beliefColors.blueAccent (#4fe6ff)` sobre fundos `#f501d3` (pink). Contraste ~2.3:1 — abaixo de AA (4.5:1). Mitigado por `textShadow: '0 2px 24px rgba(0,0,0,0.28)'`. Verificação visual necessária mas não bloqueante para aprovação.

### 7.3 Motion and Scroll Engineer

**Problemas identificados na stack atual (Motion DOM):**

1. `BeliefBackground`: usa `inView()` com `amount: 0.55` — funcionalmente correto mas não GSAP. A transição de cor via `animate()` é adequada mas o blueprint v4 específico prescreve `ScrollTrigger.create` com `onEnter/onEnterBack`.

2. `BeliefScrollText`: usa `inView()` com cleanup via return. O comportamento `enter/leave` está correto. Porém: usa `x: [enterX, 0]` — conforme exceção do blueprint. A migração para GSAP precisa preservar esse comportamento `onEnter/onLeave/onLeaveBack`.

3. `BeliefManifesto`: usa `useTransform` para `opacity` e `y` baseado em `scrollYProgress`. Range `[0.8, 0.82, 0.92, 0.96, 1.0]` está próximo do blueprint (que especifica `0.82→0.95`). Diferença: blueprint diz fade-out de 0.96→1.0, código tem 0.96→1.0 OK. A stagger de palavras via `AnimatePresence` + `isClimax` funciona mas é Motion.

4. `BeliefFixedHeader`: usa `useTransform` para `opacity` e `x`. O range `[0, 0.08]` para entrada e `[0.92, 0.98]` para saída é adequado.

5. `BeliefOverlay`: scrub contínuo via `useTransform` no `scrollYProgress`. Funcionalmente equivale ao `scrub: 0.85` do blueprint v4.

**`prefers-reduced-motion`:** todos os componentes têm guards via `shouldReduceMotion`. O `useMotionGate` em `useBeliefsScroll` é o ponto central. Comportamento correto.

**Scroll offset:** `['start end', 'end end']` em `useBeliefsScroll` — adequado para seção de 620vh.

### 7.4 R3F and WebGL Performance Engineer

**`GhostScene.tsx` — análise:**

- `frameloop="demand"`: correto. Evita 60fps contínuos.
- `dpr={isMobile ? [1, 1.2] : [1, 1.5]}`: adequado. Blueprint v4 especifica `[1, isMobile ? 1 : 2]`. Diferença mínima; `1.5` desktop vs `2` — menos custoso.
- `camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}`: alinhado ao blueprint.
- `SceneInvalidator`: implementado corretamente. Dispara `invalidate()` em `scroll` e `mousemove`.
- Luzes: 4 fontes (ambient, directional, 2 pointLights) — adequado para ghost material.
- `aria-hidden="true"` no Canvas: PRESENTE. GDS §4 atendido.
- `IntersectionObserver` em `SceneInvalidator`: para renderização quando fora da viewport.

**`GhostModel.tsx` — análise:**

- `useGLTF(MODEL_PATH)`: carrega do Supabase Storage. URL correta (confirmada no walkthrough de 2026-05-02).
- `useGLTF.preload()` **AUSENTE**: risco de pop-in visual. Adicionar em `GhostModel.tsx` ou em `layout.tsx`.
- `Merged` (drei): instâncias corretas.
- `useLayoutEffect` para materiais: correto (evita flash de material padrão).
- `useFrame` com lerp: `lerpAlpha = 0.08`. Suave. Snap no primeiro frame via `initialized.current`. Correto.
- `initialized.current` guard: evita ghost centrado no primeiro frame.
- Floating: `Math.sin(elapsedTime * 1.0) * 0.22` — desativado em reduced motion. Correto.
- Parallax: zerado em mobile e reduced motion. Correto.
- Clímax: `progress > 0.85` — alinhado com blueprint.
- `dispose` no unmount: **AUSENTE** no `GhostModel`. Blueprint v4 §6 especifica `disposeScene`. Risco de memory leak em navigate.

**Fallback:** `GhostSceneFallback` renderiza blur estático com `z-[var(--z-layer-3d)]`. OK.

**Error boundary:** `GhostErrorBoundary` presente no `AboutBeliefs`. OK.

**`useWebGLSupport`:** implementado, bloqueia Canvas se WebGL indisponível. OK.

### 7.5 Next.js and TypeScript Engineer

**App Router — boundary:**

- `AboutBeliefs.tsx`: `'use client'` OK.
- `GhostScene`: `dynamic(() => import(...), { ssr: false })`. OK.
- `page.tsx` de `/sobre`: Server Component. OK.

**TypeScript:**

- `BeliefsScrollContextValue.scrollYProgress: MotionValue<number>` — será `{ get: () => number }` pós-migração.
- `useGLTF` cast: `as unknown as GLTFResult` — aceitável (drie pattern).
- `animate(element as Element, { opacity: 1, x: 0 } as any)` em `BeliefScrollText` — `as any` é code smell mas aceitável por limitação do tipo do Motion DOM.
- `GhostSceneNodes.displayName`: OK.
- `context` no GhostModel como `createContext<any>(null)`: aceitável (Drei Merged pattern).

**Bundle — impacto da migração:**

- Remover `motion/react` de 5 componentes reduz bundle desta seção. GSAP já é dependência existente (`src/config/motion.ts` e outros componentes). A migração é reducionista em termos de bundle nesta seção.

**Build safety:** `ignoreBuildErrors: true` no `next.config.mjs`. Ainda assim, errors de tipo devem ser corrigidos.

**Dynamic import:** `GhostScene` com `ssr: false` — correto para R3F.

### 7.6 Firebase and Supabase Infrastructure Auditor

**Firebase Hosting (`firebase.json`):**

- Headers de cache para `.glb`: `Cache-Control: public, max-age=31536000, immutable`. Correto.
- Headers gerais (HSTS, X-Frame-Options, X-Content-Type-Options): presentes.
- O GLB do Ghost é servido do Supabase Storage (não do Firebase Hosting), portanto a config de cache do Firebase não se aplica ao GLB diretamente.

**Supabase Storage:**

- URL do GLB: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb`
- Confirmado `200` no walkthrough de 2026-05-02.
- Bucket é público (sem RLS para leitura). OK para asset estático.
- Cache no Supabase Storage: responde com headers padrão. O `next.config.mjs` tem `remotePatterns` para o host do Supabase.

**CSP (`next.config.mjs`):**

- `'wasm-unsafe-eval'` presente para Three.js/WebGL. OK.
- `connect-src` inclui o host Supabase. OK para GLB fetch.
- `img-src` e `media-src` incluem Supabase. OK.

**Env vars:** `.env` não auditado (correto — fora de escopo de segurança).

**Deploy target:** Firebase Hosting + Cloud Function (`us-central1`, Node 20 2nd Gen, 2GiB). Nenhuma mudança de config necessária para este plano.

### 7.7 Accessibility and QA Verifier

**A11y — status atual:**

| Critério                                              | Status                   | Evidência                                             |
| ----------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| `<section aria-labelledby="o-que-me-move-title">`     | OK                       | `AboutBeliefs.tsx` linha 38                           |
| `<h2 className="sr-only">` como label                 | OK                       | `AboutBeliefs.tsx` linha 46                           |
| `aria-hidden="true"` no Canvas                        | OK                       | `GhostScene.tsx` linha 85                             |
| `aria-hidden` no BackgroundDiv                        | OK                       | `BeliefBackground.tsx` linha 56                       |
| `aria-hidden` no BeliefOverlay                        | Ausente                  | Deve ser adicionado                                   |
| `aria-hidden={!isClimax}` no Manifesto                | OK                       | `BeliefManifesto.tsx` linha 50                        |
| `prefers-reduced-motion` guard                        | OK                       | `useMotionGate`, `shouldReduceMotion`                 |
| Foco não preso em sticky/fixed                        | OK                       | `pointer-events-none` em todas as camadas decorativas |
| Contraste `blueAccent` (#4fe6ff) sobre pink (#f501d3) | **Insuficiente (2.3:1)** | Mitigado por textShadow; revisar                      |
| `tabIndex` em elementos não interativos               | OK (ausente = correto)   | Camadas são `pointer-events-none`                     |
| `data-testid` para E2E                                | OK                       | Todos os testids presentes                            |

**Suíte E2E:**

- `test/e2e/about-beliefs.spec.ts`: 12 testes.
- Última execução documentada: 12/12 passing (2026-05-13).
- Risco: migração GSAP pode quebrar testes que dependem de Motion DOM. Os testes usam `data-testid` (agnósticos de stack) — risco baixo, mas requer re-execução após cada fase.

**Lighthouse:**

- SquirrelScan 96/100 Performance (documentado em `active_state.md`).
- CPU throttling para mobile: testar especificamente a seção beliefs (6 frases + R3F).

---

## 8. Affected Files

### Modificação obrigatória (migração GSAP):

| Arquivo                                              | Mudança                                                                 | Complexidade |
| ---------------------------------------------------- | ----------------------------------------------------------------------- | ------------ |
| `src/types/beliefs.ts`                               | `MotionValue<number>` → `{ get: () => number }`                         | Baixa        |
| `src/hooks/useBeliefsScroll.ts`                      | Remover `useScroll` Motion; usar `useScrollProgress` GSAP ou ref manual | Média        |
| `src/components/sobre/beliefs/BeliefBackground.tsx`  | Remover Motion DOM; implementar GSAP ScrollTrigger                      | Média        |
| `src/components/sobre/beliefs/BeliefOverlay.tsx`     | Remover `motion/react`; GSAP scrub                                      | Baixa        |
| `src/components/sobre/beliefs/BeliefFixedHeader.tsx` | Remover `motion/react`; GSAP com word stagger                           | Média        |
| `src/components/sobre/beliefs/BeliefScrollText.tsx`  | Remover Motion DOM; GSAP onEnter/onLeave; `font-medium`                 | Alta         |
| `src/components/sobre/beliefs/BeliefManifesto.tsx`   | Remover `motion/react`; GSAP onUpdate scrub                             | Alta         |
| `src/components/sobre/sections/AboutBeliefs.tsx`     | Remover imports motion; compat com ref-getter                           | Baixa        |
| `src/components/sobre/3d/GhostScene.tsx`             | Remover `motion/react`; entrada via GSAP; y max 18px                    | Média        |

### Modificação recomendada:

| Arquivo                                                 | Mudança                                                      | Complexidade |
| ------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| `src/components/sobre/3d/GhostModel.tsx`                | Adicionar `useGLTF.preload(MODEL_PATH)` + dispose no unmount | Baixa        |
| `src/components/sobre/beliefs/BeliefOverlay.tsx`        | Adicionar `aria-hidden="true"`                               | Baixa        |
| `src/components/sobre/beliefs/BeliefsScrollContext.tsx` | Atualizar tipo importado de `beliefs.ts`                     | Baixa        |

### Documentação:

| Arquivo                                                                          | Mudança                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md` | Já alinhado a GSAP (v4 pós-2026-05-13) — apenas confirmar sem alterar |
| `.context/active_state.md`                                                       | Atualizar para refletir o estado real pós-execução                    |

---

## 9. Dependency and Risk Map

```
types/beliefs.ts
    ↓ (tipo scrollYProgress)
useBeliefsScroll.ts
    ↓ (expõe scrollYProgress e outros valores)
BeliefsScrollContext.tsx
    ↓ (providencia contexto)
├── BeliefBackground.tsx    [GSAP]
├── BeliefOverlay.tsx       [GSAP]
├── BeliefFixedHeader.tsx   [GSAP + SplitTextMotion]
├── BeliefScrollText.tsx    [GSAP]
├── BeliefManifesto.tsx     [GSAP + SplitTextMotion]
└── GhostScene.tsx          [GSAP wrapper + R3F Canvas]
         ↓
    GhostModel.tsx          [useFrame, lerp, GSAP-free]
```

**Riscos:**

| ID  | Risco                                                                               | Probabilidade | Impacto | Mitigação                                                                                               |
| --- | ----------------------------------------------------------------------------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| R1  | Migração GSAP quebra comportamento visual vs. Motion                                | Média         | Alto    | Gravar screencast antes/depois; E2E visual                                                              |
| R2  | `useScroll` Motion → ref-based muda timing de `isClimax`/`activeIndex`              | Baixa         | Médio   | Testar scroll rápido e lento                                                                            |
| R3  | GSAP `ScrollTrigger` não limpa corretamente → memory leak                           | Baixa         | Médio   | `ctx.revert()` em todos os `useEffect` returns                                                          |
| R4  | `useGLTF.preload` pode impactar tempo de carregamento inicial                       | Baixa         | Baixo   | Preload em `layout.tsx` para carregar em paralelo                                                       |
| R5  | `font-medium` em `BeliefScrollText` altera layout e quebra screenshot E2E           | Baixa         | Baixo   | Atualizar screenshots de referência E2E                                                                 |
| R6  | Migração em partes deixa componentes mistos (Motion + GSAP) em produção transitória | Alta          | Médio   | Migrar todos os componentes em uma sessão, commit único                                                 |
| R7  | `SplitTextMotion` usa `motion.span` internamente                                    | Alta          | Médio   | Manter SplitTextMotion como está (render-only); GSAP anima via seletor `[data-split-item]` externamente |

---

## 10. Proposed Phases

### Phase 0 — Baseline Audit (concluída neste documento)

- Ler todos os arquivos afetados
- Mapear divergências código vs. blueprint
- Confirmar que `active_state.md` está desatualizado
- Produzir este plano e `task.md`

### Phase 1 — Type and Hook Alignment

**Escopo:** `types/beliefs.ts`, `hooks/useBeliefsScroll.ts`, `beliefs/BeliefsScrollContext.tsx`

Objetivo: estabelecer o contrato de tipo correto (`{ get: () => number }`) antes de qualquer componente ser migrado. Sem essa base, TypeScript sinalizará erros em cascata durante as fases seguintes.

Implementação de `useBeliefsScroll` sem `motion/react`:

- Usar `window.addEventListener('scroll', ...)` ou `useRef` com `IntersectionObserver`
- Calcular `scrollYProgress` manualmente via `getBoundingClientRect`
- Manter `activeIndex` e `isClimax` via `useState` + scroll listener

### Phase 2 — Motion System Correction (Background + Overlay)

**Escopo:** `BeliefBackground.tsx`, `BeliefOverlay.tsx`

Objetivo: migrar as duas camadas passivas para GSAP. São as mais simples porque não têm split text.

- `BeliefBackground`: `gsap.context` com `ScrollTrigger.create` por `[data-belief-section]`. `duration: 1.5`, `GSAP_GHOST_EASE`.
- `BeliefOverlay`: `gsap.to(overlay, { keyframes, scrollTrigger: { scrub: 0.85 } })`. Adicionar `aria-hidden="true"`.

### Phase 3 — Motion System Correction (Header + ScrollText + Manifesto)

**Escopo:** `BeliefFixedHeader.tsx`, `BeliefScrollText.tsx`, `BeliefManifesto.tsx`

Objetivo: migrar os três componentes com texto animado. Maior complexidade por envolverem `SplitTextMotion`.

- `BeliefFixedHeader`: GSAP com `autoAlpha`, `x`, word stagger via `[data-split-item]`.
- `BeliefScrollText`: GSAP `onEnter/onLeave/onLeaveBack` por frase. `font-medium`. Preservar `x` como exceção do blueprint. Manter `blur(6px)` como especificado na v4.
- `BeliefManifesto`: GSAP `ScrollTrigger` com `onUpdate`. Range `progress 0.82→0.92`. Word stagger via `[data-split-item]`.

### Phase 4 — Ghost 3D Correction

**Escopo:** `GhostScene.tsx`, `GhostModel.tsx`

Objetivo: migrar entrada do wrapper para GSAP; corrigir `y` para máximo 18px; adicionar preload e dispose.

- `GhostScene`: remover `motion/react`; entrada via `gsap.set` + `ScrollTrigger once:true`.
- `GhostModel`: adicionar `useGLTF.preload(MODEL_PATH)` (colocar fora do componente, no módulo). Adicionar `useEffect` de cleanup com dispose de geometrias e materiais.

### Phase 5 — Accessibility and Reduced Motion

**Escopo:** todos os componentes migrados

Verificar:

- `aria-hidden` em BeliefOverlay
- `prefers-reduced-motion` guards em todos os tweens GSAP (via `gsap.set` + `{ duration: 0.2, ease: 'none' }`)
- Contraste do texto cyan sobre pink — medir e documentar
- Teste com VoiceOver/NVDA via Playwright

### Phase 6 — Documentation and Walkthrough

**Escopo:** `.context/active_state.md`, `02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md`, `walkthrough.md` novo

Criar `walkthrough.md` conforme especificado no plano.

---

## 11. Rollback Strategy

**Git:** cada fase é um commit atômico. Rollback via `git revert <hash>` por fase.

**Ordem de rollback segura:**

1. Fase 6 (docs) — sem impacto em runtime
2. Fase 5 (a11y) — sem impacto em comportamento
3. Fase 4 (Ghost) — independente das fases 2/3
4. Fase 3 (Header/ScrollText/Manifesto) — reverte 3 componentes
5. Fase 2 (Background/Overlay) — reverte 2 componentes
6. Fase 1 (tipos e hook) — reverte contrato de tipo; reabilita Motion em todos

**Sem cherry-pick de commits parciais.** Se uma fase falhar, reverter completamente essa fase antes de tentar novamente.

---

## 12. Validation Plan

Após cada fase:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Após Phase 3 e Phase 4:

```bash
pnpm test
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium
pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --grep "reduced motion"
```

Validação visual obrigatória após Phase 3:

- Scroll desktop: frases entram da esquerda, background muda por capítulo, header fixo visível
- Scroll mobile: frases centralizadas no rodapé, Ghost top-left
- Climax: manifesto revela, Ghost centraliza, background volta ao void
- Reduced motion: sem translações, apenas fade rápido
- CPU throttling (6x): medir FPS no scroll

---

## 13. Acceptance Criteria

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

---

## 14. Approval Gate

**Nenhuma implementação será iniciada até resposta humana explícita: `Aprovado` ou `Proceed`.**

Este documento é READ-ONLY até aprovação.
