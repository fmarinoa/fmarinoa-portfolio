export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const toKebabOrLower = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '-')

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
