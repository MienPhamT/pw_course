import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MediaPage extends BasePage {
    xpathAddMediaBtn = "//a[@role = 'button' and text() = 'Add Media File']";
    xpathFileInput = 'input[type="file"]';
    xpathDeleteButton = "//button[@class = 'button-link delete-attachment']";
    filePath = "tests/lesson-05/playwright-exercises/mia.txt";

    constructor(page: Page) {
        super(page);
    };

    async clickAddMediaFileBtn(): Promise<void> {
        await this.page.locator(this.xpathAddMediaBtn).click();
    };

    async setFileInput(): Promise<void> {
        await this.page.locator(this.xpathFileInput).setInputFiles(this.filePath);
    };

    async clickToNewUploadFile(xpath: string): Promise<void> {
        await this.page.locator(xpath).click();
    };

    async deleteFile(): Promise<void> {
        await this.page.locator(this.xpathDeleteButton).click();
    };
}