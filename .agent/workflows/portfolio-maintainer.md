---
description: Portfolio Master Maintainer
---

# 💂 Portfolio Master Maintainer

**Trigger:** "Audit the system", "system health check", or "Fix everything".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`, `firebase`, `chrome-devtools`
- **Context:** Master protocol for periodic health checks across Storage (Supabase), Rendering (WebGL), and Deployment (Firebase).

## 2. Steps (Skill-Based Execution)

### Step 1: Security & Storage Audit

- **Instruction:** Verify Supabase RLS policies and Storage bucket permissions.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to audit database health.

### Step 2: DevOps Consistency Check

- **Instruction:** Validate Firebase Hosting config vs package.json engines.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** Use Firebase MCP for environment verification.

### Step 3: Performance Smoke Test

- **Instruction:** Analyze WebGL frame drops and draw calls.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Chrome DevTools MCP to capture performance traces.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Comprehensive Maintenance Report and SQL migration plans (if required).
