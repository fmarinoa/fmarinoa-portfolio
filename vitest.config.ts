/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      TZ: 'America/Lima', // Timezone de Perú (es-PE)
      CONTENT_BASE_URL: 'https://test-api.example.com', // Mock para tests
    },
    // Buscar tests en folders __tests__
    include: [
      'src/**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    // Excluir archivos que no son tests
    exclude: [
      'node_modules/',
      'dist/',
      'coverage/',
      '.astro/',
      '**/*.config.*',
    ],
    // Configuración de entorno
    environment: 'node', // Cambiar a node para evitar conflictos con DOM
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // Umbral de cobertura del 80%
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '.astro/',
        'astro.config.mjs',
        'tailwind.config.ts',
        'commitlint.config.ts',
        'eslint.config.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
        '**/__tests__/**',
        '**/*.{test,spec}.*',
      ],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
    },
  },
})
