---
description: Deep Clean Project
---

# 🧹 Deep Clean Project

**Trigger:** `/deep-clean-project` or keywords related to "limpeza total".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Forensic codebase cleaning to remove build artifacts, cache, and temporary files without touching source.

## 2. Steps (Skill-Based Execution)

### Step 1: Simulation (Dry-Run)

- **Instruction:** Run the `scripts/clean_project.py` in simulation mode and audit the candidates for deletion.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Execution & Reinstalls

- **Instruction:** Execute the destructive clean and immediately perform a fresh `pnpm install` and build.
- **Skill:** `use a skill performance-engineer`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Cleanliness report and successful build verification logs.
