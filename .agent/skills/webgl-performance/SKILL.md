---
name: webgl-performance
description: Expert guidelines for high-performance React Three Fiber (R3F) development.
---

# WebGL & R3F Performance Mastery

This skill provides the **Ghost System** rules for 3D engineering.

## 🛑 The "60 FPS" Mandate

Performance is not an afterthought. It is the primary constraint.

### 1. Instancing

**Rule:** If you have more than 10 identical objects, you MUST use `InstancedMesh`.

- **Bad:** Mapping over an array to render 50 `<Mesh>` components.
- **Good:** One `<InstancedMesh>` with 50 items.

### 2. The Render Loop (`useFrame`)

**Rule:** ZERO allocations inside the loop.

- **Bad:** `useFrame(() => { const vec = new Vector3() ... })` (Garbage Collection spike).
- **Good:** Reuse a single module-level or strict-ref Vector3.

### 3. Textures

- **Format:** Use `.ktx2` (Basisu) or `.webp`.
- **Size:**
  - Hero Backgrounds: Max 2048px.
  - Props/Small items: Max 512px.
- **Loading:** Always use `useTexture.preload` for critical assets.

### 4. Shadows & Lighting

- **Realtime Shadows:** Extremely expensive. Use sparingly.
- **Baking:** Prefer baked lightmaps/shadowmaps for static scenes.
- **Soft Shadows:** Disable unless critical.

### 5. Memory Management

- **Disposal:** R3F handles this mostly, but be careful with manual `new THREE.Material()`.
- **Events:** Unmount event listeners.

## Anti-Patterns

- Using high-poly models (>50k tris) for background elements.
- Multiple heavy post-processing passes (Bloom + DepthOfField + ChromaticAberration) on mobile.
- "Jank" on scroll (syncing DOM scroll to WebGL incorrectly).
