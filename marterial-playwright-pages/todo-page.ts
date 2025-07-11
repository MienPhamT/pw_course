import { Locator, Page } from "@playwright/test";
export class ToDoPage {
  page: Page;
  xpathNewTask = '//input[@id = "new-task"]';
  xpathAddTaskBtn = '//button[@id = "add-task"]';
  xpathListItem = '//ul[@id = "task-list"]/li/span';
  xpathTodoItem = (itemIndex: string) => {
    return `//span[text() = 'Todo ${itemIndex}']`;
  }

  xpathTaskItem = (item: string) => {
    return `//button[@id = "${item}"]`;
  }

  constructor(page: Page) {
    this.page = page;
  }

  async fillTask(task: string): Promise<void> {
    await this.page.locator(this.xpathNewTask).fill(task);
  }

  async clickAddTask(): Promise<void> {
    await this.page.locator(this.xpathAddTaskBtn).click();
  }

  async deleteItem(item: string): Promise<void> {
    await this.page.locator(this.xpathTaskItem(item)).click();
  }

  async getListItemLocator(): Promise<Locator> {
    return await this.page.locator(this.xpathListItem);
  }

  async getTodoItemLocator(itemIndex: string): Promise<Locator> {
    return await this.page.locator(this.xpathTodoItem(itemIndex));
  }
}
