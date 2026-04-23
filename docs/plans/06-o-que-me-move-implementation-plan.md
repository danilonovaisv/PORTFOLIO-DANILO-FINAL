# Implementation Plan — 06-O-QUE-ME-MOVE Audit & Correction
**Version:** v2.0 — 2026-04-23
**Auditor:** Mission Control Orchestrator (scheduled task, automated)
**Blueprint reference:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`
**Status:** AWAITING HUMAN APPROVAL — no code written

> v2.0 replaces v1.0 (2026-04-23). The previous plan was auditing an older code state; several issues from v1.0 have since been resolved. This plan reflects the actual current codebase.

---

## 1. Objective

Audit section **06-O-QUE-ME-MOVE** against the v3 adjustment blueprint, identify remaining deviations, and plan surgical corrections for human approval before any code is modified.

---

## 2. Context Analysed

Files read in this audit session:

| File | Status |
|------|--------|
| `src/components/sobre/sections/AboutBeliefs.tsx` | Read |
| `src/hooks/useBeliefsScroll.ts` | Read |
| `src/components/sobre/beliefs/BeliefBackground.tsx` | Read |
| `src/components/sobre/beliefs/BeliefOverlay.tsx` | Read |
| `src/components/sobre/beliefs/BeliefFixedHeader.tsx` | Read |
| `src/components/sobre/beliefs/BeliefScrollText.tsx` | Read |
| `src/components/sobre/beliefs/BeliefManifesto.tsx` | Read |
| `src/components/sobre/3d/GhostScene.tsx` | Read |
| `src/store/beliefStore.ts` | Read |
| `src/config/motion.ts` | Read |
| `src/app/globals.css` | Read (CSS variables) |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md` | Read (blueprint) |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` | Read (prior state doc) |

---

## 3. Current State — What Is Conformant

The following items are fully aligned with the AJUSTE blueprint (v3) and must not be touched:

- `useBeliefsScroll`: `offset: ['start end', 'end end']` ✅, `useReducedMotion()` native ✅, `isMobile` via matchMedia ✅
- `BeliefOverlay`: id `belief-overlay`, `z-10`, `absolute inset-0`, `bg-black opacity-0` ✅
- `BeliefManifesto`: scroll reveal `[0.82, 0.9, 1.0]`, `y: [18, 0]`, `fixed inset-0 z-50`, `aria-live`, `font-display font-black text-white tracking-[0.03em] leading-[0.82]`, `clamp(3.5rem, 16vw, 12rem)` ✅
- `BeliefBackground`: 8-stop `COLOR_STOPS` array correct (`#040013` at index 0 and 7) ✅; `inView('.scroll-section')` trigger ✅; `duration: 0.9`, ease `[0.17, 0.55, 0.55, 1]` ✅; overlay pulse `[0, 0.1, 0]` ✅
- `GhostScene`: `z-[70]` ✅, `frameloop="demand"` ✅, `invalidate()` subscriptions ✅, dispose on unmount ✅, `GhostErrorBoundary` ✅, lerp cap `0.15` ✅, mobile baseline `x:-1.2 y:1.5` → climax `x:0 y:0` ✅, float amplitude `[0.036, 0.066]` ✅, float speed `[0.6, 1.2]` ✅, procedural yaw formula `sin(t*(0.4+p*0.4))*(0.06+p*0.04)` ✅
- `BeliefFixedHeader`: `sticky top-[20vh] md:top-0 z-30` ✅, `x: 60→0` entrance, `staggerChildren: 0.08` ✅, `SplitText` per word ✅
- `BeliefScrollText`: italic class present ✅, `inView('.scroll-section p')` ✅, `duration: 0.9` ease `[0.17, 0.55, 0.55, 1]` ✅, exit `duration: 0.5` GHOST_EASE ✅
- `beliefStore`: `ghostIntensity`, `cursorX`, `cursorY` as MotionValues ✅
- `BeliefBackground`: initial `bg-background` = `#040013` confirmed via `globals.css` `--background: #040013` ✅
- Layer z-index stack: `z-0 / z-10 / z-30 / z-40 / z-50 / z-70` ✅
- `GHOST_EASE_AMBIENT: [0.17, 0.55, 0.55, 1]` in `motion.ts` ✅

---

## 4. Divergences Found vs Blueprint

### GAP-A — P1: BeliefScrollText y-axis direction reversed

**Severity:** P1 — visible aesthetic identity mismatch
**File:** `src/components/sobre/beliefs/BeliefScrollText.tsx` lines 29–30, 38–42

Blueprint:
```
Entrada: y: [18, 0]   → text starts 18px BELOW viewport center, rises up
Saída:   y: -18       → text exits upward (continues the rise)
```

Current:
```tsx
const enterDistance = isMobile ? 12 : 18;
const exitDistance = isMobile ? 12 : 18;

// Entrance:
y: [-enterDistance, 0],   // ← starts 18px ABOVE, falls DOWN
// Exit:
y: -exitDistance,         // ← exits upward (correct direction, wrong start)
```

Two issues:
1. **Direction wrong**: blueprint says `y: [18, 0]` (from below). Current has `y: [-18, 0]` (from above). Scrolling down should reveal text rising from below — the current implementation shows text dropping from above, which is the opposite editorial vocabulary.
2. **Mobile distance wrong**: blueprint uses `18` for mobile too. Current uses `12`. Should be `18` on both platforms.

---

### GAP-B — P2: BeliefBackground bidirectional reset broken after climax

**Severity:** P2 — breaks re-entry, violates bidirectional scroll contract
**File:** `src/components/sobre/beliefs/BeliefBackground.tsx` lines 62–80

Blueprint: "Reset é bidirecional — inView com cleanup function re-anima ao reentrar — Sem estado acumulado"

Current logic:
```tsx
const unsubProgress = scrollProgress.on('change', (value) => {
  if (value >= CLIMAX_THRESHOLD && !climaxFiredRef.current) {
    climaxFiredRef.current = true;
    stopInView?.();   // ← DESTROYS inView observer permanently
    stopInView = null;
    animate(bgRef.current, { backgroundColor: COLOR_STOPS[7] }, ...);
  }
  if (value < CLIMAX_THRESHOLD) {
    climaxFiredRef.current = false;  // ← resets flag but observer is gone
  }
});
```

**Bug**: When user scrolls back from climax (progress drops below `0.82`), `climaxFiredRef.current` resets to `false`, correctly allowing the climax to re-fire on next forward-scroll. However, `stopInView` was set to `null` — the inView observer that drives mid-section color transitions is permanently destroyed. On a second forward-scroll through the section, the background will not change during phrases 1–6 (only the climax Deep Void will trigger again).

Fix: Re-create the inView observer when `value < CLIMAX_THRESHOLD` and `stopInView` is null, OR use a pattern that does not destroy the observer at climax (instead guard the climax via the fired ref, let inView still respond to sections).

---

### GAP-C — P3: GhostScene container missing time-based entrance animation

**Severity:** P3 — nuanced, entry feel differs from blueprint spec
**File:** `src/components/sobre/3d/GhostScene.tsx` lines 281–314

Blueprint:
```
Container motion.div → {opacity: [0, 1], scale: [0.95, 1]}, duration: 1.2, ease: [0.22, 1, 0.36, 1]
Surge junto com BeliefFixedHeader (sticky simultâneo)
```

Current: Container uses scroll-driven `opacity` via `useTransform([0, 0.05, 0.95, 1], [0, 1, 1, 0])`. No `initial`/`animate` props, no scale on container. No explicit `1.2s` time-based entrance.

The 3D model handles scale internally via `useFrame` lerp (correct). The container should additionally do a time-based scale+opacity entrance `[0.95, 1]` over 1.2s when it first enters the viewport.

**Note**: The scroll-driven opacity achieves a fast entrance visually (5% of scroll progress = full opacity), but it is not synchronized with the header's `useInView`-driven 0.8s entry. The blueprint says they should "surge simultaneously."

---

## 5. Proposed Architecture

No structural changes. All corrections are surgical within existing files. The component tree, import graph, and z-index hierarchy remain identical.

Stack unchanged:
- Next.js 16 App Router
- React 19 + TypeScript strict
- Tailwind CSS 4 (Oxide, `@import "tailwindcss" source(none)`)
- Motion (`motion/react`, `motion`) — vanilla `animate`/`inView` + React hooks
- React Three Fiber 9 + drei + three.js

---

## 6. Files Affected

| File | Change | Priority |
|------|--------|----------|
| `src/components/sobre/beliefs/BeliefScrollText.tsx` | Fix y-direction: `[-18, 0]` → `[18, 0]`; fix mobile distance from 12 to 18 | P1 |
| `src/components/sobre/beliefs/BeliefBackground.tsx` | Fix bidirectional reset: restart inView observer on scroll-back below climax threshold | P2 |
| `src/components/sobre/3d/GhostScene.tsx` | Add time-based entry animation on container: `initial={{ opacity:0, scale:0.95 }}` → `animate={{ opacity:1, scale:1 }}` over 1.2s, alongside scroll opacity | P3 |

**Total files:** 3
**Total estimated lines changed:** < 40 net

---

## 7. Components and Dependencies

- **BeliefScrollText.tsx**: uses `animate`, `inView` from `motion`. No new imports. Two constant changes + sign flip.
- **BeliefBackground.tsx**: uses `animate`, `inView` from `motion`. No new imports. Requires restructuring the climax-guard logic to allow observer restart.
- **GhostScene.tsx**: uses `motion.div`, `useTransform`, `useSpring` from `motion/react`. No new imports. Add `initial`/`animate` props alongside existing `style={{ opacity }}`.

---

## 8. Technical Constraints

- **Tailwind CSS 4 Oxide**: no dynamic class concatenation; static class strings only. `top-[20vh] md:top-0` is correct and must not be changed.
- **Motion `animate()` vs `motion/react`**: `BeliefScrollText` and `BeliefBackground` use vanilla `motion` (not `motion/react`). No mixing.
- **`frameloop="demand"`**: no new MotionValue subscriptions may be added without corresponding `invalidate()` calls in `GhostModel.useEffect`.
- **TypeScript strict**: no `any`, no implicit types. All changes must be type-safe.
- **`prefersReducedMotion` guard**: all float/animation changes must respect this flag.
- **Bidirectional reset fix** in `BeliefBackground` must not create memory leaks — observers must be properly cleaned up in the `useEffect` return.

---

## 9. Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| y `[18, 0]` from-below may collide with `h-[80vh]` overflow | Low | `overflow: hidden` not set on scroll-sections; 18px is within safe zone |
| BeliefBackground observer restart creates race condition | Medium | Use a factory function, call inside the `scrollProgress` subscriber when resetting |
| Adding `initial`/`animate` to GhostScene container may conflict with scroll-driven `opacity` | Medium | Use separate `useInView` for time-based entrance, keep `style={{ opacity: scrollOpacity }}` for exit |
| Second `motion.div` scale on container compounds with model's internal scale | Low | Only use `scale` on container for entrance (transition to 1.0, then static) |

---

## 10. Trade-offs

- **GAP-B fix complexity**: The cleanest fix is to extract the inView observer into a restartable factory ref. Alternative: remove the `stopInView()` call at climax, and instead add a guard inside the inView callback using `climaxFiredRef`. This is simpler and safer — the observer stays alive, only the callback is no-op'd during climax.
- **GAP-C (P3) scope**: The container entrance animation is a nuance. If human review deprioritizes it, it can be deferred — the existing scroll-driven opacity produces an acceptable entry. Only implement if explicitly approved.

---

## 11. Validation Strategy

After implementation (post-approval):

1. `pnpm run dev` — confirm server starts without errors
2. Navigate to `/sobre`, scroll to section 06
3. Verify per blueprint "Resultado Esperado":
   - [ ] Phrases enter rising from **below** (not from above)
   - [ ] Mobile phrase entrance distance = 18px (not 12)
   - [ ] Background transitions correctly on second scroll-through (scroll down → scroll up → scroll down again)
   - [ ] Ghost container entry is visible and smooth
4. Open at `375px` mobile viewport — verify same behaviors
5. Enable `prefers-reduced-motion: reduce` in browser devtools — verify static state
6. `pnpm run typecheck` → zero errors
7. `pnpm run lint` → zero errors
8. Spot-check other sections for regressions (scroll to next section, previous section)

---

## 12. Acceptance Criteria

- [ ] BeliefScrollText phrases animate with `y: [18, 0]` (from below) — desktop AND mobile both 18px
- [ ] BeliefScrollText exit: `y: -18` — exits upward
- [ ] BeliefBackground inView-driven transitions work on second (and subsequent) scroll-throughs
- [ ] Ghost container entry animation is present (opacity + scale if GAP-C approved)
- [ ] TypeScript: zero errors
- [ ] Lint: zero errors
- [ ] No visual regressions on adjacent sections

---

## 13. Rollback / Contingency

All changes are within 3 isolated files. Git restore per file:
```bash
git restore src/components/sobre/beliefs/BeliefScrollText.tsx
git restore src/components/sobre/beliefs/BeliefBackground.tsx
git restore src/components/sobre/3d/GhostScene.tsx
```

---

## 14. `.context/` Update Needed?

After execution:
- `06-O-QUE-ME-MOVE.md` should be updated to reflect corrected state (y-axis direction, bidirectional reset)
- `active_state.md` should note section 06 is now at full blueprint parity
- The AJUSTE blueprint doc itself does not change — it is the SSOT

---

## 15. Approval Gate

**ALL implementation is blocked until explicit human confirmation: "Aprovado" or "Proceed".**

No code, no files, no shell commands will be executed before that signal.

---

## Appendix — Previous Plan Status (v1.0)

The v1.0 plan (also in this file) identified 7 gaps. Comparison with current code:

| v1.0 GAP | Status in current code |
|----------|----------------------|
| GAP-01: COLOR_STOPS[7] = #0048ff instead of #040013 | **ALREADY FIXED** — code has `#040013` |
| GAP-02: x-axis animation instead of y-axis | **PARTIALLY FIXED** — code now uses y-axis, but direction is still reversed |
| GAP-03: Missing italic class | **ALREADY FIXED** — `italic` class is present |
| GAP-04: BeliefFixedHeader responsive top conflict | **ALREADY FIXED** — `top-[20vh] md:top-0` is correct |
| GAP-05: Scroll-driven scale on container compounding | **ALREADY FIXED** — container has no scale in current code |
| GAP-06: Float amplitude half of blueprint | **ALREADY FIXED** — amplitude `[0.036, 0.066]`, speed `[0.6, 1.2]` match blueprint |
| GAP-07: Rotation formula weaker than blueprint | **ALREADY FIXED** — yaw `sin(t*(0.4+p*0.4))*(0.06+p*0.04)` matches blueprint |

Remaining open issues in v2.0: **GAP-A (y-direction), GAP-B (bidirectional reset), GAP-C (container entrance)**.
