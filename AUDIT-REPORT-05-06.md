# Audit Report: Sections 05 and 06 (Sprint 001)

## 1. Resumo Executivo
Este relatório detalha os achados da auditoria estática das seções 05 e 06, em conformidade com o `SPEC-PORTFOLIO-FIX-05-06.json` v1.0.1.
- **CRITICAL**: 1 (URL incorreta do GLB)
- **HIGH**: 5 (Viewport once: false, offset do useScroll incorreto, interpolação de cor Hex vs HSL, uso de div sr-only proibida, ausência de aria-live)
- **MEDIUM**: 2 (Tempo de stagger incorreto, hierarquia de z-index menor que a exigida na seção 05)
- **LOW**: 1 (Alocação de objeto inline no useFrame)

## 2. Problemas detalhados da seção 05 (COMO EU TRABALHO)
- **Arquivo**: `src/components/sobre/sections/AboutMethod.tsx`
  - **Linha**: 97, 108, 124, 144
  - **Severidade**: HIGH
  - **Descrição**: O atributo `viewport={{ once: false, margin: '-20%' }}` está sendo utilizado. A especificação exige que as animações usem `viewport={{ once: true }}` para evitar re-animação e consumo de CPU.
- **Arquivo**: `src/components/sobre/sections/AboutMethod.tsx`
  - **Linha**: 136-137
  - **Severidade**: MEDIUM
  - **Descrição**: O Stagger atual está configurado como `staggerChildren: 0.1` e `delayChildren: 0.1`. O Ghost Design exige um stagger mínimo de `0.12s` (delay: 0.4s + 0.12s).
- **Arquivo**: `src/components/sobre/sections/AboutMethod.tsx`
  - **Linha**: 78, 84
  - **Severidade**: MEDIUM
  - **Descrição**: O z-index stack atual é vídeo (`z-0`), overlay (`z-1`), conteúdo (`z-10`). A especificação Ghost Design determina vídeo (`z-0`), overlay (`z-10`) e conteúdo (`z-20`).

## 3. Problemas detalhados da seção 06 (O QUE ME MOVE)
- **Arquivo**: `src/components/sobre/3d/GhostScene.tsx`
  - **Linha**: 10-11, 14, 22
  - **Severidade**: CRITICAL
  - **Descrição**: A URL do modelo 3D GLB está definida como `ghost-v1.glb`. A especificação aponta para a URL canônica exata do Supabase Storage: `ghost-transformed.glb`.
- **Arquivo**: `src/hooks/useBeliefsScroll.ts`
  - **Linha**: 15
  - **Severidade**: HIGH
  - **Descrição**: O hook `useScroll` está configurado com `offset: ['start end', 'end end']`. O comportamento esperado exige offset completo de passagem `['start end', 'end start']`.
- **Arquivo**: `src/components/sobre/beliefs/BeliefBackground.tsx`
  - **Linha**: 20-27
  - **Severidade**: HIGH
  - **Descrição**: A animação contínua atrelada ao scroll está utilizando cores Hexadecimais no `useTransform`. O sistema de design exige explicitamente o formato e interpolação via `HSL`.
- **Arquivo**: `src/components/sobre/sections/AboutBeliefs.tsx`
  - **Linha**: 68-76
  - **Severidade**: HIGH
  - **Descrição**: A seção inclui um agrupamento oculto de textos em uma div com classe `sr-only` para as frases rotativas. A especificação obriga a remoção disto em favor do uso de aria-live dinâmico.
- **Arquivo**: `src/components/sobre/beliefs/BeliefScrollText.tsx`
  - **Linha**: 64, 93
  - **Severidade**: HIGH
  - **Descrição**: Ausência de `aria-live="polite"` e `aria-atomic="true"` nos containers que englobam as frases rotativas animadas.
- **Arquivo**: `src/components/sobre/3d/GhostScene.tsx`
  - **Linha**: 39-40
  - **Severidade**: LOW
  - **Descrição**: Alocação de objeto inline `{ x: targetScale, y: targetScale, z: targetScale }` e casting (`as never`) dentro do método `lerp` no `useFrame`. Pode provocar micro-gargalos de garbage collection acumulativo.

## 4. Violações do Ghost Design System encontradas
1. **Transições RGB vs HSL**: O uso do formato hexadecimal (`#0048ff`) na animação com `useTransform` quebra o fluxo de interpolação circular em HSL exigido para as cores de brand.
2. **Re-trigger de animações (once: false)**: O viewport uma vez revelado não deveria refazer a animação, o que afeta o engajamento natural (Sinalizado no AboutMethod).
3. **Mapeamento Semântico e SR**: Ocultar conteúdo estático via `sr-only` contraria o fluxo dinâmico nativo estipulado por "Acessibilidade Dinâmica", onde apenas o texto em tela possui o estado da fala lido.
