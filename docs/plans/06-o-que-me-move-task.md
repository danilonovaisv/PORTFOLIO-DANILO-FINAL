# Task List — 06-O-QUE-ME-MOVE Corrections
**Version:** v2.0 — 2026-04-23
**Plan reference:** `docs/plans/06-o-que-me-move-implementation-plan.md`
**Status:** AWAITING HUMAN APPROVAL — all tasks BLOCKED

---

> ⛔ These tasks may only begin after explicit approval: **"Aprovado"** or **"Proceed"**

---

## Sequence Overview

```
TASK-1 (P1) → TASK-2 (P2) → TASK-3 (P3, optional) → TASK-4 (validation)
```

Tasks 1 and 2 are independent of each other and can run concurrently.
Task 3 is optional (needs separate approval).
Task 4 depends on all accepted tasks being complete.

---

## TASK-1 — Fix BeliefScrollText y-direction and mobile distance

**Priority:** P1
**File:** `src/components/sobre/beliefs/BeliefScrollText.tsx`
**Estimated time:** 15 min
**Dependencies:** None

### What to change

Current (lines 21–22, 36–37):
```tsx
const enterDistance = isMobile ? 12 : 18;
const exitDistance = isMobile ? 12 : 18;

// entrance:
y: [-enterDistance, 0],   // ← WRONG: starts above, falls down
filter: ['blur(6px)', 'blur(0px)'],

// exit:
y: -exitDistance,         // ← direction correct, distance wrong on mobile
```

Target (blueprint `y: [18, 0]`):
```tsx
// Remove enterDistance / exitDistance variables entirely
// Use 18 hardcoded (same for mobile and desktop — blueprint is explicit)

// entrance:
y: [18, 0],              // starts 18px below, rises up
filter: ['blur(6px)', 'blur(0px)'],

// exit:
y: -18,                  // exits upward
```

### Acceptance criteria
- [ ] Text phrases visibly rise from below when scrolling into view
- [ ] Mobile behavior matches desktop (same 18px distance)
- [ ] Exit: text exits upward (not downward)
- [ ] `prefersReducedMotion` guard still works — no animation fires when true
- [ ] No TypeScript errors

### Checkpoint
Run `pnpm run typecheck && pnpm run lint` — must pass before moving to validation.

### Risks
- Low: 18px `y` with `h-[80vh]` sections — plenty of space; no overflow concerns

---

## TASK-2 — Fix BeliefBackground bidirectional reset

**Priority:** P2
**File:** `src/components/sobre/beliefs/BeliefBackground.tsx`
**Estimated time:** 30 min
**Dependencies:** None (can run in parallel with TASK-1)

### What to change

**Problem:** When climax fires, `stopInView()` is called and the variable is set to `null`. If user scrolls back (progress < 0.82), `climaxFiredRef.current` resets but the inView observer is gone — second pass has no mid-section BG transitions.

**Fix strategy (minimal, safe):** Do NOT call `stopInView()` at climax. Instead, add a guard inside the inView callback using `climaxFiredRef.current`. The observer stays alive for re-entry; the climax Deep Void animation is still protected by the ref.

Current logic (lines 62–80):
```tsx
const unsubProgress = scrollProgress.on('change', (value) => {
  if (value >= CLIMAX_THRESHOLD && !climaxFiredRef.current && bgRef.current) {
    climaxFiredRef.current = true;
    stopInView?.();      // ← REMOVE THIS — kills re-entry
    stopInView = null;   // ← REMOVE THIS
    animate(bgRef.current, { backgroundColor: COLOR_STOPS[7] }, ...);
  }
  if (value < CLIMAX_THRESHOLD) {
    climaxFiredRef.current = false;
  }
});
```

Target:
```tsx
const unsubProgress = scrollProgress.on('change', (value) => {
  if (value >= CLIMAX_THRESHOLD && !climaxFiredRef.current && bgRef.current) {
    climaxFiredRef.current = true;
    // Do NOT stop the inView observer — it needs to survive for re-entry
    animate(bgRef.current, { backgroundColor: COLOR_STOPS[7] }, ...);
  }
  if (value < CLIMAX_THRESHOLD) {
    climaxFiredRef.current = false;
    // inView observer is still alive — no restart needed
  }
});
```

Also update the inView callback guard to use `climaxFiredRef`:
```tsx
stopInView = inView('.scroll-section', (section) => {
  // Guard: climax Deep Void is handled by the scroll subscriber, not inView
  if (climaxFiredRef.current) return;
  // ... rest of color transition logic unchanged
});
```

The guard `if (climaxFiredRef.current) return;` is already present in the current code (line 36–37). So the only change needed is **removing the two lines that destroy the observer** (`stopInView?.()` and `stopInView = null`).

### Acceptance criteria
- [ ] BG changes color correctly during first forward-scroll through section
- [ ] Scroll back to section start after reaching climax → BG returns to phase color (not stuck on Deep Void or climax color)
- [ ] Second forward-scroll through section: BG transitions work again for all 6 phrases
- [ ] Climax Deep Void still fires correctly on second approach
- [ ] No TypeScript errors

### Checkpoint
Test bidirectional scroll manually in browser after implementation. Run `pnpm run typecheck && pnpm run lint`.

### Risks
- Medium: Without `stopInView()`, both the inView observer AND the progress subscriber are active during climax. The inView guard (`if (climaxFiredRef.current) return;`) prevents double-firing. Verify this guard is present before removing the observer cleanup.

---

## TASK-3 — Add time-based entrance animation to GhostScene container (OPTIONAL)

**Priority:** P3
**File:** `src/components/sobre/3d/GhostScene.tsx`
**Estimated time:** 20 min
**Dependencies:** TASK-1, TASK-2 complete (validate feel after those fixes first)
**Gate:** Requires separate explicit approval after reviewing TASK-1/TASK-2 results

### What to change

Blueprint says: Container `motion.div` entrance: `{opacity: [0, 1], scale: [0.95, 1]}`, `duration: 1.2`, ease `[0.22, 1, 0.36, 1]`, synchronized with `BeliefFixedHeader` entry.

Current container (no `initial`/`animate`, only scroll `opacity`):
```tsx
<motion.div
  style={{ opacity }}                   // scroll-driven
  transition={{ duration: 0.2, ... }}  // unused for MotionValue-driven props
>
```

Target: Add viewport-based entrance alongside scroll-driven opacity. The `useInView` pattern mirrors what `BeliefFixedHeader` already uses:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const isInView = useInView(containerRef, { once: true, margin: '-5% 0px 0px 0px' });

<motion.div
  ref={containerRef}
  initial={{ scale: 0.95 }}
  animate={{ scale: isInView ? 1 : 0.95 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  style={{ opacity }}   // scroll-driven opacity remains
>
```

Note: `opacity` continues to be scroll-driven (fade on entry/exit via scroll). Scale is time-based entry only (no scroll scrub on container scale — model handles internal scale via `useFrame`). This does NOT compound with the model's internal scale: container scale goes 0.95 → 1 and stays at 1 forever after.

### Acceptance criteria
- [ ] Ghost container visibly scales from 0.95 → 1 on entry (~1.2s)
- [ ] Scale reaches 1.0 and stays static thereafter
- [ ] No compounding with GhostModel's internal useFrame scale
- [ ] Entry is roughly synchronized with BeliefFixedHeader's 0.8s entrance
- [ ] No TypeScript errors

### Risks
- `useInView` import needed (already available via `motion/react` — same package used in BeliefFixedHeader)
- `once: true` means no re-entry scale on scroll-back — acceptable per blueprint "entrance-only"

---

## TASK-4 — Validation and Confirmation

**Priority:** Required
**File:** None (browser testing + docs update)
**Estimated time:** 20 min
**Dependencies:** All accepted tasks complete

### Steps

1. **Dev server**: `pnpm run dev` — confirm clean start
2. **Navigate**: `http://localhost:3000/sobre` → scroll to section 06 "O Que Me Move"
3. **Desktop validation** (1440px viewport):
   - [ ] Phrases enter from below (y: 18→0), not from above
   - [ ] Background color transitions: Deep Void → Blue → Purple → Pink → Blue → Purple → Pink → Deep Void
   - [ ] Ghost floats noticeably (amplitude ≈ 0.036–0.066 world units)
   - [ ] Ghost centralizes at climax (overlaps word "GHOST" in manifesto)
   - [ ] Manifesto white text dominates at `scrollYProgress ≥ 0.82`
   - [ ] Background returns to Deep Void at climax
4. **Bidirectional test**: Scroll to climax → scroll back → scroll to climax again
   - [ ] BG color transitions work on second pass
   - [ ] No ghost of wrong state persists
5. **Mobile validation** (375px viewport):
   - [ ] Header sticks at `top-[20vh]`
   - [ ] Ghost starts top-left, centralizes at climax
   - [ ] Phrases centered at bottom 20% of viewport
   - [ ] Same y: 18→0 entrance
6. **Reduced motion**: Enable via devtools → all animations should be static
7. **Type check + lint**: `pnpm run typecheck && pnpm run lint` → zero errors
8. **Adjacent section check**: scroll through section 05 and 07 — no regressions

### Evidence to collect
- Screenshot: desktop at `scrollYProgress ≈ 0.15` (phrase visible, BG blue)
- Screenshot: desktop at `scrollYProgress ≈ 0.9` (manifesto + Ghost overlap)
- Screenshot: mobile at `scrollYProgress ≈ 0.2`
- Screenshot: mobile at `scrollYProgress ≈ 0.9`
- Console: no errors during scroll

### Post-validation docs update
- Update `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`:
  - Correct "Ajuste de motion" section to reflect y-axis direction fix
  - Note bidirectional reset fix
- Update `.context/active_state.md` to mark section 06 as "full blueprint parity"

---

## Summary Table

| Task | File | Priority | Time | Status |
|------|------|----------|------|--------|
| TASK-1: Fix y-direction | `BeliefScrollText.tsx` | P1 | 15 min | BLOCKED |
| TASK-2: Fix bidi reset | `BeliefBackground.tsx` | P2 | 30 min | BLOCKED |
| TASK-3: Ghost entrance anim | `GhostScene.tsx` | P3 optional | 20 min | BLOCKED |
| TASK-4: Validation + docs | browser + `.context/` | Required | 20 min | BLOCKED |

**Total estimated time (P1+P2+validation):** ~65 min
**Total estimated time (all tasks):** ~85 min
