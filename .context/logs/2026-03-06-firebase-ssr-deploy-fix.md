# Firebase SSR Deploy Fix — 2026-03-06

## Contexto

Pipeline de deploy para Firebase Hosting + frameworks backend SSR falhando durante o build remoto da função `ssrportfoliodanilonovai`.

## Causa raiz

O Cloud Build do Firebase executa `npm` no pacote enviado ao frameworks backend e não herda `NPM_CONFIG_LEGACY_PEER_DEPS` configurado apenas no workflow local do GitHub Actions.

Isso expôs conflito de peer dependencies:

- `firebase-frameworks@0.11.8` exige `sharp@^0.32 || ^0.33` como peer optional
- O projeto resolve `sharp@0.34.5` por dependência direta e por `next@16.1.6`

## Correção aplicada

1. Adicionado `legacy-peer-deps=true` ao `.npmrc` da raiz.
2. Adicionada checagem correspondente no `scripts/firebase-preflight.sh`.
3. Registrado o achado em `docs/AUDIT_PENTEST.md`.

## Validação esperada

- `npm install --package-lock-only --ignore-scripts` falha sem `legacy-peer-deps`
- O mesmo comando passa quando a configuração está presente
- `firebase deploy --only hosting,functions` conclui o build SSR sem `ERESOLVE`

---

## Complemento — CI lockfile mismatch (2026-03-06)

### Contexto

Após a correção de `ERESOLVE`, o workflow do GitHub Actions falhou em outro ponto: `npm ci` no Cloud Build exigiu lockfile em sincronia total e reportou centenas de entradas ausentes (`Missing: ... from lock file`), incluindo `jest@30.2.0`.

### Causa raiz

O lockfile temporário gerado no workflow não estava garantindo explicitamente a inclusão do grafo completo (`dev`, `optional`, `peer`) em ambiente CI, enquanto o builder remoto executava `npm ci` completo.

### Correção aplicada

Arquivo: `.github/workflows/firebase-deploy.yml`

1. Comandos de geração de lockfile na raiz e em `functions/` atualizados para:
   - `npm install --package-lock-only --ignore-scripts --legacy-peer-deps --include=dev --include=optional --include=peer`
2. Env vars do step de deploy reforçadas para não omitir dependências:
   - `NODE_ENV=development`
   - `NPM_CONFIG_PRODUCTION=false`
   - `NPM_CONFIG_INCLUDE=dev,optional,peer`
   - `NPM_CONFIG_OMIT=''`

### Resultado esperado

O Cloud Build deve deixar de falhar com `npm ci` por lock incompleto e seguir para atualização da função SSR normalmente.
