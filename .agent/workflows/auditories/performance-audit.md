# ⚡ Performance Audit Checklist

**Trigger:** "Audit performance" or keywords related to speed/optimization.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Core performance audit checklist focusing on both static analysis and runtime execution.

## 2. Steps (Skill-Based Execution)

### Step 1: Static Integrity Check

- **Instruction:** Run linting and type checks to identify low-hanging performance issues.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Runtime Execution Analysis

- **Instruction:** Audit heap snapshots and draw calls to detect memory leaks and rendering overhead.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Chrome DevTools MCP to identify long tasks and blocking scripts.

### Step 3: Bundle Optimization

- **Instruction:** Analyze production bundle size and check for large dependency chunks.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Performance Audit artifact and optimization roadmap.
