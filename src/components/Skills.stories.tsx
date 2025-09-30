import type { Meta, StoryObj } from '@storybook/react-vite';

import { resumeData } from '../data/resumeData';

import Skills from './Skills';

const skills = resumeData.skills;

const meta: Meta<typeof Skills> = {
  title: 'Resume/Skills',
  component: Skills,
  args: {
    skills,
    onSkillSelect: () => undefined,
    selectedSkills: ['React'],
  },
};

export default meta;

type Story = StoryObj<typeof Skills>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    selectedSkills: ['React', 'Next.js'],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
