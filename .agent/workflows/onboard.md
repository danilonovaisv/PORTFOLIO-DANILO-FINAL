---
description: Guia de integração para novos desenvolvedores, configuração de ambiente e arquitetura.
---

# /onboard - Team Onboarding & Setup

1. Explique a arquitetura do projeto resumindo `@.context/ARCHITECTURE.md` e os padrões de Design System em `@.context/GHOST-DESIGN-SYSTEM.md`.
2. Valide o ambiente local verificando o arquivo `.env.local` e as engines do Node/PNPM em `package.json`.
3. Instale as dependências e inicie o servidor de desenvolvimento:
   `// turbo pnpm install && pnpm run dev`
4. Execute o conjunto de testes de fumaça para garantir que o ambiente está íntegro:
   `// turbo pnpm test`
5. Sugira uma "Good First Issue" ou pequena melhoria em `@.context/active_state.md` para iniciar a contribuição.
