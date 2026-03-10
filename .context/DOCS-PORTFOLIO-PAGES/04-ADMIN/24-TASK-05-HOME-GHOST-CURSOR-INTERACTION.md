# TASK-05: Home Ghost Cursor Condicionado a Interação Real

## Objetivo

Fazer o background interativo da Home responder apenas a cursor/toque reais, sem perseguição autônoma quando não existe input do usuário.

## Sessão/Ação do ADMIN afetada

- Sessão: configuração visual global consumida pela Home
- Bloco público: hero/canvas da Home

## Arquivos envolvidos

- `src/components/canvas/home/hero/GhostScene.tsx`

## Sintoma anterior

- O background aparentava continuar "caçando" um alvo mesmo sem interação.
- O efeito competia com o conteúdo e quebrava a expectativa definida para o Ghost Cursor.

## Causa-raiz confirmada

- A cena mantinha drift autônomo baseado em target artificial e influência de scroll.
- O estado idle não retornava para um centro neutro.

## Implementação aplicada

- O alvo autônomo foi removido.
- Sem input ativo, a cena agora converge para `0,0`.
- Mouse/touch continuam dirigindo o comportamento quando há interação real.

## Dependências e impacto no ADMIN

- Não há alteração de schema nem novo controle no ADMIN.
- A decisão é de runtime e preserva o visual geral da Home.

## Edge cases

- Pode permanecer uma respiração visual sutil do background, mas sem deslocamento de cursor fantasma.
- Em devices sem hover, somente toque passa a influenciar o comportamento.

## Regras para futuras edições

- Não reintroduzir drift autônomo forte no target principal.
- Interações por scroll só devem existir se fizerem parte explícita da direção de arte aprovada.

## Checklist de validação

- [ ] Sem input, o efeito retorna ao centro.
- [ ] Com mouse, o campo responde ao cursor.
- [ ] Com touch, o campo responde ao toque.
- [ ] Não há ativação indevida fora de interação.
