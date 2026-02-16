# 🎭 GhostScene Decomposition Plan

**Target:** `src/components/canvas/home/hero/GhostScene.tsx`  
**Current:** 874 lines  
**Goal:** <400 lines (main component)  
**Strategy:** Extract into focused, reusable sub-components

---

## 📊 CURRENT STRUCTURE ANALYSIS

### Component Breakdown

| Section | Lines | Complexity | Extract Priority |
|---------|-------|------------|------------------|
| Imports & Constants | 1-21 | Low | Keep |
| Main Component Setup | 22-73 | Medium | Keep |
| Three.js Scene Setup | 75-114 | Medium | **Extract** |
| Post-Processing Setup | 115-241 | High | **Extract** |
| Ghost Body Creation | 242-395 | High | **Extract** |
| Eyes Creation | 396-466 | Medium | **Extract** |
| Fireflies System | 467-514 | High | **Extract** |
| Particle System | 515-569 | High | **Extract** |
| Event Handlers | 571-624 | Medium | **Extract** |
| Animation Loop | 625-819 | Very High | **Refactor** |
| Cleanup | 820-851 | Low | Keep |
| JSX Return | 854-872 | Low | Keep |

**Total Extractable:** ~650 lines → 6-8 sub-components

---

## 🎯 DECOMPOSITION STRATEGY

### Phase 2.1: Extract Scene Setup Utilities

**Files to Create:**

1. `src/components/canvas/home/hero/utils/sceneSetup.ts`
   - `createRenderer()` - Renderer configuration
   - `createCamera()` - Camera setup
   - `createLights()` - Ambient + Rim lights
   - **Lines Saved:** ~80

### Phase 2.2: Extract Post-Processing

**Files to Create:**
2. `src/components/canvas/home/hero/utils/postProcessing.ts`

- `createComposer()` - EffectComposer setup
- `createBloomPass()` - UnrealBloomPass
- `createAnalogDecayShader()` - Custom shader
- `createAnalogDecayPass()` - ShaderPass
- **Lines Saved:** ~130

### Phase 2.3: Extract Ghost Components

**Files to Create:**
3. `src/components/canvas/home/hero/components/GhostBody.ts`

- `createGhostBody()` - Geometry + Material
- `createAtmosphere()` - Background shader
- **Lines Saved:** ~100

1. `src/components/canvas/home/hero/components/GhostEyes.ts`
   - `createEyes()` - Eye sockets + glow
   - `updateEyeGlow()` - Animation logic
   - **Lines Saved:** ~80

### Phase 2.4: Extract Particle Systems

**Files to Create:**
5. `src/components/canvas/home/hero/systems/FireflySystem.ts`

- `createFireflySystem()` - InstancedMesh setup
- `updateFireflies()` - Animation loop
- **Lines Saved:** ~60

1. `src/components/canvas/home/hero/systems/ParticleSystem.ts`
   - `createParticleSystem()` - InstancedMesh setup
   - `spawnParticle()` - Particle spawning
   - `updateParticles()` - Animation loop
   - **Lines Saved:** ~90

### Phase 2.5: Extract Event Handlers

**Files to Create:**
7. `src/components/canvas/home/hero/hooks/useGhostInteraction.ts`

- Custom hook for mouse/touch/scroll
- Returns: `{ mouse, scrollY, hasReceivedInput }`
- **Lines Saved:** ~50

### Phase 2.6: Refactor Animation Loop

**Strategy:**

- Keep main loop in `GhostScene.tsx`
- Extract update functions to respective modules
- Use composition pattern

---

## 📁 NEW DIRECTORY STRUCTURE

```
src/components/canvas/home/hero/
├── GhostScene.tsx (MAIN - ~350 lines)
├── components/
│   ├── GhostBody.ts
│   └── GhostEyes.ts
├── systems/
│   ├── FireflySystem.ts
│   └── ParticleSystem.ts
├── utils/
│   ├── sceneSetup.ts
│   ├── postProcessing.ts
│   └── constants.ts
└── hooks/
    └── useGhostInteraction.ts
```

---

## 🔄 REFACTORED GhostScene.tsx STRUCTURE

```typescript
// ~350 lines total

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { useGhostInteraction } from './hooks/useGhostInteraction';
import { createRenderer, createCamera, createLights } from './utils/sceneSetup';
import { createComposer, createBloomPass, createAnalogDecayPass } from './utils/postProcessing';
import { createGhostBody, createAtmosphere } from './components/GhostBody';
import { createEyes, updateEyeGlow } from './components/GhostEyes';
import { createFireflySystem, updateFireflies } from './systems/FireflySystem';
import { createParticleSystem, updateParticles } from './systems/ParticleSystem';
import { MAX_PARTICLES } from './utils/constants';

export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Preloader Manager
    const preloaderManager = { /* ... */ };

    // Scene Setup (extracted)
    const scene = new THREE.Scene();
    const camera = createCamera();
    const renderer = createRenderer();
    const { ambientLight, rimLight1, rimLight2 } = createLights();
    
    // Post-Processing (extracted)
    const { composer, bloomPass, analogDecayPass } = createComposer(renderer, scene, camera);
    
    // Ghost Components (extracted)
    const atmosphere = createAtmosphere();
    const ghostGroup = new THREE.Group();
    const ghostBody = createGhostBody(ghostGroup);
    const eyes = createEyes(ghostGroup);
    
    // Systems (extracted)
    const fireflySystem = createFireflySystem(scene, performanceConfig);
    const particleSystem = createParticleSystem(scene);
    
    // Interaction Hook (extracted)
    const { mouse, scrollY, hasReceivedInput } = useGhostInteraction();
    
    // Animation Loop (refactored)
    const animate = (timestamp: number) => {
      // Ghost movement
      // Update eyes (extracted function)
      updateEyeGlow(eyes, currentMovement);
      // Update particles (extracted function)
      updateParticles(particleSystem, ghostGroup, currentMovement);
      // Update fireflies (extracted function)
      updateFireflies(fireflySystem, time);
      // Render
      composer.render();
    };
    
    // Cleanup
    return () => { /* ... */ };
  }, []);

  return (/* JSX */);
}
```

---

## ✅ SUCCESS CRITERIA

1. **Main Component:** <400 lines ✅
2. **Type Safety:** No `any` types ✅
3. **Performance:** Zero allocations in animation loop ✅
4. **Testability:** Each module independently testable ✅
5. **Maintainability:** Clear separation of concerns ✅
6. **Zero Breaking Changes:** Visual output identical ✅

---

## 🚨 RISKS & MITIGATION

### Risk 1: Performance Regression

**Mitigation:**

- Keep all refs and reusable objects in main component
- Pass by reference, not by value
- Benchmark before/after with Chrome DevTools

### Risk 2: Visual Differences

**Mitigation:**

- Extract one module at a time
- Test visually after each extraction
- Use git commits for easy rollback

### Risk 3: Type Complexity

**Mitigation:**

- Define clear interfaces for each module
- Use TypeScript strict mode
- Document return types explicitly

---

## 📝 EXECUTION ORDER

1. ✅ **Create directory structure**
2. ✅ **Extract constants** (`utils/constants.ts`)
3. ✅ **Extract scene setup** (`utils/sceneSetup.ts`)
4. ✅ **Extract post-processing** (`utils/postProcessing.ts`)
5. ✅ **Extract Ghost body** (`components/GhostBody.ts`)
6. ✅ **Extract Ghost eyes** (`components/GhostEyes.ts`)
7. ✅ **Extract firefly system** (`systems/FireflySystem.ts`)
8. ✅ **Extract particle system** (`systems/ParticleSystem.ts`)
9. ✅ **Extract interaction hook** (`hooks/useGhostInteraction.ts`)
10. ✅ **Refactor main component**
11. ✅ **Verify & Test**
12. ✅ **Update documentation**

---

## 🎯 ESTIMATED IMPACT

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Main Component Lines | 874 | ~350 | -60% |
| Largest Function | 172 | ~80 | -53% |
| Cyclomatic Complexity | Very High | Medium | ⬇️⬇️ |
| Testability | Low | High | ⬆️⬆️ |
| Reusability | None | High | ⬆️⬆️ |

---

**Ready to Execute:** ✅  
**Estimated Time:** 45-60 minutes  
**Confidence Level:** High (95%)

---

*"Divide and conquer. Precision over chaos."* - Loki Protocol
