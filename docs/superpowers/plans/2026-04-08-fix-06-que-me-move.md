# Fix 06-O-QUE-ME-MOVE — Stacking, BG, Text Clipping, Manifesto Climax

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the four priority bugs in the `AboutBeliefs` section of `/sobre`: Ghost 3D layer order, HSL background continuity, text clipping, and manifesto final climax.

**Architecture:** Five targeted edits across five files — no new files, no new abstractions. All fixes preserve the existing scroll-progress-driven animation system (`useBeliefsAnimation` + `useScroll`). The core insight driving every fix is the same: replace `position: fixed` text layers (which create compositor conflicts) with `absolute + sticky`, remove the `bg-background` overlay that masks HSL interpolation, and remove `overflow-hidden` clamps that clip the manifesto text.

**Tech Stack:** React 19, Next.js 16, Framer Motion 12, React Three Fiber 9, Tailwind CSS 4, TypeScript.

---

## Diagnostic Summary — Root Causes

### Bug 1 · Ghost buried behind text

`BeliefDesktopTextLayer` and `BeliefMobileTextLayer` use `position: fixed`. Because the outer `MotionSection` has the `isolate` Tailwind class (CSS `isolation: isolate`), all fixed descendants share its stacking context. Framer Motion's opacity `MotionValue` on each text layer triggers `will-change: opacity`, which promotes those elements to separate GPU compositor layers. Browsers can order compositor layers above non-compositor siblings regardless of z-index. The Ghost Canvas at z-50 is absolute-positioned inside the same stacking context, but the fixed + composited text at z-40 renders above it on some browsers.

**Fix:** Convert text layers from `position: fixed` to `position: absolute` with an inner `position: sticky` div — the same pattern used by the BG, overlay, header, and Ghost layers. All layers are then in the same coordinate system and stacking is fully predictable.

### Bug 2 · Background fades instead of interpolating smoothly

There is a z-10 div in `AboutBeliefs.tsx` whose `motion.div` has `bg-background` (solid dark `#040013`) and an `overlayOpacity` MotionValue. The `overlayOpacity` logic (in `useBeliefsAnimation.ts`) peaks at `1.0` at 30% of each phrase segment, completely covering the HSL background with the solid dark colour. The user sees a dark flash between phrases — a literal simple fade — instead of the continuous HSL blending the hook already computes.

**Fix:** Delete the entire overlay div. The HSL interpolation in `useBeliefsAnimation.ts` is already smooth and continuous; it does not need a masking layer.

### Bug 3 · Manifesto text clipped

`BeliefFinalSectionOverlay` wraps its text in `<section className="... overflow-hidden ...">`. The manifesto uses extreme viewport-relative sizes (`text-[21vw]` for "GHOST" on mobile, `text-[17rem]` on desktop). Any pixel that extends slightly beyond the flex container's alignment bounds is clipped by `overflow-hidden`, chopping letters on narrow viewports.

**Fix:** Remove `overflow-hidden` from that section element. The parent sticky container (`h-screen w-full`) already constrains vertical space; the text is designed to fill it intentionally.

### Bug 4 · Manifesto climax has no entrance motion

`BeliefFinalSectionOverlay` uses Framer Motion `initial / animate` props (`opacity: 0 → 1, y: 12 → 0`). These run once at **mount time**, not at scroll position. By the time the user scrolls to the manifesto, the animation finished long ago and the component is already at its final state. The parent's `showFinalManifesto` MotionValue (0 → 1) controls visibility via opacity but there is no scroll-driven scale, blur, or translateY inside the component.

**Fix:** Remove `initial / animate / transition` from `BeliefFinalSectionOverlay`. Receive the `showFinalManifesto` MotionValue as a `showProgress` prop, derive `y`, `scale`, and `filter` from it inside the component, and apply them to the Container element.

### Bug 5 · Ghost sticky container has overflow-hidden

The Ghost's sticky div (`sticky top-0 w-full h-screen overflow-hidden`) clips the Canvas when the mobile Ghost is transformed `x: -28vw, y: -30vh` relative to its centered starting point. At certain viewport sizes and scroll positions, a corner of the ghost-figure div crosses the sticky container's clipping boundary.

**Fix:** Remove `overflow-hidden` from the Ghost sticky div. The parent `absolute inset-0` wrapper constrains the section boundaries; the sticky layer does not need its own overflow clip.

---

## File Map

| File | Type | Responsibility after change |
|------|------|-----------------------------|
| `src/components/sobre/sections/AboutBeliefs.tsx` | Modify | Remove z-10 overlay div; remove `overflow-hidden` from Ghost sticky; add `showProgress` prop to `BeliefFinalSectionOverlay` call |
| `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx` | Modify | `fixed inset-0` → `absolute inset-0` + inner `sticky top-0 h-screen` |
| `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx` | Modify | Same pattern as desktop layer |
| `src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx` | Modify | Add `showProgress` prop; remove `initial/animate`; add scroll-driven `y`, `scale`, `filter`; remove `overflow-hidden` |
| `src/hooks/useBeliefsAnimation.ts` | No change needed | `overlayOpacity` stays in hook (harmless); removing it is optional cleanup |

---

## Task 1: Fix BeliefDesktopTextLayer — fixed → absolute+sticky

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx:65-87`
- Test: Run dev server and scroll to section on viewport ≥768px

- [ ] **Step 1: Read the current file**

```bash
# Confirm current line numbers before editing
head -n 90 src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx
```

- [ ] **Step 2: Replace the outer wrapper — fixed → absolute+sticky**

In `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx`, replace the outer `return` block of `BeliefDesktopTextLayer` (lines 65–87):

```tsx
  return (
    <motion.div
      aria-hidden="true"
      data-testid="belief-text-layer-desktop"
      className="pointer-events-none absolute inset-0 z-40 hidden md:block"
      style={prefersReducedMotion ? undefined : { opacity: sectionOpacity }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center pl-[15vw]">
        <AnimatePresence mode="wait">
          {activePhrase ? (
            <DesktopPhrase
              key={`${activeIndex}-${activePhrase}`}
              text={activePhrase}
              lineTestId={`belief-line-${activeIndex}`}
              MotionDiv={Container}
              prefersReducedMotion={prefersReducedMotion}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
```

The only changes from the original:
- `fixed inset-0 z-40 hidden md:flex` → `absolute inset-0 z-40 hidden md:block`
- The inner `div` gains `sticky top-0 h-screen w-full` and keeps `flex items-center pl-[15vw]`

- [ ] **Step 3: Verify the file builds without errors**

```bash
pnpm run typecheck 2>&1 | grep -E "BeliefDesktopTextLayer|error TS" | head -20
```

Expected: no output (no errors for this file).

- [ ] **Step 4: Commit**

```bash
git add src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx
git commit -m "fix(sobre): convert desktop belief text layer from fixed to absolute+sticky"
```

---

## Task 2: Fix BeliefMobileTextLayer — fixed → absolute+sticky

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx:67-88`

- [ ] **Step 1: Replace the outer wrapper and inner structure**

In `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx`, replace the `return` block of `BeliefMobileTextLayer` (lines 67–88):

```tsx
  return (
    <motion.div
      aria-hidden="true"
      data-testid="belief-text-layer-mobile"
      className="absolute inset-0 z-40 pointer-events-none md:hidden"
      style={prefersReducedMotion ? undefined : { opacity: sectionOpacity }}
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute bottom-[20vh] left-0 right-0 px-6 text-center">
          <AnimatePresence mode="wait">
            {activePhrase ? (
              <MobilePhrase
                key={`${activeIndex}-${activePhrase}`}
                text={activePhrase}
                MotionDiv={Container}
                prefersReducedMotion={prefersReducedMotion}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
```

Changes from original:
- `fixed inset-0 z-40 pointer-events-none md:hidden` → `absolute inset-0 z-40 pointer-events-none md:hidden` (removed `fixed`)
- Wrap the inner content in `<div className="sticky top-0 h-screen w-full">` 
- The phrase container `absolute bottom-[20vh] left-0 right-0 px-6 text-center` stays unchanged inside the sticky wrapper

- [ ] **Step 2: Verify types**

```bash
pnpm run typecheck 2>&1 | grep -E "BeliefMobileTextLayer|error TS" | head -20
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/beliefs/BeliefMobileTextLayer.tsx
git commit -m "fix(sobre): convert mobile belief text layer from fixed to absolute+sticky"
```

---

## Task 3: Remove BG overlay — enable true HSL continuity

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx:98-103`

- [ ] **Step 1: Locate and delete the overlay div**

In `src/components/sobre/sections/AboutBeliefs.tsx`, delete these lines (the z-10 overlay):

```tsx
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <motion.div
          className="sticky top-0 w-full h-screen bg-background pointer-events-none"
          style={prefersReduced ? undefined : { opacity: overlayOpacity }}
        />
      </div>
```

- [ ] **Step 2: Remove unused `overlayOpacity` from the destructure**

In the same file, find the destructure of `useBeliefsAnimation`:

```tsx
  const {
    backgroundColor,
    overlayOpacity,        // ← remove this line
    ghostIntensity,
    showFinalManifesto,
  } = useBeliefsAnimation({
```

After removal:

```tsx
  const {
    backgroundColor,
    ghostIntensity,
    showFinalManifesto,
  } = useBeliefsAnimation({
    scrollYProgress,
    totalPhrases: PHRASES.length,
  });
```

- [ ] **Step 3: Verify types**

```bash
pnpm run typecheck 2>&1 | grep -E "AboutBeliefs|overlayOpacity|error TS" | head -20
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix(sobre): remove dark overlay that masked HSL background interpolation"
```

---

## Task 4: Fix Ghost sticky container — remove overflow-hidden

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx:163` (the Ghost sticky div)

- [ ] **Step 1: Find and edit the Ghost sticky container**

In `AboutBeliefs.tsx`, in the Ghost wrapper block (z-50), find the sticky div:

```tsx
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex items-center justify-center">
```

Change to (remove `overflow-hidden`):

```tsx
        <div className="sticky top-0 w-full h-screen pointer-events-none flex items-center justify-center">
```

- [ ] **Step 2: Verify types**

```bash
pnpm run typecheck 2>&1 | grep -E "AboutBeliefs|error TS" | head -20
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix(sobre): remove overflow-hidden from Ghost sticky container to prevent canvas clipping"
```

---

## Task 5: Fix BeliefFinalSectionOverlay — remove clipping and add scroll-driven climax

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx`

This task has two sub-goals:
1. Remove `overflow-hidden` from the section wrapper (fixes text clipping)
2. Replace mount animation with scroll-driven `y + scale + filter` (fixes climax)

- [ ] **Step 1: Update the component's interface to accept `showProgress`**

Replace the interface at the top of `BeliefFinalSectionOverlay.tsx`:

```tsx
// Before:
interface BeliefFinalSectionOverlayProps {
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
}

// After:
import { MotionValue, useMotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionOverlayProps {
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
  showProgress?: MotionValue<number>; // 0 → 1 as manifesto scrolls in
}
```

Note: `motion` is already imported. Add `useMotionValue` and `useTransform` to the existing import from `'framer-motion'`. The full import line should be:

```tsx
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';
```

- [ ] **Step 2: Replace the full component implementation**

Replace the entire `BeliefFinalSectionOverlay` function with:

```tsx
export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ MotionDiv, prefersReducedMotion, showProgress }) => {
  const Container = MotionDiv ?? motion.div;

  // Derive scroll-driven entrance transforms.
  // showProgress: 0 = invisible / entering, 1 = fully revealed.
  const staticProgress = useMotionValue(1);
  const progress = showProgress ?? staticProgress;

  const y = useTransform(progress, [0, 1], [48, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const filter = useTransform(
    progress,
    [0, 0.7],
    ['blur(14px)', 'blur(0px)']
  );

  const containerStyle = prefersReducedMotion
    ? {}
    : { y, scale, filter };

  return (
    <section className="flex h-full w-full items-center justify-center px-4 md:px-6 pointer-events-none">
      <Container
        className="flex w-full max-w-[100vw] flex-col items-center justify-center text-center font-display leading-[0.82] text-[#fcffff]"
        style={containerStyle}
      >
        <div className="text-[12vw] md:text-[10rem] tracking-[-0.085em] uppercase font-black">
          ISSO É
        </div>
        <div className="relative z-10 text-[21vw] md:text-[17rem] font-black tracking-[-0.085em] uppercase">
          GHOST
        </div>
        <div className="text-[17vw] md:text-[13rem] tracking-[-0.085em] uppercase font-black">
          DESIGN.
        </div>
      </Container>
    </section>
  );
};
```

Key changes:
- `overflow-hidden` removed from `<section>`
- `initial / animate / transition` removed (were mount-time, not scroll-driven)
- Added `y`, `scale`, `filter` derived from `showProgress` MotionValue
- `containerStyle` applied via `style` (framer-motion processes MotionValues here)

- [ ] **Step 3: Pass `showFinalManifesto` to the component in `AboutBeliefs.tsx`**

In `src/components/sobre/sections/AboutBeliefs.tsx`, find the `BeliefFinalSectionOverlay` call:

```tsx
// Before:
          <BeliefFinalSectionOverlay
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
          />

// After:
          <BeliefFinalSectionOverlay
            MotionDiv={MotionDiv}
            prefersReducedMotion={prefersReduced}
            showProgress={showFinalManifesto}
          />
```

- [ ] **Step 4: Run full typecheck**

```bash
pnpm run typecheck 2>&1 | grep "error TS" | head -30
```

Expected: no output (zero type errors).

- [ ] **Step 5: Run lint**

```bash
pnpm run lint 2>&1 | grep -E "error|warning" | grep -v "node_modules" | head -30
```

Expected: no new errors from modified files.

- [ ] **Step 6: Commit**

```bash
git add src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx \
        src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix(sobre): scroll-driven manifesto climax animation and remove overflow-hidden clipping"
```

---

## Task 6: Verify full build passes

- [ ] **Step 1: Run build**

```bash
pnpm run build 2>&1 | tail -30
```

Expected output contains: `✓ Compiled successfully` or `Route (app)` table with no errors.

- [ ] **Step 2: If build fails, read the error and fix before proceeding**

Common failure: TypeScript error on `containerStyle` because Framer Motion's `style` prop expects `MotionStyle`, not a plain object with MotionValues. If this happens, cast:

```tsx
import type { MotionStyle } from 'framer-motion';

const containerStyle: MotionStyle = prefersReducedMotion
  ? {}
  : { y, scale, filter };
```

Run build again after fixing.

- [ ] **Step 3: Commit the fix if needed**

```bash
git add -p
git commit -m "fix(sobre): cast containerStyle to MotionStyle to satisfy TypeScript"
```

---

## Layer Table (final state after all tasks)

| z-index | Element | Position pattern | Purpose |
|---------|---------|-----------------|---------|
| z-0 | BG color div | `absolute` → `sticky` | HSL background interpolation |
| z-20 | Phrase sentinels | `relative` | Scroll space (each `h-screen`) |
| z-[30] | BeliefFixedHeader | `absolute` → `sticky` | Intro text ("Acredito no design...") |
| z-40 | Text phrases (desktop/mobile) | `absolute` → `sticky` (after fix) | Animated phrase display |
| z-40 | Manifesto overlay wrapper | `absolute` → `sticky` | Scroll-driven opacity container |
| z-50 | Ghost 3D | `absolute` → `sticky` | Authoritative top layer |

> Note: z-40 appears twice (text phrases and manifesto wrapper). The manifesto wrapper is toggled by `showFinalManifesto` opacity — when opacity = 0, it does not compete visually. When opacity > 0 (late in scroll), the phrase text layer has `sectionOpacity` = 0, so there is no visible conflict.

---

## Acceptance Criteria

### Visual
- [ ] Ghost 3D figure is visible above all text content at all scroll positions within the section
- [ ] Background transitions smoothly through HSL values (blue → purple → pink → blue ...) with no dark flash between phrases
- [ ] Each phrase enters and exits cleanly (opacity + blur + translateX, no overlapping render)
- [ ] "ISSO É / GHOST / DESIGN." is fully readable at all breakpoints — no characters are clipped on any edge
- [ ] The manifesto entrance feels impactful: text sharpens and rises from below simultaneously as scroll reaches 100%
- [ ] On mobile: Ghost starts top-left, moves to center during climax (existing behaviour preserved)
- [ ] On desktop: Ghost remains centred throughout (existing behaviour preserved)

### Technical
- [ ] `pnpm run typecheck` exits with 0 errors
- [ ] `pnpm run lint` exits with 0 new errors from modified files
- [ ] `pnpm run build` completes without errors
- [ ] No `position: fixed` remains in any `beliefs/` component
- [ ] No `overflow-hidden` remains inside the `AboutBeliefs` stacking context (except on `overflow-x-clip` at the section root, which is intentional)
- [ ] `overlayOpacity` is no longer destructured in `AboutBeliefs.tsx`
- [ ] `BeliefFinalSectionOverlay` has no `initial`, `animate`, or `transition` props
