---
description: # 🛡️ Supabase RLS Policy Expert
---

# 🛡️ Supabase RLS Policy Expert

**Trigger:** Requests to create or audit Row Level Security (RLS) policies.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`
- **Context:** specialized protocol for generating secure, high-performance RLS policies following strict declarative standards.

## 2. Steps (Skill-Based Execution)

### Step 1: Policy Generation

- **Instruction:** Generate permissive policies following the `TO authenticated/anon` pattern. Use `auth.uid()` for user-bound data.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to introspect table schemas.

### Step 2: Performance Tuning

- **Instruction:** Wrap JWT helper functions in `(select auth.uid())` to enable Postgres plan caching. Recommend specific indexes for policy columns.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill vulnerability-scanner`
- **Output:** Validated SQL Policy set and security health report.
