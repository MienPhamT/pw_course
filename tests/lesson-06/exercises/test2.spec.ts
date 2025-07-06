import test, { expect } from "@playwright/test";
import { HomePage } from "../../../marterial-playwright-pages/home-page";
import { ProductPage } from "../../../marterial-playwright-pages/product-page";

test("Product page: Add items to Cart", async ({ page }) => {
  const url = "https://material.playwrightvn.com/";

  let homePage = new HomePage(url, page);
  let prodPage = new ProductPage(page);

  await test.step("Go to website", async () => {
    await homePage.goToWebsite(url);
  });

  await test.step("Click Bai Hoc 2", async () => {
    await homePage.openLessonPage("product-page");
  });

  await test.step("Add Products to cart", async () => {
    await prodPage.addItemToCart(1, 2)
    await prodPage.addItemToCart(2, 3)
    await prodPage.addItemToCart(3, 1);

    for (let i = 1; i <= 3; i++) {
      let productName = "Product " + i;
      await expect(await prodPage.getProductLocator(productName)).toBeVisible();
    }
    expect(await prodPage.getTotalPrice()).toBe("$110.00");
  });
});
