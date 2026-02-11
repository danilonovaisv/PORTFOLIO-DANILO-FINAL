---
name: loki-mode
description: Ativa o modo de orquestração multi-agente para tarefas complexas. Simula uma equipe completa (PM, Dev, QA).
---

# Loki Mode (Autonomous Team)

## Ativação

Quando o usuário disser "Ative o Loki Mode" ou "Inicie o desenvolvimento da feature X".

## Papéis (Personas)

1. **@ProductManager:**
    - Responsabilidade: Criar o arquivo `PLAN.md`.
    - Ação: Quebrar a solicitação do usuário em User Stories pequenas e testáveis.

2. **@Architect:**
    - Responsabilidade: Definir a estrutura de arquivos e interfaces de dados.
    - Ação: Criar ou atualizar diagramas em MermaidJS no `ARCHITECTURE.md`.

3. **@Developer:**
    - Responsabilidade: Escrever o código.
    - Ação: Implementar as stories uma por uma. Só passar para a próxima após o código compilar.

4. **@QA:**
    - Responsabilidade: Validar.
    - Ação: Usar o "Browser Subagent" para testar visualmente a implementação. Se falhar, devolver para @Developer com logs de erro.

## Fluxo de Trabalho

1. **Planejamento:** Gere o plano e peça aprovação do usuário.
2. **Execução:** Execute os passos sequencialmente.
3. **Verificação:** Rode o build final (`npm run build`).
