import { test as base } from '@playwright/test'
import { HomePage } from '@tests/pom/HomePage'

type MyFixtures = {
  homePage: HomePage
}

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
})

export type { Locator, Page } from '@playwright/test'
export { expect } from '@playwright/test'
export const beforeEach = test.beforeEach
