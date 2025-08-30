import { beforeEach, expect, test } from 'tests/fixtures';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Franco Mariño | Portfolio/);
});

test('downloading CV shows thank-you alert and hides it after timeout', async ({
  page,
  homePage,
}) => {
  test.setTimeout(10 * 1000);
  const [download] = await Promise.all([page.waitForEvent('download'), homePage.downloadCv()]);
  const alert = page.locator('div.bg-green-500');
  await expect(alert).toHaveText('¡Gracias por descargar mi CV!');

  expect(download.suggestedFilename()).toBe('CV-FRANCO EDSON MARIÑO AQUISE.pdf');

  await expect(alert).toBeHidden({ timeout: 4000 });
});
