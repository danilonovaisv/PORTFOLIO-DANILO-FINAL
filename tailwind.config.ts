//Configuração mínima para Tailwind v4 com LightningCSS
// As definições principais estão em src/app/globals.css usando @theme
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Font families — Manrope as primary typeface (wght 200–800 variable)
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bluePrimary: 'var(--color-bluePrimary)',
        blueAccent: 'var(--color-blueAccent)',
        purpleDetails: 'var(--color-purpleDetails)',
        pinkDetails: 'var(--color-pinkDetails)',
        background: 'var(--color-background)',
        backgroundLight: 'var(--color-backgroundLight)',
        text: 'var(--color-text)',
        textInverse: 'var(--color-textInverse)',
        textEmphasis: 'var(--color-textEmphasis)',
        textHighlight: 'var(--color-textHighlight)',
        textSecondary: 'var(--color-textSecondary)',
        neutral: 'var(--color-neutral)',
        neutralLight: 'var(--color-neutralLight)',
        abyssStart: 'var(--color-abyss-start)',
        abyssMid: 'var(--color-abyss-mid)',
      },
      // Restante da extensão de tema
      minWidth: {
        'cta-mobile': '180px',
        'cta-tablet': '200px',
        'cta-desktop': '220px',
      },
      zIndex: {
        '55': '55',
        '65': '65',
      },
    },
  },
  plugins: [],
};
export default config;
