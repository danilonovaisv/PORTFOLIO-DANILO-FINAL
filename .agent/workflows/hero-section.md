---
description:
---

# Workflow: Implementação da Hero Section (Com Video Thumb)

**Conceito Visual:**
A Hero mantém a atmosfera "Ghost" (fundo, granulação), mas o elemento central agora divide atenção com uma "Thumb" de vídeo. Ao fazer scroll, essa Thumb será a protagonista.

**Passo a Passo:**

1. **Estrutura do Layout (`Hero.tsx`):**
   - Container relativo `h-screen`.
   - **Camada 0 (Fundo):** WebGL Ghost (Torus etéreo) ou apenas cor sólida com Noise, dependendo se o vídeo deve cobrir o 3D.
   - **Camada 1 (Texto):** Título "Design, não é só estética" posicionado (ex: topo ou centralizado, mas preparado para fade-out).
   - **Camada 2 (Video Thumb):** - Um container `div` centralizado (ex: dimensões iniciais 40vw x 25vh ou aspecto 16:9).
     - Deve ter `position: absolute` ou fixo relativo ao scroll inicial.
     - **ID de Animação:** Usar `layoutId="manifesto-video"` (Framer Motion) para conectar com a próxima seção.

2. **Comportamento do Vídeo Inicial:**
   - Tag `<video>` com `muted`, `loop`, `autoplay`, `playsinline`.
   - `object-fit: cover`.
   - Bordas arredondadas (ex: `rounded-xl`) que ficarão quadradas (`rounded-none`) ao expandir.

3. **Preparação para Transição:**
   - O componente Hero deve passar uma ref de progresso de scroll para o componente de vídeo ou usar `useScroll` para controlar a escala inicial se a transição for feita no mesmo componente.

**Non-Negotiables:**

- O vídeo não deve ter som na Hero.
- O carregamento do vídeo deve ser otimizado (poster image leve enquanto carrega).
