/**
 * Ghost System Color Utilities
 * Handles hex normalization, RGB conversion, and color mixing.
 */

export const normalizeHexColor = (
  value?: string,
  fallback = '#0048ff'
): string => {
  if (!value) return fallback;
  const cleaned = value.trim();

  if (/^#[0-9a-fA-F]{3}$/.test(cleaned)) {
    const shortHex = cleaned.slice(1);
    return `#${shortHex
      .split('')
      .map((char) => char + char)
      .join('')}`.toLowerCase();
  }

  if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.toLowerCase();
  }

  return fallback;
};

export const hexToRgb = (hex: string) => {
  const normalized = normalizeHexColor(hex, '#0048ff').slice(1);
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Mixes two hex colors based on an amount (0 to 1).
 */
export const mixHex = (
  fromHex: string,
  toHex: string,
  amount: number
): string => {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  return rgbToHex(
    from.r + (to.r - from.r) * amount,
    from.g + (to.g - from.g) * amount,
    from.b + (to.b - from.b) * amount
  );
};

/**
 * Standard color palette for Ghost System in HSL format.
 */
export const colorPalette = {
  bluePrimary: [223, 100, 50] as [number, number, number], // #0048ff
  blueDeep: [223, 100, 10] as [number, number, number], // Very dark blue
  blueCyan: [195, 100, 50] as [number, number, number], // Cyan-ish blue
} as const;
