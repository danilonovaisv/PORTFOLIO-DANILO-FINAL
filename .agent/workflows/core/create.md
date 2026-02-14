# 🏗️ Create Application

**Trigger:** `/create`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `github`, `supabase`
- **Context:** Start a new application creation process with interactive dialogue and planning.

## 2. Steps (Skill-Based Execution)

### Step 1: Request Analysis

- **Instruction:** Analyze the user request and identify missing project details.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Technical Planning

- **Instruction:** Determine tech stack, plan file structure, and define task breakdown.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 3: Implementation

- **Instruction:** Execute the plan, coordinating between frontend, backend, and database logic.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** Use Supabase MCP to initialize database schema if required.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** New application codebase and `docs/walkthrough.md`.
