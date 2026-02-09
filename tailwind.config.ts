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
      //As cores e fontes principais estão definidas em @theme no globals.css
      // Esta extensão serve principalmente para outros elementos do tema
      minWidth: {
        'cta-mobile': '180px',
        'cta-tablet': '200px',
        'cta-desktop': '220px',
      },
    },
  },
  plugins: [],
};
export default config;
