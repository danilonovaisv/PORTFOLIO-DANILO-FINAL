# 🤝 Client & Brand Integration

**Trigger:** Requests to integrate logos or client rosters.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `supabase`, `github`
- **Context:** Automated asset structuring and integration for client logos and branding assets.

## 2. Steps (Skill-Based Execution)

### Step 1: Asset Structuring

- **Instruction:** Audit and structure brand assets in Supabase Storage.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to verify public accessibility of brand assets.

### Step 2: Display Logic

- **Instruction:** Implement the marquee or grid-based logo exhibition with Ghost System aesthetics.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Integrated client logo section and asset log.
