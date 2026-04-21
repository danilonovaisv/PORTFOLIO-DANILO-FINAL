# 🫥 Ghost Design System — Tokens + Global Rules

**Version:** 3.2 (Z-Layer Expansion) • **Date:** 2026-04-21

> This file is the **Single Source of Truth** for the Ghost System.
> It consolidates design tokens, motion principles, and architectural rules driven by the "Ghost" philosophy:
> _Presence without noise. Motion as breath. Design as an invisible guide._

---

## 1. Design Tokens (The Code)

### 1.1 Color Palette

**Philosophy:** Deep, void-like backgrounds (`Void Black`) pierced by electric, spectral light (`Brand Blue`, `Ghost Cyan`).

| Token                | Variable                | Value     | Usage                                                                   |
| :------------------- | :---------------------- | :-------- | :---------------------------------------------------------------------- |
| **Brand Primary**    | `--color-bluePrimary`   | `#0048ff` | Primary CTAs, key interactive elements, "Solid" state.                  |
| **Ghost Accent**     | `--color-blueAccent`    | `#4fe6ff` | Ethereal glows, secondary highlights, "Spectral" state.                 |
| **Pink Details**     | `--color-pinkDetails`   | `#f501d3` | Extra detail highlights, glitch effects.                                |
| **Void Black**       | `--background`          | `#040013` | The infinite background. Absolute distinct from "Black".                |
| **Deep Neutral**     | `--color-neutral`       | `#0b0d3a` | Gradients, deep cards, subtle surfaces.                                 |
| **Text Primary**     | `--color-text`          | `#fcffff` | Main content. High contrast but not harsh white.                        |
| **Text Secondary**   | `--color-textSecondary` | `#a1a3a3` | Metadata, captions, deactivated states.                                 |
| **Details (Purple)** | `--color-purpleDetails` | `#8705f2` | **Exception:** Allowed on Hover states and specific "glitch" anomalies. |
| **System Red**       | `--color-redAccent`     | `#E50914` | Errors, destructive actions, or high-alert system status.               |
| **Abyss Start**      | `--color-abyss-start`   | `#0c1445` | Atmospheric gradient top (hero + project hero abyss drift).             |
| **Abyss Mid**        | `--color-abyss-mid`     | `#08031f` | Atmospheric gradient midpoint. End stop resolves to `--color-background`. |

### 1.2 Typography

**Fonts:**

- **Primary:** `Manrope` Variable Font (UI, Body, Headings — wght 200–800, self-hosted)
- **Mono:** `PPSupplyMono` (Code, metadata, coordinates)

**Fluid Scale (Clamp):**

| Class                 | Desktop (lg)      | Mobile (sm)                          | Weight                   | Line Height |
| :-------------------- | :---------------- | :----------------------------------- | :----------------------- | :---------- |
| `.text-display`       | `4.5rem` (72px)   | `2.5rem` (40px)                      | ExtraBold (800)          | 1.1         |
| `.text-h1`            | `3.5rem` (56px)   | `2rem` (32px)                        | Bold (700)               | 1.1         |
| `.text-h2`            | `2.5rem` (40px)   | `1.5rem` (24px)                      | SemiBold (600)           | 1.15        |
| `.text-h3`            | `1.75rem` (28px)  | `1.25rem` (20px)                     | Medium (500)             | 1.2         |
| `.text-body-enhanced` | `1.25rem` (20px)  | `1.125rem` (18px)                    | Medium (500)             | 1.5         |
| `.text-body`          | `1.125rem` (18px) | `1.25rem` ~ `1.375rem` (20px ~ 22px) | Regular/Medium (400/500) | 1.4         |
| `.text-small`         | `0.875rem` (14px) | `0.875rem`                           | Regular (400)            | 1.4         |
| `.text-micro`         | `0.75rem` (12px)  | `0.75rem`                            | PPSupplyMono             | 1.4         |

**Mobile Readability Token (mandatory):**

- `--font-body-mobile: clamp(1.25rem, 4.6vw, 1.375rem)` (20px ~ 22px)
- Applied automatically to `.text-body` under `max-width: 767px`.

### 1.3 Spacing & Grid (The Rhythm)

**Grid System:**

- **Desktop:** 12 Columns. Max-width `1680px`. Gutter `32px`.
- **Tablet:** 8 Columns. Gutter `24px`.
- **Mobile:** 4 Columns. Gutter `16px`.

**Standard Spacing (Padding):**

- **Container:** `px-6` (Mobile) -> `px-12` (Tablet) -> `px-16` ~ `px-24` (Desktop).
- **Section Vertical:** `py-16` (Mobile) -> `py-24` (Desktop).

**Z-Index Layers (v3.2 — expanded to cover modal + mobile stack):**

| Token CSS var | Value | Usage |
| :--- | :---: | :--- |
| `--z-layer-base` | 0 | Background base (gradients, video base) |
| `--z-layer-glass` | 10 | Glass/overlay utility (soft masks) |
| `--z-layer-content` | 20 | Primary content (text, images) |
| `--z-layer-3d` | 30 | Canvas / R3F FX |
| `--z-layer-cta` | 40 | Floating CTAs |
| `--z-layer-overlay` | 50 | Inline overlays |
| `--z-layer-header` | 55 | Site header |
| `--z-layer-mobile-text` | 60 | Critical mobile text layer |
| `--z-layer-debug-low` | 65 | Dev-only inline debug |
| `--z-layer-lightbox` | 70 | Image lightbox |
| `--z-layer-mobile-header` | 80 | Fixed mobile bar |
| `--z-layer-mobile-pre` | 85 | Pre-menu curtain layers |
| `--z-layer-mobile-menu` | 90 | Fullscreen mobile menu |
| `--z-layer-modal-scrim` | 95 | Modal backdrop |
| `--z-layer-modal` | 100 | Modal surface |
| `--z-layer-modal-close` | 105 | Modal close button |
| `--z-layer-cursor` | 110 | Custom cursor (topmost) |
| `--z-layer-debug-top` | 9999 | Dev debugger only |

**Rule:** Never use raw `z-[nnn]`; always reference a token. Anything above 110 is development-only.

---

## 2. Motion Principles (The Breath)

**Core Tenet:** "Ghost easing" is heavy but elegant. It starts fast and brakes smoothly, like a spirit settling.

### 2.1 The "Ghost" Ease

The standard `GHOST_EASE` is the default for every UI/content reveal. Two
sanctioned variants exist for atmospheric surfaces — use them only through
their exported constants, never inline.

| Constant | Curve | When to use |
| :--- | :--- | :--- |
| `GHOST_EASE` | `[0.22, 1, 0.36, 1]` | Default — buttons, sections, cards, hovers, reveals. |
| `GHOST_EASE_SOFT` | `[0.25, 1, 0.5, 1]` | Atmospheric backgrounds, long-running belief/intro scenes, ghostly drift. Gentler brake than the standard ease. |
| `GHOST_EASE_HEAVY` | `[0.43, 0.13, 0.23, 0.96]` | Large spatial moves (hero camera, big translateX/Y). Heavier anticipation, still non-bouncy. |
| `GHOST_EASE_AMBIENT` | `[0.17, 0.55, 0.55, 1]` | Long atmospheric layers only — belief backgrounds, gradient drifts, manifesto scroll fades. Never on UI controls. |

- **Import:** `import { GHOST_EASE, GHOST_EASE_SOFT, GHOST_EASE_HEAVY, GHOST_EASE_AMBIENT } from '@/config/motion'`
- **Never** inline a raw cubic-bezier tuple in components — it breaks the single source of truth and defeats drift regression greps.

- **Duration:**
  - **Fast (UI):** `0.2s` (Buttons, Hover)
  - **Normal (Reveal):** `0.8s` (Sections, Cards)
  - **Slow (Atmosphere):** `1.5s+` (Backgrounds, Glows)

### 2.2 Standard Reveals

1. **GhostFadeUp:**
   - `opacity: 0 -> 1`
   - `y: 18px -> 0px` (hard max for content UI)
   - `duration: 0.8s`
   - `stagger: 0.1s` (for lists)

### 2.3 Allowed vs Forbidden Motion

- **Allowed (content/UI):** `opacity`, `blur`, `translateY` (max `18px`)
- **Forbidden (content/UI):** `scale`, `bounce`, `rotate`
- **Reduced Motion:** Disable parallax/lerp and replace reveals with simple fade.

### 2.4 Interaction Rules

- **Hovers:** Silence. No massive scaling. Subtle opacity change (0.7 -> 1) or glow intensity shift.

- **Scroll:** Use `lenis` for smooth inertia. Parallax should be subtle (< 15% shift).

---

## 3. Component Architecture

### 3.1 Base Components (Shadcn + Ghost)

- **Buttons:**
  - `default`: Solid Blue `#0048ff`. Sharp corners or slight radius (`rounded-md`).
  - `ghost`: Transparent with minimal hover glow.
  - `outline`: 1px Border `#4fe6ff` (Accent).

- **Cards:**
  - Background: `bg-white/5` (Glass) or `bg-[#0b0d3a]` (Deep Neutral).
  - Border: `border-white/10`.
  - Backdrop: `backdrop-blur-md`.

### 3.2 Feature Components

- **`<GhostText />`**: Text that blurs in.

- **`<GhostGlitch />`**: For specific "anomalies" or hover states.
- **`<StandardGrid />`**: The wrapper that enforces the 4/8/12 column layout.

### 3.3 CTA Components

#### Small CTA (`.btn-icon-circle`)

- **Structure**: 48px Circle (`w-12 h-12`).
- **Default**: Blue (`--color-bluePrimary`).
- **Hover**: Purple (`--color-purpleDetails`).
- **Icon**: `ArrowUpRight` (White).
- **Usage**: Project Cards, Secondary actions.

#### Landing Back CTA (`<CompoundPillCTA />`)

- **Usage:** Hero footer, left side, for contextual "voltar ao portfólio".
- **Variant:** `size="compact"` and `direction="back"` for landing pages.
- **Semantics:** Back variant renders `arrow-left` first, then text label.

#### Primary CTA (`<AntigravityCTA />`)

- **Mandate:** All primary page actions use `<AntigravityCTA />`.
- **Default Landing CTA:** label `vamos trabalhar juntos →` + href `/#contact` + color `#0048ff`.

- **Sizing (Fixed Min-Widths):**
  - **Mobile:** `181px` (`min-w-cta-mobile`)
  - **Tablet:** `201px` (`min-w-cta-tablet`)
  - **Desktop:** `241px` (`min-w-cta-desktop`)
- **Behavior (The "Ghost" Interaction):**
  - **Idle:** Pill `Blue 500` + Circle `Blue 500`.
  - **Hover:** Pill `Blue 500` (Static) + Circle `Purple` (`#8705f2`).
  - **Animation:** Icon rotates `-45deg` to `0deg`. Circle separates by `8px`.

---

## 4. Global implementation Rules

1. **Mobile First:** Write logic for mobile first. Use `md:` and `lg:` overrides.
2. **No Magic Numbers:** Use Tailwind tokens. If you need `123px`, ask why.
3. **Performance:**
   - No animations running off-screen.
   - Use `WILL-CHANGE` sparingly.
   - R3F Canvas must define `dpr={[1, 2]}`.
4. **Acessibility:**
   - Contrast AA+ is mandatory.
   - `prefers-reduced-motion` must disable "Ghost" easing.
   - Interactive elements focus states must be visible.

---

**Certified by Ghost Commander**
_System Integrity Verified._
