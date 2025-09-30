import { useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Resume from './components/Resume';
import { resumeData } from './data/resumeData';
import { createAppTheme } from './theme';

const THEME_STORAGE_KEY = 'resume-ui-theme';

const getInitialMode = (): PaletteMode => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const App = () => {
  const [mode, setMode] = useState<PaletteMode>(() => getInitialMode());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.documentElement.classList.toggle('dark', mode === 'dark');
    document.documentElement.style.setProperty('color-scheme', mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const handleModeChange = (nextMode: PaletteMode) => {
    setMode(nextMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Resume data={resumeData} mode={mode} onModeChange={handleModeChange} />
    </ThemeProvider>
  );
};

export default App;
