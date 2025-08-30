export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export type NavItem = {
  href: string;
  label: string;
};
