import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-progress': 'slide-progress-bar 1.1s linear infinite',
      },
      keyframes: {
        'slide-progress-bar': {
          '0%': {
            marginLeft: '0%',
            width: '30%',
          },
          '40%': {
            width: '60%',
          },
          '100%': {
            marginLeft: '100%',
            width: '30%',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
