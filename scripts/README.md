# Scripts – guia rápido

## Fluxo canônico de deploy

- `pnpm run deploy` → chama `predeploy` (audit de assets) e `scripts/deploy.sh`
- `scripts/deploy.sh`: força Node 22 via nvm, roda build, prepara `deploy-public`, e faz `firebase deploy --only hosting,functions:ssr_modern --project portfolio-danilo-novais`.

## Prep de assets

- `predeploy` (package.json): `python3 scripts/audit_assets.py`
- `scripts/prep-deploy.ts`: sincroniza assets a partir de `assets.json`/`assets-about.json` (via `sync-site-assets.ts`). Use se quiser forçar sync antes do deploy.
- `scripts/prepare-hosting.sh`: copia `public/` e `.next/static` para `deploy-public/_next/static` (invocado pelo deploy canônico).

## Qualidade

- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:e2e`

## Scripts legados (arquivados)

Movidos para `scripts/archive/` para evitar confusão:

- `deploy-with-env.sh`, `deploy-with-tracking.mjs`, `run-deploy.sh`, `test-and-deploy.sh`, `run-full-test-and-deploy.ts`
- Use apenas como referência; não são parte do fluxo canônico.

## Notas

- Requer nvm com Node 22 instalado.
- Firebase CLI precisa estar autenticado (`firebase login`) e com projeto `portfolio-danilo-novais` acessível.
