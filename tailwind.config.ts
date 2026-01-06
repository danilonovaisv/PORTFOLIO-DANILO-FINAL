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
        primary: BRAND.colors.primary,
        accent: BRAND.colors.accent,
      },
      fontFamily: {
        sans: [BRAND.typography.primary, ...BRAND.typography.fallbacks],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        display: [BRAND.typography.primary, ...BRAND.typography.fallbacks], // Often helpful
      },
    },
  },
  plugins: [],
};
export default config;
