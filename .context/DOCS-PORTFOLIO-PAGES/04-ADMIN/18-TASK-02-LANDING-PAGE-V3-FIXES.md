# TASK-02: Landing Page Template V3 Media and Background Fixes

## Objetivo

Resolver problemas identificados no template V3 da Landing Page (ALPA Template), especificamente relacionados à perda de conteúdo de mídia (vídeos do YouTube) e de blocos de texto após o salvamento. Além disso, ajustar a agressividade da animação de fundo (LiquidEther) para melhorar a performance em dispositivos móveis.

## Diagnóstico e Solução Implementada

### 1. Desaparecimento de Blocos de Texto

**Problema:** Blocos que não tinham a mídia primária preenchida (ex: `image-text` criado, texto digitado, mas nenhuma imagem selecionada) eram removidos completamente no carregamento (`normalizeLandingBlock`), descartando todo o progresso do texto do usuário.
**Solução:** Alterado o `src/lib/projects/template-schema.ts` na etapa de normalização. As chamadas restritivas (`blockNeedsPrimaryMedia(type) && !media return null;`) que ignoravam graciosidade do front-end foram removidas. Agora, blocos incompletos são mantidos para que o renderer ALPA v3 ativo exiba a mensagem amigável de "Mídia indisponível", preservando título/texto associados.

### 2. Desaparecimento de Mídia YouTube

**Problema:** Ao colar uma URL de YouTube num bloco, ela até era salva com a chave `src`, mas quando não se trocava explicitamente o dropdown para o formato "YouTube" (suponha-se que ficou "Vídeo" nativo do navegador), o parse do front-end (`getAssetKind`) confiava na tipagem forte imposta `(mediaType === 'video')`, o que fazia com que `<video src="url_do_youtube">` fosse processado no HTML e, consequentemente, não rodava o player em tela.
**Solução:** Ajustado `inferMediaType` (`src/lib/projects/template-schema.ts`) e o `getAssetKind` no renderizador `ProjectTemplateALPARenderer.tsx` garantindo que os links contendo padrões do YouTube (`youtu.be`, `youtube.com/watch`, etc.) tomem **prioridade**. Dessa forma, o parser de mídia reconhece que trata-se de um youtube-iframe obrigatório, forçando sua renderização adequada sob `<YouTubePlayer>` ou lightbox.

### 3. Melhoria FPS Mobile - Animação de Fundo Agressiva (LiquidEther)

**Problema:** O background dinâmico do template ALPA (`LiquidEther`) consumia recursos demais devido à simulação computacionalmente cara de viscosidade e densidade.
**Solução:** Ajustado o carregamento de `LiquidEther` em `ProjectTemplateALPARenderer.tsx`. Definiu-se `isViscous={false}`, reduzindo a quantidade de iterações (`iterationsPoisson=16`), diminuindo a força do mouse e a velocidade automática. Isso retira o custo absurdo da resolução das equações viscosas, reduzindo o _overdraw_ enquanto entrega o visual "Ethereal/Ghost" liso a 60FPS nos dispositivos mobile.

## Status Desta Task

`[DONE] Resolvido e validado com sucesso.`
