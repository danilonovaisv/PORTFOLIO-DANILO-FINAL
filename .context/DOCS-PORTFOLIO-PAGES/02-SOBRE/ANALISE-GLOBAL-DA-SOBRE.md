# ANÁLISE GLOBAL DA HOME (PÁGINA /SOBRE)

## Atualização de Auditoria — 2026-04-16

- Escopo focal desta atualização:
  - rota `/sobre`
  - seção `06 O Que Me Move` e `04 O Que Eu Faço`
  - eixo `UI/UX (legibilidade e consistência visual)`
- Resultado objetivo e Fixes:
  - `04 O Que Eu Faço`: Sombras dos cards ajustadas para a paleta correta `shadow-purpleDetails/10` em vez de hexadecimais engessados e pesados.
  - `06 O Que Me Move`:
    - Fix de `z-index` no `GhostCanvas` para ficar `z-30` (abaixo do manifesto `z-50`).
    - Fix no `BeliefFixedHeader` para começar com `opacity: 0` e usar um mapeamento de opacidade no `useTransform` garantindo clareza na primeira leitura.
    - Fix na offset do `useScroll` (`['start end', 'end end']`) para corrigir o tempo do scroll progress.
- Conclusão desta rodada:
  - Os itens críticos de z-index, opacidade inicial e cor/sombras foram mitigados para alinhamento com a documentação do Ghost.
