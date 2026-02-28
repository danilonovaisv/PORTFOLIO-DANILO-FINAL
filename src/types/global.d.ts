/**
 * Tipos globais para extensões do Three.js e React Three Fiber
 */
import type { ShaderMaterial, Texture } from 'three';

import type { ShaderPass } from 'three-stdlib';

/**
 * Interface para uniforms do shader AnalogDecay
 */
export interface AnalogDecayUniforms {
  tDiffuse: { value: Texture };
  uTime: { value: number };
  uIntensity: { value: number };
  uGrain: { value: number };
  uScanlines: { value: number };
  uJitter: { value: number };
}

/**
 * Interface para o material AnalogDecay
 */
export interface AnalogDecayShaderMaterial extends ShaderMaterial {
  uniforms: AnalogDecayUniforms;
}

/**
 * Extensão dos ThreeElements para elementos customizados do R3F
 */
declare module '@react-three/fiber' {
  // eslint-disable-next-line no-unused-vars
  interface ThreeElements {
    analogDecayShader: ReactThreeFiber.Object3DNode<
      AnalogDecayShaderMaterial,
      typeof AnalogDecayShaderMaterial
    >;
    shaderPass: ReactThreeFiber.Object3DNode<ShaderPass, typeof ShaderPass>;
    revealShaderMaterial: ReactThreeFiber.Object3DNode<
      ShaderMaterial,
      typeof ShaderMaterial
    >;
    revealMaterial: ReactThreeFiber.Object3DNode<
      ShaderMaterial,
      typeof ShaderMaterial
    > & {
      uGhostPos?: THREE.Vector3;
      uRevealRadius?: number;
      uBaseColor?: THREE.Color;
      uRevealColor?: THREE.Color;
      uOpacity?: number;
      transparent?: boolean;
    };
  }
}

/**
 * Declaração global para variáveis CSS customizadas do Ghost
 */
declare global {
  // eslint-disable-next-line no-unused-vars
  interface CSSProperties {
    '--gx'?: string;
    '--gy'?: string;
    '--ghost-energy'?: string;
    '--ghost-x'?: string;
    '--ghost-y'?: string;
    '--ghost-radius'?: string;
  }
}
