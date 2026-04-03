# Task Plan

## Goal

Recuperar o deploy no Firebase Hosting para o portfólio Next.js e elevar Lighthouse para `Perf > 95`, `A11y 100`, `Best Practices 100`, `SEO 100`, preservando o Ghost Design System.

## Phases

| Phase                        | Status      | Notes                                                                                |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| 1. Scan + evidence capture   | completed   | Logs, Firebase config, workflow, Lighthouse e docs de referência consolidados        |
| 2. Firebase deploy fix       | completed   | Builder remoto alinhado com `legacy-peer-deps`; preflight local passou               |
| 3. Performance fixes         | completed   | Preloads, skeleton, defer below-the-fold, image tuning e motion governance aplicados |
| 4. A11y/UI fixes + docs sync | completed   | Contraste, semântica, labels, typo, `.context` e auditoria atualizados               |
| 5. Validation                | in_progress | lint, typecheck e build ok; deploy Firebase em confirmação final                     |
| 6. Fix MCP "npx" path error  | completed   | MCP wrapper and servers standardized; npx shim optimized for pnpm fallback            |

## Decisions

- Seguir `firebase.json` com `frameworksBackend` para App Router dinâmico; não forçar rewrite para `/index.html` porque o projeto usa SSR/route handlers.
- Priorizar correção do `firebase-frameworks` no workflow antes de qualquer ajuste mais amplo de infra.
- Aplicar mudanças mínimas e locais em componentes de hero/featured/footer/modal para evitar regressão visual.

## Errors Encountered

| Error                                                | Attempt | Resolution                                                                                                         |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| Firebase deploy quebra no builder                    | 1       | Resolvido com `legacy-peer-deps=true` no `.npmrc` e env do workflow para o builder remoto do Firebase              |
| `fetchPriority` em `<video>` quebra `tsc`            | 1       | Removido; preload de vídeo mantido por metadata/page preloads                                                      |
| Lighthouse local em standalone gerou 404 artificiais | 1       | Auditoria válida mantida em servidor de produção local; standalone completo ficou apenas como verificação auxiliar |
