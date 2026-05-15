---
description: Fluxo de Trabalho de QA (Quality Assurance)
---

# Fluxo de Trabalho de QA (Quality Assurance)

Quando o utilizador digitar `/qa-pipeline` no chat:

1. Invoque as skills `frontend-specialist` e `spectral-artist`.
2. Analise os componentes dentro de `src/components/canvas/` em busca de fugas de memória (memory leaks) e falhas de descarregamento de texturas.
3. Inicie um subagente de terminal para correr o comando de linting (`/Users/danilonovais/.local/bin/node ./node_modules/.bin/next lint`).
4. Caso encontre erros ou avisos, sugira e aplique as correções automaticamente.
5. Gere um Artefato (Walkthrough) com o resumo do estado da performance do R3F e os resultados do linting.
