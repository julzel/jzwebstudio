import { useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';

import Header from './components/Header';
import Hero from './components/Hero';
import HeroVisual from './components/HeroVisual';
import SkillsMatrix from './components/SkillsMatrix';
import { createAppTheme } from './theme';

const App = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        component="div"
        id="top"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.18), transparent 55%), radial-gradient(circle at 85% 15%, rgba(124, 58, 237, 0.16), transparent 52%)',
        }}
      >
        <Header
          mode={mode}
          onToggleTheme={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
          language={language}
          onLanguageChange={setLanguage}
        />

        <Box component="main" role="main" className="py-section-sm md:py-section-lg">
          <Container maxWidth="lg">
            <div className="layout-grid items-start">
              <div className="layout-grid__main motion-fade-up">
                <Hero />
              </div>

              <div className="layout-grid__side motion-fade-up">
                <HeroVisual />
              </div>
            </div>
          </Container>

          <Container maxWidth="lg" className="mt-18 motion-fade-up">
            <SkillsMatrix />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
