import { projects } from '@/data/projects'
import type { Project } from '@/types'

export const projectsMock: Omit<Project, 'imageUrl'>[] = projects.map(
  ({ imageUrl, ...rest }) => rest
)
