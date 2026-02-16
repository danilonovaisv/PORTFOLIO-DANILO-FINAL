# Knowledge Sync Plan

## Objectives

1. Clarify the "Monolithic Runner" pattern in `agent-orchestrator-audit`.
2. Clarify the "Generate-Only" safety policy for Supabase RLS fixes in `agent-supabase-audit`.
3. Execute the audit workflow to validate the system end-to-end.

## Sync Actions

1. **Update `.agent/agents/agent-orchestrator-audit.md`**:
   - Change "Delegate execution audits to specialized agents" to "Invoke specialized audit modules (library call)".
2. **Update `.agent/agents/agent-supabase-audit.md`**:
   - Change "Automatic Fixes (safe-only)" to "Automatic Fixes (safe-only) & Generation".
   - Explicitly state: "Generates SQL migration for RLS policies (does not apply automatically)".
3. **Update `.agent/workflows/audit-fullstack-config.yaml`**:
   - Update description to reflect the direct execution model.

## Verification

- Run `python3 scripts/antigravity/agent_orchestrator_audit.py --reports-dir reports` to generate the full audit report.
- Verify `reports/master-audit.json` contains valid scores.
