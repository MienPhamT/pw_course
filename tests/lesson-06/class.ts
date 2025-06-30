import test, { Page } from "@playwright/test";

export class Student {
    // Thuoc tinh
    className;
    subject;

    constructor(className: string, subject: string) {
        this.className = className;
        this.subject = subject;
    }
}

const mien = new Student("1103", "Playwright");
console.log(mien);

export class BasePage {
    url: string;
    page: Page;

    constructor(url: string, page: Page) {
        this.url = url;
        this.page = page;
    }

    async goToWebsite(url: string) {
        await this.page.goto(url);
    }
}
/* - Ke thua toan bo thuoc tinh, phuong thuc cua class cha
 */
export class LoginPage extends BasePage {
    xpathUserName: string;
    xpathPassword: string;

    constructor(url: string, page: Page) {
        super(url, page);
    }

    async inputUsername(username: string): Promise<void> {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async inputPassword(password: string): Promise<void> {
        await this.page.locator(this.xpathPassword).fill(password);
    }
}