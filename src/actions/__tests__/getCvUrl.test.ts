import { describe, it, expect, vi } from 'vitest'
import { server } from '../index'
import { ActionError } from 'astro/actions/runtime/virtual/shared.js'
import { getCvUrl } from '@/services/getCvUrl'

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
  defineAction: vi.fn(config => config),
}))

vi.mock('@/services/getCvUrl', () => ({
  getCvUrl: vi.fn(),
}))

describe('server.getCvUrl action', () => {
  it('should return cvUrl when successful', async () => {
    getCvUrl.mockResolvedValue({
      success: true,
      error: null,
      cvUrl: 'https://cv.com',
    })
    const result = await server.getCvUrl.handler()
    expect(result).toBe('https://cv.com')
  })

  it('should throw ActionError when getCvUrl returns error', async () => {
    getCvUrl.mockResolvedValue({
      success: false,
      error: 'Network error',
      cvUrl: null,
    })
    await expect(server.getCvUrl.handler()).rejects.toThrow(ActionError)
    await expect(server.getCvUrl.handler()).rejects.toThrow('Network error')
  })

  it('should throw ActionError when getCvUrl returns success false or empty cvUrl', async () => {
    getCvUrl.mockResolvedValue({ success: false, error: null, cvUrl: null })
    await expect(server.getCvUrl.handler()).rejects.toThrow(ActionError)
    await expect(server.getCvUrl.handler()).rejects.toThrow(
      'Failed to retrieve CV URL'
    )
  })
})
