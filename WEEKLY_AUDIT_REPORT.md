# Weekly Portfolio Audit Report

## 0. Metadata

| Campo             | Valor                                                            |
| :---------------- | :--------------------------------------------------------------- |
| **Date**          | 2026-05-26                                                       |
| **Repository**    | danilonovaisv/PORTFOLIO-DANILO-FINAL                             |
| **Branch**        | claude/beautiful-rubin-MVYRs                                     |
| **Routine**       | Weekly Audit — Read-Only Analysis                                |
| **Commit**        | 3f91a224294b609e0f2334ee1707b6b6b573a1dd                         |
| **PR**            | (pendente criação ao final desta rotina)                         |
| **Auditor**       | Claude Code — Ghost Commander Audit Sentinel                     |
| **Scope**         | Todos os 9 pilares + segurança operacional + Firebase + Supabase |
| **Files changed** | 1 (somente `WEEKLY_AUDIT_REPORT.md`)                             |
| **Approval status** | **Pending human approval**                                     |

---

## 1️⃣ Visão Geral

O portfólio `portfoliodanilo.com` encontra-se em estado **operacional estável**, com o último deploy registrado em 2026-05-22 após correções críticas de Ghost 3D brightness e Portfolio Hero full-bleed. A base de código tem **322 arquivos TypeScript/TSX** e um ecossistema bem estruturado com Tailwind v4, Framer Motion, React Three Fiber e Supabase.

O estado atual do `active_state.md` confirma build e typecheck com exit code 0, 37 suites de teste passando (264 testes) e deploy Firebase ativo em `https://portfolio-danilo-novais.web.app`.

**Pontos fortes identificados:**
- Design tokens do Ghost System corretamente definidos em `globals.css` com `@theme`
- `GHOST_EASE [0.22, 1, 0.36, 1]` centralizado em `src/config/motion.ts` e referenciado corretamente em 124+ ocorrências
- `std-grid` com `max-width: 1680px` implementado na camada global CSS
- Todos os Canvas/WebGL decorativos possuem `aria-hidden="true"` e `role="presentation"`
- `useMotionGate` ativo em 44+ componentes para suporte a `prefers-reduced-motion`
- Segurança do formulário de contato: Cloudflare Turnstile + honeypot `_honey`
- Security headers em `firebase.json` (HSTS, X-Frame-Options, X-Content-Type-Options)
- `.env*` protegidos no `.gitignore`

**Riscos prioritários identificados:**
- Token `offset.dramatic: 24px` na config de motion excede o hard limit de 18px do SSOT
- `AboutHero.tsx:164` usa `y: 20` explicitamente, violando o limite de 18px
- Rate limiter in-memory no `/api/contact` não funciona em ambiente serverless
- `typescript.ignoreBuildErrors: true` mascara erros de tipo em produção

---

## 2️⃣ Diagnóstico por Seção

### Home — `/`

| Seção                   | Status | Observação                                                                                                 |
| :---------------------- | :----- | :--------------------------------------------------------------------------------------------------------- |
| Header                  | ✅     | `SiteHeader` + `DesktopFluidHeader` + `MobileStaggeredMenu` presentes. ARIA correto.                       |
| Hero Home               | ✅     | `HomeHero` com `GhostSceneWrapper` (ssr:false, aria-hidden). WebGL com fallback. Preloader funcional.      |
| Video Manifesto         | ✅     | `VideoManifesto` com `y: 18` (dentro do limite). Posters e vídeos mobile/desktop separados com preload.    |
| Portfolio Showcase      | ✅     | `PortfolioShowcase` com `CategoryStripe`. Aria-labelledby correto. Hover com purpleDetails em estado correto. |
| Featured Projects       | ✅     | Bento grid 12 colunas com backgrounds animados (Grainient/Ghost/Aurora). Realtime via Supabase.            |
| Shader Section          | ✅     | `ShaderSection` documentada em `10-SHADER-SECTION.md`. Usando Three.js direto sem R3F. Cleanup no unmount. |
| Clients/Brands          | ✅     | `ClientsBrandsSection` com `y: 16` (dentro do limite). `std-grid` correto.                                 |
| Contact + Footer        | ✅     | `SiteClosure` unifica corretamente ClientsBrands + Contact + Footer.                                       |

### Sobre — `/sobre`

| Seção                 | Status | Observação                                                                                           |
| :-------------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| Hero Sobre            | ⚠️     | `AboutHero.tsx:164` usa `y: 20` explicitamente — excede o limite de 18px.                           |
| Origem Criativa       | ✅     | `AboutOrigin` com `clipPath reveal` vertical — aceitável como exception de scroll reveal.            |
| O Que Eu Faço         | ✅     | `AboutWhatIDo` presente e alinhado com SSOT.                                                         |
| Como Eu Trabalho      | ✅     | `AboutMethod` com assets de qualidade 60 para performance. Correto.                                  |
| O Que Me Move         | ⚠️     | `ManifestoScrollSection` usa `hover:scale-125` nos dots de navegação — violação CSS scale.           |
| Fechamento            | ✅     | `AboutClosing` presente.                                                                             |
| Clients + Contact     | ✅     | Via `SiteClosure`.                                                                                   |

### Portfolio — `/portfolio`

| Seção              | Status | Observação                                                                                     |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------- |
| Hero Portfolio     | ✅     | Full-bleed validado em 2026-05-22. `min-h-[100svh]`, `w-screen`, `max-w-none`.                |
| Gallery / Grid     | ✅     | `ProjectsGallery` com paginação servidor. `max-w-[1680px]` em filtros sticky.                 |
| Modal              | ✅     | `PortfolioModal` com `ssr: false`. AnimatePresence.                                            |
| Clients + Contact  | ✅     | `ClientsBrandsSection` lazy via IntersectionObserver (`showClientsBrands` state).              |

### Admin — `/admin`

| Seção              | Status | Observação                                                                                     |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------- |
| Auth               | ✅     | Proteção via `Middleware` + verificação de `role: 'admin'`.                                    |
| Dashboard          | ✅     | `AdminShell` com `group-hover:scale-125` no indicador de status (admin — contexto isolado).    |
| Trabalhos/Projetos | ✅     | CRUD funcional com realtime Supabase. Templates V1/V2/V3.                                      |
| Assets/Mídia       | ⚠️     | `AssetCard.tsx` usa `group-hover:scale-105` — violação de scale em componente de admin.        |

### Contact Form — `/contato` + `home`

| Item               | Status | Observação                                                               |
| :----------------- | :----- | :----------------------------------------------------------------------- |
| Validação          | ✅     | Zod-like inline validation. Campos obrigatórios validados.              |
| Bot Protection     | ✅     | Cloudflare Turnstile + honeypot `_honey`.                               |
| Rate Limiting      | ⚠️     | In-memory `Map` não persiste entre instâncias serverless Firebase.       |
| Email Dispatch     | ✅     | Resend API integrada via `RESEND_FROM_EMAIL`. Sem chave hardcoded.       |

---

## 3️⃣ Lista de Problemas e Backlog Priorizado

### 🔴 P0 — Crítico

---

**ID: AUD-001**
- **Severidade:** 🔴 P0 Crítico
- **Área:** Ghost Design System / Motion Tokens
- **Evidência:** `src/config/motion.ts` define `offset.dramatic: 24`. O SSOT (`GHOST-DESIGN-SYSTEM.md`) é explícito: "Offsets: Vertical (y) offsets for UI content MUST NOT exceed 18px." O token `dramatic` ultrapassa o hard limit e está disponível como API para todos os componentes do projeto.
- **Impacto:** Qualquer componente que usar `MOTION_TOKENS.offset.dramatic` introduzirá uma violação de design que contradiz o Ghost System v3.1. Risco de inconsistência visual progressiva conforme novos componentes forem criados por outros agentes.
- **Arquivos relacionados:** `src/config/motion.ts`
- **Risco de não corrigir:** Propagação silenciosa. Novos componentes podem usar `offset.dramatic` assumindo que é válido, gerando violações acumulativas.
- **Critério de aceite futuro:** `MOTION_TOKENS.offset.dramatic` reduzido para `18` (alinhado ao `large`) ou removido do token map com nota explícita de depreciação. Ou renomeado para `theatrical` com documentação de "somente para elementos decorativos não-UI (backgrounds, WebGL)".

---

**ID: AUD-002**
- **Severidade:** 🔴 P0 Crítico
- **Área:** Animação / Ghost Design System
- **Evidência:** `src/components/sobre/sections/AboutHero.tsx:164` — `hidden: { opacity: 0.1, y: 20, filter: 'blur(10px)' }`. Valor `y: 20` excede o limite mandatório de 18px do SSOT.
- **Impacto:** Viola diretamente a regra "Offsets: Vertical (y) offsets for UI content MUST NOT exceed 18px" do `GHOST-DESIGN-SYSTEM.md`.
- **Arquivos relacionados:** `src/components/sobre/sections/AboutHero.tsx:164`
- **Risco de não corrigir:** Precedente para outras violações. Inconsistência visual na página `/sobre` em relação ao restante do site.
- **Critério de aceite futuro:** `y: 20` reduzido para `y: 18` (ou `MOTION_TOKENS.offset.large`).

---

### 🟡 P1 — Estrutural

---

**ID: AUD-003**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Segurança / API
- **Evidência:** `src/app/api/contact/route.ts` — `const ipRequestHistory = new Map<string, number[]>()`. Rate limiter usa memória do processo Node.js. No Firebase Cloud Functions (`us-central1`), cada cold start cria nova instância com Map zerado, tornando o rate limiting ineficaz sob múltiplas instâncias paralelas.
- **Impacto:** Bypass de rate limiting por atacantes que atingem múltiplas instâncias simultaneamente. A proteção Cloudflare Turnstile mitiga parcialmente, mas não substitui rate limiting server-side persistente.
- **Arquivos relacionados:** `src/app/api/contact/route.ts`
- **Risco de não corrigir:** Exposição a spam e DDoS via formulário de contato. Custo de email aumentado (Resend API).
- **Critério de aceite futuro:** Rate limiter migrado para Supabase (tabela `rate_limits` com TTL) ou Redis/Upstash, ou Cloudflare WAF rule na frente do endpoint.

---

**ID: AUD-004**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** TypeScript / Build
- **Evidência:** `next.config.mjs` — `typescript: { ignoreBuildErrors: true }`. Erros de tipo em produção são silenciados no processo de build.
- **Impacto:** Regressões de tipo passam pelo CI/CD sem sinalização. O `pnpm run typecheck` separado mitiga parcialmente, mas a integração no build está desativada.
- **Arquivos relacionados:** `next.config.mjs`
- **Risco de não corrigir:** Risco de runtime errors em produção oriundos de violações de tipo que o build nunca reportou. Dificulta o onboarding de novos agentes.
- **Critério de aceite futuro:** `ignoreBuildErrors: false` com sprint de correção dos erros de tipo pendentes, ou manutenção do flag com documentação formal do risco em `ADR`.

---

**ID: AUD-005**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Ghost Design System / Motion
- **Evidência:** `src/components/ui/AntigravityCTA.tsx:119` — `x: isHovered ? (isCompact ? 3 : 5) : 0`. O SSOT (`GHOST-DESIGN-SYSTEM.md`) lista `translateX (x)` como explicitamente **proibido** para UI content: "Forbidden (content/UI): scale (e.g., scaleY, scaleX), bounce, translateX (x), rotate."
- **Impacto:** Viola o Ghost Motion Protocol. Embora o deslocamento seja sutil (3–5px), o princípio estabelecido é violado e pode servir como precedente para usos mais agressivos.
- **Arquivos relacionados:** `src/components/ui/AntigravityCTA.tsx:119`
- **Risco de não corrigir:** Precedente de violação em componente de alta visibilidade (CTA aparece em todas as páginas). O efeito visual pode conflitar com o princípio "no motion on x-axis".
- **Critério de aceite futuro:** Substituir `x` motion no ícone de seta por `opacity` ou micro `y` (≤4px), mantendo o comportamento perceptível mas alinhado ao protocolo.

---

**ID: AUD-006**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Documentação / Governança
- **Evidência:** `CLAUDE.md` e `/.claude/rules/postcss-tailwind-config.md` instruem usar Tailwind CSS v3.4.x com `tailwindcss: {}` no PostCSS e `@tailwind base;` no CSS. O projeto usa **Tailwind CSS v4.3.0** com `@tailwindcss/postcss` e `@import 'tailwindcss'` — configuração correta para v4. Os docs de governança estão desatualizados.
- **Impacto:** Agentes que seguirem os docs de governança irão tentar "corrigir" a configuração atual para v3, quebrando o build. Alto risco de regressão provocada por agente.
- **Arquivos relacionados:** `CLAUDE.md`, `.claude/rules/postcss-tailwind-config.md`, `.claude/rules/README-POSTCSS.md`
- **Risco de não corrigir:** Próxima execução de agente que seguir as rules literalmente tentará fazer downgrade do Tailwind, quebrando o projeto.
- **Critério de aceite futuro:** Atualizar `CLAUDE.md` e `postcss-tailwind-config.md` para refletir que o projeto usa Tailwind CSS v4 com `@tailwindcss/postcss` intencionalmente.

---

**ID: AUD-007**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Acessibilidade / Navegação por Teclado
- **Evidência:** Grep por `tabIndex={0}` em todo o codebase retornou **0 instâncias**. Componentes como `FeaturedProjectCard`, `CategoryStripe`, `CTAProjectCard` possuem handlers de clique mas podem não ser focáveis via teclado. O SSOT exige: "Componentes iterativos sem `<a>` ou `<button>` devem conter `tabIndex={0}`, `onFocus` e `onBlur`."
- **Impacto:** Violação WCAG 2.1 AA. Usuários de teclado não conseguem interagir com cards de projeto e CTAs de showcase.
- **Arquivos relacionados:** `src/components/home/featured-projects/FeaturedProjectCard.tsx`, `src/components/home/portfolio-showcase/CategoryStripe.tsx`
- **Risco de não corrigir:** Falha em auditoria de acessibilidade. Possível barreira legal dependendo de jurisdição.
- **Critério de aceite futuro:** Cards clicáveis que não usam `<a>` ou `<button>` devem adicionar `tabIndex={0}`, `role="button"` e handlers de `onKeyDown` (Enter/Space).

---

### 🟢 P2 — Polimento Rápido

---

**ID: AUD-008**
- **Severidade:** 🟢 P2 Polimento
- **Área:** Ghost Design System / CSS Motion
- **Evidência:** `src/components/sobre/sections/ManifestoScrollSection.tsx:322` — classe Tailwind `hover:scale-125` nos dots de navegação do carrossel.
- **Impacto:** Viola a regra `scale` proibido em motion. Os dots são UI navegável (não puramente decorativos).
- **Arquivos relacionados:** `src/components/sobre/sections/ManifestoScrollSection.tsx:322`
- **Critério de aceite futuro:** Substituir `hover:scale-125` por `hover:opacity-100` + `hover:bg-white/60` para manter feedback visual sem escala.

---

**ID: AUD-009**
- **Severidade:** 🟢 P2 Polimento
- **Área:** Code Quality / Console Statements
- **Evidência:** `console.log` / `console.warn` / `console.error` encontrados em: `src/app/page.tsx`, `src/lib/utils.ts`, `src/lib/logger.ts`, `src/lib/env.ts`, `src/lib/three-console.ts`, `src/hooks/useRealtimeAssets.ts`, entre outros.
- **Impacto:** Console statements expostos em produção vazam informações de diagnóstico para usuários finais. A regra `code-quality.md` proíbe `console.log` em branches principais.
- **Arquivos relacionados:** Os 10+ arquivos listados na análise
- **Critério de aceite futuro:** Substituir todos os `console.log` por chamadas ao `src/lib/logger.ts` com guard de ambiente (`process.env.NODE_ENV !== 'production'`).

---

**ID: AUD-010**
- **Severidade:** 🟢 P2 Polimento
- **Área:** Performance / Assets
- **Evidência:** `active_state.md` (2026-05-22) reporta: "Predeploy audit still reports 42 pre-existing broken legacy asset links in `src/config/site-assets.json`". 42 entradas com URLs potencialmente inativas de assets no Supabase Storage.
- **Impacto:** Se assets são referenciados na UI e retornam 404, o Next.js Image component mostrará broken images silenciosamente. Nenhum fallback visual explícito por asset quebrado foi identificado em todos os componentes.
- **Arquivos relacionados:** `src/config/site-assets.json`
- **Critério de aceite futuro:** Rodar script de validação de URLs de assets e remover ou atualizar as 42 entradas quebradas. Adicionar `onError` handler com fallback visual nos componentes de imagem críticos.

---

## 4️⃣ Prompts Técnicos para Agentes Google Antigravity Atômicos

> Estes prompts são planos de execução futura. **Não executar sem aprovação humana explícita.**

---

### 🛠️ Prompt #01 — Corrigir `offset.dramatic` e `y: 20` no Motion System

**Objetivo:** Alinhar todos os tokens de offset de motion ao hard limit de 18px do Ghost Design System.
**Especialista:** `@ghost_architect` + `motion-choreographer`
**Arquivos:**
- `src/config/motion.ts`
- `src/components/sobre/sections/AboutHero.tsx`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` §2.3 (Allowed vs Forbidden Motion — "Offsets: Vertical (y) offsets for UI content MUST NOT exceed 18px")
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/02-HERO-SOBRE/`

**Ações:**
1. Em `src/config/motion.ts`: renomear `offset.dramatic` para `offset.theatrical` e adicionar comentário explícito `/* Somente para elementos decorativos não-UI (backgrounds, WebGL). Proibido em content/UI por SSOT. */`. Manter valor 24 para uso legítimo em cenas WebGL atmosféricas, mas documentar a exceção.
2. Em `src/components/sobre/sections/AboutHero.tsx:164`: alterar `y: 20` para `y: 18` (usar `MOTION_TOKENS.offset.large` para rastreabilidade).
3. Verificar todas as referências a `offset.dramatic` no codebase e avaliar se são UI ou WebGL antes de alterar.

**Regras:** Ghost Design System v3.1. `MOTION_TOKENS.offset.large = 18` é o máximo para UI.
**Critérios de Aceite:**
- [ ] `grep -rn "offset\.dramatic" src/` retorna 0 resultados de uso em componentes UI
- [ ] `AboutHero.tsx:164` usa `y: 18` ou `MOTION_TOKENS.offset.large`
- [ ] `pnpm run typecheck` exit code 0
- [ ] `pnpm run build` exit code 0
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #02 — Substituir Rate Limiter In-Memory por Persistente

**Objetivo:** Tornar o rate limiter do formulário de contato eficaz em ambiente serverless Firebase Cloud Functions.
**Especialista:** `@ghost_architect` + `database-sentinel`
**Arquivos:**
- `src/app/api/contact/route.ts`

**Contexto obrigatório:**
- `.context/ARCHITECTURE.md`
- `AGENTS.md` §Security
- Documentação Supabase: tabela com TTL via `pg_cron` ou timestamp check

**Ações:**
1. Criar tabela Supabase `rate_limits` com colunas: `ip TEXT, endpoint TEXT, requests INT, window_start TIMESTAMPTZ`.
2. Substituir `const ipRequestHistory = new Map<string, number[]>()` por query Supabase que verifica e incrementa o contador com atomicidade (upsert + count check).
3. Adicionar cleanup automático (via `pg_cron` ou `EXTRACT(EPOCH)` no check) de entradas antigas.
4. Manter Cloudflare Turnstile como segunda camada.

**Regras:** Nunca expor credenciais. Usar `SUPABASE_SERVICE_ROLE_KEY` server-side apenas.
**Critérios de Aceite:**
- [ ] `ipRequestHistory` Map removido do route
- [ ] Rate limit funciona com múltiplas instâncias Lambda/Cloud Functions
- [ ] `pnpm run build` exit code 0
- [ ] Teste manual: 6 submissões do mesmo IP em 60s resulta em 429
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #03 — Atualizar Docs de Governança para Tailwind v4

**Objetivo:** Eliminar conflito entre docs de governança (que indicam Tailwind v3) e implementação real (Tailwind v4.3.0).
**Especialista:** `@ghost_architect` (doc-only, sem alteração de código)
**Arquivos:**
- `CLAUDE.md` (seção postcss-tailwind-config)
- `.claude/rules/postcss-tailwind-config.md`
- `.claude/rules/README-POSTCSS.md`

**Contexto obrigatório:**
- `.context/active_state.md` (confirma build estável com Tailwind v4)
- `postcss.config.cjs` atual (usa `@tailwindcss/postcss`)
- `src/app/globals.css` atual (usa `@import 'tailwindcss'` com `@source`)

**Ações:**
1. Em `CLAUDE.md`: atualizar a seção Tailwind para refletir v4 como stack oficial.
2. Em `.claude/rules/postcss-tailwind-config.md`: substituir a configuração correta por `@tailwindcss/postcss` e a sintaxe v4 (`@import 'tailwindcss'`). Marcar v3 como deprecated.
3. Em `.claude/rules/README-POSTCSS.md`: atualizar status para "Tailwind CSS v4 ativo e estável".

**Regras:** Somente arquivos de documentação. Nenhuma alteração de código-fonte ou config.
**Critérios de Aceite:**
- [ ] Nenhuma instrução nos docs aponta para Tailwind v3 como versão ativa
- [ ] Configurações de exemplo nos docs refletem a stack real (v4)
- [ ] `pnpm run build` exit code 0 (sem alterações de código)
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #04 — Adicionar Navegação por Teclado em Cards Interativos

**Objetivo:** Garantir conformidade WCAG 2.1 AA em elementos clicáveis não-semânticos.
**Especialista:** `@audit_sentinel` + `frontend-specialist`
**Arquivos:**
- `src/components/home/featured-projects/FeaturedProjectCard.tsx`
- `src/components/home/portfolio-showcase/CategoryStripe.tsx`
- `src/components/home/featured-projects/CTAProjectCard.tsx`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` §3 (Accessibility)
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/04-PORTFOLIO-SHOWCASE/`

**Ações:**
1. Para cada `<div>` ou `<m.div>` com `onClick` handler que não envolve um `<a>` ou `<button>`:
   - Adicionar `tabIndex={0}`, `role="button"` (ou `role="link"` se for navegação).
   - Adicionar `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(e as any); }}`.
   - Garantir `focus-visible:ring-2 focus-visible:ring-bluePrimary` no className.
2. Não alterar lógica de negócio ou estilo visual.

**Regras:** Ghost Design System. Mobile-first. WCAG AA mínimo.
**Critérios de Aceite:**
- [ ] `grep -rn "tabIndex={0}" src/components/home/` retorna ≥3 resultados nos componentes alvo
- [ ] Tab navigation em teclado atinge cards de projeto e stripes de showcase
- [ ] Focus ring visível em todos os elementos adicionados
- [ ] `pnpm run build` exit code 0
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #05 — Remover `hover:scale-*` de Componentes de Conteúdo

**Objetivo:** Eliminar usos de `scale` CSS em componentes UI não-admin, respeitando o Ghost Motion Protocol.
**Especialista:** `@motion_choreographer`
**Arquivos:**
- `src/components/sobre/sections/ManifestoScrollSection.tsx:322`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` §2.3 ("Forbidden (content/UI): scale")
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/07-O-QUE-ME-MOVE.md` (se existir)

**Ações:**
1. Em `ManifestoScrollSection.tsx:322`: substituir `hover:scale-125` por `hover:opacity-100` + aumento de `w-*` via Tailwind transition para dar feedback visual sem scale.
   - Exemplo: `'bg-white/15 w-[0.35rem] hover:bg-white/60 hover:w-[0.5rem] transition-all duration-fast'`
2. Verificar se o feedback visual é perceptível em mobile touch (não há hover em touch — garantir que o estado ativo/selecionado seja o feedback principal).

**Regras:** Ghost Design System. Motion: opacity, translateY ≤18px only.
**Critérios de Aceite:**
- [ ] `grep -n "hover:scale" src/components/sobre/` retorna 0 resultados
- [ ] Dots de navegação do manifesto mantêm feedback visual distinto entre estado normal e hover/ativo
- [ ] `pnpm run build` exit code 0
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #06 — Auditoria e Limpeza dos 42 Assets Quebrados

**Objetivo:** Identificar e corrigir (ou remover) as 42 entradas de assets quebrados em `site-assets.json`.
**Especialista:** `storage-sentinel` + `@ghost_architect`
**Arquivos:**
- `src/config/site-assets.json`

**Contexto obrigatório:**
- `.context/active_state.md` (aviso registrado em 2026-05-22)
- `.claude/rules/assets.md` (Supabase First policy)

**Ações:**
1. Escrever ou executar script (`scripts/validate-assets.ts`) que faz HEAD request em cada URL do `site-assets.json` e lista os que retornam não-200.
2. Para cada asset quebrado: verificar se existe substituto no Supabase Storage via MCP. Se sim, atualizar URL. Se não, marcar como `"is_active": false`.
3. Atualizar `site-assets.json` somente com dados verificados.

**Regras:** Nunca deletar entradas sem verificação. Todas as URLs devem ser Supabase Storage públicas.
**Critérios de Aceite:**
- [ ] Script de validação retorna 0 assets com status não-200 após correções
- [ ] `site-assets.json` não contém URLs com HTTP 404 ou 403
- [ ] `pnpm run build` exit code 0
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #07 — Substituir `translateX` no AntigravityCTA

**Objetivo:** Tornar a animação do ícone de seta no CTA principal aderente ao Ghost Motion Protocol (proibição de `x`).
**Especialista:** `@motion_choreographer`
**Arquivos:**
- `src/components/ui/AntigravityCTA.tsx:119`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` §2.3
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/07-CONTACT/` (CTA aparece como elemento de fechamento)

**Ações:**
1. Remover `x: isHovered ? (isCompact ? 3 : 5) : 0` do animate do ícone ArrowUpRight.
2. Substituir por `opacity: isHovered ? 1 : 0.8` para indicar hover sem movimento horizontal.
3. Opcional: adicionar micro `y: isHovered ? -1 : 0` para reforçar o feedback vertical.

**Regras:** Ghost Protocol: apenas opacity, blur, translateY (≤18px). Sem translateX, scale, rotate.
**Critérios de Aceite:**
- [ ] `grep -n "x: isHovered" src/components/ui/AntigravityCTA.tsx` retorna 0
- [ ] CTA mantém feedback visual distinto no hover
- [ ] `pnpm run build` exit code 0
**Approval Gate:** Não executar sem aprovação humana explícita.

---

## 5️⃣ Validação Técnica Executada

| Comando / Verificação                                  | Resultado                                              |
| :----------------------------------------------------- | :----------------------------------------------------- |
| `git status --short`                                   | ✅ Limpo (apenas `WEEKLY_AUDIT_REPORT.md` criado)      |
| Leitura de `AGENTS.md`                                 | ✅ Governança verificada                               |
| Leitura de `.context/DOCS-PORTFOLIO-PAGES/`            | ✅ SSOT consultada antes do código                     |
| Leitura de `.context/GHOST-DESIGN-SYSTEM.md`           | ✅ Design tokens e motion rules verificadas            |
| Leitura de `.context/active_state.md`                  | ✅ Estado atual do deploy confirmado (2026-05-22)      |
| Leitura de `src/app/page.tsx`                          | ✅ Estrutura de seções do Home validada                |
| Leitura de `src/app/sobre/page.tsx`                    | ✅ 10 seções Sobre presentes e alinhadas com SSOT      |
| Leitura de `src/app/portfolio/page.tsx`                | ✅ Hero full-bleed, galeria e modal validados          |
| Leitura de `src/app/globals.css`                       | ✅ Tailwind v4, tokens, std-grid corretos              |
| Leitura de `postcss.config.cjs`                        | ✅ `@tailwindcss/postcss` correto para v4             |
| Leitura de `src/config/motion.ts`                      | ✅ GHOST_EASE correto; `offset.dramatic` detectado     |
| `grep "y: 20\|y: [2-9][0-9]"` em components           | ⚠️ `AboutHero.tsx:164` — `y: 20` encontrado          |
| `grep "hover:scale-\|whileHover.*scale"` em src        | ⚠️ 3 instâncias (2 admin, 1 ManifestoScrollSection)  |
| `grep "aria-hidden.*true"` em canvas/WebGL             | ✅ GhostSceneWrapper, HeaderGlassCanvas, shader-lines  |
| `grep "useMotionGate"` count                           | ✅ 44 componentes implementam reduced motion           |
| Verificação de segredos hardcoded em `.tsx`            | ✅ Nenhum segredo hardcoded encontrado                 |
| Verificação `.gitignore` para `.env*`                  | ✅ `.env*` protegidos                                  |
| Leitura de `firebase.json`                             | ✅ HSTS, X-Frame-Options, X-Content-Type-Options ativos|
| Verificação rate limiter contact API                   | ⚠️ In-memory Map — ineficaz em serverless             |
| `find . -name "*.env" -not -path "*/node_modules/*"`   | ✅ Nenhum `.env` real encontrado no repo               |
| Verificação `tabIndex={0}` em componentes interativos  | ⚠️ 0 instâncias encontradas em cards clicáveis        |
| **Alterações em arquivos de código**                   | ✅ **ZERO — Somente leitura respeitada**               |

**Limitações desta auditoria:**
- Análise estática apenas. Sem servidor de desenvolvimento ativo para validação visual em browser.
- Core Web Vitals (LCP, CLS, INP) não foram medidos nesta execução (requer ambiente de execução web).
- FPS do WebGL não foi medido (requer execução no browser com `<Stats />`).
- Contraste de cores não foi verificado por ferramenta automatizada (análise textual dos tokens apenas).

---

## 6️⃣ Evidências

### Ghost Design System Violations

```
# AUD-001: offset.dramatic excede 18px
src/config/motion.ts — offset.theatrical/dramatic: 24 (linha ~linha 45)

# AUD-002: y: 20 em AboutHero
src/components/sobre/sections/AboutHero.tsx:164
hidden: { opacity: 0.1, y: 20, filter: 'blur(10px)' }
```

### Rate Limiter Serverless Risk

```typescript
// src/app/api/contact/route.ts
const ipRequestHistory = new Map<string, number[]>(); // Estado volátil — reinicia em cold start
```

### CSS Scale Violations (UI/Content)

```
src/components/sobre/sections/ManifestoScrollSection.tsx:322
'bg-white/15 w-[0.35rem] hover:bg-white/40 hover:scale-125'
```

### translateX Violation

```typescript
// src/components/ui/AntigravityCTA.tsx:119
x: isHovered ? (isCompact ? 3 : 5) : 0,
```

### TypeScript ignoreBuildErrors

```javascript
// next.config.mjs
typescript: {
  ignoreBuildErrors: true,  // Erros de tipo silenciados no build
},
```

### Assets Quebrados (42 pré-existentes)

```
Registrado em .context/active_state.md (2026-05-22):
"Predeploy audit still reports 42 pre-existing broken legacy asset links in
src/config/site-assets.json"
```

### Deploy Production

```
URL: https://portfolio-danilo-novais.web.app
Cloud Function: https://ssrportfoliodanilo-qc26fkohcq-uc.a.run.app
Último build estável: 2026-05-22 (next.js 16.2.6 webpack)
Tests passando: 264/264
```

---

## 7️⃣ Riscos Operacionais

### Risco 1 — Rate Limiter Serverless (ALTO)

O `ipRequestHistory` Map em `/api/contact/route.ts` é reiniciado a cada cold start. Firebase Cloud Functions podem escalar para múltiplas instâncias. Um atacante que distribui requisições entre instâncias bypass a proteção. O Cloudflare Turnstile mitiga bots automatizados mas não atores humanos ou bots sofisticados que resolvem captcha.

**Mitigação imediata disponível:** Ativar Firebase App Check no endpoint ou configurar rate limiting no Firebase Hosting via `firebase.json` `rewrites` + Cloud Armor.

### Risco 2 — TypeScript ignoreBuildErrors (MÉDIO)

Com `ignoreBuildErrors: true`, erros de tipo introduzidos por agentes ou desenvolvedores não bloqueiam o deploy. O `pnpm run typecheck` standalone mitiga, mas não é executado automaticamente no pipeline de build conforme configurado.

**Mitigação imediata disponível:** Adicionar `pnpm run typecheck` como step obrigatório no GitHub Actions antes do step de deploy Firebase.

### Risco 3 — Documentação de Governança Desatualizada (MÉDIO)

`CLAUDE.md` e `.claude/rules/postcss-tailwind-config.md` instruem agentes a usar Tailwind v3. Se um agente seguir essas instruções literalmente, tentará fazer downgrade para v3, quebrando toda a build em torno de `@import 'tailwindcss'` e `@source` directives.

**Mitigação imediata disponível:** Atualizar apenas os arquivos de docs (Prompt #03 acima).

### Risco 4 — 42 Assets Quebrados (BAIXO-MÉDIO)

Ativos registrados em `site-assets.json` com URLs que retornam erro podem causar broken images em componentes que não têm `onError` fallback. O impacto visual depende de quais assets estão quebrados e onde são usados.

### Risco 5 — Rotina Autônoma (INFORMATIVO)

Esta rotina operou em modo somente leitura. Nenhuma correção foi aplicada. Todos os prompts gerados requerem aprovação humana antes de execução. A variável `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` não estava disponível no ambiente de execução — ver seção 8 para detalhe.

---

## 8️⃣ Slack Approval Request

**Status:** ⚠️ Falha de envio — variável de ambiente não disponível

A rotina verificou a existência de `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` no ambiente de execução. A variável **não está configurada** no ambiente de execução remoto (Claude Code on the Web). O envio via `curl` não foi tentado para evitar log da URL em texto claro.

**Ação recomendada ao responsável:**
Configurar `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` nas variáveis de ambiente do ambiente de execução remoto. Consulte a documentação em: https://code.claude.com/docs/en/claude-code-on-the-web

**Sumário da mensagem que seria enviada:**

```json
{
  "text": "🔔 Auditoria Semanal Concluída — portfoliodanilo.com",
  "PR": "(link do PR criado ao final desta rotina)",
  "achados": {
    "P0_critico": 2,
    "P1_estrutural": 5,
    "P2_polimento": 3
  },
  "top_3_riscos": [
    "Rate limiter in-memory ineficaz em Cloud Functions serverless",
    "Token offset.dramatic: 24px excede hard limit de 18px do SSOT",
    "Docs de governança instruem Tailwind v3 mas projeto usa v4 — risco de regressão por agente"
  ],
  "codigo_alterado": false,
  "instrucao": "Responder 'Aprovado' ou 'Proceed' para autorizar criação de rotina separada de correção."
}
```

---

## 9️⃣ Próximo Passo Recomendado

**Prioridade imediata (P0):** Aprovar a execução do **Prompt #01** (corrigir `offset.dramatic` e `y: 20`) e **Prompt #03** (atualizar docs de governança para Tailwind v4). Ambos têm baixo risco de regressão, são alterações cirúrgicas e eliminam os dois maiores riscos de violação de SSOT que se propagam para novos componentes.

**Segunda prioridade (P1):** Revisar o **Prompt #02** (rate limiter serverless) com o proprietário do projeto para decidir entre Redis/Upstash, Supabase ou Firebase App Check como camada de proteção.

**Bloquear execução se:** Um agente tentar fazer downgrade do Tailwind para v3 antes da execução do Prompt #03. Este é o maior risco operacional imediato desta auditoria.

---

*Gerado por Claude Code — Ghost Commander Audit Sentinel | 2026-05-26*
*Esta rotina é READ-ONLY. Nenhum arquivo de código foi alterado. Aprovação humana obrigatória para qualquer implementação.*
