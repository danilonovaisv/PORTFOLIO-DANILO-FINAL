// Interpolação contínua de cores em HSL
export const interpolateHSL = (
  startHSL: [number, number, number], 
  endHSL: [number, number, number], 
  t: number
): string => {
  let [h1, s1, l1] = startHSL;
  let [h2, s2, l2] = endHSL;
  
  // Interpolação suave com easing personalizado
  const easedT = 0.4 * t * t + 0.2 * t;
  
  // Interpolação de matiz (com tratamento especial para circularidade)
  let h = h1 + (h2 - h1) * easedT;
  if (Math.abs(h2 - h1) > 180) {
    if (h2 > h1) h2 -= 360;
    else h1 -= 360;
  }
  h = ((h + 360) % 360 + 360) % 360;
  
  // Interpolação de saturação e luminosidade
  const s = s1 + (s2 - s1) * easedT;
  const l = l1 + (l2 - l1) * easedT;
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Paleta de cores conforme especificação
export const colorPalette = {
  bluePrimary: [230, 85, 30] as [number, number, number],
  purpleDetails: [270, 80, 40] as [number, number, number],
  pinkDetails: [330, 85, 50] as [number, number, number],
};

// Sequência de cores
export const colorSequence = [
  colorPalette.bluePrimary,
  colorPalette.purpleDetails,
  colorPalette.pinkDetails,
  colorPalette.bluePrimary,
  colorPalette.purpleDetails,
  colorPalette.pinkDetails,
  colorPalette.bluePrimary,
];

// Converte HSL para string CSS
export const hslToString = (hsl: [number, number, number]): string => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};
