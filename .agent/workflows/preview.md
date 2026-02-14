---
description: Preview Management
---

# 🌐 Preview Management

**Trigger:** `/preview`
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Manage the local development server and ensure application health.

## 2. Steps (Skill-Based Execution)

### Step 1: Server Control

- **Instruction:** Start, stop, or restart the development server based on command.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 2: Health Verification

- **Instruction:** Check the server status and ensure the application is responding correctly.
- **Skill:** `use a skill performance-profiling`
- **MCP Action:** Use Chrome DevTools MCP to verify page load and console errors.

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Server status and access URL.
