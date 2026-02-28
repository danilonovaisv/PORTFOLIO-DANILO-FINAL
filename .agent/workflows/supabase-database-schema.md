# 🗄️ Declarative Database Schema Management

**Trigger:** Requests to modify database tables, views, or migrations.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`, `github`
- **Context:** Strict protocol for managing the Supabase schema through declarative `.sql` files in `supabase/schemas/` instead of manual migrations.

## 2. Steps (Skill-Based Execution)

### Step 1: Schema Declaration Audit

- **Instruction:** Validate that all proposed changes are accurately reflected in the corresponding `.sql` files within `supabase/schemas/`.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** None

### Step 2: Migration Generation

- **Instruction:** Stop local Supabase, run `supabase db diff`, and review the generated migration for data integrity and RLS compliance.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** Use Supabase MCP to verify current database state before diffing.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Generated migration file and updated schema map.
