A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

# Lista de tarefas — correção sistêmica do menu mobile

Cada tarefa tem duração máxima planejada de 1 hora. O status deve ser atualizado com evidência; conclusão declarada não substitui comando ou walkthrough verificável.

| ID | Status | Duração | Dependências | Agente responsável | Ação | Critério de conclusão |
| --- | --- | --- | --- | --- | --- | --- |
| T0 | concluída | ≤1h | — | orchestrator | Persistir plano aprovado e task list. | Conteúdo aprovado registrado e frase literal presente no início deste arquivo. |
| T1 | concluída | ≤1h | T0 | nextjs-architecture-expert | Confirmar o pin existente de Node 22 e alinhar TypeScript 6.0.2; regenerar o lockfile com pnpm. | Instalação reproduzível com lockfile congelado; versões reais confirmadas. |
| T2 | concluída | ≤1h | T1 | debugger | Criar regressões inicialmente falhas para reduced motion, hit-test do close e fechamento. | Commits `320bea89a`, `0ca0e1b84`, `7dba62c4e` e `5fad04cf`; suite unitária RED reproduziu 8 falhas antes do patch. |
| T3 | concluída | ≤1h | T2 | frontend-specialist | Tornar o menu controlado e estabelecer baseline declarativo open/closed. | Commit `6b9594b`; painel fechado tem `inert`, `aria-hidden`, `pointer-events-none`, `invisible` e links fora do tab order. |
| T4 | concluída | ≤1h | T3 | frontend + uiux | Implementar dialog, inert, ARIA, focus trap e restauração/transferência de foco. | `MobileMenuPanel` virou `role="dialog"` com `nav` interno; Escape/close restauram foco no trigger; navegação transfere foco para conteúdo. |
| T5 | concluída | ≤1h | T3 | frontend + mobile | Corrigir camada do close, landscape, safe areas e lock de body/Lenis. | Token `--z-layer-mobile-menu-control: 92`, z-index inline do header aberto, scroll interno com `data-lenis-prevent` e safe-area padding. |
| T6 | concluída | ≤1h | T4 | nextjs-arch | Fechar por pathname/back e isolar `#site-content`. | `SiteHeader` fecha em `pathname`; `ClientLayout` expõe `#site-content`; `/portfolio/[slug]` ganhou `#main-content`. |
| T7 | concluída | ≤1h | T3, T4, T5, T6 | frontend | Corrigir motion, ícones, copy e transições. | Hook usa apenas opacity, blur e `translateY`; trigger usa `Menu`/`X` estáticos com crossfade; copy `Instagram` e ARIA corrigidos. |
| T8 | concluída | ≤1h | T3, T4, T5, T6, T7 | debugger | Consolidar testes unitários e de acessibilidade. | `pnpm test -- --runTestsByPath test/components/layout/header/MobileStaggeredMenu.test.tsx` passou `8/8`. |
| T9 | concluída parcial | ≤1h | T8 | debugger | Executar matriz portrait por rota e preferência de motion. | Regressão automatizada passou em Chromium/WebKit para reduced motion fechado, hit-test do close e foco/Escape; matriz completa pré-auditoria permanece como evidência de escopo. |
| T10 | bloqueada parcial | ≤1h | T8 | mobile consultant | Validar landscape, rotação e Safari mobile. | Simulação WebKit passou; Safari em iPhone real, edge-swipe e barras dinâmicas exigem aparelho/acesso manual fora deste ambiente. |
| T11 | concluída | ≤1h | T9, T10 | orchestrator | Atualizar documentação do header e produzir walkthrough. | `.context/.../01-HEADER.md` e `walkthrough.md` atualizados com solução, evidência, limitações e OPS-001. |
| T12 | em andamento | ≤1h | T11 | orchestrator | Fazer revisão final e commits atômicos. | Commits atômicos em andamento; nenhum deploy executado e alterações alheias preservadas. |

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

## Comandos e evidências — implementação

- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm test -- --runTestsByPath test/components/layout/header/MobileStaggeredMenu.test.tsx` -> `8 passed`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm exec playwright test test/e2e/mobile-menu.spec.ts --project=chromium --project=webkit` -> `6 passed`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm run typecheck` -> exit code `0`.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH pnpm run lint` -> exit code `0`, com 5 warnings preexistentes de unused vars.
- `PATH=/Users/danilonovais/.nvm/versions/node/v22.22.3/bin:$PATH VALIDATE_ENV_WARN_ONLY=1 pnpm run build` -> exit code `0`, com warnings esperados de Supabase env ausente no worktree.

## Evidência — OPS-001

- `curl -I https://portfoliodanilo.com` -> `HTTP/2 503`, `server: cloudflare`, `x-served-by: cache-gru-*`, `vary: x-fh-requested-host`.
- `curl -I https://www.portfoliodanilo.com` -> `HTTP/2 301`, `Location: https://portfoliodanilo.com/portfoliodanilo.com/`.
- `curl -D - https://portfolio-danilo-novais.web.app/` -> `HTTP/2 503`, `server: Google Frontend`, `x-served-by: cache-gru-*`, corpo `The service you requested is not available yet`.
- `curl -D - https://portfolio-danilo-novais.firebaseapp.com/` -> mesmo `HTTP/2 503`.
- Conclusão: a falha da página pública é da origem Firebase Hosting/Fastly, propagada pelo Cloudflare no domínio canônico. Corrigir live exige ação de hosting/deploy ou reconfiguração de DNS/origin; não foi executado deploy nesta missão.
