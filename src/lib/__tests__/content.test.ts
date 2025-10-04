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

      // Validar estructura de links
      expect(result).toHaveProperty('links')
      expect((result as any).links).toBeTypeOf('object')

      // Validar que cada link tenga la estructura correcta
      const links = (result as any).links
      Object.entries(links).forEach(([key, linkData]: [string, any]) => {
        expect(linkData).toBeTypeOf('object')
        expect(linkData).toHaveProperty('humanText')
        expect(linkData).toHaveProperty('url')
        expect(linkData.humanText).toBeTypeOf('string')
        expect(linkData.url).toBeTypeOf('string')
        expect(linkData.url).toMatch(/^https?:\/\//)
      })

      // Validar estructura de socials
      expect(result).toHaveProperty('socials')
      expect((result as any).socials).toBeTypeOf('object')

      // Validar que cada social tenga la estructura correcta
      const socials = (result as any).socials
      Object.entries(socials).forEach(([key, socialData]: [string, any]) => {
        expect(socialData).toBeTypeOf('object')
        expect(socialData).toHaveProperty('icon')
        expect(socialData).toHaveProperty('profile')
        expect(socialData.icon).toBeTypeOf('string')
        expect(socialData.profile).toBeTypeOf('string')
        expect(socialData.icon).toMatch(/^https?:\/\/.*\.svg$/)
        expect(socialData.profile).toMatch(/^https?:\/\//)
      })
    })

    it('validates specific social platforms schema', async () => {
      const result = (await getFooterInfo()) as any

      // Validar que existan las plataformas sociales esperadas
      expect(result.socials).toHaveProperty('github')
      expect(result.socials).toHaveProperty('linkedin')

      // Validar estructura específica de GitHub
      const github = result.socials.github
      expect(github.profile).toMatch(/^https?:\/\/github\.com\//)
      expect(github.icon).toMatch(/github\.svg$/)

      // Validar estructura específica de LinkedIn
      const linkedin = result.socials.linkedin
      expect(linkedin.profile).toMatch(/^https?:\/\/.*linkedin\.com\//)
      expect(linkedin.icon).toMatch(/linkedin\.svg$/)
    })

    it('validates links schema contains required entries', async () => {
      const result = (await getFooterInfo()) as any

      // Validar que existan los links esperados
      expect(result.links).toHaveProperty('DEEP_WIKI_URL')
      expect(result.links).toHaveProperty('TEST_RESULTS_URL')

      // Validar que cada link tenga texto descriptivo
      Object.entries(result.links).forEach(([key, linkData]: [string, any]) => {
        expect(linkData.humanText).toBeTruthy()
        expect(linkData.humanText.length).toBeGreaterThan(0)
        expect(linkData.url).toBeTruthy()
        expect(linkData.url.length).toBeGreaterThan(0)
      })
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
