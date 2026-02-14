---
description: Systematic Debugging
---

# 🔍 Systematic Debugging

**Trigger:** `/debug`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`, `github`
- **Context:** Activate DEBUG mode for systematic investigation of errors or unexpected behavior.

## 2. Steps (Skill-Based Execution)

### Step 1: Symptom Analysis

- **Instruction:** Gather error messages, reproduction steps, and identify recent code changes.
- **Skill:** `use a skill typescript-expert`
- **MCP Action:** Use Chrome DevTools MCP to capture console logs or network traces.

### Step 2: Hypothesis & Investigation

- **Instruction:** Formulate potential causes and test them systematically via elimination.
- **Skill:** `use a skill nextjs-react-expert`
- **MCP Action:** Use GitHub MCP to check commit history for relevant changes.

### Step 3: Resolution & Prevention

- **Instruction:** Apply the fix and document the root cause and prevention measures.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Debug report and code fix.
