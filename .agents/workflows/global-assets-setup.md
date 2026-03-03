---
description: Global Assets & Tokens Setup
---

# 🖼️ Global Assets & Tokens Setup

**Trigger:** Requests to initialize or update global design tokens.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `supabase`, `github`
- **Context:** Centralized configuration for brand colors, Supabase-hosted assets, and typographic scales.

## 2. Steps (Skill-Based Execution)

### Step 1: Token Configuration

- **Instruction:** Synchronize `brand.ts` and `content.ts` with the primary color (#0048ff) and TT Norms Pro typography.
- **Skill:** `use a skill ui-ux-pro-max`
- **MCP Action:** None

### Step 2: Asset Verification

- **Instruction:** Ensure all global logos and baseline textures are correctly pointed to Supabase Storage.
- **Skill:** `use a skill supabase-security-auditor`
- **MCP Action:** Use Supabase MCP to check asset availability.

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Updated branding configuration and asset integrity report.
