## 2024-05-23 - Consolidating Post-Processing Passes

**Learning:** `EffectComposer` in `@react-three/postprocessing` executes each effect as a separate render pass (unless merged by the library, which custom effects are not). Stacking separate `Noise`, `Vignette`, and a custom `AnalogDecay` (which internally calculated grain and vignette) resulted in 4+ full-screen shader passes per frame.
**Action:** Always inspect custom shader effects to see if they can handle standard effects like grain or vignette internally. Consolidating these into a single custom shader pass significantly reduces GPU overhead, especially for full-screen effects.
