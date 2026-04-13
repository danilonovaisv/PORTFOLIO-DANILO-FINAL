# AboutBeliefs — Animation Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 4 gaps between the spec/anima.mov reference and the current implementation so the "O Que Me Move" section renders correctly on both desktop and mobile.

**Architecture:** The section uses a layered scroll-driven system: background color sentinels (z-10) → sticky header (z-30) → text layers (z-40, desktop hidden on mobile, mobile hidden on desktop) → final manifesto overlay (z-40) → Ghost 3D canvas (z-50). The `scrollYProgress` from `useScroll` drives all animation timing.

**Tech Stack:** Framer Motion 12, React Three Fiber 9, Tailwind CSS 4, Next.js App Router, TypeScript strict.

---

## Analysis: What the Reference Spec / anima.mov Shows vs Current Code

| Issue | Spec / Ref | Current Code | Severity |
|-------|-----------|-------------|---------|
| Desktop phrases | Vertical y: 20→0→-20 on left side | `BeliefDesktopTextLayer` **imported but NOT rendered** in `AboutBeliefs.tsx` | 🔴 CRITICAL |
| Scroll offset | `['start start', 'end end']` | `['start end', 'end end']` (regressed) | 🔴 HIGH |
| Mobile Ghost position | Starts top-left (20% from top), ends centered | `x: -28vw, y: -30vh` transforms, but `transformOrigin: '20% 20%'` may compound incorrectly | 🟡 MEDIUM |
| Desktop text column | Left cols (1-5 of 12), max ~38vw | `max-w-[40vw]` with `pl-8 lg:pl-16` — slightly wide, may overlap Ghost | 🟡 LOW |

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/sobre/sections/AboutBeliefs.tsx` | **Modify** | Add `BeliefDesktopTextLayer` to JSX; fix scroll offset |
| `src/components/sobre/3d/GhostScene.tsx` | **Modify** | Refine mobile Ghost x/y offset keyframes |
| `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx` | **Modify** | Tighten `max-w` to prevent overlap with Ghost |

---

## Task 1: Add BeliefDesktopTextLayer to AboutBeliefs.tsx

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx:55-160`

`BeliefDesktopTextLayer` is imported at line 16 but never appears in the JSX. It needs to be added as a sibling to `BeliefMobileTextLayer` — both reference the same `scrollYProgress` and `PHRASES` array. The layer uses `hidden md:block` internally so it won't appear on mobile.

- [ ] **Step 1: Open and read the current JSX structure**

Read `src/components/sobre/sections/AboutBeliefs.tsx` lines 113–158 to confirm that `BeliefDesktopTextLayer` is missing (not just commented out).

Expected: `<BeliefDesktopTextLayer>` appears nowhere between the `</div>` that closes Layer 1 and the final Ghost layer.

- [ ] **Step 2: Add the desktop text layer to the JSX**

In `src/components/sobre/sections/AboutBeliefs.tsx`, add the desktop layer immediately after `BeliefMobileTextLayer`. The full diff is:

```tsx
      {/* ═══════════════════════════════════════════════════
          LAYER 2: Texto Mobile Fixed no Footer
          ═══════════════════════════════════════════════════ */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={prefersReduced ? undefined : scrollYProgress}
        MotionDiv={prefersReduced ? 'div' : motion.div}
        prefersReducedMotion={prefersReduced}
      />

      {/* ═══════════════════════════════════════════════════
          LAYER 2B: Texto Desktop (hidden on mobile)
          ═══════════════════════════════════════════════════ */}
      <BeliefDesktopTextLayer
        phrases={PHRASES}
        scrollYProgress={prefersReduced ? undefined : scrollYProgress}
        MotionDiv={prefersReduced ? 'div' : motion.div}
        prefersReducedMotion={prefersReduced}
      />
```

The insertion point is after the closing `/>` of `BeliefMobileTextLayer` and before the `{/* LAYER 3 */}` comment.

- [ ] **Step 3: Run the dev server and visually verify**

```bash
cd /Users/danilonovais/PORTFOLIO-DANILO-FINAL
pnpm run dev
```

Open `http://localhost:3000/sobre`, scroll into the "O Que Me Move" section, and verify that phrases now appear on the left side of the desktop layout.

Expected: italic `blueAccent` phrases cycle on the left of the screen while scrolling. Ghost remains on right.

- [ ] **Step 4: Commit**

```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix(beliefs): render BeliefDesktopTextLayer — desktop phrases were invisible"
```

---

## Task 2: Fix Scroll Offset Regression

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx:55-58`

The spec (changelog 2026-04-06) explicitly states the offset must be `['start start', 'end end']` — the scroll progress should run 0→1 as the section top crosses the viewport top until the section bottom crosses the viewport bottom. The current `['start end', 'end end']` starts at 0 when the section *bottom* enters the viewport, compressing all animation into a shorter window and causing early entry of text before Ghost/Header are visible.

- [ ] **Step 1: Edit the useScroll call**

In `src/components/sobre/sections/AboutBeliefs.tsx`, find:

```tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
```

Replace with:

```tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
```

- [ ] **Step 2: Verify scroll timeline in browser**

With dev server running, scroll into the section. Verify sequence:
1. Header (`BeliefFixedHeader`) fades in first (scrollYProgress ~0.05–0.12)
2. Ghost enters (scrollYProgress ~0.02–0.12)
3. First phrase appears only after Ghost/Header are fully visible (scrollYProgress ~0.10+)
4. Phrases cycle through 6 segments between 0.10 and 0.82
5. Manifesto fades in at ~0.86+

Expected: The cinematic sequence matches the `anima.mov` reference — no premature phrase entries.

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix(beliefs): restore scroll offset to ['start start','end end'] per spec"
```

---

## Task 3: Refine Mobile Ghost Positioning

**Files:**
- Modify: `src/components/sobre/3d/GhostScene.tsx:143-167`

Spec: Ghost starts at "20% from top of section, left-aligned". The current code uses `x: ['-28vw', '-28vw', '-14vw', '0vw']` and `y: ['-30vh', '-30vh', '-15vh', '0vh']` with `transformOrigin: '20% 20%'`. The issue is the combination of `transformOrigin: '20% 20%'` with `scale` transforms creates a non-intuitive displacement. The better approach is to keep `transformOrigin: '50% 50%'` (default) and use only x/y offsets for positioning, making it predictable.

Additionally, the spec says on mobile: Ghost is to the **left** and starts at 20% from top. This means:
- Horizontal: Ghost should be pushed to the left (~30–35% of viewport width from center = `-30vw` to `-35vw`)
- Vertical: 20% from top of a full-height screen = center + (-30vh offset from center)

- [ ] **Step 1: Update mobile x/y keyframes in GhostScene**

In `src/components/sobre/3d/GhostScene.tsx`, find the `x`, `y`, `scale`, and outer `motion.div` style:

```tsx
  const x = useTransform(
    scrollProgress,
    isMobile ? [0, 0.14, 0.86, 1] : [0, 1],
    isMobile ? ['-28vw', '-28vw', '-14vw', '0vw'] : ['0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    isMobile ? [0, 0.14, 0.86, 1] : [0, 1],
    isMobile ? ['-30vh', '-30vh', '-15vh', '0vh'] : ['0vh', '0vh']
  );
```

And the `transformOrigin` in the outer `motion.div`:

```tsx
      transformOrigin: isMobile ? '20% 20%' : '50% 50%',
```

Replace all three with:

```tsx
  const x = useTransform(
    scrollProgress,
    isMobile ? [0, 0.12, 0.82, 1] : [0, 1],
    isMobile ? ['-32vw', '-32vw', '-16vw', '0vw'] : ['0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    isMobile ? [0, 0.12, 0.82, 1] : [0, 1],
    isMobile ? ['-28vh', '-28vh', '-12vh', '0vh'] : ['0vh', '0vh']
  );
```

And update `transformOrigin` to always `'50% 50%'`:

```tsx
      transformOrigin: '50% 50%',
```

This positions the Ghost at approximately 20% from the top (28vh above center) and well to the left (32vw to the left of center), then smoothly moves it to center for the manifesto climax.

- [ ] **Step 2: Verify mobile layout in browser**

Resize browser to 375px width. Scroll into the section. Verify:
1. Ghost appears top-left at start (above the fold center, pushed left)
2. `BeliefFixedHeader` appears top-right (not overlapping Ghost)
3. Mobile phrases appear at bottom-center
4. At scroll end (~progress 0.82–1.0), Ghost transitions toward center
5. Manifesto "ISSO É / GHOST / DESIGN." is visible with Ghost behind it

- [ ] **Step 3: Check desktop is unaffected**

Resize to 1440px. Scroll through the section. Ghost should stay centered (no x/y movement on desktop).

- [ ] **Step 4: Commit**

```bash
git add src/components/sobre/3d/GhostScene.tsx
git commit -m "fix(ghost-scene): calibrate mobile Ghost offset to spec (top-left → center)"
```

---

## Task 4: Tighten Desktop Text Column Width

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx:72-87`

The Ghost takes the right half of the viewport (`md:w-1/2`). The desktop text container currently uses `max-w-[40vw]` which could theoretically overlap the left edge of the Ghost. Per spec, text should occupy cols 1-5 of a 12-col grid (~38% width). Reducing to `max-w-[36vw]` with the existing `pl-8 lg:pl-16` ensures clean separation.

- [ ] **Step 1: Update max-w in DesktopPhrase container**

In `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx`, find:

```tsx
      <Container
        className="pointer-events-none flex w-full max-w-[40vw] flex-col justify-center lg:max-w-[34vw]"
```

Replace with:

```tsx
      <Container
        className="pointer-events-none flex w-full max-w-[38vw] flex-col justify-center lg:max-w-[32vw]"
```

- [ ] **Step 2: Visual check at 1280px and 1920px**

Scroll through section at both widths. Verify:
- No text overlaps the Ghost on the right
- Text is comfortably readable in left third of screen
- Ghost maintains full presence in right half

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx
git commit -m "fix(beliefs): reduce desktop text max-w to prevent ghost overlap"
```

---

## Task 5: Build + Type Check + E2E Verification

**Files:**
- Run: lint, typecheck, build, and E2E test suite

- [ ] **Step 1: Run build-check**

```bash
cd /Users/danilonovais/PORTFOLIO-DANILO-FINAL
pnpm run build-check
```

Expected output: `0 errors` from tsc, `0 warnings` from ESLint (or only pre-existing ones). Build succeeds.

If TypeScript errors appear:
- Missing `BeliefDesktopTextLayerProps` — check import from `@/components/sobre/beliefs`
- MotionValue type mismatch — wrap in `prefersReduced ? 'div' : motion.div` pattern (same as mobile layer)

- [ ] **Step 2: Run E2E tests**

```bash
pnpm test:e2e -- --project=chromium test/e2e/about-beliefs.spec.ts
```

Expected: all tests pass. Key assertions:
- `ghost-figure` visible with width > 200px
- `BeliefFixedHeader` opacity > 0.9 when scrolled into section
- First phrase (belief-line-0) is visible during section scroll

- [ ] **Step 3: If E2E fails on belief-line-0**

The test may now pass `belief-line-0` since we added the desktop layer. If it previously failed because no desktop phrase existed, it should now pass. If it fails on timing, check that `BELIEF_INTRO_END = 0.1` is reachable under the new `['start start', 'end end']` offset — open the test file at `test/e2e/about-beliefs.spec.ts` and verify the scroll steps align with the new offset.

- [ ] **Step 4: Final commit if any test fixes needed**

```bash
git add -A
git commit -m "test(e2e): align about-beliefs spec with corrected scroll offset"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Desktop phrases — Task 1 adds `BeliefDesktopTextLayer`
- ✅ Correct scroll offset — Task 2 restores `['start start', 'end end']`
- ✅ Mobile Ghost top-left positioning — Task 3 calibrates x/y offsets
- ✅ Text/Ghost column separation — Task 4 tightens `max-w`
- ✅ Build/E2E verification — Task 5

**Items intentionally NOT changed (working correctly):**
- `BeliefMobileTextLayer`: horizontal x: ±24 animation ✅
- `BeliefFixedHeader`: MorphText animation, desktop center+right / mobile top-right ✅
- `BeliefFinalSectionOverlay`: scroll-driven ISSO É / GHOST / DESIGN. reveal ✅
- `GhostModel` using local `/site.assets/3d/ghost-v1.glb` ✅
- `useBeliefsAnimation` constants (`BELIEF_INTRO_END=0.1`, `BELIEF_PHRASE_ZONE_END=0.82`, `BELIEF_FINAL_START=0.86`) ✅
- Background color system via CSS `transition-colors` per `BeliefSection` ✅

**Type consistency check:**
- `BeliefDesktopTextLayer` props match `BeliefMobileTextLayer` interface — both accept `{ phrases, scrollYProgress, MotionDiv, prefersReducedMotion }` ✅
- `scrollYProgress` type is `MotionValue<number> | undefined` in both ✅

---

## Quick Summary for Oral Handoff

| Task | File | Change | Why |
|------|------|--------|-----|
| 1 | `AboutBeliefs.tsx` | Add `<BeliefDesktopTextLayer>` to JSX | Component was imported but never rendered |
| 2 | `AboutBeliefs.tsx` | `['start end','end end']` → `['start start','end end']` | Regressed offset compresses animation timeline |
| 3 | `GhostScene.tsx` | x: -32vw/y: -28vh, remove 20%/20% transformOrigin | More predictable mobile positioning |
| 4 | `BeliefDesktopTextLayer.tsx` | `max-w-[38vw]`/`lg:max-w-[32vw]` | Prevent text overlapping Ghost half |
| 5 | — | `pnpm run build-check` + `pnpm test:e2e` | Verify no regressions |
