# AUDITORIA_SEMANAL_CLEANUP.md

## 1. Resumo Executivo

Esta auditoria avalia a saúde estrutural, dependências órfãs e componentes inutilizados na aplicação Next.js (App Router). Identificamos gargalos significativos que impactam o build e geram excesso de peso no bundle final (especialmente em componentes admin/canvas importados desnecessariamente).

**TOP 10 Problemas Críticos Encontrados:**

1. [RESOLVIDO] Variáveis de ambiente falhando no build (`validate-env` endurecido em `src/lib/env.ts`).
2. [RESOLVIDO] Dependências desnecessárias removidas (`firebase-admin`, `@dataconnect/*`).
3. [RESOLVIDO] Arquivos órfãos em `/src/components/admin` deletados.
4. [RESOLVIDO] Modelo mental de "Beliefs" removido (`src/store/beliefStore.ts`, `src/config/beliefs.ts`).
5. Configuração severa do servidor em `src/lib/server-env.ts` (Pendente revisão de uso).
6. [RESOLVIDO] Tipagens e funções exportadas soltas limpas (`fadeInUp`, `shuffle` aliases).
7. [RESOLVIDO] Componentes legados (`AssetInteractive.tsx`, `BlockTextMd.tsx`) deletados.
8. [RESOLVIDO] Rota órfã `src/app/(sobre)/o-que-me-move` deletada.
9. [RESOLVIDO] Funções de utils desconectadas em `src/lib/portfolio/` consolidadas.
10. [EM PROGRESSO] O pacote `depcheck` sendo adicionado às devDependencies.

## 2. Matriz por Página com Status

Abaixo a comparação cruzada entre o que a arquitetura e a regra estipulavam vs. o que de fato está rodando no Next.js (Baseado na leitura do `src/app` e `.context/DOCS-PORTFOLIO-PAGES`).

| Página / Rota       | Status (Ativa/Obsoleta/Incompleta) | Status de Limpeza                                                                                          | Dependências Inúteis                                |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `/` (Home)          | Ativa                              | [LIMPO] `Aurora.tsx` e variantes órfãs removidos.                                                          | N/A                                                 |
| `/sobre`            | Ativa                              | [LIMPO] Rota `o-que-me-move` e logic de `beliefs` removidos.                                               | `src/store/beliefStore.ts`, `src/config/beliefs.ts` |
| `/portfolio`        | Ativa                              | [LIMPO] Variantes `fadeInUp` e logic legada removidos.                                                     | N/A                                                 |
| `/portfolio/[slug]` | Ativa (Transição para ALPA v3)     | [LIMPO] Componentes legados `AssetInteractive`, `BlockTextMd` removidos.                                   | N/A                                                 |
| `/admin`            | Incompleta/Ativa                   | [LIMPO] Layouts modulares órfãos removidos. Dashboard agora usa componentes V3.                            | [REMOVIDO] `@dataconnect/*`                         |

## 3. Backlog Priorizado

- **[P0] Crítico:**
  - Desativar bypass do `validate-env` (falha grave no pipeline do vercel/build que barra a publicação).
  - Remover pacotes do backend (Firebase/Dataconnect) e `firebase-admin` do root package caso de fato não sejam consumidos localmente (verificar conflito de funções no deploy Firebase vs Vercel).
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
  - Rodar `pnpm remove firebase-admin @dataconnect/admin-generated @dataconnect/generated @radix-ui/react-label`.
  - Remover os arquivos listados diretamente pelo Knip: `src/components/admin/AdminPageHeader.tsx`, `src/components/admin/TemplateBadge.tsx`, `src/store/beliefStore.ts`, `src/config/beliefs.ts`.
  - Excluir o diretório Next `src/app/(sobre)/o-que-me-move`.
  - Limpar as funções órfãs dentro dos arquivos de utilitários e variants (ex: remover `getRandomFeaturedProjectBackgroundVariant`, `getFadeInUp`, `ghostSlide`).

- **Ciclo 2: Estrutural**
  - Avaliar o módulo `/admin`. Se os componentes `TemplateBadge` e `AdminPageHeader` forem mesmo inúteis, validar se existem quebras nos formulários.
  - Remover `src/components/projects/templates/AssetInteractive.tsx` e `BlockTextMd.tsx`, garantindo que os blocos textuais da v3 e fallback de mídias não estejam quebrando.
  - Corrigir o script de CI (`validate-env.ts`) para lidar adequadamente com warnings, evitando crash total sem `.env`.

- **Ciclo 3: Polimento**
  - Otimização do `motion.ts` para manter só as curves `GHOST_EASE` estritas usadas no Framer Motion.
  - Validação profunda das imagens do 3D WebGL para garantir que componentes suspensos como `GhostCanvas` e `HeroGlassCanvas` não causem lazy load problems e remover os presets de R3F se não utilizados.
  - Atualizar o arquivo `.agent` com essa nova baseline mais limpa e refinar o `tsconfig.json` para refletir as deleções.
