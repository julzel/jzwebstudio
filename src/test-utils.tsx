import type { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import { I18nProvider, LANGUAGE_STORAGE_KEY } from './i18n/I18nProvider';
import { createAppTheme } from './theme';

export const renderWithProviders = (ui: ReactElement) => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
  }

  return render(
    <I18nProvider initialLanguage="en">
      <ThemeProvider theme={createAppTheme('light')}>
        <CssBaseline />
        {ui}
      </ThemeProvider>
    </I18nProvider>
  );
};

export * from '@testing-library/react';
