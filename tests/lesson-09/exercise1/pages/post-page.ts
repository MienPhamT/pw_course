import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PostPage extends BasePage {
    xpathPostMenu = "//div[text() = 'Posts']";
    xpathTagsSubItem = "//ul[@class = 'wp-submenu wp-submenu-wrap']/li/a[text() = 'Tags']";
    xpathResultMsg = "//div[contains(@class, 'notice') and not(contains(@class, 'hidden'))]/p";
    xpathAddTagButton = "//input[@id = 'submit']";
    xpathTagNameInput = "//input[@id = 'tag-name']";

    xpathRowTagName = (tagname: string) => `//a[@class='row-title' and contains(text(), '${tagname}')]`;
    xpathDeleteTagName = (tagName: string) => `//a[text() = '${tagName}' or text() = '— ${tagName}']/ancestor::td//span[@class = 'delete']`;

    constructor(page: Page) {
        super(page, 'https://pw-practice-dev.playwrightvn.com/login');
    }

    async gotoTagPage(): Promise<void> {
        await this.page.locator(this.xpathPostMenu).click();
        await this.page.locator(this.xpathTagsSubItem).click();
    }

    async addTag(tagName: string): Promise<void> {
        await this.page.locator(this.xpathTagNameInput).fill(tagName);
        await this.page.locator(this.xpathAddTagButton).click();
    }

    async deleteTag(tagName: string): Promise<void> {
        const row = this.page.locator(this.xpathRowTagName(tagName));
        if (await row.count()) {
            await row.hover();
            await this.page.locator(this.xpathDeleteTagName(tagName)).click();
            await this.page.waitForTimeout(500);
        }
    }

    getXpath(tagName?: string): Locator {
        if (tagName) {
            return this.page.locator(this.xpathRowTagName(tagName));
        }
        return this.page.locator(this.xpathResultMsg);
    }
}