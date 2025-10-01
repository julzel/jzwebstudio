import { Box, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { createAppTheme } from './theme';

const App = () => (
  <ThemeProvider theme={createAppTheme('light')}>
    <CssBaseline enableColorScheme />
    <Box
      component="main"
      role="main"
      className="flex min-h-screen items-center justify-center bg-slate-100"
    >
      <Container maxWidth="sm">
        <Box className="rounded-3xl bg-white p-10 text-center shadow-card">
          <Typography variant="h1" component="h1" className="text-3xl font-bold">
            Hello, world!
          </Typography>
          <Typography variant="body1" color="text.secondary" className="mt-3">
            Welcome to the simplified app.
          </Typography>
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
);

export default App;
