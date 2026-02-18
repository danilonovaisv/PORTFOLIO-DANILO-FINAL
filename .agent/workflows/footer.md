---
description: Footer
---

# 🦶 Footer Implementation

**Trigger:** Requests to update or build the project footer.
**Agent:** `agents/ghost-architect.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Implementing the rigid editorial footer with fixed-bottom behavior on desktop and static stack on mobile.

## 2. Steps (Skill-Based Execution)

### Step 1: Responsive Layout Engineering

- **Instruction:** Implement `fixed bottom-0` for desktop (lg) and `static` for mobile. Use `bg-[#0048ff]` tokens.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** None

### Step 2: Content & Integrity

- **Instruction:** Verify copyright text and ensure all supplementary links match the navigation schema.
- **Skill:** `use a skill verification-before-completion`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Finalized Footer component implementation.
