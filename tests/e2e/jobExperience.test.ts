import { formatPeriod } from '@/helpers/stringsUtils'
import { beforeEach, expect, test } from 'tests/fixtures'
import { fetchJobs } from 'tests/utils/api'
import { extractLocation } from 'tests/utils/extractUtils'
import { sleep } from 'tests/utils/waits'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('navigates to job experience section', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('experience')
  expect(await homePage.getSectionTitle('experience')).toBe(
    'Experiencia laboral'
  )
})

test('validate effects in card', async ({ page, homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('experience')

  const groups = await homePage.getExperienceGroups()

  for (const group of await groups.all()) {
    const card = group.locator('article.bg-gradient-to-br')
    await card.scrollIntoViewIfNeeded()
    await expect(card).toHaveCSS('border-color', 'rgb(55, 65, 81)')

    const heading = group.locator('h3')
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)')

    await card.hover({ force: true })
    sleep(200)

    await expect(card).toHaveCSS('border-color', 'rgb(129, 140, 248)', {
      timeout: 1000,
    })
    await expect(heading).toHaveCSS('color', 'rgb(129, 140, 248)')
    await page.mouse.click(0, 0)
  }
})

test('should display correct experience information for each job', async ({
  homePage,
}) => {
  const jobsExpected = await fetchJobs()
  const groups = await homePage.getExperienceGroups()

  await expect(groups).toHaveCount(jobsExpected.length)

  const allGroups = await groups.all()

  for (const [index, job] of jobsExpected.entries()) {
    const group = allGroups[index]

    await expect(group.locator('h3')).toHaveText(job.title)

    const company = group.locator('a')
    await expect(company).toHaveText(job.company)
    await expect(company).toHaveAttribute('href', job.linkCompany)

    const locationNode = group.locator('div.flex.items-center.gap-2')
    const textLocation = await extractLocation(locationNode)
    expect(textLocation).toBe(job.location)

    await expect(group.locator('div.text-sm.text-gray-300 > p')).toHaveText(
      `📅 ${formatPeriod(job.period)}`
    )

    const detailItems = await group.locator('ul li').all()
    for (const [i, jobDetail] of job.details.entries()) {
      await expect(detailItems[i]).toHaveText(jobDetail)
    }
  }
})
