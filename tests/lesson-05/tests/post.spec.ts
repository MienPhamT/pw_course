import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

test.describe("POST - post", async () => {
  let tagNameList: string[] = [];
  let loginPage: LoginPage;
  let postPage: PostPage;

  const validUsername = "p103-mien";
  const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";
  const expectErrorBlankTagName = "A name is required for this term.";
  const expectErrorDuplicateExistTagName = "A term with the name provided already exists in this taxonomy.";
  const specialCategorySlug = "Đây là category đặc biệt @100 $200 mia";
  const specialTagSlug = "Đây là tag đặc biệt @100 $200 mia";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postPage = new PostPage(page);

    await loginPage.goToWebsite();
    await loginPage.login(validUsername, validPassword);
    await loginPage.navigateToMenuItem(postPage.xpathPostMenu, postPage.xpathTagsSubItem);

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });

  test.afterEach(async ({ page }) => {
    // Xóa list tag name vừa tạo
    for (let i = 0; i < tagNameList.length; i++) {
      await postPage.hoverElement(await postPage.xpathRowTagName(tagNameList[i]));
      await postPage.deleteTag(await postPage.xpathDeleteTagName(tagNameList[i]));
    }
  });

  test("@POST_TAG_001 - Tag - add tag failed", async ({ page }) => {
    await test.step("Click btn Add Tag without tag name", async () => {
      await postPage.clickAddTagBtn();

      const actualErrorMessage = await postPage.getResultMsg();
      expect(actualErrorMessage).toBe(expectErrorBlankTagName);
    });

    await test.step("Add tag with existed name", async () => {
      await postPage.fillTagName("lesson tag");

      await postPage.clickAddTagBtn();

      await expect(postPage.getXpath()).not.toHaveText(expectErrorBlankTagName);
      await expect(postPage.getXpath()).toHaveText(expectErrorDuplicateExistTagName);
    });
  });

  test("@POST_TAG_002 - Tag - add tag success", async ({ page }) => {
    await test.step("Add tag with valid name and no slug", async () => {
      await postPage.fillTagName(`tag ${validUsername} 01`);
      await postPage.clickAddTagBtn();

      await expect(postPage.getXpath()).not.toHaveText(expectErrorDuplicateExistTagName);
      await expect(postPage.getXpath()).toHaveText("Tag added.");

      await expect(postPage.getXpath(`tag ${validUsername} 01`)).toBeVisible({ timeout: 10000 });
    });

    await test.step("Add tag with valid name, slug", async () => {
      await postPage.fillTagName(`tag ${validUsername} 02`);
      await postPage.fillSlugName(`tag-${validUsername}-02`)
      await postPage.clickAddTagBtn();

      const msg = await postPage.getResultMsg();
      expect(msg).toBe("Tag added.");

      await expect(postPage.getXpath(`tag ${validUsername} 02`)).toBeVisible({ timeout: 10000 });
      await expect(postPage.getXpath(`tag ${validUsername} 02`, `tag-${validUsername}-02`)).toBeVisible({ timeout: 15000 });
    });

    tagNameList = [
      `tag ${validUsername} 01`,
      `tag ${validUsername} 02`,
    ]
  });

  test("@POST_TAG_003 - Tag - slug auto remove special character", async ({ page }) => {
    await test.step("Add tag with valid name, special slug", async () => {
      await postPage.fillTagName(`tag ${validUsername} 03`);
      await postPage.fillSlugName(specialTagSlug);
      await postPage.clickAddTagBtn();

      const msg = await postPage.getResultMsg();
      expect(msg).toBe("Tag added.");

      await expect(postPage.getXpath(`tag ${validUsername} 03`)).toBeVisible();

      const expectedSpecialSlug = postPage.slugify(specialTagSlug);
      await expect(postPage.getXpath(`tag ${validUsername} 03`, expectedSpecialSlug)).toBeVisible();
    });
    tagNameList = [
      `tag ${validUsername} 03`,
    ]
  });

  test("@POST_CATEGORY_001 - Category - create category success", async ({ page }) => {
    await test.step("Navigate to Post/Categories on sidebar", async () => {
      await postPage.clickCategorySubItem();
    });

    await test.step("Add Category with special slug", async () => {
      await postPage.fillCategoryName(`Category ${validUsername} 01`);
      await postPage.fillCategorySlugName(specialCategorySlug);
      await postPage.clickAddCategoryBtn();

      const msg = await postPage.getResultMsg();
      expect(msg).toBe("Category added.");

      await expect(postPage.getXpath(undefined, undefined, `Category ${validUsername} 01`)).toBeVisible();

      const expectCatSpecialSlug = postPage.slugify(specialCategorySlug);
      await expect(postPage.getXpath(undefined, undefined, `Category ${validUsername} 01`, expectCatSpecialSlug)).toBeVisible();
    });

    await test.step("Add Category with Parent", async () => {
      await postPage.fillCategoryName(`Category ${validUsername} 02`);
      await postPage.selectCategoryParent("k11 class");
      await postPage.clickAddCategoryBtn();

      const msg = await postPage.getResultMsg();
      expect(msg).toBe("Category added.");


      await expect(postPage.getXpath(`Category ${validUsername} 02`)).toBeVisible();

      const expectedSlug = postPage.slugify(`Category ${validUsername} 02`);
      await expect(postPage.getXpath(undefined, undefined, `Category ${validUsername} 02`, expectedSlug)).toBeVisible();
    });

    tagNameList = [
      `Category ${validUsername} 01`,
      `Category ${validUsername} 02`,
    ];
  });
});
