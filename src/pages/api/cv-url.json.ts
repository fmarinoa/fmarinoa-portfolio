import type { APIRoute } from 'astro'
import { CONTENT_BASE_URL as BASE_URL } from '.'
import {
  handleBadRequest,
  handleError,
  handleSuccess,
} from '@/helpers/apiUtils'

const errorMessageNotConfigured = 'CV URL not configured'
const endpoint = '/data/urls.json'

export const GET: APIRoute = async () => {
  return await fetch(`${BASE_URL}${endpoint}`)
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
        throw new Error(errorMessageNotConfigured)
      }
      return handleSuccess({ cvUrl: cv.trim() })
    })
    .catch(error => {
      if (error.message === errorMessageNotConfigured) {
        return handleBadRequest({ error })
      }
      return handleError({ error })
    })
}
