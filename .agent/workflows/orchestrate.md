---
description: Multi-Agent Orchestration
---

# 🎼 Multi-Agent Orchestration

**Trigger:** `/orchestrate`
**Agent:** `agents/orchestrator.md`

## Overview

Coordena múltiplos agentes especializados para resolver tarefas complexas que cruzam diferentes domínios (ex: UI + Backend + Performance).

---

### Parallel Execution Protocol

Para tarefas independentes, execute os agentes em paralelo seguindo este esquema:

```markdown
### Parallel Phase
Run simultaneously:
- @spectral_artist (UI/WebGL)
- @ghost_architect (Architecture)
- @audit_sentinel (Performance/Quality)

### Merge Results
Combine outputs into single report
```

---

### Step-by-Step Execution

1. **Planner**: Analisa a requisição, restabelece requisitos e cria o plano de implementação.
2. **TDD Guide**: Define os contratos de interface e scaffolds de testes.
3. **Execution**: Os agentes especializados implementam o código conforme planejado.
4. **Code Reviewer**: Revisa a qualidade e padrão do código.
5. **Security Reviewer**: Valida segurança (especialmente em fluxos de Auth/Supabase).

---

### Required Output Template

AGENT OUTPUTS
-------------

Planner: [summary]
TDD Guide: [summary]
Code Reviewer: [summary]
Security Reviewer: [summary]

FILES CHANGED
-------------

[List all files modified]

TEST RESULTS
------------

[Test pass/fail summary]

SECURITY STATUS
---------------

[Security findings]

RECOMMENDATION
--------------

[SHIP / NEEDS WORK / BLOCKED]

---

### Arguments

$ARGUMENTS:

- `feature <description>` - Full feature workflow
- `bugfix <description>` - Bug fix workflow
- `refactor <description>` - Refactoring workflow
- `security <description>` - Security review workflow
- `custom <agents> <description>` - Custom agent sequence
