import test, { expect } from "@playwright/test";
import { ToDoPage } from "../../../pages/todo-page";
import { HomePage } from "../../../pages/home-page";

test("To-do List", async ({ page }) => {
  const url = "https://material.playwrightvn.com/";
  const xpathTodoPage = '//a[contains(@href,  "todo-list")]';
  const xpathListItem = '//ul[@id = "task-list"]/li/span';

  let homePage = new HomePage(url, page);
  let todoPage = new ToDoPage(page);

  await test.step("Go to Website", async () => {
    await homePage.goToTheWebsite(url);
  });

  await test.step("Click Bai Hoc 3", async () => {
    await homePage.openPage(xpathTodoPage);
  });

  await test.step("Add 100 todo items", async () => {
    for (let i = 1; i <= 100; i++) {
      await todoPage.fillTask(`Todo ${i}`);
      await todoPage.clickAddTag();
    }
  });

  await test.step("Delete todo items that has Odd number  ", async () => {
    const itemsArr = await todoPage.getLocator(xpathListItem);
    const count = await itemsArr.count();

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    for (let i = 1; i <= count; i++) {
      if (i % 2 == 0) continue;
      const itemID = "todo-" + i + "-delete";
      await todoPage.deleteItem(itemID);
    }

    // Verify Todo 90 is visible in list, Todo 21 is not visible in list
    await expect(
      await todoPage.getLocator("//span[text() = 'Todo 90']")
    ).toBeVisible();
    await expect(
      await todoPage.getLocator("//span[text() = 'Todo 21']")
    ).not.toBeVisible();
  });
});
