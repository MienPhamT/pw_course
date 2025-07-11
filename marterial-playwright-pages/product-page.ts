import { Locator, Page } from "@playwright/test";
export class ProductPage {
  page: Page;
  xpathTotalPrice = '//td[@class="total-price"]';

  xpathProductName = (productName: string) => {
    return `//td[text() = '${productName}']`
  }

  xpathItem = (item: number) => {
    return `//button[@data-product-id= '${item}']`;
  }

  constructor(page: Page) {
    this.page = page;
  }

  async getProductLocator(productName: string): Promise<Locator> {
    return await this.page.locator(this.xpathProductName(productName));
  }

  async getTotalPrice(): Promise<string | null> {
    return await this.page.locator(this.xpathTotalPrice).textContent();
  }

  async addItemToCart(item: number, amount: number): Promise<void> {
    await this.page.locator(this.xpathItem(item)).click({ clickCount: amount });
  }
}