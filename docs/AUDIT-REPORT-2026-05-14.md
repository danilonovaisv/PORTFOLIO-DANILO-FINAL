# AUDIT REPORT — Portfolio Danilo Novais

**Data:** 2026-05-14
**Auditor:** Claude Sonnet 4.6 (via ghost-system agent)
**Scope:** Full codebase audit vs. `.context/DOCS-PORTFOLIO-PAGES` specs
**Branch:** main
**Base commit:** 231e42f84

---

## 1. FIDELITY — Spec vs. Code Divergences

### HOME

---

#### 1.1 PortfolioShowcase — Color Inversion (P0)

| Field | Value |
|---|---|
| File | `src/components/home/portfolio-showcase/PortfolioShowcase.tsx` |
| Spec says | `portfólio` = `text-white`, `showcase` = `text-bluePrimary italic font-light` |
| Code does | `portfólio` = `text-bluePrimary italic font-light`, `showcase` = `text-white font-bold` |
| Severity | **P0** |

Fix: Swap `text-bluePrimary` and `text-white` on the two `<span>` children of the `<h2>` heading.

---

#### 1.2 CategoryStripe — Missing Float Label (P1)

| Field | Value |
|---|---|
| File | `src/components/home/portfolio-showcase/CategoryStripe.tsx` |
| Spec says | First stripe must render a floating label `[what we love working on]` when `showLabel === true` |
| Code does | `showLabel` prop is declared and passed as `true` from `PortfolioShowcase`, but `CategoryStripe.tsx` never renders anything conditional on it |
| Severity | **P1** |

Fix: Add conditional render inside the desktop block (`hidden lg:flex`): `{showLabel && <p className="text-bluePrimary font-mono text-xs tracking-[0.2em] uppercase mb-3 w-full text-left">[what we love working on]</p>}`

---

#### 1.3 CategoryStripe — Missing Arrow Badge Rotation (P1)

| Field | Value |
|---|---|
| File | `src/components/home/portfolio-showcase/CategoryStripe.tsx` |
| Spec says | Arrow badge rotates `-45deg → 0deg` on hover |
| Code does | Only `y: -1` is animated on the badge; no rotation |
| Severity | **P1** |

Fix: Add `rotate: isHovered ? 0 : -45` to the badge `<m.div animate>` with `transition: { duration: MOTION_TOKENS.duration.modal, ease: GHOST_EASE }`.

---

#### 1.4 AboutWhatIDo — Scroll-Driven Horizontal Not Implemented (P0)

| Field | Value |
|---|---|
| File | `src/components/sobre/sections/AboutWhatIDo.tsx` |
| Spec says | Desktop: `lg:h-[180vh]` sticky container with scroll-driven horizontal card scroll driven by `useScroll` + `useTransform` or GSAP ScrollTrigger |
| Code does | Container `lg:h-[180vh]` exists. The `m.ul` receives static `x: 0, opacity: 1` — zero scroll wiring. The horizontal scroll effect does not function at all on desktop |
| Severity | **P0** |

Fix: Connect `useScroll({ target: containerRef, offset: ['start start', 'end end'] })` and map `scrollYProgress → x` via `useTransform` across the card width. Apply `useMotionGate` gate.

---

#### 1.5 FeaturedProjectAnimatedBackground — Aurora Variant Dead Code (P2)

| Field | Value |
|---|---|
| File | `src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx:162` |
| Spec says | Pool includes `aurora` variant — background should render a visual for it |
| Code does | `{variant === 'aurora' ? null : null}` — double null, Aurora component was removed but variant remains in the pool |
| Severity | **P2** |

Fix: Either (a) implement the Aurora fallback surface gradient as a static CSS layer, or (b) remove `'aurora'` from `FEATURED_PROJECT_BACKGROUND_POOL` in `animated-backgrounds.ts` so it's never assigned.

---

#### 1.6 Home Hero — Preloader Delay Not Wired to Real Asset Load (P2)

| Field | Value |
|---|---|
| File | `src/components/home/hero/HomeHero.tsx:33` |
| Spec says | Preloader should reflect actual loading progress |
| Code does | `setTimeout(() => setIsLoaded(true), 500)` — fixed 500ms regardless of WebGL readiness. The `onReady` callback from `GhostScene` calls `handlePreloaderDone`, which also sets `isLoaded`. The 500ms fires first in most cases, making the preloader vestigial |
| Severity | **P2** |

Fix: Remove the `setTimeout` in `HomeHero`; rely exclusively on the `onReady` callback from `GhostSceneWrapper` to set `isLoaded`. Add a maximum timeout fallback at 3000ms to prevent indefinite blocking.

---

### SOBRE

---

#### 1.7 GhostSceneFallback — Raw zIndex: 70 Breaks Manifesto Overlay (P0)

| Field | Value |
|---|---|
| File | `src/components/sobre/3d/GhostSceneFallback.tsx:10` |
| Spec says | Fallback must use same z-layer token as the live scene: `--z-layer-3d` (= 30) |
| Code does | `style={{ zIndex: 70 }}` — raw number, above the Manifesto (`--z-layer-overlay` = 50). When WebGL or GLB fails, fallback covers "ISSO É GHOST DESIGN" text |
| Severity | **P0** |

Fix: Replace `style={{ zIndex: 70 }}` with `className="... z-[var(--z-layer-3d)]"`.

---

#### 1.8 Beliefs Belief Components — Raw zIndex via `beliefZIndex` Map (P1)

| Field | Value |
|---|---|
| Files | `GhostScene.tsx:118`, `BeliefManifesto.tsx:103`, `BeliefScrollText.tsx:131`, `BeliefBackground.tsx:104`, `BeliefFixedHeader.tsx:88` |
| Spec says | GHOST-DESIGN-SYSTEM.md §2.4: "Never use raw `z-[nnn]`. Always use CSS custom properties `z-[var(--z-layer-id)]`" |
| Code does | All 5 components use `style={{ zIndex: beliefZIndex.ghost }}` (TypeScript map) instead of CSS tokens |
| Severity | **P1** |

Fix: Replace `style={{ zIndex: beliefZIndex.X }}` with className tokens: `z-[var(--z-layer-base)]`, `z-[var(--z-layer-glass)]`, `z-[var(--z-layer-3d)]`, `z-[var(--z-layer-overlay)]`, `z-[var(--z-layer-header)]` matching respective values. Deprecate `beliefZIndex` object in `beliefTokens.ts`.

---

#### 1.9 SceneInvalidator (GhostScene /sobre) — No IntersectionObserver Guard (P1)

| Field | Value |
|---|---|
| File | `src/components/sobre/3d/GhostScene.tsx:19-38` |
| Spec says | ANALISE-GLOBAL-DA-SOBRE.md M2/M4: `Invalidator` must add `IntersectionObserver` to stop firing when off-viewport |
| Code does | `SceneInvalidator` calls `invalidate()` on every `scroll` and `mousemove` event globally, even when the Beliefs section is far offscreen |
| Severity | **P1** |

Fix: Add `IntersectionObserver` on the canvas wrapper. Only call `invalidate()` when `isIntersecting`. Stop `scroll`/`mousemove` listeners when off-viewport.

---

#### 1.10 GhostModel /sobre — useGLTF.preload at Module Top-Level (P1)

| Field | Value |
|---|---|
| File | `src/components/sobre/3d/GhostModel.tsx:250` |
| Spec says | ANALISE-GLOBAL-DA-SOBRE.md M3: `useGLTF.preload` should be inside a `useEffect` (conditional), not at top-level module scope |
| Code does | `useGLTF.preload(MODEL_PATH)` called unconditionally at module top-level — fires on every import, even if WebGL is unsupported or `shouldReduceMotion` is true |
| Severity | **P1** |

Fix: Move to `useEffect(() => { if (supportsWebGL && !shouldReduceMotion) useGLTF.preload(MODEL_PATH); }, [supportsWebGL, shouldReduceMotion])`.

---

#### 1.11 AboutMethod — key-Driven Video Remount on Resize (P1)

| Field | Value |
|---|---|
| File | `src/components/sobre/sections/AboutMethod.tsx` |
| Spec says | Responsive video should use CSS `hidden`/`block` — no remount |
| Code does | `key={isMobile ? 'mobile' : 'desktop'}` forces full `<video>` unmount + remount on viewport resize, causing flash and a new network request |
| Severity | **P1** |

Fix: Remove `key` prop from the video element; use `className={isMobile ? 'block' : 'hidden'}` / `className={isMobile ? 'hidden' : 'block'}` pattern (or CSS breakpoint classes `md:hidden`, `hidden md:block`).

---

#### 1.12 GhostModel /sobre — Hardcoded Supabase URL (P2)

| Field | Value |
|---|---|
| File | `src/components/sobre/3d/GhostModel.tsx:16` |
| Spec says | Assets should be fetched via `useSiteAssetUrl` / local path fallback chain |
| Code does | `MODEL_PATH = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb'` — hardcoded Supabase URL at module top |
| Severity | **P2** |

Note: `shared/3d/GhostModel.tsx` already has the correct approach (`GHOST_LOCAL_PATH = '/site.assets/3d/ghost-v1.glb'`). The `/sobre/3d/GhostModel.tsx` should use the same local path with Supabase as optional override.

---

### PORTFOLIO

---

#### 1.13 ProjectsGallery — Double Container (P1)

| Field | Value |
|---|---|
| Files | `src/app/portfolio/PortfolioClient.tsx`, `src/components/portfolio/ProjectsGallery.tsx` |
| Spec says | Single `std-grid` container per page section |
| Code does | `PortfolioClient` applies `std-grid` wrapper around `ProjectsGallery`, which itself has an inner `<Container>` — creates double padding on desktop |
| Severity | **P1** |

Fix: Remove the outer `std-grid` from `PortfolioClient` and let `ProjectsGallery` own the single container, or vice versa.

---

#### 1.14 ProjectsGallery — `viewport: { once: false }` Violates Silent Design (P1)

| Field | Value |
|---|---|
| File | `src/components/portfolio/ProjectsGallery.tsx` |
| Spec says | GHOST-DESIGN-SYSTEM.md: animations should fire once. Silent Design = no aggressive decorative motion |
| Code does | `once: false` on cards causes blur re-animation on reverse scroll |
| Severity | **P1** |

Fix: Replace with `viewportConfig` from `motion.ts` (`{ once: true, amount: 0.15 }`) or `{ once: true }`.

---

#### 1.15 Portfolio Gallery LERP — Hardcoded Header Height (P1)

| Field | Value |
|---|---|
| File | `src/app/portfolio/PortfolioClient.tsx` or `src/components/portfolio/ProjectsGallery.tsx` |
| Spec says | Use CSS variable `--header-height` for dynamic positioning |
| Code does | `top-[88px]` hardcoded in `getTrackClasses()` — breaks if header height changes |
| Severity | **P1** |

Fix: Replace with `top-[var(--header-height)]` (CSS var set by `SiteHeader.tsx`'s `ResizeObserver`).

---

#### 1.16 FeaturedProjects Grid Gap — Missing lg Breakpoint (P2)

| Field | Value |
|---|---|
| File | `src/components/home/featured-projects/FeaturedProjectsSection.tsx` |
| Spec says | Ghost Grid System: 32px gap on desktop |
| Code does | `gap-4 md:gap-6` — no `lg:gap-8` |
| Severity | **P2** |

Fix: Add `lg:gap-8` to the grid container.

---

## 2. ORGANIZATION — Dead Code, Duplicates, Misplaced Files

### 2.1 Duplicate GhostModel Components (P1)

Two GhostModel implementations coexist and are not unified:
- `src/components/sobre/3d/GhostModel.tsx` — uses Supabase URL, `Merged` instancing, `GHOST_MATERIAL_CONFIG`
- `src/components/shared/3d/GhostModel.tsx` — uses local path, simpler approach, correct fallback logic

**Recommendation:** Migrate `/sobre/3d/GhostModel.tsx` to use the local-first approach of `shared/3d/GhostModel.tsx`, then remove the `sobre/3d/` version or keep it as a thin wrapper.

---

### 2.2 Aurora Component Removed but Referenced in Pool (P2)

- `src/components/Grainient.tsx` — exists
- `src/components/GhostCursor.tsx` — exists
- `Aurora.tsx` — **DELETED** but `FEATURED_PROJECT_BACKGROUND_POOL` still contains `'aurora'`, and `FeaturedProjectAnimatedBackground.tsx` has `{variant === 'aurora' ? null : null}` dead code branch
- The comment in `FeaturedProjectAnimatedBackground.tsx:19` says "Aurora was removed as per cleanup audit"

**Fix:** Remove `'aurora'` from the pool or implement a lightweight CSS-only Aurora fallback surface.

---

### 2.3 supabase-test Route Should Be Blocked (P1)

- `src/app/supabase-test/page.tsx` — development test page exposing Supabase query to public, uses deprecated `@/utils/supabase/server` import path (should be `@/lib/supabase/server`), queries a `todos` table that may not exist in production schema

**Fix:** Delete the route or add it behind auth middleware.

---

### 2.4 `src/utils/supabase/` vs `src/lib/supabase/` Paths (P2)

The `supabase-test/page.tsx` imports from `@/utils/supabase/server` (deprecated). All other code correctly uses `@/lib/supabase/server`. The `/utils/supabase/` path either doesn't exist or is a ghost duplicate.

---

### 2.5 Two Shuffle Implementations (P2)

- `src/lib/utils/stable-shuffle.ts` — time-windowed stable shuffle (DJB2 + LCG)
- `src/lib/portfolio/shuffle-projects.ts` — simpler seeded shuffle using `Math.sin`

Both are used in production: `stableShuffle` for `RotatingHighlights`, `shuffleProjects` for home page and portfolio page. The `shuffleProjects` function generates different results on server vs. client when no `seed` is passed (calls `Math.random()`), which is a potential hydration mismatch risk.

**Recommendation:** Consolidate into `stableShuffle`. Deprecate `shuffle-projects.ts`.

---

### 2.6 `src/components/debug/AntigravityDebugger.tsx` (P2)

Debug component that should not be in a production bundle without a hard `NODE_ENV !== 'production'` guard.

**Check:** Verify it's gated with `process.env.NODE_ENV !== 'production'` before rendering.

---

### 2.7 `beliefZIndex` TypeScript Map — Duplicate of CSS Custom Properties (P1)

- `src/config/beliefTokens.ts` exports `beliefZIndex` values
- `globals.css` defines `--z-layer-id` canonical values

These two sources of truth diverge (e.g., `beliefs.ghost = 70` in TS vs. `--z-layer-3d = 30` in CSS). The GHOST-DESIGN-SYSTEM.md designates CSS custom properties as canon.

**Fix:** Deprecate `beliefZIndex` object. Replace all `style={{ zIndex: beliefZIndex.X }}` usages with `className` CSS var tokens.

---

## 3. WEBGL PERFORMANCE

### 3.1 GhostScene (Home Hero) — `@ts-ignore` on Three.js Postprocessing Imports (P2)

| File | `src/components/canvas/home/hero/hooks/useGhostScene.ts:3-12` |
|---|---|
| Issue | Five `// @ts-ignore` comments to suppress Three.js postprocessing import errors. Indicates outdated type definitions or incorrect import paths. |
| Fix | Use `@types/three` with the bundled `three/addons/*` path (Three.js ≥0.151) or install `three-stdlib` which has typed equivalents for all postprocessing passes. |

---

### 3.2 GhostScene (Home Hero) — renderer.domElement Inline Styles (P2)

| File | `src/components/canvas/home/hero/hooks/useGhostScene.ts:79-83` |
|---|---|
| Issue | `renderer.domElement.style.zIndex = '0'` is set via inline style, bypassing the CSS token system. Minor, but inconsistent. |
| Fix | Add a class to the canvas element and control z-index via Tailwind class `z-[var(--z-layer-base)]`. |

---

### 3.3 SceneInvalidator — Unguarded Global Event Listeners (P1)

| File | `src/components/sobre/3d/GhostScene.tsx:23-35` |
|---|---|
| Issue | `scroll` and `mousemove` global event listeners trigger `invalidate()` unconditionally. This causes R3F to re-render the Canvas on every mouse move across the entire page, including when the Beliefs section is not visible at all. |
| Fix | Gate the listeners with an `IntersectionObserver`. Only attach them when section is `isIntersecting`. Remove when leaving viewport. |

---

### 3.4 useGhostScene — No Explicit Geometry/Material Disposal (P1)

| File | `src/components/canvas/home/hero/hooks/useGhostScene.ts:cleanup` |
|---|---|
| Issue | Cleanup calls `sceneManager.cleanup()` but it is not confirmed that individual `THREE.Geometry` and `THREE.Material` instances are explicitly disposed (`.dispose()` called). Without it, WebGL contexts leak GPU memory on route navigation. |
| Fix | Ensure `cleanup()` iterates the scene graph and calls `geometry.dispose()`, `material.dispose()` on every mesh, then disposes the renderer itself via `renderer.dispose()`. |

---

### 3.5 HeaderGlassCanvas — useFrame on Always-Visible Component (P2)

| File | `src/components/canvas/header/HeaderGlassCanvas.tsx:89` |
|---|---|
| Issue | `useFrame` runs every RAF tick. The header canvas is always in the DOM. Unlike the Hero/Beliefs canvases, there is no IntersectionObserver gate or `frameloop="demand"` to pause rendering when idle. |
| Fix | Set `frameloop="demand"` on the `<Canvas>` and invalidate only on pointer/scroll events, or add an `IntersectionObserver` (the header is always visible so this may not help — consider `frameloop="demand"` + pointer-based `invalidate`). |

---

### 3.6 GhostCursor (573 lines) — No DPR Cap Assertion for Tiny Viewports (P2)

| File | `src/components/GhostCursor.tsx` |
|---|---|
| Issue | `maxDevicePixelRatio={0.65}` and `targetPixels={180000}` are passed from `FeaturedProjectAnimatedBackground`, which already contain reasonable caps. However, the component is 573 lines with inline shader code — verify `targetPixels` caps the canvas resolution correctly on 4K displays. |
| Action | Audit the canvas sizing logic in `GhostCursor.tsx` to confirm `Math.min(dpr, maxDevicePixelRatio)` is enforced. |

---

### 3.7 shuffleProjects — Potential Hydration Mismatch (P1)

| File | `src/lib/portfolio/shuffle-projects.ts` |
|---|---|
| Issue | When `seed` is undefined, `shuffleProjects` calls `Math.floor(Math.random() * 1000000)` — produces different results on server vs. client, potentially causing hydration mismatch errors. |
| Fix | Always pass a stable seed from the server (`new Date().getTime()` at SSR time is acceptable when passed as prop, as done in `page.tsx`). Alternatively, replace with `stableShuffle` from `stable-shuffle.ts`. |

---

## 4. NEXT.JS IMPROVEMENTS

### 4.1 Home Page (`/`) — No Revalidation Strategy (P1)

| File | `src/app/page.tsx` |
|---|---|
| Issue | No `export const revalidate` or `export const dynamic`. Projects are fetched at request time on every render (dynamic by default because of Supabase fetch). Portfolio page has `revalidate = 3600` — home page should too. |
| Fix | Add `export const revalidate = 3600;` to `src/app/page.tsx`. Projects change infrequently; ISR is appropriate. This drastically improves TTFB for the primary landing page. |

---

### 4.2 About Page (`/sobre`) — No Revalidation Strategy (P2)

| File | `src/app/sobre/page.tsx` |
|---|---|
| Issue | Static content with no dynamic data fetching. The page renders entirely static server markup, yet has no explicit `export const dynamic = 'force-static'` to guarantee build-time generation. |
| Fix | Add `export const dynamic = 'force-static'` to guarantee static generation at build time. |

---

### 4.3 Portfolio Slug (`/portfolio/[slug]`) — `force-dynamic` is Expensive (P2)

| File | `src/app/portfolio/[slug]/page.tsx:29` |
|---|---|
| Issue | `export const dynamic = 'force-dynamic'` — every project case page re-runs the Supabase query per request. Cases are rarely updated. |
| Fix | Replace with `export const revalidate = 3600` + `export async function generateStaticParams()` to pre-generate popular cases at build time. |

---

### 4.4 generateMetadata in Root layout — Antipattern (P2)

| File | `src/app/layout.tsx:13` |
|---|---|
| Issue | `export async function generateMetadata(): Promise<Metadata>` is used in the root layout, which is not a valid pattern in Next.js App Router. Root layouts cannot export `generateMetadata` — it is silently ignored. Metadata should come from `export const metadata` (static) in each route. |
| Fix | Remove `generateMetadata` from `layout.tsx`. Import and re-export `siteMetadata` as `export const metadata = siteMetadata`. |

---

### 4.5 SiteHeader — `if (!isMounted) return null` Pattern (P2)

| File | `src/components/layout/header/SiteHeader.tsx:167` |
|---|---|
| Issue | The header is hidden until hydration completes (`isMounted` state). This causes a visible layout shift and flash of missing navigation on first load. The header is critical above-the-fold content. |
| Fix | Use CSS-based initial state instead. Render the header server-side with static markup, use `useEffect` only for interactive features (menu open, active link detection). Consider moving the hydration guard to only the animated/interactive portions. |

---

## 5. ACCESSIBILITY

### 5.1 Canvas Elements Missing ARIA Labels (P1)

| Component | Status |
|---|---|
| `HomeHero` GhostScene canvas | Has `aria-label="Interactive 3D Ghost Portfolio Experience"` + `role="img"` on the renderer domElement (set manually in `useGhostScene.ts:85-89`) — PASS |
| `HeaderGlassCanvas` | Has `aria-hidden="true"` on the wrapper — PASS |
| `FeaturedProjectAnimatedBackground` | Has `aria-hidden="true"` on wrapper — PASS |
| `GhostScene /sobre` | Canvas wrapper has `pointer-events-none absolute inset-0` but **no `aria-hidden`** on the `<Canvas>` element itself — R3F renders a `<canvas>` without accessible attributes |

**Fix:** Add `aria-hidden="true"` to the `<Canvas>` element in `src/components/sobre/3d/GhostScene.tsx`.

---

### 5.2 BeliefManifesto — `aria-live` Off When Active (P2)

| File | `src/components/sobre/beliefs/BeliefManifesto.tsx:104` |
|---|---|
| Issue | `aria-live={active || isClimax ? 'polite' : 'off'}` — logical but the manifest text is rendered in the DOM at all times (just visually hidden). Screen readers may announce the text multiple times as `aria-live` toggles. |
| Fix | Use `aria-live="polite"` always, and control `aria-hidden` on the container when the section is not active. |

---

### 5.3 VideoManifesto — No `<track>` / Captions (P2)

| File | `src/components/home/hero/VideoManifesto.tsx` |
|---|---|
| Issue | Autoplay background video has no caption track. WCAG 2.1 1.2.2 requires captions for pre-recorded audio. |
| Note | Spec explicitly deferred this to a future iteration. Flagged here for tracking. |
| Fix | Add `<track kind="captions" src="/captions/manifesto-pt.vtt" srcLang="pt" default />` or mark video as `aria-hidden="true"` with `role="presentation"` if it is purely decorative (no meaningful audio). |

---

### 5.4 GhostSceneFallback — `fixed` Positioning Bug (P2)

| File | `src/components/sobre/3d/GhostSceneFallback.tsx:9` |
|---|---|
| Issue | Uses `fixed inset-0` which locks it to the viewport rather than its positioned parent. The primary GhostScene uses `absolute inset-0`. This inconsistency means the fallback covers the entire viewport (wrong visual) when displayed. |
| Fix | Replace `fixed` with `absolute`. |

---

### 5.5 SmoothScroll — `addListener` Deprecation Warning (P2)

| File | `src/components/layout/SmoothScroll.tsx:49` |
|---|---|
| Issue | `mediaQuery.addListener` / `removeListener` are deprecated (removed in Chrome 112+). Code has a fallback path that uses them. |
| Fix | Remove the `else` branch — `addEventListener`/`removeEventListener` on `MediaQueryList` is supported in all modern browsers. |

---

### 5.6 PortfolioModal — `setTimeout(50)` Focus (P1)

| File | `src/components/portfolio/PortfolioModal.tsx:43` |
|---|---|
| Issue | `setTimeout(() => closeRef.current?.focus(), 50)` — timing-based focus management is fragile. If animation takes longer than 50ms, focus fires before the element is visible. |
| Fix | Use `onAnimationComplete` callback from Framer Motion AnimatePresence to trigger focus after the entrance animation completes. |

---

## 6. PRIORITIZED TASK LIST

### P0 — Critical (Blocks User Experience)

| # | File | Issue |
|---|---|---|
| P0-01 | `PortfolioShowcase.tsx` | Title colors inverted vs. spec |
| P0-02 | `AboutWhatIDo.tsx` | Scroll-driven horizontal animation not wired |
| P0-03 | `GhostSceneFallback.tsx:10` | `zIndex: 70` covers Manifesto text on WebGL failure |

### P1 — Important (Spec Divergence, Performance, A11y)

| # | File | Issue |
|---|---|---|
| P1-01 | `CategoryStripe.tsx` | Float label `[what we love working on]` never rendered |
| P1-02 | `CategoryStripe.tsx` | Arrow badge rotation missing |
| P1-03 | `GhostScene.tsx` (sobre) | SceneInvalidator fires globally without IntersectionObserver guard |
| P1-04 | `GhostModel.tsx` (sobre) | `useGLTF.preload` at module top-level, not conditional |
| P1-05 | `BeliefManifesto.tsx` + 4 others | Raw `beliefZIndex` values instead of CSS var tokens |
| P1-06 | `AboutMethod.tsx` | `key={isMobile}` causes video remount on resize |
| P1-07 | `ProjectsGallery.tsx` | `once: false` viewport violates Silent Design |
| P1-08 | `PortfolioClient.tsx` | Double container (`std-grid` + inner `Container`) |
| P1-09 | `getTrackClasses()` | `top-[88px]` hardcoded — should use `--header-height` CSS var |
| P1-10 | `src/app/page.tsx` | No ISR revalidate (home fetches fresh on every request) |
| P1-11 | `supabase-test/page.tsx` | Debug route publicly accessible |
| P1-12 | `GhostScene /sobre` Canvas | Missing `aria-hidden="true"` on `<Canvas>` element |
| P1-13 | `useGhostScene.ts` | No confirmed explicit geometry/material `.dispose()` in cleanup |
| P1-14 | `shuffle-projects.ts` | Potential hydration mismatch when seed is undefined |
| P1-15 | `PortfolioModal.tsx:43` | `setTimeout(50)` focus — timing-fragile |

### P2 — Nice to Have (Polish, Architecture, Debt)

| # | File | Issue |
|---|---|---|
| P2-01 | `FeaturedProjectAnimatedBackground.tsx` | Aurora dead code in pool + null branch |
| P2-02 | `HomeHero.tsx` | 500ms fixed preloader timer not tied to real asset load |
| P2-03 | `GhostModel.tsx` (sobre) | Hardcoded Supabase URL — should use local path |
| P2-04 | `sobre/page.tsx` | No `force-static` export |
| P2-05 | `portfolio/[slug]/page.tsx` | `force-dynamic` — should be ISR + generateStaticParams |
| P2-06 | `layout.tsx:13` | `generateMetadata` in root layout is silently ignored by Next.js |
| P2-07 | `SiteHeader.tsx:167` | `isMounted` gate hides nav on first paint (CLS risk) |
| P2-08 | `FeaturedProjectsSection.tsx` | Missing `lg:gap-8` in Bento Grid |
| P2-09 | `HeaderGlassCanvas.tsx` | `useFrame` always running — no idle pause |
| P2-10 | `BeliefManifesto.tsx:104` | `aria-live` toggles — screen reader double-announce risk |
| P2-11 | `VideoManifesto` | No `<track>` captions (deferred per spec) |
| P2-12 | `GhostSceneFallback.tsx` | `fixed` instead of `absolute` positioning |
| P2-13 | `SmoothScroll.tsx:49` | Deprecated `addListener` in fallback branch |
| P2-14 | `shuffle-projects.ts` | Duplicate shuffle logic — consolidate with `stable-shuffle.ts` |
| P2-15 | `src/components/sobre/3d/GhostModel.tsx` | Duplicate of `shared/3d/GhostModel.tsx` — consolidate |
| P2-16 | `useGhostScene.ts:3-12` | 5x `@ts-ignore` — fix Three.js import paths |
| P2-17 | `beliefTokens.ts` + `globals.css` | Dual z-index sources — deprecate TS map |
| P2-18 | `AboutMethod.tsx` + `AboutClosing.tsx` | `useIsMobile` vs. `useMediaQuery` inconsistency — M6 from prior audit |

---

## 7. Summary

**Total issues found:** 33 (3 P0, 15 P1, 18 P2 — including 3 carried over from prior `/sobre` audit pending PRs)

**Codebase health:** Generally solid. Architecture, motion tokens, ISR, and accessibility foundations are well-implemented. The Ghost Design System is consistently applied with only the z-index dual-source issue remaining from the last audit cycle. Primary risk areas are the non-functional `AboutWhatIDo` horizontal scroll (P0), the `GhostSceneFallback` z-index that breaks Manifesto readability on WebGL failure (P0), and missing ISR on the home page (P1 performance).

**Next priorities:**
1. Fix P0 items before next deploy
2. Group P1 items into a single focused PR (z-index tokens + SceneInvalidator + ISR)
3. Track P2 items in backlog for next Sunday build day per workflow rules
