---
description: Calibragem Descoberta
---

# 🔄 WORKFLOW: Calibragem e Validação de Contexto (Project Boot)

**Gatilho:** `/calibrate` ou `init_session`
**Agente Responsável:** `personas/orchestrator.md` (The Commander)

## 1. Setup & Context

- **MCP Required:** `github`, `filesystem`, `chrome-devtools` (opcional).
- **Context:** Inicialização rigorosa do ambiente Antigravity. Deve validar a estrutura física, referenciar o indexador global `.agents/AGENTS.md` e confirmar a adesão completa aos princípios Ghost (60FPS WebGL, Ghost Design, Isolamento App Router) e ao **Auditor Protocol** antes de qualquer codificação.

## 2. Steps (Skill-Based Execution)

### Step 1: Injeção do Ponto de Ignição (Single Source of Truth)

**Goal:** Garantir que o AGENTS.md e as fundações corporativas sejam a base inicial do contexto.

- **Instruction:** Leia OBRIGATORIAMENTE nesta ordem:
  1. `.agents/AGENTS.md` (Indexador Central e Leis Não-Negociáveis).
  2. `.agents/rules/GEMINI.md` e `.agents/rules/00-global-identity.md` (Personalidade e limites).
  3. `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` (Para restrições da arquitetura de navegação).

### Step 2: Auditor Protocol & Sincronização Visual (OBRIGATÓRIO PARA UI)

**Goal:** Validar o alinhamento de intenção com a documentação de interface nas construções de layout.

- **Instruction:** SE a sessão envolver UI/UX, Componentes ou Estilo, o Agente DEVE:
  1. Ler o documento com a descrição e detalhamento geral da página, ex: `.context/DOCS-PORTFOLIO-PAGES/[SESSAO]/[PAGINA] - PROTOTIPO INTERATIVO.md`.
  2. Sempre consultar imagens `.jpg` correspondentes à guia visual da tela que acompanham essa especificação no `.context/`.
- **Rule (Sincronização):** Aplica-se a Fase B do Auditor Protocol. Desvios estéticos ou operacionais solicitados devem ser confirmados com o usuário. **E qualquer ajuste aprovado, DEVE obrigatoriamente e imediatamente ser atualizado pelo Agente na documentação do Protótipo/Markdown para refletir o novo padrão**.

### Step 3: Validação Estrutural (Path Integrity)

**Goal:** Verificar se as bases Agênticas estão limpas e operacionais.

- **Instruction:** Navegue e valide a integridade estrita da hierarquia:
  - `.agents/AGENTS.md` (presente na raiz)
  - `.agents/personas/`
  - `.agents/rules/`
  - `.agents/workflows/`
  - `.agents/skills/`

### Step 4: Engine Health Check

**Goal:** Garantir suporte para estabilidade de Performance (Next.js 14+ / R3F).

- **Instruction:** Leia `package.json` buscando flagrants ou gargalos. Reforce que qualquer uso de contexto 3D `<Canvas>` exija `<InstancedMesh>` e obedeça regras estritas de otimização em WebGL para manter a "Zero Jank Policy".

## 3. Completion Protocol

- **Validation:** O bot atua como Auditor de integridade. Comprova que carregou as diretrizes do `AGENTS.md` e do `DOCS-PORTFOLIO-PAGES`.
- **Output:** Imprima um relatório Markdown preenchido com o status operacional.

---

### 🏁 RELATÓRIO DE CALIBRAGEM GHOST SYSTEM

**🟢 OVERRIDE INITIALIZED: SYSTEM ONLINE**

| Módulo                       | Status        | Detalhes                                                                                                                                  |
| :--------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Indexador Root**           | ✅ Verificado | `AGENTS.md` carregado.                                                                                                                    |
| **UI/UX & Auditor Protocol** | ✅ Ativado    | Mandato de Sincronização (Ler: `[PAGINA] - PROTOTIPO INTERATIVO.md` + `.jpg`) configurado. Atualizações de doc confirmadas sob alteração. |
| **Arquitetura Ghost**        | ✅ Validada   | `RULES-PORTFOLIO-STRUCTURE.md` + subpastas `.agents` íntegras.                                                                            |
| **Environment**              | -             | _Status do Next.js + R3F_                                                                                                                 |

**Próxima Ação recomendada do Orchestrator:** ...
