# 🚀 Portfolio Strategy & Sync

**Trigger:** Requests to audit or synchronize the Portfolio page and showcase.
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `supabase`, `github`, `chrome-devtools`
- **Context:** Specialized audit and synchronization protocol for ensuring visual parity and data-link integrity of the Portfolio.

## 2. Steps (Skill-Based Execution)

### Step 1: Data-Link & Admin Sync

- **Instruction:** Verify tag clusters (Brand, Motion, Tech) and ensure types (A/B) match the showcase logic.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to audit query logic in `src/lib/supabase/queries/projects.ts`.

### Step 2: Mosaic Grid & Parallax Audit

- **Instruction:** Audit the editorial grid and `useLERPScroll` implementation for 60FPS smoothness.
- **Skill:** `use a skill ui-ux-pro-max`
- **MCP Action:** Use Chrome DevTools MCP to identify layout shifts in the gallery.

### Step 3: Modal Experience (A/B)

- **Instruction:** Validate the zoom vs. case modal selection logic and the 1500ms Ghost timeline.
- **Skill:** `use a skill framer-motion`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Comprehensive Portfolio Sync Report and specialized fixes (e.g., `PROMPT_PORTFOLIO_SYNC`).
