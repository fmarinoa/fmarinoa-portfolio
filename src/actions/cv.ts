import { ActionError } from 'astro:actions'
import { CONTENT_BASE_URL as BASE_URL } from '..'

const CV_CONFIG = {
  ENDPOINT: '/data/urls.json',
  ERROR_MESSAGES: {
    NOT_CONFIGURED: 'CV URL not configured',
    FETCH_FAILED: 'Failed to fetch CV URL',
    INVALID_FORMAT: 'Invalid data format received',
    UNEXPECTED: 'An unexpected error occurred',
  },
} as const

interface CvUrlResponse {
  cvUrl: string
}

const getCvUrlHandler = async (): Promise<CvUrlResponse> => {
  return await fetch(`${BASE_URL}${CV_CONFIG.ENDPOINT}`)
    .then(response => {
      if (!response.ok) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `${CV_CONFIG.ERROR_MESSAGES.FETCH_FAILED}: ${response.status} - ${response.statusText}`,
        })
      }
      return response.json()
    })
    .then(data => {
      if (!data || typeof data !== 'object') {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `${CV_CONFIG.ERROR_MESSAGES.INVALID_FORMAT}`,
        })
      }
      return data.cv
    })
    .then(cv => {
      const normalizedCv = cv?.toString().trim()
      if (!normalizedCv || typeof normalizedCv !== 'string') {
        throw new ActionError({
          code: 'NOT_FOUND',
          message: `${CV_CONFIG.ERROR_MESSAGES.NOT_CONFIGURED}`,
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
            : `${CV_CONFIG.ERROR_MESSAGES.UNEXPECTED}`,
      })
    })
}

export const createGetCvUrlAction = () => ({
  accept: 'json' as const,
  handler: getCvUrlHandler,
})

export const __testExports = {
  getCvUrlHandler,
}
