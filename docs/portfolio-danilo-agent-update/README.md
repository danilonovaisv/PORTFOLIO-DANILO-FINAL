# PORTFOLIO-DANILO-FINAL — Agent Architecture Update

Universal agent package for an UPDATE/AUDIT of the existing AI-agent configuration.

## Goals

1. Fix and prevent regressions in the protected ADMIN.
2. Improve HTML/video project cards on Home and Portfolio.
3. Improve project landing/case pages.
4. Reduce duplicated agent roles and context bloat.
5. Add verifiable routing and validation gates.

## Confirmed project context

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase JS / SSR
- Zustand
- GSAP / Motion / Lenis
- Three.js / React Three Fiber
- Jest / Testing Library / Playwright
- Existing multi-IDE agent configuration under `.agents/`, `.agent_config/`, `.claude/`, `.codex/`, `.qwen/`

## Installation strategy

This package is intentionally IDE-neutral.

Do NOT copy files blindly into the repository. The target IDE must:

1. inspect existing project agent configuration;
2. compare this package against existing agents/skills/workflows;
3. classify each existing and proposed component as KEEP / UPDATE / REMOVE / ADD / MERGE;
4. preserve valid project-specific customizations;
5. only write files after resolving the actual IDE format and destination.

See `docs/installation.md` and `PROMPT-FOR-AGENT-IDE.md`.
