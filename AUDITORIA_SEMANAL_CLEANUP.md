# AUDITORIA_SEMANAL_CLEANUP.md

## 1. Resumo Executivo

Os top 10 problemas críticos encontrados focam no acúmulo de código que impacta a performance de pacotes e a manutenção do sistema:

1. **Componentes R3F Obsoletos:** `src/components/canvas/home/hero/` contém diversos sub-arquivos `hooks/`, `shaders/` e componentes aparentemente não utilizados no App Router principal, impactando a manutenção.
2. **Dependência `depcheck` Faltante no Caminho Local:** O pnpm não conseguiu encontrar `depcheck` corretamente via `$PATH`, o que sugere um estado inconsistente no `.npmrc` ou instalações globais quebradas.
3. **Módulo de Projetos Alpa (V3) Não Integrado:** A pasta `src/components/projects/templates/alpa/` tem inúmeros componentes (blocks, layouts) sem correspondência de importação no diretório de admin ou page views.
4. **Formulários de Admin Desativados:** Vários arquivos em `src/components/admin/form-sections/` não são importados no roteador do app e estão órfãos.
5. **Assets 3D e Texturas Dinâmicas:** Há suspeitas de texturas 3D ligadas à `GhostScene` que podem não ser baixadas ou chamadas se `src/components/canvas` for código obsoleto em relação ao novo `GhostCanvas.tsx`.
6. **Variáveis/Exportações Duplicadas:** O sistema Knip reportou conflitos como `ORIGIN_CHAPTERS|ORIGIN_CONTENT` em `src/components/sobre/origin/data.ts`.
7. **Pacotes Não Usados em `package.json`:** `react-markdown` pode não estar sendo utilizado ou foi substituído pelo próprio rendering do Contentlayer/Supabase (carece de aprofundamento, mas Knip também falhou inicialmente).
8. **Configurações Knip Errôneas:** Há configurações soltas apontando para locais incorretos (`src/app/**/*.{js,jsx,ts,tsx}` vs `workspaces`).
9. **Componente de Cursor Duplicado:** `GhostCursor.tsx` na raiz de `components` e um possível equivalente (ou desatualizado) dentro de outros contextos.
10. **Lixo de Arquivos Antigos:** A presença de um arquivo `.bak` (`shader-lines.tsx.bak`) e ferramentas mortas ocupando espaço no `src/components/ui`.

## 2. Matriz por Página com Status

| Página / Rota                   | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados                                                     | Dependências Inúteis                          |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| `app/page.tsx` (Home)           | Ativa                              | Arquivos em `components/canvas/home/hero/*` aparentemente órfãos ou refatorados | —                                             |
| `app/portfolio/page.tsx`        | Ativa                              | —                                                                               | —                                             |
| `app/portfolio/[slug]/page.tsx` | Ativa                              | —                                                                               | —                                             |
| `app/sobre/page.tsx`            | Ativa                              | —                                                                               | —                                             |
| `app/contato/page.tsx`          | Ativa                              | —                                                                               | —                                             |
| `app/qr-scanner/page.tsx`       | Ativa                              | —                                                                               | —                                             |
| `app/o-que-me-move/page.tsx`    | Ativa                              | —                                                                               | —                                             |
| `app/admin/...`                 | Ativa                              | `form-sections/*` e `landing-pages/LegacyBlockEditor.tsx`                       | `react-hook-form` pode ter peças legadas aqui |
| `app/projects/[slug]/page.tsx`  | Incompleta/Obsoleta                | `templates/alpa/*`                                                              | —                                             |
| `app/privacidade/page.tsx`      | Ativa                              | —                                                                               | —                                             |

_(Nota: Alguns componentes de `alpa` foram mencionados na DOC como "Renderizada dinamicamente em `/portfolio/[slug]`", indicando que eles podem ser carregados por caminhos de `types` ou DB dinâmicos não detectáveis puramente por grep. Precisaremos validá-los no Ciclo 2)_

## 3. Backlog Priorizado

**[P0] Crítico:**

- Analisar a estrutura de imports dinâmicos do ALPA V3 (`src/components/projects/templates/alpa/`). Se forem renderizados dinamicamente a partir do banco, não devem ser apagados ainda.
- Verificar se a nova arquitetura unificou `GhostCanvas` e deixou `components/canvas/home/hero/` completamente obsoleto. Se sim, excluir tudo em `canvas/home/hero/`.
- Resolver o arquivo de backup `.bak` em `components/ui/` que infla o bundle.

**[P1] Estrutural:**

- Limpar formulários e seções não utilizadas no painel admin (`src/components/admin/form-sections/` e `templates/v3/presets.ts`).
- Identificar se a rota `app/projects/[slug]/page.tsx` (vs `app/portfolio/[slug]/page.tsx`) está redundante.

**[P2] Polimento:**

- Arrumar os avisos do script Knip relacionados às exportações duplicadas e variáveis não utilizadas.
- Deletar a extensão `knip.json` se não for usada, ou fixá-la.
- Remover imports de ferramentas não utilizadas, re-auditando dependências com npm/pnpm corrigido.

## 4. Plano de Correção em Ciclos

- **Ciclo 1: Rápido (Quick Wins)**
  - Deletar arquivos óbvios de backup (ex: `src/components/ui/shader-lines.tsx.bak`).
  - Corrigir as exportações duplicadas apontadas pelo `knip` em `src/components/sobre/origin/data.ts`.
  - Deletar os arquivos da pasta `src/components/canvas/home/hero/` APÓS validação manual de que o `GhostCanvas` está utilizando outra estrutura.

- **Ciclo 2: Estrutural**
  - Investigar a rota `app/projects/[slug]/page.tsx` comparando-a com `app/portfolio/[slug]/page.tsx`. Se for legada, solicitar exclusão.
  - Realizar uma varredura sobre os blocos dinâmicos (`ALPA V3`) e os componentes em `src/components/admin/form-sections/` para confirmar a desconexão ou dependência implícita, deletando o que for inútil.

- **Ciclo 3: Polimento**
  - Rodar `depcheck` com o pnpm propriamente configurado ou através do Node local e limpar pacotes órfãos em `package.json`.
  - Atualizar o diretório `.context/DOCS-PORTFOLIO-PAGES` para refletir as remoções de rotas legadas e componentes mortos.
