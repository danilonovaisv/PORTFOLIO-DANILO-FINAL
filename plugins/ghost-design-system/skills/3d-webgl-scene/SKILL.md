---
name: 3d-webgl-scene
description: >
  This skill should be used when the user asks to "create a 3D scene", "set up React Three Fiber",
  "add a WebGL canvas", "implement a Three.js scene", "add 3D objects", "create a floating mesh",
  "set up R3F with drei", "optimize a Three.js scene", "fix memory leaks in R3F",
  "add post-processing effects", "implement LOD", "create a 3D background", or any request
  involving Three.js, @react-three/fiber, @react-three/drei, or WebGL in a Next.js project.
metadata:
  version: "0.1.0"
  author: "Danilo Novais"
---

# 3D / WebGL Scene — R3F Architecture

## Core Principles

Apply these rules to every Three.js / R3F implementation:

### 1. Always Dynamic Import the Canvas
Never import R3F canvas in a Server Component or SSR context:
```typescript
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });
```

### 2. DPR-Aware Rendering
Always cap DPR to prevent GPU overload on Retina displays:
```typescript
<Canvas dpr={[1, 2]} ...>
```

### 3. Memory Cleanup on Unmount
Every component using geometries, materials, or textures must dispose them:
```typescript
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    if (texture) texture.dispose();
  };
}, [geometry, material, texture]);
```

### 4. Reduced Motion Respect
Pause or slow animations when `prefers-reduced-motion` is active:
```typescript
const { prefersReducedMotion } = useReducedMotion();
useFrame((_, delta) => {
  if (prefersReducedMotion) return; // skip animation updates
  mesh.current.rotation.y += delta * 0.5;
});
```

### 5. Suspense + Preload for Asset Loading
Wrap all model/texture loaders in Suspense and use `useGLTF.preload()`:
```typescript
useGLTF.preload('/models/hero.glb');
// In component tree:
<Suspense fallback={<Placeholder />}>
  <Model />
</Suspense>
```

## Scene Component Architecture

The standard R3F component hierarchy:

```
<Canvas>                          # Renderer config
  <Suspense fallback={null}>
    <Environment />               # HDR lighting
    <PerspectiveCamera />         # Camera setup
    <Float>                       # Floating animation
      <YourMesh />                # Actual geometry
    </Float>
    <Preload all />               # Preload all assets
  </Suspense>
</Canvas>
```

## Performance Optimization Checklist

Before shipping any 3D scene, verify:
- [ ] Canvas has `frameloop="demand"` if scene is not constantly animating
- [ ] `dpr` is capped at `[1, 2]`
- [ ] All geometries disposed on unmount
- [ ] Models use Draco compression (gltf-pipeline or gltf.report)
- [ ] Textures are power-of-2 dimensions (512, 1024, 2048)
- [ ] No per-frame object creation (avoid `new Vector3()` inside `useFrame`)
- [ ] `instancing` used for repeated geometry
- [ ] Shadows disabled unless explicitly needed

## Reference Files

Load for complete implementations:
- `references/scene-components.md` — Full Scene.tsx, FloatingObject.tsx, Environment.tsx
- `references/performance-patterns.md` — LOD, instancing, shader optimization, memory management
