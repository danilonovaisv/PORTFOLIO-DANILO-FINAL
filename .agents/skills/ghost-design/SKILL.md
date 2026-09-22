---
name: ghost-design
description: Use this skill to generate well-branded interfaces and assets for Ghost Design (Danilo Novais portfolio), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Ghost Design Skill

Read `../../README.md` first — it contains the full content fundamentals, visual foundations, and iconography guide. Then consult:

- `../../colors_and_type.css` — CSS vars + semantic utility classes. Link this in any HTML you output.
- `../../fonts/` — Manrope Variable (self-host) + PPSupplyMono (CDN via `@font-face`).
- `../../assets/` — logos, ghost glyph placeholder, sample background gradients.
- `../../ui_kits/portfolio/` — interactive click-thru + JSX components (Header, Hero, AntigravityCTA, IconCircleCTA, PortfolioShowcase, FeaturedProjects, ContactSection, SiteFooter).
- `../../preview/` — small spec cards (not meant as deliverables).

If creating visual artifacts (slides, mocks, throwaway prototypes), copy `../../colors_and_type.css`, needed font files, and any JSX components you need into the output folder. Work in **Portuguese (pt-BR)** by default; lowercase editorial voice on CTAs; never use emoji in product chrome; follow the motion rules (Ghost ease `[0.22, 1, 0.36, 1]`, translateY max 18px, no scale/rotate/translateX on content reveals).

If working on production code, read the rules in `../../README.md` and apply them against the live `danilonovaisv/PORTFOLIO-DANILO-FINAL` source.

If the user invokes this skill without guidance, ask what they want to build, clarify product surface and copy language, and then act as an expert Ghost-brand designer outputting HTML artifacts or production code as needed.

## Non-negotiables (copy from source brand rules)

- ❌ No fake CSS glassmorphism on cards
- ❌ No decorative gratuitous animations
- ❌ No WebGL on mobile
- ❌ No animated text on the hero
- ✅ Content > effect
- ✅ Motion as language
- ✅ WebGL as atmosphere only
- ✅ Code legível e escalável

## Color quick reference

`#0048ff` primary · `#4fe6ff` accent · `#8705f2` hover-only · `#040013` background · `#0b0d3a` deep neutral · `#fcffff` text · `#a1a3a3` secondary.
