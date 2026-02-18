---
description: Deploy Guard
---

# 🛡️ Deploy Guard Protocol

**Trigger:** `/deploy` or "Ready for production".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`, `firebase`
- **Context:** Mandatory safety gate ensuring production-readiness through rigorous verification.

## 2. Steps (Skill-Based Execution)

### Step 1: Integrity & Build Audit

- **Instruction:** Execute lint, type check, and production build. Analyze bundle chunks (> 200kb triggers warning).
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Smoke Test & Health

- **Instruction:** Execute visual smoke tests on Home and Projects pages via browser.
- **Skill:** `use a skill performance-engineer`
- **MCP Action:** Use Chrome DevTools MCP to capture console errors and LCP metrics.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Ready-for-Deploy confirmation and Commit recommendation.
