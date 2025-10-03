import type { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import { createAppTheme } from './theme';

export const renderWithProviders = (ui: ReactElement) =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );

export * from '@testing-library/react';
