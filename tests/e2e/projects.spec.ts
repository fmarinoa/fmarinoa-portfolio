import { projectsMock } from 'tests/__mocks__/projectsMock';
import { beforeEach, expect, test } from 'tests/fixtures';
import { sleep } from 'tests/utils/waits';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigates to projects section and validate title', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('projects');
  expect(await homePage.getSectionTitle('projects')).toBe('Proyectos personales');
});

test('validate effects in cards', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('projects');

  const cardsHandle = await homePage.getProjectsCards();
  const count = await cardsHandle.count();
  const cards = await cardsHandle.all();

  for (const card of cards.slice(0, Math.floor(count / 2))) {
    const heading = card.locator('h3');

    await expect(card).toHaveCSS('border-color', 'rgb(55, 65, 81)');
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)');

    await card.hover({ force: true });
    sleep(200);

    await expect(card).toHaveCSS('border-color', 'rgb(129, 140, 248)', { timeout: 1000 });
    await expect(heading).toHaveCSS('color', 'rgb(129, 140, 248)');
  }
});

test('has correct number of project entries', async ({ homePage }) => {
  const projectEntries = await homePage.getProjectsCards();
  const count = await projectEntries.count();
  expect(count / 2).toBe(projectsMock.length);
});

test('should display correct project information for each project', async ({ homePage }) => {
  const projectEntries = await homePage.getProjectsCards();

  for (const [index, project] of projectsMock.entries()) {
    const entry = projectEntries.nth(index);

    await expect(entry.locator('h3')).toHaveText(project.title);

    await expect(entry.locator('p')).toHaveText(project.description);

    const actualTechs = await entry.locator('.flex-wrap span').allTextContents();
    expect(actualTechs).toEqual(project.technologies);

    await expect(entry.locator('a:has-text("< GitHub / >")')).toHaveAttribute(
      'href',
      project.githubUrl
    );

    if (project.demoUrl)
      await expect(entry.locator('a:has-text("Demo 🛜")')).toHaveAttribute('href', project.demoUrl);
  }
});
