import { beforeEach, expect, test } from 'tests/fixtures'
import { fetchCVUrl } from 'tests/utils/api'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Franco Mariño | Portfolio/)
  await expect(page.locator('h1').nth(0)).toHaveText('Franco Mariño')
})

test('downloading CV shows thank-you alert and hides it after timeout', async ({
  page,
  homePage,
}) => {
  test.setTimeout(15 * 1000)
  const cvUrlExpected = await fetchCVUrl()

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    homePage.openCv(),
  ])

  await expect(newPage).toHaveURL(cvUrlExpected)

  const alert = page.locator('#alert')
  await expect(alert).toBeVisible()
  await expect(alert).toHaveText('¡Gracias por abrir mi CV!')

  await expect(alert).toBeHidden({ timeout: 6 * 1000 })
})
