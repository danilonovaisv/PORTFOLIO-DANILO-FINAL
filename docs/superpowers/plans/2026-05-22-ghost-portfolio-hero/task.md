# Ghost 3D Brightness and Portfolio Hero Full Bleed Task List

Status: planning only. No code implementation before approval.

## Agents

- `orchestrator`: sequencing, risk control, final walkthrough
- `spectral-artist`: Three.js renderer, emissive material, Bloom, tone mapping
- `frontend-specialist`: `/portfolio` full bleed, Tailwind, responsive video wrapper
- `qa.verifier`: lint/build, dev-vs-build screenshots, preview evidence

## Dependencies

- Approval phrase: `Aprovado` or `Proceed`
- Local env able to run `pnpm`
- Preview validation target selected after approval: Firebase preview or Vercel, depending available CLI/auth
- No production deploy unless Danilo explicitly approves it later

## Task 1 — Baseline Diagnosis

Owner: `orchestrator`

Estimate: 45 minutes

Depends on: approval

- [ ] Read `src/hooks/usePerformanceAdaptive.ts`.
- [ ] Read `src/components/canvas/home/hero/hooks/useGhostScene.ts`.
- [ ] Read `src/components/canvas/home/hero/hooks/useGhostParams.ts`.
- [ ] Read `src/components/canvas/home/hero/hooks/useGhostAnimate.ts`.
- [ ] Read `src/components/portfolio/PortfolioHeroNew.tsx`.
- [ ] Read `src/components/ui/shared/ResponsiveVideo.tsx`.
- [ ] Read `src/lib/video-assets.ts`.
- [ ] Capture current dev screenshot for `/` desktop.
- [ ] Capture current dev screenshot for `/portfolio` desktop.
- [ ] Capture current dev screenshot for `/portfolio` mobile.

Acceptance:

- Baseline confirms whether Bloom disappears because `enablePostProcessing` is false.
- Baseline confirms whether portfolio issue is crop, letterbox, wrong source, or wrapper width.
- No source code changed.

## Task 2 — Ghost Renderer Consistency Patch

Owner: `spectral-artist`

Estimate: 45 minutes

Depends on: Task 1

- [ ] In `src/components/canvas/home/hero/hooks/useGhostScene.ts`, set `renderer.outputColorSpace = THREE.SRGBColorSpace`.
- [ ] Keep `THREE.ACESFilmicToneMapping` unless baseline proves it causes visible dimming.
- [ ] Verify composer includes `RenderPass`, `UnrealBloomPass`, analog `ShaderPass`, and `OutputPass`.
- [ ] Ensure resize updates renderer, composer, and Bloom resolution.
- [ ] Add minimal runtime evidence if needed through DOM `data-*`, not console spam.

Acceptance:

- Renderer color space explicit.
- Composer path still works.
- No red identity color introduced.
- No mobile WebGL expansion introduced.

## Task 3 — Ghost Bloom Quality Patch

Owner: `spectral-artist`

Estimate: 45 minutes

Depends on: Task 2

- [ ] In `src/hooks/usePerformanceAdaptive.ts`, allow post-processing for `medium` desktop if baseline shows deploy devices hit medium.
- [ ] Keep `low.enablePostProcessing = false`.
- [ ] Cap medium pixel ratio to `1.25` if Bloom is enabled.
- [ ] In `src/components/canvas/home/hero/hooks/useGhostParams.ts`, tune only if renderer consistency is insufficient.
- [ ] Use candidate values conservatively: `emissiveIntensity: 2.4`, `pulseIntensity: 0.16`, `bloomStrength: 0.55`, `bloomThreshold: 0.65`, `exposure: 1.05`.

Acceptance:

- Ghost glow visible in production build screenshot.
- FPS target remains above 50 on desktop.
- Low-end/mobile path remains protected.

## Task 4 — Portfolio Hero Full Bleed Patch

Owner: `frontend-specialist`

Estimate: 45 minutes

Depends on: Task 1

- [ ] In `src/components/portfolio/PortfolioHeroNew.tsx`, preserve `left-1/2 w-screen -translate-x-1/2 overflow-hidden`.
- [ ] Add `max-w-none` and `min-h-[100svh]` if screenshot shows viewport/gutter drift.
- [ ] Remove duplicate `object-contain` from consumer if `ResponsiveVideo` owns object fit.
- [ ] Set video class to `h-full w-full min-w-full max-w-none`.
- [ ] Add explicit `objectPosition="center center"` if shared component supports it.

Acceptance:

- Hero first section touches left and right viewport edges on desktop and mobile.
- One hero video element exists.
- No parent `max-w-[1680px]` limits first viewport.

## Task 5 — Responsive Video Fit Decision

Owner: `frontend-specialist`

Estimate: 45 minutes

Depends on: Task 4

- [ ] In `src/components/ui/shared/ResponsiveVideo.tsx`, add `objectPosition` prop only if needed.
- [ ] In `src/lib/video-assets.ts`, keep `portfolioHero.fitPolicy = 'contain'` if source side preservation is priority.
- [ ] Change to `cover` only if screenshot proves full bleed is more important and crop is acceptable.
- [ ] If desktop/mobile require different behavior, change type to breakpoint-aware fit policy.
- [ ] Update `test/components/portfolio/PortfolioHeroNew.test.tsx` mock expectations.

Acceptance:

- Laterais do vídeo não são cortadas indevidamente.
- Full bleed remains real.
- Responsive source selection still uses browser `<source media>`.

## Task 6 — Tests and Build Validation

Owner: `qa.verifier`

Estimate: 1 hour

Depends on: Tasks 2-5

- [ ] Run `pnpm exec jest test/components/portfolio/PortfolioHeroNew.test.tsx --runInBand`.
- [ ] Run `pnpm run lint`.
- [ ] Run `pnpm run build`.
- [ ] Record exact pass/fail output.
- [ ] If build fails due unrelated pre-existing dirty/env issue, separate blocker from code regression.

Acceptance:

- Targeted Jest passes.
- Lint passes.
- Build passes, or blocker documented with exact command/error.

## Task 7 — Visual Regression Evidence

Owner: `qa.verifier`

Estimate: 1 hour

Depends on: Task 6

- [ ] Capture dev `/` desktop screenshot after patch.
- [ ] Capture production-build `/` desktop screenshot after patch.
- [ ] Capture dev `/portfolio` desktop screenshot after patch.
- [ ] Capture production-build `/portfolio` desktop screenshot after patch.
- [ ] Capture dev `/portfolio` mobile screenshot after patch.
- [ ] Capture production-build `/portfolio` mobile screenshot after patch.
- [ ] Compare Ghost brightness before/after.
- [ ] Compare hero edge contact and video side crop before/after.

Acceptance:

- Ghost keeps glow after build.
- Bloom visible and consistent.
- Portfolio hero full bleed true.
- Video side content not unintentionally removed.

## Task 8 — Preview Validation

Owner: `qa.verifier`

Estimate: 1 hour

Depends on: Task 7

- [ ] Use approved preview route only.
- [ ] If Firebase preview/deploy command is approved, run preview path only.
- [ ] If Vercel preview is required, first install/auth CLI or document blocker because `vercel` CLI is not installed.
- [ ] Capture preview `/` desktop screenshot.
- [ ] Capture preview `/portfolio` desktop/mobile screenshots.
- [ ] Check browser console for renderer, CORS, video, GLB, and post-processing errors.

Acceptance:

- Local build and preview match.
- No production deploy performed.
- Preview URL and evidence recorded.

## Task 9 — Context and Walkthrough

Owner: `orchestrator`

Estimate: 45 minutes

Depends on: Task 8

- [ ] Update `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/02-HERO/02-HERO.md` with final video fit/full-bleed decision.
- [ ] Update `.context/active_state.md` with Ghost 3D production glow status.
- [ ] Create `docs/superpowers/plans/2026-05-22-ghost-portfolio-hero/walkthrough.md`.
- [ ] Include cause root, decisions, files changed, evidence, next risks.

Acceptance:

- SSOT updated after code.
- Walkthrough contains validation evidence.
- Remaining risks explicit.

## Approval Gate

Stop now.

Implementation begins only after:

```txt
Aprovado
```

or

```txt
Proceed
```
