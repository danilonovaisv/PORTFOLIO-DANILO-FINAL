// Ghost System v3 — Color Interpolation System
// Interpolação contínua de cores em HSL com Ghost Easing

/**
 * Ghost Easing: cubic-bezier(0.4, 0, 0.2, 1) — Material Design Standard
 * Calcula o valor easado para um t linear (0..1)
 * Usa a aproximação por subdivisão de bisseção para resolver a bezier
 */
const ghostEasing = (t: number): number => {
  // cubic-bezier(0.4, 0, 0.2, 1)
  // Aproximação rápida usando polinômio ajustado
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
  // Aplica Ghost Easing ao progresso linear
  const easedT = ghostEasing(Math.max(0, Math.min(1, t)));

  // Copia para não mutar os originais
  let h1 = startHSL[0];
  const s1 = startHSL[1];
  const l1 = startHSL[2];
  let h2 = endHSL[0];
  const s2 = endHSL[1];
  const l2 = endHSL[2];

  // Interpolação de matiz com tratamento de circularidade
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

// Paleta de cores conforme especificação Ghost Design System
export const colorPalette = {
  bluePrimary: [230, 85, 30] as [number, number, number], // #0048ff
  purpleDetails: [270, 80, 40] as [number, number, number], // #8705f2
  pinkDetails: [330, 85, 50] as [number, number, number], // #f501d3
};

// Sequência de cores obrigatória (7 estágios, retorna ao início)
export const colorSequence: [number, number, number][] = [
  colorPalette.pinkDetails, // 1. Rosa (Start as per mobile initial)
  colorPalette.purpleDetails, // 2. Roxo
  colorPalette.bluePrimary, // 3. Azul
  colorPalette.purpleDetails, // 4. Roxo
  colorPalette.pinkDetails, // 5. Rosa
  colorPalette.purpleDetails, // 6. Roxo
  colorPalette.bluePrimary, // 7. Azul (Final Climax)
];
