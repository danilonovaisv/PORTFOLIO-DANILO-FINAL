---
description: Specialized audit for Three.js/R3F performance optimization.
---

# R3F Visual Debugger Workflow

This workflow addresses performance and visual correctness issues in React Three Fiber (R3F) applications, focusing on debugging render loops, asset handling, and component context stability.

## Trigger

- "3D animation freezes during scroll"
- "FPS drops below 60 on mobile"
- "Models disappear after navigation"

## Phase 1: Visual Reproduction & Instrumentation

1. **Instrumentation**:
   - Inject `<Stats />` via `@react-three/drei`.
   - Monitor `drawCalls` and `FPS`.

2. **Render Loop Verification**:
   - Audit `useFrame` callbacks.
   - Detect anti-patterns: `useState` inside `useFrame`, allocation of new objects (`new Vector3`) inside loops.
   - Refactor to mutate refs/objects directly.

## Phase 2: Context Isolation & Hydration

1. **Check Canvas Lifecycle**:
   - Ensure `<Canvas>` is mounted at the global level or uses persistent layouts to avoid context loss during navigation (SPA transitions).
   - Use `tunnel-rat` or similar for rendering localized component content into a global canvas if necessary.

2. **Hydration Mismatch**:
   - Verify if server-rendered HTML matches client-side execution for 3D components.
   - Ensure `useLayoutEffect` vs `useEffect` usage is appropriate for Next.js SSR.

## Phase 3: Artifact Generation

1. **Video Capture**:
   - Record browser session during scroll/interaction.
   - Confirm stability across page transitions.

## Dependencies

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `leva` (optional for tweaking)

## Success Criteria

- FPS stable > 55.
- Draw calls < 100 per frame.
- Zero `GL_INVALID_OPERATION` errors in console.
