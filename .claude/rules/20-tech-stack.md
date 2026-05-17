---
trigger: always_on
priority: high
---

# 20-tech-stack.md — Core Engineering

## 🏗️ The Stack

- **Framework**: Next.js 14+ (App Router - currently 16.1.6). NÃO utilizar diretório pages/.
- **Animação & 3D:** Framer Motion, React Three Fiber (R3F), @react-three/drei, Three.js.
- **Backend & Infraestrutura:** Supabase Storage (assets) e Firebase Hosting.

## Padrões de Código e Segurança
- Utilize Server Components por defeito. Client Components (`"use client"`) apenas para interatividade, hooks de estado e canvas 3D.
- Nunca exponha chaves de API. Variáveis do Supabase e Firebase devem usar `.env.local`.
- O design segue o princípio "Ghost": interfaces imersivas, motion como linguagem e WebGL como atmosfera. Otimize modelos 3D e texturas para não bloquear a thread principal.

## Execução no Terminal
- O ambiente de desenvolvimento utiliza um caminho específico para o binário do Node.js. Para evitar erros de "command not found" nas execuções autónomas no terminal, garanta que os scripts utilizam o caminho absoluto: `/Users/danilonovais/.local/bin/node`.
- Aplique o formato de marcação `DO.MO` inalterado sempre que referenciar a identidade visual associada, garantindo a sua consistência matemática na expansão de wordmarks..
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
