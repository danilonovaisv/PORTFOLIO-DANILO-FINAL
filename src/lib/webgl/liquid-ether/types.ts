import * as THREE from 'three';

export interface SimOptions {
  iterations_poisson: number;
  iterations_viscous: number;
  mouse_force: number;
  resolution: number;
  cursor_size: number;
  viscous: number;
  isBounce: boolean;
  dt: number;
  isViscous: boolean;
  BFECC: boolean;
}

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export interface ShaderPassProps {
  material?: THREE.ShaderMaterialParameters;
  output?: THREE.WebGLRenderTarget | null;
  [key: string]: any;
}

export interface Uniforms {
  [key: string]: THREE.IUniform;
}

export interface AutoDriverOptions {
  enabled: boolean;
  speed: number;
  resumeDelay: number;
  rampDuration: number;
}
