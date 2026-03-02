# 🔧 Supabase Integration Fixer

**Trigger:** Reports of 403 errors, Realtime stalls, or Storage permission issues.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`, `chrome-devtools`
- **Context:** Diagnostic and corrective protocol for Supabase Realtime connectivity and Storage RLS permissions.

## 2. Steps (Skill-Based Execution)

### Step 1: Permission & Publication Audit

- **Instruction:** Introspect database publications (supabase_realtime) and RLS policies for `storage.objects`.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to query `pg_publication_tables` and security policies.

### Step 2: Corrective Implementation

- **Instruction:** Apply missing SQL policies or refactor React hooks to handle channel error states (CHANNEL_ERROR).
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Updated SQL policies and UI verification report.
