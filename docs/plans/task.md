# Lista Granular de Tarefas — Recuperação de Roteamento, Dados e Conteúdo

**Protocolo:** PREVC (`PLANNING` → `REVIEW` → `EXECUTION` → `VALIDATION` → `CONFIRMATION`)  
**Status Atual:** `PLANNING` concluído → aguardando **REVIEW / Aprovação Humana**

---

## Etapa 1: PLANNING (Concluída — Read-Only)
- [x] Reconhecer repositório, branch `main`, commits da branch remota `origin/fix/cloudflare-r2-asset-references` e `wrangler.toml`.
- [x] Consultar Graphify (`graphify query`) e Obsidian MCP (`search_vault_simple` / `02-projects/portfolio-danilo-final/project.md`).
- [x] Auditar schema e dados reais do Cloudflare D1 remoto (`portfolio-db`).
- [x] Verificar inventário do R2 (`387` objetos) e testar HTTP HEAD em capas, galerias, `landing-pages/*` (`111/111` `200 OK`) e `about/origin/origin2/cena-01..04.webp` (`4/4` `200 OK`).
- [x] Auditar rotas ao vivo em `https://portfoliodanilo.com` (`/`, `/portfolio`, `/sobre`, `/projects/*`, `/portfolio/*`), comprovando falhas `503` e `generic=True`.
- [x] Produzir os 7 artefatos obrigatórios em `docs/audit/` e `docs/plans/`.

## Etapa 2: REVIEW (Pendente — Human Gate Obrigatório)
- [ ] Apresentar o Resumo Executivo (12 itens) ao usuário.
- [ ] **INTERROMPER** e aguardar autorização explícita do usuário para iniciar execução em código/branch local.
- [ ] Confirmar separadamente autorização antes de qualquer alteração no D1 remoto ou deploy em produção.

## Etapa 3: EXECUTION (Bloqueada até Aprovação)
- [ ] **3.1. Branch & Baseline**
  - [ ] Criar branch `fix/portfolio-routing-and-content-recovery` a partir de `main`.
  - [ ] Portar e revisar normalização R2-first + proteção de URLs assinadas (`urls.ts`, `utils.ts`, `asset-contract.ts`, `brand.ts`, `site-asset-utils.ts`).
- [ ] **3.2. Schema D1 SQLite & Camada de Dados**
  - [ ] Criar migration SQLite pura (`destination`, `case_body`, `client_slug`, índices) compatível com D1 (substituindo SQL PostgreSQL inválido da branch anterior).
  - [ ] Implementar `src/lib/d1/client.ts` (`getCloudflareContext({ async: true })` com fallback seguro) e `src/lib/d1/projects.ts` / `src/lib/d1/site-assets.ts`.
  - [ ] Atualizar `src/lib/portfolio/project-mappers.ts` e `src/lib/portfolio/fallbacks.ts` (sincronizar exatamente os 19 projetos reais; remover `cartoon-network-packaging` órfão e alinhar `zevi`).
  - [ ] Atualizar `src/lib/projects/landing-page-fallback.ts` removendo o gerador genérico (`Projeto do Portfólio Ghost Era`) e usando `notFound()` para slugs inválidos.
- [ ] **3.3. Rotas Públicas & Remoção de Chamadas Supabase Públicas**
  - [ ] Migrar `src/app/page.tsx`, `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/sitemap.ts` e `src/app/api/site-assets/route.ts` para ler do D1 primeiro.
  - [ ] Remover polling/leitura pública de `public_projects_view` em `FeaturedProjectsRealtime.tsx`, `PortfolioClient.tsx` e `useRealtimeAssets.ts`.
  - [ ] Remover preconnect/referências ao host morto `dpejskjpghoozbpfxkpf.supabase.co` e URLs legadas `umkmwbkwvulxtdodzmzf.supabase.co` em `public/` e `src/`.
- [ ] **3.4. Relinkagem de Assets & Recuperação de Conteúdo R2 → D1**
  - [ ] Gerar script idempotente (`scripts/build-d1-recovery-sql.mjs`) populando `portfolio_projects.gallery` (Ambev BEES, Dolce Gusto, Swift Week, Eudora, Mercado Pago) e `landing_pages.content` (`MasterProjectTemplateV3` validado por Zod) usando exclusivamente objetos R2 reais verificados.
  - [ ] Corrigir as 3 capas com `404` (`nestle`, `bidaya-parfums-scents-without-borders`, `ai-video`) após verificar existência de arquivo original local/`public/` ou variante real do mesmo projeto no R2.
  - [ ] Validar `public/anima-HERO-bidaya.html` e `public/site.assets/about/origin/cena-1..4/*.html` para eliminar URLs Supabase.
- [ ] **3.5. Admin Write/Read Parity**
  - [ ] Atualizar `admin/(protected)/trabalhos/*`, `landing-pages/actions.ts`, `midia/actions.ts`, `project-toggles.ts` e `MediaInput.tsx` para persistência consistente no D1 mantendo `__session` e validação Zod.

## Etapa 4: VALIDATION (Bloqueada até Etapa 3)
- [ ] Executar `pnpm run build-check` (`typecheck` + `lint`).
- [ ] Executar `pnpm test` (unitários Jest, incluindo testes de D1 repo, URL resolvers e template schema).
- [ ] Testar migrations + recovery SQL em D1 `--local` e iniciar preview Cloudflare local (`pnpm run build:cloudflare`).
- [ ] Executar suíte Playwright E2E completa (`pnpm test:e2e`) cobrindo Home (Top 8), `/portfolio` (19 projetos, filtros, paginação), todos os 19 `/projects/[slug]` e `/portfolio/[slug]`, About Origins e 0 requisições a `supabase.co`.
- [ ] Executar `graphify update .`.

## Etapa 5: CONFIRMATION & DEPLOY (Requer Autorização de Release)
- [ ] Exportar backup completo do D1 remoto (`wrangler d1 export`).
- [ ] Aplicar migrations SQLite + SQL de recuperação no D1 remoto (`--remote`) mediante aprovação explícita.
- [ ] Executar `pnpm run cf:deploy` mediante autorização explícita de deploy.
- [ ] Validar todas as rotas ao vivo em `https://portfoliodanilo.com` (HTTP 200 sem 503, sem fallback genérico, 100% R2).

