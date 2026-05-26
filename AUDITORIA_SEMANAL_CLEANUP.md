# Auditoria Semanal de Cleanup (Clean-up & Dead Code Elimination)

## 1. Resumo Executivo
Os TOP 10 problemas críticos encontrados nesta varredura de limpeza focam em dependências não utilizadas, arquivos vazios/desconectados e exportações mortas.

1.  **Dependências Órfãs Identificadas:** Bibliotecas presentes no `package.json` sem chamadas ativas (`@react-three/drei`, `firebase-functions`, `autoprefixer`).
2.  **Duplicidade de Roteamento:** Existem dois diretórios para renderização de projetos: `src/app/portfolio/[slug]` e `src/app/projects/[slug]`.
3.  **Arquivos Mortos:** Arquivos identificados pelo Knip como totalmente não utilizados (ex: `src/hooks/useIsMounted.ts`, `src/lib/database.types.ts`).
4.  **Exportações Não Utilizadas:** Funções e tipos exportados que não possuem importadores (ex: `injectSupabaseProxy` em `src/lib/supabase/urls.ts`).
5.  **Divergência de Template V3:** O documento de arquitetura (`RULES-PORTFOLIO-STRUCTURE.md`) aponta para uso do ALPA V3. O `src/app/projects/[slug]/page.tsx` chama esse template dinamicamente, enquanto `src/app/portfolio/[slug]/page.tsx` ainda usa formatação estática manual (Markdown + blocos de mídia).
6.  **Tipagens Órfãs:** `src/lib/supabase.types.ts` exporta `Tables` que não é utilizado ativamente pelo runtime Next.js.
7.  **Componentes Fantasmas:** Dependências marcadas como ausentes no `.eslintrc.js` do diretório `test/`.
8.  **Imports Não Resolvidos em Scripts:** Os scripts de build/geração (`scripts/build-catalog.js`) possuem referências para caminhos inexistentes (`../lib/skill-utils`).
9.  **Falta de Assets 3D Estáticos:** Não há referências explícitas à inicialização de `.glb`/`.gltf` em pastas de UI além dos utilitários padrões; verificar se texturas soltas são necessárias.
10. **TailwindCSS V4 Artifacts:** Dev dependencies como `autoprefixer` possivelmente redundantes na nova versão V4 do Tailwind.

## 2. Matriz por Página com Status

| Página / Rota | Status | Arquivos Órfãos Encontrados | Dependências Inúteis |
| :--- | :--- | :--- | :--- |
| **HOME** (`/`) | Ativa | N/A | `autoprefixer` (devDep) |
| **SOBRE** (`/sobre`) | Ativa | N/A | N/A |
| **PORTFOLIO** (`/portfolio`) | Ativa | `src/hooks/useIsMounted.ts` | N/A |
| **PROJETO (V3)** (`/projects/[slug]`) | **Ativa/Duplicada** | N/A | N/A |
| **PROJETO (Legacy)** (`/portfolio/[slug]`) | **Obsoleta/Duplicada** | N/A | N/A |
| **CONTATO** (`/contato`) | Ativa | N/A | N/A |
| **ADMIN** (`/admin`) | Ativa | N/A | `firebase-functions` |
| **3D CANVAS** (`src/components/canvas`) | Ativa | N/A | `@react-three/drei` (Reavaliar)* |

> *Nota: `@react-three/drei` consta como unused pelo `knip`, mas é uma dependência complexa; sua remoção necessita testes rigorosos na home.*

## 3. Backlog Priorizado

### [P0] Crítico (Resolver Imediatamente)
- Remover dependência `firebase-functions` do `package.json` raiz.
- Analisar `@react-three/drei` e confirmar se é um falso-positivo ou remover.
- Resolver a concorrência de roteamento: `/projects/[slug]` vs `/portfolio/[slug]`. Recomenda-se eleger uma única fonte da verdade, baseada na documentação (`/portfolio/[slug]` com a renderização ALPA V3 do `/projects`).
- Arrumar scripts quebrados (`build-catalog.js`).

### [P1] Estrutural (Refatoração)
- Deletar arquivos `.ts` e `.tsx` mortos (`useIsMounted.ts`, `database.types.ts`).
- Limpar exportações não utilizadas listadas:
  - `toStoragePath` em `src/lib/admin/transformers/landing-page.ts`
  - `default` em `src/lib/antigravity/prompts.ts`
  - `injectSupabaseProxy` em `src/lib/supabase/urls.ts`
  - `CRITICAL_VIDEO_URLS` em `src/lib/video-assets.ts`

### [P2] Polimento (Assets e Tipos)
- Excluir tipagens mortas (`ErrorReport`, `Tables`).
- Confirmar e remover `autoprefixer` (Tailwind V4 nativo).
- Limpar configuração de eslint não resolvida no diretório `test/`.

## 4. Plano de Correção em Ciclos

**Ciclo 1: Rápido (Quick Wins)**
1. Executar a desinstalação segura de dependências: `pnpm remove firebase-functions autoprefixer`.
2. Remover os arquivos `src/hooks/useIsMounted.ts` e `src/lib/database.types.ts`.
3. Limpar as exportações mortas nos utilitários.

**Ciclo 2: Estrutural (Roteamento e Renderização)**
1. Mover o componente de renderização ALPA V3 de `/projects/[slug]` para `/portfolio/[slug]` (ou vice-versa, mantendo a consistência dos links na UI).
2. Deletar a rota Next.js duplicada.
3. Atualizar os scripts Python e JS afetados pelos erros de path.

**Ciclo 3: Polimento**
1. Testar intensivamente a camada 3D após validação do `@react-three/drei`.
2. Limpar referências a tipos removidos.
3. Atualizar o documento `.context/DOCS-PORTFOLIO-PAGES/RULES-PORTFOLIO-STRUCTURE.md` confirmando a unificação de rotas.
