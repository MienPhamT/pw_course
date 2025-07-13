import { Locator, Page } from "@playwright/test";
export class PersonalNotePage {
    page: Page;
    // Personal Note Page
    xpathTitleInput = '//input[@id = "note-title"]';
    xpathContentinput = '//textarea[@id = "note-content"]';
    xpathBtnAddNote = '//button[@id = "add-note"]';
    xpathSearchBox = '//input[@id = "search"]';

    //VNExpress
    xpathTitleNews = '//h4[@class="title-news"]/child::a';
    xpathDescription = '//p[@class="description"]/child::a';
    xpathTitleNote = '//ul[@id = "notes-list"]//strong';
    xpathContentNote = '//ul[@id = "notes-list"]//p';

    constructor(page: Page) {
        this.page = page;
    }

    async fillTitle(title: string): Promise<void> {
        await this.page.locator(this.xpathTitleInput).fill(title);
    }

    async fillContent(content: string): Promise<void> {
        await this.page.locator(this.xpathContentinput).fill(content);
    }

    async clickBtnAddNote(): Promise<void> {
        await this.page.locator(this.xpathBtnAddNote).click();
    }

    async fillSearchkey(key: string): Promise<void> {
        await this.page.locator(this.xpathSearchBox).fill(key);
    }

    async getTitleNoteLocator(): Promise<Locator> {
        return await this.page.locator(this.xpathTitleNote);
    }

    async getContentNoteLocator(): Promise<Locator> {
        return await this.page.locator(this.xpathContentNote);
    }

    async getTitleNewsLocator(): Promise<Locator> {
        return await this.page.locator(this.xpathTitleNews);
    }
    async getDescriptionLocator(): Promise<Locator> {
        return await this.page.locator(this.xpathDescription);
    }
}