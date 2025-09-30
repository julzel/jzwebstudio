import type { Meta, StoryObj } from '@storybook/react-vite';

import { resumeData } from '../data/resumeData';
import type { ExperienceItemData } from '../types/resume';

import ExperienceItem from './ExperienceItem';

const experienceItems: ExperienceItemData[] = resumeData.experience;
const [baseExperience] = experienceItems;

if (!baseExperience) {
  throw new Error('Expected at least one experience item for stories.');
}

const meta: Meta<typeof ExperienceItem> = {
  title: 'Resume/ExperienceItem',
  component: ExperienceItem,
  args: {
    item: baseExperience,
    expanded: false,
    onToggle: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof ExperienceItem>;

export const Collapsed: Story = {};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
  name: 'Expanded details',
};

const longHighlightsItem = {
  ...baseExperience,
  company: `${baseExperience.company} Labs`,
  highlights: baseExperience.highlights.concat([
    'Designed a design-system audit and codified patterns across 12 feature teams to reduce UI regressions by 40%.',
    'Introduced runtime telemetry and accessibility linting to CI which surfaced regressions before release.',
  ]),
};

export const LongHighlights: Story = {
  args: {
    item: longHighlightsItem,
    expanded: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
