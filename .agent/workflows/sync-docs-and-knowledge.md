# 🧠 Sync Docs & Knowledge

**Trigger:** After major changes, architectural shifts, or when context feels "stale".
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Critical maintenance workflow to ensure the "Ghost System" memory and externalized documentation remain synchronized with the codebase.

## 2. Steps (Skill-Based Execution)

### Step 1: Knowledge Graph Reconciliation

- **Instruction:** Audit `.context/knowledge-graph.md` against the current component tree and state management stores.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 2: Design Token Validation

- **Instruction:** Ensure `.context/GHOST-DESIGN-SYSTEM.md` matches the actual values in `tailwind.config.ts` and global CSS.
- **Skill:** `use a skill ui-ux-pro-max`
- **MCP Action:** None

### Step 3: Self-Healing Reporting

- **Instruction:** Update adjustment logs and generate a fix report if significant discrepancies were resolved.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Synchronized Knowledge Graph and updated project logs.
