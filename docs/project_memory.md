# Project Memory

## [STATUS ATUAL]

- [2026-01-26] Ativada configuração mestra baseada no arquivo `.agentrules` na raiz.
- [2026-01-26] Atualizado `.cursorrules` para integrar os diretórios `./agent/rules/` e `./agent/workflows/` como fontes primárias de verdade.
- [2026-01-26] Todos os 19 arquivos de regras e 32 arquivos de workflows registrados em `.agentrules` foram validados e estão ativos.
- [2026-01-26] Configurado caminho para arquivos de customização do agente em `.agent/customizations`.
- [2026-01-26] Criada regra de integridade em `.agent/rules/customizations.md` para priorizar este caminho.
- [2026-01-26] Documentado o novo caminho em `AGENT.md`.

- [2026-01-26] Sincronização e atualização mestre de regras concluída (@rules:atualizar).
- [2026-01-26] .agentrules validado e atualizado com todos os 19 arquivos de regras e 32 workflows.
- [2026-01-26] .cursorrules refinado com core tech stack (Next.js 15, React 18.3, Tailwind v4/v3.4), Z-Index Hierarchy e Motion Principles.
- [2026-01-26] Corrigida discrepância de informações do usuário no contexto das regras.
- [2026-01-26] Criado workflow `setup-pm.md` e script utility `scripts/setup-package-manager.js` para gerenciamento de pacotes (Detectado: `pnpm`).

## [CONTEXTO TÉCNICO]

- **Tech Stack:** Confirmado o uso de Next.js 15 e React 18.3 para estabilidade com R3F e Post-processing.
- **Hierarchy:** Mantida a arquitetura de camadas Z-Index rígida para garantir a atmosfera "Ghost".
- **Single Source of Truth:** Definida a prioridade `./docs/blueprints_project/` > `./agent/rules/` > `.cursorrules`.

## [PRÓXIMOS PASSOS]

- O sistema está agora calibrado com as regras mais recentes. Auditorias de componentes podem ser realizadas seguindo os workflows de `./agent/workflows/`.

- [2026-02-03] Executada auditoria de arquitetura e correção de testes E2E (`ghost-system.spec.ts`, `portfolio.spec.ts`).
- [2026-02-03] Corrigido "Strict Mode Violation" em `ghost-system.spec.ts` (elementos duplicados no DOM).
- [2026-02-03] Atualizado seletor em `portfolio.spec.ts` para refletir nova estrutura DOM (`article.group`).
- [2026-02-03] Implementada lógica de retry em navegação para `ghost-system.spec.ts` para mitigar flakiness do dev server.
- [2026-02-03] Testes E2E executados com sucesso (8/8 passed).

## [ALERTA DE BUGS]

- Nenhum bug funcional bloqueante identificado nos testes E2E.
- Script `scripts/antigravity_audit.py` identificado como incompatível (Python-only) e candidato a depreciação.
