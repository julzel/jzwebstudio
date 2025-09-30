import userEvent from '@testing-library/user-event';

import { renderWithProviders, screen } from '../test-utils';

import Counter from './Counter';

describe('Counter', () => {
  it('increments the count when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Counter />);

    const button = screen.getByRole('button', { name: /increment counter/i });
    expect(screen.getByText(/count: 0/i)).toBeVisible();

    await user.click(button);
    expect(screen.getByText(/count: 1/i)).toBeVisible();
  });
});
