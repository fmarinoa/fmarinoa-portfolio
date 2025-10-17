import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'
import vercelAdapter from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.francomarino.dev',

  security: {
    checkOrigin: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [sitemap()],

  adapter: vercelAdapter({
    webAnalytics: {
      enabled: true,
    },
  }),

  output: 'server',
})
