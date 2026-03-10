# TASK-03: Cards Thumbs com Suporte a MP4

## Objetivo

Permitir que cards de thumb da Home, Portfolio e fluxos relacionados renderizem imagem ou MP4 com comportamento consistente.

## Sessão/Ação do ADMIN afetada

- Sessão: `Trabalhos`
- Sessão correlata: `Midia`
- Fluxo: definição de capa, thumb, hero e previews dos projetos

## Arquivos envolvidos

- `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/lib/portfolio/project-mappers.ts`
- `src/lib/portfolio/card-media.ts`

## Sintoma anterior

- Cards assumiam imagem como mídia base.
- Assets MP4 em thumb quebravam expectativa visual ou disputavam com links legados inválidos.

## Causa-raiz confirmada

- A seleção de mídia não discriminava corretamente imagem x vídeo no nível do card.
- Alguns projetos ainda carregavam caminhos legados quebrados (`projects/.../thumb.*`, `projects/.../hero.*`), que contaminavam o fallback.

## Implementação aplicada

- Foi criado um helper central de mídia de card:
  - `getCardMediaCandidates`
  - `isLegacyProjectMediaAsset`
- `ProjectCard` e `FeaturedProjectCardFrame` passaram a:
  - renderizar `<video>` quando a mídia principal for MP4
  - usar `autoPlay`, `muted`, `loop` e `playsInline` quando aplicável
  - ignorar links legados conhecidos como inválidos
- O mapper passou a priorizar capas estruturadas antes de assets top-level quebrados.

## Dependências e impacto no ADMIN

- O ADMIN continua controlando as mídias via campos atuais.
- A qualidade do resultado depende de o projeto possuir `covers` estruturadas ou um MP4 válido publicado no storage.

## Edge cases

- Vídeos sem poster usam poster padrão seguro no card destacado.
- Se imagem e vídeo coexistirem, o runtime prioriza a mídia estruturada mais confiável.
- Links vazios ou quebrados são ignorados em vez de forçar UI inconsistente.

## Regras para futuras edições

- Preferir publicar capas estruturadas no projeto em vez de depender de links legados.
- Se um thumb for vídeo, garantir MP4 web-friendly e tamanho compatível com preview.
- Não reaproveitar caminhos `projects/.../thumb.*` antigos sem validar disponibilidade real no storage.

## Checklist de validação

- [ ] Thumb com imagem continua renderizando normalmente.
- [ ] Thumb com MP4 renderiza preview em vídeo sem quebrar o grid.
- [ ] Não há erro de console por mídia inválida.
- [ ] Hover media não repete asset quebrado.
