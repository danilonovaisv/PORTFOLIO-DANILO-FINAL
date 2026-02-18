---
description: Featured Projects
---

# ✨ Featured Projects Workflow

**Trigger:** Requests to update or build the "Destaques" section of the home page.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Implementation of the responsivo Bento Grid for selected showcase projects.

## 2. Steps (Skill-Based Execution)

### Step 1: Bento Grid Architecture

- **Instruction:** Construct the grid using Tailwind grid-auto-flow: dense and ensure responsive stack behavior.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

### Step 2: Interactive Polish

- **Instruction:** Implement scroll reveals and hover effects for `ProjectCard.tsx` and `CTAProjectCard.tsx`.
- **Skill:** `use a skill framer-motion`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Responsive Bento Grid implementation and walkthrough.
