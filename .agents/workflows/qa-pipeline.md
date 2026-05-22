---
description: Fluxo de Trabalho de QA (Quality Assurance) com verificações Next.js 15+ e R3F
---

# Fluxo de Trabalho de QA (Quality Assurance)

Quando o utilizador digitar `/qa-pipeline` no chat:

1. Invoque as skills `frontend-specialist` e `spectral-artist`.
2. Analise os componentes dentro de `@src/components/canvas/` em busca de fugas de memória (memory leaks) e falhas de descarregamento de texturas usando o Chrome DevTools MCP.
3. Inicie um subagente de terminal para correr o comando de linting:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/next lint`
4. Avalie o impacto no bundle size gerado pelo Next.js 15+ e verifique erros de hidratação no servidor.
5. Caso encontre erros ou avisos, sugira e aplique as correções automaticamente.
6. Gere um Artefato (Walkthrough) com o resumo do estado da performance do R3F e os resultados do linting.
