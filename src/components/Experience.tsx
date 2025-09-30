import { Box, Stack, Typography } from '@mui/material';
import { FiBriefcase } from 'react-icons/fi';

import type { ExperienceItemData } from '../types/resume';
import { makeExperienceKey } from '../utils/resume';

import ExperienceItem from './ExperienceItem';
import SectionTitle from './SectionTitle';

interface ExperienceProps {
  items: ExperienceItemData[];
  expandedIds: string[];
  onToggle: (id: string) => void;
}

const Experience = ({ items, expandedIds, onToggle }: ExperienceProps) => (
  <Box component="section" aria-labelledby="resume-experience">
    <SectionTitle
      id="resume-experience"
      title="Experience"
      subtitle="Impact across roles"
      icon={<FiBriefcase />}
    />
    <Stack spacing={3.5} className="mt-3">
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No experience entries match the current filters.
        </Typography>
      ) : (
        items.map((item) => {
          const id = makeExperienceKey(item);
          const expanded = expandedIds.includes(id);

          return (
            <ExperienceItem
              key={id}
              item={item}
              expanded={expanded}
              onToggle={() => onToggle(id)}
            />
          );
        })
      )}
    </Stack>
  </Box>
);

export default Experience;
