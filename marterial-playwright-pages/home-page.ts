import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  url: string;

  constructor(url: string, page: Page) {
    super(page);
    this.url = url;
  }

  async goToTheWebsite(url: string): Promise<void> {
    await this.goToWebsite(this.url);
  }

  async openPage(xpath: string): Promise<void> {
    await this.clickAt(xpath);
  }
}
