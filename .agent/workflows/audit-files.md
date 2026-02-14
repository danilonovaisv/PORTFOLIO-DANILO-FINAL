# 🛡️ Architecture Audit

**Trigger:** Requests to audit file structure or dependencies.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** specialized audit of project architecture and inter-session dependency matrix.

## 2. Steps (Skill-Based Execution)

### Step 1: Dependency Matrix Scan

- **Instruction:** Analyze file dependencies and identify architectural violations or circular imports.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Structure Enforcement

- **Instruction:** Verify adherence to the "Ghost System" structure rules and naming conventions.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Architecture Audit Report and dependency graph summary.
