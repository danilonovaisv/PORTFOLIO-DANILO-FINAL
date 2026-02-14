---
description: Planning Mode
---

# 📋 Planning Mode

**Trigger:** `/plan`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Create project plan using project-planner agent. No code writing - only plan file generation.

## 2. Steps (Skill-Based Execution)

### Step 1: Socratic Gate

- **Instruction:** Ask clarifying questions before planning to ensure full understanding of requirements.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Plan Generation

- **Instruction:** Generate a structured plan with task breakdown and agent assignments.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** Use GitHub MCP to record any architectural decisions if needed.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** `docs/PLAN-{task-slug}.md`
