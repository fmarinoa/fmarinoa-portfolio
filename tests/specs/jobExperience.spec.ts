import { beforeEach, expect, test } from 'tests/fixtures';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigates to job experience section', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('experience');
});

test('validate effects in card', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('experience');

  const groups = await homePage.getExperienceGroups();

  for (const group of await groups.all()) {
    const card = group.locator('div.bg-gradient-to-br');
    await expect(card).toHaveCSS('border-color', 'rgb(55, 65, 81)');

    const heading = group.locator('h3');
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)');

    await group.hover();

    await expect(card).toHaveCSS('border-color', 'rgb(129, 140, 248)');
    await expect(heading).toHaveCSS('color', 'rgb(129, 140, 248)');
  }
});

test('has correct number of job entries', async ({ homePage }) => {
  const jobEntries = await homePage.getExperienceGroups();
  await expect(jobEntries).toHaveCount(3);
});
