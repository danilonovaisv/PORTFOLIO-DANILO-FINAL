# Audit Report: Home Page & Ghost System

**Date:** 2026-02-09
**Target:** `src/components/canvas/home/hero/GhostScene.tsx` & `src/components/home/hero/HomeHero.tsx`
**Auditor:** Ghost Commander

## 🚨 Critical Findings (P0)

### 1. Memory Leaks in `GhostScene.tsx`

- **Violation:** Lifecycle & Cleanup Rule.
- **Issue:** The `useEffect` hook initializes `THREE.Scene`, `THREE.WebGLRenderer`, `EffectComposer`, and multiple Geometries/Materials/Lights but **NEVER disposes of them** in the return cleanup function.
- **Impact:** Navigating away from Home and back will duplicate the WebGL context, causing rapid memory spikes and eventual crash.
- **Fix Required:** Implement a robust cleanup function disposing of all meshes, materials, geometries, and the renderer instance.

### 2. Excessive Draw Calls & Lights (Fireflies)

- **Violation:** Performance Rule #5 ("Keep draw calls under 100").
- **Issue:** The Firefly system creates **40 individual `THREE.Mesh` objects** AND **40 individual `THREE.PointLight` objects**.
- **Impact:** Forward rendering 40 dynamic point lights is extremely expensive and kills performance on mobile/integrated GPUs.
- **Fix Required:**
  - Refactor Fireflies to use `InstancedMesh` or `THREE.Points`.
  - **REMOVE** individual PointLights. Use emissive materials with Bloom or a specific shader for the "glow" effect.

### 3. Configuration Fragments

- **Violation:** Single Source of Truth.
- **Issue:** `GhostScene.tsx` defines a local `params` object (Line 244) with hardcoded values that duplicate or contradict `src/config/ghostConfig.ts`.
- **Impact:** Changes in `ghostConfig.ts` do not reflect in the actual scene.
- **Fix Required:** Import and use `GHOST_CONFIG` from `@/config/ghostConfig`.

## ⚠️ Major Findings (P1)

### 1. Object Allocation in Loop

- **Violation:** Performance Rule #2.
- **Issue:** `spawnInstancedParticle` creates new objects for `rotationSpeed` inside the animation loop logic.
- **Fix Required:** Recycle objects or use primitive arrays for particle data.

### 2. TypeScript Ignores

- **Violation:** Code Quality.
- **Issue:** `three-stdlib` imports use `@ts-ignore`.
- **Fix Required:** Add proper type definitions or use `@types/three` correctly (if available) or create a `d.ts` declaration.

### 3. Hardcoded Responsive Logic

- **Issue:** `isMobileWidth` uses `window.innerWidth <= 768` inside the component.
- **Fix Required:** Use the design system's `useMediaQuery` or consistent breakpoints.

## ℹ️ Minor Findings (P2)

- **Aura Component**: `GhostAura.tsx` is clean but uses `framer-motion` for simple orbital animations which could be heavier than CSS keyframes or WebGL for simple decorative elements. Keeping it for now as it's DOM-based.

## Plan of Attack

1. **Refactor `GhostScene.tsx`**:
    - Implement Cleanup.
    - Switch Fireflies to InstancedMesh (No Lights).
    - Integrate `ghostConfig.ts`.
2. **Verify `HomeHero.tsx`**:
    - Ensure `GhostSceneWrapper` is conditionally rendered properly (it is).
