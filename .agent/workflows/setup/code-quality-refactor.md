# 🧹 Code Quality & Refactor

**Trigger:** `/refactor` or requests for code hygiene/cleanup.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Standard protocol for maintaining code quality, enforcing type safety, and optimizing Tailwind usage.

## 2. Steps (Skill-Based Execution)

### Step 1: Structural Hygiene

- **Instruction:** Remove unused imports, order remaining ones, and eliminate `any` types.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Component Decoupling

- **Instruction:** Identify and split large components (>250 lines) into functional sub-components.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill frontend-code-review`
- **Output:** Refactoring report and clean build status.
