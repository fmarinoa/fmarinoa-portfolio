import { marked } from 'marked'

const BASE_URL = import.meta.env.CONTENT_BASE_URL

const urls = {
  globals: `${BASE_URL}/data/globals.json`,
  about: `${BASE_URL}/data/aboutMe.md`,
  projects: `${BASE_URL}/data/projects.json`,
  careers: `${BASE_URL}/data/careers.json`,
  courses: `${BASE_URL}/data/courses.json`,
  jobs: `${BASE_URL}/data/jobs.json`,
  tools: `${BASE_URL}/data/tools.json`,
  photos: `${BASE_URL}/assets/photos/`,
}

export function getPhotoUrl(filename: string): string {
  return `${urls.photos}${filename}.webp`
}

export async function getGlobals() {
  const res = await fetch(urls.globals)
  return res.json()
}

export async function getGlobal(globalKey: string) {
  const res = await fetch(urls.globals)
  const data = await res.json()
  return data[globalKey]
}

export async function getAbout(): Promise<string> {
  const res = await fetch(urls.about)
  const md = await res.text()
  return marked.parse(md)
}

export async function getProjects() {
  const res = await fetch(urls.projects)
  return res.json()
}

export async function getCareers() {
  const res = await fetch(urls.careers)
  return res.json()
}

export async function getCourses() {
  const res = await fetch(urls.courses)
  return res.json()
}

export async function getJobs() {
  const res = await fetch(urls.jobs)
  return res.json()
}

export async function getTools() {
  const res = await fetch(urls.tools)
  return res.json()
}
