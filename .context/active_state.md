# Active State: MANIFESTO CAROUSEL & WEBGL SHADER REALIGNMENT ✅

**Phase**: MANIFESTO CAROUSEL & WEBGL SHADER REALIGNMENT
**Current Focus**: Alinhamento do Manifesto "O que me move" na página `/sobre` (e rota `/o-que-me-move`) com a referência HTML: pulsing gradient Three.js fragment shader pixelado + transições CSS scoped stagger por caractere + dots tácteis + autoplay robusto + acessibilidade WCAG.
**Last Update**: 2026-05-19 02:15
**Production URL**: https://portfolio-danilo-novais.web.app
**Cloud Function**: https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app

## Deploy Summary

- **Build**: ✅ Next.js 16.2.6 (Webpack) — Stable production build completed
- **Manifesto**: ✅ Integrated `ManifestoScrollSection` on `/sobre` and `/o-que-me-move` routes
- **WebGL**: ✅ Realigned procedural gradient fragment shader (Blue/Purple/Blue) in `shader-lines.tsx`
- **Validation**: ✅ 100% stable `build-check` and `build` under absolute Node v26 and pnpm resolution path
- **Visual Regressions**: ✅ Resolved background shader invisible stacking context and closing video unmounting buffering failures

## Manifesto Carousel & WebGL Pulsing Shader Realignment (2026-05-19)

- [x] **SSOT Confirmed**: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-EXEMPLO.html` adotado como contrato visual e matemático absolutio para a seção 06.
- [x] **Pulsing Fragment Shader**: `ShaderLines` (`src/components/ui/shader-lines.tsx`) estendido para renderizar o ciclo dinâmico Azul -> Roxo -> Azul pixelado sobre fundo Void Black (`#040013`), preservando compatibilidade com a home.
- [x] **Static h-dvh Viewport**: Substituído o container de rolagem vertical global de `400vh` por um frame estático de `100vh`, evitando quebras de rolagem e maximizando fluidez em dispositivos de toque.
- [x] **CSS Scoped Letters Stagger**: Transições de letras animadas via GPU em CSS puro (`@keyframes charReveal` e `charExit`) com desfoque e translação vertical coordenada.
- [x] **Autoplay and Dot Indicators**: Temporizador robusto de 4500ms com transição de largura em progresso nos dots. A navegação táctil pelos dots cancela o autoplay anterior de forma segura.
- [x] **WCAG Accessibility Standards**: Inserido elemento oculto `aria-live="polite"` para anúncio das frases limpas a leitores de tela, com `aria-hidden="true"` ocultando os spans visuais.
- [x] **Motion Preferences Fallback**: Desativação dinâmica de animações e blur se a flag `prefers-reduced-motion: reduce` for ativada no SO do usuário.
- [x] **Visual Regressions Resolved**:
  - Shader de fundo em `ManifestoScrollSection.tsx` corrigido de `-z-50` para `z-0` para evitar ocultação sob o background opaco do contêiner `relative` da seção.
  - Vídeo de encerramento em `AboutClosing.tsx` estabilizado e tornado incondicional (removendo `hasVideoError`), garantindo fallback visual nativo do `poster` HTML5 e conformidade com acessibilidade.
- [x] **Validation Evidence**:
  - `PATH="/Users/danilonovais/.local/bin:$PATH" npx pnpm run build-check` ✅ **Exit Code 0** (Typecheck e Linter sem erros).
  - `npx pnpm run build` ✅ **Exit Code 0** (Geração estática completa com fallback resiliente de sitemap/Supabase).

## AboutBeliefs Final Redesign (2026-05-18)

> Superseded 2026-05-19 by `Manifesto Carousel & WebGL Pulsing Shader Realignment`: a seção foi restabelecida com WebGL Three.js shader background e animação stagger por caractere estática para paridade total com o HTML de referência.

## Header & Fluid Navigation Experience (2026-05-17)

- [x] **MotionLink Integration**: Criado o componente `MotionLink.tsx` em `src/components/motion/` utilizando Framer Motion e `Link` do Next.js.
- [x] **DesktopFluidHeader Dynamic Tracking**: Refatorado `DesktopFluidHeader.tsx` para adotar `MotionLink`. As transições de rotas ativas agora utilizam animações de fade in suaves coordenadas pelo layout-id do Framer Motion, evitando o piscar de tela e otimizando a experiência fluida do usuário em desktop.
- [x] **Git Cleanliness and Hygiene**: Removidos do controle do repositório arquivos temporários de auditoria como `knip_report.txt`, logs `.txt` de typecheck, e relatórios semanais que poluíam a raiz da árvore Git.
- [x] **Validation Evidence**:
  - `git commit` ✅ Concluído.
  - Testes e builds pendentes de `pnpm install` local no ambiente do usuário (isolado da rede na sandbox).

## Text Layout Recomposition (2026-05-17)

> Superseded 2026-05-18 by `AboutBeliefs Final Redesign`: header/manifesto/Ghost geometry no longer represents the active section-06 render tree.

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

> Superseded 2026-05-18 by `06-O-QUE-ME-MOVE-FINAL.md`: `beliefs-ghost-scene`, manifesto and provider contracts are historical, not current acceptance criteria.

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

> Superseded 2026-05-18: section 06 no longer uses GSAP orchestration.

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

> Superseded 2026-05-18: `beliefs-ghost-scene` and Ghost/manifesto z-index contracts no longer apply to active `AboutBeliefs`.

- [x] **Animation Contracts**: Added `data-animation-contract="viewport-x-opacity"` to `BeliefScrollText`.
- [x] **DOM Stability**: Consolidated `beliefs-ghost-scene` test ID into static wrapper in `BeliefsSection`.
- [x] **Z-Index Governance**: Aligned layer hierarchy (Ghost: 70, Manifesto: 50).
- [x] **SSR Integrity**: Ensured test IDs are present on first render.

## Beliefs Section Agent Manager Pass (2026-05-04)

> Superseded 2026-05-18: WebGL fallback evidence remains historical; active section 06 does not mount WebGL.

- [x] **Background Contract** (superseded 2026-05-13): originally documented as Motion `animate() + inView()` with `GHOST_EASE_AMBIENT`; migrated to GSAP `ScrollTrigger` with `GSAP_GHOST_EASE` and `duration: 1.5s` in the May 13 hardening pass.
- [x] **Tokens SSOT**: `src/config/beliefTokens.ts` centralizes palette, header lines, phrases and manifesto lines.
- [x] **Reduced Motion**: Local media query prevents first-render hydration drift while preserving simple fades.
- [x] **WebGL Fallback**: `GhostScene` checks WebGL support before mounting `<Canvas>`.
- [x] **E2E Evidence**: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` passed `12/12`.
- [x] **Release Gates**: `pnpm run typecheck`, `pnpm run lint`, and `pnpm run build` passed locally.

## Beliefs Section Editorial Hardening (2026-05-07)

> Superseded 2026-05-18: active stack is Motion `useScroll/useTransform` plus CSS fixed shade, not GSAP.

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

> Superseded 2026-05-18: `BeliefsScrollProvider` and unified context are preserved as historical code paths only, not mounted by `AboutBeliefs`.

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

## Asset-Sync + Diagnostics (2026-05-18)

- [x] **`public/test.txt` removido**: Lixo de repositório eliminado.
- [x] **RLS Fix aplicado**: Policy `memory_select` em `prompt_memory_context` corrigida com `(SELECT auth.uid())` para evitar re-avaliação por linha (migration `fix_rls_initplan_prompt_memory_context`).
- [x] **Posters placeholder corrigidos** em `brand.ts` e `site-assets.tsx` — `undefined` em vez de `404.webp`; browser renderiza primeiro frame do vídeo.
- [x] **Orphans removidos**: `DynamicAssetVideo.tsx`, `media-selector.ts`, `image-loader.ts` (sem importadores).
- [x] **Fontes Manrope legadas removidas** de `public/fonts/` (15 arquivos de peso fixo) — `VariableFont_wght.woff2` mantido e em uso.
- [x] **`public/privacy-policy.htm` removido** — substituído pela rota `/privacidade`.
- [x] **`public/assets/3d/bar-v2.glb` removido** — sem referências no código.
- [x] **PNGs duplicados removidos** — `showcase/Branding-Project.png`, `Key-Visual.png` (versões .webp ativas).
- [x] **`MotionLink.tsx` TSC fix**: conflito `onDrag`/`onAnimationStart` entre React HTML e Framer Motion resolvido via `CollidingHandlers Omit` + cast JSX.
- [x] **Typecheck**: `tsc --noEmit` → **exit 0, zero erros**.
- [x] **Commit**: `779c92582` — chore: asset-sync & diagnostics hygiene pass.
- [ ] **Habilitar Leaked Password Protection** no Supabase Dashboard [REQUIRES HUMAN REVIEW].
- [ ] **Split arquivos > 500L**: `template-schema.ts` (886L), `ProjectForm.tsx` (848L) — próximo ciclo.
