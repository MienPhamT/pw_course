import test, { expect } from "@playwright/test";
import { HomePage } from "../../../marterial-playwright-pages/home-page";
import { ProductPage } from "../../../marterial-playwright-pages/product-page";

test("Product page: Add items to Cart", async ({ page }) => {
  const url = "https://material.playwrightvn.com/";
  const xpathProdPage = '//a[contains(@href, "product-page")]';
  const xpathTotalPrice = '//td[@class="total-price"]';

  function xpathItem(item: number) {
    return `//button[@data-product-id=${item}]`;
  }

  let homePage = new HomePage(url, page);
  let prodPage = new ProductPage(page);

  await test.step("Go to website", async () => {
    await homePage.goToTheWebsite(url);
  });

  await test.step("Click Bai Hoc 2", async () => {
    await homePage.openPage(xpathProdPage);
  });

  await test.step("Add Products to cart", async () => {
    await prodPage.dbClick(xpathItem(1));
    await prodPage.clickCount(xpathItem(2), 3);
    await prodPage.clickAt(xpathItem(3));

    for (let i = 1; i <= 3; i++) {
      let productName = "Product " + i;
      let expectProduct = await prodPage.getLocator(
        `//td[text() = '${productName}']`
      );
      await expect(expectProduct).toBeVisible();
    }
    expect(await prodPage.getTextContent(xpathTotalPrice)).toBe("$110.00");
  });
});
