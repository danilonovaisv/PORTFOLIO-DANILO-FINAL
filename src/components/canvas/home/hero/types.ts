import * as THREE from 'three';

export interface ParticleData {
  velocity: THREE.Vector3;
  currentPos: THREE.Vector3;
  life: number;
  decay: number;
  rotationSpeed: THREE.Vector3;
  randomScale: number;
}

export interface FireflyData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  speed: number;
}

export interface GhostSceneParams {
  bodyColor: number;
  glowColor: string;
  eyeGlowColor: string;
  ghostOpacity: number;
  ghostScale: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  eyeGlowIntensity: number;
  eyeGlowDecay: number;
  eyeGlowResponse: number;
  rimLightIntensity: number;
  followSpeed: number;
  wobbleAmount: number;
  floatSpeed: number;
  movementThreshold: number;
  particleCount: number;
  particleDecayRate: number;
  particleColor: string;
  createParticlesOnlyWhenMoving: boolean;
  particleCreationRate: number;
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
  fireflyGlowIntensity: number;
  fireflySpeed: number;
  analogIntensity: number;
  analogGrain: number;
  analogBleeding: number;
  analogVSync: number;
  analogScanlines: number;
  analogVignette: number;
  analogJitter: number;
  limboMode: boolean;
  // Environment & Post-Processing
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  ambientLightColor: number;
  ambientLightIntensity: number;
  rimLightColor1: number;
  rimLightColor2: number;
  exposure: number;
}
export const FLUORESCENT_COLORS: { [key: string]: number } = {
  cyan: 0x00ffff,
  lime: 0x00ff00,
  magenta: 0xff00ff,
  yellow: 0xffff00,
  orange: 0xff4500,
  pink: 0xff1493,
  purple: 0x9400d3,
  blue: 0x0080ff,
  green: 0x00ff80,
  red: 0xff0040,
  teal: 0x00ffaa,
  violet: 0x8a2be2,
};
