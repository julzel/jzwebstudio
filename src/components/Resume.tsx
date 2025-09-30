import { useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';

import type { ResumeData } from '../types/resume';
import { makeExperienceKey } from '../utils/resume';

import Education from './Education';
import Experience from './Experience';
import Header from './Header';
import Skills from './Skills';
import Summary from './Summary';
import Toolbar from './Toolbar';

interface ResumeProps {
  data: ResumeData;
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
}

const Resume = ({ data, mode, onModeChange }: ResumeProps) => {
  const { basics, skills, experience, education } = data;
  const theme = useTheme();
  const prefersDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(() =>
    prefersDesktop ? experience.map(makeExperienceKey) : []
  );

  useEffect(() => {
    setExpandedIds(prefersDesktop ? experience.map(makeExperienceKey) : []);
  }, [experience, prefersDesktop]);

  const technologyOptions = useMemo(() => {
    const collect = new Set<string>();
    experience.forEach((item) => {
      item.technologies?.forEach((tech) => collect.add(tech));
    });
    return Array.from(collect).sort((a, b) => a.localeCompare(b));
  }, [experience]);

  const filteredExperience = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const normalizedTags = selectedTags.map((tag) => tag.toLowerCase());

    return experience.filter((item) => {
      const haystack = [item.company, item.position, item.summary, ...item.highlights]
        .join(' ')
        .toLowerCase();

      const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

      const technologySet = (item.technologies ?? []).map((tech) => tech.toLowerCase());
      const matchesTags = normalizedTags.every((tag) => technologySet.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [experience, searchTerm, selectedTags]);

  useEffect(() => {
    setExpandedIds((prev) => {
      const validIds = new Set(filteredExperience.map(makeExperienceKey));
      return prev.filter((id) => validIds.has(id));
    });
  }, [filteredExperience]);

  const handleToggleExperience = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedIds(filteredExperience.map(makeExperienceKey));
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleThemeToggle = () => {
    onModeChange(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box
      component="article"
      className="min-h-screen bg-slate-100 pb-10 pt-10 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100"
    >
      <Container maxWidth="md" className="mx-auto flex flex-col gap-8 md:gap-10">
        <Header
          basics={basics}
          mode={mode}
          onToggleTheme={handleThemeToggle}
          onPrint={handlePrint}
        />
        <Summary summary={basics.summary} />
        <Skills skills={skills} onSkillSelect={handleTagToggle} selectedSkills={selectedTags} />
        <Toolbar
          search={searchTerm}
          onSearchChange={setSearchTerm}
          tags={technologyOptions}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearFilters={handleClearFilters}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          disableExpandCollapse={filteredExperience.length === 0}
        />
        <Experience
          items={filteredExperience}
          expandedIds={expandedIds}
          onToggle={handleToggleExperience}
        />
        <Education education={education} />
      </Container>
    </Box>
  );
};

export default Resume;
