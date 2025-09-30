import { useMemo, useState } from 'react';
import { Box, Paper, Stack, TextField, Typography } from '@mui/material';
import { FiFilter } from 'react-icons/fi';

import TagList from './TagList';
import SectionTitle from './SectionTitle';

interface SkillsProps {
  skills: Record<string, string[]>;
  onSkillSelect?: (skill: string) => void;
  selectedSkills?: string[];
}

const Skills = ({ skills, onSkillSelect, selectedSkills = [] }: SkillsProps) => {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const groupedSkills = useMemo(() => {
    return Object.entries(skills)
      .map(([group, items]) => {
        const filteredItems = normalizedQuery
          ? items.filter((item) => item.toLowerCase().includes(normalizedQuery))
          : items;

        return {
          group,
          items: filteredItems,
        };
      })
      .filter((entry) => entry.items.length > 0);
  }, [skills, normalizedQuery]);

  return (
    <Box component="section" aria-labelledby="resume-skills">
      <SectionTitle
        id="resume-skills"
        title="Skills"
        subtitle="Tooling, platforms, and practices"
        icon={<FiFilter />}
      />
      <Paper className="mt-3 space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-5 backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/60">
        <TextField
          fullWidth
          label="Search skills"
          placeholder="Filter skills by name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          size="small"
        />
        <Stack spacing={3} className="gap-4">
          {groupedSkills.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No skills match “{query}”. Try another keyword.
            </Typography>
          ) : (
            groupedSkills.map(({ group, items }) => (
              <Box key={group}>
                <Typography variant="subtitle1" component="h3" className="font-semibold capitalize">
                  {group.replace(/_/g, ' ')}
                </Typography>
                <TagList
                  tags={items}
                  selectedTags={selectedSkills}
                  interactive={Boolean(onSkillSelect)}
                  onToggleTag={onSkillSelect}
                  className="mt-2"
                />
              </Box>
            ))
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Skills;
