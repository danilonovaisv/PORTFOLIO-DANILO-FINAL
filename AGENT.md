# AGENT.md — Mission Control & Governance

> **SYSTEM OVERRIDE**: Este arquivo é a BÚSSOLA CENTRAL para a execução de agentes neste workspace.
> **Localização**: `.agent/AGENT.md` (Simlink ou Referência na Raiz)
> **Contexto Atual**: Next.js 16 + React 19 + Supabase (Realtime/Storage) + WebGL.

---

## 1. DIRETRIZ PRIMÁRIA: "Agent-Context Separation"

Este repositório opera sob uma arquitetura estrita de separação entre **Inteligência** e **Estado**:

1. **🧠 `.agent/` (READ-ONLY para lógica de negócio)**:
    * Contém **QUEM** você é e **COMO** você trabalha.
    * Você consulta esta pasta para saber regras, workflows e ferramentas.
    * *Você raramente edita esta pasta, a menos que esteja evoluindo suas próprias skills.*

2. **🗂️ `.context/` (READ-WRITE para estado do projeto)**:
    * Contém **O QUE** o projeto é agora.
    * Toda vez que você altera código (`src/`), você **DEVE** atualizar o documento correspondente em `.context/`.
    * Se o código diz "X" e o `.context` diz "Y", priorize o `.context` e alerte o humano.

---

## 2. MAPA DE NAVEGAÇÃO DO AGENTE (Index)

### 📚 Knowledge & Rules (Como operar)

* **[Security & Permissions](.agent/rules/security.md)**: RLS, Auth Gates e Pentest Protocol.
* **[Tech Stack & Architecture](.agent/rules/tech-stack-standards.md)**: Padrões de código, "Zero Deploy", Realtime e Debugging.
* **[👮 Auditor Protocol](.agent/rules/auditor-protocol.md)**: Validação obrigatória entre Código vs. Documentação.
* **[Global Identity](.agent/rules/00-global-identity.md)**: Persona e Diretrizes de Design/Tom (Se existir).

### ⚙️ Workflows (O que executar)

* **[Tasks](.agent/tasks/active.md)**: Kanban atual e backlog (se aplicável).
* **[Workflows](.agent/workflows/)**: Pipelines de CI/CD, Refactor e Deploy.

### 🗺️ Project State (A Verdade do Projeto)

* **Sitemap & Escopo**: [.context/SITEMAP.md](.context/SITEMAP.md)
* **Arquitetura**: `.context/ARCHITECTURE.md` (Se existir)
* **Logs & Histórico**: `.context/logs/`

---

## 3. OBJETIVOS OPERACIONAIS

1. **Zero-Deploy Content**: Textos e mídias vêm do Supabase. Proibido hardcoding.
2. **Realtime First**: Updates < 2s.
3. **Single Source of Truth**: O código implementa a verdade definida em `.context/`.

---

## 4. PROTOCOLO DE EXECUÇÃO (The 3-Layer Model)

Ao receber um prompt, opere nestas camadas:

### **Layer 1: Contextualização (Leitura)**

1. Ler `.context/project-status.md` (ou logs recentes).
2. Identificar arquivos afetados.

### **Layer 2: Planejamento (Raciocínio)**

1. Criar/Atualizar `implementation_plan.md` se a tarefa for complexa.
2. Verificar scripts em `scripts/`.

### **Layer 3: Execução (Código Determinístico)**

1. Escrever código.
2. Executar testes/lint.
3. **CRÍTICO**: Atualizar `.context/` refletindo as mudanças.

---

## 5. SQUAD ROLES (Antigravity Persona)

Dependendo do prompt, assuma um destes chapéus:

* **Orchestrator**: Gerencia tasks e atualiza `.context`.
* **Architect**: Define estruturas em `src/lib` e schemas de banco.
* **Builder**: Implementa componentes React/Next.js.
* **Scribe**: Especialista em documentação Markdown.

---

## 6. DEFINITION OF DONE (DoD)

Uma tarefa só termina quando:

* [ ] O código roda sem erros de TypeScript/Lint.
* [ ] A funcionalidade foi verificada (Manualmente ou Teste).
* [ ] O arquivo `.context/[AREA].md` foi atualizado.
