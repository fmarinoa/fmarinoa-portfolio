import { ActionError, defineAction } from 'astro:actions'
import { CONTENT_BASE_URL as BASE_URL } from '..'

const errorMessageNotConfigured = 'CV URL not configured'
const endpoint = '/data/urls.json'

export const getCvUrl = defineAction({
  accept: 'json',
  handler: async () => {
    return await fetch(`${BASE_URL}${endpoint}`)
      .then(response => {
        if (!response.ok) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to fetch CV URL: ${response.status} - ${response.statusText}`,
          })
        }
        return response.json()
      })
      .then(data => {
        if (!data || typeof data !== 'object') {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Invalid data format received',
          })
        }
        return data.cv
      })
      .then(cv => {
        const normalizedCv = cv?.toString().trim()
        if (!normalizedCv || typeof normalizedCv !== 'string') {
          throw new ActionError({
            code: 'NOT_FOUND',
            message: errorMessageNotConfigured,
          })
        }
        return { cvUrl: normalizedCv }
      })
      .catch(error => {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof ActionError
              ? error.message
              : 'An unexpected error occurred',
        })
      })
  },
})
