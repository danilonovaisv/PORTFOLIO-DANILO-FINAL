# 🛠️ GHOST SYSTEM REPAIR PLAN (v1.0)

**Status**: Draft
**Date**: 2026-02-09
**Objective**: Stabilize the Ghost System, fix memory leaks, and unify 3D implementations.

## 🚨 P0: Critical Urgency (System Stability)

### 1. 🩸 Fix Memory Leaks in `Home/GhostScene.tsx`

- **Issue**: `useEffect` lacks a cleanup function. Renderer, Scene, and Geometries are never disposed.
- **Impact**: Browser crash on efficient navigation.
- **Fix**: Implement `return () => { renderer.dispose(); ... }`.

### 2. 🐢 Optimization of Firefly System

- **Issue**: 40 separate `PointLight` and `Mesh` instances in a loop.
- **Impact**: ~80 extra draw calls per frame. Massive performance hit.
- **Fix**:
  - Use `InstancedMesh` for geometry.
  - Remove individual PointLights; use a single shader-based glow or a maximum of 3-4 dynamic lights.

### 3. 🔐 Security & Auth Verification (Confirmed)

- **Status**: ✅ PASSED.
- **Note**: `upsertProject` correctly enforces `requireAdminAccess`. No action needed.

## 🔸 P1: High Priority (Architecture & Quality)

### 4. 🏗️ Unify Ghost Implementations

- **Issue**: Home uses Vanilla Three.js; About uses R3F.
- **Fix**: Refactor Home's `GhostScene` to use React Three Fiber (R3F) for consistency and easier lifecycle management, OR wrap Vanilla implementation in a strict `useThree` compatible hook.
- **Decision**: **Migrate Home to R3F** to match the rest of the app and leverage the `drei` ecosystem (performance monitoring, stats).

### 5. ⚙️ Centralize Ghost Config

- **Issue**: `GhostScene.tsx` has hardcoded values that ignore `ghostConfig.ts`.
- **Fix**: Inject `ghostConfig` values into the scene generation logic.

## 🔹 P2: Medium Priority (Polish)

### 6. 🧹 Portfolio Grid Optimization

- **Issue**: `items.map` in `ProjectsGallery` creates new object references on render.
- **Fix**: Memoize the mapped items array.

### 7. ♿ Admin Accessibility

- **Issue**: Dashboard status cards could use better semantic markup.
- **Fix**: Minor markup updates.

---

## 📅 Execution Schedule

1. **Phase 1: Stabilization (P0)** -> Fix Memory Leaks & Fireflies.
2. **Phase 2: Unification (P1)** -> Migrate Home to R3F.
3. **Phase 3: Polish (P2)** -> Portfolio & Admin tweaks.
