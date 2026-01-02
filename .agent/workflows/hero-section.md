---
description: Hero Section Workflow (Ghost Atmosphere)
---

# Workflow: Hero Section Implementation

Implementação da seção Hero com atmosfera **Ghost Blue**, tipografia editorial e o **Manifesto Thumbnail** interativo.

## Arquitetura de Camadas (Z-Index)

1. **Z-60**: Mobile Menu (quando aberto).
2. **Z-50**: Page Loader / Hero Preloader.
3. **Z-40**: Floating Header.
4. **Z-30**: **ManifestoThumb** (Thumbnail do vídeo).
5. **Z-20**: **GhostStage** (Canvas WebGL com a entidade).
6. **Z-10**: **HeroCopy** (Textos da seção).
7. **Z-00**: Background Radial Abyss.

## Comportamento de Scroll (Double-Stage)

1. **Stage 1 (Pinned)**: O Hero fica "preso" (`sticky`) enquanto o vídeo do Manifesto expande de 30% para 100% da viewport.
2. **Stage 2 (Exit)**: Após o vídeo atingir fullscreen, a seção Hero libera o scroll para a próxima seção (Showcase).

## Snippet Base (HomeHero.tsx)

```tsx
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import GhostStage from './GhostStage';
import ManifestoThumb from './ManifestoThumb';
import HeroCopy from './HeroCopy';

export default function HomeHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transformações do Vídeo
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.8], ['24px', '0px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-main">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0: Abyss */}
        <div className="absolute inset-0 bg-abyss opacity-50" />

        {/* Layer 1: Text */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="relative z-10 flex h-full items-center justify-center"
        >
          <HeroCopy />
        </motion.div>

        {/* Layer 2: Ghost WebGL */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <GhostStage />
        </div>

        {/* Layer 3: Manifesto Video */}
        <motion.div
          style={{ scale: videoScale, borderRadius: videoRadius }}
          className="absolute bottom-12 right-12 z-30 w-[30vw] aspect-video origin-bottom-right"
        >
          <ManifestoThumb />
        </motion.div>
      </div>
    </div>
  );
}
```

## Regras de Ouro

- **WebGL Lerp**: O Ghost deve reagir ao mouse com `lerp(current, target, 0.05)`.
- **Contrast**: O texto editorial deve ser perfeitamente legível sobre o azul etéreo.
- **Mobile Fallback**: No mobile, o vídeo não expande em scroll. Ele se torna uma seção estática ou com entrada simples de `whileInView`.
- **Pre-loader**: A seção Hero só "nasce" visualmente após o Ghost estar compilado (uso de `useAsset` ou similar).
