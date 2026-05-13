# AUDITORIA_SEMANAL_CLEANUP.md

## 1. Resumo Executivo

Esta auditoria avalia a saúde estrutural, dependências órfãs e componentes inutilizados na aplicação Next.js (App Router). Identificamos gargalos significativos que impactam o build e geram excesso de peso no bundle final.

**TOP 10 Problemas Críticos Encontrados:**

1. **Dependências desnecessárias presentes no \`package.json\`:** `@dataconnect/admin-generated`, `@dataconnect/generated`, `@radix-ui/react-label`, `@types/pg` e `pg`.
2. **Arquivos órfãos completos em \`/src/components/admin\` e \`/src/components/projects\`: ** \`AdminPageHeader.tsx\`, \`TemplateBadge.tsx\`, \`AssetInteractive.tsx\` e \`BlockTextMd.tsx\`.
3. **Fragmentos do modelo mental de "Beliefs" que não estão sendo usados:** \`src/store/beliefStore.ts\` e \`src/config/beliefs.ts\`.
4. **Configuração do servidor em \`src/lib/server-env.ts\`:** Que não está sendo invocada em componentes críticos.
5. **Tipagens e funções exportadas soltas:** Como \`getRandomFeaturedProjectBackgroundVariant\`, variantes do framer-motion não usadas como \`fadeInUp\`, e outros utilitários não invocados.
6. **Componentes legados:** \`AssetInteractive.tsx\`, \`BlockTextMd.tsx\` dentro de \`src/components/projects/templates/\` sendo bypassados pela nova engine de templates V3_ALPA.
7. **Pasta \`src/app/(sobre)/o-que-me-move\`:** Configurada como rota Next.js com \`page.tsx\` sem integração coesa com a rolagem unificada do scroll do portfolio descrita na documentação.
8. **Funções de utils desconectadas:** \`shuffleHomeProjectsLive\`, \`shufflePortfolioProjectsLive\` em \`src/lib/portfolio/\`.
9. **Utilitários Supabase gerados soltos:** Arquivos como \`src/lib/database.types.ts\`, e lixos da compilação em \`src/dataconnect-generated\` e \`functions/next_build/src/dataconnect-generated\`.
10. **O pacote \`depcheck\` não listado e algumas dependências de Dev não resolvidas:** (\`@typescript-eslint/eslint-plugin\`, etc.).

## 2. Matriz por Página com Status

Abaixo a comparação cruzada entre o que a arquitetura e a regra estipulavam vs. o que de fato está rodando no Next.js (Baseado na leitura do `src/app` e `.context/DOCS-PORTFOLIO-PAGES`).

| Página / Rota       | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados                                                                                                                               | Dependências Inúteis                                |
| ------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `/` (Home)          | Ativa                              | `animated-backgrounds.ts` (parte das funções como `getRandomFeaturedProjectBackgroundVariant`), `Aurora.tsx` (não importado no knip, verificar uso exato) | N/A                                                 |
| `/sobre`            | Ativa                              | `src/app/(sobre)/o-que-me-move` (rota solta, possivelmente substituída pela âncora unificada)                                                             | `src/store/beliefStore.ts`, `src/config/beliefs.ts` |
| `/portfolio`        | Ativa                              | `PortfolioModal.tsx` variants exportados mas não usados (`fadeInUp`, `getMediaVariants`, etc.)                                                            | N/A                                                 |
| `/portfolio/[slug]` | Ativa (Transição para ALPA v3)     | `AssetInteractive.tsx`, `BlockTextMd.tsx` (não apontam para a nova engine MasterProjectTemplateV3Renderer)                                                | N/A                                                 |
| `/admin`            | Incompleta/Ativa                   | `AdminPageHeader.tsx`, `TemplateBadge.tsx`                                                                                                                | `@dataconnect/admin-generated`                      |

## 3. Backlog Priorizado

- **[P0] Crítico:**
  - Remover dependências pesadas não utilizadas ou imports quebrados invisíveis como `@dataconnect/*`, `@types/pg`, e `pg`.
  - Limpar imports quebrados e exportações perdidas identificadas pelo `npx knip`.

- **[P1] Estrutural:**
  - Deletar `src/components/admin/AdminPageHeader.tsx` e `TemplateBadge.tsx` caso o Dashboard Admin não dependa mais desses layouts modulares.
  - Deletar a rota órfã `src/app/(sobre)/o-que-me-move`. Tudo indica que O Que Me Move agora é um component `<AboutBeliefs />` chamado na rota principal `/sobre`.
  - Remover estado `useBeliefStore` (`src/store/beliefStore.ts`) caso o Zustand não seja a fonte da verdade da rolagem da sessão.
  - Remover componentes legados de `templates/` (`AssetInteractive`, `BlockTextMd`) se a V3 ALPA já possuir implementações dedicadas.

- **[P2] Polimento:**
  - Eliminar exportações mortas em `src/config/motion.ts` (ex: `GHOST_EASE_SOFT`, `ghostTimeBased`).
  - Limpar métodos utilitários obsoletos (ex: `useSiteAssetsByPrefix`, `isMasterProjectTemplateData`).
  - Consolidar exportações de tipos e esquemas no Supabase (limpar Typescript gerado inativo).

## 4. Plano de Correção em Ciclos

- **Ciclo 1: Rápido (Quick Wins)**
  - Rodar `pnpm remove @dataconnect/admin-generated @dataconnect/generated @radix-ui/react-label pg @types/pg`.
  - Remover os arquivos listados diretamente pelo Knip: `src/components/admin/AdminPageHeader.tsx`, `src/components/admin/TemplateBadge.tsx`, `src/store/beliefStore.ts`, `src/config/beliefs.ts`, `src/lib/server-env.ts`.
  - Excluir o diretório Next `src/app/(sobre)/o-que-me-move`.
  - Limpar o lixo das pastas `dataconnect-generated`.
  - Limpar as funções órfãs dentro dos arquivos de utilitários e variants (ex: remover `getRandomFeaturedProjectBackgroundVariant`, `getFadeInUp`, `ghostSlide`).

- **Ciclo 2: Estrutural**
  - Avaliar o módulo `/admin`. Se os componentes `TemplateBadge` e `AdminPageHeader` forem mesmo inúteis, validar se existem quebras nos formulários.
  - Remover `src/components/projects/templates/AssetInteractive.tsx` e `BlockTextMd.tsx`, garantindo que os blocos textuais da v3 e fallback de mídias não estejam quebrando.

- **Ciclo 3: Polimento**
  - Otimização do `motion.ts` para manter só as curves `GHOST_EASE` estritas usadas no Framer Motion.
  - Validação profunda das imagens do 3D WebGL para garantir que componentes suspensos como `GhostCanvas` e `HeroGlassCanvas` não causem lazy load problems e remover os presets de R3F se não utilizados.
  - Atualizar o arquivo `.agent` com essa nova baseline mais limpa e refinar o `tsconfig.json` para refletir as deleções.
