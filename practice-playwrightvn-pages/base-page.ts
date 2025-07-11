import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;
    url: string;

    constructor(page: Page, url?: string,) {
        this.page = page;
        this.url = url || '';
    };

    async getUrl(): Promise<string> {
        return this.page.url();
    };

    async refreshPage(): Promise<void> {
        this.page.reload();
    };

    async navigateToMenuItem(xpathMainMenu?: string, xpathSubItem?: string): Promise<void> {
        if (xpathMainMenu && xpathSubItem) {
            await this.page.locator(xpathMainMenu).click();
            await this.page.locator(xpathSubItem).click();
        }
        else if (xpathMainMenu) {
            await this.page.locator(xpathMainMenu).click();
        }
    }
}