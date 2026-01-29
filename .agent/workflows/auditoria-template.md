---
description: 🛡️ PROTOCOLO GHOST - TEMPLATE DE AUDITORIA MESTRE V3.1
---

# 🛡️ TEMPLATE DE AUDITORIA GHOST SYSTEM V3.1

**Status:** `READY_FOR_EXECUTION`
**Nível de Rigor:** Máximo (Orchestrated)

## 📂 FONTE DA VERDADE

O arquivo mestre é: `docs/AUDITORIA_PORTFOLIO.md` (ou caminho equivalente fornecido).
Este arquivo dita O QUE fazer. O código atual dita ONDE fazer.

Documentação para consulta e imagens de cada pagina com layout absoluto na pasta: '.context'

## 🌌 1. DESIGNAÇÃO DO BATALHÃO (@orchestration)

| Agente | Responsabilidade | Check-in Requerido |
| :--- | :--- | :--- |
| **@ghost_architect** | Integridade de Pasta, Arquitetura de Componentes e Types. | [ ] |
| **@spectral_artist** | Cores (`#0048ff`, `#040013`), Shaders e Materiais. | [ ] |
| **@motion_choreographer** | Framer Motion, Lenis e Sincronização de Scroll. | [ ] |
| **@audit_sentinel** | Grid Compliance (`.std-grid`), Lighthouse e Z-index. | [ ] |

## 🏗️ 2. FASES DA MISSÃO

### FASE 1: ESCANEAMENTO TÉCNICO (Parsing)

- [ ] Mapear todos os arquivos da seção específica.
- [ ] Identificar dependências de assets no `assets.json`.
- [ ] Verificar versões do Next.js e React no contexto do arquivo.

### FASE 2: ANÁLISE DE CONFORMIDADE

- [ ] **Grid:** Todas as margens seguem o sistema `.std-grid`?
- [ ] **Aesthetics:** O glow está dentro dos parâmetros Ghost Blue?
- [ ] **Motion:** O easing segue `[0.22, 1, 0.36, 1]`?

### FASE 3: IMPLEMENTAÇÃO ORQUESTRADA

1. **Sub-tarefa A:** Correção de bugs estruturais (@ghost_architect).
2. **Sub-tarefa B:** Polimento visual e shaders (@spectral_artist).
3. **Sub-tarefa C:** Ajustes de micro-interações (@motion_choreographer).

### FASE 4: VETAGEM FINAL (QA)

- [ ] Teste de performance (FPS > 50).
- [ ] Verificação de acessibilidade (Aria labels).
- [ ] Snapshot visual mobile-first.

## 📝 3. LOG DE SAÍDA (RESUMO)

> Todos os bugs devem ser reportados no `AUDIT_PENTEST.md` após a execução.