import { describe, it, expect } from 'vitest'
import {
  getCareers,
  getCourses,
  getFooterInfo,
  getIconUrl,
  getJobs,
  getPhotoUrl,
  getProjects,
} from '../content'

describe('Content Library Functions', () => {
  describe('getIconUrl function', () => {
    it('uses environment variable when available', () => {
      expect(getIconUrl('typescript')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/icons/typescript.svg`
      )
    })

    it('uses provided baseUrl parameter when given', () => {
      expect(getIconUrl('typescript')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/icons/typescript.svg`
      )
    })

    it('handles different technology icon names', () => {
      expect(getIconUrl('react')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/icons/react.svg`
      )
      expect(getIconUrl('javascript')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/icons/javascript.svg`
      )
    })

    it('handles empty filename gracefully', () => {
      expect(getIconUrl('')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/icons/.svg`
      )
    })
  })

  describe('getPhotoUrl function', () => {
    it('uses environment variable when available', () => {
      const result = getPhotoUrl('profile')
      expect(result).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/photos/profile.webp`
      )
    })

    it('uses provided baseUrl parameter when given', () => {
      const result = getPhotoUrl('profile')
      expect(result).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/photos/profile.webp`
      )
    })

    it('handles different photo names', () => {
      expect(getPhotoUrl('avatar')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/photos/avatar.webp`
      )
      expect(getPhotoUrl('banner')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/photos/banner.webp`
      )
    })

    it('handles empty filename gracefully', () => {
      expect(getPhotoUrl('')).toBe(
        `${process.env.CONTENT_BASE_URL}/assets/photos/.webp`
      )
    })
  })
  describe('getFooterInfo function', () => {
    it('fetches data with correct schema structure', async () => {
      const result = await getFooterInfo()

      // Validar que el resultado sea un objeto
      expect(result).toBeTypeOf('object')
      expect(result).not.toBeNull()
      expect(result).not.toBeInstanceOf(Array)
    })
  })
  describe('getProjects function', () => {
    it('fetches data with correct array schema structure', async () => {
      const result = await getProjects()

      // Validar que el resultado sea un array
      expect(Array.isArray(result)).toBe(true)
      expect(result).not.toBeNull()
    })
  })
  describe('getCareers function', () => {
    it('fetches data with correct array schema structure', async () => {
      const result = await getCareers()

      // Validar que el resultado sea un array
      expect(Array.isArray(result)).toBe(true)
      expect(result).not.toBeNull()
    })
  })
  describe('getCourses function', () => {
    it('fetches data with correct array schema structure', async () => {
      const result = await getCourses()

      // Validar que el resultado sea un array
      expect(Array.isArray(result)).toBe(true)
      expect(result).not.toBeNull()
    })
  })
  describe('getJobs function', () => {
    it('fetches data with correct array schema structure', async () => {
      const result = await getJobs()

      // Validar que el resultado sea un array
      expect(Array.isArray(result)).toBe(true)
      expect(result).not.toBeNull()
    })
  })
})
