import { describe, it, expect, vi } from 'vitest'
import { server } from '../index'
import { ActionError } from 'astro:actions'
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

const mockedGetCvUrl = vi.mocked(getCvUrl)

// El mock de defineAction devuelve la config cruda (con `.handler`),
// distinto al tipo real de ActionClient que expone Astro.
const callHandler = () =>
  (server.getCvUrl as unknown as { handler: () => Promise<string> }).handler()

describe('server.getCvUrl action', () => {
  it('should return cvUrl when successful', async () => {
    mockedGetCvUrl.mockResolvedValue({
      success: true,
      cvUrl: 'https://cv.com',
    })
    const result = await callHandler()
    expect(result).toBe('https://cv.com')
  })

  it('should throw ActionError when getCvUrl returns error', async () => {
    mockedGetCvUrl.mockResolvedValue({
      success: false,
      error: 'Network error',
    })
    await expect(callHandler()).rejects.toThrow(ActionError)
    await expect(callHandler()).rejects.toThrow('Network error')
  })

  it('should throw ActionError when getCvUrl returns success false or empty cvUrl', async () => {
    mockedGetCvUrl.mockResolvedValue({ success: false })
    await expect(callHandler()).rejects.toThrow(ActionError)
    await expect(callHandler()).rejects.toThrow('Failed to retrieve CV URL')
  })
})
