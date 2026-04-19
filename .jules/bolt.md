## 2024-03-26 - Missing pixelRatio usage in GhostScene WebGLRenderer
**Learning:** The project had an adaptive performance configuration mechanism (`usePerformanceAdaptive.ts`) that correctly calculated the optimal pixel ratio based on device capabilities. However, this configuration was not actually being applied to the `THREE.WebGLRenderer` in `GhostScene.tsx`. Without explicitly calling `renderer.setPixelRatio()`, Three.js defaults to `1` or the canvas size, missing the opportunity to downscale on low-end devices or correctly handle high-DPI displays without destroying performance.
**Action:** When implementing custom performance configuration for WebGL/Three.js renderers, always verify that the configuration outputs (like `pixelRatio`) are explicitly passed to the relevant renderer methods (`renderer.setPixelRatio()`). Just calculating the value is not enough.

## 2025-01-20 - Missing pixelRatio usage in HeaderGlassCanvas React Three Fiber Canvas
**Learning:** A similar issue to GhostScene was found in `HeaderGlassCanvas.tsx` using `@react-three/fiber`. The `<Canvas>` component was hardcoded to `dpr={[1, 2]}` instead of utilizing the `usePerformanceAdaptive` hook.
**Action:** Ensure that all WebGL elements, whether raw Three.js or React Three Fiber, use the global performance strategy. For `@react-three/fiber`, pass `performanceConfig.pixelRatio` to the `dpr` prop of `<Canvas>`.
## 2025-01-04 - [React.memo on Interactive List Items]
**Learning:** Components rendered in lists (`map`) that depend on parent state for interaction (e.g., `isHovered` where the parent tracks `hoveredCategory`) are prime candidates for `React.memo`. Without it, a single hover interaction causes ALL sibling items in the list to re-render, not just the newly hovered and unhovered ones.
**Action:** Always consider `React.memo` for list items that receive specific active/hover state from a parent, especially if the items contain complex DOM, motion animations, or media.
## 2025-01-20 - React.memo on DesktopNavItem
**Learning:** Components rendered in lists (`map`) that depend on parent state for interaction (e.g., `activeHref` changing on scroll) are prime candidates for `React.memo`. The `DesktopFluidHeader` component was re-rendering all nav items whenever the active section changed during scroll.
**Action:** Extract list items into a separate component and wrap them with `React.memo` when the parent recalculates state that only affects a single item in the list at a time.
