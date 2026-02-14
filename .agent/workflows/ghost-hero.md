---
description: Ghost Hero Animation
---

# 👻 Ghost Hero Animation

**Trigger:** `/ghost-hero` or requests to refine the hero section.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Implementation and refinement of the "Ghost" hero animation, atmosphere, and visual stack.

## 2. Steps (Skill-Based Execution)

### Step 1: Visual Nucleus Architecture

- **Instruction:** Structure the Ghost and Particle layers using `useMemo` for vertex deformation and `InstancedMesh`.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** None

### Step 2: Motion Choreography

- **Instruction:** Implement smooth, ethereal transitions and scroll-driven interactions for the Manifesto and Hero layers.
- **Skill:** `use a skill framer-motion`
- **MCP Action:** None

### Step 3: Visual Polish & Shaders

- **Instruction:** Apply custom effects like `AnalogDecay` and refine lighting/atmosphere.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** High-fidelity 3D hero implementation and walkthrough video/screenshot.
