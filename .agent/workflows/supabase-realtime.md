# ⚡ Supabase Realtime Expert Guide

**Trigger:** Requests to implement, debug, or optimize Supabase Realtime.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`, `chrome-devtools`
- **Context:** specialized implementation protocol for high-performance Realtime events, focusing on broadcast/presence over postgres_changes.

## 2. Steps (Skill-Based Execution)

### Step 1: Topic & Event Strategy

- **Instruction:** Define granular topics (e.g., `room:123:messages`) and snake_case event names. Evite broadly scoped topics.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** None

### Step 2: Implementation Patterns

- **Instruction:** Use `broadcast` for notifications and `presence` for user status. Implement required unsubscribe/cleanup logic in React hooks.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

### Step 3: Performance Optimization

- **Instruction:** Create indexes for columns used in RLS policies and use `broadcast` via database triggers for scalable change notifications.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Chrome DevTools MCP to monitor network traffic overhead.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Realtime implementation report and scalability assessment.
