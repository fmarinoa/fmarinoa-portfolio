export async function fetchCVUrl(): Promise<string> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/urls.json')
    .then(response => response.json())
    .then(data => data.cv)
    .catch(() => '')
}

export async function fetchCareers(): Promise<any[]> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/careers.json')
    .then(response => response.json())
    .catch(() => [])
}

export async function fetchCourses(): Promise<any[]> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/courses.json')
    .then(response => response.json())
    .catch(() => [])
}

export async function fetchFooterSocials(): Promise<any> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/footerInfo.json')
    .then(response => response.json())
    .then(data => data.socials)
    .catch(() => ({}))
}
export async function fetchJobs(): Promise<any[]> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/jobs.json')
    .then(response => response.json())
    .catch(() => [])
}

export async function fetchProjects(): Promise<any[]> {
  return fetch(process.env.CONTENT_BASE_URL + '/data/projects.json')
    .then(response => response.json())
    .catch(() => [])
}
