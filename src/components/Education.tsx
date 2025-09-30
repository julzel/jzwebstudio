import { Box, Paper, Stack, Typography } from '@mui/material';
import { FiBookOpen } from 'react-icons/fi';

import type { EducationItemData } from '../types/resume';

import SectionTitle from './SectionTitle';

interface EducationProps {
  education: EducationItemData[];
}

const Education = ({ education }: EducationProps) => (
  <Box component="section" aria-labelledby="resume-education">
    <SectionTitle
      id="resume-education"
      title="Education"
      subtitle="Formal studies"
      icon={<FiBookOpen />}
    />
    <Stack spacing={2.5} className="mt-3">
      {education.map((item) => (
        <Paper
          key={`${item.institution}-${item.area}`}
          className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/60"
        >
          <Typography variant="subtitle1" component="h3" className="font-semibold">
            {item.institution}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.studyType} · {item.area}
          </Typography>
          {(item.startDate || item.endDate) && (
            <Typography variant="body2" color="text.secondary" className="mt-1">
              {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
            </Typography>
          )}
        </Paper>
      ))}
    </Stack>
  </Box>
);

export default Education;
