import userEvent from '@testing-library/user-event';

import App from './App';
import { renderWithProviders, screen } from './test-utils';

describe('App', () => {
  it('renders localized hero content by default', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { name: /Julio Zeledón/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /Start a project/i })).toBeInTheDocument();
  });

  it('switches copy to Spanish from the header toggle', async () => {
    renderWithProviders(<App />);
    const user = userEvent.setup();

    const spanishToggles = screen.getAllByLabelText(/Switch to Spanish/i);
    await user.click(spanishToggles[0]);

    expect(await screen.findByRole('link', { name: /Iniciar un proyecto/i })).toBeInTheDocument();
  });
});
