import { beforeEach, expect, test } from 'tests/fixtures';

import { Constants } from '@/data/constants';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Franco Mariño | Portfolio/);
});

test('CV link points to correct URL', async ({ page }) => {
  const cvLink = page.locator('a[title="Download CV"]');
  await expect(cvLink).toHaveAttribute('href', Constants.CV_URL);
});
