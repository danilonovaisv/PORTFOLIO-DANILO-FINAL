---
description: Fluxo de verificação de integridade e deploy de produção no Firebase Hosting com validação prévia do Next.js App Router.
---

# Deploy para Firebase Hosting

1. Recupere o contexto base para validar os requisitos arquiteturais antes do envio.
2. Realize a validação estrita de tipos do TypeScript em toda a aplicação para prevenir regressões silenciosas:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsc --noEmit`
3. Verifique o linting e a formatação do Tailwind CSS, garantindo que não existam conflitos de estilo ou classes inválidas:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/next lint`
4. Limpe o cache interno e inicie o build de produção do Next.js:
   `// turbo rm -rf .next && /Users/danilonovais/.local/bin/node node_modules/.bin/next build`
5. Valide a renderização híbrida em `@src/app` certificando-se de que as rotas estáticas foram geradas com sucesso.
6. Execute o deploy da aplicação utilizando o Firebase CLI autenticado:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/firebase deploy --only hosting`
7. Em caso de falha na geração do build ou no deploy, reverta as mudanças e invoque `/log-error`.
