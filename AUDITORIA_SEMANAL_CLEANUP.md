# AUDITORIA_SEMANAL_CLEANUP.md (EM EXECUÇÃO)

## 1. Resumo Executivo
Esta auditoria focou na limpeza profunda (Clean-up & Dead Code Elimination) e identificou áreas críticas com código não utilizado, dependências infladas e desalinhamentos com a arquitetura documentada.

**TOP 10 Problemas Críticos:**
1. **Bundle Bloat:** Diversas dependências do `@radix-ui` listadas no `package.json` constam como não utilizadas e inflam a árvore de dependências.
2. **Dependências Dev Não Utilizadas:** O pacote `eslint`, entre outros de configuração (`eslint-config-*`), apontam falhas de peering/verões ou não uso pelo knip.
3. **Componentes Órfãos na UI:** Componentes legados ou substituídos como `ui/MorphText`, `ui/GhostText`, `ui/CompoundPillCTA`, e `ui/carousel` estão na pasta `src/components/ui/` mas parecem não ter referências de importação diretas válidas nas rotas principais.
4. **Arquitetura WebGL Obsoleta/Duplicada:** Há fragmentação de shaders e componentes 3D órfãos, como `canvas/shaders/hero/AnalogShader.ts` e referências desorganizadas a componentes `Ghost` (ex: `GhostCursor`).
5. **Componentes de Seção Redundantes:** Arquivos como `AboutBeliefsNoSSR`, `home/hero/HeroHeader`, e wrappers órfãos (`MotionWrapper`, `AccessibleSplitText`) indicam reescritas de features sem a remoção das versões antigas.
6. **Desalinhamento `sobre/3d` e `canvas/`:** A doc exige `GhostCanvas` como WebGL e existe mistura de implementações em `canvas/home/hero/Atmosphere` e fragmentos órfãos (`Fireflies`, `GhostBody`).
7. **Pacotes Admin Abandonados:** Dependências como `@dataconnect/admin-generated` e `@dataconnect/generated` não são utilizadas ativamente na aplicação final.
8. **Testes Legados Quebrados:** Arquivos como `PortfolioModalRegression.test` e `HeroRegression.test` estão com paths quebrados ou foram abandonados.
9. **Links Quebrados no Supabase (Assets):** Foi detectado que múltiplos links de assets cruciais no Supabase retornam 400 ou falham, indicando arquivos deletados ou movidos. (Afeta performance por fallback).
10. **Tipagens Não Exportadas/Usadas:** Existem dezenas de `types` e `interfaces` (como `PortfolioFilter`, `ProjectModalProps`) no `src/lib/types.ts` e exports nunca invocados.

## 2. Matriz por Página com Status

| Página / Rota | Status (Ativa/Obsoleta/Incompleta) | Arquivos Órfãos Encontrados | Dependências Inúteis |
|---|---|---|---|
| `/` (Home) | Ativa | `home/hero/HeroHeader.tsx`, `GhostAura.tsx`, `useHeroAnimation.ts` | (Nenhuma específica da página) |
| `/sobre` | Ativa | `AboutBeliefsNoSSR.tsx`, fragmentos de `sobre/3d/` e `sobre/what-i-do/DesktopCard.tsx` | (Nenhuma específica) |
| `/portfolio` | Ativa | `ContentContainer.tsx`, `MediaContainer.tsx`, `PortfolioModalRegression.test.tsx` | `embla-carousel-react`, `@radix-ui` parts |
| `/projects/[slug]` | Ativa | `templates/LiquidEther.tsx` | - |
| `/contato` | Ativa | `ContactDetails.tsx` (potencial) | - |
| `/privacidade` | Ativa | - | - |
| `src/components/ui` | Obsoleta (Parcial) | `carousel.tsx`, `calendar.tsx`, `slider.tsx`, `menubar.tsx`, `CTAButton.tsx`, `PrimaryButton.tsx`, `MorphText.tsx`, `GhostText.tsx` | Vários módulos `@radix-ui/*` |
| `src/components/canvas` | Incompleta/Obsoleta | `FluidMaterial.ts`, `FluidGlass.tsx`, `AnalogShader.ts`, `Atmosphere.tsx`, `GhostBody.tsx` | `@react-three/postprocessing` (knip) |


## 3. Backlog Priorizado

- **[P0] Crítico:**
  - Remover dependências não utilizadas reportadas pelo knip (`@radix-ui/*`, `embla-carousel-react`, `@dataconnect/*`).
  - Corrigir imports inválidos em arquivos de teste.

- **[P1] Estrutural:**
  - Excluir componentes UI órfãos (`carousel`, `calendar`, `slider`, `menubar`).
  - Limpar os componentes de Layout e Home que não estão em uso (`HeroHeader`, `GhostAura`).
  - Limpar reescritas no diretório de `sobre/` (`AboutBeliefsNoSSR`).
  - Remover código duplicado de WebGL no diretório `canvas/` e consolidar sob o Ghost System.

- **[P2] Polimento:**
  - Remover exports não utilizados de tipagens, utilitários (`src/lib/colors.ts:hslToString`, etc.) conforme lista do knip.
  - Excluir os testes de regressão órfãos/quebrados.
  - Revisar exports duplicados.

## 4. Plano de Correção em Ciclos

- **Ciclo 1: Rápido (Quick Wins)**
  1. Remover as dependências não usadas via `pnpm remove ...`
  2. Deletar os componentes genéricos da pasta `src/components/ui/` (`carousel.tsx`, `calendar.tsx`, `slider.tsx`, `menubar.tsx`, etc) identificados como não utilizados.
  3. Excluir os exports duplicados e não referenciados em utilitários menores.

- **Ciclo 2: Estrutural**
  1. Revisar e deletar arquivos legados nas páginas Home e Sobre (`GhostAura`, `HeroHeader`, `AboutBeliefsNoSSR`, `DesktopCard.tsx`, `MobileCard.tsx`).
  2. Limpar a pasta `src/components/canvas` dos shaders obsoletos (`AnalogShader`, `Atmosphere`) assegurando fallback apenas ao `GhostCanvas` canônico.
  3. Limpar componentes de conteúdo duplicados no diretório do Portfolio (`ContentContainer`, `MediaContainer`).

- **Ciclo 3: Polimento**
  1. Atualizar e excluir os testes que apontam para arquivos antigos (`HeroRegression.test.tsx`, `PortfolioModalRegression.test.tsx`).
  2. Limpeza profunda de `types`, `interfaces` e exports de métodos que nunca são chamados.
  3. Rodar os scripts de validação de dependências e links do Supabase para garantir que as remoções não causaram regressões.
