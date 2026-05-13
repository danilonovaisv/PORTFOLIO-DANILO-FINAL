# Exemplos de Código - About Beliefs

Este documento contém snippets de código prontos para implementar os ajustes especificados.

---

## 📱 Animação Mobile - Frases Rotativas (Horizontal)

### Componente: `BeliefSection.tsx` ou `BeliefMobileTextLayer`

```typescript
// MOBILE: Animação HORIZONTAL (entrada direita → saída esquerda)
const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  segmentSize,
  scrollYProgress,
}) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Calcular ranges para cada frase
  const startPoint = index * segmentSize;
  const endPoint = (index + 1) * segmentSize;

  const entryStart = startPoint + 0.02;
  const entryEnd = startPoint + segmentSize * 0.25;
  const exitStart = endPoint - segmentSize * 0.25;
  const exitEnd = endPoint - 0.02;

  // ✅ NOVO: Entrada da DIREITA, saída para ESQUERDA
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [24, 0, 0, -24], // Valores pequenos em pixels
    { ease: ghostEase }
  );

  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  const blur = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [10, 0, 0, 10]
  );

  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.div
      style={{ x, opacity, filter }}
      className="absolute bottom-0 left-0 right-0 px-6 pb-[12vh]"
    >
      <span className="block text-blueAccent italic font-semibold text-[clamp(2rem,7vw,3rem)] leading-[1.15] tracking-[-0.01em] text-center select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]">
        {text.replace(/\n/g, ' ')}
      </span>
    </motion.div>
  );
};
```

---

## 💻 Animação Desktop - Frases Rotativas (Vertical)

### Componente: `BeliefSection.tsx`

```typescript
// DESKTOP: Animação VERTICAL (entrada baixo → saída cima)
const BeliefLineDesktop: React.FC<BeliefLineProps> = ({
  line,
  index,
  scrollYProgress,
  animationRange,
}) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // ✅ Mantém comportamento atual (vertical)
  const y = useTransform(
    scrollYProgress,
    [
      animationRange[0] + index * 0.02,
      animationRange[1] + index * 0.02,
      0.7,
      0.85
    ],
    [20, 0, 0, -20], // Entra de baixo, sai para cima
    { ease: ghostEase }
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      animationRange[0] + index * 0.02,
      animationRange[1] + index * 0.02,
      0.7,
      0.85
    ],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  const blur = useTransform(
    scrollYProgress,
    [
      animationRange[0] + index * 0.02,
      animationRange[1] + index * 0.02,
      0.7,
      0.85
    ],
    [10, 0, 0, 10]
  );

  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <div className="overflow-visible mb-1 md:mb-2 w-full">
      <motion.span
        style={{ y, opacity, filter }}
        className="block text-blueAccent italic font-semibold text-[clamp(2.75rem,4.5vw,2.5rem)] leading-[1.2] text-left whitespace-pre-line select-none tracking-[-0.01em] max-w-fit"
      >
        {line}
      </motion.span>
    </div>
  );
};
```

---

## 🎯 BeliefFixedHeader - Posicionamento Responsivo

### Componente: `BeliefFixedHeader.tsx`

```typescript
export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
  progress,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-30 flex h-screen pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        {/* ✅ Desktop: centro visual + direita */}
        {/* ✅ Mobile: top-right */}
        <div className="flex h-full items-start md:items-center justify-end pt-16 md:pt-0">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-4 md:pr-0">

            {/* Primeira parte: "Acredito no..." */}
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tighter mb-4 md:mb-8 uppercase font-black mix-blend-difference whitespace-nowrap">
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.1, 0.2]}>
                  Acredito no
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.12, 0.22]}>
                  design que
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.14, 0.24]}>
                  muda o dia
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.16, 0.26]}>
                  de alguém.
                </MorphText>
              </div>
            </h2>

            {/* Segunda parte: "Não pelo choque..." */}
            <div className="flex flex-col items-end gap-1 text-white text-sm md:text-2xl lg:text-4xl font-h1 leading-[1.2] tracking-normal font-bold whitespace-nowrap">
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.22, 0.32]}>
                  Não pelo choque,
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.24, 0.34]}>
                  mas pela conexão.
                </MorphText>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Helper MorphText (já implementado)
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
  const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
    ease: ghostEase,
  });
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};
```

---

## 👻 GhostModel - Alinhamento Vertical com Texto

### Componente: `GhostModel.tsx`

```typescript
const GhostModel: React.FC<GhostModelProps> = ({ scrollProgress }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { nodes, materials } = useGLTF(GHOST_URL) as unknown as GLTFResult;

  const scrollConfig = useMemo(
    () => ({
      startY: -1.5,
      endY: 4.5,
      curveIntensity: 1.5,
      rotationSpeed: Math.PI * 4,
      // ✅ Novo: escala aumenta no final
      scaleBoost: 0.1, // +10% quando última frase entra
    }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;

    const scrollOffset = scrollProgress.get();

    // ✅ Escala aumenta após 80% do scroll
    const baseScale = responsiveScale;
    const targetScale = scrollOffset > 0.8
      ? baseScale * (1 + scrollConfig.scaleBoost)
      : baseScale;

    group.current.scale.setScalar(
      THREE.MathUtils.lerp(
        group.current.scale.x,
        targetScale,
        0.05
      )
    );

    // Posição Y (movimento vertical)
    const targetY = THREE.MathUtils.lerp(
      scrollConfig.startY,
      scrollConfig.endY,
      scrollOffset
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.1
    );

    // Movimento em curva (X)
    const targetX =
      Math.sin(scrollOffset * Math.PI * 1.5) * scrollConfig.curveIntensity;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.05
    );

    // Profundidade (Z)
    const targetZ = Math.cos(scrollOffset * Math.PI) * 1;
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.05
    );

    // Rotação principal (Y)
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scrollOffset * scrollConfig.rotationSpeed,
      0.05
    );

    // ✅ Wobble intensificado após 80%
    const wobbleIntensity = scrollOffset > 0.8 ? 0.3 : 0.2;
    const targetTiltX = state.mouse.y * wobbleIntensity;
    const targetTiltZ = -state.mouse.x * wobbleIntensity;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetTiltX,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetTiltZ,
      0.1
    );

    // Câmera acompanha Ghost
    state.camera.lookAt(0, group.current.position.y, 0);
  });

  const responsiveScale = Math.min(viewport.width / 3.5, 1.6);

  return (
    <group ref={group} dispose={null}>
      <Float
        speed={2}
        rotationIntensity={scrollProgress.get() > 0.8 ? 0.7 : 0.5}
        floatIntensity={scrollProgress.get() > 0.8 ? 0.7 : 0.5}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Meshes do Ghost */}
        <group>
          <mesh
            name="Body_Ghost_White_0"
            castShadow
            receiveShadow
            geometry={nodes.Body_Ghost_White_0.geometry}
            material={materials.Ghost_White}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Eyes_Eyes_0"
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
            position={[0, 1.5578, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Hat_Hat_Black_0"
            castShadow
            receiveShadow
            geometry={nodes.Hat_Hat_Black_0.geometry}
            material={materials.Hat_Black}
            position={[0, 2.9913, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Rim_Rim_Red_0"
            castShadow
            receiveShadow
            geometry={nodes.Rim_Rim_Red_0.geometry}
            material={materials.Rim_Red}
            position={[0, 2.3541, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </Float>
    </group>
  );
};
```

---

## 🎨 Transições de Background Color

### Componente: `BeliefSection.tsx`

```typescript
import { BRAND } from '@/config/brand';

const COLORS = [
  BRAND.colors.bluePrimary,    // #0048ff
  BRAND.colors.purpleDetails,  // #8705f2
  BRAND.colors.pinkDetails,    // #f501d3
  BRAND.colors.bluePrimary,    // #0048ff
  BRAND.colors.purpleDetails,  // #8705f2
  BRAND.colors.pinkDetails,    // #f501d3
];

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  bgColor,
  isFirst = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // ✅ Transição suave de background
  return (
    <motion.section
      ref={containerRef}
      aria-label={text.replace(/\n/g, ' ')}
      style={{ backgroundColor: bgColor }}
      className={`relative w-full h-screen flex overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isMobile
            ? 'items-end justify-start'
            : `items-center justify-start pl-8 lg:pl-16`
        }
      `}
    >
      {/* Conteúdo */}
    </motion.section>
  );
};
```

---

## 📐 Layout Mobile - Ghost Esquerda + Texto Direita

### Componente: `AboutBeliefs.tsx`

```typescript
export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section ref={containerRef} className="relative w-full">

      {/* LAYER 1: Backgrounds coloridos */}
      <div className="relative pointer-events-none z-10 w-full">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 3: Final Text Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
        <BeliefFinalSectionOverlay />
      </div>

      {/* LAYER 4: Canvas 3D (Sticky - Top Layer) */}
      {/* ✅ Mobile: Ghost à esquerda, alinhado com texto (rodapé) */}
      {/* ✅ Desktop: Centralizado, alinhado com texto (esquerda) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto flex items-center justify-center md:justify-start">

          {/* 3D Scene Wrapper - Responsive Positioning */}
          <div className="w-full h-full relative">
            {/* Mobile: Ghost posicionado à esquerda */}
            {/* Desktop: Ghost posicionado à direita */}
            <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2">
              <GhostScene scrollProgress={scrollYProgress} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
```

---

## 🎭 Manifesto Final - Morphing Text

### Componente: `BeliefFinalSectionOverlay.tsx`

```typescript
export const BeliefFinalSectionOverlay: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <motion.div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] // Ghost easing
        }}
      >
        {/* Linha 1: ISSO É */}
        <div className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black mix-blend-overlay opacity-80">
          ISSO É
        </div>

        {/* Linha 2: GHOST (destaque) */}
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase relative z-10 text-bluePrimary">
          GHOST
        </div>

        {/* Linha 3: DESIGN */}
        <div className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black mix-blend-overlay opacity-80">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};
```

---

## 🔧 Hook Customizado - useIsMobile

```typescript
/**
 * Hook para detectar mobile
 * Breakpoint: 768px (md)
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
```

---

## 🎯 Constantes e Configurações

```typescript
// Frases do manifesto
const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

// Cores de background
const COLORS = [
  BRAND.colors.bluePrimary,    // #0048ff
  BRAND.colors.purpleDetails,  // #8705f2
  BRAND.colors.pinkDetails,    // #f501d3
  BRAND.colors.bluePrimary,    // #0048ff
  BRAND.colors.purpleDetails,  // #8705f2
  BRAND.colors.pinkDetails,    // #f501d3
];

// Easing padrão (Ghost easing)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

// URL do modelo 3D
const GHOST_GLB_URL =
  'https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';
```

---

## 🎨 Classes Tailwind Úteis

```typescript
// Container padrão
className="std-grid max-w-none w-full"

// Padding responsivo
className="px-6 md:px-12 lg:px-16 xl:px-24"

// Texto rotativo mobile
className="text-blueAccent italic font-semibold text-[clamp(2rem,7vw,3rem)] leading-[1.15] tracking-[-0.01em] text-center select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]"

// Texto rotativo desktop
className="text-blueAccent italic font-semibold text-[clamp(2.75rem,4.5vw,2.5rem)] leading-[1.2] text-left whitespace-pre-line select-none tracking-[-0.01em] max-w-fit"

// Header sticky
className="sticky top-0 z-30 flex h-screen pointer-events-none"

// Manifesto final
className="text-white font-display leading-[0.78] tracking-tighter uppercase font-black"

// Background transition
className="transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
```

---

## 🚀 Exemplo Completo - Integração

```typescript
'use client';

import React from 'react';
import { cubicBezier, useScroll, useTransform } from 'framer-motion';
import { BeliefSection, BeliefMobileTextLayer } from '../beliefs/BeliefSection';
import { BeliefFinalSection } from '../beliefs/BeliefFinalSection';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '../beliefs/BeliefFinalSectionOverlay';
import GhostScene from '../3d/GhostScene';
import { BRAND } from '@/config/brand';

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section ref={containerRef} className="relative w-full">
      {/* LAYER 1: Backgrounds coloridos */}
      <div className="relative pointer-events-none z-10 w-full">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
          />
        ))}

        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 3: Final Text Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
        <BeliefFinalSectionOverlay />
      </div>

      {/* LAYER 4: Canvas 3D */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto flex items-center justify-center">
          <div className="w-full h-full md:absolute md:inset-0 relative">
            <GhostScene scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBeliefs;
```

---

**Versão:** 1.0
**Data:** 2025
**Uso:** Copiar e colar snippets conforme necessário
