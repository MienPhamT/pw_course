import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PersonalNotePage extends BasePage {
    xpathTitleInput = '//input[@id = "note-title"]';
    xpathContentinput = '//textarea[@id = "note-content"]';
    xpathBtnAddNote = '//button[@id = "add-note"]';
    xpathSearchBox = '//input[@id = "search"]';

    constructor(page: Page) {
        super(page);
    }

    async fillTitle(title: string): Promise<void> {
        await this.fillValue(this.xpathTitleInput, title);
    }

    async fillContent(content: string): Promise<void> {
        await this.fillValue(this.xpathContentinput, content);
    }

    async clickBtnAddNote(): Promise<void> {
        await this.clickAt(this.xpathBtnAddNote);
    }

    async fillSearchkey(key: string): Promise<void> {
        await this.fillValue(this.xpathSearchBox, key);
    }
}