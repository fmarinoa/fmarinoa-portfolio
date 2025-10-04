import { describe, it, expect } from 'vitest'
import { capitalize, toKebabOrLower, formatPeriod } from '../stringsUtils'

describe('String Utilities', () => {
  describe('capitalize function', () => {
    it('capitalizes first letter of lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('handles empty string gracefully', () => {
      expect(capitalize('')).toBe('')
    })

    it('capitalizes single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('preserves already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  describe('toKebabOrLower function', () => {
    it('converts spaces to kebab case', () => {
      expect(toKebabOrLower('Hello World')).toBe('hello-world')
      expect(toKebabOrLower('Multiple   Spaces')).toBe('multiple-spaces')
    })

    it('converts single word to lowercase', () => {
      expect(toKebabOrLower('Hello')).toBe('hello')
    })

    it('preserves existing kebab case', () => {
      expect(toKebabOrLower('hello-world')).toBe('hello-world')
    })

    it('handles multiple consecutive spaces', () => {
      expect(toKebabOrLower('Hello    World    Test')).toBe('hello-world-test')
    })
  })

  describe('formatPeriod function', () => {
    it('formats date range correctly', () => {
      expect(formatPeriod({ start: '2024-01', end: '2024-10' })).toBe(
        'Enero de 2024 - Octubre de 2024'
      )
    })

    it('handles present end date correctly', () => {
      const period = { start: '2000-12', end: 'present' }
      const result = formatPeriod(period)

      expect(result).toMatch(/Diciembre de 2000 - \w+ de \d{4}/)
      expect(result).toContain(' - ')
    })

    it('handles missing end date correctly', () => {
      const period = { start: '1998-02' }
      const result = formatPeriod(period)

      expect(result).toMatch(/Febrero de 1998 - \w+ de \d{4}/)
      expect(result).toContain(' - ')
    })

    it('formats different date ranges consistently', () => {
      const period1 = { start: '2023-06', end: '2023-12' }
      const period2 = { start: '2022-03', end: '2022-09' }

      const result1 = formatPeriod(period1)
      const result2 = formatPeriod(period2)

      expect(result1).toMatch(/\w+ de \d{4} - \w+ de \d{4}/)
      expect(result2).toMatch(/\w+ de \d{4} - \w+ de \d{4}/)
    })
  })
})
