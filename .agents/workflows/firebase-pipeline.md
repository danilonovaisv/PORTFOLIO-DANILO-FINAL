---
description: Pipeline rigoroso de validação de ambiente, preflight e preparação do bundle antes de enviar o projeto para o Firebase Hosting.
---

# Firebase Deployment Pipeline

1. Inicie o processo executando o `/pre-flight-check` para garantir que o código está estável.
2. Invoque as políticas de segurança do projeto lendo `@.agent/rules/30-execution-protocol.md`.
3. Garanta que todas as variáveis de ambiente (.env) necessárias para produção estejam válidas e não-comprometidas:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/validate-env.ts`
4. Valide o contrato de deploy do Firebase (firebase.json / firebaserc) checando se a configuração de hospedagem está correta:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/validate-deploy-config.ts`
5. Acione a bateria de preflight, que irá preparar o App Router para exportação estática/dinâmica e checar o ambiente:
   `// turbo bash scripts/firebase-preflight.sh`
6. Prepare o bundle final para o hosting:
   `// turbo bash scripts/prepare-hosting.sh`
7. Execute a implantação final chamando o script de deploy automatizado (após aprovação do usuário):
   `// turbo bash scripts/deploy.sh`
8. Se qualquer etapa falhar (erro no shell ou quebra de build), intercepte o erro e chame o workflow suplementar `/log-error`.