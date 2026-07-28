import { Locator } from '@tests/fixtures'

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export function formatPeriod(period: { start: string; end?: string }): string {
  const options = {
    year: 'numeric',
    month: 'long',
  } as const

  const parseMonthYear = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString('es-PE', {
      ...options,
      timeZone: 'UTC',
    })

  const start = parseMonthYear(period.start)
  const end =
    period.end === 'present' || !period.end
      ? capitalize(new Date().toLocaleDateString('es-PE', options))
      : parseMonthYear(period.end)

  return `${capitalize(start)} - ${capitalize(end)}`
}

export async function extractLocation(locator: Locator): Promise<string> {
  const text = (await locator.textContent()) ?? ''
  const parts = text.split('>')
  return parts[parts.length - 1].trim()
}
