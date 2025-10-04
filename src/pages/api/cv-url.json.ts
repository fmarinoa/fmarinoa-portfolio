import type { APIRoute } from 'astro'
import { CONTENT_BASE_URL as BASE_URL } from '.'
import {
  handleBadRequest,
  handleError,
  handleSuccess,
} from '@/helpers/apiUtils'

export const GET: APIRoute = async () => {
  return await fetch(`${BASE_URL}/data/urls.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch CV URL: ${response.status} - ${response.statusText}`
        )
      }
      return response.json()
    })
    .then(data => {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format received')
      }
      return data.cv
    })
    .then(cv => {
      if (!cv || typeof cv !== 'string' || !cv.trim()) {
        throw new Error('CV URL not configured')
      }
      return handleSuccess({ cvUrl: cv.trim() })
    })
    .catch(error => {
      if (error.message === 'CV URL not configured') {
        return handleBadRequest({ error })
      }
      return handleError({ error })
    })
}
