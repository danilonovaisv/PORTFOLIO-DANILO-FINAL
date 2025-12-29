---
description: hero
---

# Workflow: Hero Section Implementation (Ghost Atmosphere)

## Overview

- Implements the Hero section with a **Ghost Blue** atmosphere, **Static Editorial Text**, and an **Interactive Manifesto Thumbnail**.
- **Z-Index Strategy:** Preloader (z-50) > ManifestoThumb (z-30) > Ghost WebGL (z-20) > Text (z-10) > Background (z-0).
- **Interactions:** Ghost follows mouse (lerp 0.05), Video expands on scroll (Desktop only).
- Respects `prefers-reduced-motion` and uses `aria-label`s.

## Steps

1. **Create `HomeHero.tsx` (Orchestrator)**

   _Aligns with "ESPECIFICAÇÃO POR SEÇÃO: Hero"_

   ```tsx
   // src/components/home/HomeHero.tsx
   'use client';

   import { useRef } from 'react';
   import { motion, useScroll, useTransform } from 'framer-motion';
   import HeroCopy from './HeroCopy';
   import ManifestoThumb from './ManifestoThumb';
   import GhostStage from './GhostStage'; // Wrapper for WebGL
   import HeroPreloader from './HeroPreloader';

   export default function HomeHero() {
     const ref = useRef<HTMLDivElement>(null);
     const { scrollYProgress } = useScroll({
       target: ref,
       offset: ['start start', 'end end'],
     });

     // Video Scroll Transformation (Desktop)
     // Scale: Starts small (0.3) -> Fullscreen (1)
     const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
     // Position: Starts centered vertically relative to bottom -> Moves to top (0%)
     const posYVideo = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);
     // Radius: Starts rounded -> Becomes square when fullscreen
     const borderRadius = useTransform(
       scrollYProgress,
       [0, 1],
       ['16px', '0px']
     );
     // Text Opacity: Fades out as user scrolls
     const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

     return (
       <section
         id="hero"
         ref={ref}
         className="relative w-full h-[200vh] bg-[#06071f] overflow-hidden" // 200vh for scroll scrub
       >
         {/* 1. Preloader (z-50) */}
         <HeroPreloader />

         {/* 2. Manifesto Video Thumb (z-30) - Desktop Only */}
         <motion.div
           style={{ scale: scaleVideo, y: posYVideo, borderRadius }}
           className="absolute bottom-10 right-10 z-30 w-[30vw] aspect-video overflow-hidden shadow-lg hidden md:block origin-bottom-right"
         >
           <ManifestoThumb />
         </motion.div>

         {/* 3. Ghost Atmosphere WebGL (z-20) */}
         {/* pointer-events-none allows clicks to pass through to text */}
         <div className="absolute inset-0 z-20 pointer-events-none">
           <GhostStage />
         </div>

         {/* 4. Editorial Text (z-10) */}
         <motion.div
           style={{ opacity: opacityText }}
           className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 pointer-events-auto"
         >
           <HeroCopy />
         </motion.div>

         {/* 5. Background Radial (z-0) */}
         <div
           className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] pointer-events-none"
           aria-hidden="true"
         />
       </section>
     );
   }
   ```

````

2. **Ghost WebGL (`Ghost.tsx`)** – Organic Motion
*Uses the specific harmonic sine waves from the spec.*
```tsx
// src/components/home/webgl/Ghost.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Ghost() {
  const ghostGroup = useRef<THREE.Group>(null);
  // Material ref logic depends on implementation (standard or shader)

  useFrame((state) => {
    if (!ghostGroup.current) return;

    const t = state.clock.getElapsedTime();

    // "Movimento senoidal orgânico"
    const floatY =
      Math.sin(t * 0.8) * 0.1 +
      Math.sin(t * 0.3) * 0.05;

    ghostGroup.current.position.y = floatY;

    // Optional: Emissive Pulse if using StandardMaterial
    // const material = ghostGroup.current.children[0].material as THREE.MeshStandardMaterial;
    // if (material) {
    //    material.emissiveIntensity = 2.0 + Math.sin(t * 2.0) * 0.5;
    // }
  });

  return (
    <group ref={ghostGroup}>
      {/* Mesh implementation details */}
    </group>
  );
}

````

3. **Mouse Follow (`GhostCanvas.tsx`)**
   _Implements the "Ghost segue lentamente o cursor (lerp 0.05)" rule._

```tsx
// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function MouseFollower({ children }: { children: React.ReactNode }) {
  const { size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse (-1 to +1)
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth Lerp (0.05 factor)
    const targetX = mouse.current.x * 2; // Movement range multiplier
    const targetY = mouse.current.y * 1;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.05;

    // Subtle rotation based on movement
    groupRef.current.rotation.y +=
      (mouse.current.x * 0.5 - groupRef.current.rotation.y) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function GhostCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <MouseFollower>{children}</MouseFollower>
    </Canvas>
  );
}
```

4. **Preloader (`HeroPreloader.tsx`)**
   _Implements "Summoning spirits" with Ghost Blue gradient._

```tsx
// src/components/home/HeroPreloader.tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06071f]"
    >
      {/* Ghost SVG Icon */}
      <svg
        className="ghost-svg mb-4 animate-bounce"
        height="80"
        viewBox="0 0 512 512"
        width="80"
      >
        <path
          fill="white"
          d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"
        />
      </svg>

      <p className="font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-2">
        Summoning spirits
      </p>

      {/* Progress Bar */}
      <div className="w-24 h-0.5 bg-[#0b0d3a] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]" // primary to accent
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
```

5. **Manifesto Thumb Component (`ManifestoThumb.tsx`)**
   _Uses the specific Supabase video URL._

```tsx
// src/components/home/ManifestoThumb.tsx
export default function ManifestoThumb() {
  return (
    <video
      src="[https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4](https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4)"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
      aria-label="Manifesto Video"
    />
  );
}
```

## Non‑Negotiables

- **Z-Index Hierarchy:** Preloader (50) > Thumb (30) > Ghost (20) > Text (10).
- **Colors:** Background `#06071f`, Text `#d9dade` (Contrast 7.2:1).
- **Performance:** `dpr` limited to 2, `antialias: false` for GhostCanvas.
- **Accessibility:** `prefers-reduced-motion` must disable Ghost movement and Video expansion.
- **Content:** Hero Text must remain legible despite being z-index 10.
