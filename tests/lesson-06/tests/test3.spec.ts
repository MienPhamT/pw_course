import test, { expect } from "@playwright/test";
import { ToDoPage } from "../pages/todo-page";
import { HomePage } from "../pages/home-page";

test("To-do List", async ({ page }) => {
  const url = "https://material.playwrightvn.com/";
  let homePage = new HomePage(url, page);
  let todoPage = new ToDoPage(page);

  await test.step("Go to Website", async () => {
    await homePage.goToWebsite(url);
  });

  await test.step("Click Bai Hoc 3", async () => {
    await homePage.openLessonPage("todo-list");
  });

  await test.step("Add 100 todo items", async () => {
    for (let i = 1; i <= 100; i++) {
      await todoPage.fillTask(`Todo ${i}`);
      await todoPage.clickAddTask();
    }
  });

  await test.step("Delete todo items that has Odd number  ", async () => {
    const itemsArr = await todoPage.getListItemLocator();
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
    await expect(await todoPage.getTodoItemLocator("90")).toBeVisible();
    await expect(await todoPage.getTodoItemLocator("21")).not.toBeVisible();
  });
});
