---
name: webgl-optimizer
description: Skill to check WebGL performance, focusing on useFrame usage and texture sizes.
---

# WebGL Optimizer Skill

Trigger: "optimize 3d", "check draw calls", "performance audit"

## Objectives

1. Analyze `src/components/canvas` files.
2. Check for `useFrame` usage to ensure no heavy calculations or state updates causing re-renders. Use `useRef` for direct mutation.
3. Check texture sizes and suggest compression if needed.

## Action Steps

1. **List Files**: List all files in `src/components/canvas` recursively to understand the scope.
2. **Analyze useFrame**:
    - Search for `useFrame` in the identified files.
    - identifying any `setState` calls or heavy logic inside the loop.
    - Flag any potential performance bottlenecks.
3. **Check Textures**:
    - Inspect `public/assets` for large texture files (e.g., > 1MB).
    - Recommend optimization (KTX2/Draco) if necessary.
4. **Report**: Provide a summary of findings and specific optimization recommendations.
