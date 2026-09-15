# AUDITORIA_SEMANAL_CLEANUP.md

## 1. Resumo Executivo

Esta auditoria é um levantamento atualizado das dependências, arquivos órfãos, e desalinhamentos entre a documentação de arquitetura e o código-fonte atual (App Router) do portfólio. Identificamos gargalos, resíduos de antigas implementações e dependências quebradas.

**TOP 10 Problemas Críticos Encontrados:**

1. **Dependências desnecessárias no `package.json`:** `server-only` não está sendo utilizada por nenhum arquivo e pode ser removida.
2. **Dependências ausentes no ambiente de desenvolvimento:** `framer-motion` não está declarada explicitamente, e é requerida por `.context/Ghost-Design-System/src/components/ui/scroll-text.tsx`. Além disso, dependências de Lint (`@typescript-eslint/eslint-plugin`, `eslint-plugin-prettier`, `eslint-config-prettier`) faltam para resolver a configuração no diretório `test/`.
3. **Exportações Órfãs Identificadas pelo Knip (Funções):** `toStoragePath` em `src/lib/admin/transformers/landing-page.ts`, `injectSupabaseProxy` em `src/lib/supabase/urls.ts`, export default em `src/lib/antigravity/prompts.ts`, e constantes não usadas como `CRITICAL_VIDEO_URLS` em `src/lib/video-assets.ts`.
4. **Variantes do Framer Motion Inutilizadas:** A configuração em `src/lib/motion/reveal.ts` exporta `ghostReveal`, `ghostRise`, `ghostFade`, e `ghostRevealSimple` que nunca são chamadas. Além de `eyebrowVariants` em `src/lib/motion/hero.ts` e `viewportConfig` em `src/lib/motion/viewport.ts`.
5. **Tipagens Exportadas Sem Uso (Types/Interfaces):** `NavItem` em `src/components/layout/header/mobile/index.ts`, `ErrorReport` em `src/lib/schemas/error-report.ts` e `Tables` em `src/lib/supabase.types.ts`.
6. **Código Morto em Utilitários de Portfolio:** Funções como `shuffleHomeProjectsLive` e `shufflePortfolioProjectsLive` não existem mais ou estão documentadas em docs antigos, mas `shuffleProjects` (que os substituiu) continua existindo e está ativa e sendo importada.
7. **Arquivos Antigos Removidos Mas Retidos na Documentação:** A documentação antiga listava arquivos como `AdminPageHeader.tsx`, `TemplateBadge.tsx`, `AssetInteractive.tsx`, `BlockTextMd.tsx`, `beliefStore.ts` e a pasta de rotas `o-que-me-move`. Todos estes **já foram excluídos** do repositório físico e não existem mais, porém o documento de referências antigas (`docs/AUDITORIA_SEMANAL_CLEANUP.md`) ainda falava deles. Esse desalinhamento causa ruído para IAs no projeto.
8. **Configurações Knip Erradas:** O arquivo `knip.json` aponta para diretórios e extensões que conflitam (ex: `.css` sendo carregado por entrypoints que knip descarta), e precisa de ajustes nas chaves `workspaces` ou remoção de padrões duplicados de globs.
9. **Desalinhamento Rota / Documentação (Admin):** O admin tem muitas pastas e rotas (como `copy-agent`, `midia`, `tags`, `scene-generator`) documentadas na pasta `.context/DOCS-PORTFOLIO-PAGES/04-ADMIN`, no entanto, não está claro se todas essas sub-rotas protegidas ainda recebem manutenção ativa dado os warnings contínuos da ferramenta de lint/typecheck nesses diretórios (ex: formulários e views).
10. **Desvio de Implementação de Background 3D vs Fallbacks:** O documento de arquitetura fala de `ShaderSection`, `Aurora.tsx`, `GhostScene` e Fallbacks. `Aurora.tsx` não está presente. O webgl reside estritamente em `src/components/canvas/`.

## 2. Matriz por Página com Status

| Página / Rota | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados | Dependências Inúteis |
| :--- | :--- | :--- | :--- |
| `/` (Home) | Ativa | Exportações inúteis em `src/lib/motion/reveal.ts` (ex: `ghostRise`, `ghostFade`). | N/A |
| `/sobre` | Ativa | N/A (A rota isolada `o-que-me-move` já foi removida da base de código). | N/A |
| `/portfolio` | Ativa | N/A | N/A |
| `/portfolio/[slug]` | Ativa (Usando V3 ALPA Renderer) | N/A (Componentes antigos como `BlockTextMd.tsx` já foram expurgados). | N/A |
| `/admin` | Incompleta/Ativa | `src/lib/admin/transformers/landing-page.ts` (export `toStoragePath`). | N/A |
| `/contato` | Ativa | N/A | N/A |
| `/privacidade` | Ativa | N/A | N/A |
| Global / Libs | N/A | Tipagens `NavItem`, `ErrorReport`, `Tables`; Funções `injectSupabaseProxy`, etc. | `server-only` |

## 3. Backlog Priorizado

*   **[P0] Crítico:** Dependências e Typescript.
    *   Remover a dependência inútil `server-only`.
    *   Adicionar as dependências de lint faltantes (`@typescript-eslint/eslint-plugin`, `eslint-plugin-prettier`, `eslint-config-prettier`) no `package.json` para que o teste passe corretamente e as IDEs não acusem dependência fantasma.
    *   Atualizar o `knip.json` para resolver os warnings de `Configuration hints`.

*   **[P1] Estrutural:** Exportações Mortas de Configurações e Funções.
    *   Eliminar as variantes não chamadas em `src/lib/motion/reveal.ts` (`ghostReveal`, `ghostRise`, etc.) e em `src/lib/motion/hero.ts` e `viewport.ts`.
    *   Deletar as exportações que sobram nos helpers administrativos (`toStoragePath`).
    *   Deletar `CRITICAL_VIDEO_URLS` do arquivo `src/lib/video-assets.ts`.
    *   Remover as tipagens obsoletas (`NavItem`, `ErrorReport`, `Tables`).

*   **[P2] Polimento:** Documentação e Limpeza de Lixo.
    *   Atualizar os arquivos Markdown dentro de `docs/` (ex: `AUDITORIA_SEMANAL_CLEANUP.md` e `AUDITORIA_SOBRE_PORTFOLIO.md`) para não listarem mais os problemas resolvidos em ciclos passados, como a exclusão do Zustand de `beliefs` e o lixo do DataConnect/Firebase que já sumiu do projeto.
    *   Garantir que a documentação dentro de `.context/DOCS-PORTFOLIO-PAGES/` reflita 100% o estado atual (ex: ALPA V3 renderer é o padrão-ouro e componentes de legado MDX/V1 sumiram).

## 4. Plano de Correção em Ciclos

*   **Ciclo 1: Rápido (Quick Wins)**
    *   No terminal, remover pacote não utilizado: `pnpm remove server-only`.
    *   Instalar dependências de dev em falta: `pnpm add -D @typescript-eslint/eslint-plugin eslint-plugin-prettier eslint-config-prettier`.
    *   Deletar exportações soltas marcadas pelo `knip`: (1) funções (`toStoragePath`, `injectSupabaseProxy`), (2) constantes soltas de motion (`eyebrowVariants`, `ghostFade`, etc.), (3) defaults inúteis e types (`NavItem`, `ErrorReport`).

*   **Ciclo 2: Estrutural**
    *   Refatorar os imports dentro de `test/` caso algo quebre com as novas dependências de ESLint (ajustar `.eslintrc.js` local se existir).
    *   Revisar o arquivo `knip.json` (root) para remover menções a entradas inválidas (ex: extensões CSS não processadas e diretórios antigos de glob).
    *   Fazer uma rodada de verificação nos forms do dashboard de administração para confirmar que as exclusões utilitárias de admin (ex: transformers) não quebraram algum lazy-load indireto de Server Actions.

*   **Ciclo 3: Polimento**
    *   Sincronizar todo esse novo artefato limpo para dentro de `.context/DOCS-PORTFOLIO-PAGES`, substituindo as regras passadas, para que o modelo do agente pare de tentar buscar (ou apagar) arquivos já extintos em prompts futuros.
    *   Rodar `pnpm run build-check` para assegurar que Typescript, ESLint e depcheck apresentem um build final com zero ruído e zero dependências fantasmas.
