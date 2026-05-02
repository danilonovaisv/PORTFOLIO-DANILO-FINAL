# Task Breakdown — Auditoria Multipágina Portfólio Danilo

**Projeto:** `danilo-novais-portfolio`  
**Data:** 2026-05-02  
**Status:** Aprovado para execução  

---

## Task List (Pré-Findings)

Conforme exigido pelo protocolo PREVC, esta task list foi criada **antes** de qualquer finding diagnóstico.

**"A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items."**

---

## Phase 0: Context & Planning

| ID | Task | Descrição | Owner | Status |
|----|------|-----------|-------|--------|
| TASK-001 | Ativar `/plan` | Consultar AGENTS.md, .antigravity/rules.md, blueprints | ghost_architect | ✅ Done |
| TASK-002 | Analisar estrutura de rotas | Mapear `/`, `/sobre`, `/portfolio` + componentes | audit_sentinel | ✅ Done |
| TASK-003 | Identificar skills | Listar especialistas e workflows necessários | orchestrator | ✅ Done |
| TASK-004 | Modelar pipeline | Intake → MCP Context → Orchestration → Execution → Verification | orchestrator | ✅ Done |
| TASK-005 | Ativar Context7 MCP | Definir onde será usado e limitações | all_agents | ✅ Done |

---

## Phase 1: Auditoria Home (`/`)

| ID | Task | Seção | Foco | Prioridade |
|----|------|-------|------|------------|
| TASK-010 | Auditar Header | 01-HEADER | Semântica, navegação, ARIA | P1 |
| TASK-011 | Auditar Hero | 02-HERO-HOME | Heading H1, WebGL, reduced motion | P0 |
| TASK-012 | Auditar Video Manifesto | 03-VIDEO-MANIFESTO | Aspect ratio, captions, autoplay | P2 |
| TASK-013 | Auditar Portfolio Showcase | 04-PORTFOLIO-SHOWCASE | Grid, cards, links | P1 |
| TASK-014 | Auditar Featured Projects | 05-FEATURED-PROJECTS | Bento grid, alt text, contraste | P2 |
| TASK-015 | Auditar Clients Brands | 06-CLIENTS-BRANDS | Logos, lazy loading | P2 |
| TASK-016 | Auditar Contact | 07-CONTACT | Formulário, validação, error states | P1 |
| TASK-017 | Auditar Footer | 08-FOOTER | Links, copyright, sitemap | P2 |

---

## Phase 2: Auditoria Sobre (`/sobre`)

| ID | Task | Seção | Foco | Prioridade |
|----|------|-------|------|------------|
| TASK-020 | Auditar Header | 01-HEADER | Consistência com Home | P1 |
| TASK-021 | Auditar Hero | 02-HERO-SOBRE | H1 único, manifesto copy | P0 | ✅ Done |
| TASK-022 | Auditar Origem Criativa | 03-ORIGEM-CRIATIVA | Typography, spacing | P2 | ✅ Done |
| TASK-023 | Auditar O Que Eu Faço | 04-O-QUE-EU-FACO | Cards, shadows, tokens | P1 | ✅ Done |
| TASK-024 | Auditar Como Eu Trabalho | 05-COMO-EU-TRABALHO | Grid, icons, motion | P2 | ✅ Done |
| TASK-025 | Auditar O Que Me Move | 06-O-QUE-ME-MOVE | Z-index, scroll trigger, Canvas | P1 |
| TASK-026 | Auditar Fechamento | 07-FECHAMENTO-CONFIRMACAO | CTA, hierarquia | P2 | ✅ Done |
| TASK-027 | Auditar Clients/Contact/Footer | 08-10 | Consistência global | P2 |

---

## Phase 3: Auditoria Portfólio (`/portfolio`)

| ID | Task | Seção | Foco | Prioridade |
|----|------|-------|------|------------|
| TASK-030 | Auditar Header | 01-HEADER | Consistência | P1 |
| TASK-031 | Auditar Hero | 02-HERO | H1, filtros, overlay | P0 |
| TASK-032 | Auditar Gallery | 03-GALLERY | Pagination, LERP, performance | P1 |
| TASK-033 | Auditar Project Cards | 04-PROJECT-CARDS | Roteamento, destino (modal/landing) | P1 |
| TASK-034 | Auditar Modal | 05-MODAL | A11y, foco, trap, escape | P1 |
| TASK-035 | Auditar Projeto Slug | 06-PROJETO-SLUG | SEO, conteúdo, H1/H2 | P0 |
| TASK-036 | Auditar Clients/Contact/Footer | 07-09 | Consistência | P2 |

---

## Phase 4: Auditoria Transversal

| ID | Task | Eixo | Escopo | Prioridade |
|----|------|------|------|------------|
| TASK-040 | Auditar JSON-LD | SEO | Organization logo shape | P0 | ✅ Done |
| TASK-041 | Auditar Metadata | SEO | Títulos únicos, templates | P0 | ✅ Done |
| TASK-042 | Auditar Reduced Motion | A11y/Motion | Hook centralizado, respeitado | P1 | ✅ Conforme |
| TASK-043 | Auditar Easing Tokens | Motion | Drift em ~20 arquivos | P1 | ✅ Conforme |
| TASK-044 | Auditar Component Size | Arquitetura | Componentes >500 linhas | P1 | ✅ Done (slug/page: 522→422L) |
| TASK-045 | Auditar Cores Hard-coded | Design System | Hover states, tokens | P1 | ✅ Done (FormFields) |
| TASK-046 | Auditar Loading States | UX | Supabase, R3F, async flows | P1 | ✅ Done (portfolio+slug) |
| TASK-047 | Auditar 3D Assets | Performance | Versionamento, compressão | P2 |

---

## Phase 5: Geração de Artefatos

| ID | Task | Artefato | Status |
|----|------|----------|--------|
| TASK-050 | Gerar implementation_plan.md | Plano de execução | ✅ Done |
| TASK-051 | Gerar task.md | Este documento | ✅ Done |
| TASK-052 | Gerar risk_assessment.md | Matriz de riscos | ⏳ Pending |
| TASK-053 | Gerar orchestrated_fix_prompt.md | Prompt para agents | ⏳ Pending |
| TASK-054 | Gerar audit_consolidated_report.md | Relatório consolidado | ⏳ Pending |

---

## Phase 6: Validation Checklist

| ID | Checkpoint | Critério | Tool |
|----|------------|----------|------|
| TASK-060 | Heading hierarchy | 1x H1 por página, ordem lógica | axe-core |
| TASK-061 | Metadata completeness | Title, description, OG tags | Next.js devtools |
| TASK-062 | JSON-LD validity | Schema.org valid | Rich Results Test |
| TASK-063 | Focus states | Visível, coerente | Manual + Playwright |
| TASK-064 | Contrast ratios | ≥4.5:1 (AA) | Stark, WAVE |
| TASK-065 | Reduced motion | Respeita preferência | DevTools emulation |
| TASK-066 | Loading states | Skeletons em async flows | Manual UX |
| TASK-067 | Error states | Boundaries, messages | Error simulation |
| TASK-068 | Mobile layout | Parity desktop/mobile | Device lab |
| TASK-069 | Performance | Lighthouse ≥96 | Lighthouse CI |
| TASK-070 | Bundle size | <500KB initial | webpack-bundle-analyzer |
| TASK-071 | Token compliance | 100% cores via tokens | Grep audit |
| TASK-072 | TypeScript strict | Zero errors | tsc --noEmit |
| TASK-073 | ESLint | Zero new warnings | eslint |
| TASK-074 | Build pass | Next.js build成功 | pnpm run build |
| TASK-075 | E2E tests | All pass | Playwright |

---

## Execution Order

1. **Phase 0** → Context loading (complete)
2. **Phase 1-3** → Auditorias por página (complete)
3. **Phase 4** → Auditoria transversal (complete)
4. **Phase 5** → Geração de artefatos (in progress)
5. **Approval Gate** → ⏸️ Aguardando aprovação humana
6. **Phase 6+** → Execução das correções (blocked)

---

## Skills Required

| Skill / Agente | Tasks |
|----------------|-------|
| `ghost_architect` | TASK-001, TASK-002, TASK-044, TASK-045 |
| `spectral_artist` | TASK-047, TASK-012, TASK-025 |
| `motion_choreographer` | TASK-042, TASK-043, TASK-025 |
| `audit_sentinel` | TASK-010-017, TASK-020-027, TASK-030-036 |
| `seo_specialist` | TASK-040, TASK-041, TASK-035 |
| `performance_engineer` | TASK-046, TASK-047, TASK-032 |
| `a11y_advocate` | TASK-060-065, TASK-034 |

---

## MCP Activation

| MCP | Uso | Tasks Dependentes |
|-----|-----|-------------------|
| Context7 (Next.js) | `generateMetadata`, App Router | TASK-041, TASK-035 |
| Context7 (Framer Motion) | `MotionConfig`, `reducedMotion` | TASK-042, TASK-043 |
| Context7 (R3F) | `Canvas`, `frameloop`, disposal | TASK-025, TASK-047 |
| Context7 (Supabase) | SSR auth, client | TASK-046 |
| Context7 (Tailwind) | Tokens Oxide | TASK-045 |

---

**Próximo passo:** Gerar `risk_assessment.md` e aguardar approval gate.
