# AGENT COMPLIANCE PLAN

## 1. Audit Report

### 1.1 WebGL Rules (Rule #1: Zero Jank)

- **Status**: ❌ **VIOLATION FOUND**
- **Location**: `src/components/canvas/home/hero/GhostScene.tsx`
- **Issues**:
  1. **Allocations in Loop**: `ghostGroup.position.clone()` is called inside `useFrame`, creating GC pressure.
  2. **Draw Calls**: Particles use `THREE.Group` with individual `THREE.Mesh` objects (~100 items). Should be `InstancedMesh` as per Rule #1 (>50 items).
  3. **Memory Leaks**: `useEffect` cleanup removes listeners but DOES NOT dispose of geometries, materials, or the renderer instance.

### 1.2 Admin & Realtime (Rule #9: Control Center)

- **Status**: ✅ **COMPLIANT**
- **Verification**:
  - `/admin` routes protected by `middleware.ts` -> `src/lib/supabase/middleware.ts`.
  - `projects.ts` uses `public_projects_view` for reading (Zero Deploy).
  - Admin write actions log to `audit_logs`.

### 1.3 Stack & Deployment

- **Status**: ✅ **COMPLIANT**
- **Verification**:
  - `engines.node` is "20" in both root and functions.
  - `firebase.json` correctly configured for Frameworks.

### 1.4 Governance

- **Status**: ✅ **COMPLIANT**
- **Verification**:
  - `AGENT.md` and `GEMINI.md` are present.
  - Context files (`knowledge-graph`, `adjustment_log`) are active.

---

## 2. Correction Strategy

### 2.1 Optimization: GhostScene.tsx

Target: `src/components/canvas/home/hero/GhostScene.tsx`

#### Step A: Remove Loop Allocations

- **Change**: Replace `const prevPos = ghostGroup.position.clone()` with a persistent `THREE.Vector3` ref.
- **Why**: Eliminates garbage collection stutter in the animation loop.

#### Step B: Implement InstancedMesh for Particles

- **Change**: Replace `particleGroup` (Group of Meshes) with `THREE.InstancedMesh`.
- **Logic**:
  - Create `InstancedMesh(geometry, material, count)`.
  - In `useFrame`, update `dummy.position/rotation/scale` and call `setMatrixAt(i, dummy.matrix)`.
  - Mark `instanceMatrix.needsUpdate = true`.
- **Why**: Reduces draw calls from ~100 to 1. adhering to Rule #1.

#### Step C: Implement Proper Disposal

- **Change**: Add `traverse` cleanup in `useEffect` return.
- **Logic**:

  ```typescript
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
      else object.material.dispose();
    }
  });
  renderer.dispose();
  ```

- **Why**: Prevents WebGL context loss and memory leaks on route changes.

---

## 3. Verification Plan

1. **Static Analysis**:
    - Re-run `grep` to confirm no `new Vector3` in `useFrame`.
2. **Runtime**:
    - Build project `pnpm build` to ensure no type errors.
    - (Manual) Verify Ghost animation fluidity on localhost.

---

## 4. Execution Order

1. Refactor `GhostScene.tsx` (Allocations & Disposal).
2. Refactor `GhostScene.tsx` (InstancedMesh).
3. Update `adjustment_log.md` with "AUDIT:FIX" entry.
4. Generate Final Report.
