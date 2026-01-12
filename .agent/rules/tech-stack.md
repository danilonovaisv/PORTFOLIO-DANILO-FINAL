# Tech Stack Oficial

Este documento define a "Fonte da Verdade" tecnológica do projeto. Agentes devem consultar este arquivo antes de sugerir dependências.

## Core
- **Framework:** Next.js 16.1.1+ (App Router)
- **Engine:** React 19.2.3+ (Utilizar features modernas como `use`, `Actions`, etc., com cautela se ainda experimentais, mas preferir abordagem funcional)
- **Linguagem:** TypeScript 5.9+ (Strict Mode Obrigatório)

## Estilização & UI
- **CSS:** Tailwind CSS 4.x (Atentar para mudanças na configuração e imports nativos de CSS)
- **Motion:** Framer Motion 12.x + Motion (ex-Motion One)
- **3D:** React Three Fiber 9.x + Drei

## Qualidade & Testes
- **Linter:** ESLint 9 (Flat Config)
- **Formatter:** Prettier 3.x
- **Test Runner:** Jest (Vitest foi deprecado para este projeto para evitar dualidade)
- **E2E/Browser:** (Não configurado explicitamente, usar Browser Agent para validação visual)

## Infraestrutura
- **Hosting:** Firebase Hosting
- **Backend:** Firebase Functions / Supabase (para Storage/Dados se aplicável)
- **Package Manager:** pnpm
