---
name: audit-fullstack-config
description: Workflow to audit and correct Supabase Storage and Firebase Hosting configuration.
triggers:
  - type: cli
    command: antigravity workflow run audit-fullstack-config
---

# Audit Fullstack Configuration Workflow

This workflow orchestrates the auditing and correction of the project's Supabase Storage and Firebase Hosting configurations.

## Steps

### Step 1: Validate Project Structure

- **Agent**: `agent-orchestrator-audit`
- **Action**: `validate_structure`
- **Description**: Verifies the presence of critical project files (`src/app`, `firebase.json`, etc.) before proceeding.

### Step 2: Analyze Supabase Storage

- **Agent**: `agent-supabase-audit`
- **Action**: `run_storage_audit`
- **Description**: Audits Supabase Storage buckets, RLS policies, and key exposure. Generates `reports/storage-audit.json`.

### Step 3: Analyze Firebase Hosting

- **Agent**: `agent-firebase-audit`
- **Action**: `run_hosting_audit`
- **Description**: Audits Firebase Hosting configuration, security headers, and cache settings. Generates `reports/hosting-audit.json`.

### Step 4: Consolidate Reports

- **Agent**: `agent-orchestrator-audit`
- **Action**: `generate_master_report`
- **Description**: Consolidates findings from Supabase and Firebase audits into a master report (`reports/master-audit.json`).

### Step 5: Propose Fixes

- **Agent**: `agent-orchestrator-audit`
- **Action**: `generate_fix_plan`
- **Description**: Generates a plan for correcting identified issues (`reports/FIX_PLAN.md`).

### Step 6: Apply Fixes (Optional)

- **Agent**: `agent-orchestrator-audit`
- **Action**: `apply_approved_fixes`
- **Condition**: User approval or `--auto-fix` flag.
- **Description**: Applies approved fixes to configuration files.

### Step 7: Re-Audit

- **Agent**: `agent-orchestrator-audit`
- **Action**: `re_audit`
- **Description**: Re-runs audits to verify fixes.

### Step 8: Finalize

- **Agent**: `agent-orchestrator-audit`
- **Action**: `export_final_report`
- **Description**: Generates the final audit report (`reports/final-report.html`).
