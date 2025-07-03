import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ToDoPage extends BasePage {
  xpathNewTask = '//input[@id = "new-task"]';
  xpathAddTaskBtn = '//button[@id = "add-task"]';

  constructor(page: Page) {
    super(page);
  }

  async fillTask(task: string): Promise<void> {
    await this.page.locator(this.xpathNewTask).fill(task);
  }

  async clickAddTag(): Promise<void> {
    await this.page.locator(this.xpathAddTaskBtn).click();
  }

  xpathDeleteTag(item: string): string {
    let xpath = `//button[@id = "${item}"]`;
    return xpath;
  }

  async deleteItem(item: string): Promise<void> {
    await this.page.locator(this.xpathDeleteTag(item)).click();
  }
}
