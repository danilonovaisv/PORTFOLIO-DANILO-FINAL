# Decision Log (ADRs) — Recuperação de Roteamento e Conteúdo no Cloudflare R2/D1

**Data:** 2026-11-11  
**Status:** Proposto para Revisão Humana (Pré-Execução)

---

## ADR-001: Fonte de Dados Primária nas Rotas Públicas e Admin (D1-First com Fallback Estático Verificado)

- **Contexto:** Atualmente o app lê/escreve exclusivamente no Supabase nas rotas públicas (`/`, `/portfolio`, `/portfolio/[slug]`, `/projects/[slug]`, `/api/site-assets`, `/sitemap.ts`), mesmo após a migração dos dados para o Cloudflare D1 (`portfolio-db`) e R2 (`portfolio-assets`). O host configurado em produção (`dpejskjpghoozbpfxkpf.supabase.co`) não resolve DNS, causando bloqueios de SSR, HTTP 503 intermitente e queda no fallback genérico.
- **Decisão:** Criar uma camada unificada de repositório D1 (`src/lib/d1/` ou `src/lib/data/`) usando `getCloudflareContext({ async: true })` (`@opennextjs/cloudflare`) para páginas/ISR e `getCloudflareContext()` para rotas dinâmicas/actions, eliminando consultas de runtime público ao Supabase. Manter fallback estático somente para desenvolvimento offline/SSG sem binding D1, construído exclusivamente a partir de snapshots verificados dos 19 projetos reais.
- **Alternativas Rejeitadas:**
  - *Manter Supabase em produção:* Rejeitado porque o host atual está inoperante (`Errno 8`) e o `wrangler.toml` já define `CLOUDFLARE_ONLY`.
  - *Consultar API HTTP do Supabase do browser:* Rejeitado porque causa erro de rede no cliente (`FeaturedProjectsRealtime`, `PortfolioClient`, `useRealtimeAssets`) e viola `CLOUDFLARE_ONLY`.
- **Riscos e Mitigação:** Em ambiente Jest ou dev Node puro sem `workerd`, `getCloudflareContext()` lança exceção; todo helper D1 deve encapsular `try { getCloudflareContext({ async: true }) } catch { return null }` e acionar fallback determinístico apenas quando `env.DB` não estiver disponível.

---

## ADR-002: Descarte das Migrations PostgreSQL da Branch `origin/fix/cloudflare-r2-asset-references` e Adoção de Migrations SQLite Puras para D1

- **Contexto:** Os commits `88841d513` (`20261111000000_populate_landing_pages_content.sql`) e `fc514d192` (`20261111000001_add_missing_columns_d1.sql`) na branch remota usam `BEGIN/COMMIT`, `DO $$`, `JSONB`, `ALTER TABLE public... ADD COLUMN IF NOT EXISTS`, `CREATE VIEW ... WITH (security_invoker = true)`, `GRANT` e `NOTIFY pgrst`. O Cloudflare D1 é SQLite e rejeita essa sintaxe.
- **Decisão:** Não aplicar essas migrations diretamente. Criar migrations SQLite dedicadas ao D1 (ex.: em `cloudflare/migrations/` ou pasta separada versionada sem quebrar convenções do D1) usando apenas DDL compatível com SQLite (`ALTER TABLE portfolio_projects ADD COLUMN destination TEXT DEFAULT ...`, `ADD COLUMN case_body TEXT`, `ADD COLUMN client_slug TEXT`, criação opcional de view SQLite simples sem `public.`/`security_invoker`), executadas após backup prévio (`wrangler d1 export`) mediante autorização explícita.
- **Alternativas Rejeitadas:** Reutilizar arquivos PostgreSQL em `supabase/migrations/` esperando compatibilidade cross-engine — comprovadamente falho para SQLite.

---

## ADR-003: Remoção do Gerador Genérico de Fallback (`getFallbackLandingPage`) em Favor de Dados Reais + `notFound()`

- **Contexto:** [`src/lib/projects/landing-page-fallback.ts`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/lib/projects/landing-page-fallback.ts) inventa um estudo de caso genérico (`"Projeto do Portfólio Ghost Era"`, `"Cliente Confidencial"`, `"2026"`, thumbnail estática genérica) para qualquer slug que não venha do banco. Isso viola a política **Zero Placeholder** e ocultou a quebra de **16 de 19** cases em produção atrás de `HTTP 200`.
- **Decisão:** Remover o gerador genérico de fallback. Slugs inexistentes no D1 (e fora do snapshot estático verificado) devem chamar `notFound()` do Next.js (HTTP 404 semântico), e os **19** projetos reais devem carregar seus dados completos de `landing_pages` + `portfolio_projects` no D1. Alinhar `zevi` ↔ `zevi-identidade-visual-branding-cafe-premium` garantindo resolução consistente de slug e evitando entradas órfãs como `cartoon-network-packaging`.
- **Alternativas Rejeitadas:** Gerar texto placeholder "Ghost Era" — rejeitado explicitamente pelo usuário e pela constituição Ghost System.

---

## ADR-004: Recuperação de Conteúdo dos Cases a Partir dos Ativos Reais no R2 (Sem Conteúdo Sintético)

- **Contexto:** Todas as 19 `landing_pages` no D1 possuem `content = "[]"`, mas o bucket `portfolio-assets` no R2 já armazena **75** blocos reais de `site-assets/landing-pages/*` (`tcotton` 34, `nestle` 22, `swift-week` 7, `bidaya` 6, `conid` 5, `topz` 1) e **33** imagens reais de `portfolio-media/*/gallery/` (`ambev-bees` 13, `campanhas-digitais` 7, `swift-week` 6, `eudora` 4, `mercado-livre-ai-video-mp` 3). Projetos como `key-vision`, `swift`, `hellmanns-parcerias`, `animale`, `zevi`, `cbre`, `mapfre`, `dntro`, `glad`, `ai-video` possuem apenas capa/logo/tags reais em D1 (e vídeos locais no `public/`), sem arquivos de galeria no R2.
- **Decisão:**
  1. Para projetos com blocos/galerias reais no R2 (`tcotton`, `nestle`, `swift-week`, `bidaya-parfums-scents-without-borders`, `conid`, `ambev-bees`, `campanhas-digitais`, `eudora`, `mercado-livre-ai-video-mp`), popular `portfolio_projects.gallery` e `landing_pages.content` (`MasterProjectTemplateV3` validado pelo Zod schema em `src/lib/projects/template-schema.ts`) **exclusivamente** com esses assets R2 verificados (`HTTP 200`), mais os metadados reais do projeto no D1 (título, cliente, marca, ano, categoria, tags).
  2. Para projetos que atualmente possuem apenas capa hero/vídeo sem galeria adicional no R2, configurar `destination` apropriado (ou caso `/projects/[slug]` enxuto baseado apenas em hero + metadados reais do D1, nunca inventando galerias ou textos fictícios, e marcando explicitamente no relatório quaisquer lacunas de mídia original caso o usuário queira subir assets adicionais no Admin).
  3. Para as 3 capas com `HTTP 404` (`bidaya`, `nestle`, `ai-video` 16:9), priorizar busca por arquivos originais locais/`public/` antes de promover a variante verificada do mesmo projeto no R2 mediante validação do usuário.
- **Alternativas Rejeitadas:** Reusar URLs aleatórias entre projetos diferentes ou usar `Branding-Project.webp` como capa substituta.

---

## ADR-005: Integração Seletiva da Branch `origin/fix/cloudflare-r2-asset-references`

- **Contexto:** A branch remota contém commits valiosos de resolução R2-first (`6ec363e27`) e correções de paginação/E2E (`cb5a58548`), misturados com commits problemáticos de migrations PostgreSQL (`88841d513`, `fc514d192`).
- **Decisão:** Criar nova branch a partir de `main` (ou reestruturar após aprovação) integrando seletivamente a lógica validada de normalização R2 (`urls.ts`, `utils.ts`, `asset-contract.ts`, `brand.ts`, `r2-url-recovery.test.ts`) e melhorias válidas de paginação/E2E, substituindo integralmente a camada de dados por D1 e migrations SQLite nativas.

---

## ADR-006: Segurança e Compatibilidade da Autenticação Admin

- **Contexto:** O sistema usa cookies com nome `__session` no ecossistema Cloudflare/Firebase e hoje exige `supabase.auth.getUser()` em `requireAdminAccess()` + mutações diretas em tabelas Supabase. Como `dpejskjpghoozbpfxkpf.supabase.co` falha em produção, as telas administrativas também correm risco de inoperância.
- **Decisão:** Planejar adaptação gradual de persistência das server actions admin (`trabalhos`, `landing-pages`, `midia`) para ler/escrever no Cloudflare D1 (`env.DB`) preservando proteção de sessão (`__session`), validação Zod e auditoria de alterações, sem jamais vazar credenciais ou remover controles de autorização existentes.

