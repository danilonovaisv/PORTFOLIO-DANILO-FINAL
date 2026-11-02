# Antigravity Kit Architecture — Ghost System

> Comprehensive AI Agent Capability & Governance Architecture  
> **Codename:** Ghost Era v2.0  
> **Saneamento e Otimização:** 02 de Novembro de 2026 (`/audit-agent-config`)

---

## 📋 Overview

O Antigravity Kit no Portfólio Danilo Novais é um sistema modular e de alta fidelidade composto por:

- **15 Agentes Canônicos** (+ 3 Especialistas Auxiliares)
- **Catálogo Canônico de Skills** indexado em [`.agents/knowledge_skills.json`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/knowledge_skills.json)
- **Workflows Padronizados** invocáveis via comandos `/command`
- **5 Regras Constitucionais de Alto Impacto** (com injeção leve de ~195 linhas, garantindo a integridade do token budget para [`AGENTS.md`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/AGENTS.md))

---

## 🏗️ Estrutura de Diretórios

```plaintext
.agents/
├── ARCHITECTURE.md          # Este arquivo de arquitetura
├── AGENTS_MANIFEST.md       # Catálogo detalhado dos 15 agentes canônicos
├── knowledge_skills.json    # Registro canônico de habilidades
├── permissions_policy.md    # Matriz RBAC e restrições de sandbox
├── mcp_config.json          # Configuração dos servidores MCP do workspace
├── data/                    # Persistência de estado e memória da sessão
│   └── memory.json
├── agents/                  # 18 Agentes especializados (.md)
├── skills/                  # Habilidades de engenharia, 3D e design
├── workflows/               # Procedimentos e comandos /slash
├── rules/                   # 18 Regras operacionais (5 constitutivas always_on)
├── plugins/                 # Plugins e extensões locais
└── .archive/                # Histórico e arquivos legados (seguro contra perdas)
```

---

## 🤖 Batalhão Canônico (15 Agentes)

| Handle | Agente | Domínio Primário |
| :--- | :--- | :--- |
| `@project_orchestrator` | `project-orchestrator.md` | Roteamento read-first, dependências e governança |
| `@spectral_artist` | `spectral-artist.md` | WebGL, R3F, Shaders GLSL, 60 FPS Mandate |
| `@motion_choreographer` | `motion-choreographer.md` | Framer Motion, Lenis scroll, Ghost microinteractions |
| `@ghost_architect` | `ghost-architect.md` | Next.js 16 App Router, TypeScript strict, DDD |
| `@database_sentinel` | `database-sentinel.md` | Supabase RLS, PostgreSQL, Storage `site-assets` |
| `@admin_reliability` | `admin-reliability-specialist.md` | Autenticação SSR, cookies `__session`, rotas `/admin` |
| `@portfolio_experience`| `portfolio-experience-specialist.md`| Cards de mídia (vídeo/HTML/imagem) e touch mobile |
| `@quality_verification`| `quality-verification-specialist.md`| QA gate, Jest, Playwright E2E, sem check-skipping |
| `@audit_sentinel` | `audit-sentinel.md` | Grid `.std-grid`, Vitals (LCP/INP/CLS), acessibilidade |
| `@devops-engineer` | `devops-engineer.md` | Pipeline Firebase Hosting, Node 20, SSR Guardrail |
| `@obsidian_vault_operator`| `obsidian-vault-operator.md` | Wiki-Brain, notas OFM, JSON Canvas |
| `@portfolio_context_analyst`| `portfolio-context-analyst.md` | Mapeamento pré-auditoria de rotas e componentes |
| `@design_auditor` | `design-auditor.md` | Auditoria UX/UI e classificação de achados P0-P3 |
| `@implementation_planner`| `implementation-planner.md` | Decomposição atômica pós-auditoria |
| `@audit_validator` | `audit-validator.md` | Validação pós-implementação de design |

---

## 🔄 Ciclo Operacional PDCA

1. **PLAN:** Formulação de spec e plano atômico via `writing-plans` e `@project_orchestrator`.
2. **DO:** Implementação isolada delegada aos agentes de domínio (`@ghost_architect`, `@spectral_artist`, etc.).
3. **CHECK:** Validação independente via `@quality_verification` e `verify-portfolio-change`.
4. **ACT:** Sincronia do grafo AST (`graphify update .`) e registro em `.context/logs/adjustment_log.md`.
