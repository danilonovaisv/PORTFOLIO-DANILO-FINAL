---
description: Workflow para garantir deploys seguros.
---

# Deploy Guard Workflow

Este workflow deve ser acionado sempre que o usuário pedir /deploy ou Prepare para produção.

Passo 1: Lint & Type Check

Execute npm run lint.

Execute npm run type-check (ou tsc --noEmit).

Se houver erros, PARE e liste os erros. Corrija-os se solicitado.

Passo 2: Auditoria de Build

Execute npm run build.

Analise o tamanho do bundle. Se algum chunk JS for maior que 200kb, avise o usuário e sugira Code Splitting.

Passo 3: Smoke Test Visual

Use o navegador para abrir <http://localhost:3000>.

Verifique se a "Home" e a página "Projetos" carregam sem erros no console (F12).

Passo 4: Conclusão

Se tudo passar, confirme: "O projeto está pronto para deploy. Posso prosseguir com o commit?"
