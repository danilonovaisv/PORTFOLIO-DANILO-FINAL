# Fluxo de Trabalho de Deploy
Quando o utilizador digitar `/deploy-firebase` no chat:

1. Execute a build de produção invocando `/Users/danilonovais/.local/bin/node ./node_modules/.bin/next build`.
2. Verifique se ocorreram erros de compilação de TypeScript no processo.
3. Se a build for bem-sucedida, prepare o deploy via Firebase Hosting.
4. Pausar e solicitar aprovação (Request Review) ao utilizador antes de executar `firebase deploy`.
