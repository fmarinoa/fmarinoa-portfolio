import { Locator } from '@tests/fixtures'

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export function formatPeriod(period: { start: string; end?: string }): string {
  const options = {
    year: 'numeric',
    month: 'long',
  } as const
  const start = new Date(period.start).toLocaleDateString('es-PE', options)
  const end =
    period.end === 'present' || !period.end
      ? capitalize(new Date().toLocaleDateString('es-PE', options))
      : new Date(period.end).toLocaleDateString('es-PE', options)

  return `${capitalize(start)} - ${capitalize(end)}`
}

export async function extractLocation(locator: Locator): Promise<string> {
  const text = (await locator.textContent()) ?? ''
  const match = /📍\s*(.+)$/.exec(text)
  return match ? match[1].trim() : ''
}
