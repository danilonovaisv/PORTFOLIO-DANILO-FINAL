# Ghost System: Agent Manual

Welcome to the **Ghost System** agentic environment.

## 🧠 Philosophy

This project uses **Context-Driven Development**. Agents (and humans) must read the `.context/` memory before acting.

## 🛠️ Master Protocols (Workflows)

Use these standard commands/workflows to interact with the system.

| Workflow | File | Purpose |
| :--- | :--- | :--- |
| **Audit** | `.agent/workflows/audit-master.md` | Run Code, Perf, and Visual audits. |
| **Deploy** | `.agent/workflows/deploy-production.md` | Safe, guarded production deploy. |
| **Clean** | `.agent/workflows/clean-architecture.md` | Deep project cleaning. |
| **Sync** | `.agent/workflows/sync-docs-and-knowledge.md` | Update memory after changes. |
| **Loki** | `.agent/workflows/loki-execution-mode.md` | Autonomous feature building. |

## 🎓 Specialized Skills

| Skill | Domain |
| :--- | :--- |
| **webgl-performance** | High-perf 3D code rules. |
| **admin-realtime** | Security & Supabase Sync. |
| **self-healing-docs** | Documentation maintenance. |

## 📂 Directory Structure

```
.agent/
  ├── workflows/       # Action scripts
  ├── skills/          # Domain knowledge
.context/
  ├── knowledge-graph.md  # System Map
  ├── logs/               # History
  └── project-manifest.md # Identity
docs/
  └── AGENTS_SYSTEM.md    # This file
```

## How to Contribute

1. **Never** hardcode magic numbers. Update `design-tokens.md`.
2. **Always** update `adjustment_log.md` after a significant change.
3. **Use Workflows** instead of manual ad-hoc commands.
