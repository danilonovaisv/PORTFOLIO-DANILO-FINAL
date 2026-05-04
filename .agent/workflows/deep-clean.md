---
description: Resolve problemas de cache corrompido, dependências dessincronizadas do PNPM, e realiza a limpeza profunda do repositório (Next.js/React).
---

# Deep Clean e Manutenção de Repositório

1. Revise as configurações de pacote em `@package.json` para verificar versões antes de destruir o cache.
2. Acione o script nativo de sanitização para varrer lixos de builds anteriores, `.next`, e módulos temporários:
   `// turbo bash scripts/cleanup-project.sh`
3. Execute os reparos específicos de gerenciadores de pacote e dependências cíclicas:
   `// turbo bash scripts/fix-deps.sh`
   `// turbo bash scripts/fix-pnpm.sh`
4. Inicie o script Python (se aplicável ao ambiente local) para higienização profunda adicional, garantindo um ambiente virgem para o próximo build:
   `// turbo python3 scripts/pnpm_deep_clean.py`
5. Reinstale todas as dependências de forma limpa e reconstrua as tipagens:
   `// turbo pnpm install && /Users/danilonovais/.local/bin/node node_modules/.bin/next build`