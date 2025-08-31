import { careersMock } from 'tests/__mocks__/carrersMock';
import { beforeEach, expect, test } from 'tests/fixtures';
import { extractLocation } from 'tests/utils/extractUtils';
import { sleep } from 'tests/utils/waits';

import { courses } from '@/data/courses';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigates to education section and validate title', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('education');
  expect(await homePage.getSectionTitle('education')).toBe('Educación');
});

test('validate effects in cards', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('education');

  const cards = await homePage.getEducationCards();

  for (const card of await cards.all()) {
    const heading = card.locator('h3');

    await expect(card).toHaveCSS('border-color', 'rgb(55, 65, 81)');
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)');

    await card.hover({ force: true });
    sleep(200);

    await expect(card).toHaveCSS('border-color', 'rgb(129, 140, 248)', { timeout: 1000 });
    await expect(heading).toHaveCSS('color', 'rgb(129, 140, 248)');
  }
});

test('has correct number of education entries', async ({ homePage }) => {
  const educationEntries = await homePage.getEducationCards();
  expect(educationEntries).toHaveCount(careersMock.length);
});

test('should display correct careers information for each education entry', async ({
  homePage,
}) => {
  const cards = await (await homePage.getEducationCards()).all();

  for (const [index, career] of careersMock.entries()) {
    const card = cards[index];

    await expect(card.locator('h3')).toHaveText(career.title);

    const school = card.locator('span.text-sm');
    await expect(school).toHaveText(career.institutionShort);

    const locationNode = card.locator('div.flex.items-center.gap-2');
    const textLocation = await extractLocation(locationNode);
    expect(textLocation).toBe(career.location);

    await expect(card.locator('div.text-sm.text-gray-300 > p')).toHaveText(`📅 ${career.period}`);

    const detailItems = await card.locator('ul li').all();
    for (const [i, careerDetail] of career.details.entries()) {
      await expect(detailItems[i]).toHaveText(careerDetail);
    }
  }
});

test('should display correct courses information for each education entry', async ({ page }) => {
  const educationSection = page.locator('section#education');
  expect(await educationSection.locator('h3.text-lg').textContent()).toBe(
    'Algunas certificaciones:'
  );

  const coursesCards = await educationSection.locator('ul.pl-2 > li').all();

  for (const [index, course] of courses.entries()) {
    const card = coursesCards[index];

    await expect(card.locator('a')).toHaveText(course.name);
    await expect(card.locator('a')).toHaveAttribute('href', course.url);

    await expect(card.locator('span.text-gray-300')).toHaveText(course.institution);

    await expect(card.locator('span.text-gray-400')).toHaveText(`(${course.year})`);
  }
});
