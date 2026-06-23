# Weekly Portfolio Audit Report

## 0. Metadata

| Campo | Valor |
|---|---|
| **Date** | 2026-06-23 |
| **Repository** | danilonovaisv/portfolio-danilo-final |
| **Branch** | claude/beautiful-rubin-8duvkb |
| **Routine** | weekly-portfolio-audit |
| **Commit HEAD** | 14869153 |
| **PR** | Criado nesta execução |
| **Auditor** | Claude Code Routine — Ghost System Audit |
| **Scope** | 9 pilares + segurança operacional, Firebase, acessibilidade |
| **Files changed** | 1 (apenas WEEKLY_AUDIT_REPORT.md) |
| **Approval status** | Pending human approval |

---

## 1️⃣ Visão Geral

O repositório está em estado **operacional estável**, sem bloqueios críticos de produção identificados na análise estática. A arquitetura Next.js 16.2.9 com App Router está bem estruturada, o Ghost Design System está coerente nos tokens CSS, e a estratégia de ISR/SSG está implementada conforme o esperado (homepage `revalidate=3600`, about `force-static`, portfolio `revalidate=3600`, admin `force-dynamic`).

### Páginas auditadas

**Home (`/`):** Estrutura de camadas estratificada correta: gradiente base → texto (z-layer-content) → WebGL (z-layer-3d) → CTA (z-layer-cta). Preloader com AnimatePresence presente. WebGL gating com `useWebGLSupport()` e variável `NEXT_PUBLIC_DISABLE_3D` implementados. ISR 1 hora ativo.

**Sobre (`/sobre`):** `force-static` correto. Oito seções confirmadas (Hero, Origin, WhatIDo, Method, ManifestoScroll, Proof, Closing, StickyContactCTA + SiteClosure). Estrutura alinhada com SSOT em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/`.

**Portfolio (`/portfolio`):** Paginação (15 projetos/página), filtro por categoria (branding/creative/motion/web), metadata dinâmica por categoria, ISR 1 hora. Estrutura alinhada com SSOT.

**Admin (`/admin`):** Route groups `(auth)` e `(protected)` presentes. CRUD completo para projetos, tags, mídia e landing pages. `force-dynamic` em config page. `revalidatePath` chamado corretamente em Server Actions após mutações.

**Portfolio Slug (`/portfolio/[slug]`):** Rota dinâmica presente. Templates de projeto (master-v2, alpa) com `std-grid` em uso.

### Estado do Design System

Tokens de cor corretamente definidos em `globals.css` via `@theme {}`:
- `--color-bluePrimary: #0048ff` ✅
- `--color-background: #040013` ✅
- `--ease-ghost: cubic-bezier(0.22, 1, 0.36, 1)` ✅

Hierarquia de z-index com 16 layers nomeados, alinhada com Ghost DS §1.3 v3.2 ✅.

Grid `.std-grid` com max-width 1680px aplicado em 44 instâncias no codebase ✅.

**Divergências encontradas:** 3 violações de motion (scale), 1 inconsistência crítica de documentação de regras, 1 risco de segurança com SVGs, e 1 problema operacional com testes E2E.

---

## 2️⃣ Diagnóstico por Seção

### Home Hero
- **Layering:** Correto. z-layer-base → z-layer-content → z-layer-3d → z-layer-cta.
- **WebGL:** `GhostSceneWrapper.tsx` usa `aria-hidden="true"` e `ssr: false` via dynamic import. ✅
- **Motion Entry (CTA):** `ctaVariants` em `src/lib/motion/hero.ts` usa `scale: 0.97` no estado hidden. Violação do Ghost DS (scale proibido).
- **Preloader:** AnimatePresence presente. Inferido como correto.
- **Mobile:** `useMediaQuery('(min-width: 1024px)')` para condicionar WebGL ao desktop. ✅

### Video Manifesto
- Presente como componente `VideoManifesto` na ordem correta da homepage.
- Sem evidências de violação de motion identificadas na análise estática.

### Portfolio Showcase / Featured Projects
- `FeaturedProjectsRealtime.tsx` conectado ao Supabase Realtime. ✅
- `FeaturedProjectCard.tsx` usa IntersectionObserver, timer de rotação de background, `useMotionGate()`. ✅
- Sem violações de motion identificadas nos arquivos lidos.

### About Origin / Method / What I Do
- Oito seções completas presentes em `src/components/sobre/sections/`.
- `ManifestoScrollSection.tsx` presente. `StickyContactCTA.tsx` presente.

### Portfolio Grid / Project Detail
- `PortfolioClient.tsx` separado para interatividade no cliente. ✅
- Templates `master-v2` e `alpa` usam `std-grid` corretamente.
- `ProjectTemplateMasterRenderer.tsx` usa `std-grid` em 4 pontos confirmados.

### Admin
- Estrutura de route groups correta. Server Actions com `revalidatePath` em landing-pages e mídia. ✅
- `force-dynamic` em config page. Supabase e Firebase integrados.

### Contact Form
- Cloudflare Turnstile carregado lazily via IntersectionObserver. ✅
- Submit via `/api/contact` (interno). CSP permite `formsubmit.co` que pode ser desnecessário.

### Global CSS / Design System
- **Problema:** Z-index CSS vars duplicadas em `@theme {}` (linhas 61-79) e `:root {}` (linhas 116-135). Risco de conflito de precedência em Tailwind v4.
- **Problema:** `--font-family-outfit` marcado como `@deprecated` ainda presente.
- **Violação Ghost DS:** `.touch-feedback:active { transform: scale(0.97); }` (linha 483) — scale proibido.
- **Violação Ghost DS:** `@keyframes marquee { to { transform: translate3d(-50%, 0, 0); } }` — translateX efetivo, proibido pela regra de motion.

---

## 3️⃣ Lista de Problemas e Backlog Priorizado

### 🔴 P0 Crítico

**ID:** P0-01
**Severidade:** 🔴 P0 Crítico — Segurança
**Área:** Configuração Next.js / Segurança de Imagens
**Evidência:** `next.config.mjs:299` — `dangerouslyAllowSVG: true` sem Content Security Policy de sandbox para o Image Optimizer. A propriedade `contentSecurityPolicy` que deveria acompanhar `dangerouslyAllowSVG` foi comentada com nota "Movido para headers globais", mas os headers globais não fornecem sandbox isolada para SVGs processados pelo `/next/image/`.
**Impacto:** SVGs maliciosos armazenados no Supabase Storage e servidos via `next/image` podem executar JavaScript no contexto de `portfoliodanilo.com` (vetor de XSS via asset upload).
**Arquivos relacionados:** `next.config.mjs:299-300`
**Risco de não corrigir:** Se um asset SVG comprometido for enviado ao Supabase Storage e servido via `next/image`, pode executar scripts no contexto da origem do site.
**Critério de aceite futuro:** Reativar `contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"` em `images.contentSecurityPolicy`, ou implementar validação de conteúdo SVG antes do upload no Admin.

---

### 🟡 P1 Estrutural

**ID:** P1-01
**Severidade:** 🟡 P1 Estrutural — Qualidade e Débito Técnico
**Área:** Build / TypeScript
**Evidência:** `next.config.mjs:303-305` — `typescript: { ignoreBuildErrors: true }` ativo.
**Impacto:** Erros de tipo são silenciados no build de produção. Regressões de tipo nunca bloqueiam deploy, mascarando potenciais bugs em runtime.
**Arquivos relacionados:** `next.config.mjs:303`
**Risco de não corrigir:** Deploy de código com erros de tipo sem visibilidade. Acúmulo de débito técnico crescente.
**Critério de aceite futuro:** Remover `ignoreBuildErrors: true`. Corrigir todos os erros de tipo até `pnpm typecheck` passar limpo. Configurar CI para falhar em erros de tipo.

---

**ID:** P1-02
**Severidade:** 🟡 P1 Estrutural — Ghost Design System
**Área:** Motion — Regra de scale proibido
**Evidência:**
- `src/lib/motion/hero.ts:73,78` — `ctaVariants.hidden.scale: 0.97` → `ctaVariants.visible.scale: 1`
- `src/app/globals.css:483` — `.touch-feedback:active { transform: scale(0.97); }`
**Impacto:** Viola a regra imutável do Ghost DS: "Motion proibido: `scale`, `rotate`, `bounce`." Estabelece padrão de exceções não documentadas que pode propagar-se.
**Arquivos relacionados:** `src/lib/motion/hero.ts:73,78`, `src/app/globals.css:483`
**Risco de não corrigir:** Erosão progressiva da disciplina de motion do Ghost DS.
**Critério de aceite futuro:** Substituir `scale: 0.97 → 1` por `filter: blur(4px) → blur(0px)` no hero. `.touch-feedback:active` usar `opacity: 0.85` ao invés de `scale`.

---

**ID:** P1-03
**Severidade:** 🟡 P1 Estrutural — Governança de Documentação
**Área:** Regras de Agente / PostCSS / Tailwind
**Evidência:**
- `.claude/rules/README-POSTCSS.md` diz "Tailwind CSS v4 detectado - Requer downgrade para v3.4.x" (status: ATIVO)
- `.claude/rules/postcss-tailwind-config.md` diz "❌ NUNCA USE `@tailwindcss/postcss`"
- Implementação real: `package.json` tem `tailwindcss: 4.3.1`, `postcss.config.cjs` usa `@tailwindcss/postcss`, `globals.css` usa `@import 'tailwindcss'` (sintaxe v4)
- `CLAUDE.md` tech stack especifica "Tailwind CSS | 4" como stack oficial
**Impacto:** Agentes lendo `.claude/rules/` entrarão em conflito com o estado real. Um agente seguindo as regras poderia fazer downgrade para v3.4.x e quebrar o projeto.
**Arquivos relacionados:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`
**Risco de não corrigir:** Confusão operacional severa. Risco de regressão se agente executar o downgrade proposto pelas regras.
**Critério de aceite futuro:** Atualizar ambos os arquivos de regras para refletir Tailwind CSS v4 como stack oficial aprovado.

---

**ID:** P1-04
**Severidade:** 🟡 P1 Estrutural — CSS Architecture
**Área:** globals.css / Z-index Governance
**Evidência:** `globals.css` define as mesmas 16 variáveis `--z-layer-*` duas vezes: em `@theme {}` (linhas 61-79) e em `:root {}` (linhas 116-135). Em Tailwind v4, `@theme {}` é o bloco canônico para tokens; a duplicata em `:root {}` cria redundância e risco de inconsistência futura.
**Impacto:** Manutenção mais difícil — alterações precisam ser feitas em dois lugares. Risco de inconsistência silenciosa.
**Arquivos relacionados:** `src/app/globals.css:61-79`, `src/app/globals.css:116-135`
**Risco de não corrigir:** Ao atualizar um z-index layer, o engenheiro pode atualizar apenas um bloco, criando divergência.
**Critério de aceite futuro:** Remover duplicatas em `:root {}`. Manter apenas o bloco `@theme {}`. Build deve passar sem regressões.

---

**ID:** P1-05
**Severidade:** 🟡 P1 Estrutural — Operacional
**Área:** CI / E2E Tests / Typecheck
**Evidência:** `pnpm typecheck` falhou neste ambiente com erro `pnpm install` → Playwright Chromium download bloqueado (HTTP 403 em `cdn.playwright.dev`).
**Impacto:** Suite de testes E2E não executável em ambiente remoto. Validação visual autônoma bloqueada. Pipeline de typecheck dependente de install falha.
**Arquivos relacionados:** `package.json:scripts.test`
**Risco de não corrigir:** Auditoria semanal não pode executar validação comportamental. Regressões visuais passam despercebidas.
**Critério de aceite futuro:** Separar script `typecheck` de `install`. Configurar Playwright para skip de download em ambientes de auditoria (`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`).

---

### 🟢 P2 Polimento Rápido

**ID:** P2-01
**Severidade:** 🟢 P2 Polimento
**Área:** globals.css — Typography
**Evidência:** `globals.css:53-54` — `--font-family-outfit: 'Outfit', sans-serif;` com comentário `@deprecated — Outfit not used in production; scheduled for removal`.
**Impacto:** Baixo. Variável não utilizada gera ruído.
**Critério de aceite futuro:** Confirmar via grep e remover as 2 linhas.

---

**ID:** P2-02
**Severidade:** 🟢 P2 Polimento
**Área:** Motion / Marquee Animation
**Evidência:** `globals.css:643-646` — `@keyframes marquee { to { transform: translate3d(-50%, 0, 0); } }`. `translate3d(-50%, 0, 0)` é funcionalmente `translateX(-50%)`, listado como proibido pelo Ghost DS.
**Impacto:** Baixo — o marquee tem justificativa funcional (não é decorativo puro). Ausência de exceção documentada gera questionamento em auditorias.
**Critério de aceite futuro:** Documentar exceção explícita para marquee na SSOT, ou migrar para alternativa CSS sem translateX.

---

**ID:** P2-03
**Severidade:** 🟢 P2 Polimento
**Área:** CSP / Segurança
**Evidência:** `next.config.mjs:91` — `form-action` permite `formsubmit.co`. ContactForm submete para `/api/contact` (interno).
**Impacto:** CSP desnecessariamente permissivo.
**Critério de aceite futuro:** Verificar uso e remover `formsubmit.co` da diretiva `form-action` se não utilizado.

---

**ID:** P2-04
**Severidade:** 🟢 P2 Polimento
**Área:** Documentação / CLAUDE.md
**Evidência:** `CLAUDE.md` tech stack informa "Next.js | 16.2.2" mas `package.json` mostra `"next": "16.2.9"`.
**Critério de aceite futuro:** Atualizar CLAUDE.md com versão correta.

---

**ID:** P2-05
**Severidade:** 🟢 P2 Polimento
**Área:** CSP / Google Fonts
**Evidência:** CSP permite `fonts.googleapis.com` e `fonts.gstatic.com`. Fontes Manrope e PPSupplyMono parecem auto-hospedadas em `public/fonts/` com `src/styles/fonts.css`.
**Critério de aceite futuro:** Verificar `src/styles/fonts.css`. Se self-hosted, remover entradas Google Fonts do CSP.

---

## 4️⃣ Prompts Técnicos para Agentes Atômicos

### 🛠️ Prompt #01 — Restaurar contentSecurityPolicy no Image Optimizer (P0-01)

**Objetivo:** Eliminar risco de XSS via SVG no Image Optimizer do Next.js.
**Especialista:** `security-architect`, `@ghost_architect`
**Arquivos:** `next.config.mjs`
**Contexto obrigatório:** `.claude/rules/security.md`, `.context/GHOST-DESIGN-SYSTEM.md`
**Ações:**
1. Em `next.config.mjs`, dentro do bloco `images: {}`, adicionar `contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"` ao lado de `dangerouslyAllowSVG: true`.
2. Verificar que headers globais não conflitam com este sandbox.
3. Testar que imagens JPEG/WebP/PNG do Supabase continuam carregando.
**Regras:** Não alterar nenhum outro header. Não remover `dangerouslyAllowSVG: true`. Apenas adicionar a propriedade ausente.
**Critérios de Aceite:** `next.config.mjs` tem `contentSecurityPolicy` em `images`. Build passa. Imagens continuam carregando.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #02 — Remover scale de ctaVariants no Hero (P1-02a)

**Objetivo:** Alinhar `ctaVariants` com Ghost DS (scale proibido).
**Especialista:** `@motion_choreographer`, `motion`
**Arquivos:** `src/lib/motion/hero.ts`
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md` §2.0, `.context/DOCS-PORTFOLIO-PAGES/01-HOME/02-HERO-HOME/`
**Ações:**
1. Em `ctaVariants.hidden`: remover `scale: 0.97`. Adicionar `filter: 'blur(4px)'`.
2. Em `ctaVariants.visible`: remover `scale: 1`. Adicionar `filter: 'blur(0px)'`.
3. Verificar que nenhum componente depende de `scale` em `ctaVariants` para posicionamento.
**Regras:** Usar apenas `opacity`, `blur`, `translateY` (máx 18px). Ghost Ease obrigatório.
**Critérios de Aceite:** `grep -n "scale" src/lib/motion/hero.ts` retorna zero resultados. CTA continua animando com entrada suave.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #03 — Substituir scale por opacity em .touch-feedback (P1-02b)

**Objetivo:** Alinhar `.touch-feedback:active` com Ghost DS.
**Especialista:** `@motion_choreographer`, `frontend-specialist`
**Arquivos:** `src/app/globals.css`
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md`, `.claude/rules/23-design-system.md`
**Ações:**
1. Localizar `.touch-feedback:active` em `globals.css` (~linha 479).
2. Substituir `transform: scale(0.97);` por `opacity: 0.82;`.
3. Remover `transform` da lista de propriedades em `transition:` se não for mais necessário.
**Regras:** Scale proibido. Feedback tátil deve usar opacidade.
**Critérios de Aceite:** `.touch-feedback:active` sem `scale`. Feedback visual mantido em dispositivos touch.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #04 — Atualizar rule docs de PostCSS para Tailwind v4 (P1-03)

**Objetivo:** Eliminar conflito de documentação antes que agente futuro faça downgrade acidental.
**Especialista:** `doc-specialist`
**Arquivos:** `.claude/rules/README-POSTCSS.md`, `.claude/rules/postcss-tailwind-config.md`
**Contexto obrigatório:** `CLAUDE.md` (seção Tech Stack), `package.json:dependencies.tailwindcss`, `postcss.config.cjs`
**Ações:**
1. Em `.claude/rules/README-POSTCSS.md`: substituir conteúdo que menciona "downgrade para v3.4.x" por declaração de que o projeto usa Tailwind CSS v4.3.1 com `@tailwindcss/postcss`. Atualizar exemplos de "Configuração Correta" para v4.
2. Em `.claude/rules/postcss-tailwind-config.md`: atualizar seção "NUNCA USE" e "Versões Aprovadas" para refletir que Tailwind v4 + `@tailwindcss/postcss` é a configuração oficial e aprovada.
3. Não alterar `postcss.config.cjs`, `globals.css`, ou `package.json`.
**Regras:** Apenas documentação. Zero alteração de código.
**Critérios de Aceite:** Ambos os arquivos `.claude/rules/` descrevem Tailwind v4 como stack oficial.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #05 — Eliminar duplicação de z-index em globals.css (P1-04)

**Objetivo:** Corrigir duplicação de variáveis CSS de z-index.
**Especialista:** `frontend-specialist`, `@audit_sentinel`
**Arquivos:** `src/app/globals.css`
**Contexto obrigatório:** `.context/GHOST-DESIGN-SYSTEM.md` §1.3
**Ações:**
1. Identificar as 16 variáveis `--z-layer-*` em `@theme {}` (linhas ~61-79) como fonte de verdade.
2. Remover APENAS as duplicatas em `:root {}` (linhas ~116-135).
3. Verificar via grep que `var(--z-layer-*)` continua funcionando após remoção.
**Regras:** Não alterar valores. Manter o bloco `@theme {}` intacto.
**Critérios de Aceite:** `--z-layer-*` definido apenas uma vez em `globals.css`. Build passa. Hierarquia visual não muda.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #06 — Remover variável @deprecated Outfit (P2-01)

**Objetivo:** Limpeza de token CSS depreciado.
**Especialista:** `frontend-specialist`
**Arquivos:** `src/app/globals.css`
**Ações:**
1. Verificar com `grep -rn "font-family-outfit\|font-outfit" src/` que a variável não é usada.
2. Se zero resultados: remover linhas 53-54 de `globals.css`.
**Regras:** Apenas se confirmado que não é usado. Zero alterações em outros arquivos.
**Critérios de Aceite:** `grep -rn "outfit" src/` retorna zero resultados (exceto comentários).
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #07 — Auditar e remover formsubmit.co do CSP (P2-03)

**Objetivo:** Reduzir superfície de ataque do CSP.
**Especialista:** `security-architect`
**Arquivos:** `next.config.mjs`, `src/components/home/contact/ContactForm.tsx`
**Ações:**
1. Verificar `ContactForm.tsx` e Server Actions de contato para confirmar que não usam `formsubmit.co`.
2. Se confirmado não utilizado: remover `'https://formsubmit.co'` da diretiva `form-action` em `next.config.mjs:91`.
**Regras:** Apenas se confirmado que o serviço não é mais usado.
**Critérios de Aceite:** `formsubmit.co` removido do CSP. Formulário de contato continua via `/api/contact`.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

### 🛠️ Prompt #08 — Atualizar versão do Next.js no CLAUDE.md (P2-04)

**Objetivo:** Sincronizar documentação de versão.
**Especialista:** `doc-specialist`
**Arquivos:** `CLAUDE.md`
**Ações:**
1. Localizar tabela de Tech Stack em `CLAUDE.md`.
2. Atualizar campo Next.js de "16.2.2" para "16.2.9".
**Regras:** Apenas este campo.
**Critérios de Aceite:** `CLAUDE.md` mostra versão correta alinhada com `package.json`.
**Approval Gate:** Não executar sem aprovação humana explícita.

---

## 5️⃣ Validação Técnica Executada

| Comando | Resultado | Observação |
|---|---|---|
| `git log --oneline -5` | ✅ | HEAD: `14869153 update`. Último audit: PR #493 (2026-06-09) |
| `git status --short` | ✅ | Working tree clean antes do relatório |
| `git branch --show-current` | ✅ | Branch: `claude/beautiful-rubin-8duvkb` |
| `cat postcss.config.cjs` | ✅ Lido | Usa `@tailwindcss/postcss` (v4 correto) |
| `cat src/app/globals.css` | ✅ Lido | 742 linhas. Tokens Ghost DS corretos. Duplicação z-index identificada |
| `cat tailwind.config.ts` | ✅ Lido | Config mínima v4. Tokens via CSS vars |
| `cat next.config.mjs` | ✅ Lido | CSP rigorosa. `dangerouslyAllowSVG` sem sandbox. `ignoreBuildErrors: true` |
| `grep scale src/lib/motion/hero.ts` | ✅ | Scale em ctaVariants (linhas 73, 78) — violação |
| `grep scale src/app/globals.css` | ✅ | Scale em .touch-feedback:active (linha 483) — violação |
| `grep aria-hidden src/components/canvas/` | ✅ OK | Ambos canvas components têm `aria-hidden="true"` |
| `grep std-grid src/` | ✅ | 44 instâncias — conformidade ampla |
| `grep revalidate src/app/` | ✅ | ISR configurado corretamente por rota |
| `echo $SLACK_WEEKLY_AUDIT_WEBHOOK_URL` | ✅ Disponível | Variável presente no ambiente |
| `pnpm typecheck` | ❌ Falhou | Playwright download bloqueado (403). TypeScript check não pôde ser executado via este comando |
| `npx tsc --noEmit` | ⚠️ Silencioso | Executou sem output de erro — inferido como sucesso, mas não confirmado |
| `pnpm lint` | ❌ Não executado | Dependeria de install que falhou |
| Build completo | ❌ Não executado | Ambiente de auditoria (read-only) |

---

## 6️⃣ Evidências

### Scale em Motion (P1-02)
```typescript
// src/lib/motion/hero.ts:67-85
export const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    scale: 0.97,           // VIOLAÇÃO Ghost DS
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,              // VIOLAÇÃO Ghost DS
    transition: { duration: MOTION_TOKENS.duration.normal, ease: GHOST_EASE, delay: 1.0 },
  },
};
```

```css
/* src/app/globals.css:476-485 */
.touch-feedback:active {
  transform: scale(0.97);  /* VIOLAÇÃO Ghost DS */
  opacity: 0.9;
}
```

### SVG Security Gap (P0-01)
```javascript
// next.config.mjs:296-300
images: {
  dangerouslyAllowSVG: true,
  // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // COMENTADO — gap de segurança
}
```

### TypeScript Suppression (P1-01)
```javascript
// next.config.mjs:302-305
typescript: {
  ignoreBuildErrors: true, // Silencia erros de tipo em produção
},
```

### Z-index Duplication (P1-04)
```css
/* globals.css:61 — bloco @theme (canônico em v4) */
@theme {
  --z-layer-base: 0;
  --z-layer-preloader: 1000;
  /* ... 14 outros layers ... */
}

/* globals.css:116 — :root (DUPLICADO — mesmo valor, segunda definição) */
:root {
  --z-layer-base: 0;
  --z-layer-preloader: 1000;
  /* ... as mesmas 14 variáveis ... */
}
```

### Rule Doc Contradiction (P1-03)
```
.claude/rules/postcss-tailwind-config.md:
  "❌ NUNCA USE: module.exports = { plugins: { '@tailwindcss/postcss': {} } }"

postcss.config.cjs (implementação real):
  module.exports = { plugins: { '@tailwindcss/postcss': {} } }
```

### Arquitetura Correta: WebGL Gating (confirmado OK)
```typescript
// src/components/canvas/home/hero/GhostSceneWrapper.tsx
<div className="absolute inset-0 w-full h-full" aria-hidden="true">
  <GhostScene onReady={onReady} /> // dynamic import, ssr: false
</div>
```

### Ghost Design System Tokens: Conformes (confirmado OK)
```css
--color-bluePrimary: #0048ff;
--color-background: #040013;
--ease-ghost: cubic-bezier(0.22, 1, 0.36, 1);
```

---

## 7️⃣ Riscos Operacionais

### Segurança da Rotina
- **Secrets:** Nenhuma chave API ou credencial exposta neste relatório. `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` existe no ambiente mas não foi registrada em texto.
- **Escopo de escrita:** Apenas `WEEKLY_AUDIT_REPORT.md` criado. Verificado via `git status` antes do commit.
- **Comandos destrutivos:** Nenhum executado. Apenas leitura, grep e log de git.

### Firebase Hosting
- `firebase.json` configura `frameworksBackend: { region: "us-central1", memory: "2GiB" }`. A flag `FIREBASE_CLI_EXPERIMENTS: webframeworks` deve estar ativa no CI/CD (documentada em `.claude/rules/ci-cd.md`). Node.js 22 em `functions` alinhado com `package.json:engines:node:22`. ✅

### Supabase Storage
- URL do projeto Supabase está em `.env.example` — esperado para URL pública. Reforça necessidade de RLS rigoroso nas tabelas.
- `dangerouslyAllowSVG: true` (P0-01) é o único risco ativo relacionado ao Supabase Storage identificado.

### WebGL / Performance
- Sem acesso a browser neste ambiente, métricas FPS e Core Web Vitals não foram medidas.
- Análise estática: `GhostSceneWrapper` tem `aria-hidden`, dynamic import com `ssr:false`, e kill-switch `NEXT_PUBLIC_DISABLE_3D`. Implementação correta.

### Testes e CI
- Playwright bloqueado em downloads (403 no CDN) neste ambiente. E2E tests não executáveis.
- `pnpm typecheck` falhou por dependência do install. `npx tsc --noEmit` executou silenciosamente (sem output de erro).

---

## 8️⃣ Slack Approval Request

**Status:** Notificação enviada via `SLACK_WEEKLY_AUDIT_WEBHOOK_URL` (URL presente no ambiente, não exposta neste relatório).

**Conteúdo enviado ao Slack:**
```
Projeto: portfoliodanilo.com
Data: 2026-06-23
P0 Crítico: 1 | P1 Estrutural: 5 | P2 Polimento: 5

Top 3 Riscos:
1. P0-01: dangerouslyAllowSVG sem contentSecurityPolicy sandbox (XSS via SVG upload)
2. P1-01: typescript.ignoreBuildErrors ativo — erros de tipo silenciados em produção
3. P1-03: Rule docs de PostCSS contradizem implementação real (risco de downgrade acidental)

Nenhum arquivo de código foi alterado.
Responder "Aprovado" ou "Proceed" para autorizar rotina separada de correção.
```

---

## 9️⃣ Próximo Passo Recomendado

**Recomendação:** Aprovar execução imediata do Prompt #01 (P0-01 — SVG Security) e do Prompt #04 (P1-03 — Atualização da documentação de regras PostCSS). São as correções de maior impacto de risco com menor superfície de alteração.

Os itens P1-01 (TypeScript ignoreBuildErrors) e P1-02 (scale em motion) requerem sessão dedicada com validação visual antes do commit.

Os P2 podem ser agrupados em uma única PR de housekeeping.

**Ordem de prioridade para próxima sessão:**
1. P0-01: 1 linha adicionada em `next.config.mjs`. Alto impacto de segurança, baixo risco de regressão.
2. P1-03: Atualizar dois arquivos de documentação. Zero risco técnico.
3. P1-02: Motion fixes (requer validação visual em browser).
4. P1-04: Remover duplicatas de z-index (alto valor de manutenção, baixo risco).
5. P2-01 a P2-05: Housekeeping consolidado em única PR.
