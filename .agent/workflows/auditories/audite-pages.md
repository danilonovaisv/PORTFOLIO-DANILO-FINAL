# 🕵️ Page Layout Audit

**Trigger:** `/audit --page`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Rigorous visual and layout compliance audit for pages to ensure Ghost System integrity.

## 2. Steps (Skill-Based Execution)

### Step 1: Visual Structural Analysis

- **Instruction:** Audit spacing, typography, and grid alignment across breakpoints.
- **Skill:** `use a skill ui-visual-validator`
- **MCP Action:** None

### Step 2: Compliance Verification

- **Instruction:** Match the implementation against the Ghost Design System tokens and rules.
- **Skill:** `use a skill ui-ux-pro-max`
- **MCP Action:** Use Chrome DevTools MCP to verify responsive layout shifts.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Visual Compliance Report and actionable fix plan.
