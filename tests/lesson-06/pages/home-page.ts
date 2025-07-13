import { Page } from "@playwright/test";

export class HomePage {
  url: string;
  page: Page;

  xpathLessonPage = (lessonName: string) => {
    return `//a[contains(@href, '${lessonName}')]`;
  }

  constructor(url: string, page: Page) {
    this.url = url;
    this.page = page;
  }

  async goToWebsite(url: string): Promise<void> {
    await this.page.goto(url);
  }
 
  async openLessonPage(pageName: string): Promise<void> {
    await this.page.locator(this.xpathLessonPage(pageName)).click();
  }
}
