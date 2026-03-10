# TASK-08: CTA Small e CTA Normal com Motion Sincronizado

## Objetivo

Sincronizar o movimento da seta e do círculo no CTA small e aplicar a mesma lógica aos CTAs normais.

## Sessão/Ação do ADMIN afetada

- Sessão: configuração visual global
- Componentes públicos: CTAs da Home, Portfolio e templates de projeto

## Arquivos envolvidos

- `src/components/ui/AntigravityCTA.tsx`
- `src/components/portfolio/PortfolioCTA.tsx`

## Sintoma anterior

- O círculo e a flecha não se moviam como uma única unidade.
- O CTA small e o CTA normal exibiam linguagens de movimento divergentes.

## Causa-raiz confirmada

- A seta possuía deslocamento próprio separado do wrapper do círculo.
- O CTA normal não reutilizava a mesma implementação base do CTA do design system.

## Implementação aplicada

- O wrapper circular passou a ser animado como unidade.
- O deslocamento isolado da seta foi removido.
- `PortfolioCTA` passou a reutilizar `AntigravityCTA`, herdando a mesma timeline Ghost.

## Dependências e impacto no ADMIN

- Não houve impacto em payload ou persistência.
- A correção é de componente e se propaga para qualquer superfície que consuma esses CTAs.

## Edge cases

- Estados de `focus-visible`, `hover` e navegação por teclado continuam obrigatórios.
- Links externos mantêm `target`/`rel` originais via wrapper do componente.

## Regras para futuras edições

- Variantes compactas e padrão devem partir da mesma base animada.
- Evitar adicionar animações independentes em elementos internos do CTA sem revisar sincronia.

## Checklist de validação

- [ ] Flecha e círculo se movem juntos no CTA small.
- [ ] O CTA normal responde com a mesma linguagem de motion.
- [ ] `hover`, `focus` e `active` continuam funcionais.
- [ ] Não há regressão em links externos ou callbacks de clique.
