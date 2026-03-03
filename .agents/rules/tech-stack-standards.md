# TECH STACK & ARCHITECTURE STANDARDS

## 🏗️ The "Zero-Deploy" Philosophy

- **Princípio**: O código é o container; o Supabase é o conteúdo.
- **Regra Dura**: É proibido hardcodar textos, títulos ou links no React. Tudo deve vir do banco.

## ⚡ Realtime Strategy

1. **Server Component**: Fetch inicial (SSR) para SEO.
2. **Client Component**: Hidratação + Subscription (`useRealtimeAssets`).
3. **SLA**: Atualizações no Admin devem refletir na UI em < 2s sem refresh.

## 🧩 3-Layer Execution Model (Para o Agente)

1. **Layer 1 (Contexto)**: Ler `.context/` para entender o "O Que".
2. **Layer 2 (Orquestração)**: Planejar a execução e escolher ferramentas.
3. **Layer 3 (Determinística)**: Usar scripts em `src/lib/` ou `scripts/` para execução confiável. Evitar lógica complexa "ad-hoc".

## 📦 Assets

- **Estáticos (Build)**: `public/` (apenas logos fixos).
- **Dinâmicos (Content)**: Supabase Storage (`portfolio-assets`, `admin-uploads`).

## 🛠️ Debugging Protocols (Standard Workflows)

- **Erro de Realtime**: Primeiro, verifique se a tabela está na publicação `supabase_realtime`. Segundo, valide as políticas RLS.
- **Erro de Deploy Firebase**: Verifique se `firebase experiments:enable webframeworks` está ativo e se o `node version` no `package.json` corresponde à runtime do Google Cloud Functions.
- **Erro Visual R3F**: Injete `<Stats />` e verifique vazamento de memória (geometrias não descartadas).

## 💻 Tech Stack Specifics

- **Framework**: Next.js 14+ (App Router). NÃO utilizar `pages/`.
- **Motor 3D**: React Three Fiber (R3F) v8+ com Three.js r160+.
  - *Restrição*: Componentes R3F (`<Canvas>`, `<Mesh>`) DEVEM ser Client Components ("use client").
- **State**: Zustand (Global), React Context (Compound Components).
