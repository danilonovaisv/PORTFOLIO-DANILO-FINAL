'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
// import { useControls } from 'leva'; // Opcional para debug
import { GHOST_CONFIG } from '@/config/ghost.config';

// Componentes
import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import Particles from './Particles'; // Certifique-se que Particles.tsx está na pasta
import { AnalogDecay } from '../effects/AnalogDecayPass'; // Ajuste o caminho conforme sua pasta

export default function GhostCanvas() {
  // OPCIONAL: Se quiseres manter o Leva para ajustes finais, descomenta isto:
  /*
  const config = useControls('Ghost Config', {
     mainColor: { value: GHOST_CONFIG.colors.main },
     vhsIntensity: { value: GHOST_CONFIG.vhs.intensity, min: 0, max: 2 },
     // ... outros controles mapeados para GHOST_CONFIG
  });
  */

  // Por padrão, usamos a config estática para performance
  const cfg = GHOST_CONFIG;

  return (
    <div className="absolute inset-0 z-20 h-full w-full pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, stencil: false, depth: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Suspense fallback={null}>
          {/* Luzes Baseadas na Config */}
          <ambientLight intensity={0.2} />
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={cfg.colors.main}
            distance={10}
          />
          <pointLight
            position={[-3, -2, 2]}
            intensity={1.5}
            color={cfg.colors.fill}
            distance={10}
          />

          {/* O Fantasma */}
          <group position={[0, -0.5, 0]}>
            <Ghost config={cfg}>
              <GhostEyes color={cfg.colors.eyes} />
            </Ghost>
          </group>

          {/* Partículas Atmosféricas */}
          <Particles count={150} color={cfg.colors.main} />

          {/* Efeitos de Pós-Processamento */}
          <EffectComposer disableNormalPass>
            <Bloom
              luminanceThreshold={0.2}
              mipmapBlur
              intensity={cfg.intensity.bloom}
              radius={0.6}
            />

            {/* Nosso VHS Refinado */}
            <AnalogDecay
              intensity={cfg.vhs.intensity}
              scanlines={cfg.vhs.scanlines}
              noise={cfg.vhs.noise}
            />

            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
