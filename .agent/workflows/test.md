# 🧪 Test Generation and Execution

**Trigger:** `/test`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Generate and execute unit, integration, and E2E tests for the codebase.

## 2. Steps (Skill-Based Execution)

### Step 1: Code Coverage Analysis

- **Instruction:** Identify untested areas and define test cases for edge cases and happy paths.
- **Skill:** `use a skill testing-patterns`
- **MCP Action:** None

### Step 2: Test Implementation

- **Instruction:** Generate and write tests using the project's testing framework (Vitest/Jest).
- **Skill:** `use a skill vitest-supabase`
- **MCP Action:** None

### Step 3: Execution & Debugging

- **Instruction:** Run tests and address any failures or performance regressions.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** Use Chrome DevTools MCP to debug browser-based tests if needed.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Test execution report and coverage summary.
