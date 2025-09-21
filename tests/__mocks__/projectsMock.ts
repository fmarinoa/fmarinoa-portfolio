import { projectsData } from '@/data/projectsData'
import type { Project } from '@/types'

export const projectsMock: Omit<Project, 'imageUrl'>[] = projectsData
