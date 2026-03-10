# Admin Remediation Plan — 2026-03-09

## Scope

Targeted remediation for nine isolated defects spanning:

- Landing Page Template V3 media rendering and autoplay
- Home featured cards and Ghost Cursor behavior
- Portfolio Showcase media sizing
- CTA motion synchronization
- About Beliefs mobile runtime

## Constraints

- Keep patches minimal and local to the owning renderer/hook/config
- Validate each task before moving forward
- Update ADMIN documentation after each task
- Avoid modifying unrelated dirty files already present in the worktree

## Task Order

1. Task 01 — YouTube autoplay in Template V3
2. Task 02 — Full image block without cropping in Template V3
3. Task 03 — MP4 support across thumb cards
4. Task 07 — Portfolio Showcase zoom/sizing correction
5. Task 08 — CTA sync animation
6. Task 05 — Home Ghost Cursor behavior gate
7. Task 06 — Animated card backgrounds rotation and Aurora recovery
8. Task 04 — Continuous/random movement for Home and Portfolio cards
9. Task 09 — About Beliefs mobile recovery

## Primary Code Areas

- `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`
- `src/components/admin/LandingPageForm.tsx`
- `src/components/admin/templates/v3/BlockEditorV3.tsx`
- `src/components/home/portfolio-showcase/CategoryStripe.tsx`
- `src/components/home/featured-projects/*`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/ui/AntigravityCTA.tsx`
- `src/components/portfolio/PortfolioCTA.tsx`
- `src/components/GhostCursor.tsx`
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/*`

## Documentation Targets

- `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/07-LANDING-PAGES.md`
- `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/ADMIN - PROTOTIPO INTERATIVO.md`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/04-PORTFOLIO-SHOWCASE/04-PORTFOLIO-SHOWCASE.md`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/05-FEATURED-PROJECTS.md`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME/02-HERO.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- Task-specific admin notes to be added under `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/`

## Evidence Strategy

- Local git history as fallback for unavailable GitHub MCP
- Playwright/browser validation as fallback for unavailable Chrome DevTools MCP
- Targeted lint/type/test execution after each patch cluster
