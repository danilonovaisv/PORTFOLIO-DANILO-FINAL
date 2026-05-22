# Ghost 3D Brightness and Portfolio Hero Full Bleed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task after approval. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Ghost 3D glow/Bloom consistent in production and make `/portfolio` hero start as true full bleed without unintended video side crop.

**Architecture:** Keep current client-only Ghost canvas boundary and shared video primitive. Fix renderer/post-processing determinism in the Ghost scene first, then adjust portfolio hero framing with explicit viewport-level sizing and breakpoint-aware fit policy. Validate through local dev, production build, and preview screenshots before declaring done.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Three.js, native video, Supabase Storage, Firebase/Vercel preview flows, pnpm.

---

## Planning Gate

Status: planning only.

Do not modify production code, run build, run preview deploy, or deploy production until Danilo replies:

```txt
Aprovado
```

or

```txt
Proceed
```

## Orchestration Route

Required workflow after approval: `/orchestrate`.

Agent routing:

- Primary: `orchestrator`
- Supporting: `spectral-artist` for Three.js glow, renderer, Bloom, emissive material
- Supporting: `frontend-specialist` for `/portfolio` hero full bleed, Tailwind, responsive video fit
- Supporting: `qa.verifier` for build, dev/build visual diff, preview validation

Current Codex session has no active `Task` tool exposed, so execution should use inline `superpowers:executing-plans` unless a fresh session exposes subagent dispatch.

## Facts Verified Before Planning

- Required docs checked:
  - `docs/MASTER_GUIDE.md`
  - `.context/knowledge/KI-005-Asset-Map.md`
  - `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/02-HERO/02-HERO.md`
  - `.context/GHOST-DESIGN-SYSTEM.md`
  - Ghost Design plugin `README.md`
- Actual stack differs from prompt snapshot:
  - `package.json` uses `next@16.2.6`, `react@19.2.6`, `tailwindcss@4.3.0`, `three@0.184.0`.
  - Use repo truth, not prompt snapshot.
- Dirty worktree exists before this plan:
  - `.github/workflows/firebase-deploy.yml`
  - `next-env.d.ts`
  - `package.json`
  - `pnpm-lock.yaml`
  - `public/build-info.json`
  These are pre-existing and must not be reverted.
- Ghost canvas boundary exists and is SSR-disabled:
  - `src/components/canvas/home/hero/GhostSceneWrapper.tsx`
  - dynamic import with `{ ssr: false }`
- Ghost renderer/post-processing lives in:
  - `src/components/canvas/home/hero/hooks/useGhostScene.ts`
  - `src/components/canvas/home/hero/hooks/useGhostParams.ts`
  - `src/components/canvas/home/hero/hooks/useGhostAnimate.ts`
  - `src/hooks/usePerformanceAdaptive.ts`
- `/portfolio` hero lives in:
  - `src/components/portfolio/PortfolioHeroNew.tsx`
  - `src/components/ui/shared/ResponsiveVideo.tsx`
  - `src/lib/video-assets.ts`
- Portfolio hero doc already states desired behavior:
  - `section#portfolio-hero` should use `w-screen left-1/2 -translate-x-1/2`.
  - Video should occupy viewport width to page edges.

## Probable Root Causes

### Ghost 3D Loses Glow After Deploy

Most likely cause: production/runtime quality path disables post-processing on common devices.

Evidence:

- `usePerformanceAdaptive.ts` sets `enablePostProcessing: false` for `medium` and `low`.
- `medium` is triggered when `window.devicePixelRatio > 2`.
- `low` is triggered for mobile, low CPU, or low memory.
- `useGhostAnimate.ts` renders through `composer.render()` only when `performanceConfig.enablePostProcessing && composer`.
- Bloom exists in `useGhostScene.ts`, but Bloom is skipped whenever post-processing is disabled.

Secondary likely causes:

- `renderer.outputColorSpace` is not explicitly set. Three.js defaults can drift across versions, renderer paths, or post-processing output behavior.
- `renderer.toneMapping = THREE.ACESFilmicToneMapping` and `toneMappingExposure = 0.95` are set, but the scene uses very dark `bodyColor: 0x040013`, low `ambientLightIntensity: 0.05`, modest `emissiveIntensity: 1.8`, and high `bloomThreshold: 0.85`.
- Bloom is intentionally subtle: `bloomStrength: 0.35`, `bloomRadius: 1.1`, `bloomThreshold: 0.85`. This is fragile when tone mapping/output color changes.
- `OutputPass` exists, but no runtime assertion proves composer passes remain active in production.

Less likely, but must be checked:

- EffectComposer imports from `three/examples/jsm/...` tree-shaken or transformed differently in production.
- Supabase GLB/textures CORS/MIME/cache. Current home Ghost scene is procedural, but asset map includes `about.beliefs.ghost-transformed -> about/beliefs/ghost.glb`; verify target scene before blaming storage.

### Portfolio Hero Video Cuts Sides / Does Not Read Full Bleed

Most likely cause: hero section is full viewport, but video fit/framing is not explicitly tied to visual acceptance.

Evidence:

- `PortfolioHeroNew.tsx` section already uses `relative left-1/2 h-screen w-screen -translate-x-1/2 overflow-hidden`.
- `ResponsiveVideo` maps `fitPolicy` to `object-contain` or `object-cover`.
- `RESPONSIVE_VIDEOS.portfolioHero.fitPolicy` is currently `'contain'`.
- `PortfolioHeroNew.tsx` passes `className="h-full w-screen object-contain"`, which reinforces contain behavior.
- Docs say `object-cover`, but code uses `object-contain`. This mismatch means one of two things:
  - current code avoids crop but may letterbox and fail full-bleed visual impact, or
  - user sees crop caused by source asset, wrapper, or browser-selected source rather than CSS `object-cover`.

Do not blindly switch to `object-cover`. First verify real rendered dimensions and screenshots, then choose:

- `contain` if preserving full side content is mandatory.
- `cover` if first viewport must be edge-to-edge and source composition has safe margins.
- breakpoint-aware fit if desktop and mobile assets need different handling.

## Files Affected

### Ghost 3D

- Modify: `src/hooks/usePerformanceAdaptive.ts`
  - Make Bloom/post-processing deterministic for high/medium desktop where performance budget allows.
  - Do not enable WebGL on mobile if Ghost System mobile constraints say no.
- Modify: `src/components/canvas/home/hero/hooks/useGhostScene.ts`
  - Set `renderer.outputColorSpace = THREE.SRGBColorSpace`.
  - Keep `ACESFilmicToneMapping` unless visual validation proves Linear/Reinhard is better.
  - Add minimal production-safe diagnostics through `data-*` attributes only if needed for QA.
  - Ensure Bloom pass resolution and composer size match viewport and DPR cap.
- Modify: `src/components/canvas/home/hero/hooks/useGhostParams.ts`
  - Tune emissive/Bloom thresholds conservatively.
  - Candidate values: `emissiveIntensity: 2.4`, `pulseIntensity: 0.16`, `bloomStrength: 0.55`, `bloomThreshold: 0.65`, `exposure: 1.05`.
  - Keep Ghost Blue/Cyan. Do not introduce red identity.
- Modify: `src/components/canvas/home/hero/hooks/useGhostAnimate.ts`
  - Preserve `composer.render()` path.
  - If post-processing disabled, ensure material emissive still visible without Bloom.
- Test: add or update test covering performance config decisions if existing test harness can render hook safely.

### Portfolio Hero Video

- Modify: `src/components/portfolio/PortfolioHeroNew.tsx`
  - Preserve full-bleed section.
  - Remove conflicting object-fit classes from consumer if `ResponsiveVideo` owns fit.
  - Add `max-w-none`, `min-w-full`, explicit `object-position`, and stable `data-testid` if needed for Playwright.
- Modify: `src/components/ui/shared/ResponsiveVideo.tsx`
  - Allow optional `objectPosition` and breakpoint-aware `fitPolicy` if needed.
  - Keep single `<video>` with `<source media>`; do not render dual video nodes.
- Modify: `src/lib/video-assets.ts`
  - If visual verification proves desktop/mobile need different fit, expand `ResponsiveVideoAsset.fitPolicy` from single value to:

```ts
fitPolicy: 'contain' | 'cover' | { desktop: 'contain' | 'cover'; mobile: 'contain' | 'cover' };
```

- Test: `test/components/portfolio/PortfolioHeroNew.test.tsx`
  - Update stale mocks if needed.
  - Assert full-bleed classes and responsive video props.

### Documentation After Approved Implementation

- Modify: `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/02-HERO/02-HERO.md`
  - Sync actual object-fit/object-position decision.
- Modify: `.context/active_state.md`
  - Record Ghost 3D + portfolio hero state after validation.
- Create after execution only: `docs/superpowers/plans/2026-05-22-ghost-portfolio-hero/walkthrough.md`
  - Cause root, decisions, files changed, evidence, next risks.

## Technical Strategy

### Phase 1 — Diagnose Without Code Changes

1. Run targeted grep/read for renderer, composer, Bloom, post-processing gates.
2. Start dev server only after approval.
3. Capture local dev screenshots:
   - `/` desktop
   - `/portfolio` desktop
   - `/portfolio` mobile
4. Run production build/start only after approval:
   - `pnpm run lint`
   - `pnpm run build`
   - `pnpm start`
5. Capture build screenshots and compare:
   - Ghost brightness/Bloom visibility
   - video viewport edge contact
   - side crop/letterbox behavior

### Phase 2 — Fix Ghost Rendering Determinism

Implement minimal renderer consistency:

```ts
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = params.exposure;
```

Make Bloom available on desktop medium quality:

```ts
medium: {
  quality: 'medium',
  fireflyCount: 12,
  particleCount: 25,
  enablePostProcessing: true,
  pixelRatio: 1.25,
}
```

Keep low quality without Bloom:

```ts
low: {
  quality: 'low',
  fireflyCount: 6,
  particleCount: 10,
  enablePostProcessing: false,
  pixelRatio: 1,
}
```

Tune params only if screenshots prove current values remain dim:

```ts
emissiveIntensity: 2.4,
pulseIntensity: 0.16,
bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.55,
bloomRadius: 1.05,
bloomThreshold: 0.65,
exposure: 1.05,
```

### Phase 3 — Fix Portfolio Hero Framing

Keep true full-bleed section:

```tsx
className="relative left-1/2 z-10 h-screen min-h-[100svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-background"
```

Prefer a single owner for object fit. Candidate consumer call:

```tsx
<ResponsiveVideo
  desktopSrc={RESPONSIVE_VIDEOS.portfolioHero.desktop}
  mobileSrc={RESPONSIVE_VIDEOS.portfolioHero.mobile}
  desktopPoster={HERO_POSTER}
  mobilePoster={HERO_POSTER}
  fitPolicy={RESPONSIVE_VIDEOS.portfolioHero.fitPolicy}
  objectPosition="center center"
  className="h-full w-full min-w-full max-w-none"
  preload="auto"
  autoPlay
  loop
  muted
  playsInline
/>
```

Candidate shared prop:

```ts
objectPosition?: React.CSSProperties['objectPosition'];
```

Candidate video style:

```tsx
style={{ objectPosition, ...style }}
```

If asset must never crop sides, keep:

```ts
fitPolicy: 'contain'
```

If first viewport must visually fill all edges and source composition survives crop, use:

```ts
fitPolicy: 'cover'
```

If desktop/mobile differ:

```ts
fitPolicy: { desktop: 'cover', mobile: 'contain' }
```

Do not use scale, rotate, bounce, or non-token motion.

## Validation Plan

Run only after approval:

```bash
pnpm run lint
pnpm run build
```

Targeted tests after implementation:

```bash
pnpm exec jest test/components/portfolio/PortfolioHeroNew.test.tsx --runInBand
```

Browser evidence:

- Dev screenshot: `/` desktop, Ghost visible with emissive glow.
- Build screenshot: `/` desktop, Ghost glow matches dev within visual tolerance.
- Dev screenshot: `/portfolio` desktop, first section touches viewport edges.
- Dev screenshot: `/portfolio` mobile, no lateral crop that removes intended content.
- Build screenshot: `/portfolio` desktop/mobile, same framing as dev.
- Preview screenshot if preview deploy is approved.

Runtime checks:

- Confirm selected video source:
  - desktop receives `portfolio.hero_desktop_video.mp4`
  - mobile receives `portfolio.hero_mobile_video.mp4`
- Confirm one `<video>` node in hero.
- Confirm no `NEXT_PUBLIC_DISABLE_3D=true` in preview environment unless intentionally set.
- Confirm no console error for `EffectComposer`, `UnrealBloomPass`, `OutputPass`, Supabase media CORS, or GLB MIME.

## Risks

- Enabling Bloom on medium desktop increases GPU cost. Mitigation: lower DPR to `1.25` for medium.
- Lowering Bloom threshold can make whole scene glow if analog/atmosphere emits too broadly. Mitigation: screenshot compare and keep values conservative.
- `object-cover` can crop sides by design. Mitigation: verify source composition before selecting cover.
- `object-contain` can preserve sides but fail full-bleed visual intensity with letterbox. Mitigation: use background fill and explicit acceptance screenshots.
- Prompt stack said Next 15/React 18/Tailwind 3, but repo uses Next 16/React 19/Tailwind 4. Plan follows repo truth.
- Preview validation may need Vercel CLI, which is not installed in this environment. Firebase preview/deploy path exists, but production deploy remains forbidden without explicit approval.

## Rollback

- Revert only files changed by this task.
- If Ghost performance regresses, restore `medium.enablePostProcessing = false` and keep only `outputColorSpace` if harmless.
- If hero framing regresses, restore `portfolioHero.fitPolicy: 'contain'` and previous consumer class.

## Approval Stop

Stop here. Implementation starts only after `Aprovado` or `Proceed`.
