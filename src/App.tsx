import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { FiArrowRight, FiSmile } from 'react-icons/fi';

import Counter from './components/Counter';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => (
  <Box className="flex min-h-screen flex-col">
    <Header />
    <Box
      component="main"
      id="main-content"
      role="main"
      className="flex flex-1 items-center justify-center bg-slate-50"
    >
      <Container maxWidth="md" className="py-12 sm:py-20">
        <Card className="shadow-card">
          <CardContent className="space-y-8 text-center">
            <Stack spacing={3} alignItems="center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                <FiSmile size={36} aria-hidden="true" />
              </span>
              <Typography variant="h1" component="h1">
                Welcome to My Site
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Build delightful user experiences with a modern stack that pairs Tailwind CSS
                utility classes with MUI components.
              </Typography>
              <Button
                id="get-started"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<FiArrowRight />}
                className="w-full sm:w-auto"
              >
                Explore the App
              </Button>
            </Stack>
            <Box className="pt-4">
              <Counter />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
    <Footer />
  </Box>
);

export default App;
