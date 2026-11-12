# Plano de Implementação — Recuperação de Roteamento, Dados e Conteúdo (Supabase → Cloudflare R2 / D1)

**Branch Prevista (após aprovação):** `fix/portfolio-routing-and-content-recovery` a partir de `main` (`b19654c48`)  
**Pré-requisito Absoluto:** Aprovação humana explícita no Gate de Revisão antes de modificar qualquer arquivo ou executar scripts no D1 remoto.

---

## Objetivo Final
Restaurar o portfólio completo em ambiente local e em produção (`https://portfoliodanilo.com`) operando **100% sobre Cloudflare D1 + Cloudflare R2** no runtime público (`CLOUDFLARE_ONLY`), garantindo que:
1. Todos os **19** projetos publicados apareçam corretamente na Home (Top 8 destacados) e em `/portfolio` (todos os 19 com paginação e filtros por tags reais).
2. Cada card direcione corretamente para seu trabalho original (`/projects/[slug]` ou modal com galeria real + CTA para o case), sem nenhum fallback genérico `"Projeto do Portfólio Ghost Era"`.
3. Todas as imagens, vídeos e galerias apontem para objetos verificados no R2 (`https://assets.portfoliodanilo.com/...`) sem requisições legadas a `supabase.co` nem erros `HTTP 503`.

---

## Fase 0: Preparação & Preservação (Após Aprovação)
1. Criar a branch `fix/portfolio-routing-and-content-recovery` a partir de `main` (`git checkout -b fix/portfolio-routing-and-content-recovery`).
2. Realizar snapshot de segurança do D1 remoto (`npx wrangler d1 export portfolio-db --remote --output=backups/d1-pre-recovery-20261111.sql`) em diretório ignorado/temporário seguro (nunca comitar segredos/dumps não previstos).
3. Aplicar os ganhos auditados de normalização R2 do commit `6ec363e27` (`src/lib/supabase/urls.ts`, `src/lib/utils.ts`, `src/lib/media/asset-contract.ts`, `src/config/brand.ts`, `src/lib/supabase/site-asset-utils.ts`, `test/unit/r2-url-recovery.test.ts`), revisando cada arquivo antes de comitar.

---

## Fase 1: Camada de Dados Unificada Cloudflare D1 + Correção de Schema SQLite

### 1.1. Migrations SQLite Compatíveis com D1
Criar migration SQLite pura em `cloudflare/migrations/0002_add_project_routing_and_case_columns.sql` (verificada antes em D1 `--local`):
- Adicionar colunas faltantes em `portfolio_projects` compatíveis com SQLite:
  - `destination TEXT DEFAULT '{"type":"internal_landing"}'`
  - `case_body TEXT`
  - `client_slug TEXT`
- Garantir índices em `portfolio_projects(slug)`, `portfolio_projects(is_published, featured_portfolio_order)`, `portfolio_projects(featured_on_home, featured_home_order)`, `landing_pages(slug)` e `site_assets(is_active, page, sort_order)`.
- Evitar views PostgreSQL (`WITH (security_invoker = true)`, `DO $$`, `JSONB`, `NOTIFY`, `GRANT`).

### 1.2. Repositório Unificado D1 (`src/lib/d1/`)
Criar módulos server-only limpos e tipados para leitura pública e administrativa no Cloudflare Workers / OpenNext:
- `src/lib/d1/client.ts`: Helper seguro `getD1Database()` usando `await getCloudflareContext({ async: true })` (documentado no Context7 para SSG/ISR + OpenNext), retornando `null` em build-time/Jest sem crashar.
- `src/lib/d1/projects.ts`:
  - `getHomeFeaturedProjectsFromD1()`: retorna os **8** projetos com `is_published = 1 AND featured_on_home = 1 ORDER BY featured_home_order ASC`, já hidratados com `tags` (`portfolio_project_tags` JOIN `portfolio_tags`), `landing_page_slug`, `destination` e URLs normalizadas para R2.
  - `getPortfolioProjectsFromD1()`: retorna os **19** projetos com `is_published = 1` ordenados por `featured_portfolio_order ASC`, com tags, `gallery` parseado de JSON, `destination`, `case_body`, `landing_page_slug` e URLs R2.
  - `getProjectBySlugFromD1(slug)`: busca projeto publicado por `slug` (ou alias mapeado, ex. `zevi` -> `zevi-identidade-visual-branding-cafe-premium` apenas se necessário por redirect), com tags e `landing_page`.
  - `getLandingPageBySlugFromD1(slug)`: busca `landing_pages` por `slug` fazendo `LEFT JOIN portfolio_projects` para enriquecer metadados/cover se necessário; valida `content` com `MasterProjectTemplateV3Schema`.
  - `getSiteAssetsFromD1()`: lê `site_assets WHERE is_active = 1` sem depender da coluna inexistente `file_url`, derivando `publicUrl` via `getR2PublicAssetUrl(bucket, file_path)`.

### 1.3. Atualização das Rotas Públicas (Eliminação dos 503s causados por Supabase)
- [`src/app/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/page.tsx): Buscar featured projects e site assets via D1 (`getHomeFeaturedProjectsFromD1`, `getSiteAssetsFromD1`) com fallback estático completo (não apenas 4 itens de `content.ts`), mantendo ISR/dynamic seguro no OpenNext.
- [`src/app/portfolio/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/portfolio/page.tsx): Ler todos os 19 projetos e tags do D1; remover dependência de `createStaticClient()` Supabase.
- [`src/app/portfolio/[slug]/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/portfolio/[slug]/page.tsx): Consultar `getProjectBySlugFromD1(slug)`; se existir `landing_page_slug` e `destination.type === 'internal_landing'`, apresentar corretamente ou redirecionar conforme arquitetura do case; se inexistente → `notFound()`.
- [`src/app/projects/[slug]/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/projects/[slug]/page.tsx): Consultar `getLandingPageBySlugFromD1(slug)`; validar conteúdo estruturado; remover o gerador genérico de fallback e acionar `notFound()` para slugs inválidos.
- [`src/app/sitemap.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/sitemap.ts) e [`src/app/api/site-assets/route.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/api/site-assets/route.ts): Migrar integralmente para D1.
- [`src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/featured-projects/FeaturedProjectsRealtime.tsx), [`src/app/portfolio/PortfolioClient.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/portfolio/PortfolioClient.tsx) e [`src/hooks/useRealtimeAssets.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/hooks/useRealtimeAssets.ts): Remover chamadas públicas no browser ao Supabase (`public_projects_view` / Realtime channel) quando operando em `CLOUDFLARE_ONLY` (evitando erros de console/rede para `dpejskjpghoozbpfxkpf.supabase.co`), consumindo dados SSR do D1 (ou endpoint `/api/site-assets` quando necessário).

---

## Fase 2: Recuperação e Relinkagem de Assets & Conteúdo Real (R2 → D1)

1. **Gerador Determinístico de Conteúdo a partir de R2 + D1 Verificados** (`scripts/build-d1-recovery-sql.mjs` — offline/idempotente, gera SQL revisável antes de aplicar):
   - Ler inventário R2 verificado (`.agents/artifacts/asset-recovery/02-asset-inventory.json`) + export atual do D1 (`portfolio_projects`, `landing_pages`, `portfolio_tags`).
   - **Popular `portfolio_projects.gallery` (JSON array)** nos projetos com galerias reais confirmadas `HTTP 200` no R2:
     - `ambev-bees` (`13` imagens webp)
     - `campanhas-digitais` (`7` imagens webp)
     - `swift-week` (`6` imagens gallery + `7` blocos `landing-pages/swift-week`)
     - `eudora` (`4` imagens gallery)
     - `mercado-livre-ai-video-mp` (`3` imagens gallery + `1` logo)
   - **Popular `landing_pages.content` (`MasterProjectTemplateV3` validado por Zod)** para todos os **19** projetos:
     - Utilizar **exatamente** `project_title`, `project_client`, `project_year`, `project_tags` reais do D1 + `hero_cover_image` R2 verificado + `gallery_grid` / blocos reais dos objetos existentes em `site-assets/landing-pages/<slug>/` (`tcotton` 34 blocos, `nestle` 22 peças, `swift-week` 7 blocos, `bidaya-parfums-scents-without-borders` 6 camadas/logo, `conid` 5 blocos) e `portfolio-media/*/gallery/`.
     - Projetos sem blocos extras no R2 (`key-vision`, `swift`, `hellmanns-parcerias`, `animale`, `zevi-identidade-visual-branding-cafe-premium`, `cbre`, `mapfre`, `dntro`, `glad`, `ai-video`) recebem estrutura limpa com capa hero real (vídeo ou imagem verificada), logo home quando houver (`key-vision`, `animale`, `mercado-livre-ai-video-mp`), descrição/sumário editorial factual sem placeholders genéricos, e `destination` calibrado (`modal` com `case_body`/CTA quando não houver case extenso, ou `internal_landing` com mídia hero real).
2. **Resolução das 3 Capas `404` (`bidaya`, `nestle`, `ai-video`) e Eliminação de Legacy URLs:**
   - Para `nestle`: atualizar capa 16:9 / 1:1 / `landing_pages.cover` no D1 para ativo real da própria campanha em `site-assets/landing-pages/nestle/` (`HTTP 200`, ex.: `STORIES-NESTLE-100-ANOS--PROMO1920X1080px-v2.webp` ou `KV-SAUDAVEIS-NESTLE-08.webp` + `INSTAGRAM_PATROCINADO_900x900.webp` para 1:1) — zero placeholder!
   - Para `bidaya-parfums-scents-without-borders`: apontar para `site-assets/landing-pages/bidaya-parfums-scents-without-borders/anima-thumb/bg-16.9.webp` (`HTTP 200`) ou re-empacotar cover composto verificado das camadas oficiais no R2, e atualizar [`public/anima-HERO-bidaya.html`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/anima-HERO-bidaya.html) para usar `https://assets.portfoliodanilo.com/...`.
   - Para `ai-video`: verificar se algum vídeo MP4 local em `public/site.assets/images-videos/` corresponde à versão 16:9; caso negativo, usar `portfolio-media/projeto-pessoal/ai-video/assets-do-projeto/cover-1x1/ai-thumb-1-1-compressed.6ae532a6f68a3b42.mp4` (`HTTP 200`) até fornecimento do arquivo 16:9 original.
3. **Limpeza de Fallbacks e `public/` Legado:**
   - Sincronizar [`src/lib/portfolio/fallbacks.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/portfolio/fallbacks.ts) com exatamente os **19** projetos reais do D1 (incluindo `key-vision`, `campanhas-digitais`, `swift`, `conid` e removendo `cartoon-network-packaging` se não existir no D1).
   - Limpar referências `umkmwbkwvulxtdodzmzf.supabase.co` em [`public/404.css`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/404.css), [`public/manifest.json`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/manifest.json), [`public/manifest-qr.json`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/manifest-qr.json), [`public/anima-HERO-bidaya.html`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/anima-HERO-bidaya.html), `public/site.assets/about/origin/cena-1..4/*.html` e remover default/preconnect DNS para `dpejskjpghoozbpfxkpf.supabase.co` / `supabase.co` no SSR público ([`src/app/layout.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/layout.tsx), [`src/lib/env.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/env.ts), [`next.config.mjs`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/next.config.mjs)).

---

## Fase 3: Paridade do Admin & Remoção do Gargalo Supabase

1. Atualizar [`src/app/admin/(protected)/trabalhos/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/admin/(protected)/trabalhos/page.tsx), [`trabalhos/[id]/page.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/admin/(protected)/trabalhos/[id]/page.tsx), [`trabalhos/actions.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/admin/(protected)/trabalhos/actions.ts), [`src/lib/supabase/actions/project-toggles.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/supabase/actions/project-toggles.ts), [`landing-pages/actions.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/admin/(protected)/landing-pages/actions.ts) e [`midia/actions.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/admin/(protected)/midia/actions.ts) para ler/gravar no D1 (`env.DB`) como fonte principal no runtime Cloudflare, preservando validação Zod, `requireAdminAccess` / `__session` e upload para R2 (`portfolio-assets`) sem depender de `supabase.from(...)` quando Supabase estiver offline.
2. Ajustar [`src/components/admin/blocks/MediaInput.tsx`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/admin/blocks/MediaInput.tsx) para aceitar e normalizar URLs `assets.portfoliodanilo.com` sem assumir apenas `supabase.co`.

---

## Fase 4: Verificação Local (Unit + Build + Cloudflare Preview + Playwright E2E)

1. Rodar `pnpm run typecheck && pnpm run lint && pnpm test`.
2. Aplicar migrations e seed SQLite no D1 `--local` (`wrangler d1 execute portfolio-db --local`) e validar com `wrangler pages/opennextjs` preview local.
3. Executar suíte Playwright E2E completa validando as 19 rotas `/projects/[slug]`, `/portfolio/[slug]`, Home, `/portfolio` (paginação + filtros), `/sobre` (About Origins `cena-01..04.webp`), e zero chamadas a `supabase.co`.
4. Atualizar o grafo semântico do código (`graphify update .`) após as modificações e validar o build de produção Cloudflare (`pnpm run build:cloudflare`).

---

## Fase 5: Gate de Implantação & Confirmação Remota

1. Somente após nova autorização explícita para operação remota e deploy:
   - Exportar backup do D1 remoto.
   - Aplicar migration SQLite + SQL idempotente de recuperação no D1 `--remote`.
   - Executar deploy Cloudflare (`pnpm run cf:deploy`).
   - Rodar smoke test E2E / HTTP contra `https://portfoliodanilo.com` confirmando 0 respostas `503`, 0 casos `"Ghost Era"`, e carregamento integral das mídias R2.
