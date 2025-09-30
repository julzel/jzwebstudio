import { z } from 'zod';

export const locationSchema = z.object({
  region: z.string().min(1),
  availability: z.string().min(1).optional(),
});

export const basicsSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  location: locationSchema.optional(),
  summary: z.string().min(1),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)).default([]),
  technologies: z.array(z.string().min(1)).optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  area: z.string().min(1),
  studyType: z.string().min(1),
  startDate: z.string().min(1).optional(),
  endDate: z.string().min(1).optional(),
});

const skillGroupSchema = z.array(z.string().min(1));
export const skillsSchema = z.record(z.string(), skillGroupSchema).default({});

export const resumeSchema = z.object({
  basics: basicsSchema,
  skills: skillsSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
});

export type ResumeData = z.infer<typeof resumeSchema>;
export type ExperienceItemData = z.infer<typeof experienceSchema>;
export type EducationItemData = z.infer<typeof educationSchema>;
export type BasicsData = z.infer<typeof basicsSchema>;
