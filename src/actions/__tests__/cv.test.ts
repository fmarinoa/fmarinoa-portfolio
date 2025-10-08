import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { __testExports } from '../cv'

const { getCvUrlHandler } = __testExports

// Mock astro:actions
vi.mock('astro:actions', () => ({
  ActionError: class ActionError extends Error {
    code: string
    constructor({ code, message }: { code: string; message: string }) {
      super(message)
      this.code = code
      this.name = 'ActionError'
    }
  },
  defineAction: vi.fn(),
}))

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

      const result = await getCvUrlHandler()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://raw.githubusercontent.com/fmarinoa/fmarinoa-portfolio/refs/heads/content/data/urls.json'
      )
      expect(result).toEqual({ cvUrl: mockCvUrl })
    })

    it('should handle cv URL with whitespace', async () => {
      const mockCvUrl = '  https://example.com/cv.pdf  '
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: mockCvUrl }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrlHandler()

      expect(result).toEqual({ cvUrl: mockCvUrl.trim() })
    })

    it('should handle numeric cv URL', async () => {
      const mockCvUrl = 123456
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: mockCvUrl }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrlHandler()

      expect(result).toEqual({ cvUrl: '123456' })
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

      await expect(getCvUrlHandler()).rejects.toThrow(
        'Failed to fetch CV URL: 404 - Not Found'
      )
    })

    it('should throw error when response is not JSON', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow(
        'An unexpected error occurred'
      )
    })

    it('should throw error when data format is invalid', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(null),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow(
        'Invalid data format received'
      )
    })

    it('should throw error when data is not an object', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue('not an object'),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow(
        'Invalid data format received'
      )
    })

    it('should throw error when cv property is missing', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow('CV URL not configured')
    })

    it('should throw error when cv property is empty string', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: '' }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow('CV URL not configured')
    })

    it('should throw error when cv property is only whitespace', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: '   ' }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(getCvUrlHandler()).rejects.toThrow('CV URL not configured')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(getCvUrlHandler()).rejects.toThrow(
        'An unexpected error occurred'
      )
    })
  })

  describe('edge cases', () => {
    it('should handle cv as boolean false', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: false }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrlHandler()

      // false.toString() es "false", que es un string válido
      expect(result).toEqual({ cvUrl: 'false' })
    })

    it('should handle cv as number zero', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ cv: 0 }),
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await getCvUrlHandler()

      // 0.toString() es "0", que es un string válido
      expect(result).toEqual({ cvUrl: '0' })
    })
  })
})
