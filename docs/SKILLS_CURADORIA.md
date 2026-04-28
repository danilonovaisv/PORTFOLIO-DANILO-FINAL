# Curadoria de Skills por Tipo de Tarefa

Data da curadoria: 2026-04-23

Este guia organiza as skills existentes para o projeto `PORTFOLIO-DANILO-FINAL`. A ideia nao e listar tudo: e escolher a combinacao certa para cada tipo de trabalho, evitando ruido e mantendo o padrao Ghost System.

## Base do Projeto

Stack detectada:

- Next.js 16 App Router, React 19 e TypeScript.
- Tailwind CSS 4, Radix UI, Motion/Framer Motion, GSAP e Lenis.
- WebGL com Three.js, React Three Fiber, Drei, Postprocessing e OGL.
- Supabase SSR, Supabase Storage, Postgres, Firebase Hosting e Firebase Admin.
- Jest, Testing Library, Playwright, scripts de auditoria e deploy.
- Contexto forte em `.context/`, `docs/`, `reports/` e `skills/`.

Fontes de skills encontradas:

- Skills do projeto: `skills/*/SKILL.md`.
- Skills globais: `/Users/danilonovais/.agents/skills/*/SKILL.md`.
- Skills Codex: `/Users/danilonovais/.codex/skills/*/SKILL.md`.

Validacao Context7 usada nesta curadoria:

- Next.js: `/vercel/next.js/v16.2.2`.
- React Three Fiber: `/pmndrs/react-three-fiber`.
- Supabase SSR: `/supabase/ssr`.

## Regra de Ouro

Para qualquer tarefa relevante neste repo, use esta ordem mental:

1. `PORTFOLIO-DANILO-FINAL` para padroes e fluxo do repositorio.
2. `.context/` correspondente a pagina ou sistema alterado.
3. `ghost-design` quando houver UI, motion, copy visual ou experiencia.
4. `context7-mcp` quando houver biblioteca, framework ou API.
5. Skill tecnica especifica da tarefa.
6. `verification-before-completion`, `tdd-workflow`, `e2e-testing` ou `playwright` para fechar com evidencia.

## Matriz Principal

| Tipo de tarefa | Skills principais | Skills de apoio | Quando usar |
| --- | --- | --- | --- |
| UI React/Next | `frontend-patterns`, `PORTFOLIO-DANILO-FINAL`, `ghost-design` | `coding-standards`, `context7-mcp`, `web-designer` | Componentes, layouts, hooks, estados, client/server boundaries, responsividade. |
| Design Ghost / Direcao de arte | `ghost-design`, `web-designer` | `design-auditor`, `extract-design`, `brand-voice` | Telas premium, prototipos, ajustes visuais, consistencia de tokens, revisao estetica. |
| Animacao DOM / Scroll / Motion | `ghost-design`, `frontend-patterns`, `context7-mcp` | `3d-web-experience`, `playwright`, `e2e-testing` | Reveals, parallax, Lenis, Motion/Framer, GSAP, reduced motion. |
| WebGL / Three.js / R3F | `3d-web-experience`, `context7-mcp`, `ghost-design` | `frontend-patterns`, `verification-quality`, `playwright` | Ghost, canvases, shaders, postprocessing, `useFrame`, DPR, frameloop e performance mobile. |
| Spline | `spline-3d-integration`, `3d-web-experience` | `ghost-design`, `context7-mcp`, `playwright` | Embeds Spline, runtime API, cena `.splinecode`, fallback mobile, problemas de scroll/GPU. |
| Admin/CMS | `PORTFOLIO-DANILO-FINAL`, `frontend-patterns`, `backend-patterns` | `supabase`, `security-review`, `tdd-workflow` | Area admin protegida, formularios, landing pages, midia, tags, copy agent, scene generator. |
| Supabase Auth/SSR | `supabase`, `security-review`, `context7-mcp` | `backend-patterns`, `supabase-postgres-best-practices` | Login, cookies SSR, middleware, `createServerClient`, sessao, RLS, rotas protegidas. |
| Supabase Storage/assets | `supabase`, `supabase-postgres-best-practices` | `security-review`, `backend-patterns`, `systematic-debugging` | Upload, paths, buckets, URLs publicas/assinadas, auditoria de assets. |
| Postgres/schema/migrations | `supabase-postgres-best-practices`, `supabase` | `backend-patterns`, `security-review`, `tdd-workflow` | Queries, indices, RLS, schema, SQL, migrations, performance de banco. |
| APIs / Route Handlers / Server Actions | `backend-patterns`, `api-design`, `security-review` | `context7-mcp`, `supabase`, `tdd-workflow` | Endpoints em `src/app/api`, server actions, validacao com Zod, erros e autorizacao. |
| Autenticacao/autorizacao | `security-review`, `supabase` | `backend-patterns`, `tdd-workflow`, `e2e-testing` | Admin auth, claims, policies, verificacao de permissao, upload seguro. |
| Testes unitarios/integracao | `tdd-workflow`, `verification-before-completion` | `coding-standards`, `frontend-patterns`, `backend-patterns` | Jest, Testing Library, schemas, stores, utilitarios, regressao funcional. |
| E2E/browser | `e2e-testing`, `playwright`, `browser` | `design-auditor`, `verification-loop` | Fluxos reais, screenshots, admin, portfolio, responsivo, debug visual. |
| Debug sistematico | `systematic-debugging` | `context7-mcp`, `playwright`, `browser`, `experience-evolution` | Bugs nao obvios, regressao, erro de build, inconsistencia SSR/client. |
| Performance | `3d-web-experience`, `frontend-patterns`, `nextjs-turbopack` | `audit-website`, `verification-quality`, `context7-mcp` | FPS, bundle, WebGL, DPR, static/dynamic rendering, Turbopack, auditoria Lighthouse-like. |
| SEO/metadata | `frontend-patterns`, `context7-mcp`, `article-writing` | `brand-voice`, `audit-website`, `schema-markup` se instalada | Metadata App Router, sitemap, robots, JSON-LD, OG images, texto publico. |
| Conteudo e copy | `brand-voice`, `article-writing`, `content-engine` | `ghost-design`, `market-research` | Copy de paginas, cases, manifesto, posts, conteudo editorial, tom de marca. |
| Geracao de imagem/video | `imagegen`, `fal-ai-media`, `nano-banana-prompt` | `video-prompting-guide`, `sora`, `video-editing` | Assets raster, cenas publicitarias, prompts visuais, video, thumbnails. |
| OpenAI / agents / prompts | `openai-docs`, `Codex-api`, `context7-mcp` | `mcp-server-patterns`, `eval-harness`, `security-review` | Integrações OpenAI, prompt upgrade, agentes, tool use, streaming, SDK/API. |
| Deploy Firebase/Next | `systematic-debugging`, `verification-before-completion`, `nextjs-turbopack` | `audit-website`, `security-review`, `context7-mcp` | Build, standalone, Firebase Hosting, preflight, env, headers, deploy scripts. |
| Auditoria de site | `audit-website`, `design-auditor` | `playwright`, `security-review`, `frontend-patterns` | SEO, acessibilidade, performance, UI review, dark patterns, responsividade. |
| Seguranca/pentest | `security-review`, `audit-website` | `supabase`, `supabase-postgres-best-practices`, `V3 Security Overhaul` | Input, upload, secrets, RLS, APIs, admin, storage, headers. |
| GitHub/release | `github-code-review`, `github-release-management`, `github-workflow-automation` | `caveman-commit`, `session-end` | PR review, releases, actions, changelog, commit/handoff. |
| Planejamento/refatoracao grande | `planning-with-files`, `systematic-debugging`, `sparc-methodology` | `pair-programming`, `tdd-workflow`, `verification-loop` | Mudancas com muitas etapas, arquitetura, refatoracao, planos com progresso. |
| Multi-agente/swarm | `pair-programming`, `swarm-orchestration`, `swarm-advanced` | `v3-swarm-coordination`, `dmux-workflows` | Somente quando houver tarefas paralelas claras ou pedido explicito de agentes. |
| Criar/editar skills | `skill-creator`, `Skill Builder`, `skill-installer` | `find-skills`, `context7-mcp` | Nova skill, reorganizar skill, instalar skill externa, melhorar frontmatter. |
| RAG/vector/memoria | `agentdb-vector-search`, `agentdb-memory-patterns`, `reasoningbank-agentdb` | `agentdb-optimization`, `supabase-postgres-best-practices` | Busca semantica, memoria de agentes, knowledge base, embeddings. |
| Azure | Skills `azure-*` | `azure-validate`, `azure-deploy`, `azure-diagnostics` | Nao e stack principal atual; usar so em migracao/diagnostico Azure. |

## Receitas por Pedido Comum

### Animacao WebGL / Three.js

Use:

- `3d-web-experience`
- `context7-mcp`
- `ghost-design`
- `frontend-patterns`
- `playwright` ou `e2e-testing`

Aplicar quando o pedido mencionar `Three.js`, `React Three Fiber`, `WebGL`, `shader`, `postprocessing`, `Ghost`, `Canvas`, `useFrame`, cursor interaction ou performance visual. Pelo Context7, priorize `@react-three/fiber` para `Canvas`, `useFrame`, `frameloop`, DPR e performance adaptativa.

Observacao: skills como `threejs-interaction`, `threejs-animation` e `framer-motion` aparecem como desejaveis para este repo, mas nao estao instaladas como skills locais acionaveis nesta sessao. Enquanto isso, cubra com `3d-web-experience` + `context7-mcp`.

### Animacao DOM / Scroll Editorial

Use:

- `ghost-design`
- `frontend-patterns`
- `context7-mcp`
- `playwright`

Aplicar para Lenis, parallax, `prefers-reduced-motion`, reveals, GSAP, Motion/Framer e sincronias de CTA. Respeitar sempre o Ghost ease `[0.22, 1, 0.36, 1]`, motion sutil e conteudo acima de efeito.

### Spline

Use:

- `spline-3d-integration`
- `3d-web-experience`
- `ghost-design`
- `playwright`

Aplicar somente quando houver cena do Spline, URL `.splinecode`, embed ou runtime Spline. Para este portfólio, Spline deve ter fallback mobile e nao pode sequestrar scroll.

### Admin / Landing Pages / Midia

Use:

- `PORTFOLIO-DANILO-FINAL`
- `frontend-patterns`
- `backend-patterns`
- `supabase`
- `security-review`
- `tdd-workflow`

Aplicar em `src/app/admin/(protected)`, `src/components/admin`, `src/lib/admin`, `src/lib/supabase` e schemas Zod. Antes de mexer, ler a doc correspondente em `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/`.

### Supabase SSR / Auth / Storage

Use:

- `supabase`
- `supabase-postgres-best-practices`
- `security-review`
- `backend-patterns`
- `context7-mcp`

Aplicar para auth, cookies SSR, middleware, storage, RLS, policies, buckets, migrations e queries. Pelo Context7, `@supabase/ssr` exige handlers explicitos de cookies; Server Components leem cookies, middleware/route handlers podem atualizar.

### Portfolio Publico / Home / Sobre

Use:

- `ghost-design`
- `PORTFOLIO-DANILO-FINAL`
- `frontend-patterns`
- `3d-web-experience` quando houver WebGL
- `e2e-testing`

Aplicar em `src/components/home`, `src/components/portfolio`, `src/components/sobre`, `src/app/page.tsx`, `src/app/portfolio` e `src/app/sobre`. Antes de mexer, ler a doc da pagina em `.context/DOCS-PORTFOLIO-PAGES/`.

### Bugs de Build, Hidratação ou Deploy

Use:

- `systematic-debugging`
- `context7-mcp`
- `nextjs-turbopack`
- `verification-before-completion`

Aplicar em erros de `next build`, mismatch server/client, problemas de App Router, `dynamic import`, env vars e Firebase Hosting. Comecar reproduzindo com comando minimo antes de alterar codigo.

### Testes e Regressao Visual

Use:

- `tdd-workflow`
- `e2e-testing`
- `playwright`
- `browser`
- `verification-before-completion`

Aplicar para criar teste antes do fix quando viavel, validar fluxo admin/portfolio e capturar screenshots quando o bug for visual.

### Conteudo, Cases e Copy Agent

Use:

- `brand-voice`
- `article-writing`
- `content-engine`
- `ghost-design`
- `openai-docs` quando envolver OpenAI

Aplicar para textos do site, cases, manifesto, prompts do copy agent, scene generator e conteudo editorial. Manter voz pt-BR, premium, editorial e sem excesso promocional generico.

### Geracao de Assets

Use:

- `imagegen`
- `fal-ai-media`
- `nano-banana-prompt`
- `video-prompting-guide`
- `sora`
- `video-editing`

Aplicar para imagens raster, mockups, thumbnails, video, prompts visuais e cenas. Nao usar essas skills para SVG/componentes que deveriam ser implementados em codigo.

### Review de Codigo

Use:

- `github-code-review` se o alvo for PR/GitHub
- `caveman-review` para review enxuto
- `security-review` se envolver auth/input/API/upload
- `design-auditor` se envolver UI

Aplicar com foco em bugs, regressao, risco e teste faltando. Findings primeiro, resumo depois.

## Skills Essenciais para Este Repo

Mantenha estas como "top of mind":

- `PORTFOLIO-DANILO-FINAL`: padroes especificos do repo.
- `ghost-design`: identidade visual e regras nao negociaveis.
- `context7-mcp`: docs atuais de bibliotecas.
- `frontend-patterns`: React/Next/UI.
- `3d-web-experience`: WebGL/R3F/Spline/Three.
- `supabase`: qualquer tarefa Supabase.
- `supabase-postgres-best-practices`: banco, SQL, RLS, performance.
- `security-review`: admin, auth, upload, API, input.
- `systematic-debugging`: bugs complexos.
- `tdd-workflow`: implementacao com teste.
- `e2e-testing` e `playwright`: validacao de fluxo real.
- `verification-before-completion`: evidencia antes de concluir.

## Skills Opcionais ou Situacionais

Use apenas quando o pedido bater claramente:

- `web-designer`: quando o usuario pedir qualidade visual premium/design mode.
- `design-auditor`: auditoria de UI/acessibilidade/design.
- `audit-website`: auditoria SEO/performance/security do site.
- `nextjs-turbopack`: builds Next.js 16, Turbopack e performance de dev/build.
- `openai-docs`: APIs/produtos OpenAI.
- `mcp-server-patterns`: criar ou alterar MCP servers.
- `agentdb-*` e `reasoningbank-*`: busca semantica, memoria, RAG e agentes.
- `azure-*`: somente migracao ou operacao Azure.
- `github-*`: PRs, Actions, releases e gestao GitHub.
- `skill-creator`, `skill-installer`, `Skill Builder`: criar/instalar skills.

## Lacunas Recomendadas

Estas skills seriam boas candidatas para instalar/criar, porque combinam com o projeto mas nao aparecem como skills acionaveis instaladas nesta sessao:

- `threejs-animation`: animacao R3F, timelines, mixers, particles, postprocessing.
- `threejs-interaction`: raycasting, pointer events, cursor-driven scenes, accessibility/fallback.
- `framer-motion`: Motion/Framer variants, scroll, layout animation, reduced motion.
- `tailwind-design-system`: Tailwind CSS 4, tokens e arquitetura CSS-first.
- `nextjs-app-router-patterns`: Server Components, metadata, route handlers, caching e boundaries.
- `firebase-hosting-nextjs`: Firebase Hosting Web Frameworks, standalone output, env e deploy.
- `webgl-performance-audit`: DPR, memory, shader cost, mobile fallback e GPU budgets.

## Prompts Curtos de Roteamento

Exemplos de como acionar a combinacao certa:

- "Animar o Ghost com cursor e scroll": `3d-web-experience` + `context7-mcp` + `ghost-design` + `playwright`.
- "Corrigir upload de midia no admin": `supabase` + `security-review` + `backend-patterns` + `tdd-workflow`.
- "Melhorar layout mobile da Home": `ghost-design` + `frontend-patterns` + `playwright`.
- "Auditar SEO e performance": `audit-website` + `frontend-patterns` + `context7-mcp`.
- "Criar uma nova skill para o projeto": `skill-creator` + `Skill Builder` + `PORTFOLIO-DANILO-FINAL`.
- "Resolver bug intermitente": `systematic-debugging` + `verification-before-completion`.

## Politica de Uso

- Nao usar skills de swarm/multi-agente por padrao; usar somente quando o usuario pedir agentes paralelos ou quando houver subtarefas independentes bem claras.
- Nao usar Azure para este repo salvo pedido explicito, porque o deploy atual e Firebase/Supabase.
- Nao usar skills de media generativa para UI que deve ser codigo, SVG ou design system.
- Nao pular Context7 quando a tarefa depender de API atual de Next, React, Supabase, Firebase, Three, Motion, OpenAI ou similar.
- Nao finalizar tarefa tecnica sem verificacao proporcional ao risco.
