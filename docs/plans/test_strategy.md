# Estratégia de Testes — Recuperação de Roteamento, Dados e Mídia R2/D1

**Objetivo:** Garantir com evidência empírica (unitária, integração SQLite local e E2E Playwright contra build real) que **nenhum projeto redireciona para conteúdo genérico**, **nenhum asset público aponta para `supabase.co`**, e **nenhuma rota pública retorna `HTTP 503`**.

---

## 1. Testes Unitários (Jest — `pnpm test`)

### 1.1. Cobertura Existente a Preservar e Expandir
- `test/unit/r2-url-recovery.test.ts` *(a portar/validar de `6ec363e27`)*:
  - Normalização de URLs antigas `https://<ref>.supabase.co/storage/v1/object/public/...` e `render/image/public/...` para `https://assets.portfoliodanilo.com/...`.
  - Proteção estrita de URLs privadas/assinadas (`/storage/v1/object/sign/`, `/authenticated/`, query `token=`, `signature=`, `x-amz-*`) para nunca serem convertidas em CDN público.
- `test/unit/asset-contract.test.ts`, `test/unit/supabase-urls.test.ts`, `test/unit/utils.test.ts`, `test/unit/project-mapper.test.ts`, `test/unit/template-schema.test.ts`.

### 1.2. Novos Testes Unitários a Criar (TDD — Red → Green)
- `test/unit/d1-projects-repository.test.ts`:
  - Mock do binding `D1Database` (`prepare().bind().all()/first()`): valida mapeamento correto de `portfolio_projects` + `landing_pages` + `portfolio_project_tags` → `Project`.
  - Garante que quando `env.DB` lança exceção / está indisponível em dev/build, aciona fallback completo com todos os 19 slugs sem perder Top 8 da Home nem incluir slugs fantasmas (`cartoon-network-packaging`).
  - Garante que `getLandingPageBySlugFromD1('slug-inexistente')` retorna `null` (nunca `"Projeto do Portfólio Ghost Era"`).
- `test/unit/recovery-sql-integrity.test.ts`:
  - Valida o payload JSON gerado pelo script `build-d1-recovery-sql.mjs` contra `MasterProjectTemplateV3Schema` (Zod) para todos os 19 projetos.
  - Asserta zero URLs contendo `supabase.co`, zero placeholders em branco onde há ativo R2 disponível, e presença dos blocos/galerias reais em `tcotton`, `nestle`, `swift-week`, `conid`, `bidaya`, `ambev-bees`, `campanhas-digitais`, `eudora`, `mercado-livre-ai-video-mp`.

---

## 2. Testes de Integração Local D1 SQLite

1. Executar `npx wrangler d1 migrations apply portfolio-db --local` (ou `wrangler d1 execute --local --file=...`).
2. Aplicar o script SQL de recuperação no banco `--local`.
3. Rodar query de integridade via CLI:
   - `SELECT COUNT(*) FROM portfolio_projects WHERE is_published = 1;` → esperado `19`.
   - `SELECT COUNT(*) FROM portfolio_projects WHERE featured_on_home = 1;` → esperado `8`.
   - `SELECT COUNT(*) FROM landing_pages WHERE content != '[]' AND length(content) > 20;` → esperado `19`.
   - `SELECT COUNT(*) FROM portfolio_projects WHERE thumbnail_path LIKE '%supabase.co%' OR hero_image_path LIKE '%supabase.co%' OR url_landscape LIKE '%supabase.co%' OR url_square LIKE '%supabase.co%' OR gallery LIKE '%supabase.co%';` → esperado `0`.
   - `SELECT COUNT(*) FROM landing_pages WHERE content LIKE '%supabase.co%' OR cover LIKE '%supabase.co%';` → esperado `0`.

---

## 3. Testes End-to-End (Playwright — `pnpm test:e2e`)

Executar contra servidor local conectado ao D1/build real (evitando depender de mocks que mascarem quebra de rota):

1. **Auditoria de Rede e Console em Todas as Rotas (`/` `/portfolio` `/sobre` + 19x `/projects/[slug]` + 19x `/portfolio/[slug]`):**
   - Interceptar `page.on('request')` e `page.on('response')`:
     - **FALHA se** houver qualquer requisição para `*.supabase.co/storage/` ou `dpejskjpghoozbpfxkpf.supabase.co` em rotas públicas.
     - **FALHA se** qualquer rota retornar `HTTP >= 500` (`503`).
     - **FALHA se** houver `pageerror` ou `console.error` fatal não tratado.
2. **Validação de Conteúdo Real nos 19 Projetos (`/projects/[slug]`):**
   - Asserta ausência do texto `"Projeto do Portfólio Ghost Era"`, `"Cliente Confidencial"` e `"Branding-Project.webp"` genérico.
   - Asserta presença do título/cliente real correspondente ao projeto no DOM.
   - Asserta que imagens visíveis têm `img.complete && img.naturalWidth > 0` e vídeos têm `readyState >= 1` ou `src` válido respondendo `200`.
3. **Fluxo Completo de Clique Card → Destino (Home & `/portfolio`):**
   - Na Home (`/`): localizar cards em destaque, clicar e confirmar navegação para destino real esperado sem erro 404/503 nem loopback em placeholder.
   - Em `/portfolio`: testar paginação (`page=1` e `page=2` somando todos os 19 projetos), filtros de categoria (`Videos & Motions`, `Brand & Campaigns`, `Websites & Tech`), abertura de modal + link para Case Study.
   - Rota inválida `/projects/slug-que-nao-existe-123` → deve retornar **HTTP 404** semântico (não renderizar caso sintético `"Ghost Era"`).
4. **Regressão Visual & Mobile (`about-origin.spec.ts` + `portfolio.spec.ts`):**
   - Desktop (`1440x900`) e Mobile (`390x844` touch): validar About Origins (`/sobre`) carregando `cena-01..04.webp` (`naturalWidth > 0`) e responsividade sem overflow horizontal.

---

## 4. Critérios Objetivos de Aprovação (Gate para Deploy)
- `pnpm run typecheck`: `0` erros.
- `pnpm run lint`: `0` erros.
- `pnpm test`: `100%` pass (nenhum teste pulado silenciosamente).
- `pnpm test:e2e`: `100%` pass em desktop + mobile com `0` 503s, `0` URLs Supabase em páginas públicas e `0` mídias R2 quebradas (`404`).
- `pnpm run build:cloudflare`: build OpenNext concluído sem erros de bundle ou runtime Edge/Node.

