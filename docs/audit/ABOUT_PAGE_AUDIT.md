# Audit Report: About Page & Beliefs Section

**Date:** 2026-02-09
**Target:** `src/components/sobre/3d/` & `src/components/sobre/sections/AboutBeliefs.tsx`
**Auditor:** Ghost Commander

## 🚨 Critical Findings (P0)

### 1. Disparate Ghost Implementations

- **Issue:** usage of R3F (`GhostScene.tsx`) vs Vanilla Three.js (`Home/GhostScene.tsx`) creates code duplication and maintenance burden.
- **Recommendation:** Long-term goal should be to unify on R3F or Vanilla. Currently, `Home` uses Vanilla for specific shader control, while `About` uses R3F for ease of use.
- **Action:** Acceptable for now, but document as technical debt.

## ⚠️ Major Findings (P1)

### 1. Dynamic Import Complexity

- **Issue:** `AboutBeliefs.tsx` uses a complex promise extraction for importing `GhostScene`.
- **Recommendation:** Simplify exports in `GhostScene.tsx` to be consistent.

### 2. `dispose={null}` in `GhostModel.tsx`

- **Issue:** Explicitly preventing disposal of the group.
- **Impact:** If the component unmounts, the GLTF resources might hang around longer than necessary.
- **Recommendation:** Verify if this is required for transition smoothness. If not, remove `dispose={null}` to allow R3F to clean up.

## ℹ️ Minor Findings (P2)

- **Performance**: `GhostModel.tsx` uses `useFrame` efficiently with no object allocations.
- **Responsiveness**: `isMobile` logic is passed down from parent, ensuring consistent state.
