# 🏥 System Health Check

**Trigger:** `/health-check` or keywords related to "service status".
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `supabase`, `firebase`, `chrome-devtools`
- **Context:** Lightweight, diagnostic-only workflow for assessing service status without performing modifications.

## 2. Steps (Skill-Based Execution)

### Step 1: Service Connectivity Audit

- **Instruction:** Verify Supabase connectivity and public data accessibility. Check Firebase Hosting availability.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Supabase and Firebase MCPs to query current status and health logs.

### Step 2: Asset Availability Check

- **Instruction:** Verify accessibility of critical storage assets (hero models, textures) via public endpoints.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** Use Chrome DevTools MCP to check for 404s or network failures on assets.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** unified Health Report [OK/FAIL] for all critical services.
