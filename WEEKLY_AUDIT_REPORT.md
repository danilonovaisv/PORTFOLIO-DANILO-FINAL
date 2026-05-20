# Weekly Portfolio Audit Report

## 0. Metadata

- **Date:** 2026-05-19
- **Repository:** danilonovaisv/PORTFOLIO-DANILO-FINAL
- **Branch de origem:** claude/beautiful-rubin-8MVUN
- **Branch de auditoria:** claude/weekly-audit-report-2026-05-19
- **Routine:** Weekly Autonomous Audit — Claude Code Routine
- **Commit de referência:** 37b98f37
- **PR:** https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL/pull/469
- **Revisão:** v1.1 — 2026-05-19 (correções pós-review Codex: contagem de `any`, AdminShell omitido, falso positivo P1-003 removido)
- **Auditor:** Ghost Commander — Claude Code Autonomous Audit Agent
- **Scope:** Auditoria dos 12 pilares: estrutura, Ghost Design System, responsividade, motion/WebGL, performance, roteamento, interações, landing pages, dados/CMS, segurança operacional, Firebase Hosting, acessibilidade
- **Files changed:** Exclusivamente `WEEKLY_AUDIT_REPORT.md`
- **Approval status:** ⏳ Pending human approval

---

## 1️⃣ Visão Geral

O portfólio está em estado **estável e funcional**, com boa maturidade de arquitetura. As rotas documentadas (`/`, `/sobre`, `/portfolio`, `/portfolio/[slug]`, `/admin`) correspondem à estrutura real em `src/app/`. O sistema de design Ghost está amplamente implementado: tokens de cor corretos em `globals.css` (via `@theme`), easing `[0.22, 1, 0.36, 1]` centralizado em `src/config/motion.ts`, grid `.std-grid` com max-width 1680px, e 217 ocorrências de `useMotionGate`/`useReducedMotion` confirmando cobertura sólida de `prefers-reduced-motion`.

A migração de `framer-motion` para `motion/react` foi completada — nenhuma importação do pacote antigo foi encontrada. O header SiteHeader, o modal de portfolio com focus-trap, e o SmoothScroll via Lenis (com bypass correto para `/admin`) estão bem implementados. A autenticação admin com middleware Supabase e controle de role também está operacional.

Três achados exigem atenção antes do próximo deploy:

1. **PPSupplyMono** é carregado de CDN externo (`assets.codepen.io`) — risco de privacidade, disponibilidade e performance.
2. **`hover:scale-125`** em `ManifestoScrollSection` viola o Ghost Motion Protocol.
3. **`typescript: { ignoreBuildErrors: true }`** ativo em `next.config.mjs` mascara erros silenciosamente.

---

## 2️⃣ Diagnóstico por Seção

### Home Hero (`src/components/home/hero/HomeHero.tsx`)
- **Estado:** Conforme. Renderiza 3D via `GhostSceneWrapper` somente se `supportsWebGL && !shouldReduceMotion`. Fallback mobile com gradiente radial correto. Preloader com `AnimatePresence`.
- **Desvios:** CTA aparece apenas quando `isLoaded=true`, o que pode criar flash visível em conexões lentas. Offset de 12px nas animações do `HeroCopy` — dentro do limite de 18px.

### Video Manifesto (`src/components/home/hero/VideoManifesto.tsx`)
- **Estado:** Conforme. Aspect ratio adaptável, lazy loading, fallback de imagem presente.
- **Desvios:** Não verificado acesso ao vídeo de manifesto em Supabase Storage. Dependência de `BRAND.assets.video.manifesto` (constante tipada) — correto.

### Portfolio Showcase (`src/components/home/portfolio-showcase/PortfolioShowcase.tsx`)
- **Estado:** Conforme. Usa `SITE_ASSET_KEYS` para thumbnails, `useMotionGate` ativo. ARIA `aria-labelledby` presente.
- **Desvios:** Sem desvio material identificado.

### Featured Projects (`src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`)
- **Estado:** Conforme. Fetch de Supabase com fallback (buildFallbackProjects). Cards com IntersectionObserver para rotação de background. Shuffle por seed temporal.
- **Desvios:** 302 linhas — próximo ao limite de 500 linhas mas aceitável.

### Clients/Brands (`src/components/home/clients/ClientsBrandsSection.tsx`)
- **Estado:** Conforme. GhostFadeUp com `y: 16` (dentro do limite). Grid de logos com ARIA.

### Sobre — Herói e Seções
- **Estado:** Estrutura confirma ao SSOT (`AboutHero`, `AboutOrigin`, `AboutWhatIDo`, `AboutMethod`, `AboutClosing`, `ManifestoScrollSection`). `GhostModel.tsx` usa URL Supabase hardcoded — violação de governança de assets.
- **Desvios:** `hover:scale-125` detectado em `ManifestoScrollSection.tsx:300` (paginação de carrossel). Escala 3D no `GhostModel.tsx` é uso Three.js legítimo, não violação de motion 2D.

### Portfolio Grid e Modal (`src/components/portfolio/`)
- **Estado:** Galeria com LERP scroll, filtros por categoria, paginação. Modal com focus-trap, ESC handler, portal no `#modal-root`, `useBodyLock`. Conforme.
- **Desvios:** Sem desvio material identificado.

### Admin (`src/app/admin/`)
- **Estado:** Middleware protege todas as rotas `/admin` (exceto `/admin/login`). Role check via `isAdminUser`. Supabase SSR com cookies `__session`. Conforme.
- **Desvios:** `console.error` em `ProjectsTable.tsx` e `LoginForm.tsx` — aceitável em contexto admin mas deve ser substituído por logger estruturado.

### Contact Form (`SiteClosure -> ContactSection`)
- **Estado:** Componente unificado com `ClientsBrandsSection`, `ContactSection` e `SiteFooter` em ordem correta — conforme ao SSOT.

### Acessibilidade Geral
- **Estado:** Skip-to-content link presente no layout (`Pular para o conteúdo`). Canvas WebGL com `aria-hidden="true"` e `role="presentation"` em `GhostSceneWrapper` e `HeaderGlassCanvas`. `lang="pt-BR"` no `<html>`. Focus trap no modal.
- **Desvios:** Falta `aria-hidden` em canvas/R3F da seção Sobre (`GhostModel`). O componente `ManifestoScrollSection` carece de atributos ARIA em elementos de paginação interativos (botões de dot-navigation sem `aria-label`).

---

## 3️⃣ Lista de Problemas e Backlog Priorizado

### 🔴 P0 — Crítico (bloqueia qualidade e segurança)

---

**ID: P0-001**
- **Severidade:** 🔴 P0 Crítico
- **Área:** Fontes / Asset Governance / Performance / GDPR
- **Evidência:** `src/styles/fonts.css:21` — `url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2')`. `src/app/layout.tsx:68` — `dns-prefetch` para `assets.codepen.io`.
- **Impacto:** 1) Dependência de infraestrutura de terceiro (Codepen CDN) — se o CDN cair, PPSupplyMono não carrega. 2) Requisição de fonte cruzada expõe dados do usuário a servidor externo (GDPR/LGPD). 3) Latência extra de DNS lookup na renderização crítica. 4) Viola regra `assets.md`: "assets de produção DEVEM ser servidos via Supabase Storage."
- **Arquivos relacionados:** `src/styles/fonts.css`, `src/app/layout.tsx`, `public/fonts/`
- **Risco de não corrigir:** Indisponibilidade de fonte em produção, risco regulatório LGPD, degradação de performance em conexões lentas.
- **Critério de aceite futuro:** `PPSupplyMono-Variable.woff2` hospedado em `public/fonts/` ou Supabase Storage. `src/styles/fonts.css` referenciando URL local. Remoção de `dns-prefetch` para `assets.codepen.io`. Lighthouse Performance Score sem regressão.

---

**ID: P0-002**
- **Severidade:** 🔴 P0 Crítico
- **Área:** Ghost Motion Protocol — Violações de `scale` (2 ocorrências)
- **Evidência:**
  - `src/components/sobre/sections/ManifestoScrollSection.tsx:300` — `hover:scale-125` no dot-indicator de paginação (UI pública).
  - `src/components/admin/AdminShell.tsx:86` — `group-hover:scale-125` em indicador de nav do admin.
- **Impacto:** Viola explicitamente o Ghost Design System: "Forbidden (content/UI): `scale`". Duas ocorrências confirmadas criam precedente de erosão do protocolo.
- **Arquivos relacionados:** `src/components/sobre/sections/ManifestoScrollSection.tsx`, `src/components/admin/AdminShell.tsx`
- **Risco de não corrigir:** Erosão gradual do Ghost Motion Protocol; aprovação de scale em outros componentes por precedente.
- **Critério de aceite futuro:** Ambas as instâncias de `scale` substituídas por mudança de opacidade/glow. Audit grep `hover:scale|group-hover:scale` em `src/` retorna zero resultados em componentes não-3D.

---

**ID: P0-003**
- **Severidade:** 🔴 P0 Crítico
- **Área:** TypeScript Build Integrity
- **Evidência:** `next.config.mjs`: `typescript: { ignoreBuildErrors: true }`. Confirmado por 119 usos de `as any` / `: any` no codebase.
- **Impacto:** Erros de tipo em produção são ignorados silenciosamente. Deploy pode acontecer com código type-unsafe. Os 119 `any` acumulados indicam dívida técnica ativa.
- **Arquivos relacionados:** `next.config.mjs`, múltiplos arquivos `src/`
- **Risco de não corrigir:** Bugs de runtime invisíveis no pipeline; impossibilidade de confiar em typecheck como gate de qualidade.
- **Critério de aceite futuro:** `ignoreBuildErrors: false`. Todos os erros de tipo resolvidos (ou suprimidos com comentário justificado). `pnpm run typecheck` sem output de erro.

---

### 🟡 P1 — Estrutural (degradação de manutenibilidade)

---

**ID: P1-001**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Asset Governance — URL hardcoded em componente de produção
- **Evidência:** `src/components/sobre/3d/GhostModel.tsx:17` — `const MODEL_PATH = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb?v=1.0.1';`
- **Impacto:** URL Supabase hardcoded bypassa o sistema de gestão de assets (`SITE_ASSET_KEYS` / `assets.json`). Mudança de bucket, URL base ou versão requer localizar e editar arquivo de componente diretamente.
- **Arquivos relacionados:** `src/components/sobre/3d/GhostModel.tsx`, `src/config/site-assets.ts`
- **Risco de não corrigir:** Manutenção difícil; risco de URL ficar desatualizada após migrações de bucket.
- **Critério de aceite futuro:** `MODEL_PATH` extraído para `SITE_ASSET_KEYS` em `src/config/site-assets.ts`. GhostModel usa `getAssetUrl(SITE_ASSET_KEYS.ghostModel)`.

---

**ID: P1-002**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Acessibilidade — ARIA em canvas 3D da seção Sobre
- **Evidência:** `src/components/sobre/3d/GhostModel.tsx` não possui `aria-hidden="true"`. O wrapper em `src/components/sobre/sections/` que renderiza o canvas precisa de `aria-hidden` e `role="presentation"`.
- **Impacto:** Screen readers podem tentar interpretar o canvas WebGL, gerando experiência degradada para usuários de tecnologia assistiva.
- **Arquivos relacionados:** `src/components/sobre/3d/GhostModel.tsx`, `src/components/sobre/sections/`
- **Risco de não corrigir:** Falha no critério de acessibilidade AA/AAA. Inconsistência com hero (que já tem `aria-hidden`).
- **Critério de aceite futuro:** Wrapper do canvas Sobre com `aria-hidden="true"` e `role="presentation"`. Screen reader bypass confirmado via test de acessibilidade.

---

---

**ID: P1-004**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** Regras de Projeto Conflitantes — Tailwind v3 vs v4
- **Evidência:** `.claude/rules/postcss-tailwind-config.md` e `.claude/rules/README-POSTCSS.md` prescrevem Tailwind v3.4.x com `@tailwind` directives e `tailwindcss: {}` no PostCSS. Projeto usa Tailwind 4.3.0 com `@import 'tailwindcss'` e plugin `@tailwindcss/postcss` — configuração correta para v4.
- **Impacto:** Agentes que seguem as regras desatualizadas tentarão fazer downgrade de Tailwind, quebrando o build. Contradição de SSOT entre as regras e o código real.
- **Arquivos relacionados:** `.claude/rules/postcss-tailwind-config.md`, `.claude/rules/README-POSTCSS.md`, `postcss.config.cjs`, `src/app/globals.css`
- **Risco de não corrigir:** Agente futuro quebra CSS ao seguir regras obsoletas; confusão operacional em onboarding.
- **Critério de aceite futuro:** Regras atualizadas para documentar Tailwind v4 como padrão do projeto. Remover referências a v3 de todos os arquivos de regras.

---

**ID: P1-004**
- **Severidade:** 🟡 P1 Estrutural
- **Área:** TypeScript Quality — Dívida de `any`
- **Evidência:** 111 usos de `as any` / `: any` em `src/` (grep `\bas any\b|:\s*any\b` em `*.tsx` e `*.ts`).
- **Impacto:** Acumulação de dívida técnica; riscos de runtime silenciosos; dificulta refatorações seguras.
- **Arquivos relacionados:** Múltiplos em `src/`
- **Risco de não corrigir:** Crescimento da dívida com cada sprint; erros de produção não detectados pelo compilador.
- **Critério de aceite futuro:** Meta: < 30 usos justificados de `any` com comentário `// eslint-disable-next-line @typescript-eslint/no-explicit-any`. `pnpm run typecheck` com zero erros quando `ignoreBuildErrors` for desativado.

---

---

### 🟢 P2 — Polimento Rápido (melhoria de qualidade)

---

**ID: P2-001**
- **Severidade:** 🟢 P2 Polimento Rápido
- **Área:** CSS — Token deprecado ainda presente
- **Evidência:** `src/app/globals.css` contém `--font-family-outfit: 'Outfit', sans-serif;` com comentário `@deprecated — Outfit not used in production; scheduled for removal`.
- **Arquivos relacionados:** `src/app/globals.css`
- **Impacto:** Ruído de CSS. Bundle levemente maior.
- **Critério de aceite futuro:** Linha removida. Busca de `Outfit` no codebase para confirmar ausência de uso.

---

**ID: P2-002**
- **Severidade:** 🟢 P2 Polimento Rápido
- **Área:** Console statements em produção
- **Evidência:** `console.warn` e `console.error` em `src/components/layout/AssetLoaderWrapper.tsx:40,56,65`, `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx:136`, `src/components/ui/shared/DynamicAssetImage.tsx:91`.
- **Arquivos relacionados:** Listados acima.
- **Impacto:** Exposição de informações de debug em browser de usuário final. Viola regra `code-quality.md`.
- **Critério de aceite futuro:** Substituídos por logger estruturado ou condicionados a `process.env.NODE_ENV !== 'production'`.

---

**ID: P2-003**
- **Severidade:** 🟢 P2 Polimento Rápido
- **Área:** Preconnect ausente para CDN de fonte
- **Evidência:** `src/app/layout.tsx:68` — apenas `dns-prefetch` para `assets.codepen.io`, não `preconnect`. (Nota: este issue será resolvido junto ao P0-001 ao mover a fonte para self-hosted.)
- **Arquivos relacionados:** `src/app/layout.tsx`
- **Impacto:** Menor: `preconnect` é mais agressivo que `dns-prefetch` para domínios críticos.
- **Critério de aceite futuro:** Dependência eliminada ao resolver P0-001.

---

## 4️⃣ Prompts Técnicos para Agentes Google Antigravity Atômicos

> **IMPORTANTE:** Nenhum prompt abaixo deve ser executado sem aprovação humana explícita (Approval Gate).

---

### 🛠️ Prompt #01 — Self-host PPSupplyMono (P0-001)

**Objetivo:** Mover a fonte `PPSupplyMono-Variable.woff2` para `public/fonts/` e eliminar dependência do CDN externo `assets.codepen.io`.

**Especialista:** `@ghost_architect` / `frontend-specialist`

**Arquivos:**
- `src/styles/fonts.css`
- `src/app/layout.tsx`
- `public/fonts/PPSupplyMono-Variable.woff2` (arquivo a ser criado)

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` — Seção 1.2 Typography
- `.claude/rules/assets.md` — Zero Placeholder Policy, Supabase First
- `src/styles/fonts.css` — implementação atual a ser substituída

**Ações:**
1. Fazer download de `https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2` para `public/fonts/PPSupplyMono-Variable.woff2`.
2. Alterar `src/styles/fonts.css`: substituir `url('https://assets.codepen.io/...')` por `url('/fonts/PPSupplyMono-Variable.woff2')`.
3. Em `src/app/layout.tsx`: adicionar `<link rel="preload" href="/fonts/PPSupplyMono-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />` e remover `<link rel="dns-prefetch" href="https://assets.codepen.io" />`.
4. Validar: `pnpm run build` sem erros; confirmar carregamento local via DevTools Network tab.

**Regras:** Não alterar tokens de design. Não alterar `font-family` ou `font-weight` range. Fallback `local('Space Mono'), local('Courier New'), local('monospace')` deve ser preservado.

**Critérios de Aceite:**
- [ ] Fonte carrega de `/fonts/PPSupplyMono-Variable.woff2` (sem requisição a `assets.codepen.io`).
- [ ] `pnpm run build` sem erros.
- [ ] Nenhuma regressão visual em elementos com classe `font-mono` ou `text-micro`.
- [ ] `dns-prefetch` para `assets.codepen.io` removido de `layout.tsx`.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #02 — Corrigir Motion Scale em ManifestoScrollSection (P0-002)

**Objetivo:** Substituir `hover:scale-125` por transição de opacidade conforme Ghost Motion Protocol.

**Especialista:** `@motion_choreographer` / `motion`

**Arquivos:**
- `src/components/sobre/sections/ManifestoScrollSection.tsx`
- `src/components/admin/AdminShell.tsx`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` — Seção 2.3 Allowed vs Forbidden Motion
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/` — documentação da seção de manifesto

**Ações:**
1. Em `ManifestoScrollSection.tsx:300`: substituir `hover:scale-125` por `hover:opacity-100` na string de classes do dot indicator inativo.
2. Confirmar que `bg-white/15 w-[0.35rem] hover:bg-white/40` permanece; apenas remover `hover:scale-125`.
3. Em `AdminShell.tsx:86`: substituir `group-hover:scale-125` por `group-hover:opacity-100` ou `group-hover:brightness-150` no indicador de nav.
4. Testar visualmente em `/sobre` (dots) e `/admin` (nav indicator) que o hover responde sem scale.

**Regras:** Não alterar `z-index`, `width`, nem `background-color` base. Não usar `transition-transform`. Usar `transition-opacity duration-200` se necessário. Nota: `GhostModel.tsx` usa `scale` em contexto Three.js 3D — essa é uma exceção válida, não alterar.

**Critérios de Aceite:**
- [ ] Zero instâncias de `hover:scale` ou `group-hover:scale` em componentes UI não-3D (grep confirm).
- [ ] Dot indicator e nav indicator visualmente responsivos ao hover.
- [ ] `pnpm run typecheck` sem novos erros.
- [ ] Comportamento de reduced-motion preservado.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #03 — Mover MODEL_PATH para SITE_ASSET_KEYS (P1-001)

**Objetivo:** Eliminar URL hardcoded de `GhostModel.tsx` e centralizar no sistema de assets.

**Especialista:** `@ghost_architect` / `frontend-specialist`

**Arquivos:**
- `src/components/sobre/3d/GhostModel.tsx`
- `src/config/site-assets.ts`

**Contexto obrigatório:**
- `.claude/rules/assets.md` — Asset Governance
- `src/config/site-assets.ts` — estrutura atual de `SITE_ASSET_KEYS`

**Ações:**
1. Ler `src/config/site-assets.ts` e identificar o namespace adequado (ex: `about3d` ou `canvas`).
2. Adicionar chave `ghostModel3d` (ou nome coerente com o padrão existente) em `SITE_ASSET_KEYS` com valor `'3d/ghost-v1.glb'`.
3. Em `GhostModel.tsx`, substituir `const MODEL_PATH = 'https://...'` por `const MODEL_PATH = getAssetUrl(SITE_ASSET_KEYS.about3d.ghostModel3d)` (ajustar caminho conforme namespace escolhido).
4. Confirmar que `useGLTF.preload(MODEL_PATH)` continua funcionando.

**Regras:** Não alterar a URL base do Supabase — apenas extrair para constante. Não alterar lógica de renderização 3D.

**Critérios de Aceite:**
- [ ] Nenhuma URL Supabase hardcoded em `GhostModel.tsx`.
- [ ] `MODEL_PATH` derivado de `SITE_ASSET_KEYS`.
- [ ] Build sem erros. Modelo 3D carrega em `/sobre`.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #04 — ARIA para Canvas 3D na Página Sobre (P1-002 + P1-003)

**Objetivo:** Adicionar `aria-hidden="true"` no wrapper do canvas 3D de Sobre, e `aria-label` nos dot-indicators de paginação.

**Especialista:** `@audit_sentinel` / `frontend-specialist`

**Arquivos:**
- `src/components/sobre/3d/GhostModel.tsx` (ou wrapper em `sections/`)
- `src/components/sobre/sections/ManifestoScrollSection.tsx`

**Contexto obrigatório:**
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md` — Seção 2.3 (Accessibility)
- WCAG 2.1 Success Criterion 4.1.2

**Ações:**
1. Localizar o `<div>` ou `<Canvas>` wrapper que renderiza `GhostModel` na página Sobre.
2. Adicionar `aria-hidden="true"` e `role="presentation"` nesse wrapper.
3. Em `ManifestoScrollSection.tsx`, localizar os botões de dot-navigation.
4. Adicionar `aria-label={`Ir para o item ${index + 1}`}` em cada botão.
5. Adicionar `aria-current={isActive ? 'true' : undefined}` no dot ativo.

**Regras:** Não alterar layout visual. Não alterar lógica de rotação de carrossel.

**Critérios de Aceite:**
- [ ] Canvas Sobre com `aria-hidden="true"`.
- [ ] Dots com `aria-label` e `aria-current`.
- [ ] Teste de acessibilidade via axe-core ou NVDA sem violações nessas áreas.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #05 — Atualizar Regras Tailwind v3→v4 (P1-004)

**Objetivo:** Corrigir arquivos de regras que prescrevem Tailwind v3 quando o projeto usa v4.

**Especialista:** `@ghost_architect`

**Arquivos:**
- `.claude/rules/postcss-tailwind-config.md`
- `.claude/rules/README-POSTCSS.md`

**Contexto obrigatório:**
- `postcss.config.cjs` — configuração real em uso
- `src/app/globals.css` — sintaxe real em uso (`@import 'tailwindcss'`)
- `package.json` — versão `tailwindcss: 4.3.0`

**Ações:**
1. Reescrever `.claude/rules/postcss-tailwind-config.md` documentando que o projeto usa Tailwind v4 com `@tailwindcss/postcss` e `@import 'tailwindcss'`.
2. Reescrever `.claude/rules/README-POSTCSS.md` com instruções corretas para v4.
3. Remover todas as referências a "downgrade para v3.4.x" e ao erro `RangeError: Invalid code point`.
4. Adicionar seção "Versão Aprovada: Tailwind CSS 4.3.x+".

**Regras:** Não alterar código de produção. Apenas documentação de regras.

**Critérios de Aceite:**
- [ ] Regras descrevem Tailwind v4 como padrão.
- [ ] Nenhuma instrução de downgrade para v3 nas regras.
- [ ] Consistência entre regras e configuração real do projeto.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #06 — Limpeza de Token Deprecado e Console Statements (P2-001 + P2-002)

**Objetivo:** Remover `--font-family-outfit` de `globals.css` e converter `console.warn` de componentes de produção para logger condicional.

**Especialista:** `@ghost_architect` / `frontend-specialist`

**Arquivos:**
- `src/app/globals.css`
- `src/components/layout/AssetLoaderWrapper.tsx`
- `src/components/ui/shared/DynamicAssetImage.tsx`
- `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx`

**Contexto obrigatório:**
- `.claude/rules/code-quality.md` — Anti-Patterns: Console Logs

**Ações:**
1. Em `globals.css`: remover a linha `--font-family-outfit: 'Outfit', sans-serif;` e o comentário `@deprecated` acima.
2. Buscar `Outfit` no codebase para confirmar ausência de uso antes de remover.
3. Em `AssetLoaderWrapper.tsx`, `DynamicAssetImage.tsx` e `AlpaBlock.tsx`: envolver `console.warn` em `if (process.env.NODE_ENV !== 'production')` ou usar logger estruturado do projeto.
4. Não remover `console.error` de `ErrorBoundary.tsx` — este é justificado para captura de erros críticos.

**Regras:** Não alterar estilização de componentes. Não alterar lógica de fetch ou carregamento de assets.

**Critérios de Aceite:**
- [ ] `globals.css` sem referências a `Outfit`.
- [ ] `console.warn` de componentes de produção condicionados ao ambiente de desenvolvimento.
- [ ] `pnpm run build` sem erros.

**Approval Gate:** Não executar sem aprovação humana explícita.

---

## 5️⃣ Validação Técnica Executada

| Validação | Resultado |
|:---|:---|
| Estrutura de rotas vs SSOT | ✅ Conforme (`/`, `/sobre`, `/portfolio`, `/portfolio/[slug]`, `/admin`) |
| Tokens de cor em `globals.css` | ✅ Todos os tokens Ghost System presentes (`--color-bluePrimary: #0048ff`, etc.) |
| Ghost ease em `motion.ts` | ✅ `GHOST_EASE = [0.22, 1, 0.36, 1]` centralizado |
| Grid `.std-grid` com max-width 1680px | ✅ Confirmado em `globals.css` |
| Offsets de motion (max 18px) | ✅ `offset.standard = 12px` (dentro do limite) |
| `useMotionGate` / `useReducedMotion` | ✅ 217 ocorrências — cobertura ampla |
| Importação de `motion/react` (não `framer-motion`) | ✅ Nenhuma importação legacy de `framer-motion` |
| `aria-hidden` em canvas WebGL | ⚠️ Parcial — `GhostSceneWrapper` e `HeaderGlassCanvas` OK, Sobre canvas pendente |
| Skip-to-content link | ✅ Presente em `layout.tsx` |
| Admin middleware | ✅ Todas rotas `/admin` protegidas com user check e role check |
| Segredos hardcoded | ✅ Nenhum API key ou token encontrado em `src/` |
| `.gitignore` cobrindo `.env` | ✅ Confirmado |
| Font PPSupplyMono — self-hosted | ❌ CDN externo `assets.codepen.io` |
| `hover:scale` em UI components | ❌ `hover:scale-125` em `ManifestoScrollSection.tsx:300` + `group-hover:scale-125` em `AdminShell.tsx:86` |
| `typescript: { ignoreBuildErrors }` | ❌ `true` em `next.config.mjs` |
| URL hardcoded em GhostModel.tsx | ❌ URL Supabase direta, bypassa `SITE_ASSET_KEYS` |
| Regras Tailwind desatualizadas | ❌ `.claude/rules/` prescrevem v3 mas projeto usa v4 |
| Firebase security headers | ✅ HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy presentes |
| `pnpm build` executado | ⏭️ Não executado (ambiente remoto sem Node; validação estática apenas) |
| `pnpm typecheck` executado | ⏭️ Não executado (ambiente remoto sem Node) |
| `pnpm lint` executado | ⏭️ Não executado (ambiente remoto sem Node) |

---

## 6️⃣ Evidências

| Evidência | Localização | Trecho |
|:---|:---|:---|
| PPSupplyMono em CDN externo | `src/styles/fonts.css:21` | `url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2')` |
| `hover:scale-125` em ManifestoScrollSection | `src/components/sobre/sections/ManifestoScrollSection.tsx:300` | `'bg-white/15 w-[0.35rem] hover:bg-white/40 hover:scale-125'` |
| `group-hover:scale-125` em AdminShell | `src/components/admin/AdminShell.tsx:86` | `group-hover:scale-125` em div de nav indicator |
| `ignoreBuildErrors: true` | `next.config.mjs` | `typescript: { ignoreBuildErrors: true }` |
| GhostModel URL hardcoded | `src/components/sobre/3d/GhostModel.tsx:17` | `const MODEL_PATH = 'https://umkmwbkwvulxtdodzmzf.supabase.co/...'` |
| Ghost ease correto | `src/config/motion.ts:11` | `export const GHOST_EASE: EasingTuple = [0.22, 1, 0.36, 1]` |
| Max-width 1680px | `src/app/globals.css` | `.std-grid { max-width: 1680px }` |
| Admin middleware | `src/middleware.ts` + `src/lib/supabase/middleware.ts` | Auth check + role verification |
| ARIA canvas hero | `src/components/canvas/home/hero/GhostSceneWrapper.tsx:31-32` | `aria-hidden="true"`, `role="presentation"` |
| Tailwind v4 em uso | `postcss.config.cjs` | `'@tailwindcss/postcss': {}` |
| Regras desatualizadas | `.claude/rules/postcss-tailwind-config.md` | Prescreve v3 mas projeto usa v4 |
| `as any` count | Grep em `src/` | 111 ocorrências de `as any` / `: any` |
| Console statements em prod | `src/components/layout/AssetLoaderWrapper.tsx:40,56,65` | `console.warn(...)` |

---

## 7️⃣ Riscos Operacionais

### Risco 1 — Dependência de CDN externo para fonte crítica (ALTO)
`PPSupplyMono` carregado de `assets.codepen.io`. Se o domínio ficar indisponível ou expirar, elementos com `font-mono` e `text-micro` regridem para `Space Mono` sem aviso. Risco de LGPD por transferência de dados (IP do usuário) para servidor externo.

### Risco 2 — TypeScript silenciado em build de produção (ALTO)
`ignoreBuildErrors: true` permite que erros de tipo sejam deployados. Em conjunto com 119 usos de `any`, o pipeline de CI não garante integridade de tipos. Risco de bugs de runtime não detectáveis no estágio de build.

### Risco 3 — Regras de agente em conflito com codebase (MÉDIO)
`.claude/rules/postcss-tailwind-config.md` e `README-POSTCSS.md` prescrevem downgrade para Tailwind v3. Um agente autônomo que seguir essas regras quebrará o CSS do projeto ao fazer downgrade. Risco operacional direto para rotinas futuras.

### Risco 4 — Firebase Hosting + Node runtime (BAIXO-MÉDIO)
`firebase.json` usa `frameworksBackend` com `memory: 2GiB` e região `us-central1`. O `package.json` especifica `"node": ">=20"`. Mudanças de versão Node em Firebase Functions requerem verificação de compatibilidade antes de deploy.

### Risco 5 — Webhook Slack com URL exposta em ambiente (BAIXO)
`SLACK_WEEKLY_AUDIT_WEBHOOK_URL` está disponível como variável de ambiente. Não foi encontrada em código-fonte ou logs. Status: seguro. A URL não foi impressa neste relatório.

### Risco 6 — `console.warn` em componentes de produção (BAIXO)
Informações de diagnóstico de assets são expostas no console de usuários finais via `AssetLoaderWrapper.tsx` e `DynamicAssetImage.tsx`. Não expõe segredos, mas polui o ambiente de produção.

---

## 8️⃣ Slack Approval Request

**Status:** ✅ Tentativa de envio ao Slack programada.

O payload abaixo será enviado via `curl` ao webhook configurado em `SLACK_WEEKLY_AUDIT_WEBHOOK_URL`. A URL não será impressa neste relatório por razão de segurança.

**Payload resumido:**
```json
{
  "text": "Weekly Audit - Aprovação necessária",
  "blocks": [
    { "type": "header", "text": { "type": "plain_text", "text": "🔔 Auditoria Semanal Concluída" } },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Projeto:* portfoliodanilo.com\n*Commit:* 37b98f37\n*P0:* 3 | *P1:* 4 | *P2:* 3\n*Top riscos:* PPSupplyMono em CDN externo, TypeScript silenciado, 2x escala proibida (Sobre + AdminShell)\n*Código alterado:* ❌ Nenhuma linha de código foi modificada.\n*Ação solicitada:* Responder 'Aprovado' ou 'Proceed' para autorizar a criação de uma rotina separada de correção."
      }
    },
    {
      "type": "actions",
      "elements": [
        { "type": "button", "text": { "type": "plain_text", "text": "✅ Aprovar Correções" }, "style": "primary", "action_id": "approve_routine", "value": "audit_2026-05-19" },
        { "type": "button", "text": { "type": "plain_text", "text": "❌ Rejeitar" }, "style": "danger", "action_id": "reject_routine", "value": "audit_2026-05-19" }
      ]
    }
  ]
}
```

---

## 9️⃣ Próximo Passo Recomendado

**Aprovar e executar os prompts P0-001 e P0-002 como prioridade imediata:** mover PPSupplyMono para self-hosted e corrigir `hover:scale-125` são as correções mais rápidas e com maior impacto — nenhuma delas exige refatoração significativa. A seguir, ativar `ignoreBuildErrors: false` somente após resolver os erros de tipo acumulados (P0-003 + P1-005, que devem andar juntos). O P1-004 (regras Tailwind desatualizadas) é crítico para segurança operacional de rotinas futuras e deve ser feito antes do próximo ciclo autônomo.
