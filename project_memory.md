# Project Memory

## [STATUS ATUAL]

- [2026-01-26] Configurado caminho para arquivos de customização do agente em `.agent/customizations`.
- [2026-01-26] Criada regra de integridade em `.agent/rules/customizations.md` para priorizar este caminho.
- [2026-01-26] Documentado o novo caminho em `AGENT.md`.

## [CONTEXTO TÉCNICO]

- O diretório `.agent/customizations` serve como local centralizado para overrides e contextos específicos do usuário/projeto que não devem poluir as regras globais.
- A regra em `customizations.md` garante que o agente sempre verifique este diretório no início de cada missão.

## [PRÓXIMOS PASSOS]

- O usuário pode agora adicionar arquivos `.md` ou `.txt` em `.agent/customizations/` para ajustar o comportamento do agente.

## [ALERTA DE BUGS]

- Nenhum bug identificado nesta configuração.
