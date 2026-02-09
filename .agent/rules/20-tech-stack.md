---
trigger: always_on
priority: high
---

# 20-tech-stack.md — Core Engineering

## 🏗️ The Stack

- **Framework**: Next.js 15 (App Router). Server Components by default.
- **Language**: TypeScript 5.x. Strict Mode enabled.
- **Styling**: Tailwind CSS 4. No arbitrary values if tokens exist.
- **State**: Zustand (Global), React Context (Compound Components).
- **Date**: Date-fns (Lightweight).

## 💻 Coding Standards

1. **Functional Components Only**: No Class components.
2. **Hooks**: Custom hooks for logic > 10 lines.
3. **Props**: Defined as `interface` (not `type`). Explicit naming (`UserProps` vs `Props`).
4. **Imports**: Absolute paths (`@/components/...`).
5. **Exports**: Named exports favored over default exports for components.

## 🔒 Security

1. **Inputs**: Zod validation for ALL user inputs and API schemas.
2. **Sanitization**: DOMPurify for any `dangerouslySetInnerHTML`.
3. **Headers**: Security headers configuration in `next.config.mjs`.
