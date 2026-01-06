import type { Config } from 'tailwindcss';
import { BRAND } from './src/config/brand.ts';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}', // Added ui incase unique folder
  ],
  theme: {
    extend: {
      colors: {
        ...BRAND.colors,
        // Map primary/accent to brand for utility convenience if not already covered
        primary: BRAND.colors.bluePrimary,
        accent: BRAND.colors.blueAccent,
      },
      fontFamily: {
        sans: [
          BRAND.typography.fontFamily.primary,
          ...BRAND.typography.fontFamily.fallbacks,
        ],
        mono: [BRAND.typography.fontFamily.mono, 'monospace'],
        display: [
          BRAND.typography.fontFamily.primary,
          ...BRAND.typography.fontFamily.fallbacks,
        ], // Often helpful
      },
      fontWeight: BRAND.typography.weights,
    },
  },
  plugins: [],
};
export default config;
