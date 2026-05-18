# Mobile Typography and Responsive Video Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile text overflow and legibility issues while centralizing desktop/mobile video selection so pages use mobile-specific assets without double-loading media or breaking Ghost System rules.

**Architecture:** Reuse existing media infrastructure instead of adding page-specific conditionals. Extend shared video layer around `DynamicAssetVideo` with explicit responsive source selection, poster selection, fallback rules, and SSR-safe client boundary. Apply typography fixes per component cluster using existing Ghost tokens, responsive Tailwind classes, and container constraints instead of arbitrary one-off values.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Supabase Storage, Firebase Hosting.

---

## Constraints

- Preserve Ghost Design System, Ghost Blue, grid discipline, motion constraints, and Firebase Hosting compatibility.
- No production deploy in this plan.
- No lockfile or dependency changes.
- No CSS trick that renders both desktop and mobile `<video>` elements if that can trigger double download.
- Any edit under `src/` must be followed by matching `.context/` update before final completion.
- Approval gate: do not start Tasks 3+ until human replies `Aprovado` or `Proceed`.

## File Structure and Responsibilities

### Existing files expected to change

- `src/components/ui/shared/DynamicAssetVideo.tsx`
  - Shared asset-backed video primitive. Best reuse point for media fallback, preload behavior, and stable video element behavior.
- `src/components/home/hero/VideoManifesto.tsx`
  - Existing responsive hero video logic. Likely consumer to simplify onto shared responsive media API.
- `src/components/sobre/sections/AboutHero.tsx`
  - Uses separate desktop/mobile video render path. Candidate for central responsive media API and mobile typography cleanup.
- `src/components/sobre/sections/AboutMethod.tsx`
  - Currently renders two videos with `hidden/block`; high-risk double-download pattern. Primary target for replacement.
- `src/components/sobre/sections/AboutClosing.tsx`
  - Already does runtime media selection; likely needs unification with shared component and text/container review.
- `src/components/portfolio/PortfolioHeroNew.tsx`
  - Uses `useMediaQuery` to choose asset key; candidate to move to shared responsive media API.
- `src/config/site-assets.ts`
  - Source of truth for desktop/mobile asset pairs and preload map. Update only if asset resolution API needs stronger pairing semantics.
- `src/app/page.tsx`
  - Home entrypoint with existing preload usage. Verify preload rules after responsive media refactor.
- `src/app/sobre/page.tsx`
  - Verify section composition and any page-level typography overflow interactions.
- `src/app/portfolio/page.tsx`
  - Verify portfolio hero integration and page-level overflow behavior.
- `src/app/globals.css`
  - Only if one or two global overflow/safe-area fixes are clearly systemic. Avoid broad typography rewrites.
- `.context/active_state.md`
  - Update current project state after implementation if architecture changes.
- `.context/DOCS-PORTFOLIO-PAGES/`
  - Update relevant page doc if structure or media behavior changes.

### Possible new file

- `src/components/ui/shared/ResponsiveVideo.tsx`
  - Only create if adapting `DynamicAssetVideo.tsx` would produce a worse API or force backward-compat overload. Prefer not creating this file if `DynamicAssetVideo` can absorb responsive source selection cleanly.

### Existing files expected to be read for validation only

- `src/config/site-assets.json`
- `src/config/content.ts`
- `src/config/brand.ts`
- `src/config/motion.ts`
- `src/hooks/useMediaQuery.ts`
- `src/lib/video.ts`
- `AGENTS.md`
- `.context/GHOST-DESIGN-SYSTEM.md`

---

## User Review Required

> [!IMPORTANT]
> This plan deliberately treats `AboutMethod.tsx` current dual-video pattern as suspect. If browser testing proves only one stream downloads in target browsers, keep implementation minimal. If testing shows both streams download, replace with shared runtime source selection.
>
> This plan also prefers reusing `DynamicAssetVideo.tsx` over creating `ResponsiveVideo.tsx`. If reuse creates unclear props or regressions in existing consumers, split into a new shared component instead of bloating primitive.

---

## Task 1: Audit media map and current consumers

**Files:**
- Modify: `docs/superpowers/plans/2026-05-16-mobile-typography-responsive-video-correction.md`
- Read: `src/config/site-assets.ts`
- Read: `src/config/site-assets.json`
- Read: `src/components/home/hero/VideoManifesto.tsx`
- Read: `src/components/sobre/sections/AboutHero.tsx`
- Read: `src/components/sobre/sections/AboutMethod.tsx`
- Read: `src/components/sobre/sections/AboutClosing.tsx`
- Read: `src/components/portfolio/PortfolioHeroNew.tsx`

- [ ] **Step 1: Confirm desktop/mobile asset pairs from config**

Expected pair inventory to verify:

```ts
const expectedVideoPairs = {
  homeManifesto: {
    desktop: SITE_ASSET_KEYS.heroVideos.homeManifesto,
    mobile: SITE_ASSET_KEYS.heroVideos.homeManifestoMobile,
  },
  aboutHero: {
    desktop: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
    mobile: SITE_ASSET_KEYS.heroVideos.aboutMobile,
  },
  aboutMethod: {
    desktop: SITE_ASSET_KEYS.about.methodDesktop,
    mobile: SITE_ASSET_KEYS.about.methodMobile,
  },
  aboutBeliefs: {
    desktop: SITE_ASSET_KEYS.about.beliefs.skillsVideo,
    mobile: SITE_ASSET_KEYS.about.beliefs.skillsVideoMobile,
  },
  aboutClosing: {
    desktop: SITE_ASSET_KEYS.about.closingDesktop,
    mobile: SITE_ASSET_KEYS.about.closingMobile,
  },
  portfolioHero: {
    desktop: SITE_ASSET_KEYS.portfolio.heroDesktop,
    mobile: SITE_ASSET_KEYS.portfolio.heroMobile,
  },
};
```

- [ ] **Step 2: Search all direct `<video>` consumers**

Run:

```bash
rg -n "<video|DynamicAssetVideo|VideoManifesto|useMediaQuery\\('(max-width|matchMedia\\('(max-width" src/app src/components
```

Expected: list of direct video consumers and runtime breakpoint logic.

- [ ] **Step 3: Record current consumer strategy**

Classify each target as one of:

```txt
single shared video source
runtime mobile/desktop switch
dual DOM video render
hardcoded desktop fallback
poster-only fallback
```

- [ ] **Step 4: Verify plan assumptions against actual code**

Acceptance check:

```txt
AboutMethod currently renders 2 <video> elements.
AboutHero renders separate desktop/mobile video blocks.
AboutClosing uses runtime source selection.
PortfolioHeroNew uses useMediaQuery for asset-key selection.
VideoManifesto contains custom responsive source switching.
```

- [ ] **Step 5: Commit planning notes only if plan file changed materially**

```bash
git add docs/superpowers/plans/2026-05-16-mobile-typography-responsive-video-correction.md
git commit -m "docs: refine responsive video correction plan"
```

Skip commit if no new note added.

---

## Task 2: Audit mobile typography hotspots and approval checkpoint

**Files:**
- Modify: `docs/superpowers/plans/2026-05-16-mobile-typography-responsive-video-correction.md`
- Read: `src/app/page.tsx`
- Read: `src/app/sobre/page.tsx`
- Read: `src/app/portfolio/page.tsx`
- Read: `src/components/home/hero/VideoManifesto.tsx`
- Read: `src/components/sobre/sections/AboutHero.tsx`
- Read: `src/components/sobre/sections/AboutMethod.tsx`
- Read: `src/components/sobre/sections/AboutClosing.tsx`

- [ ] **Step 1: Inspect text classes likely to break on mobile**

Search targets:

```bash
rg -n "text-\\[clamp|max-w-\\[|whitespace-nowrap|tracking-|leading-|min-h-screen|h-screen|overflow-hidden|absolute|fixed" src/app/page.tsx src/app/sobre/page.tsx src/app/portfolio/page.tsx src/components/home/hero/VideoManifesto.tsx src/components/sobre/sections/AboutHero.tsx src/components/sobre/sections/AboutMethod.tsx src/components/sobre/sections/AboutClosing.tsx
```

Expected: list of mobile-sensitive typography and layout constraints.

- [ ] **Step 2: Pre-classify likely typography fixes**

Use this fix vocabulary in notes:

```txt
reduce clamp minimum
remove nowrap on mobile
cap line length
raise mobile horizontal padding
shift text block away from video edge
replace hard fixed height with intrinsic flow
adjust leading/tracking to token-safe values
```

- [ ] **Step 3: Define approval checkpoint**

Human must review before code when audit reaches this level:

```txt
video architecture recommendation
consumer list
asset pair map
typography risk list
expected file list
```

- [ ] **Step 4: Stop if approval missing**

Do not continue to implementation tasks until human reply is exactly:

```txt
Aprovado
```

or

```txt
Proceed
```

---

## Task 3: Build shared responsive video API

**Files:**
- Modify: `src/components/ui/shared/DynamicAssetVideo.tsx`
- Create if needed: `src/components/ui/shared/ResponsiveVideo.tsx`
- Test manually in: `src/components/home/hero/VideoManifesto.tsx`, `src/components/sobre/sections/AboutMethod.tsx`, `src/components/sobre/sections/AboutClosing.tsx`, `src/components/portfolio/PortfolioHeroNew.tsx`

- [ ] **Step 1: Write failing design contract in plan notes before code**

Target API:

```ts
type ResponsiveVideoSource = {
  assetKey?: string;
  fallbackUrl?: string;
  poster?: string;
};

type ResponsiveVideoProps = {
  desktop: ResponsiveVideoSource;
  mobile?: ResponsiveVideoSource;
  breakpoint?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  ariaLabel?: string;
  decorative?: boolean;
  playbackRate?: number;
  disableRealtime?: boolean;
};
```

- [ ] **Step 2: Add SSR-safe responsive source selection**

Preferred implementation shape:

```ts
const isMounted = useMountedFlag();
const isMobile = useMediaQuery(breakpoint);

const selectedSource = !isMounted
  ? desktop
  : isMobile && mobile
    ? mobile
    : desktop;
```

Rules:

```txt
SSR should render stable desktop-safe placeholder path.
After mount, switch only if mobile source exists.
Do not render two video tags for responsive switching.
Keep poster aligned with selected source.
```

- [ ] **Step 3: Preserve existing fallback behavior**

Minimal internal resolution logic:

```ts
const normalizedFallback = selectedSource.fallbackUrl?.trim() || null;
const safeAssetUrl = isLikelyVideoUrl(asset?.publicUrl) ? asset.publicUrl : null;
const finalUrl = displayUrl || normalizedFallback;
```

- [ ] **Step 4: Preserve accessibility defaults**

Target video attributes:

```tsx
<video
  autoPlay={autoPlay}
  muted={muted}
  loop={loop}
  playsInline={playsInline}
  preload={preload}
  poster={selectedSource.poster}
  aria-hidden={decorative || undefined}
  aria-label={decorative ? undefined : ariaLabel}
/>
```

- [ ] **Step 5: Run type check on shared media layer**

Run:

```bash
pnpm run typecheck
```

Expected: no new TypeScript errors from shared media API.

- [ ] **Step 6: Commit shared media layer**

```bash
git add src/components/ui/shared/DynamicAssetVideo.tsx src/components/ui/shared/ResponsiveVideo.tsx
git commit -m "feat: add shared responsive video source selection"
```

If no new file created, omit it from commit.

---

## Task 4: Migrate current video consumers to shared responsive media API

**Files:**
- Modify: `src/components/home/hero/VideoManifesto.tsx`
- Modify: `src/components/sobre/sections/AboutHero.tsx`
- Modify: `src/components/sobre/sections/AboutMethod.tsx`
- Modify: `src/components/sobre/sections/AboutClosing.tsx`
- Modify: `src/components/portfolio/PortfolioHeroNew.tsx`

- [ ] **Step 1: Replace `AboutMethod.tsx` dual render**

Target replacement shape:

```tsx
<ResponsiveVideo
  desktop={{
    assetKey: SITE_ASSET_KEYS.about.methodDesktop,
    fallbackUrl: ABOUT_CONTENT.method.videos.desktop || undefined,
    poster: DEFAULT_VIDEO_POSTER,
  }}
  mobile={{
    assetKey: SITE_ASSET_KEYS.about.methodMobile,
    fallbackUrl: ABOUT_CONTENT.method.videos.mobile || undefined,
    poster: DEFAULT_VIDEO_POSTER,
  }}
  autoPlay={!prefersReducedMotion}
  loop={!prefersReducedMotion}
  muted
  playsInline
  preload="metadata"
  decorative
  className="h-full w-full object-cover object-center opacity-55"
/>
```

- [ ] **Step 2: Simplify `AboutClosing.tsx` runtime selection**

Replace ad-hoc `selectedVideo` / `activePoster` selection with shared API:

```tsx
<ResponsiveVideo
  desktop={{
    assetKey: SITE_ASSET_KEYS.about.closingDesktop,
    fallbackUrl: BRAND.assets.video.aboutClosing,
    poster: DEFAULT_VIDEO_POSTER,
  }}
  mobile={{
    assetKey: SITE_ASSET_KEYS.about.closingMobile,
    fallbackUrl: BRAND.assets.video.aboutClosingMobile,
    poster: DEFAULT_VIDEO_POSTER,
  }}
  autoPlay={!prefersReducedMotion}
  loop={!prefersReducedMotion}
  muted
  playsInline
  preload="metadata"
  ariaLabel="Demonstração visual de experiências"
  className="relative z-[var(--z-layer-content)] block h-full w-full object-cover"
/>
```

- [ ] **Step 3: Simplify `PortfolioHeroNew.tsx`**

Remove page-level breakpoint asset selection:

```tsx
<ResponsiveVideo
  desktop={{
    assetKey: SITE_ASSET_KEYS.portfolio.heroDesktop,
    fallbackUrl: PORTFOLIO_CONTENT.hero.video.desktop || undefined,
    poster: HERO_POSTER,
  }}
  mobile={{
    assetKey: SITE_ASSET_KEYS.portfolio.heroMobile,
    fallbackUrl: PORTFOLIO_CONTENT.hero.video.mobile || undefined,
    poster: HERO_POSTER,
  }}
  autoPlay={!prefersReducedMotion}
  muted
  loop={!prefersReducedMotion}
  playsInline
  preload="metadata"
  decorative
  disableRealtime={process.env.NODE_ENV === 'production'}
  className="h-full w-screen object-cover"
/>
```

- [ ] **Step 4: Decide whether `VideoManifesto.tsx` should stay custom**

Keep custom component only if all are true:

```txt
custom scroll/audio behavior still needed
single video tag still used
responsive source logic can delegate to shared helper
code becomes simpler, not more coupled
```

Otherwise migrate fully to shared responsive media layer.

- [ ] **Step 5: Keep `AboutHero.tsx` split layout only if layout requires it**

Allowed:

```txt
separate content wrappers for desktop/mobile
shared responsive media component used inside each mode only if one mode-specific video block remains necessary for layout
```

Not allowed:

```txt
page-level asset selection duplicated with custom media-query logic if shared API can cover it
```

- [ ] **Step 6: Run build-focused verification**

Run:

```bash
pnpm run typecheck
pnpm run build
```

Expected: responsive media migration compiles cleanly.

- [ ] **Step 7: Commit consumer migration**

```bash
git add src/components/home/hero/VideoManifesto.tsx src/components/sobre/sections/AboutHero.tsx src/components/sobre/sections/AboutMethod.tsx src/components/sobre/sections/AboutClosing.tsx src/components/portfolio/PortfolioHeroNew.tsx
git commit -m "refactor: unify responsive video consumers"
```

---

## Task 5: Fix mobile typography by component cluster

**Files:**
- Modify: `src/components/sobre/sections/AboutHero.tsx`
- Modify: `src/components/sobre/sections/AboutMethod.tsx`
- Modify: `src/components/sobre/sections/AboutClosing.tsx`
- Modify: `src/components/home/hero/VideoManifesto.tsx`
- Modify if needed: `src/app/globals.css`

- [ ] **Step 1: Fix `AboutHero.tsx` mobile wraps**

Start from this direction:

```tsx
<div
  aria-hidden="true"
  className="text-h1 text-[clamp(1.75rem,4vw+1rem,3.25rem)] font-bold text-text leading-[1.1] tracking-[-0.02em] flex flex-col gap-0.5 text-balance"
>
```

Allowed refinements:

```txt
remove mobile nowrap where line breaks need freedom
reduce highlighted inline gaps on narrow screens
cap description width
increase top/bottom padding around text block
```

- [ ] **Step 2: Fix `AboutMethod.tsx` title, intro, and steps**

Target direction:

```tsx
<h2 className="font-display text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-text" />
<div className="mb-8 max-w-[34rem] text-center text-h3 text-text lg:mb-10 lg:text-left" />
<p className="text-left text-base font-medium leading-[1.45] text-text md:text-lg lg:text-xl" />
```

Audit for:

```txt
step text crowding
mobile padding against viewport edge
intro paragraph too wide on small screens
title line breaks creating orphan words
```

- [ ] **Step 3: Fix `AboutClosing.tsx` text and video adjacency**

Target direction:

```tsx
<h2 className="font-sans text-display text-[clamp(40px,5vw,48px)] font-bold leading-tight text-text max-w-[800px] mx-auto text-center" />
<p className="text-[clamp(20px,2vw,24px)] leading-normal text-text opacity-90 max-w-[700px] mx-auto text-center" />
```

Audit for:

```txt
headline breaking too aggressively on 320-390 widths
paragraph touching video container edges
CTA row overflow or wrap imbalance
```

- [ ] **Step 4: Fix `VideoManifesto.tsx` only where text actually fails**

Only touch if validated:

```txt
caption track overlay collides with controls
sound toggle overlaps content on smallest widths
aspect ratio + poster causes text/crop issue around section boundary
```

- [ ] **Step 5: Add minimal global overflow guard only if proven systemic**

Allowed global shape:

```css
html,
body {
  overflow-x: clip;
}
```

Only apply if root-level horizontal overflow is proven and component-level fixes are insufficient.

- [ ] **Step 6: Run focused verification**

Run:

```bash
pnpm run lint
pnpm run typecheck
```

Expected: typography changes introduce no lint/type regressions.

- [ ] **Step 7: Commit typography fixes**

```bash
git add src/components/sobre/sections/AboutHero.tsx src/components/sobre/sections/AboutMethod.tsx src/components/sobre/sections/AboutClosing.tsx src/components/home/hero/VideoManifesto.tsx src/app/globals.css
git commit -m "fix: improve mobile typography and layout stability"
```

Stage only files actually changed.

---

## Task 6: Validate responsive behavior and media loading

**Files:**
- Modify if needed after findings: files from Tasks 3-5
- Read: browser output, build output, network evidence

- [ ] **Step 1: Run full verification commands**

Run:

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm test
pnpm test:e2e
```

Expected:

```txt
lint passes
typecheck passes
build passes
tests pass or unavailable status documented with evidence
```

- [ ] **Step 2: Validate responsive viewports manually**

Required viewport matrix:

```txt
320x568
375x667
390x844
430x932
768x1024
1024x768
1440x900
```

Check per viewport:

```txt
no horizontal overflow
headings readable
paragraphs not clipped
text not behind video/header/canvas
CTA wraps safely
```

- [ ] **Step 3: Validate video source behavior in browser network panel**

Acceptance:

```txt
mobile viewport requests mobile video when mobile asset exists
desktop viewport requests desktop video
both variants do not download together for same responsive component
poster appears before playback
autoplay videos remain muted and inline
```

- [ ] **Step 4: Validate reduced motion**

Acceptance:

```txt
autoplay disabled where code ties playback to reduced motion
layout remains legible without motion
no broken empty state when motion is reduced
```

- [ ] **Step 5: Fix any verification failure before claiming success**

If a command fails:

```txt
capture exact failing command
capture exact error
patch smallest responsible file
rerun full relevant command
```

- [ ] **Step 6: Commit validation-driven fixes**

```bash
git add src/components/ui/shared/DynamicAssetVideo.tsx src/components/home/hero/VideoManifesto.tsx src/components/sobre/sections/AboutHero.tsx src/components/sobre/sections/AboutMethod.tsx src/components/sobre/sections/AboutClosing.tsx src/components/portfolio/PortfolioHeroNew.tsx src/app/globals.css
git commit -m "test: validate responsive media and typography corrections"
```

Stage only changed files.

---

## Task 7: Update project context and walkthrough

**Files:**
- Modify: `.context/active_state.md`
- Modify: relevant file under `.context/DOCS-PORTFOLIO-PAGES/`
- Create if explicitly requested by task outcome: `walkthrough.md`

- [ ] **Step 1: Update active state with final architecture**

Add concise note covering:

```md
- responsive media selection centralized in shared video layer
- page consumers migrated away from duplicated breakpoint logic
- mobile typography fixes applied to affected about/portfolio/home sections
```

- [ ] **Step 2: Update page or design-system docs only where structure changed**

Document:

```md
- which sections now rely on shared responsive video logic
- what responsive typography constraints were corrected
- any viewport-specific acceptance rule worth preserving
```

- [ ] **Step 3: Generate final walkthrough if user asked for it or plan requires it**

Use this shape:

```md
# Walkthrough, Mobile Typography and Responsive Video Correction

## 1. Summary
## 2. Files Changed
## 3. Responsive Typography Fixes
## 4. Responsive Video Fixes
## 5. Asset Resolution Decisions
## 6. Supabase Storage Notes
## 7. Firebase Hosting Notes
## 8. Ghost Design System Compliance
## 9. Accessibility Compliance
## 10. Performance Evidence
## 11. Commands Executed
## 12. Validation Results
## 13. Visual QA Evidence
## 14. Remaining Risks
## 15. Documentation Update Decision
## 16. Final Recommendation
```

- [ ] **Step 4: Run final verification after docs updates**

Run:

```bash
pnpm run build
```

Expected: docs/context updates do not affect build and final branch remains green.

- [ ] **Step 5: Final commit**

```bash
git add .context/active_state.md .context/DOCS-PORTFOLIO-PAGES walkthrough.md
git commit -m "docs: sync responsive media and typography changes"
```

Stage only files actually changed.

---

## Verification Plan

### Automated

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run build`
- `pnpm test`
- `pnpm test:e2e`

### Manual

- Confirm no mobile text clipping on Home, Sobre, Portfolio.
- Confirm `AboutMethod` no longer relies on dual rendered responsive videos if browser network proves double download.
- Confirm posters show correctly before playback.
- Confirm reduced motion behavior remains intact.
- Confirm no hydration mismatch or obvious client-boundary regression in console.

## Rollback Plan

- Revert latest media-layer commit if shared responsive API causes hydration or playback regression.
- Revert per-consumer migration commit independently if one section breaks.
- Revert typography commit independently if visual regression appears without media issues.
- Keep commits small and separated by concern so rollback stays surgical.

## Spec Coverage Self-Review

- Mobile text issues: covered by Task 2 audit and Task 5 implementation.
- Desktop/mobile video switching: covered by Task 1 audit, Task 3 shared API, Task 4 consumer migration.
- Supabase Storage and poster/preload/playsInline/muted/fallback/performance: covered by Tasks 1, 3, 4, and 6.
- Ghost System, Tailwind, motion, Firebase Hosting preservation: enforced in constraints and verification.
- Approval-first workflow: enforced by Task 2 checkpoint and Tasks 3+ gate.

