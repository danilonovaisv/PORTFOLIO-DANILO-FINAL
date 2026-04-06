# Findings

## 2026-04-05

- `AboutBeliefs` usa `useScroll({ offset: ['start end', 'end end'] })` no container principal.
- Com a seção alinhada ao topo da viewport, o progresso global já entra avançado, o que explica o skip da intro.
- `BeliefSection` usa timeline local independente via `useScroll`, quebrando sincronização com background/overlay.
- `BeliefFixedHeader` usa múltiplos `MorphText` com ranges estreitos; na entrada auditada as linhas ficaram com opacidade residual.
- O Ghost 3D monta no DOM, mas o recorte visual da área do canvas fica vazio.
- O renderer específico de `src/components/sobre/3d/GhostModel.tsx` diverge do renderer estável em `src/components/shared/3d/GhostModel.tsx`.
