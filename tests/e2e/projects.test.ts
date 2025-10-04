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
  const count = await cardsHandle.count()
  const cards = await cardsHandle.all()

  // El carrusel tiene [último, ...todos, primero], así que los proyectos reales están en índices 1 hasta count-2
  const realCards = cards.slice(1, count - 1)

  for (const card of realCards.slice(0, Math.min(3, realCards.length))) {
    const heading = card.locator('h3')

    await expect(card).toHaveCSS('border-color', 'rgb(55, 65, 81)')
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)')

    await card.hover({ force: true })
    sleep(500)

    await expect(card).toHaveCSS('border-color', 'rgb(129, 140, 248)', {
      timeout: 1000,
    })
    await expect(heading).toHaveCSS('color', 'rgb(129, 140, 248)')
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
  expect(projectsExpected.length).toBe(count - 2)
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
      const entry = projectEntries.nth(index + 1)

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
        await expect(entry.locator('a:has-text("🛜 Demo")')).toHaveAttribute(
          'href',
          project.urls.demo
        )
      }
    })
  )
})
