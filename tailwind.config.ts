import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './content/**/*.{md,mdx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      spacing: {
        'screen-dvh': '100dvh',
      },
      colors: {
        background: 'var(--color-surface-main, #F4F4F5)',
        foreground: 'var(--color-text-main, #18181B)',
        zinc: {
          ...colors.zinc,
          100: '#F4F4F5',
          900: '#18181B',
        },
        surface: 'var(--color-surface-main, #F4F4F5)',
        text: 'var(--color-text-main, #18181B)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        modern: '-0.02em',
      },
      fontSize: {
        display: ['12vw', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
    },
  },
  plugins: [],
};

export default config;
