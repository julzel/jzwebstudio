import type { ExperienceItemData } from '../types/resume';

export const makeExperienceKey = (item: ExperienceItemData) =>
  `${item.company}-${item.position}-${item.startDate}`;
