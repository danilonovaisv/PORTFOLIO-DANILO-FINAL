# Implementation Plan — 06-O-QUE-ME-MOVE Audit & Correction
**Version:** v1.0 — 2026-04-23  
**Auditor:** Mission Control Orchestrator (scheduled task)  
**Blueprint reference:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`  
**Status:** AWAITING HUMAN APPROVAL — no code written

---

## 1. Objective

Audit the current implementation of section **06-O-QUE-ME-MOVE** ("About Beliefs"), identify every deviation from the v3 adjustment blueprint, and produce a correction plan for human review before any code is modified.

---

## 2. Context Analysed

All source files for the section were read:

| File | Path |
|------|------|
| Orchestrator | `src/components/sobre/sections/AboutBeliefs.tsx` |
| Scroll hook | `src/hooks/useBeliefsScroll.ts` |
| Context provider | `src/components/sobre/beliefs/BeliefsScrollContext.tsx` |
| Background | `src/components/sobre/beliefs/BeliefBackground.tsx` |
| Overlay | `src/components/sobre/beliefs/BeliefOverlay.tsx` |
| Fixed header | `src/components/sobre/beliefs/BeliefFixedHeader.tsx` |
| Scroll phrases | `src/components/sobre/beliefs/BeliefScrollText.tsx` |
| Manifesto | `src/components/sobre/beliefs/BeliefManifesto.tsx` |
| Ghost 3D canvas | `src/components/sobre/3d/GhostScene.tsx` |
| Error boundary | `src/components/sobre/3d/GhostErrorBoundary.tsx` |
| Cursor | `src/components/sobre/beliefs/CustomCursor.tsx` |
| Belief store | `src/store/beliefStore.ts` |
| Motion tokens | `src/config/motion.ts` |

---

## 3. Current State — What's Working Correctly

The following items are **fully conformant** with the blueprint and must not be touched:

- `useBeliefsScroll`: offset `['start end', 'end end']` ✅, `useReducedMotion` native ✅, `isMobile` matchMedia ✅
- `BeliefOverlay`: id, z-10, absolute, bg-black, opacity-0 ✅
- `BeliefManifesto`: scroll range `[0.82, 0.9, 1.0]`, y `[18, 0]`, `fixed inset-0 z-50`, `aria-live` ✅
- `GhostScene`: z-[70], `frameloop="demand"`, `invalidate` on scroll/intensity/cursor change, dispose on unmount, `GhostErrorBoundary`, lerp cap 0.15, mobile baseline `x:-1.2 y:1.5` → climax `x:0 y:0` ✅
- `BeliefBackground`: COLOR_STOPS count (8 stops), inView observer pattern, `duration:0.9`, ease `[0.17,0.55,0.55,1]` ✅
- `beliefStore`: ghostIntensity, cursorX, cursorY MotionValues ✅
- `BeliefsScrollContext`: correctly wraps `useBeliefsScroll` ✅
- `CustomCursor`: normalized coords → beliefStore, pointer-events-none, desktop-only ✅
- Layer z-index hierarchy: z-0/z-10/z-30/z-40/z-50/z-70 ✅

---

## 4. Divergences Found vs Blueprint

### GAP-01 — CRITICAL: BeliefBackground last color stop is wrong
**Severity:** P0 — breaks narrative arc  
**File:** `src/components/sobre/beliefs/BeliefBackground.tsx:16`

| | Value |
|-|-------|
| Blueprint (stop 8) | `#040013` — Deep Void (clímax/saída) |
| Current (index 7) | `#0048ff` — bluePrimary |

Blueprint is explicit: "8. #040013 — Deep Void (clímax / saída)". The session opens and closes on Deep Void. The current code leaves the background blue at the climax, destroying the emotional return to darkness that frames the Ghost manifesto reveal.

---

### GAP-02 — HIGH: BeliefScrollText animation axis is horizontal instead of vertical
**Severity:** P1 — core design identity mismatch  
**File:** `src/components/sobre/beliefs/BeliefScrollText.tsx:27–48`

| | Entrance | Exit |
|-|---------|------|
| Blueprint | `y: [18, 0]`, `blur: 6px→0px` | `y: -18`, `blur: 0→6px` |
| Current | `x: [-enterDistance, 0]` (72/36px), `blur: 4px→0px` | `x: -exitDistance`, `blur: 0→4px` |

Blueprint states `animate({opacity: 1, y: [18, 0], filter: ['blur(6px)', 'blur(0px)']})` — vertical entrance, not horizontal slide. The current lateral slide is a significant aesthetic deviation from the ghost-system vertical-blur reveal identity.

---

### GAP-03 — HIGH: BeliefScrollText phrases missing italic style
**Severity:** P1 — editorial identity missing  
**File:** `src/components/sobre/beliefs/BeliefScrollText.tsx:69–79`

Blueprint: `Itálico (identidade editorial — casa com ritmo manifesto)`.  
Current: no `italic` class on the `<p>` element. The italic is a named design decision in the blueprint — not optional.

---

### GAP-04 — MEDIUM: BeliefFixedHeader responsive `top` class conflict
**Severity:** P2 — mobile layout may be wrong  
**File:** `src/components/sobre/beliefs/BeliefFixedHeader.tsx:61`

Current className: `"sticky top-0 z-30 ... md:top-0 top-[20vh]"`

Both `top-0` and `top-[20vh]` have no mobile prefix, creating a specificity conflict. Tailwind v4 generates utilities in declaration order — `top-[20vh]` appears after `top-0` in the class string but Tailwind's generated CSS depends on its internal sort, not class-string order. This is fragile. The correct pattern for Tailwind v4 with mobile-first is:

```
sticky top-[20vh] md:top-0 z-30
```

Blueprint: "Mobile: `sticky top-[20vh] z-30`" / "Desktop: `sticky top-0 z-30`".

---

### GAP-05 — MEDIUM: GhostScene container applies scroll-driven scale in addition to model internal scale
**Severity:** P2 — double scaling compounds visual error  
**File:** `src/components/sobre/3d/GhostScene.tsx:263–267`

Blueprint says the **container** `motion.div` uses `{opacity:[0,1], scale:[0.95,1]}` for **entrance only** (duration 1.2s, ease `[0.22,1,0.36,1]`). After entrance, the container should not continue scaling.

Current: `useTransform(smoothProgress, [0,0.08,0.85,1], [0.96,1,1.03,1.02])` applies a scroll-driven scale to the container across the full scroll range. Meanwhile, `GhostModel/useFrame` also drives scale internally. The two scales multiply, making the ghost larger than specified at the climax.

Correct approach:
- Container: entrance-only opacity+scale (useSpring on opacity, one-time ease to 1)
- Model: internal `useFrame` scale only (already correct)

---

### GAP-06 — LOW: Float amplitude values are half the blueprint spec
**Severity:** P3 — feel, not correctness  
**File:** `src/components/sobre/3d/GhostScene.tsx:179–184`

| | amplitude range | speed range |
|-|-----------------|-------------|
| Blueprint | `0.036 + p*0.03` → `[0.036, 0.066]` | `0.6 + p*0.6` → `[0.6, 1.2]` |
| Current | `interpolate(intensity,[0,1],[0.018,0.04])` → `[0.018, 0.04]` | `interpolate(intensity,[0,1],[0.55,0.9])` |

Blueprint float is more pronounced — the ghost should be noticeably floating. Current values produce roughly half the visual float the blueprint specifies.

---

### GAP-07 — LOW: Rotation formula differs from blueprint specification
**Severity:** P3 — feel, not critical  
**File:** `src/components/sobre/3d/GhostScene.tsx:191–214`

Blueprint: `Rotação Y: sin(t * (0.4 + p*0.4)) * (0.06 + p*0.04)`.  
Current: separate `scrollRotationY` (scroll-driven) + `proceduralYaw` (sin-based, weaker amplitude `0.008+intensity*0.012`).

Current procedural yaw amplitude at intensity=1: `0.02` vs blueprint yaw amplitude at p=1: `0.1`. Current is ~5× weaker. This is a feel issue — the ghost rotates less responsively.

---

## 5. Proposed Architecture

No structural changes. All corrections are surgical within existing files. Component tree and import graph remain identical.

Stack preservation:
- Next.js 16 App Router ✅
- React 19 + TypeScript strict ✅
- Tailwind CSS 4 with Oxide engine ✅
- Motion (`motion/react`, `motion`) ✅
- React Three Fiber 9 ✅

---

## 6. Files Affected

| File | Changes | Priority |
|------|---------|----------|
| `BeliefBackground.tsx` | Fix COLOR_STOPS[7]: `#0048ff` → `#040013` | P0 |
| `BeliefScrollText.tsx` | Change animation `x` → `y`, fix blur to 6px, add italic | P1 |
| `BeliefFixedHeader.tsx` | Fix responsive top: `top-0 ... top-[20vh]` → `top-[20vh] md:top-0` | P2 |
| `GhostScene.tsx` | Remove scroll-driven container scale, keep entrance-only opacity | P2 |
| `GhostScene.tsx` | Correct float amplitude and speed to blueprint values | P3 |
| `GhostScene.tsx` | Unify rotation formula to blueprint's pure sin approach | P3 |

---

## 7. Components and Dependencies

- **BeliefBackground.tsx**: standalone, no imports change. One-line constant fix.
- **BeliefScrollText.tsx**: uses `animate`, `inView` from `motion`. No new imports. Three changes (axis, blur, italic class).
- **BeliefFixedHeader.tsx**: className-only change. No imports.
- **GhostScene.tsx**: internal refactor of `useTransform` scale + `useFrame` float/rotation. No new imports needed.

---

## 8. Technical Constraints

- Tailwind CSS 4 Oxide: class generation is static — `top-[20vh]` must appear before `md:top-0` in class string for correct mobile-first specificity
- Motion `animate()` from `motion` (vanilla, not `motion/react`) — already used correctly, no change needed
- `frameloop="demand"` — `invalidate()` must be called on any MotionValue that drives the canvas; float amplitude/speed changes must not introduce new subscriptions
- TypeScript strict — no `any`, no implicit types
- `prefersReducedMotion` guard must wrap all float/rotation changes in GhostScene

---

## 9. Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Removing container scale breaks ghost entrance feel | Medium | Test entrance at `scrollYProgress ≈ 0` — opacity alone is enough for entrance |
| Vertical y animation on BeliefScrollText may clash with sticky sections' layout | Low | `h-[80vh]` sections provide enough space; y offset is 18px max |
| Float amplitude increase may hit 60fps target | Low | Values stay in the same order of magnitude; lerp cap 0.15 limits per-frame delta |
| Italic on `font-h1 font-bold` may affect line-height/tracking | Low | Blueprint specifically calls for it — verify against clamp values |

---

## 10. Trade-offs

- **Container scale removal**: Simplifies the ghost lifecycle and removes compounding. The entrance feel becomes opacity-only (blueprint specifies opacity+scale 0.95→1 for entrance but this is handled by the internal model scale which already starts at 0.96). Small visual difference.
- **Y axis vs X axis for scroll text**: Y entrance is more editorial and matches the ghost system vertical motion vocabulary. X slide was not in blueprint and should not have been implemented.

---

## 11. Validation Strategy

1. Start dev server (`pnpm run dev`)
2. Navigate to `/sobre` → scroll to section 06
3. Verify per the blueprint's "Resultado Esperado" checklist:
   - Background returns to `#040013` at the manifesto climax
   - Phrases enter/exit vertically with blur (not laterally)
   - Phrases are italic
   - Header sticks at `top-[20vh]` on mobile, `top-0` on desktop
   - Ghost does not compound-scale at climax
   - Float is visually noticeable
4. Test on a 375px mobile viewport
5. Test with `prefers-reduced-motion: reduce` (via browser devtools)
6. Run `pnpm run typecheck && pnpm run lint`

---

## 12. Acceptance Criteria

- [ ] BeliefBackground returns to `#040013` on final scroll section
- [ ] BeliefScrollText phrases animate with `y` (not `x`), blur 6px, italic
- [ ] BeliefFixedHeader positions correctly: mobile `top-[20vh]`, desktop `top-0`
- [ ] GhostScene container scale is entrance-only — not scroll-driven
- [ ] Ghost float amplitude ≈ `[0.036, 0.066]` range, speed ≈ `[0.6, 1.2]`
- [ ] TypeScript strict: zero errors
- [ ] Lint: zero errors
- [ ] No visual regressions on other sections

---

## 13. Rollback / Contingency

All changes are within 6 files, all isolated components. Git reverts per file if needed:
```bash
git restore src/components/sobre/beliefs/BeliefBackground.tsx
git restore src/components/sobre/beliefs/BeliefScrollText.tsx
git restore src/components/sobre/beliefs/BeliefFixedHeader.tsx
git restore src/components/sobre/3d/GhostScene.tsx
```

---

## 14. .context/ Update Needed?

`active_state.md` should be updated after execution to reflect the corrected state of section 06.  
`DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/` does not need a new file — the blueprint doc itself is already the SSOT.

---

## 15. Approval Gate

**ALL implementation is blocked until explicit human confirmation: "Aprovado" or "Proceed".**

No code, no files, no shell commands will be executed before that signal.
