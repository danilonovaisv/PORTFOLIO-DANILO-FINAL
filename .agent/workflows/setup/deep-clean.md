# 🧽 Deep Clean Protocol

**Trigger:** Requests for deep code hygiene or removing technical debt.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Specialized protocol to identify and safely quarantine unused/aged code using static analysis (Knip) and Git history.

## 2. Steps (Skill-Based Execution)

### Step 1: Dead Code Discovery

- **Instruction:** Run temporal analysis (Git aging) and structural analysis (Knip) to identify candidate files for removal.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** None

### Step 2: Safe Quarantine

- **Instruction:** Intersect aging/unused data and move filtered candidates to `_backup_clean/` after verifying against `hygiene-rules.md`.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Quarantine log and successful build verification report.
