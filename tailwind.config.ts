import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1200px',
      },
      padding: {
        DEFAULT: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1220',
          glass: '#0E1526',
          light: '#F7FAFC',
        },
        electric: '#2563EB',
        purple: '#7C3AED',
        teal: '#14B8A6',
        slate: {
          DEFAULT: '#0F172A',
          contrast: '#E2E8F0',
        },
        'warm-gray': '#E5E7EB',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.2' }],
        sm: ['0.875rem', { lineHeight: '1.35' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.55' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '4xl': ['3rem', { lineHeight: '1.1' }],
        '5xl': ['4rem', { lineHeight: '1.05' }],
      },
      spacing: {
        18: '4.5rem',
        'section-sm': '3rem',
        'section-lg': '6rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        card: '1.125rem',
      },
      boxShadow: {
        soft: '0 12px 24px -4px rgba(15, 23, 42, 0.35)',
        'soft-lg': '0 18px 40px -20px rgba(12, 74, 110, 0.45)',
        glow: '0 0 0 1px rgba(37, 99, 235, 0.35), 0 12px 32px -12px rgba(124, 58, 237, 0.4)',
      },
      backdropBlur: {
        glass: '18px',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
      },
      scale: {
        102: '1.02',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 200ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
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
