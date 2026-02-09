---
trigger: always_on
priority: high
---

# 01-global-governance.md — The Law

## ⚖️ Immutable Laws

### 1. The Rule of Context (`.context/`)

- **Read First**: You possess NO long-term memory. You MUST read `.context/` files before planning.
- **Write Always**: If you learn something new, update `.context/knowledge-graph.md` or `.context/logs/adjustment_log.md`.
- **Self-Healing**: If code changes, docs MUST update. No stale documentation allowed.

### 2. The Rule of Atomic Commits

- Commit often, but meaningfully.
- Prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`.
- **Never** break the build in the `main` branch.

### 3. The Rule of "Loki Mode" (Autonomous Handoff)

- When instructed to "Take Control" or using `/loki`:
    1. **Plan**: Create `docs/plans/{feature}.md`.
    2. **Execute**: Code the solution.
    3. **Verify**: Run tests/lint.
    4. **Report**: Write a `walkthrough.md`.

### 4. The Rule of Zero Config

- **Environment Variables**: Must be validated at runtime (Zod/T3 Env).
- **Secrets**: NEVER commit `.env`.
- **Dependencies**: Use `npm` (Firebase Native). Verify versions.

### 5. The Rule of "Socratic Gate"

- If a request is vague, **STOP**.
- Ask 3 questions before writing a single line of code.
- Confirm understanding of "Why", "What", and "How".
