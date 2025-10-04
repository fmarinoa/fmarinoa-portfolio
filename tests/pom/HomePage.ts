import { expect } from '@tests/fixtures'
import type { Locator, Page } from '@tests/fixtures'

type Section = 'experience' | 'about-me' | 'projects' | 'education'

export class HomePage {
  readonly page: Page
  readonly menuToggle: Locator

  constructor(page: Page) {
    this.page = page
    this.menuToggle = page.locator('button[aria-label="Toggle menu"]')
  }

  async openMenuIfMobile(isMobile: boolean): Promise<void> {
    if (isMobile) await this.menuToggle.click()
  }

  async goToSection(section: Section): Promise<void> {
    await this.page.locator(`a[href="#${section}"]`).click()
    await expect(this.page).toHaveURL(new RegExp(`#${section}`))
    await expect(this.page.locator(`section[id="${section}"]`)).toBeInViewport()
    await this.page.mouse.click(0, 0)
  }

  async getExperienceGroups(): Promise<Locator> {
    return this.page.locator('section#experience > div > div > div')
  }

  async getProjectsCards(): Promise<Locator> {
    return this.page.locator(
      'section#projects div#projects-carousel article.project-card'
    )
  }

  async getEducationCards(): Promise<Locator> {
    return this.page.locator('section#education > div > article')
  }

  async openCv(): Promise<void> {
    this.page.locator('#cv-btn').click()
    this.page.locator('button:has-text("De Acuerdo")').click()
  }

  async getSectionTitle(section: Section): Promise<string> {
    return (
      (await this.page
        .locator(`section[id="${section}"] > h2`)
        .textContent()) || ''
    )
  }
}
