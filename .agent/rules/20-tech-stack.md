---
trigger: always_on
priority: high
---

# 20-tech-stack.md — Core Engineering

## 🏗️ The Stack

- **Framework**: Next.js 14+ (App Router - currently 16.1.6). NÃO utilizar diretório pages/.
- **Motor 3D**: React Three Fiber (R3F) v8+ com Three.js r160+. Componentes DEVEM ser "use client".
- **Backend**: Supabase (PostgreSQL 15+). Utilizar @supabase/ssr.
- **Hosting**: Firebase Hosting (via webframeworks experiment).
- **Styling**: Tailwind CSS v4.
- **State**: Zustand (Global), React Context (Compound Components).
- **Architecture**:
  - Dados no Servidor (Server Actions/Components).
  - Interatividade e 3D no Cliente.
  - Loops R3F via Zustand para performance.

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
