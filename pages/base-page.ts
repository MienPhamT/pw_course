import { Locator, Page } from "@playwright/test";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToWebsite(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickAt(xpath: string): Promise<void> {
    await this.page.locator(xpath).click();
  }

  async fillValue(xpath: string, value: string): Promise<void> {
    await this.page.locator(xpath).fill(value);
  }

  async checkValue(xpath): Promise<void> {
    await this.page.locator(xpath).check();
  }

  async selectOption(xpath: string, interest: string): Promise<void> {
    await this.page.selectOption(xpath, interest);
  }

  async setFileInput(xpath: string, filePath: string): Promise<void> {
    await this.page.locator(xpath).setInputFiles(filePath);
  }

  async hoverElement(xpath: string): Promise<void> {
    await this.page.locator(xpath).hover();
  }

  async removeAttributeInDom(xpath: string, atrribute: string): Promise<void> {
    await this.page
      .locator(xpath)
      .evaluate((el) => el.removeAttribute(atrribute));
  }

  async getLocator(xpath: string): Promise<Locator> {
    return await this.page.locator(xpath);
  }

  async getInputValue(xpath: string): Promise<string> {
    return await this.page.locator(xpath).inputValue();
  }

  //   async getBoundingBox(
  //     xpath: string
  //   ): Promise<ReturnType<Locator["boundingBox"]>> {
  //     return this.page.locator(xpath).boundingBox();
  //   }

  async getTextContent(xpath: string): Promise<string | null> {
    return await this.page.locator(xpath).textContent();
  }

  async dbClick(xpath: string): Promise<void> {
    await this.page.locator(xpath).dblclick();
  }

  async clickCount(xpath: string, count): Promise<void> {
    await this.page.locator(xpath).click({clickCount: count});
  }
}
