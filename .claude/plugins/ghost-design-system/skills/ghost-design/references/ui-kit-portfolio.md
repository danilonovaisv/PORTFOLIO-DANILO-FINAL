# Ghost UI Kit — Portfolio Components

All JSX components live in `ui_kits/portfolio/` at the plugin root. Read each file via the `Read` tool
when you need the exact implementation. Below is the component map and usage notes.

## Components

| File                    | Surface              | Notes                                                                                          |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `Header.jsx`            | Desktop + mobile nav | Fluid-glass header, fixed top-6, `backdrop-blur-md`, mobile staggered menu                     |
| `Hero.jsx`              | Hero section         | WebGL ghost entity + editorial copy + Antigravity CTA. Falls back to radial-gradient on mobile |
| `AntigravityCTA.jsx`    | Floating CTA         | Fixed bottom-right, pill + trailing circle. Hover: circle shifts to purple + separates 3–8px   |
| `IconCircleCTA.jsx`     | Circle icon button   | Hover: `bg: bluePrimary → purpleDetails` + glow `0 0 28px rgba(135,5,242,0.5)`                 |
| `PortfolioShowcase.jsx` | Accordion stripes    | 3 categories: Brand & Campaigns, Videos & Motions, Websites & Tech                             |
| `FeaturedProjects.jsx`  | Bento grid           | Project cards with animated background variants rotating every 6.5–10s                         |
| `ContactSection.jsx`    | Light inversion      | Only light-background section in the portfolio                                                 |
| `SiteFooter.jsx`        | Footer               | Solid Ghost Blue (`#0048ff`) background                                                        |
| `icons.jsx`             | Icon set             | Lucide-based — `ArrowUpRight`, `ArrowLeft`, `Mail`, `Phone`, `Globe` + social SVGs             |
| `Tweaks.jsx`            | Utility overrides    | Small visual corrections / motion tweaks                                                       |
| `index.html`            | Full click-thru      | Self-contained interactive portfolio prototype                                                 |
| `styles.css`            | Component styles     | CSS for the portfolio click-thru                                                               |

## Usage patterns

### For HTML artifacts

Link `references/colors_and_type.css` and use the semantic utility classes:

- `.text-display` `.text-body` `.text-meta` `.text-mono-label`
- `.bg-background` `.bg-neutral` `.bg-blue-primary`
- `.ghost-card` `.ghost-cta-pill` `.ghost-circle-cta`

### For JSX/React

Read the component from `ui_kits/portfolio/<ComponentName>.jsx` and adapt as needed.
All components assume Tailwind CSS with the Ghost token config.

### For decks / slides

- Background: always `#040013` (Void Black)
- Headline: Manrope 800, 120–180px, `letter-spacing: -0.04em`
- Accent color: `#0048ff` Ghost Blue as the sole punctuation color
- Mono labels: PPSupplyMono uppercase + `letter-spacing: 0.2em`

## Copy voice reference

- pt-BR default · lowercase CTAs · editorial, restrained tone
- CTA examples: `vamos trabalhar juntos →` · `let's build something great` · `voltar ao portfólio`
- Section headers use two-tone: italic light blue + bold white (e.g., `portfólio showcase`)
- NO emoji in product UI
