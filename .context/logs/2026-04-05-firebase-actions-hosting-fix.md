# Firebase Actions + Hosting Fix — 2026-04-05

## Contexto

O workflow `Firebase Deploy` falhou nos runs de `2026-04-05` antes mesmo de instalar dependências ou executar build.

## Causa raiz

O arquivo `.github/workflows/firebase-deploy.yml` exigia o secret `FIREBASE_PROJECT_ID`, mas o repositório já possui:

- projeto padrão definido em `.firebaserc` como `portfolio-danilo-novais`;
- workflow de preview de PR usando o mesmo projeto explicitamente;
- service account nomeado como `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS`.

Ou seja, o job principal dependia de um segredo redundante e inconsistente com o restante da configuração.

## Correção aplicada

Arquivo: `.github/workflows/firebase-deploy.yml`

1. `FIREBASE_PROJECT_ID` passou a ser definido diretamente como `portfolio-danilo-novais`.
2. A validação de segredos agora exige apenas `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS`.
3. A escrita do JSON de credenciais foi alinhada ao mesmo secret do workflow de preview.
4. O step de deploy passou a usar `--project "${{ env.FIREBASE_PROJECT_ID }}"`.

## Validação executada

1. Inspeção do log do GitHub Actions confirmou falha no step `Validate Firebase secrets`.
2. `gh run view` confirmou que o job morria antes de `pnpm install`.
3. `pnpm run build` com Node 20 concluiu com sucesso localmente.
4. `firebase deploy --only hosting --project portfolio-danilo-novais` iniciou corretamente e avançou até o Cloud Build do SSR, confirmando autenticação, permissão e seleção de projeto válidas.

## Observação operacional

Em projetos Next.js com Firebase Frameworks, `deploy --only hosting` ainda aciona a function SSR pinada ao site. Isso é esperado para apps com rotas dinâmicas e otimização de imagem.
