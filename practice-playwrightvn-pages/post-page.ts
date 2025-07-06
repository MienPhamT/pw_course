import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PostPage extends BasePage {
    xpathPostMenu = "//div[text() = 'Posts']";
    xpathTagsSubItem = "//ul[@class = 'wp-submenu wp-submenu-wrap']/li/a[text() = 'Tags']";
    xpathCategoriesSubItem = '//a[text() = "Categories"]';
    xpathResultMsg = "//div[contains(@class, 'notice') and not(contains(@class, 'hidden'))]/p";
    xpathAddTagButton = "//input[@id = 'submit']";
    xpathTagNameInput = "//input[@id = 'tag-name']";
    xpathTagSlugInput = "//input[@id = 'tag-slug']";
    xpathCategoryNameInput = "//input[@id = 'tag-name']";
    xpathCategorySlugInput = "//input[@id = 'tag-slug']";
    xpathAddCategoryButton = "//input[@id = 'submit']";
    xpathParentDropdown = '//select[@id = "parent"]';

    xpathRowTagName = (tagname: string) => {
        return `//a[@class='row-title' and contains(text(), '${tagname}')]`;
    };

    xpathRowSlugName = (tagName: string, slugname: string) => {
        return `//td[contains(., '${tagName}')]/following-sibling::td[text() = '${slugname}']`;
    };

    xpathDeleteTagName = (tagName: string) => {
        return `//a[text() = '${tagName}' or text() = '— ${tagName}']/ancestor::td//span[@class = 'delete']`;
    };

    xpathRowCategoryName = (catName: string) => {
        return `//a[@class='row-title' and contains(text(), '${catName}')]`;
    };

    xpathRowCategorySlugName = (catName: string, slugname: string) => {
        return `//a[@class='row-title' and contains(text(), '${catName}')]/ancestor::tr/td[text() = '${slugname}']`;
    };

    constructor(page: Page) {
        super(page, 'https://pw-practice-dev.playwrightvn.com/login');
    }

    // Post-Tags SubItem

    async clickPostMenu(): Promise<void> {
        await this.page.locator(this.xpathPostMenu).click();
    };

    async clickCategorySubItem(): Promise<void> {
        await this.page.locator(this.xpathCategoriesSubItem).click();
    };

    async clickTagSubItem(): Promise<void> {
        await this.page.locator(this.xpathTagsSubItem).click();
    };

    async clickAddTagBtn(): Promise<void> {
        await this.page.locator(this.xpathAddTagButton).click();
    };

    async getResultMsg(): Promise<string | null> {
        const msg = await this.page.locator(this.xpathResultMsg).textContent();
        return msg;
    };

    async fillTagName(tagName: string): Promise<void> {
        await this.page.locator(this.xpathTagNameInput).fill(tagName);
    };

    async fillSlugName(slugName: string): Promise<void> {
        await this.page.locator(this.xpathTagSlugInput).fill(slugName);
    };

    async hoverElement(xpath: string): Promise<void> {
        await this.page.locator(xpath).hover();
    };

    async deleteTag(xpath: string): Promise<void> {
        await this.page.locator(xpath).click();
    };

    // Post-Category SubItem

    async fillCategoryName(catName: string): Promise<void> {
        await this.page.locator(this.xpathCategoryNameInput).fill(catName);
    };

    async fillCategorySlugName(slugName: string): Promise<void> {
        await this.page.locator(this.xpathCategorySlugInput).fill(slugName);
    };

    async clickAddCategoryBtn(): Promise<void> {
        await this.page.locator(this.xpathAddCategoryButton).click();
    };

    async selectCategoryParent(parent: string): Promise<void> {
        await this.page.selectOption(this.xpathParentDropdown, parent);
    };

    getXpath(tagName?: string, slugName?: string, catName?: string, catSlug?: string): Locator {
        if (tagName && slugName) {
            return this.page.locator(this.xpathRowSlugName(tagName, slugName));
        }
        if (tagName) {
            return this.page.locator(this.xpathRowTagName(tagName));
        }
        if (catName && catSlug) {
            return this.page.locator(this.xpathRowCategoryName(catName));
        }
        if (catName) {
            return this.page.locator(this.xpathRowCategoryName(catName));
        }

        return this.page.locator(this.xpathResultMsg);
    };

    slugify(input: string) {
        return input
            .normalize("NFD") // Tách dấu khỏi ký tự (ex: "đ" => "d", "é" => "e")
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu (accent)
            .replace(/đ/g, "d") // Chuyển "đ" thành "d"
            .replace(/Đ/g, "D") // Chuyển "Đ" thành "D"
            .toLowerCase() // Chuyển về lowercase
            .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt (trừ dấu cách và dấu gạch ngang)
            .trim() // Xóa khoảng trắng đầu/cuối
            .replace(/\s+/g, "-"); // Thay khoảng trắng thành dấu gạch ngang
    }
}