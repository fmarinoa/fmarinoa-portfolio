import { beforeEach, expect, test } from '@tests/fixtures'
import { fetchProjects } from '@tests/utils/api'
import { sleep } from '@tests/utils/waits'

beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('navigates to projects section and validate title', async ({
  homePage,
  isMobile,
}) => {
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('projects')
  expect(await homePage.getSectionTitle('projects')).toBe(
    'Proyectos personales'
  )
})

test('validate effects in cards', async ({ page, homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('projects')

  const cardsHandle = await homePage.getProjectsCards()
  const cards = await cardsHandle.all()

  for (const card of cards.slice(0, Math.min(3, cards.length))) {
    const heading = card.locator('h3')

    await expect(card).toHaveCSS('border-color', 'rgb(35, 39, 46)')
    await expect(heading).toHaveCSS('color', 'rgb(231, 233, 236)')

    await card.hover({ force: true })
    await sleep(500)

    const boxShadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(boxShadow).not.toBe('none')

    await page.mouse.click(0, 0)
  }
})

test('has correct number of project entries', async ({
  homePage,
  isMobile,
}) => {
  const projectsExpected = await fetchProjects()
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('projects')

  const projectEntries = await homePage.getProjectsCards()
  const count = await projectEntries.count()
  expect(projectsExpected.length).toBe(count)
})

test('should display correct project information for each project', async ({
  homePage,
  isMobile,
}) => {
  const projectsExpected = await fetchProjects()
  await homePage.openMenuIfMobile(isMobile)
  await homePage.goToSection('projects')

  const projectEntries = await homePage.getProjectsCards()

  await Promise.all(
    projectsExpected.map(async (project, index) => {
      const entry = projectEntries.nth(index)

      await expect(entry.locator('h3')).toHaveText(project.title)

      await expect(entry.locator('p')).toHaveText(project.description)

      const actualTechs = (
        await entry.locator('.flex-wrap span').allTextContents()
      ).map(t => t.trim())
      expect(actualTechs).toEqual(project.technologies)

      await expect(entry.locator('a:has-text("Código")')).toHaveAttribute(
        'href',
        project.urls.github
      )

      if (project.urls.demo) {
        await expect(entry.locator('a:has-text("Demo")')).toHaveAttribute(
          'href',
          project.urls.demo
        )
      }
    })
  )
})
