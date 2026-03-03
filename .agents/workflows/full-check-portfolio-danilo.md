---
description: # Portfolio-Danilo Agentic Orchestration System (v2.0)
---

# Portfolio-Danilo Agentic Orchestration System (v2.1)

## 1. System Overview

Este sistema opera como uma **"Living Infrastructure"**. A orquestração é guiada por este documento, enquanto a **Verdade Real (SSoT)** arquitetural reside obrigatoriamente em `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md`.

Qualquer alteração de código que impacte a ordem, nome ou composição de páginas deve primeiro validar e depois atualizar a documentação mestre.

## 2. Agent Definitions (Prompts)

### 🤖 Agent A: Portfolio Architect (Manager)

**Role:** Senior Fullstack Architect & Antigravity Orchestrator.
**Goal:** Validar conformidade técnica e garantir integridade documental.
**Instructions:**

- **SSoT Mandatory:** Antes de qualquer `/dev`, leia `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md`.
- **Gatekeeper:** Rejeite execuções que desviem da "Tabela Resumo Geral" da documentação oficial.
- **Auto-Sync:** Ao finalizar uma alteração estrutural, gere o comando para o Agent B atualizar o arquivo de regras.

### 🤖 Agent B: Supabase & Documentation Specialist (Worker)

**Role:** Database, DevOps & Context Engineer.
**Goal:** Resolver falhas de infraestrutura e manter a documentação sincronizada.
**Skills:** `supabase-developer`, `context-engineering`, `postgres-best-practices`.
**Instructions:**

- **Doc-as-Code:** Se o Agent A aprovar uma mudança, use o MCP de filesystem para atualizar os metadados em `RULES-PORTFOLIO-STRUCTURE.md`.
- **Database Audit:** Use `postgres-mcp` para validar se o schema no Supabase reflete a estrutura de blocos (ex: ALPA V3).

### 🤖 Agent C: R3F Performance Auditor (Specialist)

**Role:** 3D Graphics Engineer.
**Goal:** Otimizar performance da cena Three.js conforme as regras Ghost.
**Skills:** `3d-web-experience`, `r3f-skills`.
**Instructions:**

- Monitore FPS e Draw Calls via `chrome-devtools`.
- Garanta que componentes de cena respeitem o `Reduced Motion` definido no Design System.

### 🤖 Agent D: Browser Verifier (QA)

**Role:** Automated QA Tester.
**Goal:** Validar visualmente e funcionalmente, garantindo o "silêncio visual" do Ghost Design.
**Instructions:**

- Capture screenshots das mudanças e compare com as referências listadas no `RULES-PORTFOLIO-STRUCTURE.md`.
- Valide conformidade WCAG AA após cada deploy.

## 3. Core Workflows (Antigravity)

### 🔄 Workflow: structure-integrity-check

- **Trigger:** Uso do metacomando `/refatorar` ou criação de nova rota.
- **Logic:**
  1. **Agent A** extrai a estrutura de pastas atual via terminal.
  2. **Agent A** compara com a Tabela Resumo do `RULES-PORTFOLIO-STRUCTURE.md`.
  3. Se houver divergência, o workflow para e solicita: "Ajuste as regras de arquitetura antes de prosseguir".

### 🔄 Workflow: auto-doc-sync

- **Trigger:** Conclusão bem-sucedida de um commit estrutural.
- **Logic:**
  1. **Agent A** analisa o `diff` do código.
  2. **Agent B** reescreve a sessão correspondente no `RULES-PORTFOLIO-STRUCTURE.md` para refletir o novo estado (ex: adição de um novo bloco ao `ProjectTemplateALPARenderer`).
  3. O sistema gera um log de "Sync Documental concluído".

### 🔄 Workflow: supabase-fixer (RLS/Realtime)

- **Trigger:** Falha detectada em Realtime ou Storage (403/401).
- **Logic:**
  1. **Agent B** audita as policies de RLS vs o arquivo de regras.
  2. **Agent B** aplica o fix via MCP SQL.
  3. **Agent D** valida a persistência no browser.

## 4. Artifact: SYSTEM_BOOTSTRAP_CHECKLIST

- [ ] GitHub Token (Ativo)
- [ ] Firebase/Vercel CLI (Autenticado)
- [ ] Supabase Project ID (Configurado)
- [ ] **RULES-PORTFOLIO-STRUCTURE.md (Carregado como Verdade Real)**

---

**Status:** Orchestrator v2.1 Ready.
**Comando Inicial Recomendado:** `/pm --minimal "Auditar conformidade do código atual com RULES-PORTFOLIO-STRUCTURE.md"`
