# TASK-02: Landing Page Template V3 Full Image Sem Crop

## Objetivo

Garantir que blocos de imagem full no Template V3 exibam o asset completo, respeitando a proporção original e eliminando crop indevido.

## Sessão/Ação do ADMIN afetada

- Sessão: `Landing Pages`
- Fluxo: edição de blocos standalone de imagem e vídeo no Template V3
- Campo operacional: `landing_pages.content`

## Arquivos envolvidos

- `src/components/projects/templates/ProjectTemplateALPARenderer.tsx`

## Sintoma anterior

- Imagens configuradas como full apareciam ampliadas e cortadas.
- O wrapper tratava mídia editorial e mídia full com a mesma regra visual, forçando enquadramento inadequado.

## Causa-raiz confirmada

- O renderer reutilizava classes de layout pensadas para cards e blocos híbridos, com comportamento próximo de `cover`.
- O bloco não diferenciava mídia que deveria ocupar o container editorial de mídia que deveria preservar a totalidade do asset.

## Implementação aplicada

- Foi introduzido o modo de renderização `displayMode = full` no renderer ALPA v3 ativo; o componente legado `AssetInteractive` foi removido no cleanup de 2026-05-05.
- Em modo full:
  - imagens usam `<img>` com `w-full h-auto object-contain`
  - vídeos standalone usam `object-contain` e limite de altura seguro
- Blocos standalone de `image`, `video` e `video-autoplay` do Template V3 agora entram explicitamente nesse modo.

## Dependências e impacto no ADMIN

- O ADMIN não ganhou novos campos.
- O efeito depende do tipo do bloco escolhido pelo editor. Blocos standalone continuam sendo a forma correta para mídia full.

## Edge cases

- Imagens muito altas podem gerar aumento vertical da seção, o que é esperado para preservar integridade do asset.
- Assets sem dimensão coerente ou com origem quebrada continuam exibindo fallback de indisponibilidade.

## Regras para futuras edições

- Usar blocos standalone quando a intenção for exibir a mídia inteira.
- Não reaplicar `object-cover` em wrappers full.
- Se houver necessidade de crop editorial deliberado, isso deve ficar restrito a cards ou blocos compostos.

## Checklist de validação

- [ ] A imagem full aparece completa, sem corte.
- [ ] Não há distorção da proporção.
- [ ] O layout segue responsivo em desktop e mobile.
- [ ] Vídeos standalone mantêm o mesmo princípio de enquadramento.
