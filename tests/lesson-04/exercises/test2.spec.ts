import test from "@playwright/test";

test("Product page: Add items to Cart", async ({ page }) => {
  await test.step("Go to website", async () => {
    await page.goto("https://material.playwrightvn.com/");
  });

  await test.step("Click Bai Hoc 2", async () => {
    await page.locator('//a[contains(@href, "product-page")]').click();
  });

  await test.step("Add Product 1 to cart", async () => {
    await page.locator('//button[@data-product-id="1"]').dblclick();
  });

  await test.step("Add Product 2 to cart", async () => {
    await page
      .locator('//button[@data-product-id="2"]')
      .click({ clickCount: 3 });
  });

  await test.step("Add Product 3 to cart", async () => {
    await page.locator('//button[@data-product-id="3"]').click();
  });
});
