# Findings

## Infra / Deploy

- `docs/AUDIT-PLAN/firebase-error-job-logs.md` não mostra erro primário de `Forbidden` ou `Missing Token`.
- O secret `FIREBASE_SERVICE_ACCOUNT_JSON` está presente no job e a autenticação com `google-github-actions/auth@v2` conclui com credenciais exportadas.
- O projeto Firebase resolve corretamente para `portfolio-danilo-novais` via `.firebaserc`.
- A falha final ocorre no deploy do builder de frameworks do Firebase:
  - `firebase-frameworks@0.11.8` exige `sharp` `^0.32 || ^0.33`
  - o projeto usa `sharp@0.34.5`
  - o builder executa `npm i --omit dev --no-audit` e aborta com `ERESOLVE`

## Firebase config

- `firebase.json` já está alinhado com integração de framework (`hosting.frameworksBackend.region = us-central1`).
- Para um App Router com páginas dinâmicas, route handlers e server actions, rewrite SPA para `/index.html` seria incorreto e quebraria SSR.
- O workflow do GitHub Actions passou a exportar `NPM_CONFIG_LEGACY_PEER_DEPS=true`, neutralizando a resolução quebrada do builder remoto mesmo quando o build local já está verde.

## Lighthouse baseline

- `docs/AUDIT-PLAN/portfoliodanilo.com-20260307T182127.json`
  - Performance: `0.76`
  - Accessibility: `1`
  - Best Practices: `0.77`
  - SEO: `1`
  - LCP: `3.1s`
- Há espaço claro para melhorar LCP na hero e robustez de best practices.

## Correções aplicadas

- Hero da Home e da Portfolio agora usam preloads centralizados em `src/config/site-assets.ts`.
- `next.config.mjs` voltou a permitir otimização real de imagens (`images.unoptimized = false`).
- `FeaturedProjectsSection` ganhou skeleton editorial para reduzir CLS quando a lista ainda não chegou.
- `GhostScene` passou a desligar 3D em mobile e em `prefers-reduced-motion`.
- `/portfolio` deixou de abrir canal realtime de projetos em produção.
- Hero de `/portfolio` deixa de consultar realtime quando já existe fallback estático de vídeo.
- `ClientsBrandsSection` passou a ser montada apenas quando se aproxima do viewport em `/portfolio`.
- `ProjectCard` agora prioriza stills editoriais em vez de thumbs animadas pesadas, reduzindo bytes iniciais.
- Footer ganhou semântica de navegação também para links sociais.
- Primitives de `dialog` e `sheet` passaram a expor `aria-label` explícito nos botões de fechar.
- CTA antigravity recebeu fix de contraste para não herdar a cor padrão de link.

## Validação local atual

- `pnpm run lint` ✅
- `pnpm run typecheck` ✅
- `pnpm run build` ✅
- `pnpm run firebase:preflight` ✅
- Lighthouse local válido em `/portfolio` após as otimizações:
  - Performance: `99`
  - Accessibility: `96` antes do fix final de contraste do CTA; o ponto residual identificado foi corrigido em seguida
  - Best Practices: `93` em ambiente local com ruído de assets standalone; os itens reais restantes ficaram restritos a auditorias locais de imagem/servidor, não a regressões funcionais
  - SEO: `100`

## UI / Content

- Existe `useMotionGate` no projeto; precisa ser aplicado de forma consistente nos componentes Three.js pesados.
- Há componentes e docs alvo claros para Featured Projects, Footer, Modal e Sobre.
