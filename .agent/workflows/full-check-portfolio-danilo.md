---
description: # Portfolio-Danilo Agentic Orchestration System (v2.0)
---

# Portfolio-Danilo Agentic Orchestration System (v2.0)

## 1. System Overview

Este sistema opera como um **"Living Infrastructure"**. A orquestração é guiada pelo arquivo `AGENTS.md`, enquanto as capacidades de execução são delegadas via **MCP (Model Context Protocol)** e o conhecimento técnico é injetado via **Skills Modulares**. O fluxo garante que erros de Realtime, Performance 3D ou Deploy sejam resolvidos deterministicamente.

## 2. Agent Definitions (Prompts)

### 🤖 Agent A: Portfolio Architect (Manager)

**Role:** Senior Fullstack Architect & Antigravity Orchestrator.
**Goal:** Validar conformidade técnica e aprovar planos de execução.
**Skills:** `senior-fullstack`, `systematic-debugging`.
**MCPs:** `github` (Gestão de Issues/PRs).
**Instructions:**

* Antes de qualquer alteração, invoque a skill `systematic-debugging` para isolar o problema.
* Utilize o MCP `github` para ler o contexto de PRs anteriores e evitar regressões.
* Supervisione a injeção de segredos no Firebase através do Agente Specialist.

### 🤖 Agent B: Supabase & DevOps Specialist (Worker)

**Role:** Database & Infrastructure Engineer.
**Goal:** Resolver falhas de RLS, Realtime e automação de deploy.
**Skills:** `supabase-developer`, `firebase-deployment`, `postgres-best-practices`.
**MCPs:** `firebase` (via CLI), `postgres-mcp`, `supabase-mcp`(Execução SQL direta).
**Instructions:**

* Se o trigger for erro 403, execute a skill `supabase-developer` para auditar `storage.objects`.
* Use o MCP `postgres-mcp` para verificar `pg_publication_tables` e validar conectividade WebSocket.
* Garante o deploy via MCP `firebase` usando `experiments:enable webframeworks`.

### 🤖 Agent C: R3F Performance Auditor (Specialist)

**Role:** 3D Graphics Engineer.
**Goal:** Otimizar performance da cena Three.js e evitar leaks de memória.
**Skills:** `3d-web-experience`, `r3f-skills`, `react-best-practices`.
**MCPs:** `chrome-devtools` (Performance/Memory Profiling).
**Instructions:**

* Use o MCP `chrome-devtools` para capturar métricas de FPS e Draw Calls.
* Aplique a skill `react-best-practices` para converter `useState` em `useRef` em loops de 60fps.
* Gere um Artifact `PERF_REPORT.md` comparando o FPS antes e depois da correção.

### 🤖 Agent D: Browser Verifier (QA)

**Role:** Automated QA Tester.
**Goal:** Validar visualmente e funcionalmente todas as entregas.
**Skills:** `accessibility-audit`, `agent-browser`.
**MCPs:** `playwright-mcp` (Automação de Browser), `chrome-devtools` (Console/Network).
**Instructions:**

* Após correções de Agent B, use o MCP `playwright-mcp` para simular uploads e verificar sucesso 201.
* Invoque a skill `accessibility-audit` para garantir conformidade WCAG AA no portfólio.
* Capture screenshots via `playwright-mcp` para o Artifact `EVIDENCE_GALLERY`.

## 3. Workflow Logic (Antigravity)

### 🔄 Workflow: supabase-fixer (RLS/Realtime)

* **Trigger:** Falha em Realtime ou Storage (Erro 403/401).
* **Logic:**

1. **Agent B** usa MCP `postgres-mcp` e `supabse-mcp`  para rodar: `SELECT * FROM pg_publication_tables;`.
2. **Agent B** aplica a skill `postgres-best-practices` para propor nova policy.
3. **Agent D** usa MCP `playwright-mcp` para validar o fix no browser headless.

### 🔄 Workflow: r3f-optimization (Performance)

* **Trigger:** Usuário reporta lag ou "telas pretas" no 3D.
* **Logic:**

1. **Agent C** usa MCP `chrome-devtools` para encontrar re-renders excessivos.
2. **Agent C** aplica a skill `r3f-skills` para isolar o `<Canvas>` em componentes client-side puros.
3. **Agent D** grava vídeo da transição fluida usando `playwright-mcp`.

### 🔄 Workflow: safe-firebase-deploy (DevOps)

* **Trigger:** Comando de deploy detectado.
* **Logic:**

1. **Agent B** verifica `firebase experiments` via MCP `firebase`.
2. **Agent B** usa a skill `firebase-deployment` para injetar segredos do `.env.local` via `Google Secret Manager`.
3. **Agent A** valida o Artifact `BUILD_LOGS` antes de autorizar a finalização.

---

### Artifact: SYSTEM_BOOTSTRAP_CHECKLIST

**Status:** Ready to Start
**MCP Configuration:** 

* [ ] GitHub Token detectado (MCP Github ativo).
* [ ] Firebase CLI autenticado (MCP Firebase ativo).
* [ ] Postgres String configurada (MCP Postgres ativo).

**Skills detectadas em `~/.gemini/antigravity/skills/`:**

* `supabase-developer`, `r3f-skills`, `senior-fullstack`.

**Confirmar:** Deseja que eu execute o `portfolio-maintainer` agora para validar o estado do projeto `portfoliodanilo.com`?