# AUDITORIA SEMANAL DE CLEANUP

## 1. Resumo Executivo
Os TOP 10 problemas críticos e focos de código morto no repositório foram identificados, focando em peso no bundle, gargalos de performance por código inútil e componentes órfãos:

1. **Imports Quebrados e Dependências Ausentes (🔴 P0)**: A varredura identificou que dependências críticas para o ambiente de testes como `@typescript-eslint/eslint-plugin`, `eslint-plugin-prettier`, e `eslint-config-prettier` estão declaradas nos arquivos mas ausentes no `package.json`, quebrando imports silenciosamente.
2. **Dependência Órfã no Ghost System (🔴 P0)**: O componente `scroll-text.tsx` requer `framer-motion`, mas essa dependência não está listada ou resolvida corretamente, criando um gargalo estrutural.
3. **Componente LiquidEther Obsoleto (🟡 P1)**: O arquivo `src/components/projects/templates/LiquidEther.tsx` (e `src/lib/webgl/liquid-ether/`) foi desativado/comentado em `ProjectTemplateMasterRenderer.tsx`, gerando peso morto inútil de WebGL no bundle.
4. **Componente TextReveal Órfão (🟡 P1)**: `src/components/ui/motion/TextReveal.tsx` existe no sistema mas não está sendo importado em nenhuma rota ou componente pai, tornando-se código morto.
5. **Tipagens Exportadas Inúteis (🟡 P1)**: As tipagens `NavItem` em `src/components/layout/header/mobile/index.ts` e `ErrorReport` em `src/lib/schemas/error-report.ts` não têm usos rastreáveis.
6. **Exportações Duplicadas (🟡 P1)**: O arquivo `OriginComponents.tsx` possui a exportação `OriginMediaStage` de forma duplicada e sem consumo.
7. **Código de Hook Órfão (🟡 P1)**: Diversos arquivos utilitários e hooks de heros WebGL antigos (como `useGhostAnimate.ts`, `useGhostParams.ts`) em `src/components/canvas/home/hero/hooks/` não são mais referenciados.
8. **Assets 3D e Shaders Soltos (🟢 P2)**: Fragmentos como `analog-decay.ts` e `atmosphere.ts` na raiz antiga do canvas estão sem import ativo na renderização.
9. **Variável de Cor Inutilizada (🟢 P2)**: `var(--color-redAccent)` em `globals.css` não tem utilidade semântica para a UI atual e deve ser removida.
10. **Unlisted Binaries (🟢 P2)**: Binários e dependências globais não listadas nos testes (vitest referenciado em templates de workers).

## 2. Matriz por Página com Status

| Página / Rota | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados | Dependências Inúteis |
| --- | --- | --- | --- |
| Home (`/`) | Ativa | Hooks e Shaders em `canvas/home/hero/` sem uso | `framer-motion` constando como missing |
| Sobre (`/sobre`) | Ativa | Exportação não usada `OriginMediaStage` | N/A |
| Portfolio (`/portfolio`) | Ativa | `LiquidEther.tsx` comentado | N/A |
| Admin (`/admin`) | Ativa | Tipos `NavItem` e `ErrorReport` órfãos | N/A |
| Projetos (`/projects`) | Ativa | Componentes ALPA obsoletos e esquecidos | N/A |

## 3. Backlog Priorizado

**[P0] Crítico:** (Dependências pesadas não utilizadas ou imports quebrados)
* Resolver imports fantasmas e dependências de teste ausentes detectadas no ESLint (Prettier e TS Eslint).
* Solucionar o import fantasma de `framer-motion` no `scroll-text.tsx` do Ghost Design System.

**[P1] Estrutural:** (Componentes inteiros, hooks ou rotas não utilizadas)
* Deletar o diretório `src/lib/webgl/liquid-ether/` e o componente `LiquidEther.tsx` que foram substituídos/desativados.
* Excluir componente `TextReveal.tsx` não importado.
* Limpar os hooks órfãos localizados em `src/components/canvas/home/hero/hooks/`.
* Excluir arquivos redundantes do pipeline antigo ALPA.

**[P2] Polimento:** (Assets 3D soltos, variáveis CSS ou tipos)
* Remover as variáveis de ambiente sem uso, como a cor de suporte `redAccent` do `globals.css`.
* Limpar exportações de tipagens duplicadas e inúteis (`OriginMediaStage`, `NavItem`, `ErrorReport`).
* Excluir shaders que ficaram órfãos (`analog-decay.ts`, `atmosphere.ts`).

## 4. Plano de Correção em Ciclos

* **Ciclo 1: Rápido (Quick Wins)**
  * **Ação 1:** Deletar `TextReveal.tsx` e remover `var(--color-redAccent)` do CSS.
  * **Ação 2:** Remover exportações não usadas de tipagens (`NavItem`, `ErrorReport`) e a duplicata `OriginMediaStage`.
  * **Ação 3:** Excluir os shaders (`analog-decay.ts`, `atmosphere.ts`) da pasta legada de canvas.

* **Ciclo 2: Estrutural**
  * **Ação 1:** Remover permanentemente o componente morto `LiquidEther.tsx` e seu repositório local de utilitários `src/lib/webgl/liquid-ether/`.
  * **Ação 2:** Excluir todos os hooks não utilizados na pasta `src/components/canvas/home/hero/hooks/` (`useGhostAnimate.ts`, `useGhostParams.ts`, etc).
  * **Ação 3:** Fazer a varredura da pasta de templates ALPA para remoção segura de blocos de projeto legados não importados.

* **Ciclo 3: Polimento**
  * **Ação 1:** Atualizar as definições de dependências de desenvolvimento no `package.json` para adicionar ou remover as correlações com os plugins do Eslint apontados como ausentes.
  * **Ação 2:** Auditar as instâncias de animações `framer-motion` nos componentes filhos e verificar por que a dependência foi listada como órfã no Design System.
  * **Ação 3:** Garantir que o ambiente local roda com `pnpm run build-check` sem apresentar avisos de *Unused Exports* via Knip.
