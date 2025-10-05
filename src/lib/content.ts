const BASE_URL = import.meta.env.CONTENT_BASE_URL

const endpoints = {
  footerInfo: '/data/footerInfo.json',
  about: '/data/aboutMe.md',
  projects: '/data/projects.json',
  careers: '/data/careers.json',
  courses: '/data/courses.json',
  jobs: '/data/jobs.json',
  urls: '/data/urls.json',
} as const

const assetPaths = {
  photos: '/assets/photos/',
  icons: '/assets/icons/',
} as const

async function fetchData<T>(endpoint: string, fallback: T): Promise<T> {
  return await fetch(`${BASE_URL}${endpoint}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    })
    .catch(error => {
      console.warn(`Failed to fetch ${endpoint}:`, error)
      return fallback
    })
}

export function getIconUrl(filename: string): string {
  return `${BASE_URL}${assetPaths.icons}${filename}.svg`
}

export function getPhotoUrl(filename: string): string {
  return `${BASE_URL}${assetPaths.photos}${filename}.webp`
}

export const getFooterInfo = async () => fetchData(endpoints.footerInfo, {})

export const getProjects = async () => fetchData(endpoints.projects, [])

export const getCareers = async () => fetchData(endpoints.careers, [])

export const getCourses = async () => fetchData(endpoints.courses, [])

export const getJobs = async () => fetchData(endpoints.jobs, [])
