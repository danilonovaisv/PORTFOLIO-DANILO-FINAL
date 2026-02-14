# 🌌 Hero Section Implementation

**Trigger:** Requests to build or refine the Hero section.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`, `github`
- **Context:** Implementation of the Hero section with a "Ghost" atmosphere, incorporating layered WebGL and motion.

## 2. Steps (Skill-Based Execution)

### Step 1: Layered Architecture Stacking

- **Instruction:** Implement the Z-index stack: Mobile Menu (60) > Preloader (50) > Manifesto (30) > GhostStage (20) > HeroCopy (10).
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

### Step 2: Scroll Stage Engineering

- **Instruction:** Implement the scroll behavior (Pinned/Sticky -> Exit) and WebGL mouse lerping.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** None

### Step 3: Performance & Fallback

- **Instruction:** Ensure a required pre-loader and implement a lightweight mobile fallback for heavy WebGL effects.
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** Use Chrome DevTools MCP to verify frame budget on mobile devices.

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** High-fidelity Hero implementation and visual performance report.
