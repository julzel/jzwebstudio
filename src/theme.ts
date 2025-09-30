import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E3A8A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#047857',
      contrastText: '#042F2E',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'].join(', '),
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
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
    },
  },
});

export default theme;
