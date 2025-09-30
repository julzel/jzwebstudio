import resumeSource from '../assets/resume.json';
import { resumeSchema } from '../types/resume';

export const resumeData = resumeSchema.parse(resumeSource);
