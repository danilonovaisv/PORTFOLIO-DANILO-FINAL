# TASK-06: Home Animated Backgrounds com Aurora Restaurado

## Objetivo

Restaurar a rotação aleatória entre as três animações de background dos cards destacados da Home e recuperar o variant `aurora`.

## Sessão/Ação do ADMIN afetada

- Sessão: `Trabalhos`
- Bloco público: cards destacados da Home

## Arquivos envolvidos

- `src/components/home/featured-projects/FeaturedProjectCard.tsx`
- `src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx`
- `src/components/home/featured-projects/animated-backgrounds.ts`
- `src/components/GhostCursor.tsx`

## Sintoma anterior

- A animação `Aurora` não aparecia.
- Os cards não rotacionavam corretamente entre as três opções disponíveis.

## Causa-raiz confirmada

- O mecanismo de troca de variant não garantia alternância viva em runtime.
- Havia instabilidade no wrapper do background interativo, inclusive risco de colapso de altura em cenários de renderização.

## Implementação aplicada

- Foi criado `getNextFeaturedProjectBackgroundVariant` para escolher um próximo variant diferente do atual.
- O card destacado passou a rotacionar o background em loop controlado quando estiver visível.
- O wrapper do `GhostCursor` foi endurecido com dimensões explícitas (`h-full`, `w-full`) e resize mais resiliente.

## Dependências e impacto no ADMIN

- O ADMIN continua sem precisar escolher manualmente o variant; a rotação permanece automática.
- A Home depende do runtime client-side e respeita `prefers-reduced-motion`.

## Edge cases

- Em `prefers-reduced-motion`, a rotação deixa de acontecer.
- Em ambiente dev com HMR intenso podem surgir avisos de WebGL context; validar sempre o comportamento final em build estável.

## Regras para futuras edições

- Manter os três variants registrados (`grainient`, `ghost`, `aurora`).
- Não remover `h-full/w-full` do container do background interativo sem nova validação visual.

## Checklist de validação

- [ ] Os três variants aparecem ao longo do tempo.
- [ ] `Aurora` volta a renderizar.
- [ ] O card não colapsa altura.
- [ ] A rotação pausa quando a seção sai da viewport ou quando motion reduzido estiver ativo.
