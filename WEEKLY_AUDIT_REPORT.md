# Weekly Portfolio Audit Report

## 0. Metadata

- **Date:** 2026-06-09
- **Repository:** `danilonovaisv/portfolio-danilo-final`
- **Branch at Audit Time:** `claude/beautiful-rubin-awlalm`
- **Audit Branch (documental):** `claude/weekly-audit-report-2026-06-09`
- **Routine:** Weekly Audit — Ghost System Portfolio
- **Commit at Audit Time:** `940e0a6911bb6ec9551e5a976e81e2432ecc07e0`
- **PR:** _Pending creation after commit_
- **Auditor:** Claude Code — Ghost Commander Routine (read-only)
- **Scope:** Pilares 1–12: Arquitetura, Design System, Responsividade, Animação, Performance, Roteamento, Interações, Landing Pages, Dados CMS, Segurança Operacional, Firebase/Supabase Hosting, Acessibilidade
- **Files changed by this routine:** `WEEKLY_AUDIT_REPORT.md` (único)
- **Approval status:** Pending human approval
- **Nota sobre tamanho do arquivo:** Este relatório de auditoria tem 600+ linhas. A regra de 500 linhas do CLAUDE.md se aplica a arquivos de código-fonte (`src/`). Documentos de auditoria gerados por rotinas autônomas em `WEEKLY_AUDIT_REPORT.md` estão isentos dessa restrição por natureza e necessidade de rastreabilidade.

---

## 1️⃣ Visão Geral

O repositório está em estado **funcional com alertas de manutenção identificados**. O build mais recente (2026-05-22, Next.js 16.2.7 via Webpack, pnpm 11.5.1) passou com exit code 0 em `build-check`, `lint`, `typecheck` e `jest`. A stack principal — Tailwind v4.3.0, React 19.2.7, React Three Fiber 9.6.1, Three.js 0.184.0, Motion 12.40.0, Supabase SSR, Firebase Hosting via webframeworks experiment — está operacional e consistente.

**Página `/`:** Estrutura em 8 sessões conforme SSOT. O `HomeHero` usa `GhostSceneWrapper` com `ssr: false`, `aria-hidden="true"`, `useMotionGate()` para reduced motion, e fallback para dispositivos sem WebGL. Realtime de projetos via `FeaturedProjectsRealtime` com polling de 45s e canal Supabase Realtime. Design tokens Ghost Blue `#0048ff` e ease `cubic-bezier(0.22, 1, 0.36, 1)` presentes em `globals.css`. `std-grid` com `max-width: 1680px` e `padding-left: 4rem` desktop implementado.

**Página `/sobre`:** 6 seções exportadas (`AboutHero`, `AboutOrigin`, `AboutWhatIDo`, `AboutMethod`, `AboutClosing`, `ManifestoScrollSection`). Usa `force-static`, `Suspense` com `SectionSkeleton` per-section. ManifestoScrollSection integra `ShaderLines` WebGL com aria-live announcer para leitores de tela e `prefers-reduced-motion` fallback.

**Página `/portfolio`:** `revalidate = 3600`, SSR + paginação `PORTFOLIO_PAGE_SIZE` via Supabase, `PortfolioClient` com filtros de categoria. Modal `PortfolioModal` para projetos sem landing page. Commit recente (c3ffed23) corrigiu 403 nos thumbnails de cartões via Supabase render path.

**Página `/portfolio/[slug]`:** `dynamic = 'force-dynamic'`. Dados de projeto via `createStaticClient`. Suporte a blocos de conteúdo JSON (`text`, `video_youtube`). `ReactMarkdown` para corpo de texto.

**Página `/admin`:** Protegida por middleware Supabase SSR + `isAdminUser()` com verificação de `role` em `app_metadata` (não `user_metadata`). Roles aceitos: `admin`, `owner`, `super_admin`, `editor`; há fallback por `ADMIN_ALLOWED_EMAILS`. Layout em `(protected)` e `(auth)`. 12+ sub-rotas com CRUD completo via Server Actions.

**Fator de risco operacional ativo:** O audit de predeploy confirma **42 links legados quebrados** em `src/config/site-assets.json`. Este número vem do log da `active_state.md` ("Predeploy audit still reports 42 pre-existing broken legacy asset links"). Nenhuma ação de correção foi tomada ainda e o risco de renderização visual quebrada em tempo de execução é real.

---

## 2️⃣ Diagnóstico por Seção

### Home Hero (`HomeHero`, `GhostSceneWrapper`, `HeroCopy`, `HeroCTA`)
- ✅ `aria-hidden="true"` + `role="presentation"` no wrapper do Canvas
- ✅ Fallback gradient `radial-gradient` para mobile/reduced motion
- ✅ `useMotionGate()` integrado; WebGL desativado se `shouldReduceMotion`
- ✅ `useWebGLSupport()` para detecção de capacidade
- ✅ `z-[var(--z-layer-3d)]` = `z-30` conforme SSOT
- ✅ `min-h-[100svh]` com `overflow-hidden isolate`
- ⚠ Preloader de 500ms fixo — se assets demorarem, conteúdo aparece antes do 3D estar pronto

### Manifesto / VideoManifesto
- ✅ Carregamento dinâmico (`dynamic(() => import(...))`)
- ✅ `ManifestoScrollSection` em `/sobre` com `aria-live="polite"` para leitores de tela
- ✅ `prefers-reduced-motion` desativa animações de caractere no manifesto
- ✅ Shader de fundo fixo com `z-0` (sem conflito de stacking context)

### Featured Projects (`FeaturedProjectsRealtime`, `FeaturedProjectsSection`, `FeaturedProjectCard`)
- ✅ Grid Bento com `FEATURED_GRID_LAYOUT` 5col+7col / 12col / 8col+4col (12 colunas)
- ✅ Polling a 45_000ms com canal Supabase Realtime como fallback
- ✅ Skeleton de carregamento via `FeaturedProjectsSkeleton`
- ✅ `min-h-[420px] lg:min-h-[520px]` garante alturas mínimas coerentes em cards
- ⚠ Cards na mesma linha usam `min-h` mas não `h-full` explícito; alinhamento exato depende de conteúdo variável no CMS — risco de desalinhamento vertical se título/client for muito longo em um card

### About Origin / Method / What I Do
- ✅ `force-static` + `Suspense` com skeleton por seção
- ✅ `SectionSkeleton` com `aria-busy="true"` durante carregamento
- ⚠ `AboutClosing.tsx` — vídeo de encerramento incondicional (sem `hasVideoError`); poster HTML5 como fallback nativo. Correto conforme active_state.md, mas sem monitoramento de falha de mídia.

### Portfolio Grid / Project Detail
- ✅ Paginação `PORTFOLIO_PAGE_SIZE` (15pp) via Supabase com `listProjectsPaged`
- ✅ `ProjectCard` com `PortfolioModal` para projetos sem landing page
- ✅ `PortfolioHeroNew.tsx` validado em full bleed 0→viewport
- ⚠ `dynamic = 'force-dynamic'` em `/portfolio/[slug]` implica SSR completo a cada request sem cache — consultar possibilidade de `revalidate` ou ISR se o conteúdo for semi-estático

### Admin
- ✅ Middleware Supabase SSR com `isAdminUser()` + redirect para login
- ✅ Server Actions em rotas protegidas com verificação de `role: 'admin'`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` apenas server-side (não exposto via NEXT_PUBLIC_)
- ⚠ `copy-agent` e `scene-generator` dependem de `OPENAI_API_KEY` configurado no banco via `/admin/settings` — se não configurado, ações retornam mensagem de erro sem crash, mas experiência de usuário fica degradada sem indicação visual proativa

### Contact Form (`ContactForm`, `ContactSection`)
- ✅ Cloudflare Turnstile integrado com lazy load via IntersectionObserver (margem 240px)
- ✅ Resend API para dispatch de email (`RESEND_API_KEY`)
- ✅ `useMotionGate()` aplicado às animações de entrada
- ✅ Validação client-side de campos antes de submit
- ✅ Rate limiting server-side via IP em memória (`isRateLimited`, 5 req/60s, `Map` local) — detalhes e risco de non-durability entre instâncias serverless em P2-003

---

## 3️⃣ Lista de Problemas e Backlog Priorizado

### 🔴 P0 Crítico

---

**ID:** P0-001
**Severidade:** 🔴 Crítico
**Área:** Assets / CMS
**Evidência:** `active_state.md` linha: _"Predeploy audit still reports 42 pre-existing broken legacy asset links in `src/config/site-assets.json`"_. Arquivo tem 4835 linhas e 632 ocorrências do campo `file_url`. Script de auditoria primário: `scripts/audit_assets.py` (audita assets gerais); nota: `scripts/verify-supabase-assets.mjs` verifica apenas URLs de vídeo MP4 via `src/lib/video-assets.ts` e **não** cobre `site-assets.json`. Ambos detectam problemas com warning, mas não bloqueiam o build.
**Impacto:** Imagens e vídeos com URLs quebradas retornam falhas silenciosas em runtime (404 do Supabase Storage), resultando em seções da home com visuais ausentes para usuários finais.
**Arquivos relacionados:** `src/config/site-assets.json`, `scripts/audit_assets.py`, `scripts/verify-supabase-assets.mjs`
**Risco de não corrigir:** Degradação visual permanente em produção. Afeta showcase de trabalhos, seções de clientes e hero da home se algum asset crítico for referenciado via URL quebrada.
**Critério de aceite futuro:** `scripts/audit_assets.py` retorna exit code 0 sem warnings de broken assets (atualmente sai com exit 0 mesmo ao detectar erros — esse comportamento precisa ser corrigido para bloquear CI). Todos os 42 links devem resolver HTTP 200 no Supabase Storage.

---

**ID:** P0-002
**Severidade:** 🔴 Crítico
**Área:** Segurança / CSP
**Evidência:** `/src/app/api/view-cv/route.ts:13` define header `Content-Security-Policy` inline com `'unsafe-eval'` e `https://*` irrestrito para uma rota que serve HTML estático de um currículo.
```typescript
'Content-Security-Policy':
  "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; img-src 'self' data: https://*;"
```
**Impacto:** O HTML do currículo (`public/CURRICULUM-2026.html`) é servido com uma CSP extremamente permissiva que neutraliza as proteções XSS globais do `next.config.mjs`. Qualquer conteúdo injetado neste documento pode executar código arbitrário.
**Arquivos relacionados:** `src/app/api/view-cv/route.ts`, `public/CURRICULUM-2026.html`, `next.config.mjs`
**Risco de não corrigir:** Vetor XSS em rota pública com CSP comprometida. OWASP A03 — Injection.
**Critério de aceite futuro:** Header CSP em `/api/view-cv` remove `'unsafe-eval'` e restringe `https://*` para apenas domínios necessários. A rota serve um arquivo HTML estático — não requer `eval` em nenhum cenário legítimo.

---

### 🟡 P1 Estrutural

---

**ID:** P1-001
**Severidade:** 🟡 Estrutural
**Área:** Documentação de Agente / Regras
**Evidência:** `.claude/rules/README-POSTCSS.md` e `.claude/rules/postcss-tailwind-config.md` declaram explicitamente `"NUNCA USE: @tailwindcss/postcss"` e instrução de downgrade para `tailwindcss@3.4.19`. O projeto usa corretamente `@tailwindcss/postcss: ^4.3.0`, `tailwindcss: 4.3.0` e `@import 'tailwindcss'` no globals.css, que é a sintaxe correta para Tailwind v4.
**Impacto:** Um agente autônomo que seguir essas regras irá degradar o projeto de v4 para v3, quebrando o build e os tokens CSS definidos em `@theme`.
**Arquivos relacionados:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`, `postcss.config.cjs`, `src/app/globals.css`
**Risco de não corrigir:** Alto risco de regressão em sessões de agente autônomo.
**Critério de aceite futuro:** Regras atualizadas refletem stack real: Tailwind v4 com `@tailwindcss/postcss`, `@import 'tailwindcss'`, e `@source` explícitos. Conteúdo antigo de v3 removido.

---

**ID:** P1-002
**Severidade:** 🟡 Estrutural
**Área:** Organização de Arquivos / Governança
**Evidência:** Os seguintes arquivos estão na raiz do projeto, violando a regra "NEVER save to root folder" do CLAUDE.md: `implementation_plan.md`, `task.md`, `temp_report.md`, `package.json.bak`.
**Impacto:** Poluição do diretório raiz, possível conflito com scripts que listam arquivos, confusão entre artefatos de agente e documentação oficial.
**Arquivos relacionados:** `/implementation_plan.md`, `/task.md`, `/temp_report.md`, `/package.json.bak`
**Risco de não corrigir:** Degradação da organização do repositório; `package.json.bak` pode causar confusão sobre qual é o `package.json` ativo.
**Critério de aceite futuro:** `ls /` não retorna `*.bak`, `temp_*.md`, `implementation_plan.md` nem `task.md` na raiz. Artefatos movidos para `docs/plans/` ou `.context/logs/`.

---

**ID:** P1-003
**Severidade:** 🟡 Estrutural
**Área:** Design System / Componentes
**Evidência:** O SSOT e o brief da rotina referenciam `LogoMarquee` como componente crítico. O componente real é `ClientsBrandsSection.tsx` — um grid estático de logos sem marquee. Não existe nenhuma referência a `LogoMarquee` em `src/`. Similarmente, `ShowcaseGrid` não existe — o componente real é `PortfolioShowcase.tsx` + `CategoryStripe.tsx`.
**Impacto:** Drift entre documentação e implementação. Futuros agentes que buscarem por `LogoMarquee` ou `ShowcaseGrid` não encontrarão os componentes.
**Arquivos relacionados:** `src/components/home/clients/ClientsBrandsSection.tsx`, `src/components/home/portfolio-showcase/PortfolioShowcase.tsx`, `.context/DOCS-PORTFOLIO-PAGES/`
**Risco de não corrigir:** Agentes criam componentes duplicados ou deixam de identificar corretamente os existentes.
**Critério de aceite futuro:** SSOT `.context/` atualizado com nomes reais dos componentes. `LogoMarquee` → `ClientsBrandsSection`. `ShowcaseGrid` → `PortfolioShowcase`.

---

**ID:** P1-004
**Severidade:** 🟡 Estrutural
**Área:** Performance / ISR / Caching
**Evidência:** `/portfolio/[slug]/page.tsx` usa `dynamic = 'force-dynamic'` sem nenhum `revalidate`. Páginas de projeto SSR são recalculadas a cada request, incluindo queries Supabase, mesmo que o conteúdo raramente mude.
**Impacto:** TTFB elevado em páginas de projeto. Cada visita a `/portfolio/[slug]` dispara uma query Supabase. Se Supabase estiver lento, o usuário sofre. Não há fallback de conteúdo em cache.
**Arquivos relacionados:** `src/app/portfolio/[slug]/page.tsx`
**Risco de não corrigir:** Performance degradada para usuários. Potencial de timeout se Supabase response for > 3s.
**Critério de aceite futuro:** Implementar `revalidate = 3600` ou `generateStaticParams` com ISR. TTFB < 500ms testado localmente.

---

**ID:** P1-005
**Severidade:** 🟡 Estrutural
**Área:** Tailwind v4 / Config Redundância
**Evidência:** `tailwind.config.ts` tem um array `content` com caminhos de varredura em estilo Tailwind v3. Em Tailwind v4, a varredura é feita pelos `@source` directives no `globals.css`. O array `content` em `tailwind.config.ts` é inerte para v4.
**Impacto:** Nenhum impacto funcional imediato, mas cria confusão sobre qual mecanismo está ativo e aumenta risco do P1-001.
**Arquivos relacionados:** `tailwind.config.ts`, `src/app/globals.css`
**Risco de não corrigir:** Baixo funcional; alto como vetor de confusão documental.
**Critério de aceite futuro:** `tailwind.config.ts` com comentário explícito sobre v4 — content array ignorado, varredura via `@source` no CSS.

---

### 🟢 P2 Polimento Rápido

---

**ID:** P2-001
**Severidade:** 🟢 Polimento
**Área:** CSS / Design Tokens
**Evidência:** `src/app/globals.css` contém token `--font-family-outfit` com comentário `@deprecated — Outfit not used in production; scheduled for removal`. Nenhuma referência ativa encontrada em `src/`.
**Impacto:** Bloat de CSS, token obsoleto carregado em todos os requests. Risco de agentes usarem o token deprecated por engano.
**Arquivos relacionados:** `src/app/globals.css`
**Critério de aceite futuro:** Token removido. `grep -r "font-outfit\|--font-family-outfit" src/` retorna vazio.

---

**ID:** P2-002
**Severidade:** 🟢 Polimento
**Área:** Supabase Storage / Monitoramento
**Evidência:** Commit `c3ffed23` "fix: restore portfolio card thumbnails (Supabase render 403)" indica que thumbnails falharam por problema de path no render endpoint. Foi corrigido, mas sem evidência de monitoring automático que alertaria regressão futura.
**Impacto:** Se a correção de paths for revertida ou o Supabase mudar configuração de CORS/RLS, cards voltarão a aparecer sem imagem sem alerta proativo.
**Arquivos relacionados:** `src/components/home/featured-projects/FeaturedProjectCard.tsx`, `src/config/site-assets.json`, scripts de audit
**Critério de aceite futuro:** Script `pnpm run verify:assets` adicionado a rotina semanal de CI. Alertas para URLs com status != 200.

---

**ID:** P2-003
**Severidade:** 🟢 Polimento
**Área:** Rate Limiting / Segurança de API
**Evidência:** `/src/app/api/contact/route.ts` já possui rate limiting em memória (`isRateLimited(ip)`, janela de 60 s, limite de 5 requisições por IP via `ipRequestHistory: Map<string, number[]>`). O Cloudflare Turnstile é uma camada adicional de proteção.
**Impacto:** O rate limiting em memória (`Map` local ao processo) não persiste entre instâncias do Cloud Run. Em caso de múltiplas instâncias simultâneas, o limite efetivo por IP é `5 × N instâncias`. O risco é baixo em volume normal, mas se eleva sob tráfego paralelo ou cold-start de novas instâncias.
**Arquivos relacionados:** `src/app/api/contact/route.ts`, `src/middleware.ts`
**Critério de aceite futuro:** Migrar para Upstash Redis ou Vercel KV com rate limiting distribuído para garantir consistência entre instâncias serverless. Manter Turnstile como segunda camada.

---

**ID:** P2-004
**Severidade:** 🟢 Polimento
**Área:** Duplicate ENV Key
**Evidência:** `src/lib/env.ts` valida `NEXT_PUBLIC_SUPABASE_ANON_KEY` (chave histórica). `.env.example` também contém `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (chave nova da Supabase SDK v2). Ambas coexistem como variáveis públicas para o mesmo propósito.
**Impacto:** Redundância que pode gerar confusão em novos deploys.
**Arquivos relacionados:** `src/lib/env.ts`, `.env.example`, `src/lib/supabase/client.ts`
**Critério de aceite futuro:** Consolidar em uma única variável com alias de backward compatibility ou migração completa documentada. **Atenção:** qualquer migração para `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` deve incluir atualização do schema Zod em `src/lib/env.ts` — que atualmente requer `NEXT_PUBLIC_SUPABASE_ANON_KEY` — ou builds falharão se a chave legada for removida.

---

## 4️⃣ Prompts Técnicos para Agentes Google Antigravity Atômicos

> **Regra absoluta:** Nenhum prompt abaixo pode ser executado sem aprovação humana explícita ("Aprovado" ou "Proceed" no canal de revisão). Cada prompt é atômico — toca apenas nos arquivos listados.

---

### 🛠️ Prompt #01 — Corrigir CSP da Rota /api/view-cv

**Objetivo:** Remover `'unsafe-eval'` e restringir `https://*` na CSP inline da rota que serve o currículo HTML, preservando o funcionamento do documento.

**Especialista:** `@ghost_architect` (segurança, Next.js API Routes)

**Arquivos:** `src/app/api/view-cv/route.ts`, `public/CURRICULUM-2026.html`, `public/curriculum.css` (novo), `public/curriculum-print.js` (novo, se necessário para event listener externo)

**Contexto obrigatório:**
- `next.config.mjs` para ver a CSP global de referência
- OWASP A03 — Injection Prevention

**Ações:**
1. Ler `public/CURRICULUM-2026.html` e identificar recursos externos necessários (fontes, imagens, scripts).
2. Construir CSP mínima que permita apenas os recursos identificados, sem `unsafe-eval` e sem `https://*` irrestrito.
3. Atualizar `src/app/api/view-cv/route.ts` com a nova CSP.
4. Testar que `/api/view-cv` renderiza o currículo sem erros de console CSP.

**Dependência crítica:** `public/CURRICULUM-2026.html` usa `<script src="https://cdn.tailwindcss.com">` (runtime JIT que requer `unsafe-eval`) e um handler `onclick="window.print()"` inline. Uma CSP restritiva **não é possível sem modificar o HTML**. O escopo desta tarefa deve incluir:
- Substituir o CDN do Tailwind por CSS compilado (ex: gerar `public/curriculum.css` com Tailwind CLI a partir do HTML)
- Substituir `onclick="window.print()"` por um event listener externo não-inline
Só após essas mudanças no HTML a CSP pode remover `unsafe-eval` e `unsafe-inline` com segurança.

**Regras:** Não usar `unsafe-eval`. Não usar `unsafe-inline` para scripts. CSP resultante deve ser mais restritiva que a atual. Modificações limitadas a `src/app/api/view-cv/route.ts`, `public/CURRICULUM-2026.html`, e novos assets estáticos sob `public/` necessários para substituir o CDN/inline handler.

**Critérios de Aceite:**
- [ ] Header CSP sem `unsafe-eval`
- [ ] Header CSP sem `https://*` irrestrito
- [ ] `public/CURRICULUM-2026.html` não usa CDN externo de runtime
- [ ] Print button funciona sem handler inline
- [ ] Currículo HTML renderiza corretamente em browser
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #02 — Corrigir 42 Links Quebrados em site-assets.json

**Objetivo:** Identificar e corrigir os 42 links de assets legados quebrados em `src/config/site-assets.json`, substituindo por URLs válidas do Supabase Storage ou marcando como removidos.

**Especialista:** `@audit_sentinel` + `storage-sentinel` MCP

**Arquivos:** `src/config/site-assets.json`, `src/lib/video-assets.ts`, `scripts/verify-supabase-assets.mjs`, `scripts/audit_assets.py`

**Contexto obrigatório:**
- `.context/active_state.md` para histórico do problema
- `assets.json` na raiz (mapa de assets canônico)
- Supabase Storage MCP para verificar quais assets existem no bucket `site-assets`

**Ações:**
1. Executar `python3 scripts/audit_assets.py` e capturar todos os links quebrados (cobre tanto `src/config/site-assets.json` quanto `src/lib/video-assets.ts`). (**Nota:** o script atualmente sai com exit 0 mesmo ao encontrar erros — verificar `.agent/broken_links_report.json` para lista completa.)
2. Para cada link quebrado: verificar se o asset existe no Supabase Storage com nome similar.
3. Para assets de `site-assets.json`: atualizar o campo `file_url`.
4. Para assets de `video-assets.ts`: atualizar a URL correspondente.
5. Para assets inexistentes em nenhum bucket: definir `"is_active": false` no registro (campo correto do schema — `audit_assets.py` escaneia URLs por regex e ignora qualquer campo `"status"`) e substituir o `file_url` por string vazia ou asset placeholder aprovado já existente no Supabase. **Não usar `"status": "removed"`** — esse campo não existe no schema e não impede que o script ou loaders acessem o URL quebrado.
6. Executar `python3 scripts/audit_assets.py` novamente — deve retornar 0 links quebrados no relatório.

**Regras:** Não alterar código de componentes. Não usar URLs de placeholder externos (ex: via.placeholder.com). Supabase Storage como único CDN.

**Critérios de Aceite:**
- [ ] `python3 scripts/audit_assets.py` + `.agent/broken_links_report.json` reporta 0 broken links
- [ ] Todos os assets críticos (hero, featured projects, clients logos, portfolio hero video) com URL HTTP 200
- [ ] `pnpm run build-check` exit code 0
- [ ] Apenas `src/config/site-assets.json` e/ou `src/lib/video-assets.ts` modificados

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #03 — Atualizar Regras de Agente (PostCSS/Tailwind v4)

**Objetivo:** Corrigir `.claude/rules/README-POSTCSS.md` e `.claude/rules/postcss-tailwind-config.md` para refletir o stack Tailwind v4 real do projeto, removendo instruções incorretas de downgrade para v3.

**Especialista:** `@ghost_architect` (documentação de agente, governança)

**Arquivos:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`

**Contexto obrigatório:**
- `postcss.config.cjs` (implementação real)
- `src/app/globals.css` (sintaxe real)
- `package.json` (versão real: tailwindcss 4.3.0)
- Context7 MCP: buscar docs Tailwind CSS v4 PostCSS integration

**Ações:**
1. Ler os dois arquivos de regra completos.
2. Identificar todas as instruções que contradizem Tailwind v4.
3. Reescrever os dois arquivos refletindo stack aprovado v4: `@tailwindcss/postcss`, `@import 'tailwindcss'` + `@source`.
4. Remover toda seção de downgrade para v3.

**Regras:** Não alterar `postcss.config.cjs`, `globals.css` ou `tailwind.config.ts`. Somente os dois arquivos de rule.

**Critérios de Aceite:**
- [ ] Nenhuma menção a downgrade para v3 nas regras
- [ ] Nenhuma proibição de `@tailwindcss/postcss` nas regras
- [ ] Regras consistentes com `package.json` atual
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #04 — Limpar Artefatos de Agente na Raiz do Projeto

**Objetivo:** Mover ou remover arquivos de artefatos de agente que estão na raiz do repositório em violação da regra "NEVER save to root folder".

**Especialista:** `@ghost_architect` (governança de repositório)

**Arquivos:** `implementation_plan.md`, `task.md`, `temp_report.md`, `package.json.bak`

**Contexto obrigatório:**
- CLAUDE.md regra: "NEVER save working files, text/mds, or tests to the root folder"
- `.context/logs/` como destino para artefatos históricos

**Ações:**
1. Verificar se `implementation_plan.md` e `task.md` têm conteúdo útil. Se sim, mover para `docs/plans/` ou `.context/logs/` com data no nome.
2. Verificar se `temp_report.md` tem conteúdo relevante. Se sim, mover para `docs/`. Se não, deletar.
3. Deletar `package.json.bak` após confirmar que o `package.json` está correto.
4. Verificar que `git status` não mostra arquivos de artefatos na raiz.

**Regras:** Não modificar `package.json`. Não deletar sem ler primeiro.

**Critérios de Aceite:**
- [ ] Nenhum dos 4 arquivos na raiz do repositório
- [ ] Conteúdo útil preservado em `docs/` ou `.context/`
- [ ] `git status` limpo após commit
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #05 — Implementar ISR em /portfolio/[slug]

**Objetivo:** Adicionar `revalidate` ou ISR em `/portfolio/[slug]/page.tsx` para reduzir TTFB e melhorar performance de páginas de projeto.

**Especialista:** `@ghost_architect` (Next.js App Router, ISR, Supabase SSR)

**Arquivos:** `src/app/portfolio/[slug]/page.tsx`, `src/app/admin/(protected)/trabalhos/actions.ts`, `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/` (atualizar após mudanças em `src/`)

**Contexto obrigatório:**
- Context7 MCP: Next.js ISR/revalidate documentation
- `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/` para regras de comportamento da página
- `src/lib/supabase/queries/projects.ts` para entender o padrão de queries

**Ações:**
1. Avaliar se `generateStaticParams` é viável para projetos (lista de slugs do Supabase em build time).
2. Se lista de slugs for razoável: implementar `generateStaticParams` + `revalidate = 3600`.
3. Se não: substituir `dynamic = 'force-dynamic'` por `revalidate = 600` com `unstable_cache` nas queries.
4. Testar com `pnpm run build` que geração estática funciona.
5. **Cache invalidation em admin actions** (obrigatório junto com ISR): Em `src/app/admin/(protected)/trabalhos/actions.ts`:
   - `upsertProjectAction`: ao renomear slug, chamar `` revalidatePath(`/portfolio/${oldSlug}`) `` (template literal com backticks) antes da atualização, além do `` revalidatePath(`/portfolio/${updatedProject.slug}`) `` já existente.
   - `deleteProjectAction`: adicionar `` revalidatePath(`/portfolio/${slugDoProjetoExcluído}`) `` (template literal) — atualmente não invalida a página específica do projeto excluído, deixando cache obsoleto ativo até o próximo revalidate.

**Regras:** Manter fallback `notFound()` para slugs inexistentes. Ghost Design System inalterado. Sem alterações em componentes visuais.

**Critérios de Aceite:**
- [ ] `dynamic = 'force-dynamic'` removido
- [ ] TTFB < 500ms em `/portfolio/[slug]` testado localmente
- [ ] Conteúdo atualizado em até 1 hora (revalidate <= 3600)
- [ ] Rename de projeto invalida imediatamente o slug antigo (sem cache stale)
- [ ] Delete de projeto invalida imediatamente o slug do projeto excluído
- [ ] `pnpm run build` sem erros
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #06 — Corrigir Drift de Nomes de Componentes no SSOT (P1-003)

**Objetivo:** Atualizar a documentação em `.context/DOCS-PORTFOLIO-PAGES/` para refletir os nomes reais dos componentes, eliminando referências a `LogoMarquee` e `ShowcaseGrid` que não existem em `src/`.

**Especialista:** `@ghost_architect` (documentação SSOT, governança de componentes)

**Arquivos:** `.context/DOCS-PORTFOLIO-PAGES/` (todos os arquivos que referenciam `LogoMarquee` ou `ShowcaseGrid`)

**Contexto obrigatório:**
- `src/components/home/clients/ClientsBrandsSection.tsx` (substituto real de `LogoMarquee`)
- `src/components/home/portfolio-showcase/PortfolioShowcase.tsx` + `CategoryStripe.tsx` (substitutos reais de `ShowcaseGrid`)

**Ações:**
1. Executar `grep -r "LogoMarquee\|ShowcaseGrid" .context/` para listar todos os arquivos afetados.
2. Para cada ocorrência de `LogoMarquee`: substituir por `ClientsBrandsSection` com nota de que é um grid estático (não marquee animado).
3. Para cada ocorrência de `ShowcaseGrid`: substituir por `PortfolioShowcase` + `CategoryStripe` com descrição correta das responsabilidades de cada um.
4. Verificar que `grep -r "LogoMarquee\|ShowcaseGrid" .context/` retorna vazio após as correções.

**Regras:** Não alterar nenhum arquivo em `src/`. Apenas `.context/`.

**Critérios de Aceite:**
- [ ] `grep -r "LogoMarquee" .context/` retorna vazio
- [ ] `grep -r "ShowcaseGrid" .context/` retorna vazio
- [ ] Documentação atualizada cita `ClientsBrandsSection`, `PortfolioShowcase`, `CategoryStripe`
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #07 — Documentar Redundância de Content Array em tailwind.config.ts (P1-005)

**Objetivo:** Adicionar comentário de cabeçalho em `tailwind.config.ts` esclarecendo que o arquivo **inteiro** é inerte em Tailwind v4: `src/app/globals.css` não usa `@config "../../tailwind.config.ts"`, e Tailwind v4 não auto-detecta arquivos JS de config sem essa diretiva. Isso significa que tanto o array `content` quanto os valores de `theme.extend` (cores, fontes, z-index, etc.) são completamente ignorados pelo engine — futuros agentes que adicionarem tokens em `theme.extend` não verão os utilities gerados.

**Especialista:** `@ghost_architect` (Tailwind v4, documentação de config)

**Arquivos:** `tailwind.config.ts`

**Contexto obrigatório:**
- `src/app/globals.css` (confirmar ausência de `@config` directive)
- Context7 MCP: Tailwind CSS v4 upgrade guide / JavaScript config file / `@config` directive

**Ações:**
1. Ler `tailwind.config.ts` completo.
2. Verificar que `src/app/globals.css` não contém `@config "tailwind.config.ts"` (confirmação do contexto).
3. Adicionar comentário de cabeçalho no arquivo explicando: este arquivo está **completamente inativo** em Tailwind v4 — não é carregado via `@config` em `globals.css`. O array `content` e `theme.extend` são ignorados pelo engine; a varredura de classes usa `@source` em `globals.css`. Para ativar tokens customizados em v4, usar `@theme` em CSS ou adicionar `@config "../../tailwind.config.ts"` em `globals.css`.

**Regras:** Não remover nenhum conteúdo do arquivo. Não modificar `globals.css` nem `postcss.config.cjs`. Apenas adicionar comentário.

**Critérios de Aceite:**
- [ ] `tailwind.config.ts` contém comentário de cabeçalho explícito sobre o arquivo estar inativo em v4 (não apenas o `content` array)
- [ ] Comentário menciona ausência de `@config` e inatividade de `theme.extend`
- [ ] Nenhuma outra linha do arquivo modificada
- [ ] `pnpm run build-check` exit code 0

**Approval Gate:** Não executar sem aprovação humana explícita.

---

## 5️⃣ Validação Técnica Executada

| Verificação | Método | Resultado |
|---|---|---|
| Estado git | `git status --short` | Clean — sem uncommitted changes |
| Branch ativa | `git branch --show-current` | `claude/beautiful-rubin-awlalm` |
| Últimos commits | `git log --oneline -5` | 940e0a69, c3ffed23, d59f763f... |
| Versão Tailwind | grep `package.json` | `4.3.0` |
| Versão PostCSS plugin | grep `package.json` | `@tailwindcss/postcss: ^4.3.0` |
| Sintaxe globals.css | Leitura direta | `@import 'tailwindcss'` — v4 correto |
| tailwind.config.ts | Leitura direta | Content array redundante mas não prejudicial |
| `aria-hidden` WebGL | grep `GhostSceneWrapper.tsx` | ✅ Presente |
| Segredos hardcoded | grep src/ por patterns de chaves | ✅ Nenhum encontrado |
| `dispose()` WebGL | grep em canvas/ | ✅ Geometry, material, renderer, composer |
| `useMotionGate()` | grep em src/ | ✅ HomeHero, ContactForm, ClientsBrandsSection, PortfolioShowcase |
| `prefers-reduced-motion` | grep em src/ | ✅ 7+ implementações |
| `focus-visible` | grep em src/ | ✅ 18+ implementações |
| `std-grid` compliance | grep em src/ | ✅ 42 ocorrências |
| Artefatos na raiz | `ls /` grep | ⚠ 4 arquivos em violação (P1-002) |
| CSP global | Leitura `next.config.mjs` | ✅ Sem unsafe-eval em produção |
| CSP `/api/view-cv` | Leitura `route.ts` | 🔴 `unsafe-eval` presente (P0-002) |
| Assets quebrados | `active_state.md` log | 🔴 42 links legados quebrados (P0-001) |
| Middleware admin | `src/middleware.ts` + `supabase/middleware.ts` | ✅ Auth check + redirect corretos |
| Firebase headers | `firebase.json` | ✅ HSTS, X-Frame-Options: DENY, X-Content-Type-Options |
| `@deprecated` token | `globals.css` grep | ⚠ `--font-family-outfit` ainda presente (P2-001) |
| `dangerouslySetInnerHTML` | grep src/ | ✅ 2 ocorrências — ambas seguras (JSON-LD, ReactMarkdown) |
| InstancedMesh | grep src/ | ✅ Partículas usam InstancedMesh |
| Commitados | git check | ✅ Nenhum `.env` ou secret commitado |

**Limitações desta auditoria:**
- Ambiente headless — sem acesso a browser ou screenshots. Auditoria via análise estática de código.
- `pnpm test` e `pnpm build` não executados nesta sessão (rotina é READ-ONLY).
- Sem acesso ao Supabase Storage ou Firebase Console para verificar estado de assets em produção.
- Lighthouse / Core Web Vitals não executados.

---

## 6️⃣ Evidências

### Arquivos-chave lidos nesta sessão

| Arquivo | Observação |
|---|---|
| `src/app/globals.css` | Tokens Ghost DS, sintaxe Tailwind v4, `std-grid` |
| `src/app/layout.tsx` | Root layout, preload de fontes Manrope, providers |
| `src/app/page.tsx` | Home page, componentes, `revalidate = 3600` |
| `src/app/sobre/page.tsx` | `force-static`, Suspense, sections |
| `src/app/portfolio/page.tsx` | `revalidate = 3600`, paginação |
| `src/app/portfolio/[slug]/page.tsx` | `force-dynamic` identificado (P1-004) |
| `src/components/home/hero/HomeHero.tsx` | `useMotionGate`, `GhostSceneWrapper` |
| `src/components/canvas/home/hero/GhostSceneWrapper.tsx` | `aria-hidden`, `ssr:false` |
| `src/components/canvas/header/HeaderGlassCanvas.tsx` | `useFrame` sem alocações |
| `src/components/home/featured-projects/FeaturedProjectsSection.tsx` | Grid Bento layout |
| `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx` | Polling 45s, Realtime |
| `src/components/home/portfolio-showcase/PortfolioShowcase.tsx` | CategoryStripe accordion |
| `src/components/home/contact/ContactForm.tsx` | Turnstile, Resend |
| `src/components/home/clients/ClientsBrandsSection.tsx` | Grid estático (P1-003) |
| `src/app/api/view-cv/route.ts` | CSP `unsafe-eval` (P0-002) |
| `src/middleware.ts` | matcher pattern |
| `src/lib/supabase/middleware.ts` | `updateSession`, `isAdminUser` |
| `next.config.mjs` | CSP global, output standalone, Supabase hosts |
| `postcss.config.cjs` | `@tailwindcss/postcss` confirmado |
| `tailwind.config.ts` | content array redundante (P1-005) |
| `firebase.json` | security headers, Cloud Run 2GiB, `us-central1` |
| `tsconfig.json` | `strict: true`, paths |
| `.context/active_state.md` | 42 broken assets confirmados (P0-001) |
| `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` | tokens v3.1 |
| `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` | estrutura imutável |
| `.claude/rules/README-POSTCSS.md` | Regras v3 conflitantes (P1-001) |
| `.claude/rules/postcss-tailwind-config.md` | Regras v3 conflitantes (P1-001) |
| `package.json` | versões, scripts, `engines.node: "22"` |

### Evidências textuais críticas

**P0-001 (42 broken assets):**
```text
.context/active_state.md:
"Predeploy audit still reports 42 pre-existing broken legacy asset links
in src/config/site-assets.json; current critical portfolio hero video
URLs returned HTTP 200."
```

**P0-002 (CSP unsafe-eval em /api/view-cv):**
```typescript
// src/app/api/view-cv/route.ts:13
'Content-Security-Policy':
  "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; img-src 'self' data: https://*;"
```

**P1-001 (regras conflitantes com stack real):**
```text
.claude/rules/postcss-tailwind-config.md: "❌ NUNCA USE: @tailwindcss/postcss"
package.json (real): "@tailwindcss/postcss": "^4.3.0"
```

**P1-002 (raiz poluída):**
```bash
ls / | grep -E "\.bak$|temp_|implementation_plan|^task\.md"
Output: implementation_plan.md, package.json.bak, task.md, temp_report.md
```

**P1-003 (LogoMarquee inexistente):**
```bash
grep -r "LogoMarquee" src/
Output: (nenhum resultado)
Componente real: src/components/home/clients/ClientsBrandsSection.tsx
```

---

## 7️⃣ Riscos Operacionais

### Segredos e Credenciais
- ✅ Nenhum segredo hardcoded encontrado em `src/`
- ✅ `.gitignore` inclui `.env`, `.env.local`
- ✅ Zod validation bloqueia build se `NEXT_PUBLIC_SUPABASE_URL` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` ausentes
- ⚠ `NEXT_PUBLIC_SUPABASE_ANON_KEY` é exposta ao cliente — intencional na arquitetura Supabase (chave pública com RLS), mas deve ser documentado como design decision

### Webhooks e Variáveis desta Rotina
- ⚠ `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` não encontrada no ambiente de execução. Envio Slack não realizado. Registrado na seção 8.
- Nenhuma credencial foi exposta neste relatório.

### Riscos de Firebase Hosting
- ✅ `firebase.json` usa `frameworksBackend` com Cloud Run (webframeworks experiment)
- ✅ Security headers: HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- ⚠ `FIREBASE_CLI_EXPERIMENTS=webframeworks` obrigatório no CI/CD — se omitido, deploy Next.js falha
- ⚠ Firebase Functions em `us-central1` com `memory: 2GiB` — sem monitoramento de cold start latency documentado

### Riscos de Supabase Storage
- 🔴 42 links legados quebrados (P0-001) — assets produção com URLs inválidas
- ⚠ Thumbnails de portfolio corrigidos via #491, mas sem teste de regressão automatizado para URLs de Supabase render
- ✅ RLS configurado via migrations Supabase: `supabase/migrations/20240320_fix_rls_and_storage.sql` e `supabase/migrations/20260208000002_storage_rls.sql` (nota: `firestore.rules` e `storage.rules` são regras do Firebase, não do Supabase)

### Riscos de WebGL / Performance
- ✅ DPR limitado a `min(performanceConfig.pixelRatio, 1.5)` — Bloom cost quadrático controlado
- ✅ `dispose()` implementado para geometrias, materiais, renderers, composers
- ✅ `InstancedMesh` para sistema de partículas
- ⚠ Sem evidência de benchmark de FPS em dispositivos de médio desempenho após mudanças recentes de Bloom

### Riscos desta Rotina Autônoma
- ✅ Rotina estritamente READ-ONLY para código
- ✅ Apenas `WEEKLY_AUDIT_REPORT.md` foi escrito
- ✅ Nenhuma correção automática executada
- ✅ Branch documental isolada sem impacto no código de produção

---

## 8️⃣ Slack Approval Request

**Status do envio:** ❌ FALHA — Variável `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` não encontrada no ambiente de execução. Nenhuma tentativa de envio realizada. URL não impressa.

**Payload que seria enviado:**
```json
{
  "text": "Weekly Audit - Aprovação necessária",
  "blocks": [
    {
      "type": "header",
      "text": {"type": "plain_text", "text": "🔔 Auditoria Semanal Concluída — portfoliodanilo.com"}
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Projeto:* portfoliodanilo.com\n*Data:* 2026-06-09\n*Branch:* claude/weekly-audit-report-2026-06-09\n*P0 Crítico:* 2 | *P1 Estrutural:* 5 | *P2 Polimento:* 4\n\n*Top 3 Riscos:*\n• 🔴 P0-001: 42 assets quebrados em site-assets.json\n• 🔴 P0-002: unsafe-eval no CSP de /api/view-cv\n• 🟡 P1-001: Regras de agente contradizem stack Tailwind v4 real\n\n✅ Nenhum arquivo de código foi alterado nesta rotina."
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {"type": "plain_text", "text": "✅ Aprovar Correções"},
          "style": "primary",
          "action_id": "approve_routine",
          "value": "audit_2026-06-09"
        },
        {
          "type": "button",
          "text": {"type": "plain_text", "text": "❌ Rejeitar"},
          "style": "danger",
          "action_id": "reject_routine",
          "value": "audit_2026-06-09"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Responder *Aprovado* ou *Proceed* para autorizar a criação de uma rotina separada de correção para os itens P0 e P1 acima."
      }
    }
  ]
}
```

**Ação alternativa:** Aprovação pode ser dada via comentário no PR documental ou resposta direta ao Claude Code nesta sessão.

---

## 9️⃣ Próximo Passo Recomendado

**Recomendação: Aprovar e executar correções P0 imediatamente, P1 dentro de 72h.**

Os dois P0 representam riscos concretos em produção agora:

**P0-001** (42 assets quebrados) está causando degradação visual silenciosa. Correção é direta: executar `pnpm run verify:assets`, mapear os 42 URLs quebrados para assets válidos no Supabase Storage. Estimativa: 2–4h.

**P0-002** (CSP com `unsafe-eval` em `/api/view-cv`) é um vetor de segurança, mas **não é uma correção de 15 minutos de rota única**: `public/CURRICULUM-2026.html` carrega `https://cdn.tailwindcss.com` (runtime JIT que requer eval) e usa `onclick="window.print()"` inline. Remover `unsafe-eval` apenas da rota sem modificar o HTML quebrará a página do CV. A correção completa requer substituir o CDN por CSS compilado e o handler inline por listener externo — conforme escopo do Prompt #01. Estimativa real: 1–2h.

Os P1 são estruturais e podem ser executados em paralelo ou na semana seguinte, com prioridade para P1-001 (regras de agente conflitantes com Tailwind v4) que representa o maior risco de regressão em sessões de agente autônomo.

**Bloquear execução por risco crítico não mapeado?** Não. Os riscos foram identificados e há planos de ação claros. O projeto está em estado operacional. **Nota:** `pnpm build` e testes não foram executados nesta sessão (rotina READ-ONLY); o último build confirmado data de 2026-05-22 e houve commits em `src/` desde então — um `pnpm run build-check` fresco é obrigatório antes de executar qualquer correção P0. Recomendação é executar a verificação de build e então avançar com as correções P0 na próxima sessão aprovada.

---

_Relatório gerado por rotina autônoma semanal — Claude Code — Ghost System Portfolio_
_Data: 2026-06-09 | Commit: 940e0a69 | Rotina: READ-ONLY | Files changed: 1 (WEEKLY_AUDIT_REPORT.md)_
