import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#F4F5F7',
        foreground: '#111111',
        primary: {
          DEFAULT: '#0057FF',
          hover: '#0046cc',
        },
        secondary: '#111111',
        muted: '#555555',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          '2xl': '1440px',
        },
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
        widest: '0.1em',
      },
      fontSize: {
        'display-lg': [
          'clamp(3rem, 8vw, 7rem)',
          { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '800' },
        ],
      },
      aspectRatio: {
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
