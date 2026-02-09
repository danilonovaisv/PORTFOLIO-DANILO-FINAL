# Dan Ghost Strategy: Technical Specification & Battle Plan

## 1. 🧠 Critical Requirements Analysis

### 1.1 The "Manifesto" Video Logic
**Complexity:** The transition from a floating thumbnail (Hero) to a fullscreen immersive experience (Manifesto Section) requires precise state management and scroll synchronization.
*   **Challenge:** Syncing DOM elements (Text fade-out) with the Video's transform (Scale/Translate) while managing audio state.
*   **The "Hold" Mechanism:** The requirement for a "2-second hold" at fullscreen with audio enabled is a scroll-jacking pattern. This must be implemented carefully using "Pinning" (via `framer-motion`'s `useScroll` or CSS `sticky`) rather than blocking the scroll thread, to avoid UX frustration.
*   **Audio Logic:** 
    *   *Thumb:* Muted.
    *   *Transition:* Muted.
    *   *Fullscreen Hold:* Unmuted (Auto-play).
    *   *Exit:* Muted.
    *   *Mobile:* Click-to-unmute overlay.

### 1.2 Ghost Atmosphere Fidelity
**Complexity:** The "Ghost" is not just a 3D object; it's a composition of lighting, shaders, and post-processing.
*   **Visual Pillars:**
    *   *Organic Movement:* Vertex displacement using Simplex Noise (not just rotation).
    *   *Ethereal Glow:* High emissive values (>1.0) paired with a Bloom effect (radius ~0.8, threshold ~0.6).
    *   *Analog Decay:* Scanlines, noise, and vignette to ground the digital ghost in a "recorded" aesthetic.
*   **Lighting:** Needs to be dynamic. The "Eyes" (or core) should pulse and potentially track the cursor slightly.

### 1.3 Performance Constraints
**Complexity:** WebGL + Heavy Post-processing + Scroll Animations = High Risk of Frame Drops.
*   **DPR Limits:** Strictly capped at `1.5` for generic screens and `2` for high-end. Never use `window.devicePixelRatio` directly without clamping.
*   **Mobile Strategy:** 
    *   *Disable Post-Processing:* Or significantly reduce pass count.
    *   *Fallback:* Static video or high-quality image if the GPU tier is low.
*   **Memory:** Dispose of geometries/materials on unmount. Avoid re-creating materials inside the render loop.

---

## 2. 📐 Optimized System Rules (Governance)

These rules define the technical boundaries of the project.

### 2.1 Stack Constraints
*   **Core:** Next.js (App Router), React 18, TypeScript.
*   **Styling:** Tailwind CSS only. No CSS Modules unless wrapping legacy libs.
*   **3D Engine:** React Three Fiber (R3F) + Drei.
    *   *Strict Rule:* All 3D components must be lazy-loaded via `next/dynamic` with `{ ssr: false }`.
*   **Animation:** Framer Motion for DOM.
    *   *Signature Easing:* `cubicBezier(0.22, 1, 0.36, 1)` for all UI entrances.

### 2.2 Performance First ("Ghost Standard")
*   **Render Loop:**
    *   ❌ NEVER set React State (`useState`) inside `useFrame`.
    *   ✅ Use `useRef` for values changing every frame.
*   **Responsiveness:**
    *   ❌ No heavy WebGL on Mobile (< 768px).
    *   ✅ Use `<Canvas dpr={[1, 1.5]} ... />` to cap pixel ratio.
    *   ✅ Respect `prefers-reduced-motion`: Hide Ghost, stop auto-scroll.
*   **Asset Management:**
    *   Preload critical textures/GLTFs in a `Preloader` component.
    *   Use `kTX2` or `WebP` textures where possible.

### 2.3 UI/UX Fidelity
*   **Z-Index Hierarchy (Immutable):**
    *   `z-50`: Global Loaders / Modals
    *   `z-40`: Header (Glass)
    *   `z-30`: Manifesto Video (Expanded)
    *   `z-25`: Hero Copy / CTA (Must sit *above* Ghost)
    *   `z-20`: Ghost WebGL Layer (`pointer-events-none`)
    *   `z-0`: Background
*   **Interaction:**
    *   Buttons: `scale(0.98)` on tap/click.
    *   Links: Underline expansion from center or left.

---

## 3. 🚀 Implementation Workflows (Battle Plan)

### Workflow A: WebGL Foundation (The Ghost)
**Objective:** Build the atmospheric core without breaking the browser.
1.  **Scene Setup:** Configure `<Canvas>` with `dpr`, `gl={{ antialias: false }}`, and `toneMapping`.
2.  **Ghost Mesh:** Implement a sphere/organic shape with `MeshTransmissionMaterial` or custom `ShaderMaterial` utilizing Simplex Noise for vertex displacement.
3.  **Post-Processing Pipeline:** Add `EffectComposer`.
    *   *Bloom:* For the "inner light".
    *   *Noise/Grain:* For the "analog" feel.
    *   *Vignette:* To focus attention.
4.  **Performance Check:** Verify FPS > 55 on simulated 4x slowdown (DevTools).

### Workflow B: Scroll Orchestration (The Narrative)
**Objective:** Connect the user's scroll to the narrative reveal.
1.  **Hero Wrapper:** Create a `h-[300vh]` container to allow for "Pinning".
2.  **Motion Values:** Map `useScroll()` to:
    *   `videoScale`: [0.3 -> 1.0]
    *   `videoRadius`: [16px -> 0px]
    *   `textOpacity`: [1.0 -> 0.0]
3.  **The "Hold":** Logic to snap/dampen scroll when Video reaches Fullscreen (optional, proceed with caution on scroll-jacking).
4.  **Sound State:** `useMotionValueEvent` to trigger `videoRef.current.muted = false` when in the "Hold" zone.

### Workflow C: Integration & Polish
**Objective:** Unify DOM and Canvas.
1.  **Z-Index Verification:** Use the `verify_home.py` script to ensure Text > Ghost.
2.  **Mobile Adaptation:**
    *   Replace WebGL with a high-res video loop or static gradient.
    *   Stack "Manifesto" as a standard section below Hero instead of a floating thumb.
3.  **Loader:** Ensure `Preloader` keeps the curtain down until the 3D scene is `ready`.
