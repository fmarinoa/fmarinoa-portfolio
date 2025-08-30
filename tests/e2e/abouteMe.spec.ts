import { beforeEach, expect, test } from 'tests/fixtures';

import { Constants } from '@/data/constants';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('about me section contains correct text', async ({ page }) => {
  const locator = page.locator('#about-me p');
  await expect(locator).toHaveText(Constants.aboutMeParagraph);
});

test('navigates to about me section', async ({ homePage, isMobile }) => {
  await homePage.openMenuIfMobile(isMobile);
  await homePage.goToSection('about-me');
});

test('interacts with icons in carousel', async ({ page }) => {
  const card = page.locator('div[role="listitem"]:visible').first();

  await card.hover({ force: true });

  await expect(card).toHaveCSS('border-color', 'rgb(60, 131, 246)');

  const boxShadow = await card.evaluate((el) => getComputedStyle(el).boxShadow);
  expect(boxShadow).not.toBe('none');

  const transform = await card.evaluate((el) => getComputedStyle(el).transform);
  expect(transform).toContain('matrix');
});
