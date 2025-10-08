export interface Project {
  title: string
  description: string
  technologies: string[]
  urls: {
    image?: string
    demo?: string
    github: string
  }
}

export type NavItem = {
  href: string
  label: string
}

export interface Career {
  institutionShort: string
  location: string
  institutionLong: string
  logo: string
  title: string
  period: { start: string; end?: string }
  details: string[]
}

export interface Course {
  name: string
  institution: string
  year: string
  url: string
}

export interface FooterInfo {
  socials: Array<{ profile: string; icon: string }>
  links: Array<{ url: string; humanText: string }>
}
