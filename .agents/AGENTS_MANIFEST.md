# 🛡️ Ghost System — Catálogo de Agentes (Ghost Era Architecture v2.0)

> **Status:** Ativo e Consolidado  
> **Diretório:** `.agents/agents/`  
> **Governança:** `AGENTS.md` e `GEMINI.md`

---

## 🏛️ 1. Batalhão Canônico Ghost System v2.0 (11 Agentes)

| Handle / Agente | Arquivo | Responsabilidade Principal | Skills Primárias |
| :--- | :--- | :--- | :--- |
| **`@project_orchestrator`** | [`project-orchestrator.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/project-orchestrator.md) | Roteador primário read-first, classificação de domínio e orquestração de dependências | `verify-portfolio-change`, `orchestration` |
| **`@admin_reliability`** | [`admin-reliability-specialist.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/admin-reliability-specialist.md) | Autenticação, sessão SSR, CRUD, upload de mídia e rotas protegidas `/admin` | `diagnose-admin-flow`, `verify-portfolio-change` |
| **`@portfolio_experience`** | [`portfolio-experience-specialist.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/portfolio-experience-specialist.md) | Cards de mídia (vídeo/HTML/imagem), touch mobile, case pages `/projects/[slug]` e Taste Engineering | `review-project-media-card`, `review-project-case-page`, `clean-code`, `tailwind-patterns` |
| **`@database_sentinel`** | [`database-sentinel.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/database-sentinel.md) | Contratos de persistência, RLS no Supabase, Storage Policies (`site-assets`) e migrações reversíveis | `database-design`, `supabase-auth-storage-realtime-core` |
| **`@spectral_artist`** | [`spectral-artist.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/spectral-artist.md) | Shaders GLSL, Three.js/R3F, 60 FPS Mandate, InstancedMesh e atmosfera Ghost Blue | `ghost-r3f-optimization`, `threejs-shaders`, `3d-webgl-scene` |
| **`@quality_verification`** | [`quality-verification-specialist.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/quality-verification-specialist.md) | Gate independente de QA, Playwright E2E, Jest, verificação implacável contra check-skipping | `verify-portfolio-change`, `code-review-checklist`, `verification-before-completion` |
| **`@motion_choreographer`** | [`motion-choreographer.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/motion-choreographer.md) | Framer Motion, sincronização com Lenis smooth scroll e Ghost easing `[0.22, 1, 0.36, 1]` | `framer-motion`, `tailwind-motion-choreography`, `gsap-core` |
| **`@audit_sentinel`** | [`audit-sentinel.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/audit-sentinel.md) | Conformidade de layout `.std-grid`, Core Web Vitals (LCP/INP/CLS), acessibilidade AAA e z-indices | `audit-website`, `web-perf`, `a11y-debugging` |
| **`@ghost_architect`** | [`ghost-architect.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/ghost-architect.md) | Estrutura Next.js 16 App Router, TypeScript strict, separação de camadas DDD e boundaries | `ghost-architect`, `clean-code`, `writing-plans` |
| **`@devops-engineer`** | [`devops-engineer.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/devops-engineer.md) | Pipeline de deploy Firebase Hosting, Node.js 20, manifesto `.next` e SSR Guardrail | `deploy-manager`, `deployment-procedures`, `ghost-firebase-deploy` |
| **`@obsidian_vault_operator`** | [`obsidian-vault-operator.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/obsidian-vault-operator.md) | Gestão de Wiki-Brain, notas OFM, JSON Canvas e persistência do grafo de conhecimento | `wiki-brain`, `obsidian-claude-integration` |

---

## 🛠️ 2. Especialistas Auxiliares & Técnicos (7 Agentes)

| Handle / Agente | Arquivo | Finalidade |
| :--- | :--- | :--- |
| **`@multi_agent_orchestrator`** | [`multi_agent_orchestrator.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/multi_agent_orchestrator.md) | Orquestração paralela em swarm de agentes e tarefas simultâneas |
| **`@nextjs-architecture-expert`** | [`nextjs-architecture-expert.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/nextjs-architecture-expert.md) | Resolução de padrões complexos de Server Components e caching Turbopack |
| **`@typescript-pro`** | [`typescript-pro.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/typescript-pro.md) | Tipagem avançada, genéricos, type inference e contratos estritos |
| **`@mobile-developer`** | [`mobile-developer.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/mobile-developer.md) | Auditoria avançada de comportamento mobile, gestos touch e Safari iOS |
| **`@ui-ux-designer`** | [`ui-ux-designer.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/ui-ux-designer.md) | Revisão de hierarquia visual, microinterações e estética editorial |
| **`@mcp-expert`** | [`mcp-expert.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/mcp-expert.md) | Configuração, depuração e integração de servidores Model Context Protocol |
| **`@firecrawl-scraper`** | [`firecrawl-scraper.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/firecrawl-scraper.md) | Extração e scraping inteligente de conteúdo web via Firecrawl |

---

## 🎨 3. Pipeline de Auditoria & Validação de Design do Portfólio (4 Agentes)

| Handle / Agente | Arquivo | Finalidade | Skills Primárias |
| :--- | :--- | :--- | :--- |
| **`@portfolio_context_analyst`** | [`portfolio-context-analyst.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/portfolio-context-analyst.md) | Mapeia documentação, código-fonte, componentes e restrições antes de auditorias de design | `portfolio-design-audit` |
| **`@design_auditor`** | [`design-auditor.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/design-auditor.md) | Executa auditorias baseadas em evidências de UX/UI, motion, acessibilidade e Ghost System | `portfolio-design-audit`, `ui-ux-pro-max`, `design-auditor` |
| **`@implementation_planner`** | [`implementation-planner.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/implementation-planner.md) | Converte achados de auditoria aprovados em tarefas dependentes para agentes da IDE | `portfolio-design-audit`, `writing-plans` |
| **`@audit_validator`** | [`audit-validator.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents/audit-validator.md) | Valida implementações contra critérios de aceitação e riscos de regressão | `portfolio-design-audit`, `verify-portfolio-change` |

---

## 🗄️ 4. Arquivo Seguro de Histórico (`.agents/.archive/`)
Arquivos redundantes, dumps pesados de contexto (`AGENTS.json`, `CLAUDE.json`) e agentes de outros contextos foram preservados no diretório de arquivo seguro [`.agents/.archive/`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/.archive/), garantindo reversibilidade sem impactar a velocidade da IDE.
