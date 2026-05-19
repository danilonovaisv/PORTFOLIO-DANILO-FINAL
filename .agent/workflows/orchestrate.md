---
description: Tarefa muito complexa? Acione um enxame de agentes especialistas para atuar de forma paralela e integrada.
---

# /orchestrate - Multi-Agent Command System

$ARGUMENTS

---

## 🔴 THE CONSTITUTION OF ORCHESTRATION
1. **Min 3 Agents**: Single-agent delegation is NOT orchestration.
2. **Context Passing**: Every subagent MUST receive the original intent + previous agent's results.
3. **Phase Separation**: Planning MUST happen before Parallel Execution.

---

## 🟢 PHASE 1: Strategic Planning (Sequential)
**Agent**: `project-planner`
- **Task**: Create `PLAN.md`.
- **Gate**: Stop and ask for User Approval. **DO NOT PROCEED** without a "YES".

## 🔵 PHASE 2: Agent-First Execution & Routing
**Agent**: `orchestrator`
- **Dashboard Hook**: Recomenda que o usuário ative um terminal secundário executando "npm start manager" (ou "node cli/index.js manager") para monitorar o Swarm em tempo real.
- **Execution Matrix**:
  - **Group 0 (Reconnaissance)**: `browser-subagent`. (Ativa cli/tools/browser.js para raspagem web/captura de tela se a Task precisar de dados em tempo real).
  - **Group A (Foundation)**: `database-architect`, `security-auditor` (Nhận context từ Group 0).
  - **Group B (Core)**: `backend-specialist`, `frontend-specialist`.
  - **Group C (Optimization)**: `performance-optimizer`, `seo-specialist`.

## 🔴 PHASE 3: Systemic Review & Self-Healing
**Agent**: `quality-inspector`
- **Task**: Verificar a coesão do código + Analisar arquivos de imagem (.agent/vision/*.png) fornecidos pelo Subagent.
- **Automation**: Run `security_scan.sh` and `lint_check.sh`.
- **Handoff**: Create a unified `walkthrough.md`.

---

## Reporting Format:
- **Orchestration Report**:
  - Summary of Task.
  - Agents invoked + specific contributions.
  - Verification results.
  - Deliverable links.

---

## Critical Failure Modes (REJECT IF):
- `agent_count < 3`.
- No `walkthrough.md` created at the end.
- Agents working on the same file without a split-state strategy.
