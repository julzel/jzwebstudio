import App from './App';
import Footer from './components/Footer';
import Header from './components/Header';
import { renderWithProviders, screen } from './test-utils';

describe('App', () => {
  it('renders welcome message', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { name: /welcome to my site/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /explore the app/i })).toBeEnabled();
  });
});

describe('Header', () => {
  it('exposes accessible landmarks', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /my site/i,
      })
    ).toHaveAttribute('href', '#main-content');
  });
});

describe('Footer', () => {
  it('renders content info landmark', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeVisible();
  });
});
