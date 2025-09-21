import { projectsData } from '@/data/projectsData'
import type { Project } from '@/types'

export const projectsMock: Project[] = projectsData.map(p => ({
  ...p,
  imageUrl: '/mock.webp',
}))
