# Portfolio UI Kit — Ghost System

The interactive click-thru + componentized source for **portfoliodanilo.com**, expressed against the Ghost Design System tokens.

## Files

| File | Surface |
|---|---|
| `index.html` | Mounts the kit as a single-page mock of the live portfolio. Open this to see everything wired together. |
| `styles.css` | Kit-local styles (layout, hero aura, accordion stripes, bento grid, contact inversion). Loads `../../colors_and_type.css` first. |
| `Header.jsx` | Fluid-glass desktop header + staggered mobile drawer |
| `Hero.jsx` | Editorial hero with CSS "Ghost Aura" stand-in (WebGL not recreated) |
| `AntigravityCTA.jsx` | Fixed bottom-right primary CTA — pill + trailing circle that separates on hover |
| `IconCircleCTA.jsx` | 48px circle with `ArrowUpRight` — blue → purple on hover |
| `PortfolioShowcase.jsx` | Accordion stripes: Brand / Video / Web |
| `FeaturedProjects.jsx` | Bento grid of 5 project cards |
| `ContactSection.jsx` | Light inversion section — `#f0f0f0` background with dark text |
| `SiteFooter.jsx` | Solid Ghost Blue (`#0048ff`) footer |

## Ghost rules honoured

- **Motion:** all reveals use `cubic-bezier(0.22, 1, 0.36, 1)`, translateY capped at 18px, no scale/rotate on content.
- **Hover:** circle CTAs swap `bluePrimary → purpleDetails` + 28px purple glow. Antigravity CTA: main pill static, trailing circle separates 8px and shifts to purple.
- **Copy:** pt-BR, lowercase editorial voice. No emoji. Real Lucide-style SVGs inline.
- **Backgrounds:** flat Void Black or radial gradient. No photographic hero. Ghost Aura is a CSS radial-gradient stand-in as flagged in the top-level README.

## Flags

- WebGL ghost entity → CSS radial-gradient aura. Labelled *"Ghost Aura"* wherever it appears.
- Fluid-glass header refraction → `backdrop-filter: blur()` + hairline border. Visually similar, not physically accurate.
- Custom SocialIcons (Instagram / LinkedIn / X / Facebook) → inline SVG brand marks.
