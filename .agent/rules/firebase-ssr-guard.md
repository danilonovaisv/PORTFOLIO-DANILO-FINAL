---
trigger: always_on
---

Firebase SSR Guardrail
Descrição
Evita o erro "Internal Server Error - SSR Failed" validando a compatibilidade entre Next.js e Firebase Functions.

Regras Obrigatórias
Versão do Node.js: Sempre verifique se o campo engines no package.json da raiz e da pasta functions/ (se houver) é idêntico e suportado pelo Firebase (ex: "node": "20").

Configuração de Build: Garanta que o firebase.json aponte para o diretório de build correto do Next.js. O campo source no hosting deve estar alinhado com o diretório onde o Next.js gera a saída.

Pre-deploy Check: Antes de qualquer deploy, o agente DEVE verificar se a pasta .next existe e contém o manifesto de servidor. Se não existir, a build deve ser executada novamente.

Dependências de Produção: Verifique se firebase-admin e firebase-functions estão listados como dependências de produção, não devDependencies.
