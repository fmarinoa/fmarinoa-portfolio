import { describe, it, expect } from 'vitest'
import { getIconUrl, getPhotoUrl } from '../content'

describe('Content Library Functions', () => {
  describe('getIconUrl function', () => {
    it('uses environment variable when available', () => {
      expect(getIconUrl('typescript')).toBe(
        'https://test-api.example.com/assets/icons/typescript.svg'
      )
    })

    it('uses provided baseUrl parameter when given', () => {
      expect(getIconUrl('typescript')).toBe(
        'https://test-api.example.com/assets/icons/typescript.svg'
      )
    })

    it('handles different technology icon names', () => {
      expect(getIconUrl('react')).toBe(
        'https://test-api.example.com/assets/icons/react.svg'
      )
      expect(getIconUrl('javascript')).toBe(
        'https://test-api.example.com/assets/icons/javascript.svg'
      )
    })

    it('handles empty filename gracefully', () => {
      expect(getIconUrl('')).toBe(
        'https://test-api.example.com/assets/icons/.svg'
      )
    })
  })

  describe('getPhotoUrl function', () => {
    it('uses environment variable when available', () => {
      const result = getPhotoUrl('profile')
      expect(result).toBe(
        'https://test-api.example.com/assets/photos/profile.webp'
      )
    })

    it('uses provided baseUrl parameter when given', () => {
      const result = getPhotoUrl('profile')
      expect(result).toBe(
        'https://test-api.example.com/assets/photos/profile.webp'
      )
    })

    it('handles different photo names', () => {
      expect(getPhotoUrl('avatar')).toBe(
        'https://test-api.example.com/assets/photos/avatar.webp'
      )
      expect(getPhotoUrl('banner')).toBe(
        'https://test-api.example.com/assets/photos/banner.webp'
      )
    })

    it('handles empty filename gracefully', () => {
      expect(getPhotoUrl('')).toBe(
        'https://test-api.example.com/assets/photos/.webp'
      )
    })
  })
})
