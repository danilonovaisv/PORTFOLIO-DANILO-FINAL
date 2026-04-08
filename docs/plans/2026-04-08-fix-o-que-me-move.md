# O Que Me Move Section Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the 4 priority bugs in the `06-O-QUE-ME-MOVE` section ensuring the Ghost 3D layer is correctly stacked, background interpolates without fades, texts do not clip, and the final manifesto displays perfectly responsively.

**Architecture:** We will adjust stacking contexts, eliminating hardware acceleration overrides (`translate-z-0`), remove the overlay opacity layer hiding the correct `backgroundColor` interpolation, swap Framer Motion `x` offsets to `y` to avoid overlapping or clipping horizontal boundaries, animate the wrapper layout for the mobile 3D Ghost using `useTransform` with margin/flex adjustments, and rewrite the final manifesto overlay typography to use bounded `clamp()` logic.

**Tech Stack:** Next.js 16 (App Router), Framer Motion, Tailwind CSS, React Three Fiber.

---

### Task 1: Update the Background fading and Overlay removal in Hook

**Files:**
- Modify: `src/hooks/useBeliefsAnimation.ts`

**Step 1: Edit the hook to remove `overlayOpacity` logic**
- Remove `overlayOpacity` useTransform block.
- Remove `overlayOpacity` and `prefersReducedMotion` return values if no longer needed, but `prefersReducedMotion` is used by components, so keep it. Remove only `overlayOpacity`.

**Step 2: Commit**
```bash
git add src/hooks/useBeliefsAnimation.ts
git commit -m "fix: remove black overlay opacity mask to allow pure HSL background interpolation"
```

### Task 2: Refactor stacking context in Main Section Component

**Files:**
- Modify: `src/components/sobre/sections/AboutBeliefs.tsx`

**Step 1: Modify structural layout**
- Remove `<div className="absolute inset-0 z-10 w-full h-full pointer-events-none">... <motion.div className="... bg-black" style={{ opacity: overlayOpacity }} /> ... </div>`.
- Remove `translate-z-0` from `<div className="w-full h-full relative translate-z-0">` wrapping `<GhostScene />`.
- Update `GhostScene` wrapper to position dynamically on mobile from top-left to center. We can pass a prop or handle via `GhostScene` interior CSS directly, or wrap it purely in `AboutBeliefs`. 

**Step 2: Add dynamic mobile ghost layout**
```tsx
const ghostX = useTransform(scrollYProgress, [0, 0.8], ["-25vw", "0vw"]);
const ghostY = useTransform(scrollYProgress, [0, 0.8], ["-25vh", "0vh"]);
// use in motion.div wrapping GhostScene for mobile
```

**Step 3: Commit**
```bash
git add src/components/sobre/sections/AboutBeliefs.tsx
git commit -m "fix: resolve z-indexing of GhostScene and apply dynamic mobile top-left to center positioning"
```

### Task 3: Adjust Desktop and Mobile Text Layers to Use Y Axis Motion

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx`
- Modify: `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx`

**Step 1: Switch Framer Motion initial/exit variants**
- Change Desktop `initial: { opacity: 0.3, x: -100, filter: 'blur(6px)' }` -> `initial: { opacity: 0, y: 40, filter: 'blur(6px)' }` and `exit: { opacity: 0, y: -40, filter: 'blur(6px)' }`. (also correct opacity initial to 0 for better fade).
- Change Mobile `x: -24` -> `y: 20` and `x: 24` -> `y: -20`.

**Step 2: Commit**
```bash
git add src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx src/components/sobre/beliefs/BeliefMobileTextLayer.tsx
git commit -m "fix: prevent text clipping by switching horizontal slide motion to vertical bottom-up motion"
```

### Task 4: Fix Manifesto Final Typography Clamping

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx`

**Step 1: Replace raw VW with responsive clamps**
- Change `"text-[12vw] md:text-[10rem]"` to `"text-[clamp(3.5rem,12vw,10rem)]"`
- Change `"text-[21vw] md:text-[17rem]"` to `"text-[clamp(6rem,19vw,17rem)]"`
- Change `"text-[17vw] md:text-[13rem]"` to `"text-[clamp(4.5rem,15vw,13rem)]"`

**Step 2: Commit**
```bash
git add src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx
git commit -m "fix: apply strict clamp rules to final manifesto typography to prevent viewport horizontal clipping"
```
