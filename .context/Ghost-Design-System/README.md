# Ghost Design System — Danilo Novais Portfolio

**Version:** 3.2 · **Last updated:** May 2026  
**Site:** [portfoliodanilo.com](https://portfoliodanilo.com)  
**Codebase:** [github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL](https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL) (private — requires access)

---

## What is this?

This is the single-source design system for the **Portfolio Danilo** — a premium institutional site for **Danilo Novais**, Senior Creative Director. The design philosophy is called **"Ghost Design"**: an interface that becomes invisible until interaction activates it, using light and movement as primary language.

> _"Presence without noise. Motion as breath. Design as an invisible guide."_

The site serves as a hub for three domains of work:
- **Brand & Campaigns** — identity, strategy, visual communication
- **Videos & Motions** — motion design, film, animation
- **Web Campaigns, Websites & Tech** — UX/UI, web design, AI-assisted creation

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Language:** Brazilian Portuguese throughout (PT-BR). Labels, navigation, CTAs — all in Portuguese.
- **Register:** Confident, poetic, editorial. Not corporate, not casual. Like a manifesto.
- **Person:** First person ("Eu"), direct address ("você"). Intimate and assured.
- **Casing:** Sentence case for headlines. ALL-CAPS used sparingly for micro-labels, tags, metadata.
- **Punctuation:** Ellipsis avoided. Em-dashes used intentionally. Periods on full sentences, not fragments.
- **Emoji:** Never used. Zero emoji in the interface.
- **Numbers:** Shown numerically ("10 anos", "12 marcas"). No spelled-out numbers.

### Key Phrases & Copy Patterns
| Role | Example |
|---|---|
| Hero manifesto | _"Você não vê o design. Mas ele vê você."_ |
| Tag/metadata | `[BRAND AWARENESS]` · `[what we love working on]` |
| Section titles | `portfólio showcase` · `contato` · `marcas com as quais já trabalhei` |
| CTA text | `step inside` · `vamos trabalhar juntos →` · `fale comigo` |
| About tagline | _"Do insight ao impacto. Mesmo quando você não percebe."_ |
| Closing statement | _"Hoje sou Diretor de Criação, com mais de 10 anos de estrada."_ |

### Section Copy Pattern
Sections open with a short declarative phrase, followed by a subtext that deepens it. CTAs are directional (arrow icons, `→`). Never padded with filler.

---

## VISUAL FOUNDATIONS

### Color System
| Token | Variable | Hex | Role |
|---|---|---|---|
| **Void Black** | `--color-background` | `#040013` | Infinite background |
| **Brand Blue** | `--color-bluePrimary` | `#0048ff` | CTAs, active states, footer bg |
| **Ghost Cyan** | `--color-blueAccent` | `#4fe6ff` | Glows, secondary highlights, spectral |
| **Purple Details** | `--color-purpleDetails` | `#8705f2` | Hover states, glitch effects |
| **Pink Details** | `--color-pinkDetails` | `#f501d3` | Rare accent, anomalies |
| **Deep Neutral** | `--color-neutral` | `#0b0d3a` | Card surfaces, gradient stops |
| **Text Primary** | `--color-text` | `#fcffff` | High-contrast near-white |
| **Text Secondary** | `--color-textSecondary` | `#a1a3a3` | Metadata, captions |
| **Abyss Start** | `--color-abyss-start` | `#0c1445` | Atmospheric gradient top |
| **Abyss Mid** | `--color-abyss-mid` | `#08031f` | Atmospheric gradient midpoint |
| **System Red** | `--color-redAccent` | `#e50914` | Errors, destructive |

**Color vibe:** Deep cosmic — near-void black pierced by electric blue and spectral cyan. Purple is reserved for hover transformation. Never warm colors unless it's project media.

### Typography
- **Primary:** `Manrope` Variable (wght 200–800), self-hosted at `fonts/`. Used for ALL UI: headings, body, nav, CTAs.
- **Mono:** `PPSupplyMono` (loaded via CDN fallback), used for tags, metadata, coordinates, micro-labels.
- **Deprecated:** `Outfit` — no longer used.
- **Kerning:** Tight negative tracking on large display text (`-0.07em` at hero scale).
- **Line height:** Compressed for display (1.0–1.1), open for body (1.4–1.5).

#### Fluid Scale
| Class | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| `.text-display` | 72px (clamp) | 40px | 800 ExtraBold | 1.1 |
| `.text-h1` | 56px | 32px | 700 Bold | 1.1 |
| `.text-h2` | 40px | 24px | 600 SemiBold | 1.15 |
| `.text-h3` | 28px | 20px | 500 Medium | 1.2 |
| `.text-body-enhanced` | 20px | 18px | 500 Medium | 1.5 |
| `.text-body` | 18px | 20–22px | 400/500 | 1.4–1.5 |
| `.text-small` | 14px | 14px | 400 | 1.4 |
| `.text-micro` | 12px mono | 12px | — | 1.4 |

### Backgrounds
- Always `#040013` (Void Black) base. Never pure `#000000`.
- Atmospheric radial gradients (blue/purple glow emanating from center).
- Abyss drift: `#0c1445` → `#08031f` → `#040013` for hero/section gradients.
- No textures, no grain, no patterns. Pure depth and light.
- Full-bleed media (video/image) used in hero and project cards. No decorative borders.

### Imagery
- **Tone:** Dark, saturated, high-contrast. Often blue-violet tinted or full-color brand photos.
- **Usage:** Full-bleed in cards. Black letterbox when media loads. No border/shadow around images — they dissolve into the void.
- Project media shows actual campaign work (Nestlé, Swift, Magic, Hellmann's, etc.).

### Animation & Motion
- **Ghost Ease:** `cubic-bezier(0.22, 1, 0.36, 1)` — fast start, heavy brake. Default for all UI.
- **Ghost Ease Soft:** `[0.25, 1, 0.5, 1]` — for atmospheric backgrounds.
- **Ghost Ease Heavy:** `[0.43, 0.13, 0.23, 0.96]` — large spatial moves.
- **Ghost Ease Ambient:** `[0.17, 0.55, 0.55, 1]` — long atmospheric layers only.
- **Durations:** Fast UI = 0.2s; Normal reveal = 0.8s; Atmospheric = 1.5s+.
- **GhostFadeUp:** opacity 0→1 + y 18px→0 + blur 10px→0, 0.8s, stagger 0.1s.
- **FORBIDDEN:** bounce, rotate on content, scale > subtle, translateY > 18px on UI.
- **Scroll:** Lenis smooth scroll. Parallax < 15% shift.
- **Reduced-motion:** Disables all Y offsets, uses only cross-fade.

### Hover States
- CTA circle: Blue → Purple (`#8705f2`) + purple glow.
- Nav items: opacity 0.7→1 + underline scale reveal.
- Project cards: title color shift to `#0048ff`, arrow circle Blue→Purple + translateX 5px.
- General: No scale, no bounce. Subtle opacity or glow intensity shift only.

### Cards
- Background: `bg-white/5` (glass) or `#0b0d3a` (Deep Neutral).
- Border: `1px solid rgba(255,255,255,0.1)`.
- Backdrop: `backdrop-blur-md`.
- Radius: `rounded-md` (≈10px) on cards, `rounded-full` on pills/buttons.
- No drop-shadow on dark cards — they sit in void.

### Layout
- **Max-width:** 1680px, centered.
- **Grid:** 12 col desktop / 8 col tablet / 4 col mobile.
- **Gutters:** 32px desktop / 24px tablet / 16px mobile.
- **Section padding:** `py-24` desktop / `py-16` mobile.
- **Container:** `px-16–24` desktop / `px-12` tablet / `px-6` mobile.
- Asymmetric bento grids for project showcases. No symmetric two-column layouts.

### Transparency & Blur
- Header: `backdrop-blur-md` + `bg-[#040013]/40` — Fluid Glass nav pill.
- Cards: `backdrop-blur-md` used on glass surface cards.
- Blur used sparingly on content reveals (text blur-in).

### Corner Radii
- Buttons/pills: `rounded-full`.
- Cards: `rounded-md` (10px).
- Nothing more extreme.

### Borders
- `border-white/10` — near-invisible, defines surfaces without weight.
- Never colored borders as decoration.

### Icons
See ICONOGRAPHY section below.

---

## ICONOGRAPHY

### Approach
- **Icon system:** Lucide React (`lucide-react`) — stroke-based, monochromatic, 2px stroke weight.
- **Style:** Line icons only. No filled icons. No emoji. No unicode decorative chars.
- **Color:** Always white, `--color-text`, or `--color-bluePrimary`. Never colored icons as decoration.
- **Size:** 16px (small/nav), 20px (standard), 24–28px (CTA circles), 32px+ (hero/feature).
- **Key icons used:** `ArrowUpRight` (CTAs, project cards), `Instagram`, `Linkedin`, `Twitter` (social footer), standard form icons.
- **Custom SVG:** Logos only — LogoDark.svg, LogoLight.svg, favicon_dark.svg, favicon_light.svg. No hand-drawn decorative SVGs.
- **Social icons:** Custom thin-stroke SVG components in `src/components/shared/icons/SocialIcons.tsx`.

### Assets Available
| File | Usage |
|---|---|
| `assets/LogoDark.svg` | Header logo on dark bg |
| `assets/LogoLight.svg` | Header logo on light bg |
| `assets/favicon_dark.svg` | Browser favicon (dark) |
| `assets/favicon_light.svg` | Browser favicon (light) |

---

## FILE INDEX

```
README.md                         — This file (design system documentation)
SKILL.md                          — Agent skill manifest
colors_and_type.css               — All CSS vars: colors, type, spacing, z-index, motion
fonts/
  Manrope-Regular.ttf             — Primary font, 400
  Manrope-Medium.ttf              — Primary font, 500
  Manrope-Light.ttf               — Primary font, 300
  Manrope-Bold.ttf                — Primary font, 700
  Manrope-ExtraBold.ttf           — Primary font, 800
assets/
  LogoDark.svg                    — Logo for dark backgrounds
  LogoLight.svg                   — Logo for light backgrounds
  favicon_dark.svg                — Favicon (dark)
  favicon_light.svg               — Favicon (light)
preview/
  colors-brand.html               — Brand color palette swatches
  colors-semantic.html            — Semantic/state colors
  colors-gradients.html           — Gradient tokens
  type-scale.html                 — Full typography fluid scale
  type-specimens.html             — Heading specimens
  type-mono.html                  — Mono / micro type
  spacing-tokens.html             — Spacing, grid, z-index tokens
  motion-tokens.html              — Easing curves + durations
  components-buttons.html         — Button variants (AntigravityCTA + icon circle)
  components-cards.html           — Project card anatomy
  components-nav.html             — Header nav (fluid glass pill)
  components-footer.html          — Footer component
  components-badges.html          — Tags, badges, pills
  brand-logo.html                 — Logo usage guide
ui_kits/
  portfolio/
    README.md                     — UI kit documentation
    index.html                    — Interactive click-thru prototype
    Header.jsx                    — Fluid glass header component
    Hero.jsx                      — Hero manifesto section
    ProjectsGrid.jsx              — Featured projects bento grid
    PortfolioShowcase.jsx         — Portfolio category showcase
    AboutPage.jsx                 — About page sections
    Footer.jsx                    — Blue footer component
    Shared.jsx                    — Shared tokens, CTAs, badges
```

---

## Stack Reference
- **Framework:** Next.js 16 App Router + TypeScript
- **Styling:** Tailwind CSS 4 (theme vars in `globals.css`)
- **Animation:** Framer Motion + Lenis smooth scroll
- **3D:** React Three Fiber + Three.js (ghost character, header glass)
- **Data:** Supabase (storage + database for portfolio projects)
- **Icons:** Lucide React
