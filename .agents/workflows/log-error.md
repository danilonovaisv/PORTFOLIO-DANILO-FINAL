---
description: Intercepta quebras no fluxo, extrai stack traces e alimenta o Error Journal global para prevenir reincidência de bugs.
---

# Log de Erros e Aprendizado Contínuo

1. Capture o erro atual, extraindo o stack trace completo e o contexto do componente/função afetado.
2. Analise se o erro é recorrente consultando o histórico em `@ERRORS.md`.
3. Registre a nova ocorrência seguindo o formato padrão do Ghost System em `ERRORS.md`:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/log-error-entry.ts`
4. Se o erro for uma falha de agente (alucinação ou erro de lógica), atualize as regras em `@.agent/rules/error-logging.md` para prevenir repetição.
5. Proponha uma solução técnica imediata e valide a correção com `/tdd-feature`.
