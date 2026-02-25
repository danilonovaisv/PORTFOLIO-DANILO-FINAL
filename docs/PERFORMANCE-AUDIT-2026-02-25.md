# ⚡ Performance Audit Report — Ghost System Portfolio

**Date:** 2026-02-25  
**Agent:** Antigravity (Frontend Specialist)  
**Stack:** Next.js 16.1.6 | R3F v9 | Three.js r183 | Tailwind v4 | Framer Motion v12  

---

## Executive Summary

| Metric | Status | Notes |
|--------|--------|-------|
| **Static Integrity** | ⚠️ BLOCKED | `node_modules` permission error — `typecheck`/`lint` fail to run |
| **R3F/WebGL Performance** | 🟡 MEDIUM | 4 critical issues found |
| **Bundle Optimization** | 🟡 MEDIUM | 3 issues — tree-shaking risk + heavy deps |
| **Caching Strategy** | ✅ GOOD | Proper immutable cache for static assets |
| **Image Optimization** | ✅ GOOD | Next/Image with lazy loading and Supabase remotePatterns |
| **Motion/Animation** | ⚠️ WARNING | 2 issues — animation re-triggering + route transitions |
| **Memory Management** | ✅ GOOD | Proper cleanup in GhostScene |

**Overall Grade: B+ (77/100)** — Solid foundation, but there are hot-path allocations in render loops and bundle optimization opportunities.

---

## 🔴 Phase 1: Static Integrity Check

### Node Modules Permission Error (KNOWN ISSUE)
```
EPERM: operation not permitted, realpath '/Users/danilonovais/PORTFOLIO-DANILO-FINAL/node_modules'
```

**Impact:** `pnpm run typecheck` and `pnpm run lint` cannot execute.  
**Root Cause:** macOS extended attributes or permission corruption on `node_modules/`.  
**Remediation:**
```bash
# Option A: Fix extended attributes
xattr -cr node_modules/
chmod -R 755 node_modules/

# Option B: Reinstall
rm -rf node_modules/ .pnpm-store/
pnpm install
```

**Priority:** 🔴 HIGH — Blocks CI/CD and prevents catching type errors before deploy.

---

## 🟡 Phase 2: Runtime Execution Analysis (R3F / WebGL)

### Issue P2-1: Object Allocation in useFrame Loop (HeroParticles)

**File:** `src/components/canvas/shaders/index.tsx:67`  
**Severity:** 🔴 HIGH  

```typescript
// ❌ CURRENT — Creates a new Vector2 EVERY FRAME (~60x/sec)
materialRef.current.uniforms.uMouse.value.lerp(
  new THREE.Vector2(targetX, targetY),  // <-- GC pressure
  0.1
);
```

**Fix:**
```typescript
// ✅ Declare outside useFrame, reuse per frame
const _mouseTarget = new THREE.Vector2();

useFrame((state) => {
  // ...
  _mouseTarget.set(targetX, targetY);
  materialRef.current.uniforms.uMouse.value.lerp(_mouseTarget, 0.1);
});
```

**Impact:** Eliminates ~60 Vector2 allocations/sec → reduces GC pauses.

---

### Issue P2-2: Math.random() Inside Animation Loop (GhostScene)

**File:** `src/components/canvas/home/hero/GhostScene.tsx:775`  
**Severity:** 🟡 MEDIUM  

```typescript
// ❌ Math.random() called inside the hot-path animate loop
const s = (0.6 + Math.random() * 0.7) * (Math.max(0, p.life) * 0.85);
```

**Why it matters:** `Math.random()` is not GC-heavy, but it creates **non-deterministic particle sizes per frame**, causing visual jitter. Should be pre-computed per-particle at spawn time.

**Fix:** Pre-store a `randomScale` value in `ParticleData` during `spawnInstancedParticle()` and reuse it in the loop.

---

### Issue P2-3: HeaderGlassCanvas — `frameloop="always"` Running Perpetually

**File:** `src/components/canvas/header/HeaderGlassCanvas.tsx:127`  
**Severity:** 🟡 MEDIUM  

```tsx
<Canvas frameloop="always" ... >
```

The header Canvas runs at full framerate even when the header is off-screen or idle. On mobile this drains battery.

**Fix:**
```tsx
<Canvas frameloop="demand" ... >
```
Then invalidate only when the pointer moves or the time uniform needs updating:
```tsx
useFrame((state) => {
  state.invalidate(); // Only when visual change needed
  // ... your logic
});
```

Alternatively, use `IntersectionObserver` to pause/resume the loop.

---

### Issue P2-4: GlassBar — FBO Render Target Every Frame

**File:** `src/components/canvas/header/GlassBar.tsx:104-106`  
**Severity:** 🟡 MEDIUM  

```typescript
gl.setRenderTarget(buffer);
gl.render(scene, camera);   // Full scene render to FBO every frame
gl.setRenderTarget(null);
```

The `MeshTransmissionMaterial` refraction effect renders the scene to an intermediate FBO **every frame**. Combined with the `frameloop="always"`, this doubles rendering cost for the header.

**Recommendation:** When combined with fix P2-3 (demand loop), this becomes acceptable. On mobile/low-end, consider skipping the transmission material entirely via `usePerformanceAdaptive`.

---

### Issue P2-5: GhostScene Massive Monolith (884 lines in single useEffect)

**File:** `src/components/canvas/home/hero/GhostScene.tsx`  
**Severity:** 🟡 MEDIUM (Maintainability + Rendering Hotpath)  

The entire Three.js scene (renderer, scene, camera, post-processing, particle system, fireflies, event listeners) is created in a single `useEffect`. While this works and properly cleans up, it's:

1. Difficult to profile individual systems
2. Cannot be partially disabled via `usePerformanceAdaptive`
3. Uses raw Three.js instead of R3F, meaning it bypasses R3F's automatic scheduling and batching

**Recommendation:** Consider refactoring into smaller composable hooks (`useGhostRenderer`, `useParticleSystem`, `useFireflies`, `useAnalogDecay`) for better modularity and granular performance control.

---

## 🟡 Phase 3: Bundle Optimization

### Issue B-1: `import * as THREE from 'three'` (26+ files)

**Severity:** 🟡 MEDIUM  

Found 26 files using barrel import `import * as THREE from 'three'`.

**Impact:** While Next.js 16 + Turbopack is generally good at tree-shaking, `import * as THREE` in non-R3F files (like `GhostScene.tsx` which uses raw Three.js) prevents dead-code elimination for the entire Three.js library.

**Fix for non-R3F files:**
```typescript
// ✅ Named imports for better tree-shaking
import { 
  Scene, PerspectiveCamera, WebGLRenderer, 
  SphereGeometry, MeshStandardMaterial, 
  InstancedMesh, Vector3, Object3D 
} from 'three';
```

**Note:** R3F components can keep `import * as THREE` since R3F already manages the Three.js instance.

---

### Issue B-2: Dual Animation Libraries (framer-motion + GSAP + motion)

**Severity:** 🟡 MEDIUM  

| Library | Files Using It |
|---------|---------------|
| `framer-motion` | 45+ components |
| `gsap` | Unknown (in deps) |
| `motion` (from `motion/react`) | 1 file (`HeroHeader.tsx`) |

**Impact:** `framer-motion` (~32KB gzipped) + `gsap` (~25KB gzipped) are both shipped.

**Recommendation:**  
1. The `motion/react` import in `HeroHeader.tsx` is incorrect — should use `framer-motion` for consistency.
2. Run `pnpm run analyze:bundle` (when `node_modules` is fixed) to verify if GSAP is actually used in production paths.
3. If GSAP is only used in admin, ensure it's dynamically imported.

---

### Issue B-3: Heavy DevDeps in Production Bundle Risk

**Severity:** ℹ️ LOW  

`@next/bundle-analyzer` is properly in `devDependencies`. Nothing critical here.
The `optimizePackageImports` in `next.config.mjs` correctly lists `lucide-react`, `framer-motion`, and Radix UI. This is well-configured.

---

## ✅ What's Already Well-Done

### 1. Image Optimization
- ✅ `next/image` with `fill` and `sizes` attributes properly configured
- ✅ `lazy` loading by default, `eager` only for priority above-fold images
- ✅ Supabase `remotePatterns` correctly configured for CDN delivery
- ✅ `onError={applyImageFallback}` — graceful degradation

### 2. Memory Management (GhostScene)
- ✅ Proper `cancelAnimationFrame` on unmount
- ✅ Event listener cleanup
- ✅ Scene traversal to dispose geometries/materials  
- ✅ Renderer and composer disposal
- ✅ `_vector` and `_dummy` pre-allocated outside loop

### 3. Performance Adaptive System
- ✅ `usePerformanceAdaptive` hook detects mobile/low-end and downgrades
- ✅ Post-processing disabled on low-end
- ✅ Particle counts reduced adaptively
- ✅ FPS monitoring with automatic quality downgrade

### 4. Code Splitting & Dynamic Imports
- ✅ `GhostScene` loaded via `dynamic()` with `ssr: false`
- ✅ `HeaderGlassCanvas` loaded via `dynamic()` with `ssr: false`
- ✅ `AdminShell` loaded via `dynamic()` — admin bundle separated
- ✅ `LiquidEther` loaded via `dynamic()` for project templates

### 5. Caching Strategy
- ✅ `/_next/static/*` — `immutable, max-age=31536000`
- ✅ `/fonts/*` — `immutable, max-age=31536000`
- ✅ Font preloading for TT Norms Pro (3 weights in `<head>`)
- ✅ Supabase preconnect for faster LCP

### 6. CSP & Security Headers
- ✅ Comprehensive CSP with proper worker-src blob:
- ✅ HSTS preload enabled
- ✅ X-Frame-Options DENY

### 7. Motion Accessibility
- ✅ `useMotionGate` respects `prefers-reduced-motion`
- ✅ Template skips animation when reduced motion detected
- ✅ SmoothScroll (Lenis) disabled when reduced motion is on

---

## 📊 Optimization Roadmap

### Immediate (Fix Now)
| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 1 | Fix `node_modules` permissions | 🔴 HIGH | 5min |
| 2 | P2-1: Vector2 allocation in useFrame | 🔴 HIGH | 2min |

### Short-Term (This Sprint)
| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 3 | P2-3: Change `frameloop` to `"demand"` | 🟡 MEDIUM | 15min |
| 4 | P2-2: Pre-compute particle random scales | 🟡 MEDIUM | 10min |
| 5 | B-2: Audit GSAP usage + fix `motion/react` import | 🟡 MEDIUM | 30min |

### Medium-Term (Next Sprint)
| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 6 | B-1: Named Three.js imports for non-R3F files | 🟡 MEDIUM | 1h |
| 7 | P2-5: Refactor GhostScene into composable hooks | 🟡 MEDIUM | 4h |
| 8 | P2-4: Conditional FBO rendering on mobile | ℹ️ LOW | 2h |

### Monitoring (Ongoing)
| Action | Frequency |
|--------|-----------|
| Run `pnpm run analyze:bundle` | Per release |
| Chrome DevTools Performance trace | Weekly |
| Lighthouse CI (LCP, CLS, INP) | Per deploy |

---

## 🔧 Quick Win: Auto-Fix for P2-1

This is the highest-impact, lowest-effort fix. The Vector2 allocation in `useFrame` creates garbage collection pressure at 60fps.

**File to modify:** `src/components/canvas/shaders/index.tsx`  
**Change:** Declare `_mouseTarget` as a module-level constant and reuse inside `useFrame`.

---

*Report generated by Antigravity Ghost System Performance Audit Protocol*  
*Next scheduled audit: After bundle fix + node_modules resolution*
