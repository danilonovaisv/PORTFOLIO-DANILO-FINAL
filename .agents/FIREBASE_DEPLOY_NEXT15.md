# Deploy Firebase Estavel (Frameworks Backend)

Este repositório usa `hosting.frameworksBackend` no Firebase.

## Estado atual do projeto

- O projeto está em `Next 16.x`.
- O adaptador preview do Firebase Hosting ainda espera artefatos compatíveis com o fluxo legado de build.
- Com `next build` em Turbopack, o deploy pode falhar com:

```text
ENOENT: no such file or directory, open '.next/export-marker.json'
```

## Regra obrigatória

O build de produção deve rodar com `next build` normal.

Neste repositório, o Turbopack pode continuar habilitado no `next.config.mjs`, mas o Firebase precisa de um artefato legado adicional. Isso é resolvido pelo adapter customizado em [`scripts/firebase-next-adapter.cjs`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/scripts/firebase-next-adapter.cjs), configurado em [`next.config.mjs`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/next.config.mjs).

O detalhe crítico é de fase: `adapterPath` deve existir apenas em `PHASE_PRODUCTION_BUILD`. Se ele ficar ativo em `production-server`, o runtime do Firebase pode falhar com `Cannot find module '/workspace/scripts/firebase-next-adapter.cjs'`.

Script esperado no `package.json`:

```json
{
  "scripts": {
    "prebuild": "pnpm run validate-env && node scripts/generate-build-info.cjs",
    "build": "next build"
  }
}
```

O adapter escreve `.next/export-marker.json` ao final do build quando o Next/Firebase não o gera automaticamente.

## 1) Preparar ambiente

```bash
node -v
npx -y firebase-tools@latest --version
```

Use `Node 20.x` localmente.

## 2) Validar antes do deploy

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

Verifique se o build gerou:

```bash
test -f .next/export-marker.json && echo OK
```

## 3) Deploy recomendado neste projeto

Como o SSR principal é gerenciado pelo `frameworksBackend`, o deploy canônico é:

```bash
npx -y firebase-tools@latest deploy --only hosting --project portfolio-danilo-novais --debug
```

## 4) Observação importante sobre `functions:modern_ssr`

O filtro abaixo está **obsoleto neste repositório**:

```bash
npx -y firebase-tools@latest deploy --only functions:modern_ssr --debug
```

Hoje não existe função com esse filtro no `firebase.json` atual.

## 5) Se o deploy falhar

1. Confirme que o adapter está configurado:

```bash
rg "adapterPath|turbopack" next.config.mjs
```

2. Confirme a existência do arquivo:

```bash
ls .next/export-marker.json
```

3. Rode novamente o deploy de hosting:

```bash
npx -y firebase-tools@latest deploy --only hosting --project portfolio-danilo-novais --debug
```

## 6) Diagnóstico rápido

```bash
cat firebase.json
cat package.json | rg '"build"|\"prebuild\"|\"next\"'
sed -n '1,120p' next.config.mjs
find .next -maxdepth 1 -name 'export-marker.json'
```
