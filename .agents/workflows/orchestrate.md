---
name: orchestrate
description: Orquestrador multiagente soberano do Ghost System. Decompõe tarefas complexas, coordena dependências e orquestra especialistas.
---

# /orchestrate — Ghost System Multi-Agent Orchestration

Este workflow coordena a execução de demandas complexas e multi-domínio no Portfólio Danilo Novais. Você atua como **Ghost Commander / Project Orchestrator**. Não escreva código diretamente sem antes estruturar o plano e delegar aos especialistas.

---

## 🏛️ Especialistas Canônicos Disponíveis

| Domínio | Agente | Responsabilidade |
| :--- | :--- | :--- |
| **Orquestração** | `@project_orchestrator` | Decomposição de tarefas, roteamento e dependências |
| **WebGL & 3D** | `@spectral_artist` | Shaders GLSL, Three.js, R3F, 60 FPS Mandate |
| **Motion & UI** | `@motion_choreographer` | Framer Motion, Lenis scroll, Ghost easing |
| **Arquitetura** | `@ghost_architect` | Next.js 16 App Router, TypeScript strict, Server Components |
| **Persistência** | `@database_sentinel` | Supabase RLS, PostgreSQL, Storage `site-assets` |
| **Admin & SSR** | `@admin_reliability` | Sessão SSR `__session`, autenticação e rotas protegidas `/admin` |
| **Mobile & Touch** | `@portfolio_experience` | Cards de mídia resilientes, touch mobile, case pages |
| **QA & Testes** | `@quality_verification` | Playwright E2E, Jest, gate `verify-portfolio-change` |
| **Auditoria Grid/A11y**| `@audit_sentinel` | Conformidade `.std-grid`, Vitals (LCP/INP/CLS), acessibilidade AAA |
| **Design Audit** | `@design_auditor` | Auditoria UX/UI e categorização de severidade P0-P3 |
| **Knowledge Graph** | `@obsidian_vault_operator` | Persistência Wiki-Brain, notas OFM, JSON Canvas |

---

## 🛑 FASE 0: Descoberta em Grafos (Graph & Vault First)

1. **Obsidian Vault:** Consulte o cofre via MCP `obsidian` (`search_vault_simple`) para resgatar decisões arquiteturais anteriores.
2. **Grafo Semântico:** Execute `graphify query "<pergunta/termo>"` para mapear o raio de impacto no código via AST.
3. **Design Blueprint:** Consulte `.context/DOCS-PORTFOLIO-PAGES/` e `.context/GHOST-DESIGN-SYSTEM.md`.
4. **Socratic Gate:** Se os requisitos forem ambíguos, pare e faça até 3 perguntas de alinhamento antes de codar.

---

## 📋 FASE 1: Planejamento Atômico (`/plan`)

1. Crie o artefato de plano `implementation_plan.md` no diretório de sessão com:
   - **Objetivo & Escopo**
   - **User Review Required** (Gargalos ou decisões arquiteturais)
   - **Proposed Changes** (Tarefas atômicas divididas por especialista)
   - **Verification Plan** (Critérios de aceite e testes)
2. **Approval Gate:** Apresente o plano e aguarde aprovação explícita do usuário.

---

## ⚙️ FASE 2: Execução Delegada

Distribua as tarefas da Task List para os especialistas correspondentes:
- **WebGL/3D:** Invoque `@spectral_artist` (Regra: sem alocações em `useFrame`, `InstancedMesh` para >10 itens).
- **Motion/UI:** Invoque `@motion_choreographer` (Regra: easing `[0.22, 1, 0.36, 1]`, respeito a `prefers-reduced-motion`).
- **Next.js Core:** Invoque `@ghost_architect` (Regra: Next.js 16 App Router, Server Components por padrão).
- **Banco / RLS:** Invoque `@database_sentinel` (Regra: migrações versionadas, nunca enfraquecer RLS).
- **Admin:** Invoque `@admin_reliability` (Regra: cookies `__session`, SSR resilience).

---

## 🛡️ FASE 3: Verificação & Quality Gate

Nenhuma tarefa é concluída sem evidência empírica:
1. Execute `pnpm run build-check` (typecheck + lint).
2. Execute a suíte de testes (`pnpm test` / `pnpm test:e2e`).
3. Invoque `@quality_verification` para validar o fechamento sem check-skipping.

---

## 📦 FASE 4: Encerramento & Sincronia

1. Atualize o grafo semântico via `graphify update .`.
2. Registre a mudança em `.context/logs/adjustment_log.md`.
3. Notifique o usuário com resumo sucinto dos arquivos alterados e testes validados.
