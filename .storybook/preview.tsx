import { CssBaseline, ThemeProvider } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import type { Decorator } from '@storybook/react';
import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';

import { createAppTheme } from '../src/theme';
import '../src/index.css';

const withMuiTheme: Decorator = (Story, context) => {
  const mode = (context.globals.theme as PaletteMode) ?? 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.setProperty('color-scheme', mode);
    return () => {
      root.classList.remove('dark');
    };
  }, [mode]);

  return (
    <ThemeProvider theme={createAppTheme(mode)}>
      <CssBaseline enableColorScheme />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    layout: 'fullscreen',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
