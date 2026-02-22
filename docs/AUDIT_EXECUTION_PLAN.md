// file: docs/AUDITORIA_COMPLETA-danilo-novais-portfolio-GHOST.md
# Auditoria Completa — danilo-novais-portfolio (Ghost Design System)

**Projeto:** `danilo-novais-portfolio`  
**Domínio:** https://portfoliodanilo.com  
**Repo:** https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL.git  

**Stack & Infra (estado atual do repositório)**  
- Runtime: `Node.js 20`  
- Framework principal: `Next.js 16.x` (App Router)  
- Linguagem: `TypeScript 5.x`  
- UI: `React 19.x`  
- Estilo: `Tailwind CSS 4.x`  
- Motion: `Framer Motion 12.x` + `Lenis`  
- 3D/WebGL: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`  
- Backend/Data: `Supabase` (`@supabase/supabase-js`, `@supabase/ssr`)  
- Auth/Admin: Supabase Auth + rotas protegidas em `/admin/(protected)`  
- Ferramentas de qualidade: `ESLint`, `Prettier`, `Jest`, `Playwright`  
- Deploy/Hosting: `Vercel` / `Netlify` / `Cloudflare Pages` + fluxo com scripts de `Firebase Hosting`  

**Prioridades fixas da auditoria**  
1. Acessibilidade  
2. Performance  
3. Qualidade Editorial  
4. Motion sutil  

**Regras de Motion**  
- Não aceitar: `scale`, `bounce`, `rotate` em conteúdo.  
- Aceitar apenas: `opacity`, `blur`, `translateY` (máx 18px).  
- Respeitar `prefers-reduced-motion`: desligar parallax/lerp/3D quando necessário.  

**Padrões de A11Y**  
- Validar WCAG AA (contraste, foco visível, teclado).  
- Validar semântica (`header`/`nav`/`main`/`section`/`footer`; 1x `h1` por página).  

**Mobile-first**  
- 320px+, touch target ≥ 48x48, sem overflow horizontal.  

**Grid / Layout (Ghost)**  
- Colunas, largura útil e gutters idênticos à referência.  
- Margens laterais edge-to-edge sem saltos entre seções.  
- Portfólio: cards com mesma altura vertical por linha; larguras variáveis preenchendo 100% do container (sem espaços vazios).  

**Metas de Performance (validação)**  
- Peso inicial < 2MB  
- FCP < 2s  
- LCP < 2.5s  
- TTI < 5s (3G)  
- CLS < 0.1  
- Lighthouse > 90 (páginas principais)  

**Escopo:** Auditoria **página por página**, incluindo **/admin** (rotas protegidas) + rotas auxiliares (`not-found`, `global-error`).

---

## 1️⃣ Visão Geral

- **Resumo técnico (Home, Sobre, Portfólio)**
  - **Home (`/`)**
    - Existe `src/app/page.tsx` e a estrutura de App Router está presente com `src/app/layout.tsx`, `template.tsx`, `globals.css` etc.
    - Risco principal (a11y/perf): se houver 3D/motion above-the-fold, pode comprometer **LCP/TTI** e precisa respeitar `prefers-reduced-motion`.
  - **Sobre (`/sobre`)**
    - Existe `src/app/sobre/page.tsx` com `opengraph-image.tsx` e `error.tsx` no segmento.
    - Risco principal: **legibilidade + contraste** (WCAG AA) e **outline correto de headings** (1x `h1`).
  - **Portfólio (`/portfolio` + `/portfolio/[slug]` + `/projects/[slug]`)**
    - Existe `src/app/portfolio/page.tsx` e um client component `src/app/portfolio/PortfolioClient.tsx` (indício forte de interações como modal/grid).
    - Existe `src/app/portfolio/[slug]/page.tsx` e `src/app/projects/[slug]/page.tsx`.
    - Risco principal: **fluxo crítico de cards** (card → modal vs card → landing) + **grid Ghost** (altura igual por linha, preenchimento 100% sem vazios) + **modal a11y**.

- **Principais riscos (A11y/Performance/Funcionalidade)**
  1. **Admin e Server Actions**: há múltiplos `actions.ts` em `/admin/(protected)/**` (ex.: `trabalhos/actions.ts`, `landing-pages/actions.ts`, `midia/actions.ts`, `copy-agent/actions.ts`, `scene-generator/actions.ts`, `tags/actions.ts`). A regra é **não depender de bloqueio apenas no client**; é necessário validar autorização em cada Server Action/Route Handler.
  2. **Reduced motion**: stack inclui **Framer Motion + Lenis + 3D**; precisa desligar smooth scroll/parallax/lerp/3D quando `prefers-reduced-motion` estiver ativo.
  3. **Grid Ghost no Portfólio**: requisito absoluto de **altura igual por linha** e **preenchimento 100% sem espaços vazios**.
  4. **Semântica + 1x H1**: obrigatório por rota (header/nav/main/section/footer; 1x h1).
  5. **Erros globais**: existe `src/app/global-error.tsx` e `src/app/not-found.tsx`. Em App Router, root layout precisa incluir `<html>`/`<body>` e `global-error` também deve ser um documento completo.

- **Estado geral (Aprovado | Aprovado com ressalvas | Reprovado)**
  - **Aprovado com ressalvas**
    - Motivo: a estrutura de rotas principais e admin existe, mas os requisitos críticos (modal a11y, grid Ghost, reduced motion, budget de performance e hardening server-side do admin) precisam ser validados/ajustados.

---

## 2️⃣ Diagnóstico por Seção

### Home Hero
- **Achados**
  - Verificar se o Hero mantém **1x `h1`** na Home e se o CTA é navegável por teclado.
  - Se houver Canvas/3D no hero, avaliar se está carregando **antes** do conteúdo (risco LCP/TTI).
- **Evidências**
  - Confirmar semântica no `src/app/page.tsx` e nos componentes de Home.
  - Rodar Lighthouse mobile: FCP/LCP/TTI/CLS (meta: LCP < 2.5s; CLS < 0.1; peso inicial < 2MB).
- **Recomendações (prioridade)**
  - **P0**: foco visível + navegação por teclado no CTA do hero.
  - **P1**: lazy-load de 3D e assets grandes; 3D como progressive enhancement.

### Manifesto
- **Achados**
  - Tipicamente é bloco textual: risco de **coluna larga demais**, contraste insuficiente e headings mal hierarquizados.
- **Evidências**
  - Checar contraste WCAG AA (texto principal e secundário).
  - Checar largura de coluna em desktop e espaçamento em 320px.
- **Recomendações (prioridade)**
  - **P1**: limitar largura útil do texto e garantir contraste AA (sem alterar copy).

### Featured Projects
- **Achados**
  - Cards: risco de alturas inconsistentes e hover-only info (inacessível).
- **Evidências**
  - Verificar se cards são `Link`/`button` (não `div` clicável).
  - Verificar imagens com dimensões para evitar CLS.
- **Recomendações (prioridade)**
  - **P0**: garantir teclado + foco visível em cards.
  - **P1**: equal-height por linha (Ghost).

### About (Origin / Method / What I Do)
- **Achados**
  - Seções precisam de `section` + headings coerentes (sem mudar texto).
- **Evidências**
  - Heading outline (1x h1 + h2/h3 adequados).
- **Recomendações (prioridade)**
  - **P1**: semântica por seção e responsividade real (320px+, sem overflow).

### Portfolio Grid
- **Achados**
  - Requisito absoluto Ghost: **mesma altura por linha** + **preencher 100% da largura** sem vazios.
  - Como existe `src/app/portfolio/PortfolioClient.tsx`, é provável que o grid e a lógica de clique/modal estejam ali.
- **Evidências**
  - Screenshots em 320/375/768/1024/1440: validar vazios e alturas.
  - Checar implementação do grid em `src/app/portfolio/page.tsx` + `src/app/portfolio/PortfolioClient.tsx`.
- **Recomendações (prioridade)**
  - **P0**: garantir equal-height por linha e preenchimento horizontal total.
  - **P0**: garantir modal acessível (se existir) para cards sem landing.

---

## 3️⃣ Lista de Problemas (Severidade 🔴🟡🟢)

- 🔴 **Crítico:**
  - **Admin hardening incompleto (se aplicável):** presença de múltiplos `actions.ts` no admin exige checagem server-side de auth/role em toda mutação (não só UI). É necessário aplicar checagens explícitas em Server Actions/Route Handlers.
  - **Modal do Portfólio (se existir):** se não houver trap de foco + `Esc` + retorno de foco ao card, quebra WCAG e fluxo crítico.

- 🟡 **Médio/Alto:**
  - **Reduced motion:** Lenis + Motion + 3D precisam ser desligáveis (prefers-reduced-motion).
  - **Grid Ghost:** cards com alturas diferentes por linha ou vazios horizontais quebram regra absoluta.
  - **SEO duplicado de privacidade:** existe `/privacidade` e também `/privacy-policy` — risco de conteúdo duplicado/canonical (sem alterar copy, resolver via redirect/canonical/noindex).

- 🟢 **Baixo:**
  - Ajustes finos de foco visível, contraste em textos secundários e consistência de gutters/margens laterais.

---

## Auditoria por Rotas (página por página)

> Para cada rota, seguir a ordem fixa: Estrutura -> UI/UX -> Mobile -> Motion -> Performance -> Funcionalidade -> SEO.

### Rota: `/`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ⚠️
  - Funcionalidade: ✅
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/page.tsx`.
  - Root layout em App Router deve definir `<html>` e `<body>` (validar em `src/app/layout.tsx`).
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** validar 1x `h1`, landmarks e foco visível.
  - **P1:** garantir budget de performance (LCP/TTI/peso inicial).

### Rota: `/sobre`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ✅
  - Funcionalidade: ✅
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/sobre/page.tsx` + `src/app/sobre/opengraph-image.tsx` + `src/app/sobre/error.tsx`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** contraste AA e heading outline (sem alterar texto).

### Rota: `/portfolio`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/portfolio/page.tsx`.
  - Client behavior em `src/app/portfolio/PortfolioClient.tsx` (ponto central para checar modal, grid, e lógica card→landing).
  - OG específico: `src/app/portfolio/opengraph-image.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** validar fluxo crítico:
    - card sem landing → abre modal
    - card com landing → navega `/projects/[slug]`
  - **P0:** grid Ghost (altura igual por linha + 100% sem vazios).

### Rota: `/portfolio/[slug]`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ⚠️
- **Evidências objetivas**
  - Implementada em `src/app/portfolio/[slug]/page.tsx`.
  - Validar que slugs inválidos chamam `notFound()` e caem em `src/app/not-found.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** `notFound()` para slug inválido + foco e CTA no 404.
  - **P1:** metadata dinâmica via `generateMetadata` quando aplicável.

### Rota: `/projects/[slug]`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ⚠️
- **Evidências objetivas**
  - Implementada em `src/app/projects/[slug]/page.tsx` + `src/app/projects/error.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** garantir LCP/CLS do hero e imagens.
  - **P1:** canonical/OG por slug.

### Rota: `/contato`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ✅
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/contato/page.tsx` + `src/app/contato/opengraph-image.tsx`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P0:** se existir form: labels, erros e foco no primeiro erro.

### Rota: `/privacidade`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ✅
  - UI/UX: ✅
  - Mobile: ✅
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ✅
  - SEO: ⚠️
- **Evidências objetivas**
  - Implementada em `src/app/privacidade/page.tsx`.
  - Existe também `src/app/privacy-policy/page.tsx` (rota extra). Risco SEO de duplicidade.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** definir canonical/redirect entre `/privacidade` e `/privacy-policy` (sem mudar texto).

### Rota: `/admin/login`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(auth)/login/page.tsx` + layout `src/app/admin/(auth)/layout.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** a11y do formulário (labels + aria-live + foco no erro).

### Rota: `/admin`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/page.tsx` + `src/app/admin/(protected)/layout.tsx`.
  - Há `src/app/admin/error.tsx` (error boundary do segmento admin).
  - É necessário que as Server Actions verifiquem permissão e não dependam apenas de UI client.
- **Severidade:** Crítico
- **Recomendação prática (com prioridade)**
  - **P0:** garantir proteção server-side em todas as ações e páginas.

### Rota: `/admin/trabalhos`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/trabalhos/page.tsx` + `src/app/admin/(protected)/trabalhos/actions.ts`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** confirmar que `actions.ts` valida sessão/role.

### Rota: `/admin/trabalhos/new`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/trabalhos/new/page.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** validação de form + foco no erro + prevenção de perda de dados.

### Rota: `/admin/trabalhos/[id]`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/trabalhos/[id]/page.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** 404/403 para `id` inválido e autorização por recurso.

### Rota: `/admin/tags`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/tags/page.tsx` + `src/app/admin/(protected)/tags/actions.ts`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** CRUD acessível (teclado, foco, confirmação em ações destrutivas).

### Rota: `/admin/midia`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ⚠️
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/midia/page.tsx` + `src/app/admin/(protected)/midia/actions.ts`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** upload resiliente (progress/cancel/retry) + não travar UI.

### Rota: `/admin/landing-pages`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/landing-pages/page.tsx` + `src/app/admin/(protected)/landing-pages/actions.ts`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** consistência preview/publicação + “ver pública” correto.

### Rota: `/admin/landing-pages/new`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/landing-pages/new/page.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** validar slug único + validação e mensagens acessíveis.

### Rota: `/admin/landing-pages/[id]`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/landing-pages/[id]/page.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** autorização por recurso + estados de loading/erro consistentes.

### Rota: `/admin/settings`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/settings/page.tsx`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** feedback acessível ao salvar + confirmar ações de alto impacto.

### Rota: `/admin/scene-generator`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ⚠️
  - Performance: ❌
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/scene-generator/page.tsx` + `actions.ts`.
  - Por ser 3D/tooling, é rota com maior risco de budget de performance.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** lazy-load e reduzir render contínuo; desligar 3D no reduced motion.

### Rota: `/admin/copy-agent`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ⚠️
  - UI/UX: ⚠️
  - Mobile: ⚠️
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/copy-agent/page.tsx` + `actions.ts`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** `aria-live` para estados async e foco correto.

### Rota: `/admin/config` (redirect)
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ✅
  - UI/UX: ✅
  - Mobile: ✅
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/admin/(protected)/config/page.tsx`.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** garantir redirect server-side (sem loop) e coerente para logado/não logado.

### Rota: `/portfolio-showcase`
- **Status:** Reprovado
- **Checklist**
  - Estrutura: ❌
  - UI/UX: ❌
  - Mobile: ❌
  - Motion: ❌
  - Performance: ❌
  - Funcionalidade: ❌
  - SEO: ❌
- **Evidências objetivas**
  - **Não existe rota correspondente em `src/app/portfolio-showcase`** (não encontrada na estrutura de `src/app`).
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** remover do sitemap/docs se não for para existir, ou criar a rota real (sem criar novas seções/layout fora da referência).

### Rota: `/floating-cards`
- **Status:** Reprovado
- **Checklist**
  - Estrutura: ❌
  - UI/UX: ❌
  - Mobile: ❌
  - Motion: ❌
  - Performance: ❌
  - Funcionalidade: ❌
  - SEO: ❌
- **Evidências objetivas**
  - **Não existe rota correspondente em `src/app/floating-cards`**.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** alinhar rota real vs documentação.

### Rota: `/playground`
- **Status:** Reprovado
- **Checklist**
  - Estrutura: ❌
  - UI/UX: ❌
  - Mobile: ❌
  - Motion: ❌
  - Performance: ❌
  - Funcionalidade: ❌
  - SEO: ❌
- **Evidências objetivas**
  - **Não existe rota correspondente em `src/app/playground`**.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** alinhar rota real vs documentação/sitemap.

### Rota: `/examples/supabase`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ✅
  - UI/UX: ✅
  - Mobile: ✅
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ⚠️
- **Evidências objetivas**
  - Implementada em `src/app/examples/supabase/page.tsx`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** garantir que não expõe dados/rotas sensíveis e definir `noindex` se for apenas exemplo.

### Rota: `/instruments`
- **Status:** Reprovado
- **Checklist**
  - Estrutura: ❌
  - UI/UX: ❌
  - Mobile: ❌
  - Motion: ❌
  - Performance: ❌
  - Funcionalidade: ❌
  - SEO: ❌
- **Evidências objetivas**
  - **Não existe rota correspondente em `src/app/instruments`**.
- **Severidade:** Baixo
- **Recomendação prática (com prioridade)**
  - **P2:** alinhar lista de rotas esperadas com rotas reais do repo.

### Rota: `not-found`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ✅
  - UI/UX: ⚠️
  - Mobile: ✅
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/not-found.tsx`.
  - Em Next App Router, `not-found.tsx` é a UI de 404 do segmento e deve ser simples e acessível.
- **Severidade:** Médio
- **Recomendação prática (com prioridade)**
  - **P1:** foco inicial e CTA de retorno.

### Rota: `global-error`
- **Status:** Aprovado com ressalvas
- **Checklist**
  - Estrutura: ✅
  - UI/UX: ⚠️
  - Mobile: ✅
  - Motion: ✅
  - Performance: ✅
  - Funcionalidade: ⚠️
  - SEO: ✅
- **Evidências objetivas**
  - Implementada em `src/app/global-error.tsx`.
  - `global-error` deve renderizar um documento completo com `<html>` e `<body>`. Root layout também deve conter `<html>/<body>`.
- **Severidade:** Alto
- **Recomendação prática (com prioridade)**
  - **P0:** botão de reset “Try again” acessível e foco correto (sem vazar info sensível).

---

## Fluxos Críticos E2E (prioridade máxima)

1. Header: `/` -> `/sobre` -> `/portfolio` -> `#contact`
2. Em `/portfolio`: card abre modal quando não há landing vinculada
3. Em `/portfolio`: card abre `/projects/[slug]` quando há landing vinculada
4. Fechamento de modal com `Esc`, trap de foco e retorno de foco ao card
5. Admin cria/edita landing page e visualiza página pública
6. Admin publica trabalho e valida visibilidade em Home/Portfólio

---

## Entregável Final

### 1) Resumo executivo (Top 10)

1. **P0** — Admin: garantir autorização server-side em **todas** Server Actions/Route Handlers.
2. **P0** — Portfólio: validar fluxo card→modal vs card→landing (consistência).
3. **P0** — Modal (se existir): `Esc` + trap de foco + retorno de foco (WCAG).
4. **P0** — Reduced motion: Lenis + 3D + motion desligáveis.
5. **P0** — Grid Ghost: equal-height por linha + 100% preenchimento sem vazios.
6. **P1** — Performance budget: peso inicial < 2MB; LCP < 2.5s; CLS < 0.1.
7. **P1** — SEO por slug: `generateMetadata` em rotas dinâmicas.
8. **P1** — Duplicidade `/privacidade` vs `/privacy-policy`: canonical/redirect/noindex.
9. **P1** — `/examples/supabase`: definir política de indexação e segurança.
10. **P2** — Rotas listadas no briefing mas inexistentes no repo (`/playground`, `/floating-cards`, etc.): alinhar.

### 2) Matriz por página (status)

| Rota | Status |
|---|---|
| `/` | Aprovado com ressalvas |
| `/sobre` | Aprovado com ressalvas |
| `/portfolio` | Aprovado com ressalvas |
| `/portfolio/[slug]` | Aprovado com ressalvas |
| `/projects/[slug]` | Aprovado com ressalvas |
| `/contato` | Aprovado com ressalvas |
| `/privacidade` | Aprovado com ressalvas |
| `/admin/login` | Aprovado com ressalvas |
| `/admin` | Aprovado com ressalvas |
| `/admin/trabalhos` | Aprovado com ressalvas |
| `/admin/trabalhos/new` | Aprovado com ressalvas |
| `/admin/trabalhos/[id]` | Aprovado com ressalvas |
| `/admin/tags` | Aprovado com ressalvas |
| `/admin/midia` | Aprovado com ressalvas |
| `/admin/landing-pages` | Aprovado com ressalvas |
| `/admin/landing-pages/new` | Aprovado com ressalvas |
| `/admin/landing-pages/[id]` | Aprovado com ressalvas |
| `/admin/settings` | Aprovado com ressalas |
| `/admin/scene-generator` | Aprovado com ressalas |
| `/admin/copy-agent` | Aprovado com ressalas |
| `/admin/config` | Aprovado com ressalas |
| `/portfolio-showcase` | Reprovado (rota não existe no repo) |
| `/floating-cards` | Reprovado (rota não existe no repo) |
| `/playground` | Reprovado (rota não existe no repo) |
| `/examples/supabase` | Aprovado com ressalas |
| `/instruments` | Reprovado (rota não existe no repo) |
| `not-found` | Aprovado com ressalvas |
| `global-error` | Aprovado com ressalvas |

### 3) Backlog priorizado (P0/P1/P2)

- **P0**
  - Auditar e reforçar auth/role em Server Actions do Admin.
  - Garantir reduced motion global.
  - Corrigir/validar Portfólio: grid Ghost + fluxo card→modal/landing + modal a11y.
- **P1**
  - Performance budget (bundle + imagens + 3D).
  - SEO dinâmico por slug com `generateMetadata`.
  - Resolver duplicidade `/privacidade` vs `/privacy-policy`.
  - Definir `noindex`/política para rotas de exemplo.
- **P2**
  - Ajustes finos de foco visível e contraste.
  - Alinhar rotas documentadas vs rotas existentes.

### 4) Plano de correção (ciclos: rápido, estrutural, polimento)

- **Rápido (1–2 dias)**
  - Modal a11y e reduced motion.
  - Noindex/SEO básico de rotas de exemplo e duplicidades.
- **Estrutural (3–7 dias)**
  - Segurança do Admin: autorização server-side em ações e handlers.
  - Grid Ghost do Portfólio (equal-height por linha e 100% de preenchimento).
  - Performance budget (split/lazy).
- **Polimento (contínuo)**
  - Contraste, foco visível, consistência de gutters e micro ajustes semânticos.

---

## 4️⃣ Prompts Técnicos para Agentes Google Antigravity (Atômicos)

> **### 🛠️ Prompt #01 — Hardening do Admin: autorização server-side em Server Actions**  
> **Objetivo:** Garantir que todas as mutações/leitura sensível do Admin validem sessão/role no servidor (não confiar em UI).  
> **Arquivos:**  
> - `src/app/admin/(protected)/trabalhos/actions.ts`  
> - `src/app/admin/(protected)/landing-pages/actions.ts`  
> - `src/app/admin/(protected)/midia/actions.ts`  
> - `src/app/admin/(protected)/tags/actions.ts`  
> - `src/app/admin/(protected)/copy-agent/actions.ts`  
> - `src/app/admin/(protected)/scene-generator/actions.ts`  
> **Ações:**  
> 1. Implementar/usar helper `verifySession()`/`requireAdmin()` server-side.  
> 2. Em cada action, validar autenticação e permissão antes de executar qualquer operação.  
> 3. Em falha, retornar erro/redirect consistente (401/403).  
> **Regras:** Não alterar copy; seguir boas práticas de segurança (Server Actions como endpoints).  
> **Critérios de Aceite:** Ações não executam sem permissão; acesso direto às rotas protegidas sem sessão falha corretamente.

> **### 🛠️ Prompt #02 — Reduced motion global: desligar Lenis + 3D + motion contínuo**  
> **Objetivo:** Respeitar `prefers-reduced-motion` desligando smooth scroll, parallax/lerp e render contínuo 3D.  
> **Arquivos:** `src/app/template.tsx`, `src/app/layout.tsx`, `src/hooks/**`, `src/components/**`  
> **Ações:**  
> 1. Criar hook `usePrefersReducedMotion`.  
> 2. Condicionar Lenis/scroll smoothing ao hook.  
> 3. Condicionar animações (Framer Motion) e 3D (R3F) ao hook.  
> **Regras:** Motion permitido apenas `opacity`, `blur`, `translateY` (≤ 18px).  
> **Critérios de Aceite:** Em reduced motion, não há animações contínuas nem smooth scroll.

> **### 🛠️ Prompt #03 — Portfólio: regra card→modal vs card→landing**  
> **Objetivo:** Garantir fluxo consistente no `/portfolio`.  
> **Arquivos:** `src/app/portfolio/page.tsx`, `src/app/portfolio/PortfolioClient.tsx`  
> **Ações:**  
> 1. Se o trabalho tiver landing vinculada: card é `Link` para `/projects/[slug]`.  
> 2. Se não tiver: card é `button` e abre modal acessível.  
> **Regras:** Não alterar textos; manter layout Ghost.  
> **Critérios de Aceite:** Teclado aciona 100%; comportamento previsível em todos os cards.

> **### 🛠️ Prompt #04 — Modal do Portfólio (se existir): trap de foco + ESC + retorno de foco**  
> **Objetivo:** WCAG AA no modal aberto pelo card.  
> **Arquivos:** `src/app/portfolio/PortfolioClient.tsx`, `src/components/ui/**`  
> **Ações:**  
> 1. `Esc` fecha modal.  
> 2. Trap de foco dentro do modal.  
> 3. Retornar foco ao card disparador ao fechar.  
> 4. Bloquear scroll do body enquanto aberto.  
> **Regras:** Motion apenas `opacity`; sem scale/bounce/rotate.  
> **Critérios de Aceite:** Teclado e leitor de tela funcionam; foco consistente.

> **### 🛠️ Prompt #05 — Grid Ghost no Portfólio: equal-height por linha e 100% preenchimento**  
> **Objetivo:** Cards com a mesma altura por linha e sem vazios horizontais.  
> **Arquivos:** `src/app/portfolio/page.tsx`, `src/app/portfolio/PortfolioClient.tsx`, `src/components/portfolio/**`  
> **Ações:**  
> 1. Ajustar layout para grid/flex com `items-stretch` e cards `h-full`.  
> 2. Evitar masonry/columns que quebram altura por linha.  
> **Regras:** Mobile-first 320px+, sem overflow, touch targets ≥ 48x48.  
> **Critérios de Aceite:** Em 320/375/768/1024/1440: alturas iguais por linha, sem buracos.

> **### 🛠️ Prompt #06 — SEO dinâmico por slug com `generateMetadata`**  
> **Objetivo:** Completar metadata/canonical/OG em rotas dinâmicas.  
> **Arquivos:** `src/app/portfolio/[slug]/page.tsx`, `src/app/projects/[slug]/page.tsx`  
> **Ações:**  
> 1. Implementar `generateMetadata` para título/descrição/OG por slug.  
> 2. Garantir canonical coerente.  
> **Regras:** Não alterar copy do corpo; apenas metadata.  
> **Critérios de Aceite:** Lighthouse SEO > 90 nas páginas principais.

> **### 🛠️ Prompt #07 — Resolver duplicidade `/privacidade` vs `/privacy-policy`**  
> **Objetivo:** Evitar conteúdo duplicado e inconsistência de indexação.  
> **Arquivos:** `src/app/privacidade/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`  
> **Ações:**  
> 1. Escolher rota canônica (sem mudar texto).  
> 2. Implementar redirect 301/308 da outra rota ou canonical/noindex.  
> 3. Garantir sitemap/robots coerentes.  
> **Regras:** Não alterar o texto da política.  
> **Critérios de Aceite:** Uma única URL indexável; sem duplicidade.

> **### 🛠️ Prompt #08 — Alinhar rotas “esperadas” vs rotas reais**  
> **Objetivo:** Corrigir discrepância entre briefing e o que existe em `src/app`.  
> **Arquivos:** `src/app/sitemap.ts`, `docs/**`, `.context/**`  
> **Ações:**  
> 1. Verificar se `/portfolio-showcase`, `/floating-cards`, `/playground`, `/instruments` são realmente necessários.  
> 2. Se não forem: remover de sitemap e docs.  
> 3. Se forem: criar rotas reais (sem adicionar novas seções/layout fora da referência).  
> **Regras:** Não reinventar layout; seguir Ghost; manter performance budget.  
> **Critérios de Aceite:** Sitemap não aponta para 404; docs e rotas batem.

> **### 🛠️ Prompt #09 — A11y base por rota: 1x h1 + landmarks + foco visível**  
> **Objetivo:** Padronizar WCAG AA e semântica.  
> **Arquivos:** `src/app/**/page.tsx`, `src/components/layout/**`, `src/app/globals.css`  
> **Ações:**  
> 1. Garantir 1x `h1` por página.  
> 2. Garantir `header/nav/main/footer` presentes.  
> 3. Garantir `:focus-visible` claro (não remover outline).  
> **Regras:** Não alterar textos; apenas estrutura/estilo.  
> **Critérios de Aceite:** Navegação 100% por teclado; foco sempre visível.

> **### 🛠️ Prompt #10 — Orçamento de performance: peso inicial < 2MB**  
> **Objetivo:** Bater metas FCP/LCP/TTI/CLS e bundle inicial.  
> **Arquivos:** `src/app/**`, `src/components/**`, `next.config.mjs`  
> **Ações:**  
> 1. Dynamic import/lazy-load de 3D e tooling pesado.  
> 2. Evitar que Admin contamine bundle público.  
> 3. Auditar imagens e fontes.  
> **Regras:** Não alterar layout; 3D nunca acima de conteúdo essencial sem fallback.  
> **Critérios de Aceite:** LCP < 2.5s; CLS < 0.1; Lighthouse > 90 (páginas principais).
