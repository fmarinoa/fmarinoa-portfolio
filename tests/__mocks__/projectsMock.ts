import { projectsData } from '@/data/projectsData';
import { Project } from '@/types';

export const projectsMock: Project[] = projectsData.map((p) => ({
  ...p,
  imageUrl: '/mock.webp',
}));
