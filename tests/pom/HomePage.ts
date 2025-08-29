import { expect, Locator, Page } from '@playwright/test';

type Section = 'experience' | 'about-me' | 'projects' | 'education';

export class HomePage {
  readonly page: Page;
  readonly menuToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuToggle = page.locator('button[aria-label="Toggle menu"]');
  }

  async openMenuIfMobile(isMobile: boolean): Promise<void> {
    if (isMobile) await this.menuToggle.click();
  }

  async goToSection(section: Section): Promise<void> {
    await this.page.locator(`a[href="#${section}"]`).click();
    await expect(this.page).toHaveURL(new RegExp(`#${section}`));
    await expect(this.page.locator(`section[id="${section}"]`)).toBeInViewport();
  }

  async getExperienceGroups(): Promise<Locator> {
    return this.page.locator('section#experience > div > div > div');
  }
}
