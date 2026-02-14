# 🚀 WebGL Performance Pass

**Trigger:** "The site feels slow" or keywords related to 3D lag.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Specialized audit for Three.js/R3F performance optimization to maintain the 60FPS mandate.

## 2. Steps (Skill-Based Execution)

### Step 1: Static Asset Analysis

- **Instruction:** Audit models and textures in `public/`. Ensure `.webp`/`.ktx2` usage and proper compression.
- **Skill:** `use a skill threejs-skills`
- **MCP Action:** None

### Step 2: Render Loop Audit

- **Instruction:** Analyze `useFrame` implementations for object allocations and render-cycle efficiency.
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** Use Chrome DevTools MCP to monitor memory heaps and draw calls.

### Step 3: Scene Stress Test

- **Instruction:** Verify Draw Calls (< 100) and Triangles (< 500k) using performance monitoring tools.
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Performance report in `docs/perf/webgl-report-[date].md` with optimization results.
