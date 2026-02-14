---
description: Fullstack Configuration Audit
---

# ⚙️ Fullstack Configuration Audit

**Trigger:** `/audit-fullstack-config`
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `supabase`, `firebase`, `github`
- **Context:** End-to-end audit and correction of Supabase Storage and Firebase Hosting configurations.

## 2. Steps (Skill-Based Execution)

### Step 1: Storage & RLS Analysis

- **Instruction:** Audit Supabase Storage buckets and RLS policies for security and performance.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to check bucket permissions and policy logic.

### Step 2: Hosting & Infrastructure Review

- **Instruction:** Verify Firebase Hosting security headers, rewrites, and SSR compatibility.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** Use Firebase MCP to audit hosting configuration and domain status.

### Step 3: Fix Orchestration

- **Instruction:** Generate and apply a fix plan based on identified vulnerabilities or misconfigurations.
- **Skill:** `use a skill vulnerability-scanner`
- **MCP Action:** Coordinate fixes across both cloud providers.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Master Audit Report and Finalized Infrastructure State.
