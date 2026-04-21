# 06 — O Que Me Move

## Objetivo

Transformar a seção manifesto em uma experiência scroll-triggered com narrativa clara:

- abertura com header + frase + Ghost 3D;
- progressão de frases com troca de cor de fundo;
- clímax com manifesto final sobreposto;
- comportamento consistente entre desktop e mobile.

## Implementação vigente (fonte de verdade)

### Arquivo orquestrador

- `src/components/sobre/sections/AboutBeliefs.tsx`

### Componentes ativos

- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/hooks/useBeliefsScroll.ts`

### Stack técnico

- Motion (`motion`, `motion/react`) com `inView`, `animate`, `useTransform`, `useInView`
- React Three Fiber + Drei para Ghost 3D
- Next.js + TypeScript + Tailwind CSS

## Arquitetura de camadas

| Camada | Componente | z-index | Papel |
| --- | --- | --- | --- |
| 0 | Background | `z-0` | Troca de cor por seção visível |
| 1 | Overlay | `z-10` | Suavização visual da transição |
| 2 | Header fixo | `z-30` | Mensagem editorial de apoio |
| 3 | Ghost 3D | `z-30` | Elemento central da narrativa |
| 4 | Texto rotativo | `z-40` | Frases por scroll-section |
| 5 | Manifesto final | `z-50` | Clímax acima do Ghost |

## Regras de animação (estado atual)

### Texto rotativo

- `BeliefScrollText` usa `inView('.scroll-section p')`.
- Entrada: `opacity 0→1`, `y 18→0`, `blur 6→0`.
- Saída no cleanup: `opacity 1→0`, `y 0→-18`, `blur 0→6`.
- Estado inicial explícito no `<p>` para evitar flash antes do trigger.

### Background

- `BeliefBackground` usa `inView('.scroll-section')`.
- A cor alvo é mapeada por `data-index` da seção.
- Sequência base:
  - `#040013` (intro)
  - `#0048ff`
  - `#8705f2`
  - `#f501d3`
  - repetição até saída

### Ghost 3D

- `GhostScene` fixo com `Canvas frameloop="demand"`.
- Desktop: parallax de cursor sutil.
- Mobile: começa topo-esquerda e converge para centro no clímax.
- Manifesto final permanece acima do Ghost por regra de camada.

## Sequência visual esperada

### Desktop

1. Fundo inicial + header à direita.
2. Frase ativa à esquerda.
3. Ghost central editorial.
4. Troca de cor sincronizada com frase visível.
5. Clímax: manifesto final domina leitura e Ghost permanece como elemento central.

### Mobile

1. Header no topo visual.
2. Ghost em abertura topo-esquerda.
3. Frases com leitura no terço inferior.
4. Clímax final com manifesto dominante e Ghost centralizado.

## Frases oficiais

1. Um vídeo que respira
2. Uma marca que se reconhece
3. Um detalhe que fica
4. Crio para gerar presença
5. Mesmo quando não estou ali
6. Mesmo quando ninguém percebe o esforço

## Auditoria técnica (2026-04-21)

### Status geral

- Estrutura scroll-triggered: **OK**
- Ghost 3D (camadas + performance): **OK**
- Header fixo: **OK**
- Sequência mobile/desktop: **OK**

### Referências visuais auditadas

- `06-O-QUE-ME-MOVE-DESKTOP-INICIAL.jpg`
- `06-O-QUE-ME-MOVE-DESKTOP.jpg`
- `06-O-QUE-ME-MOVE-DESKTOP-FINAL.jpg`
- `06-O-QUE-ME-MOVE-MOBILE-INICIAL.png`
- `06-O-QUE-ME-MOVE-MOBILE-FINAL.png`

### Resultado de aderência visual

- Início desktop/mobile: **muito próximo**
- Clímax final: **parcial**
  - manifesto final ainda menor que a referência;
  - destaque cyan em `GHOST DESIGN` difere do frame final branco integral;
  - azul final precisa ficar mais estável no trecho de clímax.

## Pendências objetivas de paridade (abertas)

1. Escalar manifesto final para ocupar mais viewport no clímax.
2. Ajustar direção de arte do manifesto final para branco integral no frame final.
3. Travar estado azul no trecho final para maior paridade com referência.

## Validação recomendada

- E2E da seção:
  - `test/e2e/about-beliefs.spec.ts`
- Conferência visual:
  - desktop 1440x900 nos progressos ~0.15, ~0.45, ~0.9;
  - mobile 390x844 nos progressos ~0.2 e ~0.9.

