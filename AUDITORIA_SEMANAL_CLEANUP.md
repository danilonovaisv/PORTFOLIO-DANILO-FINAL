# AUDITORIA SEMANAL: CLEANUP E DEAD CODE ELIMINATION

**Data da Auditoria:** 23 de Maio de 2024
**Repositório:** [https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL]

---

## 1. Resumo Executivo
Nesta auditoria técnica, focamos na eliminação de código morto, dependências desnecessárias e identificação de componentes obsoletos, cruzando o estado atual do repositório (`src/app`, `src/components`, `package.json`) com a documentação estrutural (`RULES-PORTFOLIO-STRUCTURE.md`). O projeto encontra-se em ótimo estado estrutural, com 100% de compliance nas rotas documentadas contra as implementadas (validado via script), porém identificamos oportunidades de polimento no bundle e higiene de código.

**TOP 10 Problemas Encontrados:**
1.  **Duplicate Exports:** O componente `src/components/sobre/origin/OriginComponents.tsx` contém uma exportação duplicada de `OriginStickyGallery` ou `OriginMediaStage`, o que pode causar ambiguidade no bundle e em refatorações futuras.
2.  **Unused Exports (Código Morto):** O construto `OriginMediaStage` em `src/components/sobre/origin/OriginComponents.tsx` (linha 234) está sendo exportado mas não é utilizado em lugar algum do app.
3.  **Tipagens Órfãs:** `NavItem` (`src/components/layout/header/mobile/index.ts`) e `ErrorReport` (`src/lib/schemas/error-report.ts`) são exportados, mas não consumidos.
4.  **Configurações do Knip Desatualizadas:** O `knip.json` aponta para entradas top-level ausentes ou sobrepostas (`src/app/**/*.{js,jsx,ts,tsx}` e `src/**/*.{js,jsx,ts,tsx}`), gerando ruído no CI e atrapalhando a análise de código morto real.
5.  **Componentes "Legacy" Pendentes:** O componente `LegacyBlockEditor.tsx` (em `src/components/admin/landing-pages/`) ainda está presente e atua como fallback no switch de templates, apesar do projeto já estar na V3 do modelo ALPA (`MasterProjectTemplateV3Editor`).
6.  **Variantes CSS/Framer Mortas:** Configurações de animações podem estar superdimensionadas ou inutilizadas. A diretriz de "Silent Design" exige remoção de lógica desnecessária que aumente o parse JS (framer-motion reportado em falsos positivos do depcheck devido ao uso indireto, mas requer revisão).
7.  **Rotas de API Obsoletas (Risco):** O diretório `src/app/api/admin/storage/` possui scripts soltos. Como grande parte do gerenciamento vai via Supabase/Triggers/Scripts Python de admin, é preciso validar se essas rotas Next.js de API ainda são a _source of truth_ do envio.
8.  **Pastas vazias ou redundantes (Potencial):** Em `src/components/admin/templates/`, existem versões antigas convivendo com a v3.
9.  **Dependências ausentes no setup de teste:** O `depcheck` acusa falta de dependências de lint (e.g. `@typescript-eslint/eslint-plugin`, `eslint-config-prettier` no `./test/.eslintrc.js`), indicando desalinhamento de workspace ou que o ambiente de teste local não herda as globais adequadamente.
10. **Unlisted Binaries:** Ferramentas usadas em scripts (`gcloud`, `depcheck`) não estão listadas em `devDependencies`, dependendo do ambiente global do desenvolvedor/CI.

---

## 2. Matriz por Página com Status

A validação de `scripts/validate_structure.py` confirmou que a arquitetura das pastas do DOC bate com as rotas. A análise cruzou a documentação (Sessões) com os componentes Next.js:

| Página / Rota | Status da Rota | Arquivos Órfãos / Dead Code Encontrados | Dependências Inúteis |
| :--- | :--- | :--- | :--- |
| **Home (`/`)** | Ativa | Nenhum código morto direto identificado na árvore principal (`HomeHero`, `PortfolioShowcase`, etc). | `framer-motion` (falso positivo do depcheck, mas atenção a variants não usadas) |
| **Sobre (`/sobre`)** | Ativa | Unused Export `OriginMediaStage` em `OriginComponents.tsx`. Duplicidade de exportação no mesmo arquivo. | N/A |
| **Portfólio (`/portfolio`)** | Ativa | N/A | N/A |
| **Página de Case (`/portfolio/[slug]`)** | Ativa | `LegacyBlockEditor.tsx` (mantido como fallback na view do Admin, afeta a gestão). | N/A |
| **Privacidade (`/privacidade`)** | Ativa | N/A | N/A |
| **O Que Me Move (`/o-que-me-move`)** | Obsoleta? | A documentação indica "Seção 06 - O Que Me Move" dentro de "02-SOBRE". No entanto, existe uma rota física `src/app/o-que-me-move/page.tsx` que diverge do encapsulamento na página Sobre. | N/A |
| **Projects (`/projects/[slug]`)** | Legado | Mantida apenas para redirecionamentos 301 dentro do `portfolio/[slug]`. | N/A |
| **Admin (`/admin`)** | Ativa | Múltiplas gerações de editores de template (`MasterProjectTemplateEditor.tsx`, `MasterProjectTemplateV2Editor.tsx`). | N/A |
| **Mobile Header** | Ativa | Tipo não utilizado `NavItem` em `src/components/layout/header/mobile/index.ts`. | N/A |
| **Monitoramento / Erros**| Ativa | Tipo não utilizado `ErrorReport` em `src/lib/schemas/error-report.ts`. | N/A |

---

## 3. Backlog Priorizado

As ações corretivas para as próximas rodadas, divididas por prioridade:

**[P0] Crítico (Risco de estabilidade e bundle)**
*   **Fix:** Corrigir os alertas do Knip em `OriginComponents.tsx` (Remover exportação duplicada e a exportação do componente não utilizado `OriginMediaStage`).
*   **Remover:** Analisar por que a rota `src/app/o-que-me-move/page.tsx` existe se ela deveria ser apenas uma seção da página Sobre, evitando páginas fantasmas indexáveis que não possuam a shell principal.

**[P1] Estrutural (Refatoração)**
*   **Depreciação V3:** Iniciar a remoção controlada do `LegacyBlockEditor.tsx` e dos editores V1/V2 do Admin se a migração dos dados já estiver 100% no padrão ALPA V3.
*   **Limpeza de APIs de Admin:** Auditar `src/app/api/admin/storage/init-bucket/route.ts` e afins. Garantir que as funções de mutação sejam consolidadas no novo padrão de Server Actions ou via Firebase/Supabase direto.
*   **Knip Configuração:** Limpar o `knip.json` (remover padrões ausentes `src/app/**/*.{js...}` sobrepostos por `src/**`) para automatizar a garantia de código limpo.

**[P2] Polimento (Desenvolvedor Experience e Dependências)**
*   **DevDependencies:** Adicionar `depcheck` ao `package.json` em vez de depender de invocação por `pnpm dlx`. Adicionar `gcloud` check se usado em scripts de deploy de CI.
*   **Higiene de Tipos:** Remover a exportação (ou remover totalmente se não usado) dos tipos `NavItem` e `ErrorReport`.
*   **Testes lint:** Atualizar o `test/.eslintrc.js` para possuir todas as deps ou herdar estritamente do root.

---

## 4. Plano de Correção em Ciclos

Abaixo, os próximos prompts/comandos sugeridos para executar a limpeza efetiva, mantendo a estabilidade.

### Ciclo 1: Rápido (Quick Wins)
1.  **Remover Exports não utilizados:** Editar `src/components/sobre/origin/OriginComponents.tsx` para remover `export` de `OriginMediaStage` (ou remover o componente se inútil). Corrigir a duplicidade indicada pelo knip.
2.  **Limpar Tipagens:** Em `src/components/layout/header/mobile/index.ts` e `src/lib/schemas/error-report.ts`, remover a palavra-chave `export` ou o tipo inteiro se for peso morto.
3.  **Configurar Knip corretamente:** Atualizar `knip.json` removendo a redundância apontada pelos warnings.

### Ciclo 2: Estrutural (Rotas e Legado)
1.  **Limpar a Rota Fantasma:** Avaliar a exclusão do diretório `src/app/o-que-me-move/` se a "Seção 06" já estiver adequadamente injetada em `src/app/sobre/page.tsx`.
2.  **Verificar e Decomissionar o Legado (Admin):** Checar o banco de dados. Se não houver mais templates do tipo `MASTER_PROJECT_TEMPLATE` "puro" (sem versão), remover os arquivos associados ao V1, mantendo o switch apenas em V2 e V3, e deletar `LegacyBlockEditor.tsx`.

### Ciclo 3: Polimento (Assets, Deps, Docs)
1.  **Resolver Tooling em `package.json`:** Adicionar dependências faltantes acusadas pelo Depcheck (`@typescript-eslint/eslint-plugin`, etc.) se o ambiente local de testes for continuar separado.
2.  **Revisão Final 3D (R3F):** Mapear as texturas utilizadas em `GhostCanvas` e `ShaderSection` contra a lista de assets no Supabase Storage para confirmar a exclusão de arquivos `.glb` ou `.png` não referenciados via código (fase a ser combinada com o script Python do `assets:audit`).
