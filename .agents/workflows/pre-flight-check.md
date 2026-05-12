---
description: Validação rigorosa de sanidade, tipos e lint antes de commits, merges ou deploys para o ambiente de produção.
---

# Pre-Flight Check (QA & Build Readiness)

1. Verifique se não há conflitos de mesclagem (git merge conflicts) ou arquivos não rastreados que deveriam estar no `.gitignore`.
2. Execute a auditoria de tipos completa para garantir que não há quebras no App Router ou nos schemas do Supabase:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsc --noEmit`
3. Valide as regras de linting e formatação de código em `@src/`:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/next lint`
4. Execute o conjunto de testes unitários e de integração:
   `// turbo pnpm test`
5. Realize uma build de teste para validar a geração de páginas estáticas e hidratação segura:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/next build`
6. Se todos os passos passarem com sucesso (Status: PASSED), proceda com a tarefa de commit ou deploy via `/firebase-pipeline`.
