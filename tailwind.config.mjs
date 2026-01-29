import { readFileSync } from 'fs';
import { join } from 'path';

// Load tokens synchronously (safer for PostCSS context than ESM JSON import)
const tokensPath = join(process.cwd(), 'src/config/design_tokens.json');
const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));

// Filter tokens to only include colors
const colors = Object.fromEntries(
  Object.entries(tokens).filter(([key]) => !key.startsWith('font') && !key.startsWith('easing'))
);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Aliases for component capability
        primary: colors.bluePrimary,
        accent: colors.blueAccent,
        // Mapping token names to Tailwind expectations if distinct
        background: colors.background,
        foreground: colors.text,
      },
      fontFamily: {
        sans: ['TT Norms Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['PPSupplyMono', 'monospace'],
        display: ['TT Norms Pro', 'ui-sans-serif'],
        h1: ['TT Norms Pro', 'ui-sans-serif'],
        h2: ['TT Norms Pro', 'ui-sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      minWidth: {
        'cta-mobile': '181px',
        'cta-tablet': '201px',
        'cta-desktop': '241px',
      },
    },
  },
  plugins: [],
};
