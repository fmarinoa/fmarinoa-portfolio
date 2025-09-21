import { Locator, Page } from 'tests/fixtures'

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Waits for a new page event to be triggered in the given browser context after clicking a specified link.
 *
 * This function concurrently waits for a new page to be opened (e.g., as a result of a link opening in a new tab)
 * and performs a click action on the provided link locator. It returns a promise that resolves when both the
 * new page event is fired and the click action is completed.
 *
 * @param currentPage - The current Playwright Page instance from which the context is derived.
 * @param link - The Playwright Locator representing the link to be clicked.
 * @param timeoutMs - (Optional) The maximum time to wait for the new page event, in milliseconds.
 * @returns A promise that resolves to a tuple containing the new Page instance and the result of the click action.
 * @throws If the new page event does not occur within the specified timeout.
 */
export async function waitForNewPageEvent(
  currentPage: Page,
  link: Locator,
  timeoutMs?: number
): Promise<[Page, void]> {
  const options = { ...(timeoutMs && { timeout: timeoutMs }) }
  return await Promise.all([
    currentPage.context().waitForEvent('page', options),
    link.click(),
  ])
}
