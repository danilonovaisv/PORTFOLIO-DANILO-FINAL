---
description: Synchronizes the project documentation and knowledge graph with the current codebase state.
---

# Sync Docs & Knowledge Workflow

This workflow ensures that the "Ghost System" memory remains accurate and up-to-date.

## Trigger

- After significant architectural changes.
- When `.context/` documents feel stale.
- Before starting a major new feature (Loki Mode).

## Steps

1. **Scan Knowledge Graph**
   - Read `.context/knowledge-graph.md`.
   - Identify if new components or stores have been added that are missing from the graph.

2. **Scan Codebase Structure**
   - Run `tree src/ -L 2` (or similar) to see the current high-level structure.
   - Check `package.json` for new major dependencies.

3. **Update Knowledge Graph**
   - Add new nodes for new modules.
   - Update relationships (e.g., "Auth Store now depends on Supabase Client").
   - **Rule:** If a component is deleted, mark it as `[DEPRECATED]` or remove it from the graph.

4. **Update Logs**
   - Append a summary of changes to `.context/logs/adjustment_log.md`.

5. **Verify Design Tokens**
   - Check `tailwind.config.ts` or `src/app/globals.css`.
   - Ensure `.context/GHOST-DESIGN-SYSTEM.md` matches the actual values.

6. **Self-Healing Report**
   - If significant discrepancies were found, log them in `.context/logs/fix-report-[date].md` or directly in `adjustment_log.md`.
