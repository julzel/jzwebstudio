import type { Meta, StoryObj } from '@storybook/react-vite';

import { resumeData } from '../data/resumeData';

import Resume from './Resume';

const meta: Meta<typeof Resume> = {
  title: 'Resume/Resume',
  component: Resume,
  args: {
    data: resumeData,
    mode: 'light',
    onModeChange: () => undefined,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Resume>;

export const Default: Story = {
  name: 'Desktop',
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

const longSummaryData = {
  ...resumeData,
  basics: {
    ...resumeData.basics,
    summary: `${resumeData.basics.summary} Julio partners with cross-functional teams to deliver resilient, future-friendly experiences from inception to launch, with a focus on measurable impact and thoughtful developer enablement.`,
  },
};

export const LongSummary: Story = {
  args: {
    data: longSummaryData,
  },
};
