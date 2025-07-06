import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MediaPage extends BasePage {
    xpathAddMediaBtn = "//a[@role = 'button' and text() = 'Add Media File']";
    xpathFileInput = 'input[type="file"]';
    xpathDeleteButton = "//button[@class = 'button-link delete-attachment']";
    filePath = "tests/lesson-05/playwright-exercises/mia.txt";
    xpathMediaMenuItem = "//a/div[text() = 'Media']";
    xpathUploadedFile = "//div[@class='filename']/div[text()='mia.txt']//ancestor::li";

    constructor(page: Page) {
        super(page, 'https://pw-practice-dev.playwrightvn.com/login');
    }

    async clickAddMediaFileBtn(): Promise<void> {
        await this.page.locator(this.xpathAddMediaBtn).click();
    };

    async uploadFile(): Promise<void> {
        await this.page.locator(this.xpathFileInput).setInputFiles(this.filePath);
    };

    async clickToNewUploadFile(): Promise<void> {
        await this.page.locator(this.xpathUploadedFile).click();
    };

    async deleteFile(): Promise<void> {
        await this.page.locator(this.xpathDeleteButton).click();
    };

    async getUploadFileLocator(): Promise<Locator> {
        return await this.page.locator(this.xpathUploadedFile);
    }
}