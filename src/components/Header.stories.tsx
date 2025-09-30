import type { Meta, StoryObj } from '@storybook/react-vite';

import { resumeData } from '../data/resumeData';

import Header from './Header';

const basics = resumeData.basics;

const meta: Meta<typeof Header> = {
  title: 'Resume/Header',
  component: Header,
  args: {
    basics,
    mode: 'light',
    onToggleTheme: () => undefined,
    onPrint: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    mode: 'dark',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
