# TASK 2 — Padronizacao do MobileStaggeredMenu

- Data: 2026-03-06
- Status: concluido

## Contexto do problema

O header mobile era consumido globalmente, mas a definicao do item ativo e o contrato de props estavam divergentes entre o tipo publico e a implementacao real.

## Comportamento anterior

- na Home, o estado ativo nao refletia corretamente a navegacao principal;
- em paginas como `/sobre`, a prop `isPageActive` acabava colorindo todos os itens como ativos no menu mobile;
- havia duplicacao de tipos entre `types.ts`, `MobileStaggeredMenu.tsx` e `MobileMenuPanel.tsx`.

## Causa raiz

1. Resolucao de rota ativa baseada em heuristicas locais e inconsistentes.
2. Contrato tipado do `MobileStaggeredMenu` desatualizado em relacao ao componente real.
3. Implementacao do painel mobile com logica propria para estado ativo, separada do header principal.

## Solucao implementada

- criada a camada compartilhada `nav-state.ts` para resolver item ativo por rota/ancora;
- o contrato de `MobileStaggeredMenu` foi alinhado ao uso real;
- `MobileStaggeredMenu`, `MobileMenuPanel`, `SiteHeader` e `DesktopFluidHeader` passaram a usar a mesma regra de estado ativo.

## Arquivos modificados

- `src/components/layout/header/nav-state.ts`
- `src/components/layout/header/types.ts`
- `src/components/layout/header/SiteHeader.tsx`
- `src/components/layout/header/MobileStaggeredMenu.tsx`
- `src/components/layout/header/mobile/MobileMenuPanel.tsx`
- `src/components/layout/header/DesktopFluidHeader.tsx`

## Impacto no ADMIN

- nenhum impacto direto no shell do `/admin`, que continua isolado do header publico;
- a documentacao administrativa agora registra a regra oficial do header mobile compartilhado.

## Impacto no Supabase

- nenhum.

## Impacto no front

- Home destaca `home` por padrao e `contato` quando a ancora `#contact` esta ativa;
- `/sobre` destaca apenas `sobre`;
- `/portfolio`, `/portfolio/[slug]` e `/projects/[slug]` destacam `portfólio`;
- a navegacao mobile passa a responder de forma uniforme entre paginas.

## Regra final de funcionamento

- a definicao do item ativo pertence a um helper unico;
- o menu mobile nao pode usar sinalizadores locais para marcar todos os itens como ativos;
- qualquer pagina de case interno deve cair no item `portfólio`.

## Checklist de validacao

- [x] rotas principais mapeadas para um unico helper
- [x] contrato tipado alinhado com implementacao real
- [x] menu mobile deixou de depender de `isPageActive`
- [x] desktop e mobile agora compartilham a mesma regra de item ativo

## Observacoes para manutencao futura

- novas rotas navegaveis devem ser adicionadas primeiro em `nav-state.ts`;
- evitar recriar logica de item ativo dentro dos componentes visuais.
