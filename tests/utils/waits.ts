import { Locator, Page } from 'tests/fixtures';

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForNewPageEvent(
  page: Page,
  link: Locator,
  timeout: number
): Promise<[Page, void]> {
  return await Promise.all([
    page.context().waitForEvent('page', { timeout: timeout }),
    link.click(),
  ]);
}
