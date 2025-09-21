import { projectsData } from '@/data/projectsData'

export const projectsMock = projectsData.map(project => ({
  ...project,
  imageUrl: undefined,
}))
