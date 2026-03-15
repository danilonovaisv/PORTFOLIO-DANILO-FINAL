# Progress

## 2026-03-07

- Iniciado escaneamento técnico do repositório.
- Confirmado estado do worktree: apenas `docs/AUDIT-PLAN/` está sem rastreamento.
- Logs do Firebase analisados; causa raiz documentada.
- `firebase.json`, workflow de deploy, `.firebaserc`, `next.config.mjs`, `package.json`, `site-assets.ts` e hero components inspecionados.
- Aplicado fix de compatibilidade do builder Firebase via `.npmrc` + workflow.
- Implementados preloads de hero e manifesto por `SITE_ASSET_PRELOADS`.
- `FeaturedProjectsSection` recebeu skeleton editorial.
- `GhostScene` passou a respeitar `useMotionGate` também para fallback total de 3D.
- `/portfolio` passou a evitar realtime desnecessário em produção e a adiar a seção de marcas abaixo da dobra.
- `ProjectCard` passou a priorizar stills editoriais e compressão menor para reduzir bytes no grid.
- Footer, dialog e sheet receberam ajustes semânticos/a11y.
- Build, lint, typecheck e preflight do Firebase validados com sucesso.
