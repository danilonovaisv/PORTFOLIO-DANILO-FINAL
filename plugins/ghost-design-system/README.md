# 👻 Ghost Design System

**Brand:** Ghost Design / Danilo Novais Portfolio ("Ghost Era")
**Tagline:** *"Você não vê o design. Mas ele vê você."* ("You don't see design. But it sees you.")
**Philosophy:** *Presence without noise. Motion as breath. Design as an invisible guide.*

Ghost is a portfolio-grade design system for an **experimental-premium** creative portfolio — deep void backgrounds, spectral electric-blue light, editorial minimalism, and atmospheric WebGL. This folder is the extracted, browsable version of that system for use in prototypes, mockups, decks, and other production-adjacent work.

---

## Sources

All context distilled here was read from:

- **`uploads/GHOST-DESIGN-SYSTEM 3.md`** — the canonical Ghost System v3.1 token + motion spec authored by the team.
- **GitHub repo** `danilonovaisv/PORTFOLIO-DANILO-FINAL` — Next.js 16 / R3F / Supabase / Firebase production portfolio. Key files read:
  - `src/app/globals.css` — token definitions (`@theme`), utility classes
  - `src/styles/fonts.css` — Manrope variable + PPSupplyMono
  - `tailwind.config.ts` — Tailwind token mappings
  - `src/components/ui/*` — `AntigravityCTA`, `CompoundPillCTA`, `PrimaryButton`, `GhostText`, button.tsx
  - `src/components/home/hero/*` — HomeHero, HeroCopy, HeroCTA
  - `src/components/home/{portfolio-showcase,featured-projects,contact}/*`
  - `src/components/layout/{header,SiteFooter}.tsx`
  - `CONTEXT.md`, `CLAUDE.md`, `README.md`
- **Live site:** https://portfoliodanilo.com

> Nothing was copied from screenshots — all visual decisions trace back to the source CSS/JSX.

---

## Product represented

A single product: **portfoliodanilo.com** — a Portuguese-language (pt-BR) institutional portfolio for Creative Director Danilo Novais. One UI kit (`ui_kits/portfolio/`) covers it, with the surfaces:

1. **Header** (desktop fluid-glass / mobile staggered menu)
2. **Hero** (WebGL ghost entity + editorial copy + Antigravity CTA)
3. **Portfolio Showcase** (accordion stripes — Brand / Video / Web)
4. **Featured Projects** (bento grid of cards)
5. **Contact** (light inversion section)
6. **Footer** (solid Ghost Blue)

---

## Index / Manifest

```
/
├── README.md                    ← you are here
├── SKILL.md                     ← Agent Skills-compatible entry point
├── colors_and_type.css          ← CSS vars + semantic utility classes
├── fonts/                       ← Manrope (self-hosted); PPSupplyMono (CDN)
├── assets/                      ← Logos, ghost glyph, sample gradients
├── preview/                     ← Small HTML cards shown in Design System tab
└── ui_kits/
    └── portfolio/
        ├── README.md
        ├── index.html           ← interactive Portfolio click-thru
        ├── Header.jsx
        ├── Hero.jsx
        ├── AntigravityCTA.jsx
        ├── IconCircleCTA.jsx
        ├── PortfolioShowcase.jsx
        ├── FeaturedProjects.jsx
        ├── ContactSection.jsx
        └── SiteFooter.jsx
```

---

## CONTENT FUNDAMENTALS

### Language & tone

- **Primary language: Portuguese (Brazilian).** UI labels and headings in pt-BR (`portfólio showcase`, `vamos trabalhar juntos`, `voltar ao portfólio`, `Contato`). Occasional English accents on CTAs and technical terms (`let's build something great`, `WebGL`, `R3F`). If producing English artifacts, keep the lowercased editorial voice.
- **Voice:** editorial, quiet, matter-of-fact. First-person singular *when speaking as Danilo*; second-person ("você") when addressing the viewer. Never "we."
- **Tone words:** spectral, atmospheric, disciplined, editorial, restrained. Never cheerful, never salesy.

### Casing

- **Lowercase dominates CTAs and small UI:** `vamos trabalhar juntos →`, `let's build something great`, `voltar ao portfólio`. Sentence case or lowercase for body.
- **Section headlines often mix weights and styles for rhythm** — e.g. `portfólio showcase` renders `portfólio` in **italic light blue** and `showcase` in **bold white**. Two-tone headlines are a signature move.
- **UPPERCASE** is used sparingly and *tightly tracked* (`letter-spacing: 0.2em`–`0.25em`) — footer nav, hero editorial tag, monospace micro-labels only.
- **Headlines may be tracked tight** (`tracking-tighter` / `-0.04em`) on display-weight text.

### Copy examples (lifted from the repo)

- Hero tagline: *"Você não vê o design. Mas ele vê você."*
- Hero CTA: `vamos trabalhar juntos →`
- Generic build CTA: `let's build something great`
- Back CTA (landing pages): `voltar ao portfólio`
- Meta description pattern: "Portfólio de Danilo Novais — branding, campanhas, vídeo, motion e soluções digitais que conectam design, movimento e tecnologia..."
- Nav items: `Home · Sobre · Portfólio · Contato`
- Category labels: `Brand & Campaigns`, `Videos & Motions`, `Websites & Tech`

### Punctuation & glyphs

- Em-dash for editorial pauses. Middle-dot `•` for metadata separators (`CATEGORY • CLIENT • YEAR`).
- Arrows are **real Lucide icons** (`ArrowUpRight`, `ArrowLeft`), not the `→` character — except in CTA copy where `→` appears inline.
- **No emoji** in product UI. (Markdown docs in the source repo use 🫥 ✦ — those are doc-chrome, not product chrome.)

---

## VISUAL FOUNDATIONS

### Colors

| Token | Hex | Role |
|---|---|---|
| `--color-bluePrimary` | `#0048ff` | Brand primary, CTAs, footer, "solid" state |
| `--color-blueAccent` | `#4fe6ff` | Spectral glow, secondary highlight, borders |
| `--color-purpleDetails` | `#8705f2` | **Hover state** for circle CTAs + Antigravity orb |
| `--color-pinkDetails` | `#f501d3` | Detail flashes, glitch anomalies |
| `--color-background` | `#040013` | Void Black — THE background (not `#000`) |
| `--color-neutral` | `#0b0d3a` | Deep-card surface, gradient anchor |
| `--color-text` | `#fcffff` | Primary text (softly off-white) |
| `--color-textSecondary` | `#a1a3a3` | Metadata, captions, disabled |
| `--color-redAccent` | `#e50914` | Errors only |

**Philosophy:** deep void pierced by electric light. Keep surfaces mostly `#040013`; use Ghost Blue as the single punctuating color. Cyan (`#4fe6ff`) is reserved for atmospheric glow — never for flat fills. Purple is a **state**, not a color choice — it appears *only* on hover.

### Type

- **Primary:** `Manrope` variable (wght 200–800). Used for everything — display, body, UI. No secondary serif.
- **Mono:** `PPSupplyMono` — used for metadata micro-labels (`CATEGORY`), coordinates, technical captions. Always tight uppercase tracking.
- **Scale is fluid** via `clamp()` — see `.text-display` → `.text-micro` in `colors_and_type.css`.
- **Hero type is oversized & tight** — `clamp(3rem, 11vw, 8rem)` with `letter-spacing: -0.04em`, `line-height: 0.95`.

### Spacing & grid

- **Desktop:** 12 columns, max-width `1680px`, gutter `32px`, outer padding `4rem` (64px).
- **Tablet:** 8 columns, gutter `24px`, padding `3rem` (48px).
- **Mobile:** 4 columns, gutter `16px`, padding `1.5rem` (24px).
- Section vertical rhythm: `py-16` (mobile) → `py-24`/`py-32` (desktop).
- Grid class name to comply with: `.std-grid`.

### Backgrounds

- Always **flat void** (`#040013`) or deep radial gradient `radial-gradient(circle at 50% 50%, #0a0029 0%, #040013 70%)`.
- **WebGL ghost entity** lives *above* the text (z-30), with text masked by a radial gradient that tracks the ghost's screen position — the "ghost reveals the copy" effect.
- Mobile: no WebGL. Falls back to the radial gradient alone.
- **No** stock imagery. **No** full-bleed photographic hero. **No** repeating pattern textures. **No** hand-drawn illustration. Atmospheric WebGL + flat color only.

### Animation

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (the "Ghost ease"). Fast start, soft brake.
- **Durations:** `0.2s` (UI/hover) · `0.8s` (reveals) · `1.5s+` (atmosphere).
- **Standard reveal:** `GhostFadeUp` — `opacity 0→1`, `y: 18px→0`, blur `10px→0`, 0.8s, stagger `0.1s`.
- **Allowed:** `opacity`, `blur`, `translateY ≤ 18px`.
- **Forbidden:** `scale`, `rotate`, `translateX`, `bounce`, any spring-y overshoot. No scaling on hover.
- `prefers-reduced-motion` is enforced globally — all animations degrade to instant fades.

### Hover states

- **Silence over drama.** No large scale, no lift > 1px.
- Circle CTAs: `bg: bluePrimary → purpleDetails` + soft purple glow (`box-shadow: 0 0 28px rgba(135,5,242,0.5)`).
- Antigravity CTA: main pill stays blue, trailing circle shifts to purple and separates by 3–8px horizontally; arrow does not rotate.
- Nav links: opacity `0.7 → 1.0` + 1px underline that scales in from center.
- Buttons: `transform: translateY(-1px)` only.

### Press states

- `.touch-feedback:active { transform: scale(0.97); opacity: 0.9; }` — the only place scale is permitted (tap feedback, not visual polish).
- `active:translate-y-px` on small CTAs.

### Borders

- Default surface border: `rgba(255,255,255,0.10)` — one hairline pixel.
- Accent border: `1px solid #4fe6ff` (outline button only).
- Dividers: `border-white/10` or `border-blueAccent/40` on the bottom edge of the showcase stripes.

### Shadows

- `shadow-lg` on primary buttons: `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)`.
- Hover glow (purple, circle CTA only): `0 0 28px rgba(135,5,242,0.5)`.
- Pill CTA: `0 15px 45px rgba(0,72,255,0.35)` (Ghost Blue faint).
- **No neumorphic, no inset shadows, no multi-layer soft glows.**

### Transparency & blur

- **Glass surface:** `bg-white/5` + `backdrop-blur-md` + `border-white/10`. Used for the desktop header.
- **No** fake CSS glassmorphism on hero cards — the brand rule is explicit: *"Sem glassmorphism fake em CSS."*
- Masking: radial-gradient masks drive the ghost-reveals-text effect (see `HeroCopy.module.css`).

### Corner radii

- Pills and CTAs: `rounded-full` (9999px).
- Cards: `rounded-md` (~8px) in featured grid, `rounded-lg` (~10px) in deep neutral cards.
- Header bar: `rounded-4xl` (~32px) — deliberately generous.
- Sharp corners are acceptable for editorial heads, never for interactive surfaces.

### Layout rules

- Header: `fixed top-6`, pointer-events-none wrapper with pointer-events-auto inner — so the WebGL layer underneath stays interactive.
- AntigravityCTA: `fixed bottom-20 right-4 sm:bottom-12 sm:right-8 lg:bottom-12 lg:right-12`.
- Min-widths for primary CTA: **181px / 201px / 241px** (mobile / tablet / desktop).
- Touch target minimum: 48×48px. Mobile CTAs pad to reach this.

### Z-index

- `0` base · `20` content · `30` 3D canvas · `40` CTAs · `50` overlays · `55` header · `60+` critical mobile text · `9999` custom cursor. Never `z-999`.

### Imagery vibe

- Cool. Desaturated deep blues, electric cyan accents, occasional pink glitch.
- Project thumbnails use animated background variants (see `animated-backgrounds.ts`) that rotate every 6.5–10s — they are generated CSS/Canvas, not photos.
- Where real imagery appears (portfolio cards), it's video-first with poster fallbacks — cinematic, often B&W or low-saturation.

---

## ICONOGRAPHY

- **Icon library:** [Lucide](https://lucide.dev/) (`lucide-react`). Confirmed in the source via `import { ArrowUpRight, ArrowLeft, Mail, Phone, Globe } from 'lucide-react'`.
- **Stroke weight:** `strokeWidth={2.5}` on the CTA arrows, default `2` elsewhere. `strokeLinecap/strokeLinejoin: "round"`.
- **Sizing:** `h-4 w-4` (footer, dense), `h-5 w-5` (inputs, contact), `h-6 w-6` (circle CTA default), `h-7 w-7` (hero/desktop CTA).
- **Color:** white over blue — `text-white` on filled blue pill/circle. Never colored icon fills.
- **SVG vs font:** always inline SVG via React. No icon fonts. No PNG icons.
- **Social icons:** custom brand marks live in `src/components/shared/icons/SocialIcons.tsx` (Instagram, Facebook, LinkedIn, Twitter). Copy these into `assets/social-icons/` if you need the exact paths; otherwise Lucide's `instagram`/`linkedin`/`twitter`/`facebook` are acceptable substitutes.
- **Emoji:** never in product UI. Permitted only in internal docs.
- **Unicode as icon:** the arrow glyph `→` is used inline inside CTA copy (`vamos trabalhar juntos →`), but not as a standalone icon. Middle-dot `•` is used as a metadata separator.

### Substitution flags

- **PPSupplyMono** is served from Codepen's CDN in the source. If offline, substitute **JetBrains Mono** or **IBM Plex Mono** — flag to the user.
- **Manrope woff2** is referenced from `/fonts/` but the source repo does not version-control it. Host it yourself (Google Fonts / bunny.net) or ship the woff2. A Google Fonts `<link>` is provided in `colors_and_type.css` comments as fallback.
- **Social icon SVGs** were not copied verbatim (the source defines them inline as React). The kit falls back to Lucide's matching icons — **flagged**.

---

## What this kit intentionally does *not* include

- The **GhostScene R3F / Three.js ghost entity** is not recreated. It's a 30 KB GLSL+R3F scene; the UI kit uses a CSS radial-gradient stand-in labelled **"Ghost Aura"**. Flagged for the user.
- The **fluid-glass header WebGL refraction** is not recreated. Kit uses `backdrop-blur` + `rgba(255,255,255,0.05)` glass. Flagged.
- **Admin/CMS surfaces** (Supabase-backed `/admin/*`) are out of scope — portfolio-facing only.

---

## Using this system

- For **quick prototypes:** link `colors_and_type.css` and start using `.text-display`, `.text-body`, `.bg-background`, `.ghost-card`, etc.
- For **hi-fi mocks:** open `ui_kits/portfolio/index.html` and lift the JSX components.
- For **decks:** use Void Black background with Ghost Blue punctuation, Manrope display at 120–180px, PPSupplyMono for tickers.
- See `SKILL.md` for a portable Agent Skills spec.

## Components

| Component | Purpose |
|-----------|---------|
| `generate-architecture` | Generates complete project folder structure + all config and component files |
| `3d-webgl-scene` | R3F/Three.js scene setup with memory management, LOD, and post-processing |
| `animation-pipeline` | Framer Motion scroll/gesture/entrance animations with reduced-motion support |
| `firebase-deploy` | Firebase Hosting config for Next.js (static + SSR modes, CI/CD) |
| `supabase-media-pipeline` | Supabase Storage client, upload helpers, RLS policies, middleware |
| `SessionStart` hook | Automatically injects tech stack context and coding standards each session |

## How to Trigger Each Skill

**generate-architecture** — Say:
- "Generate the complete project architecture"
- "Scaffold a new Next.js project with R3F and Framer Motion"
- "Create all config files for my project"

**3d-webgl-scene** — Say:
- "Create a 3D scene with a floating object"
- "Set up React Three Fiber in my project"
- "Add post-processing effects to my WebGL canvas"
- "Fix memory leaks in my R3F component"

**animation-pipeline** — Say:
- "Add scroll-triggered animations to this section"
- "Create entrance animations with stagger effect"
- "Implement smooth scroll with Lenis"
- "Build a magnetic button with gesture tracking"

**firebase-deploy** — Say:
- "Set up Firebase Hosting for my Next.js app"
- "Generate firebase.json with proper cache headers"
- "Create a GitHub Actions workflow for Firebase deployment"

**supabase-media-pipeline** — Say:
- "Set up Supabase Storage with public and private buckets"
- "Create the Supabase client for Next.js App Router"
- "Implement file upload with RLS policies"
- "Set up Supabase middleware for auth"

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+ (strict mode)
- **UI**: React 18+ / Tailwind CSS 3.4+
- **3D/WebGL**: React Three Fiber + @react-three/drei + three.js
- **Animation**: Framer Motion 11+ + Lenis
- **Hosting**: Firebase Hosting
- **Backend/Media**: Supabase (Storage + Auth)

## Core Standards Applied Automatically

1. TypeScript strict mode — no `any`, explicit interfaces everywhere
2. `prefers-reduced-motion` checks on all animations
3. Dynamic imports (`ssr: false`) for all Three.js components
4. Memory cleanup (`dispose()`) on all WebGL resources
5. Mobile-first, WCAG 2.1 AA compliant components (44px touch targets)
6. Performance budgets: LCP < 2.5s, DPR capped at [1, 2] for WebGL
7. Zero placeholders — all generated code is copy-paste ready

## Setup

No environment variables required for the plugin itself. When generating a project, the plugin will output a `.env.local.example` with all required variables for:
- Supabase URL and anon key
- Firebase project configuration
- Site URL and metadata
