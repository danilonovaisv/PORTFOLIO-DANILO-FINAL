---
description: Ajuste Mobile
---

# 📱 Mobile Optimization Workflow

**Trigger:** Requests related to mobile layout or responsive performance.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `chrome-devtools`
- **Context:** Mobile-first QA and optimization ensuring 60FPS performance and accessibility on touch devices.

## 2. Steps (Skill-Based Execution)

### Step 1: Responsive Architecture Audit

- **Instruction:** Verify Tailwind class order and ensure proper grid collapse at mobile breakpoints.
- **Skill:** `use a skill react-best-practices`
- **MCP Action:** Use Chrome DevTools MCP to verify "Lei do Polegar" (min height 48px).

### Step 2: Cinematics & Motion Optimization

- **Instruction:** Audit parallax and transitions for mobile performance (Lei da Cinemática).
- **Skill:** `use a skill webgl-optimizer`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill ui-visual-validator`
- **Output:** Mobile Optimization Report and responsive-validated UI.
