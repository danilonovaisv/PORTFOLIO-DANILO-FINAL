# 06-O-QUE-ME-MOVE

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/sobre/sections/AboutBeliefs.tsx`
- Dependências:
  - Framer Motion (`useScroll`, `useTransform`, `useSpring`)
  - `useBeliefsAnimation`, `useBeliefScroll`
  - `BeliefBackground`, `BeliefOverlay`, `BeliefDesktopTextLayer`, `BeliefMobileTextLayer`, `BeliefFixedHeader`, `BeliefFinalSectionOverlay`
  - R3F (`GhostCanvas`, `GhostScene`, `GhostModel`)

## 1. Objetivo da Página/Sessão

Apresentar o manifesto do designer (O Que Me Move) com alta carga visual e narrativa. O clímax revela a filosofia "Ghost Design" com o elemento 3D interagindo com o scroll.

## 13. Estado Implementado — 2026-04-16 (Atualização de Auditoria)

- Correções aplicadas em `src/components/sobre/sections/AboutBeliefs.tsx` e componentes relacionados:
  - Timeline e Scroll: Corrigido o `offset` do `useScroll` de `['start start', 'end end']` para `['start end', 'end end']` em `AboutBeliefs`, `BeliefFixedHeader`, e `useBeliefScroll` para garantir que as animações de scroll, opacidade e troca de cor (HLS do background) iniciem no momento correto, acoplando melhor o início do texto com a transição visual.
  - Z-Index e Manifesto: Alterado o z-index de `GhostCanvas` para `z-30` e `BeliefFinalSectionOverlay` para `z-50`. Isso corrige o erro crítico onde o modelo 3D ficava acima do texto manifesto final, obscurecendo-o.
  - Legibilidade Inicial: Ajustado `BeliefFixedHeader` mudando o `initial opacity` para 0 em vez de 0.3 e mapeando corretamente a opacidade para garantir que fique bem visível no frame inicial de leitura.
- Resultado esperado após esta rodada:
  - Ghost model aparece corretamente atrás do manifesto.
  - Frases e background sincronizam melhor seu início e fim.
  - Seção inicial de texto mais legível e evidente.
