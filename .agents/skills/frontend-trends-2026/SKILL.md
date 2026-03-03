---
name: frontend-trends-2026
description: Collection of 2026 Frontend Design Formulas (Liquid Glass, Bento, Neo-Brutalism, Eco-Dark).
category: ui-ux
version: 1.0.0
layer: specialized-skill
---

# Frontend Design Formulas (2026)

> **Purpose**: Provide production-ready, trend-setting UI patterns for 2026 web applications.
> **Tech Stack**: React 19+, Tailwind CSS v4, CSS Modules (optional), Shadcn/ui.

## 🎨 1. Aesthetic Formulas (Giao diện)

### Formula A: Liquid Glass (Kính Lỏng)

_Use for: Modals, Cards, Sticky Headers._

- **Core**: `backdrop-filter: blur(16px) saturate(180%)`
- **Surface**: `bg-white/10` (Light) or `bg-black/20` (Dark)
- **Border**: `border border-white/20` (Thin, subtle)
- **Shadow**: `shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]` (Soft colored shadow)
- **Noise**: Add a subtle noise texture overlay `opacity-5`.

### Formula B: Neo-Brutalism 2.0 (Thô mộc Hiện đại)

_Use for: SaaS Dashboards, Developer Tools, Linear-style apps._

- **Contrast**: High (Black & White base + 1 Neon Accent).
- **Border**: `border-2 border-slate-900` (Sharp, bold).
- **Shadow**: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` (Hard offset shadow).
- **Typography**: Inter (Tight tracking) or Space Mono.
- **Radius**: `rounded-md` or `rounded-none` (No pills).

### Formula C: Eco-Dark Mode (Tiết kiệm năng lượng)

_Use for: Mobile Apps, Constantly-on screens._

- **Bg Base**: `#000000` (Pure Black for OLED) or `#050505`.
- **Primary Text**: `text-slate-200` (Avoid pure white `#FFF` -> Eye strain).
- **Accent**: Use OKLCH colors for vibrancy without heavy brightness.

## 📐 2. Layout Formulas (Bố cục)

### Formula D: Bento Grid (Hộp Cơm)

_Use for: Feature Showcases, Analytics, Portfolio._

- **CSS Grid**: `grid-cols-1 md:grid-cols-3 gap-4`.
- **Spans**: Use `col-span-2` or `row-span-2` to create hierarchy.
- **Content**: Visual-heavy (Image/Chart) + Minimal Text.
- **Hover**: Subtle scale `hover:scale-[1.02]` + Border glow.

### Formula E: Container Queries (Card thông minh)

_Use for: Reusable Components in unknown layouts._

- **Parent**: `container-type: inline-size`.
- **Child CSS**: `@container (min-width: 400px) { ... }`.
- **Benefit**: Component adapts to _slot_ size, not screen size.

## ✨ 3. Interaction Formulas (Tương tác)

### Formula F: Scroll-Driven Animation

_Use for: Landing Pages, Storytelling._

- **Tech**: Native CSS `animation-timeline: scroll()`.
- **Effect**: Elements fade in, slide up, or scale based on scroll position.
- **Perf**: Runs on Compositor Thread (No JS Jank).

### Formula G: Spring Physics (Vật lý)

_Use for: Popovers, Drawers, Toggles._

- **Feel**: Bouncy, snappy, organic.
- **Libraries**: `framer-motion` (presets like `type: "spring", stiffness: 300, damping: 20`).
- **CSS Alternative**: `transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275)`.

## 📜 Agent Instructions for Usage

1.  **Identify Context**: Choose Formula based on User Request (e.g., "Modern Dashboard" -> Neo-Brutalism + Bento).
2.  **Apply Tokens**: Use Tailwind classes listed in formulas.
3.  **Code Snippets**: Check `formulas/` directory for ready-to-use React components. Do NOT reinvent wheels.

---

**Example Request:**

> "Make a modern landing page for my AI tool."
> **Agent Action:**
> Apply **Formula A (Liquid Glass)** for Header, **Formula D (Bento Grid)** for Features, and **Formula F** for animations.
