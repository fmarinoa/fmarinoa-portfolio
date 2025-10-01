import { beforeEach, expect, test } from 'tests/fixtures'
import { fetchGlobals } from 'tests/utils/api'
import { waitForNewPageEvent } from 'tests/utils/waits'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has footer', async ({ page }) => {
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()
  await expect(footer).toBeVisible()
})

test('has footer icons links', async ({ page }) => {
  const { social } = await fetchGlobals()
  const footer = page.locator('footer')

  await footer.scrollIntoViewIfNeeded()

  const links = footer.locator('div.gap-4 > a')
  const urls: string[] = Object.values(social)

  await expect(links).toHaveCount(urls.length)

  for (const [i, url] of urls.entries()) {
    await expect(links.nth(i)).toHaveAttribute('href', url)
  }
})

test('has copyright notice', async ({ page }) => {
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  const copyright = footer.locator('span')

  await expect(copyright).toHaveText(
    new RegExp(
      `© ${new Date().getFullYear()} Franco Mariño\\s*Todos los derechos reservados`
    )
  )
})

test('has footer tests link', async ({ page }) => {
  const globals = await fetchGlobals()
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  const link = footer.locator(
    'div.flex-wrap > a:has-text("Reportes de pruebas")'
  )

  await expect(link).toHaveAttribute('href', globals.TEST_RESULTS_URL)

  const [newPage] = await waitForNewPageEvent(page, link)
  await expect(newPage).toHaveURL(globals.TEST_RESULTS_URL)
})

test('has footer doc link', async ({ page }) => {
  const globals = await fetchGlobals()
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  const link = footer.locator(
    'div.flex-wrap > a:has-text("Documentación del proyecto")'
  )

  await expect(link).toHaveAttribute('href', globals.DEEP_WIKI_URL)

  const [newPage] = await waitForNewPageEvent(page, link)
  await expect(newPage).toHaveURL(globals.DEEP_WIKI_URL)
})
