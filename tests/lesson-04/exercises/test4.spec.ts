import { test, expect } from "@playwright/test";

test("Bài học 4 - Personal notes", async ({ page }) => {
  await page.goto("https://vnexpress.net/khoa-hoc/");

  const titleElements = page.locator('//h4[@class="title-news"]/child::a');
  const descriptionElements = page.locator(
    '//p[@class="description"]/child::a'
  );

  const titles: string[] = [];
  const descriptions: string[] = [];

  for (let i = 0; i < 10; i++) {
    const title = await titleElements.nth(i).getAttribute("title");
    const description = await descriptionElements.nth(i).textContent();

    if (title && description) {
      titles.push(title.trim());
      descriptions.push(description.trim());
    }
  }

  await test.step("Go to Playwright Website", async () => {
    await page.goto("https://material.playwrightvn.com/");
  });

  await test.step("Click Bai Hoc 4", async () => {
    await page.locator('//a[contains(@href,  "personal-notes")]').click();
  });

  await test.step("Add 10 notes ", async () => {
    for (let i = 0; i < 10; i++) {
      const title = titles[i];
      const des = descriptions[i];
      await page.locator('//input[@id = "note-title"]').fill(title);
      await page.locator('//textarea[@id = "note-content"]').fill(des);
      await page.locator('//button[@id = "add-note"]').click();
    }
  });
});
