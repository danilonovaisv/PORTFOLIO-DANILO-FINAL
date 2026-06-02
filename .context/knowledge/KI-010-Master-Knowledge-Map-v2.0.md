# KI-010: Master Knowledge Map v2.0 & Ghost System Blueprints

**Date:** 2026-06-02
**Context:** Master Alignment Phase 2
**Decision:** Consolidate central blueprints, design system tokens, WebGL constraints, WCAG guidelines, and asset delivery contracts into a single source of truth.

---

## 🧠 Core Philosophy

The portfolio is designed as an "Awwwards-level" immersive experience. It follows the **Ghost Aesthetic**: "Presence without noise." High performance (FPS > 50), editorial minimalism, rigid grid compliance, and strict accessibility are requirements, not features.

---

## 🎨 1. Ghost Tokens & Design System

### 1.1. Color Palette

- **Void Background:** `#040013` (Void Black)
- **Primary Color:** `#0048ff` (Ghost Deep Blue)
- **Accent Color:** `#4fe6ff` (Ghost Cyan Accent)
- **Active Accent:** `#0037c2` / `#2e85f2` (Interaction Active / Hover)
- **No Purple Policy:** Violet/purple shades are forbidden on main surfaces. Exception allowed only for specific micro-glitch highlights or hover states.

### 1.2. Motion & Easing Curve

- **Ghost Signature Easing:** `cubic-bezier(0.22, 1, 0.36, 1)`
- **Duration Tokens:**
  - Fast (UI click / hover): `0.2s`
  - Standard Transition: `0.3s`
  - Normal Animation (Menus, overlays): `0.8s`
  - Long Transition (Text in, Canvas fade): `1.2s`

### 1.3. Stacking Context (Layer Governance)

All `z-index` assignments must utilize CSS variables defined in [globals.css](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/globals.css) to prevent layer leakage:

```css
--z-layer-base: 0; /* Video bases, background gradients */
--z-layer-glass: 10; /* Soft masks, blur overlays */
--z-layer-content: 20; /* Editorial copy, images, standard elements */
--z-layer-3d: 30; /* WebGL/R3F Canvas */
--z-layer-cta: 40; /* Interactive buttons and call to actions */
--z-layer-overlay: 50; /* Localized inline overlays */
--z-layer-header: 55; /* Global site header navigation */
--z-layer-mobile-menu: 90; /* Fullscreen mobile menu panel */
--z-layer-modal: 100; /* Project details modal */
--z-layer-preloader: 1000; /* Initial preloader curtain */
```

---

## 🚀 2. WebGL & 3D Rendering Constraints

To maintain a frame rate above 50FPS across all devices, the following rules must be enforced:

### 2.1. Zero-Allocation Render Loop

- Calling `new THREE.Vector3()` or `new THREE.Matrix4()` inside the `useFrame` or animation loops is strictly prohibited. Objects must be declared once outside the loop and modified by reference.

### 2.2. WebGL Renderer Configurations

- **Color Space:** `THREE.SRGBColorSpace`
- **Tone Mapping:** `THREE.ACESFilmicToneMapping`
- **DPR Limit:** Cap Device Pixel Ratio at a maximum of `1.5` on Retina displays to reduce fragment shader costs.

### 2.3. Adaptive Quality Engine (`usePerformanceAdaptive`)

- Measures frame rate during the first 3 seconds of the session.
- Automatically downgrades the quality if FPS < 30, or if hardware concurrency <= 4 or device memory < 4GB is detected:
  - **High:** 50 particles, full post-processing (Bloom & analog decay).
  - **Medium:** 25 particles, standard post-processing, DPR capped at 1.25.
  - **Low (Mobile / Low-End):** 10 particles, post-processing minimized, DPR = 1.0.

### 2.4. Teardown & Resource Disposal

- On component unmounting, all materials, geometries, and textures must be traversed and explicitly disposed:
  ```typescript
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose());
      } else {
        object.material?.dispose();
      }
    }
  });
  ```

---

## ♿ 3. Accessibility & Usability (WCAG Compliance)

### 3.1. Motion Prefers reduced motion

- Wrap animations in `useMotionGate` or `useReducedMotion`. If the system detects `prefers-reduced-motion: reduce`, all high-frequency WebGL rendering, parallax scroll effects, and text reveals must degrade gracefully into static fallbacks instantly.

### 3.2. Keyboard Focus Trap & Restoration

- When the project details modal opens, the focus must be trapped within the modal scope.
- On close, focus must be restored to the card that triggered the action. If that card is no longer in the DOM (e.g., if active filters changed), focus must return to the parent grid container `#portfolio-gallery` or `#main-content` to avoid keyboard trap failure.

### 3.3. Semantic ARIA Carousels & Indicators

- Custom slideshows and manifestos (such as [ManifestoScrollSection.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/ManifestoScrollSection.tsx)) must declare a wrapper with `role="tablist"` and dot buttons with `role="tab"`, mapping `aria-selected` and `aria-controls` to ensure assistive reader compatibility.

---

## 📦 4. Asset Pipeline & Supabase CDN Delivery

### 4.1. CDN Resolution Contract

- All media assets (videos, WebGL `.glb` files, fonts) must be served from the Supabase Storage CDN.
- Resolution must utilize `getAssetUrl` which handles relative fallbacks and enforces absolute Supabase links dynamically.

### 4.2. Asset Semicolon Synchronization

- Assets are defined in `assets.json` (Root).
- Running `pnpm assets:sync` outputs the client-side configuration `src/config/site-assets.json`. Files should never be hardcoded as relative links if they exceed 500KB.
- Framework posters for `<video>` components should fall back to direct file pointers or `undefined` to allow native HTML5 video player optimization, preventing broken 404 image links during initial rendering.
