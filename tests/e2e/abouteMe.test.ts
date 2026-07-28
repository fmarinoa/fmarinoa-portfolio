import { beforeEach, expect, test } from '@tests/fixtures'
import { sleep } from '@tests/utils/waits'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('navigates to about me section', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('about-me')
  expect(await homePage.getSectionTitle('about-me')).toBe('Sobre mí')
})

test('interacts with icons in carousel', async ({ page }) => {
  const card = page.locator('div[role="listitem"]:visible').first()

  await card.hover({ force: true })
  await sleep(200)

  await expect(card).toHaveCSS('border-color', 'rgb(79, 214, 224)', {
    timeout: 1000,
  })

  const boxShadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
  expect(boxShadow).not.toBe('none')

  const transform = await card.evaluate(el => getComputedStyle(el).transform)
  expect(transform).toContain('matrix')
})
