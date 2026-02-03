---
description: Safe Firebase Deploy Workflow
---

Este workflow realiza um "Dry Run" e valida a build para evitar falhas de SSR em produção.

Verificação de Motores (Engines)

O agente lê o package.json e valida se a versão do Node é 18 ou 20.

Se houver mismatch, o agente deve corrigir o package.json antes de prosseguir.

Clean Build

Executa rm -rf.next (ou o diretório configurado como distDir).

Executa npm run build.

Validação de Saída SSR

Verifica a existência de functions/.next ou do diretório configurado no firebase.json.

O agente confirma se o entrypoint do servidor (ex: server.js ou handler da function) está presente.

Deploy Com Verificação

Executa firebase deploy --only hosting,functions.

Após o deploy, o agente USA o Browser Subagent para abrir a URL do portfólio e verificar se a página carrega ou se retorna erro 500.

Se retornar 500, o agente lê os logs via firebase functions:log e tenta o Self-Healing automaticamente.
