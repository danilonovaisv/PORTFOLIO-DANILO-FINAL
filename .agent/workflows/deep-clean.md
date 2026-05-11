---
description: Resolve problemas de cache corrompido, dependências dessincronizadas do PNPM, e realiza a limpeza profunda do repositório (Next.js/React).
---

# Deep Clean e Manutenção de Repositório

1. Revise as configurações de pacote em `@package.json` para verificar versões críticas antes de iniciar a limpeza.
2. Acione o script de sanitização para remover diretórios `.next`, `node_modules` e caches corrompidos:
   `// turbo bash scripts/cleanup-project.sh`
3. Execute reparos específicos no gerenciador de pacotes e resolva conflitos de `pnpm-lock.yaml`:
   `// turbo bash scripts/fix-pnpm.sh`
4. Reinstale todas as dependências utilizando o PNPM em modo "frozen-lockfile" para garantir determinismo:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/pnpm install --frozen-lockfile`
5. Realize um build de fumaça para validar que o ambiente foi restaurado com sucesso:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/next build`