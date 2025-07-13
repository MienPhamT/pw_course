import { expect } from "@playwright/test";
import { test } from "../fixtures/my-tag";
import { PostPage } from "../pages/post-page";

test.describe("POST - post", () => {
  test("@POST_TAG_FIXTURE - Tag - add tag with fixture", async ({ page, myTag }) => {
    const postPage = new PostPage(page);
    await postPage.gotoTagPage();
    for (const tag of ["t1", "t2"]) {
      await expect(postPage.getXpath(tag)).toBeVisible();
    }
  });
});
