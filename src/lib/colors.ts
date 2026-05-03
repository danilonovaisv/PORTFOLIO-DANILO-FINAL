// Ghost System v3 — Color Interpolation System
// Interpolação contínua de cores em HSL com Ghost Easing

/**
 * Ghost Easing: cubic-bezier(0.4, 0, 0.2, 1) — Material Design Standard
 * Calcula o valor easado para um t linear (0..1)
 * Usa a aproximação por subdivisão de bisseção para resolver a bezier
 */
const ghostEasing = (t: number): number => {
  // cubic-bezier(0.4, 0, 0.2, 1)
  const p1x = 0.4,
    p1y = 0.0,
    p2x = 0.2,
    p2y = 1.0;

  // Solve for x using Newton's method
  let x = t;
  for (let i = 0; i < 8; i++) {
    const bx =
      3 * p1x * (1 - x) * (1 - x) * x +
      3 * p2x * (1 - x) * x * x +
      x * x * x -
      t;
    const dbx =
      3 * p1x * ((1 - x) * (1 - x) - 2 * (1 - x) * x) +
      3 * p2x * (2 * (1 - x) * x - x * x) +
      3 * x * x;
    if (Math.abs(dbx) < 1e-6) break;
    x -= bx / dbx;
  }

  // Calculate y from solved x
  return (
    3 * p1y * (1 - x) * (1 - x) * x + 3 * p2y * (1 - x) * x * x + x * x * x
  );
};

/**
 * Interpola entre duas cores HSL usando Ghost Easing
 * Trata corretamente a circularidade do hue (ex: 350° → 10°)
 */
export const interpolateHSL = (
  startHSL: [number, number, number],
  endHSL: [number, number, number],
  t: number
): string => {
  const easedT = ghostEasing(Math.max(0, Math.min(1, t)));

  let h1 = startHSL[0];
  const s1 = startHSL[1];
  const l1 = startHSL[2];
  let h2 = endHSL[0];
  const s2 = endHSL[1];
  const l2 = endHSL[2];

  const deltaH = h2 - h1;
  if (Math.abs(deltaH) > 180) {
    if (deltaH > 0) {
      h1 += 360;
    } else {
      h2 += 360;
    }
  }

  const h = (((h1 + (h2 - h1) * easedT) % 360) + 360) % 360;
  const s = s1 + (s2 - s1) * easedT;
  const l = l1 + (l2 - l1) * easedT;

  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
};

// Paleta de cores conforme especificação Ghost Design System v3
// REMOVED: Purple and Pink details (Violation of Ghost Era rules)
export const colorPalette = {
  bluePrimary: [223, 100, 50] as [number, number, number], // #0048ff
  blueDeep: [223, 100, 20] as [number, number, number], // Deeper abyss blue
  blueCyan: [189, 100, 65] as [number, number, number], // #4fe6ff (Accent)
};

// Sequência de cores obrigatória (7 estágios, mantendo a identidade Ghost Blue)
export const colorSequence: [number, number, number][] = [
  colorPalette.blueDeep,
  colorPalette.bluePrimary,
  colorPalette.blueCyan,
  colorPalette.bluePrimary,
  colorPalette.blueDeep,
  colorPalette.bluePrimary,
  colorPalette.blueDeep,
];
