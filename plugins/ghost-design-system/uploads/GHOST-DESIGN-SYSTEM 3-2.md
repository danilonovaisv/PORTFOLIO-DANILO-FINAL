# 🫥 Ghost Design System — Tokens + Global Rules

**Version:** 3.2 (AntigravityCTA Refinement — Loan & Behold Reference Audit) • **Date:** 2026-04-19

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

**Z-Index Layers:**

- `z-0`: **Background Base** (gradients/video base)
- `z-10`: **Glass/Overlay Utility** (soft masks)
- `z-20`: **Primary Content** (text/images)
- `z-30`: **Canvas/R3F FX** (3D between base and final overlays)
- `z-50`: **Final Overlays/Modals**
- `z-55`: **Header Promotion** (Header above 3D Scene)
- `z-[60]`: **Critical Mobile Text Layer**
- `z-65`: **Topmost Overlays/Debug**
- `z-cursor`: **Custom Cursor** (Topmost)

---

## 2. Motion Principles (The Breath)

**Core Tenet:** "Ghost easing" is heavy but elegant. It starts fast and brakes smoothly, like a spirit settling.

### 2.1 The "Ghost" Ease

- **CSS/Framer:** `[0.22, 1, 0.36, 1]`

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

**Ghost Protocol Motion Mandates:**

- **Offsets:** Vertical (`y`) offsets for UI content MUST NOT exceed `18px`.
- **Allowed (content/UI):** `opacity`, `blur`, `translateY` (max `18px`).
- **Forbidden (content/UI):** `scale` (e.g., `scaleY`, `scaleX`), `bounce`, `translateX` (`x`), `rotate`.
  - **Exception (decorative icons only):** `rotate` is permitted exclusively inside icon containers within interactive components (e.g. `ArrowUpRight` inside `<AntigravityCTA />`). The rotate must be scoped to the icon element, never to text or content blocks.
- **Easing:** All core animations must use `GSAP_GHOST_EASE` / Framer `GHOST_EASE`: `[0.22, 1, 0.36, 1]`.
- **Reduced Motion:** `useMotionGate` or `prefersReducedMotion` MUST be implemented in ALL animated components to disable parallax/lerp and replace reveals with a simple fade.
- **Z-Index (WebGL):** 3D Canvas (R3F) MUST use exactly `z-30`. No `z-999` allowed.

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
- **Default Landing CTA:** label `vamos trabalhar juntos` + href `/#contact` + color `blue`.
- **File location:** `src/components/ui/AntigravityCTA/`

**Anatomy:**
The component is a compound shape: a pill (text body) geometrically bonded to a circle (icon container) that overlaps the pill's right edge by 1px (`-mr-px`). They are visually one unit, behaviorally two.

**Sizing (Fixed Min-Widths per breakpoint):**

| Breakpoint | Pill min-width | Pill padding     | Circle size | Icon size |
| :--------- | :------------- | :--------------- | :---------- | :-------- |
| Mobile     | `181px`        | `px-8 py-3`      | `52×52px`   | `16px`    |
| Tablet     | `201px`        | `px-9 py-[18px]` | `60×60px`   | `18px`    |
| Desktop    | `241px`        | `px-11 py-5`     | `72×72px`   | `20px`    |

**Typography (pill label):**

- Font: Manrope, `font-weight: 500`
- Color: `#fcffff`
- `letter-spacing: -0.01em`
- `line-height: 1` (`leading-none`)
- Case: lowercase

**States:**

| State          | Pill bg            | Circle bg              | Circle offset | Icon rotate | Opacity |
| :------------- | :----------------- | :--------------------- | :------------ | :---------- | :------ |
| Idle           | `#0048ff`          | `#0048ff`              | `x: 0`        | `-45deg`    | `1.0`   |
| Hover          | `#0048ff` ← static | `#8705f2`              | `x: +8px`     | `0deg`      | `1.0`   |
| Active/Pressed | `#0048ff`          | `#8705f2`              | `x: +8px`     | `0deg`      | `0.85`  |
| Focus-visible  | `#0048ff`          | `#0048ff`              | `x: 0`        | `-45deg`    | `1.0`   |
| Reduced-motion | `#0048ff`          | `#8705f2` (color only) | none          | none        | `1.0`   |

**Focus-visible ring:**

- `outline: 2px solid #4fe6ff`
- `outline-offset: 4px`
- `outline-offset-color: #040013`

**Motion spec:**

```
Entry (GhostFadeUp):
  initial:    { opacity: 0, y: 18 }
  animate:    { opacity: 1, y: 0 }
  duration:   0.9s
  ease:       [0.22, 1, 0.36, 1]
  delay:      0.4s (default; override via prop entryDelay)

Hover — Circle:
  property:   x (translateX) + backgroundColor
  to:         x: 8px + #8705f2
  duration:   0.3s
  ease:       [0.22, 1, 0.36, 1]

Hover — Icon:
  property:   rotate
  from/to:    -45deg → 0deg
  duration:   0.3s
  ease:       [0.22, 1, 0.36, 1]

Active:
  property:   opacity
  to:         0.85
  ⛔ NEVER use scale on press
```

**Motion propagation pattern (idiomatic):**
Use `whileHover="hovered"` on the parent `motion.div`. Child circle and icon declare `variants.hovered` independently. This avoids imperative state and keeps the component declarative.

**Color prop:**

| Value    | Pill base | Circle hover |
| :------- | :-------- | :----------- |
| `blue`   | `#0048ff` | `#8705f2`    |
| `cyan`   | `#4fe6ff` | `#0048ff`    |
| `purple` | `#8705f2` | `#0048ff`    |

**Props interface:**

```ts
interface AntigravityCTAProps {
  label: string; // pill text
  href: string; // link destination
  color?: 'blue' | 'cyan' | 'purple'; // default: 'blue'
  size?: 'sm' | 'md' | 'lg'; // default: 'md'
  variant?: 'default' | 'compact'; // compact: landing pages
  entryDelay?: number; // default: 0.4 (seconds)
  className?: string;
  onClick?: () => void;
}
```

**Critical rules:**

- ⛔ Never build Tailwind color classes dynamically (`bg-[${color}]`). Use `style={{ backgroundColor }}` for runtime color values.
- ✅ `flex-shrink-0` mandatory on circle — prevents collapse on small viewports.
- ✅ `useReducedMotion()` must disable `translateX`, `rotate`. Color transition is allowed.
- ✅ Semantic element: render as `<Link>` (Next.js) or `<a>`, never `<button>` for navigation.
- ✅ `aria-label` required — matches the `label` prop value.

### 3.4 CTA Variants Quick Reference

| Component            | Shape         | Default usage                        | Key behavior                          |
| :------------------- | :------------ | :----------------------------------- | :------------------------------------ |
| `<AntigravityCTA/>`  | Pill + Circle | All primary page CTAs                | Circle shifts right + purple on hover |
| `<CompoundPillCTA/>` | Pill + Circle | Landing back-nav (hero footer, left) | `direction="back"` flips arrow left   |
| `.btn-icon-circle`   | Circle only   | Project cards, secondary actions     | Blue → Purple on hover                |

---

## 4. Global implementation Rules

1. **Mobile First:** Write logic for mobile first. Use `md:` and `lg:` overrides.
2. **No Magic Numbers:** Use Tailwind tokens. If you need `123px`, ask why.
3. **Performance:**
   - No animations running off-screen.
   - Use `WILL-CHANGE` sparingly.
   - R3F Canvas must define `dpr={[1, 2]}`.
   - Parallax e animações atreladas ao scroll via **ScrollTrigger** devem ser declarativas. Uso de `onUpdate` per-frame para CSSOM é **proibido** por impactar lagginess; mapeie o `yPercent` nativamente no GSAP para não ferir o Core Web Vitals (INP e TBT).
   - Otimizar o **LCP** utilizando preload programático de `posters` e/ou `videos` no root layout ou view do Hero (`fetchPriority="high"`).
4. **Acessibility:**
   - Contrast AA+ is mandatory.
   - `prefers-reduced-motion` must disable "Ghost" easing.
   - Interactive elements focus states must be visible.
   - **Elementos WebGL decorativos:** Componentes envolvendo `<Canvas>` da biblioteca R3F **DEVEM** incluir sempre o atributo `aria-hidden="true"` para retirar a carga inútil dos leitores de tela em elementos sem ação que compõem o cenário do Ghost System.
   - Componentes iterativos sem `<a>` ou `<button>` devem conter propriedades de navegação como `tabIndex={0}`, `onFocus` e `onBlur` equivalentes ao `onMouseEnter`/`onMouseLeave`.
5. **Mobile Video Caption Rule:**
   - On screens `<= 767px`, decorative or autoplay videos must omit `<track kind="captions">`.
   - Desktop and tablet may retain caption tracks when the media context demands it.

---

**Certified by Ghost Commander**
_System Integrity Verified._
