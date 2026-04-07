# Mission — ALPA Migration (Template Mestre V3)

## Objetivo

Migrar da estrutura MLPE V2 para uma arquitetura ALPA orientada a blocos atômicos e composições, sem remover as versões anteriores (V1/V2/Legacy), mantendo opção de troca no Admin.

## Prioridade de execução

1. Corrigir listagem de projetos no Admin (`/admin/trabalhos`) antes de liberar edição nova.
2. Liberar novo template `master-project-v3-alpa` no Admin e no render público.
3. Validar render visual, acessibilidade e regressão.

## Taxonomia de blocos (ALPA)

### Layouts Básicos

- `text`: Texto Puro
- `image`: Imagem Full
- `video`: Vídeo Full
- `video-autoplay`: Vídeo Autoplay (Loop)
- `quote-band`: Faixa de Citação (Full Width + cor configurável)

### Composições

- `image-text`: Imagem + Texto
- `text-image`: Texto + Imagem
- `image-image`: Imagem Dupla (Grid)
- `image-video`: Imagem + Vídeo
- `video-text`: Vídeo + Texto

## Diretrizes visuais globais (ALPA)

- Zero container visual excessivo: conteúdo direto sobre o background animado.
- `ZERO BORDER RADIUS` para o template ALPA (com exceção explícita do botão circular de voltar).
- Hero centralizada: apenas logo/textos/metadados (sem imagem de fundo).
- Textos centralizados por padrão; blocos lado a lado alinham texto no sentido da mídia.

## Regras funcionais obrigatórias

- Players do YouTube: `autoplay=1`, `mute=1`, `loop=1`, `controls=0`.
- Todos os assets clicáveis (imagem/vídeo/youtube) abrem pop-up com zoom/visualização ampliada.
- CTA final sempre centralizado.
- Blocos de imagem não exigem legenda/caption.
- Alt text obrigatório para imagens (acessibilidade).

## Compatibilidade

- Se `template` for `master-project-v1`, `master-project-v2` ou `legacy-blocks`, o comportamento permanece inalterado.
- Projetos antigos seguem renderizando sem migração forçada.
