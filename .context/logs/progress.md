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

## 2026-04-05

- `src/components/sobre/3d/GhostModel.tsx` foi migrado de ghost procedural para GLB tipado com `useGLTF` + `Merged`.
- O layout do modelo 3D passou a seguir offsets fixos por parte: corpo/olhos em `y=1.6`, faixa em `y=2.4` e chapéu em `y=3`, todos com rotação `[-Math.PI / 2, 0, 0]`.
- O carregamento foi alinhado ao asset público `/models/ghost-transformed.glb` com `preload` ativo para evitar pop-in.
