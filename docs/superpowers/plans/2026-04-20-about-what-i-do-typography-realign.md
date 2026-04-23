# [AboutWhatIDo] Typography Realignment Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realign font sizes in the "What I Do" section to match design references and eliminate overlapping text.

**Architecture:** Switch from "Hero-level" tokens to "Section-level" tokens (H1/H2 for headers, H3/Body-Enhanced/Small for cards) and adjust container constraints.

**Tech Stack:** Next.js, Tailwind CSS (Ghost Tokens).

---

### Task 1: Header Realignment (Desktop & Mobile) [DONE]

**Files:**
- Modify: `src/components/sobre/sections/AboutWhatIDo.tsx`

- [x] **Step 1: Downgrade Desktop Header scale**
  - Change `text-display` -> `text-h1` (56px)
  - Change `text-h1` -> `text-h2` (40px)
  - Adjust `max-w-[900px]` -> `max-w-[1200px]` to prevent word breaking
- [x] **Step 2: Downgrade Mobile Header scale**
  - Change `text-display` -> `text-h2` (40px)
  - Change `text-h1` -> `text-h3` (28px)

---

### Task 2: Card Typography Realignment (Desktop) [DONE]

**Files:**
- Modify: `src/components/sobre/sections/AboutWhatIDo.tsx`

- [x] **Step 1: Adjust Card Hierarchy**
  - ID Number: `text-h2` -> `text-h3`
  - Keyword: `text-h3` -> `text-body-enhanced`
  - Description: `text-body` -> `text-small`
- [x] **Step 2: Visual Breathing Room**
  - Increase horizontal padding `px-4` -> `px-6` for better text distribution.

---

### Task 3: Card Typography Realignment (Mobile) [DONE]

**Files:**
- Modify: `src/components/sobre/sections/AboutWhatIDo.tsx`

- [x] **Step 1: Mobile List Scale Down**
  - Number Circle: `text-h3` -> `text-body-enhanced`
  - Text Content: `text-body` -> `text-small`
  - Ensure `text-blueAccent` keyword color is maintained.

---

### Task 4: QA & Verification [DONE]

- [x] **Step 1: Run typecheck**
    - `pnpm build-check`
- [x] **Step 2: Visual consistency check**
    - Verified against design tokens in `GHOST-DESIGN-SYSTEM.md`.

---

## 🎯 Final Status: COMPLETE
**Author:** Antigravity (Ghost Commander)
**Date:** 2026-04-20
**Verdict:** Typography aligned with section hierarchy; layout regressions eliminated.
