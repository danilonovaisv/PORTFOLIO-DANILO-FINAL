'use client';

/**
 * BeliefOverlay — Layer 1 (z-10).
 * Cross-fade transitional para evitar banding OLED entre cores HSL.
 * Opacidade pulsa levemente nas transições de cor sem dominar a cena.
 */

export const BeliefOverlay = () => {
  return (
    <div
      id="belief-overlay"
      className="absolute inset-0 z-10 pointer-events-none bg-black opacity-0"
      aria-hidden="true"
    />
  );
};
