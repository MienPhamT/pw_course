import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {

    xpathUsernameInput = "//input[@id = 'user_login']";
    xpathPasswordInput = "//input[@id = 'user_pass']";
    xpathLoginButton = "//input[@id = 'wp-submit']";
    xpathHeadingDashboard = "//div[@class = 'wrap']/h1";
    xpathHeadingAtaGlance = "//h2[normalize-space() = 'At a Glance']";
    xpathHeadingActivity = "//h2[normalize-space() = 'Activity']";
    xpathLoginErrorMsg = "//div[@id = 'login_error']/p";

    constructor(page: Page) {
        super(page, 'https://pw-practice-dev.playwrightvn.com/login');
    }

    async goToWebsite(): Promise<void> {
        await this.page.goto(this.url);
    }

    async fillUserName(username: string): Promise<void> {
        await this.page.locator(this.xpathUsernameInput).fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.page.locator(this.xpathPasswordInput).fill(password);
    }

    async clickBtnLogin(): Promise<void> {
        await this.page.locator(this.xpathLoginButton).click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickBtnLogin();
    }

    async getLoginErrorMsg(): Promise<string | null> {
        return await this.page.locator(this.xpathLoginErrorMsg).textContent();
    }

    async getCurrentUsername(): Promise<string> {
        return await this.page.locator(this.xpathUsernameInput).inputValue();
    }

    async getCurrentPassword(): Promise<string> {
        return await this.page.locator(this.xpathPasswordInput).inputValue();
    }

    getDashboardHeadingLocator(): Locator {
        return this.page.locator(this.xpathHeadingDashboard);
    }

    getAtAGlanceLocator(): Locator {
        return this.page.locator(this.xpathHeadingAtaGlance);
    }

    getActivityLocator(): Locator {
        return this.page.locator(this.xpathHeadingActivity);
    }
}