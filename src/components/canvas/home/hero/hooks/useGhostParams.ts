import { useMemo } from 'react';
import { GhostSceneParams } from '../types';

export function useGhostParams(performanceConfig: any): GhostSceneParams {
  return useMemo(() => {
    const MAX_PARTICLES = 500;

    return {
      bodyColor: 0x040013, // Ghost System Void Black
      glowColor: 'blue', // Ghost System Blue (0x0080ff)
      eyeGlowColor: 'violet',
      ghostOpacity: 0.92,
      ghostScale: 2.4,
      emissiveIntensity: 1.8, // Reduced further from 2.8 to 1.8 for an ultra-subtle elegant glow
      pulseSpeed: 1.4,
      pulseIntensity: 0.12, // Clamp to remove flicker on emissive modulation
      eyeGlowIntensity: 2.4, // Reduced from 3.8 to 2.4 to stay soft and balanced
      eyeGlowDecay: 0.96,
      eyeGlowResponse: 0.35,
      rimLightIntensity: 0.75, // Reduced further from 1.1 to 0.75 to soften outer contours
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
      fireflyGlowIntensity: 1.3, // Reduced further from 2.2 to 1.3 to keep the fireflies ethereal and integrated
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
      bloomStrength: performanceConfig.quality === 'low' ? 0.18 : 0.35,
      bloomRadius: 1.1,
      // Threshold > 0 so only highly emissive pixels bloom — eliminates frame-wide bloom instability
      bloomThreshold: 0.85,
      ambientLightColor: 0x040013,
      ambientLightIntensity: 0.05,
      rimLightColor1: 0x0048ff, // Ghost System Primary Blue
      rimLightColor2: 0x4fe6ff, // Ghost System Accent Blue
      exposure: 0.95,
    };
  }, [performanceConfig]);
}
