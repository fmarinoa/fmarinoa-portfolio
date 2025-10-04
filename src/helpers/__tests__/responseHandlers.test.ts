import { describe, it, expect, vi } from 'vitest'
import {
  handleError,
  handleBadRequest,
  handleSuccess,
} from '../responseHandlers'

// Mock pino logger
vi.mock('pino', () => ({
  default: () => ({
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  }),
}))

describe('API Response Handlers', () => {
  describe('handleError function', () => {
    it('returns 500 status with default error message', async () => {
      const response = handleError({ error: new Error('Test error') })

      expect(response.status).toBe(500)
      expect(response.headers.get('Content-Type')).toBe('application/json')

      const body = await response.json()
      expect(body).toEqual({ error: 'Internal Server Error' })
    })

    it('returns 500 status with custom error message', async () => {
      const response = handleError({
        error: new Error('Test error'),
        message: 'Custom error message',
      })

      const body = await response.json()
      expect(body).toEqual({ error: 'Custom error message' })
    })
  })

  describe('handleBadRequest', () => {
    it('should return 400 status with error message', async () => {
      const response = handleBadRequest({ error: new Error('Bad input') })

      expect(response.status).toBe(400)
      expect(response.headers.get('Content-Type')).toBe('application/json')

      const body = await response.json()
      expect(body).toEqual({ error: 'Bad Request' })
    })

    it('should use custom error message', async () => {
      const response = handleBadRequest({
        error: new Error('Bad input'),
        message: 'Invalid data provided',
      })

      const body = await response.json()
      expect(body).toEqual({ error: 'Invalid data provided' })
    })
  })

  describe('handleSuccess', () => {
    it('should return 200 status with data', async () => {
      const testData = { message: 'Success', data: [1, 2, 3] }
      const response = handleSuccess(testData)

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('application/json')

      const body = await response.json()
      expect(body).toEqual(testData)
    })

    it('should handle empty object', async () => {
      const response = handleSuccess({})

      expect(response.status).toBe(200)
      const body = await response.json()
      expect(body).toEqual({})
    })
  })
})
