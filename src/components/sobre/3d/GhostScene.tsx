import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { beliefMotion, beliefZIndex } from '../../../config/beliefTokens';
import { usePointerParallax } from '../../../hooks/usePointerParallax';
import { useWebGLSupport } from '../../../hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

function SceneInvalidator() {
  const { invalidate } = useThree();

  useEffect(() => {
    const handleUpdate = () => invalidate();
    
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('mousemove', handleUpdate, { passive: true });
    
    // Initial render
    invalidate();

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('mousemove', handleUpdate);
    };
  }, [invalidate]);

  return null;
}

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: beliefMotion.ghostIntroDuration,
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }, []);

  if (!supportsWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <div
      ref={containerRef}
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none fixed inset-0 opacity-0"
      style={{ zIndex: beliefZIndex.ghost }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, isMobile ? 1 : 2]}
        camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}
      >
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight
          position={[2.4, 3.2, 5]}
          intensity={1.35}
          color="#ffffff"
        />
        <pointLight position={[-3, 1.8, 4]} intensity={0.55} color="#bfe8ff" />
        <pointLight
          position={[2.2, -1.5, 3.8]}
          intensity={0.3}
          color="#ffd8f8"
        />
        <SceneInvalidator />
        <GhostModel
          isMobile={isMobile}
          shouldReduceMotion={shouldReduceMotion}
          scrollYProgress={scrollYProgress}
          pointerX={pointer.x}
          pointerY={pointer.y}
        />
      </Canvas>
    </div>
  );
}
