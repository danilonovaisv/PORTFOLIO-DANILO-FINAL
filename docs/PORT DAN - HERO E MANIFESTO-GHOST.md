# **Documento de Especificação Técnica — Home Page

Projeto: Portfólio Institucional de Danilo Novais
Páginas Principais: Home, Sobre, Portfólio, Contato
Foco deste Documento: Home Page (seções: Header, Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)

# **SECTION NAME: Hero**

### SECTION PURPOSE
- Criar impacto visual inicial com atmosfera etérea
- Comunicar posicionamento estratégico através de texto editorial forte
- Introduzir linguagem digital experimental com WebGL como camada sensorial
- Direcionar o usuário ao Manifesto com mínima distração

---
## VISÃO GERAL

Este documento descreve a implementação da Hero e Manifesto utilizando Next.js App Router + React + TypeScript + Tailwind CSS + React Three Fiber + Framer Motion, adaptando o conceito do CodePen de referência (https://codepen.io/danilonovaisv/pen/azZbdQo) mantendo a identidade premium e preparando uma base escalável para evolução.

---

## PRÉ-CARREGAMENTO (PRELOADER)
### Conceito
- Preloader minimalista com SVG animado do "ghost"
- Progresso visual discreto durante carregamento de assets
- Transição suave para o conteúdo principal

### Componentes
```tsx
// src/components/home/HeroPreloader.tsx
import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
    >
      <div className="ghost-loader mb-8">
        <svg className="ghost-svg" height="80" viewBox="0 0 512 512" width="80" xmlns="http://www.w3.org/2000/svg">
          <path className="ghost-body" d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z" fill="white" />
          <circle className="ghost-eye left-eye" cx="208" cy="225" r="22" fill="black" />
          <circle className="ghost-eye right-eye" cx="297" cy="225" r="22" fill="black" />
        </svg>
      </div>
      <div className="loading-text font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-4">
        Summoning spirits
      </div>
      <div className="loading-progress w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div 
          className="progress-bar h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
```

### Animações
- `ghostFloat`: Animação de flutuação suave (3s)
- `eyePulse`: Animação pulsante dos olhos (2s)
- `textPulse`: Efeito de respiração no texto de carregamento
- Progresso visual com gradient azul

---

## CONTEÚDO (FIXO — SEM ANIMAÇÃO)
### Cor do texto: `#d9dade`
```
[BRAND AWARENESS]
Design, não
é só estética.
[É intenção, é estratégia, é experiência.]
```

### Regras absolutas
✅ **Texto 100% estático** - Nenhuma animação de entrada  
✅ **Sem glassmorphism** - Nenhum efeito de vidro/blur CSS  
✅ **Sem reveal progressivo** - Todo o texto aparece imediatamente  
✅ **Sem scroll binding** - Texto nunca depende de posição de scroll  

### Componente
```tsx
// src/components/home/HeroCopy.tsx
import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-[#d9dade] text-sm uppercase tracking-wide mb-4">
        [BRAND AWARENESS]
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
        Design, não<br />
        é só estética.
      </h1>
      <div className="text-[#d9dade] text-base md:text-lg mb-8">
        [É intenção, é estratégia, é experiência.]
      </div>
      <Link
        href="/sobre"
        className="text-[#d9dade] hover:text-white transition-colors duration-300 font-normal text-sm md:text-base tracking-wide"
        aria-label="Conheça mais sobre Danilo Novais"
      >
        get to know me better →
      </Link>
    </div>
  );
}
```

---

## BACKGROUND
### Cor base: `#06071f`
### Gradiente opcional:
```css
radial-gradient(circle at center, #0b0d3a 0%, #06071f 60%)
```

---

## WEBGL ATMOSFÉRICO (GHOST)
### Conceito
O WebGL funciona como uma **camada sensorial** no fundo, não como objeto principal:
- **Elemento etéreo** ("ghost") abstrato com alta emissividade
- **Glow intenso** com Bloom HDR na cor `#0057FF`
- **Ruído analógico** com scanlines sutis e vinheta
- **Follow sutil** do mouse apenas no desktop
- **Pulso temporal** orgânico (sem movimento mecânico)

### Referência Visual: https://codepen.io/danilonovaisv/pen/azZbdQo  
### Elementos Principais:
1. **Ghost Principal**: Mesh esférico com base deformada organicamente
2. **Atmosfera de Revelação**: Shader que revela o fundo conforme o ghost se move
3. **Sistema de Partículas**: Partículas que emergem do ghost durante movimento
4. **Olhos Interativos**: Brilho que responde à velocidade de movimento
5. **Fireflies**: Elementos luminosos flutuantes no fundo
6. **Pós-processamento**: Bloom + Analog Decay (grain, scanlines, jitter)

---

## ARQUITETURA DE ARQUIVOS (HERO)
```
components/home/
├─ HomeHero.tsx            ← Orchestrator (z-index layers)
├─ HeroPreloader.tsx       ← Componente de carregamento
├─ HeroCopy.tsx            ← Texto estático (sem animação)
├─ ManifestoThumb.tsx      ← Thumb do vídeo manifesto (expande ao scroll)
├─ GhostStage.tsx          ← Client boundary wrapper
└─ webgl/
   ├─ GhostCanvas.tsx      ← Cena principal R3F + postprocessing
   ├─ Ghost.tsx            ← Mesh etéreo com follow mouse
   ├─ Eyes.tsx             ← Sistema de olhos reativos
   ├─ Particles.tsx        ← Sistema de partículas
   ├─ Fireflies.tsx        ← Elementos luminosos de fundo
   ├─ AtmosphereVeil.tsx   ← Shader de revelação do fundo
   └─ postprocessing/
       ├─ AnalogDecayPass.ts  ← Efeitos analógicos (grain, scanlines)
       └─ BloomPass.ts        ← Bloom HDR customizado
```

---

## Z-INDEX (CRÍTICO)
| Z-Index | Elemento                  | Descrição                                  |
|---------|---------------------------|--------------------------------------------|
| **z-0** | **WebGL Canvas**          | Cena 3D completa (Ghost + Atmosfera + Partículas) |
| **z-10**| **Overlay Gradiente**     | Camada de vinheta opcional para integração visual |
| **z-20**| **Conteúdo**              | Texto H1 + Thumb do vídeo (interativo)     |
| **z-50**| **Preloader**             | Tela de carregamento (aparece apenas no início) |

---

## DETALHAMENTO TÉCNICO DOS COMPONENTES WEBGL

### 1. `GhostCanvas.tsx` (Setup Principal)
```tsx
// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Ghost from './Ghost';
import AtmosphereVeil from './AtmosphereVeil';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';

function MouseFollower({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const ghostRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reducedMotion, size]);

  useFrame(() => {
    if (reducedMotion || !ghostRef.current) return;
    ghostRef.current.position.x += (mouseRef.current.x * 8 - ghostRef.current.position.x) * 0.05;
    ghostRef.current.position.y += (mouseRef.current.y * 5 - ghostRef.current.position.y) * 0.05;
  });

  return <group ref={ghostRef}>{children}</group>;
}

export default function GhostCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      className="absolute inset-0 z-0"
    >
      <color attach="background" args={['#06071f']} />
      
      <ambientLight intensity={0.08} color="#0a0a2e" />
      
      <AtmosphereVeil />
      
      <MouseFollower>
        <Ghost />
        <Particles />
      </MouseFollower>
      
      <Fireflies />
      
      <EffectComposer>
        <Bloom
          intensity={2.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          radius={0.6}
        />
        <AnalogDecayPass />
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>
    </Canvas>
  );
}
```

### 2. `Ghost.tsx` (Mesh Principal)
```tsx
// src/components/home/webgl/Ghost.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ghostColor = new THREE.Color('#0057FF');
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Pulsing emissive
    meshRef.current.material.emissiveIntensity = 3.5 + Math.sin(t * 1.2) * 0.6;
    
    // Floating animation
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    
    // Gentle wobble
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#06071f"
          emissive={ghostColor}
          emissiveIntensity={3.5}
          transparent
          opacity={0.92}
          roughness={0}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Eyes />
    </group>
  );
}
```

### 3. `Eyes.tsx` (Sistema de Olhos Reativos)
```tsx
// src/components/home/webgl/Eyes.tsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Eyes() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouseSpeedRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const currentMovement = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      
      const mousePos = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
      
      mouseSpeedRef.current.x = Math.abs(mousePos.x - lastMousePos.current.x);
      mouseSpeedRef.current.y = Math.abs(mousePos.y - lastMousePos.current.y);
      lastMousePos.current = mousePos;
      
      currentMovement.current = 
        currentMovement.current * 0.95 + 
        (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion || !leftEyeRef.current || !rightEyeRef.current) return;
    
    // Eye glow based on movement speed
    const glowIntensity = Math.min(currentMovement.current * 5, 1);
    leftEyeRef.current.material.opacity = glowIntensity;
    rightEyeRef.current.material.opacity = glowIntensity;
    
    // Make eyes look at camera
    leftEyeRef.current.lookAt(camera.position);
    rightEyeRef.current.lookAt(camera.position);
  });

  return (
    <group>
      {/* Eye sockets */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Glowing eyes */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial 
          color="#0057FF" 
          transparent 
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial 
          color="#0057FF" 
          transparent 
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh position={[-0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial 
          color="#5227FF" 
          transparent 
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial 
          color="#5227FF" 
          transparent 
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
```

### 4. `AnalogDecayPass.ts` (Pós-processamento)
```tsx
// src/components/home/webgl/postprocessing/AnalogDecayPass.ts
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const AnalogDecayShader = shaderMaterial(
  {
    tDiffuse: new THREE.Texture(),
    uTime: 0,
    uIntensity: 0.7,
    uGrain: 0.4,
    uScanlines: 1.0,
    uJitter: 0.5,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    uniform float uGrain;
    uniform float uScanlines;
    uniform float uJitter;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Jitter sutil
      if (uJitter > 0.01) {
        uv += (rand(vec2(uTime)) - 0.5) * uJitter * 0.002;
      }

      vec4 color = texture2D(tDiffuse, uv);

      // Grain
      if (uGrain > 0.01) {
        float grain = rand(uv + uTime) * 2.0 - 1.0;
        color.rgb += grain * uGrain * 0.08 * uIntensity;
      }

      // Scanlines
      if (uScanlines > 0.01) {
        float scan = sin(uv.y * 1200.0 + uTime * 2.0) * 0.5 + 0.5;
        color.rgb *= mix(1.0, 0.97, scan * uScanlines * uIntensity);
      }

      gl_FragColor = color;
    }
  `
);

extend({ AnalogDecayShader });

export default function AnalogDecayPass() {
  return (
    <shaderPass
      args={[AnalogDecayShader]}
      tDiffuse={null}
      uTime={0}
      uIntensity={0.7}
      uGrain={0.4}
      uScanlines={1.0}
      uJitter={0.5}
    />
  );
}
```

---

## MANIFESTO — VÍDEO (Animação Ajustada: Reveal Suave)

### Conceito de Animação
A seção Manifesto deve aparecer com um **efeito de revelação suave** quando entra na viewport, semelhante ao comportamento observado no site de referência para as seções subsequentes à hero. O vídeo é o elemento central e deve ganhar destaque com uma animação de fade-in e scale leve. A transição entre Hero e Manifesto é uma **mudança de seção clara**, não uma expansão contínua do mesmo elemento.

### Regras Atualizadas
- **Mesmo arquivo** da Hero: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- **Autoplay** + **Loop**
- **Muted por padrão** - Áudio apenas quando em foco (IntersectionObserver)
- **Sem overlays** - Nenhum elemento visual sobreposto ao vídeo
- **Sem fullscreen forçado** - Respeita a proporção original
- **Animação de entrada**: Fade-in e scale leve usando Framer Motion (`whileInView`, `variants`).
- **Nenhuma expansão via scroll** do vídeo thumbnail da Hero.

### Componente da Seção Manifesto
```tsx
// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

const manifestoVideoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] // Easing premium
    }
  }
};

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // Aciona quando 100px entram na view

  return (
    <section 
      id="manifesto"
      ref={sectionRef}
      className="w-full py-20 bg-[#06071f] flex items-center justify-center" // Espaçamento e cor de fundo
    >
      <div className="max-w-4xl w-full px-4"> {/* Container centralizado */}
        <motion.div
          variants={manifestoVideoVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animação acionada pelo Intersection Observer
          className="w-full aspect-video rounded-xl overflow-hidden" // Mantém proporção e cantos arredondados
        >
          <video
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
            muted
            loop
            playsInline
            autoPlay // Opcional, dependendo do comportamento desejado ao entrar na view
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
```

---

## INTERAÇÃO HERO → MANIFESTO (Atualizado)

### Comportamento
- **Clique na thumb**: Scroll suave até `#manifesto`
- **Nenhuma transição visual agressiva** entre estados
- **Thumb mantém animação própria** (hover/scale) mas **não expande visualmente**.
- **Scroll suave** com easing natural.
- **A seção Manifesto tem sua própria animação de entrada** quando entra na viewport.

### Implementação (Exemplo em Home Page)
```tsx
// src/app/page.tsx (ou src/app/home/page.tsx)
import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      {/* Outras seções... */}
    </>
  );
}
```

---

## ACESSIBILIDADE E PERFORMANCE
### Acessibilidade
✅ **Contraste AA garantido** (#d9dade sobre #06071f = ~7.2:1)  
✅ **`prefers-reduced-motion`**:
   - Desativa follow do mouse
   - Desativa bloom intenso
   - **Desativa animação de entrada do vídeo manifesto**
   - Mantém layout estático
✅ **`aria-label`** em todos os elementos interativos
✅ **Vídeo sempre inicia mudo**

### Performance
✅ **Canvas isolado** (client-only com dynamic import)
✅ **DPR máximo: 2** para dispositivos móveis
✅ **Fallback CSS** se WebGL falhar
✅ **Carregamento progressivo** com preloader
✅ **Limite de partículas** (máximo 250, renderização parcial)
✅ **Instancing** para fireflies
✅ **Animações de entrada via `useInView`** para otimizar performance de scroll

### Implementação de fallback:
```tsx
// src/components/home/GhostStage.tsx
'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(
  () => import('./webgl/GhostCanvas'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0b0d3a_0%,_#06071f_60%)]" />
    )
  }
);

export default function GhostStage() {
  return <GhostCanvas />;
}
```

---

## NÃO NEGOCIÁVEL
❌ **Sem glassmorphism** - Nenhum efeito de vidro/blur CSS  
❌ **Sem texto animado** - Texto 100% estático desde o primeiro frame  
❌ **Sem 3D tradicional** - Nenhum modelo GLB ou objeto sólido  
❌ **Sem overlays sobre vídeo** - Vídeo puro sem elementos visuais sobrepostos  
❌ **Sem expansão via scroll do vídeo** - O vídeo da Hero não se transforma/expande para a seção Manifesto  
✅ **WebGL como atmosfera** - Elemento de fundo que não compete com o conteúdo  
✅ **Texto como âncora editorial** - Hierarquia clara: conteúdo > atmosfera  
✅ **Animação de entrada do vídeo manifesto** - Usar `whileInView` e `useInView` do Framer Motion

---

## RESULTADO ESPERADO
- **Hero silenciosa e editorial** com texto imediatamente legível
- **Animação como pano de fundo vivo** que responde organicamente ao usuário
- **Narrativa clara** sem distrações visuais desnecessárias
- **Seção Manifesto com entrada suave e premium**, alinhada com a estética do site de referência
- **Base escalável** para futuras interações mantendo a identidade "Ghost Blue"

---

## NOTAS DE IMPLEMENTAÇÃO
1. **TT Norms Pro** deve ser configurada no `tailwind.config.ts` e carregada globalmente via `next/font`
2. **Hook de reduced motion**:
```tsx
// src/hooks/usePrefersReducedMotion.ts
import { useState, useEffect } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```
3. **Otimização de performance**:
   - Limitar número de draw calls
   - Usar `drei/instances` para fireflies
   - Desativar antialiasing no canvas (`antialias: false`)
   - Manter geometrias simples
   - Usar `useInView` para acionar animações de scroll de forma performática
