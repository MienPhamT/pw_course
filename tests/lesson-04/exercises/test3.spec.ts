import test from "@playwright/test";

test("To-do List", async ({ page }) => {
  await test.step("Go to Website", async () => {
    await page.goto("https://material.playwrightvn.com/");
  });

  await test.step("Click Bai Hoc 3", async () => {
    await page.locator('//a[contains(@href,  "todo-list")]').click();
  });

  await test.step("Add 100 todo items", async () => {
    for (let i = 1; i <= 100; i++) {
      await page.locator('//input[@id = "new-task"]').fill(`Todo ${i}`);
      await page.locator('//button[@id = "add-task"]').click();
    }
  });
  await test.step("Delete todo items that has Odd number  ", async () => {
    const itemsArr = await page.locator('//ul[@id = "task-list"]/li/span');
    const count = await itemsArr.count();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    for (let i = 1; i <= count; i++) {
      if (i % 2 == 0) continue;
      const itemID = "todo-" + i + "-delete";
      console.log(itemID);
      await page.locator(`//button[@id = "${itemID}"]`).click();
    }
  });
});
