import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '../cv-url.json'

// Mock the dependencies
vi.mock('..', () => ({
  CONTENT_BASE_URL: 'https://example.com',
}))

vi.mock('@/helpers/responseHandlers', () => ({
  handleSuccess: vi.fn(data => ({ success: true, data })),
  handleBadRequest: vi.fn(error => ({ error: true, status: 400, ...error })),
  handleError: vi.fn(error => ({ error: true, status: 500, ...error })),
}))

global.fetch = vi.fn()

describe('CV URL API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return CV URL successfully', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ cv: 'https://example.com/cv.pdf' }),
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await GET()

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.CONTENT_BASE_URL}/data/urls.json`
    )
    expect(result).toEqual({
      success: true,
      data: { cvUrl: 'https://example.com/cv.pdf' },
    })
  })

  it('should handle fetch error', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await GET()

    expect(result).toEqual({
      error: true,
      status: 500,
      error: expect.any(Error),
    })
  })

  it('should handle invalid data format', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await GET()

    expect(result).toEqual({
      error: true,
      status: 500,
      error: expect.any(Error),
    })
  })

  it('should handle missing CV URL', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ cv: '' }),
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await GET()

    expect(result).toEqual({
      error: true,
      status: 400,
      error: expect.any(Error),
    })
  })

  it('should trim CV URL whitespace', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ cv: '  https://example.com/cv.pdf  ' }),
    }

    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await GET()

    expect(result).toEqual({
      success: true,
      data: { cvUrl: 'https://example.com/cv.pdf' },
    })
  })
})
