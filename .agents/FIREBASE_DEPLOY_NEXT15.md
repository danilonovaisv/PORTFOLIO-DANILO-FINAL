# Deploy Firebase Estavel (Next 15)

Este projeto usa `hosting.frameworksBackend` no Firebase. Para reduzir falhas de deploy:

- Use `Next 15.x` (pinado no `package.json`).
- Use `Node 20` no ambiente local.
- Use `firebase-tools` mais recente no momento do deploy.

## 1) Preparar ambiente

```bash
node -v
```

Se nao estiver em `v20.x`, troque via `nvm`:

```bash
nvm install 20
nvm use 20
```

Atualize dependencias apos o pin:

```bash
pnpm install
```

## 2) Validar projeto antes do deploy

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run test:e2e
```

## 3) Deploy recomendado (ordem)

1. Deploy do codebase SSR principal:

```bash
npx -y firebase-tools@latest deploy --only functions:modern_ssr --debug
```

2. Deploy do Hosting (frameworks backend):

```bash
npx -y firebase-tools@latest deploy --only hosting --debug
```

## 4) Se travar em `BUILD IN_PROGRESS`

- Abra o link do Cloud Build que aparece no log e verifique erro de build.
- Rode novamente somente hosting:

```bash
npx -y firebase-tools@latest deploy --only hosting --debug
```

- Se houver erro de parser (`stream-json`), confirme:
  - Node local em `v20.x`
  - `firebase-tools@latest`
  - `next` realmente em `15.x`

## 5) Comandos uteis de diagnostico

```bash
npx -y firebase-tools@latest --version
cat firebase.json
cat package.json | rg '"next"|firebase-tools'
```

## 6) Observacoes

- `deploy --only functions` sem filtrar codebase pode falhar se `chatbot/` estiver incompleto.
- Prefira `functions:modern_ssr` para deploy isolado do portfolio.
