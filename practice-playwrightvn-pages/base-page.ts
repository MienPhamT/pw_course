import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    async getInputValue(xpath: string): Promise<string> {
        const inputValue = await this.page.locator(xpath).inputValue();
        return inputValue;
    };

    async getUrl(): Promise<string> {
        return this.page.url();
    };

    async getLocator(xpath: string): Promise<Locator> {
        return this.page.locator(xpath);
    };

    async goToPage(xpath: string): Promise<void> {
        this.page.locator(xpath).click();
    };

    async refreshPage(): Promise<void> {
        this.page.reload();
    };

}