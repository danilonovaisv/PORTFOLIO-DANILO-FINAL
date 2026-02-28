# **Guia de Engenharia: Animação Ghost (Home Hero)

A animação do Ghost é uma cena WebGL construída com **React Three Fiber (R3F)**. Ela não é um vídeo, mas uma simulação em tempo real composta por malhas 3D (meshes), partículas e pós-processamento.

## 1. Arquitetura e Orquestração

Para alterar o resultado, você precisa saber onde cada parte "vive". Aqui estão os arquivos principais:

| Arquivo | Função / Papel | O que alterar aqui? |
| --- | --- | --- |
| **`GhostCanvas.tsx`** | **O Maestro (Cena Principal)**. Configura a câmera, luzes e o pipeline de pós-processamento. | Zoom da câmera, cor de fundo, intensidade do Bloom (brilho), Scanlines e efeitos de filme. |
| **`Ghost.tsx`** | **O Personagem**. Define a geometria do fantasma, o material (cor/transparência) e o movimento de flutuação. | Formato, cor do corpo, velocidade de flutuação (`useFrame`), escala e opacidade. |
| **`GhostEyes.tsx`** | **Interatividade**. Os olhos que seguem o mouse. | Cor dos olhos, intensidade do brilho, velocidade de rastreamento do mouse. |
| **`Particles.tsx`** | **Atmosfera**. As partículas flutuantes ao redor. | Quantidade, velocidade, cor e dispersão das partículas. |
| **`AnalogDecayPass.tsx`** | **Estética Lo-Fi**. Efeito de ruído e distorção analógica. | Nível de ruído (noise) e distorção da imagem. |

---

## 2. Como Ajustar (Cenários Práticos)

### Cenário A: Quero mudar a "Vibe" e as Cores

A estética visual é definida principalmente pelo **Post-Processing** e pelos **Materiais**.

1. **Ajustar o Brilho (Glow/Bloom):**
* Vá em `GhostCanvas.tsx`.
* Procure pelo componente `<Bloom>`.
* Ajuste `intensity` (atualmente `1.8`) para mais/menos brilho e `luminanceThreshold` (`0.15`) para definir o que brilha.


2. **Ajustar a Cor do Fantasma:**
* Vá em `Ghost.tsx`.
* No `<meshStandardMaterial>`, altere a prop `emissive` (cor do brilho interno) ou `color`.
* Para os olhos, vá em `GhostEyes.tsx` e altere a `color` e `emissive` das esferas.


3. **Ajustar o Ruído/Granulação:**
* Vá em `GhostCanvas.tsx`.
* Localize `<Noise>` e `<Scanline>`. Aumente ou diminua a `opacity` para limpar ou sujar a imagem.



### Cenário B: Quero alterar o Movimento (Flutuação)

O movimento do fantasma é procedural (matemático), não uma animação pré-renderizada.

1. **Alterar a Flutuação (Hover):**
* Vá em `Ghost.tsx`.
* Dentro do hook `useFrame`, você verá cálculos com `Math.sin(t)`.
* Altere os multiplicadores de tempo (ex: `t * 0.8`) para mudar a frequência (velocidade).
* Altere os multiplicadores de amplitude (ex: `y = ... * 0.1`) para mudar o quanto ele sobe e desce.


2. **Alterar como ele segue o mouse:**
* O Ghost tem uma lógica de `lerp` (interpolação linear) para suavizar o movimento.
* Aumente o fator de lerp (ex: de `0.1` para `0.2`) para ele seguir o mouse mais rápido, ou diminua para ficar mais "preguiçoso".



### Cenário C: Quero ajustar o Posicionamento e Tamanho

Isso é feito na composição da cena.

1. **Escala e Posição Inicial:**
* Vá em `GhostCanvas.tsx`.
* No componente `<Ghost>`, ajuste as props `scale` (atual `0.22`) e `position` (atual `[0, -0.2, 0]`).


2. **Câmera (Zoom):**
* Ainda em `GhostCanvas.tsx`, na prop `camera` do componente `<Canvas>`, ajuste a posição Z (o terceiro valor de `[0, 0, 7]`). Menor = mais perto (zoom in).



---

## 3. Guia de Testes e Debug

Para chegar no resultado ideal sem "codar no escuro", recomendo o seguinte fluxo:

1. **Habilite os Controles de Órbita (Temporário):**
* Em `GhostCanvas.tsx`, adicione `<OrbitControls />` (importe de `@react-three/drei`) dentro do Canvas. Isso permite você girar a cena com o mouse para ver de outros ângulos.


2. **Use o Debugger Existente:**
* O projeto possui um arquivo `src/components/debug/AntigravityDebugger.tsx`. Verifique se ele pode ser ativado na Home para monitorar valores de scroll e estado em tempo real.


3. **Teste de Performance (DPR):**
* O arquivo `GhostCanvas.tsx` tem uma lógica para limitar o Pixel Ratio (`dpr`) em telas de alta densidade (`window.devicePixelRatio > 2`).
* Ao testar, use o DevTools do Chrome para simular dispositivos móveis e garantir que a animação não fique lenta (FPS baixo).


4. **Movimento Reduzido:**
* Lembre-se de testar ativando a opção "prefers-reduced-motion" no seu sistema operacional. O código já possui hooks para desligar animações pesadas nesses casos.
