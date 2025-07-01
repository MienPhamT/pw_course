import test, { expect } from "@playwright/test";

test.describe("POST - post", async () => {
  const loginUrl = "https://pw-practice-dev.playwrightvn.com/login";
  const validUsername = "p103-mien";
  const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";
  const expectErrorBlankTagName = "A name is required for this term.";
  const expectErrorDuplicateExistTagName =
    "A term with the name provided already exists in this taxonomy.";
  const existedTagName = "lesson tag";
  const validTagName1 = "tag Mia02";
  const validTagName2 = "tag Mia03";
  const validSlug = "slug Mia03";
  const expectMsgAddTagSuccess = "Tag added.";
  const specialTagName = "tag Mia 04";
  const specialSlug = "Đây là tag đặc biệt @100 $200 mia";
  const categoryName = "Category Mia 01";
  const categoryName2 = "Category Mia 02";
  const specialCategorySlug = "Đây là category đặc biệt @100 $200 mia";
  const expectMsgAddCategorySuccess = "Category added.";
  const parentCategory = "k11 class";

  const $usernameInput = "//input[@id = 'user_login']";
  const $passwordInput = "//input[@id = 'user_pass']";
  const $loginButton = "//input[@id = 'wp-submit']";
  const $postMenu = "//div[text() = 'Posts']";
  const $tagsSubItem =
    "//ul[@class = 'wp-submenu wp-submenu-wrap']/li/a[text() = 'Tags']";
  const $resultMsg =
    "//div[contains(@class, 'notice') and not(contains(@class, 'hidden'))]/p";
  const $headingDashboard = "//div[@class = 'wrap']/h1";
  const $addTagButton = "//input[@id = 'submit']";
  const $tagNameInput = "//input[@id = 'tag-name']";
  const $tagSlugInput = "//input[@id = 'tag-slug']";
  const $tagName1Td = `//a[@class='row-title' and text() = '${validTagName1}']`;
  const $tagName2Td = `//a[@class='row-title' and text() = '${validTagName2}']`;
  const $tagName3Td = `//a[@class='row-title' and text() = '${specialTagName}']`;
  const $tagSlugTd = `//a[@class='row-title' and text() = '${validTagName2}']/ancestor::tr/td[@class="slug column-slug"]`;
  const $tagSpecialSlugTd = `//a[@class='row-title' and text() = '${specialTagName}']/ancestor::tr/td[@class="slug column-slug"]`;
  const $categoriesSubItem = '//a[text() = "Categories"]';
  const $categoryNameInput = "//input[@id = 'tag-name']";
  const $categorySlugInput = "//input[@id = 'tag-slug']";
  const $addCategoryButton = "//input[@id = 'submit']";
  const $categoryNameTd = `//a[@class='row-title' and contains(text(), '${categoryName}')]`;
  const $categorySpecialSlugTd = `//a[@class='row-title' and contains(text(), '${categoryName}')]/ancestor::tr/td[@class="slug column-slug"]`;
  const $parentDropdown = '//select[@id = "parent"]';
  const $categoryName2Td = `//a[@class='row-title' and contains(text(), '${categoryName2}')]`;
  const $categorySlug2Td = `//a[@class='row-title' and contains(text(), '${categoryName2}')]/ancestor::tr/td[@class="slug column-slug"]`;

  function slugify(input: string) {
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

  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await page.locator($usernameInput).fill(validUsername);
    await page.locator($passwordInput).fill(validPassword);
    await page.locator($loginButton).click();

    const dashboardLabel = await page.locator($headingDashboard);
    await expect(dashboardLabel).toBeVisible();

    await page.locator($postMenu).click();
    await page.locator($tagsSubItem).click();
  });

  test("@POST_TAG_001 - Tag - add tag failed", async ({ page }) => {
    await test.step("Click btn Add Tag without tag name", async () => {
      await page.locator($addTagButton).click();

      const actualErrorMessage = await page.locator($resultMsg).textContent();
      expect(actualErrorMessage).toBe(expectErrorBlankTagName);
    });

    await test.step("Add tag with existed name", async () => {
      const tagNameInput = await page.locator($tagNameInput);
      await tagNameInput.fill(existedTagName);

      await page.locator($addTagButton).click();

      await expect(page.locator($resultMsg)).not.toHaveText(
        expectErrorBlankTagName
      );
      await expect(page.locator($resultMsg)).toHaveText(
        expectErrorDuplicateExistTagName
      );

      const actualErr = await page.locator($resultMsg).textContent();
      expect(actualErr).toBe(expectErrorDuplicateExistTagName);
    });
  });

  test("@POST_TAG_002 - Tag - add tag success", async ({ page }) => {
    await test.step("Add tag with valid name and no slug", async () => {
      await page.locator($tagNameInput).fill(validTagName1);
      await page.locator($addTagButton).click();

      const msg = await page.locator($resultMsg).textContent();
      expect(msg).toBe(expectMsgAddTagSuccess);

      await expect(page.locator($tagName1Td)).toBeVisible({ timeout: 10000 });
    });

    await test.step("Add tag with valid name, slug", async () => {
      await page.locator($tagNameInput).fill(validTagName2);
      await page.locator($tagSlugInput).fill(validSlug);
      await page.locator($addTagButton).click();

      const msg = await page.locator($resultMsg).textContent();
      expect(msg).toBe(expectMsgAddTagSuccess);

      await expect(page.locator($tagName2Td)).toBeVisible({ timeout: 10000 });
      await expect(page.locator($tagSlugTd)).toBeVisible({ timeout: 15000 });
    });

    await test.step("Delete all new added data", async () => {
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.locator($tagName1Td).hover();
      await page
        .locator(`//a[@aria-label="Delete “${validTagName1}”"]`)
        .click();

      await expect(page.locator($tagName1Td)).not.toBeVisible();

      await page.locator($tagName2Td).hover();
      await page
        .locator(`//a[@aria-label="Delete “${validTagName2}”"]`)
        .click();

      await expect(page.locator($tagName2Td)).not.toBeVisible();
    });
  });

  test("@POST_TAG_003 - Tag - slug auto remove special character", async ({
    page,
  }) => {
    await test.step("Add tag with valid name, special slug", async () => {
      await page.locator($tagNameInput).fill(specialTagName);
      await page.locator($tagSlugInput).fill(specialSlug);
      await page.locator($addTagButton).click();

      const msg = await page.locator($resultMsg).textContent();
      expect(msg).toBe(expectMsgAddTagSuccess);

      await expect(page.locator($tagName3Td)).toBeVisible();
      await expect(page.locator($tagSpecialSlugTd)).toBeVisible();
    });

    await test.step("Delete all new added data", async () => {
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.locator($tagName3Td).hover();
      await page
        .locator(`//a[@aria-label="Delete “${specialTagName}”"]`)
        .click();

      await expect(page.locator($tagName3Td)).not.toBeVisible();
    });
  });

  test("@POST_CATEGORY_001 - Category - create category success", async ({
    page,
  }) => {
    await test.step("Navigate to Post/Categories on sidebar", async () => {
      await page.locator($categoriesSubItem).click();
    });

    await test.step("Add Category with special slug", async () => {
      await page.locator($categoryNameInput).fill(categoryName);
      await page.locator($categorySlugInput).fill(specialCategorySlug);
      await page.locator($addCategoryButton).click();

      const msg = await page.locator($resultMsg).textContent();
      expect(msg).toBe(expectMsgAddCategorySuccess);

      await expect(page.locator($categoryNameTd)).toBeVisible();
      await expect(page.locator($categorySpecialSlugTd)).toBeVisible();
    });

    await test.step("Add Category with Parent", async () => {
      await page.locator($categoryNameInput).fill(categoryName2);
      await page.locator($parentDropdown).selectOption(parentCategory);
      await page.locator($addCategoryButton).click();

      const msg = await page.locator($resultMsg).textContent();
      expect(msg).toBe(expectMsgAddCategorySuccess);

      await expect(page.locator($categoryName2Td)).toBeVisible();

      const catSlug = await page.locator($categorySlug2Td).textContent();
      expect(catSlug).toBe(slugify(categoryName2));
    });

    await test.step("Delete all new added Categories", async () => {
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.locator($categoryNameTd).hover();
      await page.locator(`//a[@aria-label="Delete “${categoryName}”"]`).click();

      await expect(page.locator($categoryNameTd)).not.toBeVisible();

      await page.locator($categoryName2Td).hover();
      await page
        .locator(`//a[@aria-label="Delete “${categoryName2}”"]`)
        .click();

      await expect(page.locator($categoryName2Td)).not.toBeVisible();
    });
  });
});
