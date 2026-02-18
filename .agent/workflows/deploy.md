---
description: Deploy
---

# 🚀 Production Deployment

**Trigger:** `/deploy`
**Agent:** `agents/agent-supabase-audit.md`

## 1. Setup & Context

- **MCP Required:** `firebase`, `supabase`, `github`
- **Context:** Handle production deployment with rigorous pre-flight checks and verification.

## 2. Steps (Skill-Based Execution)

### Step 1: Pre-Deployment Audit

- **Instruction:** Run type checks, linting, and security audits.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

### Step 2: Build & Verification

- **Instruction:** Build the application and verify bundle size and performance metrics.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 3: Live Deployment

- **Instruction:** Push the build to the hosting platform and verify health status.
- **Skill:** `use a skill performance-engineer`
- **MCP Action:** Use Firebase MCP to execute the final deployment command.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Deployment summary with production URLs.
