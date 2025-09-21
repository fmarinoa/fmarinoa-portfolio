export interface Project {
  title: string
  description: string
  technologies: string[]
  imageUrl?: ImageMetadata
  demoUrl?: string
  githubUrl?: string
}

export type NavItem = {
  href: string
  label: string
}

export interface Career {
  institutionShort: string
  location: string
  institutionLong: string
  logo: ImageMetadata
  title: string
  period: string
  details: string[]
}

export interface Course {
  name: string
  institution: string
  year: string
  url: string
}
