export const MOTION_TOKENS = {
    duration: {
        slow: 1.2,
        normal: 0.8,
        fast: 0.4,
        instant: 0.2,
    },
    easing: {
        base: [0.22, 1, 0.36, 1], // Smooth Sine/Sine-like Easing
        ghost: [0.25, 1, 0.5, 1], // Even softer for atmospheric effects
        heavy: [0.43, 0.13, 0.23, 0.96], // For large movements
    },
    stagger: {
        tight: 0.05,
        normal: 0.1,
        relaxed: 0.18,
    },
    reveal: {
        threshold: 0.1,
        margin: '-50px', // Trigger slightly before it hits the viewport
    },
} as const;
