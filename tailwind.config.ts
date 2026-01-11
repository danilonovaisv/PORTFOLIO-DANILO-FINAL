import type { Config } from 'tailwindcss';
import { BRAND } from '@/config/brand';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...BRAND.colors,
        // Aliases for backward compatibility
        primary: BRAND.colors.bluePrimary,
        accent: BRAND.colors.blueAccent,
      },
      fontFamily: {
        sans: [
          BRAND.assets.fonts.primary,
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [BRAND.assets.fonts.mono, 'monospace'],
        display: [BRAND.assets.fonts.primary, 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
