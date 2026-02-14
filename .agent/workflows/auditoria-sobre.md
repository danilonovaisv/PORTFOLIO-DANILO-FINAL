# 🕵️ About Page Audit

**Trigger:** Requests related to auditing the About page or "beliefs" section.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Dedicated audit for the About page, focusing on layout compliance and animation fidelity.

## 2. Steps (Skill-Based Execution)

### Step 1: Visual Structural Audit

- **Instruction:** Match the implementation against the `SOBRE-PROTOTIPO-INTERATIVO.md` specifications.
- **Skill:** `use a skill ui-visual-validator`
- **MCP Action:** None

### Step 2: Interactive Section Review

- **Instruction:** Verify the "About Beliefs" 3D elements and motion transitions.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** Use Chrome DevTools MCP to audit GPU performance during the "dance" sequence.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** About Page Audit Report and action plan.
