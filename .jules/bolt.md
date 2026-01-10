## 2026-01-10 - Disabling Post-Processing for Performance
**Learning:** Conditionally rendering `EffectComposer` based on device capability is a high-impact optimization for WebGL scenes. The `usePerformanceAdaptive` hook already provided the logic (`enablePostProcessing`), but it was ignored in the component, causing expensive effects to run on all devices.
**Action:** Always check if expensive sub-components (like post-processing chains) are actually respecting the performance config flags passed to them.
