# O Que Me Move Text Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the `06-O-QUE-ME-MOVE` section to match the approved text/ghost layout reference while preserving Ghost System contracts and existing E2E hooks.

**Architecture:** Keep the current `AboutBeliefs` scroll orchestration, but shift composition responsibilities into layout tokens and the live `beliefs` components. The scroll sections continue to drive narrative state while the sticky stage, fixed phrase positioning, ghost anchor, and manifesto geometry are updated for desktop/mobile parity.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, React Three Fiber, Playwright

---

- [ ] Update `src/config/beliefTokens.ts` with the new stage, phrase, ghost, and manifesto layout tokens.
- [ ] Recompose `src/components/sobre/sections/AboutBeliefs.tsx`, `BeliefFixedHeader.tsx`, `BeliefScrollText.tsx`, `BeliefManifesto.tsx`, `GhostScene.tsx`, and `GhostModel.tsx` around the approved sticky layout.
- [ ] Extend `test/e2e/about-beliefs.spec.ts` to assert header/phrase geometry across desktop and mobile, then run `pnpm run typecheck`, `pnpm run lint`, `pnpm run build`, and Playwright against `/sobre`.
- [ ] Sync `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md`, `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`, and `.context/active_state.md`.
