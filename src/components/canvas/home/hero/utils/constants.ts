/**
 * Ghost Scene Constants
 * Centralized configuration for the Ghost WebGL scene
 */

// Particle System
export const MAX_PARTICLES = 500; // Limite máximo para InstancedMesh

// Fluorescent Color Palette
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

// Default Ghost Parameters
export const DEFAULT_GHOST_PARAMS = {
    bodyColor: 0x0f2027,
    glowColor: 'blue' as keyof typeof FLUORESCENT_COLORS,
    eyeGlowColor: 'violet' as keyof typeof FLUORESCENT_COLORS,
    ghostOpacity: 0.88,
    ghostScale: 2.4,
    emissiveIntensity: 5.8,
    pulseSpeed: 1.6,
    pulseIntensity: 0.6,
    eyeGlowIntensity: 4.5,
    eyeGlowDecay: 0.95,
    eyeGlowResponse: 0.31,
    rimLightIntensity: 1.8,
    followSpeed: 0.05,
    wobbleAmount: 0.35,
    floatSpeed: 1.6,
    movementThreshold: 0.07,
    particleDecayRate: 0.005,
    particleColor: 'violet' as keyof typeof FLUORESCENT_COLORS,
    particleCreationRate: 5,
    createParticlesOnlyWhenMoving: true,
    revealRadius: 37,
    fadeStrength: 1.7,
    baseOpacity: 0.9,
    revealOpacity: 0.05,
    fireflyGlowIntensity: 4.3,
    fireflySpeed: 0.09,
    analogIntensity: 0.9,
    analogGrain: 0.4,
    analogBleeding: 0.9,
    analogVSync: 1.7,
    analogScanlines: 1.0,
    analogVignette: 2.4,
    analogJitter: 0.5,
    limboMode: false,
};

// Bloom Settings
export const BLOOM_SETTINGS = {
    strength: 0.3,
    radius: 1.25,
    threshold: 0.0,
};

// Device Detection
export const detectDevice = () => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth <= 768;
    return {
        isTouchDevice,
        isMobileWidth,
        isMobile: isTouchDevice || isMobileWidth,
    };
};
