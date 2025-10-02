import { beforeEach, expect, test } from '@tests/fixtures'
import { fetchFooterLinks, fetchFooterSocials } from '@tests/utils/api'
import { waitForNewPageEvent } from '@tests/utils/waits'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has footer', async ({ page }) => {
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()
  await expect(footer).toBeVisible()
})

test('has footer icons links', async ({ page }) => {
  const socialsInfo = await fetchFooterSocials()
  const footer = page.locator('footer')

  await footer.scrollIntoViewIfNeeded()

  const links = footer.locator('div.gap-4 > a')

  const socialUrls = Object.values(socialsInfo).map(
    (social: any) => social.profile
  )

  await expect(links).toHaveCount(socialUrls.length)

  for (const [i, url] of socialUrls.entries()) {
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
  const links = await fetchFooterLinks()
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  const link = footer.locator(
    'div.flex-wrap > a:has-text("Reportes de pruebas")'
  )

  await expect(link).toHaveAttribute('href', links.TEST_RESULTS_URL.url)

  const [newPage] = await waitForNewPageEvent(page, link)
  await expect(newPage).toHaveURL(links.TEST_RESULTS_URL.url)
})

test('has footer doc link', async ({ page }) => {
  const links = await fetchFooterLinks()
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  const link = footer.locator(
    'div.flex-wrap > a:has-text("Documentación del proyecto")'
  )

  await expect(link).toHaveAttribute('href', links.DEEP_WIKI_URL.url)

  const [newPage] = await waitForNewPageEvent(page, link)
  await expect(newPage).toHaveURL(links.DEEP_WIKI_URL.url)
})
