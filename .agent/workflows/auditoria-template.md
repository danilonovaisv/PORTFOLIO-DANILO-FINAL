# 🛡️ Master Audit Template V3.1

**Trigger:** Internal template usage for rigorous system reviews.
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `github`, `supabase`, `firebase`, `chrome-devtools`
- **Context:** High-rigor baseline for all system audits, ensuring full Ghost System compliance.

## 2. Steps (Skill-Based Execution)

### Step 1: Technical Scanning (Parsing)

- **Instruction:** Map all files, assets, and dependencies within the target section.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Compliance Verification

- **Instruction:** Audit grid margins (.std-grid), color tokens, and motion timings.
- **Skill:** `use a skill ui-visual-validator`
- **MCP Action:** None

### Step 3: Performance & Accessibility Vet

- **Instruction:** Run FPS audits, Aria label checks, and mobile-first snapshots.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** Use Chrome DevTools MCP for Lighthouse and Stacking Context analysis.

## 3. Completion Protocol

- **Validation:** `use a skill frontend-code-review`
- **Output:** Standardized Audit Log in `AUDIT_PENTEST.md`.
