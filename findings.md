# Findings

## 2026-04-30

- Started verification of the proposed `implementation_plan.md` and `task.md` against the real `beliefs` implementation.
- Initial file scan confirms `src/components/sobre/sections/beliefs/` exists with `BeliefsSection.tsx`, `BeliefSection.tsx`, `BeliefFixedHeader.tsx`, `BeliefManifesto.tsx`, `BeliefBackground.tsx`, `BeliefScrollText.tsx`, `BeliefOverlay.tsx`, and `3d/` files including `GhostCanvasClient.tsx`, `GhostFallback.tsx`, and `GhostErrorBoundary.tsx`.
- Existing worktree has unrelated changes in `next-env.d.ts`, `public/build-info.json`, `src/components/portfolio/ProjectsGallery.tsx`, plus untracked `QWEN.md`; these are excluded from the audit.
- `BeliefsSection.tsx` is still a client component and owns the entire 600vh sticky section. The pasted plan is correct that the client boundary is broad, but this is architectural cleanup rather than a proven functional failure.
- `useBeliefsScroll.ts` is implemented and uses `motion/react` `useScroll` with `offset: ['start start', 'end end']`; it also updates the Zustand store with `prefersReducedMotion` and mobile state.
- `beliefStore.ts` does not contain explicit phase state. It stores `scrollProgress`, `ghostIntensity`, `isMobile`, `prefersReducedMotion`, and `bgColor`.
- `BeliefFixedHeader.tsx` has reduced-motion handling for blur and Y movement. Opacity remains motion-driven, which is acceptable for reduced motion in most cases.
- `BeliefBackground.tsx` accepts `prefersReducedMotion`, but `BeliefsSection.tsx` does not pass it. Result: the background color interpolation is not actually disabled in reduced-motion mode.
- `BeliefManifesto.tsx` does not use character-level SplitText. It renders three visual line spans inside a paragraph marked `aria-hidden="true"` and gives the parent `blockquote` an `aria-label`. This prevents character-by-character screen reader output, but the visible text is not exposed as normal semantic text and is not a heading.
- `BeliefScrollText.tsx` is scroll-range driven by phrase segments, not by named phases. It does disable transform and blur under reduced motion while keeping opacity transitions.
- `GhostCanvasClient.tsx` already uses `next/dynamic` with `ssr: false` and a `GhostFallback` loading component.
- `GhostCanvas.tsx` already uses `Canvas frameloop="demand"`, adaptive DPR (`[1, isMobile ? 1 : 1.5]`), WebGL capability detection, local/static fallbacks, and material/geometry disposal on cloned scene cleanup.
- Context7 for `/pmndrs/react-three-fiber` confirms `frameloop="demand"` is the documented on-demand rendering approach, and `useFrame` runs on rendered frames. Therefore the current time-based float in `useFrame` will only advance when frames are invalidated by scroll/mouse/spring changes, unless continuous invalidation is intentionally added.
- Mobile gesture conflict risk is lower than the pasted audit suggests because all Ghost scene wrappers and canvas containers are `pointer-events-none`, and there are no `OrbitControls` or canvas pointer handlers. Real-device validation is still useful, but the code does not currently intercept scroll gestures.
- Root `implementation_plan.md` and `task.md` are more conservative than the pasted plan: they tell the worker to audit existing `GhostCanvasClient`, fallbacks, reduced motion hooks, and route boundaries instead of blindly creating them.
- `docs/superpowers/plans/2026-04-29-about-codex-audit-fix-remediation.md` records that the prior audit was already partially implemented: current code now includes dynamic `GhostCanvasClient`, `GhostFallback`, `useWebGLAvailable`, `frameloop="demand"`, DPR limiting, and `GhostErrorBoundary`.
- Current line references: `BeliefsSection.tsx:72` omits `prefersReducedMotion` for `BeliefBackground`; `BeliefsSection.tsx:88-91` wraps dynamic `GhostCanvasClient` at z-70; `BeliefManifesto.tsx:47-58` uses z-50 and aria-label; `GhostCanvas.tsx:228-245` configures DPR, `frameloop="demand"`, and WebGL attributes.
- Static validation passed: targeted ESLint on the beliefs section files completed successfully, and `pnpm run typecheck` completed successfully.
- E2E validation `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` failed: 15 passed, 1 failed. The failing case is `/sobre` mobile header positioning; expected top <= 160, received ~6877.58. The isolated `/o-que-me-move` route passed the same mobile contract.
- E2E logs still include Motion warnings about a non-static scroll container and Three/WebGL warnings, including one `unhandledRejection: Error creating WebGL context` message during the WebGL fallback simulation despite the fallback assertion passing.
- `/sobre` renders `AboutBeliefs` after several prior sections inside `src/app/sobre/page.tsx`, while `/o-que-me-move` renders the same section directly. This explains why route-integrated scroll behavior can diverge from the isolated route and must be tested separately.
- Corrections applied: `BeliefsSection.tsx` now passes `prefersReducedMotion` into `BeliefBackground`, so background color interpolation can freeze in reduced-motion mode.
- Corrections applied: global/body and isolated route horizontal overflow changed from `overflow-x: hidden` to `overflow-x: clip`, preventing horizontal clipping from creating an overflow ancestor that breaks `position: sticky`.
- Corrections applied: `BeliefScrollText.tsx` now uses responsive CSS for mobile text alignment instead of depending only on Zustand `isMobile`, and it forces `transform: none` through Motion's `transformTemplate` in reduced motion.
- Corrections applied: `useBeliefsScroll.ts` now uses the project canonical reduced-motion hook and also syncs mobile state on `resize`, not only on media query `change`.
- Test hardening applied: `about-beliefs.spec.ts` re-anchors the section after route layout settles, polls reduced-motion style until the media state propagates, re-anchors before the mobile geometry assertion, and isolates the WebGL-unavailable test from the Canvas mounted by `beforeEach`.
- Final E2E validation: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` passed 16/16. Runtime still logs non-fatal Motion scroll-container warnings and Three `Clock` deprecation warnings.

## 2026-04-05

- `AboutBeliefs` usa `useScroll({ offset: ['start end', 'end end'] })` no container principal.
- Com a seção alinhada ao topo da viewport, o progresso global já entra avançado, o que explica o skip da intro.
- `BeliefSection` usa timeline local independente via `useScroll`, quebrando sincronização com background/overlay.
- `BeliefFixedHeader` usa múltiplos `MorphText` com ranges estreitos; na entrada auditada as linhas ficaram com opacidade residual.
- O Ghost 3D monta no DOM, mas o recorte visual da área do canvas fica vazio.
- O renderer específico de `src/components/sobre/3d/GhostModel.tsx` diverge do renderer estável em `src/components/shared/3d/GhostModel.tsx`.
