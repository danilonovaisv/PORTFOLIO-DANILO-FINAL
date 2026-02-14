# 🧹 Clean Architecture Protocol

**Trigger:** `/clean-architecture`
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Systematic hygiene, structure cleanup, and deep cleaning of the codebase.

## 2. Steps (Skill-Based Execution)

### Step 1: Dead Code & File Detection

- **Instruction:** Identify unused files and blocks. Move orphans to `_TRASH_BIN/` before final pruning.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Standard Enforcement

- **Instruction:** Convert relative imports to absolute `@/` aliases and standardize component groupings.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Architecture cleanup report and formatted codebase.
