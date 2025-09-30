import type { Meta, StoryObj } from '@storybook/react-vite';

import Toolbar from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Resume/Toolbar',
  component: Toolbar,
  args: {
    search: '',
    tags: ['React', 'TypeScript', 'Next.js', 'MUI', 'Storybook'],
    selectedTags: ['React'],
    onSearchChange: () => undefined,
    onTagToggle: () => undefined,
    onClearFilters: () => undefined,
    onExpandAll: () => undefined,
    onCollapseAll: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {};

export const NoResults: Story = {
  args: {
    selectedTags: [],
    tags: [],
    disableExpandCollapse: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
