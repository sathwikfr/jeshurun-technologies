import type { Config } from 'tailwindcss';

export default <Config>{
  darkMode: 'class', // Enable class‑based dark mode
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
