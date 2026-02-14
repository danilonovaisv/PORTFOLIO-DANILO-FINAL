# 🛠️ Firebase DevOps Orchestrator

**Trigger:** `/firebase-devops` or "Firebase deploy failed".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `firebase`, `chrome-devtools`
- **Context:** specialized protocol for debugging Next.js App Router deployments on Firebase Hosting, focusing on SSR/Functions.

## 2. Steps (Skill-Based Execution)

### Step 1: Configuration & Secrets Audit

- **Instruction:** Validate `firebase.json` rewrites and check if secrets are correctly injected for SSR routes.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** Use Firebase MCP to check environment configurations.

### Step 2: Build Simulation

- **Instruction:** Simulate the production build locally and verify dynamic route handling in `next.config.mjs`.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** DevOps Troubleshooting Report and successful deployment log.
