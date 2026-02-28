# 📜 Supabase SQL Style Guide

**Trigger:** Requests to write SQL queries, table schemas, or functions.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`
- **Context:** Architectural standards for Postgres SQL in the Ghost System, prioritizing readability, snake_case conventions, and identity columns.

## 2. Steps (Skill-Based Execution)

### Step 1: DDL & Schema Standards

- **Instruction:** Ensure all tables use `identity generated always` IDs and descriptive `snake_case` names. Always include table comments.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 2: Query Optimization

- **Instruction:** Prefer CTEs (Common Table Expressions) for complex logic and explicitly name all joined columns for clarity.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Supabase MCP to run `EXPLAIN ANALYZE` on critical queries.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Style-compliant SQL implementation or schema blueprint.
