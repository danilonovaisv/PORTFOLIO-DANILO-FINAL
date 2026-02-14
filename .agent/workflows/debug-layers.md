# 🧊 Layer Debugging System

**Trigger:** "z-index wars", "clique não funciona", or visual stacking issues.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Diagnostic system for resolving stacking context conflicts in hybrid DOM+WebGL architectures.

## 2. Steps (Skill-Based Execution)

### Step 1: Stacking Context Audit

- **Instruction:** Identify elements creating new contexts (opacity, transform, isolation) and map the "Z-Index Trap".
- **Skill:** `use a skill systematic-debugging`
- **MCP Action:** None

### Step 2: Interactivity Validation

- **Instruction:** Audit `pointer-events` usage to resolve blocks between UI and Canvas layers.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** Use Chrome DevTools MCP (Layers panel) to visualize the render hierarchy.

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Stacking Context Fix Report and corrected Tailwind classes.
