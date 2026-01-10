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
      colors: {
        bluePrimary: '#0048ff',
        blueAccent: '#4fe6ff',
        purpleDetails: '#8705f2',
        background: '#040013',
        backgroundLight: '#f0f0f0',
        text: '#fcffff',
        textSecondary: '#a1a3a3',
        neutral: '#0b0d3a',

        // Aliases kept for compatibility if needed, but the above are the source of truth
        primary: '#0048ff',
        accent: '#4fe6ff',
      },
      fontFamily: {
        sans: ['TT Norms Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['PPSupplyMono', 'monospace'],
        display: ['TT Norms Pro', 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
