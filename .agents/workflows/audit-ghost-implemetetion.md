---
description: Audit Ghost Implemetetion
---

# 👻 Ghost Implementation Audit

**Trigger:** `/audit-ghost-implementation` or requests for visual parity check.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Specialized workflow for ensuring high-fidelity replication of the "Ghost" Hero Animation.

## 2. Steps (Skill-Based Execution)

### Step 1: Visual Fidelity Check

- **Instruction:** Compare the current implementation against reference shaders and geometry behaviors.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** None

### Step 2: VFX & Particle Optimization

- **Instruction:** Audit instanced meshes and post-processing (Analog Decay) for visual accuracy and performance.
- **Skill:** `use a skill webgl-optimizer`  `use a skill framer-motion`
- **MCP Action:** Use Chrome DevTools MCP to verify frame budget and GPU utilization.

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Visual Parity Report and specialized implementation fixes.