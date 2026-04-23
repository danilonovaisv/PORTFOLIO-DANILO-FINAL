# Task List — 06-O-QUE-ME-MOVE Correction
**Version:** v1.0 — 2026-04-23  
**Status:** AWAITING HUMAN APPROVAL — do not execute  
**Plan reference:** `docs/plans/06-o-que-me-move-implementation-plan.md`

---

## Execution Sequence

Tasks must be executed in order. Each has a max duration, checkpoint, and completion criterion.

---

### TASK-01 — Fix BeliefBackground final color stop
**Priority:** P0  
**Estimated time:** ~5 min  
**File:** `src/components/sobre/beliefs/BeliefBackground.tsx`

**What to do:**  
Change `COLOR_STOPS` index 7 from `#0048ff` to `#040013`.

```diff
-  '#0048ff', // bluePrimary — clímax/saída
+  '#040013', // Deep Void — clímax/saída (blueprint 06-AJUSTE-v3)
```

**Checkpoint:** Inspect `COLOR_STOPS` array — must read exactly:
```
['#040013','#0048ff','#8705f2','#f501d3','#0048ff','#8705f2','#f501d3','#040013']
```

**Risks:** None — one-line constant change.  
**Done when:** Array updated, no TypeScript errors.

---

### TASK-02 — Fix BeliefScrollText animation: axis + blur + italic
**Priority:** P1  
**Estimated time:** ~20 min  
**File:** `src/components/sobre/beliefs/BeliefScrollText.tsx`

**Three sub-changes (execute in one edit pass):**

**2a — Change animation axis from `x` to `y`:**
```diff
- animate(
-   element,
-   {
-     opacity: 1,
-     x: [-enterDistance, 0],
-     filter: ['blur(4px)', 'blur(0px)'],
-   },
-   { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
- );
+ animate(
+   element,
+   {
+     opacity: 1,
+     y: [-enterDistance, 0],
+     filter: ['blur(6px)', 'blur(0px)'],
+   },
+   { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
+ );
```

Note: `enterDistance` values remain the same (`isMobile ? 36 : 72`) but now drive `y`. Blueprint says y offset: 18px. However, the hook currently uses 72/36px distances which are the horizontal versions. Blueprint specifies `y: [18, 0]` — adjust to `18`/`12` for mobile:

```diff
- const enterDistance = isMobile ? 36 : 72;
- const exitDistance = isMobile ? 24 : 48;
+ const enterDistance = isMobile ? 12 : 18;
+ const exitDistance = isMobile ? 12 : 18;
```

**2b — Exit animation: x → y:**
```diff
- animate(
-   element,
-   {
-     opacity: 0,
-     x: -exitDistance,
-     filter: ['blur(0px)', 'blur(4px)'],
-   },
-   { duration: 0.5, ease: GHOST_EASE }
- );
+ animate(
+   element,
+   {
+     opacity: 0,
+     y: -exitDistance,
+     filter: ['blur(0px)', 'blur(6px)'],
+   },
+   { duration: 0.5, ease: GHOST_EASE }
+ );
```

**2c — Add italic to `<p>` element:**
```diff
- className={`font-h1 font-bold text-[#4fe6ff] leading-[1.05] ${...}`}
+ className={`font-h1 font-bold italic text-[#4fe6ff] leading-[1.05] ${...}`}
```

**Checkpoint:** Scroll through section on desktop and mobile. Phrases should slide vertically up (not left), with italic style. Blur should be 6px.

**Risks:** `italic` may shift line height slightly. Check against leading-[1.05].  
**Done when:** All three sub-changes applied, no TypeScript errors, lint clean.

---

### TASK-03 — Fix BeliefFixedHeader responsive top positioning
**Priority:** P2  
**Estimated time:** ~10 min  
**File:** `src/components/sobre/beliefs/BeliefFixedHeader.tsx`

**What to do:**  
Correct the Tailwind responsive class order for `top`:

```diff
- className="sticky top-0 z-30 flex flex-col items-end justify-center gap-2
-            w-full px-6 md:px-12 py-8 pointer-events-none
-            md:top-0 top-[20vh]"
+ className="sticky top-[20vh] md:top-0 z-30 flex flex-col items-end justify-center gap-2
+            w-full px-6 md:px-12 py-8 pointer-events-none"
```

**Checkpoint:** On a 375px viewport, header sticks at `top: 20vh`. On desktop ≥768px, header sticks at `top: 0`.  
**Risks:** None — className-only change.  
**Done when:** Responsive top verified on both breakpoints.

---

### TASK-04 — Fix GhostScene container scale (remove scroll-driven, entrance-only)
**Priority:** P2  
**Estimated time:** ~25 min  
**File:** `src/components/sobre/3d/GhostScene.tsx`

**Context:** Current container drives `scale` via `useTransform(smoothProgress, [0, 0.08, 0.85, 1], [0.96, 1, 1.03, 1.02])` across full scroll. Blueprint specifies container entrance only (`scale: 0.95 → 1`, `duration: 1.2`). Internal model scale is handled in `useFrame`.

**What to do:**  
Remove the scroll-driven container `scale` transform. Keep opacity. The container motion.div should only animate opacity (fade in/out at section edges):

```diff
- const scale = useTransform(
-   smoothProgress,
-   [0, 0.08, 0.85, 1],
-   [0.96, 1, 1.03, 1.02]
- );
```

And in the `motion.div`:
```diff
- style={{ opacity, scale }}
+ style={{ opacity }}
```

The `scale` const can be removed entirely.

> NOTE: Blueprint says container entrance uses `scale: [0.95, 1]` with `duration: 1.2`. The opacity `useTransform([0, 0.05, 0.95, 1], [0, 1, 1, 0])` already handles the entrance/exit. Adding a pure entrance scale animation via `initial/animate` props is an optional enhancement but NOT blocking.

**Checkpoint:** Ghost canvas should not visibly scale at the section climax beyond what the internal model scale produces. At `scrollYProgress ≈ 0.85`, ghost should be at model scale ≈ 1.03–1.06 (from `useFrame`), not multiplied by container scale.

**Risks:** Ghost entrance may feel slightly less kinetic without container scale. If review finds this undesirable, a one-time `initial={{scale:0.95}} animate={{scale:1}}` with `transition={{duration:1.2, ease:[0.22,1,0.36,1]}}` can be restored.  
**Done when:** Container `scale` useTransform removed, `style` prop updated, no TS errors.

---

### TASK-05 — Fix GhostScene float amplitude and speed
**Priority:** P3  
**Estimated time:** ~15 min  
**File:** `src/components/sobre/3d/GhostScene.tsx`

**What to do:**  
Update float parameters to match blueprint spec:

```diff
- const floatAmplitude = prefersReducedMotion
-   ? 0
-   : interpolateProgress(intensity, [0, 1], [0.018, 0.04]);
- const floatSpeed = prefersReducedMotion
-   ? 0
-   : interpolateProgress(intensity, [0, 1], [0.55, 0.9]);
+ const floatAmplitude = prefersReducedMotion
+   ? 0
+   : interpolateProgress(intensity, [0, 1], [0.036, 0.066]);
+ const floatSpeed = prefersReducedMotion
+   ? 0
+   : interpolateProgress(intensity, [0, 1], [0.6, 1.2]);
```

Blueprint formula: `floatAmplitude = 0.036 + p * 0.03`, `floatSpeed = 0.6 + p * 0.6`.  
Using `intensity` (which maps from scrollProgress 0→1) as proxy for `p` keeps the existing pattern.

**Checkpoint:** On desktop, the ghost should have a visible floating motion — more pronounced than current. Not jarring — still within lerp cap 0.15.  
**Risks:** May feel more pronounced on first load — test with lerp cap in place.  
**Done when:** Values updated, float visually matches "the ghost breathes" spec.

---

### TASK-06 — Fix GhostScene procedural rotation amplitude
**Priority:** P3  
**Estimated time:** ~15 min  
**File:** `src/components/sobre/3d/GhostScene.tsx`

**What to do:**  
Align procedural yaw to blueprint's `(0.06 + p*0.04)` range:

```diff
- const proceduralYaw = prefersReducedMotion
-   ? 0
-   : Math.sin(state.clock.elapsedTime * (0.45 + intensity * 0.3)) *
-     (0.008 + intensity * 0.012);
- const proceduralPitch = prefersReducedMotion
-   ? 0
-   : Math.cos(state.clock.elapsedTime * (0.32 + intensity * 0.2)) *
-     (0.004 + intensity * 0.006);
+ const proceduralYaw = prefersReducedMotion
+   ? 0
+   : Math.sin(state.clock.elapsedTime * (0.4 + intensity * 0.4)) *
+     (0.06 + intensity * 0.04);
+ const proceduralPitch = prefersReducedMotion
+   ? 0
+   : Math.cos(state.clock.elapsedTime * (0.32 + intensity * 0.2)) *
+     (0.012 + intensity * 0.008);
```

Blueprint formula for Y rotation: `sin(t * (0.4 + p*0.4)) * (0.06 + p*0.04)`.  
Pitch is not specified in blueprint — conservative doubling of current values.

**Checkpoint:** Ghost should show more rotational responsiveness during scroll — subtle but more alive than current nearly-zero yaw.  
**Risks:** At climax, yaw max = 0.1 rad — within the "nunca agressiva" constraint.  
**Done when:** Amplitude matches blueprint formula for Y, pitch conservatively updated.

---

### TASK-07 — Build verification and type check
**Priority:** Required  
**Estimated time:** ~10 min

```bash
pnpm run typecheck && pnpm run lint
```

All tasks above must pass both checks before completion.  
If errors: fix in place, do not skip checks.  
**Done when:** Both commands exit 0.

---

### TASK-08 — Visual validation (dev server)
**Priority:** Required  
**Estimated time:** ~20 min

```bash
pnpm run dev
```

Checklist:
- [ ] Navigate to `/sobre` section 06
- [ ] Scroll through section — background returns to `#040013` (near-black) at manifesto
- [ ] Phrases animate vertically with blur, are italic
- [ ] Header sticks correctly on mobile and desktop
- [ ] Ghost does not compound-scale at climax
- [ ] Float is more pronounced and visible than before
- [ ] Ghost rotates more with scroll
- [ ] No visual regressions on sections before/after 06
- [ ] With `prefers-reduced-motion: reduce`: all animations frozen at final state
- [ ] No console errors

**Done when:** All checklist items confirmed.

---

### TASK-09 — Update active_state.md
**Priority:** P3  
**Estimated time:** ~5 min  
**File:** `.context/active_state.md`

Update section 06 status to reflect corrected state.  
**Done when:** Active state notes updated.

---

## Dependency Graph

```
TASK-01 (no deps)
TASK-02 (no deps)
TASK-03 (no deps)
TASK-04 (no deps)
TASK-05 (depends on TASK-04 — same file, do in sequence)
TASK-06 (depends on TASK-04, TASK-05 — same file, do in sequence)
TASK-07 (depends on TASK-01 through TASK-06)
TASK-08 (depends on TASK-07)
TASK-09 (depends on TASK-08)
```

TASK-01, TASK-02, TASK-03 can run in parallel.  
TASK-04, TASK-05, TASK-06 must run in sequence (same file).

---

## Completion Criteria (Mission Done)

- [ ] All 9 tasks executed
- [ ] TypeScript and lint: zero errors
- [ ] Visual validation checklist: all items confirmed
- [ ] walkthrough.md consolidated in `docs/walkthroughs/`
- [ ] `active_state.md` updated

---

## Status

**BLOCKED — awaiting human approval. Say "Aprovado" or "Proceed" to unlock execution.**
