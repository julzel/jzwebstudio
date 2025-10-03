import App from './App';
import { renderWithProviders, screen } from './test-utils';

describe('App', () => {
  it('renders hello world banner', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { name: /hello, world!/i })).toBeVisible();
    expect(screen.getByText(/welcome to the simplified app/i)).toBeVisible();
  });
});
