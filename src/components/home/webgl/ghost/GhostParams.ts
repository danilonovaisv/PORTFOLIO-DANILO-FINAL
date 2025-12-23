export const fluorescent = {
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
} as const;

export type GlowKey = keyof typeof fluorescent;

export type Params = {
    glowColor: GlowKey;
    eyeGlowColor: GlowKey;
    emissiveIntensity: number;
    followSpeed: number;
    wobbleAmount: number;
    revealRadius: number;
    fadeStrength: number;
    baseOpacity: number;
    revealOpacity: number;
    analogIntensity: number;
    analogGrain: number;
    analogBleeding: number;
    analogVSync: number;
    analogScanlines: number;
    analogVignette: number;
    analogJitter: number;
    limboMode: boolean;
};

export const DEFAULT: Params = {
    glowColor: 'blue',
    eyeGlowColor: 'green',
    emissiveIntensity: 5.8,
    followSpeed: 0.075,
    wobbleAmount: 0.35,
    revealRadius: 43,
    fadeStrength: 2.2,
    baseOpacity: 0.35,
    revealOpacity: 0.0,
    analogIntensity: 0.6,
    analogGrain: 0.4,
    analogBleeding: 1.0,
    analogVSync: 1.0,
    analogScanlines: 1.0,
    analogVignette: 1.0,
    analogJitter: 0.4,
    limboMode: false,
};
