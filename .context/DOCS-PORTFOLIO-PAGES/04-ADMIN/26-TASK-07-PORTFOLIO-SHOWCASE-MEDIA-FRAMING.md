# TASK-07: Portfolio Showcase Sem Zoom Excessivo

## Objetivo

Corrigir o enquadramento de imagens e vídeos da sessão `Portfolio Showcase`, eliminando zoom excessivo.

## Sessão/Ação do ADMIN afetada

- Sessão: `Trabalhos`
- Sessão correlata: `Midia`
- Bloco público: `Portfolio Showcase`

## Arquivos envolvidos

- `src/components/home/portfolio-showcase/CategoryStripe.tsx`

## Sintoma anterior

- Imagens e vídeos eram exibidos ampliados demais.
- O enquadramento aparente se aproximava de `cover`, prejudicando a leitura do asset.

## Causa-raiz confirmada

- O wrapper de parallax trabalhava com oversize agressivo.
- O renderer usava classes de mídia com comportamento visual inadequado para esse showcase.

## Implementação aplicada

- A amplitude de parallax foi reduzida.
- O wrapper deixou de expandir verticalmente além do necessário.
- Imagens e vídeos passaram a usar `object-contain`, preservando framing e proporção.

## Dependências e impacto no ADMIN

- Os links de mídia continuam vindo das fontes já configuradas no ADMIN/Supabase.
- A correção atua na camada de renderização; não houve mudança de schema.

## Edge cases

- Assets com framing editorial ruim na origem continuam ruins, porém deixam de sofrer crop adicional do frontend.
- Em telas muito estreitas pode haver mais área respirando ao redor da mídia, o que é esperado.

## Regras para futuras edições

- Não reintroduzir `object-cover` nesse showcase sem validação visual com a base real de projetos.
- Qualquer aumento de parallax deve ser testado junto com vídeos e imagens de proporções distintas.

## Checklist de validação

- [ ] Imagens aparecem sem zoom exagerado.
- [ ] Vídeos mantêm enquadramento coerente.
- [ ] Não há quebra de layout na faixa.
- [ ] O efeito de parallax continua sutil.
