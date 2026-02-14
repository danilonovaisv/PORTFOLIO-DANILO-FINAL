# 🏠 Home Page Audit

**Trigger:** `/audit --page home` or Home page specific requests.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** dedicated audit for the Home Page layout, animation performance, and UX.

## 2. Steps (Skill-Based Execution)

### Step 1: Layout & UX Verification

- **Instruction:** Audit the home page against the design system and established UX laws (Lei do Polegar, Lei da Cinemática).
- **Skill:** `use a skill ui-visual-validator`
- **MCP Action:** None

### Step 2: Interactive Element Audit

- **Instruction:** Verify all interactive elements (Manifesto, Hero, CTAs) for functionality and 60FPS performance.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Chrome DevTools MCP to identify layout shifts and animation hitches.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Actionable Home Page Improvement Plan and Audit Log.
