# TASK-09: About Beliefs Mobile Restaurado

## Objetivo

Restaurar o comportamento correto da sessão `About Beliefs` em viewport mobile.

## Sessão/Ação do ADMIN afetada

- Sessão pública: `/sobre`
- Relação indireta com conteúdo editorial da narrativa About

## Arquivos envolvidos

- `src/components/sobre/beliefs/BeliefMobileTextLayer.tsx`

## Sintoma anterior

- A sequência de frases no mobile não executava como esperado.
- Havia perda de previsibilidade na timeline e momentos em que o texto parecia pular estados.

## Causa-raiz confirmada

- A timeline mobile havia sido desviada para uma distribuição arbitrária por zonas.
- O cálculo perdeu a segmentação estável por frase/screen usada na narrativa original.

## Implementação aplicada

- A timeline voltou a usar segmentação linear por número de frases.
- Foram restaurados:
  - `timelineOffset`
  - progressão por `segmentSize`
  - motion horizontal de entrada/saída
  - posição e escala textual compatíveis com o comportamento aprovado

## Dependências e impacto no ADMIN

- Não há impacto em schema ou CMS.
- O comportamento depende do número de frases ativas no componente; mudanças editoriais podem exigir nova validação mobile.

## Edge cases

- Existem janelas curtas de transição entre frases; elas são esperadas e não configuram falha.
- Alterar a contagem ou ordem das frases sem revisar o tempo de scroll pode degradar o comportamento.

## Regras para futuras edições

- Sempre revalidar em viewport mobile real ao adicionar/remover frases.
- Não trocar a timeline segmentada por zonas manuais sem justificar o impacto na narrativa.

## Checklist de validação

- [ ] A ordem das frases em mobile está correta.
- [ ] O texto entra e sai com motion horizontal controlado.
- [ ] O layout mobile permanece legível.
- [ ] Não há regressão aparente na camada desktop.
