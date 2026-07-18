A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

# Lista de tarefas — correção sistêmica do menu mobile

Cada tarefa tem duração máxima planejada de 1 hora. O status deve ser atualizado com evidência; conclusão declarada não substitui comando ou walkthrough verificável.

| ID | Status | Duração | Dependências | Agente responsável | Ação | Critério de conclusão |
| --- | --- | --- | --- | --- | --- | --- |
| T0 | concluída | ≤1h | — | orchestrator | Persistir plano aprovado e task list. | Conteúdo aprovado registrado e frase literal presente no início deste arquivo. |
| T1 | concluída | ≤1h | T0 | nextjs-architecture-expert | Confirmar o pin existente de Node 22 e alinhar TypeScript 6.0.2; regenerar o lockfile com pnpm. | Instalação reproduzível com lockfile congelado; versões reais confirmadas. |
| T2 | pendente | ≤1h | T1 | debugger | Criar regressões inicialmente falhas para reduced motion, hit-test do close e fechamento. | Testes reproduzem MOB-001 e MOB-002 antes da correção. |
| T3 | pendente | ≤1h | T2 | frontend-specialist | Tornar o menu controlado e estabelecer baseline declarativo open/closed. | Estado fechado independe de GSAP e não intercepta a página. |
| T4 | pendente | ≤1h | T3 | frontend + uiux | Implementar dialog, inert, ARIA, focus trap e restauração/transferência de foco. | Ciclo de foco e restauração passam em teclado e testes. |
| T5 | pendente | ≤1h | T3 | frontend + mobile | Corrigir camada do close, landscape, safe areas e lock de body/Lenis. | Close é tocável e primeiro/último itens são acessíveis sem scroll de fundo. |
| T6 | pendente | ≤1h | T4 | nextjs-arch | Fechar por pathname/back e isolar `#site-content`. | Navegação não deixa lock, overlay ou estado residual. |
| T7 | pendente | ≤1h | T3, T4, T5, T6 | frontend | Corrigir motion, ícones, copy e transições. | Fluxo não usa rotate, scale, `translateX` ou `transition-all`; ARIA/copy corretos. |
| T8 | pendente | ≤1h | T3, T4, T5, T6, T7 | debugger | Consolidar testes unitários e de acessibilidade. | Estado, foco, ARIA e body/Lenis lock passam. |
| T9 | pendente | ≤1h | T8 | debugger | Executar matriz portrait por rota e preferência de motion. | Rotas, viewports portrait e motion normal/reduced passam. |
| T10 | pendente | ≤1h | T8 | mobile consultant | Validar landscape, rotação e Safari mobile. | Safe areas, barras dinâmicas e edge-swipe têm evidência; limitação de aparelho real é registrada. |
| T11 | pendente | ≤1h | T9, T10 | orchestrator | Atualizar documentação do header e produzir walkthrough. | Evidências, rollback, riscos e estado final estão sincronizados no SSOT. |
| T12 | pendente | ≤1h | T11 | orchestrator | Fazer revisão final e commits atômicos. | Worktree alheio preservado, checks lidos, commits no escopo e nenhum deploy. |

## Comandos e evidências — T1

Executados em 2026-07-18 no worktree `mobile-menu-systemic-fix`, sempre com o binário de Node 22 explícito:

- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH node --version` → `v22.22.3`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm --version` → `11.10.0`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm exec tsc --version` → `Version 6.0.2`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm install --frozen-lockfile` → exit code `0`, `Already up to date`, concluído com pnpm `11.10.0`.

O manifesto preserva `engines.node: 22` e mantém TypeScript `6.0.2` tanto em `devDependencies` quanto no override de topo.

## Regras de execução

- `OPS-001` e `OPS-002` não entram nesta cadeia; recebem missões separadas.
- Não avançar uma dependência com teste falho sem registrar o bloqueio.
- Não alterar framework, Jest, ESLint ou scripts para acomodar a correção.
- Não executar deploy.
