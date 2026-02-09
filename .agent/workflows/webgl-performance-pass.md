---
description: Specialized audit for Three.js/R3F performance optimization.
---

# WebGL Performance Pass

This workflow focuses purely on 3D performance metrics (FPS, Draw Calls, Memory).

## Trigger

- "The site feels slow".
- Before a major release.
- When adding new 3D models.

## Steps

1. **Static Asset Analysis**
   - Check `public/models/` and `public/textures/`.
   - **Rule:** Textures should be `.webp` or `.ktx2`. Max 2048px.
   - **Rule:** Models should be `.glb` (Draco compressed).

2. **Code Optimization Scan**
   - Search for `useFrame` in `src/`.
   - **Check:** Are there object allocations (new Vector3) inside the loop? -> **Refactor**.
   - **Check:** Are geometries/materials reused?

3. **Render Loop Analysis**
   - Check `<Canvas>` props.
   - Ensure `dpr={[1, 2]}` (never uncapped).
   - Check `shadows` prop (soft shadows are expensive).

4. **Performance Monitor Injection**
   - (Temporary) Add `<Stats />` or `<Perf />` (r3f-perf) to the scene.
   - Ask user to run and report:
     - Draw Calls (Target: < 100)
     - Triangles (Target: < 500k for mobile)
     - Texture Memory

5. **Report & Fix**
   - Generate `docs/perf/webgl-report-[date].md`.
   - Apply fixes (Instancing, Texture resizing, Shader simplification).
