import userEvent from '@testing-library/user-event';

import { resumeData } from '../data/resumeData';
import { renderWithProviders, screen } from '../test-utils';

import Resume from './Resume';

describe('Resume', () => {
  it('renders key sections from data', () => {
    renderWithProviders(<Resume data={resumeData} mode="light" onModeChange={() => {}} />);

    expect(screen.getByRole('heading', { name: /profile/i })).toBeVisible();
    expect(screen.getByRole('heading', { name: /skills/i })).toBeVisible();
    expect(screen.getByRole('heading', { name: /experience/i })).toBeVisible();
    expect(screen.getByRole('heading', { name: /education/i })).toBeVisible();
  });

  it('filters experience via search input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Resume data={resumeData} mode="light" onModeChange={() => {}} />);

    const search = screen.getByLabelText(/search experience/i);
    await user.type(search, 'Gorilla');

    expect(screen.getByText(/Gorilla Logic/i)).toBeVisible();
    expect(screen.queryByText(/DNAture/i)).not.toBeInTheDocument();
  });

  it('expands experience highlights with accessible controls', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Resume data={resumeData} mode="light" onModeChange={() => {}} />);

    const toggle = screen.getAllByRole('button', { name: /view highlights/i })[0];
    await user.click(toggle);

    expect(await screen.findByText(/Architected an e/i)).toBeVisible();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
