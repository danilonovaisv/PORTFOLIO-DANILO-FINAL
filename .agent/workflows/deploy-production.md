---
description: Master Deploy Protocol
---

# 🚀 Master Deploy Protocol

**Trigger:** `/deploy-production` or "Ready for release".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `firebase`, `github`
- **Context:** Secure, guarded, and automated deployment process for Next.js + Firebase, incorporating the SSR Guardrail.

## 2. Steps (Skill-Based Execution)

### Step 1: Pre-Flight Integrity

- **Instruction:** Execute type safety check, linting, and production build verification.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: SSR Guardrail & Config

- **Instruction:** Verify `firebase.json` destinations and ensure `package.json` engines match the target runtime (Node 20).
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** Use Firebase MCP to audit hosting site health.

### Step 3: Deployment & Live Check

- **Instruction:** Deploy to production and verify critical paths (Home, Admin, Projects) immediately after launch.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** Use Chrome DevTools MCP to verify the production URL responsiveness.

## 3. Completion Protocol

- **Validation:** `use a skill performance-profiling`
- **Output:** Deployment log update and production health status.
