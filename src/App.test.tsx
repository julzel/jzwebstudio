import App from './App';
import { renderWithProviders, screen } from './test-utils';

describe('App', () => {
  it('renders resume header information', async () => {
    renderWithProviders(<App />);

    expect(await screen.findByRole('heading', { name: /julio zeledón/i })).toBeVisible();
    expect(
      screen.getByRole('button', {
        name: /download pdf/i,
      })
    ).toBeInTheDocument();
  });
});
