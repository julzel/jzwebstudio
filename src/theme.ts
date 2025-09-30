import type { PaletteMode, ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E3A8A',
      contrastText: '#0F172A',
    },
    secondary: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#047857',
      contrastText: '#022C22',
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#0F172A',
            secondary: '#475569',
          },
        }
      : {
          background: {
            default: '#0F172A',
            paper: '#111827',
          },
          text: {
            primary: '#E2E8F0',
            secondary: '#94A3B8',
          },
        }),
  },
  typography: {
    fontFamily: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'].join(', '),
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? '#E2E8F0' : '#1E293B',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export const lightTheme = createAppTheme('light');

export default lightTheme;
