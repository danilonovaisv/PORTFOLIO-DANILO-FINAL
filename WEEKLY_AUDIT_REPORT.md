# Weekly Portfolio Audit Report

## 0. Metadata

- **Date:** 2026-06-30
- **Repository:** danilonovaisv/PORTFOLIO-DANILO-FINAL
- **Branch:** claude/beautiful-rubin-nchfig
- **Routine:** Claude Code Routine — Auditoria Semanal Autônoma
- **Commit base:** dfd51a25 (chore: update dependencies, refine documentation formatting, and adjust agent workflow configuration)
- **PR:** A ser criado nesta execução
- **Auditor:** Claude Code Routine — claude-sonnet-4-6 (Read-Only + Report)
- **Scope:** Pilares 1–12 (estrutura, UI/UX, responsividade, animações, performance, roteamento, interações, landing pages, dados, segurança, Firebase, acessibilidade)
- **Files changed:** Exclusivamente `WEEKLY_AUDIT_REPORT.md`
- **Approval status:** ⏳ Pending human approval

---

## 1️⃣ Visão Geral

O portfolio portfoliodanilo.com está em estado de desenvolvimento ativo, com commits recentes até 2026-06-30. A stack segue Next.js App Router 16.x, React 19, TypeScript 6 strict mode, Tailwind CSS v4.3.1, Framer Motion (via `motion/react`), React Three Fiber (R3F) e Supabase como fonte de dados em tempo real. O deploy é feito via Firebase Hosting com `frameworksBackend` (região `us-central1`, `2GiB` de memória).

### Estado Geral por Página

| Página               | Status       | Observação principal                                                   |
|----------------------|--------------|------------------------------------------------------------------------|
| `/` (Home)           | ✅ Funcional | Hero WebGL, VideoManifesto, PortfolioShowcase, FeaturedProjects, ShaderSection, SiteClosure — todos presentes e com fallbacks |
| `/sobre`             | ✅ Funcional | AboutHero, AboutOrigin, AboutWhatIDo, AboutMethod, AboutClosing, AboutProof, ManifestoScrollSection, StickyContactCTA — estrutura completa |
| `/portfolio`         | ✅ Funcional | ProjectsGallery com filtros, LERP scroll, paginação server-side opcional |
| `/portfolio/[slug]`  | ✅ Funcional | Rotas de projeto individuais com PortfolioModal e dois tipos de conteúdo (TypeA/TypeB) |
| `/admin`             | ⚠️ Parcial   | Estrutura de `(auth)` e `(protected)` groups confirmada, dependência total do middleware para proteção |
| `/contato`           | ✅ Funcional | ContactForm com Turnstile (Cloudflare) e lazy-load do script |

### Pontos Críticos Transversais

1. **Contradição de documentação Tailwind (regras vs. implementação)** — As regras `.claude/rules/README-POSTCSS.md` e `.claude/rules/postcss-tailwind-config.md` exigem downgrade para v3.4.x, mas o projeto opera corretamente em v4.3.1. Esta divergência pode causar corrupção em rodadas autônomas futuras que leiam essas regras e tentem fazer downgrade. **Risco operacional máximo.**

2. **`typescript.ignoreBuildErrors: true`** — Desativa verificação de tipos no build de produção. O CLAUDE.md cita esta flag como "crítico para deploy em ambiente instável" mas representa debt técnico significativo.

3. **Dual-import de tokens de motion** — `HeroCopy` importa de `@/lib/motion` enquanto demais componentes importam de `@/config/motion`. Dois módulos distintos para tokens de animação aumentam o risco de divergência silenciosa.

---

## 2️⃣ Diagnóstico por Seção

### Home Hero (`HomeHero`, `GhostSceneWrapper`, `GhostScene`)
- **Positivo:** WebGL gated via `useWebGLSupport()` + `useMotionGate()`. Fallback de gradiente para mobile e reduced-motion. `GhostSceneWrapper` com `aria-hidden="true"` e `role="presentation"`. `ssr: false` no dynamic import de `GhostScene`. Preloader com `durationMs: 500` coordenado via `AnimatePresence`.
- **Gap:** `GhostSceneWrapper` tem `aria-hidden` mas não tem `aria-label`. Segundo a SSOT do Ghost Design System, elementos WebGL decorativos devem ter ambos. O `role="presentation"` compensa parcialmente.
- **Gap:** A hierarquia de z-index posiciona WebGL (`--z-layer-3d: 30`) acima do texto (`--z-layer-content: 20`). O `pointer-events-none` no wrapper de texto é essencial para não bloquear cliques — presente corretamente no código auditado.

### VideoManifesto
- Componente carregado via `dynamic()` sem SSR. Recebe assets da `BRAND.assets` com suporte a poster desktop/mobile e key de asset Supabase. Pattern correto.

### PortfolioShowcase (`PortfolioShowcase`, `CategoryStripe`)
- **Positivo:** `useMotionGate()` para reduced motion. `aria-labelledby` no section. Ghost ease e motion tokens via `@/config/motion`. `y: 18` no heading — dentro do limite Ghost DS.
- **Gap:** `CATEGORIES` array hardcoded com slugs `branding`, `motion`, `web`. Se categorias do Supabase divergirem, o filtro quebrará silenciosamente.

### Featured Projects (`FeaturedProjectsSection`, `FeaturedProjectCard`, `FeaturedProjectsRealtime`)
- **Positivo:** Bento grid com layout fixo (5+7 / 12 / 8+4). Skeleton de carregamento. Realtime via Supabase com polling fallback a cada 45s. `shuffleProjects` com seed para SSR/CSR consistency. Fallback via `buildFallbackProjects()`.
- **Gap:** `FEATURED_GRID_LAYOUT` array com 4 posições fixas — se Supabase retornar menos de 4 projetos, haverá slots de grid sem correspondência.
- **Gap:** `FeaturedProjectCard` usa `IntersectionObserver` individual por card para controle de rotação de background. Múltiplos observers simultâneos por cards visíveis.

### About Hero (`AboutHero`)
- **Positivo:** `useScroll` + `useTransform` para parallax de opacidade, y e blur. Valores `opacity [1→0]`, `y [0→-40]`, `blur [0→8]` — dentro dos limites Ghost DS. `aria-labelledby="about-hero-title"`.
- `y: -40` em viewport mobile (640px) = 6.25% de deslocamento — dentro do limite de 15% documentado.

### About Origin (`AboutOrigin`, `OriginComponents`)
- **Positivo:** `useSiteAssetUrl` hook para assets dinâmicos do Supabase. 4 imagens de origem com fallbacks individuais. `useMotionGate()` aplicado. Recentemente refatorado (commit `82799f74` — scroll-driven word-reveal).

### Portfolio Gallery (`ProjectsGallery`)
- **Positivo:** LERP scroll via `useLERPScroll`. Filtros sincronizados com `searchParams`. Suporte a paginação server-side via `ENABLE_SERVER_PAGINATION` flag. `GHOST_EASE` aplicado.
- **Gap:** Verificar se botões de filtro têm `aria-pressed` ou `aria-current` para indicar estado ativo.

### Portfolio Modal (`PortfolioModal`)
- **Positivo:** `createPortal` para renderização fora do DOM tree. `useBodyLock` para travar scroll. `ErrorBoundary` wrapping. Focus trap via `previousFocusRef`. `AnimatePresence` para exit animations. Dois tipos de conteúdo: TypeA e TypeB.

### ShaderSection (`ShaderAnimation`)
- **Positivo:** WebGL nativo (Three.js sem R3F) com cleanup via refs. Uniforms `resolution` e `time` atualizados em loop. Cores do shader: cyan `≈ #4FE6FF` (Ghost Cyan ✓), pink `≈ #F501D3` (pinkDetails ✓), bg `≈ #040013` (Void Black ✓).
- **Gap:** `uniforms: any` — violação de TypeScript strict. Tipo correto: `{ resolution: THREE.Uniform<THREE.Vector2>; time: THREE.Uniform<number> }`.
- **Gap:** Cores do shader são valores literais RGB, não tokens CSS. Se Ghost Design System atualizar tokens, o shader ficará dessincronizado.
- **Gap:** `requestAnimationFrame` roda indefinidamente enquanto o componente está montado — sem `IntersectionObserver`, sem gate de `prefers-reduced-motion`. Loop consome FPS e bateria quando o usuário rola além da seção. Ghost Design System exige: "nenhuma animação rodando fora da viewport". Ver AUDIT-009 e Prompt #04.

### Clients & Brands (`ClientsBrandsSection`)
- **Positivo:** Logos com `m.div` animado via `whileInView`. `aria-labelledby="clients-heading"`. `useMotionGate()` aplicado. Fundo `bg-bluePrimary` (#0048ff ✓).
- **Gap:** `.slice(0, 12)` hardcoded sem documentação do critério de corte.

### Contact Form (`ContactForm`)
- **Positivo:** Turnstile lazy-loaded via IntersectionObserver com `rootMargin: 240px`. Playwright mock bypass documentado. Validação de estado via `errors` object. Campos com validação antes de submit.

### Admin (`/admin`)
- **Positivo:** Middleware Supabase com `isAdminUser` + `shouldEnforceAdminRole`. Grupos `(auth)` (login, reset-password) e `(protected)` (dashboard, trabalhos, midia, landing-pages, tags, settings, config, copy-agent, scene-generator) na estrutura App Router. API routes para storage upload e init-bucket com proteção server-side.
- **Gap:** Proteção de rota depende 100% do middleware. Se o middleware falhar por ausência de credenciais, lança `Error` — quebrando toda a aplicação, não apenas o admin.

---

## 3️⃣ Lista de Problemas e Backlog Priorizado

### 🔴 P0 Crítico

---

**ID:** AUDIT-001  
**Severidade:** 🔴 P0 Crítico  
**Área:** Governança de Documentação / Regras de Agente  
**Evidência:** `.claude/rules/README-POSTCSS.md` e `.claude/rules/postcss-tailwind-config.md` exigem `tailwindcss@3.4.x` e plugin `tailwindcss` no PostCSS. O projeto usa `tailwindcss@4.3.1` e `@tailwindcss/postcss@4.3.1` — correto para v4. As regras contradizem a implementação atual e estão desatualizadas. **Adicionalmente (KI-009):** `src/app/globals.css` linha 1 usa `@import 'tailwindcss'` bare, sem `source(none)`. `.context/knowledge-graph.md` (KI-009) e `.context/logs/adjustment_log.md` (2026-03-04) documentam que esta é a causa raiz de um PERSISTENT BUG — o Tailwind Oxide Scanner varre binários e logs, causando `RangeError: Invalid code point`. O padrão seguro e obrigatório para este projeto é `@import "tailwindcss" source(none)` + diretivas `@source` explícitas. O arquivo atual está em estado de regressão.  
**Impacto:** (1) Rotinas autônomas futuras que leiam essas regras podem tentar fazer downgrade para v3, quebrando o projeto completamente. (2) O `globals.css` atual sem `source(none)` expõe o projeto ao crash do Oxide Scanner documentado em KI-009, que pode ocorrer a qualquer momento em que novos binários/logs sejam adicionados ao workspace.  
**Arquivos relacionados:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`, `postcss.config.cjs`, `package.json`, `src/app/globals.css`  
**Risco de não corrigir:** Quebra catastrófica do build em próxima rodada autônoma que siga as regras literalmente; reintrodução do crash KI-009 se novos binários/logs forem escaneados pelo Oxide.  
**Critério de aceite futuro:** Regras documentam Tailwind v4 com `@import "tailwindcss" source(none)` como padrão seguro obrigatório para este projeto. `postcss.config.cjs` com `@tailwindcss/postcss` documentado como correto para v4. `globals.css` restaurado para `@import "tailwindcss" source(none)` preservando todas as diretivas `@source` existentes.

---

**ID:** AUDIT-002  
**Severidade:** 🟡 P1 Estrutural _(corrigido: downgrade de P0 — CI já tem gate de typecheck)_  
**Área:** Build / TypeScript  
**Evidência:** `next.config.mjs` contém `typescript: { ignoreBuildErrors: true }`. Verificação de `.github/workflows/firebase-deploy.yml` confirma que o workflow já executa `pnpm run build-check` (= `pnpm typecheck && pnpm lint`) antes do deploy — logo, builds de CI têm gate. O risco é limitado a builds locais (`next build` puro sem CI) e ao false sense of security que a flag cria.  
**Impacto:** `next build` local pode concluir com sucesso mesmo com erros TypeScript, sem nenhuma sinalização. Builds diretos fora do CI podem produzir artefatos com erros de tipo silenciosos.  
**Arquivos relacionados:** `next.config.mjs`, `.github/workflows/firebase-deploy.yml`  
**Risco de não corrigir:** Deploy local emergencial fora do CI pode incluir código com erros de tipo. A flag normaliza a ignorância de tipos como aceitável.  
**Critério de aceite futuro:** `ignoreBuildErrors` removido de `next.config.mjs`. O CI gate já existe — manter e documentar que `pnpm run build-check` é obrigatório.

---

### 🟡 P1 Estrutural

---

**ID:** AUDIT-003  
**Severidade:** 🟢 P2 Polimento _(corrigido: downgrade de P1 — verificação pós-auditoria confirmou facade)_  
**Área:** Tokens de Motion / Arquitetura  
**Evidência:** `src/components/home/hero/HeroCopy.tsx` importa `GHOST_EASE`, `MOTION_TOKENS` de `@/lib/motion`. Verificação direta de `src/lib/motion/index.ts` confirmou que o módulo é uma facade de re-export: `export { GHOST_EASE, MOTION_TOKENS } from '@/config/motion'` — sem valores próprios divergentes.  
**Impacto:** Baixo — o import aponta para fonte diferente superficialmente, mas os valores são idênticos em runtime pois `@/lib/motion` apenas re-exporta `@/config/motion`. Sem risco de divergência silenciosa.  
**Arquivos relacionados:** `src/lib/motion/index.ts`, `src/config/motion.ts`, `src/components/home/hero/HeroCopy.tsx`  
**Risco de não corrigir:** Cosmético — potencial confusão para futuros agentes sobre qual módulo é canônico.  
**Critério de aceite futuro:** JSDoc em `src/lib/motion/index.ts` explicita que é facade de `@/config/motion`, ou todos os imports são unificados para `@/config/motion` diretamente.

---

**ID:** AUDIT-004  
**Severidade:** 🟡 P1 Estrutural  
**Área:** Autenticação Admin / Resiliência  
**Evidência:** `src/lib/supabase/middleware.ts` lança `throw new Error('Missing Supabase middleware credentials...')` se `SUPABASE_URL` ou `SUPABASE_PUBLIC_KEY` ausentes. O middleware cobre todas as rotas (exceto estáticos). Em ambientes de preview/staging sem todas as variáveis, isso derruba toda a aplicação.  
**Impacto:** Falha total de aplicação por ausência de variáveis de ambiente em qualquer ambiente não-produção.  
**Arquivos relacionados:** `src/middleware.ts`, `src/lib/supabase/middleware.ts`  
**Risco de não corrigir:** Deploy em ambiente de preview sem credenciais completas resulta em 500 para todos os usuários.  
**Critério de aceite futuro:** Middleware tem modo degradado (redirect para `/` ou retorna NextResponse.next() para rotas públicas) quando credenciais ausentes, ao invés de lançar erro fatal.

---

**ID:** AUDIT-005  
**Severidade:** 🟡 P1 Estrutural  
**Área:** Chave Supabase / Nomenclatura de Env Vars  
**Evidência:** `src/lib/env.ts` valida apenas `NEXT_PUBLIC_SUPABASE_ANON_KEY`. O middleware usa `getSupabasePublicKey()` de `src/lib/supabase/env.ts`, que lê três aliases em cascata: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`. O `env.ts` só valida o terceiro — os dois aliases mais novos são aceitos pelo middleware mas rejeitados pela validação de env.  
**Impacto:** Em ambientes configurados com qualquer um dos dois aliases mais novos (nomenclatura Supabase atual), o `env.ts` sinaliza erro de validação falso-positivo, bloqueando o start da aplicação mesmo quando as credenciais estão corretas.  
**Arquivos relacionados:** `src/lib/env.ts`, `src/lib/supabase/env.ts`, `.env.example`  
**Risco de não corrigir:** Validação de env falha em ambientes novos que usem a nomenclatura Supabase atualizada (`PUBLISHABLE_DEFAULT_KEY` ou `PUBLISHABLE_KEY`).  
**Critério de aceite futuro:** `env.ts` aceita todas as três nomenclaturas em cascata, alinhado com `getSupabasePublicKey()`.

---

**ID:** AUDIT-006  
**Severidade:** 🟢 P2 Polimento _(corrigido: downgrade de P1 — verificação pós-auditoria confirmou slice)_  
**Área:** FeaturedProjects / Integridade de Grid  
**Evidência:** Verificação direta de `FeaturedProjectsSection.tsx` confirmou que os cards são renderizados via `featuredProjects.slice(0, 4).map(...)` — não via `FEATURED_GRID_LAYOUT.map()`. Com menos de 4 projetos, o map produz apenas os itens disponíveis, sem slots vazios mapeados.  
**Impacto:** Menor que o originalmente estimado — o map de projetos não cria slots vazios. Potencial gap visual no CSS grid se os estilos esperarem exatamente 4 células, mas nenhuma renderização vazia de slot.  
**Arquivos relacionados:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`, `src/lib/portfolio/fallbacks.ts`  
**Risco de não corrigir:** Possível quebra visual de CSS grid com menos de 4 projetos (dependendo da implementação do grid). A query Supabase ainda não garante LIMIT de 4.  
**Critério de aceite futuro:** Verificar layout visual com 1, 2, 3 projetos no CMS. Adicionar `LIMIT 4` explícito na query se necessário para garantir consistência.

---

**ID:** AUDIT-007  
**Severidade:** 🟡 P1 Estrutural  
**Área:** Versioning de Stack / Consistência Documental  
**Evidência:** `package.json` declara `"next": "16.2.9"`. `CLAUDE.md` diz `16.2.2`. `.claude/rules/20-tech-stack.md` diz `Next.js 14+, currently 16.1.6`. `AGENTS.md` diz `16.2.2`. A versão real é `16.2.9` — todos os documentos estão desatualizados.  
**Impacto:** Inconsistência de documentação cria ambiguidade para agentes que usam as regras como referência para tomada de decisão. Risco operacional: validações de compatibilidade de adapter/plugin podem apontar para versão errada.  
**Arquivos relacionados:** `CLAUDE.md`, `.claude/rules/20-tech-stack.md`, `AGENTS.md`, `package.json`  
**Risco de não corrigir:** Agentes tomam decisões técnicas baseados na versão errada documentada.  
**Critério de aceite futuro:** Uma fonte de verdade única para versões de stack (package.json como referência), com documentação sincronizada via script de bump ou anotação explícita.

---

**ID:** AUDIT-011  
**Severidade:** 🟡 P1 Segurança  
**Área:** CSP / Rota Pública  
**Evidência:** `src/app/api/view-cv/route.ts` define CSP com `'unsafe-inline'` e `'unsafe-eval'`. Verificação de `public/CURRICULUM-2026.html` confirma que `'unsafe-eval'` é **necessário funcionalmente** — o CV carrega o runtime browser do Tailwind CSS via `<script src="https://cdn.tailwindcss.com">` e usa `<style type="text/tailwindcss">`, que processam CSS via eval em runtime. Adicionalmente, há handler `onclick="window.print()"` (necessita `'unsafe-inline'`). Remover `'unsafe-eval'` sem reescrever o CV HTML **quebrará** o rendering do CV.  
**Impacto:** A CSP atual é tecnicamente necessária para o funcionamento do CV, mas cria uma superfície de ataque ampla em uma rota pública. A remediação real requer substituir o Tailwind CDN runtime por CSS pré-compilado.  
**Arquivos relacionados:** `src/app/api/view-cv/route.ts`, `public/CURRICULUM-2026.html`  
**Risco de não corrigir:** Rota pública aceita execução de código arbitrário se o HTML for comprometido. `https://*` como fonte de script é particularmente arriscado.  
**Critério de aceite futuro:** `CURRICULUM-2026.html` reescrito sem Tailwind CDN browser runtime (usar CSS pré-compilado). CSP resultante sem `'unsafe-eval'`, com `'unsafe-inline'` eliminado via handler externo em `public/curriculum-print.js`, e `script-src` sem `https://*`.

---

**ID:** AUDIT-012  
**Severidade:** 🟡 P1 Performance  
**Área:** ISR / Cache de Rotas  
**Evidência:** `src/app/portfolio/[slug]/page.tsx` exporta `export const dynamic = 'force-dynamic'`. Isso desabilita completamente o ISR (Incremental Static Regeneration) e faz cada requisição de projeto individual bater no Supabase em tempo real.  
**Impacto:** TTFB elevado para páginas de projeto. Com tráfego intenso, pode saturar o connection pool do Supabase. Nenhum benefício de cache para conteúdo que raramente muda.  
**Arquivos relacionados:** `src/app/portfolio/[slug]/page.tsx`  
**Risco de não corrigir:** Performance degradada em picos de tráfego. Custo Supabase desnecessário. LCP prejudicado em páginas de projeto.  
**Critério de aceite futuro:** Migrar para `revalidate = 3600` (ou outro intervalo) com `generateStaticParams()` para projetos principais, mantendo `force-dynamic` apenas se conteúdo realmente requer dados de sessão por requisição.

---

**ID:** AUDIT-013  
**Severidade:** 🟡 P1 Assets / Integridade  
**Área:** Links de Asset / Legado  
**Evidência:** `.context/active_state.md` documenta: _"Predeploy audit still reports 42 pre-existing broken legacy asset links in `src/config/site-assets.json`"_. Links ativos de portfolio hero retornaram HTTP 200, mas 42 links legados permanecem quebrados.  
**Impacto:** Assets referenciados em `site-assets.json` com URLs quebradas podem causar imagens/vídeos ausentes em partes do site não auditadas nesta rodada.  
**Arquivos relacionados:** `src/config/site-assets.json`  
**Risco de não corrigir:** Regressões visuais silenciosas em seções que dependem dos assets legados.  
**Critério de aceite futuro:** `pnpm run assets:audit` (via `scripts/audit_assets.py`) retorna zero links quebrados em `src/config/site-assets.json` **e** sai com exit code 1 quando há links quebrados. **Atenção:** `scripts/audit_assets.py` linhas 110-111 têm o bloco `sys.exit(1)` comentado e sempre retorna exit 0 mesmo com links quebrados — a remediação DEVE incluir descomentar essas linhas (`# if broken_links: / # sys.exit(1)`); sem isso, o critério de aceite não é verificável em CI. **Nota:** `pnpm run verify:assets` (via `scripts/verify-supabase-assets.mjs`) verifica apenas URLs de vídeo em `src/lib/video-assets.ts` e NÃO cobre `site-assets.json` — não usar como critério de aceite para este item. Links inválidos removidos ou substituídos por URLs ativas no Supabase Storage.

---

### 🟢 P2 Polimento Rápido

---

**ID:** AUDIT-008  
**Severidade:** 🟢 P2 Polimento  
**Área:** Acessibilidade / WebGL  
**Evidência:** `GhostSceneWrapper` tem `aria-hidden="true"` e `role="presentation"` mas não tem `aria-label`. `HeaderGlassCanvas` tem apenas `aria-hidden="true"` sem role ou label.  
**Impacto:** Minor — alguns leitores de tela podem anunciar o canvas de forma genérica.  
**Arquivos relacionados:** `src/components/canvas/home/hero/GhostSceneWrapper.tsx`, `src/components/canvas/header/HeaderGlassCanvas.tsx`  
**Risco de não corrigir:** Reduz compliance de acessibilidade AA em elementos WebGL.  
**Critério de aceite futuro:** Elementos decorativos com `aria-hidden="true"` confirmados sem `aria-label` simultâneo (combinação é semanticamente inválida — `aria-hidden` remove o elemento da árvore de acessibilidade e qualquer label é ignorado). `axe-core` não sinaliza violação ARIA em `GhostSceneWrapper` ou `HeaderGlassCanvas`. Ver Prompt #05 para ação correta.

---

**ID:** AUDIT-009  
**Severidade:** 🟢 P2 Polimento  
**Área:** TypeScript / Qualidade de Código / Performance WebGL  
**Evidência:** `src/components/home/ShaderSection.tsx` — `uniforms: any` no objeto de cena Three.js referenciado via `sceneRef` (linha ~100). Adicionalmente, o `requestAnimationFrame` corre indefinidamente enquanto o componente está montado — sem `IntersectionObserver`, sem gate de `prefers-reduced-motion`. Violação da diretriz Ghost DS de "nenhuma animação rodando fora da viewport".  
**Impacto:** Perda de type safety em uniforms de shader. FPS e bateria consumidos desnecessariamente quando o usuário rola além do ShaderSection.  
**Arquivos relacionados:** `src/components/home/ShaderSection.tsx`  
**Risco de não corrigir:** Erros de tipo em uniforms não detectados pelo compilador. Regressão de performance em scroll com animação rodando fora da viewport.  
**Critério de aceite futuro:** `uniforms` tipado com interface `ShaderUniforms` usando `THREE.Uniform<T>`. Loop de `requestAnimationFrame` pausado via `IntersectionObserver` quando seção sair da viewport. `prefers-reduced-motion: reduce` interrompe o loop.

---

**ID:** AUDIT-010  
**Severidade:** 🟢 P2 Polimento  
**Área:** Fonte Deprecada / Bundle  
**Evidência:** `globals.css` marca `--font-family-outfit` como `@deprecated` com nota "Outfit not used in production; scheduled for removal". `tailwind.config.ts` ainda pode ter extensão para esta família.  
**Impacto:** Potencial bundle de fonte desnecessário e referência deprecada nas regras.  
**Arquivos relacionados:** `src/app/globals.css`, `tailwind.config.ts`  
**Risco de não corrigir:** Pequeno overhead de carregamento e limpeza técnica pendente.  
**Critério de aceite futuro:** `rg "font-outfit|fontOutfit|font-family-outfit|Outfit" src/` retorna zero resultados. Variável removida de `globals.css` e `tailwind.config.ts`.

---

## 4️⃣ Prompts Técnicos para Agentes Atômicos

> **APPROVAL GATE OBRIGATÓRIO:** Nenhum dos prompts abaixo deve ser executado sem aprovação humana explícita via Slack ou resposta direta neste PR. A rotina para aqui.

---

### 🛠️ Prompt #01 — Atualizar Regras PostCSS para Tailwind v4

**Objetivo:** Remover contradição entre regras documentadas (que exigem v3) e implementação real (v4.3.1), eliminando risco de downgrade acidental por rotina autônoma.  
**Especialista:** `@ghost_architect` / skill `doc-specialist`  
**Arquivos:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`, `src/app/globals.css`  
**Contexto obrigatório:** `CLAUDE.md` (Tech Stack: Tailwind CSS 4), `package.json` (tailwindcss@4.3.1), `postcss.config.cjs` (usa `@tailwindcss/postcss`), `.context/knowledge-graph.md` (KI-009 — PERSISTENT BUG), `.context/logs/adjustment_log.md` (2026-03-04 — fix histórico)  
**Ações:**
1. Reescrever `README-POSTCSS.md` para documentar Tailwind v4 como padrão oficial, removendo referências a v3.4.x.
2. Reescrever `postcss-tailwind-config.md` marcando `@tailwindcss/postcss` como correto para v4. Documentar que o padrão obrigatório para este projeto é `@import "tailwindcss" source(none)` (não `@import 'tailwindcss'` bare) — KI-009: sem `source(none)`, o Tailwind Oxide Scanner varre binários e logs causando `RangeError: Invalid code point`.
3. Atualizar exemplos de código: correto = `@import "tailwindcss" source(none)` + `@source` explícitos; incorreto = bare `@import 'tailwindcss'` sem `source(none)`.
4. Em `src/app/globals.css` linha 1: verificar se usa `@import 'tailwindcss'` sem `source(none)`. Se sim (REGRESSÃO KI-009 confirmada): substituir por `@import "tailwindcss" source(none)` preservando todas as diretivas `@source` que seguem inalteradas.
5. Adicionar nota de data da atualização nas regras.
6. **Escalação manual:** `.agent/rules/README-POSTCSS.md` e `.agent/rules/postcss-tailwind-config.md` contêm as mesmas instruções desatualizadas, mas `.agent/` é READ-ONLY por governança (`CLAUDE.md`). Reportar ao responsável humano para atualização manual ou reclassificação como fonte primária.  
**Regras:** Editar `.claude/rules/` e `src/app/globals.css`. `.agent/rules/` requer intervenção humana. Não remover diretivas `@source` existentes em `globals.css`.  
**Critérios de Aceite:** `rg "v3\.4|downgrade|3\.4\.19|3\.4\.x" .claude/rules/` retorna zero resultados. Regras documentam `source(none)` como padrão obrigatório. `globals.css` linha 1 contém `@import "tailwindcss" source(none)`. Responsável notificado sobre `.agent/rules/`.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #02 — Unificar Módulo de Tokens de Motion

**Objetivo:** Eliminar dual-import de tokens de animação entre `@/lib/motion` e `@/config/motion`.  
**Especialista:** `@ghost_architect` / `@motion_choreographer`  
**Arquivos:** `src/lib/motion/index.ts`, `src/config/motion.ts`, `src/components/home/hero/HeroCopy.tsx`  
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md` (§2 Motion Principles), `.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME/`  
**Ações:**
1. Mapear todos os imports: `rg "from '@/lib/motion'|from '@/config/motion'" src/`.
2. Determinar qual módulo é mais completo e atual (verificar se `@/lib/motion` re-exporta de `@/config/motion` ou é independente).
3. Se `@/lib/motion` é legado: migrar imports de HeroCopy para `@/config/motion`.
4. Se `@/lib/motion` tem conteúdo único: documentar a distinção e adicionar JSDoc explicando responsabilidades.  
**Regras:** Easing padrão `[0.22, 1, 0.36, 1]` preservado. Não alterar valores de tokens.  
**Critérios de Aceite:** `rg "from '@/lib/motion'" src/components/home/hero/HeroCopy.tsx` retorna zero, ou os dois módulos têm responsabilidades documentadas e distintas.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #03 — Adicionar Modo Degradado ao Middleware de Auth

**Objetivo:** Evitar que ausência de credenciais Supabase quebre toda a aplicação em ambientes de preview/staging.  
**Especialista:** `@ghost_architect` / skill `database-sentinel`  
**Arquivos:** `src/lib/supabase/middleware.ts`, `src/lib/supabase/server.ts`, `src/lib/env.ts`, `src/app/layout.tsx`, `src/app/projects/[slug]/page.tsx`  
**Contexto obrigatório:** `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/01-AUTH-LOGIN.md`, `.claude/rules/security.md`  
**Contexto crítico:** Alterar apenas `src/lib/supabase/middleware.ts` é insuficiente por dois motivos: (1) `src/app/layout.tsx` (linha 11) importa `env` de `src/lib/env.ts`, e esse módulo lança `throw new Error('Environment validation failed')` antes de qualquer rota renderizar; (2) `src/lib/supabase/server.ts` lança exceção quando `SUPABASE_URL` ou `SUPABASE_PUBLIC_KEY` estão ausentes, e é chamado diretamente por `src/app/projects/[slug]/page.tsx` (linhas 75 e 128) — rota pública que retornaria 500 mesmo com middleware e env.ts corrigidos. O fallback deve cobrir todos os três módulos.  
**Ações:**
1. Em `src/lib/env.ts`: ampliar a condição de bypass para cobrir ambientes sem credenciais Supabase — a flag `VALIDATE_ENV_WARN_ONLY=1` já existe como mecanismo de bypass (linha ~46); padronizar o uso desta flag ao invés de heurísticas de plataforma (`VERCEL_ENV`, `FIREBASE_ENV`) que não são definidas em todos os ambientes de produção e podem dar falso negativo em Cloud Run/Firebase. Alternativa segura: verificar `process.env.NODE_ENV !== 'production'` antes de lançar erro fatal, garantindo que ambientes de produção sempre falhem ruidosamente enquanto staging/development degradam graciosamente.
2. Em `src/lib/supabase/middleware.ts`: substituir `throw new Error(...)` por verificação: se credenciais ausentes em rotas públicas, retornar `NextResponse.next()`. Se em rotas `/admin`, redirecionar para `/`.
3. Logar os problemas via `console.error` sem expor URLs ou chaves.
4. Garantir que rotas públicas não sofram nenhum impacto em modo degradado.  
**Regras:** Não alterar lógica de autenticação para rotas admin válidas. Não expor mensagens de erro ao usuário final. A flag `VALIDATE_ENV_WARN_ONLY=1` já existe para bypass em CI — usar como referência de padrão.  
**Critérios de Aceite:** Em ambiente de teste sem `NEXT_PUBLIC_SUPABASE_URL`: `/` (home) retorna 200 sem throw de `env.ts`; `/projects/[slug]` retorna 200 ou 404 sem 500 (modo degradado com dados ausentes); `/admin` retorna redirect para `/` sem 500. `src/app/layout.tsx` renderiza sem erro. `src/lib/supabase/server.ts` tem fallback gracioso em vez de throw fatal quando credenciais ausentes em non-production.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #04 — Corrigir ShaderSection: Tipagem, Viewport Gate e Reduced-Motion

**Objetivo:** Eliminar `any` type nos uniforms Three.js, pausar o loop `requestAnimationFrame` quando fora da viewport, e respeitar `prefers-reduced-motion` em `ShaderSection.tsx` (AUDIT-009).  
**Especialista:** `@spectral_artist`  
**Arquivos:** `src/components/home/ShaderSection.tsx`  
**Contexto obrigatório:** `.claude/rules/code-quality.md` (Anti-Patterns §3 Any Type), `.claude/rules/21-webgl-performance.md`, `.context/GHOST-DESIGN-SYSTEM.md` (§ Performance — nenhuma animação fora da viewport)  
**Ações:**
1. Definir interface `ShaderUniforms` com `resolution: THREE.Uniform<THREE.Vector2>` e `time: THREE.Uniform<number>`.
2. Substituir `uniforms: any` por `uniforms: ShaderUniforms` na `sceneRef`.
3. Verificar que todos os acessos a `uniforms.resolution.value` e `uniforms.time.value` passam na verificação de tipo.
4. Adicionar `IntersectionObserver` no `useEffect` de inicialização: pausar o loop com `cancelAnimationFrame(animationId)` quando `isIntersecting: false`; retomar chamando `animate()` quando `true`. Cleanup do observer no return do useEffect.
5. Adicionar gate de `prefers-reduced-motion` na inicialização: se `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, não iniciar o loop RAF (renderizar frame estático ou não iniciar a cena).  
**Regras:** Não alterar lógica de shader ou valores de uniforms. Não alterar cores RGB literais. Apenas adicionar tipagem e gating de performance/acessibilidade.  
**Critérios de Aceite:** `pnpm typecheck` sem erros relacionados a `ShaderSection`. Nenhum `any` no arquivo. Loop RAF cancelado quando seção sai da viewport (verificar em DevTools Performance > Animation frames). `prefers-reduced-motion: reduce` impede início do loop (verificar com `@media (prefers-reduced-motion: reduce)` no browser).  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #05 — Adicionar aria-label ao GhostSceneWrapper e HeaderGlassCanvas

**Objetivo:** Melhorar compliance de acessibilidade AA nos canvas decorativos WebGL.  
**Especialista:** `@audit_sentinel`  
**Arquivos:** `src/components/canvas/home/hero/GhostSceneWrapper.tsx`, `src/components/canvas/header/HeaderGlassCanvas.tsx`  
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md` (§Accessibility), `.claude/rules/21-webgl-performance.md`  
**Ações:**
1. Definir a semântica correta antes de agir: `aria-hidden="true"` remove o elemento inteiramente da árvore de acessibilidade — qualquer `aria-label` no mesmo elemento será ignorado pelos leitores de tela. As duas abordagens são mutuamente exclusivas; combinar ambas é semanticamente inválido.
2. Para `GhostSceneWrapper` (puramente decorativo): manter `aria-hidden="true"` e `role="presentation"`. NÃO adicionar `aria-label` — o elemento não deve ser anunciado por AT.
3. Para `HeaderGlassCanvas` (puramente decorativo): confirmar que `aria-hidden="true"` está presente. Se ausente, adicionar. NÃO adicionar `aria-label`.  
**Regras:** Não alterar lógica de rendering ou condicionais. Não combinar `aria-hidden="true"` com `aria-label` no mesmo elemento.  
**Critérios de Aceite:** Nenhum canvas decorativo tem `aria-hidden="true"` e `aria-label` simultaneamente. `axe-core` não sinaliza violação de ARIA em ambos os componentes.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #06 — Remover Fonte Outfit Deprecada

**Objetivo:** Eliminar referência a fonte deprecated do bundle de CSS e tokens de design.  
**Especialista:** `@ghost_architect`  
**Arquivos:** `src/app/globals.css`, `tailwind.config.ts`  
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md` (§1.2 Typography — Manrope + PPSupplyMono como únicas fontes oficiais)  
**Ações:**
1. Confirmar: `rg "font-outfit|fontOutfit|font-family-outfit|Outfit" src/` — verificar se há usos reais.
2. Se zero usos reais: remover `--font-family-outfit` de `globals.css`.
3. Remover entrada correspondente de `tailwind.config.ts` se existir.
4. Se houver usos: listar quais componentes devem migrar para Manrope antes da remoção.  
**Regras:** Não remover se ainda houver usos ativos. Verificar antes de agir. Fontes oficiais: Manrope (UI/Body) e PPSupplyMono (Code/Mono).  
**Critérios de Aceite:** Zero referências a `Outfit` ou `outfit` em `src/`. Comentário deprecated removido.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #07 — Remover `ignoreBuildErrors` ou Adicionar Gate de TypeCheck no CI

**Objetivo:** Garantir que erros TypeScript bloqueiem deploys de produção (AUDIT-002).  
**Especialista:** `@ghost_architect`  
**Arquivos:** `next.config.mjs`, `.github/workflows/` (pipeline CI/CD relevante)  
**Contexto obrigatório:** `.claude/rules/code-quality.md` (§Anti-Patterns Any Type), `CLAUDE.md` (Build & Test)  
**Ações:**
1. Confirmar: `.github/workflows/firebase-deploy.yml` já executa `pnpm run build-check` (= `pnpm typecheck && pnpm lint`) antes do deploy — CI gate está ativo.
2. Em `next.config.mjs`, remover ou comentar `typescript: { ignoreBuildErrors: true }` — substituir por `typescript: { ignoreBuildErrors: false }`.
3. Se o `next build` falhar com erros de tipo ao remover a flag: rodar `pnpm typecheck` diretamente (sem pipe — `pnpm typecheck 2>&1 | tee typecheck.log` mascara o exit code via pipe sem `set -o pipefail` e grava arquivo na raiz em violação do CLAUDE.md), ler o output no terminal, corrigir os erros, depois remover a flag.
4. Não adicionar novo step de CI — o gate já existe via `build-check`.  
**Regras:** O CI já tem proteção. O objetivo desta tarefa é alinhar `next.config.mjs` com a realidade do CI, eliminando a flag que permite builds locais com erros de tipo.  
**Critérios de Aceite:** `ignoreBuildErrors: false` (ou ausente) em `next.config.mjs`. `next build` local falha corretamente quando há erros de tipo.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #08 — Restringir CSP e Reescrever CV HTML sem Tailwind CDN Runtime

**Objetivo:** Eliminar `'unsafe-eval'` da rota `/api/view-cv` substituindo o Tailwind CDN browser runtime por CSS pré-compilado no HTML do CV (AUDIT-011).  
**Especialista:** `@ghost_architect` / skill `frontend-specialist`  
**Arquivos:** `src/app/api/view-cv/route.ts`, `public/CURRICULUM-2026.html`  
**Contexto obrigatório:** `.claude/rules/security.md`, `next.config.mjs` (CSP global como referência)  
**Contexto crítico:** `public/CURRICULUM-2026.html` usa `<script src="https://cdn.tailwindcss.com">` (runtime browser) e `<style type="text/tailwindcss">`. Esse runtime processa CSS via `eval()`, o que EXIGE `'unsafe-eval'` na CSP atual. Remover apenas o header sem reescrever o HTML **quebrará** o CV.  
**Ações:**
1. Inspecionar `public/CURRICULUM-2026.html` e mapear: (a) todas as classes Tailwind usadas, (b) todas as regras CSS customizadas não-Tailwind dentro do `<style type="text/tailwindcss">` — incluindo `@page`, `.page` (dimensões A4), media queries de print, `.no-print`, `.circular-chart` e classes de gráficos SVG.
2. Criar `public/curriculum.css` em dois blocos: primeiro, as regras customizadas (copiadas integralmente do bloco `<style>`); segundo, o CSS Tailwind compilado — gerar via `pnpm dlx @tailwindcss/cli` (CLI do Tailwind v4; `npx tailwindcss` usaria o binário v3) com safelist cobrindo todas as classes encontradas no CV.
3. Substituir `<script src="https://cdn.tailwindcss.com">` e `<style type="text/tailwindcss">` por `<link rel="stylesheet" href="/curriculum.css">`.
4. Substituir `onclick="window.print()"` por `id="print-btn"`. Criar `public/curriculum-print.js` contendo `document.getElementById('print-btn').addEventListener('click', () => window.print())` e referenciar via `<script src="/curriculum-print.js"></script>` — NÃO usar `<script>` inline, pois bloco inline ainda requer `'unsafe-inline'` na CSP, anulando o benefício da migração.
5. Atualizar a CSP em `src/app/api/view-cv/route.ts`: remover `'unsafe-eval'`; escopar `script-src` sem `https://*`; **preservar fontes** — `public/CURRICULUM-2026.html` linhas 8-9 carregam Outfit, Inter e Material Symbols Outlined via `https://fonts.googleapis.com` (stylesheet) e `https://fonts.gstatic.com` (arquivos de fonte): adicionar `fonts.googleapis.com` ao `style-src` e `fonts.gstatic.com` ao `font-src`, ou auto-hospedar ambos antes de remover o fallback `https://*` — sem isso o CV perderá tipografia e todos os ícones `material-symbols-outlined`.
6. Validar visualmente: layout de impressão A4, gráficos circulares SVG, botão de impressão e ícones Material Symbols devem funcionar identicamente após a migração.  
**Regras:** O CV deve continuar funcionando identicamente após a reescrita. Não alterar o design ou conteúdo textual. Preservar `window.print()` como funcionalidade.  
**Critérios de Aceite:** `public/CURRICULUM-2026.html` não referencia `cdn.tailwindcss.com`. CSP de `/api/view-cv` não contém `'unsafe-eval'`. O CV renderiza corretamente com tipografia Outfit/Inter preservada e ícones Material Symbols visíveis. O botão de impressão funciona.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #09 — Migrar `portfolio/[slug]` de `force-dynamic` para ISR

**Objetivo:** Habilitar cache estático/ISR nas páginas de projeto individual para reduzir TTFB e carga no Supabase (AUDIT-012).  
**Especialista:** `@ghost_architect`  
**Arquivos:** `src/app/portfolio/[slug]/page.tsx`, `src/lib/supabase/queries/projects.ts`, `src/app/admin/(protected)/trabalhos/actions.ts`  
**Contexto obrigatório:** `.context/DOCS-PORTFOLIO-PAGES/03-PORTFOLIO/`, `CLAUDE.md` (Architecture: Server Components por padrão)  
**Ações:**
1. Remover `export const dynamic = 'force-dynamic'`.
2. Verificar se há dados de sessão/usuário na página — se não, adicionar `export const revalidate = 3600`.
3. Adicionar `generateStaticParams()` para pré-gerar as páginas dos projetos mais acessados em build time.
4. Testar que o fallback `notFound()` ainda funciona para slugs inválidos com `dynamicParams = true`.
5. Em `src/app/admin/(protected)/trabalhos/actions.ts`, função `deleteProjectAction` (linha ~317): adicionar `revalidatePath(\`/portfolio/${oldProject.slug}\`)` após `revalidatePath('/portfolio')` — sem isso, páginas de projeto deletadas permanecem em cache mesmo após remoção do banco.  
**Regras:** Se a página usa dados de sessão de usuário (ex: favoritos, analytics pessoais), manter `force-dynamic` e documentar a razão. Não sacrificar personalização por cache.  
**Critérios de Aceite:** TTFB de `/portfolio/[slug]` < 200ms em hit de cache. `pnpm build` gera páginas estáticas para projetos existentes. Zero erros 500 em slugs válidos. Após deletar projeto no admin, `/portfolio/${slug}` retorna 404 no próximo request sem cache stale.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #10 — Alinhar Nomenclatura de Chave Supabase no env.ts

**Objetivo:** Evitar falha de validação de variáveis de ambiente em ambientes novos que usem a nomenclatura atual do Supabase (AUDIT-005).  
**Especialista:** `@ghost_architect`  
**Arquivos:** `src/lib/env.ts`, `src/lib/supabase/env.ts`, `.env.example`, `.github/workflows/firebase-deploy.yml`  
**Contexto obrigatório:** `.claude/rules/security.md`, `CLAUDE.md` (Regras de Execução: nunca commitar secrets)  
**Ações:**
1. Verificar qual chave `getSupabasePublicKey()` em `src/lib/supabase/env.ts` efetivamente lê — `NEXT_PUBLIC_SUPABASE_ANON_KEY` ou `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.
2. Atualizar `src/lib/env.ts` para aceitar as três nomenclaturas em cascata, alinhado com `getSupabasePublicKey()`: `process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Atualizar `.env.example` para listar as três variáveis com comentário explicando a cascata de migração Supabase.
4. Verificar o step de escrita de variáveis em `.github/workflows/firebase-deploy.yml` — se o workflow injeta apenas `NEXT_PUBLIC_SUPABASE_ANON_KEY` no step de build, adicionar também `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (ou renomear o secret do GitHub Actions para corresponder ao alias primário usado). Caso contrário, deployments com as novas nomenclaturas falharão em CI mesmo após o fix de `env.ts`.
5. Documentar em `.context/active_state.md` que a migração de nomenclatura está em andamento.  
**Regras:** Não expor valores de chaves reais em nenhum arquivo. Apenas nomes de variáveis como referência.  
**Critérios de Aceite:** `env.ts` valida sem erro com qualquer uma das três variantes (`ANON_KEY`, `PUBLISHABLE_KEY`, `PUBLISHABLE_DEFAULT_KEY`). `.env.example` documenta as três variações com comentário de migração. `.github/workflows/firebase-deploy.yml` injeta pelo menos uma das três variáveis reconhecidas no step de build. Zero breaking changes em ambientes existentes.  
**Approval Gate:** Não executar sem aprovação humana explícita.

---

## 5️⃣ Validação Técnica Executada

| Comando / Análise                                    | Resultado                                                                 |
|------------------------------------------------------|---------------------------------------------------------------------------|
| `git status --short`                                 | Clean working tree — nenhum arquivo alterado antes desta auditoria         |
| `git log --oneline -10`                              | Commits ativos até `dfd51a25` (2026-06-30)                               |
| Leitura de `next.config.mjs`                         | CSP headers, HSTS, `output: standalone`, `reactStrictMode: true`, `ignoreBuildErrors: true` ⚠️ |
| Leitura de `src/app/globals.css` (741 linhas)        | Tailwind v4 `@import`, `@theme`, `@source` — tokens completos ✓           |
| Leitura de `postcss.config.cjs`                      | `@tailwindcss/postcss` — correto para v4, inconsistente com regras ⚠️     |
| Leitura de `tailwind.config.ts`                      | Configuração mínima com extensões de cores — **⚠️ não carregada via `@config` em globals.css** — em Tailwind v4, arquivos JS não são detectados automaticamente sem `@config "./tailwind.config.ts"` |
| Leitura de `src/middleware.ts`                       | Supabase SSR auth, matcher completo ✓                                     |
| Leitura de `src/lib/supabase/middleware.ts`          | `isAdminUser` + `shouldEnforceAdminRole` + throw fatal ⚠️                 |
| `package.json` — versões críticas                    | tailwindcss@4.3.1, @tailwindcss/postcss@4.3.1, node engine "22" ✓       |
| Busca `scale(` em `src/components/**/*.tsx`          | Zero ocorrências — motion proibido ausente ✓                              |
| Busca `aria-hidden` em `src/components/canvas`       | 2 ocorrências (GhostSceneWrapper ✓, HeaderGlassCanvas ✓)                 |
| Busca `z-[9999]\|z-[100]\|z-[50]` hardcoded         | Zero ocorrências — z-index via CSS vars ✓                                 |
| Busca `from '@/lib/motion'` vs `from '@/config/motion'` | HeroCopy usa `@/lib/motion`, demais usam `@/config/motion` ⚠️         |
| Leitura de `firebase.json`                           | `frameworksBackend: { region: "us-central1", memory: "2GiB" }` ✓        |
| Verificação de `.env.example`                        | Apenas nomes de variáveis — sem valores expostos ✓                       |
| `pnpm typecheck` (`tsc --noEmit --strict`)            | ✅ **0 erros TypeScript** — exit 0 (executado nesta auditoria; `node_modules` disponíveis; não requer credenciais Supabase) |
| `pnpm lint` (`eslint src test tailwind.config.ts`)   | ⚠️ **5 avisos `no-unused-vars`** — exit 0 — HomeFeaturedSection.tsx:13, MediaUploadSection.tsx:8-9, TagsSection.tsx:14, animated-backgrounds.ts:1 — CI não bloqueado (avisos sem `--max-warnings 0`) |
| `pnpm build`                                          | **Não executado** — requer credenciais de produção (`validate-env` no `prebuild`) |
| Testes E2E (Playwright)                              | **Não executados** — requer browser e servidor local                     |

### Limitações desta Auditoria
- Build não executado: sem `.env.local` com credenciais de produção não é possível executar `pnpm build` (validate-env no prebuild lança exceção).
- `pnpm typecheck` e `pnpm lint` executados diretamente via `node_modules/.bin/{tsc,eslint}` — não requerem credenciais Supabase.
- Testes E2E não executados: Playwright requer browser e servidor local.
- Supabase Realtime não validado ao vivo: apenas análise estática de código.
- Screenshots visuais não capturados: ambiente remoto sem browser para este contexto.
- `pnpm install` não executado: ambiente remoto de auditoria read-only.

---

## 6️⃣ Evidências

### Estrutura de Rotas Confirmada
```
src/app/
├── admin/
│   ├── (auth)/login/, reset-password/
│   └── (protected)/
│       ├── config/, copy-agent/, landing-pages/[id]/, midia/
│       ├── scene-generator/, settings/, trabalhos/[id]/
│       └── layout.tsx, page.tsx
├── api/admin/storage/, contact/, report-error/, site-assets/, view-cv/
├── auth/callback/
├── contato/, portfolio/[slug]/, sobre/, privacidade/, projects/[slug]/
├── page.tsx (Home), layout.tsx (Root), template.tsx
└── error.tsx, not-found.tsx, global-error.tsx, robots.ts, sitemap.ts
```

### Componentes Críticos — Status
```
src/components/
├── canvas/
│   ├── header/HeaderGlassCanvas.tsx    ← aria-hidden ✓, aria-label ausente ⚠️
│   └── home/hero/
│       ├── GhostSceneWrapper.tsx       ← aria-hidden ✓, role ✓, aria-label ausente ⚠️
│       ├── GhostScene.tsx              ← ssr:false ✓
│       └── hooks/ (6 hooks de WebGL)
├── home/
│   ├── ShaderSection.tsx               ← uniforms: any ⚠️, RAF sem viewport gate ⚠️, cores corretas ✓
│   ├── clients/ClientsBrandsSection.tsx ← bg-bluePrimary ✓, slice(12) ⚠️
│   ├── contact/ContactForm.tsx         ← Turnstile lazy ✓
│   ├── featured-projects/
│   │   ├── FeaturedProjectCard.tsx     ← IntersectionObserver individual ⚠️
│   │   ├── FeaturedProjectsRealtime.tsx ← polling 45s ✓, realtime ✓
│   │   └── FeaturedProjectsSection.tsx  ← grid 4 posições fixas ⚠️
│   ├── hero/
│   │   ├── HomeHero.tsx               ← WebGL gate ✓, fallback ✓
│   │   ├── HeroCopy.tsx               ← import @/lib/motion ⚠️
│   │   └── VideoManifesto.tsx         ← assets Supabase ✓
│   └── portfolio-showcase/
│       └── PortfolioShowcase.tsx       ← GHOST_EASE ✓, slugs hardcoded ⚠️
├── portfolio/
│   ├── ProjectsGallery.tsx            ← LERP ✓, filtros ✓
│   └── PortfolioModal.tsx             ← portal ✓, focus trap ✓, ErrorBoundary ✓
└── sobre/ (8 seções mapeadas)
```

### Tokens Ghost Design System — Aderência
| Token                                  | globals.css | Componentes |
|----------------------------------------|-------------|-------------|
| `--color-bluePrimary: #0048ff`         | ✅          | ✅          |
| `--color-background: #040013`          | ✅          | ✅          |
| `--ease-ghost: cubic-bezier(0.22,1,0.36,1)` | ✅   | ✅ via `GHOST_EASE` |
| `--z-layer-*` (hierarquia completa)    | ✅          | ✅ via `var()` |
| `scale/rotate` proibidos               | —           | ✅ Zero usos |
| `y: max 18px` para UI content          | Documentado | ✅ (`y: 18`) |
| `aria-label` em Canvas decorativos     | Documentado | ⚠️ Ausente  |

### Conflito Documentação PostCSS — Prova Direta
```
# postcss.config.cjs — implementação real (CORRETO para v4)
module.exports = { plugins: { '@tailwindcss/postcss': {} } }

# .claude/rules/postcss-tailwind-config.md — regra desatualizada (ERRADO para v4)
# ❌ NUNCA USE: '@tailwindcss/postcss'  ← CONTRADIÇÃO: este é o plugin correto em v4

# src/app/globals.css — implementação real (CORRETO para v4)
@import 'tailwindcss';

# .claude/rules/README-POSTCSS.md — regra desatualizada (ERRADO para v4)
# ❌ NUNCA USE: @import 'tailwindcss'  ← CONTRADIÇÃO: sintaxe correta em v4
```

---

## 7️⃣ Riscos Operacionais

### Risco 1 — Rotina Autônoma Futura Baseada em Regras Desatualizadas
**Severidade:** 🔴 Crítico  
As regras `.claude/rules/postcss-tailwind-config.md` marcam `@tailwindcss/postcss` como "ERRADO". Se uma rotina futura ler essas regras e tentar "corrigir" o `postcss.config.cjs`, quebrará o projeto completamente — Tailwind v4 requer exatamente esse plugin. **Ação imediata necessária: atualizar as regras (Prompt #01).**

### Risco 2 — Firebase Hosting + Next.js Standalone + Adapter
**Severidade:** 🟡 Médio  
O projeto usa `output: 'standalone'` com `adapterPath: firebaseAdapterPath` (apenas durante `PHASE_PRODUCTION_BUILD`). O adapter em `scripts/firebase-next-adapter.cjs` deve ser compatível com Next.js 16.2.9 (`package.json` — versão real). Se houver incompatibilidade, podem ocorrer falhas silenciosas de SSR em Cloud Functions. Verificar compatibilidade do adapter periodicamente.

### Risco 3 — Middleware Fatal sem Fallback
**Severidade:** 🟡 Médio  
Middleware lança erro fatal se credenciais Supabase ausentes. Em deploys de preview/staging sem todas as variáveis configuradas, isso derruba toda a aplicação (ver AUDIT-004).

### Risco 4 — `ignoreBuildErrors: true`
**Severidade:** 🟡 Médio  
A flag `ignoreBuildErrors: true` em `next.config.mjs` permite que `next build` local conclua silenciosamente com erros TypeScript. O CI já tem gate via `pnpm run build-check` (= `pnpm typecheck && pnpm lint`) em `.github/workflows/firebase-deploy.yml` — risco limitado a builds locais emergenciais fora do pipeline.

### Risco 5 — Supabase ANON Key vs Publishable Key
**Severidade:** 🟡 Baixo-Médio  
Validação em `env.ts` usa `NEXT_PUBLIC_SUPABASE_ANON_KEY` mas Supabase migrou para `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`. Em ambientes novos, pode gerar falsa validação.

### Risco 6 — Secrets / Webhooks
**Severidade:** ✅ Controlado  
`.env.example` não contém valores reais — apenas nomes de variáveis. Variável `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` não presente no ambiente desta execução (ver §8). Nenhum segredo foi exposto neste relatório.

### Risco 7 — `WEEKLY_AUDIT_REPORT.md` Pré-existente
**Severidade:** ✅ Controlado  
O arquivo `WEEKLY_AUDIT_REPORT.md` já existia na raiz (43 KB) da execução anterior (2026-06-09). Esta rotina sobrescreveu exclusivamente este arquivo com o relatório atualizado. Nenhum outro arquivo foi alterado.

---

## 8️⃣ Slack Approval Request

**Status:** ❌ Não enviado — variável `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` não encontrada no ambiente desta execução.

**Payload que seria enviado (sanitizado):**

```json
{
  "text": "Weekly Audit - Aprovação necessária",
  "blocks": [
    {
      "type": "header",
      "text": {"type": "plain_text", "text": "🔔 Auditoria Semanal — portfoliodanilo.com — 2026-06-30"}
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Projeto:* portfoliodanilo.com\n*Data:* 2026-06-30\n*PR:* <PR_URL|Ver PR Documental>\n*P0 Crítico:* 1 | *P1 Estrutural:* 7 | *P2 Polimento:* 5\n\n*Top 3 Riscos:*\n1. 🔴 Regras PostCSS desatualizadas — risco de downgrade acidental de Tailwind v4 para v3\n2. 🟡 Middleware sem fallback — ausência de credenciais derruba toda a aplicação\n3. 🟡 ignoreBuildErrors: true em next.config.mjs — builds locais fora do CI ignoram erros de tipo\n\n*Nenhum arquivo de código foi alterado nesta rodada.*\nResponda *Aprovado* ou *Proceed* para autorizar a criação de uma rotina separada de correção."
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
          "value": "audit_2026-06-30"
        },
        {
          "type": "button",
          "text": {"type": "plain_text", "text": "❌ Rejeitar"},
          "style": "danger",
          "action_id": "reject_routine",
          "value": "audit_2026-06-30"
        }
      ]
    }
  ]
}
```

**Ação necessária:** Configurar `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` no ambiente da rotina para habilitar notificações automáticas nas próximas execuções.

---

## 9️⃣ Próximo Passo Recomendado

**Prioridade máxima:** Aprovar e executar **Prompt #01** (atualização das regras PostCSS) para eliminar o risco de uma rotina autônoma futura realizar downgrade acidental de Tailwind v4 para v3 — isso quebraria o build de produção.

**Sequência recomendada após aprovação humana:**
1. **#01** — Atualizar regras PostCSS (5 min, zero risco de código, elimina AUDIT-001)
2. **#07** — Remover `ignoreBuildErrors` de `next.config.mjs` (30–60 min, risco médio, elimina AUDIT-002) — paralelo a #01 possível
3. **#08** — Restringir CSP de `/api/view-cv` + reescrever CV HTML (2–4h, risco baixo-médio, elimina AUDIT-011) — segurança, prioridade elevada
4. **#03** — Modo degradado no middleware (45 min, risco médio, elimina AUDIT-004)
5. **#10** — Alinhar nomenclatura de chave Supabase no env.ts (10 min, risco baixo, elimina AUDIT-005)
6. **#09** — Migrar `portfolio/[slug]` para ISR + corrigir revalidação no deleteProjectAction (30–45 min, risco médio, elimina AUDIT-012)
7. **#04, #05, #06** — Polimentos técnicos (15 min cada, AUDIT-009, 008, 010)
8. **#02** — Documentar facade `@/lib/motion` (10 min, zero risco, resolve AUDIT-003 como P2)

**Nota:** AUDIT-013 (42 asset links quebrados) requer auditoria dedicada de assets via `scripts/` — não incluído na sequência acima por requerer mapeamento de URLs antes de qualquer ação.

**Bloqueador atual:** A ausência do webhook Slack impede notificação automática. Esta rotina deve ser complementada com notificação manual ao responsável técnico (dannovaisv@gmail.com).

**Aprovação necessária antes de qualquer execução de correção.** Esta rotina encerrou com `WEEKLY_AUDIT_REPORT.md` atualizado e PR documental aberto. Aguardando decisão humana.
