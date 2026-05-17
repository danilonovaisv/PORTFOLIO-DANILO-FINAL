# Active State: ABOUT BELIEFS ORCHESTRATION ✅

**Phase**: O QUE ME MOVE — ORCHESTRATION FINALIZATION
**Current Focus**: Recomposei a geometria da sessão `O QUE ME MOVE` para o layout aprovado do snippet, preservando GSAP/R3F, contratos E2E e a hierarquia Ghost System.
**Last Update**: 2026-05-17 12:20
**Production URL**: https://portfolio-danilo-novais.web.app
**Cloud Function**: https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app

## Deploy Summary

- **Build**: ✅ Next.js 16.2.4 (Webpack) — Stable production build completed
- **Status**: ✅ Resolved CSS Parsing Error (wildcard collision)
- **Function**: ✅ `ssrportfoliodanilonovai` (us-central1) — Node 20 2nd Gen
- **Hosting**: Ready for deployment to `portfolio-danilo-novais`

## Text Layout Recomposition (2026-05-17)

- [x] **Stage Geometry Realigned**: `BeliefFixedHeader`, `BeliefScrollText` e `BeliefManifesto` agora seguem a composição aprovada para desktop/mobile.
- [x] **Layout SSOT Extended**: `src/config/beliefTokens.ts` concentra anchors, larguras, escalas e `clamp()` da sessão.
- [x] **Ghost Anchor Declared**: `GhostScene.tsx` expõe `data-belief-ghost-anchor` e `GhostModel.tsx` consome anchors/tamanhos derivados do token layer.
- [x] **Manifesto Width Contract**: o bloco final passou a expor `data-testid="beliefs-manifesto-copy"` e mantém `GHOST` destacado em `bluePrimary`.
- [x] **E2E Geometry Coverage**: `test/e2e/about-beliefs.spec.ts` agora valida alinhamento top-right do header, frase fixa por breakpoint e largura útil do manifesto final.
- [ ] **Validation Evidence**:
  - `pnpm run typecheck`
  - `pnpm run lint`
  - `pnpm run build`
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5005 pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`

## Orchestration Finalization (2026-05-16)

- [x] **Type Contract Preserved**: `BeliefsScrollContextValue` remains on `scrollYProgress: { get: () => number }`.
- [x] **Zero Motion in Section Scope**: `SplitTextMotion.tsx` no longer imports `motion/react`; `beliefs/*` + `GhostScene.tsx` are free of Motion DOM helpers.
- [x] **Ghost DOM Stability**: `AboutBeliefs.tsx` now exposes a static `beliefs-ghost-scene` wrapper with `z-index: 70`, preserving SSR-visible test hooks.
- [x] **Manifesto Visibility Fix**: manifesto spans now render white in the verified runtime path.
- [x] **GhostModel Hardening**: `useGLTF.preload(MODEL_PATH)` is client-gated and dispose cleanup clears geometries/materials plus the Drei loader cache on unmount.
- [x] **E2E Contract Reconciled**: phrase selectors now expose both `data-belief-phrase` and the legacy E2E hooks `data-testid="belief-phrase"` + `data-animation-contract="viewport-x-opacity"`.
- [x] **Validation Evidence**:
  - `pnpm run typecheck` ✅
  - `pnpm run lint` ✅
  - `pnpm run build` ✅
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5005 pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` ✅ `9 passed`
- [x] **Environment Note**: verification was executed under Node `v26.0.0` / pnpm `11.1.2`; the repo still declares Node `22`, and the CLI emitted only engine warnings during validation.

## GSAP Final Migration (2026-05-13)

- [x] **Zero Framer Motion**: Removed `framer-motion` dependencies from `AboutBeliefs`, `GhostScene`, `GhostModel`, `useBeliefsScroll`, and `usePointerParallax`.
- [x] **GSAP Orchestration**: Consolidated all scroll-driven animations (`BeliefBackground`, `BeliefScrollText`, `BeliefManifesto`, `BeliefOverlay`) into modular GSAP ScrollTrigger implementations.
- [x] **Performance Optimization**:
  - Migrated `scrollYProgress` to a simple ref-based getter interface to avoid unnecessary React re-renders.
  - Implemented `SceneInvalidator` for efficient `frameloop="demand"` rendering in R3F.
  - Optimized `useBeliefsScroll` to update state only when active index or climax status actually changes.
- [x] **Ghost Scene Stabilized**:
  - Re-implemented entrance animations using `gsap.fromTo` for consistent "WOW" effect.
  - Pointer parallax now uses raw normalized coordinates, with smoothing handled internally by the 3D model's lerp logic.
- [x] **Script Fixes**: Corrected relative import paths in `scripts/test-urls.ts` for build stability.
- [x] **TSC Verification**: Passed `pnpm run typecheck` after fixing script imports and updating belief types.

## Beliefs Section Hardening (2026-05-03)

- [x] **Animation Contracts**: Added `data-animation-contract="viewport-x-opacity"` to `BeliefScrollText`.
- [x] **DOM Stability**: Consolidated `beliefs-ghost-scene` test ID into static wrapper in `BeliefsSection`.
- [x] **Z-Index Governance**: Aligned layer hierarchy (Ghost: 70, Manifesto: 50).
- [x] **SSR Integrity**: Ensured test IDs are present on first render.

## Beliefs Section Agent Manager Pass (2026-05-04)

- [x] **Background Contract** (superseded 2026-05-13): originally documented as Motion `animate() + inView()` with `GHOST_EASE_AMBIENT`; migrated to GSAP `ScrollTrigger` with `GSAP_GHOST_EASE` and `duration: 1.5s` in the May 13 hardening pass.
- [x] **Tokens SSOT**: `src/config/beliefTokens.ts` centralizes palette, header lines, phrases and manifesto lines.
- [x] **Reduced Motion**: Local media query prevents first-render hydration drift while preserving simple fades.
- [x] **WebGL Fallback**: `GhostScene` checks WebGL support before mounting `<Canvas>`.
- [x] **E2E Evidence**: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` passed `12/12`.
- [x] **Release Gates**: `pnpm run typecheck`, `pnpm run lint`, and `pnpm run build` passed locally.

## Beliefs Section Editorial Hardening (2026-05-07)

- [x] **GSAP Integration**: Migrated from Framer Motion to GSAP + ScrollTrigger for ultra-smooth scrubbing (`1.2s`).
- [x] **Granular Word Reveal**: Implemented word-by-word reveal with opacity, scale, and blur for an "Editorial Minimalism" feel.
- [x] **Ghost Palette Audit**: Corrected color stops to eliminate purple/violet surfaces. Core colors: Deep Void (#040013) and Ghost Blue (#0048ff).
- [x] **Hygiene & Performance**: Removed unused code in 3D and Scroll components. `will-change` optimized for 60FPS.
- [x] **Documentation Sync**: Updated `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` to reflect the new architecture.

## Recent Achievements

- [x] **Master Audit Completed**: System Sanitized.
- [x] **Architecture Unified**: `src/lib/utils.ts` is the single utility source.
- [x] **Identity Aligned**: Blue Ghost (#0048ff) confirmed.
- [x] **Fullstack Config Audit**: Firebase Headers & Supabase RLS verified.
- [x] **SquirrelScan Audit**: 98/100 Global, Security 100/100, Performance 96/100.
- [x] **global-error.tsx**: Fixed with `<html>/<body>` wrapper (Next.js requirement).
- [x] **privacy-policy redirect**: Implemented 308 redirect to `/privacidade`.
- [x] **template.tsx reduced motion**: Added `useMotionGate()` check.
- [x] **Portfolio meta title**: Fixed short title (25 → 47 chars).
- [x] **Privacidade link dedup**: Unified "contato" links to `/contato`.
- [x] **Admin Security**: `requireAdminAccess` confirmed in all Server Actions.
- [x] **Modal A11y**: Tab trap, ESC, focus return verified.
- [x] **3D Asset Loading Fix**: Resolved 400 error by bypassing Supabase Image Transformation for `.glb`/`.gltf` files.

## DS Remediation Phase 1 (2026-04-21)

- [x] **Z-Layer Governance**: 18-token scale in globals.css `@theme`. DS §1.3 expanded to v3.2.
  - Migrated 9 raw `z-[nnn]` literals → `z-[var(--z-layer-id)]` tokens (fixed wildcard collision in build)
  - Resolved CSS Parsing Error: removed `z-layer-*` strings from `.context` and `test` files that were being mis-scanned by Tailwind v4.
  - Added Playwright regression guard `test/e2e/design-system/z-stack.spec.ts` (sanitized)
- [x] **Motion Sanctioning**: Added `GHOST_EASE_AMBIENT` [0.17, 0.55, 0.55, 1]; documented in DS §2.1
  - Eliminated 6 inline easing tuples in `sobre/beliefs/*` → sanctioned constants
  - `GHOST_EASE_SOFT` fully documented in DS
- [x] **Hex → Token Refactor**: Added abyss gradient tokens (`--color-abyss-start`, `--color-abyss-mid`)
  - ALPARenderer, MasterProjectTemplate, ProjectTemplateMasterRenderer, ProjectsGallery, AdaptiveMediaLayout, MobileMenuPanel, BeliefScrollText migrated
  - Runtime `mixHex()` WebGL inputs retained as hex (cannot accept CSS vars)
- [x] **Grid Compliance**: Home + Sobre sections audited — all content sections use `.std-grid`/`Container`. Full-bleed hero/belief scenes intentionally exempt.
- [x] **Gate Green**: lint 0 errors (3 pre-existing warnings), tsc --noEmit pass, jest 246/246 pass

## Active Constraints

- **Zero Config**: Do not add new env vars without validation.
- **Zero Jank**: WebGL performance is the priority.
- **Node Runtime**: ✅ **Node 22 ativo** — `firebase.json`, `package.json` (raiz) e `functions/package.json` atualizados.

## Editorial Hardening Phase (2026-05-11)

- [x] **Motion SSOT**: Atualizada escala de offsets para [8, 12, 18, 24] em `motion.ts`.
- [x] **Hero Hydration**: Implementado guard de `isMounted` em `HeroCopy.tsx` para evitar drift no SSR.
- [x] **Animation Integrity**: Corrigida propriedade `translateY` para `y` no Hero.
- [x] **Admin Hygiene**: Sanitizada interface do `LegacyBlockEditor.tsx` e adicionada documentação de depreciação.

## Beliefs System Consolidation (2026-05-11)

- [x] **Context Unification**: Consolidated `BeliefsScrollProvider` and `BeliefsScrollContext` into a single high-performance source of truth.
- [x] **State Orchestration**: Refactored `AboutBeliefs.tsx` to manage scroll progress, climax detection, and device-specific flags natively via Framer Motion.
- [x] **Build Integrity**: Resolved `baseUrl` deprecation in `tsconfig.json` by updating `ignoreDeprecations` to `6.0`.
- [x] **TSC Verification**: `pnpm run typecheck` passed successfully with zero errors.
- [x] **Architectural Hygiene**: Removed redundant provider file and updated all consumers (`BeliefManifesto`, `BeliefScrollText`, `GhostScene`, etc.) to the unified context.

## Weekly Cleanup & Optimization (2026-05-13) ✅

- [x] **TypeCheck Limpo**: `pnpm run typecheck` passou com **exit code 0** — zero erros TypeScript.
- [x] **Dependency Pruning**: Removidas `@dataconnect/*`, `@radix-ui/react-label`, `pg` e `@types/pg` (já ausentes do `package.json`).
- [x] **Orphan Component Cleanup**: Deletados `AdminPageHeader.tsx`, `TemplateBadge.tsx`, `AssetInteractive.tsx`, e `BlockTextMd.tsx`.
- [x] **Legacy Logic Removal**:
  - Deletados `src/store/beliefStore.ts`, `src/config/beliefs.ts`, e `src/lib/server-env.ts`.
  - Removida rota órfã `src/app/(sobre)/o-que-me-move`.
  - Deletadas pastas geradas `src/dataconnect-generated` e `functions/next_build/src/dataconnect-generated`.
- [x] **Motion.ts Restaurado**:
  - Adicionados exports ausentes: `viewportConfig`, `ghostFade`, `ghostRevealSimple`.
  - `ghostTransition` convertido de objeto constante para função com suporte a `delay` e `duration`.
- [x] **shuffle-projects.ts Criado**: Módulo `@/lib/portfolio/shuffle-projects` restaurado com `shuffleHomeProjects`, `shufflePortfolioProjects` e aliases de compatibilidade.
- [x] **label.tsx Migrado**: Removida dependência `@radix-ui/react-label`; componente agora usa `<label>` nativo com mesma API.

## Next Steps

1. 🏗️ **Build Validation**: Execute `pnpm run build` para confirmar integridade total do bundle após as limpezas.
2. 🎨 **Motion Consolidation (Ciclo 3)**: Refatorar `src/config/beliefTokens.ts` para importar easing curves diretamente de `@/config/motion`.
3. 🔍 **Knip Audit**: Rodar `pnpm run knip` para identificar exports mortos remanescentes em `animated-backgrounds.ts` e `PortfolioModal.tsx`.
4. ⚠️ **Pendente**: Versionar `public/site.assets/3d/ghost.glb` com hash/versão (performance médio).
5. 📊 **Monitoramento**: Lighthouse CI após próximo deploy.
