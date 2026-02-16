# 🔄 WORKFLOW: Calibragem e Validação de Contexto (Project Boot)

**Gatilho:** `/calibrate` ou `init_session`
**Agente Responsável:** `agents/orchestrator.md` (The Commander)

## 1. Setup & Context

- **MCP Required:** `github` (para ler estrutura de pastas), `chrome-devtools` (opcional, para validar servidor local).
- **Context:** Inicialização rigorosa do ambiente Antigravity. Deve validar a estrutura física, carregar regras de negócio da pasta `.context/` e confirmar a disponibilidade dos agentes.

## 2. Steps (Skill-Based Execution)

### Step 1: Injeção de Contexto e Regras (Deep Read)

**Goal:** Carregar as "Leis" do projeto antes de qualquer execução.

- **Instruction:** Utilize o MCP `github` ou leitura de arquivos para carregar e memorizar o conteúdo crítico dos seguintes caminhos:
  1. `.context/coding_style.md` (Estilo de código obrigatório).
  2. `.context/system_prompt.md` (Personalidade e limites).
  3. `CONTEXT.md` (Visão geral do projeto).
  4. `mission.md` (Objetivos atuais).
  5. `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` (Arquitetura oficial).
- **Validation:** Confirme se os arquivos existem. Se faltar algum, pare e reporte.
- **Skill:** `use a skill skill-context-optimization` (ou leitura direta via MCP).

### Step 2: Validação Estrutural (Path Integrity)

**Goal:** Verificar se os Agentes e Workflows estão nos caminhos corretos (Raiz vs `.agent`).

- **Instruction:** Liste os arquivos nos diretórios para confirmar onde a arquitetura está instalada:
  - Verificar existência de `agents/` OU `.agent/agents/`.
  - Verificar existência de `workflows/` OU `.agent/workflows/`.
  - Validar se `GEMINI.md` aponta para os caminhos encontrados.
  - **Action:** Executar `pnpm run validate:structure` para garantir integridade arquitetural conforme a Rule.
- **Critical Check:** Se houver duplicidade (pastas na raiz E dentro de `.agent`), sugira uma consolidação.
- **Skill:** `use a skill skill-file-system-navigation` (implícito no agente).

### Step 3: Stack & MCP Health Check

**Goal:** Garantir que o ambiente técnico suporta o projeto (Next.js + R3F + Supabase).

- **Instruction:**
  1. Leia `package.json` e valide versões mínimas: Next.js 14+, React 18/19, Three.js.
  2. Teste a conexão com MCPs configurados em `mcp_config.json`:
     - **Supabase MCP:** Verificar se consegue listar tabelas.
     - **GitHub MCP:** Verificar se consegue ler issues.
- **Skill:** `use a skill skill-concise-planning` (para check rápido).

### Step 4: Page & Route Mapping

**Goal:** Entender a estrutura de navegação atual.

- **Instruction:**
  1. Leia `src/app/sitemap.ts` ou a estrutura de pastas em `src/app/`.
  2. Mapeie quais rotas principais (ex: `/portfolio`, `/sobre`, `/admin`) possuem documentação de detalhamento em `.context/` ou `docs/`.
- **Skill:** `use a skill skill-nextjs-app-router-patterns`.

### Step 5: Teste de Sanidade (Self-Correction)

**Goal:** Simular micro-tarefa para garantir que o LLM está "acordado" e seguindo regras.

- **Instruction:** Gere internamente (sem salvar) um exemplo de *Commit Message* para uma mudança fictícia na "Home", seguindo estritamente o padrão definido em `knowledge_skills.json` (ID: `commit`) e `.context/coding_style.md`.
- **Validation:** Se o commit não seguir o padrão (ex: `feat(home): ...`), falhe a calibração.
- **Skill:** `use a skill skill-commit`.

## 3. Completion Protocol

- **Validation:** `use a skill skill-verification-before-completion`
- **Output:** Gere um relatório Markdown no formato abaixo.

---

### 🏁 RELATÓRIO DE CALIBRAGEM

**🟢 SISTEMA ANTIGRAVITY: ONLINE**

| Módulo | Status | Detalhes |
| :--- | :--- | :--- |
| **Contexto** | ✅ Carregado | `coding_style`, `mission`, `system_prompt` lidos. |
| **Arquitetura** | [Status] | Agentes encontrados em: `[Caminho]` |
| **Engine** | [Status] | Next.js [Ver] + R3F [Ver] |
| **MCPs** | [Status] | GitHub e Supabase validados. |
| **Page Detail** | [Status] | Documentação de rotas mapeada. |

**Próxima Ação Recomendada:** [Inserir próxima tarefa prioritária baseada no `mission.md`]
