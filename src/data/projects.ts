import franco from '@/assets/photos/franco.webp'
import scrapper from '@/assets/projects/scrapper.webp'
import whatismyip from '@/assets/projects/whatismyip.webp'
import type { Project } from '@/types'
import { projectsData } from './projectsData'

export const projects: Project[] = [
  { ...projectsData[0], imageUrl: scrapper },
  { ...projectsData[1], imageUrl: whatismyip },
  { ...projectsData[2], imageUrl: franco },
]
