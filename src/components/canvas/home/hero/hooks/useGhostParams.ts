import { useMemo } from 'react';
import { GhostSceneParams } from '../types';

export function useGhostParams(performanceConfig: any): GhostSceneParams {
  return useMemo(() => {
    const MAX_PARTICLES = 500;
    
    return {
      bodyColor: 0x040013, // Ghost System Void Black
      glowColor: 'blue',   // Ghost System Blue (0x0080ff)
      eyeGlowColor: 'violet',
      ghostOpacity: 0.92,
      ghostScale: 2.4,
      emissiveIntensity: 6.2,
      pulseSpeed: 1.4,
      pulseIntensity: 0.5,
      eyeGlowIntensity: 4.8,
      eyeGlowDecay: 0.96,
      eyeGlowResponse: 0.35,
      rimLightIntensity: 2.2,
      followSpeed: 0.05,
      wobbleAmount: 0.35,
      floatSpeed: 1.6,
      movementThreshold: 0.07,
      particleCount: Math.min(
        performanceConfig.particleCount * 5,
        MAX_PARTICLES
      ),
      particleDecayRate: 0.005,
      particleColor: 'violet',
      createParticlesOnlyWhenMoving: true,
      particleCreationRate: performanceConfig.quality === 'low' ? 2 : 5,
      revealRadius: 37,
      fadeStrength: 1.7,
      baseOpacity: 0.9,
      revealOpacity: 0.05,
      fireflyGlowIntensity: 4.3,
      fireflySpeed: 0.09,
      analogIntensity: 0.45, // Further refinement for editorial feel
      analogGrain: 0.3,
      analogBleeding: 0.4, 
      analogVSync: 0.8,
      analogScanlines: 0.25,
      analogVignette: 1.6,
      analogJitter: 0.15,
      limboMode: false,
      // Environment & Post-Processing
      bloomStrength: performanceConfig.quality === 'low' ? 0.15 : 0.25,
      bloomRadius: 1.25,
      bloomThreshold: 0.0,
      ambientLightColor: 0x040013,
      ambientLightIntensity: 0.05,
      rimLightColor1: 0x0048ff, // Ghost System Blue
      rimLightColor2: 0x0080ff,
      exposure: 0.95,
    };
  }, [performanceConfig]);
}
