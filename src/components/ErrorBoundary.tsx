import type { ReactNode } from 'react';
import { Component } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: unknown, errorInfo: unknown) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box className="min-h-screen bg-slate-50 py-16">
          <Container maxWidth="sm">
            <Paper elevation={2} className="space-y-6 p-8 text-center">
              <Typography variant="h4" component="h1">
                Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary">
                An unexpected error occurred. Please try again.
              </Typography>
              <Button variant="contained" color="primary" onClick={this.handleReset}>
                Retry
              </Button>
            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
