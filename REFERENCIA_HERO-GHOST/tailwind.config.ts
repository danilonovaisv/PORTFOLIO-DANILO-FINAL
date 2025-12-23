import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          bg: "#06071f",
          text: "#d9dade"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
