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
  success: boolean
  cvUrl?: string
  error?: string
}

export const getCvUrl = async (): Promise<CvUrlResponse> => {
  try {
    const response = await fetch(`${BASE_URL}${CV_CONFIG.ENDPOINT}`)

    if (!response.ok) {
      return {
        success: false,
        error: `${CV_CONFIG.ERROR_MESSAGES.FETCH_FAILED}: ${response.status} - ${response.statusText}`,
      }
    }

    const data = await response.json()

    if (!data || typeof data !== 'object') {
      return {
        success: false,
        error: `${CV_CONFIG.ERROR_MESSAGES.INVALID_FORMAT}`,
      }
    }

    const cv = data.cv

    if (typeof cv !== 'string' || !cv.trim()) {
      return {
        success: false,
        error: `${CV_CONFIG.ERROR_MESSAGES.NOT_CONFIGURED}`,
      }
    }

    return {
      success: true,
      cvUrl: cv.trim(),
    }
  } catch {
    return {
      success: false,
      error: `${CV_CONFIG.ERROR_MESSAGES.UNEXPECTED}`,
    }
  }
}
