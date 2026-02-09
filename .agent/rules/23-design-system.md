---
trigger: always_on
priority: high
match: "**/*.{css,tsx}"
---

# 23-design-system.md — The Ghost Aesthetic

## 🎨 Visual Identity

- **Primary Colors**: `#0048ff` (Deep Blue), `#040013` (Void Black), `#E50914` (Accent Red).
- **Forbidden**: NO VIOLET / PURPLE.
- **Typography**: Inter Tight (UI), Playfair Display (Headings), Geist Mono (Code).

## 🎭 Motion Principles

- **Ethereal**: Slow, smooth, "floaty" eased animations.
- **Surgical**: Fast, snappy interactions for UI clicks (0.2s).
- **Scroll**: Use `lenis` for smooth scrolling. Parallax must be subtle (< 15% shift).

## 💅 CSS Architecture

- **Tailwind 4**: Use tokens, not magic numbers.
- **Class Order**: Layout -> Box Model -> Typography -> Visual -> Interaction.
- **Z-Index**: Manage via `z-indices.ts` constant, never hardcode `z-[9999]`.
