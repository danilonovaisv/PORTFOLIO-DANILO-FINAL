---
description: Fullstack Supabase Storage + Firebase Hosting audit with controlled auto-fix and revalidation.
---

# audit-fullstack-config

**Trigger:** `/audit-fullstack-config`
**Primary Agent:** `agents/agent-orchestrator-audit.md`
**Workflow Spec:** `.agent/workflows/audit-fullstack-config.yaml`
**Contract:** `.agent/contracts/audit-agent-contract.yaml`

## Objective
End-to-end audit and hardening for:
- Supabase Storage
- Firebase Hosting
- Next.js App Router integration

## Routing
1. Storage security and policy validation -> `agent-supabase-audit`
2. Hosting security/performance validation -> `agent-firebase-audit`
3. Consolidation, fix orchestration, and export -> `agent-orchestrator-audit`

## Execution Guarantees
- Backup before mutable operations.
- Diff preview before changing `firebase.json`.
- Revalidation pass after auto-fix.
- Structured report generation in `reports/`.

## Final Artifacts
- `reports/storage-audit.json`
- `reports/hosting-audit.json`
- `reports/master-audit.json`
- `reports/security-score.json`
- `reports/performance-score.json`
- `reports/final-report.html`
