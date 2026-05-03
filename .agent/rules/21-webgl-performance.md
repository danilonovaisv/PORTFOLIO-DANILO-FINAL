---
trigger: always_on
priority: critical
match: '**/*.{tsx,ts,shader,glsl}'
---

# 21-webgl-performance.md — The 60FPS Mandate

## 🚀 Performance Rules

1. **Instance Everything**: If you have >10 of something, use `InstancedMesh`.
2. **No Allocations in Loop**: `useFrame` must not create new objects (Vector3, Matrix4). Reuse variables declared outside the scope.
3. **Texture Management**: Always use `ktx2` or `webp`. Max size 2048px (Hero), 1024px (Props).
4. **Shader Complexity**: Minimize distinct shader programs. Use `defines` for variations.
5. **Draw Calls**: Keep draw calls under 100 per scene. Merge geometries where possible.

## 🧹 Lifecycle & Cleanup

- **Disposal**: Manually dispose of `geometry` and `material` when unmounting if not handled by R3F cache.
- **Events**: Remove event listeners in `useEffect` return.
- **Refs**: Nullify refs to avoid memory leaks.

## 🎨 Visual Quality

- **Anti-Aliasing**: Use SMAA or FXAA. MSAA is expensive in deferred rendering.
- **Shadows**: Bake static shadows. Use soft shadows sparingly on dynamic objects.
