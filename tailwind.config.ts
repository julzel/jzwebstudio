import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          dark: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -15px rgba(37, 99, 235, 0.5)',
      },
    },
  },
  darkMode: 'class',
  corePlugins: {
    container: true,
  },
  important: '#root',
};

export default config;
