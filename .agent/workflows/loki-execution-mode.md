---
description: Loki Execution Mode (Autonomous)
---

# 👺 Loki Execution Mode (Autonomous)

**Trigger:** `/loki` or "Take control".
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`, `supabase`, `firebase`
- **Context:** Autonomous execution protocol for complex feature implementation, prioritizing atomic operations and persistent state updates.

## 2. Steps (Skill-Based Execution)

### Step 1: Autonomous Planning

- **Instruction:** Read context, create a detailed implementation plan in `docs/plans/`, and update the project `task.md`.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Atomic Execution

- **Instruction:** Implement changes one component at a time, never editing >3 files without verification.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

### Step 3: Verified Delivery

- **Instruction:** Run full lint/type checks, generate a walkthrough, and update the adjustment log.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill performance-profiling`
- **Output:** Walkthrough artifact and deployment-ready state.
