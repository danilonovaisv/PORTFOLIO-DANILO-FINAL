# 🛡️ Master Audit Protocol

**Trigger:** `/audit-master` or "Perform a system audit".
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `github`, `supabase`, `firebase`, `chrome-devtools`
- **Context:** Unified rigorous audit process covering code integrity, performance, visual fidelity, and security.

## 2. Steps (Skill-Based Execution)

### Step 1: Code & Build Audit

- **Instruction:** Execute type checks, linting, and production build verification.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** Use GitHub MCP to scan for hardcoded secrets.

### Step 2: 3D & Performance Scan

- **Instruction:** Audit WebGL performance and Ghost System configuration sanity.
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** None

### Step 3: Backend & Security Audit

- **Instruction:** Verify Supabase RLS policies and Firebase Hosting configuration.
- **Skill:** `use a skill vulnerability-scanner`
- **MCP Action:** Use Supabase MCP to check realtime policies and storage permissions.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Comprehensive Audit Report in `docs/audits/AUDIT-[YYYY-MM-DD].md`.
