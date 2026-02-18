---
description: R3F Visual Debugger
---

# 👁️ R3F Visual Debugger

**Trigger:** "3D animation freezes" or "FPS drops in 3D".
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Specialized audit for R3F visual correctness and render loop stability.

## 2. Steps (Skill-Based Execution)

### Step 1: Render Loop Instrumentation

- **Instruction:** Audit `useFrame` callbacks for state mutations or object allocations inside the loop.
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** None

### Step 2: Context & Lifecycle Verification

- **Instruction:** Check Canvas persistence and hydration consistency between SSR and hydration.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** Use Chrome DevTools MCP to capture GPU usage during interaction.

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Debugging report and stable 60FPS implementation.
