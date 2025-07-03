import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    url: string;

    xpathUsernameInput = "//input[@id = 'user_login']";
    xpathPasswordInput = "//input[@id = 'user_pass']";
    xpathLoginButton = "//input[@id = 'wp-submit']";


    constructor(url: string, page: Page) {
        super(page);
        this.url = url;
    }

    async fillUserName(username: string): Promise<void> {
        await this.page.locator(this.xpathUsernameInput).fill(username);
    };

    async fillPassword(password: string): Promise<void> {
        await this.page.locator(this.xpathPasswordInput).fill(password);
    };

    async clickBtnLogin(): Promise<void> {
        await this.page.locator(this.xpathLoginButton).click();
    };

    async goToWebsite(): Promise<void> {
        ; await this.page.goto(this.url);
    }

    async getTextContent(xpath: string): Promise<string | null> {
        const msg = await this.page.locator(xpath).textContent();
        return msg;
    };

    async loginToSite(username: string, password: string) {
        await this.goToWebsite();
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickBtnLogin();
    }
}