// src/components/GhostCanvas.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from '@/components/canvas/hero/Fireflies';
import AtmosphereVeil from '@/components/canvas/hero/AtmosphereVeil'; // Importe o novo componente
import { AnalogDecay } from '@/components/canvas/hero/AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Ghost from '@/components/canvas/Ghost';

interface GhostCanvasProps {
  _ghostRef?: React.RefObject<any>;
}

const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  return (
    <>
      {/* Luzes diretamente no JSX */}
      <ambientLight
        color={GHOST_CONFIG.ambientLightColor}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
      <directionalLight
        position={[-8, 6, -4]}
        color={0x4a90e2}
        intensity={GHOST_CONFIG.rimLightIntensity}
      />
      <directionalLight
        position={[8, -4, -6]}
        color={0x50e3c2}
        intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
      />
      <Ghost mousePosition={mousePosition} />
      <Environment preset="apartment" />
      <Fireflies />
      <AtmosphereVeil ghostPosition={mousePosition} />
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const GhostCanvas = ({ _ghostRef }: GhostCanvasProps) => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  // Detecta movimento do mouse para o ghost seguir
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }} // Inicia com opacidade 1, sem preloader
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 z-20 pointer-events-none" // Z-index 20 para ficar acima do conteúdo da Hero e pointer-events-none para permitir interação com o texto abaixo
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true, // Importante para transparência
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 0, GHOST_CONFIG.cameraDistance],
          fov: GHOST_CONFIG.cameraFov,
        }} // Use valores do config
        dpr={GHOST_CONFIG.rendererDPR} // Use valores do config
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(0x000000, 0); // Fundo transparente
        }}
      >
        <Scene mousePosition={mousePosition} />
        {/* Aplicação do efeito de pós-processamento */}
        <EffectComposer>
          <AnalogDecay
            grain={GHOST_CONFIG.analogGrain}
            bleeding={GHOST_CONFIG.analogBleeding}
            vsync={GHOST_CONFIG.analogVSync}
            scanlines={GHOST_CONFIG.analogScanlines}
            vignette={GHOST_CONFIG.analogVignette}
            intensity={GHOST_CONFIG.analogIntensity}
            jitter={GHOST_CONFIG.analogJitter}
            limboMode={false} // GHOST_CONFIG.limboMode se for booleano
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
