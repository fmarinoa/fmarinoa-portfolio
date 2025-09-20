import { beforeEach, expect, test } from 'tests/fixtures';
import { waitForNewPageEvent } from 'tests/utils/waits';

import { Constants } from '@/data/constants';

beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has footer', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
});

test('has footer icons links', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();

  const links = footer.locator('div.gap-4 > a');

  await expect(links).toHaveCount(2);

  await expect(links.nth(0)).toHaveAttribute('href', 'https://github.com/fmarinoa');
  await expect(links.nth(1)).toHaveAttribute('href', 'https://www.linkedin.com/in/fmarinoa/');
});

test('has copyright notice', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();

  const copyright = footer.locator('span');

  await expect(copyright).toHaveText(
    new RegExp(`© ${new Date().getFullYear()} Franco Mariño\\s*Todos los derechos reservados`)
  );
});

test('has footer tests link', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();

  const link = footer.locator('div.flex-wrap > a:has-text("Reportes de pruebas")');

  await expect(link).toHaveAttribute('href', Constants.TEST_RESULTS_URL);

  const [newPage] = await waitForNewPageEvent(page, link, 3000);
  await expect(newPage).toHaveURL(Constants.TEST_RESULTS_URL);
});

test('has footer doc link', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();

  const link = footer.locator('div.flex-wrap > a:has-text("Documentación del proyecto")');

  await expect(link).toHaveAttribute('href', Constants.DEEP_WIKI_URL);

  const [newPage] = await waitForNewPageEvent(page, link, 3000);
  await expect(newPage).toHaveURL(Constants.DEEP_WIKI_URL);
});
