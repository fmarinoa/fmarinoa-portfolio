import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({
  quiet: !!process.env.CI,
})

// URL base para tests - debe ser proporcionada por CI o configurada localmente
const urlBase = process.env.TEST_URL_BASE

if (!urlBase) {
  throw new Error('TEST_URL_BASE environment variable is required for tests')
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30 * 1000, // 30 segundos timeout para tests más estables
  testDir: './tests',

  /* Configuración de ejecución optimizada para CI */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  /* Reporter optimizado para tests */
  reporter: process.env.CI
    ? [
        ['html', { outputFolder: 'playwright-report' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['github'],
      ]
    : [['html', { outputFolder: 'playwright-report' }]],

  /* Configuración global para todos los tests */
  use: {
    baseURL: urlBase,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        // Configuraciones específicas para Chrome
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
          ],
        },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
