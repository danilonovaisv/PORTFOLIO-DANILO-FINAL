# 📊 Show Status

**Trigger:** `/status`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Display project progress, agent activity, and application health metrics.

## 2. Steps (Skill-Based Execution)

### Step 1: Progress Tracking

- **Instruction:** Analyze completed versus pending tasks and summarize file changes.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** Use GitHub MCP to summarize recent commits.

### Step 2: Environment Audit

- **Instruction:** Report on tech stack status, preview availability, and feature parity.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Comprehensive Status Board.
