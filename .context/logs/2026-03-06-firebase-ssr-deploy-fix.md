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

---

## Complemento — Firebase Frameworks rebuild contaminado por `NODE_ENV` (2026-03-06)

### Contexto

Depois da correção do lockfile, o run mais recente do GitHub Actions deixou de falhar em `npm ci` e passou a quebrar no build remoto do Next.js dentro do Firebase Frameworks:

- `Error occurred prerendering page "/_global-error"`
- `TypeError: Cannot read properties of null (reading 'useContext')`
- seguido de `ENOENT: .../.next/export-marker.json`

### Causa raiz

O step `Deploy to Firebase` exportava variáveis globais destinadas ao workaround do lockfile:

- `NODE_ENV=development`
- `NPM_CONFIG_PRODUCTION=false`
- `NPM_CONFIG_INCLUDE=dev,optional,peer`
- `NPM_CONFIG_OMIT=''`
- `NPM_CONFIG_LEGACY_PEER_DEPS=true`

O Firebase Frameworks ignora o build local customizado e executa um novo `next build` remotamente. Com isso, o build remoto passou a rodar com `NODE_ENV=development`, exibindo o aviso de `non-standard NODE_ENV` e reproduzindo localmente a quebra de prerender em `/_global-error`.

### Correção aplicada

Arquivo: `.github/workflows/firebase-deploy.yml`

1. Removidas do `env:` do step de deploy todas as variáveis globais de npm/Node que vazavam para o builder remoto.
2. Mantida a geração explícita dos lockfiles temporários via flags nos comandos:
   - `npm install --package-lock-only --ignore-scripts --legacy-peer-deps --include=dev --include=optional --include=peer`
3. Preservado apenas `GOOGLE_APPLICATION_CREDENTIALS` e `NO_UPDATE_NOTIFIER` no ambiente do deploy.

### Validação realizada

- `pnpm exec next build` conclui com sucesso em ambiente padrão.
- `NODE_ENV=development pnpm exec next build` reproduz a falha remota em `/_global-error`.
- Portanto, a correção correta é isolar o workaround do lockfile e impedir que `NODE_ENV=development` contamine o build remoto do Firebase Frameworks.

---

## Complemento — limpeza do workflow após estabilização (2026-03-06)

### Contexto

Depois que o deploy voltou a passar, o workflow ainda mantinha contenções temporárias que escondiam regressões reais:

- step `🔒 Ensure pnpm-lock.yaml` criando lockfile fake
- `pnpm install --no-frozen-lockfile --ignore-scripts`
- `continue-on-error: true` em `lint` e `typecheck`

### Correção aplicada

Arquivo: `.github/workflows/firebase-deploy.yml`

1. Removido o step que criava `pnpm-lock.yaml` temporário.
2. Restaurado o install determinístico com:
   - `pnpm install --frozen-lockfile --ignore-scripts`
3. Reativados `lint` e `typecheck` como gates obrigatórios.
4. Mantido o workaround realmente necessário apenas no step de deploy:
   - geração explícita de `package-lock.json` para o builder remoto do Firebase Frameworks

### Validação realizada

- `pnpm run lint` conclui com sucesso.
- `pnpm run typecheck` conclui com sucesso.
- `pnpm run build` conclui com sucesso.
- YAML do workflow validado localmente com parser nativo (`ruby` + `YAML.load_file`).

### Observações sobre mudanças locais fora do fix

Durante a limpeza, foram identificadas alterações locais não relacionadas ao deploy e preservadas sem modificação:

- `.npmrc`
- `pnpm-lock.yaml` removido localmente
- `src/app/template.tsx`
- `src/components/layout/MotionWrapper.tsx`
- `report.html`

Classificação:

- `template.tsx` e `MotionWrapper.tsx`: provável trabalho em progresso para contornar crash de HMR/Turbopack.
- `report.html`: artefato gerado de auditoria local.
- `.npmrc` e deleção local de `pnpm-lock.yaml`: estado local de ambiente, não parte desta correção de CI.

---

## Complemento — regressão por remoção do lockfile versionado (2026-03-06)

### Contexto

Após o workflow voltar a ficar verde, runs posteriores falharam de novo. Os artefatos em `docs/AUDIT-PLAN/` mostraram duas falhas correlatas:

1. `actions/setup-node@v4` abortando em `Setup Node.js` com:
   - `Some specified paths were not resolved, unable to cache dependencies.`
2. relatório de resolução npm registrando novamente:
   - `firebase-frameworks@0.11.8`
   - `peerOptional sharp@"^0.32 || ^0.33"`
   - conflito com `sharp@0.34.5`

### Causa raiz

O commit `2ee8491d1` removeu `pnpm-lock.yaml` do repositório e reduziu `.npmrc` para uma versão sem `legacy-peer-deps=true`.

Efeitos:

- sem `pnpm-lock.yaml`, o step `Setup Node.js` não consegue resolver `cache-dependency-path`;
- sem `legacy-peer-deps=true`, o builder npm do Firebase volta a expor o conflito `firebase-frameworks` vs `sharp`.

### Correção aplicada

Arquivos:

- `.npmrc`
- `pnpm-lock.yaml`

1. Restaurado `pnpm-lock.yaml` a partir do último commit verde conhecido:
   - `ccc597336ec34f6193c9129dcf38af0fc9d8841f`
2. Reintroduzido `legacy-peer-deps=true` no `.npmrc` atual sem alterar a estratégia local de `store-dir`.

### Validação realizada

- `CI=true pnpm install --frozen-lockfile --ignore-scripts` conclui com sucesso.
- `pnpm run lint` conclui com sucesso.
- `pnpm run typecheck` conclui com sucesso.
- `pnpm run build` conclui com sucesso.
- `cd functions && pnpm run build` conclui com sucesso.

### Interpretação

Esta regressão não foi causada pelo endurecimento do workflow. Ela foi introduzida depois, pela remoção do lockfile versionado e pela deriva de `.npmrc` em relação ao estado validado em produção.
