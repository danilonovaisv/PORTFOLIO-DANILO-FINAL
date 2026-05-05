# Weekly Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up unused dependencies, orphaned files, dead exports, and build/env validation issues identified in `AUDITORIA_SEMANAL_CLEANUP.md`.

**Architecture:** Execute in three verified cycles: environment/dependencies, orphaned route/files, and dead exports/contracts. Keep Firebase-generated deployment artifacts untouched unless explicitly verified as source files.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, pnpm, knip, ESLint.

---

## Cycle 1: Build, Env, Dependencies

- [ ] Update `src/lib/env.ts` so local/dev validation fails without required public Supabase env vars, while `VALIDATE_ENV_WARN_ONLY=1` continues to warn and proceed.
- [ ] Remove unused root dependencies: `@dataconnect/admin-generated`, `@dataconnect/generated`, `@radix-ui/react-label`, and `motion`.
- [ ] Remove `src/lib/server-env.ts` if it remains unreferenced by server-only runtime code.
- [ ] Verify with `pnpm exec knip --reporter compact`, `pnpm run typecheck`, and `pnpm run lint`.

## Cycle 2: Orphaned Files and Route

- [ ] Remove unused files confirmed by `knip`: admin header/badge, beliefs store/config, legacy template components, split text helper, pointer parallax hook.
- [ ] Remove the orphan App Router route at `src/app/(sobre)/o-que-me-move`.
- [ ] Update `.context/` docs that still describe removed files as active implementation.
- [ ] Verify with `pnpm exec knip --reporter compact`, `pnpm run typecheck`, and `pnpm run lint`.

## Cycle 3: Dead Exports and Script Imports

- [ ] Remove unused exports from featured background, modal variants, motion tokens, portfolio shuffle helpers, site-assets context, and template schema where not part of active contracts.
- [ ] Treat `GHOST_EASE_SOFT` as removed only if documentation is updated to keep the design-system contract honest.
- [ ] Fix unresolved `../lib/skill-utils` imports in `scripts/build-catalog.js` and `scripts/normalize-frontmatter.js` by removing dead scripts or correcting their dependency.
- [ ] Verify with `pnpm exec knip --reporter compact`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm run build`.

## Acceptance

- [ ] Build, typecheck, and lint pass.
- [ ] `knip` no longer reports the planned unused dependencies, orphaned source files, dead exports, or unresolved script imports.
- [ ] Build output no longer includes `/o-que-me-move`.
- [ ] `.context/` reflects removed implementation files where it referenced them as active.
