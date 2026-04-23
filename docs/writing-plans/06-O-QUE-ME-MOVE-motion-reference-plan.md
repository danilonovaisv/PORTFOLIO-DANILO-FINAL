# Plano de Ajuste — 06 O Que Me Move

## Objetivo

Traduzir a lógica da referência `motion.dev/examples/js/scroll-triggered` para a seção `06-O-QUE-ME-MOVE`, focando em dois eixos:

1. comportamento do background por entrada de bloco;
2. entrada do texto animado com leitura mais editorial e menos difusa.

Este plano preserva a arquitetura atual da seção, sem alterar narrativa, grid, tipografia base, Ghost 3D ou hierarquia de camadas.

## Fontes analisadas

### Referência externa

- `https://examples.motion.dev/js/scroll-triggered?utm_source=embed&is_plus=true`
- Tutorial oficial: `https://motion.dev/tutorials/js-scroll-triggered`

### Fonte de verdade do projeto

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/hooks/useBeliefsScroll.ts`

## Leitura da referência Motion

### O que a referência faz de forma objetiva

- Usa `inView()` para disparar entrada quando o elemento entra na viewport.
- Usa `animate()` para revelar cada item com:
  - `opacity: 0 -> 1`
  - `x: -100 -> 0`
  - `duration: 0.9`
  - `ease: [0.17, 0.55, 0.55, 1]`
- Retorna cleanup para a saída:
  - `opacity: 1 -> 0`
  - `x: 0 -> -100`
- A sensação geral é de bloco editorial que "entra de lado", sem excesso de efeitos.

### O que isso significa para a seção 06

- A referência não usa animação contínua por scrub.
- O efeito principal é "aparecimento por visibilidade", não "transformação longa ao longo de todo o scroll".
- O impacto vem da precisão do trigger e da simplicidade do reveal.

## Diagnóstico da implementação atual

### Background

Em `BeliefBackground.tsx`, o background já está relativamente alinhado com a referência:

- o trigger acontece por `inView('.scroll-section p')`;
- a duração está em `0.9s`;
- o easing principal já replica o da demo;
- existe um overlay de compensação visual para banding.

Ponto de atenção:

- o background hoje reage ao `<p>`, não à seção como bloco narrativo;
- isso tende a atrasar ou comprimir a leitura da troca de cor, especialmente quando o texto tem geometria diferente entre desktop e mobile.

### Texto

Em `BeliefScrollText.tsx`, a entrada atual usa:

- `opacity: 0 -> 1`
- `y: 18 -> 0`
- `blur(6px) -> blur(0px)`

E a saída usa:

- `opacity: 1 -> 0`
- `y: 0 -> -18`
- `blur(0px) -> blur(6px)`

Ponto de atenção:

- a animação atual tem assinatura mais atmosférica;
- a referência Motion tem assinatura mais tipográfica e lateral;
- o blur, embora bonito, reduz a nitidez editorial no primeiro frame legível.

## Direção de ajuste

### 1. Ajuste do trigger do BG

Mover o gatilho conceitual do background do texto para o bloco:

- trocar o `inView` principal do BG para observar `.scroll-section`;
- manter o índice da cor derivado de `data-index`;
- iniciar a troca quando a seção entrar no campo de leitura, não apenas quando o `<p>` estiver plenamente dominante.

### Resultado esperado

- o fundo começa a respirar antes do texto atingir o ápice de legibilidade;
- a seção ganha continuidade entre entrada do bloco e entrada da frase;
- desktop e mobile ficam mais consistentes.

## 2. Ajuste da entrada do texto

Substituir a assinatura principal do reveal vertical por uma assinatura lateral inspirada na referência:

- entrada:
  - `opacity: 0 -> 1`
  - `x: [-72, 0]` no desktop
  - `x: [-36, 0]` no mobile
  - `filter: blur(4px) -> blur(0px)` apenas como suporte sutil, não protagonista
- saída:
  - `opacity: 1 -> 0`
  - `x: [0, -48]` no desktop
  - `x: [0, -24]` no mobile
  - `filter: blur(0px) -> blur(4px)`

### Resultado esperado

- leitura mais clara e mais próxima da referência;
- frase parece "entrar em cena" em vez de "subir da névoa";
- maior sensação de bloco editorial scroll-triggered.

## 3. Regras de easing

Manter dois comportamentos diferentes, cada um no seu papel:

- texto e BG:
  - `ease: [0.17, 0.55, 0.55, 1]`
  - porque isso aproxima a assinatura da referência Motion
- overlay e compensações visuais:
  - `ease: [0.22, 1, 0.36, 1]`
  - porque esse é o easing Ghost institucional e funciona melhor como amortecimento

### Decisão

Não unificar tudo sob um único easing nesta etapa. O texto e o BG devem se aproximar da referência; o overlay continua servindo o sistema Ghost.

## 4. Sequência sugerida de implementação

### Etapa A — Background

Arquivo alvo:

- `src/components/sobre/beliefs/BeliefBackground.tsx`

Mudanças:

- observar `.scroll-section` em vez de `.scroll-section p`;
- manter `COLOR_STOPS`;
- testar se a troca deve usar `index` ou `index + 1` conforme o momento desejado da antecipação;
- preservar o pulso do overlay.

### Etapa B — Texto

Arquivo alvo:

- `src/components/sobre/beliefs/BeliefScrollText.tsx`

Mudanças:

- trocar `y` por `x`;
- reduzir blur de `6px` para `4px`;
- calibrar distâncias por breakpoint;
- manter `opacity: 0` inicial para evitar flash antes do trigger.

### Etapa C — Calibração de entrada

Arquivos alvo:

- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`

Mudanças:

- validar o ponto de acionamento real do `inView`;
- se necessário, usar margem/amount compatível com a API adotada para antecipar um pouco a entrada do bloco;
- garantir que BG e texto não pareçam desacoplados.

## 5. Ajustes que não entram neste plano

- refatorar `GhostScene`;
- alterar copy das frases;
- mexer no manifesto final;
- trocar a paleta `COLOR_STOPS`;
- reordenar z-index da seção;
- migrar de `scroll-triggered` para `scroll-linked scrub`.

## 6. Riscos e cuidados

### Risco 1 — Entrada lateral excessiva

Se o deslocamento horizontal ficar grande demais, a frase pode parecer "banner animado" e não manifesto editorial.

Mitigação:

- começar com amplitude menor que a demo original;
- priorizar `-72px` desktop e `-36px` mobile em vez de `-100px`.

### Risco 2 — BG disparar cedo demais

Ao observar a seção inteira, a troca de cor pode antecipar demais.

Mitigação:

- testar o gatilho com o bloco atual;
- ajustar o momento de leitura usando threshold/margin compatível com a implementação.

### Risco 3 — Blur competir com o texto

Se o blur persistir demais, perde-se a nitidez que a referência tem.

Mitigação:

- manter blur sutil e curto;
- tratar blur como textura de entrada, não como linguagem principal.

## 7. Critérios de aceite

- o fundo troca de cor de forma sincronizada com a entrada do bloco narrativo;
- o texto entra lateralmente, com leitura clara no primeiro instante útil;
- a sensação geral se aproxima da demo do Motion sem descaracterizar o sistema Ghost;
- desktop e mobile mantêm o mesmo princípio cinético;
- nenhuma regressão visual no manifesto final e no Ghost 3D.

## 8. Próximo passo recomendado

Executar uma implementação mínima em dois arquivos:

- `BeliefBackground.tsx`
- `BeliefScrollText.tsx`

Depois validar visualmente em:

- desktop `1440x900`
- mobile `390x844`

Pontos de checagem:

- progresso inicial da seção;
- entrada da 2ª e 4ª frase;
- transição para o clímax final.
