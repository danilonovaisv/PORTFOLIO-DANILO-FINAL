# Implementation Plan — 06-O-QUE-ME-MOVE Audit & Correction

**Generated:** 2026-04-24  
**Protocol:** PREVC — Planning Phase  
**Status:** AWAITING HUMAN APPROVAL — no code touched

---

## 1. Objective

Correct the 4 gaps identified in the `06-O-QUE-ME-MOVE` section against the frozen blueprint
`06-O-QUE-ME-MOVE-AJUSTE.md` (2026-04-23). All changes are surgical — no architecture changes,
no new dependencies, no deploy.

---

## 2. Context Analyzed

| Source                                                                                            | Read?                          |
| ------------------------------------------------------------------------------------------------- | ------------------------------ |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`              | ✅                             |
| `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`                     | ✅                             |
| `src/components/sobre/sections/AboutBeliefs.tsx`                                                  | ✅                             |
| `src/components/sobre/beliefs/BeliefBackground.tsx`                                               | ✅                             |
| `src/components/sobre/beliefs/BeliefOverlay.tsx`                                                  | ✅                             |
| `src/components/sobre/beliefs/BeliefFixedHeader.tsx`                                              | ✅                             |
| `src/components/sobre/beliefs/BeliefScrollText.tsx`                                               | ✅                             |
| `src/components/sobre/beliefs/BeliefManifesto.tsx`                                                | ✅                             |
| `src/components/sobre/3d/GhostScene.tsx`                                                          | ✅                             |
| `src/components/sobre/3dGhostErrorBoundary.tsx`                                                  | ✅                             |
| `src/components/ui/SectionErrorBoundary.tsx`                                                      | ✅                             |
| `src/hooks/useBeliefsScroll.ts`                                                                   | ✅                             |
| `src/config/motion.ts`                                                                            | ✅                             |
| `artifacts/about-beliefs-audit/metrics.json`                                                      | ✅                             |
| `docs/SOBRE/AboutBeliefs-template/EXEMPLE-ABOUT-BELIFS/components/scroll/ScrollInViewExample.tsx` | ✅                             |
| Reference: motion.dev/tutorials/js-scroll-triggered (pattern)                                     | ✅ via ScrollInViewExample.tsx |

---

## 3. Current State — What is Working ✅

All confirmed by `artifacts/about-beliefs-audit/metrics.json` and code review:

| Criterion                                           | Status                                 |
| --------------------------------------------------- | -------------------------------------- |
| Background final color `#0048ff`                    | ✅ `rgb(0, 72, 255)` confirmed         |
| Manifesto white integral                            | ✅ `rgb(255, 255, 255)` confirmed      |
| Ghost z-index above manifesto (70 > 50)             | ✅ confirmed                           |
| No console errors                                   | ✅ confirmed                           |
| Manifesto font size `clamp(4rem,17vw,13rem)`        | ✅ 208px at desktop = 13rem            |
| Manifesto opacity reveal at 0.56                    | ✅ interpolation correct               |
| 6 phrases official content                          | ✅                                     |
| Scroll offset `['start end', 'end end']`            | ✅                                     |
| Phrases bidirectional reset (cleanup fn)            | ✅ BeliefScrollText has return cleanup |
| `frameloop="demand"` preserved                      | ✅                                     |
| No `scale`/`rotate` in DOM motion                   | ✅                                     |
| `max-width: 1680px` applied                         | ✅ all containers                      |
| Tailwind Oxide `source(none)` — not touched         | ✅ not in scope                        |
| Color sequence 8 stops                              | ✅                                     |
| Climax lock at `scrollProgress >= 0.82`             | ✅                                     |
| Mobile phrases `items-end justify-center pb-[20vh]` | ✅                                     |
| Desktop phrases `items-center justify-start`        | ✅                                     |
| Manifesto `translateY` reset range                  | ✅                                     |

---

## 4. Gaps Found — Divergences vs Blueprint

### GAP-01 — `BeliefBackground.tsx`: Missing bidirectional reset (**P0**)

**Blueprint requirement:**

> "Reset é bidirecional — `inView` com cleanup function (`return () => ...`) re-anima ao reentrar"  
> Reference: motion.dev scroll-triggered pattern (`ScrollInViewExample.tsx` line 61–76)

**Current code:**

```typescript
stopInView = inView('.scroll-section', (section) => {
  if (climaxFiredRef.current) return;    // ← returns undefined, not a cleanup fn
  // ...animate background color
  animate(bgRef.current, { backgroundColor: targetColor }, { ... });
  // ← NO return () => { ... } cleanup
});
```

**Impact:** When scrolling back up through phrases, background does NOT revert to the
previous color. The climax lock resets at `< 0.82` but individual phrase colors accumulate.
User scrolling up experiences stale background color.

**Fix:** Add cleanup return that reverts to the previous color stop:

```typescript
return () => {
  if (climaxFiredRef.current) return;
  const prevColor = COLOR_STOPS[index] || COLOR_STOPS[0];
  if (bgRef.current) {
    animate(
      bgRef.current,
      { backgroundColor: prevColor },
      { duration: 0.6, ease: GHOST_EASE_AMBIENT }
    );
  }
};
```

---

### GAP-02 — `BeliefBackground.tsx`: Wrong easing for BG transitions (**P0**)

**Blueprint requirement (from Limitações/Fluida section):**

> "ease ambient `[0.17, 0.55, 0.55, 1]` para BG"

**`motion.ts` documentation:**

```typescript
/**
 * Ambient curve — ignition-style fast start, long tail decay.
 * Use ONLY for long-running atmospheric layers (belief backgrounds,
 * gradient drifts, manifesto-style scroll fades). Never on UI controls.
 */
export const GHOST_EASE_AMBIENT: EasingTuple = [0.17, 0.55, 0.55, 1];
```

**Current code:**

```typescript
import { GHOST_EASE } from '@/config/motion';
// ...
animate(
  bgRef.current,
  { backgroundColor: targetColor },
  { duration: 0.9, ease: GHOST_EASE }
);
```

`GHOST_EASE = [0.22, 1, 0.36, 1]` — this is the UI easing, not the atmospheric/BG easing.

**Impact:** Background transitions feel slightly snappier than intended. The ambient curve
provides the "ignition-style fast start, long tail decay" that makes BG color changes feel
atmospheric rather than interactive.

**Fix:** Import and use `GHOST_EASE_AMBIENT` for BG color animations:

```typescript
import { GHOST_EASE_AMBIENT } from '@/config/motion';
// ...
animate(
  bgRef.current,
  { backgroundColor: targetColor },
  { duration: 0.9, ease: GHOST_EASE_AMBIENT }
);
```

---

### GAP-03 — `BeliefFixedHeader.tsx`: Missing mobile top offset (**P1**)

**Blueprint requirement:**

> "Sticky em `top-[14vh] md:top-0`"

**Current code:**

```typescript
<motion.header
  className="fixed inset-x-0 top-0 z-[var(--z-layer-header)] w-full py-8 pointer-events-none"
```

The header is `top-0` on all viewports. On mobile, this places the header at the browser
status bar edge, where it can compete with system UI and create visual clutter at the very
top of the screen.

**Impact:** Mobile header starts at top:0 instead of 14vh, potentially overlapping with
browser chrome on iOS/Android. Less editorial air at the top.

**Fix:**

```tsx
className =
  'fixed inset-x-0 top-[14vh] md:top-0 z-[var(--z-layer-header)] w-full py-8 pointer-events-none';
```

---

### GAP-04 — `AboutBeliefs.tsx` + `GhostScene.tsx`: Double `GhostErrorBoundary` (**P1**)

**Current code in `AboutBeliefs.tsx`:**

```tsx
<GhostErrorBoundary>
  <GhostScene scrollProgress={scrollYProgress} ... />
</GhostErrorBoundary>
```

**Current code in `GhostScene.tsx`:**

```tsx
<motion.div ...>
  <GhostErrorBoundary>     {/* ← SECOND boundary */}
    <Canvas ...>
      <GhostModel ... />
    </Canvas>
  </GhostErrorBoundary>
</motion.div>
```

`GhostScene` is already wrapped in an error boundary from the parent `AboutBeliefs`.
The inner boundary at Canvas-level is redundant. When an error occurs, the outer boundary
catches it and renders the SVG fallback. The inner one would only fire if `GhostScene`'s
own render fails below the `motion.div` — but this is exactly what the outer boundary covers.

**Impact:** Wasted React tree depth, potential error swallowing (inner catches before outer
can log/report). No visible functional issue in happy path.

**Fix:** Remove the `GhostErrorBoundary` wrapper inside `GhostScene.tsx`, keeping only the
outer one in `AboutBeliefs.tsx`.

---

### GAP-05 — `SectionErrorBoundary.tsx` modified but not integrated (**P2, out-of-scope**)

`SectionErrorBoundary.tsx` was modified (git status: `M`) adding retry button and async
error reporting. This component is not currently used in the beliefs section render tree
(only `GhostErrorBoundary` is). Integrating it is a larger change outside this mission scope.

**Decision:** **No action in this mission.** Noted for future Sunday refactor backlog.

---

## 5. Architecture Proposed

No structural changes. All fixes are local to 3 files:

| File                                                 | Change                               |
| ---------------------------------------------------- | ------------------------------------ |
| `src/components/sobre/beliefs/BeliefBackground.tsx`  | Add bidirectional reset + fix easing |
| `src/components/sobre/beliefs/BeliefFixedHeader.tsx` | Add `top-[14vh]` mobile offset       |
| `src/components/sobre/3d/GhostScene.tsx`             | Remove inner `GhostErrorBoundary`    |

---

## 6. Files Affected

| File                                                 | Type of Change | Risk     |
| ---------------------------------------------------- | -------------- | -------- |
| `src/components/sobre/beliefs/BeliefBackground.tsx`  | Logic + import | Low      |
| `src/components/sobre/beliefs/BeliefFixedHeader.tsx` | CSS class      | Very Low |
| `src/components/sobre/3d/GhostScene.tsx`             | Remove wrapper | Low      |

No new files. No new dependencies. No config changes.

---

## 7. Technical Constraints

- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4 Oxide, Motion (not framer-motion)
- `GHOST_EASE_AMBIENT` is already exported from `src/config/motion.ts` — no new tokens
- Tailwind Oxide: `@import "tailwindcss" source(none)` pattern not touched (no new classes
  that require `@source` — `top-[14vh]` is arbitrary value, resolves at build time)
- `inView` from `motion` (not `framer-motion`) — API confirmed compatible
- No deploy. No pnpm install. No destructive operations.

---

## 8. Risks

| Risk                                                        | Likelihood | Mitigation                                                             |
| ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| Bidirectional reset causes visual flicker on fast scroll-up | Low        | Use `duration: 0.6` (shorter than 0.9 forward)                         |
| Ambient easing changes perception of BG speed               | Very Low   | `GHOST_EASE_AMBIENT` is already validated for BG use by motion.ts docs |
| `top-[14vh]` breaks header on tablet (768–1024px)           | Low        | `md:top-0` kicks in at 768px breakpoint                                |
| Removing inner GhostErrorBoundary exposes error to outer    | Intended   | Outer boundary already handles fallback                                |

---

## 9. Trade-offs

| Decision                                         | Rationale                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Use `GHOST_EASE_AMBIENT` for BG (not GHOST_EASE) | Blueprint specifies this explicitly; token docs confirm atmospheric use            |
| Keep outer GhostErrorBoundary, remove inner      | Error boundary should be at the integration point, not duplicated inside component |
| `top-[14vh]` only mobile                         | `md:top-0` aligns with blueprint exact spec                                        |
| GAP-05 (SectionErrorBoundary) deferred           | Out of scope, requires architecture decision                                       |

---

## 10. Validation Strategy

After implementation:

1. **Start dev server**: `pnpm dev`
2. **Desktop check**: navigate to `/sobre`, scroll full section
   - Confirm background color changes on forward scroll
   - Confirm background reverts on backward scroll
   - Confirm header visible and not overlapping content
3. **Mobile check** (DevTools 375px): same scroll validation
   - Confirm header at `14vh` from top, not browser edge
4. **Console check**: zero errors
5. **Screenshot evidence**: desktop + mobile at 15%, 45%, 90% scroll

---

## 11. Criteria of Acceptance

- [ ] Background reverts color when scrolling back up (bidirectional)
- [ ] Background color transition uses ambient easing (atmospheric feel)
- [ ] Header on mobile starts at 14vh from top
- [ ] No double GhostErrorBoundary in component tree
- [ ] Zero console errors
- [ ] Desktop manifesto final: white text on blue bg
- [ ] Ghost z-index above manifesto (no regression)
- [ ] TypeScript: no new type errors in changed files
- [ ] No visual regressions in desktop layout

---

## 12. Rollback / Contingency

All changes are local file edits. Rollback = `git checkout src/components/sobre/beliefs/BeliefBackground.tsx src/components/sobre/beliefs/BeliefFixedHeader.tsx src/components/sobre/3d/GhostScene.tsx`

No database, no deploy, no external service involved.

---

## 13. `.context/DOCS-PORTFOLIO-PAGES` Update Needed?

After implementation: update `06-O-QUE-ME-MOVE.md` to reflect:

- Background easing corrected to `GHOST_EASE_AMBIENT`
- Header mobile offset confirmed as `top-[14vh]`
- Bidirectional reset confirmed active

---

## APPROVAL GATE

**Do NOT proceed to Execution without explicit human confirmation:**

- "Aprovado" or "Proceed"

No code has been touched. This document is analysis only.
