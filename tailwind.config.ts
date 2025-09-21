import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro}'],
  plugins: [require('tailwindcss-animate')],
} satisfies Config
