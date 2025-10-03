import type { PaletteMode, ThemeOptions } from '@mui/material/styles';
import { alpha, createTheme, darken, lighten } from '@mui/material/styles';

const PALETTE = {
  ink: '#0B1220',
  inkGlass: '#0E1526',
  lightSurface: '#F7FAFC',
  electricBlue: '#2563EB',
  vividPurple: '#7C3AED',
  teal: '#14B8A6',
  slateDark: '#0F172A',
  slateLight: '#E2E8F0',
  warmGray: '#E5E7EB',
} as const;

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  const isLight = mode === 'light';

  const primaryMain = PALETTE.electricBlue;
  const secondaryMain = PALETTE.vividPurple;
  const infoMain = PALETTE.teal;

  return {
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: lighten(primaryMain, 0.18),
        dark: darken(primaryMain, 0.25),
        contrastText: PALETTE.slateLight,
      },
      secondary: {
        main: secondaryMain,
        light: lighten(secondaryMain, 0.14),
        dark: darken(secondaryMain, 0.22),
        contrastText: PALETTE.slateLight,
      },
      info: {
        main: infoMain,
        light: lighten(infoMain, 0.18),
        dark: darken(infoMain, 0.25),
        contrastText: isLight ? PALETTE.slateDark : PALETTE.slateLight,
      },
      divider: isLight ? PALETTE.warmGray : alpha(PALETTE.slateLight, 0.18),
      background: {
        default: isLight ? PALETTE.lightSurface : PALETTE.ink,
        paper: isLight ? '#FFFFFF' : alpha(PALETTE.inkGlass, 0.88),
      },
      text: {
        primary: isLight ? PALETTE.slateDark : PALETTE.slateLight,
        secondary: isLight ? '#1E293B' : alpha(PALETTE.slateLight, 0.72),
      },
    },
    typography: {
      fontFamily: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'].join(', '),
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '4rem',
        lineHeight: 1.05,
        letterSpacing: '-0.04em',
      },
      h2: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '3rem',
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.15,
      },
      h4: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.2,
      },
      h5: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '1.375rem',
        lineHeight: 1.3,
      },
      h6: {
        fontFamily: ['Sora', 'system-ui', 'sans-serif'].join(', '),
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.35,
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.65,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.55,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: 0,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
      },
      overline: {
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 600,
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--app-max-width': '1200px',
            '--app-grid-gutter': '1.5rem',
            '--app-radius-card': '1.125rem',
            '--app-easing-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
            '--app-duration-fast': '150ms',
            '--app-duration-base': '200ms',
          },
          body: {
            margin: 0,
            minHeight: '100vh',
            backgroundColor: isLight ? PALETTE.lightSurface : PALETTE.ink,
            color: isLight ? PALETTE.slateDark : PALETTE.slateLight,
            fontFamily: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'].join(', '),
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            transition:
              'background-color var(--app-duration-base) var(--app-easing-soft), color var(--app-duration-base) var(--app-easing-soft)',
          },
          a: {
            color: primaryMain,
            textDecorationColor: alpha(primaryMain, 0.4),
            transition: 'color var(--app-duration-fast) var(--app-easing-soft)',
          },
          'a:hover': {
            color: darken(primaryMain, 0.1),
            textDecorationColor: darken(primaryMain, 0.1),
          },
          code: {
            fontFamily: [
              '"JetBrains Mono"',
              'JetBrains Mono',
              'ui-monospace',
              'SFMono-Regular',
              'monospace',
            ].join(', '),
          },
          '.glass-surface': {
            backgroundColor: alpha(isLight ? '#FFFFFF' : PALETTE.inkGlass, isLight ? 0.86 : 0.72),
            border: `1px solid ${alpha(isLight ? PALETTE.warmGray : PALETTE.slateLight, isLight ? 0.6 : 0.2)}`,
            backdropFilter: 'blur(18px)',
            boxShadow: isLight
              ? '0 12px 24px -6px rgba(15, 23, 42, 0.18)'
              : '0 12px 32px -12px rgba(14, 184, 166, 0.35)',
            borderRadius: 'var(--app-radius-card)',
          },
          '.section-block': {
            paddingTop: 'var(--section-padding, 6rem)',
            paddingBottom: 'var(--section-padding, 6rem)',
          },
          '@media (max-width: 768px)': {
            '.section-block': {
              '--section-padding': '4rem',
            },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
              scrollBehavior: 'auto !important',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 'var(--app-grid-gutter)',
            paddingRight: 'var(--app-grid-gutter)',
          },
          maxWidthLg: {
            maxWidth: 'var(--app-max-width)',
          },
          maxWidthXl: {
            maxWidth: 'var(--app-max-width)',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: '1.5rem',
            paddingBlock: '0.625rem',
            fontWeight: 600,
            transition:
              'transform var(--app-duration-fast) var(--app-easing-soft), box-shadow var(--app-duration-fast) var(--app-easing-soft)',
            '&:hover': {
              transform: 'translateY(-1px) scale(1.02)',
              boxShadow: `0 12px 24px -10px ${alpha(primaryMain, 0.5)}`,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          containedPrimary: {
            boxShadow: '0 12px 24px -10px rgba(37, 99, 235, 0.45)',
          },
          outlined: {
            borderColor: alpha(primaryMain, 0.3),
            '&:hover': {
              borderColor: alpha(primaryMain, 0.45),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 500,
            letterSpacing: '0.01em',
            transition: 'transform var(--app-duration-fast) var(--app-easing-soft)',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 'var(--app-radius-card)',
            backgroundImage: 'none',
            border: `1px solid ${alpha(isLight ? PALETTE.warmGray : PALETTE.slateLight, isLight ? 0.6 : 0.18)}`,
            boxShadow: isLight
              ? '0 12px 24px -8px rgba(15, 23, 42, 0.18)'
              : '0 18px 40px -16px rgba(14, 184, 166, 0.28)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--app-radius-card)',
            boxShadow: '0 12px 24px -8px rgba(15, 23, 42, 0.2)',
            transition:
              'transform var(--app-duration-base) var(--app-easing-soft), box-shadow var(--app-duration-base) var(--app-easing-soft)',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 18px 40px -20px rgba(37, 99, 235, 0.4)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(isLight ? '#FFFFFF' : PALETTE.inkGlass, isLight ? 0.9 : 0.82),
            color: isLight ? PALETTE.slateDark : PALETTE.slateLight,
            backdropFilter: 'blur(18px)',
            borderBottom: `1px solid ${alpha(isLight ? PALETTE.warmGray : PALETTE.slateLight, isLight ? 0.6 : 0.18)}`,
            boxShadow: '0 12px 24px -16px rgba(15, 23, 42, 0.28)',
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export const lightTheme = createAppTheme('light');

export default lightTheme;
