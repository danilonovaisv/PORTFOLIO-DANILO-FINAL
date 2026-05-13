# Implementation Plan — 06-O-QUE-ME-MOVE

> **Branch:** `claude/analyze-feature-spec-EjCDs`
> **Data:** 2026-05-13
> **Origem:** `/plan-feature [06-O-QUE-ME-MOVE]`
> **Substitui:** plano de 2026-04-24 (obsoleto após migração GSAP de 2026-05-13)
> **Escopo aprovado pelo usuário:**
>
> 1. Sincronizar doc v4 ↔ código (resolver doc-drift)
> 2. Alinhar tipografia ao mockup INICIAL/FINAL
> 3. Incorporar análise da pasta `ABOUT-BIEFS-DETALAHAMENTO/`

---

## 1. Estado Atual da Implementação

Seção implementada e estável (deploy 2026-05-13). Inventário:

| Camada       | Arquivo                                                                     | Status                                       |
| ------------ | --------------------------------------------------------------------------- | -------------------------------------------- |
| Rota         | `src/app/sobre/{page,loading,error,not-found}.tsx`                          | ✅ Completa                                  |
| Orquestrador | `src/components/sobre/sections/AboutBeliefs.tsx`                            | ✅ Provider + camadas                        |
| Context      | `src/components/sobre/beliefs/BeliefsScrollContext.tsx`                     | ✅ Ativo                                     |
| Hook         | `src/hooks/useBeliefsScroll.ts`                                             | ✅ Ref-based getter (anti-rerender)          |
| Tokens       | `src/config/beliefTokens.ts`                                                | ✅ SSOT consolidada                          |
| Background   | `src/components/sobre/beliefs/BeliefBackground.tsx`                         | ✅ GSAP ScrollTrigger (não Motion DOM)       |
| Overlay      | `src/components/sobre/beliefs/BeliefOverlay.tsx`                            | ⚠️ `zIndex: 10` hardcoded                    |
| Header       | `src/components/sobre/beliefs/BeliefFixedHeader.tsx`                        | ⚠️ Tipografia diverge da prosa v4            |
| Scroll Text  | `src/components/sobre/beliefs/BeliefScrollText.tsx`                         | ⚠️ Peso `bold` vs mockup `medium`            |
| Manifesto    | `src/components/sobre/beliefs/BeliefManifesto.tsx`                          | ✅ GSAP + SplitTextMotion                    |
| Split        | `src/components/sobre/beliefs/SplitTextMotion.tsx`                          | ✅ Util reutilizável                         |
| Ghost Scene  | `src/components/sobre/3d/{GhostScene,GhostModel,Fallback,ErrorBoundary}.tsx` | ✅ Stack completa                            |

## 2. Conflitos Identificados e Resolução Arbitrada

### CF-1 · Stack de animação (Motion DOM × GSAP)

- **Doc v4** prescreve Motion DOM `animate() + inView()`, "não usar GSAP nesta seção".
- **Código** usa GSAP+ScrollTrigger em todas as camadas, migração concluída 2026-05-13.
- **Resolução:** manter GSAP. Atualizar v4 para refletir GSAP como stack oficial. Reverter custaria re-escrita de cinco componentes estáveis sem ganho visível ao usuário.

### CF-2 · `scrollYProgress` (MotionValue × ref-getter)

- **Doc v4** documenta `MotionValue<number>` via `useScroll()`.
- **Código** usa `{ get: () => progressRef.current }` para evitar re-renders.
- **Resolução:** manter ref-getter. Documentar contrato no v4 e atualizar tipo do `BeliefsScrollContextValue.scrollYProgress` para `{ get: () => number }`.

### CF-3 · Composição mobile (row × layered)

- **`ABOUT-BIEFS-DETALAHAMENTO/SPEC_AboutBeliefs.md`** (2025) pede mobile com `ghost-esquerda + texto-direita` em row, Ghost alinhado verticalmente ao centro do bloco de texto.
- **Doc v4** posiciona Ghost `top-left até clímax`, layered.
- **Código** usa Ghost `fixed inset-0`, texto rotativo `flex items-end justify-center` no rodapé.
- **Mockup `06-O-QUE-ME-MOVE-MOBILE-INICIAL.png`** confirma layered (Ghost à esquerda do meio, header sticky no topo direita, frase rotativa no rodapé).
- **Resolução:** descartar regra "row" do detalhamento (superada). Adotar layered conforme código e v4. Validar mobile baseline do Ghost (top-left) conforme v4 §6.

### CF-4 · Tipografia do `BeliefFixedHeader`

- **Doc v4** descreve linha 1 e linha 2 como texto editorial medium.
- **Mockup DESKTOP/MOBILE-INICIAL** mostra linha 1 em ALL CAPS, font-display, font-black, leading-tight; linha 2 menor, regular.
- **Código atual** já está alinhado ao mockup (font-display black uppercase, linha 2 menor) — divergência é apenas com a prosa da v4.
- **Resolução:** atualizar v4 para refletir tipografia do mockup; manter código.

### CF-5 · Tipografia do `BeliefScrollText`

- **`SPEC_AboutBeliefs.md`** pede `font-weight: 500`, 32–38px desktop / 22–26px mobile.
- **Doc v4** pede bold italic, `clamp(2.8rem, 5.8vw, 6.3rem)` (~45–100px).
- **Mockup DESKTOP-INICIAL** mostra italic, peso aparente medium (não bold), ~80px.
- **Resolução:** reduzir `font-bold` → `font-medium` no `BeliefScrollText` (alinhar com mockup e detalhamento). Manter clamp atual (v4) que preserva presença visual.

### CF-6 · `BeliefOverlay` z-index hardcoded

- **Código:** `style={{ zIndex: 10 }}`.
- **Tokens:** `beliefZIndex.overlay` disponível.
- **Resolução:** substituir literal pelo token.

### CF-7 · Duração do background

- **Doc v4:** `duration: 0.9`.
- **Código:** `duration: 1.5` (mais atmosférico, alinhado com a decisão "Atmospheric Layer" do active_state.md).
- **Resolução:** manter 1.5, atualizar v4.

### CF-8 · Atmospheric SVG noise

- **`active_state.md`** menciona "Atmospheric SVG fractal noise" adicionado.
- **Doc v4** não menciona.
- **`BeliefBackground.tsx` atual** não contém SVG noise visível — a camada pode ter sido removida em refactor posterior.
- **Resolução:** investigação na Frente C; se ausente, atualizar `active_state.md`; se presente, documentar em v4.

## 3. Frentes de Trabalho

### Frente A · Sincronizar doc v4 (doc-drift)

**Arquivo único:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md`

Mudanças necessárias:

- §`mapa_de_animacoes` Stack: Motion DOM → **GSAP + ScrollTrigger**.
- §1 Background: snippet `inView()` → `ScrollTrigger.create()` com `onEnter`/`onEnterBack`/`onLeaveBack`. `duration: 1.5`. Anti-banding via overlay com `scrub`.
- §3 BeliefFixedHeader: tipografia ajustada à mockup (font-display black uppercase + linha 2 menor regular). Animação via `gsap.to` com `autoAlpha`/`x`/`stagger`.
- §4 BeliefScrollText: `font-medium italic` (não bold). Manter clamps. Animação `ScrollTrigger` com `onEnter/onLeave/onLeaveBack`.
- §4.1 Renomear "Motion" → "Animation library policy: GSAP+ScrollTrigger".
- §5 Manifesto: GSAP `ScrollTrigger` com `onUpdate` no range `0.82→0.92`, words via `[data-split-item]`.
- §6 Ghost 3D: documentar `frameloop="demand"`, `SceneInvalidator`, dispose no unmount, `useWebGLSupport` fallback.
- §`arquitetura_recomendada`: `BeliefsScrollContextValue.scrollYProgress` ajustado para `{ get: () => number }`.
- §`design_tokens`: ratificar valores já presentes em `beliefTokens.ts`.
- §`riscos_e_validacoes`: remover risco "GSAP proibido"; adicionar nota sobre `gsap.context().revert()` para cleanup determinístico.
- Se Atmospheric SVG noise existir no código (verificação Frente C), adicionar nova subseção §1.1.

**Critério de aceitação:** ler v4 + abrir um arquivo do código deve produzir descrições casadas em stack, durações, easing e estrutura.

### Frente B · Alinhar tipografia ao mockup

Mudanças mínimas e localizadas no código:

- **B1 · `BeliefFixedHeader.tsx`**
  - Já em font-display black uppercase para linha 1 ✅
  - Validar linha 2: `text-[clamp(0.82rem,2.7vw,0.98rem)] font-medium` deve cair em duas linhas alinhada à direita, conforme mockup
  - Validar `pt-[13vh]` mobile contra `MOBILE-INICIAL.png` (header no topo direita logo abaixo da safe-area)

- **B2 · `BeliefScrollText.tsx`**
  - Trocar `font-bold` → `font-medium` (peso 500)
  - Manter `italic`, `leading-[0.9]`, `tracking-[-0.045em]`, `color: blueAccent` ✅
  - Manter clamps atuais ✅
  - Calibrar `textShadow`: hoje `0 2px 24px rgba(0,0,0,0.28)` — em fundos magenta/pink pode aumentar mancha; reduzir para `0 1px 12px rgba(0,0,0,0.18)` se contraste AA mantido sem ele

- **B3 · `BeliefManifesto.tsx`**
  - Já cumpre `font-display font-black uppercase leading-[0.82] tracking-[0.03em]` ✅
  - `clamp(3.5rem, 16vw, 12rem)` ✅
  - Validar mockup `DESKTOP-FINAL.jpg`: Ghost sobrepõe a palavra `GHOST` exige `z-index ghost(70) > z-index manifesto(50)` ✅

- **B4 · `BeliefOverlay.tsx`**
  - Substituir literal `zIndex: 10` por `beliefZIndex.overlay`

**Critério de aceitação:** screenshot E2E lado-a-lado entre `/sobre` e os PNGs (`DESKTOP-INICIAL.jpg`, `DESKTOP-FINAL.jpg`, `MOBILE-INICIAL.png`, `MOBILE-FINAL.png`) com diff visual ≤ 5%.

### Frente C · Verificação técnica auxiliar

- **C1 · GLB URL:** confirmar `src/components/sobre/3d/GhostModel.tsx` aponta para `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb`. Se diferente (ex.: helper `getAssetUrl`), garantir resolução final idêntica.
- **C2 · `useGLTF.preload`:** confirmar preload ativo para evitar pop-in.
- **C3 · Atmospheric SVG noise:** localizar a camada (se existir) e documentar; senão, sincronizar `active_state.md`.
- **C4 · `data-testid` estáveis:** confirmar que `beliefs-section`, `beliefs-background`, `beliefs-scroll-text`, `belief-phrase`, `beliefs-manifesto`, `beliefs-ghost-scene` continuam presentes (suíte E2E depende).

**Critério de aceitação:** `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` passa 12/12 sem alteração de specs.

## 4. Delegação por Subagente

| Subagente / Skill         | Frente     | Responsabilidade direta                                                                                                  |
| ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| **@ghost_architect**      | A          | Reescrever `06-O-QUE-ME-MOVE-v4.md` para refletir GSAP, ref-based context, durações reais, tipografia mockup-aligned     |
| **@spectral_artist**      | B1, B2, B3 | Ajustar `font-medium` em `BeliefScrollText`, calibrar `textShadow`, validar pixel-parity contra os 4 PNGs                |
| **@motion_choreographer** | C2         | Verificar `useGLTF.preload`, conferir `frameloop="demand"`, validar cleanup `gsap.context().revert()` em todos os hooks  |
| **@audit_sentinel**       | B4, C4     | Substituir `zIndex` hardcoded por token; rodar `pnpm test:e2e about-beliefs`, `pnpm run build-check`; gerar evidência    |
| **(orchestrator)**        | C1, C3     | Confirmar URL Supabase do GLB; localizar/documentar camada SVG noise; sincronizar `active_state.md` ao fim               |

### Checklist obrigatório de acessibilidade

Ausente nas specs originais — adicionado pela restrição do `/plan-feature`:

- [ ] `aria-labelledby="o-que-me-move-title"` na `<section>` (já presente)
- [ ] `aria-hidden="true"` no `<Canvas>` Ghost (regra DS §4)
- [ ] `aria-live="polite"` no manifesto apenas quando ativo (já presente, gate via `active || isClimax`)
- [ ] Foco do teclado nunca preso em camada sticky/fixed
- [ ] `prefers-reduced-motion`: floating, parallax, blur removidos; durações ≤ 0.3s (já implementado)
- [ ] Contraste AA do `blueAccent` (#4fe6ff) sobre `pinkDetails` (#f501d3) precisa medição — usar `textShadow` se < 4.5:1
- [ ] `tabIndex` não definido em elementos sem ação interativa
- [ ] Skip-link `/sobre` aponta para `<main id="main-content">` (validar em `page.tsx`)

## 5. Critérios de Sucesso Globais

1. Doc `06-O-QUE-ME-MOVE-v4.md` descreve o código real sem mentiras de stack ou durações.
2. Quatro mockups (DESKTOP/MOBILE × INICIAL/FINAL) renderizados pelo browser em diff visual ≤ 5%.
3. Zero novos erros em `pnpm run typecheck`, `pnpm run lint`, `pnpm run build`.
4. Suíte E2E `about-beliefs.spec.ts` passa 12/12.
5. `active_state.md` reflete a nova versão da seção e remove qualquer débito de doc-drift.
6. FPS médio no scroll permanece > 50 desktop, > 40 mobile.

## 6. Riscos e Suposições

- **R1:** Mockup INICIAL/FINAL representa estados "clímax" da animação, não estado de descanso. A frase rotativa do mockup pode ser estado congelado no momento de entrada. Confirmar antes de mudar pesos tipográficos.
- **R2:** `font-medium` pode perder presença em backgrounds vibrantes (pink/magenta). Validar com screenshot real antes do merge.
- **R3:** Substituir `zIndex: 10` por token só é seguro se `MOTION_TOKENS.z.overlay === 10`. Validar antes.
- **R4:** O detalhamento cita "Morphing Text" para o manifesto; o código usa `SplitTextMotion` por palavras com GSAP stagger. Decisão: tratar "morphing" como descrição visual genérica, não exigir plugin. Caso o cliente esperasse efeito morph real, este plano não cobre.

---

**Status:** Plano pronto para validação humana. Após aprovação, frentes A, B e C podem ser executadas em paralelo pelos subagentes listados.
