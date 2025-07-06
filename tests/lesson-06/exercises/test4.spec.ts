import { test, expect } from "@playwright/test";
import { HomePage } from "../../../marterial-playwright-pages/home-page";
import { PersonalNotePage } from "../../../marterial-playwright-pages/personal-note-page";

test("Bài học 4 - Personal notes", async ({ page }) => {
  const url = "https://material.playwrightvn.com/";
  const vnexpressUrl = "https://vnexpress.net/khoa-hoc";

  const titles: string[] = [];
  const descriptions: string[] = [];

  let homePage = new HomePage(url, page);
  let personalPage = new PersonalNotePage(page);

  await test.step("Get articles from VNExpress", async () => {
    await page.goto(vnexpressUrl);

    const titleElements = await personalPage.getTitleNewsLocator();
    const descriptionElements = await personalPage.getDescriptionLocator();

    for (let i = 0; i < 10; i++) {
      const title = await titleElements.nth(i).getAttribute("title");
      const description = await descriptionElements.nth(i).textContent();

      if (title && description) {
        titles.push(title.trim());
        descriptions.push(description.trim());
      }
    }
    console.log(titles);
  });

  await test.step("Go to Playwright Website", async () => {
    await homePage.goToWebsite(url);
  });

  await test.step("Click Bai Hoc 4", async () => {
    await homePage.openLessonPage("personal-notes");
  });

  await test.step("Add 10 notes ", async () => {
    for (let i = 0; i < 10; i++) {
      const title = titles[i];
      const des = descriptions[i];
      await personalPage.fillTitle(title);
      await personalPage.fillContent(des);
      await personalPage.clickBtnAddNote();
    }
  });
  // Search random title
  await test.step("Search random title", async () => {
    const rd = Math.floor(Math.random() * 10);
    await personalPage.fillSearchkey(titles[rd]);

    const noteTitles = await personalPage.getTitleNoteLocator();
    const noteContents = await personalPage.getContentNoteLocator();

    let found = false;
    for (let i = 0; i < await noteTitles.count(); i++) {
      const title = await noteTitles.nth(i).textContent();
      const content = await noteContents.nth(i).textContent();

      if (title && title.toLowerCase().indexOf(titles[rd].toLowerCase()) !== -1) {
        found = true;
        break;
      }
      if (content && content.toLowerCase().indexOf(titles[rd].toLowerCase()) !== -1) {
        found = true;
        break;
      }
    }
    expect(found).toBeTruthy();
  })
});
