---
name: ghost-protocol-master
description: Protocolo de governança e orquestração de ajustes para o sistema Ghost.
---

# 🛡️ AGENT.md — GHOST SYSTEM GOVERNANCE

> **SYSTEM OVERRIDE**: Este arquivo é a BÚSSOLA CENTRAL para a execução de agentes neste workspace.
> **Status:** `READY_FOR_EXECUTION` | **Rigor:** Máximo (Orchestrated)

---

## 🏗️ 1. DIRETRIZ PRIMÁRIA: "Agent-Context Separation"

Este repositório opera sob uma arquitetura estrita de separação entre **Inteligência** e **Estado**:

1.  **🧠 Pasta `.agents/` (READ-ONLY)**: Contém as Skills (`SKILL.md`) que definem QUEM você é e COMO trabalha. Você nunca edita esta pasta a menos que explicitamente solicitado para evoluir sua própria lógica.
2.  **🗂️ Pasta `.context/` (READ-WRITE)**: É a sua **FONTE DA VERDADE**. Contém imagens de layout absoluto e documentos técnicos. Toda alteração no código (`src/`) **DEVE** resultar em uma atualização correspondente em `.context/` para manter a sincronia.

---

## 🌌 2. DESIGNAÇÃO DO BATALHÃO (@orchestration)

Sempre que uma tarefa for iniciada, você deve assumir ou invocar a Skill específica:

| Agente                    | Skill Ativa            | Responsabilidade Principal                            |
| :------------------------ | :--------------------- | :---------------------------------------------------- |
| **@ghost_architect**      | `ghost-architect`      | Integridade de Pasta, Arquitetura Next.js 15 e Types. |
| **@spectral_artist**      | `spectral-artist`      | Cores Ghost (#0048ff), Shaders WebGL e Materiais.     |
| **@motion_choreographer** | `motion-choreographer` | Framer Motion, Lenis e Sincronização de Scroll.       |
| **@audit_sentinel**       | `audit-sentinel`       | Grid Compliance (`.std-grid`), Lighthouse e Z-index.  |

---

## 📐 3. MAPA DE REFERÊNCIAS (Single Source of Truth)

Sua análise deve cruzar o código atual com os documentos em `.context/DOCS-PORTFOLIO-PAGES/`:

### 🏠 HOME

`01-HEADER.md`, `02-HERO-HOME.md`, `03-VIDEO-MANIFESTO.md`, `04-PORTFOLIO-SHOWCASE.md`, `05-FEATURED-PROJECTS.md`, `06-CLIENTS-BRANDS.md`, `07-CONTACT.md`, `10-FOOTER.md`.

### 👤 SOBRE

`02-HERO-MANIFESTO.md`, `03-ORIGEM-CRIATIVA.md`, `04-O-QUE-EU-FACO.md`, `05-COMO-EU-TRABALHO.md`, `06-O-QUE-ME-MOVE.md`, `07-FECHAMENTO-CONFIRMACAO.md`.

### 📂 PORTFOLIO & ADMIN

`03-GALLERY.md`, `04-PROJECT-CARDS.md`, `05-MODAL.md`, `06-PROJETO-SLUG.md`, `03-DASHBOARD.md`, `08-SETTINGS-CONFIG.md`.

---

## 🔄 4. CICLO DE VIDA DA MISSÃO

### FASE 1: ESCANEAMENTO TÉCNICO (Parsing)

- [ ] Mapear arquivos da seção via `filesystem`.
- [ ] Identificar dependências no `assets.json` ou `site-assets.ts`.
- **Action:** Use `context7` para indexar os documentos acima.

### FASE 2: ANÁLISE DE CONFORMIDADE

- [ ] **Grid:** Validar se margens seguem o sistema `.std-grid`.
- [ ] **Aesthetics:** Verificar se o glow/blur está nos tokens Ghost Blue.
- [ ] **Motion:** Validar se o easing segue o padrão `[0.22, 1, 0.36, 1]`.

### FASE 3: IMPLEMENTAÇÃO ORQUESTRADA

1. Gerar um **Implementation Plan** (Artifact) antes de codar.
2. Executar correções estruturais -> Visuais -> Micro-interações.

### FASE 4: VETAGEM FINAL (QA)

- [ ] Teste de Performance: FPS > 50 (via Browser integrated).
- [ ] Acessibilidade: Validar Aria labels e contraste AAA.
- [ ] **Snapshot:** Gerar screenshot mobile-first para validação visual.

---

## 📝 5. DEFINITION OF DONE (DoD)

A tarefa é considerada encerrada apenas quando:

1. O código roda sem erros de TypeScript/Lint no Terminal.
2. Os bugs encontrados foram reportados em `AUDIT_PENTEST.md`.
3. **O documento correspondente em `.context/` foi atualizado com o novo estado.**

### 📚 Knowledge & Rules (Como operar)

- **[Security & Permissions](.agents/rules/security.md)**: RLS, Auth Gates e Pentest Protocol.
- **[Tech Stack & Architecture](.agents/rules/tech-stack-standards.md)**: Padrões de código, "Zero Deploy", Realtime e Debugging.
- **[👮 Auditor Protocol](.agents/rules/auditor-protocol.md)**: Validação obrigatória entre Código vs. Documentação.
- **[Global Identity](.agents/rules/00-global-identity.md)**: Persona e Diretrizes de Design/Tom (Se existir).

### ⚙️ Workflows (O que executar)

- **[Tasks](.agents/tasks/active.md)**: Kanban atual e backlog (se aplicável).
- **[Workflows](.agents/)**: Pipelines de CI/CD, Refactor e Deploy (Ver `r3f-setup.md`).

### 🗺️ Project State (A Verdade do Projeto)

- **Sitemap & Escopo**: [.context/SITEMAP.md](.context/SITEMAP.md)
- **Arquitetura**: `.context/ARCHITECTURE.md` (Se existir)
- **Logs & Histórico**: `.context/logs/`

---
