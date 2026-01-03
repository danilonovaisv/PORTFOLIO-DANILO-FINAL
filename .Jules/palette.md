# Design System & Palette

## Colors
| Token | Value | Usage |
| --- | --- | --- |
| primary | #0048ff | Primary brand color, interactive elements, CTAs |
| accent | #4fe6ff | Secondary highlights, Ghost atmosphere glow |
| background | #040013 | Main dark background |
| backgroundLight | #f0f0f0 | Light sections (forms, alternating backgrounds) |
| text | #fcffff | Primary text on dark backgrounds |
| textInverse | #0e0e0e | Text on light backgrounds |
| textSecondary | #a1a3a3 | Secondary information, metadata |
| neutral | #0b0d3a | Gradient transitions, subtle backgrounds |
| neutralLight | #F5F5F5 | Secondary section backgrounds |

## Typography
**Primary Font:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

| Element | Size | Weight | Usage |
| --- | --- | --- | --- |
| H1 | 4rem–6rem (64–96px) | Bold | Hero headlines |
| H2 | 2rem–3rem (32–48px) | Bold | Section titles |
| H3 | 1.25rem–1.5rem (20–24px) | Medium | Card titles, subsections |
| Body | 1rem–1.125rem (16–18px) | Regular | Main content, descriptions |
| Small | 0.875rem (14px) | Regular/Medium | Meta info, labels |
| Micro | 0.75rem (12px) | Mono | Tags, system messages |

## Accessibility Learnings
- **Contrast:** Text on the Ghost atmosphere requires `z-index` management to ensure it sits *above* the WebGL canvas for legibility and interaction.
- **Motion:** WebGL components (Ghost, Particles) must check `prefers-reduced-motion` and degrade to static gradients if active.
- **Mobile:** Mobile views disable heavy post-processing (Bloom, Analog Decay) to preserve battery and frame rate.
