# Ghost 3D Brightness and Portfolio Hero Full Bleed Walkthrough

## Root Cause

Ghost 3D brightness drift was caused by production/runtime quality paths being able to bypass post-processing. `usePerformanceAdaptive()` disabled post-processing for `medium` quality, and `medium` is reachable on high-DPR desktop screens. Because Bloom only renders through the composer path, Ghost could appear flatter after deploy even when the scene itself loaded.

The portfolio hero was already full bleed at the section level, but the implementation had two mismatches:

- docs said `object-cover`, while code used `object-contain`;
- the mobile title could exceed the viewport because the words stayed in one row inside the heading.

The video side preservation issue is not solved by forcing `cover`; `cover` would crop by design. The fix keeps `contain` so CSS does not cut the video laterals.

## Decisions

- Keep `GhostSceneWrapper` as `dynamic(..., { ssr: false })`.
- Set `renderer.outputColorSpace = THREE.SRGBColorSpace`.
- Keep `THREE.ACESFilmicToneMapping`.
- Keep post-processing enabled on desktop `medium` quality, but reduce DPR to `1.25`.
- Keep `low` quality without post-processing for low-end/mobile protection.
- Raise Ghost emissive/Bloom/exposure values conservatively inside Ghost Blue/Cyan identity.
- Keep portfolio hero `fitPolicy: 'contain'` to avoid CSS side crop.
- Add `objectPosition="center center"` support to `ResponsiveVideo`.
- Stack `/portfolio` hero title on mobile so text no longer clips at 390px.

## Files Changed

- `src/hooks/usePerformanceAdaptive.ts`
- `src/components/canvas/home/hero/hooks/useGhostScene.ts`
- `src/components/canvas/home/hero/hooks/useGhostParams.ts`
- `src/components/portfolio/PortfolioHeroNew.tsx`
- `src/components/ui/shared/ResponsiveVideo.tsx`
- `test/unit/hooks/usePerformanceAdaptive.test.ts`
- `test/components/portfolio/PortfolioHeroNew.test.tsx`
- `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/02-HERO/02-HERO.md`
- `.context/active_state.md`

## Evidence

Baseline:

- `evidence/baseline-home-desktop.png`
- `evidence/baseline-metrics.json`

Production local after build:

- `evidence/prod-fixed-home-desktop.png`
- `evidence/prod-fixed-portfolio-desktop.png`
- `evidence/prod-fixed-portfolio-mobile.png`
- `evidence/prod-fixed-metrics.json`

Firebase preview:

- URL: `https://portfolio-danilo-novais--codex-ghost-portfolio-hero-08f82fzk.web.app`
- `evidence/preview-home-desktop.png`
- `evidence/preview-portfolio-desktop.png`
- `evidence/preview-portfolio-mobile.png`
- `evidence/preview-metrics.json`

Key metrics:

- `/portfolio` desktop: `heroRect.left=0`, `heroRect.right=1440`, `videoCount=1`, desktop MP4 selected, `objectFit=contain`.
- `/portfolio` mobile: `heroRect.left=0`, `heroRect.right=390`, `videoCount=1`, mobile MP4 selected, `objectFit=contain`.
- `/` production local: Ghost canvas exists, `canvasPostProcessing=true`, `canvasOutputColorSpace=srgb`, `canvasToneMapping=aces-filmic`.
- `/` Firebase preview: Ghost canvas exists, `canvasPostProcessing=true`, `canvasOutputColorSpace=srgb`, `canvasToneMapping=aces-filmic`.

Validation commands:

```bash
pnpm exec jest test/unit/hooks/usePerformanceAdaptive.test.ts test/components/portfolio/PortfolioHeroNew.test.tsx --runInBand
pnpm run lint
pnpm run build
pnpm run typecheck
```

Results:

- Jest: `2 passed`, `9 tests passed`
- Lint: exit code 0
- Build: exit code 0
- Typecheck: exit code 0

## Preview Status

Firebase Hosting preview was deployed to `codex-ghost-portfolio-hero`, expiring on `2026-05-29`.

Important caveat: Firebase's webframeworks deploy path also updated the SSR Cloud Function `ssrportfoliodanilonovai` while creating the preview channel. No explicit production Hosting release was requested, but the framework function update is a shared remote side effect of this Firebase preview flow.

Local production validation was completed with `.next/standalone` after copying `.next/static` and `public` into the standalone folder for accurate asset serving.

## PR Recovery Note

This branch was opened after the local merge to restore Pull Request traceability. The Ghost glow and portfolio hero files were verified on `origin/main` before this PR branch was created.

## Remaining Risks

- The portfolio hero source video itself contains frames where campaign cards are partially outside the composition. CSS now preserves the video frame with `contain`; changing to `cover` would crop more, not less.
- Bloom tuning increases visual intensity and GPU cost. Desktop `medium` lowers DPR to offset that cost; mobile/low-end still avoids post-processing.
- Local validation ran under Node `v26.0.0` with engine warnings because `package.json` wants Node `22`. Commands passed despite warnings.
- Firebase predeploy still reports 42 pre-existing broken asset links in `src/config/site-assets.json`, including legacy Ghost/3D and older portfolio media paths. The current critical portfolio hero videos returned HTTP 200.
