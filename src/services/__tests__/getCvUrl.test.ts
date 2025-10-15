import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCvUrl } from '../getCvUrl'

// Mock de BASE_URL
vi.mock('..', () => ({
  CONTENT_BASE_URL: 'https://test-api.com',
}))

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('getCvUrl action handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('success cases', () => {
    it('should return cv URL when fetch is successful', async () => {
      const mockCvUrl = 'https://example.com/cv.pdf'
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: mockCvUrl }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({ cvUrl: mockCvUrl, success: true })
    })

    it('should handle cv URL with whitespace', async () => {
      const mockCvUrl = '  https://example.com/cv.pdf  '
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: mockCvUrl }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()

      expect(result).toEqual({ cvUrl: mockCvUrl.trim(), success: true })
    })

    it('should handle numeric cv URL', async () => {
      const mockCvUrl = 123456
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: mockCvUrl }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'CV URL not configured',
        success: false,
      })
    })
  })

  describe('error cases', () => {
    it('should throw error when fetch fails', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'Failed to fetch CV URL: 404 - Not Found',
        success: false,
      })
    })

    it('should throw error when response is not JSON', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'An unexpected error occurred',
        success: false,
      })
    })

    it('should throw error when data format is invalid', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(null),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'Invalid data format received',
        success: false,
      })
    })

    it('should throw error when data is not an object', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue('not an object'),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'Invalid data format received',
        success: false,
      })
    })

    it('should throw error when cv property is missing', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'CV URL not configured',
        success: false,
      })
    })

    it('should throw error when cv property is empty string', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: '' }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'CV URL not configured',
        success: false,
      })
    })

    it('should throw error when cv property is only whitespace', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: '   ' }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'CV URL not configured',
        success: false,
      })
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await getCvUrl()
      expect(result).toEqual({
        error: 'An unexpected error occurred',
        success: false,
      })
    })
  })

  describe('edge cases', () => {
    it('should handle cv as boolean false', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: false }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()

      // false.toString() es "false", que es un string válido
      expect(result).toEqual({ error: 'CV URL not configured', success: false })
    })

    it('should handle cv as number zero', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: 0 }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrl()

      // 0.toString() es "0", que es un string válido
      expect(result).toEqual({ error: 'CV URL not configured', success: false })
    })
  })
})
