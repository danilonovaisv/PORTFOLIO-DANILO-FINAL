---
description: Header Specification and Implementation Guide
---

# Workflow: Header (SiteHeader)

This workflow defines the standard behavior and styling for the global website header.

## Visual Specification
- **Position**: Fixed at top (`fixed top-0 left-0 right-0 z-50`).
- **Background**: Solid White (`bg-white`) initially. On scroll > 40px, it may optionally add a slight blur or shadow, but the base color remains white to support the Dark Logo.
- **Logo**: Uses `ASSETS.logoDark` (Black/Dark logo) because the background is White.
- **Typography**: `Inter` or similar sans-serif. Size `text-sm`.
- **Colors**:
  - Text: `text-gray-700`
  - Hover/Active: `text-[#0057FF]` (Electric Blue)
  - Border: Subtle bottom border `border-gray-100`

## Dimensions
- **Max Width**: `max-w-6xl` centered.
- **Padding**:
  - Initial: `py-4 px-4`
  - Condensed (Scroll): `py-2 px-4`
- **Navigation Spacing**: `gap-6` between links.

## Interactions
- **Hover**: Link text turns blue, and a blue underline animate in (scaleX 0 -> 1).
- **Mobile Menu**: Fullscreen overlay with staggering animation.
- **Scroll Behavior**:
  - Starts with `bg-white` (Solid).
  - Smoothly reduces vertical padding (`paddingTop`, `paddingBottom`) via Framer Motion `useTransform`.

## Content
- **Left**: Logo (Click -> `/`).
- **Right**: Desktop Navigation (Home, Sobre, Portfolio Showcase, Contato).
- **Mobile**: Hamburger Menu (Right).

## Non-Negotiables
- The header must always be visible.
- The logo must be legible against the white background.
- Navigation links must be semantic HTML (`<nav>`, `<ul>`, `<li>`, `<a>`).
