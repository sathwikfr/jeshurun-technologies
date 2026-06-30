import type { Config } from 'tailwindcss';

export default <Config>{
  darkMode: 'class', // Enable class‑based dark mode
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      keyframes: {
        'text-gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      animation: {
        'text-gradient': 'text-gradient 4s ease infinite',
      },
    },
  },
  plugins: [],
};
