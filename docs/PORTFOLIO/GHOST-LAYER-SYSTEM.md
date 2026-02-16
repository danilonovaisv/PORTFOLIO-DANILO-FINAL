# Ghost System Layering & Z-Index

> To prevent recurrent regressions where the Ghost element covers interactions or disappears behind the text.

## Core Principle

The **Ghost WebGL Layer** is positioned **ABOVE** the text layer to create an immersive "fog/aura" effect over the content, but it must remaining transparent to pointer events so the user can interact with the CTA and text selection.

## Z-Index Hierarchy

| Layer Component | Z-Index | Tailwind | Pointer Events | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Loader / Overlay** | `z-50+` | `z-[50]` | `auto` | Preloader, Modals, Menus. |
| **Ghost WebGL** | `z-40` | `z-40` | **`none`** | The 3D scene. Must allow clicks to pass through to `z-30`. |
| **Text / Content** | `z-30` | `z-30` | `none`* | Container is `none`, children (buttons/text) are `auto`. |
| **Background** | `z-0` | `z-0` | `none` | Static gradients, video, images. |

## Implementation Trace (`HomeHero.tsx`)

```tsx
// 1. TEXT LAYER (Interactive elements)
<div className="absolute inset-0 z-30 pointer-events-none">
  <div className="pointer-events-auto">
    <HeroCopy />
    <HeroCTA />
  </div>
</div>

// 2. GHOST LAYER (Visual only - Fog Effect)
<div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
  <GhostSceneWrapper />
</div>
```

## Critical Rules to Maintain

1. **Never remove `pointer-events-none` from the Ghost Layer (`z-40`).**
   - If removed, the user cannot click "Vamos trabalhar juntos".
2. **Never lower Ghost to `z-10` or `z-20` without design approval.**
   - The design intention is for the Ghost's glow/particles to slightly obscure the text, creating depth.
3. **Menu/Header must be `z-50` or higher.**
   - Ensure the navigation is never covered by the Ghost.

---

*Last Updated: 2026-02-15 (Fixing Layer Regression)*
