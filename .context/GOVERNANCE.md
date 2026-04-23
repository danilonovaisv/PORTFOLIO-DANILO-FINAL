# ⚖️ Projeto Ghost - GOVERNANCE

Este documento consolida as normas de codificação, padrões técnicos e convenções da equipe para o **Portfólio Danilo Novais**.

## 🛠️ Padrões de Codificação (Coding Style)

### 1. Princípios Core
- **Functional Components**: Utilize exclusivamente componentes funcionais com hooks.
- **Strict Typing**: O uso de TypeScript é obrigatório. Prefira `interface` para definições de props e tipos explícitos para estados complexos.
- **Atomic Commits**: Siga o padrão de Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`).

### 2. Padrões Next.js (v14+)
- **App Router**: Utilize a estrutura de diretórios `src/app/**`.
- **Server Components (RSC)**: Componentes de servidor por padrão. Use `"use client"` apenas quando houver necessidade de interatividade, hooks de cliente ou WebGL/R3F.
- **Absolute Imports**: Sempre utilize o prefixo `@/` para imports.

### 3. Estilização e Movimento
- **Tailwind CSS**: Utilize classes utilitárias. Proibido o uso de `inline styles`, exceto em casos críticos de performance dinâmica.
- **Framer Motion**: Respeite o token **Ghost Easing** `[0.22, 1, 0.36, 1]`.
- **Z-Index**: Siga a hierarquia definida em `GHOST-DESIGN-SYSTEM.md`.

### 4. 3D & Performance (WebGL)
- **R3F (React Three Fiber)**: Otimize loops. Evite alocações de memória dentro de `useFrame`.
- **Asset Loading**: Utilize `Suspense` e preloading para todos os modelos GLB e texturas pesadas.

## 🤝 Convenções da Equipe
- **Documentação**: Documente funções públicas e hooks complexos.
- **Socratic Gate**: Se uma tarefa for ambígua, pare e esclareça os requisitos antes da implementação.
- **Zero Placeholder Policy**: Nunca utilize Lorem Ipsum ou imagens de placeholder genéricas. Utilize assets reais do Supabase.

---
*Última atualização: Abril 2026*
