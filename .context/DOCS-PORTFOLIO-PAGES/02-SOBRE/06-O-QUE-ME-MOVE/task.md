# Task List — 06-O-QUE-ME-MOVE Correction

**Generated:** 2026-04-24  
**Status:** PENDING APPROVAL — no execution until "Aprovado" or "Proceed"

---

## Execution Sequence

Tasks must run in order. Each is ≤ 1 hour. Checkpoints marked with 🔎.

---

### TASK-01 — Fix `BeliefBackground.tsx`: easing + bidirectional reset

**File:** `src/components/sobre/beliefs/BeliefBackground.tsx`  
**Duration estimate:** ~20 min  
**Priority:** P0  
**Depends on:** none

**Changes:**

1. Add `GHOST_EASE_AMBIENT` to the import from `@/config/motion`:

   ```typescript
   import { GHOST_EASE, GHOST_EASE_AMBIENT } from '@/config/motion';
   ```

2. Change the `animate` call in `inView` callback from `GHOST_EASE` to `GHOST_EASE_AMBIENT`:

   ```typescript
   animate(
     bgRef.current,
     { backgroundColor: targetColor },
     { duration: 0.9, ease: GHOST_EASE_AMBIENT } // was GHOST_EASE
   );
   ```

3. Add cleanup return function inside the `inView` callback for bidirectional reset:
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

**Risks:** Fast scroll-up might briefly flash two color transitions. Mitigated by `duration: 0.6` (faster exit than 0.9 entrance).

**Criteria of completion:**

- [ ] Import includes `GHOST_EASE_AMBIENT`
- [ ] Forward animate uses `GHOST_EASE_AMBIENT`
- [ ] `inView` callback returns cleanup function
- [ ] Cleanup correctly maps `index` → `COLOR_STOPS[index]` (not index+1)
- [ ] No TypeScript errors in file

---

🔎 **CHECKPOINT-01:** After TASK-01, open DevTools > Sources, search for `GHOST_EASE_AMBIENT`
in the compiled output or confirm the import resolves. No runtime test yet.

---

### TASK-02 — Fix `BeliefFixedHeader.tsx`: mobile top offset

**File:** `src/components/sobre/beliefs/BeliefFixedHeader.tsx`  
**Duration estimate:** ~5 min  
**Priority:** P1  
**Depends on:** none (independent)

**Change:** One CSS class update on line 55:

```tsx
// Before:
className =
  'fixed inset-x-0 top-0 z-[var(--z-layer-header)] w-full py-8 pointer-events-none';

// After:
className =
  'fixed inset-x-0 top-[14vh] md:top-0 z-[var(--z-layer-header)] w-full py-8 pointer-events-none';
```

**Risks:** None. Tailwind arbitrary value `top-[14vh]` resolves at build without needing
`@source` directive since it's in a .tsx file already within the source tree.

**Criteria of completion:**

- [ ] `top-[14vh] md:top-0` present in className string
- [ ] No other changes to this file

---

🔎 **CHECKPOINT-02:** After TASK-02, quick visual scan of the raw file confirms the class.

---

### TASK-03 — Fix `GhostScene.tsx`: remove inner `GhostErrorBoundary`

**File:** `src/components/sobre/3d/GhostScene.tsx`  
**Duration estimate:** ~10 min  
**Priority:** P1  
**Depends on:** none (independent)

**Change:** Remove the inner `GhostErrorBoundary` wrapper around `Canvas`.
The outer `GhostErrorBoundary` in `AboutBeliefs.tsx` already handles this component.

```tsx
// Before (in GhostScene return):
<motion.div ...>
  <GhostErrorBoundary>
    <Canvas ...>
      <Suspense fallback={null}>
        <GhostModel ... />
      </Suspense>
    </Canvas>
  </GhostErrorBoundary>
</motion.div>

// After:
<motion.div ...>
  <Canvas ...>
    <Suspense fallback={null}>
      <GhostModel ... />
    </Suspense>
  </Canvas>
</motion.div>
```

Also remove the now-unused `GhostErrorBoundary` import at the top of `GhostScene.tsx`
(line 20: `import { GhostErrorBoundary } from '@/components/sobre/3d/GhostErrorBoundary';`).

**Risks:** If `Canvas` itself throws outside the outer boundary scope — not possible since
`AboutBeliefs` wraps the entire `GhostScene` component before rendering. Safe to remove.

**Criteria of completion:**

- [ ] Inner `<GhostErrorBoundary>` wrapper removed from `GhostScene.tsx`
- [ ] `GhostErrorBoundary` import removed from `GhostScene.tsx`
- [ ] `GhostErrorBoundary` still present in `AboutBeliefs.tsx` (outer boundary untouched)
- [ ] No TypeScript errors in file

---

🔎 **CHECKPOINT-03:** After TASK-03, verify `AboutBeliefs.tsx` still has:

```tsx
<GhostErrorBoundary>
  <GhostScene ... />
</GhostErrorBoundary>
```

---

### TASK-04 — Visual Validation (dev server)

**Duration estimate:** ~20 min  
**Priority:** P0  
**Depends on:** TASK-01, TASK-02, TASK-03 all complete

**Steps:**

1. Run `pnpm dev` and confirm server starts without errors
2. Navigate to `/sobre` section
3. **Desktop (1280px+):**
   - Scroll forward through all 6 phrases — confirm background color changes
   - Scroll backward — confirm background reverts to previous color ← **KEY TEST**
   - Confirm header visible at top, editorial alignment maintained
   - Scroll to climax — confirm manifesto white on blue background
   - Confirm Ghost visible above manifesto text
4. **Mobile (375px DevTools):**
   - Confirm header starts at ~14vh from top, not at browser edge
   - Scroll through phrases, confirm background transitions
   - Scroll back up, confirm bidirectional BG reset
5. **Console check:** zero errors or warnings from beliefs section
6. **Screenshot evidence:** capture desktop-045.png equivalent and mobile-045.png

**Criteria of completion:**

- [ ] Background reverts on scroll-up (bidirectional confirmed visually)
- [ ] Header on mobile not flush with top of browser viewport
- [ ] No console errors
- [ ] Manifesto visible in clímax
- [ ] Ghost above manifesto (no regression)

---

🔎 **CHECKPOINT-04 (Final):** All criteria above checked. Proceed to TASK-05.

---

### TASK-05 — Update `.context/` SSOT documents

**File:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`  
**Duration estimate:** ~10 min  
**Priority:** P2  
**Depends on:** TASK-04 complete

**Changes to `06-O-QUE-ME-MOVE.md`:**

- Under "Fundo" section: note that `BeliefBackground` uses `GHOST_EASE_AMBIENT` (not GHOST_EASE) for background transitions
- Under "Header" section: confirm `top-[14vh] md:top-0` is the correct mobile positioning
- Under "Regras de motion em vigor": add note about bidirectional reset via inView cleanup
- Update "Validação executada" date to 2026-04-25

**Criteria of completion:**

- [ ] `.md` updated with correct easing reference for BG
- [ ] `.md` confirms mobile header top position
- [ ] No other changes (no new sections, no removing existing content)

---

### TASK-06 — Consolidate `walkthrough.md`

**File:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md` (new)  
**Duration estimate:** ~10 min  
**Priority:** P2  
**Depends on:** TASK-04 complete

Create `walkthrough.md` with:

- Audit summary (4 gaps found, 4 acted on, 1 deferred)
- Files changed
- Validation evidence (screenshots + checklist)
- Risks remaining
- Confirmation of `.context/` update status

---

## Dependencies Map

```
TASK-01 ──┐
TASK-02 ──┤→ TASK-04 (validation) → TASK-05 → TASK-06
TASK-03 ──┘
```

TASK-01, 02, 03 are independent — can execute in any order or batched.
TASK-04 requires all three complete.
TASK-05 and 06 require TASK-04 complete.

---

## Risk Register Per Task

| Task    | Risk                                                      | Severity | Mitigation                                                       |
| ------- | --------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| TASK-01 | Cleanup color index off-by-one                            | Medium   | Use `COLOR_STOPS[index]` not `[index+1]`                         |
| TASK-01 | Fast scroll flicker                                       | Low      | Short cleanup duration (0.6s)                                    |
| TASK-02 | `top-[14vh]` ignored if Tailwind source not scanning file | Very Low | File in src/ already scanned                                     |
| TASK-03 | Removing wrong boundary level                             | Low      | Confirm outer boundary in AboutBeliefs preserved                 |
| TASK-04 | Dev server fails (unrelated errors)                       | Low      | Only assess beliefs section; ignore unrelated preexisting errors |

---

## Rollback

```bash
git checkout src/components/sobre/beliefs/BeliefBackground.tsx
git checkout src/components/sobre/beliefs/BeliefFixedHeader.tsx
git checkout src/components/sobre/3d/GhostScene.tsx
```

No database, no deploy, no infrastructure changes.

---

## APPROVAL GATE REMINDER

**This file is a plan only. No code has been touched.**  
**Execution begins ONLY after explicit "Aprovado" or "Proceed" from the human.**
