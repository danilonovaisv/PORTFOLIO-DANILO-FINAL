---
description: Structure Cleanup
---

# 🏗️ Structural Audit & Cleanup

**Trigger:** Requests to reorganize `src/` or perform a global structure audit.
**Agent:** `agents/audit_sentinel`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** High-level protocol for enforcing project architecture standards (Atomic Design/Feature-folders) and maintaining a clean root.

## 2. Steps (Skill-Based Execution)

### Step 1: Structure Alignment

- **Instruction:** Move orphaned components to `src/components/{feature}` and ensure all business logic is correctly isolated.
- **Skill:** `use a skill nextjs-best-practices`
- **MCP Action:** None

### Step 2: Root Hygiene

- **Instruction:** Clean the project root of any non-config/non-doc files while ensuring `.context/` and `.agent/` directories remain untouched.
- **Skill:** `use a skill lint-and-validate`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Structural Audit Report and finalized directory mapping.
