import { expect, test } from '@playwright/test';

import { Constants } from '@/data/constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Franco Mariño | Portfolio/);
});

test('downloads CV', async ({ page }) => {
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30_000 }),
    page.locator('a[title="Download CV"]').click(),
  ]);

  await download.saveAs('test-results/downloads/cv.pdf');
  expect(download.url()).toBe(Constants.CV_URL);
});

test('about me section contains correct text', async ({ page }) => {
  const locator = page.locator('#about-me p');
  await expect(locator).toHaveText(Constants.aboutMeParagraph);
});

test('navigates to about me section', async ({ page, isMobile }) => {
  if (isMobile) {
    await page.locator('button[aria-label="Toggle menu"]').click();
  }

  await page.click('a[href="#about-me"]');
  await expect(page).toHaveURL(/#about-me/);
  await expect(page.locator('section[id="about-me"]')).toBeVisible();
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
