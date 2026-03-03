# Implementation Plan - .agent/ Directory Alignment & Audit

This plan outlines the steps to align the `.agent/` directory with the "Ghost System" directives and the `AGENTS.md` file.

## 1. Consolidation of Rules

- [ ] Sync `AGENTS.md` with `.agent/rules/20-tech-stack.md`.
- [ ] Ensure `.agent/rules/21-webgl-performance.md` is the source of truth for R3F.
- [ ] Remove redundant or overlapping rule files (e.g., `coding-standards.md`, `coding-style.md` if they duplicate `20-tech-stack.md`).

## 2. Agent Calibration

- [ ] Verify 18 existing agents in `.agent/agents/`.
- [ ] Create missing `game-developer.md` for WebGL/3D logic.
- [ ] Create missing `mobile-developer.md` (as mentioned in Architecture).
- [ ] Align agent personas with "Ghost Commander" identity.

## 3. Skills Cleanup (The 760 Skills Issue)

- [ ] Create `.agent/skills/.archive/`.
- [ ] Move non-essential skills to `.archive/` (e.g., `airflow-dag-patterns`, `angular`, `aws-penetration-testing` which are unrelated to this Next.js/Three.js/Supabase project).
- [ ] Ensure the 36 core skills are in the root of `.agent/skills/`.

## 4. Workflow Organization

- [ ] Audit 63 workflows.
- [ ] Group into:
  - `core/`: Standard Antigravity Kit workflows.
  - `orchestrator/`: Complex multi-agent workflows.
  - `audit/`: Specific audit commands.
  - `ghost/`: Project-specific animations/styles.
- [ ] Update `ARCHITECTURE.md` with the corrected list.

## 5. Metadata Sync

- [ ] Update `data/skills_index.json` and `data/workflows.json` to reflect the new structure.
- [ ] Run `npx tsx .agent/execution/supabase-check.ts` to verify integration.
