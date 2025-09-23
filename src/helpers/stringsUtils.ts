export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const toKebabOrLower = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '-')
