---
name: feature-development-with-component-and-style-update
description: Workflow command scaffold for feature-development-with-component-and-style-update in PORTFOLIO-DANILO-FINAL.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development-with-component-and-style-update

Use this workflow when working on **feature-development-with-component-and-style-update** in `PORTFOLIO-DANILO-FINAL`.

## Goal

Implements or refactors a UI feature, typically involving a React component, possibly with accessibility or performance improvements, and updates related style/config/build files.

## Common Files

- `src/components/**/*.tsx`
- `public/build-info.json`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `jest.config.cjs`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or create one or more component files in src/components/...
- Optionally update related files (e.g., hooks, utils, or lib/...)
- Update build info (public/build-info.json)
- Update configuration or lockfiles (package.json, pnpm-lock.yaml, tsconfig.json, jest.config.cjs)
- Optionally update documentation or context files

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.